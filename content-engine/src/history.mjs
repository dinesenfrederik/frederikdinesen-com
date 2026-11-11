const PR_STATUS = { MERGED: 'published', OPEN: 'in review', CLOSED: 'rejected' };

/**
 * Bring history.json in line with what actually happened to each draft PR
 * (`gh pr list --json title,state`): merged = published, closed = rejected, open = in review.
 * PRs without a history entry (e.g. closed before history.json reached main) are added.
 */
export function syncHistory(history, prs) {
  const out = history.map((h) => ({ ...h }));
  for (const pr of prs ?? []) {
    if (!/^Blog draft:/i.test(pr.title ?? '')) continue;
    const titleEn = pr.title.replace(/^Blog draft:\s*/i, '');
    const status = PR_STATUS[pr.state] ?? 'rejected';
    const entry = out.find((h) => h.titleEn === titleEn);
    if (entry) entry.status = status;
    else out.push({ titleEn, status });
  }
  return out;
}

const ENGLISH_SLUG_WORDS = new Set(['fix', 'how', 'to', 'the', 'guide', 'best', 'your', 'and', 'for', 'with', 'without', 'tips', 'get']);

/** English filler words in a Danish slug (industry terms like "low-end" or "mix" are fine). */
export function englishWordsInDanishSlug(slug) {
  return slug.split('-').filter((w) => ENGLISH_SLUG_WORDS.has(w));
}
