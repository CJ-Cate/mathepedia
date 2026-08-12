# Mathipedia

A free human-written encyclopedia of mathematics.

Every article works down the page from the intuitive explanation to the technical one, so
a reader can stop at whatever depth answers their question. Alongside the mathematics
itself there are proof walkthroughs, calculator references, and a look at where math turns
up in pop culture.

No accounts, no login, just markdown and HTML. Submit a change or via a pull request.

**Live at:** https://mathipedia.org

---

## Running it locally

Requires **Node 22.12 or newer** (Astro 7 will not start on older versions).

```bash
npm install
npm run build   # do this once first — see the note on search below
npm run dev     # http://localhost:4321
```

> **Search in dev mode:** the search index is generated during `npm run build`, and the
> dev server reads whatever was built last. Run `npm run build` once before `npm run dev`
> or the search box will return nothing. This is a Pagefind limitation, not a bug.

## Writing an article

See **[CONTRIBUTING.md](CONTRIBUTING.md)**. The short version: add a `.mdx` file to
`src/content/topics/`, give it frontmatter, and write at least two `##` sections.
