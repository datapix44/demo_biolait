import assert from 'node:assert/strict';
import test, { after, before, describe } from 'node:test';
import sharp from 'sharp';
import { createApp } from '../src/app.js';

let server;
let origin;

before(async () => {
  server = createApp().listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

const get = (path, init) => fetch(`${origin}${path}`, init);

describe('GET /healthz', () => {
  test('repond ok', async () => {
    const response = await get('/healthz');
    assert.equal(response.status, 200);
    assert.equal((await response.json()).status, 'ok');
  });
});

describe('GET /v1/calendar', () => {
  test('renvoie un PNG carre a la taille demandee', async () => {
    const response = await get('/v1/calendar.png?date=12%20AOUT&time=14:30&accent=023c88&size=256');
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'image/png');

    const image = sharp(Buffer.from(await response.arrayBuffer()));
    const meta = await image.metadata();
    assert.equal(meta.format, 'png');
    assert.equal(meta.width, 256);
    assert.equal(meta.height, 256);
  });

  test('le bandeau prend la couleur d accent', async () => {
    const response = await get('/v1/calendar.png?date=1&accent=1a8f4c&size=200&shadow=false');
    const buffer = Buffer.from(await response.arrayBuffer());
    // Point situe au milieu du bandeau (y ~ 22 % de l'image).
    const { data } = await sharp(buffer)
      .ensureAlpha()
      .extract({ left: 100, top: 44, width: 1, height: 1 })
      .raw()
      .toBuffer({ resolveWithObject: true });
    const [r, g, b] = data;
    assert.ok(g > r && g > b, `attendu un pixel vert, recu rgb(${r},${g},${b})`);
  });

  test('le fond est transparent par defaut et opaque avec bg', async () => {
    const corner = async (query) => {
      const response = await get(`/v1/calendar.png?${query}`);
      const { data } = await sharp(Buffer.from(await response.arrayBuffer()))
        .ensureAlpha()
        .extract({ left: 0, top: 0, width: 1, height: 1 })
        .raw()
        .toBuffer({ resolveWithObject: true });
      return data[3];
    };
    assert.equal(await corner('date=1&size=200'), 0);
    assert.equal(await corner('date=1&size=200&bg=ffffff'), 255);
  });

  test('sert tous les formats annonces', async () => {
    for (const [extension, type] of Object.entries({
      png: 'image/png', webp: 'image/webp', jpeg: 'image/jpeg',
      jpg: 'image/jpeg', avif: 'image/avif', svg: 'image/svg+xml',
    })) {
      const response = await get(`/v1/calendar.${extension}?date=1&size=128`);
      assert.equal(response.status, 200, extension);
      assert.equal(response.headers.get('content-type'), type, extension);
    }
  });

  test('le SVG contient la couleur d accent et aucun texte injectable', async () => {
    const response = await get('/v1/calendar.svg?date=%3Cscript%3E&accent=023c88');
    const svg = await response.text();
    assert.match(svg, /#023c88|#0[0-9a-f]{5}/);
    assert.ok(!svg.includes('<script>'), 'le texte utilisateur ne doit pas produire de balise');
  });

  test('met en cache et honore If-None-Match', async () => {
    const url = '/v1/calendar.png?date=CACHE%20TEST&accent=112233&size=120';
    const first = await get(url);
    const etag = first.headers.get('etag');
    assert.ok(etag);

    const second = await get(url);
    assert.equal(second.headers.get('x-cache'), 'HIT');
    assert.equal(second.headers.get('etag'), etag);

    const third = await get(url, { headers: { 'If-None-Match': etag } });
    assert.equal(third.status, 304);
  });

  test('des parametres differents produisent des images differentes', async () => {
    const bytes = async (query) => Buffer.from(await (await get(query)).arrayBuffer());
    const blue = await bytes('/v1/calendar.png?date=1&accent=023c88&size=120');
    const red = await bytes('/v1/calendar.png?date=1&accent=e81c24&size=120');
    assert.ok(!blue.equals(red));
  });

  test('expose une entete de telechargement avec dl=1', async () => {
    const response = await get('/v1/calendar.png?date=12%20AOUT&dl=1&size=120');
    assert.match(response.headers.get('content-disposition'), /attachment; filename="calendrier-12_AOUT\.png"/);
  });

  test('renvoie une erreur JSON explicite', async () => {
    const response = await get('/v1/calendar.png?size=99999');
    assert.equal(response.status, 400);
    const body = await response.json();
    assert.equal(body.error.code, 'out_of_range');
    assert.match(body.error.message, /size/);
  });

  test('404 JSON sur route inconnue', async () => {
    const response = await get('/v1/inconnu');
    assert.equal(response.status, 404);
    assert.equal((await response.json()).error.code, 'not_found');
  });

  test('CORS ouvert en lecture', async () => {
    const response = await get('/v1/calendar.png?date=1&size=64');
    assert.equal(response.headers.get('access-control-allow-origin'), '*');
  });
});

describe('GET /v1/options', () => {
  test('documente les formats et les bornes', async () => {
    const body = await (await get('/v1/options')).json();
    assert.ok(body.formats.includes('webp'));
    assert.equal(body.size.default, 512);
    assert.ok(body.parameters.accent);
  });
});
