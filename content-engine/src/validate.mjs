import matter from 'gray-matter';
import { z } from 'zod';

const FrontmatterSchema = z.object({
  title: z.string().min(20).max(95),
  description: z.string().min(110).max(170),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  author: z.string().min(2),
  pillar: z.string(),
  alternateSlug: z.string().regex(/^[a-z0-9-]+$/),
  faq: z
    .array(z.object({ question: z.string().min(10), answer: z.string().min(40) }))
    .min(3)
    .max(6),
});

const CLICHES = [/\bdelve\b/i, /game[- ]changer/i, /in today's (fast-paced|digital)/i, /\bunlock\b/i, /\belevate\b/i, /i dagens (digitale|hurtige)/i];

/**
 * Check a generated article against the site's renderer constraints and our SEO rules.
 * Returns { ok, errors[], warnings[], data, content, wordCount }.
 */
export function validateArticle(markdown, { lang, date, pillar, alternateSlug, minWords }) {
  const errors = [];
  const warnings = [];
  let parsed;
  try {
    parsed = matter(markdown.trim() + '\n');
  } catch (e) {
    return { ok: false, errors: [`Frontmatter is not valid YAML: ${e.message}`], warnings };
  }
  const { data, content } = parsed;
  if (!markdown.trimStart().startsWith('---')) errors.push('File must start with YAML frontmatter (---).');

  const fm = FrontmatterSchema.safeParse(data);
  if (!fm.success) {
    for (const issue of fm.error.issues) errors.push(`frontmatter.${issue.path.join('.')}: ${issue.message}`);
  }
  if (data.date !== date) errors.push(`frontmatter.date must be "${date}"`);
  if (data.pillar !== pillar) errors.push(`frontmatter.pillar must be "${pillar}"`);
  if (data.alternateSlug !== alternateSlug) errors.push(`frontmatter.alternateSlug must be "${alternateSlug}"`);
  const extraKeys = Object.keys(data).filter((k) => !['title', 'description', 'date', 'author', 'pillar', 'alternateSlug', 'faq', 'coverImage', 'audioCompare', 'updated', 'seoTitle'].includes(k));
  if (extraKeys.length) errors.push(`Unexpected frontmatter keys: ${extraKeys.join(', ')}`);

  const body = content.replace(/```[\s\S]*?```/g, ''); // ignore code blocks for structure checks
  if (/^#\s/m.test(body)) errors.push('Body contains an H1 ("# "). Use ## and ### only.');
  if (/^\s*\|.*\|\s*$/m.test(body)) errors.push('Body contains a Markdown table. Tables do not render on this site; use lists.');
  if (/<\/?[a-z][a-z0-9]*(\s[^>]*)?>/i.test(body)) errors.push('Body contains HTML tags. Use plain Markdown only.');
  if (/!\[[^\]]*\]\(/.test(body)) errors.push('Body contains images. Remove them.');
  if (/^\s*[-*] \[[ x]\]/m.test(body)) errors.push('Body contains task-list checkboxes. Use plain bullets.');
  if (/\[\^\d+\]/.test(body)) errors.push('Body contains footnotes. Remove them.');

  const h2 = body.match(/^##\s+.+$/gm) ?? [];
  if (h2.length < 4) errors.push(`Only ${h2.length} H2 sections; need 4–9.`);
  if (h2.length > 10) errors.push(`${h2.length} H2 sections; keep it to 4–9.`);
  if (h2.some((h) => /faq|ofte stillede|spørgsmål (og|&) svar/i.test(h))) errors.push('Body has a FAQ section; FAQs belong only in frontmatter.');

  const words = content.trim().split(/\s+/).filter(Boolean).length;
  if (words < minWords) errors.push(`Body is ${words} words; minimum is ${minWords}.`);
  if (words > 3500) warnings.push(`Body is long (${words} words).`);

  const externalLinks = body.match(/\]\(https?:\/\/(?!frederikdinesen\.com)[^)]+\)/g) ?? [];
  if (externalLinks.length) errors.push(`External links are not allowed (found ${externalLinks.length}).`);

  const ctaMentions = (body.match(/test[- ]?mix/gi) ?? []).length;
  if (ctaMentions === 0) warnings.push('No natural mention of the free test mix in the body.');
  if (ctaMentions > 2) warnings.push(`Test mix mentioned ${ctaMentions} times; it can read as salesy.`);

  for (const re of CLICHES) if (re.test(body)) warnings.push(`Cliché detected: ${re}`);
  const docTitle = data.seoTitle || data.title;
  if (docTitle && docTitle.length > 65) warnings.push(`${data.seoTitle ? 'seoTitle' : 'Title'} is ${docTitle.length} chars; add a shorter seoTitle (max ~60) so search engines don't truncate it.`);
  if (data.description && (data.description.length < 140 || data.description.length > 160))
    warnings.push(`Description is ${data.description.length} chars (ideal 140–160).`);
  if (lang === 'da' && /\b(the|and|with|your)\b/.test(data.title ?? '')) warnings.push('Danish title looks like it contains English words.');

  return { ok: errors.length === 0, errors, warnings, data, content, wordCount: words };
}
