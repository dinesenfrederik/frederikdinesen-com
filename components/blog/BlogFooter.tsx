import React from 'react';

interface BlogFooterProps {
  lang: 'da' | 'en';
}

export default function BlogFooter({ lang }: BlogFooterProps) {
  const isDa = lang === 'da';

  return (
    <footer className="py-12 border-t border-[#222228] bg-black text-sm text-zinc-400 font-mono mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div>
          <div className="text-amber font-bold text-base font-sans tracking-widest mb-1">
            FD SOUND LABS
          </div>
          <p className="text-xs text-zinc-400">
            {isDa
              ? 'Ceresbyen 10E, st. • 8000 Aarhus C, Danmark • Tlf: +45 30 13 89 75'
              : 'Ceresbyen 10E, ground floor • 8000 Aarhus C, Denmark • Phone: +45 30 13 89 75'}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm">
          {isDa && (
            <>
              <a href="/remote-mixing" className="text-zinc-300 hover:text-amber transition-colors">
                Remote mixing
              </a>
              <span className="text-zinc-700">&bull;</span>
            </>
          )}
          <a
            href={isDa ? '/blog' : '/en/blog'}
            className="text-zinc-300 hover:text-amber transition-colors"
          >
            Blog
          </a>
          <span className="text-zinc-700">&bull;</span>
          <a
            href="/terms.html"
            className="hover:text-amber transition-colors"
          >
            {isDa ? 'Handelsbetingelser' : 'Terms of Service'}
          </a>
          <span className="text-zinc-700">&bull;</span>
          <span>
            {isDa
              ? '© 2026 FD SOUND LABS. Aarhus, Danmark.'
              : '© 2026 FD SOUND LABS. Aarhus, Denmark.'}
          </span>
        </div>
      </div>
    </footer>
  );
}

