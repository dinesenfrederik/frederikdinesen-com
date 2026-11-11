import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validateArticle } from '../src/validate.mjs';
import { extractJson, parseFeed, slugify, resolveFromEngine } from '../src/util.mjs';

const published = (lang) =>
  fs.readFileSync(resolveFromEngine(`../content/blog/${lang}/${lang === 'da' ? 'vokalindspilning-hjemmestudie' : 'home-studio-vocal-tracking'}.md`), 'utf8');
const expectDa = { lang: 'da', date: '2026-11-10', pillar: 'DIY Indspilning & Tracking', alternateSlug: 'home-studio-vocal-tracking', minWords: 900 };
const expectEn = { lang: 'en', date: '2026-11-10', pillar: 'DIY Recording & Tracking', alternateSlug: 'vokalindspilning-hjemmestudie', minWords: 900 };

test('validator accepts the published, approved articles', () => {
  const da = validateArticle(published('da'), expectDa);
  assert.deepEqual(da.errors, []);
  const en = validateArticle(published('en'), expectEn);
  assert.deepEqual(en.errors, []);
});

test('validator rejects things the site cannot render', () => {
  const base = published('en');
  const withTable = base.replace('## 1.', '| a | b |\n|---|---|\n| 1 | 2 |\n\n## 1.');
  assert.ok(validateArticle(withTable, expectEn).errors.some((e) => e.includes('table')));
  const withH1 = base.replace('## 1.', '# Big title\n\n## 1.');
  assert.ok(validateArticle(withH1, expectEn).errors.some((e) => e.includes('H1')));
  const withHtml = base.replace('## 1.', '<div class="x">hi</div>\n\n## 1.');
  assert.ok(validateArticle(withHtml, expectEn).errors.some((e) => e.includes('HTML')));
  const withLink = base.replace('## 1.', 'See [this](https://example.com).\n\n## 1.');
  assert.ok(validateArticle(withLink, expectEn).errors.some((e) => e.includes('External links')));
});

test('validator enforces the expected frontmatter values', () => {
  const r = validateArticle(published('en'), { ...expectEn, alternateSlug: 'something-else' });
  assert.ok(r.errors.some((e) => e.includes('alternateSlug')));
  assert.ok(!validateArticle('no frontmatter here', expectEn).ok);
});

test('slugify handles Danish characters and length', () => {
  assert.equal(slugify('Sådan undgår du mudret low-end i tung metal', 'da'), 'saadan-undgaar-du-mudret-low-end-i-tung-metal');
  assert.equal(slugify('Rock & Metal Drums', 'en'), 'rock-and-metal-drums');
  assert.equal(slugify('Rock & Metal Trommer', 'da'), 'rock-og-metal-trommer');
  const long = slugify('word '.repeat(40));
  assert.ok(long.length <= 70 && !long.endsWith('-'));
});

test('parseFeed reads RSS and Atom', () => {
  const rss = '<rss><channel><item><title><![CDATA[Kick &amp; bass]]></title><link>https://a.example/1</link></item></channel></rss>';
  assert.deepEqual(parseFeed(rss)[0], { title: 'Kick & bass', link: 'https://a.example/1', date: '' });
  const atom = '<feed><entry><title>Muddy mix?</title><link href="https://r.example/2"/><updated>2026-11-01</updated></entry></feed>';
  assert.deepEqual(parseFeed(atom)[0], { title: 'Muddy mix?', link: 'https://r.example/2', date: '2026-11-01' });
});

test('extractJson tolerates fences and prose', () => {
  assert.deepEqual(extractJson('Here you go:\n```json\n[{"a":1}]\n```'), [{ a: 1 }]);
  assert.deepEqual(extractJson('{"b": [1,2]} trailing'), { b: [1, 2] });
});
