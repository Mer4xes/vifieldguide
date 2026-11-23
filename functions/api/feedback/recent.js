/* /api/feedback/recent?key=<FEEDBACK_ADMIN_KEY>
   Hauk's view of the ratings: every page with votes (most "no" first) and the latest
   written feedback. Add &format=json for the raw data. Without the key it is a plain 404. */
import { db, json } from "../../../workers/feedback/lib.js";

const esc = (s) =>
  String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function same(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let x = 0;
  for (let i = 0; i < a.length; i++) x |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return x === 0;
}

const LABEL = { wrong: "Wrong info", outdated: "Out of date", missing: "Missing something", unclear: "Hard to follow", other: "Other" };

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const want = env.FEEDBACK_ADMIN_KEY;
  if (!want || !same(url.searchParams.get("key") || "", want)) return new Response("Not found", { status: 404 });
  const d = await db(env);
  if (!d) return json({ error: "FEEDBACK_DB is not bound" }, 503);

  const pages = (
    await d
      .prepare(
        "SELECT page, SUM(vote = 1) AS up, SUM(vote = 0) AS down, COUNT(*) AS n, MAX(ts) AS last FROM votes GROUP BY page ORDER BY down DESC, n DESC LIMIT 300"
      )
      .all()
  ).results;
  const notes = (
    await d
      .prepare(
        "SELECT page, vote, reason, comment, day FROM votes WHERE reason IS NOT NULL OR comment IS NOT NULL ORDER BY ts DESC LIMIT 200"
      )
      .all()
  ).results;
  const total = pages.reduce((s, p) => s + Number(p.n), 0);

  if (url.searchParams.get("format") === "json") return json({ total, pages, notes });

  const rows = pages
    .map((p) => {
      const pct = p.n ? Math.round((100 * p.up) / p.n) : 0;
      return `<tr><td><a href="${esc(p.page)}">${esc(p.page)}</a></td><td>${p.up}</td><td>${p.down}</td><td>${pct}%</td></tr>`;
    })
    .join("");
  const list = notes
    .map(
      (n) =>
        `<tr><td>${esc(n.day)}</td><td><a href="${esc(n.page)}">${esc(n.page)}</a></td><td>${n.vote ? "Yes" : "No"}</td><td>${esc(LABEL[n.reason] || "")}</td><td>${esc(n.comment)}</td></tr>`
    )
    .join("");
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page ratings</title>
<style>body{font:15px/1.5 system-ui,sans-serif;background:#0d0b12;color:#eee;margin:0;padding:24px}h1,h2{font-weight:700}table{border-collapse:collapse;width:100%;margin:12px 0 32px}td,th{border-bottom:1px solid #333;padding:6px 8px;text-align:left;vertical-align:top}th{color:#aaa;font-weight:600}a{color:#5ee6e6}td:last-child{white-space:pre-wrap}</style></head><body>
<h1>Page ratings</h1><p>${total} votes on ${pages.length} pages.</p>
<h2>Feedback (newest first)</h2><table><tr><th>Day</th><th>Page</th><th>Helpful</th><th>Reason</th><th>Comment</th></tr>${list || '<tr><td colspan="5">None yet.</td></tr>'}</table>
<h2>Pages (most "no" first)</h2><table><tr><th>Page</th><th>Yes</th><th>No</th><th>Helpful</th></tr>${rows || '<tr><td colspan="4">None yet.</td></tr>'}</table>
</body></html>`;
  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex" } });
}
