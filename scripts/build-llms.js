// Generates public/llms.txt (https://llmstxt.org): a plain-text summary of FD Sound Labs
// for AI answer engines (ChatGPT, Perplexity, Claude, Gemini …). Facts live in llms-intro.md;
// the article list is built from content/blog so new posts are included automatically.
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const rootDir = path.resolve(__dirname, '..');
const BASE = 'https://frederikdinesen.com';

function articles(lang) {
  const dir = path.join(rootDir, 'content', 'blog', lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
      const slug = f.replace(/\.md$/, '');
      const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date || '');
      return { slug, date, title: data.title || slug, description: data.description || '' };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

function buildLlmsTxt() {
  const intro = fs.readFileSync(path.join(rootDir, 'llms-intro.md'), 'utf8').trim();
  const list = (lang, prefix) =>
    articles(lang)
      .map((a) => `- [${a.title}](${BASE}${prefix}${a.slug}): ${a.description}`)
      .join('\n');
  return `${intro}

## Guides (dansk)

${list('da', '/blog/')}

## Guides (English)

${list('en', '/en/blog/')}
`;
}

module.exports = { buildLlmsTxt };

if (require.main === module) {
  process.stdout.write(buildLlmsTxt());
}
