import React from 'react';
import type { TOCItem } from '@/lib/blog';

interface TableOfContentsProps {
  toc: TOCItem[];
  lang: 'da' | 'en';
}

export default function TableOfContents({ toc, lang }: TableOfContentsProps) {
  if (!toc || toc.length === 0) return null;

  const isDa = lang === 'da';
  const label = isDa ? 'INDHOLD I DENNE GUIDE' : 'IN THIS GUIDE';

  return (
    <nav
      className="my-10 bg-[#0E0E14] border border-[#222228] hover:border-[#2f2f38] transition-colors rounded-xl p-6 shadow-xl shadow-black/60 relative overflow-hidden"
      aria-label={label}
    >
      {/* Subtle amber line accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber via-amber/40 to-transparent" />

      <div className="flex items-center gap-2 font-mono text-xs font-semibold text-amber tracking-widest uppercase mb-4">
        <svg className="w-4 h-4 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        <span>{label}</span>
      </div>

      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
        {toc.map((item, idx) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="group flex items-start gap-2.5 text-zinc-300 hover:text-amber transition-colors py-0.5 leading-snug"
            >
              <span className="font-mono text-xs text-amber/70 group-hover:text-amber shrink-0 pt-0.5">
                {String(idx + 1).padStart(2, '0')}.
              </span>
              <span className="font-medium group-hover:underline underline-offset-4 line-clamp-1">
                {item.text}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

