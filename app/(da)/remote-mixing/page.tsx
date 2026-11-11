import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import BlogNavbar from '@/components/blog/BlogNavbar';
import BlogFooter from '@/components/blog/BlogFooter';
import ArticleAmbience from '@/components/blog/ArticleAmbience';
import { TestMixModalProvider } from '@/components/blog/TestMixModalContext';
import OpenTestMixButton from '@/components/landing/OpenTestMixButton';

const BASE = 'https://frederikdinesen.com';
const URL = `${BASE}/remote-mixing`;
const TITLE = 'Remote Mixing af Rock & Metal – fra 2.195 kr.';
const DESCRIPTION =
  'Få dit rock- eller metalnummer mixet online. Fast pris fra 2.195 kr. pr. sang, første udkast på 3-4 hverdage, 3 revisioner og et gratis test-mix.';

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | FD Sound Labs` },
  description: DESCRIPTION,
  alternates: {
    canonical: URL,
    languages: { da: URL, en: `${BASE}/en/remote-mixing`, 'x-default': `${BASE}/en/remote-mixing` },
  },
  openGraph: {
    title: `${TITLE} | FD Sound Labs`,
    description: DESCRIPTION,
    url: URL,
    type: 'website',
    locale: 'da_DK',
    siteName: 'FD Sound Labs',
    images: [{ url: `${BASE}/assets/og-image.jpg`, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

const STEPS = [
  {
    title: 'Send dine spor eller et demolink',
    text: 'Fortæl kort om nummeret, og send et link til dine multitracks eller en demo sammen med et reference-track. Så mixer jeg et gratis test-mix af et udsnit (typisk vers og omkvæd), så du kan høre, om lyden rammer.',
  },
  {
    title: 'Vi aftaler pris og plan',
    text: 'Du får en fast projektpris på forhånd: 2.499 kr. pr. sang for 1-2 sange eller 2.195 kr. pr. sang ved 3 eller flere. Arbejdet afregnes 50/50 med depositum ved opstart.',
  },
  {
    title: 'Første mixudkast på 3-4 hverdage',
    text: 'Jeg redigerer, rydder op og mixer. Trommer, guitarer, bas og vokal får den tyngde og klarhed, nummeret skal have. Første udkast lander i din indbakke inden for 3-4 hverdage.',
  },
  {
    title: 'Op til 3 revisionsrunder',
    text: 'I samler jeres feedback fra hele bandet og sender den samlet. Hvert projekt har 3 konsoliderede revisionsrunder inden for en 14-dages svarfrist.',
  },
  {
    title: 'Godkendelse og levering',
    text: 'Når mixet er godkendt, betaler du resten og får det færdige mix som WAV, klar til jeres mastering engineer. Efter aftale kan jeg også levere et loud master til at lytte og teste med.',
  },
];

const INCLUDED = [
  'Fuldt mix af hele nummeret, skræddersyet til rock og metal',
  'Redigering og oprydning af vokaler, trommer og andre instrumenter',
  'Tromme-sample blending, også på programmerede trommer (Superior Drummer, GetGood Drums, MIDI)',
  'Re-amping af guitar og bas fra dine DI-spor ved behov',
  '3 konsoliderede revisionsrunder',
  'Gratis test-mix før du beslutter dig',
];

const NOT_INCLUDED = [
  'Mastering. Jeg er mix engineer og anbefaler en dedikeret mastering engineer til den endelige master (et loud master kan leveres efter aftale)',
  'Indspilning. Har du brug for at indspille vokal, guitar, bas eller synths, kan du booke studio tracking i Aarhus til 3.125 kr. pr. dag',
];

const PREP = [
  'Eksportér alle spor som 24-bit WAV i 44.1 kHz eller højere.',
  'Lad alle spor starte på nøjagtigt samme tidspunkt (00:00:00), også dem med stilhed i starten.',
  'Send tempo (BPM) og eventuelle temposkift med.',
  'Medsend rene DI-spor af guitar og bas, så jeg kan re-ampe ved behov.',
  'Programmerede trommer: send gerne både multi-out lydspor og MIDI.',
  'Navngiv sporene tydeligt (fx "Kick In", "Gtr L DI", "Lead Vox"), og slå effekter fra, medmindre de er en del af lyden.',
  'Vedlæg 1-2 reference-tracks, der lyder som det, du drømmer om.',
];

const FAQ = [
  {
    q: 'Hvad koster det at få mixet en sang?',
    a: 'Et Full Production Mix koster 2.499 kr. pr. sang inkl. moms for 1-2 sange. Ved 3 eller flere sange koster det 2.195 kr. pr. sang, så en EP på 5 sange koster 10.975 kr., og et album på 10 sange koster 21.950 kr. Prisen er fast og inkluderer 3 revisionsrunder.',
  },
  {
    q: 'Hvad er remote mixing?',
    a: 'Remote mixing betyder, at du sender dine indspillede spor (multitracks) digitalt, og at mixet laves i mit studie uden at I behøver at møde op. Du får udkast tilsendt, giver feedback online og modtager det færdige mix som WAV-fil.',
  },
  {
    q: 'Hvor lang tid tager et mix?',
    a: 'Første mixudkast leveres inden for 3-4 hverdage, efter at jeg har modtaget alle spor. Den samlede tid afhænger af, hvor hurtigt I sender feedback i de 3 revisionsrunder.',
  },
  {
    q: 'Er mastering inkluderet?',
    a: 'Nej. Jeg er mix engineer og anbefaler, at den endelige master laves af en dedikeret mastering engineer, så jeres udgivelse får et ekstra sæt friske ører. Efter aftale kan jeg levere et loud master af mixet, som I kan bruge til at lytte, dele og teste sangene.',
  },
  {
    q: 'Kan du mixe programmerede trommer?',
    a: 'Ja. Meget moderne rock og metal produceres med programmerede trommer. Send multi-out lydspor eller MIDI fra fx Superior Drummer eller GetGood Drums, så behandler og blender jeg trommerne, så de får punch og tyngde.',
  },
  {
    q: 'Hvordan fungerer det gratis test-mix?',
    a: 'Du sender dine rå multitracks og et reference-track. Jeg mixer et repræsentativt udsnit af sangen, typisk vers og omkvæd, helt gratis, så du kan vurdere lyden og vores match, inden du beslutter dig.',
  },
  {
    q: 'Hvordan sender jeg mine filer?',
    a: 'Upload sporene som en samlet mappe til fx Google Drive, Dropbox eller WeTransfer, og send linket via formularen. Husk 24-bit WAV, samme startpunkt for alle spor og tempoet.',
  },
  {
    q: 'Mixer du kun for bands i Danmark?',
    a: 'Nej. Fordi alt foregår online, mixer jeg for bands i hele Danmark og resten af Europa. Priserne er de samme, og du kan se dem i euro på den engelske side.',
  },
];

const GENRES = ['Metalcore', 'Hardcore', 'Death metal', 'Alternative metal', 'Moderne rock', 'Hard rock'];

const CREDITS = [
  ['Rise Upon', 'produktion, indspilning & mix'],
  ['Valdemar Dvinge', 'produktion, indspilning & mix'],
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
        inLanguage: 'da-DK',
        isPartOf: { '@id': `${BASE}/#website` },
        about: { '@id': `${URL}#service` },
        breadcrumb: { '@id': `${URL}#breadcrumb` },
      },
      {
        '@type': 'Service',
        '@id': `${URL}#service`,
        name: 'Remote mixing af rock og metal',
        serviceType: 'Music mixing',
        description: DESCRIPTION,
        url: URL,
        provider: { '@id': `${BASE}/#studio` },
        areaServed: [
          { '@type': 'Country', name: 'Denmark' },
          { '@type': 'Continent', name: 'Europe' },
        ],
        audience: { '@type': 'Audience', audienceType: 'Rock- og metalbands, artister og sangskrivere' },
        offers: [
          {
            '@type': 'Offer',
            name: 'Mix af 1-2 sange',
            price: '2499',
            priceCurrency: 'DKK',
            url: `${URL}#priser`,
            priceSpecification: { '@type': 'UnitPriceSpecification', price: '2499', priceCurrency: 'DKK', valueAddedTaxIncluded: true, unitText: 'sang' },
          },
          {
            '@type': 'Offer',
            name: 'Mix af 3 eller flere sange (EP/album)',
            price: '2195',
            priceCurrency: 'DKK',
            url: `${URL}#priser`,
            priceSpecification: { '@type': 'UnitPriceSpecification', price: '2195', priceCurrency: 'DKK', valueAddedTaxIncluded: true, unitText: 'sang' },
          },
          {
            '@type': 'Offer',
            name: 'Gratis test-mix',
            price: '0',
            priceCurrency: 'DKK',
            url: `${URL}#test-mix`,
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': `${URL}#process`,
        name: 'Sådan foregår remote mixing hos FD Sound Labs',
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
          { '@type': 'ListItem', position: 1, name: 'Forside', item: `${BASE}/` },
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

export default function RemoteMixingPage() {
  return (
    <TestMixModalProvider lang="da">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }} />
      <BlogNavbar lang="da" blogActive={false} languageUrls={{ da: '/remote-mixing', en: '/en/remote-mixing' }} />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
        <ArticleAmbience />

        <div className="max-w-5xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-10" aria-label="Brødkrumme">
            <Link href="/" className="hover:text-amber transition-colors">Forside</Link>
            <span>/</span>
            <span className="text-zinc-400">Remote mixing</span>
          </nav>

          {/* Hero */}
          <header className="max-w-3xl mb-20">
            <div className={pill}>
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              Remote mixing &bull; Rock &amp; metal
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              Remote mixing af rock og metal – få dit nummer mixet online
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed mb-8">
              Du sender dine spor, og jeg mixer dem i mit studie i Aarhus til et slagkraftigt, albumklart mix. Fast
              pris fra <strong className="text-white">2.195 kr. pr. sang</strong>, første udkast på{' '}
              <strong className="text-white">3-4 hverdage</strong>, 3 revisionsrunder og et{' '}
              <strong className="text-white">gratis test-mix</strong>, før du beslutter dig.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <OpenTestMixButton className={ctaPrimary}>
                Få dit gratis test-mix <span>&rarr;</span>
              </OpenTestMixButton>
              <a href="#priser" className="font-mono text-sm text-zinc-300 hover:text-amber transition-colors">
                Se priser &darr;
              </a>
            </div>
          </header>

          {/* What is remote mixing */}
          <section className="grid md:grid-cols-2 gap-10 mb-24" aria-labelledby="hvad-er">
            <div>
              <h2 id="hvad-er" className="text-3xl font-bold text-white mb-4">Hvad er remote mixing?</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  Remote mixing betyder, at dit band indspiller selv – i øvelokalet, i et hjemmestudie eller i et
                  andet studie – og sender de rå spor (multitracks) digitalt til en mix engineer. Mixet laves uden at
                  I behøver at møde op, og al feedback foregår online.
                </p>
              </div>
            </div>
            <div className={`${card} p-8`}>
              <h3 className="text-lg font-bold text-white mb-5">Hvem passer det til?</h3>
              <ul className="space-y-3 text-zinc-300">
                <li>&rsaquo; Bands og artister, der indspiller selv og vil have en udgivelsesklar lyd</li>
                <li>&rsaquo; DIY-producere med programmerede trommer og amp-sims</li>
                <li>&rsaquo; Bands, der vil udgive en single, EP eller et album på Spotify og andre tjenester</li>
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

          {/* Process */}
          <section className="mb-24" aria-labelledby="processen">
            <h2 id="processen" className="text-3xl md:text-4xl font-bold text-white mb-3">Sådan foregår det – 5 trin</h2>
            <p className="text-zinc-300 mb-10 max-w-2xl">Fra rå spor til færdigt mix. Ingen timepriser og ingen overraskelser.</p>
            <ol className="grid md:grid-cols-2 gap-6">
              {STEPS.map((s, i) => (
                <li key={s.title} className={`${card} p-7`}>
                  <div className="font-mono text-amber text-sm font-bold mb-3">TRIN {i + 1}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-zinc-300 leading-relaxed text-[15px]">{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Pricing */}
          <section id="priser" className="mb-24 scroll-mt-28" aria-labelledby="priser-h">
            <h2 id="priser-h" className="text-3xl md:text-4xl font-bold text-white mb-3">Hvad koster det at få mixet en sang?</h2>
            <p className="text-zinc-300 mb-10 max-w-2xl">
              Faste projektpriser inkl. moms. Du kender prisen, før vi går i gang.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                ['Single (1-2 sange)', '2.499 kr.', 'pr. sang'],
                ['EP / album (3+ sange)', '2.195 kr.', 'pr. sang'],
                ['Test-mix', '0 kr.', 'udsnit af én sang'],
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
                <caption className="text-left text-white font-bold mb-4">Eksempler på samlet pris</caption>
                <thead>
                  <tr className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                    <th className="pb-3 pr-4 font-medium">Projekt</th>
                    <th className="pb-3 pr-4 font-medium">Pris pr. sang</th>
                    <th className="pb-3 font-medium">Samlet pris</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-200">
                  {[
                    ['Single, 1 sang', '2.499 kr.', '2.499 kr.'],
                    ['Dobbelt-single, 2 sange', '2.499 kr.', '4.998 kr.'],
                    ['EP, 5 sange', '2.195 kr.', '10.975 kr.'],
                    ['Album, 10 sange', '2.195 kr.', '21.950 kr.'],
                  ].map((r) => (
                    <tr key={r[0]} className="border-t border-[#222228]">
                      <td className="py-3 pr-4">{r[0]}</td>
                      <td className="py-3 pr-4">{r[1]}</td>
                      <td className="py-3 font-semibold text-white">{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Included */}
          <section className="grid md:grid-cols-2 gap-6 mb-24" aria-labelledby="inkluderet">
            <div className={`${card} p-8`}>
              <h2 id="inkluderet" className="text-2xl font-bold text-white mb-5">Det er inkluderet</h2>
              <ul className="space-y-3 text-zinc-300">
                {INCLUDED.map((x) => (
                  <li key={x} className="flex gap-3"><span className="text-amber font-bold">✓</span><span>{x}</span></li>
                ))}
              </ul>
            </div>
            <div className={`${card} p-8`}>
              <h2 className="text-2xl font-bold text-white mb-5">Det er ikke inkluderet</h2>
              <ul className="space-y-3 text-zinc-300">
                {NOT_INCLUDED.map((x) => (
                  <li key={x} className="flex gap-3"><span className="text-zinc-500 font-bold">–</span><span>{x}</span></li>
                ))}
              </ul>
            </div>
          </section>

          {/* Stem prep */}
          <section className="mb-24" aria-labelledby="klargoer">
            <h2 id="klargoer" className="text-3xl md:text-4xl font-bold text-white mb-3">Sådan klargør du dine spor til mix</h2>
            <p className="text-zinc-300 mb-8 max-w-2xl">
              Godt forberedte spor giver et bedre mix og hurtigere levering. Brug tjeklisten, før du sender.
            </p>
            <ol className={`${card} p-8 space-y-4 list-decimal list-inside text-zinc-200 marker:text-amber marker:font-bold`}>
              {PREP.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ol>
            <p className="text-zinc-400 text-sm mt-4">
              Skal du selv indspille vokalen? Læs guiden{' '}
              <Link href="/blog/vokalindspilning-hjemmestudie" className="text-amber hover:underline">
                Vokalindspilning i hjemmestudie: 7 trin
              </Link>
              . Kæmper du med bunden? Se{' '}
              <Link href="/blog/fix-mudret-low-end-metal-mix" className="text-amber hover:underline">
                Mudret bund i metal mix
              </Link>
              .
            </p>
          </section>

          {/* Why */}
          <section className="grid md:grid-cols-5 gap-10 mb-24" aria-labelledby="hvorfor">
            <div className="md:col-span-3">
              <h2 id="hvorfor" className="text-3xl md:text-4xl font-bold text-white mb-5">Hvorfor mixe med FD Sound Labs?</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  Jeg hedder Frederik Dinesen og har indspillet og mixet rock og metal i omkring 9 år. Som trommeslager
                  og sangskriver i metalcore-bandet Rise Upon producerede, indspillede og mixede jeg albummet{' '}
                  <em>The Dimming Effect</em> (2024), der blev nomineret til GAFFA-Prisen i kategorien dansk hard
                  rock/metal.
                </p>
                <p>
                  Jeg er specialiseret i rock og metal, så du får en mix engineer, der kender lyden: stramme trommer,
                  tunge guitarer og vokaler, der skærer igennem. Priserne er faste og offentlige, og du hører resultatet
                  i et gratis test-mix, før du betaler noget.
                </p>
                <p>
                  <Link href="/#portfolio" className="text-amber hover:underline">Hør før/efter-eksempler i porteføljen</Link>
                  {' '}eller{' '}
                  <Link href="/#about" className="text-amber hover:underline">læs mere om mig</Link>.
                </p>
              </div>
            </div>
            <aside className={`${card} md:col-span-2 p-8`}>
              <h3 className="text-lg font-bold text-white mb-5">Udvalgte credits</h3>
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

          {/* FAQ */}
          <section className="mb-24" aria-labelledby="faq-h">
            <h2 id="faq-h" className="text-3xl md:text-4xl font-bold text-white mb-8">Ofte stillede spørgsmål om remote mixing</h2>
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

          {/* Final CTA */}
          <section id="test-mix" className={`${card} p-10 sm:p-14 text-center scroll-mt-28`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Hør dit nummer mixet – gratis</h2>
            <p className="text-zinc-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Send et link til dine spor eller en demo. Jeg vender tilbage inden for 24 timer, og du får et gratis
              test-mix af et udsnit af sangen. Helt uforpligtende.
            </p>
            <OpenTestMixButton className={ctaPrimary}>
              Få dit gratis test-mix <span>&rarr;</span>
            </OpenTestMixButton>
          </section>
        </div>
      </main>

      <BlogFooter lang="da" />
    </TestMixModalProvider>
  );
}
