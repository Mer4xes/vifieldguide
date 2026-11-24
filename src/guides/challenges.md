---
title: All 80 challenges
headline: Every Challenge
kicker: Completion
seoTitle: "GTA 6 Challenges: All 80 Challenges and How to Complete Them"
description: "Every challenge in GTA 6, all 80 across Combat, Criminal, Exploration, Fitness, Shopping, Sports, Survival and Vehicle, with what each asks for and a tracker for One Last Thing and 100%."
summary: All 80 challenges in eight groups, with what each one asks for. Tick them off as you go; you need 50 for the trophy and 70 for 100%.
order: 3
glow: cyan
spoilerFree: true
updated: 2026-11-24
facts:
  - { k: Challenges, v: "80", status: Reported }
  - { k: Categories, v: "8 × 10", status: Reported }
  - { k: One Last Thing, v: "50", status: Confirmed }
  - { k: 100% checklist, v: "70", status: Reported }
tldr:
  - "There are **80 challenges**, ten in each of eight categories. All of them are open **from the start**."
  - "**One Last Thing** needs any 50, and the [100% checklist](/guides/100-percent-checklist/) any 70, so you can skip the ten that annoy you most."
  - "Check your progress in the pause menu under **Progress > Challenges**. A finished one shows a tick in the corner."
  - "Many pop on their own while you play. Plan the \"in one day\" and \"within X minutes\" ones; a death or arrest usually resets them."
faq:
  - q: "How many challenges are there in GTA 6?"
    a: "80, split evenly over eight categories: Combat, Criminal, Exploration, Fitness, Shopping, Sports, Survival and Vehicle."
  - q: "How many challenges do you need for One Last Thing?"
    a: "Any 50 of the 80. The 100% checklist asks for 70, so if you are going for 100% the trophy comes on the way."
  - q: "Where do you see challenge progress in GTA 6?"
    a: "In the pause menu under Progress, then Challenges. Highlight one to see whether it is done."
  - q: "Do you have to unlock challenges first?"
    a: "No. Every challenge is available from the start of the game, though some need things you only get later, like planes, the gyms or a lot of money."
sources:
  - label: "PowerPyx: GTA 6 all challenges guide"
    url: "https://www.powerpyx.com/gta-6-all-challenges-guide/"
    note: "All 80 challenges with requirements; Progress > Challenges; available from the start; 50 for the trophy, 70 for 100%. Nov 18-19, 2026. Trusted source."
  - label: "PSNProfiles: Grand Theft Auto VI trophies"
    url: "https://psnprofiles.com/trophies/43531-grand-theft-auto-vi"
    note: "One Last Thing: complete 50 challenges. Synced from PSN."
  - label: "Press Start: Grand Theft Auto 6's full 100% checklist"
    url: "https://press-start.com.au/news/2026/11/18/grand-theft-auto-6-100-percent-checklist/"
    note: "70 of 80 challenges for 100%. Nov 18, 2026."
---

> **Note:** First pass. Names and targets come from a trusted guide and match the trophy and checklist numbers. The wording is ours, so the in-game text may read a little differently. Nothing here is checked in our own game yet.

<div class="progress" data-progress="chal:" data-total="80">
<div class="row"><span class="lab">Your challenges</span><span class="pct"><span data-done>0</span> / 80 · <span data-pct>0%</span></span></div>
<div class="bar"><i></i></div>
</div>
<p class="chal-goals"><span><b>50</b> One Last Thing</span><span><b>70</b> 100% checklist</span></p>

<div class="chal-cats">
{%- for c in challenges.categories %}
<a class="chal-cat" href="#{{ c.id }}" data-progress="chal:{{ c.id }}:" data-total="{{ c.items.length }}"><span class="lab">{{ c.n }}</span><span class="pct"><span data-done>0</span>/{{ c.items.length }}</span><span class="bar"><i></i></span></a>
{%- endfor %}
</div>

<h2 id="list">The list</h2>

<div class="finder">
<label class="vh" for="q-chal">Search challenges</label>
<input class="search" type="search" id="q-chal" data-search="chal" placeholder="Search 80 challenges" autocomplete="off">
<div class="filters" data-filter-group="chal" role="group" aria-label="Filter challenges">
<button type="button" class="fchip is-on" data-filter="*" aria-pressed="true">All</button>
<button type="button" class="fchip" data-filter="todo" aria-pressed="false">Not done</button>
<button type="button" class="fchip" data-filter="timed" aria-pressed="false">Timed or one day</button>
{%- for c in challenges.categories %}
<button type="button" class="fchip" data-filter="{{ c.id }}" aria-pressed="false">{{ c.n }}</button>
{%- endfor %}
</div>
</div>

<div class="trophies chal-list" data-filter-list="chal">
{%- for c in challenges.categories %}
<h3 class="chal-h" id="{{ c.id }}" data-tags="{{ c.id }} head">{{ c.n }}</h3>
{%- for i in c.items %}
{%- set timed = ("day" in i.req) or ("within" in i.req) or ("in a row" in i.req) %}
<label class="tr" data-track-row for="c-{{ c.id }}-{{ i.id }}" data-tags="{{ c.id }}{% if timed %} timed{% endif %}" data-text="{{ (i.name + ' ' + i.req + ' ' + c.n) | lower }}"><input class="cb" type="checkbox" id="c-{{ c.id }}-{{ i.id }}" data-track="chal:{{ c.id }}:{{ i.id }}"><div class="body"><div class="name">{{ i.name }}</div><div class="desc">{{ i.req }}{% if i.u %} <a class="more" href="{{ i.u }}">Help →</a>{% endif %}</div></div><div class="side"><span class="pin">{{ c.n }}</span></div></label>
{%- endfor %}
{%- endfor %}
</div>
<p class="nomatch" data-nomatch="chal" hidden>No challenges match that filter.</p>
<button class="reset" type="button" data-reset="chal:">Reset tracker</button>

<h2 id="tips">How to get through them</h2>

- **Let the easy ones come to you.** Joining a gym, buying a few guns, scanning a handful of cars and robbing a couple of pedestrians all happen early without trying.
- **Watch the conditions.** Lots of challenges have to be done in one in-game day, inside a time limit or without dying or being arrested. Save first, and use the *Timed or one day* filter above to see them together.
- **Pick your ten to skip.** You only need 70. Long ones like *Basketball Pro* (all 100 hoops), *Pro Angler* (every fish) or *Nest Egg* ($1.5 million in the bank) are the obvious candidates, unless you want them anyway.
- **Stack them with other goals.** Studying animals, scanning cars, collectible cards and underwater finds count toward trophies and the 100% checklist too. See [activities and collectibles](/guides/activities-and-collectibles/) and the [100% checklist](/guides/100-percent-checklist/).

See the [trophy list](/trophies/) for One Last Thing and the rest of the platinum route.
