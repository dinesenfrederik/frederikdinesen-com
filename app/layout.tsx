import type { Metadata } from 'next';
import '../src/input.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://frederikdinesen.com'),
  title: {
    template: '%s | FD Sound Labs',
    default: 'FD Sound Labs | Rock & Metal Mixing & Audio Blog',
  },
  description:
    'Professionel remote mixing og tracking til rock og metal. Læs guides, indspilningstips og mixing-hemmeligheder.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF9F0A'><path d='M12 3v18M8 6v12M4 9v6M16 6v12M20 9v6' stroke='%23FF9F0A' stroke-width='2.5' stroke-linecap='round'/></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da" className="scroll-smooth">
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
