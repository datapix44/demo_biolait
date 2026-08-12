/**
 * Validation et normalisation des parametres de la requete.
 *
 * Le resultat est un objet stable et entierement resolu : c'est lui qui sert de
 * cle de cache et de base pour l'ETag.
 */

import { config } from '../config.js';
import { parseColor } from './colors.js';
import { DATE_STYLES, resolveDate, resolveTime } from './datetime.js';
import { badRequest } from './errors.js';

export const FORMATS = {
  png: { contentType: 'image/png', lossy: false },
  webp: { contentType: 'image/webp', lossy: true },
  jpeg: { contentType: 'image/jpeg', lossy: true },
  jpg: { contentType: 'image/jpeg', lossy: true, alias: 'jpeg' },
  avif: { contentType: 'image/avif', lossy: true },
  svg: { contentType: 'image/svg+xml', lossy: false },
};

/** Premiere valeur non vide parmi une liste d'alias de query string. */
function pick(query, ...keys) {
  for (const key of keys) {
    const value = query[key];
    if (value === undefined || value === null) continue;
    const first = Array.isArray(value) ? value[0] : value;
    if (String(first).trim() !== '') return String(first).trim();
  }
  return undefined;
}

function parseBoolean(value, fallback) {
  if (value === undefined) return fallback;
  const v = value.toLowerCase();
  if (['1', 'true', 'yes', 'on'].includes(v)) return true;
  if (['0', 'false', 'no', 'off'].includes(v)) return false;
  throw badRequest('invalid_boolean', `valeur booleenne invalide: "${value}"`);
}

function parseIntInRange(value, { name, min, max, fallback }) {
  if (value === undefined) return fallback;
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n)) throw badRequest('invalid_number', `${name} doit etre un entier`);
  if (n < min || n > max) {
    throw badRequest('out_of_range', `${name} doit etre compris entre ${min} et ${max}`);
  }
  return n;
}

function color(value, fallback, name) {
  if (value === undefined) return fallback;
  try {
    return parseColor(value);
  } catch (error) {
    throw badRequest('invalid_color', `${name}: ${error.message}`);
  }
}

function checkText(value, max, name) {
  if (value !== undefined && value.length > max) {
    throw badRequest('text_too_long', `${name} ne doit pas depasser ${max} caracteres`);
  }
  return value;
}

/**
 * @param {Record<string, unknown>} query parametres de la requete
 * @param {string} [extension] format deduit de l'extension d'URL
 * @returns {object} options normalisees pour le rendu
 */
export function parseParams(query, extension) {
  const formatKey = (extension || pick(query, 'format', 'f') || 'png').toLowerCase();
  const formatEntry = FORMATS[formatKey];
  if (!formatEntry) {
    throw badRequest('invalid_format', `format non supporte: "${formatKey}" (attendu: ${Object.keys(FORMATS).join(', ')})`);
  }
  const format = formatEntry.alias ?? formatKey;

  const size = parseIntInRange(pick(query, 'size', 's'), {
    name: 'size',
    min: config.minSize,
    max: config.maxSize,
    fallback: config.defaultSize,
  });

  const locale = pick(query, 'locale', 'lang') || config.defaultLocale;
  const timeZone = pick(query, 'tz', 'timezone') || config.defaultTimeZone;
  try {
    new Intl.DateTimeFormat(locale, { timeZone });
  } catch {
    throw badRequest('invalid_locale', `locale ou fuseau horaire invalide: "${locale}" / "${timeZone}"`);
  }

  const style = (pick(query, 'style', 'date_style') || 'short').toLowerCase();
  if (!DATE_STYLES.includes(style)) {
    throw badRequest('invalid_style', `style invalide: "${style}" (attendu: ${DATE_STYLES.join(', ')})`);
  }

  const uppercase = parseBoolean(pick(query, 'uppercase', 'upper'), true);
  const rawDate = checkText(pick(query, 'date', 'd'), config.maxDateLength, 'date');
  const rawTime = checkText(pick(query, 'time', 't'), config.maxTimeLength, 'time');

  const resolvedDate = resolveDate(rawDate, { locale, timeZone, style, uppercase });
  // "now" ne reprend l'heure de la date que si celle-ci en portait une.
  const reference = resolvedDate.hasTime ? resolvedDate.source : null;
  const time = resolveTime(rawTime, { locale, timeZone, reference });

  const accent = color(pick(query, 'accent', 'color', 'c'), parseColor(config.defaultAccent), 'accent');
  const textColor = color(pick(query, 'text', 'text_color', 'tc'), accent, 'text');
  const paper = color(pick(query, 'paper', 'sheet'), parseColor(config.defaultPaper), 'paper');
  const ring = color(pick(query, 'ring', 'rings'), parseColor(config.defaultRing), 'ring');
  const background = color(pick(query, 'bg', 'background'), parseColor('transparent'), 'bg');

  if (format === 'jpeg' && background.alpha < 1) {
    // Le JPEG ne gere pas la transparence : on retombe sur un fond blanc.
    background.hex = '#ffffff';
    background.alpha = 1;
  }

  return {
    format,
    contentType: formatEntry.contentType,
    size,
    date: resolvedDate.text,
    time,
    accent: accent.hex,
    textColor: textColor.hex,
    paper: paper.hex,
    ring: ring.hex,
    background: { hex: background.hex, alpha: background.alpha },
    shadow: parseBoolean(pick(query, 'shadow'), true),
    quality: parseIntInRange(pick(query, 'quality', 'q'), {
      name: 'quality', min: 1, max: 100, fallback: 90,
    }),
    dateSize: parseIntInRange(pick(query, 'date_size'), {
      name: 'date_size', min: 20, max: 400, fallback: undefined,
    }),
    timeSize: parseIntInRange(pick(query, 'time_size'), {
      name: 'time_size', min: 20, max: 400, fallback: undefined,
    }),
    download: parseBoolean(pick(query, 'dl', 'download'), false),
  };
}

/** Serialisation stable (cles triees, recursif) pour obtenir une cle reproductible. */
function stableStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value) ?? 'null';
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  const entries = Object.keys(value)
    .sort()
    .filter((key) => value[key] !== undefined)
    .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`);
  return `{${entries.join(',')}}`;
}

/**
 * Cle de cache deterministe derivee des options resolues.
 * `download` n'influence que les en-tetes, pas les octets : il est exclu.
 */
export function cacheKey(params) {
  const { download, ...rest } = params;
  return stableStringify(rest);
}
