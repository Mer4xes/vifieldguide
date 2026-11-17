# Deploy: vifieldguide.com

Statisk Eleventy-side. Kode i GitHub (`Mer4xes/vifieldguide`), hosting på Cloudflare Pages (prosjekt `vifieldguide-site`).

## Slik publiseres endringer
Push til `main` → Cloudflare Pages bygger og publiserer automatisk (1–2 min).

| Innstilling | Verdi |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node | 22 (fra `.node-version`) |

Domener: `vifieldguide.com` og `www.vifieldguide.com` (Cloudflare Registrar + DNS, SSL automatisk).

## Lokalt
- `npm install`
- `npm run dev` → lokal server med prøveinnhold
- `npm run build` → ekte side i `dist/`
- `npm run check` → sjekker interne lenker

## Bilder
Offisielle Rockstar-bilder ligger i `src/assets/img/` (WebP). `gal/` = små gallerier, `full/` = store versjoner for lysboksen, `ed/` = utgaver, `art/` = artwork, `post/` = postkort, `misc/` = kort på seksjonssider.
Kreditering «Image: Rockstar Games» vises ved bildene.

## Søkemotorer og rekkevidde (SEO)

Siden har på plass: sitemap (`/sitemap.xml`), `robots.txt`, canonical, Open Graph/Twitter-kort, Atom-feed (`/feed.xml`), og structured data (WebSite, Organization med logo, BreadcrumbList, Article på oppdrag/guider, FAQPage, VideoObject på videosiden). Logo for Google: `src/assets/logo.png`.

### Google Search Console (gjør én gang)
1. Gå til search.google.com/search-console → **Legg til eiendom**.
2. Velg **Domene** (`vifieldguide.com`) — anbefalt, dekker www + apex. Google gir en **TXT-post**; legg den inn i Cloudflare DNS (DNS → Records → Add → TXT). Verifiser.
   - Alternativ uten DNS: velg **URL-prefiks** (`https://vifieldguide.com`), «HTML-tag»-metoden, kopier *innholdsverdien* og lim inn i `googleSiteVerification` i `src/_data/site.js`, push, verifiser.
3. I Search Console: **Sitemaps** → send inn `sitemap.xml`.

### Bing Webmaster Tools (gjør én gang)
1. bing.com/webmasters → legg til `https://vifieldguide.com`. Enkleste: **importer fra Google Search Console**. Ellers legg `bingSiteVerification` i `site.js` (meta-tag-metoden) og push.
2. Send inn sitemap. Bing dekker også DuckDuckGo m.fl.

### IndexNow (rask indeksering)
Nøkkelen ligger i `site.js` (`indexNowKey`) og serveres på `/<nøkkel>.txt`. Etter at nytt innhold er **live** (Cloudflare-deploy ferdig), ping søkemotorene:
```
node scripts/indexnow.mjs https://vifieldguide.com/ny-side/   # én eller flere URL-er
node scripts/indexnow.mjs                                     # alt i dist/sitemap.xml
```
Den automatiske innholdsjobben bør kjøre dette med URL-ene den nettopp publiserte, så Bing/Yandex plukker dem opp i løpet av minutter.
