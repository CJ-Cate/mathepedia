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
 * Every published topic, alphabetical.
 *
 * Drafts stay visible in `astro dev` so you can work on an article, and drop out of
 * production builds so a half-finished page never ships.
 */
export async function getTopics(): Promise<Topic[]> {
  const topics = await getCollection('topics', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return topics.sort((a, b) => a.data.title.localeCompare(b.data.title));
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
