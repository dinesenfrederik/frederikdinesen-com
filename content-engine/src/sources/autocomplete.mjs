import { fetchJson, sleep, warn } from '../util.mjs';

const PREFIXES = {
  en: ['', 'how to ', 'why does my '],
  da: ['', 'hvordan ', 'hvorfor '],
};
const REGION = { en: 'us', da: 'dk' };

/**
 * Google autocomplete suggestions for every pillar seed (both languages).
 * Autocomplete reflects what people actually type, so it's a free demand signal.
 */
export async function collectAutocomplete(config) {
  const out = [];
  for (const pillar of config.pillars) {
    for (const [lang, seeds] of Object.entries(pillar.seeds)) {
      for (const seed of seeds) {
        for (const prefix of PREFIXES[lang] ?? ['']) {
          const q = prefix + seed;
          const url =
            `https://suggestqueries.google.com/complete/search?client=firefox` +
            `&hl=${lang}&gl=${REGION[lang] ?? 'us'}&q=${encodeURIComponent(q)}`;
          try {
            const [, suggestions] = await fetchJson(url, { timeoutMs: 8000 });
            for (const s of suggestions ?? []) {
              if (s.toLowerCase() !== q.toLowerCase()) out.push({ query: s, lang, pillar: pillar.id });
            }
          } catch (e) {
            warn(`autocomplete "${q}": ${e.message}`);
          }
          await sleep(150);
        }
      }
    }
  }
  // de-duplicate
  const seen = new Set();
  return out.filter((x) => !seen.has(x.lang + x.query) && seen.add(x.lang + x.query));
}
