/* Builds the site WITH the fictional sample pages into dist-preview/, then packs
   every page into one self-contained file: preview/index.html.
   That single file opens anywhere (double-click it, or publish it as a Claude artifact)
   and lets you click through the whole site. It is for looking, not for hosting. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Eleventy from "@11ty/eleventy";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(root);
process.env.VFG_SAMPLES = "1";

const OUT = "dist-preview";
process.env.VFG_OUT = OUT;
fs.rmSync(OUT, { recursive: true, force: true });
const eleventy = new Eleventy("src", OUT, { quietMode: true });
await eleventy.write();

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });

// 1. Collect the page-specific part of every built page.
const pages = [];
for (const file of walk(OUT).filter((f) => f.endsWith(".html"))) {
  const html = fs.readFileSync(file, "utf8");
  const body = html.match(/<!--page:start-->([\s\S]*?)<!--page:end-->/);
  const route = html.match(/id="page" data-route="([^"]*)"/);
  if (body && route) pages.push({ route: route[1], body: body[1] });
}
pages.sort((a, b) => a.route.localeCompare(b.route));

// 2. Inline the stylesheet (fonts as data URIs) and the script.
let css = fs.readFileSync(path.join(OUT, "assets/site.css"), "utf8");
css = css.replace(/url\("fonts\/([^"]+)"\)/g, (m, name) => {
  const data = fs.readFileSync(path.join(OUT, "assets/fonts", name)).toString("base64");
  return `url(data:font/woff2;base64,${data})`;
});
const js = fs.readFileSync(path.join(OUT, "assets/site.js"), "utf8");

const router = `
(function () {
  var host = document.getElementById("page");
  var pages = {}, names = {}, routes = {};
  Array.prototype.forEach.call(document.querySelectorAll("template[data-route]"), function (t) {
    var route = t.getAttribute("data-route");
    var name = route.replace(/\\.html$/, "").replace(/^\\/|\\/$/g, "").replace(/\\//g, "-");
    pages[route] = t; names[route] = name; routes[name] = route;
  });
  var current = null;
  function show(route, anchor) {
    if (!pages[route]) route = "/404.html";
    if (route !== current) {
      current = route;
      host.innerHTML = "";
      host.appendChild(pages[route].content.cloneNode(true));
      Array.prototype.forEach.call(document.querySelectorAll(".nav-links a"), function (a) {
        var href = a.getAttribute("href");
        if (route.indexOf(href) === 0) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
      });
      if (window.VFG) window.VFG.refresh();
      if (!anchor) window.scrollTo(0, 0);
    }
    if (anchor) { var el = document.getElementById(anchor); if (el) el.scrollIntoView(); }
  }
  function fromHash() { return routes[location.hash.slice(1)] || "/"; }
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    var href = a.getAttribute("href");
    if (href.charAt(0) === "#") { e.preventDefault(); show(current, href.slice(1)); return; }
    if (href.charAt(0) !== "/") return;
    e.preventDefault();
    var parts = href.split("#");
    show(parts[0], parts[1]);
    try { location.hash = names[current] || ""; } catch (err) {}
  });
  window.addEventListener("hashchange", function () { show(fromHash()); });
  show(fromHash());
})();`;

// 3. Use the home page as the shell.
let shell = fs.readFileSync(path.join(OUT, "index.html"), "utf8");
const templates = pages
  .map((p) => `<template data-route="${p.route}">${p.body}</template>`)
  .join("\n");

shell = shell
  .replace(/<title>[\s\S]*?<\/title>/, "<title>VI Field Guide Site</title>")
  .replace(/<link rel="(canonical|preload|icon)"[^>]*>\n?/g, "")
  .replace(/<meta (property="og:[^"]*"|name="twitter:card"|name="robots")[^>]*>\n?/g, "")
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\n?/g, "")
  .replace(/<link rel="stylesheet"[^>]*>/, () => `<meta name="robots" content="noindex">\n<style>\n${css}\n</style>`)
  .replace(/<!--page:start-->[\s\S]*?<!--page:end-->/, "")
  .replace(
    /<body>/,
    () =>
      `<body>\n<div class="preview-bar"><div class="wrap">Preview of vifieldguide.com. Pages with a striped banner are fictional samples that show a template. They are left out of the live site.</div></div>`
  )
  .replace(/<script src="\/assets\/site\.js[^>]*><\/script>/, () => `${templates}\n<script>\n${js}\n</script>\n<script>${router}\n</script>`);

fs.mkdirSync("preview", { recursive: true });
fs.writeFileSync("preview/index.html", shell);
console.log(`preview/index.html: ${pages.length} pages, ${(shell.length / 1024).toFixed(0)} KB`);
