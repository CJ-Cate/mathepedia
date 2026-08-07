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
/**
 * A list field that tolerates a blank YAML key.
 *
 * `seeAlso:` with nothing after it parses as `null`, not `undefined`, and Zod's
 * `.default()` only fires on `undefined` -- so a leftover empty key would otherwise fail
 * the build with "Expected type `array`, received `object`" (because `typeof null` is
 * `"object"`), which points nowhere useful. Emptying a field but keeping the key is
 * normal while editing, so treat blank and absent the same way.
 */
const list = () =>
  z
    .array(z.string())
    .nullish()
    .transform((value) => value ?? []);

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

    tags: list(),

    /** Topic ids a reader should understand first. Rendered as a "Read first" note. */
    prerequisites: list(),

    /** Topic ids for further reading. Rendered in the article footer. */
    seeAlso: list(),

    /** Draft articles are visible with `npm run dev` but excluded from the built site. */
    draft: z
      .boolean()
      .nullish()
      .transform((value) => value ?? false),
  }),
});

export const collections = { topics };
