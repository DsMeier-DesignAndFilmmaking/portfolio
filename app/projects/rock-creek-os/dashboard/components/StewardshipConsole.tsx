'use client';

import { useEffect, useState } from 'react';
import { ArrowDown, Check, Flame, Waves } from 'lucide-react';
import ProjectHeader from '@/components/ProjectHeader';
import ProjectBreadcrumb from '@/components/ProjectBreadcrumb';
import { ExperienceNav } from '../../components/ExperienceNav';
import {
  consoleMeta,
  loopStages,
  scenarioOrder,
  scenarios,
  type ConditionStatus,
  type ScenarioId,
  type TrendDirection,
} from '../content/scenarios';
import { StatusDot, cn, statusColors } from './viz-primitives';

// ─────────────────────────────────────────────────────────────────────────────
// The Adaptive Stewardship OS console.
//
// This is the interactive expression of the system the other three routes
// describe: `/` says why it matters, `/explorer` says what the problems are,
// `/systems` says how the architecture works, and this page shows what it
// feels like when it runs. It demonstrates rather than explains — there is
// almost no expository prose here, because the other three pages already
// carry it.
//
// STRUCTURE — four zones, one control:
//   01 Conditions      what is happening        (hydrology primary, fire subordinate)
//   02 Interpretation  what it means
//   03 Response        what the team should consider  ← the human decision
//   04 Experience      how the stay adapts
// then an outcome line that closes the loop back to conditions.
//
// THE HUMAN DECISION is the point of the whole interaction. Zone 03 holds a
// recommendation in an explicit "awaiting staff decision" state and will not
// advance on its own. Zones 03-logistics and 04-adapted only resolve after a
// person presses the button. That gap — recommendation sitting unexecuted
// until someone acts — is the difference between decision support and
// automation, and it is the single most important thing this console
// communicates.
//
// WHAT WAS REMOVED: four module panels carrying 18 metrics (energy
// resilience, supply-chain autonomy, carbon sequestration, guest HRV, sleep
// quality, acoustic sovereignty, response velocity…), a Digital Twin node map,
// a cross-module dependency strip, occupancy/hectares/alert counters, and a
// ticking live clock. None of it demonstrated hydrology, wildfire, or
// logistics; the guest-biometrics panel actively contradicted the same
// dashboard's "zero unconsented data exposure" claim. All recoverable from
// git — see `components/index.ts`.
//
// NO ANIMATION LIBRARY, deliberately. The first build wrapped each zone in
// `<AnimatePresence mode="wait">` so scenario changes cross-faded. That mode
// keeps the exiting child mounted until its exit animation reports complete —
// and framer-motion drives exits from requestAnimationFrame, which browsers
// pause outright in a backgrounded tab. Verified here: rAF delivered zero
// frames per second while hidden, the exit never completed, and every zone
// stayed frozen on the previous scenario even though React state had already
// updated (the segmented control's `aria-checked` moved; the content did not).
// A console whose single purpose is "change a condition, watch the system
// respond" must not make that response contingent on an animation finishing.
// State changes now render synchronously. The visible feedback — status
// colours, the decision chip flipping to "Activated by staff", logistics
// appearing — is carried by the state itself, which is also what makes this
// robust under reduced-motion without a second code path.
// ─────────────────────────────────────────────────────────────────────────────

function TrendGlyph({ trend }: { trend: TrendDirection }) {
  if (trend === 'stable') {
    return (
      <span className="font-mono text-[10px] font-bold text-neutral-500" aria-label="Trend: stable">
        —
      </span>
    );
  }
  const rising = trend === 'up';
  return (
    <span
      className="font-mono text-[10px] font-bold text-neutral-400"
      aria-label={`Trend: ${rising ? 'rising' : 'falling'}`}
    >
      <span aria-hidden="true">{rising ? '▲' : '▼'}</span>
    </span>
  );
}

/** Zone wrapper — numbered, titled, and asking its plain-language question. */
function Zone({
  number,
  label,
  question,
  children,
  className = '',
}: {
  number: string;
  label: string;
  question: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section aria-label={`${number} — ${label}`} className={cn('relative', className)}>
      <header className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-[9px] font-black uppercase tracking-[0.24em] text-rockcreek-400">
          {number} · {label}
        </span>
        <span className="font-mono text-[10px] text-neutral-500">{question}</span>
      </header>
      {children}
    </section>
  );
}

/** Vertical connector between zones — carries the direction of the loop. */
function ZoneLink() {
  return (
    <div className="flex justify-center py-3" aria-hidden="true">
      <ArrowDown className="h-4 w-4 text-neutral-700" />
    </div>
  );
}

function ConditionCard({
  icon: Icon,
  role,
  name,
  primary,
  secondary,
  status,
  trend,
  condition,
  note,
  emphasis,
}: {
  icon: typeof Waves;
  role: string;
  name: string;
  primary: string;
  secondary?: string;
  status: ConditionStatus;
  trend: TrendDirection;
  condition: string;
  note: string;
  emphasis: 'primary' | 'supporting';
}) {
  const tone = statusColors[status];
  const isPrimary = emphasis === 'primary';

  return (
    // `h-full`: the grid column wrapping this card (in Zone 01,
    // `md:col-span-3` / `md:col-span-2`) stretches to the row's full height
    // by CSS Grid's own default — but that stretch only reaches the direct
    // grid item, not this card underneath it, since a plain block child never
    // inherits its parent's stretched height on its own. Measured before this
    // fix: the wrapper columns matched at 233px each, but the visible bordered
    // card inside the shorter (`supporting`) column stopped at 204px, leaving
    // 29px of unbordered empty space its neighbor didn't have.
    <div
      className={cn(
        'h-full rounded-xl border bg-neutral-950/60 backdrop-blur-sm',
        isPrimary ? 'p-5 md:p-6' : 'p-4 md:p-5',
        tone.border,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <Icon className={cn('shrink-0', isPrimary ? 'h-4 w-4' : 'h-3.5 w-3.5', tone.text)} aria-hidden="true" />
          <span
            className={cn(
              'font-mono font-black uppercase tracking-[0.2em]',
              isPrimary ? 'text-[9px] text-rockcreek-400' : 'text-[8px] text-neutral-500',
            )}
          >
            {role}
          </span>
        </span>
        <span className="flex items-center gap-1.5">
          <StatusDot status={status} pulse={status === 'critical'} />
          <TrendGlyph trend={trend} />
        </span>
      </div>

      <h3
        className={cn(
          'mt-3 font-mono font-bold text-neutral-100',
          isPrimary ? 'text-base md:text-lg' : 'text-sm',
        )}
      >
        {name}
      </h3>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span
          className={cn(
            'font-mono font-bold tabular-nums text-neutral-100',
            isPrimary ? 'text-3xl md:text-4xl' : 'text-xl',
          )}
        >
          {primary}
        </span>
        {secondary && (
          <span className="font-mono text-xs text-neutral-400">
            Flow <span className="text-neutral-300">{secondary}</span>
          </span>
        )}
      </div>

      <p className={cn('mt-3 font-mono text-xs font-bold', tone.text)}>{condition}</p>
      <p className="mt-2 text-xs leading-relaxed text-neutral-400">{note}</p>
    </div>
  );
}

// Same horizontal rhythm as the other three routes' `CONTENT_BOUNDS`
// (`app/projects/rock-creek-os/page.tsx`, `explorer/page.tsx`,
// `systems/page.tsx`) — kept as an identically-named constant here so the
// four are trivially diffable rather than four separately-typed literals
// that could drift.
const CONTENT_BOUNDS = 'container mx-auto px-6 md:px-8';

export function StewardshipConsole() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>('normal');
  const [activated, setActivated] = useState(false);

  const scenario = scenarios[scenarioId];
  const needsDecision = scenario.response.recommendation !== null;

  // Changing the environmental state resets the pending decision — the point
  // of the interaction is that a person decides per event, not once ever.
  useEffect(() => {
    setActivated(false);
  }, [scenarioId]);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 pt-[var(--project-header-height)] text-neutral-100 selection:bg-rockcreek-500/30">
      <ProjectHeader tone="dark" focusRingClassName="focus-visible:ring-rockcreek-400" />
      {/* outerClassName/innerClassName set to ExperienceNav's own defaults,
          explicitly, so the rail matches the other three routes exactly —
          `container` for outer alignment, `max-w-3xl` capping the rail
          itself.

          `topOffsetClassName` LOOKS like it should diverge, but measured
          proof says otherwise. The other three routes' default `mt-[100px]`
          is not purely "clear the fixed 68px header" — their `<main>` isn't
          padded for the header at all (the header is `fixed`, so it takes no
          flow space there), so that 100px is entirely breathing room, and
          it's what puts their rail's resting top at ~101px measured.
          This shell already spends 68px of that clearing the header via
          `pt-[var(--project-header-height)]` above, so reusing `mt-[100px]`
          here would double-count the header and push the rail ~68px too low
          — which is the reasoning an earlier pass over-corrected on, landing
          at `mt-3` (68 + 12 ≈ 80px measured, 20px short of the other three's
          101px). The fix isn't "small nudge vs. full offset," it's matching
          the same 32px of intentional breathing room the other routes carry
          on top of their header clearance: 68px (padding) + 32px (`mt-8`) ≈
          100px, verified equal to the other three routes' rail top within
          rounding. */}
      <ExperienceNav
        tone="dark"
        outerClassName="container mx-auto w-full px-6 md:px-8"
        innerClassName="max-w-3xl"
        topOffsetClassName="mt-8"
      />
      {/* `mt-8 md:mt-10` matches the top margin every other route's hero
          section opens with, so the gap under the rail reads the same
          whether the next thing down is a hero or this breadcrumb. */}
      <div className={`${CONTENT_BOUNDS} mb-6 mt-8 md:mt-10`}>
        <ProjectBreadcrumb projectId="rock-creek-os" onDark nameProject />
      </div>

      {/* Ambient background — unchanged from the previous console. */}
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

      <main className={`relative z-10 ${CONTENT_BOUNDS} flex-1 py-6 md:py-8`}>
        {/* ── Console header ──────────────────────────────────────────── */}
        <header className="border-b border-neutral-800/80 pb-6">
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.24em] text-rockcreek-400">
            {consoleMeta.eyebrow}
          </p>
          {/* `role="heading" aria-level={1}` instead of a literal `<h1>`:
              `globals.css` forces every real `<h1>` to `#151B18 !important`
              site-wide (a near-black meant for the light-canvas pages), which
              would render this titlebar nearly invisible against
              `bg-neutral-950`. This is the same escape the previous version
              of this file used, kept for exact consistency rather than
              reinvented — a `<p>` with the heading role gets the same
              accessibility semantics as `<h1>` without inheriting the forced
              color. */}
          <p
            className="mt-1 font-mono text-xl font-bold text-white md:text-2xl"
            role="heading"
            aria-level={1}
          >
            {consoleMeta.title}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400">
            {consoleMeta.humanNote}
          </p>
          <p className="mt-3 inline-flex items-center rounded-full border border-neutral-700 bg-neutral-900/60 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-neutral-400">
            {consoleMeta.disclosure}
          </p>
        </header>

        {/* ── The only environmental control ──────────────────────────── */}
        <div className="mt-6">
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.24em] text-neutral-500">
            Environmental state
          </p>
          <div
            className="mt-3 inline-flex flex-wrap gap-1 rounded-xl border border-neutral-800 bg-neutral-900/60 p-1"
            role="radiogroup"
            aria-label="Select an environmental state"
          >
            {scenarioOrder.map((id) => {
              const isActive = id === scenarioId;
              return (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setScenarioId(id)}
                  className={cn(
                    // min-h-[44px]: this is the console's primary control and
                    // the first thing touched on a phone.
                    'inline-flex min-h-[44px] items-center rounded-lg px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
                    isActive
                      ? 'bg-rockcreek-600 text-white'
                      : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-neutral-200',
                  )}
                >
                  {scenarios[id].shortLabel}
                </button>
              );
            })}
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400">{scenario.premise}</p>
        </div>

        {/* ── The loop ─────────────────────────────────────────────────── */}
        <div className="mt-8">
          {/* 01 · Conditions */}
          <Zone number={loopStages[0].number} label={loopStages[0].label} question={loopStages[0].question}>
            <div className="grid gap-3 md:grid-cols-5">
                {/* Hydrology — primary, always the wider column. */}
                <div className="md:col-span-3">
                  <ConditionCard
                    icon={Waves}
                    role="Primary system · Hydrology"
                    name="Rock Creek"
                    primary={scenario.river.temperature}
                    secondary={scenario.river.flow}
                    status={scenario.river.status}
                    trend={scenario.river.trend}
                    condition={scenario.river.condition}
                    note={scenario.river.thresholdNote}
                    emphasis="primary"
                  />
                </div>
                {/* Wildfire — supporting, visibly subordinate. */}
                <div className="md:col-span-2">
                  <ConditionCard
                    icon={Flame}
                    role="Supporting · Wildfire"
                    name="Fire conditions"
                    primary={scenario.fire.risk}
                    status={scenario.fire.status}
                    trend={scenario.fire.trend}
                    condition={scenario.fire.condition}
                    note={scenario.fire.thresholdNote}
                    emphasis="supporting"
                  />
                </div>
            </div>
          </Zone>

          <ZoneLink />

          {/* 02 · Interpretation */}
          <Zone number={loopStages[1].number} label={loopStages[1].label} question={loopStages[1].question}>
            <div className="rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-5 backdrop-blur-sm md:p-6">
                <p className="text-sm leading-relaxed text-neutral-300">{scenario.interpretation.summary}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                  {scenario.interpretation.affected.map((item) => {
                    const tone = statusColors[item.status];
                    return (
                      <li
                        key={item.id}
                        className={cn('rounded-lg border bg-neutral-950/50 px-3 py-2.5', tone.border)}
                      >
                        <span className="flex items-center gap-2">
                          <StatusDot status={item.status} />
                          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-200">
                            {item.label}
                          </span>
                        </span>
                        <span className={cn('mt-1.5 block font-mono text-[10px] font-bold', tone.text)}>
                          {item.note}
                        </span>
                      </li>
                    );
                  })}
                </ul>
            </div>
          </Zone>

          <ZoneLink />

          {/* 03 · Response — the human decision */}
          <Zone number={loopStages[2].number} label={loopStages[2].label} question={loopStages[2].question}>
              <div>
                {needsDecision ? (
                  <div
                    className={cn(
                      'rounded-xl border bg-neutral-950/60 p-5 backdrop-blur-sm md:p-6',
                      activated ? 'border-teal-500/40' : 'border-amber-500/40',
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">
                        Suggested response
                      </span>
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] font-black uppercase tracking-[0.14em]',
                          activated
                            ? 'border-teal-500/40 bg-teal-500/10 text-teal-300'
                            : 'border-amber-500/40 bg-amber-500/10 text-amber-300',
                        )}
                      >
                        {activated ? (
                          <>
                            <Check className="h-3 w-3" aria-hidden="true" />
                            Activated by staff
                          </>
                        ) : (
                          'Awaiting staff decision'
                        )}
                      </span>
                    </div>

                    <p className="mt-4 font-mono text-base font-bold leading-snug text-neutral-100 md:text-lg">
                      {scenario.response.recommendation}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-400">{scenario.response.rationale}</p>

                    {!activated && (
                      <button
                        type="button"
                        onClick={() => setActivated(true)}
                        className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-rockcreek-500 bg-rockcreek-600 px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-rockcreek-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                      >
                        {scenario.response.actionLabel}
                      </button>
                    )}

                    {/* Logistics resolves only after a person decides. */}
                    {activated && (
                        <div>
                          <div className="mt-5 border-t border-neutral-800 pt-5">
                            <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">
                              Logistics coordinating
                            </p>
                            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                              {scenario.response.logistics.map((action) => (
                                <li
                                  key={action.id}
                                  className="rounded-lg border border-neutral-800 bg-neutral-900/40 px-3 py-2.5"
                                >
                                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-rockcreek-400">
                                    {action.label}
                                  </span>
                                  <span className="mt-1 block text-xs leading-relaxed text-neutral-300">
                                    {action.detail}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-5 backdrop-blur-sm md:p-6">
                    <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">
                      No action required
                    </span>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                      {scenario.response.rationale}
                    </p>
                  </div>
                )}
              </div>
          </Zone>

          <ZoneLink />

          {/* 04 · Guest experience */}
          <Zone number={loopStages[3].number} label={loopStages[3].label} question={loopStages[3].question}>
              <div className="rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-5 backdrop-blur-sm md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">
                    {activated || !needsDecision ? 'Guest itinerary' : 'Guest itinerary · at risk'}
                  </span>
                  {(activated || !needsDecision) && (
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[9px] font-black uppercase tracking-[0.14em]',
                        statusColors[scenario.guest.statusTone].border,
                        statusColors[scenario.guest.statusTone].bg,
                        statusColors[scenario.guest.statusTone].text,
                      )}
                    >
                      {scenario.guest.status}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-base leading-relaxed text-neutral-100">
                  {activated || !needsDecision ? scenario.guest.adapted : scenario.guest.current}
                </p>

                {needsDecision && !activated && (
                  <p className="mt-3 font-mono text-xs text-amber-300">
                    Unresolved until a decision is made.
                  </p>
                )}
              </div>
          </Zone>

          {/* Outcome — closes the loop */}
          {(activated || !needsDecision) && (
              <div className="mt-8 rounded-xl border border-neutral-800/60 bg-neutral-900/30 p-5 md:p-6">
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">
                  Observed outcome → next decision
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-300">{scenario.outcome}</p>
                <p className="mt-3 font-mono text-[10px] text-neutral-600">
                  Outcomes feed back into the conditions the system reads next. The loop does not end here.
                </p>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}
