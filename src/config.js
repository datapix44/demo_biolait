/**
 * Configuration centrale du service, surchargeable par variables d'environnement.
 */

const int = (value, fallback) => {
  const n = Number.parseInt(value ?? '', 10);
  return Number.isFinite(n) ? n : fallback;
};

export const config = {
  port: int(process.env.PORT, 3000),
  host: process.env.HOST || '0.0.0.0',

  // Bornes de la taille de sortie (image toujours carree).
  minSize: int(process.env.MIN_SIZE, 32),
  maxSize: int(process.env.MAX_SIZE, 2048),
  defaultSize: int(process.env.DEFAULT_SIZE, 512),

  // Longueurs maximales des textes en overlay.
  maxDateLength: int(process.env.MAX_DATE_LENGTH, 32),
  maxTimeLength: int(process.env.MAX_TIME_LENGTH, 16),

  // Formatage des dates ISO.
  defaultLocale: process.env.DEFAULT_LOCALE || 'fr-FR',
  defaultTimeZone: process.env.DEFAULT_TIMEZONE || 'Europe/Paris',

  // Palette par defaut (l'accent est la couleur du bandeau, la "zone rouge").
  defaultAccent: process.env.DEFAULT_ACCENT || '#e81c24',
  defaultRing: process.env.DEFAULT_RING || '#33383f',
  defaultPaper: process.env.DEFAULT_PAPER || '#fbfbfb',

  // Cache memoire des rendus (LRU).
  cacheMaxEntries: int(process.env.CACHE_MAX_ENTRIES, 500),
  cacheMaxAge: int(process.env.CACHE_MAX_AGE, 31536000), // Cache-Control, en secondes

  // Garde-fou anti-abus : requetes/minute/IP (0 = desactive).
  rateLimitPerMinute: int(process.env.RATE_LIMIT_PER_MINUTE, 120),
};
