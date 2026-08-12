/**
 * Analyse et normalisation des couleurs fournies en parametre.
 *
 * Formats acceptes : "e81c24", "#e81c24", "fff", "#fff", "e81c24cc" (avec alpha),
 * "transparent" et une petite liste de noms usuels.
 */

const NAMED = {
  transparent: 'transparent',
  black: '#000000',
  white: '#ffffff',
  red: '#e81c24',
  blue: '#023c88',
  navy: '#0b2545',
  green: '#1a8f4c',
  orange: '#f26522',
  yellow: '#f5c518',
  purple: '#6b3fa0',
  pink: '#e64980',
  teal: '#0d9488',
  gray: '#6b7280',
  grey: '#6b7280',
};

const HEX = /^#?([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

/**
 * @param {string} input couleur brute
 * @returns {{hex: string, alpha: number, isTransparent: boolean}}
 * @throws {Error} si la couleur est invalide
 */
export function parseColor(input) {
  const raw = String(input ?? '').trim().toLowerCase();
  if (!raw) throw new Error('couleur vide');

  const named = NAMED[raw];
  if (named === 'transparent') return { hex: '#000000', alpha: 0, isTransparent: true };
  const candidate = named ?? raw;

  const match = HEX.exec(candidate);
  if (!match) throw new Error(`couleur invalide: "${input}"`);

  let hex = match[1];
  // Developpe les notations courtes #rgb / #rgba.
  if (hex.length === 3 || hex.length === 4) {
    hex = hex.split('').map((c) => c + c).join('');
  }

  const alpha = hex.length === 8 ? Number.parseInt(hex.slice(6, 8), 16) / 255 : 1;
  return { hex: `#${hex.slice(0, 6)}`, alpha, isTransparent: alpha === 0 };
}

/** Luminance relative (WCAG) d'une couleur hex #rrggbb. */
export function luminance(hex) {
  const channel = (v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/**
 * Eclaircit (amount > 0) ou assombrit (amount < 0) une couleur.
 * @param {string} hex format #rrggbb
 * @param {number} amount entre -1 et 1
 */
export function shade(hex, amount) {
  const mix = (v) => {
    const target = amount >= 0 ? 255 : 0;
    return Math.round(v + (target - v) * Math.abs(amount));
  };
  const r = mix(Number.parseInt(hex.slice(1, 3), 16));
  const g = mix(Number.parseInt(hex.slice(3, 5), 16));
  const b = mix(Number.parseInt(hex.slice(5, 7), 16));
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

/** Convertit une couleur analysee en objet accepte par sharp pour le fond. */
export function toSharpBackground({ hex, alpha }) {
  return {
    r: Number.parseInt(hex.slice(1, 3), 16),
    g: Number.parseInt(hex.slice(3, 5), 16),
    b: Number.parseInt(hex.slice(5, 7), 16),
    alpha,
  };
}
