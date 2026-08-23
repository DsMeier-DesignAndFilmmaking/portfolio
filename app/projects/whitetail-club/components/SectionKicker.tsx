import React from 'react';
import { Layers3 } from 'lucide-react';

// Numbered section header — mirrors the SectionKicker pattern used across the
// portfolio (eyebrow "0N // Label" + tiempos headline + optional body).
export function SectionKicker({
  eyebrow,
  title,
  children,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <header className="mb-10 max-w-3xl md:mb-14">
      <div className="mb-6 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            dark ? 'bg-amber-400 text-black' : 'bg-neutral-900 text-white'
          }`}
        >
          <Layers3 className="h-5 w-5" aria-hidden="true" />
        </div>
        <span
          className={`text-[10px] font-black uppercase tracking-[0.3em] ${
            dark ? 'text-neutral-500' : 'text-neutral-400'
          }`}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className={`font-tiempos text-3xl font-bold leading-[1.08] md:text-5xl md:leading-[1.05] ${
          dark ? 'text-white' : 'text-neutral-950'
        }`}
      >
        {title}
      </h2>
      {children && (
        <div
          className={`mt-6 max-w-2xl text-base leading-relaxed md:text-lg ${
            dark ? 'text-neutral-400' : 'text-neutral-600'
          }`}
        >
          {children}
        </div>
      )}
    </header>
  );
}
