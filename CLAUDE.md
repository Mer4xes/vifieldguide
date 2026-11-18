# The VI Field Guide (vifieldguide.com)

Unofficial, non-commercial GTA 6 guide owned by Hauk. Claude writes and publishes the content. Site text is in English; reports to Hauk are in Norwegian.

## Publishing
- Eleventy 3 static site. `npm install`, `npm run build` (output `dist/`), `npm run check` (internal links, must be 0 broken).
- Push to `main` → Cloudflare Pages project `vifieldguide-site` builds and publishes automatically. No other deploy step.
- Commit messages end with the attribution lines the session gives you.
- After a content push is live, ping IndexNow so new/changed pages get crawled fast: `node scripts/indexnow.mjs <the URLs you just published>`. See DEPLOY.md.

## Where content lives
| What | File |
|---|---|
| Missions | `src/walkthrough/missions/NNN-slug.md` (NNN = story order). Front matter: title, chapter, protagonist (jason/lucia/both), region, giver, unlocks, difficulty 1-3, time, summary (no spoilers), updated, missables, objectives, rewards, `verified` only when checked in-game. Each `##` heading = one step. Boxes: `> **Tip:**`, `> **Watch out:**`, `> **Missable:**`, `> **Note:**`, `> **Spoiler:**`, `> **Spoiler (ending):**`. |
| Trophies | `src/data/trophies.json` (`items`: id, name, desc, grade, tags, missable, hidden, how) |
| Collectibles | `src/data/collectibles.json` (`types` with `items`: n, region, name, where, mission) |
| Vehicles / weapons | `src/data/vehicles.json`, `src/data/weapons.json` (items with slug, name, class, blurb, stats, price, howToGet, note). Pre-launch named items: `src/_data/known.json` |
| Guides | `src/guides/*.md` (front matter blocks: facts, tldr, tips, methods, panels, sources, faq) |
| "What we know" pages | `src/activities.md`, `src/wildlife.md`, `src/how-it-plays.md`, `src/music.md` (layout `layouts/known.njk`) |
| Regions | `src/_data/regions.json` (details, gallery) |
| Characters | `src/_data/cast.json` |
| Videos | `src/_data/videos.json` |

Files marked `"sample": true` (and sample mission files) are fictional templates that are never published. When real content replaces a section, remove `"sample": true` and the fictional entries, or delete the sample mission files.

## Improving the site (every run)
Besides adding facts, look for one or two concrete improvements per run and ship them when they are clearly better:
- New subpages when content makes it natural: e.g. one page per character (`/characters/<slug>/`), per activity (`/activities/<slug>/`), per region topic, per collectible set, per trophy group, money and beginner guides. Link them from the parent page, the home page tiles and the footer where it fits.
- Richer presentation: detail popups or expandable cards, comparison tables, checklists with progress tracking, region filters, "related" links between missions, regions, characters and activities.
- SEO: descriptive titles and descriptions, FAQ blocks with FAQPage schema where people ask questions, internal links, sitemap stays correct.
- Keep the existing design system (site.css components, dark Vice City look, Anton/Hanken Grotesk/Space Mono). Reuse layouts and partials; add CSS at the end of site.css. Mobile must work.
- Before pushing, render changed pages in headless Chrome (Playwright is available) at 1280px and 390px wide and look at the screenshots. No console errors, no broken layout, `npm run check` clean.
- Do not remove working features. Keep pages fast: WebP images, lazy loading, no heavy libraries.

## Editorial rules (non-negotiable)
- No leaks, no datamined content before launch, no guessing. If a fact is not cross-checked, leave it out.
- Every fact needs at least two independent sources, or one primary source (Rockstar, PlayStation/Xbox trophy lists, Game Informer interviews with Rockstar). Promptowy (promptowy.com, Polish walkthroughs) counts as an independent second source next to PowerPyx when the two agree (Hauk, Nov 18). IGN (ign.com/wikis/gta-6) and Rock Paper Shotgun are approved independent sources too, but both block fetching from cloud runs (checked Nov 18): don't try to get around it; use them when Hauk pastes content or a run has his computer.
- Never copy text, step order wording, tables or structure from another guide. Gather facts from several sources, then write original steps in our own words and our own template. Quotes: none, or one short line with attribution.
- New pages and steps stay "First pass" (no `verified` field) until Hauk or someone has confirmed them in the game.
- Story details only inside spoiler blocks. A mission page covers only that mission.
- Use "GTA 6" in titles and search-facing text. Record sources in front matter `sources` (not shown on the site).
- The site does not display sources anywhere (Hauk's call, Nov 18): no source lists, no outlet names on cards, no "X says" attributions in text. Keep `sources`/`src` in front matter and data as our own record; pages show only the status: Confirmed (Rockstar/platform data), Reported (two independent sources agree) or Verified (checked in-game). Tell Hauk in the run report which sources were used and that they are safe.
- Images: only official Rockstar Games media, credited "Image: Rockstar Games". Never screenshots taken from other sites or YouTube.
- The site is non-commercial: no ads, affiliate links or sponsored content. The one exception is a voluntary donation link (Hauk's call, Nov 18): `site.donate.url` in `src/_data/site.js`, shown as a plain link in the footer and on the About page. No widgets, popups, perks or paywalled content.
