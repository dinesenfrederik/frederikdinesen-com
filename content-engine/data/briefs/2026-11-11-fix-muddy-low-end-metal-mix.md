# Research brief: How to Fix Muddy Low-End in Heavy Metal: Kick, Bass & Downtuned Guitars

### Search Intent and SERP Overview

DIY rock and metal producers, bedroom recording artists, and modern metal musicians consistently struggle with low-frequency clutter. Downtuned guitars (Drop D down to Drop A, F, or Double Drop A0), sub-heavy sample kicks, and distorted bass tones fight for the narrow octave between 50 Hz and 120 Hz, resulting in either a boomy, undefined mess or—when using generic mixing advice—a thin, lifeless mix.

**What the SERPs Cover:**
* Standard high-pass filtering (HPF) on non-bass tracks.
* Sidechain ducking of bass from the kick drum.
* Splitting bass into low and high tracks.
* The "Andy Sneap C4 trick" for controlling guitar palm mutes.

**What the SERPs Miss (The Gaps):**
* **The "Drop-Tuning Dilemma":** When guitars tune to Drop A (fundamental ~55 Hz) or Drop F (~44 Hz), they occupy the kick and bass fundamental zone. Generic advice to "high-pass guitars at 100 Hz" ruins heavy rhythm tones; producers need clear instructions on managing guitars below 100 Hz through arrangement, amp pre-filtering, and dynamic EQ.
* **The Order of Operations:** Most guides jump straight to aggressive carving EQ before addressing phase alignment or polarity between kick mics, bass DI/mic, and multi-tracked guitars.
* **Sidechain Granularity:** Broadside ducking (pumping the entire bass track EDM-style) kills metal grooves. Few articles provide exact multiband sidechain ranges (e.g., 30–80 Hz or 50–120 Hz) or address ducking vs. static frequency slotting.
* **Danish SERP Analysis:** Danish search results for "mudret bund metal mix" are sparse, consisting mostly of generic machine-translated product descriptions (Gear4music) or brief forum posts on Lydmaskinen. High-authority, practical Danish content on modern metal low-end mixing does not exist, presenting an open search opportunity.

---

### Key Facts and Recommended Values

* **Physics of the Low-End:** The 50–100 Hz octave spans just 50 Hz of bandwidth; broad EQ boosts here cause disproportionate phase shift and clutter compared to high frequencies (Andrew Barr / YouTube).
* **Step 0: Polarity Check:** Always flip polarity ($\varnothing$) on bass DI vs. bass amp, kick-in vs. kick-out, and check kick vs. bass low-end summation before touching an EQ. Phase cancellation is often mistaken for a lack of bass.
* **Sub-Bass "One Hero" Rule:** In metal, the kick drum typically owns the deepest sub fundamental (~50–65 Hz) because of its transient nature, while the bass guitar fundamental sits slightly higher (~65–90 Hz), or vice versa (Brendon Padjasek / Andrew Barr / Sound on Sound).
* **Subsonic Drum Bus Filtering:** Apply a steep high-pass filter (HPF) on the drum bus or kick drum below **25–30 Hz** to clear non-musical subsonic rumble and reclaim limiter headroom (Frightbox Recording / Brendon Padjasek).
* **Bass Crossover / Split Processing:**
  * Duplicate bass DI into two paths: **Sub/Low** and **Grit/High**.
  * *Low Track:* Low-pass filter (LPF) steeply at **150–200 Hz**; keep completely clean and in mono. Apply heavy brickwall limiting or optical/VCA compression (shaving 3–6+ dB) to pin the low end flat (Andrew Barr / Brendon Padjasek / Frightbox Recording).
  * *High Track:* High-pass filter (HPF) at **150–200 Hz**; saturate or run through high-gain distortion (e.g., Darkglass, Ampeg SVT, guitar amp sims) for attack, bite, and string clank.
* **Kick-Bass Unmasking (Multiband Ducking):**
  * Rather than ducking the entire bass track, insert a dynamic EQ (e.g., FabFilter Pro-MB, Wavesfactory Trackspacer, Waves C6) on the bass sub-band.
  * *Target Band:* **30–80 Hz** (or 50–100 Hz), sidechained to the kick.
  * *Settings:* Fastest possible attack (<1 ms), release timed to recover before the next hit (approx. 40–80 ms depending on tempo), ducking by **3 to 6 dB** (or 10–25% in Trackspacer).
* **The "Andy Sneap C4 Trick" for Palm Mutes:**
  * Heavy palm-muting creates severe low-mid resonance buildup between **150 Hz and 350 Hz** (most commonly centered around 200–250 Hz).
  * Do *not* apply static cuts, which leave sustained chords hollow and weak.
  * Insert a multiband compressor or dynamic EQ on the rhythm guitar bus. Set a band over **150–250/300 Hz**, fast attack, fast/medium release (recovering cleanly after each chug), targeting **3–5 dB of gain reduction** strictly during palm mutes.
* **Guitar Amp Input Tightening:**
  * Cut sub-bass *before* the distortion stage (e.g., using a Tube Screamer/Overdrive pedal with Drive at 0, Level at 10, Tone to taste) to tighten flabby low frequencies before they hit pre-amp distortion.
* **High-Pass Rules for Guitars:**
  * For standard/Drop D tuning: HPF at **80–90 Hz**.
  * For low tunings (Drop A, Drop G, Drop F): HPF lower, around **60–75 Hz**, with a gentle slope (12 dB/oct) to preserve note fundamentals without cluttering the kick.

---

### Suggested Article Structure

* **H2: The Trap of Generic Advice (Why Your Metal Mix Sounds Like Mud or Cardboard)**
  * Break down the problem: downtuned 7/8-strings, 240 BPM double-bass kicks, and heavily distorted bass cannot be mixed like pop or EDM.
  * Dissect why blanket advice ("high-pass everything at 100 Hz") produces thin, brittle, gutless metal mixes.
* **H2: Step 0 — Polarity and Phase (Fix the Mud Before You Touch an EQ)**
  * Explain why low-frequency wave summation cancels punch or creates false mud.
  * Actionable checklist: Flip the phase ($\varnothing$) on bass DI vs. bass amp, kick inside vs. outside mic, and check master mono compatibility.
* **H2: The "One Hero" Rule — Slotting the 50–90 Hz Sub Octave**
  * Establish that kick and bass cannot share the same fundamental frequency peak (Andrew Barr).
  * Method 1 (Modern Metalcore/Djent): Kick dominates 50–65 Hz (sub punch), Bass sits at 70–90 Hz.
  * Method 2 (Classic/Death Metal): Bass owns the low sub (~50–65 Hz), Kick punches at 80–100 Hz.
* **H2: Split-Frequency Bass Processing (The Wall of Lows + Cutting Jangle)**
  * Step-by-step setup: Duplicating the bass into Low (<150–200 Hz) and High (>150–200 Hz) paths.
  * Low track: Monofied, clean, hard-limited (pinning dynamic variation by 3–6 dB).
  * High track: Distortion/amp grit, upper-mid bite (1.5–3 kHz), band-pass cleaning.
* **H2: Multiband Sidechaining: Kick & Bass Unmasking Without EDM Pumping**
  * Why broadband sidechaining ruins metal basslines (especially during rapid double bass).
  * Setting up frequency-specific ducking: Target 30–80 Hz with ultra-fast attack and tempo-matched release.
* **H2: Taming the Palm-Mute Chug: The Dynamic Low-Mid Protocol**
  * The physics of palm-mute woof (the 150–350 Hz buildup on heavy palm chugs).
  * The modern "Andy Sneap C4 / Dynamic EQ" method: dialing in FabFilter Pro-MB or TDR Nova to squash chugs dynamically without hollowing out sustained chords.
  * Pre-amp filtering: Using a Tube Screamer style high-pass before the amp sim to prevent flub before it happens.
* **H2: The High-Pass Clean-Up Checklist (Overheads, Vocals, and Guitars)**
  * Where secondary mud accumulates: high-passing overheads (100–120 Hz) to clear close-mic/room clutter, and cutting sub-rumble below 30 Hz across the mix.
  * Safe HPF curves for Drop A/F guitars vs. standard tuning.

---

### Common Mistakes

1. **Broadband Sidechain Compression on Bass:** Compressing the entire bass frequency range every time the kick hits causes rapid, fluttering dropouts (EDM pumping) during double-bass runs, gutting the rhythm section's foundation.
2. **Carving Static EQ Holes for Palm Mutes:** Slashing 200–350 Hz with static parametric cuts leaves open chords and lead lines sounding tinny and lifeless when the guitarist stops chugging.
3. **Over-Filtering Downtuned Guitars:** High-passing an 8-string or Drop-A guitar at 100 Hz completely chops off note fundamentals (Drop A fundamental is ~55 Hz), disconnecting the guitar from the bass.
4. **Ignoring Phase/Polarity Alignment:** Spending hours EQing and compressing low end without checking polarity first. If the kick and bass or bass DI and amp are 180° out of phase, they cancel fundamental punch, prompting artificial low-end boosts that cause severe mud.
5. **Boosting Low End on Guitars for "Heaviness":** Turning up the bass knob on guitar amplifiers. In professional metal mixes, low-end weight comes from the bass guitar and kick, while guitars provide midrange cut and texture.
6. **Letting Sub-30 Hz Energy Run Wild:** Leaving unfiltered subsonic frequencies on drum buses and synth sub layers, which eats headroom on bus limiters without adding audible energy.

---

### Questions People Ask

1. *How do I separate kick and bass in a metal mix?*
2. *Why do my palm mutes sound boomy and muddy?*
3. *What frequency should I high-pass heavy metal guitars at?*
4. *Should I sidechain my bass to the kick drum in metal?*
5. *How do you get a tight low-end with 7-string or 8-string guitars?*
6. *Why does my metal mix sound muddy when the bass guitar comes in?*
7. *What is the Andy Sneap multiband compression trick?*
8. *How do I keep low-end punch without triggering the master limiter too early?*

---

### Gaps and Angle

* **The Problem with Existing Content:** Most mix blogs offer either generic EDM/pop advice (heavy broadband sidechaining) or oversimplified advice ("high-pass everything below 100 Hz, cut 250 Hz on the master"). Metal YouTube tutorials showcase good plugin chains (e.g., FabFilter Pro-Q 3, Trackspacer, Darkglass) but rarely synthesize the *entire chain of custody*—from tracking/pre-amp tone shaping, to polarity, split-bass architecture, and dynamic palm-mute control.
* **Our Angle:** A systematic, non-destructive low-end protocol built specifically for heavy rock, metalcore, and djent:
  1. *Polarity Check First*.
  2. *Frequency Slotting & Ownership* (Assigning the 50–70 Hz octave).
  3. *Split-Bass Architecture* (Clean mono sub under brickwall compression + dirty mid-range jangle).
  4. *Dynamic Frequency Unmasking* (Multiband sidechain ducking instead of broadband pump).
  5. *Palm-Mute Control* (Dynamic low-mid suppression at 150–300 Hz instead of static cuts).
* **Quotability:** Present an explicit **"Frequency Allocation Matrix"** detailing where the fundamental and attack live for Kick, Bass, and Downtuned Guitars.

---

### Disputed or Uncertain Points

* **Static High-Pass Separation vs. Dynamic Multiband Sidechaining:**
  * *Camp A (e.g., Frightbox Recording):* Prefers pure static frequency slotting (e.g., kick takes everything below 60 Hz; bass is high-passed at 60 Hz). Argues this produces a tighter, punchier rhythm section free of pumping or latency artifacts.
  * *Camp B (e.g., Brendon Padjasek, Daniel Braunstein, Chernobyl Audio):* Advocates dynamic multiband ducking (Trackspacer or FabFilter Pro-MB ducking 30–80 Hz on the bass). Argues static filtering leaves bass guitar hollow during drum-rests or solo bass passages.
  * *Verdict:* Use dynamic ducking when bass needs full sustain during sparser sections; use static slotting if double-bass patterns are faster than ~200 BPM where dynamic release curves cannot reset cleanly.
* **Who Owns the Sub (Kick vs. Bass):**
  * Modern djent/metalcore producers place the kick fundamental at 50–65 Hz and push the bass fundamental to 70–90 Hz with upper-mid grit at 1.5–3 kHz.
  * Classic heavy metal and certain death metal producers prefer the bass guitar to provide continuous sub weight (40–60 Hz) while the kick sits higher (70–100 Hz) to deliver a dry, punchy chest thump.
* **High-Passing Master/Bus Channels:**
  * Some mixers advise placing an 18 dB/oct HPF at 30 Hz across the master bus.
  * Mastering engineers strongly caution against aggressive, steep filters on the master bus due to phase smearing and pre-ringing artifacts; filtering is better addressed per-channel or on sub-busses.

---

### Keyword Notes

**English:**
* *Primary:* muddy low end metal mix, tight low end metal mix
* *Secondary/Variants:* kick and bass separation metal, how to fix muddy mix metal, sidechain bass kick metal, palm mute low mid mud, metal guitar multiband compression, Andy Sneap C4 trick, downtuned guitar mix clarity, drop A low end mixing.

**Danish:**
* *Primary:* mudret bund metal mix, stram bund i metal mix
* *Secondary/Variants:* adskillelse af stortromme og bas metal, fix mudret mix, sidechain bas kick metal, dæmpe palm mute mudder, mix af lavstemte guitarer, high pass filter metal guitar, muddermellemtoner.
* *Usage Tip:* Danish audio production terminology borrows heavily from English (e.g., *low-end, high-pass filter, sidechaining, punch, palm mutes, fundamentals*). Use natural Danish formulations such as *"sådan får du en stram bund uden mudder"* or *"adskil stortromme og bas uden at miste tyngde."* Avoid awkward translations of industry terms like "sidechain ducking" or "split processing."

## Sources (Google Search grounding)
- [nailthemix.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGQKDSrn6oQVZvlR-HjJqDaUVgyngh0P1jlchX1sALia6eVn3z6daVnAy830IbBV-bggqefyazKq2VSm-Vnkg9JpXK_-Am7hxZoyXFiWvcOrRC3vmaia9HCFUy7UqCcQG3QCYs=)
- [reddit.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEqLJ7smBMpVELE-NIHCu3p24dFjBPQZq0D3D52cuB36hcS6UDnapIXYeN34oFdsBWWf-BeRdV4b4BvlHiONr-bz-aRjnw8hM3fvPzlu4jcAP4X-huqgWS4lO8vv2kIYxKBM2G9ttVGPRW-IaiSxNo-8ETp8lqBcLz9ppFbKOtNUHrfII994TamvZCvhwVqWgIaICHEiesWC6rV4mZ_XA==)
- [youtube.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHjyrHGWmdcSILZzhEWHLkWdsPJdDYeKo-iKlReA0Dk9ORdn7PWHFjNW-Owut3Ro7CSjX2BX_iyE3ZO44p63M6PT87nhus2GyPrNg-I9Y0vYhWBHz4bu_7WUpcAjtly_ysg)
- [youtube.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEDQo-gSXr5z5Y9wte-YMw1SMUZD8YjHHDr_bb794a0rQGA64idGKlaiE8JZ81mZ1jal_2CrQOCBL0UUS6VNqOeEp28ZZqXanUbQIYh8-ueL8KoCkjm6V5-_JzAp7G5onEu)
- [soundonsound.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG_aEp5EzthdnNu3BROr_Bkp-o3W2W_hUMUjnGYRJ3IYoAAmhJgDtG43G6nc_5AhtdEKoCbyluKdDWb_c7x0P6m1osq1pQPtfC3y4_oPPX_RuUZVahEoi3yOTGivAgpNusuVav_Cg3TKYvb)
- [reddit.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFJEPgfnyIDKBrPjjcbgY7AtrjqTOgA8edBka-1xGXfnY6Fu7G7vUrG2xy-bUoyzV9HR1VKlA3Wesc04YdNWVzPaPFyBjk8Ws2r7GRNbQuy6MVCYXbM2UXu_04oycKgsOgDp2rpLwq2walgYF4CWLEwpvGJGpPGbGCjq4J4pDoVqpATAG6K6x2S082rnPYB4Kcye7c_)
- [nailthemix.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEj7X-Ov97fpQHe9quOw29Vc3f-MXRR8dAdxdnIf724Ct-imSl5LnGd4MIopJUKzr1VWRuyo4s_FKqckXPV3KIURnvar4_vvoPLio62LU7mk2_8LEU_0_X0dHs=)
- [joeysturgistones.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEt8avRTdbV8-315GgkQly0TIuojuuUBNyR2WaATL1rkzFFHAqtxB9DP9Z-ec-tON6Z4ccBmx2H6Y8Ja_pz3YqNLLP3rL0L3tVkbW9U1nFL8DjXlgbWoY2Kj7EG0M0nBCXC7ulU72Z-FL8DcCXQX1kK7xXDUFukzINfeiaDlvndPpKXO1tuKlIkQPpXGYK4i7eqAIjmh70=)
- [youtube.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGbtUBlc-bdcqdW_Vpl7BD1vLPRIHe9BTUGJ-7upzrjg4KhaILOQu3Hps8F2yMLfZCJNQm0tp91afpP-mEwxgEFDkkNolpnjmgocLVuMHsNPARtbd8ns5ujbgYL1Sj1er1-)
- [youtube.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG8E4WGyIlcGwWkt3H7jUY6hXViXKqzOfsJdGDFpFy75hYKrm-g6f2JLJsWjwgYq_cXP0RyOt8eQdL7E8UaigEhdnvIqENVNtoF0JynrBw24blBnpYCQrW0ZBEg4SOIFmR-)
- [theproaudiofiles.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFMqB0h04iyVKx0lyUmGwVr24HS6l0_qw12RP-PUtjW5UJv1yjxCnFWIdHna7Jj1OCUhMPjw4phDvhrHnJyC4TahNOjEtbUxLhxtyDvvKzQ69YMdM7GjGSYOx2F37l6Dg==)
- [reddit.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFHmcWiACR2OFpElQwYoRmru_2rSQYDLkCCV_pQzj7LcWRcW54N9V2R5SMaRr8N6VSf02JbSzDpGPea0GXucU3hGAHSKEUvsMPjagP3TPxVz2rkdpePKZtfaHaNkRepZG-niGphbKrCn5XdtEtKz3YNBoQKqHzi61fLnqOk5b3JWh5rA1vGc1umSCRZq0CJRVuD631LsavBOLSPaig=)
- [youtube.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFR1pA_ifTCOOJMd1tRQsTfwEQ1QDDASsVWB90YrvPBtMQKsvKTrBU2OSTkCg6CP8nTrjk3PCs8FmwR_zT-N758BPnPh7p3lHKE4R-1e8amCyHEwbUwiduKm7_E-_Qghw6-)
- [reddit.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHXNEZCDmi1nBctqVj1wBlxiIb7i4DzK1F6L_uoN14dz87YMsgaSXyGEO3x9Ggs_JxHSsN05_JyrJ7CgCeJx2CRXk_CrHROEEPnETQxLh24ogWc2RSzJiLyTIKKQ-dCkOOIRnH_j7ys4bKWxIGHUyM6rVW5AEkHypO__HwmVnkDQbbjk-kgJqblDUBH8MyqbMgTRH17lNWg5znnZgdhZSw=)
- [reddit.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEa3PYZfc6NiGfdOKviZWtS8qsU-TpRTm142lP34XjUS-PoaGdiYo1fGyervJyH9he8qUNdUf3ON_7-UmnlXjWKTuWdve6kgFHgYLhK_jVR-EaB2tGEsIBoSLHCvlaCC4Ptz0ehRHKY7iA1QWvy7i_ocYfEoa6oJpPpSpOFuVqQkZY2G6H10eDBroPQFQw66Tbi8-b-FggBg5qtJ-77y-rNN6V0)
- [lydmaskinen.dk](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEWlAyIAru-8DzS-sFRyMIIH7ye-MBakDyPiUGw4sHSHfotItRMnmUpJxHzRzaRj273_CDow1RgybsPq7XVusVvdo4PpxkhdAG_fE9sCqj1uvGGh2o6HrteLP0HaoNaLtu_Qg==)
- [gear4music.dk](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEy-_O3X3r5AdEI4GNAgMh1PiNigIU1m77CAIHOM1ZeylNr6HPdc-V5eS3lk8My5G8dH6yEez0XIJiBgJUMnrEFnRy7B37pUFeNocUb3VaWZyqEdqxNlMkbiGblVLUu6S4Uzps3vaKWs3Y2zRHBNg3aaUgXiJqBeCaxQX25dLY-qbI7ICc4IXY=)
- [nailthemix.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGxslMpfBWMp8qZjEAhUr3d8KNb_0ftY07GSIrXWRvvU01Dkw1yYL9vS6oPgC88Cp0WwseiaNYFExSxHf5kXJ7aO98vBtgk8F42-yITywqhM8EZffQbndfZdUCdG0h1sQ==)
- [youtube.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEZo0l6oLGQrIh-a4kxmQWMLp01cC2kygi_pqfGv_fVmkT5GqFC4Hj83-Bm41Kp9zLWn76s-Ge2oRkGbIpDKDw_rQzyvZmML34QxPhUA2cbHEhLMUluwn68oBcTuGh45KE=)
- [reddit.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEOjGpULIKiMpNPcEHNayFVxepHUKXfpu86ItA7LZC-Sl0jzqBeJYdlfrq1CZWSu2MunRJwodtuDSi35ZAWvwGM2hwBZ1MgC_tBozHA51T-uwKz9Zj5ERHDZQUKVZvLpPTqcXgnQzrpn6opi8NNm0wb_dbHMjvrZpvDFsuLznl6zPRsphphdfcm1ydYj8k=)
- [nailthemix.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFHzM94tNsexWr3N_9SNRzLxBhATc53e85swKRsXY_6F-BQM4q5X7N_8-x7oEFx0_p93_Vuf1RexlVnhniRK8jTk597-4i-egh5mggTwFjsDCOwMK-21ZQb9Ho=)
- [nailthemix.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEc24S-6cTNzkqe3Xy2b_UKl0Lygy9zGWz2qLoeS8BmolD8idvzBCJ6-e7Zg_7idx_HyEYmDGB_IFohc3vPV5Kbd-tUeEmGI75j_XiGNDyWLKITXM3fxSNUsqMGGSzjJK90Q7dt8IRSc9GdY6LR)
- [lunahelia.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFqZomHQB456xCI5VtzhQHKnK99GyXvukSWa6oPp-6CGlBVBYR-Rux-oBdaEsg_VxHAmGeJ_DxN9as-Ts8Ew4x-WHCli3Rfll4L_GuDthxaRQ9qlDeW_qKWjHxYSghsGaFtjKKg4u70IVYYnz_9AdqUtT8mqxnks_NYAw==)
- [kemper-amps.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFg2X453FDbZBXuFdsZq86uglOb3sU3UHEkvyCltjcLE2lwWzSCrLo6Wx_t65JYBbWkEdlmlgHnZmdotGVJRaQHlpWw2c64S2fYSx12PDS76LkP9t6clhVgTw89nJpS6RUObJ04ANBG5yc5lD3NXLiMBPy-eAXkM_rD)
- [reddit.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEkD1exONvdRVEubN60mWKb26VnUr3ebIRTZ3weRyt50CrPRXNoONk5T9nsx0QVqDTN1UM9x1q1vi8dRfhCUg0LH0slPmrl4tVNUKBcgVH-FfV09ydi0EUEGACEclj6l2gDb5R33sBtGZnmvF3N58cuME3MX68AOICLWPZXN4X3bROjodwITZ_XMkefv0O5RWiTg5VvMqyAeg==)
- [masteringthemix.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFqVpzjSR0AC0Ciq8-kspDPVwTdWToWQ0dr77bUjoQLB9hminSkETLdJGWocU-vlcpLG-YGOmAn6ai3IeUBHaoDFnzur-2_-ILuboNMxKldZPZEDUCZLWa_wXdhoj1KYgM7AMiLZV6hV2ZwlT82wBgkEwOShtPnA4h8iFO5jkhdAlVygh-fGlq2vVgyVyzLeA_I0IHz7F1DzzViSpw=)
- [gprotab.net](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFk0aQEWOifGCDEEGZkYZN5X6TD0W_3OiXlI8KLwqIXsbxTqctPrs6FB004bPDj85k4EzPqTnCli2VFXQj4LhN_YLXS8n16SLS8py59A6OyOcg42YwBxW24zVC9VqHMVzSR5MCMFBXR3xLFD93JvMoSPxYi74AxxaPJnxVBr262aulfiClMt7c38p3Ukpqzsp_q9enviV1mRlCRdvSk54NrbcZPNd03)
- [youtube.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF6Sk8aHvQHNzeyzcm8uLlTD_stEJQOaAryPeZbCZwnCrnS6aYXgHEl0Ely5rIV2n_nZVxOqE_fzIodUNy0nnFxSjLiucimFAFwA0vJLr-KwXLBpnxECTbq6DCQxQPskII=)
- [homerecording.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHlAaZFyczSJMc5zDzFvnApRkR9re8GbnWhlLu5m40o3nAkCEygO-EMxbQVSrj_WKnpW1pkYLtQpM_2VF6hdjpa9kWM7LMqdwjN_YocWr32Pipd2JDe388yezkMN-4cd_Q-gwtQ7wzv6fSw9O7ZQQRpWl33fqvPag==)
- [nailthemix.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHivZu41P9wEIz_FOqNRnZkYZUIYkM0wIf_ENTA8WluVnT8mDPQ2b4asmb0B5Wcrd2UVtHhRac-PDfkHqlcAJymY5yCtsCG4j-ujQCiAPYwmznJgM5uTzASm5Yw3R61Z3wF4A7osnOHxd5t-zFqPfgLwnHOwzp1)

## Videos analysed
- [How I Fix Muddy Home Studio Mixes Without Killing The Low End](https://www.youtube.com/watch?v=LPeVAhza56I) (Frightbox Recording)
- [Nail KICK & BASS in a Metal Djent or Thall Mix](https://www.youtube.com/watch?v=Su9l9xeNoCI) (Brendon Padjasek)
- [The PRO System For Heavier Low End (Without Muddying Your Mix)](https://www.youtube.com/watch?v=5DNhpktHHaU) (Andrew Barr)
