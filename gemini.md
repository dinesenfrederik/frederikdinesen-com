# 📜 GEMINI.MD — Project Constitution
**Project:** FDSL Website v2.0  
**Protocol:** B.L.A.S.T. + A.N.T. Architecture  
**Status:** 🟢 APPROVED — Blueprint Active  
**Last Updated:** 2026-09-29

> ⚠️ This document is the single source of truth. All code, tools, and architecture must conform to the rules defined here. Update this document BEFORE modifying any code.

---

## 1. 🎯 North Star

> **Byg den komplette, produktionsklare frontend- og henvendelsesside for FD Sound Labs — der fungerer som den primære salgs-, præsentations- og konverteringsside med en rå, mørk metal-æstetik, interaktiv før/efter-lydafspiller, gennemskuelige priser og et strømlinet henvendelsesflow uden overflødige eksterne afhængigheder.**

---

## 2. 🏗️ Architectural Invariants

Disse regler er **ikke til forhandling** og gælder for alle moduler:

1. **SOPs First:** Arkitekturdokumenter i `architecture/` skal altid afspejle den aktive kodebase.
2. **Atomic Tools:** Hvert script i `tools/` gør præcis én ting og kan testes uafhængigt.
3. **Tmp for Intermediate:** Alle midlertidige filer placeres i `.tmp/` — aldrig committed.
4. **No Guessing:** Hvis forretningslogik er tvetydig, stop og spørg. Antag intet.
5. **Data Schema is Law:** Alle inputs og outputs skal overholde skemaerne i sektion 4.
6. **Self-Healing:** Scripts håndterer fejl elegant og logger status.
7. **Rent Henvendelsesflow:** Hjemmesiden har intet internt projektstyringssystem eller kundeportal. Filer, tracks og korrespondance udveksles udelukkende eksternt (e-mail, Google Drev, WeTransfer).

---

## 3. 🔗 Integration Registry

| Service | Purpose | Env Var | Status |
|---------|---------|---------|--------|
| Tailwind CSS | Styling framework | N/A (CDN/Local) | 🟢 Approved |
| Google Fonts | Typografi (Inter, JetBrains Mono) | N/A | 🟢 Approved |
| Web Audio API | Lydgengivelse & bølgeform A/B | N/A (Native HTML5) | 🟢 Approved |
| GitHub Raw CDN | Hosting af MP3-filer til portefølje | N/A (Public URLs) | 🟢 Approved |
| Kontaktformular (Web3Forms) | Direkte henvendelse til dinesenfrederik@gmail.com | WEB3FORMS_ACCESS_KEY | 🟢 Configured |
| Vercel Web Analytics | Besøgsstatistik & performance-tracking | N/A (/_vercel/insights) | 🟢 Configured |


---

## 4. 📐 Data Schemas

### 4.1 Audio Track State (Input Schema for Audio Player)
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "title": { "type": "string" },
    "audioUrlPre": { "type": "string", "format": "uri" },
    "audioUrlFinal": { "type": "string", "format": "uri" },
    "stage": { "type": "string", "enum": ["pre-mix", "final"] },
    "duration": { "type": "number" },
    "currentTime": { "type": "number" },
    "isPlaying": { "type": "boolean" }
  },
  "required": ["id", "title", "audioUrlPre", "audioUrlFinal", "stage"]
}
```

### 4.2 Form Payload (Output Schema for Kontaktformular)
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "contactFormPayload",
  "type": "object",
  "destinationEmail": "dinesenfrederik@gmail.com",
  "submissionService": "Web3Forms",
  "endpoint": "https://api.web3forms.com/submit",
  "properties": {
    "name": { 
      "type": "string",
      "description": "Afsenders navn / kontaktperson"
    },
    "band": { 
      "type": "string",
      "description": "Band- eller artistnavn"
    },
    "email": { 
      "type": "string", 
      "format": "email",
      "description": "Afsenders kontakt-email"
    },
    "service": { 
      "type": "string",
      "description": "Valgt ydelse (f.eks. Gratis Test-Mix, Full Mix osv.)"
    },
    "musicReferenceLink": { 
      "type": "string", 
      "description": "Link til demo eller tidligere musik (valgfrit: Spotify, SoundCloud, YouTube, Google Drev, Dropbox)." 
    },
    "message": { 
      "type": "string",
      "description": "Noter og projektbeskrivelse"
    }
  },
  "required": ["name", "band", "email", "service"]
}
```

### 4.3 Forretningslogik for Henvendelser & Ydelser
- **Hjemmesidens Rolle:** Fungerer udelukkende som præsentations- og henvendelsesside.
- **Filudveksling:** Håndteres manuelt og eksternt via direkte e-mail, Google Drev eller WeTransfer efter den indledende kontakt.
- **Kontaktformular:** Modtager henvendelsen, validerer påkrævede felter og afleverer beskeden direkte til administratorens e-mail (`dinesenfrederik@gmail.com`).
- **Gratis Test-Mix:** Kunder kan anmode om et uforpligtende test-mix ved at vælge "Gratis Test-Mix" i formularen og indsætte et reference- eller demolink.
- **Ingen Intern Portal:** Der oprettes ingen automatiske brugerprofiler, koder eller logins på siden. Kunden præsenteres for en klar succesbekræftelse efter indsendelse.

### 4.4 Installed Skills (Færdighedsregistrering)
- `creating-skills`:
  - **Path:** `.agent/skills/creating-skills/SKILL.md`
  - **Description:** Genererer og strukturerer nye agent-skills i henhold til Antigravitys officielle standarder. Aktiveres når brugeren anmoder om at bygge, oprette eller installere nye færdigheder eller workflows.
  - **Trigger Rules:** Skal udløses proaktivt, når brugeren udtrykker ønsker som *"Byg et nyt skill..."*, *"Lav en færdighed til..."* eller *"Opret et workflow for..."*.
- `publishing-websites`:
  - **Path:** `.agent/skills/publishing-websites/SKILL.md`
  - **Description:** End-to-end workflow til at versionere kode på GitHub og publicere/opdatere statiske sider live på Vercel med automatiske login-tjek og fejlhåndtering. Aktiveres når brugeren anmoder om at udgive, deploye, hoste eller lægge et website online.
  - **Prerequisite State:**
    - `gitHubAuth`: Kontrolleres via `gh auth status`.
    - `vercelAuth`: Kontrolleres via `vercel whoami`. Hvis mangler, instrueres brugeren interaktivt i terminalen med enhedskode.
  - **Trigger Rules:** Skal udløses proaktivt, når brugeren anmoder om at *"udgive"*, *"deploye"*, *"gøre siden live"*, *"lægge den online"* eller *"pushe til GitHub"*.
- `designing-interfaces`:
  - **Path:** `.agent/skills/designing-interfaces/SKILL.md`
  - **Description:** Omfattende UI/UX designsystem, komponentmønstre og styling-heuristikker baseret på UI/UX Pro Max. Bruges når brugeren anmoder om visuelle forbedringer, layout-design, styling af komponenter, farveharmoni eller moderne UI/UX-mønstre.
  - **Scope Restriction:** Passiv vidensbase. Aktiveres kun ved eksplicitte designopgaver. Må aldrig automatisk ændre eksisterende sidestrukturer uden brugeranmodning.
- `executing-superpowers`:
  - **Path:** `.agent/skills/executing-superpowers/SKILL.md`
  - **Description:** Omfattende sæt af avancerede agent-automatiseringer, systemoperationer og fejlfindings-værktøjer baseret på obra/superpowers. Aktiveres når agenten skal udføre komplekse filanalyser, automatiserede terminalhandlinger eller dybdegående projektinspektion.
  - **Isolation Rule:** Strengt internt agent-værktøj. Ingen visuel eller funktionel påvirkning af produktionsfiler på websitet.
- `handling-errors`:
  - **Path:** `.agent/skills/handling-errors/SKILL.md`
  - **Description:** Mønstre, strategier og best practices til robust fejlhåndtering, fejlisolering, retry-logik og fejllogning. Bruges udelukkende som reference ved fremtidig udvikling af scripts eller fejlsøgning.
  - **Isolation Rule:** Strengt passiv vidensbase. Må aldrig udløse automatiske refaktoringer eller ændringer i eksisterende frontend-kode uden eksplicit brugeranmodning.

---

## 5. 🧠 Behavioral Rules

### Tone & Voice
- **Visuals:** Rå, mørk rock/metal-æstetik. Minimalistisk, tung og professionel.
- **Farver:** Obsidian `#000000`, dybe Zinc-toner (`#09090b`, `#18181b`), Amber `#FF9F0A` for CTA og visuelle accenter.
- **Typografi:** Inter til brødtekst, JetBrains Mono til tekniske specifikationer og tal.

### Accessibility (WCAG 2.1 AA)
- **Kontrast:** Minimum 4.5:1 for normal brødtekst og 3:1 for store overskrifter og grafiske UI-komponenter (`zinc-300`/`zinc-400` mod mørk baggrund).
- **Tastatur:** Fuld tilgængelighed for alle interaktive elementer (afspilning, volumen/seek, A/B toggle, formularer).
- **Fokusstyring:** Tydelige fokusindikatorer (`focus-visible:ring-2 focus-visible:ring-amber-500`).

### Logic Constraints
- Alle priser skifter deterministisk mellem DKK og EUR uden sideskift.
- Al tekst skifter mellem DA og EN uden layoutforskydninger.
- Lydafspillere er gensidigt udelukkende (kun ét nummer afspilles ad gangen).
- Bølgeformer og playheads synkroniseres præcist med lydens tidsstempel.
- **Forbud mod native browser-alerts:** Dialoger og bekræftelser skal vises med stilrene, integrerede in-DOM komponenter.

### 🧪 Testkriterier & Verifikationsregler (Ufravigelig Standard)
- **Formular-integritet:**
  - Gyldig e-mail og felter trigger korrekt afsendelse via Web3Forms API (`dinesenfrederik@gmail.com`).
  - Feltet `LINK TIL DEMO ELLER TIDLIGERE MUSIK` er 100% valgfrit og må ikke blokere indsendelse hvis tomt.
  - Fejlhåndtering ved ugyldige inputs (f.eks. manglende navn eller forkert e-mailformat) fanges i browseren/DOM'en før afsendelse.
  - Succes-tilstand nulstiller felter og viser bekræftelsestekst uden reload eller crash.
- **Interaktivitet & Lydafspillere:**
  - Samtlige audio-elementer og afspil/pause-knapper fungerer gnidningsfrit uden overlap eller konsolfejl.
  - Skift mellem Før-mix og Færdigt mix bevarer tidsstempel og synkroniserer bølgeformsbjælker.
- **Navigation & Links:**
  - Alle ankerlinks i topmenuen, mobilmenuen og footeren (`Portefølje`, `Priser`, `Kontakt`, `Få dit gratis test-mix`) scroller jævnt (smooth scroll) til de korrekte sektioner uden døde referencer.
  - Ingen efterladte links eller referencer til det slettede "Workflow"-modul eller de slettede portalsider (`portal.html`, `admin.html`).
- **Sprog & Valuta:**
  - Skift mellem `DA` og `EN` opdaterer alle overskrifter, placeholders, hjælpetekster og knapper synkront.
  - Skift mellem `DKK` og `EUR` konverterer og formaterer alle prisangivelser korrekt uden sproglig desynkronisering.
- **Responsivitet & Layout:**
  - Layoutet skal være 100% fejlfrit på tværs af Viewports (Mobil: 375px/390px, Tablet: 768px, Desktop: 1280px/1440px+).
  - Ingen uønsket horisontal scroll (`overflow-x: hidden`), knækkede tekstlinjer eller overlappende knapper.

---

## 6. 📦 Delivery Specification & Deployment Configuration

### 6.1 Deployment Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "deploymentConfiguration",
  "type": "object",
  "properties": {
    "targetPlatform": { "type": "string", "enum": ["Vercel (Production)"] },
    "repository": { "type": "string", "description": "GitHub repository for project" },
    "primaryDomain": { "type": "string", "enum": ["frederikdinesen.com"] },
    "redirectDomain": { "type": "string", "enum": ["www.frederikdinesen.com"] },
    "dnsProvider": { "type": "string", "enum": ["Squarespace Domains"] }
  },
  "required": ["targetPlatform", "repository", "primaryDomain", "redirectDomain", "dnsProvider"]
}
```

### 6.2 Active Configuration
- **Target Platform:** Vercel (Production)
- **Repository:** GitHub (`dinesenfrederik/frederikdinesen-com` — [https://github.com/dinesenfrederik/frederikdinesen-com](https://github.com/dinesenfrederik/frederikdinesen-com))
- **Primary Domain:** `frederikdinesen.com`
- **Redirect Domain:** `www.frederikdinesen.com` (redirects to apex root)
- **DNS Provider:** Squarespace Domains
- **Delivery Method:** Lokale statiske filer (HTML/CSS/JS) via Git Push & Vercel CLI
- **Format:** Modulær Vanilla JS + Tailwind CSS + HTML5
- **Trigger:** Git Commit & Push / Vercel CLI Deploy

---

## 7. 📁 Directory Structure

```
FDSL - website v2.0/
├── .agent/skills/       # Agent Skills & Meta-capabilities
│   ├── creating-skills/
│   │   ├── SKILL.md
│   │   └── resources/
│   ├── publishing-websites/
│   │   ├── SKILL.md
│   │   └── resources/
│   ├── designing-interfaces/
│   │   ├── SKILL.md
│   │   └── resources/
│   ├── executing-superpowers/
│   │   ├── SKILL.md
│   │   ├── scripts/
│   │   └── resources/
│   └── handling-errors/
│       ├── SKILL.md
│       └── resources/
├── index.html           # Main presentation & conversion landing page
├── style.css            # Base stylesheet & animations
├── main.js              # Application entry point
├── gemini.md            # ← Project Constitution (this file)
├── task_plan.md         # Phase plan & checklists
├── progress.md          # Execution log & history
├── architecture/        # SOPs
│   ├── SOP-001-audio-player.md
│   ├── SOP-003-i18n-currency.md
│   └── SOP-004-contact-form.md
├── tools/               # Atomic scripts
│   ├── audio-player.js
│   ├── canvas-particles.js
│   ├── form.js
│   └── i18n-currency.js
└── .tmp/                # Intermediate operations (never commit)
```

---

## 8. 🛡️ Maintenance Log

| Date | Author | Change | Reason |
|------|--------|--------|---------|
| 2026-08-28 | System Pilot | Initial constitution created | Protocol 0 Initialization |
| 2026-08-28 | System Pilot | Populated Discovery Schemas | Phase 1 Blueprint Approved |
| 2026-08-28 | System Pilot | Added Portal/Admin schemas | Phase 3 Build Complete |
| 2026-09-29 | System Pilot | Controlled Decommissioning: Removed portal & admin systems, simplified to presentation/inquiry page | User Directive / Clean Architecture |
| 2026-09-29 | System Pilot | Installed Meta-Skill `creating-skills` in `.agent/skills/creating-skills/` | User Directive / Standardized Skill Generation |
| 2026-09-29 | System Pilot | Installed Skill `publishing-websites` in `.agent/skills/publishing-websites/` | User Directive / Automated GitHub & Vercel Deployment |
| 2026-09-29 | System Pilot | Integrated Skill `designing-interfaces` (UI/UX Pro Max) in `.agent/skills/designing-interfaces/` | User Directive / Isolated UI/UX Knowledge Base |
| 2026-09-29 | System Pilot | Installed Skill `executing-superpowers` in `.agent/skills/executing-superpowers/` | User Directive / Advanced Automation & Workflows |
| 2026-09-29 | System Pilot | Installed Skill `handling-errors` in `.agent/skills/handling-errors/` | User Directive / Passive Resilient Knowledge Base |
| 2026-09-29 | System Pilot | Live Production Deployment to Vercel & Custom Domain Configuration (`frederikdinesen.com`) | User Directive / Production Release |
| 2026-09-29 | System Pilot | Integrated Vercel Web Analytics (@vercel/analytics & /_vercel/insights) | User Directive / Analytics Setup |


