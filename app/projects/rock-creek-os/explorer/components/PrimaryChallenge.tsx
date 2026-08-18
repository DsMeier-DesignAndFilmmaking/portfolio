'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { cn } from '../../components/diagram-primitives';
import { evidenceTierLabels, primaryChallenge, type EvidenceTier } from '../content/explorer-data';
import { OutcomeCallout, useExplorerMotion } from './explorer-primitives';

// ─────────────────────────────────────────────────────────────────────────────
// The primary problem. Deliberately the heaviest section on the page: it is
// the only one with a full interactive chain, the only one carrying a design
// question, and the only one rendered at this type scale.
//
// The watershed illustration is carried over from the previous Explorer 03
// (Fishery Friction) — it was the one visual on the old page that was already
// on-topic for hydrology. Its framing changed, though: the old section used it
// to argue about water *consumption* (irrigation vs. riparian draw). Here it
// carries thermal stress and the closure threshold, which is what actually
// drives the orchestration problem.
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

export function PrimaryChallenge() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const { fade, transition } = useExplorerMotion();
  const steps = primaryChallenge.chain;
  const active = steps[activeIndex];

  return (
    <section
      id={primaryChallenge.id}
      aria-labelledby={`${primaryChallenge.id}-title`}
      className="scroll-mt-24 bg-white py-16 md:py-28"
    >
      <div className="container mx-auto px-6 md:px-8">
        <header className="mb-10 max-w-3xl md:mb-14">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-rockcreek-300 bg-rockcreek-600 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white">
              {primaryChallenge.kicker}
            </span>
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-neutral-400">
              {primaryChallenge.number}
            </span>
          </div>

          <h2
            id={`${primaryChallenge.id}-title`}
            className="mt-5 font-tiempos text-4xl font-bold leading-tight text-neutral-950 md:text-6xl md:leading-tight"
          >
            {primaryChallenge.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
            {primaryChallenge.intro}
          </p>
          <blockquote className="mt-6 border-l-2 border-rockcreek-600 pl-4 font-tiempos text-lg italic text-neutral-700 md:text-xl">
            {primaryChallenge.designQuestion}
          </blockquote>
        </header>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Causal chain — every step is a button, vertical at all widths so
              nothing hides off-screen the way a horizontal scroller would. */}
          <div className="lg:col-span-5">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
              Causal chain
            </p>
            <ol className="mt-4" aria-label="Hydrological causal chain">
              {steps.map((step, index) => {
                const isActive = index === activeIndex;
                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      aria-current={isActive ? 'step' : undefined}
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        'w-full rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600 focus-visible:ring-offset-2',
                        isActive
                          ? 'border-rockcreek-600 bg-rockcreek-50'
                          : 'border-neutral-200 bg-white hover:border-rockcreek-300',
                      )}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <EvidenceTierBadge tier={step.tier} />
                      </span>
                      <span className="mt-2 block font-tiempos text-lg font-bold leading-snug text-neutral-950">
                        {step.label}
                      </span>
                    </button>
                    {index < steps.length - 1 && (
                      <div className="flex justify-center py-1" aria-hidden="true">
                        <ArrowDown className="h-4 w-4 text-rockcreek-400" />
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Detail + watershed illustration */}
          <div className="lg:col-span-7">
            <motion.div
              key={active.id}
              {...fade}
              transition={transition}
              className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-rockcreek-700">
                  Step {String(activeIndex + 1).padStart(2, '0')} · {active.label}
                </p>
                <EvidenceTierBadge tier={active.tier} />
              </div>
              <p className="mt-4 text-base leading-relaxed text-neutral-700 md:text-lg">{active.body}</p>
              {active.detail && (
                <p className="mt-4 border-t border-neutral-100 pt-4 text-sm leading-relaxed text-neutral-500">
                  {active.detail}
                </p>
              )}
            </motion.div>

            {/*
              PRESERVED EXCEPTION: the teal/cyan below is literal water colour in
              a labelled watershed illustration, not the page's UI accent —
              recolouring a stream red would be a representational error.
            */}
            <div
              className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-b from-sky-50 to-emerald-50 p-4 md:p-6"
              role="img"
              aria-label="Watershed illustration: water descends from the ridgeline through the riparian corridor to trout habitat, where a 70 degree Fahrenheit threshold governs whether fishing remains open."
            >
              <svg viewBox="0 0 400 210" className="h-auto w-full" aria-hidden="true">
                <path d="M0,70 Q100,32 200,52 T400,42 L400,210 L0,210 Z" fill="#e0f2fe" opacity={0.6} />
                <path
                  d="M200,52 Q180,110 190,165 T200,205"
                  fill="none"
                  stroke="#0891b2"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <ellipse cx="195" cy="138" rx="58" ry="24" fill="#d1fae5" opacity={0.5} />
                <text x="200" y="26" textAnchor="middle" className="fill-neutral-600 text-[10px] font-bold">
                  Ridgeline · Snowmelt source
                </text>
                <text x="278" y="138" className="fill-emerald-700 text-[9px] font-bold">
                  Riparian corridor
                </text>
                <text x="200" y="198" textAnchor="middle" className="fill-teal-800 text-[10px] font-bold">
                  Trout habitat · 70°F threshold
                </text>
                {!prefersReducedMotion && (
                  <circle r="4" fill="#0891b2">
                    <animateMotion dur="4s" repeatCount="indefinite" path="M200,52 Q180,110 190,165 T200,205" />
                  </circle>
                )}
              </svg>
            </div>

            <OutcomeCallout label="Why this is the primary problem">
              {primaryChallenge.outcome}
            </OutcomeCallout>
          </div>
        </div>
      </div>
    </section>
  );
}
