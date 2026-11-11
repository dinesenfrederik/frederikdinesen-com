'use client';

import React, { useRef, useState } from 'react';

export interface AudioCompareData {
  title: string;
  before: string;
  after: string;
  caption?: string;
}

/** Before/after player: one shared play position, switch between the raw and the finished mix. */
export default function AudioCompare({ data, lang }: { data: AudioCompareData; lang: 'da' | 'en' }) {
  const isDa = lang === 'da';
  const beforeRef = useRef<HTMLAudioElement>(null);
  const afterRef = useRef<HTMLAudioElement>(null);
  const [version, setVersion] = useState<'before' | 'after'>('after');
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const active = () => (version === 'before' ? beforeRef.current : afterRef.current);

  const toggle = async () => {
    const el = active();
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      try {
        await el.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  const switchTo = async (v: 'before' | 'after') => {
    if (v === version) return;
    const from = active();
    const to = v === 'before' ? beforeRef.current : afterRef.current;
    if (!from || !to) return;
    to.currentTime = from.currentTime;
    from.pause();
    setVersion(v);
    if (playing) {
      try {
        await to.play();
      } catch {
        setPlaying(false);
      }
    }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = Number(e.target.value);
    [beforeRef.current, afterRef.current].forEach((el) => {
      if (el) el.currentTime = t;
    });
    setTime(t);
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const onTime = (v: 'before' | 'after') => (e: React.SyntheticEvent<HTMLAudioElement>) => {
    if (v === version) setTime(e.currentTarget.currentTime);
  };
  const onMeta = (e: React.SyntheticEvent<HTMLAudioElement>) => setDuration((d) => d || e.currentTarget.duration || 0);

  const btn = (v: 'before' | 'after', label: string) => (
    <button
      type="button"
      onClick={() => switchTo(v)}
      aria-pressed={version === v}
      className={`px-4 py-2 rounded-full font-mono text-sm font-semibold transition-colors ${
        version === v ? 'bg-amber text-obsidian' : 'bg-zinc-900 border border-[#222228] text-zinc-300 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <figure className="my-10 bg-[#0D0D11] border border-[#222228] rounded-2xl p-6 sm:p-8 not-prose">
      <div className="font-mono text-xs uppercase tracking-widest text-amber mb-2">
        {isDa ? 'Hør før/efter' : 'Listen: before/after'}
      </div>
      <div className="text-xl font-bold text-white mb-5">{data.title}</div>
      <div className="flex flex-wrap items-center gap-4 mb-5">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? (isDa ? 'Pause' : 'Pause') : isDa ? 'Afspil' : 'Play'}
          className="w-12 h-12 rounded-full bg-amber text-obsidian flex items-center justify-center hover:scale-105 transition-transform"
        >
          {playing ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
          ) : (
            <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
        <div className="flex gap-2">
          {btn('before', isDa ? 'Før mix' : 'Before mix')}
          {btn('after', isDa ? 'Færdigt mix' : 'Final mix')}
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={time}
        onChange={seek}
        aria-label={isDa ? 'Afspilningsposition' : 'Playback position'}
        className="w-full accent-amber"
      />
      <div className="flex justify-between font-mono text-xs text-zinc-400 mt-1">
        <span>{fmt(time)}</span>
        <span>{duration ? fmt(duration) : '–:––'}</span>
      </div>
      {data.caption && <figcaption className="text-zinc-400 text-sm mt-4">{data.caption}</figcaption>}
      <audio ref={beforeRef} src={data.before} preload="metadata" onTimeUpdate={onTime('before')} onLoadedMetadata={onMeta} onEnded={() => setPlaying(false)} />
      <audio ref={afterRef} src={data.after} preload="metadata" onTimeUpdate={onTime('after')} onLoadedMetadata={onMeta} onEnded={() => setPlaying(false)} />
    </figure>
  );
}
