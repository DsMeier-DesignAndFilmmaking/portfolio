'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { cn } from '../../components/diagram-primitives';
import { explorer03 } from '../content/explorer-data';
import {
  ConceptDisclaimer,
  LayerLegend,
  OutcomeCallout,
  SystemExplorerSection,
} from './explorer-primitives';

export function Explorer03FisheryFriction() {
  const [activeIntervention, setActiveIntervention] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <SystemExplorerSection
      id="explorer-03"
      number={explorer03.number}
      title={explorer03.title}
      intro={explorer03.intro}
      tone="white"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Watershed chain — vertical on desktop, stepped on mobile */}
        <div className="lg:col-span-5">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
            System chain
          </p>
          <ol className="mt-4 space-y-0" aria-label="Watershed dependency chain">
            {explorer03.chain.map((step, index) => (
              <li key={step.id}>
                <button
                  type="button"
                  onClick={() => setActiveIntervention(step.id)}
                  className={cn(
                    'w-full rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600',
                    activeIntervention === step.id
                      ? 'border-rockcreek-600 bg-rockcreek-50'
                      : 'border-neutral-200 bg-white hover:border-rockcreek-300',
                  )}
                >
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h4 className="mt-1 font-tiempos text-lg font-bold text-neutral-950">{step.label}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.body}</p>
                </button>
                {index < explorer03.chain.length - 1 && (
                  <div className="flex justify-center py-1" aria-hidden="true">
                    <ArrowDown className="h-4 w-4 text-rockcreek-400" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Watershed diagram + interventions */}
        <div className="lg:col-span-7">
          {/* Simplified watershed SVG */}
          {
            /* PRESERVED EXCEPTION: the teal/cyan below is literal water color in a
               labeled watershed illustration (legend: Watershed/Stream Flow/Riparian
               Zone), not the page's UI accent — recoloring a stream red would be a
               representational error, not a rebrand. */
          }
          <div
            className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-b from-sky-50 to-emerald-50 p-4 md:p-6"
            role="img"
            aria-label="Watershed diagram showing water flow from ridgeline through riparian corridor to fishery habitat"
          >
            <svg viewBox="0 0 400 240" className="h-auto w-full" aria-hidden="true">
              {/* Ridgeline */}
              <path d="M0,80 Q100,40 200,60 T400,50 L400,240 L0,240 Z" fill="#e0f2fe" opacity={0.6} />
              {/* Stream */}
              <path
                d="M200,60 Q180,120 190,180 T200,230"
                fill="none"
                stroke="#0891b2"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Riparian zone */}
              <ellipse cx="195" cy="150" rx="60" ry="25" fill="#d1fae5" opacity={0.5} />
              {/* Labels */}
              <text x="200" y="35" textAnchor="middle" className="fill-neutral-600 text-[10px] font-bold">
                Ridgeline · Water Source
              </text>
              <text x="280" y="150" className="fill-emerald-700 text-[9px] font-bold">
                Riparian Corridor
              </text>
              <text x="200" y="225" textAnchor="middle" className="fill-teal-800 text-[10px] font-bold">
                Fishery Habitat
              </text>
              {/* Flow animation */}
              {!prefersReducedMotion && (
                <circle r="4" fill="#0891b2">
                  <animateMotion dur="4s" repeatCount="indefinite" path="M200,60 Q180,120 190,180 T200,230" />
                </circle>
              )}
            </svg>

            <LayerLegend
              className="mt-4"
              items={[
                { swatch: 'bg-sky-300', label: 'Watershed' },
                { swatch: 'bg-teal-500', label: 'Stream Flow' },
                { swatch: 'bg-emerald-300', label: 'Riparian Zone' },
              ]}
            />
          </div>

          {/* Intervention concepts */}
          <div className="mt-6">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
              Proposed intervention concepts
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2" aria-label="Design intervention concepts">
              {explorer03.interventions.map((intervention) => {
                const isActive = activeIntervention === intervention.id;
                return (
                  <li key={intervention.id}>
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() =>
                        setActiveIntervention(isActive ? null : intervention.id)
                      }
                      className={cn(
                        'h-full w-full rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600',
                        isActive
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-neutral-200 bg-white hover:border-emerald-300',
                      )}
                    >
                      <span className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-emerald-700">
                        Concept
                      </span>
                      <h4 className="mt-1 text-sm font-bold text-neutral-900">{intervention.label}</h4>
                      {(isActive || !activeIntervention) && (
                        <motion.p
                          initial={prefersReducedMotion ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-2 text-xs leading-relaxed text-neutral-600"
                        >
                          {intervention.description}
                        </motion.p>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <ConceptDisclaimer>{explorer03.disclaimer}</ConceptDisclaimer>
          <OutcomeCallout label="Intended Outcome">
            Decouple peak water demand from riparian health — so the fishery remains viable during the weeks guest experience places the highest load on the watershed.
          </OutcomeCallout>
        </div>
      </div>
    </SystemExplorerSection>
  );
}
