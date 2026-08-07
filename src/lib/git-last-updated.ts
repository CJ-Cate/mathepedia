import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';

const cache = new Map<string, Date | undefined>();

/**
 * Last-updated date for a file, derived from git history -- the same approach
 * VitePress uses for its built-in "last updated" feature. Falls back to the file's
 * mtime for files that exist on disk but have no git history yet (e.g. a brand-new
 * untracked draft). Editing a tracked file without committing keeps showing the
 * previous commit's date until the edit is committed, which mirrors VitePress too.
 */
export function getLastUpdated(filePath: string | undefined): Date | undefined {
  if (!filePath) return undefined;
  if (cache.has(filePath)) return cache.get(filePath);

  const updated = readCommitDate(filePath) ?? readMtime(filePath);
  cache.set(filePath, updated);
  return updated;
}

function readCommitDate(filePath: string): Date | undefined {
  try {
    const output = execFileSync('git', ['log', '-1', '--format=%cI', '--', filePath], {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return output ? new Date(output) : undefined;
  } catch {
    return undefined;
  }
}

function readMtime(filePath: string): Date | undefined {
  try {
    return statSync(filePath).mtime;
  } catch {
    return undefined;
  }
}
