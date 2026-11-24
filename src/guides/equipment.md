---
title: All 12 pieces of equipment
headline: Every Tool and When You Get It
kicker: Equipment
seoTitle: "GTA 6 Equipment: All 12 Tools and How to Unlock Them"
description: "Every piece of equipment in GTA 6: binoculars, Slim Jim, Snap Gun, Key Cloner, Cut-Off Tool, Dye Pack Jammer and the rest, which mission unlocks each one and what it opens."
summary: All 12 tools, from the binoculars to the Key Cloner, with the mission that hands each one over and what it lets you break into.
order: 3
glow: pink
spoilerFree: true
updated: 2026-11-24
facts:
  - { k: Equipment, v: "12", status: Reported }
  - { k: From the story, v: "10", status: Reported }
  - { k: Bought, v: "Headphones, masks", status: Reported }
  - { k: Full kit by, v: "Chapter 3", status: Reported }
tldr:
  - "**Ten tools come with missions in Chapters 1 to 3**, the story ones and the fences' first jobs. None of them is marked as missable. Headphones and masks you can buy."
  - "**Most of it works on its own.** The Slim Jim, Pry Bar, Duffel Bag and Key Cloner come out when you need them; the rest sit in the item wheel next to your weapons."
  - "**The full break-in kit is ready in Chapter 3**, once you've done Meet the Heders, Credit Check, Randy's Zorrusso job and Yasmani's first store."
  - "Your equipment is listed under **Progress › Equipment** in the pause menu."
faq:
  - q: "How many pieces of equipment are there in GTA 6?"
    a: "12: binoculars, flashlight, duffel bag, headphones, pry bar, masks, metal detector, Slim Jim, Snap Gun, Cut-Off Tool, Key Cloner and Dye Pack Jammer. You'll find them under Progress › Equipment in the pause menu."
  - q: "How do you get the Slim Jim in GTA 6?"
    a: "It comes from the Chapter 2 mission Moses, where the car fence gives it to you. After that you can open locked cars without breaking the window."
  - q: "How do you get the Key Cloner in GTA 6?"
    a: "From the Chapter 3 job Steal the Zorrusso for Randy (Clonin' Keys, Makin' GS). It's a phone app that opens keyless high-end cars you can't hotwire."
  - q: "How do you open the yellow SCOOP containers in GTA 6?"
    a: "With the Cut-Off Tool, which you get in the Chapter 3 mission Meet the Heders and keep afterwards."
  - q: "Where do you get the Snap Gun in GTA 6?"
    a: "Yasmani gives it to you during his jewelry jobs in Chapter 3, when you bring him the first piece. It opens locked doors without setting off the alarm."
  - q: "Where do you buy masks and headphones in GTA 6?"
    a: "Masks are sold at some Ammu-Nation stores, and story robberies put one on you when you need it. Headphones come from electronics stores and let you listen to music on foot."
  - q: "Can you miss any equipment in GTA 6?"
    a: "None of it is marked as missable. The ten tools come with missions in Chapters 1 to 3 (Gone Fishing, Lab Fees, Island Dreams, Moses, Meet the Heders, Credit Check, and Randy's and Yasmani's first jobs), and the other two are sold in shops."
sources:
  - { label: "PowerPyx: GTA 6 All Equipment", url: "https://www.powerpyx.com/gta-6-all-equipment/", note: "See equipment.json for what was taken from it. Read Nov 22, 2026." }
  - { label: "GamesRadar+: All 12 pieces of equipment explained", url: "https://www.gamesradar.com/games/grand-theft-auto/all-gta-6-equipment-explained/", note: "See equipment.json. Read Nov 22, 2026." }
---

<h2 id="what-opens-what">What opens what</h2>

<div class="tablewrap"><table class="eq-table">
<thead><tr><th>You want to</th><th>You need</th><th>Unlocked in</th></tr></thead>
<tbody>
{%- for r in equipment.uses %}{% for i in equipment.items %}{% if i.id == r.id %}
<tr><td>{{ r.need }}</td><td><a href="#{{ r.id }}">{{ r.tool }}</a></td><td>{% if i.u %}<a href="{{ i.u }}">{{ i.unlock }}</a>{% else %}{{ i.unlock }}{% endif %}</td></tr>
{%- endif %}{% endfor %}{% endfor %}
</tbody>
</table></div>

<h2 id="list">All 12, in the order you get them</h2>

<div class="filters" data-filter-group="eq" role="group" aria-label="Filter equipment">
<button type="button" class="fchip is-on" data-filter="*" aria-pressed="true">All</button>
{%- for g in equipment.groups %}
<button type="button" class="fchip" data-filter="{{ g.id }}" aria-pressed="false">{{ g.n }}</button>
{%- endfor %}
</div>

<div class="trophies chal-list eq-list" data-filter-list="eq">
{%- for g in equipment.groups %}
<div data-filter-parent>
<h3 class="chal-h" id="{{ g.id }}">{{ g.n }} <small>{{ g.lede }}</small></h3>
{%- for i in equipment.items %}{% if i.group == g.id %}
<div class="tr" id="{{ i.id }}" data-tags="{{ g.id }}"><div class="body"><div class="name">{{ i.name }}</div><div class="desc">{{ i.does }}</div><div class="eq-use"><b>How it works:</b> {{ i.use }}{% if i.n %} {{ i.n }}{% endif %}</div></div><div class="side"><span class="pin">{% if i.u %}<a href="{{ i.u }}">{{ i.unlock }}</a>{% else %}{{ i.unlock }}{% endif %}</span></div></div>
{%- endif %}{% endfor %}
</div>
{%- endfor %}
</div>

<h2 id="more">Related</h2>

- [Money guide](/guides/money/): the Key Cloner and Dye Pack Jammer are what open up the best-paying jobs.
- [Fences](/guides/fences/): who buys the cars, jewelry and bills these tools get you.
- [Side contacts](/guides/side-contacts/): Yasmani's jobs (Snap Gun), Kenton's dives (metal detector) and Randy's car list (Key Cloner).
- [Shops](/guides/shops/): Ammu-Nation for masks and gun torches.
