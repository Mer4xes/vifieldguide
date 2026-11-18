import markdownIt from "markdown-it";
import site from "./src/_data/site.js";

/* Sample (fictional) content is shown while you work locally (`npm run dev`)
   and in the preview bundle, and is left out of the real build (`npm run build`). */
const includeSamples = () =>
  process.env.VFG_SAMPLES === "1" ||
  ["serve", "watch"].includes(process.env.ELEVENTY_RUN_MODE);

/* `npm run dev` writes to dist-dev/ so that dist/ only ever holds the real build. */
const outputDir = () =>
  process.env.VFG_OUT || (["serve", "watch"].includes(process.env.ELEVENTY_RUN_MODE) ? "dist-dev" : "dist");

const md = markdownIt({ html: true, linkify: true, typographer: true });
const renderImage = md.renderer.rules.image;
md.renderer.rules.image = (tokens, idx, options, env, self) => {
  tokens[idx].attrSet("loading", "lazy");
  tokens[idx].attrSet("decoding", "async");
  return renderImage(tokens, idx, options, env, self);
};
// Wide tables scroll inside their own box instead of stretching the page.
md.renderer.rules.table_open = () => '<div class="tablewrap"><table>\n';
md.renderer.rules.table_close = () => "</table></div>\n";

const get = (obj, path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
const iso = (d) => (d ? new Date(d).toISOString().slice(0, 10) : undefined);

/* Markdown conventions -> components.
   > **Tip:** ...        cyan tip box
   > **Watch out:** ...  amber warning box
   > **Missable:** ...   pink missable box
   > **Note:** ...       neutral note
   > **Spoiler:** ...    collapsed spoiler block (label optional: **Spoiler (ending):**) */
const CALLOUTS = {
  tip: ["tip", "Tip"],
  "watch out": ["tip warn", "Watch out"],
  warning: ["tip warn", "Watch out"],
  missable: ["tip miss", "Missable"],
  note: ["tip note", "Note"],
};
function callouts(html) {
  return String(html).replace(
    /<blockquote>\s*<p><strong>([^<]+?)<\/strong>:?\s*([\s\S]*?)<\/blockquote>/g,
    (match, rawLabel, rest) => {
      const label = rawLabel.replace(/:$/, "").trim();
      const key = label.toLowerCase();
      const body = "<p>" + rest.trim();
      if (key.startsWith("spoiler")) {
        const scope = (label.match(/\(([^)]+)\)/) || [])[1];
        return `<details class="spoiler"><summary><span class="sp-tag">Spoiler</span><span class="sp-what">${
          scope ? scope : "Story detail"
        }</span><span class="sp-hint">Tap to reveal</span></summary><div class="sp-body">${body}</div></details>`;
      }
      const c = CALLOUTS[key];
      if (!c) return match;
      return `<div class="${c[0]}"><span class="lab">${c[1]}</span><div class="tip-body">${body}</div></div>`;
    }
  );
}

/* Mission pages: every "## Heading" in the Markdown body becomes a numbered,
   tickable step. Text before the first heading becomes the intro. */
function steps(html, slug) {
  const parts = String(html).split(/<h2[^>]*>([\s\S]*?)<\/h2>/);
  const intro = parts.shift().trim();
  let out = intro ? `<div class="prose steps-intro">${intro}</div>` : "";
  if (!parts.length) return out;
  out += '<ol class="steps">';
  for (let i = 0, n = 1; i < parts.length; i += 2, n++) {
    out +=
      `<li class="step" id="step-${n}" data-track-row>` +
      `<label class="step-n"><input type="checkbox" data-track="step:${slug}:${n}" aria-label="Mark step ${n} done"><span>${n}</span></label>` +
      `<div class="step-body"><h3>${parts[i]}</h3>${parts[i + 1] || ""}</div></li>`;
  }
  return out + "</ol>";
}

export default function (eleventyConfig) {
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets", "src/_headers": "_headers" });
  eleventyConfig.addWatchTarget("./src/data/");

  // Leave fictional sample pages out of the real build.
  eleventyConfig.addPreprocessor("samples", "md,njk", (data) => {
    if (data.sample === true && !includeSamples()) return false;
  });

  eleventyConfig.addCollection("missions", (api) =>
    api
      .getFilteredByGlob("src/walkthrough/missions/*.md")
      .sort((a, b) => a.fileSlug.localeCompare(b.fileSlug))
  );
  eleventyConfig.addCollection("guides", (api) =>
    api
      .getFilteredByGlob("src/guides/*.md")
      .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
  );

  eleventyConfig.addFilter("callouts", callouts);
  eleventyConfig.addFilter("steps", steps);
  eleventyConfig.addFilter("stepCount", (html) => (String(html).match(/<h2[\s>]/g) || []).length);
  eleventyConfig.addFilter("md", (s) => md.renderInline(String(s ?? "")));
  eleventyConfig.addFilter("faqld", (faq) => JSON.stringify({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: (faq || []).map((q) => ({ "@type": "Question", name: q.q,
      acceptedAnswer: { "@type": "Answer", text: md.renderInline(String(q.a)).replace(/<[^>]+>/g, "") } })),
  }).replace(/</g, "\\u003c"));
  // ItemList of VideoObject for the trailers page (richer video results).
  eleventyConfig.addFilter("videold", (videos) => {
    const toDur = (s) => {
      const p = String(s ?? "").split(":").map(Number);
      let h = 0, m = 0, sec = 0;
      if (p.length === 3) [h, m, sec] = p;
      else if (p.length === 2) [m, sec] = p;
      else sec = p[0] || 0;
      return "PT" + (h ? h + "H" : "") + (m ? m + "M" : "") + (sec ? sec + "S" : "") || "PT0S";
    };
    const items = (videos || []).map((v, i) => ({
      "@type": "ListItem", position: i + 1,
      item: {
        "@type": "VideoObject",
        name: v.title,
        description: v.text,
        thumbnailUrl: ["https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg"],
        uploadDate: v.date,
        duration: toDur(v.length),
        embedUrl: "https://www.youtube.com/embed/" + v.id,
        publisher: { "@type": "Organization", name: "Rockstar Games" },
      },
    }));
    return JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", itemListElement: items }).replace(/</g, "\\u003c");
  });
  eleventyConfig.addFilter("pad", (n, len = 2) => String(n ?? "").padStart(len, "0"));
  eleventyConfig.addFilter("isoDate", (d) => iso(d));
  eleventyConfig.addFilter("niceDate", (d) =>
    d
      ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
      : ""
  );
  // Missions a cast member appears in: as the giver, or as the protagonist you play.
  eleventyConfig.addFilter("castMissions", (missions, c) => (missions || []).filter((m) =>
    m.data.giver === c.name || m.data.giver === c.short ||
    (c.lead && (m.data.protagonist === c.lead || m.data.protagonist === "both"))));
  // Activities (cards on /activities/) tagged with a region, for "Things to do here" on region pages.
  eleventyConfig.addFilter("activitiesIn", (all, region) => {
    const page = (all || []).find((p) => p.url === "/activities/");
    const out = [];
    for (const sec of page?.data?.sections || [])
      for (const c of sec.cards || [])
        if ((c.region || []).includes(region))
          out.push({ t: c.t, id: c.id || eleventyConfig.getFilter("slugify")(c.t), section: sec.title, img: c.img });
    return out;
  });
  eleventyConfig.addFilter("where", (arr, path, value) => (arr || []).filter((x) => get(x, path) === value));
  eleventyConfig.addFilter("groupBy", (arr, path) => {
    const groups = [];
    for (const item of arr || []) {
      const key = get(item, path) ?? "";
      let g = groups.find((x) => x.key === key);
      if (!g) groups.push((g = { key, items: [] }));
      g.items.push(item);
    }
    return groups;
  });
  // Most recently updated missions and guides, for "Recently updated" on the home page.
  eleventyConfig.addFilter("recent", (pages, n = 5) =>
    (pages || [])
      .filter((p) => p.url && p.data.schema === "article" && p.data.updated && !p.data.sample && p.data.title)
      .sort((a, b) => new Date(b.data.updated) - new Date(a.data.updated))
      .slice(0, n)
  );

  // Structured data: breadcrumbs on every page, Article on missions and guides.
  eleventyConfig.addShortcode("ldjson", function (title, headline, description, parent, schema, updated, published) {
    const base = site.url;
    const url = base + this.page.url;
    const out = [];
    const orgLogo = site.logo ? { "@type": "ImageObject", url: base + site.logo } : undefined;
    const sameAs = site.social && site.social.length ? site.social.map((x) => x.url || x) : undefined;
    const org = { "@type": "Organization", name: site.longName, url: base + "/", logo: orgLogo, sameAs };
    if (this.page.url === "/") {
      out.push({
        "@context": "https://schema.org", "@type": "WebSite",
        name: site.longName, alternateName: site.name, url: base + "/",
        description: site.description, inLanguage: "en-US",
        publisher: { "@type": "Organization", name: site.longName, url: base + "/" },
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: base + "/search/?q={search_term_string}" },
          "query-input": "required name=search_term_string",
        },
      });
      out.push({ "@context": "https://schema.org", ...org });
    } else {
      const trail = [{ name: "Home", item: base + "/" }];
      if (parent && parent.url) trail.push({ name: parent.label, item: base + parent.url });
      trail.push({ name: title, item: url });
      out.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, ...t })),
      });
    }
    if (schema === "article") {
      out.push({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: headline || title,
        description,
        image: site.ogImage ? [base + site.ogImage] : undefined,
        mainEntityOfPage: url,
        inLanguage: "en-US",
        dateModified: iso(updated),
        datePublished: iso(published || updated),
        author: org,
        publisher: org,
        about: { "@type": "VideoGame", name: "Grand Theft Auto VI" },
      });
    }
    return out
      .map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`)
      .join("\n");
  });

  eleventyConfig.addGlobalData("env", () => ({ samples: includeSamples() }));

  // Site search: after each build, write /search.json from the rendered pages.
  // One entry per page, plus one per anchored card, section and FAQ question.
  // Spoiler blocks, popups and scripts are left out so search never reveals story details.
  eleventyConfig.on("eleventy.after", async ({ dir, results }) => {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const ent = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", "#x27": "'", nbsp: " ", rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”", ndash: "–", mdash: "—", hellip: "…" };
    const text = (h) => String(h || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&(#?\w+);/g, (m, k) => ent[k] ?? (k[0] === "#" ? String.fromCharCode(k[1] === "x" ? parseInt(k.slice(2), 16) : +k.slice(1)) : m))
      .replace(/\s+/g, " ").trim();
    const safe = (h) => String(h)
      .replace(/<(script|style|noscript)\b[\s\S]*?<\/\1>/g, " ")
      .replace(/<details class="spoiler"[\s\S]*?<\/details>/g, " ")
      .replace(/<(nav|figcaption)\b[\s\S]*?<\/\1>/g, " ");
    const clean = (h) => String(h).replace(/<dialog\b[\s\S]*?<\/dialog>/g, " ");
    const chrome = (h) => String(h)
      .replace(/<p class="(kmeta|kicker)"[\s\S]*?<\/p>/g, " ")
      .replace(/<(a|button) class="(kmore|kdlg-x)"[\s\S]*?<\/\1>/g, " ");
    const kinds = { walkthrough: "Mission", guides: "Guide", characters: "Character", map: "Map", vehicles: "Vehicle",
      weapons: "Weapon", trophies: "Trophies", collectibles: "Collectibles", activities: "Activities", "how-it-plays": "How it plays",
      wildlife: "Wildlife", music: "Music", videos: "Videos", about: "About" };
    const out = [];
    for (const r of results || []) {
      if (!r.url || !r.url.endsWith("/") || !r.content || r.url === "/search/") continue;
      const html = r.content;
      if (/<meta name="robots" content="noindex/.test(html)) continue;
      const title = text((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1]).replace(/ \| VI Field Guide$/, "");
      const desc = text((html.match(/<meta name="description" content="([^"]*)"/) || [])[1]);
      const h1 = text((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]);
      const raw = safe((html.match(/<main id="main">([\s\S]*?)<\/main>/) || [])[1] || "");
      const main = clean(raw);
      const seg = r.url.split("/")[1];
      const isIndex = r.url === "/" + seg + "/";
      const kind = r.url === "/" ? "Home" : isIndex && seg !== "guides" ? "Section" : kinds[seg] || "Page";
      const name = r.url === "/" ? "The VI Field Guide" : (h1 && h1.length < 60 ? h1 : title);
      out.push({ u: r.url, t: name, k: kind, d: desc, h: title, x: text(chrome(main)).slice(0, 6000) });
      // Cards on "What we know" pages (linkable as #id; activity cards open their popup).
      for (const m of raw.matchAll(/<article class="kcard[^"]*" id="([^"]+)"[^>]*>([\s\S]*?)<\/article>/g)) {
        const card = clean(m[2]);
        const t = text((card.match(/<h3[^>]*>([\s\S]*?)<\/h3>/) || [])[1]);
        const d = text((card.match(/<h3[^>]*>[\s\S]*?<\/h3>\s*<p>([\s\S]*?)<\/p>/) || [])[1]);
        const more = text(chrome((m[2].match(/<dialog\b([\s\S]*?)<\/dialog>/) || [])[1] || "").replace(/<h3[^>]*>[\s\S]*?<\/h3>/g, " "));
        if (t) out.push({ u: r.url + "#" + m[1], t, k: name, d, x: more.slice(0, 1500) });
      }
      // Sections with an id and a heading.
      for (const m of main.matchAll(/<section class="sec[^"]*" id="([^"]+)"[^>]*>[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/g)) {
        const t = text(m[2]);
        if (t && m[1] !== "faq") out.push({ u: r.url + "#" + m[1], t, k: name, d: "" });
      }
      // FAQ questions.
      const faq = (main.match(/<section class="sec" id="faq">([\s\S]*?)<\/section>/) || [])[1] || "";
      for (const m of faq.matchAll(/<details[^>]*><summary>([\s\S]*?)<\/summary><div>([\s\S]*?)<\/div><\/details>/g))
        out.push({ u: r.url + "#faq", t: text(m[1]), k: name + " · FAQ", d: text(m[2]).slice(0, 400) });
    }
    await fs.writeFile(path.join(dir.output, "search.json"), JSON.stringify(out));
  });

  return {
    dir: { input: "src", output: outputDir(), includes: "_includes", data: "_data" },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
