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
