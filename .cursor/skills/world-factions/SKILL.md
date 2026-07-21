---
name: world-factions
description: >-
  Draft and deepen public faction sheets for The River under content/factions/.
  Use when creating or editing groups, organizations, travelers, shared aims,
  alliances, or how people cluster around the river in the World section.
---

# World factions

Read [world-sheets](../world-sheets/SKILL.md) first, then this skill.

## Goal

Describe a group by aims and relation to the river — informal clusters count (e.g. travelers), not only named orders.

Seed: `content/factions/travelers.md`.

## Steps

1. Read `content/factions/_template.md` and existing faction sheets.
2. If creating: kebab-case slug; optional `stance`; `draft: true`; short `summary`.
3. Ask:
   - Shared want or fear?
   - Who is clearly in / out?
   - How do they treat the river (avoid, tend, exploit, mythologize)?
4. Fill **Aims**, **Who belongs**, **Relation to the river**, **Notes**.
5. Name member characters only when those character sheets exist or are being created together.
6. Don’t invent a sprawling political map early — keep factions sparse until the story needs them.

## Style

- Behavioral, not bureaucratic. Skip org charts unless the story uses them.
- Stance field is a label; body carries the nuance.

## Done when

- Valid frontmatter (`name`, `order`, `draft`; optional `stance`)
- Aims and river relation are both stated
- No contradiction with character/location sheets
