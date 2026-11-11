import fs from 'node:fs';
import path from 'node:path';
import { resolveFromEngine } from './util.mjs';

export function writeArticleFile(config, lang, slug, markdown) {
  const file = path.join(resolveFromEngine(config.site.contentDir), lang, `${slug}.md`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, markdown.trim() + '\n');
  return path.relative(resolveFromEngine('..'), file);
}

/** Add the DA+EN pair to sitemap.xml (with hreflang alternates), matching the existing format. */
export function addToSitemap(config, { daSlug, enSlug, date }) {
  const file = resolveFromEngine(config.site.sitemapPath);
  let xml = fs.readFileSync(file, 'utf8');
  const base = config.site.baseUrl;
  const da = `${base}${config.site.blogPath.da}${daSlug}`;
  const en = `${base}${config.site.blogPath.en}${enSlug}`;
  const block = (loc) => `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="da" href="${da}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  let added = '';
  if (!xml.includes(`<loc>${da}</loc>`)) added += block(da);
  if (!xml.includes(`<loc>${en}</loc>`)) added += block(en);
  if (!added) return false;
  xml = xml.replace(/\n?<\/urlset>/, `\n${added}</urlset>`);
  // Blog index pages changed too.
  // Index URLs have no trailing slash: /blog/ 308-redirects to /blog.
  for (const idx of [`${base}${config.site.blogPath.da.replace(/\/$/, '')}`, `${base}${config.site.blogPath.en.replace(/\/$/, '')}`]) {
    xml = xml.replace(
      new RegExp(`(<loc>${idx.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}</loc>[\\s\\S]*?<lastmod>)[^<]*(</lastmod>)`),
      `$1${date}$2`,
    );
  }
  fs.writeFileSync(file, xml);
  return true;
}

/** Older articles in `lang` that could link to a new article (same pillar first, not already linking). */
export function backlinkCandidates(config, lang, { newPath, newSlug, pillar, max = 2 }) {
  const dir = path.join(resolveFromEngine(config.site.contentDir), lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== `${newSlug}.md`)
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      const fmEnd = raw.indexOf('\n---', 3);
      const body = fmEnd === -1 ? raw : raw.slice(fmEnd + 4);
      const samePillar = new RegExp(`^pillar:\\s*["']?${pillar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']?\\s*$`, 'm').test(raw);
      return { slug: f.replace(/\.md$/, ''), body: body.trim(), samePillar, alreadyLinks: raw.includes(`](${newPath})`) };
    })
    .filter((c) => !c.alreadyLinks)
    .sort((a, b) => Number(b.samePillar) - Number(a.samePillar))
    .slice(0, max);
}

/**
 * Apply one proposed backlink edit to an older article. Safe by construction: only replaces a
 * sentence that occurs exactly once in the body, never in frontmatter or on a heading line,
 * and the replacement must keep the original text's link count + 1.
 * Returns the repo-relative file path, or null if the edit was rejected.
 */
export function applyBacklink(config, lang, edit, newPath) {
  const file = path.join(resolveFromEngine(config.site.contentDir), lang, `${edit.slug}.md`);
  if (!/^[a-z0-9-]+$/.test(edit.slug) || !fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const fmEnd = raw.indexOf('\n---', 3);
  if (fmEnd === -1) return null;
  const head = raw.slice(0, fmEnd + 4);
  const body = raw.slice(fmEnd + 4);
  const find = edit.find.trim();
  if (find.length < 20 || body.split(find).length !== 2) return null; // must occur exactly once
  const lineStart = body.lastIndexOf('\n', body.indexOf(find)) + 1;
  if (/^\s*#/.test(body.slice(lineStart, body.indexOf(find) + 1))) return null; // not in a heading
  const links = (s) => (s.match(/\]\(/g) ?? []).length;
  const replace = edit.replace.trim();
  if (!replace.includes(`](${newPath})`) || links(replace) !== links(find) + 1) return null;
  if (replace.includes('\n') || replace.length > find.length + 250) return null; // keep edits small
  fs.writeFileSync(file, head + body.replace(find, replace));
  return path.relative(resolveFromEngine('..'), file);
}

/** Bump <lastmod> for an existing sitemap entry (used when an older article gets a new link). */
export function touchSitemap(config, urlPath, date) {
  const file = resolveFromEngine(config.site.sitemapPath);
  const loc = `${config.site.baseUrl}${urlPath}`.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
  const xml = fs.readFileSync(file, 'utf8');
  const next = xml.replace(new RegExp(`(<loc>${loc}</loc>[\\s\\S]*?<lastmod>)[^<]*(</lastmod>)`), `$1${date}$2`);
  if (next !== xml) fs.writeFileSync(file, next);
}
