---
title: "Muddy Low End in Your Metal Mix? How to Get It Tight Without Losing Weight"
description: "Get a tight, heavy low end: fix the muddy low end in your metal mix with polarity checks, kick and bass slotting, split bass and dynamic EQ on palm mutes."
date: "2026-11-11"
author: "Frederik Dinesen"
pillar: "Mixing & Audio Tips"
alternateSlug: "fix-mudret-low-end-metal-mix"
faq:
  - question: "How do I separate kick and bass in a metal mix?"
    answer: "Give one instrument ownership of the deepest sub octave. In modern metalcore and djent, the kick fundamental typically sits at 50–65 Hz and the bass fundamental at 70–90 Hz. Classic heavy metal and some death metal mixes flip this. Check polarity between kick and bass first, then use multiband sidechaining on the bass's 30–80 Hz band, triggered by the kick, instead of ducking the whole bass track."
  - question: "Why do my palm mutes sound boomy and muddy?"
    answer: "Heavy palm muting creates a resonant buildup in the low mids between 150 and 350 Hz, most often centred around 200–250 Hz. A static EQ cut in that range leaves open chords sounding hollow and thin. Use a multiband compressor or dynamic EQ on the rhythm guitar bus instead, with a fast attack and 3–5 dB of gain reduction that only kicks in during palm mutes."
  - question: "What frequency should I high-pass downtuned metal guitars at?"
    answer: "For standard tuning and Drop D, 80–90 Hz is a good starting point. For Drop A, Drop G or Drop F, set the filter lower, around 60–75 Hz, with a gentle 12 dB/octave slope. The lowest fundamental in Drop A is around 55 Hz, so a high-pass filter at 100 Hz cuts it off completely."
  - question: "Should I sidechain my bass to the kick drum in metal?"
    answer: "Yes, but only in the sub range, not across the whole bass track. Put a dynamic EQ or multiband compressor on the bass's 30–80 Hz band, sidechained to the kick, with attack under 1 ms, release of 40–80 ms and 3–6 dB of reduction. With very fast double bass above roughly 200 BPM, static frequency slotting often gives a tighter result than dynamic ducking."
  - question: "How do you get a tight low end with 7-string or 8-string guitars?"
    answer: "Let the bass and kick carry the weight, and let the guitars deliver midrange and bite instead of turning up the bass knob on the amp. Tighten the low end before the distortion with a Tube Screamer-style boost (drive at 0, level at 10). Then high-pass gently around 60–75 Hz and control the palm-mute buildup dynamically in the 150–300 Hz range."
---

A muddy low end in a metal mix rarely comes from a single mistake. You've tuned down to Drop A, programmed a kick you can feel in your chest, and laid a fat, distorted bass underneath. Soloed, every track sounds brutal. Play them together and the low end turns to sludge. The kick vanishes in the double-bass runs, the bass becomes a vague drone, and the palm mutes rumble like a washing machine on spin cycle.

When bands send me multitracks for mixing, a muddy low end (everything below roughly 250 Hz) is the problem I run into most often in heavy productions. Almost every time, someone has tried to fix it with the classic advice: "High-pass everything at 100 Hz and duck the bass." That does clean up the low end. It also leaves you with a thin, gutless mix where the guitars sound like cardboard and the kick has lost its impact.

Below is the protocol I use to clean up the low end in metal, metalcore and djent, with the steps in the order you should do them.

**The short answer:** to fix a muddy low end in a metal mix, first check polarity between the kick, bass and guitar tracks. Then give either the kick or the bass ownership of the sub octave (roughly 50–90 Hz), and control the remaining overlap dynamically instead of with static cuts. In practice that means a split bass with a clean, compressed sub below 150–200 Hz, multiband sidechaining on the bass's 30–80 Hz band from the kick, and dynamic compression of the guitars' 150–300 Hz range during palm mutes.

---

## Why Does Your Metal Mix Have a Muddy Low End?

A muddy low end in metal happens because the kick, the bass and the downtuned guitars all fight over the same narrow range between roughly 50 and 120 Hz. The octave from 50 to 100 Hz is only 50 Hz wide. Broad EQ boosts pile up far faster here than in the top end, so a few "harmless" +3 dB boosts on three different tracks quickly become a droning blanket.

Modern metal makes the problem worse:

* **Downtuned guitars:** A guitar in standard tuning has its lowest fundamental at around 82 Hz. In Drop A it sits around 55 Hz, and in Drop F around 44 Hz. That puts the guitar right on top of the kick and bass.
* **Fast double bass:** At 200+ BPM, each kick hit barely decays before the next one lands, so the low end never gets room to breathe.
* **Distorted bass:** Distortion adds a lot of energy. When it also hits the deepest frequencies, the low end blurs.

Generic mixing advice fails because it was written for pop and EDM. A high-pass filter (HPF, a filter that removes everything below a chosen frequency) at 100 Hz on a Drop A guitar cuts off the fundamental and disconnects the guitar from the bass. Full-band sidechain compression on the bass creates EDM-style pumping that wrecks a metal groove.

The most common mistake I see is turning up the bass knob on the guitar amp to get "heaviness". **In a professional metal mix, the weight comes from the kick and the bass. The guitars deliver midrange, bite and texture.**

---

## 1. Check Polarity and Phase Before You Touch an EQ

The first step towards a tight low end is checking polarity between every track that shares low-frequency content, because phase cancellation sounds exactly like missing bass. If the bass DI (the clean signal straight from the instrument) and the bass amp track are 180 degrees out of phase, they eat each other's fundamental. You then boost the low end to compensate, and the result is mud.

Go through this checklist before you open a single EQ:

* **Bass DI vs. bass amp or bass mic:** Flip the polarity (the button is usually marked Ø) on one of the tracks. Keep whichever setting gives the fullest, firmest low end when both play together.
* **Kick in vs. kick out:** Same exercise with the inside and outside mics on the kick drum.
* **Kick sample vs. kick mic:** If you blend a sample with the mic track, check those two against each other as well.
* **Kick vs. bass:** Listen to both together with the flip on and off. The combination where the low end sums strongest wins.
* **Mono check on the master:** Switch the mix to mono. If the low end suddenly disappears or changes character noticeably, you still have a phase problem.

> **Pro tip:** If the bass has been reamped (sent from the DI back through an amp and recorded again), the amp track can sit a few milliseconds late because of conversion latency. The polarity button alone won't fix that. Zoom in and nudge the track until the waveforms line up with the DI.

**Half of the "muddy low end" I get sent is actually phase cancellation that someone has tried to EQ their way out of.**

---

## 2. Who Owns 50–90 Hz? Kick and Bass Separation

Kick and bass separation in metal starts with one rule: the two instruments can't have their strongest fundamental peak on the same frequency. One instrument owns the deepest sub, and the other sits slightly higher. I call it the "one hero in the low end" rule.

There are two common approaches, and the right one depends on the genre:

* **Method 1 (modern metalcore and djent):** The kick owns the deep sub at roughly 50–65 Hz. The bass fundamental sits at around 70–90 Hz, and the bass gets its definition from grit in the 1.5–3 kHz range.
* **Method 2 (classic heavy metal and some death metal productions):** The bass provides continuous sub weight at roughly 40–65 Hz, while the kick hits higher, around 70–100 Hz, for a dry, punchy thump in the chest.

Here's a frequency map you can use as a starting point:

* **Kick:** Fundamental at 50–65 Hz (Method 1) or 70–100 Hz (Method 2). The beater click sits in the upper mids, typically around 3–5 kHz.
* **Bass:** Fundamental at 70–90 Hz (Method 1) or 40–65 Hz (Method 2). String bite and clank live in the 1.5–3 kHz range.
* **Downtuned guitars:** Fundamentals reach down to about 55 Hz (Drop A) or 44 Hz (Drop F). Filter them gently around 60–75 Hz. Palm-mute buildup sits in the 150–350 Hz range.

Find the kick's fundamental peak with a spectrum analyser, then commit. If the kick owns 55 Hz, put a narrow cut in the bass right there and let the bass's body sit slightly higher. Avoid broad boosts anywhere in 50–100 Hz. **A narrow cut on the instrument that doesn't own the frequency gives you more clarity than a broad boost on the one that does.**

---

## 3. Split the Bass Into a Clean Sub and a Dirty Top

Split-frequency bass processing means duplicating the bass DI onto two parallel tracks: one becomes a clean, solid sub, the other a distorted top. It's the most effective way to get both a wall of low end and a bass that cuts through the guitars. Distortion on the deepest frequencies blurs the low end, so those two jobs need to be kept apart.

Here's how to set it up:

1. **Duplicate the bass DI** onto two tracks, for example "Bass_Sub" and "Bass_Grit". Route both to a shared bass bus.
2. **Sub track:** Insert a steep low-pass filter (LPF, which removes everything above a chosen frequency) at 150–200 Hz. Keep the track completely clean and in mono. Compress it hard with an optical compressor, a VCA compressor or a brickwall limiter, shaving off 3–6 dB or more. The goal is a low end that stays flat and stable no matter how hard the bassist digs in.
3. **Grit track:** Insert a high-pass filter at the same frequency, 150–200 Hz. Run the track through distortion, such as a Darkglass-style pedal, an Ampeg SVT emulation or a guitar amp sim. Bring out 1.5–3 kHz for bite and string clank.
4. **Blend:** Start with the sub track on its own and get it sitting right against the kick. Then bring up the grit track until the bass is clearly audible between the guitars.

> **Pro tip:** Filters shift phase around their cutoff frequency. Use the same frequency and the same slope on both filters, and listen for a hole in the low end where the two tracks meet. If you hear a dip, try flipping the polarity on the grit track.

**The bottom should be clean, mono and flat. The top can be as dirty as the song can handle.**

---

## 4. Sidechain Bass to Kick in Metal, Without EDM Pumping

Sidechaining the bass to the kick in metal should happen in a narrow frequency band, not across the whole bass track. With sidechaining, the kick signal controls the compressor on the bass. If the entire bass ducks on every kick hit, you get rapid, fluttering dropouts during double-bass runs, and the foundation of the rhythm section collapses.

Instead, insert a dynamic EQ or multiband compressor on the bass sub track or bass bus. Typical plugins for this are FabFilter Pro-MB, Waves C6 and Wavesfactory Trackspacer.

* **Band:** 30–80 Hz. Use 50–100 Hz if your kick sits higher (Method 2).
* **Sidechain input:** The kick, ideally a clean kick track or sample without bleed from the rest of the kit.
* **Attack:** As fast as possible, under 1 ms.
* **Release:** 40–80 ms depending on tempo. The bass needs to be back before the next hit lands.
* **Reduction:** 3–6 dB. In Trackspacer that typically corresponds to 10–25%.

Not everyone agrees on dynamic ducking. One camp prefers pure static frequency slotting: the kick gets everything below roughly 60 Hz, and the bass is high-passed at 60 Hz. Its advocates argue this gives a tighter rhythm section with no pumping. The other camp argues that static filtering leaves the bass hollow in passages without drums or with solo bass.

**My rule of thumb: use dynamic ducking when the bass needs to ring out freely in more open sections. Use static slotting when the double bass goes above roughly 200 BPM, because the release can't reset cleanly between hits at that speed.**

---

## 5. How to Tame Palm-Mute Low-Mid Mud (150–350 Hz)

Muddy palm mutes come from a resonant buildup in the low mids between 150 and 350 Hz, most often centred around 200–250 Hz, and that buildup needs to be controlled dynamically. A static EQ cut in that range removes the mud during chugs, but it also leaves open chords and leads sounding hollow and thin the moment the guitarist lets go of the palm mute.

The fix is what many know as the Andy Sneap trick. It was originally done with a Waves C4, but it works just as well with FabFilter Pro-MB or TDR Nova:

* **Placement:** The rhythm guitar bus, so all double-tracked guitars get the same treatment.
* **Band:** Roughly 150–250 Hz, possibly up to 300 Hz. Listen for where your chugs boom the most.
* **Attack:** Fast.
* **Release:** Fast to medium, so the band lets go cleanly after each chug.
* **Threshold:** Set it so open chords barely trigger the band, while palm mutes hit 3–5 dB of gain reduction.

The result: the chug tightens up the instant it happens, while the rest of the riff keeps its body.

The next-best place to remove the boom is before the distortion. Put a Tube Screamer-style overdrive in front of the amp or amp sim with drive at 0, level at 10 and tone to taste. The pedal trims the sub-bass before the signal hits the preamp distortion, so the low end doesn't turn loose and flabby.

> **Pro tip:** If you've kept clean guitar and bass DIs, you can always reamp through a tighter chain later. That's one reason I always ask bands for DIs. If you want to hear how your own DIs and tracks hold up in a professional mix, you can send them in for a free, no-obligation test mix at FD Sound Labs.

**Compress the mud when it happens instead of cutting it out permanently.**

---

## 6. High-Pass Filters for Guitars, Overheads and Sub Rumble

High-pass filters should be set per track and per tuning, not as a blanket 100 Hz rule on everything. A lot of the mud doesn't come from the kick, bass and guitars at all, but from low-frequency junk building up on tracks that have no business in the low end.

Use this checklist:

* **Guitars in standard tuning or Drop D:** HPF at 80–90 Hz.
* **Guitars in Drop A, Drop G or Drop F:** HPF lower, around 60–75 Hz, with a gentle 12 dB/octave slope. That keeps the fundamentals without crowding the kick.
* **Overheads:** Start with an HPF at 100–120 Hz to clear the kick and tom low end the overhead mics pick up.
* **Vocals:** Filter below the singer's lowest note to remove rumble and extra low end from proximity effect. For more on mic distance and proximity effect, see the guide to [home studio vocal tracking](/en/blog/home-studio-vocal-tracking).
* **Kick and drum bus:** Insert a steep HPF below 25–30 Hz. You can't hear the energy down there, but it eats headroom (the space left before 0 dBFS) on the bus and master limiter, so the limiter starts working too early.
* **Synth subs and samples:** Same treatment. Filter out subsonic energy below 30 Hz.

The master bus is a disputed topic. Some mixers put an 18 dB/octave HPF at 30 Hz across the whole master. Mastering engineers, on the other hand, warn against steep filters on the master because they can cause phase smearing and pre-ringing (a faint "pre-echo" before transients). **The safest approach is to filter on individual tracks and sub-busses, where you control exactly what's happening.**

---

## Summary: How to Get a Tight Low End in Your Metal Mix

You fix a muddy low end in a metal mix by working in a specific order, not by reaching for one magic filter. If you only take five things from this guide, take these:

1. **Check polarity and phase first** between bass DI and amp, kick in and out, and kick against bass, before you touch an EQ.
2. **Decide who owns the sub octave.** Either the kick at 50–65 Hz and the bass at 70–90 Hz, or the other way around.
3. **Split the bass** into a clean, hard-compressed mono sub below 150–200 Hz and a distorted top above it.
4. **Sidechain only the bass's 30–80 Hz band** from the kick with a fast attack and 40–80 ms release, or go with static slotting for very fast double bass.
5. **Control palm mutes dynamically** in the 150–300 Hz range with 3–5 dB of reduction, and filter guitars according to their tuning, not at 100 Hz.

Follow that order and you get a low end that's both tight and brutal, where every kick hit and every chug comes through clearly.
