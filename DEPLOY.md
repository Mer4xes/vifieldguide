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
