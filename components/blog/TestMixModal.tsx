'use client';

import React, { useState, useEffect } from 'react';

export const WEB3FORMS_ACCESS_KEY = 'a73841c5-00b2-4351-9783-404ac2866bbd';

interface TestMixModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'da' | 'en';
  defaultService?: string;
}

export default function TestMixModal({
  isOpen,
  onClose,
  lang = 'da',
  defaultService,
}: TestMixModalProps) {
  const isDa = lang === 'da';

  const defaultServiceName = isDa ? 'Gratis Test-Mix' : 'Free Sample Mix';
  const [selectedService, setSelectedService] = useState(defaultService || defaultServiceName);
  const [name, setName] = useState('');
  const [band, setBand] = useState('');
  const [email, setEmail] = useState('');
  const [musicRef, setMusicRef] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    service: string;
    email: string;
    musicRef: string;
  } | null>(null);

  // Sync service if prop changes
  useEffect(() => {
    if (defaultService) {
      setSelectedService(defaultService);
    } else {
      setSelectedService(defaultServiceName);
    }
  }, [defaultService, defaultServiceName]);

  // Lock body scroll and listen for Escape key when open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const services = isDa
    ? [
        'Gratis Test-Mix',
        'Full Mix',
        'Studio Tracking',
        'Tracking & Full Mix',
        'Andet / Spørgsmål',
      ]
    : [
        'Free Sample Mix',
        'Full Mix',
        'Studio Tracking',
        'Tracking & Full Mix',
        'Other / Questions',
      ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `Ny henvendelse fra FD Sound Labs (Blog Test-Mix): ${name} / ${band}`,
      from_name: 'FD Sound Labs Website (Blog)',
      to_email: 'dinesenfrederik@gmail.com',
      name: name.trim(),
      band: band.trim(),
      email: email.trim(),
      service: selectedService,
      musicReferenceLink: musicRef.trim(),
      message: notes.trim(),
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            (isDa
              ? 'Kunne ikke afsende henvendelsen lige nu. Prøv venligst igen.'
              : 'Submission failed. Please try again.')
        );
      }

      // Track lead in Google Analytics if gtag is loaded
      try {
        const sendGtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
        if (typeof sendGtag === 'function') {
          sendGtag('event', 'generate_lead', {
            event_category: 'Contact',
            event_label: selectedService,
            value: selectedService === 'Gratis Test-Mix' || selectedService === 'Free Sample Mix' ? 0 : 2499,
          });
        }
      } catch (err) {
        console.warn('[Analytics Error]', err);
      }

      setSubmittedData({
        service: selectedService,
        email: email.trim(),
        musicRef: musicRef.trim(),
      });
    } catch (err: unknown) {
      console.error('[Web3Forms Error]', err);
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(
        msg ||
          (isDa
            ? 'Kunne ikke afsende henvendelsen lige nu. Prøv igen eller skriv direkte til dinesenfrederik@gmail.com.'
            : 'Could not send the inquiry right now. Please try again or email directly to dinesenfrederik@gmail.com.')
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmittedData(null);
    setErrorMessage(null);
    setName('');
    setBand('');
    setEmail('');
    setMusicRef('');
    setNotes('');
    setSelectedService(defaultServiceName);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-2xl bg-[#0D0D11] border border-[#222228] rounded-3xl p-6 sm:p-10 shadow-2xl my-auto text-left max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 sm:top-7 sm:right-7 text-zinc-400 hover:text-amber p-2 rounded-full hover:bg-zinc-900/60 transition-colors focus:outline-none"
          aria-label={isDa ? 'Luk' : 'Close'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submittedData ? (
          /* Success State - Identical to Main Site */
          <div className="py-6 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber/10 border border-amber/30 flex items-center justify-center text-amber">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="inline-flex items-center gap-2 border border-[#222228] rounded-full px-4 py-1 text-xs font-mono text-zinc-300 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber" />
              {isDa ? 'Henvendelse modtaget' : 'Inquiry Received'}
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
              {isDa ? 'Tak for din henvendelse!' : 'Thank you for your inquiry!'}
            </h3>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto font-sans">
              {isDa ? (
                <>
                  Vi har modtaget din besked vedrørende{' '}
                  <strong className="text-white">{submittedData.service}</strong>. Frederik vender personligt
                  tilbage til <strong className="text-white">{submittedData.email}</strong> inden for 24 timer.
                </>
              ) : (
                <>
                  We have received your inquiry regarding{' '}
                  <strong className="text-white">{submittedData.service}</strong>. Frederik will get back to{' '}
                  <strong className="text-white">{submittedData.email}</strong> within 24 hours.
                </>
              )}
            </p>

            {submittedData.musicRef && (
              <div className="p-4 bg-zinc-950 border border-[#222228] rounded-xl text-left text-xs font-mono text-zinc-300 break-all max-w-lg mx-auto">
                <span className="text-amber font-bold">
                  {isDa ? 'Demolink modtaget:' : 'Demo link received:'}{' '}
                </span>
                {submittedData.musicRef}
              </div>
            )}

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto bg-amber text-obsidian px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-amber-hover transition-colors font-sans"
              >
                {isDa ? 'Luk vindue' : 'Close window'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto text-zinc-400 hover:text-white px-6 py-3.5 text-xs font-mono transition-colors"
              >
                {isDa ? 'Send en ny henvendelse' : 'Send another inquiry'}
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <div>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 border border-[#222228] rounded-full px-4 py-1 text-xs font-medium font-mono text-zinc-300 uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
                <span>{isDa ? 'Start dit projekt • Uforpligtende' : 'Start your project • No Obligation'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white font-sans">
                {isDa ? 'Få et gratis test-mix' : 'Claim Your Free Sample Mix'}
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base font-sans">
                {isDa
                  ? 'Udfyld formularen herunder. Jeg vender tilbage inden for 24 timer.'
                  : 'Fill out the form below. I will get back to you within 24 hours.'}
              </p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-sm font-sans flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-bold">{isDa ? 'Fejl ved afsendelse' : 'Transmission error'}</p>
                  <p className="text-xs text-red-300/90 mt-1">{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 font-sans">
              {/* Name & Band Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold font-mono text-zinc-300 mb-2 uppercase tracking-wider">
                    {isDa ? 'Navn / Kontaktperson' : 'Name / Contact'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isDa ? 'Dit navn' : 'Your name'}
                    className="w-full bg-[#16161A] border border-[#222228] focus:border-amber focus:ring-1 focus:ring-amber rounded-xl p-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold font-mono text-zinc-300 mb-2 uppercase tracking-wider">
                    {isDa ? 'Band- / Artistnavn' : 'Band / Artist Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={band}
                    onChange={(e) => setBand(e.target.value)}
                    placeholder={isDa ? 'Bandnavn' : 'Band name'}
                    className="w-full bg-[#16161A] border border-[#222228] focus:border-amber focus:ring-1 focus:ring-amber rounded-xl p-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold font-mono text-zinc-300 mb-2 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@band.com"
                  className="w-full bg-[#16161A] border border-[#222228] focus:border-amber focus:ring-1 focus:ring-amber rounded-xl p-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors"
                />
              </div>

              {/* Service Selection Buttons */}
              <div>
                <label className="block text-xs font-semibold font-mono text-zinc-300 mb-2 uppercase tracking-wider">
                  {isDa ? 'Hvad har du brug for?' : 'What do you need?'}
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {services.map((service) => {
                    const isSelected = selectedService === service;
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all ${
                          isSelected
                            ? 'bg-amber text-obsidian border border-amber font-bold shadow-[0_0_12px_rgba(255,159,10,0.3)]'
                            : 'border border-[#222228] text-zinc-300 hover:border-amber/50 hover:text-white bg-[#16161A]/50'
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Music Reference Link */}
              <div>
                <label className="block text-xs font-semibold font-mono text-zinc-300 mb-1.5 uppercase tracking-wider">
                  {isDa ? 'LINK TIL DEMO ELLER TIDLIGERE MUSIK' : 'LINK TO DEMO OR PREVIOUS MUSIC'}
                </label>
                <input
                  type="text"
                  value={musicRef}
                  onChange={(e) => setMusicRef(e.target.value)}
                  placeholder={
                    isDa
                      ? 'fx Spotify, YouTube, SoundCloud eller Dropbox link...'
                      : 'e.g. Spotify, YouTube, SoundCloud, or Dropbox link...'
                  }
                  className="w-full bg-[#16161A] border border-[#222228] focus:border-amber focus:ring-1 focus:ring-amber rounded-xl p-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors"
                />
                <p className="text-xs text-zinc-400 mt-1.5 font-sans">
                  {isDa
                    ? 'Indsæt link til Spotify, SoundCloud, YouTube, Dropbox, Google Drive eller lign.'
                    : 'Insert link to Spotify, SoundCloud, YouTube, Dropbox, Google Drive, or similar.'}
                </p>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold font-mono text-zinc-300 mb-1.5 uppercase tracking-wider">
                  {isDa ? 'Fortæl kort om projektet / Noter' : 'Tell me briefly about the project / Notes'}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isDa ? 'Beskriv din vision...' : 'Describe your vision...'}
                  rows={3}
                  className="w-full bg-[#16161A] border border-[#222228] focus:border-amber focus:ring-1 focus:ring-amber rounded-xl p-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber text-obsidian font-bold rounded-full py-4 text-sm uppercase tracking-widest hover:bg-amber-hover hover:scale-[1.01] transition-all font-sans shadow-[0_0_20px_rgba(255,159,10,0.35)] disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-obsidian" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {isDa ? 'Sender henvendelse...' : 'Sending inquiry...'}
                  </span>
                ) : isDa ? (
                  'Send henvendelse →'
                ) : (
                  'Send inquiry →'
                )}
              </button>

              <p className="text-center text-xs text-zinc-400 font-sans mt-4">
                <span>
                  {isDa
                    ? 'Ved afsendelse behandler FD Sound Labs dine oplysninger for at besvare din henvendelse. Læs vores'
                    : 'By submitting, FD Sound Labs processes your information to respond to your inquiry. Read our'}{' '}
                </span>
                <a href="/terms.html" className="underline hover:text-amber transition-colors ml-1">
                  {isDa ? 'Handels- og Privatlivsbetingelser' : 'Terms and Privacy Policy'}
                </a>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

