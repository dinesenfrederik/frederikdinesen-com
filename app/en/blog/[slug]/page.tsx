import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllBlogSlugs, getBlogPostBySlug } from '@/lib/blog';
import BlogNavbar from '@/components/blog/BlogNavbar';
import BlogFooter from '@/components/blog/BlogFooter';
import TestMixCTA from '@/components/blog/TestMixCTA';
import ReadingProgressBar from '@/components/blog/ReadingProgressBar';
import ArticleAmbience from '@/components/blog/ArticleAmbience';
import AudioSpectrumIndicator from '@/components/blog/AudioSpectrumIndicator';
import TableOfContents from '@/components/blog/TableOfContents';
import { TestMixModalProvider } from '@/components/blog/TestMixModalContext';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs('en');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug, 'en');

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  const daSlug = post.alternateSlug || slug;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `https://frederikdinesen.com/en/blog/${slug}`,
      languages: {
        da: `https://frederikdinesen.com/blog/${daSlug}`,
        en: `https://frederikdinesen.com/en/blog/${slug}`,
        'x-default': `https://frederikdinesen.com/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: `${post.title} | FD Sound Labs`,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `https://frederikdinesen.com/en/blog/${slug}`,
      images: [
        {
          url: 'https://frederikdinesen.com/assets/og-image.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function EnglishBlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug, 'en');

  if (!post) {
    notFound();
  }

  // Schema.org Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.description,
    image: 'https://frederikdinesen.com/assets/og-image.jpg',
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://frederikdinesen.com/',
    },
    publisher: {
      '@type': 'MusicStudio',
      name: 'FD Sound Labs',
      url: 'https://frederikdinesen.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://frederikdinesen.com/assets/og-image.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://frederikdinesen.com/en/blog/${slug}`,
    },
    articleSection: post.pillar,
  };

  // Schema.org FAQPage structured data
  const faqSchema =
    post.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <TestMixModalProvider lang="en">
      {/* Scroll Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Structured Data injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <BlogNavbar
        lang="en"
        currentSlug={post.slug}
        alternateSlug={post.alternateSlug}
      />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Ambient Canvas Particles & Lighting Glow */}
        <ArticleAmbience />

        <article className="max-w-4xl mx-auto relative z-10">
          {/* Breadcrumbs Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-8 overflow-x-auto">
            <Link href="/en/" className="hover:text-amber transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/en/blog" className="hover:text-amber transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-zinc-400 truncate">{post.pillar}</span>
          </nav>

          {/* Article Header */}
          <header className="mb-10 border-b border-[#222228] pb-10">
            {/* Meta Tags Row */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400 mb-6">
              <span className="bg-amber/10 border border-amber/20 text-amber font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                {post.pillar}
              </span>
              <span>&bull;</span>
              <span className="text-zinc-400">{post.date}</span>
              <span>&bull;</span>
              <span className="text-zinc-400">{post.readingTime}</span>
              <span>&bull;</span>
              <span className="text-zinc-300">By {post.author}</span>
              <span className="ml-auto hidden sm:inline-flex">
                <AudioSpectrumIndicator />
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight font-sans">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed font-sans max-w-3xl">
              {post.description}
            </p>
          </header>

          {/* Back to overview link */}
          <div className="mb-8">
            <Link
              href="/en/blog"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-amber transition-colors"
            >
              <span>&larr;</span> Back to all articles
            </Link>
          </div>

          {/* Table of Contents / Quick Jump */}
          {post.toc && post.toc.length > 0 && (
            <TableOfContents toc={post.toc} lang="en" />
          )}

          {/* High-Readability Editorial Markdown Body */}
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* FAQ Accordion / Section */}
          {post.faq.length > 0 && (
            <section className="mt-16 pt-12 border-t border-[#222228]">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber mb-3">
                <span className="w-2 h-2 rounded-full bg-amber" />
                <span>FAQ &bull; FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 font-sans">
                Questions &amp; Answers
              </h2>

              <div className="space-y-4">
                {post.faq.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0D0D11] border border-[#222228] hover:border-[#2f2f38] transition-colors rounded-xl p-6"
                  >
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-start gap-3">
                      <span className="text-amber font-mono font-bold">Q:</span>
                      <span>{item.question}</span>
                    </h3>
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed pl-7">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Test Mix CTA Component */}
          <TestMixCTA lang="en" />
        </article>
      </main>

      <BlogFooter lang="en" />
    </TestMixModalProvider>
  );
}
