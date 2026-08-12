# api-calendar

Micro-service HTTP qui genere **a la volee** une image de calendrier a partir de
parametres d'URL — meme principe que les URLs de transformation Cloudinary, mais
sur un perimetre volontairement reduit : une seule illustration, trois variables
d'entree principales.

```
GET /v1/calendar.png?date=12%20AOUT&time=14:30&accent=023c88&size=400
```

<!-- Le rendu : carte blanche a coins arrondis, bandeau colore et anneaux en haut,
     date et heure centrees dans la zone blanche. -->

## Ce qui remplace l'approche Cloudinary

L'exemple d'origine empile des transformations sur un PNG stocke : recoloration
`e_colorize` du bandeau, deux calques `l_text` positionnes en dur, `fl_layer_apply`.

Ici, l'illustration **est** un dessin vectoriel genere par le service :

- la « zone rouge » n'est pas recoloree apres coup, c'est un simple attribut de
  remplissage — la couleur obtenue est donc exactement celle demandee ;
- le rendu est net a toutes les tailles, de 32 a 2048 px, sans asset source ;
- le texte est converti en traces vectoriels a partir d'une police embarquee
  (Liberation Sans, metriquement compatible Arial), donc le rendu est identique
  en local, en CI et en production, sans dependance aux polices systeme ;
- la date et l'heure sont centrees optiquement et **reduites automatiquement**
  si elles sont trop longues : plus de texte qui deborde de la carte.

## Demarrage

```bash
npm install
npm start          # http://localhost:3000
npm test           # 27 tests, sans dependance externe
```

Une page de demonstration interactive est servie sur `/` : reglages en direct et
URL prete a copier.

### Docker

```bash
docker build -t api-calendar .
docker run -p 3000:3000 api-calendar
```

## API

### `GET /v1/calendar[.format]`

Renvoie l'image. Le format vient de l'extension d'URL (`/v1/calendar.webp`) ou du
parametre `format` ; par defaut `png`.

#### Les trois parametres principaux

| Parametre | Alias | Defaut | Description |
|---|---|---|---|
| `date` | `d` | aujourd'hui | Texte libre (`12 AOUT`, `JOUR J`) ou date ISO (`2026-08-12`) formatee selon `locale` |
| `time` | `t` | *(vide)* | Texte libre (`14:30`, `9h05`), `now`, ou vide pour n'afficher que la date |
| `accent` | `color`, `c` | `#e81c24` | Couleur du bandeau : hex avec ou sans `#`, forme courte, ou nom (`blue`, `red`, `teal`...) |

#### Format de sortie

| Parametre | Alias | Defaut | Description |
|---|---|---|---|
| `size` | `s` | `512` | Cote de l'image, en pixels (32 – 2048). L'image est toujours carree |
| `format` | `f` | `png` | `png`, `webp`, `jpeg`, `avif`, `svg` |
| `quality` | `q` | `90` | 1 – 100, pour les formats compresses |
| `dl` | `download` | `false` | `1` pour forcer le telechargement |

#### Personnalisation complementaire

| Parametre | Defaut | Description |
|---|---|---|
| `text` | = `accent` | Couleur des textes |
| `paper` | `#fbfbfb` | Couleur du corps de la carte |
| `ring` | `#33383f` | Couleur des anneaux |
| `bg` | `transparent` | Fond de l'image (force en blanc en JPEG) |
| `shadow` | `true` | Ombre portee sous la carte |
| `style` | `short` | Mise en forme des dates ISO : `short`, `long`, `weekday`, `numeric`, `day`, `month` |
| `locale` | `fr-FR` | Locale de formatage |
| `tz` | `Europe/Paris` | Fuseau horaire |
| `uppercase` | `true` | Passage de la date en majuscules |
| `date_size` / `time_size` | auto | Taille de police forcee (unites SVG, 20 – 400) |

Les couleurs acceptent un canal alpha (`00000080`) et la valeur `transparent`.

#### Exemples

```bash
# Reproduction de l'exemple d'origine
/v1/calendar.png?date=12%20AOUT&time=14:30&accent=023c88&size=200

# Date du jour, heure courante, vignette WebP legere
/v1/calendar.webp?date=now&time=now&accent=1a8f4c&size=128&quality=80

# Date ISO formatee en anglais, sans heure, fond blanc pour un e-mail
/v1/calendar.jpeg?date=2026-08-12&locale=en-US&style=weekday&bg=ffffff

# Palette entierement personnalisee
/v1/calendar.png?date=1%20MAI&time=08:00&accent=0b2545&text=e81c24&paper=fff8e7&ring=0b2545

# Vectoriel, pour impression ou integration web
/v1/calendar.svg?date=NOEL&time=00:00&accent=1a8f4c
```

### Erreurs

Toute erreur renvoie du JSON avec un code stable :

```json
{ "error": { "code": "out_of_range", "message": "size doit etre compris entre 32 et 2048" } }
```

Codes : `invalid_format`, `invalid_color`, `invalid_number`, `out_of_range`,
`invalid_boolean`, `invalid_style`, `invalid_locale`, `text_too_long`,
`not_found`, `rate_limited`, `internal_error`.

### Autres routes

| Route | Description |
|---|---|
| `GET /` | Page de demonstration interactive |
| `GET /v1/options` | Parametres acceptes, bornes et statistiques de cache (JSON) |
| `GET /healthz` | Sonde de disponibilite |

## Cache et performance

Un rendu prend environ 15–30 ms (512 px, PNG). Chaque reponse porte un `ETag` et
`Cache-Control: public, max-age=1an, immutable` : l'URL etant entierement
descriptive, deux appels identiques donnent le meme octet. Un cache LRU en memoire
(500 entrees par defaut) sert les repetitions sans re-rendu — l'en-tete `X-Cache`
indique `HIT` ou `MISS`, et `If-None-Match` obtient un `304`.

En production, placer un CDN devant le service suffit a absorber la charge.

## Configuration

Toutes les valeurs par defaut sont surchargeables par variables d'environnement —
voir [`.env.example`](.env.example). Un limiteur de debit par IP
(`RATE_LIMIT_PER_MINUTE`, 120 par defaut, `0` pour desactiver) protege l'instance.

## Structure

```
src/
  server.js              demarrage HTTP et arret propre
  app.js                 assemblage Express, CORS, gestion d'erreurs
  config.js              configuration et variables d'environnement
  routes/calendar.js     routes /v1/calendar et /v1/options
  middleware/rate-limit.js
  lib/
    params.js            validation, normalisation, cle de cache
    calendar-svg.js      dessin vectoriel parametrique du calendrier
    fonts.js             chargement des polices, texte -> trace
    datetime.js          resolution des parametres date et heure
    colors.js            analyse et derivation des couleurs
    render.js            rasterisation (sharp) et cache
    cache.js             LRU minimaliste
    errors.js
public/index.html        page de demonstration
assets/fonts/            Liberation Sans (SIL OFL 1.1)
test/                    tests unitaires et tests HTTP de bout en bout
```

## Pistes d'evolution

- URLs signees (HMAC) pour empecher la generation d'images arbitraires par des tiers ;
- variantes de gabarits (`template=classic|flat|minimal`) ;
- persistance des rendus sur un stockage objet plutot qu'en memoire.

## Licences

Code sous licence MIT. La police Liberation Sans embarquee est distribuee sous
SIL Open Font License 1.1 — voir [`assets/fonts/LICENSE.txt`](assets/fonts/LICENSE.txt).
