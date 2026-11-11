/**
 * Offline stand-ins for the Gemini and Claude steps (`--mock`). Lets you test the
 * pipeline (selection, validation, file writing, sitemap, PR text) without API keys.
 */
import fs from 'node:fs';
import matter from 'gray-matter';
import { resolveFromEngine } from './util.mjs';
import { validateArticle } from './validate.mjs';

export const emptySignals = { autocomplete: [], reddit: [], news: [], youtube: [], searchConsole: [] };

export const signals = {
  ...emptySignals,
  autocomplete: [
    { query: 'how to fix muddy low end in metal mix', lang: 'en', pillar: 'mixing' },
    { query: 'mudret bas i mix', lang: 'da', pillar: 'mixing' },
  ],
  reddit: [{ title: 'Why does my kick disappear when the guitars come in?', subreddit: 'mixingmastering', url: '' }],
};

export async function scoutTopics() {
  const base = {
    secondaryKeywords: ['kick and bass eq', 'high pass guitars metal', 'sidechain bass to kick'],
    searchIntent: 'Fix a boomy, undefined low end so kick and bass punch through downtuned guitars.',
    angle: 'Step-by-step from a working mix engineer, tuned for drop-tuned metal rather than generic pop advice.',
    whyNow: 'Recurring Reddit question this week + autocomplete demand in DA and EN.',
    youtubeQuery: 'muddy low end metal mix fix',
  };
  return {
    sources: [],
    candidates: [
      {
        ...base,
        pillar: 'mixing',
        titleEn: 'How to Fix Muddy Low End in a Metal Mix',
        titleDa: 'Sådan undgår du mudret low-end i tung metal',
        primaryKeywordEn: 'muddy low end metal mix',
        primaryKeywordDa: 'mudret low-end metal',
        slugEn: 'fix-muddy-low-end-metal-mix',
        slugDa: 'mudret-low-end-metal',
        scores: { demand: 5, trend: 4, businessFit: 5, competitionGap: 4 },
      },
      {
        ...base,
        pillar: 'release',
        titleEn: 'Single Release Checklist for Spotify',
        titleDa: 'Tjekliste til udgivelse af single på Spotify',
        primaryKeywordEn: 'spotify release checklist',
        primaryKeywordDa: 'udgive single spotify',
        slugEn: 'spotify-single-release-checklist',
        slugDa: 'tjekliste-udgivelse-single-spotify',
        scores: { demand: 4, trend: 3, businessFit: 3, competitionGap: 3 },
      },
    ],
  };
}

export async function findVideosViaSearch() {
  return [];
}
export async function analyzeVideos() {
  return [];
}
export async function researchTopic({ topic }) {
  return { brief: `### Search intent and SERP overview\n(mock brief for ${topic.titleEn})`, sources: [] };
}

/** Re-uses the published reference article's body with new frontmatter, so validation runs on real content. */
export async function writeArticle({ config, lang, topic, date, pillarName, alternateSlug }) {
  const ref = resolveFromEngine(
    `${config.site.contentDir}/${lang}/${lang === 'da' ? 'vokalindspilning-hjemmestudie' : 'home-studio-vocal-tracking'}.md`,
  );
  const { data, content } = matter(fs.readFileSync(ref, 'utf8'));
  const fm = {
    title: `[MOCK] ${lang === 'da' ? topic.titleDa : topic.titleEn}`,
    description: data.description,
    date,
    author: 'Frederik Dinesen',
    pillar: pillarName,
    alternateSlug,
    faq: data.faq,
  };
  const markdown = matter.stringify(content, fm);
  return { markdown, ...validateArticle(markdown, { lang, date, pillar: pillarName, alternateSlug, minWords: config.run.minWordsPerArticle }) };
}
