# SOP-003: i18n & Currency Module
**Layer:** 1 (Architecture)  
**Target File:** `tools/i18n-currency.js`  
**Description:** Handles localization (Danish/English), currency (DKK/EUR) toggling, automatic geo-detection for non-DK visitors, and user preference persistence.

## 1. Responsibilities
- Maintain global state for `currentLang` ('da' or 'en') and `currentCurr` ('dkk' or 'eur').
- Automatically default visitors outside Denmark (non-DK) to English (`en`) and EUR (`eur`).
- Default visitors in Denmark to Danish (`da`) and DKK (`dkk`).
- Support manual toggling via `.lang-btn` and `.curr-btn` and persist user choices in `localStorage` (`fdsl_user_lang`, `fdsl_user_curr`).
- Iterate over DOM elements with `data-da`/`data-en` and `data-dkk`/`data-eur` attributes and update their contents or placeholders.
- Update the active state (CSS classes) of the toggle buttons and `document.documentElement.lang`.
- Dispatch custom event `languageChanged` for any subscribed modules.

## 2. Input/Output Schemas
**State Variables:**
- `currentLang` ('da' | 'en')
- `currentCurr` ('dkk' | 'eur')

**Input Sources:**
- User storage: `localStorage.getItem('fdsl_user_lang')`, `localStorage.getItem('fdsl_user_curr')`
- Fast synchronous heuristic: `Intl.DateTimeFormat().resolvedOptions().timeZone`, `navigator.languages`
- Authoritative Geo-IP API: `https://api.country.is` (cached in `sessionStorage.getItem('fdsl_geo_country')`)
- Debug/Test override: URL search params `?country=XX` or `?geo=XX`
- DOM Elements: `[data-da]`, `[data-en]`, `[data-dkk]`, `[data-eur]`

**Output (DOM Mutation & Persistence):**
- `.innerHTML` or `.placeholder` updates on targeted elements.
- `document.documentElement.lang` update.
- CSS class toggling (`text-amber` vs `text-zinc-400`).
- `localStorage` updates upon manual user interaction.

## 3. Behavioral Constraints
- **Zero Layout Shift:** Instant synchronous heuristic runs before DOM paints to prevent Danish/English content flicker for international visitors.
- **Fail-Safe / Self-Healing:** If Geo-IP API fails, times out (2000ms abort), or is blocked by an ad-blocker, the client gracefully falls back to the local browser heuristic without throwing errors.
- **User Agency:** Manual user choice in `localStorage` strictly overrides any geo-detection.

## 4. Execution Flow
1. Check `localStorage` for explicit user preferences.
2. If absent, apply synchronous heuristic:
   - Check if timezone is `Europe/Copenhagen` or any browser language starts with `da`.
   - If neither matches, initialize `currentLang = 'en'` and `currentCurr = 'eur'`. Otherwise default to `'da'` and `'dkk'`.
3. Render initial state immediately to DOM via `updateContent()`.
4. Run background asynchronous Geo-IP check (`api.country.is`):
   - If resolved country is NOT `DK` and user has no saved manual choice, ensure `currentLang = 'en'` and `currentCurr = 'eur'`, then call `updateContent()`.
   - If country is `DK`, keep Danish/DKK defaults.
5. Attach click listeners to `.lang-btn` and `.curr-btn`:
   - On click, update state, save to `localStorage`, and call `updateContent()`.
