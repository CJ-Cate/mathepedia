import { visit } from 'unist-util-visit';

/**
 * Rewrites root-relative links and images in Markdown to include the deployment base path.
 *
 * With the site served from the root this is a no-op and returns immediately. It earns
 * its place the moment `BASE` in `astro.config.mjs` becomes a path prefix: a contributor
 * writing `[the derivative](/topics/derivative/)` is writing the obviously correct thing,
 * and without this plugin that link would work in dev and 404 once deployed. The
 * alternative — asking every author to count `../` segments — is a worse deal.
 *
 * `.astro` files use the `href()` helper in `src/lib/url.ts` for the same reason. This
 * plugin covers the Markdown side, where authors have no way to call a function.
 *
 * Untouched: absolute URLs, protocol-relative URLs, fragments, and anything already
 * carrying the base prefix (so re-running is safe).
 */
export function rehypeBaseUrl({ base = '/' } = {}) {
  const root = base.endsWith('/') ? base.slice(0, -1) : base;

  return () => (tree) => {
    if (!root) return;

    visit(tree, 'element', (node) => {
      const attribute = node.tagName === 'a' ? 'href' : node.tagName === 'img' ? 'src' : null;
      if (!attribute) return;

      const value = node.properties?.[attribute];
      if (typeof value !== 'string') return;

      // Only root-relative paths. `//cdn.example.com` is protocol-relative, not local.
      if (!value.startsWith('/') || value.startsWith('//')) return;
      if (value === root || value.startsWith(`${root}/`)) return;

      node.properties[attribute] = `${root}${value}`;
    });
  };
}
