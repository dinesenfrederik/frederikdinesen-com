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
  title: 'Blog & Audio Guides | Rock & Metal Production',
  description:
    'Learn how to track, record, and prepare your heavy rock and metal songs for mixing. Professional advice, mic techniques, and studio knowledge from FD Sound Labs.',
  alternates: {
    canonical: 'https://frederikdinesen.com/en/blog',
    languages: {
      da: 'https://frederikdinesen.com/blog',
      en: 'https://frederikdinesen.com/en/blog',
      'x-default': 'https://frederikdinesen.com/en/blog',
    },
  },
  openGraph: {
    title: 'Blog & Audio Guides | Rock & Metal Production | FD Sound Labs',
    description:
      'Learn how to track, record, and prepare your heavy rock and metal songs for mixing. Studio tips from FD Sound Labs.',
    url: 'https://frederikdinesen.com/en/blog',
    type: 'website',
    images: [{ url: 'https://frederikdinesen.com/assets/og-image-en.jpg', width: 1200, height: 630 }],
  },
};

export default function EnglishBlogIndexPage() {
  const posts = getBlogPosts('en');

  return (
    <TestMixModalProvider lang="en">
      <BlogNavbar lang="en" />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Ambient Canvas Particles & Lighting Glow */}
        <ArticleAmbience />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header Hero */}
          <header className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber bg-amber/10 border border-amber/20 px-3.5 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              STUDIO INSIGHTS &amp; PRODUCTION GUIDES
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight font-sans">
              Rock &amp; Metal Production: Guides, Tips &amp; Techniques
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              Actionable engineering advice on DIY tracking, gain staging, and delivering pristine multitracks so your heavy music cuts through the wall of sound on streaming platforms.
            </p>
          </header>

          {/* Interactive Pillars Filter & Articles Grid */}
          <BlogPostsFilter posts={posts} lang="en" />

          {/* In-page CTA */}
          <TestMixCTA lang="en" />
        </div>
      </main>

      <BlogFooter lang="en" />
    </TestMixModalProvider>
  );
}
