/* /api/feedback
   GET  ?page=/guides/stunts/                         -> { up, down, all }  (all = votes on every page)
   POST { page, cid, vote: "up" | "down" }            -> { ok, up, down }   (one vote per page per browser per day; a second click changes it)
   POST { page, cid, reason, comment }                -> { ok }            (adds detail to today's vote on that page)
   Code shared with the admin view lives in workers/feedback/lib.js. */
import { db, json, cleanPage, today, ipCode, voterCode, counts, sameOrigin, cleanComment, REASONS, MAX_VOTES_PER_DAY } from "../../../workers/feedback/lib.js";

export async function onRequestGet({ request, env, waitUntil }) {
  const url = new URL(request.url);
  const page = cleanPage(url.searchParams.get("page"));
  if (!page) return json({ error: "page" }, 400);
  const d = await db(env);
  if (!d) return json({ error: "off" }, 503);

  // Counts are cached for a minute per page, so busy pages cost one database read a minute.
  const cache = caches.default;
  const key = new Request(`${url.origin}/api/feedback?page=${encodeURIComponent(page)}`);
  const hit = await cache.match(key);
  if (hit) return hit;
  const res = json(await counts(d, page), 200, { "cache-control": "public, max-age=60" });
  waitUntil(cache.put(key, res.clone()));
  return res;
}

export async function onRequestPost({ request, env }) {
  if (!sameOrigin(request)) return json({ error: "origin" }, 403);
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: "body" }, 400);
  }
  if (!body || typeof body !== "object") return json({ error: "body" }, 400);
  if (body.website) return json({ ok: true }); // honeypot field: bots fill it in, people never see it
  const page = cleanPage(body.page);
  if (!page) return json({ error: "page" }, 400);
  const d = await db(env);
  if (!d) return json({ error: "off" }, 503);

  const day = today();
  const iph = await ipCode(request, env, day);
  const vid = await voterCode(body.cid, env, iph);
  const now = Date.now();

  if (body.vote === "up" || body.vote === "down") {
    const v = body.vote === "up" ? 1 : 0;
    const existing = await d.prepare("SELECT id FROM votes WHERE page = ? AND vid = ? AND day = ?").bind(page, vid, day).first();
    if (existing) {
      // Changing your mind the same day moves the vote; any detail given for the old vote is dropped.
      await d.prepare("UPDATE votes SET vote = ?, reason = NULL, comment = NULL, ts = ? WHERE id = ?").bind(v, now, existing.id).run();
    } else {
      const used = await d.prepare("SELECT COUNT(*) AS n FROM votes WHERE iph = ? AND day = ?").bind(iph, day).first();
      if (Number(used?.n || 0) >= MAX_VOTES_PER_DAY) return json({ error: "limit" }, 429);
      await d.prepare("INSERT INTO votes (page, vote, vid, iph, day, ts) VALUES (?, ?, ?, ?, ?, ?)").bind(page, v, vid, iph, day, now).run();
    }
    // Drop the cached counts for this page so the next visitor sees the new vote.
    try {
      const origin = new URL(request.url).origin;
      await caches.default.delete(new Request(`${origin}/api/feedback?page=${encodeURIComponent(page)}`));
    } catch (e) {}
    return json({ ok: true, ...(await counts(d, page)) });
  }

  if ("reason" in body || "comment" in body) {
    const reason = REASONS.includes(body.reason) ? body.reason : null;
    const comment = cleanComment(body.comment);
    if (!reason && !comment) return json({ error: "empty" }, 400);
    const r = await d
      .prepare("UPDATE votes SET reason = ?, comment = ?, ts = ? WHERE page = ? AND vid = ? AND day = ?")
      .bind(reason, comment, now, page, vid, day)
      .run();
    if (!r.meta || !r.meta.changes) return json({ error: "novote" }, 409);
    return json({ ok: true });
  }

  return json({ error: "body" }, 400);
}
