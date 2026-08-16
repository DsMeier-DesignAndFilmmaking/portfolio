'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { sovereigntyLayerFinding, sovereigntyLayers, type SovereigntyLayerId } from '../content/frameworks';
import { FrameworkShell, MetaChip, cn, toneStyles } from './diagram-primitives';

// ─────────────────────────────────────────────────────────────────────────────
// Atlas 04 · Infrastructure Sovereignty Model — the five-layer OS stack
//
// The Atlas's one deliberately interactive artifact. Every layer's summary
// (owns / fails as) is always visible and fully readable without a click —
// interactivity reveals depth, it never gates the argument. This is the only
// client component in the Atlas; everything else stays a server component.
// ─────────────────────────────────────────────────────────────────────────────

export default function SovereigntyLayerStack() {
  const [openId, setOpenId] = useState<SovereigntyLayerId | null>('experience');

  return (
    <FrameworkShell
      id="rcos-sovereignty-stack"
      eyebrow="Atlas 04"
      title="Infrastructure Sovereignty Model"
      description="Five operating layers. Authority runs down the stack — from what the guest experiences to what the land allows. Click a layer to see its responsibilities, dependencies, metrics, and outcomes."
      summary={`A five-layer operating stack, top to bottom: Experience OS, Operations OS, Infrastructure OS, Ecological OS, and Landscape OS. Authority flows downward from Experience to Landscape; constraint flows back up. Each layer lists what it owns, its responsibilities, what it depends on, the metrics it tracks, its target outcomes, and how it fails. ${sovereigntyLayerFinding}`}
      caption={sovereigntyLayerFinding}
    >
      <div className="flex flex-col gap-2" role="list" aria-label="Infrastructure Sovereignty layers, top to bottom">
        {sovereigntyLayers.map((layer, index) => {
          const tone = toneStyles[layer.tone];
          const isOpen = openId === layer.id;
          const panelId = `rcos-layer-panel-${layer.id}`;
          const buttonId = `rcos-layer-trigger-${layer.id}`;

          return (
            <div
              key={layer.id}
              role="listitem"
              className={cn('overflow-hidden rounded-2xl border transition-colors', isOpen ? tone.card : 'border-neutral-200 bg-white')}
            >
              <h4>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : layer.id)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600 md:px-6 md:py-5"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-black', tone.chip)}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-tiempos text-xl font-bold leading-tight text-neutral-950 md:text-2xl">
                        {layer.name}
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-neutral-600">
                        {layer.owns}
                      </span>
                    </span>
                  </span>
                  <ChevronDown
                    className={cn('h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200', isOpen && 'rotate-180')}
                    aria-hidden="true"
                  />
                </button>
              </h4>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={cn('grid transition-[grid-template-rows] duration-300 ease-out', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-3 border-t border-current/10 px-4 pb-5 pt-4 md:grid-cols-2 md:px-6 md:pb-6">
                    <div className="rounded-xl border border-neutral-200 bg-white p-4">
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                        Responsibilities
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {layer.responsibilities.map((r) => (
                          <li key={r} className="text-sm leading-snug text-neutral-700">
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-neutral-200 bg-white p-4">
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                        Depends on
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {layer.dependsOn.length > 0 ? (
                          layer.dependsOn.map((depId) => {
                            const dep = sovereigntyLayers.find((l) => l.id === depId);
                            if (!dep) return null;
                            return (
                              <span
                                key={depId}
                                className={cn('inline-flex items-center rounded-lg border px-2 py-1 text-[11px] font-semibold', toneStyles[dep.tone].chip)}
                              >
                                {dep.name}
                              </span>
                            );
                          })
                        ) : (
                          <span className="text-[11px] font-semibold italic text-neutral-500">
                            The permanent boundary condition — depends on nothing above it
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="rounded-xl border border-neutral-200 bg-white p-4">
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                        Metrics
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {layer.metrics.map((m) => (
                          <li key={m} className="text-sm leading-snug text-neutral-700">
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-neutral-200 bg-white p-4">
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                        Target outcomes
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {layer.outcomes.map((o) => (
                          <li key={o} className="text-sm leading-snug text-neutral-700">
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4 md:col-span-2">
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-rose-700">
                        Fails as
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-700">{layer.failsAs}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-900 bg-neutral-950 px-5 py-4 md:px-6">
        <p className="text-sm font-semibold text-white">
          <span aria-hidden="true">↓</span> Authority <span className="sr-only">flows downward,</span>
          <span className="mx-2 text-neutral-500" aria-hidden="true">·</span>
          Constraint <span aria-hidden="true">↑</span>
          <span className="sr-only"> flows back upward.</span>
        </p>
        <MetaChip>{sovereigntyLayers.length} layers</MetaChip>
      </div>
    </FrameworkShell>
  );
}
