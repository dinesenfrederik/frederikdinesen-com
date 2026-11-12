import { remark } from 'remark';
import html from 'remark-html';

/** Same Markdown pipeline as lib/blog.ts, so the preview matches the live article. Runs on server and client. */
export async function renderMarkdown(markdown: string): Promise<string> {
  const out = await remark().use(html, { sanitize: false }).process(markdown);
  return out.toString();
}

/** Light checks that mirror the content engine's rules, shown as hints while editing. */
export function editorHints(fields: { title: string; description: string; body: string }, lang: 'da' | 'en'): string[] {
  const hints: string[] = [];
  const t = fields.title.trim().length;
  const d = fields.description.trim().length;
  if (!t) hints.push(lang === 'da' ? 'Titlen mangler.' : 'Title is missing.');
  else if (t > 70) hints.push(`Titlen er ${t} tegn. Google viser ca. de første 60.`);
  if (d && (d < 140 || d > 160)) hints.push(`Beskrivelsen er ${d} tegn (bedst 140–160).`);
  if (/^#\s/m.test(fields.body)) hints.push('Brug ## til overskrifter. En enkelt # er sidens titel.');
  if (/^\s*\|.*\|\s*$/m.test(fields.body)) hints.push('Tabeller vises ikke på siden. Brug punktopstilling.');
  const words = fields.body.trim().split(/\s+/).filter(Boolean).length;
  if (words < 600) hints.push(`Artiklen er kun ${words} ord.`);
  return hints;
}
