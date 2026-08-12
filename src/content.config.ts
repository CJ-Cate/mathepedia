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

/**
 * What a valid article header looks like. Exported so the site can report exactly which
 * fields a file got wrong -- see `warnWithheld` in src/lib/topics.ts.
 */
export const topicSchema = z.object({
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

  /**
   * A YouTube URL, rendered as an iframe next to the "Contents" box at the top of the
   * article. Optional -- omit the field entirely and nothing renders. Parsed and
   * validated by `parseYoutubeUrl` (src/lib/youtube.ts) at render time, same as the
   * `<Youtube>` embed used in article prose.
   */
  youtube: z.string().nullish(),
});

/**
 * Stand-in values for an article that failed `topicSchema`.
 *
 * Nothing ever renders these -- `getTopics()` drops withheld entries before any page sees
 * them. They exist so `data.title` stays typed `string` rather than `string | undefined`
 * across every page and layout, which is the whole reason the failure is recorded as a
 * field instead of loosening the schema.
 */
const PLACEHOLDER = {
  title: '',
  description: '',
  category: 'concept' as const,
  tags: [] as string[],
  prerequisites: [] as string[],
  seeAlso: [] as string[],
  draft: false,
};

const topics = defineCollection({
  loader: glob({ base: './src/content/topics', pattern: '**/*.{md,mdx}' }),

  /*
   * Deliberately unfailable.
   *
   * A schema error thrown here aborts the entire content load, so a single article with
   * no header -- the state every new article passes through -- would take the whole site
   * down. For a wiki anyone can send a PR to, that is the wrong blast radius.
   *
   * So validation failure becomes data: `withheld` carries the reasons, `getTopics()`
   * drops those entries and warns with the file name, and the build stays green. See
   * src/lib/topics.ts.
   */
  schema: z.unknown().transform((raw) => {
    const parsed = topicSchema.safeParse(raw);
    if (parsed.success) {
      return { ...parsed.data, withheld: undefined as string[] | undefined };
    }
    return {
      ...PLACEHOLDER,
      withheld: parsed.error.issues.map(
        (issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`,
      ),
    };
  }),
});

export const collections = { topics };
