---
title: Stunts
headline: All 397 Stunts, and the Easiest Way to 300
kicker: Activities
seoTitle: "GTA 6 Stunts: All 40 Knife Flights, 25 Base Jumps and Stunt Jump Locations"
description: "GTA 6 stunts explained: the four kinds (130 stunt jumps, 202 under the bridge, 40 knife flights, 25 base jumps), what Cunning Stunts and 100% need, how to track them, and a checklist of every knife flight and base jump."
summary: The four kinds of stunt, how many of each there are, what the trophy and the 100% checklist want, and tick-box lists of every knife flight and base jump plus the stunt jumps mapped so far.
order: 4
glow: cyan
spoilerFree: true
updated: 2026-11-23
facts:
  - { k: Stunts in the game, v: "397", status: Reported }
  - { k: Cunning Stunts, v: "250", status: Confirmed }
  - { k: 100% checklist, v: "300", status: Reported }
  - { k: Spare, v: "97", status: Reported }
tldr:
  - "**There are 397 stunts of four kinds:** 130 stunt jumps, 202 under the bridge, 40 knife flights and 25 base jumps."
  - "**Any mix counts.** Cunning Stunts pops at 250 and the 100% checklist stops at 300, so you can skip the 97 you like least."
  - "**Knife flights** are all in Vice City and Vice Beach: fly a plane on its side between two towers. **Base jumps** are parachute courses through rings, and finishing in any time counts."
  - "**Track them** under Progress › Activities › Stunts, or on the map under Exploration › Stunt Spots once you've found the first of a kind."
faq:
  - q: "How many stunts are there in GTA 6?"
    a: "397: 130 stunt jumps, 202 under the bridge stunts, 40 knife flights and 25 base jumps."
  - q: "How many stunts do you need for Cunning Stunts and 100%?"
    a: "Cunning Stunts needs 250 and the 100% checklist needs 300. Any kind of stunt counts toward both, so you don't have to finish every category."
  - q: "How do you do a knife flight in GTA 6?"
    a: "Take any plane to one of the 40 spots in Vice City or Vice Beach and fly between the two towers with the plane rolled on its side, one wingtip pointing at the sky and the other at the ground."
  - q: "Do you need to beat the par time on base jumps?"
    a: "No. A base jump counts as done for the 100% checklist whatever your time. You jump with a parachute and steer it through the rings."
  - q: "Do you have to complete a stunt jump's challenge?"
    a: "No. Each stunt jump has a small extra challenge, shown when you hover over its icon on the map, but just landing the jump is enough for it to count."
  - q: "Where can I see which stunts I've done?"
    a: "Progress › Activities › Stunts lists each kind; on Stunt Jumps, press R3 to see them by region. On the map, open Exploration (the magnifying glass) › Stunt Spots: stunts you've found are purple and ones you've completed are white."
sources:
  - label: "PowerPyx: knife flights, base jumps and stunt jumps"
    url: "https://www.powerpyx.com/gta-6-all-knife-flight-locations/"
    note: "Read Nov 22, 2026. Three location pages (knife flights modified Nov 21, base jumps Nov 21, stunt jumps Nov 22, still work in progress). Names, regions, counts, tracking and how each kind works. Full notes in src/_data/stunts.json. Trusted source."
  - label: "Our trophy data"
    url: "/trophies/cunning-stunts/"
    note: "Cunning Stunts: Complete 250 Stunts (Confirmed)."
---

> **Note:** First pass. Names and regions come from a trusted guide; the wording is ours, and the lists are sorted A to Z. Nothing here is checked in our own game yet.

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

> **Tip:** You need 300 of the 397, so pick the kind that suits you. All 40 knife flights are in Vice City and Vice Beach and 22 of the 25 base jumps are in Vice-Dale County, so with a plane and a parachute they add up quickly.

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
<label class="tr" data-track-row for="st-{{ k.id }}-{{ i.id }}" data-tags="{{ k.id }}" data-text="{{ (i.name + ' ' + g.n + ' ' + k.n) | lower }}"><input class="cb" type="checkbox" id="st-{{ k.id }}-{{ i.id }}" data-track="stunt:{{ k.id }}:{{ i.id }}"><div class="body"><div class="name">{{ i.name }}</div></div></label>
{%- endfor %}
</div>
</div>
{%- endfor %}
</div>
{%- endif %}{% endfor %}
</div>
<p class="nomatch" data-nomatch="stunt" hidden>Nothing left for that filter.</p>

> **Note:** The other {% for k in stunts.kinds %}{% if k.id == 'jump' %}{{ k.total - k.mapped }}{% endif %}{% endfor %} stunt jumps and all 202 under the bridge spots aren't listed yet. We add them once they're confirmed. Ticks here are saved in this browser only.

<button class="reset" type="button" data-reset="stunt:">Reset the stunt lists</button>

<h2 id="more">Related</h2>

- [Cunning Stunts](/trophies/cunning-stunts/): the trophy for 250.
- [100% checklist](/guides/100-percent-checklist/) and the [100% route](/guides/100-percent-route/), where stunts sit with the other free-roam totals.
- [Activities and collectibles](/guides/activities-and-collectibles/#stunts): everything else to do around Leonida.
- [Challenges](/guides/challenges/): the vehicle challenges include some jumps of their own.
