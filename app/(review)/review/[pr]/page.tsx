import { connection } from 'next/server';
import { notFound, redirect } from 'next/navigation';
import { isAuthed } from '../_lib/auth';
import { getDraft } from '../_lib/drafts';
import { renderMarkdown } from '../_lib/markdown';
import DraftWorkspace from '../_components/DraftWorkspace';

export default async function DraftPage({ params }: { params: Promise<{ pr: string }> }) {
  await connection(); // always render per request: private, depends on cookies + live GitHub data
  if (!(await isAuthed())) redirect('/review');
  const { pr } = await params;
  const n = Number(pr);
  if (!Number.isInteger(n) || n <= 0) notFound();

  const draft = await getDraft(n);
  if (!draft || !draft.articles.length) {
    return (
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md text-center text-zinc-400">
          <p>Denne kladde findes ikke længere. Den er måske allerede udgivet eller afvist.</p>
          <a href="/review" className="mt-4 inline-block text-amber underline">Tilbage til oversigten</a>
        </div>
      </main>
    );
  }

  const initialHtml = Object.fromEntries(
    await Promise.all(draft.articles.map(async (a) => [a.lang, await renderMarkdown(a.body)] as const)),
  );

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:py-10">
      <DraftWorkspace
        pr={draft.number}
        title={draft.title}
        createdAt={draft.createdAt}
        articles={draft.articles}
        initialHtml={initialHtml}
        review={draft.review}
        backlinks={draft.backlinks}
      />
    </main>
  );
}
