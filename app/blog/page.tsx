import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import BlogNavbar from '@/components/blog/BlogNavbar';
import BlogFooter from '@/components/blog/BlogFooter';
import TestMixCTA from '@/components/blog/TestMixCTA';
import ArticleAmbience from '@/components/blog/ArticleAmbience';
import { TestMixModalProvider } from '@/components/blog/TestMixModalContext';

export const metadata: Metadata = {
  title: 'Blog & Audio Guides | Rock & Metal Produktion',
  description:
    'Lær at tracke, indspille og klargøre dine rock- og metal-sange til mix. Professionelle tips, mikrofonteknikker og studieviden fra FD Sound Labs.',
  alternates: {
    canonical: 'https://frederikdinesen.com/blog',
    languages: {
      da: 'https://frederikdinesen.com/blog',
      en: 'https://frederikdinesen.com/en/blog',
      'x-default': 'https://frederikdinesen.com/en/blog',
    },
  },
  openGraph: {
    title: 'Blog & Audio Guides | Rock & Metal Produktion | FD Sound Labs',
    description:
      'Lær at tracke, indspille og klargøre dine rock- og metal-sange til mix. Professionelle tips fra FD Sound Labs.',
    url: 'https://frederikdinesen.com/blog',
    type: 'website',
  },
};

export default function BlogIndexPage() {
  const posts = getBlogPosts('da');

  return (
    <TestMixModalProvider lang="da">
      <BlogNavbar lang="da" />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Ambient Canvas Particles & Lighting Glow */}
        <ArticleAmbience />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header Hero */}
          <header className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber bg-amber/10 border border-amber/20 px-3.5 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              VIDEN &amp; GUIDES FRA STUDIET
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight font-sans">
              Rock &amp; Metal Produktion: Guider, Tips &amp; Teknikker
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              Praktiske råd og håndgribelige teknikker til DIY-indspilning, gain staging og klargøring af multitracks, så dine produktioner skærer igennem på streamingtjenesterne.
            </p>
          </header>

          {/* Pillars List / Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 font-mono text-xs">
            <span className="bg-amber text-obsidian px-3.5 py-1.5 rounded-full font-bold">
              Alle artikler ({posts.length})
            </span>
            <span className="bg-zinc-900 border border-[#222228] text-zinc-300 px-3.5 py-1.5 rounded-full">
              DIY Indspilning &amp; Tracking
            </span>
            <span className="bg-zinc-900 border border-[#222228] text-zinc-300 px-3.5 py-1.5 rounded-full">
              Mixing &amp; Audio-tips
            </span>
            <span className="bg-zinc-900 border border-[#222228] text-zinc-300 px-3.5 py-1.5 rounded-full">
              Musikudgivelse &amp; Business
            </span>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-[#0D0D11] border border-[#222228] hover:border-amber/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              >
                <div>
                  {/* Pillar & Date */}
                  <div className="flex items-center justify-between text-xs font-mono mb-4 text-zinc-400">
                    <span className="text-amber font-semibold uppercase tracking-wider">
                      {post.pillar}
                    </span>
                    <span>{post.readingTime}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white group-hover:text-amber transition-colors mb-3 leading-snug font-sans">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#222228] flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-amber font-semibold group-hover:translate-x-1 transition-transform"
                  >
                    Læs guide <span>&rarr;</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* In-page CTA */}
          <TestMixCTA lang="da" />
        </div>
      </main>

      <BlogFooter lang="da" />
    </TestMixModalProvider>
  );
}
