/**
 * Limiteur de debit en fenetre fixe, par IP. Suffisant pour proteger un service
 * public modeste ; derriere plusieurs instances, prevoir un stockage partage.
 */

import { HttpError } from '../lib/errors.js';

export function rateLimit({ perMinute }) {
  if (!perMinute || perMinute <= 0) return (req, res, next) => next();

  const windowMs = 60_000;
  const buckets = new Map();

  const sweep = setInterval(() => {
    const now = Date.now();
    for (const [ip, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(ip);
    }
  }, windowMs);
  sweep.unref?.();

  return (req, res, next) => {
    const now = Date.now();
    const ip = req.ip || 'unknown';
    let bucket = buckets.get(ip);
    if (!bucket || bucket.resetAt <= now) {
      bucket = { count: 0, resetAt: now + windowMs };
      buckets.set(ip, bucket);
    }
    bucket.count += 1;

    res.set('X-RateLimit-Limit', String(perMinute));
    res.set('X-RateLimit-Remaining', String(Math.max(0, perMinute - bucket.count)));
    res.set('X-RateLimit-Reset', String(Math.ceil(bucket.resetAt / 1000)));

    if (bucket.count > perMinute) {
      res.set('Retry-After', String(Math.ceil((bucket.resetAt - now) / 1000)));
      next(new HttpError(429, 'rate_limited', 'trop de requetes, reessayez dans un instant'));
      return;
    }
    next();
  };
}
