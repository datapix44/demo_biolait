/**
 * Chargement des polices et conversion texte -> trace vectoriel.
 *
 * Le texte est transforme en <path> SVG plutot qu'en <text> : le rendu ne depend
 * alors ni des polices installees sur la machine, ni de fontconfig, et il est
 * strictement identique en local, en CI et en production.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';

const FONT_DIR = path.resolve(fileURLToPath(new URL('../../assets/fonts', import.meta.url)));

const FILES = {
  bold: 'LiberationSans-Bold.ttf',
  regular: 'LiberationSans-Regular.ttf',
};

const cache = new Map();

/**
 * @param {'bold'|'regular'} weight
 * @returns {import('opentype.js').Font}
 */
export function getFont(weight = 'bold') {
  const key = FILES[weight] ? weight : 'bold';
  if (!cache.has(key)) {
    const buffer = fs.readFileSync(path.join(FONT_DIR, FILES[key]));
    const view = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    cache.set(key, opentype.parse(view));
  }
  return cache.get(key);
}

/** Charge les polices au demarrage pour eviter la latence a la premiere requete. */
export function preloadFonts() {
  for (const weight of Object.keys(FILES)) getFont(weight);
}

/**
 * Construit le trace d'une ligne de texte, avec sa boite englobante d'encre.
 *
 * @param {object} options
 * @param {string} options.text texte a tracer
 * @param {number} options.fontSize taille souhaitee (unites SVG)
 * @param {number} [options.maxWidth] largeur max ; la taille est reduite si besoin
 * @param {'bold'|'regular'} [options.weight]
 * @param {number} [options.letterSpacing] interlettrage, en ratio de fontSize
 * @returns {{d: string, width: number, fontSize: number, box: {x1:number,y1:number,x2:number,y2:number}}|null}
 */
export function buildTextPath({ text, fontSize, maxWidth, weight = 'bold', letterSpacing = 0 }) {
  const value = String(text ?? '');
  if (!value.trim()) return null;

  const font = getFont(weight);
  const spacingFor = (size) => size * letterSpacing * Math.max(value.length - 1, 0);

  let size = fontSize;
  const naturalWidth = font.getAdvanceWidth(value, size) + spacingFor(size);
  if (maxWidth && naturalWidth > maxWidth) {
    size = size * (maxWidth / naturalWidth);
  }

  const paths = [];
  let cursor = 0;
  if (letterSpacing) {
    // Trace caractere par caractere pour appliquer l'interlettrage.
    for (const char of value) {
      const charPath = font.getPath(char, cursor, 0, size);
      paths.push(charPath);
      cursor += font.getAdvanceWidth(char, size) + size * letterSpacing;
    }
  } else {
    paths.push(font.getPath(value, 0, 0, size));
    cursor = font.getAdvanceWidth(value, size);
  }

  const d = paths.map((p) => p.toPathData(2)).join(' ');
  const boxes = paths.map((p) => p.getBoundingBox());
  const box = {
    x1: Math.min(...boxes.map((b) => b.x1)),
    y1: Math.min(...boxes.map((b) => b.y1)),
    x2: Math.max(...boxes.map((b) => b.x2)),
    y2: Math.max(...boxes.map((b) => b.y2)),
  };

  const width = letterSpacing ? cursor - size * letterSpacing : cursor;
  return { d, width, fontSize: size, box };
}
