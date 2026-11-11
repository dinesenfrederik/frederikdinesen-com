import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { resolveFromEngine } from './util.mjs';

/** All published posts on the site, both languages. Used for de-duplication and internal links. */
export function loadExistingPosts(config) {
  const root = resolveFromEngine(config.site.contentDir);
  const posts = [];
  for (const lang of ['da', 'en']) {
    const dir = path.join(root, lang);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
      const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
      const slug = file.replace(/\.md$/, '');
      posts.push({
        lang,
        slug,
        title: data.title ?? slug,
        description: data.description ?? '',
        pillar: data.pillar ?? '',
        alternateSlug: data.alternateSlug,
        path: `${config.site.blogPath[lang]}${slug}`,
      });
    }
  }
  return posts;
}

export function slugExists(config, lang, slug) {
  return fs.existsSync(path.join(resolveFromEngine(config.site.contentDir), lang, `${slug}.md`));
}
