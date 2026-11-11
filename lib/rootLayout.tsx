import React from 'react';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Same tracking as the static homepages (index.html / en/index.html), so blog and landing
// pages show up in GA4, Ahrefs and Vercel Analytics, and test-mix form leads (generate_lead) are counted.
const GA_ID = 'G-3X6GTKVN5Y';

export const FAVICON =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF9F0A'><path d='M12 3v18M8 6v12M4 9v6M16 6v12M20 9v6' stroke='%23FF9F0A' stroke-width='2.5' stroke-linecap='round'/></svg>";

/** Shared <html> shell for the Danish and English root layouts; only the lang attribute differs. */
export function RootShell({ lang, children }: { lang: 'da' | 'en'; children: React.ReactNode }) {
  return (
    <html lang={lang} className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased selection:bg-amber selection:text-obsidian bg-black text-zinc-100 min-h-screen flex flex-col">
        {children}
        <Script src="https://analytics.ahrefs.com/analytics.js" data-key="hDrMwZG4/TXGCW9D8oYL/A" strategy="afterInteractive" />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
