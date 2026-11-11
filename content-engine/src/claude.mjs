import fs from 'node:fs';
import Anthropic from '@anthropic-ai/sdk';
import { extractJson, log, readPrompt, resolveFromEngine, warn } from './util.mjs';
import { validateArticle } from './validate.mjs';

let client;
const claude = () => (client ??= new Anthropic()); // reads ANTHROPIC_API_KEY

const LANG_NAME = { da: 'Danish', en: 'English' };

/** Stable system prompt (cached): writing rules + tone of voice + a published article as the style reference. */
function systemBlocks(config, lang) {
  const rules = readPrompt('writer.md').replaceAll('{MIN_WORDS}', String(config.run.minWordsPerArticle));
  const tone = readPrompt('tone-of-voice.md');
  const exampleFile = resolveFromEngine(
    `${config.site.contentDir}/${lang}/${lang === 'da' ? 'vokalindspilning-hjemmestudie' : 'home-studio-vocal-tracking'}.md`,
  );
  const example = fs.existsSync(exampleFile) ? fs.readFileSync(exampleFile, 'utf8') : '';
  return [
    { type: 'text', text: rules },
    { type: 'text', text: `# FD Sound Labs tone of voice\n\n${tone}` },
    {
      type: 'text',
      text: example
        ? `# Reference article (published, approved by Frederik). Match its voice, structure and formatting. Do not copy its content.\n\n${example}`
        : '# Reference article\n(none available)',
      cache_control: { type: 'ephemeral' },
    },
  ];
}

function textOf(message) {
  const text = message.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('')
    .trim();
  // Tolerate a wrapping ```markdown fence even though the prompt forbids it.
  return text.replace(/^```(?:markdown|md)?\s*\n([\s\S]*?)\n```$/i, '$1').trim();
}

/**
 * Write one article in `lang` with Claude. Validates the output against the site's
 * rules and asks Claude to fix any problems (up to 2 repair turns).
 */
export async function writeArticle({ config, lang, topic, brief, pillarName, date, alternateSlug, internalLinks, sourceArticle }) {
  const keyword = lang === 'da' ? topic.primaryKeywordDa : topic.primaryKeywordEn;
  const title = lang === 'da' ? topic.titleDa : topic.titleEn;
  const task = [
    `Write the ${LANG_NAME[lang]} version of a new FD Sound Labs blog article.`,
    '',
    `- Working title: ${title}`,
    `- Primary keyword: ${keyword}`,
    `- Secondary keywords: ${topic.secondaryKeywords.join(', ')}`,
    `- Search intent: ${topic.searchIntent}`,
    `- Angle: ${topic.angle}`,
    `- date: "${date}"`,
    `- pillar: "${pillarName}"`,
    `- alternateSlug: "${alternateSlug}" (the URL slug of the other-language version)`,
    '',
    '## Existing FD Sound Labs articles you may link to internally (relative paths)',
    internalLinks.length ? internalLinks.map((p) => `- [${p.title}](${p.path})`).join('\n') : '(none)',
    '',
    '<research_brief>',
    brief,
    '</research_brief>',
  ];
  if (sourceArticle) {
    task.push(
      '',
      `The Danish version is already written and approved for structure and facts. Write a natural ${LANG_NAME[lang]} version for an international audience. Adapt it rather than translating word for word: use the ${LANG_NAME[lang]} keyword, local phrasing, and the same facts and section structure. FAQ answers should cover the same ground.`,
      '<danish_version>',
      sourceArticle,
      '</danish_version>',
    );
  }

  const expected = { lang, date, pillar: pillarName, alternateSlug, minWords: config.run.minWordsPerArticle };
  return runWriter({ config, lang, messages: [{ role: 'user', content: task.join('\n') }], expected, label: 'writing' });
}

/** One streamed Claude call with refusal/max_tokens handling and token logging. */
async function callClaude({ config, system, messages, effort, maxTokens = 64000 }) {
  const stream = claude().beta.messages.stream({
    model: config.models.writer,
    max_tokens: maxTokens,
    output_config: { effort: effort ?? config.models.writerEffort ?? 'high' },
    // If a request is ever declined by a safety classifier, retry on a fallback model automatically.
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    system,
    messages,
  });
  const message = await stream.finalMessage();
  if (message.stop_reason === 'refusal') {
    throw new Error(`Claude declined the request (${message.stop_details?.category ?? 'unknown'})`);
  }
  if (message.stop_reason === 'max_tokens') warn('Claude hit max_tokens; output may be truncated');
  const u = message.usage;
  log(`  tokens: in=${u.input_tokens} cache_read=${u.cache_read_input_tokens ?? 0} out=${u.output_tokens}`);
  return message;
}

/** Generate -> validate -> ask for a fix (up to 2 repair turns). */
async function runWriter({ config, lang, messages, expected, label }) {
  const system = systemBlocks(config, lang);
  for (let attempt = 1; attempt <= 3; attempt++) {
    log(`Claude: ${label} ${lang.toUpperCase()} article (attempt ${attempt}, ${config.models.writer})`);
    const message = await callClaude({ config, system, messages });
    const markdown = textOf(message);
    const result = validateArticle(markdown, expected);
    if (result.ok) {
      for (const w of result.warnings) warn(`[${lang}] ${w}`);
      return { markdown, ...result };
    }
    warn(`[${lang}] draft failed validation:\n  - ${result.errors.join('\n  - ')}`);
    if (attempt === 3) {
      throw new Error(`${lang} article still invalid after 3 attempts: ${result.errors.join('; ')}`);
    }
    // Keep the full assistant turn (including thinking blocks) and ask for a corrected file.
    messages.push({ role: 'assistant', content: message.content });
    messages.push({
      role: 'user',
      content: `The file failed these automatic checks:\n- ${result.errors.join('\n- ')}\n\nReturn the complete corrected Markdown file (frontmatter + body), with nothing else.`,
    });
  }
}

/**
 * Apply high-confidence fact-check findings: Claude corrects or removes each flagged claim
 * and keeps everything else unchanged.
 */
export async function reviseArticle({ config, lang, markdown, findings, expected }) {
  const list = findings
    .map(
      (f, i) =>
        `${i + 1}. [${f.verdict}] "${f.quote}"\n   Why: ${f.explanation}\n   Suggested fix: ${f.suggestion}`,
    )
    .join('\n');
  const content = [
    'A fact-checker with web access reviewed this article and flagged the claims below.',
    'Fix each one: correct it, soften it to what is actually supported, or remove it. Keep the sentence flow natural.',
    'Change nothing else: same structure, same frontmatter values, same voice. If you are certain a finding is itself wrong, keep the original text.',
    '',
    '<findings>',
    list,
    '</findings>',
    '',
    '<article>',
    markdown,
    '</article>',
    '',
    'Return the complete corrected Markdown file (frontmatter + body), with nothing else.',
  ].join('\n');
  return runWriter({ config, lang, messages: [{ role: 'user', content }], expected, label: 'fact-fixing' });
}

/**
 * Internal links the other way: for each older article, Claude proposes at most one small edit
 * that adds a link to the new article, where it genuinely helps the reader.
 * Returns [{ slug, find, replace, reason }]; the caller applies them only if `find` matches exactly once.
 */
export async function proposeBacklinks({ config, lang, newArticle, candidates }) {
  if (!candidates.length) return [];
  const content = [
    `A new ${LANG_NAME[lang]} article was just written for the FD Sound Labs blog:`,
    `- Title: ${newArticle.title}`,
    `- Path: ${newArticle.path}`,
    `- Summary: ${newArticle.description}`,
    '',
    'Below are older articles on the same site. For each one, decide whether a link to the new article would genuinely help its readers.',
    'If yes, propose ONE minimal edit: pick one existing sentence (copy it exactly, character for character, from the body, not from the frontmatter) and rewrite it so it naturally includes a Markdown link to the new article path. You may append a short clause, but keep the change small and in the same voice.',
    "If there is no natural place, skip that article. Don't force links. Never edit headings, blockquote markers, lists of gear or the frontmatter.",
    '',
    ...candidates.map((c) => `<article slug="${c.slug}">\n${c.body}\n</article>`),
    '',
    'Return only JSON: [{"slug": "...", "find": "exact existing sentence", "replace": "the sentence with the link", "reason": "why this helps"}] (an empty array is fine).',
  ].join('\n');
  log(`Claude: looking for backlink spots in ${candidates.length} older ${lang.toUpperCase()} article(s)`);
  const message = await callClaude({
    config,
    system: `You are the editor of the FD Sound Labs blog (rock/metal mixing). You write in ${LANG_NAME[lang]} and keep edits minimal.`,
    messages: [{ role: 'user', content }],
    effort: 'medium',
    maxTokens: 16000,
  });
  try {
    const list = extractJson(textOf(message));
    return (Array.isArray(list) ? list : []).filter(
      (e) => e && typeof e.slug === 'string' && typeof e.find === 'string' && typeof e.replace === 'string' && e.replace.includes(newArticle.path),
    );
  } catch {
    warn('backlink proposal was not valid JSON; skipping');
    return [];
  }
}
