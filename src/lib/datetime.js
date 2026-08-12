/**
 * Normalisation des parametres `date` et `time`.
 *
 * Deux usages possibles :
 *  - une valeur ISO ("2026-08-12", "2026-08-12T14:30") est formatee selon la
 *    locale et le fuseau demandes ;
 *  - toute autre chaine est reprise telle quelle ("12 AOUT", "Jeudi", "J-3"...).
 */

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?/;
const CLOCK = /^(\d{1,2})[:hH.](\d{2})$/;
const NOW_KEYWORDS = new Set(['now', 'today', "aujourd'hui", 'auto', 'maintenant']);

export const DATE_STYLES = ['short', 'long', 'weekday', 'numeric', 'day', 'month'];

function partsOf(date, timeZone, options) {
  return new Intl.DateTimeFormat('en-US', { timeZone, ...options }).format(date);
}

/**
 * @param {string|undefined} input
 * @param {{locale: string, timeZone: string, style: string, uppercase: boolean}} options
 * @returns {{text: string, source: Date|null, hasTime: boolean}}
 */
export function resolveDate(input, { locale, timeZone, style = 'short', uppercase = true }) {
  const raw = String(input ?? '').trim();

  let date = null;
  let hasTime = false;
  if (!raw || NOW_KEYWORDS.has(raw.toLowerCase())) {
    date = new Date();
  } else {
    const match = ISO_DATE.exec(raw);
    if (match) {
      const [, y, m, d, hh = '00', mm = '00', ss = '00'] = match;
      hasTime = match[4] !== undefined;
      date = new Date(`${y}-${m}-${d}T${hh}:${mm}:${ss}Z`);
      if (Number.isNaN(date.getTime())) date = null;
    }
  }

  if (!date) return { text: uppercase ? raw.toUpperCase() : raw, source: null, hasTime: false };

  const options = {
    short: { day: 'numeric', month: 'long' },
    long: { day: 'numeric', month: 'long', year: 'numeric' },
    weekday: { weekday: 'short', day: 'numeric', month: 'short' },
    numeric: { day: '2-digit', month: '2-digit', year: 'numeric' },
    day: { day: 'numeric' },
    month: { month: 'long' },
  }[style] ?? { day: 'numeric', month: 'long' };

  // Pour une date ISO sans heure on garde le fuseau UTC afin d'eviter tout
  // decalage de jour ; pour "maintenant" on utilise le fuseau demande.
  const zone = raw && ISO_DATE.test(raw) ? 'UTC' : timeZone;
  let text = new Intl.DateTimeFormat(locale, { ...options, timeZone: zone }).format(date);
  // Intl insere des espaces insecables (U+00A0/U+202F) que la police ne rend pas.
  text = text.replace(/[\u00a0\u202f]/g, " ").trim();

  return { text: uppercase ? text.toUpperCase() : text, source: date, hasTime };
}

/**
 * @param {string|undefined} input
 * @param {{timeZone: string, locale: string, reference: Date|null}} options
 * @returns {string} chaine vide si aucune heure ne doit etre affichee
 */
export function resolveTime(input, { timeZone, locale, reference = null }) {
  const raw = String(input ?? '').trim();
  if (!raw) return '';

  if (NOW_KEYWORDS.has(raw.toLowerCase())) {
    const date = reference ?? new Date();
    const zone = reference ? 'UTC' : timeZone;
    return partsOf(date, zone, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  }

  const iso = ISO_DATE.exec(raw);
  if (iso && iso[4]) return `${iso[4]}:${iso[5]}`;

  const clock = CLOCK.exec(raw);
  if (clock) {
    const hours = clock[1].padStart(2, '0');
    return `${hours}:${clock[2]}`;
  }

  return raw;
}
