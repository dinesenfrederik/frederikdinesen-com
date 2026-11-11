# SEO & GEO log – frederikdinesen.com

Løbende log for SEO (Google, Bing) og GEO (ChatGPT, Perplexity, Gemini, Claude, Copilot).
Nyeste øverst. Ændringer pushes direkte til `main` (aftalt 2026-11-11).

## Strategiske beslutninger (interview 2026-11-11)

- **Marked:** Danmark først (6 mdr.), derefter engelsk/EU.
- **Primær ydelse:** Remote mixing (sekundært: studio tracking i Aarhus).
- **Search Console-data:** Frederik eksporterer rapporter til Google Sheets i Drev (Search Console → Eksportér → Google Sheets).
- **Arbejdsform:** Direkte på `main`.

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
5. **Landingsside for studio tracking Aarhus:** lokal side, der understøtter GBP.
6. **Søgeordsresearch DK:** Valider volumen for "mixing af metal", "mix af sang pris", "lydstudie Aarhus", "indspilning Aarhus", "remote mixing" osv. med GSC-data.
7. **Lydfiler:** Flyt fra raw.githubusercontent.com til eget domæne / Vercel Blob (hastighed + AudioObject på eget domæne).
8. **Bing Webmaster Tools:** Importér fra GSC; IndexNow kører allerede.
9. **Cookie-samtykke:** GA4 og Ahrefs indlæses uden samtykke (GDPR, ikke SEO, men en risiko).
10. **vercel.app-domænet:** `frederikdinesen-com.vercel.app` er offentligt. Canonicals dækker, men en redirect til hoveddomænet er renere.
