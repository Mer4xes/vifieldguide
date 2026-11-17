# Deploy: vifieldguide.com på Cloudflare

Statisk Eleventy-side. Hosting = Cloudflare Pages (gratis, auto-bygg fra GitHub).
Domene + DNS = Cloudflare. SSL er automatisk.

## 1. Kode til GitHub
- Opprett et nytt, tomt repo (privat går fint), f.eks. `gta6guide`.
- Last opp alt i denne mappa (IKKE `node_modules/`, `dist/`, `preview/` — de er allerede utelatt i `.gitignore`).

## 2. Cloudflare Pages
Workers & Pages → Create → Pages → Connect to Git → velg repoet.

Bygginnstillinger:

| Felt | Verdi |
|---|---|
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 20 (leses fra `.node-version`) |

Trykk Save and Deploy. Første bygg tar ~1 min og gir en `*.pages.dev`-URL.

## 3. Domene
Cloudflare → Domain Registration → Register → søk `vifieldguide.com` → kjøp (~110 kr/år).
Da ligger domenet og DNS-sonen allerede i Cloudflare.

## 4. Koble domenet til siden
Pages-prosjektet → Custom domains → Set up a custom domain → `vifieldguide.com`
(og legg til `www.vifieldguide.com` som redirect hvis ønskelig).
Cloudflare setter DNS-postene selv siden domenet er registrert der. SSL kommer automatisk.

## Oppdateringer etter lansering
Endre innhold i `src/` → push til GitHub → Cloudflare Pages bygger og publiserer seg selv.
Ingen FTP, ingen manuell opplasting.

## Lokalt (valgfritt)
- `npm install`
- `npm run dev` → lokal server med prøveinnhold
- `npm run build` → ekte side i `dist/`
