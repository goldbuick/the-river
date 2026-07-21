---
name: world-characters
description: >-
  Draft and deepen public character sheets for The River (Nicholas and others)
  under content/characters/. Use when creating or editing character sheets,
  casting, protagonists, supporting characters, appearance, voice, or
  relationships for the World section.
---

# World characters

Read [world-sheets](../world-sheets/SKILL.md) first, then this skill.

## Goal

Produce a reader-facing sheet in `content/characters/` that answers: who is this person, what can a reader know *now*, and how do they feel on the page.

Protagonist seed: `content/characters/nicholas.md`.

## Steps

1. Read `content/characters/_template.md` and existing character sheets.
2. If creating: pick a kebab-case slug; set `role`, `order`, `draft: true`, short `summary`.
3. Interview only what’s missing (max a few questions):
   - What do readers know vs. what stays withheld?
   - How do they speak / carry themselves beside the river?
   - Who do they already relate to (characters, factions, places)?
4. Write body sections from the template. Prefer concrete detail over biography dumps.
5. Cross-check names against locations / factions / timeline sheets; don’t invent contradictions.
6. Leave major plot reveals out of **What is known** unless the user wants them public.

## Style

- Literary, restrained — same register as the prologue drafts.
- “What is known” is curated public knowledge, not an omniscient dossier.
- Empty sections are fine; don’t pad.

## Done when

- Valid frontmatter (`name`, `role`, `order`, `draft`)
- Sheet lives under `content/characters/`
- Summary works as an index teaser
