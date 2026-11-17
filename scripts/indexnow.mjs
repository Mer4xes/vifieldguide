#!/usr/bin/env node
/* Ping IndexNow (Bing, Yandex, and partners) so new or changed pages get
 * crawled within minutes instead of days.
 *
 * Usage:
 *   node scripts/indexnow.mjs https://vifieldguide.com/walkthrough/the-big-one/ ...urls
 *   node scripts/indexnow.mjs            # no args -> submit every URL in dist/sitemap.xml
 *
 * Run this from the content-update session AFTER the new pages are live
 * (i.e. after the Cloudflare deploy finishes), not during the build.
 */
import { readFile } from "node:fs/promises";
import site from "../src/_data/site.js";

const host = new URL(site.url).host;
const key = site.indexNowKey;
const keyLocation = `${site.url}/${key}.txt`;

async function urlsFromSitemap() {
  try {
    const xml = await readFile(new URL("../dist/sitemap.xml", import.meta.url), "utf8");
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  } catch {
    return [site.url + "/"];
  }
}

const urlList = process.argv.slice(2).length
  ? process.argv.slice(2)
  : await urlsFromSitemap();

if (!urlList.length) {
  console.log("IndexNow: nothing to submit.");
  process.exit(0);
}

// IndexNow accepts up to 10,000 URLs per request.
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList: urlList.slice(0, 10000) }),
});
console.log(`IndexNow: submitted ${urlList.length} URL(s) -> HTTP ${res.status} ${res.statusText}`);
if (!res.ok && res.status !== 202 && res.status !== 200) {
  console.error(await res.text().catch(() => ""));
  process.exit(1);
}
