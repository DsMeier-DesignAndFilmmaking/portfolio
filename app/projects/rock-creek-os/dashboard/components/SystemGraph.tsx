'use client';

import { motion } from 'framer-motion';
import type { MetricNode, SystemEdge } from '../content/datasets';
import { SparkLine, StatusDot, TrendBadge, cn, statusColors } from './viz-primitives';

type SystemGraphProps = {
  metrics: MetricNode[];
  edges: SystemEdge[];
  accentColor?: string;
  compact?: boolean;
};

/** Positions nodes in a circle and renders weighted relationship edges. */
export function SystemGraph({
  metrics,
  edges,
  accentColor = '#d1797c',
  compact = false,
}: SystemGraphProps) {
  const size = compact ? 180 : 220;
  const cx = size / 2;
  const cy = size / 2;
  const radius = compact ? 62 : 78;
  const nodeR = compact ? 28 : 34;

  const positions = metrics.map((m, i) => {
    const angle = (i / metrics.length) * 2 * Math.PI - Math.PI / 2;
    return {
      ...m,
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });

  const posMap = Object.fromEntries(positions.map((p) => [p.id, p]));

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
      <div className="relative mx-auto shrink-0" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" aria-hidden="true">
          {/* Edges */}
          {edges.map((edge, i) => {
            const from = posMap[edge.from];
            const to = posMap[edge.to];
            if (!from || !to) return null;

            const mx = (from.x + to.x) / 2;
            const my = (from.y + to.y) / 2;
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const nx = -dy * 0.15;
            const ny = dx * 0.15;

            return (
              <g key={`${edge.from}-${edge.to}-${i}`}>
                <motion.path
                  d={`M ${from.x} ${from.y} Q ${mx + nx} ${my + ny} ${to.x} ${to.y}`}
                  fill="none"
                  stroke={accentColor}
                  strokeWidth={edge.strength * 2 + 0.5}
                  strokeOpacity={0.15 + edge.strength * 0.35}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: i * 0.08, ease: 'easeOut' }}
                />
                <motion.circle
                  r="2"
                  fill={accentColor}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <animateMotion
                    dur={`${2 + edge.strength}s`}
                    repeatCount="indefinite"
                    path={`M ${from.x} ${from.y} Q ${mx + nx} ${my + ny} ${to.x} ${to.y}`}
                  />
                </motion.circle>
              </g>
            );
          })}

          {/* Center hub */}
          <circle cx={cx} cy={cy} r={12} fill="none" stroke={accentColor} strokeOpacity={0.2} strokeWidth={1} />
          <circle cx={cx} cy={cy} r={4} fill={accentColor} fillOpacity={0.4} />
        </svg>

        {/* Metric nodes overlaid */}
        {positions.map((node, i) => (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: node.x, top: node.y, width: nodeR * 2 }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
          >
            <div
              className={cn(
                'flex flex-col items-center rounded-lg border px-1 py-1.5 text-center backdrop-blur-sm',
                statusColors[node.status].border,
                statusColors[node.status].bg,
              )}
            >
              <StatusDot status={node.status} />
              <span className="mt-0.5 font-mono text-[7px] font-bold uppercase leading-tight tracking-wider text-neutral-400">
                {node.label.split(' ').slice(0, 2).join(' ')}
              </span>
              <span className={cn('font-mono text-[10px] font-black', statusColors[node.status].text)}>
                {node.displayValue}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Metric detail list */}
      <ul className="min-w-0 flex-1 space-y-1.5" aria-label="Metric details">
        {metrics.map((metric, i) => (
          <motion.li
            key={metric.id}
            className="flex items-center gap-2 rounded-lg border border-neutral-800/60 bg-neutral-900/40 px-2.5 py-1.5"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
          >
            <StatusDot status={metric.status} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  {metric.label}
                </span>
                <span className="shrink-0 font-mono text-xs font-black text-neutral-200">
                  {metric.displayValue}
                </span>
              </div>
            </div>
            <SparkLine data={metric.sparkline} width={48} height={18} color={accentColor} className="shrink-0" />
            <TrendBadge trend={metric.trend} delta={metric.trendDelta} />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
