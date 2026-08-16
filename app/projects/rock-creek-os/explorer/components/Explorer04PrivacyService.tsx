'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '../../components/diagram-primitives';
import { explorer04, type ServiceLayer } from '../content/explorer-data';
import {
  ConceptDisclaimer,
  LayerLegend,
  OutcomeCallout,
  SystemExplorerSection,
  SystemLayerToggle,
} from './explorer-primitives';

const layerColors: Record<ServiceLayer, { swatch: string; border: string; bg: string; text: string }> = {
  guest: { swatch: 'bg-rose-500', border: 'border-rose-300', bg: 'bg-rose-50/80', text: 'text-rose-800' },
  staff: { swatch: 'bg-amber-500', border: 'border-amber-300', bg: 'bg-amber-50/80', text: 'text-amber-800' },
  infrastructure: { swatch: 'bg-violet-500', border: 'border-violet-300', bg: 'bg-violet-50/80', text: 'text-violet-800' },
};

/** Spatial positions for diagram nodes (% based) */
const spatialNodes: Record<ServiceLayer, Array<{ id: string; label: string; x: number; y: number }>> = {
  guest: [
    { id: 'lodge', label: 'Main Lodge', x: 50, y: 25 },
    { id: 'cabins', label: 'River Cabins', x: 25, y: 55 },
    { id: 'terrace', label: 'Recovery Terrace', x: 75, y: 45 },
    { id: 'trails', label: 'Trail Access', x: 60, y: 75 },
  ],
  staff: [
    { id: 'boh', label: 'Back-of-House', x: 15, y: 30 },
    { id: 'staging', label: 'Service Staging', x: 35, y: 70 },
    { id: 'delivery', label: 'Discreet Delivery', x: 55, y: 50 },
    { id: 'night', label: 'Night-Prep Route', x: 80, y: 65 },
  ],
  infrastructure: [
    { id: 'spine', label: 'Utility Spine', x: 10, y: 60 },
    { id: 'sensing', label: 'Occupancy Sensing', x: 45, y: 40 },
    { id: 'supply', label: 'Supply Nodes', x: 70, y: 25 },
    { id: 'acoustic', label: 'Acoustic Buffer', x: 85, y: 55 },
  ],
};

export function Explorer04PrivacyService() {
  const [activeLayer, setActiveLayer] = useState<ServiceLayer>('guest');
  const prefersReducedMotion = useReducedMotion();
  const layer = explorer04.layers.find((l) => l.id === activeLayer)!;
  const colors = layerColors[activeLayer];
  const nodes = spatialNodes[activeLayer];

  return (
    <SystemExplorerSection
      id="explorer-04"
      number={explorer04.number}
      title={explorer04.title}
      intro={explorer04.intro}
      designQuestion={explorer04.designQuestion}
      tone="muted"
    >
      <SystemLayerToggle
        layers={explorer04.layers.map((l) => ({
          id: l.id,
          label: l.label,
          description: l.description,
        }))}
        active={activeLayer}
        onChange={(id) => setActiveLayer(id)}
        ariaLabel="Toggle spatial service layers"
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Spatial diagram */}
        <div className="lg:col-span-7">
          <div
            className="relative min-h-[280px] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 md:min-h-[340px]"
            role="img"
            aria-label={`${layer.label} spatial diagram showing movement paths and service zones`}
          >
            {/* Property outline */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-20" aria-hidden="true">
              <path d="M10,70 Q30,20 50,25 T90,35 L85,85 Q50,95 20,80 Z" fill="none" stroke="#737373" strokeWidth="0.5" />
            </svg>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer}
                className="absolute inset-0"
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {nodes.map((node, i) => (
                  <motion.div
                    key={node.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <div
                      className={cn(
                        'rounded-lg border px-2.5 py-1.5 backdrop-blur-sm',
                        colors.border,
                        colors.bg,
                      )}
                    >
                      <span className={cn('block whitespace-nowrap font-mono text-[9px] font-bold', colors.text)}>
                        {node.label}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* Staff layer: show non-crossing paths */}
                {activeLayer === 'staff' && (
                  <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                    <path
                      d="M15,30 Q25,50 35,70 Q45,55 55,50"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="0.6"
                      strokeDasharray="2 1"
                      opacity={0.6}
                    />
                    <path
                      d="M80,65 Q65,55 55,50"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="0.6"
                      strokeDasharray="2 1"
                      opacity={0.6}
                    />
                  </svg>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <LayerLegend
            className="mt-4"
            items={[
              { swatch: layerColors.guest.swatch, label: 'Guest Layer' },
              { swatch: layerColors.staff.swatch, label: 'Staff Layer' },
              { swatch: layerColors.infrastructure.swatch, label: 'Infrastructure Layer' },
            ]}
          />
        </div>

        {/* Layer detail + service events */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 md:p-6">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-rockcreek-700">
              {layer.label}
            </p>
            <ul className="mt-4 space-y-2">
              {layer.elements.map((el) => (
                <li
                  key={el}
                  className={cn(
                    'rounded-lg border px-3 py-2 text-sm',
                    colors.border,
                    colors.bg,
                    colors.text,
                  )}
                >
                  {el}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5 md:p-6">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
              Service events
            </p>
            <ul className="mt-4 space-y-3">
              {explorer04.serviceEvents.map((event) => (
                <li key={event.id} className="border-b border-neutral-100 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-bold text-neutral-800">{event.label}</span>
                    <span
                      className={cn(
                        'shrink-0 rounded-full px-2 py-0.5 font-mono text-[9px] font-black uppercase tracking-wider',
                        event.guestVisible
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-emerald-100 text-emerald-700',
                      )}
                    >
                      {event.guestVisible ? 'Visible' : 'Invisible'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">{event.staffPath}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <OutcomeCallout label="Proposed Outcome">{explorer04.outcome}</OutcomeCallout>
      <ConceptDisclaimer>
        Spatial routing concepts are design hypotheses — not implemented service protocols or measured operational data.
      </ConceptDisclaimer>
    </SystemExplorerSection>
  );
}
