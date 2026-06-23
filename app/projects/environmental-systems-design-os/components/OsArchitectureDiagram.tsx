import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { architectureLayers, evidencePathTrace } from '../content';

const LAYER_ACCENT: Record<string, { dot: string; eyebrow: string }> = {
  inputs: { dot: 'bg-neutral-400', eyebrow: 'text-neutral-400' },
  synthesis: { dot: 'bg-sky-500', eyebrow: 'text-sky-600' },
  artifacts: { dot: 'bg-amber-500', eyebrow: 'text-amber-600' },
  outputs: { dot: 'bg-emerald-500', eyebrow: 'text-emerald-600' },
};

export function OsArchitectureDiagram() {
  return (
    <div className="rounded-[2rem] border border-neutral-200 bg-white p-4 shadow-sm shadow-neutral-950/[0.04] md:p-6 lg:p-8">
      <div className="grid gap-4 lg:grid-cols-[repeat(4,minmax(0,1fr))] lg:items-stretch">
        {architectureLayers.map((layer, index) => {
          const accent = LAYER_ACCENT[layer.id] ?? LAYER_ACCENT.inputs;
          return (
            <React.Fragment key={layer.id}>
              <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${accent.dot}`} aria-hidden="true" />
                  <p className={`font-mono text-[10px] font-black uppercase tracking-[0.24em] ${accent.eyebrow}`}>
                    Layer {layer.number}
                  </p>
                </div>
                <h3 className="mt-3 font-tiempos text-2xl font-bold text-neutral-950">{layer.name}</h3>
                <div className="mt-5 flex flex-1 flex-col gap-2">
                  {layer.items.map((item) =>
                    item.href ? (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="group flex items-center justify-between gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm font-semibold leading-snug text-neutral-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="h-4 w-4 flex-none text-neutral-300 transition-colors group-hover:text-emerald-500" aria-hidden="true" />
                      </Link>
                    ) : (
                      <div
                        key={item.label}
                        className="rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm font-semibold leading-snug text-neutral-800"
                      >
                        {item.label}
                      </div>
                    ),
                  )}
                </div>
              </div>
              {index < architectureLayers.length - 1 && (
                <div className="hidden items-center justify-center" aria-hidden="true">
                  {/* connector only rendered visually on lg via grid gap; arrow sits between cards on smaller screens */}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile/stacked flow arrows */}
      <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 lg:hidden">
        Inputs <ArrowRight className="h-4 w-4" /> Synthesis <ArrowRight className="h-4 w-4" /> Artifacts{' '}
        <ArrowRight className="h-4 w-4" /> Outputs
      </div>

      <div className="mt-8 rounded-2xl border border-neutral-900 bg-neutral-950 p-5 md:p-6">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-amber-300">
          Canonical evidence path
        </p>
        <p className="mt-3 font-mono text-xs leading-relaxed text-neutral-300 md:text-sm">
          {evidencePathTrace}
        </p>
      </div>
    </div>
  );
}
