/* Checks that every internal link in dist/ points at a page that exists.
   Run after a build:  npm run build && npm run check        (or: npm run check -- dist-preview) */
import fs from "node:fs";
import path from "node:path";

const dir = process.argv[2] || "dist";
const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(d, e.name);
    return e.isDirectory() ? walk(full) : [full];
  });

const exists = (url) => {
  const clean = url.split("#")[0].split("?")[0];
  const target = path.join(dir, clean);
  if (clean.endsWith("/")) return fs.existsSync(path.join(target, "index.html"));
  return fs.existsSync(target);
};

let broken = 0;
let checked = 0;
for (const file of walk(dir).filter((f) => f.endsWith(".html"))) {
  const html = fs.readFileSync(file, "utf8");
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    checked++;
    if (!exists(m[1])) {
      broken++;
      console.log(`BROKEN  ${m[1]}   in ${path.relative(dir, file)}`);
    }
  }
}
console.log(`${checked} internal links checked, ${broken} broken`);
process.exit(broken ? 1 : 0);
