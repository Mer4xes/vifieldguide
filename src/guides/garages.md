---
title: Garages
headline: Every Garage, Price and Parking Space
kicker: Cars
seoTitle: "GTA 6 Garages: All Locations, Prices and Parking Spaces"
description: "Every GTA 6 garage: the 8 you buy in the Vice City Real Estate app ($160,000 for Little Boxes), the 4 the story gives you, the Southside Storage and Domestic Timbers rewards and the two edition bonus garages, with areas, prices and spaces."
summary: All 16 garages in one list. The eight you buy for Little Boxes, cheapest first, the four the story hands you, the secret one behind a keypad, Randy's thank-you garage and the two that come with an edition, with where each one is and how many cars it holds.
order: 4
glow: violet
spoilerFree: true
updated: 2026-11-26
facts:
  - { k: To buy, v: "8", status: Reported }
  - { k: All 8 cost, v: "$160,000", status: Reported }
  - { k: Free, v: "6 + 2 bonus", status: Reported }
  - { k: Spaces in all, v: "18 + 2 outside", status: Reported }
  - { k: Buy them in, v: "Vice City Real Estate", status: Reported }
tldr:
  - "**Eight garages are for sale** in the **Vice City Real Estate** app, which Lucia gets soon after [Daily Driver](/walkthrough/daily-driver/) in Chapter 2. They cost **$160,000** together, from $4,000 to $40,000, and each holds one car. Buying all eight earns [Little Boxes](/trophies/little-boxes/)."
  - "**The story gives you four more:** Port Gellhorn Station after Daily Driver, Thompson Court after Company Cars, and NE 15th Street and Pegassi Residences after mission 91 in Chapter 5. They hold one, two, two and three cars."
  - "**Southside Storage** is the reward for photographing all five [1010 Murals](/collectibles/1010-murals/). The keypad code is **1010**, and the 1010 Cheetah is waiting inside."
  - "**Domestic Timbers** in Balsero is Randy's thank-you once his car jobs are done, with Raul's old Pegassi Tempesta parked inside. [Randy's jobs](/guides/side-contacts/#randy-jobs)."
  - "Garage space is what lets you [register more cars](/guides/cars/#personal) in Jason's and Lucia's names, and [On the Spot](/trophies/on-the-spot/) wants 10 registered vehicles."
faq:
  - q: "How many garages are there in GTA 6?"
    a: "14 for everyone: 8 you buy in the Vice City Real Estate app, 4 the story gives you, Southside Storage (the reward for the 1010 Murals) and Domestic Timbers (the reward for finishing Randy's car jobs). The Ultimate Edition adds Paradise Garage in Watson Bay and the Vintage Vice City Pack adds the Shore Court garage near Ocean Beach."
  - q: "How do you buy a garage in GTA 6?"
    a: "Through the Vice City Real Estate app on the phone. It's installed shortly after the Chapter 2 mission Daily Driver, when Moses also gives Lucia a garage in Port Gellhorn for free. All eight garages for sale are listed in the app."
  - q: "How much do all the garages cost in GTA 6?"
    a: "$160,000 for the eight you can buy: Mitchell Auto Center $4,000, Persistence Road $7,600, 7th Avenue $12,000, Store n' Bolt $16,800, Wyatt Motors $21,600, Vela Rota Drive $24,000, Bonita Court $34,000 and Atlantic Court $40,000."
  - q: "What is the cheapest garage in GTA 6?"
    a: "Mitchell Auto Center in the middle of Kelly County, east of Port Gellhorn, at $4,000. Persistence Road in western Belville is next at $7,600."
  - q: "How do you get the Little Boxes trophy in GTA 6?"
    a: "Buy all eight garages that are for sale in the Vice City Real Estate app. The free story garages and the bonus garages don't count, and you need $160,000 in all."
  - q: "What is the code for the Southside Storage garage in GTA 6?"
    a: "1010. The garage is at the south tip of Salton and is marked on your map once you've photographed all five 1010 Murals. The 1010 Cheetah is inside; register it to keep it, or sell it."
  - q: "Which GTA 6 garage holds the most cars?"
    a: "Pegassi Residences, with three spaces, which the story gives you after mission 91 in Chapter 5. Thompson Court and NE 15th Street hold two each; every garage you can buy holds one."
  - q: "How many cars can you store in GTA 6?"
    a: "18 in garages once you own all 14 that everyone can get: one each in the eight you buy, Port Gellhorn Station, Southside Storage and Domestic Timbers, two each at Thompson Court and NE 15th Street, and three at Pegassi Residences. Jason's and Lucia's personal vehicles parked outside make it 20. The edition bonus garages add more on top."
sources:
  - { label: "Garage data", url: "/guides/garages/", note: "See src/_data/garages.json for every source and what was taken from it. Read Nov 24 and Nov 26, 2026." }
---

<div class="chal-cats rob-cats">
<a class="chal-cat" href="#buy" data-progress="garage:buy:" data-total="8"><span class="lab">Little Boxes</span><span class="pct"><span data-done>0</span>/8 bought</span><span class="bar"><i></i></span></a>
<a class="chal-cat" href="#story" data-progress="garage:story:" data-total="4"><span class="lab">Story garages</span><span class="pct"><span data-done>0</span>/4</span><span class="bar"><i></i></span></a>
<a class="chal-cat" href="#reward" data-progress="garage:reward:" data-total="2"><span class="lab">Rewards</span><span class="pct"><span data-done>0</span>/2</span><span class="bar"><i></i></span></a>
</div>

<h2 id="compare">The eight for sale, side by side</h2>

<div class="tablewrap"><table class="eq-table gar-table">
<thead><tr><th>Garage</th><th>Where</th><th>Price</th><th>Spaces</th></tr></thead>
<tbody>
{%- for g in garages.items | where("group", "buy") %}
<tr><td><a href="#{{ g.id }}">{{ g.name }}</a></td><td>{{ g.area }} <small>{{ g.county }}</small></td><td>{{ g.price | usd }}</td><td>{{ g.spots }}</td></tr>
{%- endfor %}
<tr class="gar-sum"><td>All eight</td><td>For <a href="/trophies/little-boxes/">Little Boxes</a></td><td>$160,000</td><td>8</td></tr>
</tbody>
</table></div>

> **Tip:** The cheap ones are spread out: Mitchell Auto Center, Store n' Bolt and Wyatt Motors are all in Kelly County, so you can start buying while the story is still there.

<div class="finder">
<div class="filters" data-filter-group="gar" role="group" aria-label="Filter garages">
<button type="button" class="fchip is-on" data-filter="*" aria-pressed="true">All</button>
<button type="button" class="fchip" data-filter="todo" aria-pressed="false">Not owned</button>
{%- for gr in garages.groups %}
<button type="button" class="fchip" data-filter="{{ gr.id }}" aria-pressed="false">{{ gr.n }}</button>
{%- endfor %}
</div>
</div>

<div data-filter-list="gar">
{%- for gr in garages.groups %}
<div class="stunt-kind rr-sec" data-filter-parent>
<h2 id="{{ gr.id }}">{{ gr.n }} <small class="gar-lede">{{ gr.lede }}</small></h2>
{%- if gr.id == "buy" %}
<p class="stunt-how">Open <b>Vice City Real Estate</b> on the phone and pick a garage. The app arrives shortly after <a href="/walkthrough/daily-driver/">Daily Driver</a> in Chapter 2. Each of these holds one car, and all eight together earn <a href="/trophies/little-boxes/">Little Boxes</a>.</p>
{%- elif gr.id == "story" %}
<p class="stunt-how">These are handed to you as you play; you don't buy them and they don't count for Little Boxes. Three of the four come late, in Chapters 4 and 5, so plan your garage space for <a href="/trophies/on-the-spot/">On the Spot</a> with the ones you buy.</p>
{%- elif gr.id == "reward" %}
<p class="stunt-how">Earned, not bought: one for photographing all five <a href="/collectibles/1010-murals/">1010 Murals</a>, one for finishing <a href="/guides/side-contacts/#randy-jobs">Randy's car jobs</a>. Neither counts for Little Boxes.</p>
{%- else %}
<p class="stunt-how">Only if you have the <a href="/guides/launch-guide/#editions">Ultimate Edition or the Vintage Vice City Pack</a>. Each comes with its own car, a weapon locker and a stash for <a href="/guides/fences/">fencing</a>.</p>
{%- endif %}
<div class="trophies chal-list gangop-list rob-list">
{%- for g in garages.items | where("group", gr.id) %}
{%- if gr.id == "bonus" %}
<div class="tr gar-bonus" id="{{ g.id }}" data-tags="{{ gr.id }}"><div class="body"><div class="name">{{ g.name }}</div><div class="desc">{{ g.area }}{% if g.county %} · {{ g.county }}{% endif %}. With the <a href="{{ g.u }}">{{ g.unlock }}</a>. {{ g.note | md | safe }}</div></div><div class="side"><span class="need">Bonus</span></div></div>
{%- else %}
<label class="tr" data-track-row id="{{ g.id }}" for="gar-{{ g.id }}" data-tags="{{ gr.id }}"><input class="cb" type="checkbox" id="gar-{{ g.id }}" data-track="garage:{{ gr.id }}:{{ g.id }}" aria-label="Mark {{ g.name }} owned"><div class="body"><div class="name">{{ g.name }}</div><div class="desc">{{ g.area }}{% if g.county %} · {{ g.county }}{% endif %}. {{ g.spots }} space{% if g.spots > 1 %}s{% endif %}.{% if g.unlock %} After <a href="{{ g.u }}">{{ g.unlock }}</a>{% if g.chapter %} ({{ g.chapter }}){% endif %}.{% endif %}{% if g.note %} {{ g.note | md | safe }}{% endif %}</div></div><div class="side"><span class="need">{% if g.price %}{{ g.price | usd }}{% else %}Free{% endif %}</span></div></label>
{%- endif %}
{%- endfor %}
</div>
</div>
{%- endfor %}
</div>
<p class="nomatch" data-nomatch="gar" hidden>Nothing left for that filter.</p>
<button class="reset" type="button" data-reset="garage:">Reset the list on this page</button>

<h2 id="what-for">What garages are for</h2>

Jason and Lucia each have **one personal vehicle** at a time. Every garage space lets you keep another car in their names, and [Scooter Bros](/guides/cars/#scooter-bros) can bring any of them to you. That makes garages the way to [On the Spot](/trophies/on-the-spot/), which wants 10 vehicles registered in the Scooter Bros app. A car you haven't registered can still be kept in a garage, but it isn't covered if it gets wrecked. More in the [cars guide](/guides/cars/).

<h2 id="more">Related</h2>

- [Cars guide](/guides/cars/): registering cars, trackers, Scooter Bros and the impound.
- [Shops](/guides/shops/): mod shops and Pay 'n' Sprays by county, to tune what you park.
- [Money guide](/guides/money/): where the $160,000 comes from.
- [1010 Murals](/collectibles/1010-murals/): the five photos that open Southside Storage.
- [Wyman's Classic Car Collection](/guides/classic-cars/): five Ultimate Edition classics that will want garage space.
