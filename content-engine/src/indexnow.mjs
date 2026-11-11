#!/usr/bin/env node
/**
 * Tell IndexNow (Bing, Yandex, Seznam, Naver…; Bing powers ChatGPT search and Copilot) about
 * new or updated pages, once they are actually live. Google does not use IndexNow; it relies on
 * sitemap.xml (keep <lastmod> accurate) and Search Console.
 *
 *   node src/indexnow.mjs <changed files…>   submit the URLs those files render
 *   node src/indexnow.mjs --all              submit every <loc> in sitemap.xml
 *   node src/indexnow.mjs <files…> <urls…>   files and explicit URLs can be mixed (URLs must be in sitemap.xml)
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

/** All <loc> URLs and their <lastmod> from sitemap.xml text. */
export function parseSitemap(xml) {
  const entries = [];
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = m[1].match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    const lastmod = m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim();
    if (loc) entries.push({ loc, lastmod });
  }
  return entries;
}

// Files whose change can alter what every page renders (navigation, layout, structured data, styling).
const SHARED = [
  /^components\//, /^lib\//, /^app\/global-not-found\.tsx$/, /^app\/\([a-z]+\)\/layout\.tsx$/,
  /^src\/input\.css$/, /^tailwind\.config\.js$/, /^next\.config\.js$/,
];

/**
 * Map changed repo files to the live URLs they render. Only URLs listed in the sitemap are
 * returned (those are the canonical ones). A change to a shared template returns every URL.
 */
export function urlsForChangedFiles(config, files, sitemapUrls) {
  const base = config.site.baseUrl;
  const inSitemap = new Set(sitemapUrls);
  const urls = new Set(urlsForFiles(config, files));
  const blogUrls = sitemapUrls.filter((u) => /\/blog(\/|$)/.test(u.slice(base.length)));
  for (const f of files) {
    if (SHARED.some((re) => re.test(f))) return [...sitemapUrls];
    if (f === 'index.html') urls.add(`${base}/`);
    else if (f === 'en/index.html' || f === 'main.js' || f.startsWith('tools/')) {
      urls.add(`${base}/`);
      urls.add(`${base}/en`);
    } else if (f === 'terms.html' || f === 'terms.js') urls.add(`${base}/terms.html`);
    else if (/^app\/\(([a-z]+)\)\/(.*\/)?blog\//.test(f)) blogUrls.forEach((u) => urls.add(u)); // blog templates
    else {
      const m = f.match(/^app\/\([a-z]+\)\/(.+)\/page\.tsx$/);
      if (m) urls.add(`${base}/${m[1]}`);
    }
  }
  return [...urls].filter((u) => inSitemap.has(u));
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
  const args = process.argv.slice(2);
  const sitemap = parseSitemap(fs.readFileSync(resolveFromEngine('../sitemap.xml'), 'utf8'));
  const sitemapUrls = sitemap.map((e) => e.loc);

  let urls;
  if (args.includes('--all')) urls = sitemapUrls;
  else {
    // Arguments can mix changed repo files and explicit URLs (e.g. URLs newly added to the sitemap).
    const explicit = args.filter((a) => a.startsWith('http')).filter((u) => sitemapUrls.includes(u));
    const files = args.filter((a) => !a.startsWith('http') && !a.startsWith('--'));
    urls = [...new Set([...explicit, ...urlsForChangedFiles(config, files, sitemapUrls)])];
  }

  if (!urls.length) {
    log('IndexNow: no indexable pages changed, nothing to submit.');
    return;
  }

  // Google ignores IndexNow and leans on <lastmod>; flag changed pages whose lastmod wasn't bumped.
  if (!args.includes('--all')) {
    const today = new Date().toISOString().slice(0, 10);
    for (const u of urls) {
      const lm = sitemap.find((e) => e.loc === u)?.lastmod;
      if (lm && lm < today) warn(`sitemap.xml <lastmod> for ${u} is ${lm}; update it to ${today} if the content changed (Google uses lastmod).`);
    }
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
