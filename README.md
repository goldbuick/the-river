# The River

A standalone fiction site built with Vite, React, and markdown chapters. Uses the [SMUI terminal theme](https://smui.statico.io/) for shadcn/ui — the same aesthetic family as Holons.

## Local development

```bash
yarn install
yarn dev
```

Open [http://localhost:5173](http://localhost:5173). The dev server rebuilds `src/generated/chapters.json` from markdown before starting.

## Writing chapters

Add or edit markdown files in `content/chapters/`. Each file needs frontmatter:

```yaml
---
title: "Chapter Title"
order: 1
draft: true
summary: "Optional teaser for the table of contents"
---
```

- **`draft: true`** — visible in local dev with a draft badge; excluded from production builds
- **`draft: false`** — included when deploying to GitHub Pages

Filenames become URL slugs (e.g. `01-prologue.md` → `/chapter/01-prologue`).

## Build

```bash
yarn build
```

Runs the chapter build script in production mode (drafts excluded), TypeScript check, Vite build, and copies `index.html` to `404.html` for GitHub Pages SPA routing.

## Deploy

Push to `main` on GitHub. The workflow in `.github/workflows/deploy.yml` builds with `GITHUB_PAGES=true` and publishes to GitHub Pages at:

`https://<username>.github.io/the-river/`

Enable GitHub Pages in repo settings (Source: GitHub Actions) on first deploy.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 + shadcn/ui (SMUI theme)
- react-router-dom, react-markdown, gray-matter, Zod
- JetBrains Mono via `@fontsource-variable/jetbrains-mono`
