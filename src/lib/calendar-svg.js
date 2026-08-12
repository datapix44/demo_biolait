/**
 * Construction de l'asset "calendrier" en SVG parametrique.
 *
 * L'illustration n'est pas un PNG retouche mais un dessin vectoriel genere a la
 * volee : la "zone rouge" (le bandeau) n'est qu'un attribut `fill`, ce qui rend
 * la recoloration exacte et le rendu net a n'importe quelle taille.
 *
 * Repere de travail : carre de 1000 x 1000 unites, mis a l'echelle a la sortie.
 */

import { buildTextPath } from './fonts.js';
import { luminance, shade } from './colors.js';

const CANVAS = 1000;

const CARD = { x: 60, y: 118, w: 880, h: 782, r: 64 };
const BAND_HEIGHT = 208;
const RING_POSITIONS = [0.155, 0.385, 0.615, 0.845];
const RING = { width: 72, top: 46, bottom: 252, holeRadius: 47, holeY: 212 };

const TEXT = {
  padding: 58,
  dateSize: 178,
  timeSize: 132,
  gap: 46,
  soloSize: 214,
};

const escapeXml = (value) =>
  String(value).replace(/[<>&'"]/g, (c) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[c]);

/** Contour du bandeau : coins superieurs arrondis, base droite. */
function bandPath() {
  const { x, y, w, r } = CARD;
  const bottom = y + BAND_HEIGHT;
  return [
    `M${x} ${bottom}`,
    `V${y + r}`,
    `A${r} ${r} 0 0 1 ${x + r} ${y}`,
    `H${x + w - r}`,
    `A${r} ${r} 0 0 1 ${x + w} ${y + r}`,
    `V${bottom}`,
    'Z',
  ].join(' ');
}

function ringsMarkup(ringColor) {
  const highlight = shade(ringColor, 0.28);
  return RING_POSITIONS.map((ratio) => {
    const cx = CARD.x + CARD.w * ratio;
    const x = cx - RING.width / 2;
    const height = RING.bottom - RING.top;
    return [
      `<circle cx="${cx.toFixed(1)}" cy="${RING.holeY}" r="${RING.holeRadius}" fill="#ffffff"/>`,
      `<rect x="${x.toFixed(1)}" y="${RING.top}" width="${RING.width}" height="${height}"`,
      ` rx="${RING.width / 2}" fill="url(#ringGrad)"/>`,
      `<rect x="${(x + 12).toFixed(1)}" y="${RING.top + 16}" width="14" height="${height - 60}"`,
      ` rx="7" fill="${highlight}" opacity="0.55"/>`,
    ].join('');
  }).join('');
}

/**
 * Compose les lignes de texte (date + heure) centrees optiquement dans la zone
 * blanche de la carte.
 */
function textMarkup({ date, time, color, dateSize, timeSize }) {
  const maxWidth = CARD.w - TEXT.padding * 2;
  const centerX = CARD.x + CARD.w / 2;
  const bodyTop = CARD.y + BAND_HEIGHT;
  const bodyBottom = CARD.y + CARD.h;
  const centerY = (bodyTop + bodyBottom) / 2;

  const solo = !time;
  const lines = [
    buildTextPath({ text: date, fontSize: solo ? (dateSize ?? TEXT.soloSize) : (dateSize ?? TEXT.dateSize), maxWidth }),
    time ? buildTextPath({ text: time, fontSize: timeSize ?? TEXT.timeSize, maxWidth }) : null,
  ].filter(Boolean);

  if (lines.length === 0) return '';

  const heights = lines.map((line) => line.box.y2 - line.box.y1);
  const gap = lines.length > 1 ? TEXT.gap : 0;
  const total = heights.reduce((a, b) => a + b, 0) + gap * (lines.length - 1);

  let cursor = centerY - total / 2;
  return lines
    .map((line, index) => {
      const baselineY = cursor - line.box.y1;
      const originX = centerX - line.width / 2;
      cursor += heights[index] + gap;
      return `<g transform="translate(${originX.toFixed(2)} ${baselineY.toFixed(2)})"><path d="${line.d}" fill="${color}"/></g>`;
    })
    .join('');
}

/**
 * @param {object} options
 * @param {number} options.size cote de l'image de sortie, en pixels
 * @param {string} options.date texte principal
 * @param {string} [options.time] texte secondaire
 * @param {string} options.accent couleur du bandeau (#rrggbb)
 * @param {string} options.textColor couleur des textes (#rrggbb)
 * @param {string} options.paper couleur du corps de la carte (#rrggbb)
 * @param {string} options.ring couleur des anneaux (#rrggbb)
 * @param {{hex: string, alpha: number}} options.background fond de l'image
 * @param {boolean} [options.shadow] ombre portee sous la carte
 * @param {number} [options.dateSize] taille de police de la date (unites SVG)
 * @param {number} [options.timeSize] taille de police de l'heure (unites SVG)
 * @returns {string} document SVG complet
 */
export function buildCalendarSvg({
  size,
  date,
  time,
  accent,
  textColor,
  paper,
  ring,
  background,
  shadow = true,
  dateSize,
  timeSize,
}) {
  const bandTop = shade(accent, 0.1);
  const bandBottom = shade(accent, -0.08);
  // Un liseré clair sous le bandeau ne se voit que sur les accents fonces.
  const separator = luminance(accent) < 0.7 ? shade(accent, -0.2) : shade(accent, -0.12);

  const label = [date, time].filter(Boolean).join(' ');
  const backgroundRect = background.alpha > 0
    ? `<rect width="${CANVAS}" height="${CANVAS}" fill="${background.hex}" fill-opacity="${background.alpha}"/>`
    : '';

  const shadowMarkup = shadow
    ? `<g filter="url(#soft)" opacity="0.22">
      <rect x="${CARD.x + 14}" y="${CARD.y + 30}" width="${CARD.w - 28}" height="${CARD.h}" rx="${CARD.r}" fill="#0f172a"/>
    </g>`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${CANVAS} ${CANVAS}" role="img" aria-label="${escapeXml(label)}">
  <title>${escapeXml(label)}</title>
  <defs>
    <linearGradient id="bandGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${bandTop}"/>
      <stop offset="1" stop-color="${bandBottom}"/>
    </linearGradient>
    <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${shade(paper, 0.05)}"/>
      <stop offset="1" stop-color="${shade(paper, -0.025)}"/>
    </linearGradient>
    <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${shade(ring, -0.25)}"/>
      <stop offset="0.45" stop-color="${ring}"/>
      <stop offset="1" stop-color="${shade(ring, -0.35)}"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>
  ${backgroundRect}
  ${shadowMarkup}
  <rect x="${CARD.x}" y="${CARD.y}" width="${CARD.w}" height="${CARD.h}" rx="${CARD.r}" fill="url(#paperGrad)"/>
  <path d="${bandPath()}" fill="url(#bandGrad)"/>
  <rect x="${CARD.x}" y="${CARD.y + BAND_HEIGHT - 6}" width="${CARD.w}" height="6" fill="${separator}" opacity="0.55"/>
  ${ringsMarkup(ring)}
  ${textMarkup({ date, time, color: textColor, dateSize, timeSize })}
  <rect x="${CARD.x}" y="${CARD.y}" width="${CARD.w}" height="${CARD.h}" rx="${CARD.r}" fill="none" stroke="#0f172a" stroke-opacity="0.08" stroke-width="3"/>
</svg>`;
}

export const CANVAS_SIZE = CANVAS;
