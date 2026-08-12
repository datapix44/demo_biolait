/**
 * Rasterisation du SVG vers le format demande, avec cache memoire.
 */

import crypto from 'node:crypto';
import sharp from 'sharp';
import { config } from '../config.js';
import { buildCalendarSvg } from './calendar-svg.js';
import { LruCache } from './cache.js';
import { cacheKey } from './params.js';

const cache = new LruCache(config.cacheMaxEntries);

// Les images sont petites et nombreuses : le parallelisme interne de libvips
// n'apporte rien et sature le CPU sous charge.
sharp.concurrency(1);
sharp.cache({ files: 0 });

/**
 * @param {object} params options normalisees issues de parseParams
 * @returns {Promise<{body: Buffer, etag: string, cached: boolean}>}
 */
export async function renderCalendar(params) {
  const key = cacheKey(params);
  const hit = cache.get(key);
  if (hit) return { ...hit, cached: true };

  const svg = buildCalendarSvg(params);

  let body;
  if (params.format === 'svg') {
    body = Buffer.from(svg, 'utf8');
  } else {
    // sharp met le SVG a l'echelle par `density / 72` : la densite par defaut
    // rend donc exactement les width/height declares dans le document.
    const pipeline = sharp(Buffer.from(svg), { density: 72 })
      .resize({ width: params.size, height: params.size, fit: 'fill' });
    switch (params.format) {
      case 'jpeg':
        pipeline.flatten({ background: '#ffffff' }).jpeg({ quality: params.quality, mozjpeg: true });
        break;
      case 'webp':
        pipeline.webp({ quality: params.quality });
        break;
      case 'avif':
        pipeline.avif({ quality: params.quality });
        break;
      default:
        pipeline.png({ compressionLevel: 9, palette: true });
    }
    body = await pipeline.toBuffer();
  }

  const etag = `"${crypto.createHash('sha1').update(body).digest('base64url')}"`;
  const entry = { body, etag };
  cache.set(key, entry);
  return { ...entry, cached: false };
}

export function cacheStats() {
  return { size: cache.size, max: cache.maxEntries, hits: cache.hits, misses: cache.misses };
}

export function clearCache() {
  cache.clear();
}
