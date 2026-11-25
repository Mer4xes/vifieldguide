---
title: Wyman's Classic Cars
headline: Wyman's Classic Car Collection
kicker: Cars
seoTitle: "GTA 6 Wyman's Classic Car Collection: All 15 Scrap Locations"
description: "Every car in Wyman's Classic Car Collection in GTA 6 (Ultimate Edition): how it starts after Thrillbillies, all 15 scrap spots for the Transgressor, Riata, Mamba GT and Reynolds Kit Car, the $1,500 fee per car, the Deviant, and how to keep them."
summary: The Ultimate Edition's special commission, car by car. Where every piece of scrap is, what Wyman charges, what you need for the Kit Car and how to keep the cars once they're rebuilt, with a checklist that saves.
order: 4
glow: gold
spoilerFree: true
updated: 2026-11-25
image: /assets/img/full/ue-wyman-car-collection-01.webp
facts:
  - { k: Edition, v: "Ultimate only", status: Confirmed }
  - { k: Cars, v: "5", status: Reported }
  - { k: Scrap to scan, v: "15", status: Reported }
  - { k: Fee per car, v: "$1,500", status: Reported }
tldr:
  - "**Ultimate Edition only.** Without it the collection never shows up. It starts in Chapter 2: once [Thrillbillies](/walkthrough/thrillbillies/) is done and you've got the '67 Vapid Dominator buggy, Wyman texts about his first car. Track it under **Exploration** on the Touch Pad."
  - "**Find the scrap, scan it, pay.** Each car is spread over three to five spots. Photograph every piece with **WAiNK**, wait for Wyman's text, send him **$1,500** through **BuckMe**, then pick the car up at his scrapyard."
  - "**Five cars, in this order:** '67 Transgressor (Port Gellhorn), '70 Riata (the Keys), '64 Mamba GT (Kelly County and the north coast), Reynolds Kit Car (all over) and the '72 Deviant, which needs no scrap at all."
  - "**The Kit Car needs the [Cut-Off Tool](/guides/equipment/#cut-off-tool)** from [Meet the Heders](/walkthrough/meet-the-heders/) in Chapter 3, because one piece is locked in a SCOOP container."
  - "**Keep them:** register a finished car for **$100** or park it in a [garage](/guides/garages/). One you leave behind goes back to Wyman's scrapyard, where you can still collect it later."
faq:
  - q: "How do you start Wyman's Classic Car Collection in GTA 6?"
    a: "You need the Ultimate Edition. In Chapter 2, finish Thrillbillies and collect the '67 Vapid Dominator buggy; shortly after, Wyman texts you about a '67 Transgressor. That starts the chain, which you can follow under Exploration on the Touch Pad."
  - q: "How many cars are in Wyman's collection?"
    a: "Five: the '67 Transgressor, '70 Riata, '64 Mamba GT, Reynolds Kit Car and '72 Deviant. The first four are found as scrap you scan with WAiNK (3, 3, 4 and 5 pieces, 15 in all); the Deviant needs no hunt."
  - q: "How much does Wyman charge to restore a car?"
    a: "$1,500 for each of the four cars you find scrap for, paid to him through the BuckMe app when he texts you. He asks for a fee for the Deviant too."
  - q: "Do you need the Ultimate Edition for Wyman's cars?"
    a: "Yes. The Classic Car Collection is one of the Ultimate Edition's special commissions and doesn't appear in the Standard Edition."
  - q: "Where are the Transgressor parts in GTA 6?"
    a: "All three are in Port Gellhorn: in the trailer park just north of Sarena's Bargain Store, in the garage behind a house with sunflower ornaments across from the Kolt & Associates stash house, and along the fence on the dirt track behind the Dirt Merchants mod shop."
  - q: "Why can't I finish the Reynolds Kit Car?"
    a: "One of its five pieces is inside a yellow SCOOP container at Wild Hog Point, and you need the Cut-Off Tool to open it. You get that in the Chapter 3 mission Meet the Heders."
  - q: "What happens if you don't keep a restored car?"
    a: "It goes back to Wyman's scrapyard, so it isn't lost. Register it at a Pay 'n' Spray for $100 or keep it in a garage to have it for good, and Scooter Bros can then bring it to you."
sources:
  - { label: "Classic car data", url: "/guides/classic-cars/", note: "See src/_data/classicCars.json for every source and what was taken from it. Read Nov 25, 2026." }
---

<div class="chal-cats rob-cats">
{%- for c in classicCars.cars %}
<a class="chal-cat" href="#{{ c.id }}" data-progress="wyman:{{ c.id }}:" data-total="{{ c.spots.length + 1 }}"><span class="lab">{{ c.name }}</span><span class="pct"><span data-done>0</span>/{{ c.spots.length + 1 }}</span><span class="bar"><i></i></span></a>
{%- endfor %}
</div>

<h2 id="how">How the collection works</h2>

<ol class="cheat-steps">
<li><b>Get the buggy first.</b> In Chapter 2, after <a href="/walkthrough/thrillbillies/">Thrillbillies</a>, Wyman hands you the '67 Vapid Dominator. Soon after, he texts about the first car he's after.</li>
<li><b>Scan every piece.</b> Go to each spot, open <b>WAiNK</b> and photograph the scrap. Some pieces are behind garage doors or gates you have to open or break.</li>
<li><b>Wait, then pay.</b> After the last scan Wyman needs a few days in-game. He texts when the work is done and asks for his fee: send it through <b>BuckMe</b> on the phone.</li>
<li><b>Pick it up.</b> A marker appears at Wyman's scrapyard. Collect the car, then register it or drive it into a garage to keep it.</li>
</ol>

> **Note:** The checklist counts each piece of scrap plus one tick for the finished car. Ticks are saved in this browser.

<div data-filter-list="wyman">
{%- for c in classicCars.cars %}
<div class="rr-sec wy-car" id="{{ c.id }}">
<h2>{{ c.name }} <small class="gar-lede">{{ c.kind }} · {{ c.region }}</small></h2>
<div class="wy-head">
{%- if c.img %}<figure class="wy-fig"><img src="/assets/img/ed/{{ c.img }}.webp" alt="{{ c.alt }}" width="800" height="450" loading="lazy" decoding="async"><figcaption class="fig-credit">Image: Rockstar Games</figcaption></figure>{% endif %}
<div class="wy-txt">
<p class="stunt-how">{{ c.lede }}</p>
{%- if c.needs %}
<p class="wy-need"><span class="chip rum">Needs</span> The <a href="{{ c.needs.u }}">{{ c.needs.t }}</a> from <a href="{{ c.needs.mu }}">{{ c.needs.m }}</a> ({{ c.needs.ch }}).</p>
{%- endif %}
</div>
</div>
<div class="trophies chal-list gangop-list rob-list">
{%- for s in c.spots %}
<label class="tr" data-track-row id="{{ c.id }}-{{ s.id }}" for="wy-{{ c.id }}-{{ s.id }}"><input class="cb" type="checkbox" id="wy-{{ c.id }}-{{ s.id }}" data-track="wyman:{{ c.id }}:{{ s.id }}" aria-label="Mark {{ c.name }} scrap {{ loop.index }} scanned"><div class="body"><div class="name">{{ loop.index }}. {{ s.name }}</div><div class="desc"><b>{{ s.area }}{% if s.county %} · {{ s.county }}{% endif %}.</b> {{ s.where }}</div></div><div class="side"><span class="need">Scan</span></div></label>
{%- endfor %}
<label class="tr wy-done" data-track-row for="wy-{{ c.id }}-done"><input class="cb" type="checkbox" id="wy-{{ c.id }}-done" data-track="wyman:{{ c.id }}:done" aria-label="Mark {{ c.name }} collected"><div class="body"><div class="name">{{ c.name }} collected</div><div class="desc">{% if c.spots.length %}Wyman texts once the work is done. Pay him through BuckMe, then pick the car up at the scrapyard marker.{% else %}Wait for Wyman's call, pay his fee through BuckMe and pick the car up at the scrapyard.{% endif %}</div></div><div class="side"><span class="need">{% if c.fee %}{{ c.fee | usd }}{% else %}Fee{% endif %}</span></div></label>
</div>
</div>
{%- endfor %}
</div>
<button class="reset" type="button" data-reset="wyman:">Reset the list on this page</button>

<h2 id="keep">Keeping the cars</h2>

A finished car is yours to drive away, but it only stays yours if you **register it as a personal vehicle** (**$100** for Wyman's cars at a Pay 'n' Spray) or park it in one of your [garages](/guides/garages/). Leave it lying around and it ends up back at Wyman's scrapyard, where you can pick it up again. Registered cars count toward [On the Spot](/trophies/on-the-spot/), and [Scooter Bros](/guides/cars/#scooter-bros) can deliver them anywhere. Garage space is the limit, so plan where five extra classics will live. More in the [cars guide](/guides/cars/#personal).

> **Tip:** Do the Transgressor while the story keeps you in Kelly County in Chapter 2, then pick up the Mamba GT's Kelly County pieces on the same trips. The Riata sends you back to the Keys, and the Kit Car has to wait for the Cut-Off Tool in Chapter 3 anyway.

<h2 id="more">Related</h2>

- [Garages](/guides/garages/): where to keep five more cars, and what each garage costs.
- [Cars guide](/guides/cars/): registering, trackers, Scooter Bros and the impound.
- [Side contacts](/guides/side-contacts/#billy): Billy's strand, where you first meet Wyman.
- [Equipment](/guides/equipment/#cut-off-tool): the Cut-Off Tool for the Kit Car's container.
- [Everything in the Ultimate Edition](/guides/launch-guide/#editions).
