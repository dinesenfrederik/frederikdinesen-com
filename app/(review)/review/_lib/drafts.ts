import matter from 'gray-matter';
import { ENGINE_WORKFLOW, getFile, gh, putFile, type PullFile, type PullRequest } from './github';

const ARTICLE_RE = /^content\/blog\/(da|en)\/([a-z0-9-]+)\.md$/;
const REVIEW_RE = /^content-engine\/data\/reviews\/[^/]+\.json$/;
const SITE = 'https://frederikdinesen.com';

export type Lang = 'da' | 'en';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface DraftArticle {
  lang: Lang;
  path: string;
  slug: string;
  sha: string;
  title: string;
  description: string;
  date: string;
  pillar: string;
  faq: FaqItem[];
  body: string;
  liveUrl: string;
}

export interface FactFinding {
  quote: string;
  verdict: string;
  confidence: string;
  explanation: string;
  suggestion?: string;
}

/** Written by the content engine next to each draft (content-engine/data/reviews/*.json). */
export interface ReviewMeta {
  topic?: {
    titleDa?: string;
    titleEn?: string;
    pillar?: string;
    primaryKeywordDa?: string;
    primaryKeywordEn?: string;
    whyNow?: string;
    angle?: string;
    score?: number;
  };
  factCheck?: { fixed: FactFinding[]; toReview: FactFinding[]; error?: string };
  backlinks?: { lang: Lang; file: string; replace: string; reason?: string }[];
  sources?: { title: string; url: string }[];
  videos?: { title: string; url: string; channel?: string }[];
  warnings?: string[];
}

export interface BacklinkChange {
  path: string;
  lang: Lang;
  slug: string;
  added: string[];
  reason?: string;
}

export interface Draft {
  number: number;
  title: string;
  createdAt: string;
  branch: string;
  headSha: string;
  articles: DraftArticle[];
  backlinks: BacklinkChange[];
  review: ReviewMeta | null;
  prBody: string;
  htmlUrl: string;
}

export function isDraftPr(pr: Pick<PullRequest, 'title' | 'labels'>): boolean {
  return /^Blog draft:/i.test(pr.title) || pr.labels.some((l) => l.name === 'content-engine');
}

/** Today's date in Denmark, YYYY-MM-DD. */
export function todayDk(): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Copenhagen' }).format(new Date());
}

function parseArticle(lang: Lang, path: string, slug: string, text: string, sha: string): DraftArticle {
  const { data, content } = matter(text);
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? '');
  return {
    lang,
    path,
    slug,
    sha,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date,
    pillar: String(data.pillar ?? ''),
    faq: Array.isArray(data.faq) ? data.faq.map((f: FaqItem) => ({ question: String(f.question ?? ''), answer: String(f.answer ?? '') })) : [],
    body: content.replace(/^\n+/, ''),
    liveUrl: `${SITE}${lang === 'da' ? '/blog/' : '/en/blog/'}${slug}`,
  };
}

async function listFiles(n: number): Promise<PullFile[]> {
  return gh<PullFile[]>(`/pulls/${n}/files?per_page=100`);
}

/** Lines added in a unified diff patch (used to show backlink edits when there's no review.json). */
function addedLines(patch = ''): string[] {
  return patch
    .split('\n')
    .filter((l) => l.startsWith('+') && !l.startsWith('+++'))
    .map((l) => l.slice(1).trim())
    .filter(Boolean);
}

export async function getDraft(n: number): Promise<Draft | null> {
  let pr: PullRequest;
  try {
    pr = await gh<PullRequest>(`/pulls/${n}`);
  } catch {
    return null;
  }
  if (!isDraftPr(pr) || pr.state !== 'open') return null;
  const files = await listFiles(n);
  const ref = pr.head.sha;

  const articleFiles = files.filter((f) => f.status === 'added' && ARTICLE_RE.test(f.filename));
  const articles = await Promise.all(
    articleFiles.map(async (f) => {
      const [, lang, slug] = f.filename.match(ARTICLE_RE)!;
      const { text, sha } = await getFile(f.filename, ref);
      return parseArticle(lang as Lang, f.filename, slug, text, sha);
    }),
  );
  articles.sort((a, b) => (a.lang === 'da' ? -1 : 1) - (b.lang === 'da' ? -1 : 1));

  const reviewFile = files.find((f) => f.status === 'added' && REVIEW_RE.test(f.filename));
  let review: ReviewMeta | null = null;
  if (reviewFile) {
    try {
      review = JSON.parse((await getFile(reviewFile.filename, ref)).text) as ReviewMeta;
    } catch {
      review = null;
    }
  }

  const backlinks: BacklinkChange[] = files
    .filter((f) => f.status === 'modified' && ARTICLE_RE.test(f.filename))
    .map((f) => {
      const [, lang, slug] = f.filename.match(ARTICLE_RE)!;
      const meta = review?.backlinks?.find((b) => b.file === f.filename);
      return { path: f.filename, lang: lang as Lang, slug, added: meta ? [meta.replace] : addedLines(f.patch), reason: meta?.reason };
    });

  return {
    number: pr.number,
    title: pr.title.replace(/^Blog draft:\s*/i, ''),
    createdAt: pr.created_at,
    branch: pr.head.ref,
    headSha: pr.head.sha,
    articles,
    backlinks,
    review,
    prBody: pr.body ?? '',
    htmlUrl: pr.html_url,
  };
}

export interface DraftSummary {
  number: number;
  titleDa: string;
  titleEn: string;
  pillar: string;
  createdAt: string;
  toReview: number;
  fixed: number;
}

export async function listOpenDrafts(): Promise<DraftSummary[]> {
  const prs = (await gh<PullRequest[]>('/pulls?state=open&per_page=50')).filter(isDraftPr);
  return Promise.all(
    prs.map(async (pr) => {
      const draft = await getDraft(pr.number);
      const da = draft?.articles.find((a) => a.lang === 'da');
      const en = draft?.articles.find((a) => a.lang === 'en');
      return {
        number: pr.number,
        titleDa: da?.title ?? pr.title,
        titleEn: en?.title ?? pr.title.replace(/^Blog draft:\s*/i, ''),
        pillar: da?.pillar ?? '',
        createdAt: pr.created_at,
        toReview: draft?.review?.factCheck?.toReview.length ?? 0,
        fixed: draft?.review?.factCheck?.fixed.length ?? 0,
      };
    }),
  );
}

export interface RecentDraft {
  number: number;
  title: string;
  status: 'published' | 'rejected';
  closedAt: string;
}

export async function listRecentDrafts(limit = 8): Promise<RecentDraft[]> {
  const prs = (await gh<PullRequest[]>('/pulls?state=closed&per_page=30&sort=updated&direction=desc')).filter(isDraftPr);
  return prs.slice(0, limit).map((pr) => ({
    number: pr.number,
    title: pr.title.replace(/^Blog draft:\s*/i, ''),
    status: pr.merged_at ? 'published' : 'rejected',
    closedAt: pr.closed_at ?? pr.created_at,
  }));
}

export interface EngineRun {
  status: string;
  conclusion: string | null;
  createdAt: string;
  url: string;
}

export async function latestEngineRun(): Promise<EngineRun | null> {
  try {
    const res = await gh<{ workflow_runs: { status: string; conclusion: string | null; created_at: string; html_url: string }[] }>(
      `/actions/workflows/${ENGINE_WORKFLOW}/runs?per_page=1`,
    );
    const run = res.workflow_runs[0];
    return run ? { status: run.status, conclusion: run.conclusion, createdAt: run.created_at, url: run.html_url } : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Mutations

/** Re-read the PR and make sure `path` is one of its new articles (never trust the client's path). */
async function openDraftFile(n: number, path: string) {
  const pr = await gh<PullRequest>(`/pulls/${n}`);
  if (!isDraftPr(pr) || pr.state !== 'open') throw new Error('Kladden er ikke længere åben.');
  const files = await listFiles(n);
  const file = files.find((f) => f.filename === path);
  if (!file || !ARTICLE_RE.test(path)) throw new Error('Filen hører ikke til denne kladde.');
  return { pr, file };
}

export interface ArticleEdit {
  title: string;
  description: string;
  faq: FaqItem[];
  body: string;
}

export async function saveArticle(n: number, path: string, expectedSha: string, edit: ArticleEdit): Promise<string> {
  const { pr, file } = await openDraftFile(n, path);
  if (file.status !== 'added') throw new Error('Kun nye artikler kan redigeres her.');
  const current = await getFile(path, pr.head.ref);
  if (current.sha !== expectedSha) {
    throw new Error('Artiklen er blevet ændret et andet sted, siden du åbnede den. Genindlæs siden og prøv igen.');
  }
  const { data } = matter(current.text);
  const next = matter.stringify(`\n${edit.body.trim()}\n`, {
    ...data,
    title: edit.title.trim(),
    description: edit.description.trim(),
    faq: edit.faq
      .map((f) => ({ question: f.question.trim(), answer: f.answer.trim() }))
      .filter((f) => f.question && f.answer),
  });
  return putFile(path, pr.head.ref, next, current.sha, `Review: ret ${path.split('/').pop()}`);
}

/** Drop a backlink edit in an older article by restoring the version from main. */
export async function revertBacklink(n: number, path: string): Promise<void> {
  const { pr, file } = await openDraftFile(n, path);
  if (file.status !== 'modified') throw new Error('Det er ikke et link i en ældre artikel.');
  const original = await getFile(path, pr.base.ref);
  const current = await getFile(path, pr.head.ref);
  await putFile(path, pr.head.ref, original.text, current.sha, `Review: fjern nyt link i ${path.split('/').pop()}`);
}

/** Publish: set today's date on the new articles (and their sitemap entries), then squash-merge. */
export async function publishDraft(n: number): Promise<{ urls: string[] }> {
  const pr = await gh<PullRequest>(`/pulls/${n}`);
  if (!isDraftPr(pr) || pr.state !== 'open') throw new Error('Kladden er ikke længere åben.');
  const files = await listFiles(n);
  const today = todayDk();
  const urls: string[] = [];
  let changedDates = false;

  for (const f of files.filter((x) => x.status === 'added' && ARTICLE_RE.test(x.filename))) {
    const [, lang, slug] = f.filename.match(ARTICLE_RE)!;
    urls.push(`${SITE}${lang === 'da' ? '/blog/' : '/en/blog/'}${slug}`);
    const current = await getFile(f.filename, pr.head.ref);
    const parsed = matter(current.text);
    const date = parsed.data.date instanceof Date ? parsed.data.date.toISOString().slice(0, 10) : String(parsed.data.date ?? '');
    if (date !== today) {
      const next = current.text.replace(/^date:\s*.*$/m, `date: "${today}"`);
      if (next !== current.text) {
        await putFile(f.filename, pr.head.ref, next, current.sha, `Review: udgivelsesdato ${today}`);
        changedDates = true;
      }
    }
  }
  if (changedDates && files.some((f) => f.filename === 'sitemap.xml')) {
    const sitemap = await getFile('sitemap.xml', pr.head.ref);
    let xml = sitemap.text;
    for (const url of urls) {
      const loc = url.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
      xml = xml.replace(new RegExp(`(<loc>${loc}</loc>[\\s\\S]*?<lastmod>)[^<]*(</lastmod>)`), `$1${today}$2`);
    }
    if (xml !== sitemap.text) await putFile('sitemap.xml', pr.head.ref, xml, sitemap.sha, `Review: sitemap ${today}`);
  }

  try {
    await gh(`/pulls/${n}/merge`, { method: 'PUT', json: { merge_method: 'squash', commit_title: `${pr.title} (#${n})` } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (/not mergeable|conflict/i.test(msg)) {
      throw new Error('Kladden kan ikke udgives automatisk, fordi den er i konflikt med noget, der er udgivet i mellemtiden (typisk sitemap.xml). Bed Claude om at løse konflikten.');
    }
    throw e;
  }
  return { urls };
}

export async function rejectDraft(n: number): Promise<void> {
  const pr = await gh<PullRequest>(`/pulls/${n}`);
  if (!isDraftPr(pr) || pr.state !== 'open') throw new Error('Kladden er ikke længere åben.');
  await gh(`/pulls/${n}`, { method: 'PATCH', json: { state: 'closed' } });
}

/** Start the content engine on GitHub Actions for one specific topic. */
export async function orderArticle(topic: string): Promise<void> {
  await gh(`/actions/workflows/${ENGINE_WORKFLOW}/dispatches`, {
    method: 'POST',
    json: { ref: 'main', inputs: { topic, count: '1' } },
  });
}
