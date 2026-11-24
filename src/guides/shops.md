---
title: Shop locations
headline: Guns, Clothes, Mods and Snacks
kicker: Shops
seoTitle: "GTA 6 Shop Locations: All Ammu-Nation, Clothing Stores, Convenience Stores, Mod Shops and Pay 'n' Spray"
description: "Where to find every Ammu-Nation, clothing store, convenience store, mod shop, Pay 'n' Spray and car wash in GTA 6, by county, with what each one sells and the challenges they count toward."
summary: All 24 gun stores, 67 clothing stores, 72 convenience stores, 14 mod shops, 19 Pay 'n' Sprays and 6 car washes, sorted by county, with what each shop is good for and the challenges you finish there.
order: 4
glow: cyan
spoilerFree: true
updated: 2026-11-24
facts:
  - { k: Ammu-Nation, v: "24", status: Reported }
  - { k: Clothing stores, v: "67", status: Reported }
  - { k: Convenience stores, v: "72", status: Reported }
  - { k: Mod shops, v: "14", status: Reported }
  - { k: Pay 'n' Spray, v: "19", status: Reported }
  - { k: Car washes, v: "6", status: Reported }
tldr:
  - "**Shops appear on the map once you've uncovered that part of it.** Gun stores, mod shops, Pay 'n' Sprays and car washes each have their own icon."
  - "**Every gun store sells a weapon variant you can't get anywhere else.** The map icon tells you how big the store is; the *Expanded* ones carry the heavy weapons."
  - "**Each mod shop works on one kind of vehicle**, from lowriders to dirt bikes. Two of them are Ultimate Edition only."
  - "**Pay 'n' Spray fixes the car and changes its colour**, so the police stop recognising it. From Chapter 3 you can also buy and register cars there."
  - "**Clothing stores come in five types**, and shops of the same brand stock the same clothes, so one visit per brand is enough. Shoes are sold separately."
  - "**Convenience stores are where you stock up on Zombix**, the healing item, plus pet food and groceries for the fridge at home."
faq:
  - q: "How many Ammu-Nation stores are there in GTA 6?"
    a: "24. Five are in Mariana County, 14 in and around Vice City, one in Leonard County, three in Kelly County and one in Lummox County. The map icon shows whether a store is Limited, Standard, Hunting or Expanded."
  - q: "Which Ammu-Nation sells rocket launchers in GTA 6?"
    a: "The Expanded stores carry the most weapons, including the LMG, sniper rifle, grenade launcher and rocket launcher. There are six: Woodhatch in Mariana County and Big Shots, Phil's Ammu-Nation, Black Eagle, Iron & Oak and Prestige Firearms in and around Vice City."
  - q: "How many mod shops are there in GTA 6?"
    a: "14, and each one specialises in a type of vehicle: retro cars, muscle cars, sports bikes, luxury cars, tuners, lowriders, hot rods, racing cars, dirt bikes, off-roaders, choppers and so on. Rideout Customs and One-Eyed Willie's Auto Shop are only in the Ultimate Edition."
  - q: "Where are the Pay 'n' Sprays in GTA 6?"
    a: "There are 19. Mariana County has four (Southwind, Key Lento, Watson Bay and Grassrivers), Vice City and Vice-Dale County ten, Leonard County one in Waning Sands, Kelly County two (Port Gellhorn and Ambrosia) and Lummox County two (Grayson and Millport)."
  - q: "How many clothing stores are there in GTA 6?"
    a: "67, in five types: 17 casual and streetwear, 11 sportswear, 10 formal, 24 souvenir and swimwear shops and 5 thrift stores. Most are in and around Vice City; Mariana County has eight, Leonard County four and Kelly County one; Lummox County has none. Stock 305 is only in the Ultimate Edition."
  - q: "Where do you buy Zombix in GTA 6?"
    a: "At convenience stores. There are 72 across Leonida, from 247 and Xero Food Mart branches to one-off country stores, so there is nearly always one close by. They also sell pet food and groceries."
  - q: "Which shops count for the Well Dressed and Grocery Shopper challenges?"
    a: "Well Dressed wants more than $5,000 spent on clothes, so any clothing store counts. Grocery Shopper wants more than $250 spent at convenience or liquor stores in one day."
  - q: "Do you need car washes in GTA 6?"
    a: "No, they're optional. All six are in Vice City, and repairing a car at a Pay 'n' Spray or mod shop cleans it anyway."
sources:
  - label: "PowerPyx: shop location pages"
    url: "https://www.powerpyx.com/gta-6-collectible-guide-progress-database/"
    note: "Ammu-Nation, mod shop, Pay 'n' Spray and car wash pages read Nov 21, 2026; clothing and convenience store pages Nov 24. Full list in src/_data/shops.json. Trusted source."
  - label: "Our own data"
    url: "/walkthrough/welcome-to-vice-city/"
    note: "Buying and registering cars at Pay 'n' Spray from Welcome to Vice City; Standard Tracker cars sell there in Chapter 3 (money and fences guides); challenge names from challenges.json; Ultimate Edition shops from editionItems.json (Rockstar)."
---

> **Note:** First pass. Names, counties and shop types come from a trusted guide; the wording is ours. We only show an area where the source gives one, so most gun stores, mod shops, souvenir shops and thrift stores are listed by county for now. Nothing here is checked in our own game yet.

<div class="chal-cats">
{%- for t in shops.types %}
<a class="chal-cat" href="#{{ t.id }}"><span class="lab">{{ t.n }}</span><span class="pct">{{ t.items.length }}</span></a>
{%- endfor %}
</div>

<h2 id="what">What each shop is for</h2>

<div class="shop-what">
<div class="shop-what-c"><h3>Ammu-Nation</h3><p>Weapons, ammo, body armour and parachutes. Every store has at least one unique weapon variant. The map icon shows the store type: <b>Limited</b>, <b>Standard</b>, <b>Hunting</b> or <b>Expanded</b>, which has the biggest range.</p><p class="shop-ch">Challenges: <a href="/guides/challenges/#shopping">Well Armed, Stylishly Armed, Heavily Armed</a></p></div>
<div class="shop-what-c"><h3>Mod shops</h3><p>Performance parts and visual mods. Each shop is built around one kind of vehicle, so take a lowrider to the lowrider shop and a dirt bike to the dirt bike shop.</p><p class="shop-ch">Challenges: <a href="/guides/challenges/#shopping">Vehicle Modder, Custom Ride, Serious Modder</a></p></div>
<div class="shop-what-c"><h3>Pay 'n' Spray</h3><p>Repairs the car and changes its colour so the police lose track of it. After <a href="/walkthrough/welcome-to-vice-city/">Welcome to Vice City</a> you can buy and register cars there too, and in Chapter 3 cars with a Standard Tracker <a href="/guides/fences/">sell</a> at any of them. More in <a href="/guides/cars/">cars and trackers</a>.</p><p class="shop-ch">Challenges: <a href="/guides/challenges/#criminal">Carjacking, Carjacking Spree, Carjacking Pro</a></p></div>
<div class="shop-what-c"><h3>Clothing stores</h3><p>Five kinds: <b>casual and street</b>, <b>sportswear</b>, <b>formal</b>, <b>souvenir and swimwear</b> and <b>thrift</b>. The map tooltip shows the type and brand, and branches of one brand carry the same range. Most have a changing room, you can save 15 outfits, and new clothes go to the wardrobe at home. Some gun stores and mod shops sell clothes too; shoes have their own stores.</p><p class="shop-ch">Challenge: <a href="/guides/challenges/#shopping">Well Dressed</a></p></div>
<div class="shop-what-c"><h3>Convenience stores</h3><p>Zombix to heal, pet food for the animals you meet, and groceries for the fridge at home. Look for the blue shopping bag icon, or filter the map under Food &amp; Drink.</p><p class="shop-ch">Challenge: <a href="/guides/challenges/#shopping">Grocery Shopper</a></p></div>
<div class="shop-what-c"><h3>Car washes</h3><p>Purely cosmetic and optional. All six are in Vice City, and any repair cleans the car as well, so you never have to go out of your way for one.</p></div>
</div>

<h2 id="list">Every shop by county</h2>

<div class="finder">
<label class="vh" for="q-shop">Search shops</label>
<input class="search" type="search" id="q-shop" data-search="shop" placeholder="Search all shops, brands or areas" autocomplete="off">
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

> **Tip:** Type the area you're in (Ocean Beach, Capri, Waning Sands...) into the search box above to see every shop there at once: guns, clothes, snacks and repairs.

> **Tip:** Ammu-Nation's Expanded stores are the ones to visit for heavy weapons: Woodhatch is the only one in Mariana County, and five more are in and around Vice City.

<h2 id="more">Related</h2>

- [All 80 challenges](/guides/challenges/#shopping): the Shopping group is mostly done at these shops.
- [Discovered Styles](/collectibles/discovered-styles/): the tattoo magazines and watches that count for 100%.
- [Fences](/guides/fences/): who buys stolen cars, and when Pay 'n' Spray joins them.
- [Money guide](/guides/money/), the [100% checklist](/guides/100-percent-checklist/) and the [launch guide](/guides/launch-guide/#editions) for what the Ultimate Edition adds.
