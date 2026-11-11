import { GoogleGenAI, ApiError } from '@google/genai';
import { z } from 'zod';
import { extractJson, log, readPrompt, sleep, warn } from './util.mjs';

let client;
function ai() {
  if (!process.env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY is not set');
  client ??= new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  return client;
}

/** generateContent with retries on rate limits / transient server errors. */
async function generate(params, attempts = 4) {
  for (let i = 1; ; i++) {
    try {
      return await ai().models.generateContent(params);
    } catch (e) {
      const retryable = e instanceof ApiError ? e.status === 429 || e.status >= 500 : e.name === 'TypeError';
      if (!retryable || i >= attempts) throw e;
      const wait = 2 ** i * 5000;
      warn(`Gemini ${e.status ?? e.message}; retrying in ${wait / 1000}s`);
      await sleep(wait);
    }
  }
}

const fill = (tpl, vars) => tpl.replace(/\{([A-Z_]+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));

function groundingSources(response) {
  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
  const seen = new Set();
  return chunks
    .map((c) => c.web)
    .filter((w) => w?.uri && !seen.has(w.uri) && seen.add(w.uri))
    .map((w) => ({ title: w.title ?? w.uri, url: w.uri }));
}

const Score = z.coerce.number().min(1).max(5);
export const CandidateSchema = z.object({
  pillar: z.enum(['tracking', 'mixing', 'release']),
  titleEn: z.string(),
  titleDa: z.string(),
  primaryKeywordEn: z.string(),
  primaryKeywordDa: z.string(),
  secondaryKeywords: z.array(z.string()).default([]),
  slugEn: z.string(),
  slugDa: z.string(),
  searchIntent: z.string(),
  angle: z.string(),
  whyNow: z.string(),
  youtubeQuery: z.string(),
  scores: z.object({ demand: Score, trend: Score, businessFit: Score, competitionGap: Score }),
});

/** Keep the signal payload small enough to be useful context, not noise. */
function summarizeSignals(signals) {
  const lines = [];
  const section = (name, rows) => rows.length && lines.push(`### ${name}`, ...rows, '');
  section(
    'Google Search Console (query | impressions | clicks | avg position)',
    signals.searchConsole
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 60)
      .map((r) => `- ${r.query} | ${r.impressions} | ${r.clicks} | ${r.position}`),
  );
  section('Google autocomplete', signals.autocomplete.slice(0, 150).map((s) => `- [${s.lang}/${s.pillar}] ${s.query}`));
  section('Reddit top posts this week', signals.reddit.slice(0, 60).map((r) => `- r/${r.subreddit}: ${r.title}`));
  section('Trending YouTube videos (last 30 days)', signals.youtube.slice(0, 30).map((v) => `- ${v.title} (${v.channel}, ${v.views.toLocaleString('en')} views)`));
  section('News & feeds', signals.news.slice(0, 40).map((n) => `- ${n.title}`));
  return lines.join('\n') || '(no signals collected; rely on Google Search)';
}

/** Step 1: propose and score topic candidates from the week's signals + live Google Search. */
export async function scoutTopics({ config, signals, existing, history, count, forcedTopic }) {
  const pillars = config.pillars.map((p) => `- ${p.id}: "${p.en}" / "${p.da}". ${p.focus}`).join('\n');
  let prompt = fill(readPrompt('scout.md'), {
    COUNT: count,
    PILLARS: pillars,
    EXISTING: existing.map((p) => `- [${p.lang}] ${p.title}`).join('\n') || '(none yet)',
    HISTORY: history.map((h) => `- ${h.titleEn} (${h.status})`).join('\n') || '(none yet)',
    SIGNALS: summarizeSignals(signals),
  });
  if (forcedTopic) {
    prompt += `\n\n## Override\nFrederik has chosen the topic himself: "${forcedTopic}". Return exactly 1 object, for this topic. Research the best keywords and angle for it.`;
  }
  log(`Gemini: scouting ${forcedTopic ? 'forced topic' : `${count} topics`} (${config.models.research})`);
  const response = await generate({
    model: config.models.research,
    contents: prompt,
    config: { tools: [{ googleSearch: {} }] },
  });
  const raw = extractJson(response.text ?? '');
  const list = (Array.isArray(raw) ? raw : [raw]).flatMap((c) => {
    const r = CandidateSchema.safeParse(c);
    if (!r.success) warn(`Dropping malformed candidate: ${r.error.issues[0]?.message}`);
    return r.success ? [r.data] : [];
  });
  if (!list.length) throw new Error('Gemini returned no valid topic candidates');
  return { candidates: list, sources: groundingSources(response) };
}

/**
 * Fallback when there's no YOUTUBE_API_KEY: let Gemini find videos via Google Search.
 * URLs are format-checked; a wrong one just fails analysis and is skipped.
 */
export async function findVideosViaSearch({ config, query }) {
  const response = await generate({
    model: config.models.research,
    contents:
      `Use Google Search to find the 3 most useful, popular YouTube tutorial videos for: "${query}". ` +
      `Prefer videos from established audio engineers/producers and recent uploads. ` +
      `Return only JSON: [{"title": "...", "channel": "...", "url": "https://www.youtube.com/watch?v=..."}]`,
    config: { tools: [{ googleSearch: {} }] },
  });
  try {
    const list = extractJson(response.text ?? '');
    return (Array.isArray(list) ? list : [])
      .filter((v) => /^https:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]{11}/.test(v.url ?? ''))
      .map((v) => ({ title: v.title, channel: v.channel ?? '', url: v.url, views: 0 }));
  } catch {
    return [];
  }
}

/** ISO-8601 duration (PT1H2M3S) -> minutes */
const minutes = (iso = '') => {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  return m ? Number(m[1] ?? 0) * 60 + Number(m[2] ?? 0) : 0;
};

/** Step 2a: have Gemini watch the best YouTube videos on the topic and extract usable notes. */
export async function analyzeVideos({ config, topic, videos }) {
  const notes = [];
  const usable = videos.filter((v) => !v.duration || minutes(v.duration) <= 45).slice(0, config.run.maxYoutubeVideosPerArticle);
  for (const v of usable) {
    log(`Gemini: watching "${v.title}" (${v.channel})`);
    try {
      const response = await generate({
        model: config.models.research,
        contents: [
          {
            role: 'user',
            parts: [
              { fileData: { fileUri: v.url } },
              { text: fill(readPrompt('video.md'), { TOPIC: topic.titleEn, INTENT: topic.searchIntent }) },
            ],
          },
        ],
      });
      const text = (response.text ?? '').trim();
      if (text && !/^OFF-TOPIC/i.test(text)) notes.push({ ...v, notes: text });
    } catch (e) {
      warn(`video analysis failed for ${v.url}: ${e.message}`);
    }
  }
  return notes;
}

/** Step 2b: grounded web research -> structured brief for the writer. */
export async function researchTopic({ config, topic, videoNotes }) {
  const prompt = fill(readPrompt('research.md'), {
    TITLE: topic.titleEn,
    KW_EN: topic.primaryKeywordEn,
    KW_DA: topic.primaryKeywordDa,
    KW_SECONDARY: topic.secondaryKeywords.join(', '),
    INTENT: topic.searchIntent,
    ANGLE: topic.angle,
    VIDEO_NOTES: videoNotes.length
      ? videoNotes.map((v) => `#### ${v.title} (${v.channel}, ${v.url})\n${v.notes}`).join('\n\n')
      : '(no video notes available)',
  });
  log(`Gemini: researching "${topic.titleEn}" with Google Search`);
  const response = await generate({
    model: config.models.research,
    contents: prompt,
    config: { tools: [{ googleSearch: {} }] },
  });
  const brief = (response.text ?? '').trim();
  if (brief.length < 800) throw new Error('Research brief came back nearly empty');
  return { brief, sources: groundingSources(response) };
}

const FindingSchema = z.object({
  quote: z.string().min(5),
  verdict: z.enum(['wrong', 'misleading', 'unsupported']),
  confidence: z.enum(['high', 'medium']).catch('medium'),
  explanation: z.string(),
  suggestion: z.string().default('remove'),
});

/**
 * Step 4b: grounded fact-check of a finished article.
 * Returns findings whose `quote` actually appears in the article (others are dropped as hallucinated).
 */
export async function factCheck({ config, markdown }) {
  log('Gemini: fact-checking the article with Google Search');
  const response = await generate({
    model: config.models.research,
    contents: fill(readPrompt('factcheck.md'), { ARTICLE: markdown }),
    config: { tools: [{ googleSearch: {} }] },
  });
  let raw;
  try {
    raw = extractJson(response.text ?? '[]');
  } catch {
    warn('fact-check returned no parseable JSON; treating as no findings');
    return { findings: [], sources: groundingSources(response) };
  }
  const findings = (Array.isArray(raw) ? raw : [])
    .flatMap((f) => {
      const r = FindingSchema.safeParse(f);
      return r.success ? [r.data] : [];
    })
    .filter((f) => {
      const found = markdown.includes(f.quote);
      if (!found) warn(`fact-check quote not found in article, skipping: "${f.quote.slice(0, 60)}…"`);
      return found;
    });
  return { findings, sources: groundingSources(response) };
}
