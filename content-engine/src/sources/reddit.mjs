import { fetchText, parseFeed, sleep, warn } from '../util.mjs';

/** Top posts of the week from music-production subreddits (public RSS, no key needed). */
export async function collectReddit(cfg) {
  const out = [];
  for (const sub of cfg.subreddits) {
    const url = `https://www.reddit.com/r/${sub}/top/.rss?t=${cfg.period ?? 'week'}&limit=${cfg.perSubreddit ?? 15}`;
    try {
      const items = parseFeed(await fetchText(url));
      for (const it of items.slice(0, cfg.perSubreddit ?? 15)) {
        out.push({ title: it.title, url: it.link, subreddit: sub });
      }
    } catch (e) {
      warn(`reddit r/${sub}: ${e.message}`);
    }
    await sleep(1200); // be polite; Reddit rate-limits anonymous clients hard
  }
  return out;
}
