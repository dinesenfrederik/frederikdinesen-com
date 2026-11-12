import { connection } from 'next/server';
import Link from 'next/link';
import { isAuthed, isConfigured } from './_lib/auth';
import { latestEngineRun, listOpenDrafts, listRecentDrafts } from './_lib/drafts';
import LoginForm from './_components/LoginForm';
import OrderForm from './_components/OrderForm';
import { logout } from './actions';

const SITE = 'https://frederikdinesen.com';

function ago(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 864e5);
  return days <= 0 ? 'i dag' : days === 1 ? 'i går' : `for ${days} dage siden`;
}

export default async function ReviewHome({ searchParams }: { searchParams: Promise<{ published?: string; rejected?: string }> }) {
  await connection(); // always render per request: private, depends on cookies + live GitHub data
  if (!isConfigured()) return <SetupNeeded />;
  if (!(await isAuthed())) {
    return (
      <main className="flex-1 flex items-center justify-center p-4">
        <LoginForm />
      </main>
    );
  }

  const params = await searchParams;
  const [open, recent, run] = await Promise.all([
    listOpenDrafts()
      .then((drafts) => ({ drafts, error: null as string | null }))
      .catch((e: unknown) => ({ drafts: [], error: e instanceof Error ? e.message : String(e) })),
    listRecentDrafts().catch(() => []),
    latestEngineRun(),
  ]);
  const { drafts, error } = open;
  const running = run && run.status !== 'completed';

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-amber">FD Sound Labs</div>
          <h1 className="text-3xl font-bold text-white mt-1">Nye artikler</h1>
        </div>
        <form action={logout}>
          <button className="text-xs text-zinc-500 hover:text-zinc-300 underline">Log ud</button>
        </form>
      </div>

      {params.published && (
        <Banner kind="ok">
          Artiklen er udgivet 🎉 Den er live på siden om ca. 2 minutter, og søgemaskinerne får automatisk besked.
        </Banner>
      )}
      {params.rejected && <Banner kind="info">Kladden er afvist. Emnet bliver ikke foreslået igen.</Banner>}
      {error && <Banner kind="error">Kunne ikke hente kladder fra GitHub: {error}</Banner>}
      {running && (
        <Banner kind="info">
          ✍️ Motoren arbejder på en ny artikel lige nu (startet {new Date(run.createdAt).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })}). Kig forbi om lidt.
        </Banner>
      )}
      {run && run.status === 'completed' && run.conclusion === 'failure' && (
        <Banner kind="error">
          Den seneste kørsel af motoren fejlede ({ago(run.createdAt)}). Send linket til Claude:{' '}
          <a href={run.url} className="underline" target="_blank" rel="noreferrer">se fejlen</a>
        </Banner>
      )}

      <section className="space-y-4">
        <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-400">Venter på dig ({drafts.length})</h2>
        {drafts.length === 0 && (
          <div className="rounded-2xl border border-border bg-zinc-950 p-8 text-center text-zinc-400">
            Ingen kladder lige nu. Næste artikel skrives automatisk mandag morgen, eller du kan bestille en herunder.
          </div>
        )}
        {drafts.map((d) => (
          <Link
            key={d.number}
            href={`/review/${d.number}`}
            className="block rounded-2xl border border-border bg-zinc-950 p-5 sm:p-6 hover:border-amber/60 transition-colors group"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 mb-2">
              {d.pillar && <span className="text-amber uppercase tracking-wider">{d.pillar}</span>}
              <span>· skrevet {ago(d.createdAt)}</span>
              {d.toReview > 0 && (
                <span className="ml-auto rounded-full bg-amber/15 text-amber px-2.5 py-0.5">{d.toReview} ting at tjekke</span>
              )}
              {d.toReview === 0 && <span className="ml-auto rounded-full bg-emerald-500/10 text-emerald-300 px-2.5 py-0.5">faktatjek ok</span>}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber transition-colors">{d.titleDa}</h3>
            <p className="text-sm text-zinc-500 mt-1">{d.titleEn}</p>
            <div className="mt-4 text-sm font-semibold text-amber">Gennemgå &rarr;</div>
          </Link>
        ))}
      </section>

      <section className="mt-12 rounded-2xl border border-border bg-zinc-950 p-5 sm:p-6">
        <h2 className="text-lg font-bold text-white">Bestil en artikel</h2>
        <p className="text-sm text-zinc-400 mt-1 mb-4">
          Har du selv en idé? Skriv emnet, så researcher og skriver motoren artiklen. Den dukker op her om ca. 10 minutter.
        </p>
        <OrderForm />
      </section>

      {recent.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-400 mb-3">Seneste</h2>
          <ul className="divide-y divide-border rounded-2xl border border-border bg-zinc-950">
            {recent.map((r) => (
              <li key={r.number} className="flex items-center gap-3 px-5 py-3 text-sm">
                <span className={r.status === 'published' ? 'text-emerald-300' : 'text-zinc-500'}>
                  {r.status === 'published' ? '● Udgivet' : '○ Afvist'}
                </span>
                <span className="flex-1 truncate text-zinc-300">{r.title}</span>
                <span className="text-zinc-600 text-xs">{ago(r.closedAt)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-zinc-600">
            Alle udgivne artikler: <a className="underline hover:text-zinc-400" href={`${SITE}/blog`}>frederikdinesen.com/blog</a>
          </p>
        </section>
      )}
    </main>
  );
}

function Banner({ kind, children }: { kind: 'ok' | 'info' | 'error'; children: React.ReactNode }) {
  const styles = {
    ok: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200',
    info: 'border-amber/40 bg-amber/5 text-zinc-200',
    error: 'border-red-500/40 bg-red-500/10 text-red-200',
  }[kind];
  return <div className={`mb-6 rounded-xl border px-4 py-3 text-sm ${styles}`}>{children}</div>;
}

function SetupNeeded() {
  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <div className="max-w-md rounded-2xl border border-border bg-zinc-950 p-6 text-sm text-zinc-300 space-y-3">
        <h1 className="text-xl font-bold text-white">Dashboardet er næsten klar</h1>
        <p>
          Tilføj <code className="text-amber">REVIEW_PASSWORD</code> og <code className="text-amber">GITHUB_TOKEN</code> under
          Vercel → Settings → Environment Variables, og lav et nyt deploy.
        </p>
      </div>
    </main>
  );
}
