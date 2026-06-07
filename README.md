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

Push to `main` on GitHub. The workflow in `.github/workflows/deploy.yml` builds and publishes to GitHub Pages.

**Live site:** https://theriver.media

### Custom domain setup

The repo is already configured for `theriver.media` (`public/CNAME`, Vite `base: "/"`). You finish the rest in GitHub and Cloudflare.

#### 1. GitHub (you)

1. Open [github.com/goldbuick/the-river/settings/pages](https://github.com/goldbuick/the-river/settings/pages)
2. Under **Custom domain**, enter `theriver.media` and click **Save**
3. Wait until the DNS check passes (may take minutes after Cloudflare is configured)
4. Enable **Enforce HTTPS** when the checkbox becomes available

Source should remain **GitHub Actions** (not a branch).

#### 2. Cloudflare (you)

In **theriver.media** → **DNS** → **Records**, add:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | `@` | `goldbuick.github.io` | **DNS only** (grey cloud) |

Do not orange-cloud (proxy) this record — GitHub needs direct DNS for certificate issuance.

#### 3. Verify

- GitHub Pages settings show a green checkmark for `theriver.media`
- https://theriver.media loads the site
- Enable **Enforce HTTPS** in GitHub once the cert is ready

The legacy URL `https://goldbuick.github.io/the-river/` is no longer the canonical host.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 + shadcn/ui (SMUI theme)
- react-router-dom, react-markdown, gray-matter, Zod
- JetBrains Mono via `@fontsource-variable/jetbrains-mono`
