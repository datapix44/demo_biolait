/** Erreur HTTP portant un code stable, exploitable cote client. */
export class HttpError extends Error {
  /**
   * @param {number} status code HTTP
   * @param {string} code identifiant stable de l'erreur
   * @param {string} message message lisible
   */
  constructor(status, code, message) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.code = code;
  }
}

export const badRequest = (code, message) => new HttpError(400, code, message);
