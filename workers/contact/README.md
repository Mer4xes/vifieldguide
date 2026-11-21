# Contact form worker

`/contact/` on the site posts JSON to `/api/contact`. This Worker checks the
Turnstile token, then emails the message to vifieldguide@gmail.com through
Cloudflare Email Routing (free for verified destination addresses).

Setup (done Nov 21, 2026, on the Cloudflare login that owns vifieldguide.com, not the vifieldguide@gmail.com Cloudflare account):
1. Email Routing on vifieldguide.com, destination vifieldguide@gmail.com verified.
   Rule: contact@vifieldguide.com forwards to the same Gmail.
2. Turnstile widget for vifieldguide.com. Site key in `src/_data/site.js`
   (`contact.turnstileSiteKey`), secret as the Worker secret `TURNSTILE_SECRET`.
3. Worker `vifieldguide-contact` with the code in `worker.js`, Email Service binding
   named `MAIL`, the route `vifieldguide.com/api/contact`, and workers.dev turned off.
   Code changes: paste `worker.js` into the dashboard editor and deploy.

Nothing is stored. The visitor's email, if given, becomes the Reply-To.
