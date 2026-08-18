import type { ReactNode } from 'react';
import { ArrowDown } from 'lucide-react';
import { cn } from '../../components/diagram-primitives';
import { evidenceTierLabels, type EvidenceTier } from '../content/evidence';

// ─────────────────────────────────────────────────────────────────────────────
// Small shared presentational pieces for the Systems Atlas sections. Mirrors
// the role `explorer/components/explorer-primitives.tsx` plays for Explorer —
// kept route-local rather than promoted to the shared `../components/`
// directory, since nothing outside `/systems` needs these.
// ─────────────────────────────────────────────────────────────────────────────

const tierStyles: Record<EvidenceTier, string> = {
  documented: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  inferred: 'border-sky-200 bg-sky-50 text-sky-800',
  proposed: 'border-violet-200 bg-violet-50 text-violet-800',
};

export function EvidenceTierBadge({ tier }: { tier: EvidenceTier }) {
  const { label, note } = evidenceTierLabels[tier];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-[0.14em]',
        tierStyles[tier],
      )}
      title={note}
    >
      {label}
    </span>
  );
}

/** Standard section header used by every Atlas section on this page. */
export function AtlasSectionHeader({
  kicker,
  number,
  title,
  intro,
  className = '',
}: {
  kicker: string;
  number: string;
  title: string;
  intro: string;
  className?: string;
}) {
  return (
    <header className={cn('mb-10 max-w-3xl md:mb-14', className)}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-rockcreek-700">
          {kicker}
        </span>
        <span className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-neutral-400">
          {number}
        </span>
      </div>
      <h2 className="mt-5 font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-5xl md:leading-tight">
        {title}
      </h2>
      <p className="mt-6 text-base leading-relaxed text-neutral-600 md:text-lg">{intro}</p>
    </header>
  );
}

/** Vertical step connector, identical in spirit to the one Explorer uses for its chains. */
export function StepArrow({ className = '' }: { className?: string }) {
  return (
    <div className={cn('flex justify-center py-1.5', className)} aria-hidden="true">
      <ArrowDown className="h-4 w-4 text-neutral-300" />
    </div>
  );
}

export function EvidenceNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 flex gap-2 text-xs leading-relaxed text-neutral-500">
      <span className="font-mono font-black uppercase tracking-[0.14em] text-neutral-400">Evidence</span>
      <span>{children}</span>
    </p>
  );
}
