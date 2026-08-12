import assert from 'node:assert/strict';
import test, { describe } from 'node:test';
import { parseParams, cacheKey } from '../src/lib/params.js';
import { parseColor, shade } from '../src/lib/colors.js';
import { resolveDate, resolveTime } from '../src/lib/datetime.js';

describe('parseColor', () => {
  test('accepte les hex avec et sans diese, courts et longs', () => {
    assert.equal(parseColor('023c88').hex, '#023c88');
    assert.equal(parseColor('#023C88').hex, '#023c88');
    assert.equal(parseColor('fff').hex, '#ffffff');
    assert.equal(parseColor('#f00').hex, '#ff0000');
  });

  test('gere l alpha et transparent', () => {
    assert.equal(parseColor('00000080').alpha.toFixed(2), '0.50');
    assert.deepEqual(parseColor('transparent').isTransparent, true);
  });

  test('accepte les noms connus et rejette le reste', () => {
    assert.equal(parseColor('blue').hex, '#023c88');
    assert.throws(() => parseColor('bleu-canard'), /invalide/);
    assert.throws(() => parseColor(''), /vide/);
  });

  test('shade eclaircit et assombrit', () => {
    assert.equal(shade('#808080', 1), '#ffffff');
    assert.equal(shade('#808080', -1), '#000000');
  });
});

describe('resolveDate / resolveTime', () => {
  const base = { locale: 'fr-FR', timeZone: 'Europe/Paris' };

  test('formate une date ISO selon la locale', () => {
    assert.equal(resolveDate('2026-08-12', base).text, '12 AOÛT');
    assert.equal(resolveDate('2026-08-12', { ...base, locale: 'en-US' }).text, 'AUGUST 12');
    assert.equal(resolveDate('2026-08-12', { ...base, style: 'numeric' }).text, '12/08/2026');
    assert.equal(resolveDate('2026-08-12', { ...base, uppercase: false }).text, '12 août');
  });

  test('reprend le texte libre tel quel', () => {
    assert.equal(resolveDate('12 AOUT', base).text, '12 AOUT');
    assert.equal(resolveDate('jour J', base).text, 'JOUR J');
  });

  test('une date vide vaut aujourd hui', () => {
    assert.ok(resolveDate('', base).source instanceof Date);
  });

  test('normalise les heures', () => {
    assert.equal(resolveTime('14:30', base), '14:30');
    assert.equal(resolveTime('9h05', base), '09:05');
    assert.equal(resolveTime('', base), '');
    assert.equal(resolveTime('midi', base), 'midi');
    assert.equal(resolveTime('now', { ...base, reference: new Date('2026-08-12T14:30:00Z') }), '14:30');
  });
});

describe('parseParams', () => {
  test('applique les valeurs par defaut', () => {
    const params = parseParams({ date: '12 AOUT' });
    assert.equal(params.format, 'png');
    assert.equal(params.size, 512);
    assert.equal(params.textColor, params.accent, 'le texte suit l accent par defaut');
    assert.equal(params.background.alpha, 0, 'fond transparent par defaut');
  });

  test('reconnait les alias de parametres', () => {
    const params = parseParams({ d: '1 MAI', t: '08:00', c: '1a8f4c', s: '256' });
    assert.equal(params.date, '1 MAI');
    assert.equal(params.time, '08:00');
    assert.equal(params.accent, '#1a8f4c');
    assert.equal(params.size, 256);
  });

  test('l extension d URL prime sur le parametre format', () => {
    assert.equal(parseParams({ format: 'png' }, 'webp').format, 'webp');
    assert.equal(parseParams({}, 'jpg').contentType, 'image/jpeg');
  });

  test('le JPEG force un fond opaque', () => {
    const params = parseParams({}, 'jpeg');
    assert.equal(params.background.alpha, 1);
    assert.equal(params.background.hex, '#ffffff');
  });

  test('rejette les entrees hors bornes', () => {
    assert.throws(() => parseParams({ size: '10000' }), /entre 32 et 2048/);
    assert.throws(() => parseParams({ size: 'grand' }), /entier/);
    assert.throws(() => parseParams({}, 'gif'), /format non supporte/);
    assert.throws(() => parseParams({ accent: 'nope' }), /accent/);
    assert.throws(() => parseParams({ date: 'x'.repeat(50) }), /32 caracteres/);
    assert.throws(() => parseParams({ shadow: 'peut-etre' }), /booleenne/);
    assert.throws(() => parseParams({ style: 'fantaisie' }), /style invalide/);
    assert.throws(() => parseParams({ tz: 'Mars/Olympus' }), /fuseau horaire invalide/);
  });

  test('la cle de cache est stable et discriminante', () => {
    const a = parseParams({ date: '12 AOUT', accent: '023c88' });
    const b = parseParams({ accent: '023c88', date: '12 AOUT' });
    const c = parseParams({ date: '12 AOUT', accent: '023c89' });
    assert.equal(cacheKey(a), cacheKey(b));
    assert.notEqual(cacheKey(a), cacheKey(c));
    // Les couleurs imbriquees doivent participer a la cle.
    assert.ok(cacheKey(a).includes('"alpha"'));
    // `dl` ne change pas les octets rendus.
    assert.equal(cacheKey(parseParams({ date: 'X', dl: '1' })), cacheKey(parseParams({ date: 'X' })));
  });
});
