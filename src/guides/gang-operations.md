---
title: All 39 gang operations
headline: Every Gang Operation, Gang by Gang
kicker: Robberies
seoTitle: "GTA 6 Gang Operations: All 39 Illegal Operations and Pest Control"
description: "Every illegal gang operation in GTA 6: all 39 by gang, how to find them on the map, what counts as cleared, what's inside and how to get Pest Control. With a tracker."
summary: All 39 illegal operations sorted by gang, how to find and clear them, and the trophy, cheat and 100% items they count toward. Tick them off as you go.
order: 4
glow: pink
spoilerFree: true
updated: 2026-11-21
facts:
  - { k: Operations, v: "39", status: Reported }
  - { k: Groups, v: "8 gangs + other criminals", status: Reported }
  - { k: Trophy, v: "Pest Control", status: Confirmed }
  - { k: 100% checklist, v: "All 39", status: Reported }
tldr:
  - "**There are 39 illegal operations**, split between eight gangs and a group of smaller outfits. The 100% checklist wants every one of them."
  - "**To find them:** open the map and filter **Robberies** (the money bag) › **Illegal Operations**. Ones you haven't been to show as *Robbery Opportunity*."
  - "**An operation only counts once you've taken every key valuable.** Hover over its map icon to see the list."
  - "**Pest Control** needs one operation from each gang. Clearing 25 with your partner unlocks the **Pinhole** cheat."
faq:
  - q: "How many gang operations are there in GTA 6?"
    a: "39. Kolts & Associates and San4San have five each, Final Chapter four, the Kingfishers and the Guardia Brothers three each, and M7, La Polilla Negra and PTT Youngin$ two each. The other 13 belong to smaller outfits, grouped as other criminals."
  - q: "How do you find gang operations in GTA 6?"
    a: "On the map, filter Robberies (the money bag icon) and pick Illegal Operations. A place you haven't visited is labelled Robbery Opportunity; once you've been there it shows its own name and a yellow icon. Progress › Gangs shows how many you've found and cleared for each gang."
  - q: "Why doesn't a gang operation count as completed?"
    a: "You left a key valuable behind. Each operation has a short list of them, which you can see by hovering over its icon on the map: usually unique weapon variants, luxury watches and a safe with cash. Take all of them."
  - q: "How do you get the Pest Control trophy?"
    a: "Rob one illegal operation that belongs to each gang. Use Progress › Gangs to see which gangs you still need."
  - q: "Do gang operations respawn?"
    a: "Yes. A cleared operation is greyed out on the map for a while, then comes back and can be robbed again."
  - q: "Is the Ultimate Edition gang operation needed for 100%?"
    a: "No. The Ultimate Edition adds one extra operation for PTT Youngin$, the Illegal Goods Store. It isn't on the 100% checklist and the Gangs menu still counts two operations for that gang."
sources:
  - label: "PowerPyx: GTA 6 All Illegal Gang Operations Locations"
    url: "https://www.powerpyx.com/gta-6-all-illegal-gang-operations-locations/"
    note: "Read Nov 21, 2026 (modified Nov 20). Names, gangs and numbering, map filter, Robbery Opportunity label, Progress > Gangs, key valuables, respawn, Ultimate Edition store. See gangOps.json. Trusted source."
  - label: "Our trophy and cheat data"
    url: "/trophies/"
    note: "Pest Control text from the trophy list (Confirmed). Pinhole unlock from cheats.json (PowerPyx All Cheats)."
---

> **Note:** Areas aren't listed yet.

<div class="progress" data-progress="gangop:" data-total="{{ gangOps.total }}">
<div class="row"><span class="lab">Operations you've cleared</span><span class="pct"><span data-done>0</span> / {{ gangOps.total }} · <span data-pct>0%</span></span></div>
<div class="bar"><i></i></div>
</div>

<div class="chal-cats">
{%- for g in gangOps.groups %}
<a class="chal-cat" href="#{{ g.id }}" data-progress="gangop:{{ g.id }}:" data-total="{{ g.items.length }}"><span class="lab">{{ g.n }}</span><span class="pct"><span data-done>0</span>/{{ g.items.length }}</span><span class="bar"><i></i></span></a>
{%- endfor %}
</div>

<h2 id="how">How gang operations work</h2>

<ol class="cheat-steps">
<li><b>Find one.</b> On the map, filter <b>Robberies</b> (the money bag) › <b>Illegal Operations</b>. Places you haven't been to yet are marked <i>Robbery Opportunity</i>. Walk in and the icon turns yellow and shows the operation's name.</li>
<li><b>Check the valuables.</b> Hover over the icon on the map to see what's worth taking. It's usually a unique weapon variant or two, luxury watches and a safe with cash.</li>
<li><b>Take everything on that list.</b> Leave one valuable behind and the operation doesn't count as cleared, for the checklist or for this tracker.</li>
<li><b>Sell the drugs.</b> Operations often have narcotics lying around. Take them to a <a href="/guides/fences/">fence</a>; the 100% checklist wants $100,000 of narcotics fenced.</li>
<li><b>Keep count</b> under <b>Progress › Gangs</b> in the pause menu, which shows what you've found and cleared for each gang.</li>
</ol>

> **Tip:** Cleared operations come back. After a while the icon stops being grey and you can rob the place again, so a favourite one doubles as a steady earner.

<h2 id="list">The list</h2>

<div class="finder">
<label class="vh" for="q-gangop">Search gang operations</label>
<input class="search" type="search" id="q-gangop" data-search="gangop" placeholder="Search 39 operations" autocomplete="off">
<div class="filters" data-filter-group="gangop" role="group" aria-label="Filter gang operations">
<button type="button" class="fchip is-on" data-filter="*" aria-pressed="true">All</button>
<button type="button" class="fchip" data-filter="todo" aria-pressed="false">Not cleared</button>
</div>
</div>

<div class="trophies chal-list gangop-list" data-filter-list="gangop">
{%- for g in gangOps.groups %}
<h3 class="chal-h" id="{{ g.id }}" data-tags="head">{{ g.n }} <small>{{ g.items.length }} operation{% if g.items.length != 1 %}s{% endif %}</small></h3>
{%- for i in g.items %}
<label class="tr" data-track-row for="go-{{ i.id }}" data-tags="{{ g.id }}" data-text="{{ (i.name + ' ' + g.n) | lower }}"><input class="cb" type="checkbox" id="go-{{ i.id }}" data-track="gangop:{{ g.id }}:{{ i.id }}"><div class="body"><div class="name">{{ i.name }}</div></div><div class="side"><span class="need">#{{ i.n }}</span></div></label>
{%- endfor %}
{%- endfor %}
</div>

> **Note:** Ultimate Edition owners get one more PTT Youngin$ operation, the **Illegal Goods Store**. It's a bonus: it isn't on the 100% checklist and isn't counted here. More on what the edition adds in the [launch guide](/guides/launch-guide/).

<h2 id="rewards">Trophy, cheat and 100%</h2>

| What | Needs |
|---|---|
| **Pest Control** (trophy) | One operation from each gang |
| **Pinhole** (cheat) | 25 operations cleared with your partner |
| 100% checklist | All 39 cleared |
| **A Long Road** (trophy) | The whole 100% checklist |

<h2 id="more">Related</h2>

- [Robberies](/guides/activities-and-collectibles/#robberies): bank jobs, stick ups, Smash 'N' Grabs and vaults, with what 100% wants of each.
- [Fences](/guides/fences/): who buys the narcotics you find inside.
- [Money guide](/guides/money/), the [100% checklist](/guides/100-percent-checklist/), the [cheats](/guides/cheats/) and the [trophy list](/trophies/).
