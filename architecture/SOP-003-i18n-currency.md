# SOP-003: i18n & Currency Module
**Layer:** 1 (Architecture)  
**Target File:** `tools/i18n-currency.js`  
**Description:** Handles localization (Danish/English) and currency (DKK/EUR) toggling across the site.

## 1. Responsibilities
- Maintain global state for `currentLang` ('da' or 'en') and `currentCurr` ('dkk' or 'eur').
- Listen for click events on `.lang-btn` and `.curr-btn` elements.
- Iterate over DOM elements with `data-da`/`data-en` and `data-dkk`/`data-eur` attributes and update their contents or placeholders.
- Trigger side-effects (e.g., updating tooltip text in the Client Hub if a note is currently selected).
- Update the active state (CSS classes) of the toggle buttons.

## 2. Input/Output Schemas
**State Variables:**
- `currentLang` (String)
- `currentCurr` (String)

**Input (DOM Elements):**
- `[data-da]`, `[data-en]`, `[data-dkk]`, `[data-eur]`

**Output (DOM Mutation):**
- `.innerHTML` or `.placeholder` updates on targeted elements.
- `document.documentElement.lang` update.
- CSS class toggling (`text-amber` vs `text-zinc-400`).

## 3. Behavioral Constraints
- **Performance:** Iterating over data attributes must be efficient.
- **Robustness:** Handles both standard text elements and input/textarea elements (by updating placeholder instead of innerHTML).
- **Initialization:** Must run an initial render pass on `DOMContentLoaded` to establish base state.

## 4. Execution Flow
1. Initialize variables `currentLang = 'da'` and `currentCurr = 'dkk'`.
2. Attach click listeners to language and currency buttons.
3. On click, update the state variable and call `updateContent()`.
4. `updateContent()` loops through DOM elements, swaps text/placeholders, updates button styles, and triggers `selectNote` (from Client Hub) if a tooltip is active to ensure localization consistency.
