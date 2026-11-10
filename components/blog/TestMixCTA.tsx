import React from 'react';

interface TestMixCTAProps {
  lang?: 'da' | 'en';
}

export default function TestMixCTA({ lang = 'da' }: TestMixCTAProps) {
  const isDa = lang === 'da';

  const title = isDa
    ? 'Klar til at høre dit track med kompromisløs rock- og metal-power?'
    : 'Ready to hear your track with uncompromising rock and metal power?';

  const subtitle = isDa
    ? 'Oplev hvad professionel hybrid-mixing gør ved dine rå spor. Få et gratis og uforpligtende test-mix af jeres vigtigste sang – før I beslutter jer.'
    : 'Hear what professional hybrid mixing does to your raw multitracks. Claim a free, zero-obligation test mix of your main track before committing.';

  const perks = isDa
    ? [
        {
          icon: '⚡',
          title: '3-4 dages levering',
          desc: 'Hurtigt første udkast direkte i din indbakke.',
        },
        {
          icon: '💎',
          title: 'Faste projektpriser',
          desc: 'Gennemskuelige priser inkl. 3 revisionsrunder.',
        },
        {
          icon: '🛡️',
          title: '100% uforpligtende',
          desc: 'Ingen risiko. Kun et bevis på lydens kvalitet.',
        },
      ]
    : [
        {
          icon: '⚡',
          title: '3-4 Day Turnaround',
          desc: 'Fast initial draft delivered straight to your inbox.',
        },
        {
          icon: '💎',
          title: 'Flat Project Rates',
          desc: 'Transparent pricing including 3 revision rounds.',
        },
        {
          icon: '🛡️',
          title: 'Zero Obligation',
          desc: '100% risk-free proof of sound and production quality.',
        },
      ];

  const ctaText = isDa ? 'Få dit gratis test-mix' : 'Claim Your Free Sample Mix';
  const ctaLink = isDa ? '/#contact' : '/en/#contact';
  const microcopy = isDa
    ? 'Ingen betalingsoplysninger påkrævet. Send blot et demo- eller multitrack-link.'
    : 'No payment details required. Simply send a demo or multitrack link.';

  return (
    <section className="my-16 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-amber/10 rounded-full blur-[100px] pointer-events-none" />

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
          {perks.map((perk, index) => (
            <div
              key={index}
              className="bg-[#16161A] border border-[#222228] rounded-xl p-4 flex flex-col justify-between"
            >
              <div className="text-2xl mb-2">{perk.icon}</div>
              <div className="font-semibold text-white text-sm mb-1 font-sans">{perk.title}</div>
              <div className="text-zinc-400 text-xs leading-normal">{perk.desc}</div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center">
          <a
            href={ctaLink}
            className="inline-flex items-center gap-2 bg-amber text-obsidian px-8 sm:px-10 py-4 rounded-full font-bold text-base hover:bg-amber-hover hover:scale-105 transition-all shadow-[0_0_25px_rgba(255,159,10,0.4)] uppercase tracking-wider font-sans"
          >
            {ctaText}
            <span>&rarr;</span>
          </a>
          <p className="text-xs text-zinc-500 font-mono mt-4">{microcopy}</p>
        </div>
      </div>
    </section>
  );
}
