# SOP-001: Audio Player Module
**Layer:** 1 (Architecture)  
**Target File:** `tools/audio-player.js`  
**Description:** Defines the logic for the custom web audio player, including waveform rendering, playback state, and mutual exclusion.

## 1. Responsibilities
- Manage HTML5 Audio objects for multiple players on the page.
- Ensure only one audio track plays at a time (Mutual Exclusion).
- Update the UI elements (play/pause icons, playhead, progress overlay) based on `timeupdate` events.
- Handle click events on the waveform container to seek to specific times.

## 2. Input/Output Schemas
**Input (DOM State):**
- Elements with class `.real-audio-player` containing `data-audio-src`.
- Trigger elements: `.play-btn`, `.waveform`.
- Output displays: `.time-current`, `.time-duration`, `.playhead`, `.progress-overlay`.

**Output (DOM Mutation):**
- Toggling `.hidden` on SVG icons inside `.play-btn`.
- Updating `style.left` on `.playhead` and `style.width` on `.progress-overlay`.
- Updating `.bg-amber` vs `.bg-zinc-700` on `.wave-bar` elements.

## 3. Behavioral Constraints
- **Self-Healing:** Must gracefully handle missing DOM elements (e.g., if a track is missing a playhead).
- **Zero External Dependencies:** Must use vanilla JavaScript `Audio()` and `addEventListener`.
- **Memory Management:** Must stop the currently playing audio before starting a new one.

## 4. Execution Flow
1. Query all `.real-audio-player` elements.
2. For each element:
   a. Extract `data-audio-src` and instantiate `new Audio(src)`.
   b. Preload metadata to extract duration.
   c. Attach `timeupdate` listener to update playhead/wavebars.
   d. Attach `ended` listener to reset state.
   e. Attach click listener to `.play-btn` to toggle play/pause (and stop other players).
   f. Attach click listener to `.waveform` to calculate seek position based on click X coordinate.
