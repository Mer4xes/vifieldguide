# Page ratings ("Was this page helpful?")

Every page except the utility pages (404, search, contact) ends with a Yes/No vote.
After a vote the visitor can pick a reason (wrong info, out of date, missing something,
hard to follow, other) and leave a short note. The page shows "94% found this helpful · 120 votes"
from 5 votes up. Below that it shows no number, or "2,400 votes across the guide" once the whole site has 500. Never show made-up numbers.

- The same vote shows in three places: the band at the bottom, a small "Helpful? 👍 👎" in the page
  header (with "94% found this helpful" from 5 votes), and on pages taller than four screens a compact
  "Is this page helpful so far?" row before the section heading nearest the middle. Wherever you vote,
  the reason/note form opens right there and the page never scrolls you away. Header and middle row
  are added by site.js.
- Widget: `src/_includes/partials/rate.njk`, logic at the end of `src/assets/site.js`, CSS at the end of `site.css`.
  Hide it on a page with `hideRating: true` in front matter.
- Backend: Cloudflare **Pages Functions** in `functions/api/feedback/` (deployed automatically with
  every push, nothing to paste), shared code in `workers/feedback/lib.js`.
- Storage: a D1 database bound as `FEEDBACK_DB`. The table is created on the first request.
- Until `FEEDBACK_DB` is bound the API answers 503 and the band stays hidden, so nothing breaks.

## One-time setup (Cloudflare dashboard, the login that owns vifieldguide.com)
1. Done Nov 23, 2026: D1 database `vifieldguide-feedback` (id `08cdc54e-213f-45e7-ba4f-addcc16c50c5`, Western Europe), table and indexes created.
2. **Workers & Pages › vifieldguide-site › Settings › Bindings › Add › D1 database**:
   variable name `FEEDBACK_DB`, database `vifieldguide-feedback`. Production (and Preview if you like).
3. Same page, **Variables and Secrets › Add** (type Secret):
   - `FEEDBACK_ADMIN_KEY`: a long random password, for the results page below.
   - `FEEDBACK_SALT` (optional): any random string; it scrambles the stored codes.
4. **Deployments › latest › Retry deployment** (bindings only apply to new deployments).

## Reading the results
`https://vifieldguide.com/api/feedback/recent?key=<FEEDBACK_ADMIN_KEY>`: newest notes first,
then every page with its yes/no counts (most "no" first). Add `&format=json` for raw data.
Cloud runs can't open vifieldguide.com, so paste the JSON into a run (or let a run with your
computer fetch it) to have the notes turned into fixes.
Or query it in **D1 › vifieldguide-feedback › Console**, e.g.
`SELECT page, reason, comment, day FROM votes WHERE comment IS NOT NULL ORDER BY ts DESC LIMIT 50;`

## What is stored (also on /about/)
page, yes/no, reason, note, day, time, a hash of the browser's random id (one vote per page per
browser per day, a second click changes it) and a daily hash of the IP (caps one connection at
300 votes a day). No raw IP, no cookies, no account.

## Rules
- No `AggregateRating` / review schema: Google treats a site rating its own pages as self-serving
  review markup, so the numbers are for visitors only.
- Notes are anonymous visitor text: treat them as pointers to check, never as sources.
