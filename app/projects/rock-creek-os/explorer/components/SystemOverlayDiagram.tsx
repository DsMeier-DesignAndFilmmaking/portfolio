'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn, toneStyles } from '../../components/diagram-primitives';
import { overlayNodes, type OverlayNode } from '../content/explorer-data';
import { useExplorerMotion } from './explorer-primitives';

// ─────────────────────────────────────────────────────────────────────────────
// The page's strongest visual: the moment hydrology, wildfire, stewardship
// intelligence, logistics, and guest experience are shown as ONE chain rather
// than three problems.
//
// Built from DOM elements, not SVG, on purpose. An SVG diagram with embedded
// <text> either scales its labels down to unreadable at 375px or needs a second
// hand-maintained mobile variant. Laying it out as flex/grid boxes means the
// labels are real text at every width — selectable, translatable, zoomable, and
// readable by a screen reader in document order — and the responsive change
// becomes a genuine re-layout rather than a shrink.
//
// The two-column convergence (hydrology | wildfire) is the only part that is
// width-dependent: at `md` and up the inputs sit side by side and visibly merge
// into the intelligence layer; below `md` they stack, and the "both feed the
// same next thing" relationship is carried by the connector rail and the
// explicit PRIMARY / SUPPORTING labels instead of by horizontal position.
//
// Emphasis is deliberate and asymmetric — `primary` renders larger, with a
// filled marker and a ring; `supporting` renders lighter. Hydrology must never
// read as a peer of wildfire here, because that is the exact misreading this
// whole page is built to prevent.
// ─────────────────────────────────────────────────────────────────────────────

const byId = (id: string) => overlayNodes.find((n) => n.id === id)!;

function NodeButton({
  node,
  isActive,
  onSelect,
  className = '',
}: {
  node: OverlayNode;
  isActive: boolean;
  onSelect: (id: string) => void;
  className?: string;
}) {
  const tone = toneStyles[node.tone];
  const isPrimary = node.emphasis === 'primary';

  return (
    <button
      type="button"
      onClick={() => onSelect(node.id)}
      aria-pressed={isActive}
      className={cn(
        'group w-full rounded-2xl border text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600 focus-visible:ring-offset-2',
        isPrimary ? 'p-5 md:p-6' : 'p-4 md:p-5',
        tone.card,
        isActive ? 'border-neutral-900 ring-2 ring-neutral-900' : 'hover:border-neutral-400',
        className,
      )}
    >
      <span className="flex items-center gap-2">
        <span
          className={cn(
            'shrink-0 rounded-full',
            tone.dot,
            isPrimary ? 'h-3 w-3 ring-4 ring-white' : 'h-2 w-2',
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            'font-mono font-black uppercase tracking-[0.16em]',
            isPrimary ? 'text-[10px]' : 'text-[9px]',
            tone.text,
          )}
        >
          {node.role}
        </span>
      </span>
      <span
        className={cn(
          'mt-2 block font-tiempos font-bold leading-tight text-neutral-950',
          isPrimary ? 'text-xl md:text-2xl' : 'text-base md:text-lg',
        )}
      >
        {node.label}
      </span>
    </button>
  );
}

/** Vertical connector between stacked stages. */
function Rail({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-2" aria-hidden="true">
      <span className="h-5 w-px bg-neutral-300 md:h-7" />
      {label && (
        <span className="my-1 font-mono text-[9px] font-black uppercase tracking-[0.16em] text-neutral-400">
          {label}
        </span>
      )}
      <span className="h-5 w-px bg-neutral-300 md:h-7" />
      <span className="-mt-1 text-neutral-300">▼</span>
    </div>
  );
}

export function SystemOverlayDiagram() {
  const [activeId, setActiveId] = useState<string>('hydrology');
  const { fade, transition } = useExplorerMotion();
  const active = byId(activeId);

  const flowAfterInputs = ['stewardship', 'operations', 'logistics', 'experience'];

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* ── The chain ────────────────────────────────────────────────── */}
      <div className="lg:col-span-7">
        <NodeButton node={byId('landscape')} isActive={activeId === 'landscape'} onSelect={setActiveId} />

        <Rail label="produces conditions" />

        {/* Two environmental inputs. Side by side at md+, stacked below.
            The primary/supporting asymmetry is carried by NodeButton's own
            emphasis styling, so it survives the stack. */}
        <div className="grid gap-3 md:grid-cols-5 md:items-stretch md:gap-4">
          <div className="md:col-span-3">
            <NodeButton node={byId('hydrology')} isActive={activeId === 'hydrology'} onSelect={setActiveId} className="h-full" />
          </div>
          <div className="md:col-span-2">
            <NodeButton node={byId('wildfire')} isActive={activeId === 'wildfire'} onSelect={setActiveId} className="h-full" />
          </div>
        </div>

        <Rail label="both feed" />

        {flowAfterInputs.map((id, index) => (
          <div key={id}>
            <NodeButton node={byId(id)} isActive={activeId === id} onSelect={setActiveId} />
            {index < flowAfterInputs.length - 1 && <Rail />}
          </div>
        ))}
      </div>

      {/* ── Detail panel ─────────────────────────────────────────────── */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <motion.div
            key={active.id}
            {...fade}
            transition={transition}
            className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8"
          >
            <p className={cn('font-mono text-[10px] font-black uppercase tracking-[0.2em]', toneStyles[active.tone].text)}>
              {active.role}
            </p>
            <h3 className="mt-3 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
              {active.label}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-neutral-700">{active.detail}</p>
          </motion.div>

          <p className="mt-4 text-xs leading-relaxed text-neutral-500">
            Select any stage to read its role in the chain.
          </p>
        </div>
      </div>
    </div>
  );
}
