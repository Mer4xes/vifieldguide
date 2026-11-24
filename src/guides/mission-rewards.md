---
title: Mission rewards
headline: What Every Mission Gives You
kicker: Rewards
seoTitle: "GTA 6 Mission Rewards: Unique Weapons, Vehicles, Cash and Unlocks"
description: "Every reward from the GTA 6 story missions we have covered in one list: unique weapon variants, vehicles, cash payouts, new apps and fences, Professional bonuses and story trophies, with the mission that gives each one."
summary: The unique weapons, cars, cash, new features and trophies the story hands out, with the mission each one comes from. Filter by type or search for a name.
order: 5
glow: gold
spoilerFree: true
updated: 2026-11-22
tldr:
  - "**Some rewards can be missed.** A few only come if you grab something during the mission, like Donnie's revolver in [Don Gone](/walkthrough/don-gone/) or the bricks in [Bricked Up](/walkthrough/bricked-up/). Rows that say *only if* or *if you* are the ones to watch."
  - "**Unique weapons are named variants** of standard weapons, each tied to a character from the story."
  - "**Many missions pay nothing.** The real money comes from jobs between missions. See the [money guide](/guides/money/)."
faq:
  - q: "What unique weapons can you get in GTA 6 story missions?"
    a: "So far: Donnie's H&L .38 from the trunk in **Don Gone**, Gil's Kalinga .50 from **Safe Word**, Bae-Luxe's Bat from **Cooties**, Roxy's and Bae-Luxe's W-10 SMGs from **Photo/Shoot**, and Francisco's LMG-6 from **VCIA Takedown** (pick it up during the last fight). The list on this page grows as the walkthrough does."
  - q: "Which GTA 6 story mission pays the most?"
    a: "Of the missions covered so far, **VCIA Takedown** at the end of Chapter 4, with $250,000. Before that, **The Cartel Heist** closes Chapter 3 with $120,000."
  - q: "Can you miss mission rewards in GTA 6?"
    a: "Yes. Donnie's revolver, Boobie's bricks and the later parts of Dubious Provenance all depend on what you do during the mission. Each mission page has a missable warning near the top when that's the case."
---
{%- set rows = collections.missions | rewardRows %}
{%- set kinds = rows | rewardKinds %}
Each row below comes from a mission page in the [walkthrough](/walkthrough/). The list fills in as we write up more missions. Tap a mission for the steps, including where to find anything you have to pick up yourself.

<div class="rw-stats">
  <div><b>{{ kinds.weapon or 0 }}</b><span>Unique weapons</span></div>
  <div><b>{{ (kinds.vehicle or 0) + (kinds.item or 0) }}</b><span>Vehicles and items</span></div>
  <div><b>{{ kinds.unlock or 0 }}</b><span>New features</span></div>
  <div><b>{{ kinds.cash or 0 }}</b><span>Cash rewards</span></div>
</div>

<div class="filters" data-filter-group="rewards" role="group" aria-label="Filter rewards">
  <button type="button" class="fchip is-on" data-filter="*" aria-pressed="true">All</button>
  <button type="button" class="fchip" data-filter="weapon" aria-pressed="false">Weapons</button>
  <button type="button" class="fchip" data-filter="vehicle" aria-pressed="false">Vehicles</button>
  <button type="button" class="fchip" data-filter="item" aria-pressed="false">Items</button>
  <button type="button" class="fchip" data-filter="cash" aria-pressed="false">Cash</button>
  <button type="button" class="fchip" data-filter="unlock" aria-pressed="false">Unlocks</button>
  <button type="button" class="fchip" data-filter="bonus" aria-pressed="false">Bonuses</button>
  <button type="button" class="fchip" data-filter="trophy" aria-pressed="false">Trophies</button>
  <button type="button" class="fchip" data-filter="missable" aria-pressed="false">Can be missed</button>
</div>
<input class="search rw-search" type="search" data-search="rewards" placeholder="Search rewards or missions" aria-label="Search rewards or missions" autocomplete="off">

<div class="tablewrap rw-wrap">
<table class="rw-table">
<thead><tr><th>Reward</th><th>Type</th><th>Mission</th></tr></thead>
<tbody data-filter-list="rewards">
{%- for r in rows %}
{%- set miss = r.value | lower %}
<tr data-tags="{{ r.kind }}{% if 'only if' in miss or 'if you' in miss or 'from the trunk' in miss %} missable{% endif %}" data-text="{{ (r.value + ' ' + r.m.data.title + ' ' + r.label) | lower }}">
<td class="rw-v">{{ r.value }}</td>
<td><span class="rw-k rw-{{ r.kind }}">{{ r.label }}</span></td>
<td class="rw-m"><a href="{{ r.m.url }}">{{ r.m.data.title }}</a><small>{{ r.m.data.order | pad }} · Ch. {{ r.ch }}</small></td>
</tr>
{%- endfor %}
</tbody>
</table>
</div>
<p class="nomatch" data-nomatch="rewards" hidden>Nothing matches that yet.</p>

Looking for the choices instead? They have their own page: [story choices](/guides/story-choices/).
