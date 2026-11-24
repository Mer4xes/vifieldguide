---
title: All 61 cheats
headline: Every Cheat and How to Unlock It
kicker: Cheats
seoTitle: "GTA 6 Cheats: All 61 Cheat Codes and How to Unlock Them"
description: "Every cheat in GTA 6: all 61, with what unlocks each one, the 21 phone codes known so far and how to enter them. Spawn vehicles, weapons, money, weather and screen filters, with a tracker."
summary: All 61 cheats, grouped by what unlocks them, with the 21 phone codes known so far. Cheats open after the story; tick them off as you earn them.
order: 3
glow: violet
spoilerFree: true
updated: 2026-11-24
facts:
  - { k: Cheats, v: "61", status: Reported }
  - { k: Available, v: "After the story", status: Reported }
  - { k: Entered on, v: "The phone", status: Reported }
  - { k: Codes known, v: "21 of 61", status: Reported }
  - { k: Trophies and saving, v: "Blocked while cheating", status: Reported }
tldr:
  - "**Cheats open after you finish the story.** Then a **Cheats** list appears under **Progress** in the pause menu. Each cheat still has its own thing to do before it works."
  - "**To enter a code:** press **D-pad Up** to bring up the phone, hold **L1 / LB**, press **R1 / RB**, then put in the directions."
  - "**Using a cheat blocks trophies and saving.** Make a manual save first and reload it when you're done."
  - "**Just want the codes?** All 21 known codes are in one place under [codes at a glance](#codes)."
  - "Most of them come on their own while you work through the [100% checklist](/guides/100-percent-checklist/) and the [challenges](/guides/challenges/)."
faq:
  - q: "How do you enter cheats in GTA 6?"
    a: "On the phone. Press D-pad Up to take it out, hold L1 (PS5) or LB (Xbox), press R1 or RB, then enter the code with the D-pad. A code only does something once that cheat is unlocked."
  - q: "When do cheats unlock in GTA 6?"
    a: "After the story. The Cheats list shows up under Progress in the pause menu once you've finished it, and each cheat has its own requirement, like 100 workouts for Body Armor or 50 stunt jumps for Unlimited Nitrous. Three of them only need the story done."
  - q: "Do cheats disable trophies in GTA 6?"
    a: "Yes. Once you use a cheat, trophies and saving are switched off for that session. Make a manual save before you switch one on, and load it again afterwards."
  - q: "Is there a money cheat in GTA 6?"
    a: "Yes. The $250,000 cheat unlocks when you finish the story. Code: Up, Right, Down, Left, Up, Left, Down, Right."
  - q: "How many cheats are there in GTA 6?"
    a: "61: ten for the player, eleven combat cheats, 21 vehicle spawns, three that change the time or weather and 16 screen filters."
  - q: "What is the drunk cheat in GTA 6?"
    a: "Up, Left, Right, Up, Up, Left, Right, Up, Left, Right. It unlocks once you've spent $2,500 on alcohol, and it gets you and your partner drunk."
  - q: "Is there a wanted level cheat in GTA 6?"
    a: "Yes, Raise Wanted Level: Left, Down, Right, Down, Up, Right, Up. It unlocks after you've lost a 3-star wanted level 50 times. There's no cheat to lower your wanted level among the 61."
  - q: "How do you get the tank cheat in GTA 6?"
    a: "Finish all ten Survival challenges. That unlocks the Hauners Rhino Tank spawn. The P-996 Lazer jet needs every challenge in the game."
sources:
  - label: "PowerPyx: GTA 6 All Cheats"
    url: "https://www.powerpyx.com/gta-6-all-cheats/"
    note: "Read Nov 21, 2026 and re-read Nov 24 (still modified Nov 19). 61 cheats with unlock conditions, codes for 17. Cheats list under Progress > Cheats only after the story; phone entry D-pad Up, hold L1/LB, press R1/RB, then the code. Cheats disable trophies and saving (we show only the trophy part, see cheats.json). Trusted source."
  - label: "GamesRadar: All GTA 6 cheats and how to unlock them"
    url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-cheats/"
    note: "Read Nov 24, 2026 (updated Nov 22). Codes for 19; adds Drunk, Raise Wanted Level, Videotape and Dark Mirror, all others match PowerPyx. MTL Pumper: discover it in the Progress menu. Trophies and saving off for the session. Cycle Weather unlock disagrees with PowerPyx, so it is shown as not settled. Trusted. Cross-checked with Vice and Red Bull (see cheats.json)."
---

> **Note:** First pass. Names, requirements and codes come from a trusted guide; the wording is ours. Codes we don't know yet are marked as such. Nothing here is checked in our own game yet.

<div class="progress" data-progress="cheat:" data-total="{{ cheats.total }}">
<div class="row"><span class="lab">Cheats you've unlocked</span><span class="pct"><span data-done>0</span> / {{ cheats.total }} · <span data-pct>0%</span></span></div>
<div class="bar"><i></i></div>
</div>

<div class="chal-cats">
{%- for g in cheats.groups %}
<a class="chal-cat" href="#{{ g.id }}" data-progress="cheat:{{ g.id }}:" data-total="{{ g.items.length }}"><span class="lab">{{ g.n }}</span><span class="pct"><span data-done>0</span>/{{ g.items.length }}</span><span class="bar"><i></i></span></a>
{%- endfor %}
</div>

<h2 id="enter">How to enter a cheat</h2>

<ol class="cheat-steps">
<li><b>Finish the story.</b> Until then there's no Cheats list and codes do nothing.</li>
<li><b>Earn the cheat.</b> Check <b>Progress › Cheats</b> in the pause menu to see which ones you have.</li>
<li><b>Save the game</b> by hand, because a cheat blocks trophies and saving for the rest of that session.</li>
<li><b>Open the phone</b> with D-pad Up, hold <b>L1 / LB</b>, tap <b>R1 / RB</b>, then enter the directions on the D-pad.</li>
</ol>

{%- set arrows = { U: "↑", D: "↓", L: "←", R: "→" } %}
{%- set words = { U: "Up", D: "Down", L: "Left", R: "Right" } %}
<h2 id="codes">Codes at a glance</h2>

Every code known so far, in one place. The other 40 cheats are still waiting on theirs; they're in [the full list](#list) with what unlocks them.

<div class="codes-grid">
{%- for k, v in cheats.types %}
{%- for g in cheats.groups %}{% for i in g.items %}{% if i.code and i.type == k %}
<div class="code-card"><div class="cc-top"><b>{{ i.name }}</b><span class="pin">{{ v }}</span></div><div class="code" aria-label="Code: {% for d in i.code %}{{ words[d] }}{% if not loop.last %}, {% endif %}{% endfor %}">{% for d in i.code %}<span aria-hidden="true">{{ arrows[d] }}</span>{% endfor %}</div><small>{{ i.unlock }}</small></div>
{%- endif %}{% endfor %}{% endfor %}
{%- endfor %}
</div>

<h2 id="list">The list</h2>

<div class="finder">
<label class="vh" for="q-cheat">Search cheats</label>
<input class="search" type="search" id="q-cheat" data-search="cheat" placeholder="Search 61 cheats" autocomplete="off">
<div class="filters" data-filter-group="cheat" role="group" aria-label="Filter cheats">
<button type="button" class="fchip is-on" data-filter="*" aria-pressed="true">All</button>
<button type="button" class="fchip" data-filter="todo" aria-pressed="false">Not unlocked</button>
<button type="button" class="fchip" data-filter="code" aria-pressed="false">Code known</button>
{%- for k, v in cheats.types %}
<button type="button" class="fchip" data-filter="{{ k }}" aria-pressed="false">{{ v }}</button>
{%- endfor %}
</div>
</div>

<div class="trophies chal-list cheat-list" data-filter-list="cheat">
{%- for g in cheats.groups %}
<h3 class="chal-h" id="{{ g.id }}" data-tags="head">{{ g.n }} <small>{{ g.lede }}</small></h3>
{%- for i in g.items %}
<label class="tr" data-track-row for="ch-{{ i.id }}" data-tags="{{ i.type }}{% if i.code %} code{% endif %}" data-text="{{ (i.name + ' ' + i.does + ' ' + i.unlock + ' ' + cheats.types[i.type]) | lower }}"><input class="cb" type="checkbox" id="ch-{{ i.id }}" data-track="cheat:{{ g.id }}:{{ i.id }}"><div class="body"><div class="name">{{ i.name }}</div><div class="desc">{{ i.does }} <b>Unlock:</b> {{ i.unlock }}{% if i.u %} <a class="more" href="{{ i.u }}">Help →</a>{% endif %}</div>
{%- if i.code %}<div class="code" aria-label="Code: {% for d in i.code %}{{ words[d] }}{% if not loop.last %}, {% endif %}{% endfor %}">{% for d in i.code %}<span aria-hidden="true">{{ arrows[d] }}</span>{% endfor %}</div>
{%- else %}<div class="code none">Code not known yet</div>{% endif %}</div><div class="side"><span class="pin">{{ cheats.types[i.type] }}</span></div></label>
{%- endfor %}
{%- endfor %}
</div>

<h2 id="more">Related</h2>

- [All 80 challenges](/guides/challenges/): 17 of the vehicle spawns come from finishing challenges.
- [Activities and collectibles](/guides/activities-and-collectibles/): the gyms, races, stunt jumps and ranges that unlock most of the rest.
- [100% checklist](/guides/100-percent-checklist/) and the [trophy list](/trophies/).
