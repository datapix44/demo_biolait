/** Routes de generation d'images de calendrier. */

import express from 'express';
import { config } from '../config.js';
import { FORMATS, parseParams } from '../lib/params.js';
import { renderCalendar, cacheStats } from '../lib/render.js';

export const calendarRouter = express.Router();

// /v1/calendar, /v1/calendar.png, /v1/calendar.webp, ...
const CALENDAR_PATH = /^\/calendar(?:\.([a-zA-Z0-9]+))?$/;

calendarRouter.get(CALENDAR_PATH, async (req, res, next) => {
  try {
    const extension = req.params[0];
    const params = parseParams(req.query, extension);
    const started = process.hrtime.bigint();
    const { body, etag, cached } = await renderCalendar(params);
    const elapsedMs = Number(process.hrtime.bigint() - started) / 1e6;

    res.set({
      'Content-Type': params.contentType,
      'Cache-Control': `public, max-age=${config.cacheMaxAge}, immutable`,
      ETag: etag,
      Vary: 'Accept-Encoding',
      'X-Cache': cached ? 'HIT' : 'MISS',
      'X-Render-Time': `${elapsedMs.toFixed(1)}ms`,
      'Timing-Allow-Origin': '*',
    });

    if (params.download) {
      const name = [params.date, params.time].filter(Boolean).join('-').replace(/[^\w-]+/g, '_');
      res.set('Content-Disposition', `attachment; filename="calendrier-${name || 'image'}.${params.format}"`);
    }

    // 304 si le client possede deja exactement cette image.
    if (req.headers['if-none-match'] === etag) {
      res.status(304).end();
      return;
    }

    res.status(200).send(body);
  } catch (error) {
    next(error);
  }
});

/** Documentation machine des parametres acceptes. */
calendarRouter.get('/options', (req, res) => {
  res.json({
    formats: Object.keys(FORMATS),
    size: { min: config.minSize, max: config.maxSize, default: config.defaultSize },
    parameters: {
      date: 'texte libre ("12 AOUT") ou date ISO ("2026-08-12"), vide = aujourd\'hui',
      time: 'texte libre ("14:30"), "now", ou vide pour ne rien afficher',
      accent: 'couleur du bandeau, hex ou nom ("023c88", "#e81c24", "blue")',
      text: 'couleur des textes (defaut : identique a accent)',
      paper: 'couleur du corps de la carte',
      ring: 'couleur des anneaux',
      bg: 'couleur de fond de l\'image (defaut : transparent)',
      size: 'cote de l\'image carree, en pixels',
      format: 'png | webp | jpeg | avif | svg (ou extension d\'URL)',
      quality: '1-100, formats compresses uniquement',
      shadow: 'true | false',
      style: 'short | long | weekday | numeric | day | month (dates ISO)',
      locale: 'ex. fr-FR, en-US',
      tz: 'ex. Europe/Paris',
      uppercase: 'true | false',
      date_size: 'taille de police de la date (unites SVG, 20-400)',
      time_size: 'taille de police de l\'heure (unites SVG, 20-400)',
      dl: 'true pour forcer le telechargement',
    },
    cache: cacheStats(),
  });
});
