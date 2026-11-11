#!/usr/bin/env node
/**
 * Tell IndexNow (Bing, Yandex, Seznam, Naver…; Bing powers ChatGPT search and Copilot) about
 * new or updated blog articles, once they are actually live.
 *
 *   node src/indexnow.mjs content/blog/da/foo.md content/blog/en/bar.md
 *
 * Uses only Node built-ins so the workflow can run it without `npm ci`.
 */
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { loadConfig, log, resolveFromEngine, sleep, warn } from './util.mjs';

export function urlsForFiles(config, files) {
  const urls = new Set();
  for (const f of files) {
    const m = f.match(/content\/blog\/(da|en)\/([a-z0-9-]+)\.md$/);
    if (!m) continue;
    urls.add(`${config.site.baseUrl}${config.site.blogPath[m[1]]}${m[2]}`);
    urls.add(`${config.site.baseUrl}${config.site.blogPath[m[1]].replace(/\/$/, '')}`); // the blog index changed too (no trailing slash: /blog/ redirects)
  }
  return [...urls];
}

async function waitUntilLive(url, { timeoutMs = 10 * 60_000 } = {}) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(10_000) });
      if (res.ok) return true;
    } catch {
      // not reachable yet
    }
    await sleep(20_000);
  }
  return false;
}

async function main() {
  const config = loadConfig();
  const files = process.argv.slice(2);
  const urls = urlsForFiles(config, files);
  if (!urls.length) {
    log('IndexNow: no blog articles changed, nothing to submit.');
    return;
  }
  const key = fs.readFileSync(resolveFromEngine('../indexnow-key.txt'), 'utf8').trim();
  const host = new URL(config.site.baseUrl).host;
  const keyLocation = `${config.site.baseUrl}/indexnow-key.txt`;

  // Vercel deploys after the push; don't submit URLs that would still 404.
  log(`IndexNow: waiting for ${urls.length} URL(s) and the key file to go live…`);
  const live = [];
  for (const url of [keyLocation, ...urls]) {
    if (await waitUntilLive(url)) {
      if (url !== keyLocation) live.push(url);
    } else {
      warn(`not live after 10 min, skipping: ${url}`);
      if (url === keyLocation) throw new Error('IndexNow key file is not reachable; submission would be rejected');
    }
  }
  if (!live.length) return;

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key, keyLocation, urlList: live }),
  });
  // 200 = accepted, 202 = accepted (key validation pending). Anything else is a real problem.
  if (res.status !== 200 && res.status !== 202) {
    throw new Error(`IndexNow responded ${res.status}: ${await res.text()}`);
  }
  log(`IndexNow: submitted ${live.length} URL(s) (HTTP ${res.status}):\n  ${live.join('\n  ')}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.error(`IndexNow FAILED: ${e.message}`);
    process.exit(1);
  });
}
