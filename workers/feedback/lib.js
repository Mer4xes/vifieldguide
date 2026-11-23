/* Page ratings ("Was this page helpful?") for vifieldguide.com.
   Shared by the Pages Functions in functions/api/feedback/. See README.md here.

   Storage: one D1 database bound to the Pages project as FEEDBACK_DB.
   The table is created on first use, so there is no schema step.
   Nothing personal is kept. Each browser sends a random id (kept in its localStorage), so one
   browser has one vote per page per day even when many people share an IP (mobile networks).
   The IP address is only turned into a one-way code with the day and a salt, to cap how many
   votes one connection can cast in a day. */

export const REASONS = ["wrong", "outdated", "missing", "unclear", "other"];
const MAX_COMMENT = 600;
const MAX_VOTES_PER_DAY = 300; // per IP code, across all pages and browsers

let ready = false;
export async function db(env) {
  const d = env && env.FEEDBACK_DB;
  if (!d) return null;
  if (!ready) {
    await d.batch([
      d.prepare(
        "CREATE TABLE IF NOT EXISTS votes (id INTEGER PRIMARY KEY AUTOINCREMENT, page TEXT NOT NULL, vote INTEGER NOT NULL, reason TEXT, comment TEXT, vid TEXT NOT NULL, iph TEXT NOT NULL, day TEXT NOT NULL, ts INTEGER NOT NULL, UNIQUE(page, vid, day))"
      ),
      d.prepare("CREATE INDEX IF NOT EXISTS votes_page ON votes(page)"),
      d.prepare("CREATE INDEX IF NOT EXISTS votes_iph_day ON votes(iph, day)"),
    ]);
    ready = true;
  }
  return d;
}

export function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra },
  });
}

// Paths only: "/guides/stunts/". No query strings, no other sites.
export function cleanPage(p) {
  if (typeof p !== "string") return null;
  p = p.trim().toLowerCase();
  if (p.length < 1 || p.length > 160) return null;
  if (!/^\/[a-z0-9\-_/.]*$/.test(p) || p.includes("..") || p.includes("//")) return null;
  if (!p.endsWith("/")) p += "/";
  return p;
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}

export async function ipCode(request, env, day) {
  const ip = request.headers.get("CF-Connecting-IP") || request.headers.get("x-real-ip") || "0.0.0.0";
  const salt = (env && env.FEEDBACK_SALT) || "vfg-feedback";
  return hex(`${salt}|${day}|${ip}`);
}

// The voter: a code made from the browser's random id, or from the IP code when there is none.
export async function voterCode(cid, env, iph) {
  if (typeof cid !== "string" || !/^[a-z0-9]{12,40}$/.test(cid)) return "ip:" + iph;
  return hex(`${(env && env.FEEDBACK_SALT) || "vfg-feedback"}|cid|${cid}`);
}

async function hex(s) {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(hash)].slice(0, 12).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function counts(d, page) {
  const row = await d
    .prepare(
      "SELECT COALESCE(SUM(vote = 1), 0) AS up, COALESCE(SUM(vote = 0), 0) AS down, (SELECT COUNT(*) FROM votes) AS total FROM votes WHERE page = ?"
    )
    .bind(page)
    .first();
  // `all` is every vote on the site, for the "N votes across the guide" line.
  return { up: Number(row?.up || 0), down: Number(row?.down || 0), all: Number(row?.total || 0) };
}

export function sameOrigin(request) {
  const origin = request.headers.get("Origin");
  if (!origin) return true; // same-origin fetches from older browsers
  try {
    const o = new URL(origin).host;
    const h = new URL(request.url).host;
    return o === h || o === "vifieldguide.com" || o === "www.vifieldguide.com";
  } catch (e) {
    return false;
  }
}

export function cleanComment(c) {
  if (typeof c !== "string") return null;
  c = c.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
  if (!c) return null;
  return c.slice(0, MAX_COMMENT);
}

export { MAX_VOTES_PER_DAY };
