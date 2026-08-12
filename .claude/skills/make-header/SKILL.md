---
name: make-header
description: Generate or fix the YAML frontmatter header for a Mathipedia article in src/content/topics/. Use this whenever the user asks to "make a header", "add frontmatter", "generate the header/metadata", fix a missing/broken header, or when a file under src/content/topics/ has no frontmatter block (build will fail without one). Also use when adding a brand-new article that needs its header filled in.
---

# Make Header

Generates the YAML frontmatter block that every file in `src/content/topics/` needs to
build successfully, by reading the article body and the schema that defines what's valid.

## Why this exists

`src/content.config.ts` defines a Zod schema for every article's frontmatter. A file with
no frontmatter, or frontmatter missing a required field, fails the Astro build. Several
files in this repo are missing headers entirely or have incomplete ones — this skill fills
them in correctly instead of guessing at a format from memory.

## Step 1: Read the schema, don't assume it

Before writing anything, read `src/content.config.ts` in the project root. It is the
source of truth for required fields, the exact `category` enum values, and any fields that
may have been added or changed since this skill was written. Do not rely on the field list
below without checking — schemas drift.

As of this writing, the schema is:

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | Non-empty string. The `<h1>` and search-result title. |
| `description` | yes | Non-empty string, one or two sentences. Used for `<meta description>`. |
| `category` | yes | One of: `concept`, `proof`, `calculator`, `pop-culture`, `history`, `reference`. |
| `tags` | no | List of free-form keywords. Blank key (`tags:`) is fine. |
| `prerequisites` | no | List of topic ids (filename without extension) a reader should know first. |
| `seeAlso` | no | List of topic ids for further reading. |
| `draft` | no | Boolean, defaults to false. Only set `true` if the user asks for a draft. |

## Step 2: Identify the target file(s)

- If the user names a file, use it.
- If the user asks to fix "files missing headers" or similar, search
  `src/content/topics/**/*.{md,mdx}` for files whose first line is not `---` — those have
  no frontmatter at all. Files whose frontmatter exists but is missing a required field
  also count as targets.
- Confirm the file list with the user before editing more than one or two files — writing
  a wrong `title`/`description` for a dozen articles at once is wasted work to undo.

## Step 3: Derive each field from the article body

Read the whole file, not just the first paragraph — later sections often clarify what the
article is actually about.

- **title** — Title Case, human-readable. Don't just de-underscore the filename
  (`Sets_of_Numbers.md` → "Sets of Numbers" is fine, but check the opening paragraph agrees
  with what the article actually covers). If a math symbol belongs in the title, plain
  LaTeX (`$e^x$`) is fine — existing articles do this in headings.
- **description** — write one or two original sentences summarizing the article; don't
  just copy the opening sentence verbatim. It has to stand alone in a search result.
- **category** — infer from the subfolder the file lives in, using this mapping (checked
  against the actual folder names in `src/content/topics/`):
  - `Concepts/` → `concept`
  - `History/` → `history`
  - `Calculators/` → `calculator`
  - `Culture/` → `pop-culture`
  - `Reference/` → `reference`
  - `Proofs_and_Topics/` → `proof`
  If the file sits directly under `topics/` or in a folder not in this list, ask the user
  rather than guessing — `category` is required and must be one of the exact enum values.
- **tags** — 2-4 lowercase-hyphenated keywords pulled from the article's actual content
  (e.g. `integration`, `multivariable-calculus`, `set-theory`). Look at tags already used
  elsewhere in the repo (`grep -rh "  - " src/content/topics --include=*.md*` roughly
  surfaces them) and reuse an existing tag over inventing a near-duplicate. Leave the list
  empty rather than forcing tags that don't fit.
- **prerequisites** / **seeAlso** — only fill these in if the article clearly assumes or
  points to another specific topic AND you can confirm that topic's file actually exists
  under `src/content/topics/`. A topic id that doesn't resolve to a real file fails the
  build. When in doubt, leave the key blank (`seeAlso:` with nothing after it is valid —
  it's treated the same as omitting the field).
- **draft** — omit unless the user asks for it.

## Step 4: Write the frontmatter block

Match this format (2-space indent under list fields, matching the most recently added
articles in the repo):

```yaml
---
title: Sets of Numbers
description: Exploring different sets of numbers and introductory set theory.
category: concept
tags:
  - set-theory
  - imaginary-numbers
seeAlso:
---
```

- If the file has no frontmatter, insert this block as the very first thing in the file,
  above the existing content, with a blank line after the closing `---` if the body
  doesn't already start with one.
- If the file has partial/broken frontmatter, fix it in place — don't leave a duplicate
  block.
- Leave the rest of the file untouched. This skill only touches the header.

## Step 5: Confirm before writing

`title`, `description`, and `category` require judgment calls this skill can get wrong.
Show the user the generated block before (or immediately after) writing it, especially for
`description`, and be ready to adjust on feedback.

## Step 6: Mention the house rule, don't enforce it

After writing the header, check how many `##` sections the body has. If fewer than two,
mention it to the user as a heads-up (per `CONTRIBUTING.md`, the build only warns — it
still publishes) rather than adding sections yourself; restructuring the body isn't this
skill's job.
