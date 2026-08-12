/** Assemblage de l'application Express (sans ecoute reseau : testable). */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { config } from './config.js';
import { calendarRouter } from './routes/calendar.js';
import { rateLimit } from './middleware/rate-limit.js';
import { HttpError } from './lib/errors.js';
import { preloadFonts } from './lib/fonts.js';

const PUBLIC_DIR = path.resolve(fileURLToPath(new URL('../public', import.meta.url)));

export function createApp() {
  preloadFonts();

  const app = express();
  app.disable('x-powered-by');
  app.set('etag', false); // les routes images gerent leur propre ETag
  app.set('trust proxy', true);

  // Service d'images public : lecture seule, donc CORS ouvert.
  app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.set('Access-Control-Expose-Headers', 'ETag, X-Cache, X-Render-Time');
    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }
    next();
  });

  app.use(rateLimit({ perMinute: config.rateLimitPerMinute }));

  app.get('/healthz', (req, res) => {
    res.json({ status: 'ok', uptime: Math.round(process.uptime()) });
  });

  app.use('/v1', calendarRouter);

  app.use(express.static(PUBLIC_DIR, { extensions: ['html'], maxAge: '5m' }));

  app.use((req, res, next) => {
    next(new HttpError(404, 'not_found', `route inconnue: ${req.method} ${req.path}`));
  });

  // eslint-disable-next-line no-unused-vars -- Express identifie le handler d'erreur par son arite
  app.use((error, req, res, next) => {
    const status = error instanceof HttpError ? error.status : 500;
    const code = error instanceof HttpError ? error.code : 'internal_error';
    if (status >= 500) console.error('[api-calendar]', error);
    res.status(status).json({
      error: { code, message: status >= 500 ? 'erreur interne' : error.message },
    });
  });

  return app;
}
