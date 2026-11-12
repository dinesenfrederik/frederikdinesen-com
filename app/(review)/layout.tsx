import type { Metadata } from 'next';
import '../../src/input.css';
import { FAVICON } from '@/lib/rootLayout';

export const metadata: Metadata = {
  title: 'Review · FD Sound Labs',
  robots: { index: false, follow: false, nocache: true },
  icons: { icon: FAVICON },
};

/** Own root shell for the private review dashboard: no analytics, never indexed. */
export default function ReviewRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased selection:bg-amber selection:text-obsidian bg-black text-zinc-100 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
