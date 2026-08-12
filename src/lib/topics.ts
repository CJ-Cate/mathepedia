import { getCollection, type CollectionEntry } from 'astro:content';
import { getLastUpdated } from './git-last-updated';

export type Topic = CollectionEntry<'topics'>;

export const CATEGORIES = {
  concept: {
    label: 'Concepts',
    singular: 'Concept',
    blurb: 'The ideas themselves — what a thing is, why it works, and where it shows up.',
  },
  proof: {
    label: 'Proofs',
    singular: 'Proof',
    blurb: 'Famous arguments, taken apart line by line.',
  },
  calculator: {
    label: 'Calculators',
    singular: 'Calculator',
    blurb: 'Hardware and software: what the buttons do, and what the machine cannot tell you.',
  },
  'pop-culture': {
    label: 'Pop culture',
    singular: 'Pop culture',
    blurb: 'Mathematics in television, film, music, and fiction — and whether it checks out.',
  },
  history: {
    label: 'History',
    singular: 'History',
    blurb: 'Who worked it out, when, and what they were actually trying to solve.',
  },
  reference: {
    label: 'Reference',
    singular: 'Reference',
    blurb: 'Tables, identities, and notation you came here to look up.',
  },
} as const;

export type CategoryId = keyof typeof CATEGORIES;

export const CATEGORY_IDS = Object.keys(CATEGORIES) as CategoryId[];

/**
 * Files already warned about, so the notice appears once per build rather than once per
 * page that happens to ask for the topic list.
 */
const warned = new Set<string>();

/** Where an article lives, for a warning the author can act on without hunting. */
function fileOf(topic: Topic): string {
  return topic.filePath ?? `src/content/topics/${topic.id}`;
}

/**
 * Tells the author that an article was skipped, and exactly what is wrong with its header.
 *
 * Matches the tone of the section-heading nudge in `src/pages/topics/[...id].astro`: name
 * the file, say what to do, let the build finish.
 */
function warnWithheld(topic: Topic): void {
  const file = fileOf(topic);
  if (warned.has(file)) return;
  warned.add(file);

  const issues = topic.data.withheld ?? [];
  console.warn(
    `[mathipedia] ${file} has missing or invalid frontmatter and will not be published:\n` +
      issues.map((issue) => `              - ${issue}`).join('\n') +
      `\n            Add a header block at the top of the file. See CONTRIBUTING.md.`,
  );
}

/**
 * Every published topic, alphabetical.
 *
 * Two kinds of article are held back here, and this is the only gate -- every page,
 * layout, and component reads the collection through this function:
 *
 * - Broken headers. A file whose frontmatter is missing or invalid cannot be rendered
 *   (there is no title to show, no category to file it under), so it is skipped with a
 *   warning instead of failing the build. See the schema comment in content.config.ts.
 * - Drafts, which stay visible in `astro dev` so you can work on an article, and drop out
 *   of production builds so a half-finished page never ships.
 */
export async function getTopics(): Promise<Topic[]> {
  const entries = await getCollection('topics');
  const published = entries.filter((topic) => {
    if (topic.data.withheld) {
      warnWithheld(topic);
      return false;
    }
    return import.meta.env.PROD ? !topic.data.draft : true;
  });
  return published.sort((a, b) => a.data.title.localeCompare(b.data.title));
}

/**
 * Topics that exist as files but are not on the site, mapped to why.
 *
 * Derived by subtracting `getTopics()` from the raw collection rather than re-testing the
 * conditions, so the two can never disagree about what "published" means.
 */
async function getWithheldTopics(): Promise<Map<string, string>> {
  const entries = await getCollection('topics');
  const published = new Set((await getTopics()).map((topic) => topic.id));
  return new Map(
    entries
      .filter((topic) => !published.has(topic.id))
      .map((topic) => [
        topic.id,
        topic.data.withheld ? 'missing or invalid frontmatter' : 'a draft',
      ]),
  );
}

/**
 * Levenshtein distance, so a misspelled id gets a useful suggestion. Substring matching
 * is not enough -- "derivitive" shares no substring boundary with "derivative" but is
 * one edit away, and that transposed-vowel case is exactly the typo people make.
 */
function editDistance(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      current[j] = Math.min(
        previous[j]! + 1,
        current[j - 1]! + 1,
        previous[j - 1]! + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    previous = current;
  }
  return previous[b.length]!;
}

/**
 * Turns `prerequisites` / `seeAlso` ids into topics, at build time.
 *
 * Two kinds of miss, deliberately treated differently:
 *
 * - The id matches nothing at all. That is a typo, and it fails the build rather than
 *   shipping a dead link -- for a wiki that anyone can send a PR to, a misspelled id is
 *   the most likely kind of rot.
 * - The id matches a real file the site is withholding (a broken header, or a draft in a
 *   production build). Not the linking author's mistake, and throwing would mean one
 *   header-less article could still fail the build from the far end of a link. The link
 *   is dropped with a warning instead.
 *
 * Callers get back only what will render, so they can decide whether to draw a heading
 * around it. `field` and `sourceId` exist purely so both messages name the file to open.
 */
export async function resolveTopicIds(
  ids: string[],
  field: string,
  sourceId: string,
): Promise<Topic[]> {
  if (ids.length === 0) return [];

  const topics = await getTopics();
  const byId = new Map(topics.map((topic) => [topic.id, topic]));
  const withheld = await getWithheldTopics();

  return ids.flatMap((id) => {
    const topic = byId.get(id);
    if (topic) return topic;

    const reason = withheld.get(id);
    if (reason) {
      console.warn(
        `[mathipedia] src/content/topics/${sourceId}.mdx lists "${id}" under \`${field}\`, ` +
          `but that\n            article is unpublished (${reason}). Link omitted.`,
      );
      return [];
    }

    // Allow roughly one edit per four characters, so short ids do not match everything.
    const threshold = Math.max(2, Math.floor(id.length / 4));
    const suggestions = topics
      .map((candidate) => ({ id: candidate.id, distance: editDistance(id, candidate.id) }))
      .filter(({ id: candidate, distance }) => distance <= threshold || candidate.includes(id))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3)
      .map((match) => match.id);
    throw new Error(
      `src/content/topics/${sourceId}.mdx lists "${id}" under \`${field}\`, but no such ` +
        `topic exists.` +
        (suggestions.length ? ` Did you mean: ${suggestions.join(', ')}?` : '') +
        ` Available ids are the file names in src/content/topics/ without the extension.`,
    );
  });
}

export async function getTopicsByCategory(category: CategoryId): Promise<Topic[]> {
  return (await getTopics()).filter((topic) => topic.data.category === category);
}

/** Git-derived last-updated date for a topic, or undefined if it can't be determined. */
export function getUpdated(topic: Topic): Date | undefined {
  return getLastUpdated(topic.filePath);
}

/** Most recently updated first. Topics whose last-updated date can't be determined are excluded. */
export async function getRecentlyUpdated(
  limit = 5,
): Promise<Array<{ topic: Topic; updated: Date }>> {
  const topics = await getTopics();
  return topics
    .map((topic) => ({ topic, updated: getUpdated(topic) }))
    .filter((entry): entry is { topic: Topic; updated: Date } => entry.updated !== undefined)
    .sort((a, b) => b.updated.getTime() - a.updated.getTime())
    .slice(0, limit);
}

/** Group topics under their first letter, for the A–Z index. */
export function groupByInitial(topics: Topic[]): Map<string, Topic[]> {
  const groups = new Map<string, Topic[]>();
  for (const topic of topics) {
    const initial = topic.data.title[0]!.toUpperCase();
    const key = /[A-Z]/.test(initial) ? initial : '#';
    const bucket = groups.get(key);
    if (bucket) bucket.push(topic);
    else groups.set(key, [topic]);
  }
  return new Map([...groups.entries()].sort(([a], [b]) => a.localeCompare(b)));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
