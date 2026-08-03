# Mathepedia

A free encyclopedia of mathematics — a wiki, but only for math.

Every article works down the page from the intuitive explanation to the technical one, so
a reader can stop at whatever depth answers their question. Alongside the mathematics
itself there are proof walkthroughs, calculator references, and a look at where math turns
up in pop culture.

The site is fully static. There is no database, no account system, and no server — just
HTML on GitHub Pages. Editing it means editing a Markdown file and opening a pull request.

**Live at:** https://cj-cate.github.io

---

## Running it locally

Requires **Node 22.12 or newer** (Astro 7 will not start on older versions).

```bash
npm install
npm run build   # do this once first — see the note on search below
npm run dev     # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Builds the static site into `dist/` |
| `npm run preview` | Serves `dist/` exactly as it will be deployed |
| `npm run check` | Type-checks `.astro` and `.ts` files |
| `npm run check:links` | Validates every internal link in `dist/` |
| `npm run verify` | `build` followed by `check:links` — what CI runs |

> **Search in dev mode:** the search index is generated during `npm run build`, and the
> dev server reads whatever was built last. Run `npm run build` once before `npm run dev`
> or the search box will return nothing. This is a Pagefind limitation, not a bug.

## Writing an article

See **[CONTRIBUTING.md](CONTRIBUTING.md)**. The short version: add a `.mdx` file to
`src/content/topics/`, give it frontmatter, and write at least two `##` sections.

## How it fits together

```
src/
  content/topics/*.mdx     Every article. The file name becomes the URL.
  content.config.ts        Frontmatter schema — the source of truth for what a page can declare.
  components/              Desmos, Wolfram, Callout, Figure, Infobox, and site chrome.
    mdx-components.ts      The map that makes those usable in articles without imports.
  layouts/                 BaseLayout (page shell) and TopicLayout (article chrome).
  pages/                   Routes. topics/[...id].astro renders every article.
  lib/                     Collection queries, the base-path helper, the base-URL rehype plugin.
  styles/global.css        The entire design. No framework.
scripts/check-links.mjs    Post-build dead-link checker.
```

### Things worth knowing before you change the config

**The Markdown processor is not the default one, on purpose.** Astro 7 ships Sätteri, a
Rust Markdown pipeline that is considerably faster but runs no remark or rehype plugins
and does not render math — it parses `$$...$$` into a node and stops there. `astro.config.mjs`
explicitly opts back into the unified pipeline so that `remark-math` and `rehype-katex`
can run. Removing that leaves every equation on the site rendering as literal `$` signs.

**Internal links go through a helper.** The site is served from the root today, so
`href()` in `src/lib/url.ts` is close to a pass-through — but use it in `.astro` files
anyway. If the site ever moves under a path prefix, changing `BASE` in `astro.config.mjs`
is then the only edit needed, instead of hunting every hard-coded link. In article
Markdown just write `/topics/derivative/` normally; a rehype plugin handles the prefix.
`npm run check:links` fails the build if anything slips through.

**Equations render at build time.** KaTeX runs during the build and the output is plain
HTML and MathML, so no JavaScript runs in the reader's browser to display math.

## Deploying

Pushing to `main` builds and deploys automatically via
`.github/workflows/deploy.yml`. Pull requests are built and link-checked but not deployed.

One-time setup on a fresh repository: **Settings → Pages → Source → GitHub Actions**.

**The repository must be named `cj-cate.github.io`.** The site is configured to serve
from the root (`BASE = '/'` in `astro.config.mjs`), and GitHub Pages only serves from the
root for a *user* page, which is the repository matching your username. A repository named
`mathepedia` would be served from `cj-cate.github.io/mathepedia/` instead — if you go that
route, set `BASE` back to `'/mathepedia'` and everything else follows automatically.

The same applies to a custom domain: point the domain at the repo, add a `CNAME` file to
`public/`, and leave `BASE` as `'/'`.
