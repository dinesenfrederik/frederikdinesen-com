#!/usr/bin/env node
/**
 * FD Sound Labs content engine.
 *
 *   node src/run.mjs                 scan trends -> pick topic(s) -> research -> write DA+EN -> save files
 *   node src/run.mjs --scan-only     only scan and score topic ideas (writes data/topic-candidates.json)
 *   node src/run.mjs --signals-only  only collect raw trend signals (no AI calls), for debugging sources
 *   node src/run.mjs --topic "…"     skip the scan and write about this topic (env FORCED_TOPIC works too)
 *   node src/run.mjs --count 2       draft 2 articles this run
 *   node src/run.mjs --mock          offline dry run with fixture data (no API keys, no network)
 *
 * Output for the GitHub workflow lands in .out/ (PR title/body/branch name).
 */
import fs from 'node:fs';
import { parseArgs } from 'node:util';
import { collectAutocomplete } from './sources/autocomplete.mjs';
import { collectReddit } from './sources/reddit.mjs';
import { collectNews } from './sources/news.mjs';
import { collectYoutube, searchYoutube } from './sources/youtube.mjs';
import { collectSearchConsole } from './sources/searchConsole.mjs';
import { loadExistingPosts, slugExists } from './existing.mjs';
import { addToSitemap, writeArticleFile } from './publish.mjs';
import { loadConfig, log, readJson, resolveFromEngine, slugify, today, warn, writeJson } from './util.mjs';
import * as mock from './mock.mjs';

const { values: args } = parseArgs({
  options: {
    'scan-only': { type: 'boolean', default: false },
    'signals-only': { type: 'boolean', default: false },
    topic: { type: 'string', default: process.env.FORCED_TOPIC || '' },
    count: { type: 'string' },
    mock: { type: 'boolean', default: false },
    'no-write-history': { type: 'boolean', default: false },
  },
});

const config = loadConfig();
const count = Math.max(1, Number(args.count || process.env.ARTICLE_COUNT || config.run.articlesPerRun));
const forcedTopic = args.topic.trim();
const OUT = resolveFromEngine('.out');
fs.mkdirSync(OUT, { recursive: true });

const ai = args.mock ? mock : { ...(await import('./gemini.mjs')), ...(await import('./claude.mjs')) };

// ---------------------------------------------------------------------------
async function collectSignals() {
  if (args.mock) return mock.signals;
  const s = config.sources;
  log('Collecting trend signals…');
  const [autocomplete, reddit, news, youtube, searchConsole] = await Promise.all([
    s.autocomplete.enabled ? collectAutocomplete(config) : [],
    s.reddit.enabled ? collectReddit(s.reddit) : [],
    collectNews(s.googleNews, s.rss),
    s.youtube.enabled ? collectYoutube(s.youtube) : [],
    s.searchConsole.enabled ? collectSearchConsole(s.searchConsole) : [],
  ]);
  const signals = { autocomplete, reddit, news, youtube, searchConsole };
  log(Object.entries(signals).map(([k, v]) => `${k}: ${v.length}`).join(' · '));
  return signals;
}

/** History = topics already drafted by this engine + PRs found by the workflow (open/merged/closed). */
function loadHistory() {
  const history = readJson('data/history.json', []);
  const prs = readJson('.out/pr-history.json', []);
  for (const pr of prs) {
    const titleEn = pr.title.replace(/^Blog draft:\s*/i, '');
    if (history.some((h) => h.titleEn === titleEn)) continue;
    history.push({ titleEn, status: pr.state === 'MERGED' ? 'published' : pr.state === 'OPEN' ? 'in review' : 'rejected' });
  }
  return history;
}

const words = (s) => new Set(s.toLowerCase().split(/[^a-z0-9æøå]+/).filter((w) => w.length > 3));
function similarity(a, b) {
  const A = words(a);
  const B = words(b);
  const inter = [...A].filter((w) => B.has(w)).length;
  return inter / Math.max(1, Math.min(A.size, B.size));
}

function score(c) {
  const s = c.scores;
  return Math.round((s.demand * 0.3 + s.trend * 0.2 + s.businessFit * 0.35 + s.competitionGap * 0.15) * 20); // 0-100
}

function pickTopics(candidates, existing, history) {
  const taken = [...existing.map((p) => p.title), ...history.map((h) => h.titleEn)];
  const recentPillars = history.slice(-2).map((h) => h.pillar);
  const ranked = candidates
    .map((c) => {
      const dupOf = taken.find((t) => similarity(t, c.titleEn) >= 0.6 || similarity(t, c.titleDa) >= 0.6);
      const pillarPenalty = recentPillars.includes(c.pillar) ? 8 : 0;
      return { ...c, score: score(c) - pillarPenalty, duplicateOf: dupOf ?? null };
    })
    .sort((a, b) => b.score - a.score);
  const picks = [];
  for (const c of ranked) {
    if (picks.length >= count) break;
    if (c.duplicateOf && !forcedTopic) continue;
    if (picks.some((p) => p.pillar === c.pillar) && ranked.filter((r) => !r.duplicateOf).length > count) continue;
    picks.push(c);
  }
  return { ranked, picks };
}

function uniqueSlug(lang, raw) {
  const base = slugify(raw, lang) || `artikel-${Date.now()}`;
  let slug = base;
  for (let i = 2; slugExists(config, lang, slug); i++) slug = `${base}-${i}`;
  return slug;
}

// ---------------------------------------------------------------------------
async function draftArticle(topic, existing) {
  const pillar = config.pillars.find((p) => p.id === topic.pillar);
  const date = today();
  const slugDa = uniqueSlug('da', topic.slugDa || topic.titleDa);
  const slugEn = uniqueSlug('en', topic.slugEn || topic.titleEn);

  // Research: YouTube videos -> Gemini watches them -> grounded web research brief.
  let videos = [];
  if (!args.mock) {
    try {
      videos = process.env.YOUTUBE_API_KEY
        ? await searchYoutube(topic.youtubeQuery, { maxResults: 8 })
        : await ai.findVideosViaSearch({ config, query: topic.youtubeQuery });
    } catch (e) {
      warn(`video search failed: ${e.message}`);
    }
  }
  const videoNotes = await ai.analyzeVideos({ config, topic, videos });
  const { brief, sources } = await ai.researchTopic({ config, topic, videoNotes });

  const linksFor = (lang) => existing.filter((p) => p.lang === lang);
  const da = await ai.writeArticle({
    config, lang: 'da', topic, brief, pillarName: pillar.da, date, alternateSlug: slugEn, internalLinks: linksFor('da'),
  });
  const en = await ai.writeArticle({
    config, lang: 'en', topic, brief, pillarName: pillar.en, date, alternateSlug: slugDa, internalLinks: linksFor('en'),
    sourceArticle: da.markdown,
  });

  for (const [lang, r] of [['da', da], ['en', en]]) {
    if (!r.ok) throw new Error(`${lang} draft failed validation: ${r.errors.join('; ')}`);
  }
  const files = [writeArticleFile(config, 'da', slugDa, da.markdown), writeArticleFile(config, 'en', slugEn, en.markdown)];
  addToSitemap(config, { daSlug: slugDa, enSlug: slugEn, date });

  const briefPath = `data/briefs/${date}-${slugEn}.md`;
  fs.mkdirSync(resolveFromEngine('data/briefs'), { recursive: true });
  fs.writeFileSync(
    resolveFromEngine(briefPath),
    `# Research brief: ${topic.titleEn}\n\n${brief}\n\n## Sources (Google Search grounding)\n${sources.map((s) => `- [${s.title}](${s.url})`).join('\n')}\n\n## Videos analysed\n${videoNotes.map((v) => `- [${v.title}](${v.url}) (${v.channel})`).join('\n') || '- none'}\n`,
  );

  return { topic, pillar, date, slugDa, slugEn, files, da, en, sources, videoNotes, briefPath };
}

function prBody(results, ranked) {
  const base = config.site.baseUrl;
  const parts = [];
  for (const r of results) {
    const t = r.topic;
    parts.push(
      `## ${r.da.data.title}`,
      `*${r.en.data.title}*`,
      '',
      `| | |`,
      `|---|---|`,
      `| Pillar | ${r.pillar.da} |`,
      `| Keyword DA / EN | \`${t.primaryKeywordDa}\` / \`${t.primaryKeywordEn}\` |`,
      `| Score | ${t.score}/100 (demand ${t.scores.demand}, trend ${t.scores.trend}, fit ${t.scores.businessFit}, gap ${t.scores.competitionGap}) |`,
      `| Words DA / EN | ${r.da.wordCount} / ${r.en.wordCount} |`,
      `| Preview paths | \`/blog/${r.slugDa}\` · \`/en/blog/${r.slugEn}\` (add to the Vercel preview URL below) |`,
      `| Live after merge | ${base}/blog/${r.slugDa} · ${base}/en/blog/${r.slugEn} |`,
      '',
      `**Why now:** ${t.whyNow}`,
      '',
      `**Angle:** ${t.angle}`,
      '',
    );
    const warnings = [...r.da.warnings.map((w) => `DA: ${w}`), ...r.en.warnings.map((w) => `EN: ${w}`)];
    if (warnings.length) parts.push('**Automatic check warnings**', ...warnings.map((w) => `- ${w}`), '');
    parts.push(
      '<details><summary>Research sources</summary>',
      '',
      ...(r.sources.length ? r.sources.map((s) => `- [${s.title}](${s.url})`) : ['- (none returned)']),
      ...(r.videoNotes.length ? ['', '**Videos analysed by Gemini**', ...r.videoNotes.map((v) => `- [${v.title}](${v.url}) (${v.channel})`)] : []),
      '',
      `Full brief: \`content-engine/${r.briefPath}\``,
      '</details>',
      '',
    );
  }
  parts.push(
    '## Review checklist (target: < 15 min)',
    '- [ ] Open the Vercel preview (link in the Vercel bot comment) and read the DA article',
    '- [ ] Facts and numbers check out (see sources). Anything you would not say to a client?',
    '- [ ] Sounds like you: tone, opinions, "when bands send me multitracks…"',
    '- [ ] Title and meta description are compelling',
    '- [ ] Skim the EN version',
    '',
    'Edit text directly in **Files changed → ⋯ → Edit file**, then **Merge** to publish. **Close** the PR to reject the topic (it will not be proposed again).',
    '',
    '<details><summary>Other topic ideas from this scan</summary>',
    '',
    ...ranked
      .filter((c) => !results.some((r) => r.topic.titleEn === c.titleEn))
      .map((c) => `- **${c.score}** · ${c.titleDa} / ${c.titleEn} (${c.pillar})${c.duplicateOf ? ` (skipped: similar to "${c.duplicateOf}")` : ''}`),
    '</details>',
    '',
    '_Generated by the FD Sound Labs content engine (Gemini research → Claude writing)._',
  );
  return parts.join('\n');
}

// ---------------------------------------------------------------------------
async function main() {
  const existing = loadExistingPosts(config);
  const history = loadHistory();
  log(`${existing.length} existing posts, ${history.length} topics in history`);

  const signals = forcedTopic ? mock.emptySignals : await collectSignals();
  writeJson('.out/signals.json', signals);
  if (args['signals-only']) return;

  const { candidates } = await ai.scoutTopics({
    config, signals, existing, history, count: forcedTopic ? 1 : config.run.candidatesPerScan, forcedTopic,
  });
  const { ranked, picks } = pickTopics(candidates, existing, history);
  writeJson('data/topic-candidates.json', { scannedAt: today(), candidates: ranked });
  console.log('\nTopic candidates:');
  for (const c of ranked) console.log(`  ${String(c.score).padStart(3)}  [${c.pillar}] ${c.titleEn}${c.duplicateOf ? '  (duplicate)' : ''}`);

  if (args['scan-only']) {
    fs.writeFileSync(
      `${OUT}/summary.md`,
      `## Topic scan ${today()}\n\n${ranked.map((c) => `- **${c.score}** [${c.pillar}] ${c.titleDa} / ${c.titleEn}: ${c.whyNow}`).join('\n')}\n`,
    );
    return;
  }
  if (!picks.length) throw new Error('No non-duplicate topic found this run');

  const results = [];
  for (const topic of picks) {
    log(`\n=== Drafting: ${topic.titleEn} (score ${topic.score}) ===`);
    results.push(await draftArticle(topic, existing));
  }

  if (!args['no-write-history']) {
    writeJson('data/history.json', [
      ...readJson('data/history.json', []),
      ...results.map((r) => ({
        date: r.date, titleEn: r.topic.titleEn, titleDa: r.topic.titleDa, pillar: r.topic.pillar,
        slugDa: r.slugDa, slugEn: r.slugEn, status: 'drafted',
      })),
    ]);
  }

  const title = `Blog draft: ${results.map((r) => r.topic.titleEn).join(' + ')}`.slice(0, 250);
  fs.writeFileSync(`${OUT}/pr-title.txt`, title);
  fs.writeFileSync(`${OUT}/branch.txt`, `content/${today()}-${results[0].slugEn}`.slice(0, 100));
  fs.writeFileSync(`${OUT}/pr-body.md`, prBody(results, ranked));
  fs.writeFileSync(`${OUT}/summary.md`, `## ${title}\n\n${results.flatMap((r) => r.files.map((f) => `- \`${f}\``)).join('\n')}\n`);
  log(`Done. Files:\n  ${results.flatMap((r) => r.files).join('\n  ')}`);
}

main().catch((e) => {
  console.error(`\nFAILED: ${e.stack || e.message}`);
  process.exit(1);
});
