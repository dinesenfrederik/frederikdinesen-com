import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ENGINE_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const resolveFromEngine = (p) => path.resolve(ENGINE_DIR, p);

export function loadConfig() {
  return JSON.parse(fs.readFileSync(resolveFromEngine('config.json'), 'utf8'));
}

export function readPrompt(name) {
  return fs.readFileSync(resolveFromEngine(`prompts/${name}`), 'utf8');
}

export function readJson(relPath, fallback) {
  const p = resolveFromEngine(relPath);
  if (!fs.existsSync(p)) return fallback;
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

export function writeJson(relPath, data) {
  const p = resolveFromEngine(relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

export const log = (...args) => console.log(`[${new Date().toISOString().slice(11, 19)}]`, ...args);
export const warn = (...args) => console.warn(`[${new Date().toISOString().slice(11, 19)}] WARN`, ...args);
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const today = () => new Date().toISOString().slice(0, 10);

const USER_AGENT = 'Mozilla/5.0 (compatible; fdsl-content-engine/1.0)';

/** fetch with timeout + generic UA. Throws on non-2xx. */
export async function fetchText(url, { timeoutMs = 15000, headers = {}, method = 'GET', body } = {}) {
  const res = await fetch(url, {
    method,
    body,
    headers: { 'User-Agent': USER_AGENT, ...headers },
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url.split('?')[0]}`);
  return res.text();
}

export async function fetchJson(url, opts) {
  return JSON.parse(await fetchText(url, opts));
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
export function decodeEntities(s) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m)
    .trim();
}

/** Minimal RSS 2.0 / Atom item extractor (titles, links, dates). Good enough for headline signals. */
export function parseFeed(xml) {
  const items = [];
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>|<entry[\s>][\s\S]*?<\/entry>/gi) ?? [];
  for (const b of blocks) {
    const title = b.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
    if (!title) continue;
    const link =
      b.match(/<link[^>]*href="([^"]+)"/i)?.[1] ??
      b.match(/<link[^>]*>([\s\S]*?)<\/link>/i)?.[1] ??
      '';
    const date =
      b.match(/<(?:pubDate|updated|published)[^>]*>([\s\S]*?)<\/(?:pubDate|updated|published)>/i)?.[1] ?? '';
    items.push({ title: decodeEntities(title), link: decodeEntities(link), date: decodeEntities(date) });
  }
  return items;
}

/** Extract the first JSON object/array from an LLM text response (handles ```json fences). */
export function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.search(/[[{]/);
  if (start === -1) throw new Error('No JSON found in model output');
  const open = candidate[start];
  const close = open === '{' ? '}' : ']';
  const end = candidate.lastIndexOf(close);
  return JSON.parse(candidate.slice(start, end + 1));
}

export function slugify(s, lang = 'en') {
  const slug = s
    .toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'oe')
    .replace(/å/g, 'aa')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, lang === 'da' ? ' og ' : ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (slug.length <= 70) return slug;
  // Cut at a word boundary so the slug never ends in half a word.
  return slug.slice(0, 70).replace(/-[^-]*$/, '');
}
