---
title: Ammu-Nation, mod shops and Pay 'n' Spray
headline: Guns, Mods and Resprays
kicker: Shops
seoTitle: "GTA 6 Shop Locations: All Ammu-Nation, Mod Shops, Pay 'n' Spray and Car Washes"
description: "Where to find every Ammu-Nation gun store, mod shop, Pay 'n' Spray and car wash in GTA 6, by county, with what each one does and the challenges they count toward."
summary: All 24 gun stores, 14 mod shops, 19 Pay 'n' Sprays and 6 car washes, sorted by county, with what each shop is good for and the challenges you finish there.
order: 4
glow: cyan
spoilerFree: true
updated: 2026-11-21
facts:
  - { k: Ammu-Nation, v: "24", status: Reported }
  - { k: Mod shops, v: "14", status: Reported }
  - { k: Pay 'n' Spray, v: "19", status: Reported }
  - { k: Car washes, v: "6", status: Reported }
tldr:
  - "**Shops appear on the map once you've uncovered that part of it.** Gun stores, mod shops, Pay 'n' Sprays and car washes each have their own icon."
  - "**Every gun store sells a weapon variant you can't get anywhere else.** The map icon tells you how big the store is; the *Expanded* ones carry the heavy weapons."
  - "**Each mod shop works on one kind of vehicle**, from lowriders to dirt bikes. Two of them are Ultimate Edition only."
  - "**Pay 'n' Spray fixes the car and changes its colour**, so the police stop recognising it. From Chapter 3 you can also buy and register cars there."
faq:
  - q: "How many Ammu-Nation stores are there in GTA 6?"
    a: "24. Five are in Mariana County, 14 in and around Vice City, one in Leonard County, three in Kelly County and one in Lummox County. The map icon shows whether a store is Limited, Standard, Hunting or Expanded."
  - q: "Which Ammu-Nation sells rocket launchers in GTA 6?"
    a: "The Expanded stores carry the most weapons, including the LMG, sniper rifle, grenade launcher and rocket launcher. There are six: Woodhatch in Mariana County and Big Shots, Phil's Ammu-Nation, Black Eagle, Iron & Oak and Prestige Firearms in and around Vice City."
  - q: "How many mod shops are there in GTA 6?"
    a: "14, and each one specialises in a type of vehicle: retro cars, muscle cars, sports bikes, luxury cars, tuners, lowriders, hot rods, racing cars, dirt bikes, off-roaders, choppers and so on. Rideout Customs and One-Eyed Willie's Auto Shop are only in the Ultimate Edition."
  - q: "Where are the Pay 'n' Sprays in GTA 6?"
    a: "There are 19. Mariana County has four (Southwind, Key Lento, Watson Bay and Grassrivers), Vice City and Vice-Dale County ten, Leonard County one in Waning Sands, Kelly County two (Port Gellhorn and Ambrosia) and Lummox County two (Grayson and Millport)."
  - q: "Do you need car washes in GTA 6?"
    a: "No, they're optional. All six are in Vice City, and repairing a car at a Pay 'n' Spray or mod shop cleans it anyway."
sources:
  - label: "PowerPyx: shop location pages"
    url: "https://www.powerpyx.com/gta-6-collectible-guide-progress-database/"
    note: "Ammu-Nation, mod shop, Pay 'n' Spray and car wash pages read Nov 21, 2026. Full list in src/_data/shops.json. Trusted source."
  - label: "Our own data"
    url: "/walkthrough/welcome-to-vice-city/"
    note: "Buying and registering cars at Pay 'n' Spray from Welcome to Vice City; Standard Tracker cars sell there in Chapter 3 (money and fences guides); challenge names from challenges.json; Ultimate Edition shops from editionItems.json (Rockstar)."
---

> **Note:** First pass. Names, counties and shop types come from a trusted guide; the wording is ours. We only show an area where the source gives one, so most gun stores and mod shops are listed by county for now. Nothing here is checked in our own game yet.

<div class="chal-cats">
{%- for t in shops.types %}
<a class="chal-cat" href="#{{ t.id }}"><span class="lab">{{ t.n }}</span><span class="pct">{{ t.items.length }}</span></a>
{%- endfor %}
</div>

<h2 id="what">What each shop is for</h2>

<div class="shop-what">
<div class="shop-what-c"><h3>Ammu-Nation</h3><p>Weapons, ammo, body armour and parachutes. Every store has at least one unique weapon variant. The map icon shows the store type: <b>Limited</b>, <b>Standard</b>, <b>Hunting</b> or <b>Expanded</b>, which has the biggest range.</p><p class="shop-ch">Challenges: <a href="/guides/challenges/#shopping">Well Armed, Stylishly Armed, Heavily Armed</a></p></div>
<div class="shop-what-c"><h3>Mod shops</h3><p>Performance parts and visual mods. Each shop is built around one kind of vehicle, so take a lowrider to the lowrider shop and a dirt bike to the dirt bike shop.</p><p class="shop-ch">Challenges: <a href="/guides/challenges/#shopping">Vehicle Modder, Custom Ride, Serious Modder</a></p></div>
<div class="shop-what-c"><h3>Pay 'n' Spray</h3><p>Repairs the car and changes its colour so the police lose track of it. After <a href="/walkthrough/welcome-to-vice-city/">Welcome to Vice City</a> you can buy and register cars there too, and in Chapter 3 cars with a Standard Tracker <a href="/guides/fences/">sell</a> at any of them.</p><p class="shop-ch">Challenges: <a href="/guides/challenges/#criminal">Carjacking, Carjacking Spree, Carjacking Pro</a></p></div>
<div class="shop-what-c"><h3>Car washes</h3><p>Purely cosmetic and optional. All six are in Vice City, and any repair cleans the car as well, so you never have to go out of your way for one.</p></div>
</div>

<h2 id="list">Every shop by county</h2>

<div class="finder">
<label class="vh" for="q-shop">Search shops</label>
<input class="search" type="search" id="q-shop" data-search="shop" placeholder="Search 63 shops or areas" autocomplete="off">
<div class="filters" data-filter-group="shop" role="group" aria-label="Filter shops by county">
<button type="button" class="fchip is-on" data-filter="*" aria-pressed="true">All</button>
{%- for c in shops.counties %}
<button type="button" class="fchip" data-filter="{{ c.id }}" aria-pressed="false">{{ c.n }}</button>
{%- endfor %}
</div>
</div>

<div data-filter-list="shop">
{%- for t in shops.types %}
<section class="shop-sec" id="{{ t.id }}" data-filter-parent>
<h3 class="chal-h">{{ t.n }} <small>{{ t.items.length }}</small></h3>
<div class="shop-list">
{%- for i in t.items %}
<div class="shop" id="{{ t.id }}-{{ i.id }}" data-tags="{{ i.county }}" data-text="{{ (i.name + ' ' + (i.kind or '') + ' ' + (i.area or '') + ' ' + i.cn + ' ' + t.short) | lower }}"><span class="shop-n">{{ i.n }}</span><div class="shop-b"><div class="shop-name">{{ i.name }}</div><div class="shop-meta">{% if i.kind %}<span>{{ i.kind }}</span>{% endif %}{% if i.area and t.id != 'pay-n-spray' %}<span>{{ i.area }}</span>{% endif %}<span class="shop-county">{{ i.cn }}</span>{% if i.ue %}<span class="chip rum">Ultimate only</span>{% endif %}</div></div></div>
{%- endfor %}
</div>
</section>
{%- endfor %}
<p class="lede" data-nomatch="shop" hidden>No shop matches that search.</p>
</div>

> **Tip:** Ammu-Nation's Expanded stores are the ones to visit for heavy weapons: Woodhatch is the only one in Mariana County, and five more are in and around Vice City.

<h2 id="more">Related</h2>

- [All 80 challenges](/guides/challenges/#shopping): the Shopping group is mostly done at these shops.
- [Fences](/guides/fences/): who buys stolen cars, and when Pay 'n' Spray joins them.
- [Money guide](/guides/money/), the [100% checklist](/guides/100-percent-checklist/) and the [launch guide](/guides/launch-guide/#editions) for what the Ultimate Edition adds.
