import React from 'react';

export interface PreviewArticle {
  lang: 'da' | 'en';
  title: string;
  description: string;
  date: string;
  pillar: string;
  faq: { question: string; answer: string }[];
}

/**
 * Mirrors the markup and classes of app/(da)/blog/[slug]/page.tsx (header, body, FAQ), so what
 * Frederik reads here is what readers will see. Interactive extras (TOC, CTA box) are shown as placeholders.
 */
export default function ArticlePreview({ article, html }: { article: PreviewArticle; html: string }) {
  const da = article.lang === 'da';
  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-10 border-b border-[#222228] pb-10">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400 mb-6">
          <span className="bg-amber/10 border border-amber/20 text-amber font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            {article.pillar}
          </span>
          <span>&bull;</span>
          <span>{article.date}</span>
          <span>&bull;</span>
          <span className="text-zinc-300">{da ? 'Af' : 'By'} Frederik Dinesen</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight font-sans">
          {article.title}
        </h1>
        <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed font-sans max-w-3xl">{article.description}</p>
      </header>

      <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />

      {article.faq.length > 0 && (
        <section className="mt-16 pt-12 border-t border-[#222228]">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber mb-3">
            <span className="w-2 h-2 rounded-full bg-amber" />
            <span>{da ? 'FAQ • OFTE STILLEDE SPØRGSMÅL' : 'FAQ • FREQUENTLY ASKED QUESTIONS'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 font-sans">
            {da ? 'Spørgsmål & Svar om artiklen' : 'Questions & Answers'}
          </h2>
          <div className="space-y-4">
            {article.faq.map((item, idx) => (
              <div key={idx} className="bg-[#0D0D11] border border-[#222228] rounded-xl p-6">
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-start gap-3">
                  <span className="text-amber font-mono font-bold">Q:</span>
                  <span>{item.question}</span>
                </h3>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed pl-7">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-16 rounded-2xl border border-dashed border-amber/30 p-6 text-center text-sm font-mono text-zinc-500">
        {da ? '[ Test-mix-boksen vises her automatisk på siden ]' : '[ The test-mix box appears here automatically ]'}
      </div>
    </article>
  );
}
