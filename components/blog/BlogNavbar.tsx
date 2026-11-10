'use client';

import React, { useState } from 'react';

interface BlogNavbarProps {
  lang: 'da' | 'en';
  currentSlug?: string;
  alternateSlug?: string;
}

export default function BlogNavbar({ lang, currentSlug, alternateSlug }: BlogNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDa = lang === 'da';

  // Compute language switch URLs
  const daUrl = currentSlug
    ? `/blog/${isDa ? currentSlug : alternateSlug || currentSlug}`
    : '/blog';
  const enUrl = currentSlug
    ? `/en/blog/${!isDa ? currentSlug : alternateSlug || currentSlug}`
    : '/en/blog';

  const homeUrl = isDa ? '/' : '/en/';
  const portfolioUrl = isDa ? '/#portfolio' : '/en/#portfolio';
  const pricingUrl = isDa ? '/#pricing' : '/en/#pricing';
  const contactUrl = isDa ? '/#contact' : '/en/#contact';
  const blogUrl = isDa ? '/blog' : '/en/blog';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0D0D11]/90 backdrop-blur-xl border-b border-[#222228] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href={homeUrl}
          className="font-bold tracking-widest text-white hover:text-amber transition-colors text-base sm:text-lg font-sans"
        >
          FD SOUND LABS
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <a href={portfolioUrl} className="hover:text-amber transition-colors text-zinc-300">
            {isDa ? 'Portefølje' : 'Portfolio'}
          </a>
          <a href={pricingUrl} className="hover:text-amber transition-colors text-zinc-300">
            {isDa ? 'Priser' : 'Pricing'}
          </a>
          <a href={blogUrl} className="text-amber font-semibold transition-colors">
            Blog
          </a>
          <a href={contactUrl} className="hover:text-amber transition-colors text-zinc-300">
            {isDa ? 'Kontakt' : 'Contact'}
          </a>
        </div>

        {/* Right CTA & Lang Switch */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 sm:gap-2 font-mono text-xs sm:text-sm font-medium bg-zinc-900 border border-[#222228] rounded-full px-2.5 sm:px-3 py-1">
            <a
              href={daUrl}
              className={`transition-colors ${isDa ? 'font-bold text-amber' : 'text-zinc-400 hover:text-white'}`}
            >
              DA
            </a>
            <span className="text-zinc-700">|</span>
            <a
              href={enUrl}
              className={`transition-colors ${!isDa ? 'font-bold text-amber' : 'text-zinc-400 hover:text-white'}`}
            >
              EN
            </a>
          </div>

          {/* Test Mix Button */}
          <a
            href={contactUrl}
            className="hidden md:inline-block bg-amber text-obsidian px-6 py-2.5 rounded-full font-bold text-sm hover:bg-amber-hover transition-colors shadow-[0_0_15px_rgba(255,159,10,0.3)]"
          >
            {isDa ? 'Få dit gratis test-mix' : 'Get Free Sample Mix'}
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-300 hover:text-amber p-1.5 focus:outline-none"
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-[#222228] px-6 py-6 space-y-4 text-center">
          <a
            href={homeUrl}
            className="block text-base font-semibold text-zinc-200 hover:text-amber py-2"
          >
            {isDa ? 'Forside' : 'Home'}
          </a>
          <a
            href={portfolioUrl}
            className="block text-base font-semibold text-zinc-200 hover:text-amber py-2"
          >
            {isDa ? 'Portefølje' : 'Portfolio'}
          </a>
          <a
            href={pricingUrl}
            className="block text-base font-semibold text-zinc-200 hover:text-amber py-2"
          >
            {isDa ? 'Priser' : 'Pricing'}
          </a>
          <a
            href={blogUrl}
            className="block text-base font-semibold text-amber py-2"
          >
            Blog
          </a>
          <a
            href={contactUrl}
            className="block text-base font-semibold text-zinc-200 hover:text-amber py-2"
          >
            {isDa ? 'Kontakt' : 'Contact'}
          </a>
          <div className="pt-2">
            <a
              href={contactUrl}
              className="inline-block w-full bg-amber text-obsidian py-3 rounded-full font-bold text-sm hover:bg-amber-hover transition-colors shadow-[0_0_15px_rgba(255,159,10,0.3)]"
            >
              {isDa ? 'Få dit gratis test-mix' : 'Get Free Sample Mix'}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

