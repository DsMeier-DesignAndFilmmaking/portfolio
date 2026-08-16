'use client';

import { motion } from 'framer-motion';
import type { TwinLayer } from '../content/datasets';
import { cn } from './viz-primitives';

type DigitalTwinToggleProps = {
  active: TwinLayer;
  onChange: (layer: TwinLayer) => void;
};

const layers: Array<{ id: TwinLayer; label: string; description: string }> = [
  {
    id: 'experience',
    label: 'Experience',
    description: 'Guest spaces · trails · recovery',
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    description: 'Water · energy · connectivity · stewardship',
  },
];

export function DigitalTwinToggle({ active, onChange }: DigitalTwinToggleProps) {
  return (
    <div
      className="inline-flex rounded-lg border border-neutral-800 bg-neutral-900/80 p-0.5"
      role="radiogroup"
      aria-label="Digital twin layer"
    >
      {layers.map((layer) => {
        const isActive = active === layer.id;
        return (
          <button
            key={layer.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(layer.id)}
            className={cn(
              'relative rounded-md px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
              isActive ? 'text-neutral-100' : 'text-neutral-500 hover:text-neutral-300',
            )}
          >
            {isActive && (
              <motion.div
                layoutId="twin-toggle-bg"
                className="absolute inset-0 rounded-md border border-rockcreek-500/30 bg-rockcreek-500/10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative block font-mono text-[10px] font-black uppercase tracking-[0.14em]">
              {layer.label}
            </span>
            <span className="relative mt-0.5 hidden text-[9px] text-neutral-500 sm:block">
              {layer.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
