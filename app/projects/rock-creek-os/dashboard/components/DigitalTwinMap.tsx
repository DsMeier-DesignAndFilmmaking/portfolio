'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { TwinLayer, TwinLayerData } from '../content/datasets';
import { PanelFrame, ScanLine, StatusDot, cn, statusColors } from './viz-primitives';

type DigitalTwinMapProps = {
  layer: TwinLayer;
  data: TwinLayerData;
};

const categoryColors: Record<string, string> = {
  'Guest Space': '#fb7185',
  Trail: '#38bdf8',
  Activity: '#fbbf24',
  Recovery: '#34d399',
  Energy: '#a78bfa',
  Water: '#22d3ee',
  Connectivity: '#818cf8',
  Stewardship: '#4ade80',
};

export function DigitalTwinMap({ layer, data }: DigitalTwinMapProps) {
  const nodeMap = Object.fromEntries(data.nodes.map((n) => [n.id, n]));

  return (
    <PanelFrame className="h-full min-h-[280px]">
      <ScanLine />
      <div className="flex h-full flex-col p-3 md:p-4">
        <header className="mb-3 flex items-start justify-between gap-3 border-b border-neutral-800/60 pb-3">
          <div>
            {/* rockcreek-300 at full opacity — see ModulePanel.tsx for why. */}
            <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-rockcreek-300">
              Digital Twin · {layer === 'experience' ? 'Experience' : 'Infrastructure'} Layer
            </p>
            <h3 className="mt-1 font-mono text-sm font-bold text-neutral-100 md:text-base">
              {data.label}
            </h3>
            <p className="mt-0.5 text-[11px] text-neutral-500">{data.description}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rockcreek-400 opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rockcreek-400" />
            </span>
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-rockcreek-400">
              Live
            </span>
          </div>
        </header>

        <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-lg border border-neutral-800/60 bg-neutral-950">
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(#d1797c 1px, transparent 1px), linear-gradient(90deg, #d1797c 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
            aria-hidden="true"
          />

          {/* Terrain silhouette */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full opacity-[0.08]"
            aria-hidden="true"
          >
            <path
              d="M0,70 Q15,55 30,62 T55,58 T80,65 T100,60 L100,100 L0,100 Z"
              fill="#d1797c"
            />
            <path
              d="M0,80 Q25,72 50,78 T100,75 L100,100 L0,100 Z"
              fill="#6366f1"
              opacity={0.5}
            />
          </svg>

          <AnimatePresence mode="wait">
            <motion.svg
              key={layer}
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              aria-hidden="true"
            >
              {/* Connections */}
              {data.connections.map((conn, i) => {
                const from = nodeMap[conn.from];
                const to = nodeMap[conn.to];
                if (!from || !to) return null;

                return (
                  <g key={`${conn.from}-${conn.to}`}>
                    <motion.line
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke={conn.type === 'primary' ? '#d1797c' : '#6366f1'}
                      strokeWidth={conn.type === 'primary' ? 0.4 : 0.25}
                      strokeOpacity={conn.type === 'primary' ? 0.5 : 0.3}
                      strokeDasharray={conn.type === 'secondary' ? '1 1' : undefined}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: i * 0.06 }}
                    />
                    {conn.type === 'primary' && (
                      <motion.circle
                        r="0.6"
                        fill="#d1797c"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                          duration: 3,
                          delay: i * 0.4,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                        }}
                      >
                        <animateMotion
                          dur="3s"
                          repeatCount="indefinite"
                          path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                        />
                      </motion.circle>
                    )}
                  </g>
                );
              })}
            </motion.svg>
          </AnimatePresence>

          {/* Nodes */}
          <AnimatePresence mode="wait">
            <motion.div
              key={layer}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35 }}
            >
              {data.nodes.map((node, i) => {
                const color = categoryColors[node.category] ?? '#d1797c';
                return (
                  <motion.div
                    key={node.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.05, type: 'spring', stiffness: 200 }}
                  >
                    <div
                      className={cn(
                        'group relative cursor-default rounded-lg border px-2 py-1.5 backdrop-blur-sm transition-shadow',
                        statusColors[node.status].border,
                        statusColors[node.status].bg,
                      )}
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: color }}
                          aria-hidden="true"
                        />
                        <span className="whitespace-nowrap font-mono text-[9px] font-bold text-neutral-200">
                          {node.label}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-neutral-800">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${node.load}%` }}
                            transition={{ duration: 0.8, delay: 0.3 + i * 0.05 }}
                          />
                        </div>
                        <span className="font-mono text-[8px] font-bold text-neutral-500">{node.load}%</span>
                      </div>
                      <p className="mt-0.5 font-mono text-[7px] uppercase tracking-wider text-neutral-600">
                        {node.category}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Legend */}
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {[...new Set(data.nodes.map((n) => n.category))].map((cat) => (
            <li key={cat} className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: categoryColors[cat] ?? '#d1797c' }}
                aria-hidden="true"
              />
              <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-neutral-600">
                {cat}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </PanelFrame>
  );
}
