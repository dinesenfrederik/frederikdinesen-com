---
name: executing-superpowers
description: Provides advanced automation utilities, environment diagnostic helpers, and robust CLI workflow tools. Use when handling complex multi-step terminal tasks, system inspections, or automated developer workflows.
---

# Executing Superpowers

## When to use this skill
- Agenten skal udføre avancerede automatiseringer eller systemhandlinger i udviklingsmiljøet.
- Diagnostik af runtime-miljø, filstrukturer eller komplekse terminalprocesser.
- Behov for præfabrikerede hjælpefunktioner fra `scripts/` til vedligeholdelse af kodebasen.

## Operating Rules
- Kør altid hjælpescripts med `--help` eller i test-tilstand først for at validere input/output.
- Anvend altid relative stier med forward slash (`/`).
- Alle midlertidige operationer skal foregå isoleret i `.tmp/`.
- Rør aldrig produktionsfiler eller website-aktiver uden eksplicit brugerinstruks.

## Workflow Checklist
- [ ] 1. Identificer den specifikke hjælpefunktion eller script i `scripts/`
- [ ] 2. Valider forudsætninger og miljøvariable
- [ ] 3. Udfør opgaven i et isoleret trin
- [ ] 4. Verificer output og ryd midlertidige data op i `.tmp/`

## Resources & SOP Modules in resources/
- `resources/skills/`:
  - `systematic-debugging/`: Struktureret metode til identifikation og løsning af root-causes.
  - `test-driven-development/`: Red-Green-Refactor cyklusser for robust udvikling.
  - `writing-plans/` & `executing-plans/`: Fase-opdelt eksekvering med checkpoints.
  - `verification-before-completion/`: Afsluttende verifikationsprocedurer før godkendelse.
  - `subagent-driven-development/`: Sikker uddelegering til parallelle subagenter.
  - `using-git-worktrees/`: Isolerede arbejdsmiljøer til parallelle ændringer.
- `resources/scripts/`: Automatiserede shell-scripts til vedligeholdelse og versionsstyring.
