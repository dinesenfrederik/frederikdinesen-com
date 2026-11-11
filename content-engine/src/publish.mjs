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
  for (const idx of [`${base}${config.site.blogPath.da}`, `${base}${config.site.blogPath.en}`]) {
    xml = xml.replace(
      new RegExp(`(<loc>${idx.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}</loc>[\\s\\S]*?<lastmod>)[^<]*(</lastmod>)`),
      `$1${date}$2`,
    );
  }
  fs.writeFileSync(file, xml);
  return true;
}
