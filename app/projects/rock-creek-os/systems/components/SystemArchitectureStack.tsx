'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn, toneStyles } from '../../components/diagram-primitives';
import { architectureCopy, architectureLayers } from '../content/systems-data';
import { AtlasSectionHeader, EvidenceTierBadge } from './systems-primitives';

// ─────────────────────────────────────────────────────────────────────────────
// Atlas 01 · The System Architecture — five layers, click to expand.
//
// This is the ONE deliberately interactive component on the page, continuing
// the practice standard the previous Systems Atlas stated explicitly: motion
// and interactivity are used sparingly, not by default. Everything else below
// this section is a static server component.
//
// Evolved from the previous Atlas's `SovereigntyLayerStack` rather than
// rebuilt from scratch — same accordion mechanics (always-visible summary,
// click to expand, `aria-expanded`/`aria-controls`, animated grid-rows
// collapse), retooled from "authority runs down / constraint runs up" to
// "signal runs down / feedback runs up." The five layers themselves are new:
// Environment → Stewardship Intelligence → Operational Decisions →
// Staff & Logistics → Guest Experience, per the foundation doc's coordination
// chain.
//
// A tone mapping keeps this visually consistent with Explorer's system
// overlay: ecological for the environmental layer, infrastructure for the
// proposed intelligence layer, operations for decisions and logistics,
// experience for the guest-facing output.
// ─────────────────────────────────────────────────────────────────────────────

const layerTones = [
  'ecological',
  'infrastructure',
  'operations',
  'operations',
  'experience',
] as const;

export function SystemArchitectureStack() {
  const [openId, setOpenId] = useState<string | null>('stewardship-intelligence');

  return (
    <section
      id={architectureCopy.id}
      aria-labelledby={`${architectureCopy.id}-title`}
      className="scroll-mt-24 bg-white py-16 md:py-28"
    >
      <div className="container mx-auto px-6 md:px-8">
        <AtlasSectionHeader
          kicker={architectureCopy.kicker}
          number={architectureCopy.number}
          title={architectureCopy.title}
          intro={architectureCopy.intro}
        />
        <h3 id={`${architectureCopy.id}-title`} className="sr-only">
          {architectureCopy.title}
        </h3>

        <div className="flex flex-col gap-2" role="list" aria-label="System architecture, five layers, top to bottom">
          {architectureLayers.map((layer, index) => {
            const tone = toneStyles[layerTones[index]];
            const isOpen = openId === layer.id;
            const panelId = `systems-layer-panel-${layer.id}`;
            const buttonId = `systems-layer-trigger-${layer.id}`;

            return (
              <div
                key={layer.id}
                role="listitem"
                className={cn(
                  'overflow-hidden rounded-2xl border transition-colors',
                  isOpen ? tone.card : 'border-neutral-200 bg-white',
                )}
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
                      <span
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-black',
                          tone.chip,
                        )}
                      >
                        {layer.number}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-tiempos text-xl font-bold leading-tight text-neutral-950 md:text-2xl">
                          {layer.name}
                        </span>
                        <span className="mt-1 block text-sm leading-snug text-neutral-600">{layer.role}</span>
                      </span>
                    </span>
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200',
                        isOpen && 'rotate-180',
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </h4>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn(
                    'grid transition-[grid-template-rows] duration-300 ease-out',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-3 border-t border-current/10 px-4 pb-5 pt-4 md:px-6 md:pb-6">
                      <p className="text-sm leading-relaxed text-neutral-700">{layer.summary}</p>

                      <div className="rounded-xl border border-neutral-200 bg-white p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                            {layer.itemsLabel}
                          </p>
                          <EvidenceTierBadge tier={layer.tier} />
                        </div>
                        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                          {layer.items.map((item) => (
                            <li key={item} className="text-sm leading-snug text-neutral-700">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                        <span className="font-mono font-bold uppercase tracking-[0.14em] text-neutral-400">
                          Depends on
                        </span>
                        {layer.dependsOn ? (
                          <span className="font-semibold text-neutral-700">{layer.dependsOn}</span>
                        ) : (
                          <span className="italic">
                            Nothing above it — the boundary condition every other layer responds to
                          </span>
                        )}
                      </div>

                      {layer.nonClaim && (
                        <div className="rounded-xl border border-violet-200 bg-violet-50/70 p-4">
                          <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-violet-700">
                            Not claimed
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-neutral-700">{layer.nonClaim}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-900 bg-neutral-950 px-5 py-4 md:px-6">
          <p className="text-sm font-semibold text-white">{architectureCopy.footerNote}</p>
        </div>
      </div>
    </section>
  );
}
