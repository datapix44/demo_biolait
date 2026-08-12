/** Point d'entree : demarrage du serveur HTTP. */

import { createApp } from './app.js';
import { config } from './config.js';

const app = createApp();
const server = app.listen(config.port, config.host, () => {
  console.log(`[api-calendar] en ecoute sur http://${config.host}:${config.port}`);
});

const shutdown = (signal) => {
  console.log(`[api-calendar] ${signal} recu, arret en cours`);
  server.close(() => process.exit(0));
  // Filet de securite si des connexions trainent.
  setTimeout(() => process.exit(1), 10_000).unref();
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
