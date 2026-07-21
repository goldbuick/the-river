---
name: world-locations
description: >-
  Draft and deepen public location sheets for The River under content/locations/.
  Use when creating or editing places, the river, shores, towns, interiors,
  atmosphere, or setting notes for the World section.
---

# World locations

Read [world-sheets](../world-sheets/SKILL.md) first, then this skill.

## Goal

Produce a reader-facing place sheet: how it feels, who goes there, how it connects to the rest of the world.

Central seed: `content/locations/the-river.md`.

## Steps

1. Read `content/locations/_template.md` and existing location sheets.
2. If creating: kebab-case slug; set `kind`, `order`, `draft: true`, short `summary`.
3. Ask only what’s needed:
   - What does a visitor notice first (sound, light, water, people)?
   - Who belongs here vs. who is passing through?
   - Which other sheets (characters, factions, glossary) link here?
4. Fill **Atmosphere**, **Who goes there**, **Connections**, **Notes**.
5. Keep the river slightly unexplained — mood and behavior over lore dumps.
6. Align with chapter imagery when chapters already mention the place.

## Style

- Sensory and specific; avoid travel-brochure lists.
- Connections should name other sheets or chapter beats when known.

## Done when

- Valid frontmatter (`name`, `kind`, `order`, `draft`)
- Sheet under `content/locations/`
- Atmosphere section has at least one concrete paragraph before publishing
