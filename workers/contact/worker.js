// VI Field Guide contact form -> vifieldguide@gmail.com
// Runs as its own Cloudflare Worker on the route vifieldguide.com/api/contact.
// Needs: Email Routing on vifieldguide.com with vifieldguide@gmail.com verified,
// a send_email binding named MAIL (only verified addresses can receive),
// and the secret TURNSTILE_SECRET. See README.md.
import { EmailMessage } from "cloudflare:email";

const TO = "vifieldguide@gmail.com";
const FROM = "contact@vifieldguide.com";
const ORIGINS = ["https://vifieldguide.com", "https://www.vifieldguide.com"];
const TOPICS = { mistake: "Mistake in the guide", tip: "Tip or missing info", site: "Problem with the site", other: "Other" };

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

const clean = (v, max) => String(v == null ? "" : v).replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, max);
const oneLine = (v, max) => clean(v, max).replace(/\s+/g, " ");
const b64 = (s) => { const bytes = new TextEncoder().encode(s); let bin = ""; for (const b of bytes) bin += String.fromCharCode(b); return btoa(bin); };
const wrap76 = (s) => s.replace(/.{1,76}/g, "$&\r\n");
const encWord = (s) => "=?UTF-8?B?" + b64(s) + "?=";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== "/api/contact") return fetch(request);
    if (request.method !== "POST") return json({ ok: false, error: "method" }, 405);

    const origin = request.headers.get("origin") || "";
    if (origin && !ORIGINS.includes(origin)) return json({ ok: false, error: "origin" }, 403);

    let data;
    try { data = await request.json(); } catch { return json({ ok: false, error: "bad_request" }, 400); }

    // Honeypot: a field people never see. Pretend it worked.
    if (clean(data.website, 200)) return json({ ok: true });

    const message = clean(data.message, 5000);
    const name = oneLine(data.name, 80);
    const email = oneLine(data.email, 200);
    const page = oneLine(data.page, 300);
    const topic = TOPICS[data.topic] ? data.topic : "other";
    if (message.length < 5) return json({ ok: false, error: "message" }, 400);
    const emailOk = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(email);
    if (email && !emailOk) return json({ ok: false, error: "email" }, 400);

    // Turnstile check
    const token = clean(data.token, 4000);
    if (!token) return json({ ok: false, error: "captcha" }, 400);
    const form = new FormData();
    form.append("secret", env.TURNSTILE_SECRET);
    form.append("response", token);
    const ip = request.headers.get("cf-connecting-ip");
    if (ip) form.append("remoteip", ip);
    const check = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
    const verdict = await check.json().catch(() => ({}));
    if (!verdict.success) return json({ ok: false, error: "captcha" }, 400);

    const subject = `[VI Field Guide] ${TOPICS[topic]}${page ? " – " + page : ""}`.slice(0, 180);
    const body = [
      `Topic: ${TOPICS[topic]}`,
      `Page: ${page ? "https://vifieldguide.com" + (page.startsWith("/") ? page : "/" + page) : "(not given)"}`,
      `Name: ${name || "(not given)"}`,
      `Email: ${email || "(not given)"}`,
      "",
      message,
      "",
      "--",
      "Sent from the contact form on vifieldguide.com. Reply goes to the visitor's email if they gave one.",
    ].join("\n");

    const id = `<${crypto.randomUUID()}@vifieldguide.com>`;
    const headers = [
      `From: ${encWord("VI Field Guide contact form")} <${FROM}>`,
      `To: <${TO}>`,
      emailOk ? `Reply-To: ${name ? encWord(name) + " " : ""}<${email}>` : null,
      `Subject: ${encWord(subject)}`,
      `Message-ID: ${id}`,
      `Date: ${new Date().toUTCString()}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: base64",
    ].filter(Boolean).join("\r\n");
    const raw = headers + "\r\n\r\n" + wrap76(b64(body));

    try {
      await env.MAIL.send(new EmailMessage(FROM, TO, raw));
    } catch (e) {
      console.error("send failed", e && e.message);
      return json({ ok: false, error: "send" }, 502);
    }
    return json({ ok: true });
  },
};
