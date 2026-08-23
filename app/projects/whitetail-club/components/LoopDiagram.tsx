import React from 'react';
import { loopNodes, loopAnnotations } from '../content';

/**
 * The defining loop. Rendered as semantic markup rather than a fixed-width SVG so it
 * reflows on mobile without a horizontal scroll — the arrows rotate, the nodes stack.
 */
export function LoopDiagram() {
  return (
    <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 md:p-8">
      <ol className="grid gap-3 md:grid-cols-5">
        {loopNodes.map((node, i) => (
          <li key={node.id} className="relative">
            <div className="h-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-5">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-amber-600">
                {String(i + 1).padStart(2, '0')}
              </p>
              <p className="mt-3 font-tiempos text-lg font-bold leading-tight text-neutral-950">{node.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-neutral-500">{node.note}</p>
            </div>
            {i < loopNodes.length - 1 && (
              <span
                aria-hidden="true"
                className="mx-auto my-1 block text-center text-neutral-300 md:absolute md:-right-2.5 md:top-1/2 md:my-0 md:-translate-y-1/2"
              >
                ↓<span className="hidden md:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>

      <p className="mt-6 border-t border-neutral-200 pt-5 text-sm leading-relaxed text-neutral-600">
        The loop closes: what an observation records becomes the context on the next decision at that place.
        Three annotations carry the whole argument — strip them and this is a work-order system.
      </p>

      <dl className="mt-5 grid gap-4 md:grid-cols-3">
        {loopAnnotations.map((a) => (
          <div key={a.on} className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
            <dt className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-amber-700">{a.on}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-neutral-700">{a.text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
