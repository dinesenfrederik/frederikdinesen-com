import { test } from 'node:test';
import assert from 'node:assert/strict';
import { failedMail, readyMail } from '../src/notify.mjs';

const draft = {
  titleDa: 'Kick & bas <i> metal', titleEn: 'Kick & bass', pillar: 'Mixing & Audio-tips', keywordDa: 'kick bas',
  whyNow: 'Trending', words: 1500, toReview: 0, fixed: 0, factCheckFailed: false, backlinks: 0,
};

test('ready mail links straight to the draft and escapes titles', () => {
  const m = readyMail({ drafts: [draft], prNumber: 42, baseUrl: 'https://frederikdinesen.com' });
  assert.match(m.subject, /^Klar til gennemgang: Kick & bas <i> metal$/);
  assert.ok(m.html.includes('href="https://frederikdinesen.com/review/42"'));
  assert.ok(m.html.includes('Kick &amp; bas &lt;i&gt; metal'));
  assert.ok(!m.html.includes('<i> metal'));
  assert.ok(m.text.includes('https://frederikdinesen.com/review/42'));
  assert.ok(m.html.includes('fandt intet'));
});

test('ready mail reports fact-check items and failures', () => {
  const m = readyMail({ drafts: [{ ...draft, toReview: 3, fixed: 1 }, { ...draft, factCheckFailed: true }], prNumber: 1, baseUrl: 'https://x.dk' });
  assert.ok(m.subject.endsWith('(+1)'));
  assert.ok(m.html.includes('3 ting at tjekke'));
  assert.ok(m.html.includes('1 rettet automatisk'));
  assert.ok(m.html.includes('kunne ikke køre'));
});

test('failed mail links to the run', () => {
  const m = failedMail({ runUrl: 'https://github.com/x/actions/runs/9', baseUrl: 'https://x.dk' });
  assert.ok(m.html.includes('href="https://github.com/x/actions/runs/9"'));
  assert.ok(m.text.includes('https://x.dk/review'));
});
