# SEO & GEO log – frederikdinesen.com

Løbende log for SEO (Google, Bing) og GEO (ChatGPT, Perplexity, Gemini, Claude, Copilot).
Nyeste øverst. Ændringer pushes direkte til `main` (aftalt 2026-11-11).

## Strategiske beslutninger (interview 2026-11-11)

- **Marked:** Danmark først (6 mdr.), derefter engelsk/EU.
- **Primær ydelse:** Remote mixing (sekundært: studio tracking i Aarhus).
- **Search Console-data:** Frederik eksporterer rapporter til Google Sheets i Drev (Search Console → Eksportér → Google Sheets).
- **Arbejdsform:** Direkte på `main`.

## 2026-11-13 – Bing Site Scan: "Title too long" (8 sider)

- Bing Webmaster Tools Site Scan: kun én advarsel, "Title too long" på 8 sider; ingen fejl. Årsag: alle 8 blogartikler havde lange titler + automatisk " | FD Sound Labs" (76-96 tegn).
- Rettet: nyt valgfrit frontmatter-felt `seoTitle` (kort <title>, H1 uændret). Brand-suffikset tilføjes kun, hvis titlen holder sig ≤ 65 tegn (`documentTitle()` i lib/blogSchema.ts). seoTitle sat på 5 artikler. EN-forsidens titel forkortet (70 → 60).
- Content-motoren: writer-prompten skriver `seoTitle`, når titlen er > 60 tegn; validatoren tillader feltet og advarer, hvis den effektive titel er > 65 tegn. Review-dashboardet bevarer feltet ved redigering.
- Alle titler på sitet er nu ≤ 65 tegn.

## 2026-11-11 – Case: The Dimming Effect

- `/blog/case-the-dimming-effect` + `/en/blog/case-study-the-dimming-effect` (interview med Frederik). Fakta: 4 lokationer (3 private hjemmestudier + studie i øvelokalefællesskab), trommer akustisk i dødt rum med kreative rum-mikrofoner + samples (egne og andres), Studio One, Drop A, amp sims primært Neural DSP, ingen re-amping, clean vokal i mange lag i hjemmestudiet, startede mixet forfra pga. perfektionisme, mastering af Jacob Hansen (Hansen Studios), referencer Bad Omens/BMTH/Starset. Spotify: https://open.spotify.com/album/0ww92N8qUxXSWJDOGjHrZU
- Ny komponent `AudioCompare` (frontmatter `audioCompare`) med før/efter-afspiller (Rise Upon – Lost Track). Afklar med Frederik, om Lost Track er på albummet; teksten påstår det ikke.
- Bevidst undtagelse: ét eksternt link (Spotify) i casen; validatorens regel mod eksterne links gælder motorens udkast.
- MusicAlbum-schema: Spotify som url/sameAs og subjectOf → casen. Link fra "Om mig" til casen.

## 2026-11-11 – Fremtidig plan

- Plan skrevet i `seo/PLAN.md`. Frederik har ca. 1 time/uge; content-motoren er sat til 1 artikel/uge (mandag). Der kører en månedlig gennemgang som planlagt opgave.
- Fundet og rettet: Blog og landingssider (Next.js) indlæste ikke GA4, Ahrefs eller Vercel Analytics. Besøg og test-mix-henvendelser fra de sider blev derfor ikke målt. Tilføjet i `lib/rootLayout.tsx`.
- Case-studie om *The Dimming Effect* godkendt; afventer interview.

## 2026-11-11 – IndexNow for alle sider + Google-sitemap

- IndexNow-workflowet reagerer nu på ændringer i alle sider (forsider, landingssider, blog, terms, skabeloner) og ikke kun på blogartikler. Filer mappes til URL'er; ændringer i fælles skabeloner (components/, lib/, layouts, CSS) melder hele sitemap'et. Nye `<loc>` i sitemap.xml meldes automatisk. Kun URL'er fra sitemap.xml (canonical) indsendes.
- Manuel kørsel: GitHub → Actions → IndexNow → Run workflow (all = true) melder alle URL'er i sitemap.xml.
- Workflowet advarer, hvis en ændret side har en `<lastmod>`, der ikke er opdateret (Google bruger lastmod).
- Google: understøtter ikke IndexNow, og Indexing API'et må kun bruges til jobopslag/livestreams. For Google gælder: sitemap.xml med korrekt lastmod (opdateret for / og /en i dag), sitemap indsendt i Search Console og "Anmod om indeksering" på nye sider.
- **Regel:** Ved indholdsændringer på en side skal dens `<lastmod>` i sitemap.xml opdateres i samme commit.

## 2026-11-11 – Prisartikel: "Hvad koster et mix?"

- `/blog/hvad-koster-et-mix` (DA, ca. 1.460 ord) + `/en/blog/how-much-does-mixing-cost` (EN), hreflang-par. Skrevet manuelt (ikke via content-motoren), fordi motoren ikke må nævne priser, der ikke står i dens research-brief.
- Målsøgeord: "hvad koster et mix", "pris på mix af sang", "hvad koster det at mixe en EP/album", "mix pris pr. sang", "er mastering inkluderet".
- Indhold: direkte svar (GEO), prisfaktorer, prismodeller (sang/time/dag), EP/album-eksempler, mastering, tjekliste til tilbud, mix selv vs. få mixet, budgettips. Ingen markedspriser, som ikke kan verificeres.
- Valideret med content-motorens validator (0 fejl/advarsler). Sitemap via `addToSitemap`. Krydslinks fra `/remote-mixing` og `/en/remote-mixing`.

## 2026-11-11 – Landingssider: /indspilning-aarhus og /en/remote-mixing

- `/indspilning-aarhus` (DA, ca. 1.100 ord): målrettet "lydstudie Aarhus", "indspilning Aarhus", "studio tracking Aarhus", "indspille vokal Aarhus". Fakta fra handelsbetingelserne: heldagssession 3.125 kr., 50 % depositum, afbuds-/flytteregler. Studiet er IKKE indrettet til trommer (vokal, guitar, bas, synths). Mobil indspilning ved særlige projekter. Prisexempler inkl. mix. CTA forvælger "Studio Tracking" i formularen. Schema: WebPage, Service (Offer pr. dag), HowTo, FAQPage, BreadcrumbList.
- `/en/remote-mixing` (EN): engelsk udgave med EUR-vejledende priser og forklaring af reverse charge for EU-B2B. hreflang-par med `/remote-mixing`.
- Rettet på `/remote-mixing`: "du kan også betale i euro" var unøjagtigt (EUR-fakturering kun B2B i EU). Nu: "du kan se dem i euro på den engelske side".
- Interne links: forsidens tracking-kort + footer (DA), EN-forsidens mix-kort, "About" og footer, blog-footer på begge sprog. Sitemap (12 URL'er), llms.txt og writer-prompt opdateret.
- Beslutning: Ingen yderligere landingssider (undgå doorway pages som "mixing <by>"). Næste fokus: autoritet uden for siden (anmeldelser, profiler, links fra bands), prisartikel, måling.

## 2026-11-11 – Landingsside: /remote-mixing

Ny side `app/(da)/remote-mixing/page.tsx` (statisk, ca. 1.300 ord). Målsøgeord: "remote mixing", "mixing af metal/rock", "få mixet en sang", "hvad koster det at få mixet en sang", "online mixing", "mix engineer". Indhold: definition (AI-citerbar), proces i 5 trin, priser med eksempler (EP 10.975 kr., album 21.950 kr.), inkluderet/ikke inkluderet (mastering), tjekliste til spor, credits, 8 FAQ og test-mix-CTA (genbruger modal + web3forms).
Schema: WebPage, Service (3 offers), HowTo, FAQPage, BreadcrumbList.
Interne links: forsidens priskort, "Om mig", footer, blog-footer. Sitemap og llms.txt opdateret. Writer-prompten må linke til `/remote-mixing` i danske mixing-artikler og har nu en fast liste over rigtige credits.
Næste: Overvåg GSC for siden. Overvej EN-version (`/en/remote-mixing`) i fase 3 og en artikel "Hvad koster det at få mixet en sang?", der linker hertil.

## 2026-11-11 – Portfolio-ærlighed + credits

Fakta: Portfolio-numrene undtagen Rise Upon (Illuminate The Sky, Kingdoms, Prophers, The Year, Acrid, Raised With Wolves) er mix af frit tilgængelige multitracks til porteføljebrug, **ikke** kundearbejde. Rigtige samarbejder: Rise Upon, Valdemar Dvinge (produktion, indspilning, mix), Black Boned Lucy (mixing engineer), 7ATEM (guitar- og basindspilning), Dominum (assistent ved trommeindspilning), Æteren (mixing engineer). Øvelsesnumrenes multitracks er anskaffet gennem mixing-kurser (ikke frit tilgængelige).
GBP: Kategorier "Pladestudie" (primær) og "Musikproducer". Beskrivelsen påstod "produktioner nomineret til GAFFA-Prisen og Den Hårde Tone". Der er foreslået en rettet tekst.

Rettet: Øvelsesnumrene er mærket "Mix-eksempel" med forklaring i portfolio-intro. Credits viser kun rigtige samarbejder (én pr. linje). Schemaets AudioObject peger nu på Rise Upon – Lost Track. llms.txt forklarer, at eksemplerne ikke er kundearbejde.
Regel fremover: Brug aldrig øvelsesnumrenes bandnavne som kunder/credits i indhold, schema eller artikler.

## 2026-11-11 – Interview runde 3

Fakta: Albummet *The Dimming Effect* (Rise Upon) var nomineret til GAFFA-Prisen i kategorien dansk hard rock/metal. Rise Upon var nomineret til publikumsprisen ved Den Hårde Tone. Frederik laver ikke mastering (anbefaler en ekstern mastering engineer), men kan efter aftale levere et loud master. Valdemar Dvinge: samme rolle som ved Rise Upon (produktion, indspilning, mix). Frederik ønsker ikke hjælp til at skrive anmeldelsesbeskeder.

Rettet: Hero-badge og "Om mig" med præcise nomineringer. Nyt FAQ-punkt om mastering (DA/EN + schema). GBP koblet via `hasMap`/`sameAs` (CID 15858331334067921623, kgmid /g/11m_k4mgpg). Schema-geo rettet til GBP-koordinaterne (56.1553365, 10.1881346). Credits opdelt i produktion vs. mix.

## 2026-11-11 – Interview runde 2 + "Om Frederik"

Fakta fra Frederik:
- Ca. 9 års erfaring, selvlært + kurser fra Nail The Mix og Hardcore Music Studio (Jordan Valeriote).
- Trommeslager og sangskriver i Rise Upon. Producer, recording og mix engineer på albummet *The Dimming Effect* (2024).
- Spotify-credits: primært Rise Upon og Valdemar Dvinge.
- Nomineringerne (GAFFA, Den Hårde Tone) gjaldt **ikke** hans produktion/mix. Fjernet som personlig `award` i schema og fra llms.txt. Hero-badge'en "Nominerede udgivelser" afventer præcisering (hvad blev nomineret, hvilket år).
- Ingen anmeldelser, ingen udtalelser, ingen billeder endnu.
- Konkurrenter: Uglebjerg, Everloud Studios (Kristian Øgir), Jacob Hansen, Tapetown (Aarhus). Desuden Tue Madsen (Antfarm, Aarhus).
- GBP-link: https://share.google/D2NwaO7roj4sfnivU (kortlink, mangler fuld Maps-URL/CID til `hasMap`/`sameAs`).

Rettet/tilføjet:
- "Om mig"-sektion (`#about`) på DA og EN forsiden + menupunkt.
- Schema: `Person` uden `award`, med beskrivelse og `memberOf` Rise Upon. Nye entiteter `MusicGroup` (Rise Upon) og `MusicAlbum` (*The Dimming Effect*, 2024) med Frederik som producer.
- llms.txt: korrekt bio og credits.

Research (konkurrenter/SERP):
- SoundBetter er en stor kanal for danske metal-mixere (Everloud har profil der) og et sted med anmeldelser, som Google og AI citerer.
- Prissøgninger ("hvad koster mixing og mastering af en sang") domineres af generiske guides (Handyhand, eMastered). Der er en åbning for en dansk metal-specifik prisartikel, og FD Sound Labs har allerede faste, offentlige priser.

## 2026-11-11 – Teknisk audit + rettelser (commit 0605aa1)

Rettet:
- Den danske forside skiftede automatisk til engelsk/EUR for ikke-danske browsere. Googlebot (USA, en-US) så derfor `/` på engelsk. Nu altid dansk + DKK; manuelt valutavalg gemmes stadig.
- `/en/`, `/blog/` og `/en/blog/` 308-redirecter. Canonical, hreflang og sitemap bruger nu `/en`, `/blog` og `/en/blog`. `/index.html` og `/en/index.html` redirecter.
- Engelske blogsider havde `<html lang="da">`. Nu separate root layouts pr. sprog (route groups `(da)`/`(en)`) + global 404.
- Schema-typen `MusicStudio` findes ikke i schema.org. Erstattet med `LocalBusiness`. Én fælles entitet `#studio` og `#frederik` på tværs af sprog, plus `WebSite`, `WebPage`, logo og priser inkl. moms.
- FAQ-schema matchede ikke den synlige FAQ. Nu identisk, og et prisspørgsmål er tilføjet synligt.
- Artikler: én `@graph` med `TechArticle` (`dateModified` via frontmatter `updated`), `BreadcrumbList` og `FAQPage`.
- OG-billedet (`/assets/og-image.jpg`) gav 404. Nu findes DA/EN-billeder (1200×630) og `logo.png` (512×512).
- `llms.txt` genereres ved hver build fra `llms-intro.md` + artiklerne.

## Backlog (prioriteret)

0. **Anmeldelser (vigtigst nu):** Bed tidligere kunder (Illuminate The Sky, Kingdoms, Prophers, The Year, Acrid, Raised With Wolves, Valdemar Dvinge) om en Google-anmeldelse. Opret SoundBetter-profil.
1. **sameAs / entitet:** GBP er koblet. Tilføj Instagram, Facebook, YouTube og LinkedIn, når de findes, og en SoundBetter-profil.
2. ~~Om Frederik-sektion~~ (gjort 2026-11-11). Mangler: billede af Frederik/studiet.
3. **Anmeldelser:** Udtalelser fra kunder på siden. Indsaml Google-anmeldelser på GBP.
4. ~~Landingsside for remote mixing (DA)~~ (gjort 2026-11-11: `/remote-mixing`).
5. ~~Landingsside for studio tracking Aarhus~~ (gjort 2026-11-11: `/indspilning-aarhus`). EN remote mixing også gjort: `/en/remote-mixing`.
6. **Søgeordsresearch DK:** Valider volumen for "mixing af metal", "mix af sang pris", "lydstudie Aarhus", "indspilning Aarhus", "remote mixing" osv. med GSC-data.
7. **Lydfiler:** Flyt fra raw.githubusercontent.com til eget domæne / Vercel Blob (hastighed + AudioObject på eget domæne).
8. **Bing Webmaster Tools:** Importér fra GSC; IndexNow kører allerede.
9. **Cookie-samtykke:** GA4 og Ahrefs indlæses uden samtykke (GDPR, ikke SEO, men en risiko).
10. **vercel.app-domænet:** `frederikdinesen-com.vercel.app` er offentligt. Canonicals dækker, men en redirect til hoveddomænet er renere.
