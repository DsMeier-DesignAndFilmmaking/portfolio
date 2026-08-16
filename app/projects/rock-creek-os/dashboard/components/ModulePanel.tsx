'use client';

import { motion } from 'framer-motion';
import type { ModuleDataset } from '../content/datasets';
import { PanelFrame, ScanLine } from './viz-primitives';
import { SystemGraph } from './SystemGraph';

const accentMap: Record<string, string> = {
  'resource-autonomy': '#a78bfa',
  'human-experience': '#fb7185',
  stewardship: '#34d399',
  operations: '#fbbf24',
};

type ModulePanelProps = {
  data: ModuleDataset;
  delay?: number;
  compact?: boolean;
};

export function ModulePanel({ data, delay = 0, compact = false }: ModulePanelProps) {
  const accent = accentMap[data.id] ?? '#d1797c';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <PanelFrame>
        <ScanLine />
        <div className="p-3 md:p-4">
          <header className="mb-3 flex items-start justify-between gap-2 border-b border-neutral-800/60 pb-3">
            <div>
              {/* Full-opacity rockcreek-300, not rockcreek-500/80: at 9px on neutral-950,
                  the 500 stop's contrast (~4.4:1) is too close to AA to survive an
                  opacity cut — red's luminance coefficient is much lower than the
                  teal it replaced, so the old shade+opacity pairing doesn't carry over. */}
              <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-rockcreek-300">
                Module · {data.id.replace(/-/g, ' ')}
              </p>
              <h3 className="mt-1 font-mono text-sm font-bold text-neutral-100 md:text-base">
                {data.title}
              </h3>
              <p className="mt-0.5 text-[11px] leading-snug text-neutral-500">{data.subtitle}</p>
            </div>
            <div
              className="h-8 w-1 shrink-0 rounded-full"
              style={{ backgroundColor: accent }}
              aria-hidden="true"
            />
          </header>

          <SystemGraph metrics={data.metrics} edges={data.edges} accentColor={accent} compact={compact} />

          <p className="mt-3 border-t border-neutral-800/40 pt-3 text-[11px] leading-relaxed text-neutral-500">
            <span className="font-mono text-[9px] font-black uppercase tracking-wider text-neutral-600">
              Synthesis ·{' '}
            </span>
            {data.synthesis}
          </p>
        </div>
      </PanelFrame>
    </motion.div>
  );
}
