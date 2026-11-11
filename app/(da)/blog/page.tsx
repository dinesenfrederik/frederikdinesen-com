import React from 'react';
import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/blog';
import BlogNavbar from '@/components/blog/BlogNavbar';
import BlogFooter from '@/components/blog/BlogFooter';
import BlogPostsFilter from '@/components/blog/BlogPostsFilter';
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
    images: [{ url: 'https://frederikdinesen.com/assets/og-image.jpg', width: 1200, height: 630 }],
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

          {/* Interactive Pillars Filter & Articles Grid */}
          <BlogPostsFilter posts={posts} lang="da" />

          {/* In-page CTA */}
          <TestMixCTA lang="da" />
        </div>
      </main>

      <BlogFooter lang="da" />
    </TestMixModalProvider>
  );
}
