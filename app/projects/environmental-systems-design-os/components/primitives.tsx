import React from 'react';

// Systems-layer tag colors (Human / Spatial / Operational / Digital / Ecological).
const LAYER_STYLES: Record<string, string> = {
  Human: 'border-rose-200 bg-rose-50 text-rose-700',
  Spatial: 'border-sky-200 bg-sky-50 text-sky-700',
  Operational: 'border-amber-200 bg-amber-50 text-amber-700',
  Digital: 'border-violet-200 bg-violet-50 text-violet-700',
  Ecological: 'border-emerald-200 bg-emerald-50 text-emerald-700',
};
const LAYER_FALLBACK = 'border-neutral-200 bg-neutral-50 text-neutral-600';

export function LayerTags({ layers, className = '' }: { layers: string[]; className?: string }) {
  if (!layers.length) return null;
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {layers.map((layer) => (
        <span
          key={layer}
          className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
            LAYER_STYLES[layer] ?? LAYER_FALLBACK
          }`}
        >
          {layer}
        </span>
      ))}
    </div>
  );
}

// Generic neutral pill/badge.
export function Tag({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-600 ${className}`}
    >
      {children}
    </span>
  );
}

// 1–5 strategic-relevance meter.
export function RelevanceMeter({ value }: { value: number }) {
  const filled = Math.max(0, Math.min(5, value));
  return (
    <div className="flex items-center gap-2" aria-label={`Strategic relevance ${filled} of 5`}>
      <div className="flex gap-1" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-4 rounded-full ${i < filled ? 'bg-amber-500' : 'bg-neutral-200'}`}
          />
        ))}
      </div>
      <span className="font-mono text-[10px] font-bold tracking-[0.1em] text-neutral-400">
        {filled}/5
      </span>
    </div>
  );
}

// Color-coded evidence-confidence / generic level badge.
export function ConfidenceBadge({ value }: { value: string }) {
  const v = value.toLowerCase();
  let cls = 'border-neutral-200 bg-neutral-50 text-neutral-600';
  if (v.includes('validated') || v.includes('field-supported') || v.includes('high')) {
    cls = 'border-emerald-200 bg-emerald-50 text-emerald-700';
  } else if (v.includes('research-supported') || v.includes('medium')) {
    cls = 'border-amber-200 bg-amber-50 text-amber-700';
  } else if (v.includes('hypothesis') || v.includes('low')) {
    cls = 'border-rose-200 bg-rose-50 text-rose-700';
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${cls}`}>
      {value || '—'}
    </span>
  );
}

// Subtle empty-state used by every live section when its data array is empty.
export function SectionPlaceholder({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-10 text-center">
      <p className="mx-auto max-w-xl text-sm leading-relaxed text-neutral-500">{children}</p>
    </div>
  );
}
