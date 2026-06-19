import type { ReactNode } from 'react';

export const contentBounds = 'container mx-auto px-6 md:px-8';

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  dark = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  dark?: boolean;
}) {
  return (
    <header className="mb-10 max-w-3xl md:mb-14">
      <p
        className={`font-mono text-[10px] font-black uppercase tracking-[0.28em] ${
          dark ? 'text-emerald-300' : 'text-emerald-700'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-4 font-tiempos text-3xl font-bold leading-tight md:text-5xl ${
          dark ? 'text-white' : 'text-neutral-950'
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-5 text-base leading-relaxed md:text-lg ${
          dark ? 'text-neutral-300' : 'text-neutral-600'
        }`}
      >
        {intro}
      </p>
    </header>
  );
}

export function ConceptTag({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${
        dark
          ? 'border-white/15 bg-white/[0.06] text-neutral-300'
          : 'border-neutral-200 bg-white text-neutral-600'
      }`}
    >
      {children}
    </span>
  );
}
