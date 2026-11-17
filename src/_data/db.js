import fs from "node:fs";

/* Loads the databases in src/data/*.json.
   A file marked "sample": true holds fictional demo content: it is shown while
   working locally and in the preview bundle, and emptied in the real build. */
const includeSamples = () =>
  process.env.VFG_SAMPLES === "1" ||
  ["serve", "watch"].includes(process.env.ELEVENTY_RUN_MODE);

const load = (name) =>
  JSON.parse(fs.readFileSync(new URL(`../data/${name}.json`, import.meta.url), "utf8"));

export default function () {
  const show = includeSamples();
  const gate = (ds, key) => {
    const live = !ds.sample || show;
    return { ...ds, [key]: live ? ds[key] || [] : [], sample: !!ds.sample && show };
  };

  // Trophies
  const trophies = gate(load("trophies"), "items");
  trophies.counts = { platinum: 0, gold: 0, silver: 0, bronze: 0 };
  for (const t of trophies.items) trophies.counts[t.grade] = (trophies.counts[t.grade] || 0) + 1;

  // Collectibles
  const collectibles = gate(load("collectibles"), "types");
  collectibles.types = collectibles.types.map((t) => ({
    ...t,
    items: t.items || [],
    regions: [...new Set((t.items || []).map((i) => i.region).filter(Boolean))],
    sample: collectibles.sample,
    updated: t.updated || collectibles.updated,
  }));
  collectibles.total = collectibles.types.reduce((n, t) => n + (t.total || 0), 0);
  collectibles.mapped = collectibles.types.reduce((n, t) => n + t.items.length, 0);

  // Vehicles and weapons share one page design ("kinds").
  const kindMeta = {
    vehicles: {
      name: "Vehicles",
      singular: "vehicle",
      headline: "Rides",
      glow: "violet",
      intro: "Every vehicle we have driven, with where to get it and how it handles.",
      seoTitle: "GTA 6 Vehicles: Every Car, Bike and Boat",
    },
    weapons: {
      name: "Weapons",
      singular: "weapon",
      headline: "Arsenal",
      glow: "gold",
      intro: "Every weapon we have used, with where to get it and what it is good for.",
      seoTitle: "GTA 6 Weapons: Every Gun and Where to Get It",
    },
  };
  const kinds = Object.keys(kindMeta).map((slug) => {
    const ds = gate(load(slug), "items");
    return {
      slug,
      ...kindMeta[slug],
      sample: ds.sample,
      updated: ds.updated,
      stats: ds.stats || [],
      classes: [...new Set(ds.items.map((i) => i.class).filter(Boolean))],
      items: ds.items.map((i) => ({
        ...i,
        kind: slug,
        kindName: kindMeta[slug].name,
        singular: kindMeta[slug].singular,
        statDefs: ds.stats || [],
        sample: ds.sample,
        updated: i.updated || ds.updated,
      })),
    };
  });
  const entries = kinds.flatMap((k) => k.items);

  return { trophies, collectibles, kinds, entries };
}
