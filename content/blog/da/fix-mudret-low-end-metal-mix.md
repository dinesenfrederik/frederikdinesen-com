---
title: "Mudret Bund i Metal Mix? Sådan Får Du en Stram Bund Uden at Miste Tyngde"
description: "Få en stram bund uden at miste tyngde: sådan fixer du mudret bund i dit metal mix med polaritet, frekvensfordeling, split-bas og dynamisk EQ på palm mutes."
date: "2026-11-11"
author: "Frederik Dinesen"
pillar: "Mixing & Audio-tips"
alternateSlug: "fix-muddy-low-end-metal-mix"
faq:
  - question: "Hvordan adskiller jeg stortromme og bas i et metal mix?"
    answer: "Giv ét instrument ejerskab over den dybeste sub-oktav. I moderne metalcore og djent ligger kickets grundtone typisk på 50–65 Hz og bassens på 70–90 Hz, mens klassisk heavy metal og visse death metal-mix gør det omvendt. Tjek polariteten mellem kick og bas først. Brug derefter multiband-sidechain på bassens 30–80 Hz fra kicket i stedet for at ducke hele bassporet."
  - question: "Hvorfor lyder mine palm mutes mudrede og buldrende?"
    answer: "Tunge palm mutes skaber en ophobning af resonans i den lave mellemtone mellem 150 og 350 Hz, oftest centreret omkring 200–250 Hz. Et statisk EQ-cut gør åbne akkorder hule og tynde. Brug i stedet en multiband-kompressor eller dynamisk EQ på rytmeguitar-bussen med hurtig attack og 3–5 dB gain reduction, som kun griber ind under palm mutes."
  - question: "Hvor skal jeg high-passe lavstemte metal-guitarer?"
    answer: "Ved standardstemning og Drop D er 80–90 Hz et godt udgangspunkt. Ved Drop A, Drop G eller Drop F bør filteret ligge lavere, omkring 60–75 Hz, med en blid hældning på 12 dB/oktav. Grundtonen i Drop A ligger på cirka 55 Hz, og et filter ved 100 Hz skærer den helt væk."
  - question: "Skal jeg sidechaine bassen til stortrommen i metal?"
    answer: "Ja, men kun i sub-området og ikke på hele bassporet. Sæt en dynamisk EQ eller multiband-kompressor på bassens 30–80 Hz med sidechain fra kicket, attack under 1 ms, release på 40–80 ms og 3–6 dB reduktion. Ved meget hurtig dobbeltpedal over cirka 200 BPM giver statisk frekvensfordeling ofte et strammere resultat end dynamisk ducking."
  - question: "Hvordan får jeg en stram bund med 7- og 8-strengede guitarer?"
    answer: "Lad bassen og stortrommen stå for tyngden, og lad guitarerne levere mellemtone og bid i stedet for at skrue op for ampens basknap. Stram bunden før forvrængningen med en Tube Screamer-agtig boost (drive på 0, level på 10). High-pass derefter blidt omkring 60–75 Hz, og kontrollér palm mute-ophobningen dynamisk i 150–300 Hz."
---

Mudret bund i et metal mix opstår sjældent på grund af én enkelt fejl. Du har stemt ned til Drop A, programmeret en stortromme, man kan mærke i brystkassen, og lagt en fed, forvrænget bas under. Hver for sig lyder sporene brutale. Når det hele spiller samtidig, bliver bunden til grød. Kicket forsvinder i dobbeltpedal-passagerne, bassen bliver en uklar brummen, og dine palm mutes buldrer som en vaskemaskine på centrifugering.

Når bands sender mig multitracks til mix, er mudret low-end (bunden, altså alt under cirka 250 Hz) den fejl, jeg oftest møder i tunge produktioner. Næsten altid har nogen forsøgt at løse det med det klassiske råd: "High-pass alt ved 100 Hz, og duck bassen." Det giver en ren bund, ja. Men det giver også et tyndt, kraftløst mix, hvor guitarerne lyder af pap, og stortrommen har mistet sit slag.

Her er den protokol, jeg selv bruger til at rense bunden i metal, metalcore og djent. Trinnene står i den rækkefølge, de skal udføres.

Kort sagt fjerner du mudret bund i et metal mix i tre trin. Først tjekker du polariteten mellem kick-, bas- og guitarspor. Dernæst giver du enten stortrommen eller bassen ejerskab over sub-oktaven (cirka 50–90 Hz). Til sidst styrer du overlappet dynamisk i stedet for med statiske cuts. I praksis betyder det en splittet bas med en ren, komprimeret sub under 150–200 Hz, multiband-sidechain på bassens 30–80 Hz fra kicket og dynamisk kompression af guitarernes 150–300 Hz under palm mutes.

---

## Hvorfor får man mudret bund i et metal mix?

Mudret bund i metal skyldes, at stortromme, bas og lavstemte guitarer kæmper om det samme smalle frekvensområde mellem cirka 50 og 120 Hz. Oktaven fra 50 til 100 Hz er kun 50 Hz bred. Derfor hober brede EQ-boosts sig op meget hurtigere her end i diskanten, og et par "uskyldige" +3 dB på tre forskellige spor bliver hurtigt til et brummende tæppe.

Moderne metal gør problemet værre:

* **Lavstemte guitarer:** En guitar i standardstemning har sin dybeste grundtone (fundamental) på cirka 82 Hz. I Drop A ligger den på cirka 55 Hz, og i Drop F på cirka 44 Hz. Dermed ligger guitaren direkte oven i kickets og bassens område.
* **Hurtig dobbeltpedal:** Ved 200+ BPM når hvert kickslag knap at klinge ud, før det næste kommer, så bunden aldrig får luft.
* **Forvrænget bas:** Forvrængning tilfører masser af energi, og hvis den også rammer de dybeste frekvenser, bliver bunden uklar.

Generiske mixråd fejler, fordi de er skrevet til pop og EDM. Et high-pass filter (HPF, et filter der fjerner alt under en valgt frekvens) ved 100 Hz på en Drop A-guitar skærer grundtonen af og kobler guitaren fra bassen. Fuld sidechain-kompression på bassen giver EDM-pumpning, der smadrer et metal-groove.

Den mest almindelige fejl, jeg ser, er at skrue op for basknappen på guitarampen for at få "tyngde". **I et professionelt metal mix kommer tyngden fra stortromme og bas. Guitarerne leverer mellemtone, bid og tekstur.**

---

## 1. Tjek polaritet og fase før du rører en EQ

Det første trin mod en stram bund er at kontrollere polariteten mellem alle spor, der deler low-end, for faseudslukning lyder præcis som manglende bas. Hvis bas-DI'en og bas-ampen er 180 grader forskudt, æder de hinandens grundtone. Så booster du bunden for at kompensere, og resultatet er mudder.

Gennemgå denne tjekliste, før du åbner en eneste EQ:

* **Bas-DI mod bas-amp eller bas-mic:** Flip polariteten (knappen er ofte markeret med Ø) på ét af sporene. Behold den indstilling, der giver mest fyldig og fast bund, når de spiller sammen.
* **Kick in mod kick out:** Samme øvelse med inder- og ydermikrofonen på stortrommen.
* **Kick-sample mod kick-mikrofon:** Hvis du blander et sample med mikrofonsporet, skal de også tjekkes mod hinanden.
* **Kick mod bas:** Lyt til de to sammen med flip på og af. Den kombination, hvor bunden summerer sig stærkest, vinder.
* **Mono-tjek på masteren:** Slå mixet i mono. Hvis bunden pludselig forsvinder eller ændrer karakter markant, har du stadig et faseproblem.

> **Pro tip:** Er bassen reampet (sendt fra DI tilbage gennem en forstærker og optaget igen), kan amp-sporet ligge et par millisekunder forskudt på grund af konverteringslatency. Så hjælper polaritetsknappen ikke alene. Zoom ind, og flyt sporet, så bølgeformerne flugter med DI'en.

**Halvdelen af den "mudrede bund", jeg får tilsendt, er i virkeligheden faseudslukning, som nogen har forsøgt at EQ'e sig ud af.**

---

## 2. Hvem ejer 50–90 Hz? Kick og bas på hver sin plads

Stortromme og bas kan ikke have deres kraftigste grundtonetop på den samme frekvens. Det ene instrument skal eje den dybeste sub, og det andet skal ligge lidt højere. Det er kernen i det, jeg kalder "én helt i bunden".

Der er to gængse metoder, og valget afhænger af genren:

* **Metode 1 (moderne metalcore og djent):** Kicket ejer den dybe sub på cirka 50–65 Hz. Bassens grundtone ligger på cirka 70–90 Hz, og bassen får sin definition fra grit i 1,5–3 kHz.
* **Metode 2 (klassisk heavy metal og visse death metal-produktioner):** Bassen leverer en kontinuerlig sub på cirka 40–65 Hz, mens kicket slår højere, omkring 70–100 Hz, og giver et tørt, punchy slag i brystet.

Her er et frekvenskort, du kan bruge som udgangspunkt:

* **Stortromme:** Grundtone på 50–65 Hz (metode 1) eller 70–100 Hz (metode 2). Klikket fra beateren ligger øverst i mellemtonen, typisk omkring 3–5 kHz.
* **Bas:** Grundtone på 70–90 Hz (metode 1) eller 40–65 Hz (metode 2). Bid og klang fra strengene ligger i 1,5–3 kHz.
* **Lavstemte guitarer:** Grundtoner ned til cirka 55 Hz (Drop A) eller 44 Hz (Drop F). De filtreres blidt omkring 60–75 Hz, og palm mute-ophobningen sidder i 150–350 Hz.

Find kickets grundtonetop med en analyzer, og beslut dig. Hvis kicket ejer 55 Hz, laver du et smalt cut i bassen netop dér og lader bassens fylde ligge lidt højere. Undgå brede boosts i 50–100 Hz. **Et smalt cut i det instrument, der ikke ejer frekvensen, giver mere klarhed end et bredt boost i det, der gør.**

---

## 3. Split bassen i en ren sub og en beskidt top

Split-processing af bassen betyder, at du deler bas-DI'en i to parallelle spor. Det ene spor bliver en ren, kompakt sub, og det andet en forvrænget top. Det er den mest effektive måde at få både en mur af bund og en bas, der skærer igennem guitarerne. Forvrængning på de dybeste frekvenser gør bunden uklar, så de to opgaver skal holdes adskilt.

Sådan sætter du det op:

1. **Duplikér bas-DI'en** til to spor, for eksempel "Bas_Sub" og "Bas_Grit". Send begge til en fælles bas-bus.
2. **Sub-sporet:** Sæt et stejlt low-pass filter (LPF, fjerner alt over en valgt frekvens) ved 150–200 Hz. Hold sporet helt rent og i mono. Komprimér det hårdt med en optisk kompressor, en VCA-kompressor eller en brickwall-limiter, så du barberer 3–6 dB eller mere af. Målet er en bund, der ligger helt flad og stabil, uanset hvor hårdt bassisten anslår.
3. **Grit-sporet:** Sæt et high-pass filter ved samme frekvens, 150–200 Hz. Kør sporet gennem forvrængning, for eksempel en Darkglass-agtig pedal, en Ampeg SVT-simulering eller en guitar amp sim. Fremhæv 1,5–3 kHz for bid og strengeklang.
4. **Blend:** Start med sub-sporet alene, så det sidder rigtigt mod kicket. Skru derefter op for grit-sporet, indtil bassen kan høres tydeligt mellem guitarerne.

> **Pro tip:** Filtre forskyder fasen omkring deres knækfrekvens. Brug samme frekvens og samme hældning på begge filtre, og lyt efter et hul i bunden, hvor de to spor mødes. Hører du et dyk, så prøv at flippe polariteten på grit-sporet.

**Bunden skal være ren, mono og flad. Toppen må være så beskidt, som sangen kan bære.**

---

## 4. Sidechain bas og kick multiband, uden EDM-pumpning

Sidechain mellem bas og kick i metal skal ske i et smalt frekvensbånd og ikke på hele bassporet. Ved sidechain styres bassens kompressor af kicksignalet. Hvis hele bassen dukker ned ved hvert kickslag, får du hurtige, flagrende huller under dobbeltpedal-runs, og fundamentet i rytmegruppen falder sammen.

Indsæt i stedet en dynamisk EQ eller en multiband-kompressor på bassens sub-spor eller bas-bus. Typiske plugins er FabFilter Pro-MB, Waves C6 og Wavesfactory Trackspacer.

* **Bånd:** 30–80 Hz. Brug 50–100 Hz, hvis dit kick ligger højere (metode 2).
* **Sidechain-input:** Kicket, gerne et rent kickspor eller sample uden overhøring fra resten af trommerne.
* **Attack:** Så hurtig som muligt, under 1 ms.
* **Release:** 40–80 ms afhængigt af tempo. Bassen skal være tilbage, før næste slag rammer.
* **Reduktion:** 3–6 dB. I Trackspacer svarer det typisk til 10–25 %.

Ikke alle er enige om dynamisk ducking. Én skole foretrækker ren statisk frekvensfordeling: kicket får alt under cirka 60 Hz, og bassen high-passes ved 60 Hz. Fortalerne mener, at det giver en strammere rytmegruppe uden pumpning. Den anden skole mener, at statisk filtrering gør bassen hul i passager uden trommer eller med solobas.

**Min tommelfingerregel: Brug dynamisk ducking, når bassen skal klinge frit i mere åbne sektioner. Brug statisk fordeling, når dobbeltpedalen går over cirka 200 BPM, fordi releasen så ikke kan nå at nulstille rent mellem slagene.**

---

## 5. Tæm palm mute-mudderet i 150–350 Hz dynamisk

Mudrede palm mutes skyldes en ophobning af resonans i den lave mellemtone mellem 150 og 350 Hz, oftest centreret omkring 200–250 Hz. Ophobningen skal styres dynamisk. Et statisk EQ-cut i det område fjerner mudderet under chugs, men det gør også åbne akkorder og leads hule og spinkle, så snart guitaristen slipper palm muten.

Løsningen er det, mange kender som Andy Sneap-tricket. Det blev oprindeligt lavet med en Waves C4, men det virker lige så godt med FabFilter Pro-MB eller TDR Nova:

* **Placering:** Rytmeguitar-bussen, så alle dobbelttrackede guitarer behandles ens.
* **Bånd:** Cirka 150–250 Hz, eventuelt op til 300 Hz. Lyt efter, hvor dine chugs buldrer mest.
* **Attack:** Hurtig.
* **Release:** Hurtig til medium, så båndet slipper rent efter hvert chug.
* **Threshold:** Sæt den, så åbne akkorder knap trigger båndet, mens palm mutes giver 3–5 dB gain reduction.

Resultatet er, at chuggen strammes op i det øjeblik, den opstår, mens resten af riffet beholder sin krop.

Det næstbedste sted at fjerne buldret er før forvrængningen. Sæt en Tube Screamer-agtig overdrive foran forstærkeren eller amp sim'en med drive på 0, level på 10 og tone efter smag. Pedalen skærer sub-bas fra, før signalet rammer forforstærkerens forvrængning, så bunden ikke bliver løs og flabet.

> **Pro tip:** Har du gemt rene guitar- og bas-DI'er, kan du altid reampe med en strammere kæde. Det er en af grundene til, at jeg altid beder om DI'er. Hvis du vil høre, hvordan dine egne DI'er og spor holder i et professionelt mix, kan du sende dem ind til et gratis og uforpligtende test-mix hos FD Sound Labs.

**Komprimér mudderet, når det opstår, i stedet for at skære det permanent væk.**

---

## 6. High-pass filtre med omtanke: guitarer, overheads og sub-rumble

High-pass filtre skal sættes per spor og efter stemning, ikke som en fast 100 Hz-regel på alt. En stor del af mudderet kommer ikke fra kick, bas og guitar, men fra den lavfrekvente støj, der samler sig på spor, som slet ikke har noget at gøre i bunden.

Brug denne tjekliste:

* **Guitarer i standardstemning eller Drop D:** HPF ved 80–90 Hz.
* **Guitarer i Drop A, Drop G eller Drop F:** HPF lavere, omkring 60–75 Hz, med en blid hældning på 12 dB/oktav. Så bevarer du grundtonerne uden at fylde kickets plads.
* **Overheads:** Start med HPF ved 100–120 Hz for at fjerne den bund fra kick og toms, som overhead-mikrofonerne opfanger.
* **Vokal:** Filtrér under stemmens dybeste tone for at fjerne rumble og ekstra bund fra nærhedseffekten. Læs mere om mikrofonafstand og nærhedseffekt i guiden til [vokalindspilning i hjemmestudiet](/blog/vokalindspilning-hjemmestudie).
* **Kick og trommebus:** Sæt et stejlt HPF under 25–30 Hz. Energien dernede kan man ikke høre, men den æder headroom (luft op til 0 dBFS) på bus- og master-limiteren, så limiteren arbejder for tidligt.
* **Synth-sub og samples:** Samme behandling. Filtrér subsonisk energi under 30 Hz væk.

Masterbussen er et omdiskuteret emne. Nogle mixere lægger et HPF på 18 dB/oktav ved 30 Hz over hele masteren. Mastering engineers advarer derimod mod stejle filtre på masteren, fordi de kan give faseudtværing og pre-ringing (en svag "forlyd" før transienterne). **Det sikreste er at filtrere på de enkelte spor og subgrupper, hvor du har kontrol over, præcis hvad der sker.**

---

## Opsummering: sådan får du en stram bund i dit metal mix

Mudret bund i et metal mix løses i en bestemt rækkefølge, ikke med ét magisk filter. Hvis du kun tager fem ting med fra denne guide, så tag disse:

1. **Tjek polaritet og fase først**, mellem bas-DI og amp, kick in og out, og kick mod bas, før du rører en EQ.
2. **Beslut, hvem der ejer sub-oktaven.** Enten kick på 50–65 Hz og bas på 70–90 Hz, eller omvendt.
3. **Split bassen** i en ren, hårdt komprimeret mono-sub under 150–200 Hz og en forvrænget top over.
4. **Sidechain kun bassens 30–80 Hz** fra kicket med hurtig attack og 40–80 ms release, eller vælg statisk fordeling ved meget hurtig dobbeltpedal.
5. **Styr palm mutes dynamisk** i 150–300 Hz med 3–5 dB reduktion, og filtrér guitarerne efter stemning, ikke ved 100 Hz.

Følger du den rækkefølge, får du en bund, der både er stram og brutal, og hvor hvert kickslag og hver chug kan høres tydeligt.
