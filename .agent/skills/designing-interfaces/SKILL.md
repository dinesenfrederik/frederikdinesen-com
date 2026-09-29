---
name: designing-interfaces
description: Applies advanced UI/UX principles, modern dark-mode aesthetics, ergonomic interaction patterns, and clean typography. Use when the user requests frontend styling, visual polish, design refactoring, component layouts, or user experience enhancements.
---

# Designing Interfaces (UI/UX Pro Max Standards)

## When to use this skill
- Brugeren beder om visuelle opgraderinger, styling eller justering af brugerfladen (UI/UX).
- Nye komponenter, formularer, knapper eller navigationsmenuer skal designes fra bunden.
- Kontrol af visuel balance, micro-interactions, typografisk hierarki og farvekontraster.

## Operating Rules
- Bevar altid det etablerede mørke studio-tema (`#0b0c0e`, amber/orange accenter, subtile borders).
- Byg videre på eksisterende struktur uden at fjerne etableret forretningslogik.
- Anvend progressiv afsløring: Konsulter `resources/` for dybdegående komponent-mønstre og design-tokens.

## Workflow Checklist
- [ ] 1. Analyse af eksisterende layout og tema-konsistens
- [ ] 2. Valg af komponentmønster fra `resources/`
- [ ] 3. Validering af visuelt hierarki, luft (spacing) og læselighed
- [ ] 4. Test på tværs af viewport-størrelser (mobil/desktop)

## Reference Architecture in resources/
- `resources/data/`:
  - `styles.csv`: 67+ designstilarter med definitioner, farvepaletter og animationer.
  - `colors.csv`: Kuraterede farvepaletter og harmonier (inkl. dark mode, accenter, kontraster).
  - `typography.csv`: Google Fonts parringer og typografiske skalaer.
  - `landing.csv`: Heuristikker for konverteringsorienterede landingssider og herosektioner.
  - `motion.csv`: Micro-interactions, transitions, easings og hover-effekter.
  - `ux-guidelines.csv` & `ui-reasoning.csv`: Ergonomi, tilgængelighed (WCAG) og visuelt hierarki.
- `resources/templates/`: Skabeloner og komponentarkitektur for moderne webgrænseflader.
- `resources/README-ui-ux-pro-max.md`: Komplet referencevejledning for UI/UX Pro Max systemet.
