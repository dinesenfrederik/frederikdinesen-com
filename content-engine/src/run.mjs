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
import { addToSitemap, applyBacklink, backlinkCandidates, touchSitemap, writeArticleFile } from './publish.mjs';
import { englishWordsInDanishSlug, syncHistory } from './history.mjs';
import { loadConfig, log, readJson, resolveFromEngine, resolveSourceUrls, slugify, today, warn, writeJson } from './util.mjs';
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

/** History = topics already drafted by this engine, with statuses synced from the draft PRs. */
function loadHistory() {
  return syncHistory(readJson('data/history.json', []), readJson('.out/pr-history.json', []));
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
  let base = slugify(raw, lang) || `artikel-${Date.now()}`;
  if (lang === 'da') {
    // Strip English filler ("fix-", "how-to-") that sometimes sneaks into Danish slugs.
    const english = new Set(englishWordsInDanishSlug(base));
    const cleaned = base.split('-').filter((w) => !english.has(w));
    if (cleaned.length >= 2) base = cleaned.join('-');
  }
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
  const research = await ai.researchTopic({ config, topic, videoNotes });
  const brief = research.brief;
  const sources = await resolveSourceUrls(research.sources);

  const linksFor = (lang) => existing.filter((p) => p.lang === lang);
  const da = await ai.writeArticle({
    config, lang: 'da', topic, brief, pillarName: pillar.da, date, alternateSlug: slugEn, internalLinks: linksFor('da'),
  });

  // Fact-check the Danish master with Google Search. High-confidence problems are fixed
  // automatically (and listed in the PR); medium-confidence ones are listed for Frederik to judge.
  const factCheck = { fixed: [], toReview: [], sources: [] };
  if (config.run.factCheck !== false) {
    try {
      const fc = await ai.factCheck({ config, markdown: da.markdown });
      factCheck.sources = await resolveSourceUrls(fc.sources);
      factCheck.fixed = fc.findings.filter((f) => f.confidence === 'high');
      factCheck.toReview = fc.findings.filter((f) => f.confidence !== 'high');
      log(`Fact-check: ${factCheck.fixed.length} to fix, ${factCheck.toReview.length} to review`);
      if (factCheck.fixed.length) {
        const revised = await ai.reviseArticle({
          config, lang: 'da', markdown: da.markdown, findings: factCheck.fixed,
          expected: { lang: 'da', date, pillar: pillar.da, alternateSlug: slugEn, minWords: config.run.minWordsPerArticle },
        });
        Object.assign(da, revised);
      }
    } catch (e) {
      warn(`fact-check failed, continuing without it: ${e.message}`);
      factCheck.error = e.message;
    }
  }

  const en = await ai.writeArticle({
    config, lang: 'en', topic, brief, pillarName: pillar.en, date, alternateSlug: slugDa, internalLinks: linksFor('en'),
    sourceArticle: da.markdown,
  });

  for (const [lang, r] of [['da', da], ['en', en]]) {
    if (!r.ok) throw new Error(`${lang} draft failed validation: ${r.errors.join('; ')}`);
  }
  const files = [writeArticleFile(config, 'da', slugDa, da.markdown), writeArticleFile(config, 'en', slugEn, en.markdown)];
  addToSitemap(config, { daSlug: slugDa, enSlug: slugEn, date });

  // Internal links the other way: older articles get a link to the new one where it fits.
  const backlinks = [];
  const maxBacklinks = config.run.backlinksPerArticle ?? 2;
  for (const [lang, slug, article] of maxBacklinks > 0 ? [['da', slugDa, da], ['en', slugEn, en]] : []) {
    const newPath = `${config.site.blogPath[lang]}${slug}`;
    const candidates = backlinkCandidates(config, lang, {
      newPath, newSlug: slug, pillar: lang === 'da' ? pillar.da : pillar.en, max: maxBacklinks,
    });
    try {
      const edits = await ai.proposeBacklinks({
        config, lang, candidates,
        newArticle: { title: article.data.title, description: article.data.description, path: newPath },
      });
      for (const edit of edits) {
        const file = applyBacklink(config, lang, edit, newPath);
        if (file) {
          backlinks.push({ ...edit, lang, file });
          touchSitemap(config, `${config.site.blogPath[lang]}${edit.slug}`, date);
        }
        else warn(`backlink edit for ${lang}/${edit.slug} rejected (sentence not found exactly once, or edit too big)`);
      }
    } catch (e) {
      warn(`backlinks (${lang}) failed, continuing: ${e.message}`);
    }
  }

  const briefPath = `data/briefs/${date}-${slugEn}.md`;
  fs.mkdirSync(resolveFromEngine('data/briefs'), { recursive: true });
  fs.writeFileSync(
    resolveFromEngine(briefPath),
    `# Research brief: ${topic.titleEn}\n\n${brief}\n\n## Sources (Google Search grounding)\n${sources.map((s) => `- [${s.title}](${s.url})`).join('\n')}\n\n## Videos analysed\n${videoNotes.map((v) => `- [${v.title}](${v.url}) (${v.channel})`).join('\n') || '- none'}\n`,
  );

  // Machine-readable summary for the review dashboard (frederikdinesen.com/review).
  writeJson(`data/reviews/${date}-${slugEn}.json`, {
    topic: {
      titleDa: topic.titleDa, titleEn: topic.titleEn, pillar: topic.pillar,
      primaryKeywordDa: topic.primaryKeywordDa, primaryKeywordEn: topic.primaryKeywordEn,
      whyNow: topic.whyNow, angle: topic.angle, score: topic.score,
    },
    factCheck: { fixed: factCheck.fixed, toReview: factCheck.toReview, ...(factCheck.error ? { error: factCheck.error } : {}) },
    backlinks: backlinks.map((b) => ({ lang: b.lang, file: b.file, replace: b.replace, reason: b.reason })),
    sources,
    videos: videoNotes.map((v) => ({ title: v.title, url: v.url, channel: v.channel })),
    warnings: [...da.warnings.map((w) => `DA: ${w}`), ...en.warnings.map((w) => `EN: ${w}`)],
  });

  return { topic, pillar, date, slugDa, slugEn, files, da, en, sources, videoNotes, briefPath, factCheck, backlinks };
}

function prBody(results, ranked) {
  const base = config.site.baseUrl;
  const parts = [
    `> **Gennemgå og udgiv i dashboardet: ${base}/review** (ingen GitHub nødvendig)`,
    '',
  ];
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
    const englishInSlug = englishWordsInDanishSlug(r.slugDa);
    const warnings = [
      ...r.da.warnings.map((w) => `DA: ${w}`),
      ...r.en.warnings.map((w) => `EN: ${w}`),
      ...(englishInSlug.length ? [`DA slug contains English words (${englishInSlug.join(', ')}). Rename the file before merging if you want a fully Danish URL.`] : []),
    ];
    const fc = r.factCheck;
    parts.push('### Faktatjek (Gemini + Google Search)');
    if (fc.error) parts.push(`⚠️ Faktatjekket fejlede (${fc.error}). Tjek tallene ekstra grundigt.`);
    else if (!fc.fixed.length && !fc.toReview.length) parts.push('Ingen problemer fundet. ✅');
    if (fc.toReview.length) {
      parts.push('', '**Til dit tjek** (usikre fund, ikke rettet automatisk; ret dem i både DA og EN):');
      for (const f of fc.toReview) parts.push(`- [${f.verdict}] "${f.quote}"`, `  ${f.explanation} Forslag: ${f.suggestion}`);
    }
    if (fc.fixed.length) {
      parts.push('', '**Rettet automatisk** (sikre fund; den oprindelige tekst ses herunder):');
      for (const f of fc.fixed) parts.push(`- [${f.verdict}] ~~"${f.quote}"~~`, `  ${f.explanation}`);
    }
    parts.push('');
    if (r.backlinks.length) {
      parts.push('### Nye interne links i ældre artikler');
      for (const b of r.backlinks) parts.push(`- \`${b.file}\`: ${b.reason ?? ''}`, `  > ${b.replace}`);
      parts.push('');
    }
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
      ...loadHistory(),
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
