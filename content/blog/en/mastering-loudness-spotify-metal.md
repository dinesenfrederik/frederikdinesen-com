---
title: "Mastering Loudness for Spotify: Why -14 LUFS Ruins Rock & Metal Releases"
seoTitle: "Mastering Loudness for Spotify: Real LUFS Targets for Metal"
description: "Get the real numbers for mastering loudness for Spotify: why -14 LUFS makes metal sound thin, what pro masters measure, and which True Peak ceiling to use."
date: "2026-11-16"
author: "Frederik Dinesen"
pillar: "Music Release & Business"
alternateSlug: "mastering-loudness-spotify"
faq:
  - question: "Should I master my metal track to -14 LUFS for Spotify?"
    answer: "No. -14 LUFS is Spotify's playback reference level, not a creative target for your master. Commercial modern metal masters typically sit between -8 and -5 LUFS integrated, and Spotify simply turns them down with clean digital gain. If you master to -14 LUFS, you lose density and energy, and the track plays 6 to 8 dB quieter than the competition whenever normalization is switched off."
  - question: "How loud are commercial metal and rock songs on Spotify?"
    answer: "Modern metal and metalcore typically measure between -7.5 and -5 LUFS integrated, and the most aggressive subgenres can reach around -4 LUFS. Commercial rock, hard rock and alternative usually sit between -9 and -7 LUFS. Organic rock and grunge often keep their drums intact best around -10 to -8 LUFS."
  - question: "What True Peak ceiling should I use when mastering rock and metal?"
    answer: "Spotify recommends -1 dBTP for masters at or below -14 LUFS and -2 dBTP for louder masters. In practice, many mastering engineers set the ceiling on metal and rock between -1.0 and -0.3 dBTP. If you master your own music, -1.0 to -0.5 dBTP is a safe starting point that prevents most codec overs."
  - question: "Does Spotify distort or ruin loud masters when it turns them down?"
    answer: "No. When a track is louder than Spotify's reference level, Spotify lowers the playback level with flat digital gain. No compression, limiting or distortion is added, so the punch and internal balance of the master stay exactly the same. Spotify only uses a limiter when it turns quiet tracks up in the listener's \"Loud\" setting."
  - question: "Do I need separate masters for Spotify, Apple Music and CD?"
    answer: "The current consensus among active mastering engineers is to master once. Make the best-sounding, most genre-appropriate master and send that same file to your distributor. The older advice of a dynamic -14 LUFS version for streaming and a loud version for CD has largely been abandoned, because normalization evens out level differences anyway."
---

You spent months on the song. The mix is locked, and the master hits exactly -14 LUFS and -1 dBTP, because the internet told you that was the rule for mastering loudness for Spotify. Then you drop the track into a playlist next to Periphery or Bring Me The Horizon, and suddenly your song sounds small, flat and toothless.

When bands send me multitracks for mixing, a reference playlist almost always comes along, and one of the most common questions is how loud the finished master should be on Spotify. The answer surprises a lot of people, because it goes straight against what most YouTube tutorials keep repeating.

**The short answer:** -14 LUFS is Spotify's playback level, not a target for your master. Commercial modern metal masters typically sit between -8 and -5 LUFS integrated, and hard rock lands around -9 to -7 LUFS, with a limiter ceiling of -1.0 to -0.3 dBTP. Spotify turns loud masters down with clean digital gain, with no compression and no distortion.

Here is why, and the exact numbers to work with.

---

## Why -14 LUFS is not a mastering target

-14 LUFS is the level Spotify plays music back at by default. It is not a level Spotify requires you to master to. LUFS (Loudness Units relative to Full Scale) is a unit for perceived loudness, and Spotify uses that measurement to turn every track up or down so listeners don't have to reach for the volume knob between songs.

The confusion comes from Spotify's own documentation, which mentions -14 LUFS and -1 dBTP as recommendations. A lot of tutorials have turned that recommendation into law, and it now gets repeated as if it were one of Spotify's loudness requirements. For acoustic music, jazz and classical, the number makes sense. For heavy music, it doesn't.

Metal and hard rock are built on density: distorted guitars filling the entire frequency spectrum, bass and kick locked together as one block, and drum transients that have to punch through without jumping out. That sound needs controlled clipping, saturation and limiting. Pull the limiter back to land on -14 LUFS, and the glue that makes a wall of sound feel like a wall of sound disappears.

**Spotify's -14 LUFS is a playback benchmark, not a creative production standard.**

### The "loudness penalty" myth

Plenty of musicians worry that Spotify punishes loud masters by compressing them or making them sound ugly. That doesn't happen. When a track is louder than the reference level, Spotify simply lowers the gain, exactly as if you pulled down a fader. The dynamics, punch and balance of your master are completely unchanged, just quieter.

---

## How does Spotify loudness normalization work?

Spotify measures each track's integrated loudness using the international ITU-R BS.1770 standard and then adjusts the playback level towards -14 LUFS. How that adjustment behaves depends on whether the track is too loud or too quiet.

**Negative gain (the track is too loud):**

* A master at -6 LUFS gets turned down by roughly 8 dB.
* This is done with flat digital attenuation, with no compression, saturation or limiting.

**Positive gain (the track is too quiet):**

* A track below -14 LUFS gets turned up, but only as far as its peaks allow without clipping.
* A dynamic master with high peaks can therefore end up playing quieter than the rest of the playlist, even with normalization switched on.
* In the listener's "Loud" setting (-11 LUFS), Spotify uses a limiter to stop dynamic tracks from clipping. That is the only point in the chain where Spotify actually changes the dynamics, and it hits quiet masters, not loud ones.

### Album normalization

When a listener plays a full album in order, Spotify normalizes the album as a single body based on the album's overall integrated loudness. Your ballad stays quieter than your most brutal track, the way you intended.

### The trap: when normalization is switched off

Normalization isn't active everywhere. Listeners can switch it off on desktop and mobile, and on several playback surfaces, such as the web player, embedded players and some TV and game console apps, no normalization is applied. There, your file plays exactly as you delivered it.

**A -14 LUFS master plays 6 to 8 dB quieter than commercial metal releases when normalization is off.** That's a massive difference, and most listeners don't hear it as "quieter". They hear it as "that other band just sounds better".

### K-weighting: why upper mids count more than sub-bass

A LUFS meter doesn't measure raw energy. It uses a filter called K-weighting, designed to mimic human hearing:

* The upper midrange and treble get a boost of around +4 dB before measurement.
* The deepest low end is filtered down in the measurement.

In practice, sub-bass eats a lot of headroom (the free space between your peaks and 0 dBFS) in the limiter without moving the LUFS meter by a corresponding amount. A mix with a controlled low end and clear bite around 2–4 kHz therefore sounds louder and more aggressive than a muddy, sub-heavy mix, even when both measure the same. If that's where your mix struggles, read my guide on how to [get a tight low end in a metal mix without losing weight](/en/blog/fix-muddy-low-end-metal-mix).

Integrated loudness also uses gating, so silence and very quiet passages don't drag the measurement down.

---

## How loud are commercial rock and metal masters?

Commercial masters in heavy genres sit far above -14 LUFS. These are the typical Spotify mastering levels you'll find on real releases, measured as integrated LUFS across the whole track:

* **Modern metal and metalcore:** -7.5 to -5 LUFS, averaging around -6 LUFS.
* **The most aggressive subgenres:** up to around -4 LUFS.
* **Commercial rock, hard rock and alternative:** -9 to -7 LUFS.
* **Organic rock and grunge:** -11 to -9 LUFS, which keeps transients and punch intact without pushing the limiter into audible distortion.
* **Mainstream charts across all genres:** around -8.4 LUFS integrated, with the loudest sections such as choruses around -6 LUFS short-term.

So how loud should you master for Spotify? Engineers genuinely disagree on how far to push. Some warn that dynamic rock loses kick drum weight and starts pumping once you go past -7 LUFS. A sensible compromise is **-10 to -8 LUFS for organic rock and grunge, and -7 to -6 LUFS for modern, polished djent and metalcore.**

> **Pro tip:** Integrated LUFS is the average over the whole track, while short-term LUFS measures in a 3-second window. In a metal mix, the short-term reading in the chorus often tells you more about how dense the track feels than the integrated number does.

---

## What True Peak limit should you use for metal?

Spotify recommends -1 dBTP for masters at or below -14 LUFS and -2 dBTP for anything louder. In practice, very few mastering engineers pull the ceiling all the way down to -2 dBTP on rock and metal. The typical true peak limit in metal mastering is **-1.0 to -0.3 dBTP**.

True Peak (measured in dBTP) is what separates this from ordinary sample peaks. When the digital signal is converted back to analog audio, or encoded to lossy formats like Ogg Vorbis or AAC, the reconstructed waveform can peak between two samples. These are called inter-sample peaks, and they can cause distortion during encoding.

Commercial metal masters often have sample peaks between -0.2 and 0.0 dBFS and true peaks above 0 dBTP, sometimes as high as +2.8 dBTP. Yet they don't sound broken on Spotify, and normalization is the reason:

* A -6 LUFS master with true peaks at +1.5 dBTP gets turned down by about 8 dB.
* The effective playback peak therefore lands around -6.5 dBTP.
* That leaves plenty of headroom, so the reconstructed inter-sample peaks don't clip the digital-to-analog converter (DAC) during playback.

The problem mainly shows up when normalization is switched off. So if you're mastering yourself, here's what I recommend:

* **Safe starting point:** limiter ceiling at -1.0 to -0.5 dBTP with True Peak detection enabled.
* **Aggressive modern master:** -0.3 dBTP can work, as long as you check the result in a codec preview plugin that simulates lossy streaming formats.
* **Avoid** pulling the ceiling down to -2 dBTP on a dense metal mix just to follow a generic streaming recommendation. You sacrifice edge without gaining anything audible.

---

## How to get a loud master without losing punch

Loudness in metal doesn't come from one limiter cranked hard. If a brickwall limiter has to take 8 dB of dynamic reduction on its own, the kick transients collapse and the snare gets buried. Professional metal reaches -7 LUFS by spreading the work across several stages.

A typical chain on the mix bus or master looks like this:

1. **Pre-EQ:** Remove unnecessary rumble and tame low end that isn't contributing anything.
2. **Hard clipper on the transients:** Shave the sharpest, unmusical peaks off the kick and snare before they hit the limiter. Start with a couple of dB, and stop when the drums start sounding flat.
3. **Saturation and tonal color:** Add density and harmonics so the mix feels louder without adding more dB to the peaks.
4. **True Peak limiter:** Take the last stretch up to your LUFS target with a ceiling of -1.0 to -0.3 dBTP.

### The low end decides how loud you can go

Uncontrolled rumble below roughly 30–35 Hz hammers the limiter without adding audible punch, and the result is obvious pumping. High-pass the extreme sub-bass, and make sure the kick and bass are in phase and not fighting over the same range. Spend the headroom you win on the bite in the upper midrange, which is what both the LUFS meter and the listener's ears react to most.

**Most of the good loudness is won in the mix, not in the master.** A LUFS metal mix target only works if the mix can take it: a mix with a controlled low end and balanced transients can be pushed much harder without falling apart. If you want to hear how your tracks hold up in a dense, competitive mix next to your references, you can send one song in for a free, no-obligation test mix at FD Sound Labs. You can also read more about how [remote mixing of your song works](/en/remote-mixing).

---

## Mastering loudness for Spotify: pre-release checklist

Use this checklist when your master is ready to go to your distributor. The numbers are starting points, not laws, and your ears always have the final say.

* **Integrated LUFS:** -8 to -6 LUFS for modern metal, -9 to -8 LUFS for hard rock, and -10 to -8 LUFS for organic rock and grunge.
* **Limiter ceiling:** -1.0 to -0.5 dBTP as the safe choice, -0.3 dBTP if you've checked the result in a codec preview.
* **Format:** Deliver 24-bit WAV at the project's sample rate, if your distributor accepts it.
* **Dither:** If you have to go down to 16-bit, dither once, as the very last step.
* **References:** Compare against commercial releases in your genre at the same perceived loudness. Use a loudness-matched A/B plugin, such as ADPTR Metric AB, so you hear differences in tonal balance and punch instead of just differences in volume.
* **One master:** Make the best-sounding version for the genre, and send that same file to every platform. The older advice of a -14 LUFS version for streaming and a loud version for CD and Bandcamp has largely been abandoned by active mastering engineers.
* **Listen without normalization:** Play your master and your references with normalization switched off. That's where an overly cautious master gets exposed.

> **Pro tip:** Don't stare yourself blind at the LUFS meter. If your master measures -7 LUFS and still sounds small next to the reference at matched loudness, the problem is in the mix, typically too much sub-bass or too little bite around 2–4 kHz.

---

## Summary: the 5 things that matter most

* **-14 LUFS is Spotify's playback level, not your mastering target.** Modern metal typically sits at -8 to -5 LUFS, rock at -9 to -7 LUFS.
* **Spotify turns loud masters down with clean gain.** There's no compression and no loudness penalty wrecking your sound.
* **Normalization isn't always on.** Without it, a -14 LUFS master plays 6 to 8 dB quieter than the competition.
* **Set your ceiling at -1.0 to -0.3 dBTP.** That's much closer to reality in heavy music than Spotify's cautious -2 dBTP.
* **Spread the work: clipper before limiter, and control the low end.** Loudness is built in the mix and across a chain of stages, not by one limiter pushed to the floor.
