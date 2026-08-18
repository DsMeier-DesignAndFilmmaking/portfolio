'use client';

import type { ConditionStatus, TrendDirection } from '../content/scenarios';

// Status vocabulary moved from the removed `datasets.ts` to `scenarios.ts`;
// `MetricStatus` was renamed `ConditionStatus` there, since what this console
// now tracks is an environmental condition, not a performance metric.
type MetricStatus = ConditionStatus;

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

// PRESERVED EXCEPTION: `optimal` stays teal. This is a true 4-tier status
// semantic (optimal=teal · nominal=sky · elevated=amber · critical=rose), not
// a decorative use of the old page accent. Recoloring `optimal` to the new
// #B32025 project accent would put it one hue-step from `critical` (rose),
// making "everything is fine" and "this is a risk" nearly indistinguishable
// at a glance — the one thing a status system cannot do. See the color-audit
// report for the two other preserved exceptions.
export const statusColors: Record<
  MetricStatus,
  { dot: string; text: string; glow: string; border: string; bg: string }
> = {
  optimal: {
    dot: 'bg-teal-400',
    text: 'text-teal-300',
    glow: 'shadow-teal-500/30',
    border: 'border-teal-500/40',
    bg: 'bg-teal-500/10',
  },
  nominal: {
    dot: 'bg-sky-400',
    text: 'text-sky-300',
    glow: 'shadow-sky-500/20',
    border: 'border-sky-500/30',
    bg: 'bg-sky-500/10',
  },
  elevated: {
    dot: 'bg-amber-400',
    text: 'text-amber-300',
    glow: 'shadow-amber-500/30',
    border: 'border-amber-500/40',
    bg: 'bg-amber-500/10',
  },
  critical: {
    dot: 'bg-rose-400',
    text: 'text-rose-300',
    glow: 'shadow-rose-500/30',
    border: 'border-rose-500/40',
    bg: 'bg-rose-500/10',
  },
};

export function StatusDot({ status, pulse = false }: { status: MetricStatus; pulse?: boolean }) {
  return (
    <span className="relative flex h-2 w-2">
      {pulse && (
        <span
          className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-40', statusColors[status].dot)}
          aria-hidden="true"
        />
      )}
      <span className={cn('relative inline-flex h-2 w-2 rounded-full', statusColors[status].dot)} />
    </span>
  );
}

export function SparkLine({
  data,
  width = 64,
  height = 24,
  // Dead default — every real caller passes an explicit module accent color.
  // Kept dark-bg-safe (rockcreek-400, ~6.6:1 on neutral-950) in case that
  // ever changes.
  color = '#d1797c',
  className = '',
}: {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;

  const points = data
    .map((v, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2);
      const y = padding + (1 - (v - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn('overflow-visible', className)}
      aria-hidden="true"
    >
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        opacity={0.8}
      />
    </svg>
  );
}

export function TrendBadge({ trend, delta }: { trend: TrendDirection; delta: string }) {
  const isUp = trend === 'up';
  const isDown = trend === 'down';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 font-mono text-[10px] font-bold tracking-wide',
        isUp && 'text-rockcreek-400',
        isDown && 'text-rockcreek-400',
        trend === 'stable' && 'text-neutral-500',
      )}
    >
      {isUp && (
        <svg viewBox="0 0 8 8" className="h-2.5 w-2.5" aria-hidden="true">
          <path d="M4 1L7 5H1L4 1Z" fill="currentColor" />
        </svg>
      )}
      {isDown && (
        <svg viewBox="0 0 8 8" className="h-2.5 w-2.5" aria-hidden="true">
          <path d="M4 7L1 3H7L4 7Z" fill="currentColor" />
        </svg>
      )}
      {delta}
    </span>
  );
}

export function PanelFrame({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-950/60 backdrop-blur-sm',
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rockcreek-500/[0.03] via-transparent to-violet-500/[0.02]"
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export function ScanLine({ className = '' }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]',
        className,
      )}
      aria-hidden="true"
    >
      <div className="h-px w-full animate-scan bg-gradient-to-r from-transparent via-rockcreek-400 to-transparent" />
    </div>
  );
}
