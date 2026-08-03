import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Every article on Mathepedia lives in `src/content/topics/` as a `.mdx` file.
 * The file name becomes the URL: `derivative.mdx` -> `/topics/derivative`.
 *
 * If you add a field here, add it to CONTRIBUTING.md too — that file is the one
 * contributors actually read.
 */
const topics = defineCollection({
  loader: glob({ base: './src/content/topics', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    /** Article heading, shown as the <h1> and in search results. */
    title: z.string().min(1),

    /** One or two sentences. Used for <meta description> and search result snippets. */
    description: z.string().min(1),

    category: z.enum([
      'concept',
      'proof',
      'calculator',
      'pop-culture',
      'history',
      'reference',
    ]),

    tags: z.array(z.string()).default([]),

    /** Topic ids a reader should understand first. Rendered as a "Read first" note. */
    prerequisites: z.array(z.string()).default([]),

    /** Topic ids for further reading. Rendered in the article footer. */
    seeAlso: z.array(z.string()).default([]),

    /** Bumped by hand when the article changes meaningfully. */
    updated: z.coerce.date().optional(),

    /** Draft articles are visible with `npm run dev` but excluded from the built site. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { topics };
