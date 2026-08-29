import React from 'react';
import { stewardshipSystems, architectureBoundary } from '../content';

/**
 * The five systems the landscape runs on, and the stated boundary around them.
 * Card idiom is lifted unchanged from LoopDiagram/LayerMap — same radii, borders,
 * mono eyebrow and tiempos name — because visual design on this case study is not
 * authorized to diverge. Semantic <ol>/<dl> so the order and the pairing survive
 * without the styling.
 */
export function SystemsStack() {
  return (
    <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 md:p-8">
      <ol className="grid gap-4 md:grid-cols-2">
        {stewardshipSystems.map((system, i) => (
          <li
            key={system.name}
            className={`rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-6 md:px-6 ${
              i === stewardshipSystems.length - 1 ? 'md:col-span-2' : ''
            }`}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-amber-600">
                {String(i + 1).padStart(2, '0')}
              </p>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
                {system.domain}
              </p>
            </div>
            <p className="mt-3 font-tiempos text-xl font-bold leading-tight text-neutral-950 md:text-2xl">
              {system.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{system.body}</p>
            <p className="mt-4 border-t border-neutral-200 pt-3 font-mono text-[11px] leading-relaxed text-neutral-500">
              {system.holds}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-6 border-t border-neutral-200 pt-5 text-sm leading-relaxed text-neutral-600">
        Five systems, one landscape, one record. They are not five products — they are five kinds of judgment
        that have to survive the same crew change, and the loop below is what carries them.
      </p>
    </div>
  );
}

/**
 * The refusals, rendered in the same amber-bordered treatment LoopDiagram uses for
 * its annotations. Each row states a domain a reader will expect and the reason it
 * is absent — a boundary, never a claim.
 */
export function BoundaryStrip() {
  return (
    <div className="mt-8 rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 md:mt-10 md:p-8">
      <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
        What this architecture does not cover
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600">
        A resort grounds operation is larger than the five systems above. Four domains a reader will reasonably
        expect are absent, and each is absent for a stated reason rather than an unstated one.
      </p>
      <dl className="mt-6 grid gap-4 md:grid-cols-2">
        {architectureBoundary.map((item) => (
          <div key={item.domain} className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
            <dt className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-amber-700">
              {item.domain}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-neutral-700">{item.reason}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
