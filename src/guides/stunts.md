---
title: Stunts
headline: All 397 Stunts, and the Easiest Way to 300
kicker: Activities
seoTitle: "GTA 6 Stunts: All 202 Under the Bridge Spots, 130 Stunt Jumps, 40 Knife Flights and 25 Base Jumps"
description: "GTA 6 stunts explained: the four kinds (130 stunt jumps, 202 under the bridge, 40 knife flights, 25 base jumps), what Cunning Stunts and 100% need, how to track them, and a checklist of all 397 by region, including every under the bridge spot."
summary: "The four kinds of stunt, how many of each there are, what the trophy and the 100% checklist want, and tick-box lists of all 397 by region: 202 under the bridge spots, 130 stunt jumps, 40 knife flights and 25 base jumps."
order: 4
glow: cyan
spoilerFree: true
updated: 2026-11-26
facts:
  - { k: Stunts in the game, v: "397", status: Reported }
  - { k: Cunning Stunts, v: "250", status: Confirmed }
  - { k: 100% checklist, v: "300", status: Reported }
  - { k: Spare, v: "97", status: Reported }
  - { k: Under the bridge needed, v: "105+", status: Reported }
tldr:
  - "**There are 397 stunts of four kinds:** 130 stunt jumps, 202 under the bridge, 40 knife flights and 25 base jumps."
  - "**Any mix counts.** Cunning Stunts pops at 250 and the 100% checklist stops at 300, so you can skip the 97 you like least."
  - "**Knife flights** are all in Vice City and Vice Beach: fly a plane on its side between two towers. **Base jumps** are parachute courses through rings, and finishing in any time counts."
  - "**You can't skip under the bridge.** The other three kinds add up to 195, so you need at least 55 under the bridge stunts for the trophy and 105 for 100%. Vice-Dale County alone has 67 and Kelly County 51."
  - "**Track them** under Progress › Activities › Stunts, or on the map under Exploration › Stunt Spots once you've found the first of a kind."
faq:
  - q: "How many stunts are there in GTA 6?"
    a: "397: 130 stunt jumps, 202 under the bridge stunts, 40 knife flights and 25 base jumps."
  - q: "How many stunts do you need for Cunning Stunts and 100%?"
    a: "Cunning Stunts needs 250 and the 100% checklist needs 300. Any kind of stunt counts toward both, so you don't have to finish every category."
  - q: "How do you do a knife flight in GTA 6?"
    a: "Take any plane to one of the 40 spots in Vice City or Vice Beach and fly between the two towers with the plane rolled on its side, one wingtip pointing at the sky and the other at the ground."
  - q: "Can you get 100% without under the bridge stunts?"
    a: "No. Stunt jumps, knife flights and base jumps add up to 195 (130 + 40 + 25), so even with all of them you still need 55 under the bridge stunts for Cunning Stunts and 105 for the 300 on the 100% checklist."
  - q: "Where are the under the bridge stunts in GTA 6?"
    a: "All five counties have them: 35 in Mariana County, 67 in Vice-Dale County (which takes in Vice City), 32 in Leonard County, 51 in Kelly County and 17 in Lummox County. Each one has its own name, the same as on the map under Stunt Spots, and all 202 are in the checklist on this page."
  - q: "How many stunt jumps are in each region?"
    a: "130 in all: 17 in Mariana County, 55 in Vice-Dale County (which takes in Vice City), 13 in Leonard County, 29 in Kelly County and 16 in Lummox County. Every one is named in the checklist on this page."
  - q: "Do you need to beat the par time on base jumps?"
    a: "No. A base jump counts as done for the 100% checklist whatever your time. You jump with a parachute and steer it through the rings."
  - q: "Do you have to complete a stunt jump's challenge?"
    a: "No. Each stunt jump has a small extra challenge, shown when you hover over its icon on the map, but just landing the jump is enough for it to count."
  - q: "Where can I see which stunts I've done?"
    a: "Progress › Activities › Stunts lists each kind; on Stunt Jumps, press R3 to see them by region. On the map, open Exploration (the magnifying glass) › Stunt Spots: stunts you've found are purple and ones you've completed are white."
sources:
  - label: "PowerPyx: knife flights, base jumps and stunt jumps"
    url: "https://www.powerpyx.com/gta-6-all-knife-flight-locations/"
    note: "Read Nov 22, 2026. Three location pages (knife flights modified Nov 21, base jumps Nov 21, stunt jumps republished Nov 23, all 130 named). Names, regions, counts, tracking and how each kind works. Full notes in src/_data/stunts.json. Trusted source."
  - label: "PowerPyx: under the bridges"
    url: "https://www.powerpyx.com/gta-6-all-under-the-bridges-locations"
    note: "Read Nov 26, 2026 (published Nov 26 20:02 UTC). All 202 names by county. Full notes in src/_data/stunts.json. Trusted source."
  - label: "Our trophy data"
    url: "/trophies/cunning-stunts/"
    note: "Cunning Stunts: Complete 250 Stunts (Confirmed)."
---

> **Note:** The lists are sorted A to Z.

<div class="progress" data-progress="stunt:" data-total="300">
<div class="row"><span class="lab">Stunts ticked off here</span><span class="pct"><span data-done>0</span> / 300 needed · 397 in the game</span></div>
<div class="bar"><i></i></div>
</div>

<div class="chal-cats">
{%- for k in stunts.kinds %}
<a class="chal-cat" href="#{{ k.id }}" data-progress="stunt:{{ k.id }}:" data-total="{{ k.total }}"><span class="lab">{{ k.n }}</span><span class="pct"><span data-done>0</span>/{{ k.total }}</span><span class="bar"><i></i></span></a>
{%- endfor %}
</div>

<h2 id="kinds">The four kinds</h2>

| Kind | In the game | How it works |
|---|---|---|
{%- for k in stunts.kinds %}
| [{{ k.n }}](#{{ k.id }}) | {{ k.total }} | {{ k.how }} |
{%- endfor %}

> **Tip:** You need 300 of the 397, but not every mix works: stunt jumps, knife flights and base jumps together are only 195. Plan on at least **105 under the bridge** stunts for 100% (55 for the trophy) and drop up to 97 from whichever kind you like least. All 40 knife flights are in Vice City and Vice Beach and 22 of the 25 base jumps are in Vice-Dale County, so with a plane and a parachute they add up quickly, and you can fly under bridges on the same trips.

<h2 id="tracking">Keeping count</h2>

<ol class="cheat-steps">
<li><b>Progress › Activities › Stunts</b> in the pause menu shows each of the four kinds. Select <b>Stunt Jumps</b> and press <b>R3</b> to split them by region.</li>
<li><b>On the map</b>, open <b>Exploration</b> (the magnifying glass) › <b>Stunt Spots</b>. A kind only appears there after you've found one of it. Found stunts are purple, completed ones turn white, and each has its own name, the same names as in our lists.</li>
<li><b>Stunt jumps have a bonus challenge</b> you can see by hovering over the map icon. It's optional: landing the jump is what counts.</li>
<li><b>Unlimited Nitrous</b> is the cheat for 50 stunt jumps. See the <a href="/guides/cheats/">cheats</a>.</li>
</ol>

<h2 id="list">Checklists</h2>

<div class="finder">
<label class="vh" for="q-stunt">Search stunts</label>
<input class="search" type="search" id="q-stunt" data-search="stunt" placeholder="Search by building or place" autocomplete="off">
<div class="filters" data-filter-group="stunt" role="group" aria-label="Filter stunts">
<button type="button" class="fchip is-on" data-filter="*" aria-pressed="true">All</button>
<button type="button" class="fchip" data-filter="todo" aria-pressed="false">Not done</button>
{%- for k in stunts.kinds %}{% if k.groups.length %}
<button type="button" class="fchip" data-filter="{{ k.id }}" aria-pressed="false">{{ k.n }}</button>
{%- endif %}{% endfor %}
</div>
<div class="filters" data-filter-group="stunt" role="group" aria-label="Filter stunts by region">
<span class="fchip-lab">By region</span>
{%- for r in [["mariana-county","Mariana County"],["vice-city","Vice City"],["vice-beach","Vice Beach"],["vice-dale-county","Vice-Dale County"],["leonard-county","Leonard County"],["kelly-county","Kelly County"],["lummox-county","Lummox County"]] %}
<button type="button" class="fchip" data-filter="{{ r[0] }}" aria-pressed="false">{{ r[1] }}</button>
{%- endfor %}
</div>
</div>

<div data-filter-list="stunt">
{%- for k in stunts.kinds %}{% if k.groups.length %}
<div class="stunt-kind" data-filter-parent>
<h3 class="chal-h" id="{{ k.id }}">{{ k.n }} <small>{{ k.total }} in the game{% if k.partial %} · {{ k.mapped }} mapped so far{% endif %}</small></h3>
<p class="stunt-how">{{ k.how }}</p>
{%- for g in k.groups %}
<div data-filter-parent>
<p class="stunt-region">{{ g.n }}<span>{% if g.total and g.total != g.items.length %}{{ g.items.length }} of {{ g.total }}{% else %}{{ g.items.length }}{% endif %}</span></p>
<div class="trophies chal-list gangop-list">
{%- for i in g.items %}
<label class="tr" data-track-row for="st-{{ k.id }}-{{ i.id }}" data-tags="{{ k.id }} {{ g.id }}" data-text="{{ (i.name + ' ' + g.n + ' ' + k.n) | lower }}"><input class="cb" type="checkbox" id="st-{{ k.id }}-{{ i.id }}" data-track="stunt:{{ k.id }}:{{ i.id }}"><div class="body"><div class="name">{{ i.name }}</div></div></label>
{%- endfor %}
</div>
</div>
{%- endfor %}
</div>
{%- endif %}{% endfor %}
</div>
<p class="nomatch" data-nomatch="stunt" hidden>Nothing left for that filter.</p>

> **Note:** Most under the bridge names point at the road, river, canal or railway nearby, so check the map's Stunt Spots filter for the exact bridge. In the under the bridge and stunt jump lists the city's spots sit under Vice-Dale County, and in the stunt jump list Lake Leonida Lock is split between Leonard and Kelly County. Ticks here are saved in this browser only.

<button class="reset" type="button" data-reset="stunt:">Reset the stunt lists</button>

<h2 id="more">Related</h2>

- [Cunning Stunts](/trophies/cunning-stunts/): the trophy for 250.
- [100% checklist](/guides/100-percent-checklist/) and the [100% route](/guides/100-percent-route/), where stunts sit with the other free-roam totals.
- [Activities and collectibles](/guides/activities-and-collectibles/#stunts): everything else to do around Leonida.
- [Challenges](/guides/challenges/): the vehicle challenges include some jumps of their own.
