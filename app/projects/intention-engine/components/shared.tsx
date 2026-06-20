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
      <p className={`font-mono text-[10px] font-black uppercase tracking-[0.26em] ${dark ? 'text-amber-200' : 'text-emerald-800'}`}>
        {eyebrow}
      </p>
      <h2 id={id} className={`mt-4 font-tiempos text-3xl font-bold leading-tight md:text-5xl ${dark ? 'text-white' : 'text-neutral-950'}`}>
        {title}
      </h2>
      <p className={`mt-5 text-base leading-relaxed md:text-lg ${dark ? 'text-stone-300' : 'text-neutral-600'}`}>
        {intro}
      </p>
    </header>
  );
}

export function Tag({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.13em] ${
      dark ? 'border-white/15 bg-white/[0.05] text-stone-200' : 'border-stone-200 bg-white text-stone-700'
    }`}>
      {children}
    </span>
  );
}
