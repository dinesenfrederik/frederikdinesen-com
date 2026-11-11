import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import BlogNavbar from '@/components/blog/BlogNavbar';
import BlogFooter from '@/components/blog/BlogFooter';
import ArticleAmbience from '@/components/blog/ArticleAmbience';
import { TestMixModalProvider } from '@/components/blog/TestMixModalContext';
import OpenTestMixButton from '@/components/landing/OpenTestMixButton';

const BASE = 'https://frederikdinesen.com';
const URL = `${BASE}/en/remote-mixing`;
const DA_URL = `${BASE}/remote-mixing`;
const TITLE = 'Remote Mixing for Rock & Metal Bands – from €295';
const DESCRIPTION =
  'Get your rock or metal song mixed online by a Danish mix engineer. From €295 per song, first draft in 3-4 working days, 3 revisions and a free test mix.';

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | FD Sound Labs` },
  description: DESCRIPTION,
  alternates: {
    canonical: URL,
    languages: { da: DA_URL, en: URL, 'x-default': URL },
  },
  openGraph: {
    title: `${TITLE} | FD Sound Labs`,
    description: DESCRIPTION,
    url: URL,
    type: 'website',
    locale: 'en_GB',
    siteName: 'FD Sound Labs',
    images: [{ url: `${BASE}/assets/og-image-en.jpg`, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

const STEPS = [
  {
    title: 'Send your tracks or a demo link',
    text: 'Tell me about the song and send a link to your multitracks or a demo, plus a reference track. I mix a free test mix of a section (usually verse and chorus), so you can hear whether the sound is right.',
  },
  {
    title: 'We agree on price and plan',
    text: 'You get a fixed project price up front: €335 per song for 1-2 songs or €295 per song for 3 or more. Payment is split 50/50, with a deposit at the start.',
  },
  {
    title: 'First mix draft in 3-4 working days',
    text: 'I edit, clean up and mix. Drums, guitars, bass and vocals get the weight and clarity the song needs. The first draft lands in your inbox within 3-4 working days.',
  },
  {
    title: 'Up to 3 revision rounds',
    text: 'Collect feedback from the whole band and send it in one go. Every project includes 3 consolidated revision rounds within a 14-day feedback window.',
  },
  {
    title: 'Approval and delivery',
    text: 'Once the mix is approved, you pay the rest and receive the final mix as WAV, ready for your mastering engineer. By agreement, I can also deliver a loud master for listening and testing.',
  },
];

const INCLUDED = [
  'A full mix of the whole song, tailored to rock and metal',
  'Editing and clean-up of vocals, drums and other instruments',
  'Drum sample blending, also for programmed drums (Superior Drummer, GetGood Drums, MIDI)',
  'Re-amping of guitar and bass from your DI tracks when needed',
  '3 consolidated revision rounds',
  'A free test mix before you decide',
];

const NOT_INCLUDED = [
  'Mastering. I’m a mix engineer and recommend a dedicated mastering engineer for the final master (a loud master can be delivered by agreement)',
  'Recording. If you need to track vocals, guitar, bass or synths in person, studio tracking is available in Aarhus, Denmark',
];

const PREP = [
  'Export every track as 24-bit WAV at 44.1 kHz or higher.',
  'Make all tracks start at exactly the same point (00:00:00), including those with silence at the start.',
  'Include the tempo (BPM) and any tempo changes.',
  'Include clean DI tracks of guitar and bass, so I can re-amp if needed.',
  'Programmed drums: send both the multi-out audio tracks and the MIDI if you can.',
  'Name the tracks clearly (e.g. "Kick In", "Gtr L DI", "Lead Vox") and bypass effects unless they are part of the sound.',
  'Add 1-2 reference tracks that sound like what you are aiming for.',
];

const FAQ = [
  {
    q: 'How much does it cost to get a song mixed?',
    a: 'A Full Production Mix costs €335 per song for 1-2 songs. For 3 or more songs it is €295 per song, so a 5-song EP costs €1,475 and a 10-song album costs €2,950. Prices are fixed, include 25% Danish VAT and include 3 revision rounds. VAT-registered businesses in the EU outside Denmark are invoiced without Danish VAT under the reverse-charge rules.',
  },
  {
    q: 'What is remote mixing?',
    a: 'Remote mixing means you send your recorded tracks (multitracks) digitally and the mix is done in my studio, without you having to be there. You receive drafts, give feedback online and get the final mix as a WAV file.',
  },
  {
    q: 'How long does a mix take?',
    a: 'The first mix draft is delivered within 3-4 working days after I have received all the tracks. The total time depends on how quickly you send feedback during the 3 revision rounds.',
  },
  {
    q: 'Is mastering included?',
    a: 'No. I’m a mix engineer and recommend having the final master done by a dedicated mastering engineer, so your release gets a fresh set of ears. By agreement, I can deliver a loud master of the mix for listening, sharing and testing the songs.',
  },
  {
    q: 'Can you mix programmed drums?',
    a: 'Yes. A lot of modern rock and metal is produced with programmed drums. Send multi-out audio tracks or MIDI from e.g. Superior Drummer or GetGood Drums, and I will process and blend the drums so they hit with punch and weight.',
  },
  {
    q: 'How does the free test mix work?',
    a: 'You send your raw multitracks and a reference track. I mix a representative section of the song, usually verse and chorus, completely free, so you can judge the sound and our fit before you decide.',
  },
  {
    q: 'How do I send my files?',
    a: 'Upload the tracks as one folder to e.g. Google Drive, Dropbox or WeTransfer, and send the link through the form. Remember 24-bit WAV, the same start point for every track and the tempo.',
  },
  {
    q: 'Do you work with bands outside Denmark?',
    a: 'Yes. Because everything happens online, I mix for bands across Denmark and the rest of Europe. Communication is in English or Danish.',
  },
];

const GENRES = ['Metalcore', 'Hardcore', 'Death metal', 'Alternative metal', 'Modern rock', 'Hard rock'];

const CREDITS = [
  ['Rise Upon', 'production, recording & mix'],
  ['Valdemar Dvinge', 'production, recording & mix'],
  ['Black Boned Lucy', 'mixing engineer'],
  ['Æteren', 'mixing engineer'],
];

function structuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${URL}#webpage`,
        url: URL,
        name: `${TITLE} | FD Sound Labs`,
        description: DESCRIPTION,
        inLanguage: 'en',
        isPartOf: { '@id': `${BASE}/#website` },
        about: { '@id': `${URL}#service` },
        breadcrumb: { '@id': `${URL}#breadcrumb` },
      },
      {
        '@type': 'Service',
        '@id': `${URL}#service`,
        name: 'Remote mixing for rock and metal',
        serviceType: 'Music mixing',
        description: DESCRIPTION,
        url: URL,
        provider: { '@id': `${BASE}/#studio` },
        areaServed: [
          { '@type': 'Continent', name: 'Europe' },
          { '@type': 'Country', name: 'Denmark' },
        ],
        audience: { '@type': 'Audience', audienceType: 'Rock and metal bands, artists and songwriters' },
        offers: [
          {
            '@type': 'Offer',
            name: 'Mix of 1-2 songs',
            price: '335',
            priceCurrency: 'EUR',
            url: `${URL}#pricing`,
            priceSpecification: { '@type': 'UnitPriceSpecification', price: '335', priceCurrency: 'EUR', valueAddedTaxIncluded: true, unitText: 'song' },
          },
          {
            '@type': 'Offer',
            name: 'Mix of 3 or more songs (EP/album)',
            price: '295',
            priceCurrency: 'EUR',
            url: `${URL}#pricing`,
            priceSpecification: { '@type': 'UnitPriceSpecification', price: '295', priceCurrency: 'EUR', valueAddedTaxIncluded: true, unitText: 'song' },
          },
          { '@type': 'Offer', name: 'Free test mix', price: '0', priceCurrency: 'EUR', url: `${URL}#test-mix` },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': `${URL}#process`,
        name: 'How remote mixing works at FD Sound Labs',
        step: STEPS.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.text })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${URL}#faq`,
        mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/en` },
          { '@type': 'ListItem', position: 2, name: 'Remote mixing', item: URL },
        ],
      },
    ],
  };
}

const card = 'bg-[#0D0D11] border border-[#222228] rounded-2xl';
const pill =
  'inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-amber bg-amber/10 border border-amber/20 px-3.5 py-1.5 rounded-full mb-6';
const ctaPrimary =
  'inline-flex items-center gap-2 bg-amber text-obsidian px-8 py-4 rounded-full font-bold text-base hover:bg-amber-hover hover:scale-105 transition-all shadow-[0_0_25px_rgba(255,159,10,0.4)] uppercase tracking-wider cursor-pointer';

export default function RemoteMixingEnPage() {
  return (
    <TestMixModalProvider lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }} />
      <BlogNavbar lang="en" blogActive={false} languageUrls={{ da: '/remote-mixing', en: '/en/remote-mixing' }} />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
        <ArticleAmbience />

        <div className="max-w-5xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-10" aria-label="Breadcrumb">
            <Link href="/en" className="hover:text-amber transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-400">Remote mixing</span>
          </nav>

          <header className="max-w-3xl mb-20">
            <div className={pill}>
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              Remote mixing &bull; Rock &amp; metal
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              Remote mixing for rock and metal bands – get your song mixed online
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed mb-8">
              You send your tracks, and I mix them in my studio in Aarhus, Denmark, into a punchy, album-ready mix.
              Fixed price from <strong className="text-white">€295 per song</strong>, first draft in{' '}
              <strong className="text-white">3-4 working days</strong>, 3 revision rounds and a{' '}
              <strong className="text-white">free test mix</strong> before you decide.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <OpenTestMixButton service="Free Sample Mix" className={ctaPrimary}>
                Get your free test mix <span>&rarr;</span>
              </OpenTestMixButton>
              <a href="#pricing" className="font-mono text-sm text-zinc-300 hover:text-amber transition-colors">
                See pricing &darr;
              </a>
            </div>
          </header>

          <section className="grid md:grid-cols-2 gap-10 mb-24" aria-labelledby="what-is">
            <div>
              <h2 id="what-is" className="text-3xl font-bold text-white mb-4">What is remote mixing?</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  Remote mixing means your band records the songs – in the rehearsal room, a home studio or another
                  studio – and sends the raw tracks (multitracks) digitally to a mix engineer. The mix is done without
                  you having to be there, and all feedback happens online.
                </p>
              </div>
            </div>
            <div className={`${card} p-8`}>
              <h3 className="text-lg font-bold text-white mb-5">Who is it for?</h3>
              <ul className="space-y-3 text-zinc-300">
                <li>&rsaquo; Bands and artists who record themselves and want a release-ready sound</li>
                <li>&rsaquo; DIY producers working with programmed drums and amp sims</li>
                <li>&rsaquo; Bands releasing a single, EP or album on Spotify and other platforms</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-6">
                {GENRES.map((g) => (
                  <span key={g} className="font-mono text-xs bg-zinc-900 border border-[#222228] text-zinc-300 px-3 py-1 rounded-full">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-24" aria-labelledby="process">
            <h2 id="process" className="text-3xl md:text-4xl font-bold text-white mb-3">How it works – 5 steps</h2>
            <p className="text-zinc-300 mb-10 max-w-2xl">From raw tracks to finished mix. No hourly rates and no surprises.</p>
            <ol className="grid md:grid-cols-2 gap-6">
              {STEPS.map((s, i) => (
                <li key={s.title} className={`${card} p-7`}>
                  <div className="font-mono text-amber text-sm font-bold mb-3">STEP {i + 1}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-zinc-300 leading-relaxed text-[15px]">{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="pricing" className="mb-24 scroll-mt-28" aria-labelledby="pricing-h">
            <h2 id="pricing-h" className="text-3xl md:text-4xl font-bold text-white mb-3">How much does it cost to get a song mixed?</h2>
            <p className="text-zinc-300 mb-10 max-w-2xl">
              Fixed project prices including 25% Danish VAT. You know the price before we start. Want to know what
              drives the price? Read{' '}
              <Link href="/en/blog/how-much-does-mixing-cost" className="text-amber hover:underline">How much does mixing a song cost?</Link>
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                ['Single (1-2 songs)', '€335', 'per song'],
                ['EP / album (3+ songs)', '€295', 'per song'],
                ['Test mix', '€0', 'section of one song'],
              ].map(([name, price, unit]) => (
                <div key={name} className={`${card} p-7`}>
                  <div className="text-zinc-300 font-semibold mb-3">{name}</div>
                  <div className="text-4xl font-bold text-amber tracking-tight">{price}</div>
                  <div className="font-mono text-xs text-zinc-400 mt-1">{unit}</div>
                </div>
              ))}
            </div>
            <div className={`${card} p-7 overflow-x-auto`}>
              <table className="w-full text-left text-[15px]">
                <caption className="text-left text-white font-bold mb-4">Example totals</caption>
                <thead>
                  <tr className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                    <th className="pb-3 pr-4 font-medium">Project</th>
                    <th className="pb-3 pr-4 font-medium">Price per song</th>
                    <th className="pb-3 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-200">
                  {[
                    ['Single, 1 song', '€335', '€335'],
                    ['Double single, 2 songs', '€335', '€670'],
                    ['EP, 5 songs', '€295', '€1,475'],
                    ['Album, 10 songs', '€295', '€2,950'],
                  ].map((r) => (
                    <tr key={r[0]} className="border-t border-[#222228]">
                      <td className="py-3 pr-4">{r[0]}</td>
                      <td className="py-3 pr-4">{r[1]}</td>
                      <td className="py-3 font-semibold text-white">{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-zinc-400 text-sm mt-4">
                EUR prices are guide prices based on the DKK prices. VAT-registered businesses in the EU outside Denmark
                are invoiced without Danish VAT (reverse charge).
              </p>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-6 mb-24" aria-labelledby="included">
            <div className={`${card} p-8`}>
              <h2 id="included" className="text-2xl font-bold text-white mb-5">What’s included</h2>
              <ul className="space-y-3 text-zinc-300">
                {INCLUDED.map((x) => (
                  <li key={x} className="flex gap-3"><span className="text-amber font-bold">✓</span><span>{x}</span></li>
                ))}
              </ul>
            </div>
            <div className={`${card} p-8`}>
              <h2 className="text-2xl font-bold text-white mb-5">What’s not included</h2>
              <ul className="space-y-3 text-zinc-300">
                {NOT_INCLUDED.map((x) => (
                  <li key={x} className="flex gap-3"><span className="text-zinc-500 font-bold">–</span><span>{x}</span></li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mb-24" aria-labelledby="prep">
            <h2 id="prep" className="text-3xl md:text-4xl font-bold text-white mb-3">How to prepare your tracks for mixing</h2>
            <p className="text-zinc-300 mb-8 max-w-2xl">
              Well-prepared tracks mean a better mix and faster delivery. Use this checklist before you send.
            </p>
            <ol className={`${card} p-8 space-y-4 list-decimal list-inside text-zinc-200 marker:text-amber marker:font-bold`}>
              {PREP.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ol>
            <p className="text-zinc-400 text-sm mt-4">
              Recording vocals yourself? Read{' '}
              <Link href="/en/blog/home-studio-vocal-tracking" className="text-amber hover:underline">
                Home studio vocal tracking: 7 steps
              </Link>
              . Struggling with the low end? See{' '}
              <Link href="/en/blog/fix-muddy-low-end-metal-mix" className="text-amber hover:underline">
                Muddy low end in your metal mix
              </Link>
              .
            </p>
          </section>

          <section className="grid md:grid-cols-5 gap-10 mb-24" aria-labelledby="why">
            <div className="md:col-span-3">
              <h2 id="why" className="text-3xl md:text-4xl font-bold text-white mb-5">Why mix with FD Sound Labs?</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  I’m Frederik Dinesen, and I’ve been recording and mixing rock and metal for about 9 years. As drummer
                  and songwriter in the Danish metalcore band Rise Upon, I produced, recorded and mixed the album{' '}
                  <em>The Dimming Effect</em> (2024), which was nominated for a GAFFA Award in the Danish hard
                  rock/metal category.
                </p>
                <p>
                  I specialise in rock and metal, so you get a mix engineer who knows the sound: tight drums, heavy
                  guitars and vocals that cut through. Prices are fixed and public, and you hear the result in a free
                  test mix before you pay anything.
                </p>
                <p>
                  <Link href="/en#portfolio" className="text-amber hover:underline">Listen to before/after examples</Link>
                  {' '}or{' '}
                  <Link href="/en#about" className="text-amber hover:underline">read more about me</Link>.
                </p>
              </div>
            </div>
            <aside className={`${card} md:col-span-2 p-8`}>
              <h3 className="text-lg font-bold text-white mb-5">Selected credits</h3>
              <ul className="space-y-2 text-[15px]">
                {CREDITS.map(([b, r]) => (
                  <li key={b}>
                    <span className="font-semibold text-white">{b}</span>
                    <span className="text-zinc-400"> – {r}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </section>

          <section className="mb-24" aria-labelledby="faq-h">
            <h2 id="faq-h" className="text-3xl md:text-4xl font-bold text-white mb-8">Remote mixing FAQ</h2>
            <div className="space-y-4">
              {FAQ.map((f) => (
                <details key={f.q} className={`${card} group p-6 cursor-pointer hover:border-amber/40 transition-colors`}>
                  <summary className="flex justify-between items-center gap-4 text-lg font-bold text-white list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-lg font-bold">{f.q}</h3>
                    <span className="text-amber transition-transform duration-300 group-open:rotate-180">↓</span>
                  </summary>
                  <p className="mt-4 text-zinc-300 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="test-mix" className={`${card} p-10 sm:p-14 text-center scroll-mt-28`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Hear your song mixed – for free</h2>
            <p className="text-zinc-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Send a link to your tracks or a demo. I’ll get back to you within 24 hours, and you get a free test mix
              of a section of the song. No strings attached.
            </p>
            <OpenTestMixButton service="Free Sample Mix" className={ctaPrimary}>
              Get your free test mix <span>&rarr;</span>
            </OpenTestMixButton>
          </section>
        </div>
      </main>

      <BlogFooter lang="en" />
    </TestMixModalProvider>
  );
}
