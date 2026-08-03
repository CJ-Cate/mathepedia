// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import { rehypeBaseUrl } from './src/lib/rehype-base-url.mjs';

// The site is served from the root, so there is no path prefix to navigate past --
// locally that is http://localhost:4321/ and in production https://mathepedia.com/.
//
// This relies on GitHub Pages' custom domain support: public/CNAME points the repo
// (CJ-Cate/mathepedia) at mathepedia.com, with DNS configured to match. Without that
// CNAME, a project repo like this one would normally be served from /mathepedia/
// instead, and this would need to be set back to '/mathepedia' to match.
const BASE = '/';

// https://astro.build/config
export default defineConfig({
  site: 'https://mathepedia.com',
  base: BASE,

  integrations: [mdx(), sitemap(), pagefind()],

  markdown: {
    // IMPORTANT: Astro 7 defaults to the Sätteri (Rust) Markdown processor, which is
    // faster but runs *no* remark/rehype plugins and does not render math -- it parses
    // `$$...$$` into a node and stops there. Opting back into the unified pipeline is
    // what makes LaTeX work. Do not remove this without a replacement for KaTeX.
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        // Slugs must be generated BEFORE KaTeX runs. Once rehype-katex expands a math
        // node it injects a pile of accessibility text into the heading, which would
        // otherwise produce unusable heading ids like "the-derivative-fx-f-x-fx".
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'append',
            properties: { className: 'heading-anchor', ariaHidden: 'true', tabIndex: -1 },
            content: { type: 'text', value: '¶' },
          },
        ],
        rehypeKatex,
        // Lets article authors write `/topics/derivative/` and have it survive the
        // `/mathepedia/` base path in production.
        rehypeBaseUrl({ base: BASE }),
      ],
    }),
  },
});
