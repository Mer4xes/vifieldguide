---
title: Story choices
headline: Choices and Consequences
kicker: Story
seoTitle: "GTA 6 Choices: Every Story Decision and What It Changes"
description: "Every choice in the GTA 6 story missions we have covered, mission by mission: what you can pick, what each option leads to, and which ones lock you out of rewards."
summary: The decisions the story hands you, mission by mission, with what each option leads to. Most only change the scenes you see; a few decide whether you get a reward.
order: 5
glow: violet
spoilerFree: true
updated: 2026-11-19
tldr:
  - "Most choices so far only change **which scenes you see**. Both options finish the mission and pay the same."
  - "A few decide **whether you get the rest of a job**. In [Dubious Provenance](/walkthrough/dubious-provenance/), saying no in Part 1 or 2 closes off the later parts and their payout."
  - "Choices that give away the plot are behind spoiler blocks. Tap to reveal them."
faq:
  - q: "Do choices matter in GTA 6?"
    a: "Mostly for what you see, not where the story goes. In the missions covered here, both options finish the mission, and the ones that pay out pay the same. The exceptions are optional parts of a job: turning someone down can lock you out of later parts and their rewards."
  - q: "Can a choice make you miss something in GTA 6?"
    a: "Yes. In Dubious Provenance, if you don't give Halifax the statue and never make the optional call afterwards, Parts 2 and 3 are gone once Chapter 3 ends, along with about $2,500 and a '32 Hustler. It does not block the story or 100% completion."
  - q: "Should you trust Halifax in GTA 6?"
    a: "If you want the whole job, yes. Only trusting him at the motel opens Part 3 of Dubious Provenance, where the cash and the '32 Hustler are."
  - q: "Does it matter if Jason helps in Afternoon Delight?"
    a: "No. Helping is the longer route with more scenes; not helping is quicker with a harder chase. Both end the same way and pay $10,000."
---
{%- set groups = collections.missions | choicesByChapter %}
Each mission below has a choice you make in the moment. The list grows as we write more of the [walkthrough](/walkthrough/), and every mission page has the same box near the top.

> **Note:** First pass. These come from mission guides that agree with each other, not yet from our own playthrough.

{% for g in groups %}
<h2 class="choice-ch">{{ g.chapter }}</h2>
{%- for m in g.missions %}
<div class="choice-mission">
<p class="choice-mtitle"><span class="mno">Mission {{ m.data.order | pad }}</span><a href="{{ m.url }}#choices">{{ m.data.title }}</a>{% if m.data.missables and m.data.missables.length %}<span class="flag">Missable</span>{% endif %}</p>
{%- set choices = m.data.choices %}
{% include "partials/choices.njk" %}
</div>
{%- endfor %}
{% endfor %}
