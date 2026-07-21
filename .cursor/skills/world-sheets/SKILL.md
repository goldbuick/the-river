---
name: world-sheets
description: >-
  Author and maintain public world sheets for The River fiction site (markdown →
  JSON pipeline). Use when adding or editing content under content/characters,
  content/locations, content/timeline, content/glossary, content/factions, or
  content/themes; when the user mentions world sheets, the World hub, or
  publishing drafts of those sheets.
---

# World sheets

Public author+reader notes for *The River*. Same draft rules as chapters.

## Before editing

1. Read this skill, then the matching topic skill if one applies.
2. Open the collection `_template.md` and any existing sheets in that folder.
3. Skim related chapter drafts in `content/chapters/` so sheets stay consistent and spoiler-light.

## File rules

| Collection | Path | URL |
|---|---|---|
| Characters | `content/characters/` | `/characters/:slug` |
| Locations | `content/locations/` | `/locations/:slug` |
| Timeline | `content/timeline/` | `/timeline/:slug` |
| Glossary | `content/glossary/` | `/glossary/:slug` |
| Factions | `content/factions/` | `/factions/:slug` |
| Themes | `content/themes/` | `/themes/:slug` |

- Filename (without `.md`) = slug. Skip files starting with `_` (templates).
- Prefer kebab-case slugs: `nicholas.md`, `the-river.md`.
- Shared frontmatter: `name`, `order` (positive int), `draft`, optional `summary`.
- Extra fields: see [reference.md](reference.md).
- **`draft: true`** until the user asks to publish; **`draft: false`** ships on theriver.media.
- Body is **reader-facing**. No secret author vault. Soften or omit major spoilers unless the user asks to publish them.

## Workflow

1. Clarify what sheet to create or deepen (ask 1–3 focused questions if needed).
2. Copy from `_template.md` or edit the existing sheet.
3. Fill frontmatter + body in the collection’s section pattern.
4. Match the site’s quiet literary tone (understated, concrete, leave mystery intact).
5. After markdown changes, run `yarn build:world` if verifying generation; `yarn dev` already rebuilds world JSON.

## Topic skills

- [world-characters](../world-characters/SKILL.md)
- [world-locations](../world-locations/SKILL.md)
- [world-timeline](../world-timeline/SKILL.md)
- [world-glossary](../world-glossary/SKILL.md)
- [world-factions](../world-factions/SKILL.md)
- [world-themes](../world-themes/SKILL.md)

## Frontmatter details

See [reference.md](reference.md).
