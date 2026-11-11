'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/blog';

interface BlogPostsFilterProps {
  posts: BlogPostMeta[];
  lang: 'da' | 'en';
}

const CANONICAL_PILLARS: Record<'da' | 'en', string[]> = {
  da: [
    'DIY Indspilning & Tracking',
    'Mixing & Audio-tips',
    'Musikudgivelse & Business',
  ],
  en: [
    'DIY Recording & Tracking',
    'Mixing & Audio Tips',
    'Music Release & Business',
  ],
};

function normalizePillar(value: string): string {
  return value.trim().toLowerCase();
}

/** Interactive topic filter bar with live counts and filtered article grid. */
export default function BlogPostsFilter({ posts, lang }: BlogPostsFilterProps) {
  const isDa = lang === 'da';
  const blogBasePath = isDa ? '/blog' : '/en/blog';

  const categories = useMemo(() => {
    const ordered: string[] = [...CANONICAL_PILLARS[lang]];
    const seen = new Set(ordered.map(normalizePillar));

    for (const post of posts) {
      const normalized = normalizePillar(post.pillar);
      if (normalized && !seen.has(normalized)) {
        seen.add(normalized);
        ordered.push(post.pillar.trim());
      }
    }

    return ordered.map((label) => {
      const normalized = normalizePillar(label);
      const count = posts.filter((p) => normalizePillar(p.pillar) === normalized).length;
      return { label, normalized, count };
    });
  }, [posts, lang]);

  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramPillar = params.get('pillar') || params.get('tema') || params.get('topic');
    if (!paramPillar) return;

    const normalizedParam = normalizePillar(paramPillar);
    const match = categories.find((cat) => cat.normalized === normalizedParam);
    if (match) {
      setSelectedPillar(match.normalized);
    }
  }, [categories]);

  const selectPillar = (normalizedPillar: string | null, allowToggle = true) => {
    const nextValue =
      allowToggle && normalizedPillar !== null && selectedPillar === normalizedPillar
        ? null
        : normalizedPillar;

    setSelectedPillar(nextValue);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('tema');
      url.searchParams.delete('topic');
      if (nextValue === null) {
        url.searchParams.delete('pillar');
      } else {
        const matched = categories.find((cat) => cat.normalized === nextValue);
        url.searchParams.set('pillar', matched ? matched.label : nextValue);
      }
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  };

  const filteredPosts = useMemo(() => {
    if (!selectedPillar) return posts;
    return posts.filter((p) => normalizePillar(p.pillar) === selectedPillar);
  }, [posts, selectedPillar]);

  const activeCategory = categories.find((cat) => cat.normalized === selectedPillar);

  return (
    <>
      {/* Interactive Pillar Filter Bar */}
      <div
        role="group"
        aria-label={isDa ? 'Filtrer artikler efter emne' : 'Filter articles by topic'}
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 font-mono text-xs"
      >
        <button
          type="button"
          onClick={() => selectPillar(null, false)}
          aria-pressed={selectedPillar === null}
          className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber ${
            selectedPillar === null
              ? 'bg-amber border-amber text-obsidian font-bold shadow-[0_0_18px_rgba(255,159,10,0.28)]'
              : 'bg-zinc-900 border-[#222228] text-zinc-300 hover:border-amber/50 hover:text-white'
          }`}
        >
          {isDa ? 'Alle artikler' : 'All articles'} ({posts.length})
        </button>

        {categories.map((cat) => {
          const isActive = selectedPillar === cat.normalized;
          return (
            <button
              key={cat.normalized}
              type="button"
              onClick={() => selectPillar(cat.normalized, true)}
              aria-pressed={isActive}
              className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber ${
                isActive
                  ? 'bg-amber border-amber text-obsidian font-bold shadow-[0_0_18px_rgba(255,159,10,0.28)]'
                  : 'bg-zinc-900 border-[#222228] text-zinc-300 hover:border-amber/50 hover:text-white'
              }`}
            >
              {cat.label}{' '}
              <span className={isActive ? 'opacity-80' : 'text-zinc-400'}>
                ({cat.count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Articles Grid or Empty Filter State */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-[#0D0D11] border border-[#222228] hover:border-amber/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              <div>
                {/* Pillar & Reading Time */}
                <div className="flex items-center justify-between gap-2 text-xs font-mono mb-4 text-zinc-400">
                  <button
                    type="button"
                    onClick={() => selectPillar(normalizePillar(post.pillar), false)}
                    className="text-amber font-semibold uppercase tracking-wider text-left hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
                    title={isDa ? `Filtrer efter ${post.pillar}` : `Filter by ${post.pillar}`}
                  >
                    {post.pillar}
                  </button>
                  <span className="shrink-0">{post.readingTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-white group-hover:text-amber transition-colors mb-3 leading-snug font-sans">
                  <Link href={`${blogBasePath}/${post.slug}`}>{post.title}</Link>
                </h2>

                {/* Excerpt */}
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#222228] flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">{post.date}</span>
                <Link
                  href={`${blogBasePath}/${post.slug}`}
                  className="inline-flex items-center gap-1 text-amber font-semibold group-hover:translate-x-1 transition-transform"
                >
                  {isDa ? 'Læs guide' : 'Read guide'} <span>&rarr;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-[#0D0D11] border border-[#222228] rounded-2xl p-10 text-center mb-16">
          <p className="text-zinc-300 text-base mb-5">
            {isDa
              ? `Der er endnu ingen artikler under "${activeCategory?.label ?? selectedPillar}".`
              : `No articles published under "${activeCategory?.label ?? selectedPillar}" yet.`}
          </p>
          <button
            type="button"
            onClick={() => selectPillar(null, false)}
            className="bg-amber hover:bg-amber-hover text-obsidian font-mono text-xs font-bold px-5 py-2.5 rounded-full transition-colors cursor-pointer"
          >
            {isDa ? 'Vis alle artikler' : 'Show all articles'} ({posts.length})
          </button>
        </div>
      )}
    </>
  );
}

