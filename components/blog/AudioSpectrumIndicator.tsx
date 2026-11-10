import React from 'react';

export default function AudioSpectrumIndicator() {
  return (
    <div
      className="inline-flex items-center gap-[3px] h-4 px-2 py-0.5 rounded bg-zinc-900/80 border border-[#222228]"
      title="Studio Master Track"
      aria-hidden="true"
    >
      <span className="w-[3px] h-3 bg-amber rounded-full animate-[pulse_1.2s_ease-in-out_infinite]" />
      <span
        className="w-[3px] h-2 bg-amber rounded-full animate-[pulse_0.9s_ease-in-out_infinite]"
        style={{ animationDelay: '0.2s' }}
      />
      <span
        className="w-[3px] h-4 bg-amber rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"
        style={{ animationDelay: '0.4s' }}
      />
      <span
        className="w-[3px] h-2.5 bg-amber rounded-full animate-[pulse_1.1s_ease-in-out_infinite]"
        style={{ animationDelay: '0.1s' }}
      />
      <span
        className="w-[3px] h-3.5 bg-amber rounded-full animate-[pulse_1.3s_ease-in-out_infinite]"
        style={{ animationDelay: '0.3s' }}
      />
    </div>
  );
}

