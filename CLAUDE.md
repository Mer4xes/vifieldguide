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
| Home page "What's new" | `src/_data/whatsNew.json` (newest first; the home page shows the first 5: one large card, four small). Fields: date, tag, title, text (one short line; no mission names or story details), url, img (an official image already in `src/assets/img/`, 16:9), `cta` on the first entry. Add an entry at the top when a run ships something a visitor would notice (a finished chapter, a new guide or tool), not for every batch of missions; update the lead entry instead when a chapter moves on. Keep about 8 entries. |

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
- Every fact needs one trusted source or two independent ones (Hauk, Nov 19). Trusted on their own: primary sources (Rockstar, PlayStation/Xbox trophy lists) and the established guide outlets PowerPyx, IGN, Game Informer and Eurogamer, plus outlets of the same standing (GameSpot, Polygon, GamesRadar, PC Gamer, Push Square, PlayStationTrophies.org, TrueAchievements). Everything else (aggregator and SEO sites, wikis, Reddit, YouTube) still needs a second independent source. When two trusted sources disagree, or one contradicts itself, leave the detail out. Promptowy (promptowy.com, Polish walkthroughs) counts as an independent second source next to PowerPyx when the two agree (Hauk, Nov 18). IGN (ign.com/wikis/gta-6) and Rock Paper Shotgun are approved independent sources too, but both block fetching from cloud runs (checked Nov 18): don't try to get around it; use them when Hauk pastes content or a run has his computer.
- Never copy text, step order wording, tables or structure from another guide. Gather facts from several sources, then write original steps in our own words and our own template. Quotes: none, or one short line with attribution.
- New pages and steps stay "First pass" (no `verified` field) until Hauk or someone has confirmed them in the game.
- Story details only inside spoiler blocks. A mission page covers only that mission.
- Use "GTA 6" in titles and search-facing text. Record sources in front matter `sources` (not shown on the site).
- The site does not display sources anywhere (Hauk's call, Nov 18): no source lists, no outlet names on cards, no "X says" attributions in text. Keep `sources`/`src` in front matter and data as our own record; pages show only the status: Confirmed (Rockstar/platform data), Reported (from a trusted source, or two independent sources that agree) or Verified (checked in-game). Tell Hauk in the run report which sources were used and that they are safe.
- Images: only official Rockstar Games media, credited "Image: Rockstar Games". Never screenshots taken from other sites or YouTube.
- The site is non-commercial: no ads, affiliate links or sponsored content. The one exception is a voluntary donation link (Hauk's call, Nov 18): `site.donate.url` in `src/_data/site.js`, shown as a plain link in the footer and on the About page. No widgets, popups, perks or paywalled content.

## Notes for scheduled runs (Nov 19)
- The source rule above (one trusted source, Hauk Nov 19) replaces the older "two sources" wording in the scheduled task's prompt.
- Start from PowerPyx's "GTA 6 Full Walkthrough - All Missions" page and cover the next missions in `storyMissions.json` that have no file yet. Optional jobs in that list get `sideJob: true`; other side strands go on `/guides/side-contacts/` (strand cards).
- Blocked from cloud runs: IGN, Rock Paper Shotgun, Eurogamer, Dualshockers (robots), vifieldguide.com and IndexNow (proxy). Don't retry or work around them; mention IndexNow in the report.
- nettoge.com marks its pages "noai": don't use it as a source.
- Cloud runs can only fetch pages whose URL came from a web search result (links found inside a fetched page are refused). On Nov 19 the PowerPyx pages for Meet the Heders, South Leonida Real Estate, Here, Kitty Kitty and Car Service were not in search yet; try searching their exact titles again.
- Runs are every 3 hours until Nov 26. If nothing new is clearly better, change nothing and don't send a notification.
