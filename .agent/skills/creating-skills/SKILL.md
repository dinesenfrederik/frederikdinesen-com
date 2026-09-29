---
name: creating-skills
description: Generates standardized, high-quality, and predictable Antigravity agent skills. Use whenever the user requests the creation, scaffolding, or generation of new skills, automated tool workflows, or agent capabilities.
---

# Creating Skills

## When to use this skill
- Brugeren beder om at oprette eller udvide agentens færdigheder (fx "Byg et skill til...", "Lav et workflow for...").
- Nye opgaver kræver en struktureret SOP med tilhørende hjælpescripts (`scripts/`) eller skabeloner (`resources/`).

## Workflow
1. **Afklar formål og triggers:** Identificer opgavens afgrænsning og nøgleord.
2. **Opret mappestruktur:**
   - `.agent/skills/[gerund-name]/`
   - `SKILL.md` (Obligatorisk: Maksimalt 500 linjer, progressiv afsløring)
   - `scripts/` (Valgfrit: Deterministiske hjælpescripts)
   - `examples/` (Valgfrit: Reference-implementationer)
   - `resources/` (Valgfrit: Skabeloner/aktiver)
3. **Validering:** Efterprøv YAML frontmatter (gerund form, 3. persons beskrivelse, ingen forbudte ord som "claude" eller "anthropic").
4. **Registrering:** Dokumenter den nye færdighed i projektets konstitution (`gemini.md`).

## Instructions
- Navnestandard: Brug altid udsagnsord i ing-form (gerund), kun små bogstaver, tal og bindestreger (fx `converting-audio`, `optimizing-images`).
- Paths: Anvend altid forward slashes (`/`), aldrig backslashes (`\`).
- Progressive Disclosure: Hold `SKILL.md` koncis og henvis til sekundære filer i mappen ved mere end 500 linjers kompleksitet.
