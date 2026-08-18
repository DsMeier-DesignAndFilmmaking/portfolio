import type { ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Shared diagram primitives for every framework/diagram across the Rock Creek
// OS case study — used by both `/systems` and `/explorer`.
//
// Tailwind class strings are declared literally in static maps — never
// interpolated — so the JIT compiler can see every class it needs to emit.
//
// These three types used to live in `content/frameworks.ts`, back when this
// file was single-purpose to the (now removed) Infrastructure Sovereignty
// frameworks. Defined here directly instead, so this file has no dependency
// on any one route's content and can keep being shared as the case study's
// narrative frame changes underneath it.
// ─────────────────────────────────────────────────────────────────────────────

/** The practice's fixed semantic layer palette (studio playbook §5). */
export type SystemTone = 'experience' | 'operations' | 'infrastructure' | 'ecological' | 'landscape';

export type RelationType = 'depends' | 'constrains' | 'pressures' | 'sustains';

/** How much a change in one node actually moves another. 1 = weak, 3 = strong. */
export type InfluenceStrength = 1 | 2 | 3;

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** The practice's fixed semantic layer palette (studio playbook §5). */
export const toneStyles: Record<
  SystemTone,
  { label: string; card: string; chip: string; dot: string; text: string; rule: string }
> = {
  experience: {
    label: 'Experience',
    card: 'border-rose-200 bg-rose-50/60',
    chip: 'border-rose-200 bg-rose-50 text-rose-700',
    dot: 'bg-rose-500',
    text: 'text-rose-700',
    rule: 'bg-rose-200',
  },
  operations: {
    label: 'Operations',
    card: 'border-amber-200 bg-amber-50/60',
    chip: 'border-amber-200 bg-amber-50 text-amber-700',
    dot: 'bg-amber-500',
    text: 'text-amber-700',
    rule: 'bg-amber-200',
  },
  infrastructure: {
    label: 'Infrastructure',
    card: 'border-violet-200 bg-violet-50/60',
    chip: 'border-violet-200 bg-violet-50 text-violet-700',
    dot: 'bg-violet-500',
    text: 'text-violet-700',
    rule: 'bg-violet-200',
  },
  ecological: {
    label: 'Ecological',
    card: 'border-emerald-200 bg-emerald-50/60',
    chip: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    dot: 'bg-emerald-500',
    text: 'text-emerald-700',
    rule: 'bg-emerald-200',
  },
  landscape: {
    label: 'Landscape',
    card: 'border-sky-200 bg-sky-50/60',
    chip: 'border-sky-200 bg-sky-50 text-sky-700',
    dot: 'bg-sky-500',
    text: 'text-sky-700',
    rule: 'bg-sky-200',
  },
};

/**
 * Standard outer shell for every framework diagram.
 *
 * Renders a <figure> whose `summary` becomes an sr-only prose description —
 * the accessibility contract for all diagrams in this practice: a screen
 * reader must receive the diagram's meaning, not its geometry.
 */
export function FrameworkShell({
  id,
  eyebrow,
  title,
  description,
  summary,
  caption,
  children,
  className = '',
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  caption?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const titleId = `${id}-title`;
  const summaryId = `${id}-summary`;

  return (
    <figure
      className={cn(
        'rounded-[2rem] border border-neutral-200 bg-white p-4 shadow-sm shadow-neutral-950/[0.03] md:p-6 lg:p-8',
        className,
      )}
      aria-labelledby={titleId}
      aria-describedby={summaryId}
    >
      <header className="mb-6 max-w-3xl border-b border-neutral-100 pb-6 md:mb-8">
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-rockcreek-700">
          {eyebrow}
        </p>
        <h3 id={titleId} className="mt-3 font-tiempos text-2xl font-bold leading-tight text-neutral-950 md:text-3xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 md:text-base">{description}</p>
      </header>

      <p id={summaryId} className="sr-only">
        {summary}
      </p>

      {children}

      {caption && (
        <figcaption className="mt-6 rounded-2xl border border-neutral-900 bg-neutral-950 p-5 md:p-6">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-rockcreek-300">
            What the map shows
          </p>
          <div className="mt-3 text-sm leading-relaxed text-neutral-300">{caption}</div>
        </figcaption>
      )}
    </figure>
  );
}

/** Small labelled pill carrying a system-layer identity. Always renders its label as text. */
export function ToneChip({
  tone,
  children,
  className = '',
}: {
  tone: SystemTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]',
        toneStyles[tone].chip,
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Neutral pill for non-layer metadata (horizon, owner, tier). */
export function MetaChip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-600',
        className,
      )}
    >
      {children}
    </span>
  );
}

const relationStyles: Record<RelationType, string> = {
  depends: 'border-violet-200 bg-violet-50 text-violet-700',
  constrains: 'border-sky-200 bg-sky-50 text-sky-700',
  pressures: 'border-rose-200 bg-rose-50 text-rose-700',
  sustains: 'border-emerald-200 bg-emerald-50 text-emerald-700',
};

export function RelationBadge({ type, label }: { type: RelationType; label: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]',
        relationStyles[type],
      )}
    >
      {label}
    </span>
  );
}

/**
 * Connection-count meter. Pairs the bar with an explicit "N/total" readout so
 * the value is never carried by length alone.
 */
export function DegreeMeter({
  value,
  max,
  label,
  tone = 'accent',
}: {
  value: number;
  max: number;
  label: string;
  tone?: 'accent' | 'rose';
}) {
  const safeMax = Math.max(1, max);
  const filled = Math.max(0, Math.min(safeMax, value));
  const fill = tone === 'rose' ? 'bg-rose-500' : 'bg-rockcreek-600';

  return (
    <div className="flex items-center gap-2" aria-label={`${label}: ${filled} of ${safeMax}`}>
      <div className="flex flex-1 gap-0.5" aria-hidden="true">
        {Array.from({ length: safeMax }).map((_, i) => (
          <span
            key={i}
            className={cn('h-1.5 flex-1 rounded-full', i < filled ? fill : 'bg-neutral-200')}
          />
        ))}
      </div>
      <span className="font-mono text-[10px] font-bold tracking-[0.1em] text-neutral-500">
        {filled}/{safeMax}
      </span>
    </div>
  );
}

const healthStyles: Record<string, string> = {
  intact: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  slow: 'border-amber-200 bg-amber-50 text-amber-700',
  broken: 'border-rose-200 bg-rose-50 text-rose-700',
};

export function HealthBadge({ health }: { health: 'intact' | 'slow' | 'broken' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em]',
        healthStyles[health],
      )}
    >
      {health}
    </span>
  );
}

/** Loop polarity marker. The +/− glyph is decorative; the word carries the meaning. */
export function PolarityBadge({ polarity }: { polarity: 'reinforcing' | 'degrading' }) {
  const isReinforcing = polarity === 'reinforcing';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em]',
        isReinforcing
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-rose-200 bg-rose-50 text-rose-700',
      )}
    >
      <span aria-hidden="true">{isReinforcing ? '+' : '−'}</span>
      {polarity}
    </span>
  );
}

/** Three-dot influence-strength indicator. Always paired with a text label — never color/fill alone. */
export function StrengthDots({ value, label }: { value: InfluenceStrength; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5" aria-label={`Influence strength: ${label}`}>
      <span className="flex gap-0.5" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={cn('h-1.5 w-1.5 rounded-full', n <= value ? 'bg-neutral-700' : 'bg-neutral-200')}
          />
        ))}
      </span>
      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-neutral-500">
        {label}
      </span>
    </span>
  );
}

/** Failure-point callout. Used identically across frameworks 02 and 03. */
export function FailureCallout({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4">
      <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-rose-700">
        Failure point · {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-700">{children}</p>
    </div>
  );
}

/** Inline note marking modeled (rather than measured) values. */
export function ModeledNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 flex gap-2 text-xs leading-relaxed text-neutral-500">
      <span className="font-mono font-black uppercase tracking-[0.14em] text-neutral-400">Modeled</span>
      <span>{children}</span>
    </p>
  );
}

/** Directional connector. Horizontal from `md` up, vertical below it. */
export function FlowArrow({ className = '' }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center py-2 md:py-0', className)} aria-hidden="true">
      <svg viewBox="0 0 12 12" fill="none" className="h-3.5 w-3.5 rotate-90 text-neutral-300 md:rotate-0">
        <path
          d="M2 6h7M6 3l3 3-3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/** Legend row. Required wherever colour encodes meaning. */
export function DiagramLegend({
  items,
  className = '',
}: {
  items: Array<{ swatch: string; label: string }>;
  className?: string;
}) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-x-5 gap-y-2', className)}>
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <span className={cn('h-2 w-2 rounded-full', item.swatch)} aria-hidden="true" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
