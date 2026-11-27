---
title: Patch notes and updates
headline: Every Update and What It Fixed
kicker: Updates
seoTitle: "GTA 6 Patch Notes: Update 01.002.002 and Every Update So Far"
description: "All GTA 6 updates in one place: version 01.002.002 from November 23 and what it fixes (crashes, phone calls, autosave, wanted level, fences, the gym deadlift bar, weather), download sizes on PS5 and Xbox, and how to check your version."
summary: The latest GTA 6 version, what each update changed, how big it is on PS5 and Xbox, and which parts of this guide it touches.
order: 1
glow: cyan
spoilerFree: true
updated: 2026-11-27
facts:
  - { k: Latest version, v: "01.002.002", status: Reported }
  - { k: Released, v: "Nov 23, 2026", status: Reported }
  - { k: PS5 download, v: "About 604 MB", status: Reported }
  - { k: Xbox download, v: "About 1.6 GB", status: Reported }
tldr:
  - "**Version 01.002.002** is the first update since launch. It started rolling out on **Monday, November 23**, on PS5 and Xbox Series X|S."
  - "It fixes **crashes**, **phone calls that didn't come through** (including ones that unlock missions), **autosave**, a **wanted level you couldn't lose**, **partners not handing over bags for fences**, the **gym deadlift bar** and **weather that didn't change**."
  - "Stuck waiting for a call to start the next mission? **Install the update first.**"
  - "It rolls out in stages, so you may get it a few hours later than others."
  - "Weather still stuck on PS5 after updating? Clearing the console's system cache from Safe Mode has helped players; [steps below](#weather)."
faq:
  - q: "What is the latest GTA 6 update?"
    a: "Version 01.002.002, which started rolling out on November 23, 2026. It is about 604 MB on PS5 and about 1.6 GB on Xbox Series X|S, and it is the first update since the game came out."
  - q: "What does GTA 6 update 01.002.002 fix?"
    a: "Seven things: several crashes, phone calls that didn't trigger (including calls that move the story on or unlock missions), autosave not working properly, a wanted level that couldn't be lost, partners not handing over bags to sell at fences, the gym deadlift bar, and weather that stayed the same for too long."
  - q: "Why haven't I got the GTA 6 update yet?"
    a: "It goes out in stages over the day rather than to everyone at once, and on PS5 in waves. If it hasn't arrived, check for it by hand (see below) or wait a few hours."
  - q: "How do I check for a GTA 6 update?"
    a: "On PS5, highlight the game, press Options and choose Check for Update. On Xbox, open My games & apps and look under Updates. The version number shows in the game's information on PS5."
  - q: "My next mission won't start because a call never came. What do I do?"
    a: "Install update 01.002.002. It fixes calls that didn't trigger, among them the ones that progress the story and unlock missions. Our walkthrough says on each mission page who contacts you and when."
  - q: "Why is the weather always sunny in GTA 6?"
    a: "Weather that never changes was one of the bugs update 01.002.002 set out to fix, but some PS5 players still get the same sunny skies for days. Players report that clearing the PS5 system cache from Safe Mode gets the weather moving again: turn the console off, hold the power button until the second beep, connect the controller by USB, press PS and choose Clear Cache and Rebuild Database, then Clear System Software Cache. Your saves stay where they are."
  - q: "Did GTA 6 have a day one patch?"
    a: "Two updates went out to preloaded copies before launch: 01.002.000 on November 13 and 01.002.001 from November 16. No notes were published for either of them."
sources:
  - label: "Weather workaround"
    note: "GamesRadar (Nov 26, 2026, trusted): weather still stuck after the first update, PS5 fix from a player post: power off, hold power until it beeps for Safe Mode, clear system cache, restart. PlayStation LifeStyle (Nov 26, 20:02 UTC): same fix with Sony's menu names (Clear Cache and Rebuild Database > Clear System Software Cache), second beep, USB controller, PS button; saves not deleted; Rockstar has not confirmed it. Neither says whether Xbox is affected, so the page says PS5 only."
  - label: "Patch data"
    note: "Per-update sources are in src/_data/patches.json (Push Square, Vice, Game Rant, ComicBook.com, PlayStation LifeStyle, Tech Times, RockstarINTEL). The seven 01.002.002 fixes come from Game Rant and ComicBook.com, which agree; Game Rant attributes them to Rockstar's support page 'Grand Theft Auto VI Launch Updates', which a cloud run could not fetch. Nov 23, 2026."
---

> **Note:** The version numbers, sizes and fixes on this page are reported, not read on Rockstar's own page yet. The fixes are in our own words.

<h2 id="latest">Latest: {{ patches.items[0].v }}</h2>

<div class="patches">
{%- for u in patches.items %}
<article class="patch{% if loop.first %} is-latest{% endif %}" id="v{{ u.id }}">
  <div class="patch-head">
    <span class="patch-v">{{ u.v }}</span>
    <span class="patch-when">{{ u.when }}</span>
    {%- if loop.first %}<span class="chip ok dot">Latest</span>{% endif %}
    <span class="chip rum dot">{{ u.status }}</span>
  </div>
  <p class="patch-kind">{{ u.kind }}</p>
  <dl class="patch-sizes">
    {%- for s in u.sizes %}<div><dt>{{ s.p }}</dt><dd>{{ s.s }}</dd></div>{% endfor %}
  </dl>
  <p class="patch-roll">{{ u.rollout }}</p>
  {%- if u.hasNotes %}
  <h3>What it fixes</h3>
  <ul class="patch-fixes">
    {%- for n in u.notes %}
    <li><b>{{ n.t }}</b><span>{{ n.d }}</span>{% if n.links.length %}<span class="patch-links">{% for l in n.links %}<a href="{{ l.u }}">{{ l.l }}</a>{% endfor %}</span>{% endif %}</li>
    {%- endfor %}
  </ul>
  {%- else %}
  <p class="patch-none">No patch notes were published for this update.</p>
  {%- endif %}
</article>
{%- endfor %}
</div>

<h2 id="weather">Weather still stuck after updating (PS5)</h2>

Update 01.002.002 lists a fix for weather that stays the same for too long, yet some PS5 players still see nothing but sun for days on end: no rain, fog or storms. The fix players have had luck with is clearing the console's system cache. It doesn't touch your saves.

<ol class="cheat-steps">
<li><b>Turn the PS5 off fully</b>, not into rest mode.</li>
<li><b>Hold the power button</b> and let go after the second beep, about seven seconds in. The console starts in Safe Mode.</li>
<li><b>Plug the controller in with a USB cable</b> and press the <b>PS</b> button.</li>
<li>Pick <b>Clear Cache and Rebuild Database</b>, then <b>Clear System Software Cache</b>. The console restarts by itself.</li>
<li><b>Start GTA 6</b> and play for a while out in the world; the weather can take some time to turn.</li>
</ol>

Rockstar hasn't said anything about this workaround yet, and there's no word on Xbox. When a later update deals with it, it goes at the top of this page. Hurricane weather is a separate unlock from [Freddie's strand](/guides/side-contacts/#freddie).

<h2 id="check">How to check your version</h2>

<ol class="cheat-steps">
<li><b>PS5:</b> highlight GTA 6 on the home screen, press <b>Options</b> and choose <b>Check for Update</b>. The same menu's <b>Information</b> shows the version you have.</li>
<li><b>Xbox Series X|S:</b> open <b>My games &amp; apps</b>, go to <b>Updates</b> and start any that are waiting.</li>
<li><b>Turn on automatic updates</b> so the next one installs while the console rests.</li>
</ol>

<h2 id="guide">What this means for the guide</h2>

If you got stuck before, these are worth another try after updating:

- **A mission didn't unlock** because the call that starts it never came. Each [mission page](/walkthrough/) says who gets in touch and after which mission, and the [side contacts](/guides/side-contacts/) page does the same for the optional strands.
- **A fence wouldn't take your bag** after a job with your partner. How fencing works is in the [fences guide](/guides/fences/).
- **The gym** deadlift bar is used in [Making Gainz](/walkthrough/making-gainz/).

> **Tip:** Keep making manual saves even with autosave fixed. There is no mission replay, and the [100% route](/guides/100-percent-route/) tells you when a save in its own slot matters.
