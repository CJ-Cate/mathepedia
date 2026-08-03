import Callout from './Callout.astro';
import Desmos from './Desmos.astro';
import Figure from './Figure.astro';
import Infobox from './Infobox.astro';
import Wolfram from './Wolfram.astro';

/**
 * Components every article can use without importing anything.
 *
 * These are handed to `<Content components={mdxComponents} />` in the article route, so
 * a contributor writing `src/content/topics/foo.mdx` can drop `<Desmos id="..." />`
 * straight into the prose. No import lines, no build config — that is the whole point.
 *
 * Adding a component here makes it available to every article at once. Document it in
 * CONTRIBUTING.md when you do.
 */
export const mdxComponents = {
  Callout,
  Desmos,
  Figure,
  Infobox,
  Wolfram,
};
