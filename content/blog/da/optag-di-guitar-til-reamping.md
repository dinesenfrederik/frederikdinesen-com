---
title: "Optagelse af DI-guitar til Reamping: Rene Spor Uden Fizz og Clipping"
seoTitle: "Optagelse af DI-guitar til Reamping: Niveauer & Setup"
description: "Undgå fizz og clipping: optagelse af DI-guitar til reamping med de rigtige dBFS-niveauer, DI-boks-setup og kalibrering. Komplet guide til rock og metal."
date: "2026-11-23"
author: "Frederik Dinesen"
pillar: "DIY Indspilning & Tracking"
alternateSlug: "record-guitar-di-for-reamping"
faq:
  - question: "Hvilket dBFS-niveau skal min DI-guitar peake på til metal?"
    answer: "Optag i 24-bit, og sigt efter peaks mellem -12 og -6 dBFS på de hårdeste palm mutes og powerchords. Gennemsnitsniveauet (RMS) ligger typisk omkring -18 til -14 dBFS. Det giver nok headroom til, at et ekstra hårdt anslag ikke clipper, og signalet ligger stadig et godt stykke over interfacets støjgulv."
  - question: "Skal jeg bruge en DI-boks, hvis mit lydkort har en Hi-Z-indgang?"
    answer: "Ikke nødvendigvis. En moderne Hi-Z-indgang med mindst 1 MΩ impedans kan sagtens levere gode DI-spor i et hjemmestudie med korte kabler. En dedikeret DI-boks er nødvendig, når kablet er langt, for eksempel når guitaristen sidder i et andet rum end interfacet, fordi DI-boksen sender et balanceret signal på mikrofonniveau, som afviser brum og støj."
  - question: "Kan jeg bruge en passiv DI-boks baglæns som reamp box?"
    answer: "Ja, en passiv DI-boks med transformer kan køres baglæns, men en aktiv DI-boks kan ikke. Kørt baglæns forstærker transformeren signalet med cirka 20 til 30 dB, så du skal skrue tilsvarende ned for sporet i din DAW. Du risikerer samtidig brum fra jordsløjfer, og forstærkeren ser ikke den samme impedans som fra en rigtig pickup."
  - question: "Skal noise gaten være slået til, når jeg optager DI-guitar?"
    answer: "Nej. Optag og eksportér DI-sporet helt rent, uden noise gate, kompressor, pitch-korrektion eller amp sim. Du må gerne bruge en gate i dit medhør, mens du spiller, men selve gatingen hører til efter reamping eller i mixet, hvor den kan justeres til den endelige guitarlyd."
  - question: "Hvorfor lyder min reampede guitar tynd eller fizzy?"
    answer: "De mest almindelige årsager er digital clipping i DI-sporet, forkert niveau ind i forstærkeren og forkert impedans under optagelsen. Et clippet peak bliver til en hård, summende fizz, når det sendes gennem en high-gain-forstærker, og den kan ikke fjernes med EQ. Kalibrér din reamp box, så forstærkeren får samme niveau som fra guitarens pickupper."
---

Du har tracket et riff, der burde lyde som et godstog gennem en 5150. Efter reamping summer det i stedet som hvepse i en dåse, eller også lyder det tyndt og livløst. Problemet sidder næsten aldrig i forstærkeren. Det sidder i DI-sporet (direct input, det rene, uforstærkede signal direkte fra guitaren).

Når bands sender mig multitracks til mix, beder jeg altid om DI-sporene til guitar og bas, fordi reamping (at sende et allerede optaget DI-signal gennem en forstærker eller amp sim igen) giver mig mulighed for at forme guitarlyden til resten af produktionen. Men en dårlig optagelse af DI-guitar til reamping kan ingen forstærker redde. Clipping, forkert impedans og dårlig spilledisciplin ligger permanent i filen.

Kort sagt: **Optag DI-guitar i 24-bit gennem en indgang med mindst 1 MΩ impedans, med peaks mellem -12 og -6 dBFS på dine hårdeste palm mutes.** Passive pickupper skal i en aktiv DI-boks eller en Hi-Z-indgang. Aktive pickupper kan køre i en passiv DI-boks eller i en aktiv DI-boks med pad slået til. Eksportér som mono WAV fra takt 1 uden plugins, gate eller amp sim.

Her er hele processen trin for trin, fra pickup til færdig reamp.

---

## 1. Impedans: Hi-Z-indgang eller dedikeret DI-boks?

**Passive guitarpickupper skal se en indgangsimpedans på mindst 1 MΩ, ellers mister du top, bund og attack, før signalet overhovedet er optaget.** Passive pickupper har høj udgangsimpedans, og den indgang, du sætter dem i, bør have 5 til 10 gange højere impedans end pickuppen selv. Det er derfor, instrumentindgange typisk ligger på 1 til 1,5 MΩ.

Hvis du sætter guitaren i en almindelig linjeindgang på omkring 10 kΩ, belaster indgangen pickuppen. Resultatet er det, guitarister kalder "tone suck":

* Diskanten og den skarpe bid i anslaget forsvinder.
* Bunden mister definition.
* Transienterne (det første, hurtige anslag i hver tone) bliver langsommere og blødere.

### Hi-Z-indgangen på dit lydkort

Hi-Z-indgangen (instrumentindgangen) på dit interface er bygget til netop guitar. Her er engineers ikke enige. Nogle mener, at dedikerede DI-bokse altid slår indbyggede instrumentindgange. Andre viser, at moderne interfaces i mellem- og topklassen har transparente Hi-Z-indgange på 1 MΩ eller mere, som leverer fremragende DI-spor.

Min erfaring er, at en moderne Hi-Z-indgang er fin i et soveværelsesstudie med et kort kabel. Tjek manualen for indgangsimpedansen. Vær også opmærksom på, at nogle ældre budget-interfaces har meget lidt headroom (luft op til clipping) på instrumentindgangen. Aktive pickupper kan få dem til at clippe, selv med gain på minimum.

### Hvornår du skal bruge en DI-boks

En dedikeret DI-boks er nødvendig ved lange kabelføringer, for eksempel når guitaristen sidder i ét rum og interfacet står i et andet. DI-boksen omsætter guitarsignalet til et balanceret signal på mikrofonniveau med lav impedans (cirka 150 til 250 Ω), som kan køre langt i et XLR-kabel uden at opsamle brum og støj. De fleste DI-bokse har også en ground lift-kontakt, der kan fjerne brum fra jordsløjfer.

> **Pro tip:** XLR-udgangen på en DI-boks leverer mikrofonniveau. Den skal i en mikrofonforforstærker, aldrig direkte i en linjeindgang. Sætter du den i en linjeindgang, mangler du massivt gain og ender med et støjende signal.

---

## 2. Aktive eller passive pickupper: Vælg den rigtige DI-boks

**Passive pickupper skal i en aktiv DI-boks, og aktive pickupper kan køre i en passiv DI-boks.** Det er den simpleste regel for et rent DI-signal med de rigtige pickupper.

### Passive pickupper (fx Seymour Duncan, Bare Knuckle)

* Brug en **aktiv DI-boks** som Radial J48 eller Countryman Type 85, eller en Hi-Z-indgang med 1 MΩ eller mere.
* En passiv DI-boks belaster passive pickupper og tager klarhed og definition i bunden.

### Aktive pickupper (fx EMG 81/85, Fishman Fluence)

* Aktive pickupper har en indbygget forforstærker og lav udgangsimpedans. De driver en **passiv DI-boks** som Radial JDI uden problemer.
* Bruger du en aktiv DI-boks, så slå **-15 dB eller -20 dB pad'en** til på DI-boksen eller forforstærkeren. Aktive pickupper kan sende meget høje spændingspeaks afsted, når du spiller hårdt, og de kan overstyre det aktive kredsløb i DI-boksen.

### Tjek batteriet i aktive pickupper

Et døende 9V-batteri får de aktive pickupper til at komprimere og forvrænge signalet, før det når din DAW. På et rent DI-signal kan det lyde næsten uskyldigt. Når signalet bagefter sendes gennem en high-gain-forstærker, bliver det mudret og slapt. **Sæt et frisk batteri i før sessionen, og tag et ekstra med.**

---

## 3. Optagelse af DI-guitar til reamping: De rigtige dBFS-niveauer

**Optag i 24-bit (eller 32-bit float), og lad de hårdeste anslag peake mellem -12 og -6 dBFS.** Gennemsnitsniveauet (RMS) ligger typisk omkring -18 til -14 dBFS. Optag aldrig i 16-bit.

### Indstil niveauet på det hårdeste riff

Palm mutes på en downtunet guitar har enorm energi i bunden, og de peaker ofte højere end dine åbne powerchords. Indstil derfor gain'en på det mest brutale palm mute-riff i sangen, spillet så hårdt, som du rent faktisk vil spille det i en take (en optagelse). De fleste guitarister graver dybere i strengene, når der bliver trykket på record, end når de soundchecker, så de -6 dBFS er dit absolutte loft, ikke dit mål.

Den samme logik for gain staging (niveaustyring gennem hele signalkæden) gælder for vokal. Jeg har gennemgået den i [Vokalindspilning i Hjemmestudie](/blog/vokalindspilning-hjemmestudie).

### Hvorfor digital clipping ødelægger high-gain

Den analoge vane med at optage "varmt" tæt på 0 dBFS giver ingen mening i 24-bit. Dynamikområdet i 24-bit er så stort, at 6 til 12 dB headroom ikke koster noget hørbar støj. Det fjerner til gengæld risikoen for clipping.

Et enkelt clippet peak, hvor bølgeformen bliver skåret flad over 0 dBFS, skaber hård forvrængning i form af ulige overtoner og intermodulation. På et rent signal lyder det måske bare som et lille klik. Når det sendes gennem en high-gain-forstærker som en Peavey 5150 eller en Dual Rectifier, eller gennem et tungt amp sim, bliver det til en summende fizz. **Den fizz kan ikke fjernes med EQ, fordi den ligger i selve signalet.**

### Hvad med -18 dBFS peaks?

Nogle kilder fra klassisk og broadcast anbefaler at peake helt nede omkring -18 dBFS for at matche analogt nominelt niveau. Mange rock- og metal-engineers, mig selv inklusive, mener, at det bringer DI-signalet for tæt på interfacets analoge støjgulv. Når en forstærker bagefter lægger massivt gain på, bliver den støj også forstærket. Derfor er -12 til -6 dBFS peaks det tryggeste udgangspunkt til tung musik.

> **Pro tip:** Amp sims skalerer deres indgang forskelligt. Neural DSP, Helix Native, ToneX og Neural Amp Modeler forventer ikke nødvendigvis det samme niveau. Hvis lyden virker for tam eller for overstyret i et bestemt plugin, så tjek manualen, og justér med et par dB digital trim før plugin'et i stedet for at genoptage.

Den tunge bund fra palm mutes skal strammes op i mixet, ikke ved at optage DI'en svagere. Hvordan det gøres, har jeg skrevet om i [Mudret Bund i Metal Mix?](/blog/fix-mudret-low-end-metal-mix).

---

## 4. Spilledisciplin: Strenge, stemning og medhør

**Et rent DI-signal afslører alt: hver uren tone, hver ringende streng og hvert ujævnt anslag.** Når forstærkeren lægger high-gain oveni, bliver de fejl kun tydeligere. Spilledisciplinen er lige så vigtig som udstyret.

### Strenge og stemning

Jeg skifter strenge på selve optagedagen, lige før vi begynder at tracke. Mange guides anbefaler at gøre det et par dage før, men min erfaring er, at friske strenge giver den bedste brillans og en stabil stemning, når de er strukket ordentligt ind på dagen. Det gælder både guitar og bas. Når bands indspiller hos mig i [studiet i Aarhus](/indspilning-aarhus), tager de friske strenge med, og vi skifter dem, inden første take.

Herudover:

* **Tjek intonationen**, så akkorderne stemmer op ad hele halsen, især på downtunede guitarer.
* **Stem før hver take.** Ikke hver tredje. Hver gang.
* **Dæmp de strenge, du ikke spiller**, for eksempel med en strengedæmper eller en hårelastik bag sadlen. I high-gain bliver selv svag ringen til støj.
* **Hold anslaget ensartet.** Dobbelttrackede rytmeguitarer skal spilles med samme plektrum, samme vinkel og samme styrke på begge sider.

### Medhør med forstærkerlyd

Hvis du spiller med et helt rent signal i hovedtelefonerne, spiller du anderledes, end du gør gennem en forstærker. Anslagene bliver ofte for hårde eller ujævne. Lyt derfor gennem en forstærker eller et amp sim, mens du optager det rene DI-signal:

* Brug **Thru-udgangen** på DI-boksen til at sende signalet til en forstærker, mens DI-boksens XLR-udgang optager det rene signal.
* Eller læg et amp sim på DI-sporet i din DAW som **medhør**, og sæt lydkortets buffer size lavt (64 eller 128 samples), så latency ikke forstyrrer timingen.

Du må gerne have en noise gate i medhøret. Den må bare ikke ligge på selve det optagne DI-spor.

---

## 5. Reamp-kæden: Kalibrering og unity gain

**Når du reamper, skal forstærkeren få nøjagtig det samme niveau og den samme impedans, som den ville få direkte fra guitarens pickupper.** Det kaldes unity gain, og det er grunden til, at du skal bruge en reamp box.

Lydkortets linjeudgang sender et balanceret signal på linjeniveau med lav impedans. En guitarforstærker forventer et ubalanceret signal med høj impedans og lavt niveau. En reamp box (fx fra Radial eller Palmer) omsætter det ene til det andet:

1. DAW'ens linjeudgang (XLR eller balanceret jack)
2. Reamp box
3. Forstærkerens instrumentindgang
4. Mikrofon på kabinettet, tilbage ind i interfacet

Er niveauet for højt, kører forstærkerens forforstærker hårdere, og du får mere gain og fizz, end guitaren selv ville give. Er det for lavt, lyder resultatet tyndt og kraftesløst. Du løser problemet ved at kalibrere.

### Sådan kalibrerer du med loopback-metoden

1. Optag et kort, hårdt riff via din DI-boks eller Hi-Z-indgang på spor 1.
2. Send spor 1 ud af en linjeudgang på interfacet og ind i reamp boxen.
3. Sæt reamp boxens udgang i **den samme DI-boks eller Hi-Z-indgang**, du brugte til optagelsen, med præcis samme gain-indstilling.
4. Optag signalet på spor 2. Sørg for, at spor 2 ikke sendes ud af den samme udgang, ellers laver du en feedback-løkke.
5. Sammenlign peak- og RMS-niveauerne på spor 1 og spor 2. Justér reamp boxens niveauknap, indtil de matcher 1:1.
6. Notér knappens position. Nu får forstærkeren det samme niveau som fra guitaren.

> **Pro tip:** Kalibrér én gang pr. setup, og skriv indstillingen ned. Skifter du interface, udgang eller DI-boks, skal du kalibrere igen.

---

## 6. Reamping af guitar uden reamp box: Kan det betale sig?

**Ja, du kan reampe med en passiv DI-boks kørt baglæns, men det har kompromiser, du skal kende.** Du kan ikke bruge en aktiv DI-boks baglæns. Den indeholder aktive kredsløb, som kun sender signal én vej.

### Passiv DI-boks baglæns

Transformeren i en passiv DI-boks virker begge veje. Opsætningen ser sådan ud:

1. Lydkortets linjeudgang (XLR) i DI-boksens XLR-udgang.
2. DI-boksens jack-indgang i forstærkerens instrumentindgang.

Problemet er, at transformeren nu forstærker signalet i stedet for at dæmpe det. Kørt baglæns giver den typisk **20 til 30 dB ekstra niveau**. Du skal derfor skrue tilsvarende ned for sporet i din DAW. Start lavt, og skru op, ellers kører du forstærkerens indgang alt for hårdt. Hav også forstærkerens volumen nede, når du sender det første signal igennem.

Kompromiserne er:

* **Brum fra jordsløjfer.** Du har ikke den samme beskyttelse mod jordsløjfer som med en dedikeret reamp box, så du kan få kraftig brum.
* **Forkert impedans.** Forstærkeren ser ikke den samme kildeimpedans som fra en pickup, så den kan reagere anderledes på dit spil.
* **Ingen præcis niveaukontrol.** Uden en niveauknap er kalibreringen sværere at ramme.

### Buffered pedal som nødløsning

Nogle sender linjeudgangen gennem en pedal med buffered bypass, for eksempel en tuner- eller overdrive-pedal, for at omsætte impedansen. Det kan virke, men du får ingen galvanisk adskillelse mod brum, og du skal stadig skrue ned for niveauet i DAW'en.

**Til eksperimenter i øvelokalet er en baglæns passiv DI-boks fin. Hvis du reamper fast, er en dedikeret reamp box pengene værd.**

---

## 7. Sådan sender du DI-spor til din mix engineer

**DI-spor til mix skal være 24-bit mono WAV-filer i projektets samplingsfrekvens, eksporteret fra takt 1 helt uden plugins.** Det er min tjekliste, når bands sender mig guitarer til reamping:

* **Format:** 24-bit WAV (eller 32-bit float) i projektets oprindelige samplingsfrekvens, fx 44,1 kHz eller 48 kHz.
* **Mono:** Forstærkere og pedaler er mono. En stereo-DI fylder dobbelt så meget og skaber routing-rod.
* **Fra takt 1 (0:00.000):** Alle spor skal starte fra samme punkt, også selvom guitaren først kommer ind i andet vers. Så ligger alt automatisk rigtigt i min session.
* **Helt rent:** Ingen noise gate, kompressor, pitch-korrektion eller amp sim på DI-sporene.
* **Referencespor:** Send gerne et ekstra spor med din rough amp sim-lyd. Det viser, hvilken lyd du hørte, mens du spillede, og hjælper med at bedømme groove og palm mutes.
* **Logisk navngivning:** `Gtr_Rhythm_L_DI.wav`, `Gtr_Rhythm_R_DI.wav`, `Gtr_Lead_DI.wav`, `Gtr_Rhythm_L_Ref.wav`.

Hvis du vil høre, hvordan dine DI-spor holder, når de bliver reampet og mixet professionelt, kan du sende dem til et gratis og uforpligtende test-mix hos FD Sound Labs.

---

## Opsummering: De 5 vigtigste trin

1. **Ret impedans:** Passive pickupper i en aktiv DI-boks eller en Hi-Z-indgang på mindst 1 MΩ. Aktive pickupper i en passiv DI-boks eller en aktiv med -15/-20 dB pad.
2. **Rigtige niveauer:** 24-bit, peaks mellem -12 og -6 dBFS på det hårdeste palm mute-riff, ingen clipping.
3. **Spilledisciplin:** Friske strenge på dagen, stem før hver take, dæmp ubrugte strenge, og lyt gennem en forstærker eller et amp sim.
4. **Kalibrér reamp-kæden** med loopback-metoden, så forstærkeren får samme niveau som fra guitaren.
5. **Lever rent:** Mono WAV fra takt 1, ingen plugins, og et referencespor med din rough lyd.
