# World sheet frontmatter

## Shared

```yaml
---
name: "Display Name"
order: 1
draft: true
summary: "Optional one-line teaser for the index"
---
```

## Characters — `content/characters/`

```yaml
role: "protagonist" # or supporting, antagonist, etc.
aliases:
  - "Optional nickname"
```

Body sections: What is known, Appearance, Voice, Relationships, Notes.

## Locations — `content/locations/`

```yaml
kind: "river" # river, town, interior, shore, etc.
```

Body sections: Atmosphere, Who goes there, Connections, Notes.

## Timeline — `content/timeline/`

```yaml
when: "Optional freeform date or era"
```

Body sections: What happened, What is known, Notes.

Order sheets chronologically with `order` (and `when` as the human-readable label).

## Glossary — `content/glossary/`

```yaml
category: "Optional category" # place-lore, object, term, etc.
```

Body sections: Definition, Notes.

## Factions — `content/factions/`

```yaml
stance: "Optional stance toward the river or story"
```

Body sections: Aims, Who belongs, Relation to the river, Notes.

## Themes — `content/themes/`

No extra fields. Body sections: Motif, How it appears, Notes.
