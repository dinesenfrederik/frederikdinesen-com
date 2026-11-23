---
title: "Recording DI Guitar for Reamping: Clean Tracks Without Fizz or Clipping"
seoTitle: "Recording DI Guitar for Reamping: Levels & Setup"
description: "Avoid fizz and clipping when recording DI guitar for reamping: exact dBFS levels, DI box setup and reamp calibration. A complete guide for rock and metal."
date: "2026-11-23"
author: "Frederik Dinesen"
pillar: "DIY Recording & Tracking"
alternateSlug: "optag-di-guitar-til-reamping"
faq:
  - question: "What dBFS level should my guitar DI peak at for metal?"
    answer: "Record in 24-bit and aim for peaks between -12 and -6 dBFS on your hardest palm mutes and power chords. Average (RMS) levels typically sit around -18 to -14 dBFS. That leaves enough headroom for an extra-hard pick attack without clipping, while keeping the signal well above the interface's noise floor."
  - question: "Do I need a DI box if my audio interface has a Hi-Z input?"
    answer: "Not necessarily. A modern Hi-Z input with at least 1 MΩ input impedance can capture excellent DI tracks in a home studio with short cables. A dedicated DI box becomes necessary for long cable runs, for example when the guitarist plays in a different room from the interface, because it sends a balanced mic-level signal that rejects hum and noise."
  - question: "Can I use a passive DI box backwards as a reamp box?"
    answer: "Yes, a passive transformer DI box can be run in reverse, but an active DI box cannot. Run backwards, the transformer adds roughly 20 to 30 dB of gain, so you need to pull the track down by a similar amount in your DAW. You also risk ground-loop hum, and the amp won't see the same impedance it gets from a real pickup."
  - question: "Should I keep my noise gate on when recording DI guitar?"
    answer: "No. Record and export the DI track completely clean, without a noise gate, compressor, pitch correction or amp sim. A gate on your monitoring chain while you play is fine, but the actual gating belongs after reamping or in the mix, where it can be set for the final guitar tone."
  - question: "Why does my reamped guitar sound thin or fizzy?"
    answer: "The most common causes are digital clipping in the DI track, the wrong level going into the amp, and the wrong input impedance during recording. A clipped peak turns into harsh, buzzing fizz when it hits a high-gain amp, and EQ can't remove it. Calibrate your reamp box so the amp receives the same level it would get from the guitar's pickups."
---

You tracked a riff that should sound like a freight train through a 5150. After reamping, it buzzes like wasps in a tin can, or it sounds thin and lifeless. The problem almost never sits in the amp. It sits in the DI track (direct input: the clean, unamplified signal straight from the guitar), and recording DI guitar for reamping the right way is what fixes it.

When bands send me multitracks for mixing, I always ask for the guitar and bass DIs. Reamping (sending an already recorded DI back through an amp or amp sim) lets me shape the guitar tone to fit the rest of the production. But no amp can rescue a bad DI. Clipping, the wrong impedance and sloppy playing are baked into the file for good.

The short answer: **record DI guitar in 24-bit through an input with at least 1 MΩ impedance, with peaks between -12 and -6 dBFS on your hardest palm mutes.** Passive pickups go into an active DI box or a Hi-Z input. Active pickups can run into a passive DI box, or an active DI box with the pad engaged. Export as mono WAV from bar 1, with no plugins, gate or amp sim.

Here's the whole process step by step, from pickup to finished reamp.

---

## 1. Impedance: Interface Hi-Z Input or Dedicated DI Box?

**Passive guitar pickups need to see an input impedance of at least 1 MΩ, or you lose top end, low end and attack before the signal is even recorded.** Passive pickups have a high output impedance, and the input you plug them into should have 5 to 10 times higher impedance than the pickup itself. That's why instrument inputs typically sit at 1 to 1.5 MΩ.

Plug the guitar into a standard line input of around 10 kΩ, and that input loads the pickup down. The result is what guitarists call "tone suck":

* The treble and the sharp bite of the pick attack disappear.
* The low end loses definition.
* Transients (the first fast attack of each note) get slower and softer.

### The Hi-Z input on your audio interface

The Hi-Z input (instrument input) on your interface is built for exactly this job. Engineers disagree on how good it is. Some argue a dedicated DI box always beats a built-in instrument input. Others show that modern mid- and high-tier interfaces have transparent Hi-Z inputs at 1 MΩ or more that capture excellent DIs.

In my experience, a modern Hi-Z input is fine in a bedroom studio with a short cable. Check the manual for the input impedance. Also be aware that some older budget interfaces have very little headroom (room before clipping) on the instrument input. Active pickups can make them clip even with the gain knob at minimum.

### When you need a DI box

A dedicated DI box is necessary for long cable runs, for example when the guitarist plays in one room and the interface sits in another. The DI box converts the guitar signal into a balanced, low-impedance mic-level signal (roughly 150 to 250 Ω) that can travel down a long XLR cable without picking up hum and noise. Most DI boxes also have a ground lift switch that can kill hum from ground loops.

> **Pro tip:** The XLR output of a DI box delivers mic level. It has to go into a microphone preamp, never straight into a line input. Plug it into a line input and you'll be massively short on gain and end up with a noisy signal.

---

## 2. Active vs. Passive Pickups: Choose the Right DI Box for Metal Guitar

**Passive pickups go into an active DI box, and active pickups can run into a passive DI box.** That's the simplest rule for a clean DI with the right pickups.

### Passive pickups (e.g. Seymour Duncan, Bare Knuckle)

* Use an **active DI box** such as a Radial J48 or Countryman Type 85, or a Hi-Z input at 1 MΩ or more.
* A passive DI box loads passive pickups and robs them of clarity and low-end definition.

### Active pickups (e.g. EMG 81/85, Fishman Fluence)

* Active pickups have a built-in preamp and low output impedance. They drive a **passive DI box** such as a Radial JDI without any trouble.
* If you use an active DI box, engage the **-15 dB or -20 dB pad** on the DI box or the preamp. Active pickups can throw out very high voltage peaks when you dig in, and those can overload the active circuitry in the DI box.

### Check the battery in active pickups

A dying 9V battery makes active pickups compress and distort the signal before it ever reaches your DAW. On a clean DI it can sound almost harmless. Once that signal goes through a high-gain amp, it turns muddy and flabby. **Put a fresh battery in before the session, and bring a spare.**

---

## 3. Recording DI Guitar for Reamping: The Right dBFS Levels

**Record in 24-bit (or 32-bit float), and let your hardest hits peak between -12 and -6 dBFS.** Average (RMS) levels typically sit around -18 to -14 dBFS. Never record in 16-bit.

### Set your guitar DI recording level on the heaviest riff

Palm mutes on a down-tuned guitar carry huge low-end energy, and they often peak higher than your open power chords. So set your gain on the most brutal palm-mute riff in the song, played as hard as you'll actually play it in a take. Most guitarists dig in harder once record is armed than during the soundcheck, so treat -6 dBFS as your absolute ceiling, not your target.

The same gain staging logic (managing level through the whole signal chain) applies to vocals. I've covered it in [Home Studio Vocal Tracking](/en/blog/home-studio-vocal-tracking).

### Why digital clipping destroys high-gain tone

The analog habit of tracking "hot" close to 0 dBFS makes no sense in 24-bit. The dynamic range is so large that 6 to 12 dB of headroom costs you no audible noise. What it does do is remove the risk of clipping.

A single clipped peak, where the waveform gets sheared flat above 0 dBFS, creates harsh odd-order harmonic and intermodulation distortion. On a clean signal it might only sound like a tiny click. Sent through a high-gain amp like a Peavey 5150 or a Dual Rectifier, or through a heavy amp sim, it becomes buzzing fizz. **That fizz can't be removed with EQ, because it lives in the signal itself.**

### What about peaking at -18 dBFS?

Some classical and broadcast sources recommend peaking all the way down around -18 dBFS to match nominal analog level. Many rock and metal engineers, me included, think that pushes the DI too close to the interface's analog noise floor. When an amp then piles massive gain on top, that noise gets amplified too. That's why -12 to -6 dBFS peaks are the safest baseline for heavy music.

> **Pro tip:** Amp sims scale their inputs differently. Neural DSP, Helix Native, ToneX and Neural Amp Modeler don't necessarily expect the same level. If the tone feels too tame or too overdriven in a specific plugin, check the manual and adjust with a few dB of digital trim before the plugin instead of re-recording.

The heavy low end from palm mutes should be tightened in the mix, not by recording the DI quieter. I've written about how to do that in [Muddy Low End in Your Metal Mix?](/en/blog/fix-muddy-low-end-metal-mix).

---

## 4. How to Track Guitars for Reamping: Strings, Tuning and Monitoring

**A clean DI exposes everything: every out-of-tune note, every ringing string and every uneven pick attack.** When the amp adds high gain on top, those flaws only get louder. Playing discipline matters as much as the gear.

### Strings and tuning

I change strings on the recording day itself, right before we start tracking. A lot of guides recommend doing it a few days ahead, but in my experience fresh strings give the best brightness and stable tuning when they're properly stretched in on the day. That goes for both guitar and bass. When bands record with me, they bring fresh strings, and we change them before the first take.

Beyond that:

* **Check the intonation** so chords stay in tune all the way up the neck, especially on down-tuned guitars.
* **Tune before every take.** Not every third one. Every time.
* **Mute the strings you're not playing**, for example with a string dampener or a hair tie behind the nut. With high gain, even faint ringing turns into noise.
* **Keep your pick attack consistent.** Double-tracked rhythm guitars need the same pick, the same angle and the same force on both sides.

### Monitor through an amp tone

If you play with a completely clean signal in your headphones, you play differently than you do through an amp. The pick attack often ends up too hard or uneven. So listen through an amp or amp sim while you record the clean DI:

* Use the **Thru output** on the DI box to feed an amp, while the DI box's XLR output records the clean signal.
* Or put an amp sim on the DI track in your DAW **for monitoring only**, and set the buffer size low (64 or 128 samples) so latency doesn't mess with your timing.

A noise gate in your monitoring chain is fine. It just can't be on the recorded DI track itself.

---

## 5. The Reamp Chain: Calibration and Unity Gain

**When you reamp, the amp has to receive exactly the same level and impedance it would get straight from the guitar's pickups.** That's called unity gain, and it's the reason you need a reamp box.

Your interface's line output sends a balanced, low-impedance, line-level signal. A guitar amp expects an unbalanced, high-impedance, low-level signal. A reamp box (from Radial or Palmer, for example) converts one into the other:

1. DAW line output (XLR or balanced TRS)
2. Reamp box
3. Amp's instrument input
4. Mic on the cabinet, back into the interface

If the level is too high, the amp's preamp gets driven harder and you get more gain and fizz than the guitar itself would produce. If it's too low, the result sounds thin and gutless. Calibration fixes both.

### How to calibrate with the loopback method

1. Record a short, hard-hitting riff through your DI box or Hi-Z input on track 1.
2. Send track 1 out of a line output on your interface and into the reamp box.
3. Plug the reamp box output into **the same DI box or Hi-Z input** you used for recording, with exactly the same gain setting.
4. Record that signal on track 2. Make sure track 2 isn't routed to the same output, or you'll create a feedback loop.
5. Compare peak and RMS levels on track 1 and track 2. Adjust the reamp box level control until they match 1:1.
6. Note the knob position. The amp now gets the same level it would get from the guitar.

> **Pro tip:** Calibrate once per setup and write the setting down. If you change interface, output or DI box, calibrate again.

---

## 6. Reamping Guitar Without a Reamp Box: Is It Worth It?

**Yes, you can reamp with a passive DI box run in reverse, but it comes with compromises you need to know about.** You can't use an active DI box backwards. It contains active circuitry that only passes signal in one direction.

### Passive DI box in reverse

The transformer in a passive DI box works in both directions. The setup looks like this:

1. Interface line output (XLR) into the DI box's XLR output.
2. DI box's 1/4" input into the amp's instrument input.

The catch is that the transformer now steps the signal up instead of down. Run in reverse, it typically adds **20 to 30 dB of extra level**. You have to pull the track down by a similar amount in your DAW. Start low and bring it up, or you'll slam the amp's input far too hard. Keep the amp volume down when you send the first signal through, too.

The compromises:

* **Ground-loop hum.** You don't get the same ground isolation as with a dedicated reamp box, so you can end up with serious hum.
* **Wrong impedance.** The amp doesn't see the same source impedance as from a pickup, so it can react differently to your playing.
* **No precise level control.** Without a level knob, calibration is harder to nail.

### A buffered pedal as an emergency fix

Some people run the line output through a pedal with buffered bypass, like a tuner or overdrive pedal, to convert the impedance. It can work, but you get no galvanic isolation against hum, and you still need to cut the level in your DAW.

**For experimenting in the rehearsal room, a reversed passive DI box is fine. If you reamp regularly, a dedicated reamp box is worth the money.**

---

## 7. How to Send Guitar DIs to Your Mix Engineer

**DI tracks for mixing should be 24-bit mono WAV files at the project's sample rate, exported from bar 1 with no plugins at all.** This is my checklist when bands send me guitars for [remote mixing](/en/remote-mixing) and reamping:

* **Format:** 24-bit WAV (or 32-bit float) at the project's native sample rate, e.g. 44.1 kHz or 48 kHz.
* **Mono:** Amps and pedals are mono. A stereo DI takes up twice the space and causes routing headaches.
* **From bar 1 (0:00.000):** Every track starts at the same point, even if the guitar doesn't come in until the second verse. That way everything lines up automatically in my session.
* **Completely clean:** No noise gate, compressor, pitch correction or amp sim on the DI tracks.
* **Reference track:** Send an extra track with your rough amp sim tone. It shows the sound you heard while playing and helps judge groove and palm-mute tightness.
* **Logical naming:** `Gtr_Rhythm_L_DI.wav`, `Gtr_Rhythm_R_DI.wav`, `Gtr_Lead_DI.wav`, `Gtr_Rhythm_L_Ref.wav`.

If you want to hear how your DIs hold up once they're reamped and mixed professionally, you can send them in for a free, no-obligation test mix at FD Sound Labs.

---

## Summary: The 5 Most Important Steps

1. **Get the impedance right:** Passive pickups into an active DI box or a Hi-Z input of at least 1 MΩ. Active pickups into a passive DI box, or an active one with the -15/-20 dB pad engaged.
2. **Get the levels right:** 24-bit, peaks between -12 and -6 dBFS on the heaviest palm-mute riff, zero clipping.
3. **Play with discipline:** Fresh strings on the day, tune before every take, mute unused strings, and monitor through an amp or amp sim.
4. **Calibrate the reamp chain** with the loopback method, so the amp gets the same level as from the guitar.
5. **Deliver clean:** Mono WAV from bar 1, no plugins, plus a reference track with your rough tone.
