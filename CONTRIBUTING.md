# Writing for Mathepedia

Articles are Markdown files. There is no account to create and no CMS to learn — add a
file, open a pull request.

If something here is unclear, that is a bug in this document. Say so in your PR.

---

## Adding an article

Create a file in `src/content/topics/`. **The file name becomes the URL**, so
`quadratic-formula.mdx` is served at `/topics/quadratic-formula/`. Use lowercase words
separated by hyphens.

The extension must be `.mdx` — it is Markdown, plus the ability to drop in an embed.

```mdx
---
title: Quadratic formula
description: The closed-form solution to any second-degree polynomial equation, and where it comes from.
category: concept
tags: [algebra, polynomials]
seeAlso: [derivative]
---

Opening paragraph. Say what the thing *is*, in plain language, before any notation.

## The idea

Start here. Intuition, pictures, why anyone cares.

## The formal statement

Then get precise.
```

That is a complete, publishable article.

### Frontmatter

| Field | Required | What it does |
| --- | --- | --- |
| `title` | yes | The `<h1>` and the name in search results |
| `description` | yes | One or two sentences. Used for search snippets and link previews |
| `category` | yes | One of: `concept`, `proof`, `calculator`, `pop-culture`, `history`, `reference` |
| `tags` | no | Free-form keywords, shown at the foot of the article |
| `prerequisites` | no | Topic ids to read first. Rendered as a "Read first" box |
| `seeAlso` | no | Topic ids for further reading. Rendered in the footer |
| `draft` | no | `true` keeps the article out of the deployed site while you work |
| `youtube` | no | A YouTube URL, embedded next to the "Contents" box at the top of the page |

"Last updated" on the article page and the home page's "Recently updated" list are both
generated automatically from git history at build time — there is no field for this, and
nothing to remember to bump.

**A file with no frontmatter does not break the build.** It is skipped, with a warning in
the build log naming the file and the fields it is missing. The trade-off is that it is
skipped *completely* — no page, no search entry, not even in `npm run dev` — because
without a `title` and a `category` there is nothing to render or file it under. So an
article you are still starting can sit in the tree without blocking anyone's deploy, but
you will not see it on the site until it has a header. The same applies to a header that
exists but is wrong, such as a `category` outside the list above.

A **topic id** is a file name without its extension. `prerequisites: [derivative]` refers
to `src/content/topics/derivative.mdx`. Pointing at a topic that does not exist fails the
build with a message naming the file and suggesting near matches. Pointing at one that
exists but is unpublished — no header yet, or `draft: true` — is not an error: the link is
dropped and the build warns.

`youtube: https://www.youtube.com/watch?v=dQw4w9WgXcQ` renders that video as an iframe
next to the "Contents" box. Every article gets a Contents box — even one with no `##`
headings gets a lone "Introduction" entry — so the video always has that space to sit in.
Accepts the same URL forms as the `<Youtube>` embed below (watch, `youtu.be`, embed,
shorts, with or without a `&t=` start time) and fails the build the same way on an
unrecognized URL. Leave the field out entirely for no video.

## The two house rules

**1. At least two `##` sections.** The build prints a warning otherwise, naming your file,
but still publishes the page — so a genuinely short article ships, and a draft stays
previewable. Treat the warning as a nudge: a one-section page is usually a stub, and stubs
are what make a wiki feel abandoned.

**2. Sections go from simple to technical, top to bottom.** This is the thing that makes
Mathepedia different from a textbook, and it is the one rule a build cannot check for you.
A reader should be able to stop at any point and have gotten a real answer at the depth
they read to.

In practice that usually means:

```
Opening paragraph — what it is, no notation
## The idea            — intuition, a picture, an analogy
## The formal version  — definitions, notation, precision
## Going further       — edge cases, generalisations, where it breaks
```

Nothing is enforced about those particular headings. Use whatever the topic wants. Just
do not open with the epsilon-delta definition.

## Math

LaTeX works anywhere in the article, via KaTeX. Equations are rendered during the build,
so no JavaScript runs in the reader's browser to display them.

**Inline** — wrap in single dollar signs:

```md
The derivative $f'(x)$ measures the slope at $x$.
```

**Display** — double dollar signs on their own lines:

```md
$$
f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}
$$
```

Multi-line derivations use `aligned`, with `&` marking the alignment point:

```md
$$
\begin{aligned}
(x + h)^2 - x^2 &= x^2 + 2xh + h^2 - x^2 \\
                &= 2xh + h^2
\end{aligned}
$$
```

KaTeX supports most but not all of LaTeX — if something renders as red error text, check
[the supported functions list](https://katex.org/docs/supported.html). Notably there is no
`\label`/`\ref`, and no user-defined macros across files.

**In headings** — this works, and the equation renders in the contents box too:

```md
### The Naturals $\Bbb N$
```

The heading's anchor is built from the LaTeX source rather than the rendered symbol, so
that section is linkable at `#the-naturals-bbb-n`. Check the id in the contents box before
linking to it.

> A literal dollar sign in prose needs escaping: `\$100`.

## Embeds

These six components are available in every article. **Do not import them** — they are
injected automatically. Just use them.

### Desmos graphs

```mdx
<Desmos id="9x3ftbrwzq" height={420}>
  Drag the slider to shrink $h$ and watch the secant become a tangent.
</Desmos>
```

Save a graph on [desmos.com](https://www.desmos.com/calculator), make it public, and take
the id from its URL: `desmos.com/calculator/`**`9x3ftbrwzq`**. The caption is optional and
takes Markdown. The graph is lazy-loaded, so it costs nothing until a reader scrolls to it.

### Wolfram|Alpha

```mdx
<Wolfram query="derivative of x^2" />
```

Renders a card linking to the computed result. Write the query how you would type it into
Wolfram|Alpha. This loads no third-party JavaScript — prefer it.

For a live embedded widget, use a widget id from
[wolframalpha.com/widgets](https://www.wolframalpha.com/widgets/):

```mdx
<Wolfram widgetId="c1b0591c0d7b7a0e4a2f4a4a783dcdba" />
```

Use widgets sparingly. They load third-party scripts and slow the page down.

### YouTube videos

```mdx
<Youtube url="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
  3Blue1Brown's visual intro to the chain rule.
</Youtube>
```

Paste whatever URL YouTube gives you — watch, `youtu.be`, embed, or shorts links all
work, with or without extra query params like `&t=90s` (carried over as the embed's
start time). The caption is optional and takes Markdown. Renders via
`youtube-nocookie.com` and is lazy-loaded, so it costs nothing until a reader scrolls
to it.

### Images

Put the file in `public/images/`, then:

```mdx
<Figure src="/images/unit-circle.svg" alt="The unit circle with common angles marked" width={480} height={480}>
  Common angles on the unit circle.
</Figure>
```

`alt` is required and the build fails without it — it is what a reader using a screen
reader gets instead of the diagram, so describe the content, not the file. `width` and
`height` are the image's real pixel dimensions; supplying them stops the page from
jumping as images load. SVG is preferred for diagrams.

### Callouts

```mdx
<Callout type="theorem" title="Fundamental Theorem of Calculus">

If $f$ is continuous on $[a, b]$, then ...

</Callout>
```

Types: `theorem`, `definition`, `proof`, `example`, `note`, `warning`. `title` is
optional and defaults to the type name. A `proof` callout gets a ∎ automatically.

> **Leave a blank line** after the opening tag and before the closing one. Without it the
> body is treated as raw text and your `$math$` will not render.

### Infobox

The summary card that floats at the top right. Put it immediately after the frontmatter:

```mdx
<Infobox title="Derivative">
**Notation** — $f'(x)$, $\dfrac{dy}{dx}$

**Field** — Calculus
</Infobox>
```

The body is ordinary Markdown, so LaTeX and links work. Keep it to a handful of rows.

## Linking to other articles

Write internal links as if the site were at the root:

```md
This follows from [the derivative](/topics/derivative/).
```

Start the path with `/` and do not count `../` segments — if the site ever moves under a
path prefix, links written this way keep working. Linking to a heading works too:
`/topics/derivative/#the-formal-definition`.

`npm run check:links` verifies every link, including heading anchors, and fails on any
that do not resolve. Dense cross-linking is the point of a wiki; link generously.

## Before opening a PR

```bash
npm run verify
```

That builds the site and checks every link. It is exactly what CI runs, so if it passes
locally the PR will go green.

To look at your article:

```bash
npm run dev
```

Worth checking: the equations render, the table of contents lists your sections, and the
page still reads sensibly on a phone-width window.

## What belongs here

Anything a curious person might want explained: concepts, proofs worth walking through,
the history of an idea, how a calculator actually computes what it shows you, math in
film and television.

Write for someone who is interested but does not already know the answer. Assume
intelligence, not background. If an article needs prior knowledge, put it in
`prerequisites` and link it rather than re-explaining it.

Corrections are as welcome as new articles. If something here is wrong, fixing it is a
one-line PR.
