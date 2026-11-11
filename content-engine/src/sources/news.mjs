import { fetchText, parseFeed, warn } from '../util.mjs';

const LOCALE = {
  en: 'hl=en-US&gl=US&ceid=US:en',
  da: 'hl=da&gl=DK&ceid=DK:da',
};

/** Recent headlines from Google News RSS search, plus any custom RSS/Atom feeds in config. */
export async function collectNews(newsCfg, rssCfg) {
  const out = [];
  if (newsCfg?.enabled) {
    for (const [lang, queries] of Object.entries(newsCfg.queries ?? {})) {
      for (const q of queries) {
        const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q + ' when:30d')}&${LOCALE[lang] ?? LOCALE.en}`;
        try {
          for (const it of parseFeed(await fetchText(url)).slice(0, newsCfg.perQuery ?? 8)) {
            out.push({ title: it.title, url: it.link, date: it.date, source: `google-news:${lang}` });
          }
        } catch (e) {
          warn(`google news "${q}": ${e.message}`);
        }
      }
    }
  }
  if (rssCfg?.enabled) {
    for (const feed of rssCfg.feeds ?? []) {
      try {
        for (const it of parseFeed(await fetchText(feed)).slice(0, 10)) {
          out.push({ title: it.title, url: it.link, date: it.date, source: feed });
        }
      } catch (e) {
        warn(`rss ${feed}: ${e.message}`);
      }
    }
  }
  return out;
}
