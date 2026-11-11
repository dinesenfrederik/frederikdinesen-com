import { fetchJson, warn } from '../util.mjs';

const API = 'https://www.googleapis.com/youtube/v3';

/**
 * Search YouTube (Data API v3, free quota) and return videos sorted by views.
 * Needs YOUTUBE_API_KEY. Returns [] without a key.
 */
export async function searchYoutube(query, { maxResults = 6, publishedWithinDays, lang = 'en' } = {}) {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return [];
  const params = new URLSearchParams({
    part: 'snippet',
    type: 'video',
    q: query,
    maxResults: String(maxResults),
    order: 'relevance',
    relevanceLanguage: lang,
    videoEmbeddable: 'true',
    key,
  });
  if (publishedWithinDays) {
    params.set('publishedAfter', new Date(Date.now() - publishedWithinDays * 864e5).toISOString());
  }
  const search = await fetchJson(`${API}/search?${params}`);
  const ids = (search.items ?? []).map((i) => i.id?.videoId).filter(Boolean);
  if (!ids.length) return [];
  const stats = await fetchJson(`${API}/videos?part=statistics,contentDetails&id=${ids.join(',')}&key=${key}`);
  const byId = Object.fromEntries((stats.items ?? []).map((v) => [v.id, v]));
  return (search.items ?? [])
    .filter((i) => i.id?.videoId)
    .map((i) => ({
      title: i.snippet.title,
      channel: i.snippet.channelTitle,
      publishedAt: i.snippet.publishedAt?.slice(0, 10),
      url: `https://www.youtube.com/watch?v=${i.id.videoId}`,
      views: Number(byId[i.id.videoId]?.statistics?.viewCount ?? 0),
      duration: byId[i.id.videoId]?.contentDetails?.duration,
    }))
    .sort((a, b) => b.views - a.views);
}

/** Trending recent videos for the configured queries (topic-scan signal). */
export async function collectYoutube(cfg) {
  if (!process.env.YOUTUBE_API_KEY) {
    warn('youtube: YOUTUBE_API_KEY not set, skipping trend scan (Gemini still researches YouTube via search).');
    return [];
  }
  const out = [];
  for (const q of cfg.queries ?? []) {
    try {
      out.push(...(await searchYoutube(q, { maxResults: cfg.perQuery, publishedWithinDays: cfg.publishedWithinDays })));
    } catch (e) {
      warn(`youtube "${q}": ${e.message}`);
    }
  }
  const seen = new Set();
  return out.filter((v) => !seen.has(v.url) && seen.add(v.url)).sort((a, b) => b.views - a.views);
}
