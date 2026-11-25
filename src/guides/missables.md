---
title: Missables
headline: Everything You Can Miss
kicker: Completion
seoTitle: "GTA 6 Missables: Every Missable Item, Job and Collectible by Chapter"
description: "All GTA 6 missables in one checklist, chapter by chapter: the magazines, cards and meditation that vanish with each home, limited-time side jobs, Donnie's revolver, Boobie's bricks and the last safe save before each point of no return."
summary: The short list of things that disappear for good, sorted by the chapter you lose them in, with the last safe mission for each. Tick them off as you go; the ticks are shared with the 100% route and the collectible checklists.
order: 2
glow: pink
spoilerFree: true
updated: 2026-11-25
facts:
  - { k: Missable for 100%, v: "Nothing", status: Reported }
  - { k: Mission replay, v: "None", status: Reported }
  - { k: Manual save slots, v: "15", status: Reported }
tldr:
  - "**Nothing the 100% checklist counts can be lost.** What can go are extras: a few collectibles inside the homes you leave behind, some optional jobs, one unique revolver and some mission cash."
  - "Most of it is tied to **a home you lose at the end of a chapter**: Jason's house in Chapter 1, the Starlet Motel in Chapter 2 and the Bayside apartment in Chapter 3."
  - "There is **no mission replay**. Make a manual save in a slot of its own before each chapter's last mission."
faq:
  - q: "Are there missables in GTA 6?"
    a: "Yes, but none of them block 100% completion. You can lose a handful of collectibles that sit inside homes you move out of, a few limited-time optional jobs, Donnie's unique revolver in Don Gone, Boobie's bricks in Bricked Up and the later parts of the Dubious Provenance job."
  - q: "What is missable in Chapter 1 of GTA 6?"
    a: "The five magazines in Jason's house, the balcony meditation with Lucia, Shirley's two optional jobs, Clock Out (if you turn Lucia's call down or miss her 4 PM deadline), Donnie's H&L .38 and any cash you carry. Recalibration is the point of no return, so save and bank your money before it."
  - q: "Which collectibles are missable in GTA 6?"
    a: "The ones inside homes you leave: five magazines at Jason's house (Chapter 1), two magazines and two collectible cards at the Starlet Motel (Chapter 2) and two magazines at the Bayside apartment (Chapter 3). The balcony meditation at Jason's house may also be gone after Chapter 1."
  - q: "Do you lose your money at the end of Chapter 1?"
    a: "You lose the cash you carry. Bank it before Recalibration, ideally at least $5,000 in Family Savings."
  - q: "What is missable in Chapter 4 of GTA 6?"
    a: "Two optional jobs: This Is a Free Call From…, which is Lucia only and limited-time, and Bad Driver!, which Andrea gives you after Party Hard and which is gone once Power Play starts. In the heist mission VCIA Takedown, Francisco's LMG-6 is only yours if you pick it up during the last fight."
  - q: "Can you replay missions in GTA 6?"
    a: "No. Keep manual saves at the start and end of each chapter in slots you don't overwrite. There are 15."
sources:
  - label: "Built from our own pages"
    note: "Every line on this page comes from data already on the site and recorded there: route100.json (limited items, PowerPyx 100% checklist, game-checklists missables, PowerPyx collectible pages), collectibles.json (missable fields), storyMissions.json (chapter warnings) and mission front matter (missables, prep). No new facts added Nov 20, 2026."
  - label: "PowerPyx: Bad Driver! (Find Felipe)"
    url: "https://www.powerpyx.com/gta-6-bad-driver-find-felipe-walkthrough/"
    note: "Read Nov 21, 2026 (via ?p=369829). Optional, Chapter 4, Andrea, Jason or Lucia, after Party Hard; Lummox County > Millport bar; missable, unavailable once Power Play starts; kill Felipe $20,000 from Andrea, spare him and he starts Collect Felipe's Gift (his vehicle)."
---
{%- set skip = ["read-remote", "pool-delights", "bank-ch2"] %}
{%- set kinds = {
  "magazines-books-comics": "Magazine",
  "collectible-cards": "Card",
  "meditation-spots": "Meditation",
  "shirley-rum": "Optional job", "shirley-scooter": "Optional job", "clock-out": "Optional job", "yago-3": "Optional job", "free-call": "Optional job", "bad-driver": "Optional job",
  "donnie-38": "Weapon", "bank-ch1": "Cash", "bank-ch2": "Cash", "motel": "Home",
  "pool-delights": "Activity", "halifax": "Choice"
} %}
These are the things in GTA 6 that are gone once you move past a certain point. Each chapter below lists them in the order you meet them, with the last mission you can safely play first. For the whole game in order, use the [100% route](/guides/100-percent-route/); this page is the same warnings with everything else taken out.

{%- set chs = route100 | missablesByChapter(storyMissions, skip) %}
{%- set total = chs | sum("n") %}
<div class="progress miss-prog" data-progress-in="#miss-list">
  <div class="row"><span class="lab">Secured</span><span class="pct"><span data-done>0</span> / {{ total }} · <span data-pct>0%</span></span></div>
  <div class="bar"><i></i></div>
</div>

<div id="miss-list">
{%- for c in chs %}
<h2 id="{{ c.id }}">{{ c.title }}</h2>
{%- if c.dl %}
<p class="miss-dl"><span class="lab">Last safe mission</span> <a href="{{ c.dl.warn.u }}">{{ c.dl.t }}</a> <span class="mno">Mission {{ c.dl.no }}</span><small>{{ c.dl.warn.t }}.</small></p>
{%- else %}
<p class="miss-dl"><span class="lab">When</span> We don't yet know where these sit in the chapter, so do them as soon as they appear.</p>
{%- endif %}
<div class="pnr route">
<ul class="track">
{%- for it in c.items %}
{%- set ctype = it.track.split(":")[1] if (it.track and it.track.indexOf("col:") == 0) else "" %}
<li data-track-row><label><input class="cb" type="checkbox" data-track="{{ it.track or ('route:' + it.k) }}"><span class="txt">{{ it.t | md | safe }}</span><span class="goal rt rt-limited">{{ (kinds[ctype] if ctype else kinds[it.k]) or "Limited" }}</span></label></li>
{%- endfor %}
</ul>
</div>
{%- endfor %}
</div>

<h2 id="in-missions">Inside the missions</h2>

Some missions have something you only get if you act during the mission itself. The mission page opens with the same warning.

<div class="cards two miss-cards">
{%- for m in collections.missions %}{% if m.data.missables and m.data.missables.length %}
<a class="card link" href="{{ m.url }}"><span class="pin">Mission {{ m.data.order | pad }}</span><h3>{{ m.data.title }}</h3>{% for x in m.data.missables %}<p>{{ x | md | safe }}</p>{% endfor %}</a>
{%- endif %}{% endfor %}
</div>

<h2 id="not-missable">Locked for a while, not lost</h2>

- **Jason and Lucia together in public.** From the end of [Making Gainz](/walkthrough/making-gainz/) until VCIA Takedown they can't be seen together, apart from their room at the Y Hotel. Anything you want to do with both of them, do before Making Gainz.
- **Pool at Delights Cabaret.** If you miss the opponent in Chapter 2, the club reopens later in the game.
- **Choices that change scenes only.** Most decisions don't cost you anything. The few that do are on [Story choices](/guides/story-choices/), and what each mission pays is on [Mission rewards](/guides/mission-rewards/).
