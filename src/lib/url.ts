/**
 * Base-path-safe URL helpers.
 *
 * The site is currently served from the root, so `href()` passes paths through almost
 * unchanged. It is still worth routing every internal link through it: the moment the
 * site moves under a path prefix — a project page at `/mathepedia/`, a docs subdirectory,
 * a preview deployment — every hard-coded `href="/topics/derivative"` silently 404s in
 * production while continuing to work in local dev. Changing `BASE` in `astro.config.mjs`
 * is then the only edit required.
 */

const BASE = import.meta.env.BASE_URL;

/** Strip any trailing slash so we can concatenate predictably. `/` -> `` , `/wiki/` -> `/wiki` */
const ROOT = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

/** Prefix an absolute site path with the deployment base path. */
export function href(path: string): string {
  if (EXTERNAL.test(path) || path.startsWith('#')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${ROOT}${normalized}` || '/';
}

export function topicHref(id: string): string {
  return href(`/topics/${id}/`);
}

export function categoryHref(category: string): string {
  return href(`/categories/${category}/`);
}

/** Absolute URL, for canonical links and Open Graph tags. */
export function absoluteHref(path: string, site: URL | undefined): string {
  return new URL(href(path), site ?? 'https://cj-cate.github.io').toString();
}
