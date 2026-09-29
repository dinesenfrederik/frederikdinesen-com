# 📋 TASK PLAN — B.L.A.S.T. Protocol
**Project:** FDSL Website v2.0  
**Status:** 🟡 PENDING — Awaiting Discovery Questions  
**Last Updated:** 2026-08-28

---

## 🗺️ Phase Overview

| Phase | Name | Status |
|-------|------|--------|
| 0 | Initialization | ✅ Complete |
| 1 | Blueprint | ✅ Complete |
| 2 | Link | ✅ Complete |
| 3 | Architect | ✅ Complete |
| 4 | Stylize | ✅ Complete |
| 5 | Trigger | ✅ Complete |

---

## 🟢 Phase 0 — Initialization

- [x] Create task_plan.md
- [x] Create findings.md
- [x] Create progress.md
- [x] Create gemini.md (Project Constitution)
- [x] Discovery Questions answered by user
- [x] Data Schema defined in gemini.md
- [x] Blueprint approved by user

---

## 🏗️ Phase 1 — Blueprint

### 22. Prissynkronisering, Refund-UI & Kanban-Filtre (✓)
- [x] Synkroniser restbeløb til Stripe-knap i Kunde-Hubben.
- [x] Fjern kode-duplikation fra Admin der blokerede UI updates.
- [x] Dedikeret refunderings-kvitterings-knap i Portal.
- [x] Checkbox-filter i Kanban til Spærrede/Refunderede projekter.

### 23. Log Ud-Reparation & Fuld Session-Rydning (✓)
- [x] Udvid Schema med `activeClientSession`.
- [x] Opdater `logout-btn` til at bruge `window.FDSL_Portal.logout()`.
- [x] Opdater `confirmLogout` til at rydde al session & lokal data.
- [x] Gennemtving fuld sidered-indlæsning (`window.location.href = 'portal.html'`) for at rydde eventuelle fastlåste tilstande i UI.

### Discovery Questions (✅ Answered)
- [x] North Star: Singular desired outcome
- [x] Integrations: External services & API keys
- [x] Source of Truth: Where primary data lives
- [x] Delivery Payload: How/where results are delivered
- [x] Behavioral Rules: Tone, logic constraints, "Do Not" rules

### Data-First Tasks
- [x] Define JSON Input/Output schemas in gemini.md
- [x] Research relevant tools, libraries, and resources
- [x] Approved Blueprint in this file

---

## ⚡ Phase 2 — Link
- [x] Verify all API credentials (.env)
- [x] Build handshake scripts in tools/
- [x] Confirm all external services respond correctly

---

## ⚙️ Phase 3 — Architect
### Layer 1: Architecture SOPs
- [x] Write SOP docs in architecture/
- [x] SOPs approved before any code

### Layer 2: Navigation
- [x] Define data routing logic
- [x] Map SOP to Tool connections

### Layer 3: Tools
- [x] Build atomic, testable scripts in tools/
- [x] Use .tmp/ for intermediate operations
- [x] All tools tested independently

---

## 🎨 Phase 4 — Stylize
- [x] Validate against B.L.A.S.T. tone/style rules
- [x] Polish UI/UX and verify error boundaries
- [x] Refine copy: Portfolio nav link & Guarantee terms
- [x] Refine copy: Digital Hub Step 03 wording
- [x] Refine copy: Pricing feature list
- [x] Implement Seamless A/B Audio Toggling (Phase 4 Refinement)
- [x] Restructure Portfolio grid layout (Phase 4 Refinement)

---

### Phase 5: Client Portal & Admin Dashboard (A.N.T. Architecture)

- [x] Opret `portal.html` med login, uploadoversigt, faktura og feedback modul.
- [x] Opret `admin.html` med Kanban board, projektstyring og webhook logs.
- [x] Implementer `tools/portal-auth.js` med `PROJECTS` (Data-lag).
- [x] Implementer `tools/stem-ingest.js` for træk-og-slip og auto-kategorisering.
- [x] Implementer `tools/feedback-engine.js` for tidsstempling og eksport.
- [x] Opret mock-webhook triggers (`tools/webhook-triggers.js`) for Zapier/Make.
- [x] Avanceret Multi-Song & Drag/Drop
  - [x] Dynamic modal for mixing / tracking / test-mix med prisberegning (DKK/EUR).
  - [x] Drag-and-drop Kanban kolonne opdatering.
  - [x] Kunde-Hub: Dynamiske song-cards for multi-song uploads.
  - [x] Bypass billing flow for test mixes i Kunde-Hub.

---

## 🚀 Phase 5 — Trigger
- [x] Final system walkthrough
- [x] Handoff and deploy payload to destinationment
- [x] Set up webhooks / schedulers / listeners
- [x] Finalize Maintenance Log in gemini.md

## 🌐 Phase 6 — Portal v2 & Admin v2 (B.L.A.S.T. Layer 3 Extension)
- [x] Portal: DA/EN language switcher (alle labels, placeholders, knapper)
- [x] Portal: Folder upload (webkitdirectory) + enkeltfil upload
- [x] Portal: Billing/faktura formular (billingAddress schema)
- [x] Portal: localStorage persistens af fakturadata
- [x] stem-ingest.js: renderCategorizedStemTable (grouped by category)
- [x] stem-ingest.js: 5-sec audio preview-knap per fil
- [x] Admin: "Nyt Projekt" modal (2-step: form → email udkast)
- [x] Admin: Auto-genereret accessCode + projectId
- [x] Admin: E-mail udkast preview med "Kopier" knap
- [x] GEMINI.md: clientProfile + folderStructure + portalUrl schema

## 💰 Phase 7 — Fleksibel Rabatberegning & Tracking Dage i Admin
- [x] Udvid schema i `GEMINI.md` med `discount`, `subtotal` og `trackingDays`.
- [x] Opdater `calcPricing` i `tools/portal-auth.js` til at modtage en rabat-værdi (procent/beløb) og beregne subtotal.
- [x] Sørg for, at 50% depositum altid beregnes ud fra den *nye* (rabatterede) totalpris.
- [x] Tilføj UI i `admin.html` (modal for nyt projekt):
  - [x] Inputfelt til antal "Studiedage" (vises kun, hvis Tracking er valgt).
  - [x] Rabat-dropdown (Ingen / Procent / Beløb) og værdi-input.
  - [x] Live-opdatering af "Subtotal", "Rabat (fratrukket)" og "Totalpris" i modalens bund.
- [x] Udbedre TypeError bug i modalens JS.

## 🚀 Phase 10 — Multi-Version Mix Upload, Revision Counter & Feedback Sync
- [x] GEMINI.md: Opdater schema for `clientDetails`, `revisionRounds`, `mixVersions` og `feedback`.
- [x] Admin Modal: Udvidet detaljevisning til at vise kontaktinfo og adgangskode.
- [x] Admin Modal: Multi-Version Mix Manager (historik liste + ny upload).
- [x] Admin Modal: Revision counter badge.
- [x] Portal: Tilføjet navne-input på feedback formularer (gemmes via localStorage).
- [x] Portal: Dedikeret knap til at indsende en revisionsrunde (inkrementerer tæller).

## 🚀 Phase 11 — Admin Kolonne-Rename, Multi-Version Liste & Betinget Tekst
- [x] Omdøb kolonnen `UNDER REDIGERING` til `UNDER MIXING` (`admin.html`, `SOP-006`).
- [x] Fjern AI-genererede hjælpekommentarer fra Kunde-Hub (`tools/feedback-engine.js`).
- [x] Tilføj Multi-Version Lydliste under Hovedafspilleren (`portal.html`).
- [x] Skjul "3-4 dages levering" teksten i alle andre faser end `UNDER MIXING` (`portal.html`).

## 🚀 Phase 12 — Fase-Betinget Visning i Kunde-Hub, Dynamisk Titelskift & Lokal Audio-Streaming
- [x] `portal.html`: Fase-betinget visning (skjul afspiller/feedback i DEPOSIT_PAID og UNDER_MIXING, vis kvittering/status).
- [x] `portal.html`: Dynamisk titelskift ved valg af mix-version.
## 🚀 Phase 13 — Admin Filstyring, Runde-specifik Feedback & Intern Tjekliste
- [x] `GEMINI.md`: Opdateret schema for `revisionNotes`, `mixingChecklist` og `storageLinks`.
- [x] `portal.html`: Ny statusbesked ("Vi ses til indspilning...") under tracking.
- [x] `admin.html`: Slet/Omdøb Mix Versioner og tilføj Final WAV Link.
- [x] `admin.html`: Filtrering af feedback efter aktiv runde i projektmodalen.
- [x] `admin.html`: Interaktiv Mixing-tjekliste indsat under UNDER_MIXING.
- [x] `admin.html`: Kanban kort fremviser aktiv revision runde badge.
## 🚀 Phase 15 — Oversættelse, Validering & Dobbeltkontrol
- [x] `GEMINI.md`: Opdateret schema for `billingAddress` og `vatValid`.
- [x] `portal.html`: Fuld DA/EN placeholder oversættelse.
- [x] `portal.html`: Fuld landeliste + CVR-validering (kun DK).
- [x] `portal.html`: Dobbeltkontrol på Logud via confirm-dialog.
- [x] `tools/stem-ingest.js`: Fix NaN MB størrelsesvisning + Slet-knap til filer.
- [x] `portal.html`: Revisioner (tidsstemplede + generel) tilknyttes aktiv `roundNumber` og synkroniseres straks til Admin ved submit.
- [x] `admin.html`: Fix versions-funktioner så de gemmes korrekt via `saveProjects()`.
- [x] `admin.html`: Tilføj 'Slet Projekt Permanent' farezone-knap i projektmodal.
- [x] `tools/portal-auth.js`: Sæt `approvedAt` ved skift til `APPROVED_FINAL_PAID`.
- [x] `admin.html`: 30-dages auto-arkivering logic i `renderKanban()`.
- [x] `admin.html`: Ny checkbox til at vise/skjule Arkiverede projekter på Kanban-brættet.

## 🚀 Phase 16 — Feedback Clean-Up & Mac Filtrering
- [x] `GEMINI.md`: Fjernet `aiTechnicalAction` og forsimplet feedback schema.
- [x] `admin.html`: Fjernet AI-kolonne og layout i Admin Dashboard.
- [x] `portal.html`: Fuld DA/EN oversættelse (Upload sektion).
- [x] `tools/stem-ingest.js`: Mac filfiltrering (`._` og `.DS_Store`) og oversat fil-tæller.
- [x] `tools/feedback-engine.js`: Ren rendering uden AI HTML og logik.

## 🚀 Phase 17 — Admin Oprydning, Batch-Sletning & Fixes
- [x] `admin.html`: Fjernet Feedback og Webhooks sektioner/navigation.
- [x] `portal.html`: `data-da` og `data-en` attributter indsat for garanteret engelsk oversættelse.
- [x] `portal.html`: Batch-sletning for en hel sang.
- [x] `tools/stem-ingest.js`: Batch-sletning for en hel kategori, samt rettelse af NaN MB.

## 🚀 Phase 18 — Reparation af JS-Fejl i Upload & Sikker ID-baseret Sletning
- [x] `gemini.md`: Tilføjet ID til `stems` schema.
- [x] `portal.html`: Fjernet kald til `bindUploads()` for at forhindre fejl ved `clearSongFiles`.
- [x] `portal.html`: Sletning af en hel kategori eller enkeltfil refererer nu sikkert til filen/sangen frem for index.
- [x] `tools/stem-ingest.js`: Null-guard tilføjet ved container-render og ID/størrelses-håndtering optimeret.

## 🚀 Phase 19 — Obligatorisk Faktura-Validering
- [x] `gemini.md`: Opdateret schema for `billingAddress`.
- [x] `portal.html`: Validering af tomme felter pålagt i `payDeposit()`.
- [x] `portal.html`: Implementeret blød rulle-animation og visuel fejlmarkering for tomme felter.
- [x] `portal.html`: Dynamisk fjernelse af fejl via `clearBillingError(inputEl)`.

## 🚀 Phase 20 — Dobbeltkontrol & Mix-Versions Styring
- [x] `portal.html`: Oprettet og implementeret mørk sikkerhedsmodal for Log Ud.
- [x] `portal.html`: Validering for indsendelse af revision (kræver general eller specifik note) samt bekræftelsesmodal der oplyser om at runden låses.
- [x] `portal.html`: `initHubAudio()` gennemsøger nu `mixVersions`, finder højeste versionsnummer og sætter automatisk denne som aktiv (audio src + UI badge + titel).

## 🚀 Phase 21 — Admin Gatekeeper, Manuel Restbeløb & Tilfredshedsgaranti
- [x] `admin.html`: Implementeret sikker login-skærm for `dinesenfrederik@gmail.com` med adgangskode.
- [x] `admin.html`: Tilføjet blyantsikon til redigering af restbeløb i projekt-modalen (overskriver statisk finalAmount).
- [x] `admin.html`: Tilføjet "Udløs Refundering" knap med validering for beløb og årsag (ændrer status til REFUNDED).
- [x] `portal.html`: Hvis status er REFUNDED, skjules Kunde-Hub'en automatisk bag en "Projekt Afsluttet" væg. Slutbetalingen trækker desuden nu dynamisk på manuelt korrigerede restbeløb.

## 🚀 Phase 24 — Dedikeret Flow for Gratis Test-Mix
- [x] `gemini.md`: Tilføjet `testMixRequest` schema og opdateret regler for test-mix.
- [x] `portal.html`: Revisions-sektion låst/skjult og "Godkend & Betal" knap udskiftet med "Opgrader til Fuldt Mix" for test-mix projekter.
- [x] `portal.html`: Implementeret funktion `requestFullMix()` med bekræftelse og datalagring.
- [x] `admin.html`: Test Mix projekter rykker automatisk tilbage til `UNDER_MIXING` ved anmodning om fuldt mix.
- [x] `admin.html`: FULDT MIX ANMODET badge vises i Kanban og projekt-modal. Kundens anmodningsbesked vises i modalen.

## 🚀 Phase 25 — Opgradering fra Test-Mix til Fuldt Mix
- [x] `gemini.md`: Tilføjet `isUpgradedFromTestMix` schema flag og opdateret regler for revisions-offset.
- [x] `admin.html`: `simulateUploadMix` (v2) ændrer automatisk projekttype, fjerner test-mix flaget og sætter status til `DRAFT_DELIVERED`.
- [x] `portal.html`: UI reagerer på `isUpgradedFromTestMix` ved at skifte titel til "Mixing", tilføje `Opgraderet til fuld produktion` badge, og låse bølgeformen og feedback op.
- [x] `portal.html`: Fejl i visning af nuværende runde (`curR`) rettet, så den altid viser `(currentRound || 0) + 1`, hvilket lader opgraderede test-mix starte korrekt på Runde 1 for v2.

## 🚀 Kontaktformular Opdatering
- [x] GEMINI.md: Opdateret schema for `contactFormPayload` med valgfrit `musicReferenceLink`.
- [x] index.html: Tilføjet nyt input-felt ("Link til demo eller tidligere musik") med oversættelser.
- [x] form.js: Tilføjet form submission interceptor for at udtrække JSON payload med det nye link og printe til console.

---

## 🚀 Phase 27 — B.L.A.S.T. Dekommissionering af Projektstyring & Forenkling af Landing Page
- [x] `gemini.md`: Fjernet dataskemaer tilknyttet portal, admin, session og kanban. Fastlagt henvendelses- og præsentationslogik.
- [x] Fil-dekommissionering: Permanent slettet `portal.html`, `admin.html`, `tools/portal-auth.js`, `tools/stem-ingest.js`, `tools/feedback-engine.js`, `tools/webhook-triggers.js`, `tools/client-hub.js`, `tools/modal.js` samt tilhørende SOPs (`SOP-002`, `SOP-005`, `SOP-006`).
- [x] `index.html`: Fjernet `Workflow` fra topnavigationen (kun `Portefølje`, `Priser`, `Kontakt`, sprog/valuta og CTA tilbage).
- [x] `index.html`: Slettet hele `<section id="workflow">` (Digital Kunde-Hub / interaktiv demo) fra DOM'en.
- [x] `index.html`: Opdateret tekst i prissektionen (fjernet "via kundeportalen" &rarr; "5 konsoliderede revisionsrunder inkluderet").
- [x] `index.html`: Fjernet script-referencen til `tools/client-hub.js`.
- [x] `main.js`: Renset modul-import til kun at inkludere de aktive landingsside-scripts.
- [x] `tools/form.js`: Implementeret ren in-DOM succes-tilstand (ingen native alert-dialoger, ingen portalsøgning, tosproget DA/EN med reset-knap).
- [x] B.L.A.S.T. Verifikation: Testet landingsside, responsivitet, navigationsflow, formular-afsendelse og bekræftet fravær af fejl.

---

## 🚀 Phase 28 — Installation og Konfiguration af "creating-skills" Meta-Skill
- [x] `gemini.md`: Registreret `creating-skills` under Sektion 4.4 med path, description og trigger-regler.
- [x] Mappestruktur: Oprettet `.agent/skills/creating-skills/` samt `resources/`.
- [x] Specifikation: Oprettet `SKILL.md` i overensstemmelse med Antigravity Skill-standarden (YAML frontmatter, formål, workflow og instruktioner).
- [x] Runtime-synkronisering: Sikret kompatibilitet med både `.agent/` og `.agents/` customization roots.

---

## 🚀 Phase 29 — Installation og Konfiguration af "publishing-websites" Skill (GitHub + Vercel)
- [x] `gemini.md`: Registreret `publishing-websites` under Sektion 4.4 med prerequisiteState og trigger-regler.
- [x] Mappestruktur: Oprettet `.agent/skills/publishing-websites/` samt `resources/`.
- [x] Specifikation: Oprettet `SKILL.md` i henhold til Antigravity Skill-standarden (7-trins workflow fra præ-tjek til live verifikation).
- [x] Runtime-synkronisering: Synkroniseret til `.agents/skills/publishing-websites/` for optimal discovery i Antigravity-motoren.

---

## 🚀 Phase 30 — Sikker Integration af "designing-interfaces" Skill (UI/UX Pro Max)
- [x] `gemini.md`: Registreret `designing-interfaces` under Sektion 4.4 med scopeRestriction (passiv vidensbase).
- [x] Eksternt Repo: Klonet `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git` til `.tmp/ui-ux-pro-max/`.
- [x] Vidensbase: Overført style guides, designheuristikker (`styles.csv`, `colors.csv`, `typography.csv` mv.) og dokumentation til `.agent/skills/designing-interfaces/resources/`.
- [x] Oprettet `SKILL.md`: Konfigureret med operating rules, workflow checkliste og referencearkitektur.
- [x] Oprydning: Renset `.tmp/ui-ux-pro-max/` fuldstændigt.
- [x] Integritetskontrol: Bekræftet at ingen eksisterende produktionskode eller design i sitet blev ændret.

---

## 🚀 Phase 31 — Sikker Installation og Strukturering af "executing-superpowers" Skill
- [x] `gemini.md`: Registreret `executing-superpowers` under Sektion 4.4 med isolationRule.
- [x] Eksternt Repo: Klonet `https://github.com/obra/superpowers.git` til `.tmp/superpowers/`.
- [x] Mappestruktur: Etableret `.agent/skills/executing-superpowers/` med `SKILL.md`, `scripts/` og `resources/`.
- [x] Værktøjsopsætning: Overført hjælpescripts og workflow-moduler (systematic debugging, TDD, planning mv.) til henholdsvis `scripts/` og `resources/`.
- [x] Oprydning: Renset `.tmp/superpowers/` fuldstændigt.
- [x] Runtime-synkronisering: Synkroniseret til `.agents/skills/executing-superpowers/` for optimal discovery i Antigravity-motoren.
- [x] Isolationskontrol: Bekræftet at ingen produktionsfiler eller website-aktiver er blevet ændret.

---

## 🚀 Phase 32 — Sikker Etablering af "handling-errors" Skill som Passiv Vidensbase
- [x] `gemini.md`: Registreret `handling-errors` under Sektion 4.4 med isolationRule (passiv vidensbase).
- [x] Mappestruktur: Etableret `.agent/skills/handling-errors/` med `SKILL.md` og `resources/`.
- [x] Specifikation: Oprettet `SKILL.md` med operating principles, 4 kernemønstre (Try-Catch-Isolate, Exponential Backoff, Graceful Fallbacks, Actionable Logging) og workflow checkliste.
- [x] Runtime-synkronisering: Synkroniseret til `.agents/skills/handling-errors/` for optimal discovery i Antigravity-motoren.
- [x] Isolationskontrol: Bekræftet at ingen produktionsfiler på sitet er berørt.

---

## 🚀 Phase 33 — Inspektion og Konfiguration af Mail-Videresendelse fra Kontaktformular
- [x] Inspektion: Analyseret kontaktformularen i `index.html` og `tools/form.js` og dokumenteret fund i `findings.md`.
- [x] Data Schema & Registry: Opdateret `gemini.md` (Integration Registry & Sektion 4.2 `contactFormPayload`) til direkte levering til `dinesenfrederik@gmail.com` via Web3Forms API.
- [x] Arkitektur: Opdateret `architecture/SOP-004-contact-form.md` med Web3Forms dispatch-flow, knap-loader, in-DOM fejl- og succes-håndtering.
- [x] Implementering: Udviklet `tools/form.js` med `WEB3FORMS_ACCESS_KEY` konfigurationsvariabel, loading-spinner på submit-knap, dev/mock fallback-tilstand, in-DOM fejlvisning og formularenulstilling.
- [x] B.L.A.S.T. Verifikation: Gennemført end-to-end test i browser med browser-subagent (input-udfyldelse, loading-indikator, visuel bekræftelseskort med demoreference og succesfuld formular-nulstilling).

---

## 🚀 Phase 34 — Total Gennemgående Test af Hjemmesiden, Fejludbedring & Rapport
- [x] Testkriterier & Verifikationsregler: Fastlagt i `gemini.md` under Sektion 5 som ufravigelig standard.
- [x] Kode- og Ressource-Remediering:
  - Indsat inline SVG favicon i `index.html` for at fjerne 404 fejl på `/favicon.ico`.
  - Tilføjet komplet responsiv mobilmenu (hamburger toggle + drawer med sektionslinks og CTA).
  - Rettet waveform-bjælker i `tools/audio-player.js` så de dynamisk farves amber synkront med playhead.
  - Løst HTML syntaksfejl i hero-sektionen ved at adskille Material ikon fra i18n attributter.
  - Sikret sprog- og valutauafhængighed i rabatbadge (`2.187,50 DKK` / `€295,00`).
  - Ændret `cf-music-ref` til `type="text"` så SoundCloud/Spotify/Dropbox demo-links aldrig blokeres unødigt af URL-formatering.
  - Tilføjet touch-events til `canvas-particles.js` og sikret `overflow-x: hidden` og `width: 100%` i `style.css`.
- [x] Automatiseret Audit: Gennemført fuld end-to-end verifikation (`test_suite.py` og `dom_simulation.py`):
  - 17/17 CDN audio-filer testet med HTTP 200 OK.
  - 88/88 `data-da` til `data-en` paritet verificeret.
  - 5/5 `data-dkk` til `data-eur` paritet verificeret.
  - 0 døde referencer til gamle portalsider.
  - Web3Forms API og formvaliditet verificeret.
- [x] Dokumentation: Komplet statusrapport tilføjet til `findings.md`.

---

## 🚀 Phase 35 — Live Deployment til Vercel og Tilknytning af Custom Domæne (frederikdinesen.com)
- [x] `gemini.md`: Opdateret Sektion 6 med `deploymentConfiguration` schema og aktiv konfiguration (Vercel Production, `frederikdinesen.com`, Squarespace Domains).
- [x] Pre-Flight Checks:
  - Verificeret Vercel CLI autentificering (`dinesenfrederik-6846`).
  - Etableret `.gitignore` for at udelukke `.DS_Store`, `.tmp/`, `node_modules/`, `.env*` og `.vercel/`.
  - Initialiseret Git repository, sat default branch til `main`, og committet ren udgivelse (`feat: production release ready for live domain`).
- [x] Vercel Production Deploy:
  - Udrullet projekt til produktion via `vercel --prod --yes --name frederikdinesen-com`.
  - Verificeret deployment URL `https://frederikdinesen-com.vercel.app` med HTTP/2 200 OK.
- [x] Custom Domænetilknytning:
  - Apex domæne `frederikdinesen.com` tilknyttet projektet.
  - Subdomæne `www.frederikdinesen.com` tilknyttet projektet (viderestiller til apex).
- [x] DNS Konfiguration:
  - Udviklet præcis DNS-oversigt for Squarespace Domains (A-record `@` -> `76.76.21.21` og CNAME `www` -> `cname.vercel-dns.com`).
  - Dokumenteret i `findings.md` og brugervejledning.









