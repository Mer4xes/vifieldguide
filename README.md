# The VI Field Guide (vifieldguide.com)

Kildekoden til nettstedet. Statisk nettsted bygget med [Eleventy](https://www.11ty.dev/): innhold skrives i Markdown og JSON, og bygget lager ferdige HTML-sider i `dist/` som kan lastes opp hvor som helst.

## Kom i gang

Krever Node 18 eller nyere.

```
npm install        # én gang
npm run dev        # lokal forhåndsvisning på http://localhost:8080 (med prøveinnhold, skrives til dist-dev/)
npm run build      # ekte bygg til dist/ (uten prøveinnhold)
npm run check      # sjekker at alle interne lenker i dist/ treffer en side
npm run preview    # pakker hele nettstedet, med prøveinnhold, i én fil: preview/index.html
```

## Prøveinnhold holdes ute av det ekte nettstedet

Alt som er merket `sample: true` er oppdiktet og finnes bare for å vise malene.

| Kommando | Prøveinnhold |
|---|---|
| `npm run dev` | vises, med stripet banner og `noindex`. Skrives til `dist-dev/`, aldri til `dist/` |
| `npm run preview` | vises, med stripet banner |
| `npm run build` | utelates helt, og seksjonen viser en «åpner ved lansering»-tekst |

Når du har ekte innhold: slett prøvefilen, eller fjern `"sample": true` fra JSON-filen og bytt ut innholdet.

## Mappestruktur

```
src/
  index.njk                      forsiden
  walkthrough/index.njk          oppdragslisten
  walkthrough/missions/*.md      ett oppdrag per fil
  trophies/ collectibles/ db/ map/   maler som fylles fra data
  guides/*.md                    guider (launch-guide.md er ekte, beginner-tips.md er prøve)
  characters.njk  about.md  404.njk
  data/*.json                    databasene: trophies, collectibles, vehicles, weapons
  _data/                         site.js (navn, URL, meny), regions.json, cast.json
  _includes/layouts/             base, mission, guide, page
  assets/                        site.css, site.js, fonter, favicon, og.png
scripts/                         make-preview, check-links, og-card.html
```

## URL-er

| Side | URL |
|---|---|
| Oppdragsliste | `/walkthrough/` |
| Oppdrag | `/walkthrough/<navn>/` |
| Trofeer | `/trophies/` |
| Samleobjekter | `/collectibles/` og `/collectibles/<sett>/` |
| Kjøretøy / våpen | `/vehicles/<navn>/`, `/weapons/<navn>/` |
| Kart | `/map/` og `/map/<region>/` |
| Guider | `/guides/<navn>/` |

`sitemap.xml` og `robots.txt` lages automatisk. Prøvesider og 404 er aldri med i sitemap.

## Legge til et oppdrag

Lag en fil i `src/walkthrough/missions/`. Filnavnet bestemmer rekkefølge og URL:
`014-the-big-one.md` blir oppdrag 14 på `/walkthrough/the-big-one/`.

```markdown
---
title: The Big One
chapter: Chapter 2            # grupperer oppdragslisten
protagonist: both             # jason | lucia | both
region: vice-city             # slug fra src/_data/regions.json
giver: Raul
unlocks: Garage
difficulty: 2                 # 1 til 3
time: 30 min
summary: Én setning uten spoilere. Brukes også som meta description hvis du ikke setter en egen.
updated: 2026-11-19
verified: "1.00"              # spillversjon når stegene er kontrollert. Utelat for «first pass».
missables:                    # valgfritt. Gir advarsel øverst og «Missable»-merke i listen
  - "**Vice Tape 4** ligger i hvelvet. Du kommer ikke inn igjen."
objectives:
  - Meet the crew
  - Get to the bank
bonus:                        # valgfritt
  - { goal: Finish the mission, target: "under 12:00" }
rewards:
  - { label: Cash, value: "$25,000" }
---

Valgfri innledning før første steg.

## Meet the crew

Hver `##`-overskrift blir et nummerert steg som leseren kan krysse av.

> **Tip:** Blå tipsboks.

> **Watch out:** Gul advarsel.

> **Missable:** Rosa boks for ting man kan gå glipp av.

> **Spoiler:** Skjult til leseren trykker.

> **Spoiler (ending):** Samme, med egen etikett.

![Beskrivende alt-tekst](/assets/img/missions/the-big-one-01.jpg)
```

Tittel og meta description for søk lages automatisk («The Big One Walkthrough: GTA 6 Mission 14 Guide»). Sett `seoTitle` eller `description` i front matter for å overstyre.

## Databasene (`src/data/*.json`)

**trophies.json**: `items` med `id`, `name`, `desc`, `grade` (`platinum|gold|silver|bronze`), `tags` (`story`, `open-world`, `collectibles`), og valgfritt `missable`, `hidden`, `how`, `link`. `roadmap` er fasene øverst, `estimate.time` vises som flis.

**collectibles.json**: `types` med `slug`, `name`, `desc`, `reward`, `total` (antall i spillet) og `items` (det som er kartlagt så langt): `n`, `region`, `name`, `where`, valgfritt `image` og `mission` (slug). Siden viser «4 of 50 mapped so far», så listen kan vokse gradvis.

**vehicles.json / weapons.json**: `stats` definerer søylene (`key`, `label`, valgfri `max`), `items` har `slug`, `name`, `class`, `blurb`, `stats`, `price`, `howToGet`, `note`, valgfritt `image`. Hvert element får egen side.

## Guider

Markdown-fil i `src/guides/`. Valgfrie felter i front matter gir ferdige blokker: `facts` (fliser med Confirmed/Reported), `tldr`, `tips` (nummererte kort), `methods` (pengepanel), `panels` (to kolonner) og `sources`. Se `launch-guide.md` og `beginner-tips.md`.

## Spoilere og fremdrift

- `> **Spoiler:**` i Markdown gir en lukket blokk. Knappen «Spoilers hidden / shown» i menyen åpner og lukker alle.
- Skjulte trofeer (`"hidden": true`) er uskarpe til leseren velger å se dem.
- «Hide names of missions ahead» på oppdragslisten skjuler titler etter neste oppdrag.
- All avkryssing lagres i nettleseren (`localStorage`, nøklene `vfg.progress.v1` og `vfg.prefs.v1`). Ingenting sendes til en server.

Etter lansering (midnatt 19. november, lokal tid hos leseren) bytter forsiden selv fra nedtelling til «Start the walkthrough». Tidspunktet står i `src/_data/site.js`.

## Publisere

Alt i `dist/` er ferdig statisk HTML. To måter:

1. **Last opp `dist/`** til et vanlig webhotell.
2. **Koble et Git-repo** til Cloudflare Pages eller Netlify med build-kommando `npm run build` og utmappe `dist`. Da publiseres nettstedet på nytt hver gang innhold legges inn. `_headers` med cache-regler følger med.

Nettstedet må ligge på roten av domenet (lenkene starter med `/`).

## Før lansering

- [ ] Sett `contactEmail` i `src/_data/site.js` hvis du vil ha kontaktlinje på About-siden.
- [ ] Les gjennom `src/about.md`. Den lover at «Verified» betyr kontrollert i spillet.
- [ ] Legg bilder i `src/assets/img/` (lag mappen) og komprimer dem før opplasting.
- [ ] Delingsbildet `src/assets/og.png` er laget fra `scripts/og-card.html`.

## Lisenser

Fontene i `src/assets/fonts/` (Anton, Hanken Grotesk, Space Mono) er lisensiert under SIL Open Font License 1.1. Nettstedet er et uoffisielt fanprosjekt og bruker ingen grafikk fra Rockstar Games.
