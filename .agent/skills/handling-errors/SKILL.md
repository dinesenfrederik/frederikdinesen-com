---
name: handling-errors
description: Standardized error handling patterns, resilient execution loops, retry logic, and diagnostic strategies. Use as a reference architecture when debugging, writing scripts, or implementing failure-resistant workflows.
---

# Handling Errors (Resilient Patterns)

## When to use this skill
- Agenten designer nye scripts, værktøjer eller integrationer, der kræver deterministisk fejlsikring.
- Diagnosticering af uventede runtime-fejl, terminal-nedbrud eller fejlslagne processer.
- Implementering af retry-strategier (exponential backoff) eller fallback-adfærd.

## Operating Principles
- **Passiv reference:** Dette skill er en arkitektonisk vejledning og må ikke ændre eksisterende produktionskode uden eksplicit brugerordre.
- **Fail Fast, Fail Cleanly:** Fejl skal opfanges deterministisk med klare fejlbeskeder frem for tavse fejl eller programnedbrud.
- **Root Cause Isolation:** Diagnosticer rodårsagen før der patches; gæt aldrig på fejlen.

## Core Architectural Patterns
1. **Try-Catch-Isolate:** Indkapsl altid sårbare eksterne I/O- og netværkskald.
2. **Exponential Backoff:** Ved netværks- eller API-fejl, gentag forsøg med tiltagende intervaller før afbrydelse.
3. **Graceful Fallbacks:** Hvis en sekundær hjælpefunktion fejler, lever et sikkert default-output frem for at afbryde hele kørslen.
4. **Actionable Logging:** Logpræfikser skal angive kontekst (f.eks. `[ERROR][Network]`, `[WARN][FileSystem]`) og foreslå næste udbedringstrin.

## Workflow Checklist
- [ ] 1. Identificer fejltype og sårbarhedszone
- [ ] 2. Vælg relevant mønster (Isolation, Retry, Fallback eller Logging)
- [ ] 3. Valider rettelsen lokalt uden at påvirke eksterne moduler
- [ ] 4. Dokumenter erfaringen i `findings.md`
