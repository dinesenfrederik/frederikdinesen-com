# SOP-004: Contact Form Module (Web3Forms Dispatch)
**Layer:** 1 (Architecture)  
**Target File:** `tools/form.js`  
**Description:** Manages service selection toggles, asynchronous dispatch via Web3Forms API to `dinesenfrederik@gmail.com`, submit button loading state, and in-DOM confirmation/error handling.

## 1. Responsibilities
- Handle click events on `.service-btn` elements to toggle active states (single selection).
- Prevent default form submission and prevent page reloads.
- Validate required fields (`name`, `band`, `email`, `service`).
- Toggle submit button to loading state (disabled, spinner, progress text).
- Dispatch JSON payload asynchronously via POST to `https://api.web3forms.com/submit`.
- Handle success state with in-DOM confirmation view and reset form inputs.
- Handle error state gracefully with an in-DOM banner while preserving user input.

## 2. Input/Output Schemas
**Input (DOM Elements):**
- `.service-btn` clicks.
- Form inputs: `#cf-name`, `#cf-band`, `#cf-email`, `#cf-music-ref`, `#cf-notes`.
- Form `onsubmit` event.

**Output (Payload Dispatch):**
```json
{
  "access_key": "WEB3FORMS_ACCESS_KEY",
  "subject": "Ny henvendelse fra FD Sound Labs: [Name] / [Band]",
  "from_name": "FD Sound Labs Website",
  "name": "string",
  "band": "string",
  "email": "string",
  "service": "string",
  "musicReferenceLink": "string",
  "message": "string"
}
```

## 3. Behavioral Constraints
- **Mutual Exclusion:** Only one service button can be active at a time.
- **No Page Reloads:** All submissions are handled via asynchronous `fetch()` without full page reloads.
- **Zero Native Alerts:** Error and success notifications must be displayed strictly in-DOM.
- **Resilience:** Fallback simulation if access key is placeholder during local development.

## 4. Execution Flow
1. User clicks `.service-btn`: toggle active CSS styles.
2. User submits form:
   a. Prevent default event.
   b. Disable submit button and render loading spinner.
   c. Assemble payload according to constitution schema 4.2.
   d. POST payload to Web3Forms API.
   e. On success: render in-DOM confirmation card and reset inputs.
   f. On failure: display in-DOM error banner and re-enable submit button.
