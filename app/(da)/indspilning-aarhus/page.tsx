import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import BlogNavbar from '@/components/blog/BlogNavbar';
import BlogFooter from '@/components/blog/BlogFooter';
import ArticleAmbience from '@/components/blog/ArticleAmbience';
import { TestMixModalProvider } from '@/components/blog/TestMixModalContext';
import OpenTestMixButton from '@/components/landing/OpenTestMixButton';

const BASE = 'https://frederikdinesen.com';
const URL = `${BASE}/indspilning-aarhus`;
const MAPS = 'https://www.google.com/maps?cid=15858331334067921623';
const TITLE = 'Lydstudie i Aarhus – Indspilning af Rock & Metal';
const DESCRIPTION =
  'Indspil vokal, guitar, bas og synths i Aarhus C. Heldagssession til fast pris: 3.125 kr. pr. dag inkl. moms. Kombinér med mix af dine sange ét sted.';

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | FD Sound Labs` },
  description: DESCRIPTION,
  alternates: { canonical: URL },
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

const RECORD = [
  ['Vokal', 'Clean vokal, screams og growls. Vi tager os tid til de rigtige takes.'],
  ['Guitar', 'High-gain rytme- og leadguitar. Jeg optager et rent DI-spor med, så tonen kan re-ampes i mixet.'],
  ['Bas', 'DI og/eller amp, så bunden kan formes præcist i mixet.'],
  ['Synths & keys', 'Lag, pads og leads, der skal sidde i et tungt mix.'],
];

const STEPS = [
  { title: 'Kontakt og plan', text: 'Fortæl, hvad I vil indspille, og send en demo. Vi aftaler, hvor mange dage I skal bruge, og hvad der skal nås hver dag.' },
  { title: 'Booking', text: 'Du får en opgavebekræftelse med datoer og pris. Når depositum på 50 % er betalt, er studietiden reserveret til jer.' },
  { title: 'Forberedelse', text: 'I sender tempo, demo, tekster og eventuelle guide-spor på forhånd, så sessionen er sat op, når I ankommer.' },
  { title: 'Studiedagen', text: 'En heldagssession i studiet i Aarhus C. Vi indspiller i et roligt tempo uden stopur, så der er tid til at gå efter det rigtige take.' },
  { title: 'Videre til mix', text: 'Sporene kan gå direkte videre til mix hos mig. Så kender jeg materialet fra første take, og I får hele produktionen ét sted.' },
];

const PREP = [
  'Øv sangene til klik i det tempo, I vil indspille i.',
  'Skift strenge på guitar og bas 1–2 dage før, og tjek intonationen.',
  'Medbring jeres egne instrumenter, kabler og eventuelle pedaler.',
  'Hav tekster klar, så vokalisten ikke skal huske dem under takes.',
  'Send demo, tempo og eventuelle guide-spor eller programmerede trommer på forhånd.',
  'Vokalister: sov godt, drik vand, og spar på stemmen dagen før.',
];

const FAQ = [
  {
    q: 'Hvad koster det at indspille i et lydstudie i Aarhus?',
    a: 'Studio tracking hos FD Sound Labs koster 3.125 kr. pr. dag inkl. moms for en heldagssession. Mix af sangene afregnes separat: 2.499 kr. pr. sang for 1-2 sange eller 2.195 kr. pr. sang ved 3 eller flere. To dages indspilning og mix af 3 sange koster for eksempel 12.835 kr. i alt.',
  },
  {
    q: 'Hvad kan man indspille hos FD Sound Labs?',
    a: 'Studiet er indrettet til vokal (clean, screams og growls), high-gain guitar, bas og synths. Guitar og bas optages også som rene DI-spor, så tonen kan re-ampes i mixet.',
  },
  {
    q: 'Kan I indspille trommer?',
    a: 'Studiet er indrettet til vokal, guitar, bas og synths, ikke til trommer. Meget moderne rock og metal bruger programmerede trommer, og dem editerer og sample-blender jeg i mixet. Har I indspillet trommer i øvelokalet eller et andet studie, kan jeg også arbejde med dem. Mobil indspilning kan aftales ved særlige projekter.',
  },
  {
    q: 'Hvor lang er en studiedag?',
    a: 'En studiedag er en heldagssession. Vi aftaler tidspunkterne på forhånd, og hvor mange dage I skal bruge, afhænger af materialet og af, hvor godt forberedte I er.',
  },
  {
    q: 'Kan vi indspille i weekenden?',
    a: 'Ja. Indspilning foregår ofte i weekenden, så det passer med bandmedlemmer, der har job eller studie ved siden af. Vi finder datoer, der passer jer.',
  },
  {
    q: 'Hvad sker der, hvis vi bliver syge?',
    a: 'Mere end 7 dage før kan I flytte eller aflyse uden gebyr. Mellem 2 og 7 dage før kan sessionen flyttes mod et gebyr på 10 % af depositum. Ved sygdom under 48 timer før kan I flytte mod samme gebyr, ellers tilbageholdes 50 % af depositum. Bliver jeg selv syg, får I en ny dato uden ekstra omkostninger.',
  },
  {
    q: 'Skal vi også få sangene mixet hos dig?',
    a: 'Det er ikke et krav, men det er en fordel: Når jeg har indspillet sporene, kender jeg materialet, og I får hele produktionen ét sted til faste priser. Mix afregnes pr. sang.',
  },
  {
    q: 'Hvor ligger studiet?',
    a: 'Studiet ligger i Ceresbyen 10E, st., 8000 Aarhus C, centralt i byen. Du kan finde FD Sound Labs på Google Maps.',
  },
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
        name: 'Studio tracking / indspilning i Aarhus',
        serviceType: 'Audio recording',
        description: DESCRIPTION,
        url: URL,
        provider: { '@id': `${BASE}/#studio` },
        areaServed: [
          { '@type': 'City', name: 'Aarhus' },
          { '@type': 'AdministrativeArea', name: 'Region Midtjylland' },
          { '@type': 'Country', name: 'Denmark' },
        ],
        offers: {
          '@type': 'Offer',
          name: 'Heldagssession (studio tracking)',
          price: '3125',
          priceCurrency: 'DKK',
          url: `${URL}#priser`,
          priceSpecification: { '@type': 'UnitPriceSpecification', price: '3125', priceCurrency: 'DKK', valueAddedTaxIncluded: true, unitText: 'dag' },
        },
      },
      {
        '@type': 'HowTo',
        '@id': `${URL}#process`,
        name: 'Sådan foregår en studiedag hos FD Sound Labs',
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
          { '@type': 'ListItem', position: 2, name: 'Indspilning i Aarhus', item: URL },
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

export default function IndspilningAarhusPage() {
  return (
    <TestMixModalProvider lang="da">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }} />
      <BlogNavbar lang="da" blogActive={false} languageUrls={{ da: '/indspilning-aarhus', en: '/en' }} />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
        <ArticleAmbience />

        <div className="max-w-5xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-10" aria-label="Brødkrumme">
            <Link href="/" className="hover:text-amber transition-colors">Forside</Link>
            <span>/</span>
            <span className="text-zinc-400">Indspilning i Aarhus</span>
          </nav>

          {/* Hero */}
          <header className="max-w-3xl mb-20">
            <div className={pill}>
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              Studio tracking &bull; Aarhus C
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              Lydstudie i Aarhus til indspilning af rock og metal
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed mb-8">
              Indspil vokal, guitar, bas og synths hos FD Sound Labs i Ceresbyen, Aarhus C. En heldagssession koster{' '}
              <strong className="text-white">3.125 kr. pr. dag inkl. moms</strong>, og når sporene er i kassen, kan jeg
              mixe dem, så I får <strong className="text-white">hele produktionen ét sted</strong>.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <OpenTestMixButton service="Studio Tracking" className={ctaPrimary}>
                Book studietid <span>&rarr;</span>
              </OpenTestMixButton>
              <a href="#priser" className="font-mono text-sm text-zinc-300 hover:text-amber transition-colors">
                Se priser &darr;
              </a>
            </div>
          </header>

          {/* What can you record */}
          <section className="mb-24" aria-labelledby="hvad-h">
            <h2 id="hvad-h" className="text-3xl md:text-4xl font-bold text-white mb-3">Hvad kan du indspille?</h2>
            <p className="text-zinc-300 mb-10 max-w-2xl">
              Studiet er indrettet til de instrumenter, der bærer et moderne rock- og metalnummer.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {RECORD.map(([t, d]) => (
                <div key={t} className={`${card} p-7`}>
                  <h3 className="text-xl font-bold text-white mb-2">{t}</h3>
                  <p className="text-zinc-300 leading-relaxed text-[15px]">{d}</p>
                </div>
              ))}
            </div>
            <p className="text-zinc-400 text-[15px] mt-6 max-w-3xl">
              <strong className="text-zinc-200">Trommer:</strong> Studiet er ikke indrettet til trommer. Brug programmerede
              trommer, eller send trommer, I har indspillet i øvelokalet. Jeg editerer og sample-blender dem i mixet.
            </p>
          </section>

          {/* The studio */}
          <section className="grid md:grid-cols-5 gap-10 mb-24" aria-labelledby="studiet">
            <div className="md:col-span-3">
              <h2 id="studiet" className="text-3xl md:text-4xl font-bold text-white mb-5">Et roligt studie centralt i Aarhus</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  Studiet ligger i Ceresbyen i Aarhus C. Det er et mindre, hjemligt studie, hvor der ikke tikker et
                  stopur i baggrunden. Med en hel dag er der tid til at gå efter det rigtige take i stedet for det
                  første brugbare.
                </p>
                <p>
                  Jeg hedder Frederik Dinesen og har indspillet og mixet rock og metal i omkring 9 år. Som trommeslager
                  og sangskriver i Rise Upon har jeg selv stået på den anden side af glasset, og jeg producerede,
                  indspillede og mixede bandets album <em>The Dimming Effect</em> (2024).{' '}
                  <Link href="/#about" className="text-amber hover:underline">Læs mere om mig</Link>.
                </p>
              </div>
            </div>
            <aside className={`${card} md:col-span-2 p-8`}>
              <h3 className="text-lg font-bold text-white mb-4">Find studiet</h3>
              <address className="not-italic text-zinc-200 leading-relaxed mb-5">
                FD Sound Labs<br />
                Ceresbyen 10E, st.<br />
                8000 Aarhus C<br />
                Tlf: <a href="tel:+4530138975" className="hover:text-amber">+45 30 13 89 75</a>
              </address>
              <a href={MAPS} target="_blank" rel="noopener" className="font-mono text-sm text-amber hover:underline">
                Se FD Sound Labs på Google Maps &rarr;
              </a>
            </aside>
          </section>

          {/* Process */}
          <section className="mb-24" aria-labelledby="processen">
            <h2 id="processen" className="text-3xl md:text-4xl font-bold text-white mb-3">Sådan foregår en studiedag</h2>
            <p className="text-zinc-300 mb-10 max-w-2xl">Fra første besked til færdige spor.</p>
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
            <h2 id="priser-h" className="text-3xl md:text-4xl font-bold text-white mb-3">Hvad koster det at indspille?</h2>
            <p className="text-zinc-300 mb-10 max-w-2xl">
              Fast dagspris inkl. moms. Mix afregnes separat pr. sang, så du kun betaler for det, I har brug for.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className={`${card} p-7`}>
                <div className="text-zinc-300 font-semibold mb-3">Studio tracking</div>
                <div className="text-4xl font-bold text-amber tracking-tight">3.125 kr.</div>
                <div className="font-mono text-xs text-zinc-400 mt-1">pr. heldagssession</div>
              </div>
              <div className={`${card} p-7`}>
                <div className="text-zinc-300 font-semibold mb-3">Mix af sangene</div>
                <div className="text-4xl font-bold text-amber tracking-tight">fra 2.195 kr.</div>
                <div className="font-mono text-xs text-zinc-400 mt-1">
                  pr. sang &bull; <Link href="/remote-mixing" className="text-amber hover:underline">læs om mix</Link>
                </div>
              </div>
            </div>
            <div className={`${card} p-7 overflow-x-auto`}>
              <table className="w-full text-left text-[15px]">
                <caption className="text-left text-white font-bold mb-4">Eksempler på samlet pris</caption>
                <thead>
                  <tr className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                    <th className="pb-3 pr-4 font-medium">Projekt</th>
                    <th className="pb-3 pr-4 font-medium">Indspilning</th>
                    <th className="pb-3 pr-4 font-medium">Mix</th>
                    <th className="pb-3 font-medium">Samlet pris</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-200">
                  {[
                    ['Vokal til en single (1 dag)', '3.125 kr.', '–', '3.125 kr.'],
                    ['Vokal + mix af 3 sange (2 dage)', '6.250 kr.', '6.585 kr.', '12.835 kr.'],
                    ['Guitar, bas og vokal + mix af EP på 5 sange (3 dage)', '9.375 kr.', '10.975 kr.', '20.350 kr.'],
                  ].map((r) => (
                    <tr key={r[0]} className="border-t border-[#222228]">
                      <td className="py-3 pr-4">{r[0]}</td>
                      <td className="py-3 pr-4">{r[1]}</td>
                      <td className="py-3 pr-4">{r[2]}</td>
                      <td className="py-3 font-semibold text-white">{r[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-zinc-400 text-sm mt-4">
                Antallet af dage afhænger af materialet og jeres forberedelse. Vi aftaler det på forhånd, så prisen er fast.
              </p>
            </div>
          </section>

          {/* Prep */}
          <section className="mb-24" aria-labelledby="forbered">
            <h2 id="forbered" className="text-3xl md:text-4xl font-bold text-white mb-3">Sådan forbereder I jer til studiet</h2>
            <p className="text-zinc-300 mb-8 max-w-2xl">
              Jo bedre forberedte I er, jo mere når vi på en dag. Brug tjeklisten inden jeres session.
            </p>
            <ol className={`${card} p-8 space-y-4 list-decimal list-inside text-zinc-200 marker:text-amber marker:font-bold`}>
              {PREP.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ol>
            <p className="text-zinc-400 text-sm mt-4">
              Vil I hellere indspille selv? Læs{' '}
              <Link href="/blog/vokalindspilning-hjemmestudie" className="text-amber hover:underline">
                Vokalindspilning i hjemmestudie: 7 trin
              </Link>{' '}
              og send sporene til <Link href="/remote-mixing" className="text-amber hover:underline">remote mixing</Link>.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-24" aria-labelledby="faq-h">
            <h2 id="faq-h" className="text-3xl md:text-4xl font-bold text-white mb-8">Ofte stillede spørgsmål om indspilning</h2>
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
            <p className="text-zinc-400 text-sm mt-6">
              Se de fulde vilkår for booking og afbud i{' '}
              <a href="/terms.html" className="text-amber hover:underline">handelsbetingelserne</a>.
            </p>
          </section>

          {/* Final CTA */}
          <section className={`${card} p-10 sm:p-14 text-center`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Klar til at indspille?</h2>
            <p className="text-zinc-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Fortæl kort om projektet, og send et link til jeres demo. Jeg vender tilbage inden for 24 timer med et
              forslag til plan og pris.
            </p>
            <OpenTestMixButton service="Studio Tracking" className={ctaPrimary}>
              Book studietid <span>&rarr;</span>
            </OpenTestMixButton>
          </section>
        </div>
      </main>

      <BlogFooter lang="da" />
    </TestMixModalProvider>
  );
}
