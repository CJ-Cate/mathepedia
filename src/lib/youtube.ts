/**
 * Pulls a video id (and optional start time) out of an ordinary YouTube URL --
 * watch/embed/shorts/youtu.be, with or without extra query params.
 *
 * Shared by `Youtube.astro` (inline embeds in article prose) and `TopicVideo.astro`
 * (the `youtube:` frontmatter field), so the two only recognize URLs one way.
 */
export interface ParsedYoutubeUrl {
  id: string;
  /** Seconds into the video to start playback, from a `?t=90s` / `&t=90` param. */
  start: number | null;
}

export function parseYoutubeUrl(url: string): ParsedYoutubeUrl | null {
  const match = url?.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  );
  const id = match?.[1];
  if (!id) return null;

  const startMatch = url.match(/[?&]t=(\d+)/);
  const start = startMatch ? Number(startMatch[1]) : null;

  return { id, start };
}
