import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { syncHistory, englishWordsInDanishSlug } from '../src/history.mjs';
import { applyBacklink, backlinkCandidates, touchSitemap } from '../src/publish.mjs';
import { urlsForFiles } from '../src/indexnow.mjs';
import { resolveSourceUrls } from '../src/util.mjs';

const site = { baseUrl: 'https://frederikdinesen.com', blogPath: { da: '/blog/', en: '/en/blog/' } };

function tempSite() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fdsl-'));
  fs.mkdirSync(path.join(dir, 'da'));
  const article = `---\ntitle: "Gammel artikel"\npillar: "Mixing & Audio-tips"\n---\n\n## 1. Kick og bas\n\nKick og bas skal have hver sin plads i bunden af mixet.\n\nAnden sætning her.\n`;
  fs.writeFileSync(path.join(dir, 'da', 'gammel.md'), article);
  fs.writeFileSync(path.join(dir, 'sitemap.xml'), `<urlset>\n  <url>\n    <loc>https://frederikdinesen.com/blog/gammel</loc>\n    <lastmod>2026-01-01</lastmod>\n  </url>\n</urlset>\n`);
  return { dir, config: { site: { ...site, contentDir: dir, sitemapPath: path.join(dir, 'sitemap.xml') } } };
}

test('syncHistory updates statuses from PR states and adds unknown PRs', () => {
  const out = syncHistory(
    [{ titleEn: 'Muddy low end', status: 'drafted' }],
    [
      { title: 'Blog draft: Muddy low end', state: 'MERGED' },
      { title: 'Blog draft: Spotify checklist', state: 'CLOSED' },
      { title: 'Add automated content engine', state: 'MERGED' }, // not a draft PR
    ],
  );
  assert.deepEqual(out, [
    { titleEn: 'Muddy low end', status: 'published' },
    { titleEn: 'Spotify checklist', status: 'rejected' },
  ]);
});

test('englishWordsInDanishSlug flags filler but not industry terms', () => {
  assert.deepEqual(englishWordsInDanishSlug('fix-mudret-low-end-metal-mix'), ['fix']);
  assert.deepEqual(englishWordsInDanishSlug('mudret-bund-metal-mix'), []);
});

test('applyBacklink inserts a link once and rejects unsafe edits', () => {
  const { dir, config } = tempSite();
  const find = 'Kick og bas skal have hver sin plads i bunden af mixet.';
  const ok = applyBacklink(config, 'da', { slug: 'gammel', find, replace: 'Kick og bas skal have hver sin plads i bunden af mixet, som jeg forklarer i [guiden til mudret bund](/blog/ny).' }, '/blog/ny');
  assert.ok(ok);
  const after = fs.readFileSync(path.join(dir, 'da', 'gammel.md'), 'utf8');
  assert.ok(after.includes('[guiden til mudret bund](/blog/ny)'));
  assert.ok(after.startsWith('---\ntitle: "Gammel artikel"'));
  // Already linked now -> no longer a candidate.
  assert.equal(backlinkCandidates(config, 'da', { newPath: '/blog/ny', newSlug: 'ny', pillar: 'Mixing & Audio-tips' }).length, 0);
  // Sentence not present / heading / missing link / multi-line are all rejected.
  assert.equal(applyBacklink(config, 'da', { slug: 'gammel', find: 'Denne sætning findes slet ikke i artiklen.', replace: 'x [a](/blog/ny)' }, '/blog/ny'), null);
  assert.equal(applyBacklink(config, 'da', { slug: 'gammel', find: '## 1. Kick og bas', replace: '## 1. Kick og [bas](/blog/ny)' }, '/blog/ny'), null);
  assert.equal(applyBacklink(config, 'da', { slug: 'gammel', find: 'Anden sætning her.', replace: 'Anden sætning her uden link.' }, '/blog/ny'), null);
  assert.equal(applyBacklink(config, 'da', { slug: '../etc', find: 'Anden sætning her.', replace: 'x [a](/blog/ny)' }, '/blog/ny'), null);
});

test('touchSitemap bumps lastmod for one URL', () => {
  const { dir, config } = tempSite();
  touchSitemap(config, '/blog/gammel', '2026-11-12');
  assert.match(fs.readFileSync(path.join(dir, 'sitemap.xml'), 'utf8'), /<lastmod>2026-11-12<\/lastmod>/);
});

test('urlsForFiles maps article files to live URLs (plus blog index)', () => {
  const urls = urlsForFiles({ site }, ['content/blog/da/mudret-bund.md', 'content/blog/en/muddy-low-end.md', 'README.md']);
  assert.deepEqual(urls.sort(), [
    'https://frederikdinesen.com/blog',
    'https://frederikdinesen.com/blog/mudret-bund',
    'https://frederikdinesen.com/en/blog',
    'https://frederikdinesen.com/en/blog/muddy-low-end',
  ]);
});

test('resolveSourceUrls follows grounding redirects and de-duplicates', async () => {
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (url) => ({
    headers: { get: (h) => (h === 'location' ? `https://nailthemix.com/article-${url.endsWith('A') || url.endsWith('B') ? 1 : 2}` : null) },
  });
  try {
    const base = 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/';
    const out = await resolveSourceUrls([
      { title: 'nailthemix.com', url: base + 'A' },
      { title: 'nailthemix.com', url: base + 'B' }, // resolves to the same page
      { title: 'other', url: base + 'C' },
      { title: 'plain', url: 'https://example.com/x' }, // not a redirect: untouched
    ]);
    assert.deepEqual(out.map((s) => s.url), ['https://nailthemix.com/article-1', 'https://nailthemix.com/article-2', 'https://example.com/x']);
  } finally {
    globalThis.fetch = realFetch;
  }
});
