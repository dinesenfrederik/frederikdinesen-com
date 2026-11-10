'use client';

import React from 'react';
import { useTestMixModal } from './TestMixModalContext';

interface TestMixCTAProps {
  lang?: 'da' | 'en';
}

export default function TestMixCTA({ lang = 'da' }: TestMixCTAProps) {
  const isDa = lang === 'da';
  const { openModal } = useTestMixModal();

  const title = isDa
    ? 'Vil du høre din sang mixet professionelt?'
    : 'Want to hear your track mixed professionally?';

  const subtitle = isDa
    ? 'Oplev hvad professionel mixing gør ved dine rå spor. Få et gratis og uforpligtende test-mix af din vigtigste sang – før du beslutter dig.'
    : 'Hear what professional mixing does to your raw multitracks. Claim a free, zero-obligation test mix of your main track before you decide.';

  const perks = isDa
    ? [
        {
          id: 'turnaround',
          title: '3-4 dages levering',
          desc: 'Hurtigt første udkast direkte i din indbakke.',
          svg: (
            <svg className="w-5 h-5 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
        },
        {
          id: 'pricing',
          title: 'Faste projektpriser',
          desc: 'Gennemskuelige priser inkl. 3 revisionsrunder.',
          svg: (
            <svg className="w-5 h-5 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          ),
        },
        {
          id: 'obligation',
          title: '100% uforpligtende',
          desc: 'Ingen risiko. Kun et bevis på lydens kvalitet.',
          svg: (
            <svg className="w-5 h-5 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          ),
        },
      ]
    : [
        {
          id: 'turnaround',
          title: '3-4 Day Turnaround',
          desc: 'Fast initial draft delivered straight to your inbox.',
          svg: (
            <svg className="w-5 h-5 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
        },
        {
          id: 'pricing',
          title: 'Flat Project Rates',
          desc: 'Transparent pricing including 3 revision rounds.',
          svg: (
            <svg className="w-5 h-5 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          ),
        },
        {
          id: 'obligation',
          title: 'Zero Obligation',
          desc: '100% risk-free proof of sound and production quality.',
          svg: (
            <svg className="w-5 h-5 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          ),
        },
      ];

  const ctaText = isDa ? 'Få dit gratis test-mix' : 'Claim Your Free Sample Mix';
  const microcopy = isDa
    ? 'Ingen betalingsoplysninger påkrævet. Send blot dine rå spor eller et demolink.'
    : 'No payment details required. Simply send your raw multitracks or a demo link.';

  const handleOpen = () => {
    openModal(isDa ? 'Gratis Test-Mix' : 'Free Sample Mix');
  };

  return (
    <section className="my-16 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[380px] bg-amber/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative bg-[#0D0D11] border border-[#222228] hover:border-amber/40 rounded-2xl p-8 sm:p-12 transition-all duration-300 shadow-[0_0_50px_-20px_rgba(255,159,10,0.15)] text-center">
        {/* Top studio badge */}
        <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber bg-amber/10 border border-amber/20 px-3.5 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
          {isDa ? 'FD Sound Labs • Test-Mix' : 'FD Sound Labs • Sample Mix'}
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 max-w-2xl mx-auto leading-tight font-sans">
          {title}
        </h3>

        <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
          {subtitle}
        </p>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto text-left">
          {perks.map((perk) => (
            <div
              key={perk.id}
              className="bg-[#16161A] border border-[#222228] hover:border-[#2f2f38] transition-colors rounded-xl p-5 flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-lg bg-amber/10 border border-amber/20 flex items-center justify-center mb-3">
                {perk.svg}
              </div>
              <div>
                <div className="font-semibold text-white text-sm mb-1 font-sans">{perk.title}</div>
                <div className="text-zinc-400 text-xs leading-normal">{perk.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button - Triggers In-Page Pop-up Modal */}
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={handleOpen}
            className="inline-flex items-center gap-2 bg-amber text-obsidian px-8 sm:px-10 py-4 rounded-full font-bold text-base hover:bg-amber-hover hover:scale-105 transition-all shadow-[0_0_25px_rgba(255,159,10,0.4)] uppercase tracking-wider font-sans cursor-pointer"
          >
            {ctaText}
            <span>&rarr;</span>
          </button>
          <p className="text-xs text-zinc-500 font-mono mt-4">{microcopy}</p>
        </div>
      </div>
    </section>
  );
}
