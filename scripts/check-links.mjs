#!/usr/bin/env node
/**
 * Validates every internal link in the built site.
 *
 * A wiki accumulates dead links faster than anything else: an article gets renamed, a
 * "see also" points at a page nobody ever wrote, a heading is reworded and every anchor
 * link to it quietly stops working. None of that fails a normal build, and none of it is
 * reliably caught in review.
 *
 * This walks `dist/`, collects every `href` and `src`, and checks that each one resolves
 * to a file that exists — and, for `#fragment` links, that the target id is actually
 * present in that file.
 *
 * Run after `astro build`:  npm run check:links
 *
 * Zero dependencies on purpose. This has to keep working with no maintenance.
 */

import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('../', import.meta.url)));
const DIST = join(ROOT, 'dist');

/** Protocols and schemes that are somebody else's problem. */
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

/** Captures href="..." and src="..." values, single or double quoted. */
const LINK_PATTERN = /\b(?:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;

/** Captures id="..." so fragment links can be validated. */
const ID_PATTERN = /\bid\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;

async function walk(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(path)));
    else found.push(path);
  }
  return found;
}

/**
 * The deployment base path, read back out of the built site rather than configured twice.
 * Every page carries a canonical URL, so its pathname tells us where the site is rooted.
 */
async function detectBase(htmlFiles) {
  const home = htmlFiles.find((file) => relative(DIST, file) === 'index.html');
  if (!home) return '/';
  const html = await readFile(home, 'utf8');
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  if (!canonical) return '/';
  try {
    return new URL(canonical[1]).pathname;
  } catch {
    return '/';
  }
}

/** Map a site-absolute URL path to the file on disk that serves it. */
function resolveToFile(pathname) {
  const candidates = [
    join(DIST, pathname),
    join(DIST, pathname, 'index.html'),
    join(DIST, `${pathname}.html`),
  ];
  return candidates.find((candidate) => existsSync(candidate) && !candidate.endsWith('/'));
}

function collectIds(html) {
  const ids = new Set();
  for (const match of html.matchAll(ID_PATTERN)) {
    ids.add(match[1] ?? match[2]);
  }
  return ids;
}

async function main() {
  if (!existsSync(DIST)) {
    console.error('No dist/ directory. Run `npm run build` first.');
    process.exit(1);
  }

  const files = await walk(DIST);
  const htmlFiles = files.filter((file) => file.endsWith('.html'));
  const base = await detectBase(htmlFiles);
  const baseRoot = base.endsWith('/') ? base.slice(0, -1) : base;

  // Cache of file -> ids, so a page linked from 40 places is only parsed once.
  const idCache = new Map();
  const getIds = async (file) => {
    if (!idCache.has(file)) idCache.set(file, collectIds(await readFile(file, 'utf8')));
    return idCache.get(file);
  };

  const problems = [];
  let checked = 0;

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    const source = relative(DIST, file);

    for (const match of html.matchAll(LINK_PATTERN)) {
      const raw = (match[1] ?? match[2] ?? '').trim();
      if (!raw || EXTERNAL.test(raw) || raw.startsWith('data:')) continue;

      const [pathPart, fragment] = raw.split('#');

      // A bare "#section" link points within the current page.
      if (!pathPart) {
        if (!fragment) continue;
        checked += 1;
        const ids = await getIds(file);
        if (!ids.has(decodeURIComponent(fragment))) {
          problems.push(`${source}: "#${fragment}" — no element with that id on this page`);
        }
        continue;
      }

      // Only site-absolute paths are checked. Astro emits these everywhere, and a
      // relative path would need resolving against the serving directory, which is
      // ambiguous for extensionless URLs.
      if (!pathPart.startsWith('/')) continue;

      checked += 1;

      const withoutBase =
        baseRoot && pathPart.startsWith(`${baseRoot}/`)
          ? pathPart.slice(baseRoot.length)
          : pathPart;

      if (baseRoot && !pathPart.startsWith(`${baseRoot}/`) && pathPart !== baseRoot) {
        problems.push(
          `${source}: "${raw}" — missing the "${baseRoot}" base path. ` +
            `Use the href() helper from src/lib/url.ts, or write the link as ` +
            `"${baseRoot}${pathPart}".`,
        );
        continue;
      }

      const target = resolveToFile(decodeURIComponent(withoutBase));
      if (!target) {
        problems.push(`${source}: "${raw}" — no page or asset at that path`);
        continue;
      }

      if (fragment && target.endsWith('.html')) {
        const ids = await getIds(target);
        if (!ids.has(decodeURIComponent(fragment))) {
          problems.push(
            `${source}: "${raw}" — the page exists but has no element with id ` +
              `"${fragment}" (was a heading renamed?)`,
          );
        }
      }
    }
  }

  if (problems.length > 0) {
    console.error(`\n✗ ${problems.length} broken link(s):\n`);
    for (const problem of problems) console.error(`  ${problem}`);
    console.error(`\nChecked ${checked} internal links across ${htmlFiles.length} pages.\n`);
    process.exit(1);
  }

  console.log(
    `✓ ${checked} internal links across ${htmlFiles.length} pages all resolve (base "${base}").`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
