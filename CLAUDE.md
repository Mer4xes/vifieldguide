# The VI Field Guide (vifieldguide.com)

Unofficial, non-commercial GTA 6 guide owned by Hauk. Claude writes and publishes the content. Site text is in English; reports to Hauk are in Norwegian.

## Publishing
- Eleventy 3 static site. `npm install`, `npm run build` (output `dist/`), `npm run check` (internal links, must be 0 broken).
- Push to `main` → Cloudflare Pages project `vifieldguide-site` builds and publishes automatically. No other deploy step.
- Commit messages end with the attribution lines the session gives you.

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

## Editorial rules (non-negotiable)
- No leaks, no datamined content before launch, no guessing. If a fact is not cross-checked, leave it out.
- Every fact needs at least two independent sources, or one primary source (Rockstar, PlayStation/Xbox trophy lists, Game Informer interviews with Rockstar).
- Never copy text, step order wording, tables or structure from another guide. Gather facts from several sources, then write original steps in our own words and our own template. Quotes: none, or one short line with attribution.
- New pages and steps stay "First pass" (no `verified` field) until Hauk or someone has confirmed them in the game.
- Story details only inside spoiler blocks. A mission page covers only that mission.
- Use "GTA 6" in titles and search-facing text. Add sources in front matter `sources` where the layout supports it.
- Images: only official Rockstar Games media, credited "Image: Rockstar Games". Never screenshots taken from other sites or YouTube.
- The site is non-commercial: no ads, affiliate links or sponsored content.
