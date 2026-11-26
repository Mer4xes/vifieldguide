---
title: Unique weapons
headline: Unique Weapons and Where to Find Them
kicker: Weapons
seoTitle: "GTA 6 Unique Weapons: Locations of Every Gold Gun Variant Found So Far"
description: "Where to find the unique weapon variants in GTA 6: free finds like the Assassin Nipper .38 and Crabshack VF5 (codes 0072 and 0212), gang operation guns, story and side job rewards, gun store exclusives and the two you can miss. With a checklist that saves."
summary: The named gold guns, where each one is and how to get it, from free finds in the Mariana County swamps to gang hideouts, story rewards and gun store exclusives. Tick them off as you collect them.
order: 4
glow: gold
spoilerFree: true
updated: 2026-11-26
image: /assets/img/full/ue-weapon-variants-01.webp
facts:
  - { k: Variants in the menu, v: "127", status: Reported }
  - { k: On this page, v: "33", status: Reported }
  - { k: Can be missed, v: "2", status: Reported }
  - { k: Can be modified, v: "No", status: Reported }
tldr:
  - "**Unique weapons are named versions of normal guns**, like the *Swamp Bait Akulus* or *Gutterball Moreland 850*. The pause menu counts **127** of them under **Progress › Weapons › Variants**."
  - "**You'll know one when you see it:** the name and icon show in **gold**, and a gold gun marker appears on the map when you're close."
  - "**They can't be modified**, but each comes with its own attachments and finish. Lose one and it's not gone: take it back out of the **weapon locker** at any Ammu-Nation or from your car's trunk."
  - "**Two can be missed:** [Donnie's H&L .38](#donnies-hl-38) in Don Gone and [Francisco's LMG-6](#franciscos-lmg-6) in VCIA Takedown. Everything else can wait."
  - "**Best early grabs:** the [Assassin Nipper .38](#assassin-nipper-38), a silenced pistol you can pick up without a fight, and the three in the Pelican Valley swamp ([Crabshack VF5](#crabshack-vf5), [Swamp Bait Akulus](#swamp-bait-akulus), [Cruel Huntsman's SM-69](#cruel-huntsmans-sm-69))."
faq:
  - q: "How many unique weapons are there in GTA 6?"
    a: "The pause menu has 127 weapon variants to unlock, under Progress › Weapons › Variants. The Ultimate Edition adds a few of its own on top. This page lists the ones whose locations we can give you so far."
  - q: "How do you find unique weapons in GTA 6?"
    a: "Look for gold. A unique weapon's name and icon are gold, and a gold gun marker shows on the map once you're close. Many sit inside gang operations as key valuables, every gun store sells one of its own, and the rest are hidden around the map or handed out by missions."
  - q: "Can you modify unique weapons in GTA 6?"
    a: "No. Unique variants come with fixed attachments and a finish of their own, and you can't add a suppressor, scope or magazine to them at Ammu-Nation."
  - q: "What happens if you lose a unique weapon in GTA 6?"
    a: "Nothing is lost for good. Once you've picked a unique weapon up, you can take it out again from the weapon locker at any Ammu-Nation or from your personal vehicle's trunk."
  - q: "Which unique weapons can you miss in GTA 6?"
    a: "Donnie's H&L .38, which is in the trunk of Donnie's car in the Chapter 1 mission Don Gone, and Francisco's LMG-6, which lies on the ground in the last fight of VCIA Takedown. Grab both during those missions."
  - q: "Where is the Assassin Nipper .38 in GTA 6?"
    a: "In a hidden hatch inside a derelict spy boat at the southern tip of the eastern island of the Permit Keys, near the military base. Focus mode shows the hatch. It's a silenced pistol and there's no fight to get it."
  - q: "What are the codes for the Crabshack VF5 in GTA 6?"
    a: "At the abandoned research outpost in the Pelican Valley swamp, the safe code is 0072 and the door code is 0212. The Crabshack VF5 SMG is in the locked boathouse."
  - q: "Are unique weapons needed for 100% or a trophy?"
    a: "Not as a set. The 100% checklist and the trophy list don't ask for weapon variants, though the Gutterball Moreland 850 is one of the three valuables for Let's Go Bowling."
sources:
  - { label: "Unique weapon data", url: "/guides/unique-weapons/", note: "See src/_data/uniqueWeapons.json for every source and what was taken from it. Read Nov 25, 2026." }
---
{%- set uw = uniqueWeapons %}
<div class="progress" data-progress="uw:" data-total="{{ uw.items.length }}">
<div class="row"><span class="lab">Unique weapons on this page you have</span><span class="pct"><span data-done>0</span> / {{ uw.items.length }} · <span data-pct>0%</span></span></div>
<div class="bar"><i></i></div>
</div>

<div class="chal-cats">
{%- for g in uw.groups %}
{%- set n = (uw.items | where("group", g.id)).length %}
<a class="chal-cat" href="#{{ g.id }}" data-progress="uw:{{ g.id }}:" data-total="{{ n }}"><span class="lab">{{ g.n }}</span><span class="pct"><span data-done>0</span>/{{ n }}</span><span class="bar"><i></i></span></a>
{%- endfor %}
</div>

<h2 id="how">How unique weapons work</h2>

<ol class="cheat-steps">
<li><b>Spot the gold.</b> A unique weapon's name and icon are gold, and when you get close a gold gun marker appears on the map. The pickup prompt shows the full name.</li>
<li><b>Pick it up once.</b> From then on it's yours. If you die, get busted or drop it, take it back out of the <b>weapon locker</b> at any <a href="/guides/shops/#ammu-nation">Ammu-Nation</a> or from your car's trunk.</li>
<li><b>Use it as it is.</b> Unique variants can't be modified. They come with their own attachments and finish, which is the point of them: some are already silenced.</li>
<li><b>Check your count</b> under <b>Progress › Weapons › Variants</b> in the pause menu. There are 127 to unlock.</li>
</ol>

> **Tip:** Half of the free finds are in **Mariana County**, so you can collect a good set in Chapter 1. Three of them are in one corner of the Pelican Valley swamp.

<h2 id="list">The list</h2>

<div class="finder">
<label class="vh" for="q-uw">Search unique weapons</label>
<input class="search" type="search" id="q-uw" data-search="uw" placeholder="Search {{ uw.items.length }} weapons or places" autocomplete="off">
<div class="filters" data-filter-group="uw" role="group" aria-label="Filter unique weapons">
<button type="button" class="fchip is-on" data-filter="*" aria-pressed="true">All</button>
<button type="button" class="fchip" data-filter="todo" aria-pressed="false">Not collected</button>
<button type="button" class="fchip" data-filter="missable" aria-pressed="false">Can be missed</button>
{%- for g in uw.groups %}
<button type="button" class="fchip" data-filter="{{ g.id }}" aria-pressed="false">{{ g.n }}</button>
{%- endfor %}
</div>
<div class="filters" data-filter-group="uw" role="group" aria-label="Filter unique weapons by region">
<span class="fchip-lab">By region</span>
{%- for r in uw.regions %}
<button type="button" class="fchip" data-filter="{{ r.id }}" aria-pressed="false">{{ r.n }}</button>
{%- endfor %}
</div>
</div>

<div data-filter-list="uw">
{%- for g in uw.groups %}
<div class="stunt-kind rr-sec" data-filter-parent>
<h2 id="{{ g.id }}">{{ g.n }} <small class="gar-lede">{{ g.lede }}</small></h2>
<div class="trophies chal-list gangop-list rob-list">
{%- for w in uw.items | where("group", g.id) %}
{%- set rn = "" %}{%- for r in uw.regions %}{% if r.id == w.region %}{% set rn = r.n %}{% endif %}{% endfor %}
<label class="tr uw-row" data-track-row id="{{ w.id }}" for="uw-{{ w.id }}" data-tags="{{ g.id }}{% if w.region %} {{ w.region }}{% endif %}{% if w.missable %} missable{% endif %}" data-text="{{ (w.name + ' ' + w.type + ' ' + (w.area or '') + ' ' + rn + ' ' + (w.op or '') + ' ' + (w.store or '') + ' ' + (w.mission or '')) | lower }}"><input class="cb" type="checkbox" id="uw-{{ w.id }}" data-track="uw:{{ g.id }}:{{ w.id }}" aria-label="Mark {{ w.name }} collected"><div class="body"><div class="name">{{ w.name }}{% if w.missable %} <span class="chip miss">Missable</span>{% endif %}</div><div class="uw-meta">{{ w.type }}{% if w.area %} · {{ w.area }}{% endif %}{% if rn and rn != w.area %} · {{ rn }}{% endif %}{% if w.who %} · {{ w.who }} only{% endif %}</div><div class="desc">{{ w.where | md | safe }}{% if w.op %} <a href="/guides/gang-operations/#{{ w.opGang }}">Gang operations</a>{% elif w.u and w.mission %} <a href="{{ w.u }}">{{ w.mission }} walkthrough</a>{% elif w.u and g.id == "side" %} <a href="{{ w.u }}">The strand</a>{% elif w.u and g.id == "shop" %} <a href="{{ w.u }}">Gun stores</a>{% endif %}</div></div><div class="side"><span class="need">{% if w.price %}{{ w.price | usd }}{% elif g.id == "shop" %}Buy{% else %}Free{% endif %}</span></div></label>
{%- endfor %}
</div>
</div>
{%- endfor %}
</div>
<p class="nomatch" data-nomatch="uw" hidden>Nothing left for that filter.</p>
<button class="reset" type="button" data-reset="uw:">Reset the list on this page</button>

> **Note:** This page has {{ uw.items.length }} of the {{ uw.total }} variants. More go on the list as their locations come in. The Ultimate Edition's engraved pistols and the Hawk & Little Morgan revolvers are on the [weapons page](/weapons/).

<h2 id="more">Related</h2>

- [Gang operations](/guides/gang-operations/): all 39, where most of the gang guns are.
- [Shops](/guides/shops/#ammu-nation): every Ammu-Nation by county. Each one sells a variant of its own.
- [Mission rewards](/guides/mission-rewards/): every weapon, car and payout the story hands out.
- [Missables](/guides/missables/): the two weapons above and everything else you can lose.
- [All 66 standard weapons](/weapons/) with a checklist, and [equipment](/guides/equipment/).
