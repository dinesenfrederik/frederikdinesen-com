import type { Metadata } from 'next';
import '../src/input.css';
import { FAVICON } from '@/lib/rootLayout';

export const metadata: Metadata = {
  title: '404 – Siden findes ikke | FD Sound Labs',
  description: 'Siden findes ikke. / This page does not exist.',
  icons: { icon: FAVICON },
};

export default function GlobalNotFound() {
  return (
    <html lang="da">
      <body className="font-sans antialiased bg-black text-zinc-100 min-h-screen flex items-center justify-center px-6">
        <main className="text-center max-w-lg">
          <p className="font-mono text-amber text-sm tracking-widest mb-4">404</p>
          <h1 className="text-3xl font-bold text-white mb-4">Siden findes ikke</h1>
          <p className="text-zinc-300 mb-8">This page does not exist.</p>
          <div className="flex gap-4 justify-center font-mono text-sm">
            <a href="/" className="text-amber hover:underline">Forside</a>
            <a href="/blog" className="text-amber hover:underline">Blog</a>
            <a href="/en" className="text-amber hover:underline">English</a>
          </div>
        </main>
      </body>
    </html>
  );
}
