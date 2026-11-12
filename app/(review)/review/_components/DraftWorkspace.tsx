'use client';

import React, { useEffect, useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import ArticlePreview from './ArticlePreview';
import { editorHints, renderMarkdown } from '../_lib/markdown';
import { publishDraft, rejectDraft, removeBacklink, saveArticle, type ActionResult } from '../actions';
import type { BacklinkChange, DraftArticle, FaqItem, FactFinding, ReviewMeta } from '../_lib/drafts';

type Lang = 'da' | 'en';
type Mode = 'read' | 'edit';

interface EditState {
  title: string;
  description: string;
  faq: FaqItem[];
  body: string;
  sha: string;
  dirty: boolean;
}

const LANG_LABEL: Record<Lang, string> = { da: 'Dansk', en: 'English' };

// remark-html leaves quotes as-is in text, but other renderers may encode them; try both.
const escapeText = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Highlight fact-check quotes in the rendered HTML so they're easy to find while reading. */
function highlight(html: string, findings: FactFinding[]): string {
  let out = html;
  for (const f of findings) {
    if (/[*_`[\]]/.test(f.quote)) continue; // contains Markdown, won't match the HTML 1:1
    const plain = escapeText(f.quote);
    for (const variant of [plain, plain.replace(/"/g, '&quot;').replace(/'/g, '&#x27;')]) {
      if (out.includes(variant)) {
        out = out.replace(variant, `<mark style="background:rgba(255,159,10,.22);color:inherit;border-bottom:2px solid #FF9F0A;padding:0 2px;border-radius:3px">${variant}</mark>`);
        break;
      }
    }
  }
  return out;
}

export default function DraftWorkspace({
  pr,
  title,
  createdAt,
  articles,
  initialHtml,
  review,
  backlinks,
}: {
  pr: number;
  title: string;
  createdAt: string;
  articles: DraftArticle[];
  initialHtml: Record<string, string>;
  review: ReviewMeta | null;
  backlinks: BacklinkChange[];
}) {
  const langs = articles.map((a) => a.lang);
  const [lang, setLang] = useState<Lang>(langs[0] ?? 'da');
  const [mode, setMode] = useState<Mode>('read');
  const [edits, setEdits] = useState<Record<string, EditState>>(() =>
    Object.fromEntries(
      articles.map((a) => [a.lang, { title: a.title, description: a.description, faq: a.faq, body: a.body, sha: a.sha, dirty: false }]),
    ),
  );
  const [html, setHtml] = useState<Record<string, string>>(initialHtml);
  const [notice, setNotice] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [confirm, setConfirm] = useState<null | 'publish' | 'reject'>(null);
  const [pending, startTransition] = useTransition();
  const [removedLinks, setRemovedLinks] = useState<string[]>([]);

  const article = articles.find((a) => a.lang === lang)!;
  const edit = edits[lang];
  const dirtyLangs = (Object.keys(edits) as Lang[]).filter((l) => edits[l].dirty);
  const findings = review?.factCheck;

  // Live preview while editing.
  useEffect(() => {
    if (!edit) return;
    const t = setTimeout(() => {
      renderMarkdown(edit.body).then((h) => setHtml((prev) => ({ ...prev, [lang]: h })));
    }, 250);
    return () => clearTimeout(t);
  }, [edit?.body, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirtyLangs.length) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirtyLangs.length]);

  const update = (patch: Partial<EditState>) =>
    setEdits((prev) => ({ ...prev, [lang]: { ...prev[lang], ...patch, dirty: true } }));

  const previewHtml = useMemo(
    () => (lang === 'da' && findings?.toReview?.length ? highlight(html[lang] ?? '', findings.toReview) : html[lang] ?? ''),
    [html, lang, findings],
  );

  const hints = edit ? editorHints(edit, lang) : [];

  async function saveLang(l: Lang): Promise<boolean> {
    const e = edits[l];
    const a = articles.find((x) => x.lang === l)!;
    const res: ActionResult = await saveArticle({ pr, path: a.path, sha: e.sha, title: e.title, description: e.description, faq: e.faq, body: e.body });
    if (!res.ok) {
      setNotice({ kind: 'error', text: `${LANG_LABEL[l]}: ${res.error}` });
      return false;
    }
    setEdits((prev) => ({ ...prev, [l]: { ...prev[l], sha: res.sha ?? prev[l].sha, dirty: false } }));
    return true;
  }

  function saveAll() {
    startTransition(async () => {
      setNotice(null);
      for (const l of dirtyLangs) if (!(await saveLang(l))) return;
      setNotice({ kind: 'ok', text: 'Dine rettelser er gemt i kladden. ✓' });
    });
  }

  function doPublish() {
    startTransition(async () => {
      setNotice(null);
      for (const l of dirtyLangs) if (!(await saveLang(l))) return setConfirm(null);
      const res = await publishDraft(pr); // redirects on success
      if (res && !res.ok) {
        setNotice({ kind: 'error', text: res.error });
        setConfirm(null);
      }
    });
  }

  function doReject() {
    startTransition(async () => {
      const res = await rejectDraft(pr);
      if (res && !res.ok) {
        setNotice({ kind: 'error', text: res.error });
        setConfirm(null);
      }
    });
  }

  function dropLink(path: string) {
    startTransition(async () => {
      const res = await removeBacklink(pr, path);
      if (res.ok) setRemovedLinks((r) => [...r, path]);
      setNotice(res.ok ? { kind: 'ok', text: res.message ?? 'Fjernet' } : { kind: 'error', text: res.error });
    });
  }

  return (
    <div className="pb-32">
      {/* Title row */}
      <div className="mb-6">
        <Link href="/review" className="text-xs font-mono text-zinc-400 hover:text-amber transition-colors">
          &larr; Alle kladder
        </Link>
        <h1 className="mt-3 text-lg sm:text-xl font-semibold text-zinc-200 leading-snug">{articles.find((a) => a.lang === 'da')?.title ?? title}</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Kladde #{pr} · skrevet {new Date(createdAt).toLocaleDateString('da-DK', { day: 'numeric', month: 'long' })}
          {review?.topic?.primaryKeywordDa && <> · søgeord: <span className="text-zinc-300">{review.topic.primaryKeywordDa}</span></>}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main column */}
        <div className="min-w-0">
          {/* Tabs */}
          <div className="sticky top-0 z-20 -mx-4 px-4 py-3 bg-black/90 backdrop-blur border-b border-border flex flex-wrap items-center gap-2">
            <div className="flex rounded-lg border border-border overflow-hidden">
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-2 text-sm font-semibold transition-colors ${l === lang ? 'bg-amber text-black' : 'text-zinc-300 hover:bg-zinc-900'}`}
                >
                  {LANG_LABEL[l]}
                  {edits[l]?.dirty && <span className="ml-1">•</span>}
                </button>
              ))}
            </div>
            <div className="flex rounded-lg border border-border overflow-hidden ml-auto">
              {(['read', 'edit'] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-4 py-2 text-sm font-semibold transition-colors ${m === mode ? 'bg-zinc-100 text-black' : 'text-zinc-300 hover:bg-zinc-900'}`}
                >
                  {m === 'read' ? '👁  Læs som på siden' : '✎  Ret teksten'}
                </button>
              ))}
            </div>
          </div>

          {mode === 'read' ? (
            <div className="mt-8">
              <ArticlePreview
                article={{ lang, title: edit.title, description: edit.description, date: article.date, pillar: article.pillar, faq: edit.faq }}
                html={previewHtml}
              />
            </div>
          ) : (
            <Editor edit={edit} update={update} html={html[lang] ?? ''} hints={hints} lang={lang} />
          )}
        </div>

        {/* Side column: what to check */}
        <aside className="order-first lg:order-none space-y-4 lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
          <Panel title="Sådan godkender du">
            <ol className="list-decimal pl-5 space-y-1.5 text-sm text-zinc-300">
              <li>Læs den danske artikel. Markeringer = tjek dem.</li>
              <li>Ret direkte i <b>Ret teksten</b>, hvis noget skal ændres.</li>
              <li>Kig kort på den engelske version.</li>
              <li>Tryk <b>Udgiv på siden</b>. Den er live efter ca. 2 min.</li>
            </ol>
          </Panel>

          <Panel title="Faktatjek">
            {!findings && <p className="text-sm text-zinc-500">Ingen faktatjek-data for denne kladde.</p>}
            {findings?.error && <p className="text-sm text-red-300">Faktatjekket fejlede. Tjek tallene ekstra grundigt.</p>}
            {findings && !findings.error && !findings.toReview.length && !findings.fixed.length && (
              <p className="text-sm text-emerald-300">Ingen problemer fundet ✓</p>
            )}
            {findings?.toReview?.map((f, i) => (
              <div key={i} className="mb-3 rounded-lg border border-amber/40 bg-amber/5 p-3 text-sm">
                <div className="text-[11px] font-mono uppercase tracking-wider text-amber mb-1">Tjek denne ({verdictDa(f.verdict)})</div>
                <p className="text-zinc-200 italic">“{f.quote}”</p>
                <p className="mt-1.5 text-zinc-400">{f.explanation}</p>
                {f.suggestion && f.suggestion !== 'remove' && <p className="mt-1 text-zinc-400">Forslag: {f.suggestion}</p>}
                {f.suggestion === 'remove' && <p className="mt-1 text-zinc-400">Forslag: slet sætningen.</p>}
              </div>
            ))}
            {!!findings?.fixed?.length && (
              <details className="text-sm">
                <summary className="cursor-pointer text-zinc-400">Rettet automatisk ({findings.fixed.length})</summary>
                {findings.fixed.map((f, i) => (
                  <div key={i} className="mt-2 rounded-lg border border-border p-3">
                    <p className="text-zinc-500 line-through">“{f.quote}”</p>
                    <p className="mt-1 text-zinc-400">{f.explanation}</p>
                  </div>
                ))}
              </details>
            )}
          </Panel>

          {backlinks.length > 0 && (
            <Panel title="Nye links i ældre artikler">
              {backlinks.map((b) => (
                <div key={b.path} className="mb-3 rounded-lg border border-border p-3 text-sm">
                  <div className="text-[11px] font-mono text-zinc-500 mb-1">
                    {b.lang.toUpperCase()} · {b.slug}
                  </div>
                  {removedLinks.includes(b.path) ? (
                    <p className="text-zinc-500">Fjernet.</p>
                  ) : (
                    <>
                      {b.added.slice(0, 2).map((line, i) => (
                        <p key={i} className="text-zinc-300">{line.replace(/\[([^\]]+)\]\([^)]+\)/g, '«$1»')}</p>
                      ))}
                      <button
                        disabled={pending}
                        onClick={() => dropLink(b.path)}
                        className="mt-2 text-xs text-zinc-400 underline hover:text-red-300 disabled:opacity-50"
                      >
                        Fjern dette link
                      </button>
                    </>
                  )}
                </div>
              ))}
            </Panel>
          )}

          {review?.topic?.whyNow && (
            <Panel title="Hvorfor dette emne">
              <p className="text-sm text-zinc-300">{review.topic.whyNow}</p>
              {review.topic.angle && <p className="mt-2 text-sm text-zinc-400">{review.topic.angle}</p>}
            </Panel>
          )}

          {(review?.sources?.length || review?.videos?.length) && (
            <Panel title="Kilder">
              <details className="text-sm">
                <summary className="cursor-pointer text-zinc-400">
                  {review?.sources?.length ?? 0} kilder · {review?.videos?.length ?? 0} videoer
                </summary>
                <ul className="mt-2 space-y-1.5">
                  {review?.videos?.map((v) => (
                    <li key={v.url}>
                      ▶ <a href={v.url} target="_blank" rel="noreferrer" className="text-amber hover:underline">{v.title}</a>
                    </li>
                  ))}
                  {review?.sources?.map((s) => (
                    <li key={s.url} className="truncate">
                      <a href={s.url} target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-amber hover:underline">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </Panel>
          )}
        </aside>
      </div>

      {/* Sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-zinc-950/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
          <div className="text-sm min-w-0 flex-1">
            {notice ? (
              <span className={notice.kind === 'ok' ? 'text-emerald-300' : 'text-red-300'}>{notice.text}</span>
            ) : dirtyLangs.length ? (
              <span className="text-amber">Du har ændringer, der ikke er gemt.</span>
            ) : (
              <span className="text-zinc-500">Klar til at blive udgivet, når du er tilfreds.</span>
            )}
          </div>
          {dirtyLangs.length > 0 && (
            <button onClick={saveAll} disabled={pending} className="px-4 py-2.5 rounded-lg border border-zinc-600 text-sm font-semibold hover:bg-zinc-900 disabled:opacity-50">
              {pending ? 'Gemmer…' : 'Gem ændringer'}
            </button>
          )}
          <button onClick={() => setConfirm('reject')} disabled={pending} className="px-4 py-2.5 rounded-lg border border-border text-sm text-zinc-300 hover:border-red-400/60 hover:text-red-300 disabled:opacity-50">
            Afvis
          </button>
          <button onClick={() => setConfirm('publish')} disabled={pending} className="px-5 py-2.5 rounded-lg bg-amber text-black text-sm font-bold hover:bg-amber-hover disabled:opacity-50">
            {dirtyLangs.length ? 'Gem og udgiv' : 'Udgiv på siden'}
          </button>
        </div>
      </div>

      {confirm && (
        <div className="fixed inset-0 z-40 bg-black/70 flex items-center justify-center p-4" onClick={() => !pending && setConfirm(null)}>
          <div className="w-full max-w-md rounded-2xl border border-border bg-zinc-950 p-6" onClick={(e) => e.stopPropagation()}>
            {confirm === 'publish' ? (
              <>
                <h2 className="text-xl font-bold text-white">Udgiv artiklen?</h2>
                <p className="mt-2 text-sm text-zinc-300">
                  Den danske og den engelske version bliver lagt på frederikdinesen.com med dags dato
                  {backlinks.length - removedLinks.length > 0 ? ', sammen med de nye links i ældre artikler' : ''}. Det tager ca. 2 minutter.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-white">Afvis kladden?</h2>
                <p className="mt-2 text-sm text-zinc-300">Artiklen bliver ikke udgivet, og emnet bliver ikke foreslået igen.</p>
              </>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setConfirm(null)} disabled={pending} className="px-4 py-2.5 rounded-lg border border-border text-sm">
                Fortryd
              </button>
              <button
                onClick={confirm === 'publish' ? doPublish : doReject}
                disabled={pending}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold disabled:opacity-60 ${confirm === 'publish' ? 'bg-amber text-black' : 'bg-red-500/90 text-white'}`}
              >
                {pending ? 'Et øjeblik…' : confirm === 'publish' ? 'Ja, udgiv' : 'Ja, afvis'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function verdictDa(v: string) {
  return v === 'wrong' ? 'muligvis forkert' : v === 'misleading' ? 'kan misforstås' : 'ingen kilde fundet';
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-zinc-950 p-4">
      <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-400 mb-3">{title}</h2>
      {children}
    </section>
  );
}

function Editor({
  edit,
  update,
  html,
  hints,
  lang,
}: {
  edit: EditState;
  update: (p: Partial<EditState>) => void;
  html: string;
  hints: string[];
  lang: Lang;
}) {
  const [showHelp, setShowHelp] = useState(false);
  const field = 'w-full rounded-lg border border-border bg-zinc-950 px-3 py-2.5 text-zinc-100 focus:outline-none focus:border-amber';
  return (
    <div className="mt-6 space-y-5">
      {hints.length > 0 && (
        <ul className="rounded-lg border border-amber/30 bg-amber/5 p-3 text-sm text-amber space-y-1">
          {hints.map((h) => (
            <li key={h}>• {h}</li>
          ))}
        </ul>
      )}

      <label className="block">
        <span className="text-sm font-semibold text-zinc-300">Titel</span>
        <input className={`${field} mt-1.5 text-lg font-semibold`} value={edit.title} onChange={(e) => update({ title: e.target.value })} />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-zinc-300">
          Beskrivelse (vises i Google) <span className="font-normal text-zinc-500">{edit.description.length} tegn</span>
        </span>
        <textarea rows={3} className={`${field} mt-1.5`} value={edit.description} onChange={(e) => update({ description: e.target.value })} />
      </label>

      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-zinc-300">Tekst</span>
          <button onClick={() => setShowHelp((s) => !s)} className="text-xs text-zinc-400 underline">
            {showHelp ? 'Skjul hjælp' : 'Hjælp til formatering'}
          </button>
        </div>
        {showHelp && (
          <div className="mt-2 rounded-lg border border-border p-3 text-xs font-mono text-zinc-400 grid sm:grid-cols-2 gap-1">
            <span>## Overskrift</span>
            <span>**fed tekst**</span>
            <span>* punkt i en liste</span>
            <span>1. nummereret punkt</span>
            <span>&gt; **Pro tip:** citatboks</span>
            <span>[linktekst](/blog/artikel)</span>
            <span>--- (streg mellem afsnit)</span>
            <span>Tom linje = nyt afsnit</span>
          </div>
        )}
        <div className="mt-1.5 grid gap-4 xl:grid-cols-2">
          <textarea
            data-editor="body"
            className={`${field} font-sans text-[15px] leading-7 min-h-[60vh]`}
            value={edit.body}
            onChange={(e) => update({ body: e.target.value })}
            spellCheck
            lang={lang}
          />
          <div className="hidden xl:block rounded-lg border border-border p-5 max-h-[80vh] overflow-y-auto">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-3">Forhåndsvisning</div>
            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </div>

      <div>
        <span className="text-sm font-semibold text-zinc-300">FAQ (spørgsmål og svar under artiklen)</span>
        <div className="mt-2 space-y-3">
          {edit.faq.map((f, i) => (
            <div key={i} className="rounded-lg border border-border p-3 space-y-2">
              <input
                className={field}
                value={f.question}
                placeholder="Spørgsmål"
                onChange={(e) => update({ faq: edit.faq.map((x, j) => (j === i ? { ...x, question: e.target.value } : x)) })}
              />
              <textarea
                rows={3}
                className={field}
                value={f.answer}
                placeholder="Svar"
                onChange={(e) => update({ faq: edit.faq.map((x, j) => (j === i ? { ...x, answer: e.target.value } : x)) })}
              />
              <button onClick={() => update({ faq: edit.faq.filter((_, j) => j !== i) })} className="text-xs text-zinc-500 underline hover:text-red-300">
                Fjern spørgsmål
              </button>
            </div>
          ))}
          {edit.faq.length < 8 && (
            <button onClick={() => update({ faq: [...edit.faq, { question: '', answer: '' }] })} className="text-sm text-amber underline">
              + Tilføj spørgsmål
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
