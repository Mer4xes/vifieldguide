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
  const tracker = JSON.parse(fs.readFileSync(new URL("./tracker.json", import.meta.url), "utf8"));
  const ctrs = {};
  for (const g of tracker.groups) for (const it of g.items) ctrs[`${g.id}:${it.id}`] = it;
  // Hauk's own in-game shots: src/assets/img/shots/col/<type>/<id>-map|place|close.webp.
  // An item gets `shots` (in that order) for the files that exist; nothing to edit in the data.
  const shotDir = new URL("../assets/img/shots/col/", import.meta.url);
  const SHOTS = [["map", "Map"], ["place", "Where it is"], ["close", "Close-up"]];
  const withShots = (type, it) => {
    const shots = SHOTS.filter(([k]) => fs.existsSync(new URL(`${type}/${it.id}-${k}.webp`, shotDir)))
      .map(([k, label]) => ({ k, label, src: `/assets/img/shots/col/${type}/${it.id}-${k}.webp` }));
    return shots.length ? { ...it, shots } : it;
  };
  collectibles.types = collectibles.types.map((t) => ({
    ...t,
    ctr: t.counter ? { key: t.counter, ...ctrs[t.counter] } : null,
    items: (t.items || []).map((it) => withShots(t.slug, it)),
    regions: [...new Set((t.items || []).map((i) => i.region).filter(Boolean))],
    // Sets that have mapped items, in data order, for the set filter chips on the type page.
    itemSets: [...new Set((t.items || []).map((i) => i.set).filter(Boolean))].map((name) => ({
      name,
      slug: "set-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      count: (t.items || []).filter((i) => i.set === name).length,
    })),
    sample: collectibles.sample,
    updated: t.updated || collectibles.updated,
  }));
  // Checklists by in-game county: every mapped item of every set, in county order.
  const counties = JSON.parse(fs.readFileSync(new URL("./counties.json", import.meta.url), "utf8"));
  collectibles.counties = counties.map((c, i) => {
    const items = collectibles.types.flatMap((t) =>
      t.items.filter((it) => it.county === c.slug).map((it) => ({ ...it, type: t.slug, typeName: t.name })));
    const areas = [...new Set([...(c.areas || []), ...items.map((it) => it.area)])]
      .map((a) => ({ name: a, items: items.filter((it) => it.area === a) }))
      .filter((a) => a.items.length);
    const byType = collectibles.types
      .map((t) => ({ slug: t.slug, name: t.name, count: items.filter((it) => it.type === t.slug).length }))
      .filter((t) => t.count);
    return { ...c, order: i + 1, items, areas, byType };
  });
  // Type pages: items grouped by county, plus one last group for items with no county yet
  // (e.g. city hoops a source lists only as "Vice-Dale", which covers three of our counties).
  for (const t of collectibles.types) {
    t.byCounty = collectibles.counties.map((c) => ({ slug: c.slug, name: c.name, items: t.items.filter((i) => i.county === c.slug) }));
    const loose = t.items.filter((i) => !i.county);
    if (loose.length) t.byCounty.push({ slug: "", name: loose[0].area || "Not placed yet", items: loose });
  }
  collectibles.liveCounties = collectibles.counties.filter((c) => c.items.length);
  // One page per fully mapped set (types[].setPages): items in in-game list order, grouped plan by county.
  const chNum = (w) => +(String(w || "").match(/\d+/) || [0])[0];
  collectibles.setPages = collectibles.types.flatMap((t) => (t.setPages || []).map((sp) => {
    const items = t.items.filter((i) => i.set === sp.name).sort((a, b) => (a.n || 0) - (b.n || 0))
      .map((i) => ({ ...i, countyName: (collectibles.counties.find((c) => c.slug === i.county) || {}).name }));
    const plan = collectibles.counties
      .map((c) => ({ slug: c.slug, name: c.name, when: c.when, items: items.filter((i) => i.county === c.slug) }))
      .filter((c) => c.items.length);
    return { ...sp, type: t.slug, typeName: t.name, items, plan,
      doneFrom: plan.reduce((m, c) => Math.max(m, chNum(c.when)), 0), updated: t.updated };
  }));
  for (const t of collectibles.types) t.setLinks = Object.fromEntries((t.setPages || []).map((sp) => [sp.name, `/collectibles/${t.slug}/${sp.slug}/`]));
  collectibles.total = collectibles.types.reduce((n, t) => n + (t.total || 0), 0);
  collectibles.mapped = collectibles.types.reduce((n, t) => n + t.items.length, 0);

  // Vehicles and weapons share one page design ("kinds").
  const kindMeta = {
    vehicles: {
      name: "Vehicles",
      singular: "vehicle",
      headline: "Rides",
      glow: "violet",
      intro: "All 277 base models by class with a checklist for the 200 that 100% asks for, plus the 280 Standout vehicles.",
      seoTitle: "GTA 6 Vehicles List: All 277 Base Models and Checklist",
      description: "Every GTA 6 vehicle class: 277 base models (cars, bikes, boats, aircraft and service vehicles) with a checklist for the 200 that 100% needs, how scanning works, where to find aircraft, boats and military vehicles, and the 280 Standouts.",
    },
    weapons: {
      name: "Weapons",
      singular: "weapon",
      headline: "Arsenal",
      glow: "gold",
      intro: "All 66 standard weapons by class, where to buy them and a checklist for the 50 that 100% asks for.",
      seoTitle: "GTA 6 Weapons List: All 66 Guns and Explosives by Class",
      description: "Every GTA 6 standard weapon: 53 guns in seven classes, 4 explosives and 9 melee weapons, which ones only Expanded Ammu-Nations sell, and a checklist for the 50 of 66 that 100% needs.",
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
