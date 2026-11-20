/* The VI Field Guide: progress tracking, spoiler controls, filters, countdown.
   Everything is stored in this browser only (localStorage). Nothing is sent anywhere.

   Markup hooks
     input[data-track="mission:slug"]      a tickable thing; its key is the stored id
     [data-track-row]                      gets .is-done when its checkbox is ticked
     [data-progress="mission:"]            counts ticked keys with that prefix
        data-total="42"                    (optional) total; else counts checkboxes on the page
        [data-done] [data-pct] .bar > i    filled in automatically
     [data-reset="mission:"]               clears keys with that prefix (asks twice)
     [data-pref="spoilers|hideAhead"]      toggle button for a saved preference
     details.spoiler                       opened/closed together by the spoilers preference
     [data-reveal]                         reveals one blurred row (.is-secret)
     [data-filter-group="x"] [data-filter] filter chips for [data-filter-list="x"] > [data-tags]
     [data-search="x"]                     text search over the same list (matches data-text)
     [data-filter-parent]                  inside a list: hidden when none of its [data-tags] rows show
     [data-progress-in="#id"]              ticked / all checkboxes inside #id
     [data-cd="d|h|m|s"]                   countdown digits to <html data-launch>            */
(function () {
  "use strict";

  var KEY = "vfg.progress.v1";
  var PREFS = "vfg.prefs.v1";
  var memory = {};
  var root = document.documentElement;

  function read(key) {
    try {
      var value = JSON.parse(localStorage.getItem(key) || "{}");
      return value && typeof value === "object" ? value : {};
    } catch (e) {
      return memory[key] || {};
    }
  }
  function write(key, value) {
    memory[key] = value;
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
  function all(selector, context) {
    return Array.prototype.slice.call((context || document).querySelectorAll(selector));
  }

  var state = read(KEY);
  // Route rows that became shared collectible ticks (Nov 20): carry old ticks over.
  var MOVED = {"route:read-ashes":"col:magazines-books-comics:ashes-of-glory","route:read-lethal":"col:magazines-books-comics:lethal-by-design","route:read-orca":"col:magazines-books-comics:orca","route:read-hook":"col:magazines-books-comics:off-the-hook","route:read-body":"col:magazines-books-comics:body-copy","route:read-rx":"col:magazines-books-comics:rx-men","route:motel-help":"col:magazines-books-comics:help-me","route:motel-wang":"col:magazines-books-comics:wizard-wang","route:motel-vicki":"col:collectible-cards:delights-1","route:motel-victor":"col:collectible-cards:corkers-2","route:read-johnsons":"col:magazines-books-comics:johnsons-1","route:read-dicked":"col:magazines-books-comics:dicked-down","route:bay-passion":"col:magazines-books-comics:passion-bc","route:bay-pricks":"col:magazines-books-comics:two-pricks","route:read-remote":"col:magazines-books-comics:remote-strike","route:read-lights":"col:magazines-books-comics:lights-camera","route:read-bombazo":"col:magazines-books-comics:bombazo","route:vault-poster":"col:unique-playlists:vault","route:balcony":"col:meditation-spots:jasons-house"};
  var moved = false;
  for (var old in MOVED) if (state[old]) { state[MOVED[old]] = 1; delete state[old]; moved = true; }
  if (moved) write(KEY, state);
  var prefs = read(PREFS);

  function countPrefix(prefix) {
    var n = 0;
    for (var k in state) if (state[k] && k.indexOf(prefix) === 0) n++;
    return n;
  }

  /* ----- preferences ----- */
  function applyPrefs() {
    root.classList.toggle("spoilers-on", !!prefs.spoilers);
    root.classList.toggle("hide-ahead", !!prefs.hideAhead);
    all("[data-pref]").forEach(function (button) {
      var on = !!prefs[button.getAttribute("data-pref")];
      button.setAttribute("aria-pressed", on ? "true" : "false");
      var label = button.querySelector("[data-label]");
      if (label) label.textContent = button.getAttribute(on ? "data-on" : "data-off");
    });
    if (prefs.spoilers) all("details.spoiler").forEach(function (d) { d.open = true; });
  }

  /* ----- progress ----- */
  function refresh() {
    all("input[data-track]").forEach(function (box) {
      var on = !!state[box.getAttribute("data-track")];
      box.checked = on;
      var row = box.closest("[data-track-row]");
      if (row) row.classList.toggle("is-done", on);
    });

    var next = null;
    all(".mrow").forEach(function (row) {
      row.classList.remove("is-next");
      if (!next && !row.classList.contains("is-done")) next = row;
    });
    if (next) next.classList.add("is-next");

    all("[data-progress]").forEach(function (el) {
      var prefix = el.getAttribute("data-progress");
      var total = +el.getAttribute("data-total") || all('input[data-track^="' + prefix + '"]').length;
      var done = Math.min(countPrefix(prefix), total);
      var pct = total ? Math.round((done / total) * 100) : 0;
      var fill = el.querySelector(".bar > i");
      if (fill) fill.style.width = pct + "%";
      all("[data-done]", el).forEach(function (n) { n.textContent = done; });
      all("[data-pct]", el).forEach(function (n) { n.textContent = pct + "%"; });
    });
    // [data-progress-in="#list"]: ticked boxes inside that list, out of all boxes in it
    all("[data-progress-in]").forEach(function (el) {
      var scope = document.querySelector(el.getAttribute("data-progress-in"));
      if (!scope) return;
      var boxes = all("input[data-track]", scope);
      var done = boxes.filter(function (b) { return b.checked; }).length;
      var pct = boxes.length ? Math.round((done / boxes.length) * 100) : 0;
      var fill = el.querySelector(".bar > i");
      if (fill) fill.style.width = pct + "%";
      all("[data-done]", el).forEach(function (n) { n.textContent = done; });
      all("[data-pct]", el).forEach(function (n) { n.textContent = pct + "%"; });
    });

    applyPrefs();
    all("[data-filter-group]").forEach(function (g) { applyFilter(g.getAttribute("data-filter-group")); });
    tick();
  }

  /* ----- filters and search ----- */
  function applyFilter(group) {
    var list = document.querySelector('[data-filter-list="' + group + '"]');
    if (!list) return;
    var active = document.querySelector('[data-filter-group="' + group + '"] .is-on');
    var tag = active ? active.getAttribute("data-filter") : "*";
    var input = document.querySelector('[data-search="' + group + '"]');
    var query = input ? input.value.trim().toLowerCase() : "";
    var shown = 0;
    all("[data-tags]", list).forEach(function (item) {
      var tags = " " + item.getAttribute("data-tags") + " ";
      var okTag = tag === "*" ||
        (tag === "todo" ? !item.classList.contains("is-done") : tags.indexOf(" " + tag + " ") !== -1);
      var text = item.getAttribute("data-text") || item.textContent.toLowerCase();
      var okText = !query || text.indexOf(query) !== -1;
      item.hidden = !(okTag && okText);
      if (!item.hidden) shown++;
    });
    // [data-filter-parent]: a group heading hides when none of its rows are showing
    all("[data-filter-parent]", list).forEach(function (p) {
      p.hidden = !all("[data-tags]", p).some(function (i) { return !i.hidden; });
    });
    var none = document.querySelector('[data-nomatch="' + group + '"]');
    if (none) none.hidden = shown > 0;
  }

  /* ----- countdown and launch state ----- */
  function pad(n) { return String(n).padStart(2, "0"); }
  function tick() {
    var launch = new Date(root.getAttribute("data-launch") || "").getTime();
    if (isNaN(launch)) return;
    var diff = launch - Date.now();
    root.classList.toggle("is-live", diff <= 0);
    var digits = all("[data-cd]");
    if (!digits.length || diff <= 0) return;
    var s = Math.floor(diff / 1000);
    var parts = { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
    digits.forEach(function (el) { el.textContent = pad(parts[el.getAttribute("data-cd")]); });
  }

  /* ----- events ----- */
  document.addEventListener("change", function (e) {
    var box = e.target;
    if (!box.matches || !box.matches("input[data-track]")) return;
    var key = box.getAttribute("data-track");
    if (box.checked) state[key] = 1; else delete state[key];
    write(KEY, state);
    refresh();
  });

  document.addEventListener("input", function (e) {
    var input = e.target;
    if (input.matches && input.matches("[data-search]")) applyFilter(input.getAttribute("data-search"));
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest) return;
    var el = e.target.closest("[data-pref],[data-reset],[data-reveal],[data-filter],.menu-btn,.nav-links a");
    if (!el) return;

    if (el.hasAttribute("data-pref")) {
      var pref = el.getAttribute("data-pref");
      prefs[pref] = !prefs[pref];
      write(PREFS, prefs);
      if (pref === "spoilers") all("details.spoiler").forEach(function (d) { d.open = !!prefs.spoilers; });
      applyPrefs();
    } else if (el.hasAttribute("data-reset")) {
      if (!el.classList.contains("armed")) {
        el.setAttribute("data-label", el.textContent);
        el.textContent = "Tap again to clear";
        el.classList.add("armed");
        setTimeout(function () {
          if (!el.classList.contains("armed")) return;
          el.classList.remove("armed");
          el.textContent = el.getAttribute("data-label");
        }, 4000);
        return;
      }
      var prefix = el.getAttribute("data-reset");
      Object.keys(state).forEach(function (k) { if (k.indexOf(prefix) === 0) delete state[k]; });
      write(KEY, state);
      el.classList.remove("armed");
      el.textContent = el.getAttribute("data-label");
      refresh();
    } else if (el.hasAttribute("data-reveal")) {
      var row = el.closest(".is-secret");
      if (row) {
        var open = row.classList.toggle("revealed");
        el.textContent = open ? "Hidden · hide" : "Hidden · reveal";
      }
    } else if (el.hasAttribute("data-filter")) {
      var group = el.closest("[data-filter-group]");
      all("[data-filter]", group).forEach(function (chip) {
        var on = chip === el;
        chip.classList.toggle("is-on", on);
        chip.setAttribute("aria-pressed", on ? "true" : "false");
      });
      applyFilter(group.getAttribute("data-filter-group"));
    } else {
      // menu button, or a link inside the open menu
      var nav = document.querySelector(".nav");
      var button = document.querySelector(".menu-btn");
      var open2 = el === button ? !nav.classList.contains("open") : false;
      nav.classList.toggle("open", open2);
      if (button) button.setAttribute("aria-expanded", open2 ? "true" : "false");
    }
  });

  // Returning via the back button, or ticking things in another tab.
  window.addEventListener("pageshow", function () { state = read(KEY); prefs = read(PREFS); refresh(); });
  window.addEventListener("storage", function () { state = read(KEY); prefs = read(PREFS); refresh(); });

  setInterval(tick, 1000);
  refresh();
  window.VFG = { refresh: refresh };
})();

// Click-to-load YouTube: nothing is requested from YouTube until the visitor presses play.
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".yt-play");
  if (!btn) return;
  const box = btn.closest(".yt");
  const f = document.createElement("iframe");
  f.src = "https://www.youtube-nocookie.com/embed/" + box.dataset.yt + "?autoplay=1&rel=0";
  f.title = btn.getAttribute("aria-label").replace(" (loads YouTube)", "");
  f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  f.allowFullscreen = true;
  box.appendChild(f);
  box.classList.add("on");
});

// Lightbox for images marked data-zoom; images sharing a data-zoom value form a set.
(() => {
  let set = [], i = 0, last = null;
  const lb = document.createElement("div");
  lb.className = "lb";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-label", "Enlarged image");
  lb.innerHTML = '<img alt=""><button class="lb-x" type="button" aria-label="Close">✕</button>' +
    '<button class="lb-prev" type="button" aria-label="Previous image">‹</button>' +
    '<button class="lb-next" type="button" aria-label="Next image">›</button><p class="lb-cap"></p>';
  const big = lb.querySelector("img"), cap = lb.querySelector(".lb-cap");
  const show = () => {
    const el = set[i];
    big.src = el.dataset.full || el.currentSrc || el.src;
    big.alt = el.alt;
    cap.textContent = (set.length > 1 ? (i + 1) + " / " + set.length + " · " : "") + "Image: Rockstar Games";
    lb.querySelector(".lb-prev").hidden = lb.querySelector(".lb-next").hidden = set.length < 2;
  };
  const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; if (last) last.focus?.(); };
  const step = (d) => { i = (i + d + set.length) % set.length; show(); };
  document.addEventListener("DOMContentLoaded", () => document.body.appendChild(lb));
  document.addEventListener("click", (e) => {
    const img = e.target.closest("img[data-zoom]");
    if (img) {
      set = [...document.querySelectorAll('img[data-zoom="' + img.dataset.zoom + '"]')];
      i = set.indexOf(img); last = img;
      show(); lb.classList.add("open"); document.body.style.overflow = "hidden";
      lb.querySelector(".lb-x").focus();
      return;
    }
    if (!lb.classList.contains("open")) return;
    if (e.target.closest(".lb-prev")) return step(-1);
    if (e.target.closest(".lb-next")) return step(1);
    if (e.target === lb || e.target.closest(".lb-x") || e.target === big) close();
  });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });
})();

// Detail popups on "What we know" cards (<dialog class="kdlg">), linkable as #card-id.
(() => {
  const dlgFor = (id) => id && document.getElementById("dlg-" + id);
  const open = (d, push) => {
    if (!d || d.open) return;
    if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
    document.body.style.overflow = "hidden";
    const id = d.id.slice(4);
    if (push && location.hash !== "#" + id) history.replaceState(null, "", "#" + id);
    d.querySelector(".kdlg-x")?.focus();
  };
  const close = (d) => {
    if (!d) return;
    if (d.open) { if (typeof d.close === "function") d.close(); else d.removeAttribute("open"); }
  };
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-dlg]");
    if (btn) { e.preventDefault(); open(document.getElementById(btn.dataset.dlg), true); return; }
    const d = e.target.closest("dialog.kdlg");
    if (d && (e.target === d || e.target.closest("[data-close]"))) close(d);
  });
  document.addEventListener("close", (e) => {
    if (!e.target.matches?.("dialog.kdlg")) return;
    document.body.style.overflow = "";
    const id = e.target.id.slice(4);
    if (location.hash === "#" + id) history.replaceState(null, "", location.pathname + location.search);
    document.querySelector('[data-dlg="' + e.target.id + '"]')?.focus({ preventScroll: true });
  }, true);
  const fromHash = () => open(dlgFor(decodeURIComponent(location.hash.slice(1))), false);
  window.addEventListener("hashchange", fromHash);
  document.addEventListener("DOMContentLoaded", fromHash);

  // Region filter on pages with data-kfilter buttons.
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".kfilter [data-kfilter]");
    if (!b) return;
    const f = b.dataset.kfilter;
    b.parentElement.querySelectorAll("[data-kfilter]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    let shown = 0;
    document.querySelectorAll(".kcard[data-region]").forEach((c) => {
      const ok = f === "all" || c.dataset.region.split(" ").includes(f);
      c.hidden = !ok; if (ok) shown++;
    });
    document.querySelectorAll(".ksec").forEach((s) => {
      const cards = s.querySelectorAll(".kcard[data-region]");
      s.hidden = cards.length > 0 && [...cards].every((c) => c.hidden);
    });
    const n = document.querySelector(".kfilter-n");
    if (n) n.textContent = f === "all" ? "" : shown + (shown === 1 ? " activity" : " activities");
  });
})();

// Site search (/search/): loads /search.json on demand and ranks matches in the browser.
// Press "/" anywhere to jump to search.
(() => {
  const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, "");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const words = (q) => norm(q).split(/[^a-z0-9$]+/).filter((w) => w.length > 0);

  document.addEventListener("keydown", (e) => {
    if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    if (t.closest && t.closest("input,textarea,select,[contenteditable]")) return;
    const box = document.querySelector("[data-sitesearch] input");
    e.preventDefault();
    if (box) box.focus(); else location.href = "/search/";
  });

  const form = document.querySelector("[data-sitesearch]");
  if (!form) return;
  const input = form.querySelector("input");
  const list = document.querySelector("[data-sres]");
  const count = document.querySelector("[data-sres-n]");
  const empty = document.querySelector("[data-sres-empty]");
  let index = null, loading = null;

  const load = () => loading || (loading = fetch("/search.json", { cache: "no-cache" })
    .then((r) => r.json())
    .then((d) => (index = d.map((e) => ({ ...e, nt: norm(e.t), nd: norm(e.d), nh: norm(e.h), nx: norm(e.x), nk: norm(e.k) }))))
    .catch(() => (index = [])));

  // Every word must start a word somewhere in the entry ("airboat" finds "airboats", "file" does not find "profile").
  const score = (e, ws, phrase) => {
    let s = 0;
    for (const w of ws) {
      const re = new RegExp("(^|[^a-z0-9])" + w.replace(/[$]/g, "\\$"));
      const inT = re.test(e.nt), inD = re.test(e.nd), inH = re.test(e.nh), inX = re.test(e.nx), inK = re.test(e.nk);
      if (!inT && !inD && !inH && !inX && !inK) return 0;
      s += (inT ? 12 : 0) + (inH ? 6 : 0) + (inD ? 4 : 0) + (inX ? 1 : 0) + (inK ? 1 : 0);
    }
    if (e.nt === phrase) s += 40;
    else if (e.nt.startsWith(phrase)) s += 20;
    else if (e.nt.includes(phrase)) s += 10;
    else if (e.nh.includes(phrase) || e.nd.includes(phrase)) s += 8;
    else if (ws.length > 1 && e.nx.includes(phrase)) s += 4;
    if (!e.u.includes("#")) s += 2; // a whole page beats a card with the same score
    return s;
  };

  const snippet = (e, ws) => {
    const hit = (t) => t && ws.some((w) => norm(t).includes(w));
    const src = (hit(e.d) || !hit(e.x) ? e.d : e.x) || e.x || "";
    const n = src.toLowerCase();
    let at = -1;
    for (const w of ws) { at = n.indexOf(w); if (at >= 0) break; }
    let cut = src;
    if (src.length > 190) {
      const start = Math.max(0, (at < 0 ? 0 : at) - 60);
      cut = (start > 0 ? "…" : "") + src.slice(start, start + 190).trim() + (start + 190 < src.length ? "…" : "");
    }
    return mark(cut, ws);
  };
  // Escapes raw text and wraps word-start matches in <mark>.
  function mark(raw, ws) {
    const list = ws.filter((w) => w.length > 1).map((w) => w.replace(/[$]/g, "\\$"));
    if (!list.length) return esc(raw);
    const re = new RegExp("(^|[^a-z0-9])(" + list.join("|") + ")", "gi");
    let out = "", last = 0, m;
    const n = norm(raw).length === raw.length ? norm(raw) : raw.toLowerCase();
    while ((m = re.exec(n))) {
      const at = m.index + m[1].length, end = at + m[2].length;
      out += esc(raw.slice(last, at)) + "<mark>" + esc(raw.slice(at, end)) + "</mark>";
      last = end;
      if (m[0].length === 0) re.lastIndex++;
    }
    return out + esc(raw.slice(last));
  }

  const render = (q) => {
    const ws = words(q);
    const has = ws.length > 0;
    empty.hidden = has;
    if (!has) { list.innerHTML = ""; count.textContent = ""; return; }
    const phrase = norm(q).trim();
    const hits = index.map((e) => [score(e, ws, phrase), e]).filter((x) => x[0] > 0).sort((a, b) => b[0] - a[0]);
    const seen = new Set();
    const top = [];
    for (const [, e] of hits) {
      const key = e.u + "|" + e.t;
      if (seen.has(key)) continue;
      seen.add(key); top.push(e);
      if (top.length >= 30) break;
    }
    count.textContent = top.length
      ? (hits.length > 30 ? "Top 30 of " + hits.length : top.length) + (top.length === 1 ? " result" : " results") + " for “" + q.trim() + "”"
      : "Nothing found for “" + q.trim() + "”. Try a shorter word, or a place or character name.";
    list.innerHTML = top.map((e) =>
      '<li><a class="sres-a" href="' + esc(e.u) + '"><span class="sres-k">' + esc(e.k) + "</span>" +
      '<span class="sres-t">' + mark(e.t, ws) + "</span>" +
      (e.d || e.x ? '<span class="sres-d">' + snippet(e, ws) + "</span>" : "") + "</a></li>").join("");
  };

  let timer;
  const run = () => {
    const q = input.value;
    const url = q.trim() ? "/search/?q=" + encodeURIComponent(q.trim()) : "/search/";
    history.replaceState(null, "", url);
    (index ? Promise.resolve() : load()).then(() => render(q));
  };
  input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(run, 120); });
  input.addEventListener("focus", load, { once: true });
  form.addEventListener("submit", (e) => { e.preventDefault(); clearTimeout(timer); run(); input.blur(); });

  const q0 = new URLSearchParams(location.search).get("q") || "";
  if (q0) { input.value = q0; run(); } else if (matchMedia("(hover:hover)").matches) input.focus();
})();

// Release-times table: show each unlock moment in the visitor's own time zone and mark the ones already passed.
(() => {
  const table = document.querySelector("[data-rollout]");
  if (!table) return;
  const fmt = new Intl.DateTimeFormat(undefined, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const paint = () => {
    const now = Date.now();
    table.querySelectorAll("tr[data-utc]").forEach((row) => {
      const t = new Date(row.dataset.utc);
      const cell = row.querySelector("[data-local]");
      const live = now >= t.getTime();
      row.classList.toggle("is-out", live);
      cell.innerHTML = "";
      cell.append(fmt.format(t));
      if (live) { const c = document.createElement("span"); c.className = "chip ok dot"; c.textContent = "Out now"; cell.append(" ", c); }
    });
  };
  paint();
  setInterval(paint, 30000);
})();

// Map checklist: collection counters (vfg.counts.v1) and region tabs.
(() => {
  const KEY = "vfg.counts.v1";
  const boxes = [...document.querySelectorAll("[data-count]")];
  const tabs = [...document.querySelectorAll("[data-rtab]")];
  if (!boxes.length && !tabs.length) return;
  let counts = {};
  try { counts = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { counts = {}; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(counts)); } catch (e) {} };
  const total = document.querySelector("[data-ctr-total]");
  const paint = () => {
    let done = 0, max = 0;
    boxes.forEach((b) => {
      const k = b.dataset.count, m = +b.dataset.max || 0;
      const v = Math.max(0, Math.min(m, counts[k] | 0));
      done += v; max += m;
      b.querySelector("[data-val]").textContent = v;
      const inp = b.querySelector("input");
      if (document.activeElement !== inp) inp.value = v;
      b.querySelector(".bar > i").style.width = (m ? (v / m) * 100 : 0) + "%";
      b.classList.toggle("is-done", m > 0 && v >= m);
    });
    if (total) {
      total.querySelector("[data-ctr-done]").textContent = done;
      total.querySelector("[data-ctr-max]").textContent = max;
      const pct = max ? Math.round((done / max) * 100) : 0;
      total.querySelector("[data-ctr-pct]").textContent = pct + "%";
      total.querySelector(".bar > i").style.width = pct + "%";
    }
  };
  const set = (b, v) => {
    const m = +b.dataset.max || 0;
    v = Math.max(0, Math.min(m, Math.round(+v || 0)));
    if (v) counts[b.dataset.count] = v; else delete counts[b.dataset.count];
    save(); paint();
  };
  boxes.forEach((b) => {
    b.querySelector("[data-inc]").addEventListener("click", () => set(b, (counts[b.dataset.count] | 0) + 1));
    b.querySelector("[data-dec]").addEventListener("click", () => set(b, (counts[b.dataset.count] | 0) - 1));
    const inp = b.querySelector("input");
    inp.addEventListener("change", () => set(b, inp.value));
    inp.addEventListener("keydown", (e) => { if (e.key === "Enter") inp.blur(); });
  });
  const reset = document.querySelector("[data-ctr-reset]");
  if (reset) reset.addEventListener("click", () => {
    if (!reset.classList.contains("armed")) {
      reset.classList.add("armed"); reset.dataset.label = reset.textContent; reset.textContent = "Tap again to clear";
      setTimeout(() => { if (reset.classList.contains("armed")) { reset.classList.remove("armed"); reset.textContent = reset.dataset.label; } }, 4000);
      return;
    }
    counts = {}; save(); paint(); reset.classList.remove("armed"); reset.textContent = reset.dataset.label;
  });
  window.addEventListener("storage", (e) => { if (e.key === KEY) { try { counts = JSON.parse(e.newValue || "{}") || {}; } catch (x) {} paint(); } });
  paint();

  const show = (slug, focus) => {
    tabs.forEach((t) => t.setAttribute("aria-selected", String(t.dataset.rtab === slug)));
    document.querySelectorAll("[data-rpanel]").forEach((p) => { p.hidden = p.dataset.rpanel !== slug; });
    if (focus) history.replaceState(null, "", "#region-" + slug);
  };
  tabs.forEach((t) => t.addEventListener("click", () => show(t.dataset.rtab, true)));
  const h = location.hash.match(/^#region-(.+)$/);
  if (h && tabs.some((t) => t.dataset.rtab === h[1])) show(h[1], false);
})();
