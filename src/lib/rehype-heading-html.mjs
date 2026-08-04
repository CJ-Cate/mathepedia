import { toHtml } from 'hast-util-to-html';
import { visit } from 'unist-util-visit';

/**
 * Captures the rendered HTML of every heading so the table of contents can show math.
 *
 * Astro collects headings by concatenating the raw text nodes it finds inside each `h*`.
 * That works right up until a heading contains an equation. By the time Astro looks,
 * rehype-katex has replaced `$\Bbb N$` with a MathML tree *and* a visual tree *and* an
 * `<annotation>` holding the original LaTeX source -- so flattening to text yields
 * "The Natural Numbers N\Bbb NN" rather than anything a reader should see.
 *
 * There is no way to recover the math from that string, so we grab the markup while it
 * still exists. Each heading's children are serialized here and handed to the page
 * through `remarkPluginFrontmatter`, which is the supported channel for a plugin to pass
 * data out of the Markdown pipeline. `heading.text` is left alone: it stays the plain
 * fallback, and nothing else in the site reads it.
 *
 * Must run AFTER rehype-katex (there is no math markup before that) and after
 * rehype-slug, which supplies the `id` used as the key.
 */
export function rehypeHeadingHtml() {
  return () => (tree, file) => {
    const headingHtml = {};

    visit(tree, 'element', (node) => {
      if (!/^h[1-6]$/.test(node.tagName)) return;

      const id = node.properties?.id;
      if (typeof id !== 'string' || !id) return;

      // Drop the "¶" permalink rehype-autolink-headings appends. It belongs on the
      // heading itself, where it links somewhere; in the contents list it would be a
      // second link inside a link.
      const children = node.children.filter((child) => !isHeadingAnchor(child));

      headingHtml[id] = toHtml({ type: 'root', children });
    });

    file.data.astro ??= {};
    file.data.astro.frontmatter ??= {};
    file.data.astro.frontmatter.headingHtml = headingHtml;
  };
}

function isHeadingAnchor(node) {
  if (node.type !== 'element' || node.tagName !== 'a') return false;

  const className = node.properties?.className;
  const names = Array.isArray(className) ? className : [className];
  return names.includes('heading-anchor');
}
