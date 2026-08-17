'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';
import ProjectHeader from '@/components/ProjectHeader';
import ProjectBreadcrumb from '@/components/ProjectBreadcrumb';
import { ExperienceNav } from '../../components/ExperienceNav';
import {
  humanExperience,
  operations,
  resourceAutonomy,
  stewardship,
  systemStatus,
  twinLayers,
  type TwinLayer,
} from '../content/datasets';
import { DigitalTwinMap } from './DigitalTwinMap';
import { DigitalTwinToggle } from './DigitalTwinToggle';
import { ModulePanel } from './ModulePanel';
import { StatusDot, cn, statusColors } from './viz-primitives';

function LiveClock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'America/Denver',
        }),
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-xs font-bold tabular-nums text-neutral-400" aria-live="polite">
      {time || '—:—:—'} MST
    </span>
  );
}

export function EnvironmentalExperienceDashboard() {
  const [twinLayer, setTwinLayer] = useState<TwinLayer>('experience');

  return (
    // Header clearance comes from the shared token rather than a second copy
    // of the header's height (see the token block in app/globals.css).
    <div className="flex min-h-screen flex-col bg-neutral-950 pt-[var(--project-header-height)] text-neutral-100 selection:bg-rockcreek-500/30">
      {/* Shared portfolio project nav — dark tone so it stays legible on this canvas. */}
      <ProjectHeader tone="dark" focusRingClassName="focus-visible:ring-rockcreek-400" />
      {/* Sticky section rail: a direct child of this flex-col shell (sibling to
          `motion.header` and `<main>` below), NOT nested inside `motion.header`
          — its own box is only a few hundred px tall, nowhere near this page's
          full scroll depth, so `position: sticky` would run out of room to
          stay pinned within a few screenfuls. Mounted here, its containing
          block is this whole shell, which spans the entire page. The outer
          shell already clears the fixed header for everything in it via
          `--project-header-height`, so this only needs a small nudge (`mt-3`)
          beyond that, not the header height again. */}
      <ExperienceNav
        tone="dark"
        outerClassName="mx-auto w-full max-w-[1600px] px-4 md:px-6"
        innerClassName=""
        topOffsetClassName="mt-3"
      />
      <div className="mx-auto w-full max-w-[1600px] px-4 pb-2 pt-3 md:px-6">
        <ProjectBreadcrumb projectId="rock-creek-os" onDark nameProject />
      </div>
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-rockcreek-500/[0.04] blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-violet-500/[0.04] blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        className="relative z-10 border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Radio className="h-3.5 w-3.5 text-rockcreek-400" aria-hidden="true" />
                {/* rockcreek-400, not -500: at this size on neutral-950, -500 lands at
                    ~4.4:1, under the 4.5:1 AA floor — bumped one stop for margin. */}
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.24em] text-rockcreek-400">
                  Environmental Experience OS
                </p>
              </div>
              <p className="mt-0.5 font-mono text-base font-bold text-neutral-100 md:text-lg" role="heading" aria-level={1}>
                Stewardship Operations Center
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-5">
            <DigitalTwinToggle active={twinLayer} onChange={setTwinLayer} />

            <div className="hidden items-center gap-4 md:flex">
              <div className="text-right">
                <p className="font-mono text-[8px] font-black uppercase tracking-wider text-neutral-600">
                  Property
                </p>
                <p className="font-mono text-xs font-bold text-neutral-300">
                  {systemStatus.hectares.toLocaleString()} ha · {systemStatus.occupancy}% occ
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[8px] font-black uppercase tracking-wider text-neutral-600">
                  System
                </p>
                <div className="flex items-center justify-end gap-1.5">
                  <StatusDot status={systemStatus.overall} pulse />
                  <span
                    className={cn(
                      'font-mono text-xs font-bold uppercase',
                      statusColors[systemStatus.overall].text,
                    )}
                  >
                    {systemStatus.overall}
                  </span>
                </div>
              </div>
              <LiveClock />
            </div>
          </div>
        </div>

        {/* Status strip */}
        <div className="border-t border-neutral-800/60 bg-neutral-900/40">
          <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-6 gap-y-1 px-4 py-2 md:px-6">
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-600">
              Active alerts:{' '}
              <span className="text-amber-400">{systemStatus.activeAlerts}</span>
            </span>
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-600">
              Cross-module links: <span className="text-rockcreek-400">4 active</span>
            </span>
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-600">
              Mode: <span className="text-neutral-300">Observatory · Read-only</span>
            </span>
            <span className="ml-auto hidden font-mono text-[9px] text-neutral-600 sm:inline">
              Modeled telemetry · Independent research prototype
            </span>
          </div>
        </div>
      </motion.header>

      {/* Main grid */}
      <main className="relative z-10 mx-auto w-full max-w-[1600px] flex-1 px-4 py-4 md:px-6 md:py-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
          {/* Left column — Resource + Human */}
          <div className="flex flex-col gap-4 lg:col-span-3 lg:gap-5">
            <ModulePanel data={resourceAutonomy} delay={1} compact />
            <ModulePanel data={humanExperience} delay={2} compact />
          </div>

          {/* Center — Digital Twin */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <DigitalTwinMap layer={twinLayer} data={twinLayers[twinLayer]} />
          </motion.div>

          {/* Right column — Stewardship + Operations */}
          <div className="flex flex-col gap-4 lg:col-span-3 lg:gap-5">
            <ModulePanel data={stewardship} delay={3} compact />
            <ModulePanel data={operations} delay={4} compact />
          </div>
        </div>

        {/* Cross-module relationship strip */}
        <motion.footer
          className="mt-5 rounded-xl border border-neutral-800/60 bg-neutral-900/30 px-4 py-3 md:px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600">
            Cross-Module Dependencies
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              { from: 'Stewardship', to: 'Resource Autonomy', label: 'ecology → autonomy' },
              { from: 'Resource Autonomy', to: 'Human Experience', label: 'environment → recovery' },
              { from: 'Operations', to: 'Human Experience', label: 'service → experience' },
              { from: 'Stewardship', to: 'Operations', label: 'land health → service load' },
            ].map((link) => (
              <div
                key={link.label}
                className="flex items-center gap-2 rounded-lg border border-neutral-800/60 bg-neutral-950/50 px-3 py-1.5"
              >
                <span className="font-mono text-[9px] font-bold text-neutral-400">{link.from}</span>
                <svg viewBox="0 0 16 8" className="h-2 w-4 text-rockcreek-400" aria-hidden="true">
                  <path
                    d="M0 4h12M10 1l3 3-3 3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-mono text-[9px] font-bold text-neutral-400">{link.to}</span>
                <span className="font-mono text-[8px] text-neutral-600">· {link.label}</span>
              </div>
            ))}
          </div>
        </motion.footer>
      </main>
    </div>
  );
}
