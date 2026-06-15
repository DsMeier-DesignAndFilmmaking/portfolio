import type { ReactNode } from 'react';

export type DiagramTone =
  | 'ranch'
  | 'signal'
  | 'confidence'
  | 'recovery'
  | 'operations'
  | 'stewardship'
  | 'neutral';

export type ConfidenceLevel = 'low' | 'medium' | 'high' | 'recovery';

type BaseProps = {
  className?: string;
};

const toneClasses: Record<DiagramTone, {
  card: string;
  node: string;
  label: string;
  accent: string;
  chip: string;
}> = {
  ranch: {
    card: 'border-stone-200 bg-stone-50/70',
    node: 'border-stone-200 bg-white text-stone-900',
    label: 'text-stone-600',
    accent: 'bg-stone-500',
    chip: 'border-stone-200 bg-stone-50 text-stone-700',
  },
  signal: {
    card: 'border-sky-100 bg-sky-50/60',
    node: 'border-sky-100 bg-white text-slate-900',
    label: 'text-sky-700',
    accent: 'bg-sky-500',
    chip: 'border-sky-100 bg-sky-50 text-sky-700',
  },
  confidence: {
    card: 'border-cyan-100 bg-cyan-50/60',
    node: 'border-cyan-100 bg-white text-slate-900',
    label: 'text-cyan-700',
    accent: 'bg-cyan-500',
    chip: 'border-cyan-100 bg-cyan-50 text-cyan-700',
  },
  recovery: {
    card: 'border-emerald-100 bg-emerald-50/60',
    node: 'border-emerald-100 bg-white text-slate-900',
    label: 'text-emerald-700',
    accent: 'bg-emerald-500',
    chip: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  },
  operations: {
    card: 'border-indigo-100 bg-indigo-50/50',
    node: 'border-indigo-100 bg-white text-slate-900',
    label: 'text-indigo-700',
    accent: 'bg-indigo-500',
    chip: 'border-indigo-100 bg-indigo-50 text-indigo-700',
  },
  stewardship: {
    card: 'border-teal-100 bg-teal-50/55',
    node: 'border-teal-100 bg-white text-slate-900',
    label: 'text-teal-700',
    accent: 'bg-teal-500',
    chip: 'border-teal-100 bg-teal-50 text-teal-700',
  },
  neutral: {
    card: 'border-neutral-200 bg-white',
    node: 'border-neutral-200 bg-white text-neutral-900',
    label: 'text-neutral-500',
    accent: 'bg-neutral-400',
    chip: 'border-neutral-200 bg-neutral-50 text-neutral-600',
  },
};

const confidenceClasses: Record<ConfidenceLevel, string> = {
  low: 'border-amber-200 bg-amber-50 text-amber-800',
  medium: 'border-sky-200 bg-sky-50 text-sky-800',
  high: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  recovery: 'border-violet-200 bg-violet-50 text-violet-800',
};

const matrixColumnClasses: Record<2 | 3 | 4, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function DiagramShell({
  eyebrow,
  title,
  description,
  children,
  className = '',
}: BaseProps & {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        'rounded-[1.5rem] border border-neutral-200 bg-white p-4 shadow-sm shadow-neutral-950/[0.03] md:p-6 lg:p-8',
        className
      )}
    >
      <header className="mb-6 max-w-3xl border-b border-neutral-100 pb-6 md:mb-8">
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-tiempos text-2xl font-bold leading-tight text-neutral-950 md:text-3xl">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 md:text-base">
          {description}
        </p>
      </header>
      {children}
    </section>
  );
}

export function DiagramCard({
  label,
  title,
  description,
  children,
  tone = 'neutral',
  className = '',
}: BaseProps & {
  label: string;
  title: string;
  description?: string;
  children?: ReactNode;
  tone?: DiagramTone;
}) {
  const toneClass = toneClasses[tone];

  return (
    <article className={cn('rounded-2xl border p-5 md:p-6', toneClass.card, className)}>
      <div className="flex items-start gap-3">
        <span className={cn('mt-1 h-2 w-2 shrink-0 rounded-full', toneClass.accent)} aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className={cn('font-mono text-[10px] font-black uppercase tracking-[0.22em]', toneClass.label)}>
            {label}
          </p>
          <h3 className="mt-2 font-tiempos text-xl font-bold leading-tight text-neutral-950">
            {title}
          </h3>
          {description && (
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              {description}
            </p>
          )}
          {children && <div className="mt-5">{children}</div>}
        </div>
      </div>
    </article>
  );
}

export function DiagramNode({
  label,
  description,
  tone = 'neutral',
  className = '',
}: BaseProps & {
  label: string;
  description?: string;
  tone?: DiagramTone;
}) {
  const toneClass = toneClasses[tone];

  return (
    <div className={cn('rounded-xl border px-4 py-3', toneClass.node, className)}>
      <p className={cn('text-sm font-bold leading-snug', description ? 'text-neutral-950' : '')}>
        {label}
      </p>
      {description && (
        <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
          {description}
        </p>
      )}
    </div>
  );
}

export function DiagramConnector({ className = '' }: BaseProps) {
  return (
    <div className={cn('flex items-center justify-center py-2 md:px-2 md:py-0', className)} aria-hidden="true">
      <div className="flex h-8 w-px items-end justify-center bg-neutral-200 md:h-px md:w-12 md:items-center md:justify-end">
        <svg className="h-3 w-3 rotate-90 text-neutral-300 md:rotate-0" viewBox="0 0 12 12" fill="none">
          <path d="M2 6h7M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export function TraceRail({
  steps,
  children,
  className = '',
}: BaseProps & {
  steps?: Array<{
    title: string;
    description: string;
    meta?: string;
    tone?: DiagramTone;
  }>;
  children?: ReactNode;
}) {
  return (
    <div className={cn('relative space-y-4 pl-8', className)}>
      <div className="absolute bottom-4 left-[11px] top-4 w-px bg-neutral-200" aria-hidden="true" />
      {steps
        ? steps.map((step, index) => (
            <TraceStep
              key={`${step.title}-${index}`}
              index={index + 1}
              title={step.title}
              description={step.description}
              meta={step.meta}
              tone={step.tone}
            />
          ))
        : children}
    </div>
  );
}

export function TraceStep({
  index,
  title,
  description,
  meta,
  tone = 'neutral',
  children,
  className = '',
}: BaseProps & {
  index: number;
  title: string;
  description: string;
  meta?: string;
  tone?: DiagramTone;
  children?: ReactNode;
}) {
  const toneClass = toneClasses[tone];

  return (
    <article className={cn('relative rounded-2xl border border-neutral-200 bg-white p-4 md:p-5', className)}>
      <div className={cn('absolute -left-[2.1rem] top-5 flex h-6 w-6 items-center justify-center rounded-full border bg-white', toneClass.card)}>
        <span className={cn('h-2 w-2 rounded-full', toneClass.accent)} aria-hidden="true" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className={cn('font-mono text-[10px] font-black uppercase tracking-[0.2em]', toneClass.label)}>
          {String(index).padStart(2, '0')}
        </span>
        {meta && (
          <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500">
            {meta}
          </span>
        )}
      </div>
      <h3 className="mt-2 text-base font-bold leading-snug text-neutral-950">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
        {description}
      </p>
      {children && <div className="mt-4">{children}</div>}
    </article>
  );
}

export function SignalBadge({
  children,
  tone = 'neutral',
  className = '',
}: BaseProps & {
  children: ReactNode;
  tone?: DiagramTone;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]',
        toneClasses[tone].chip,
        className
      )}
    >
      {children}
    </span>
  );
}

export function ConfidencePill({
  children,
  level = 'medium',
  className = '',
}: BaseProps & {
  children: ReactNode;
  level?: ConfidenceLevel;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]',
        confidenceClasses[level],
        className
      )}
    >
      {children}
    </span>
  );
}

export function MatrixGrid({
  children,
  columns = 3,
  className = '',
}: BaseProps & {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}) {
  return (
    <div className={cn('grid gap-4', matrixColumnClasses[columns], className)}>
      {children}
    </div>
  );
}

export function MatrixCell({
  label,
  title,
  description,
  meta,
  children,
  tone = 'neutral',
  className = '',
}: BaseProps & {
  label?: string;
  title: string;
  description?: string;
  meta?: string;
  children?: ReactNode;
  tone?: DiagramTone;
}) {
  const toneClass = toneClasses[tone];

  return (
    <article className={cn('min-h-[150px] rounded-2xl border p-4 md:p-5', toneClass.card, className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          {label && (
            <p className={cn('font-mono text-[10px] font-black uppercase tracking-[0.2em]', toneClass.label)}>
              {label}
            </p>
          )}
          <h3 className="mt-2 text-base font-bold leading-snug text-neutral-950">
            {title}
          </h3>
        </div>
        {meta && (
          <span className="shrink-0 rounded-full border border-neutral-200 bg-white px-2 py-0.5 text-[10px] font-bold text-neutral-500">
            {meta}
          </span>
        )}
      </div>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          {description}
        </p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </article>
  );
}

export function BlueprintLane({
  title,
  description,
  children,
  tone = 'neutral',
  className = '',
}: BaseProps & {
  title: string;
  description?: string;
  children: ReactNode;
  tone?: DiagramTone;
}) {
  const toneClass = toneClasses[tone];

  return (
    <section className={cn('rounded-2xl border p-4 md:p-5', toneClass.card, className)}>
      <header className="mb-4">
        <p className={cn('font-mono text-[10px] font-black uppercase tracking-[0.2em]', toneClass.label)}>
          Blueprint Lane
        </p>
        <h3 className="mt-2 text-lg font-bold leading-tight text-neutral-950">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            {description}
          </p>
        )}
      </header>
      <div className="grid gap-3 md:grid-cols-3">
        {children}
      </div>
    </section>
  );
}

export function BlueprintMoment({
  index,
  title,
  description,
  meta,
  children,
  tone = 'neutral',
  className = '',
}: BaseProps & {
  index?: number;
  title: string;
  description?: string;
  meta?: string;
  children?: ReactNode;
  tone?: DiagramTone;
}) {
  const toneClass = toneClasses[tone];

  return (
    <article className={cn('rounded-xl border bg-white p-4', toneClass.node, className)}>
      <div className="flex items-center justify-between gap-3">
        <p className={cn('font-mono text-[10px] font-black uppercase tracking-[0.18em]', toneClass.label)}>
          {typeof index === 'number' ? String(index).padStart(2, '0') : 'Moment'}
        </p>
        {meta && (
          <span className="rounded-full bg-neutral-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-500">
            {meta}
          </span>
        )}
      </div>
      <h4 className="mt-2 text-sm font-bold leading-snug text-neutral-950">
        {title}
      </h4>
      {description && (
        <p className="mt-2 text-xs leading-relaxed text-neutral-500">
          {description}
        </p>
      )}
      {children && <div className="mt-3">{children}</div>}
    </article>
  );
}
