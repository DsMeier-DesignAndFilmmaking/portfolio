'use client';

import { useEffect, useRef, useState } from 'react';
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
import type { EnvironmentalObservation, ObservationFreshness } from '@/lib/environmental/types';
import type { EvaluatedSignal, SignalState } from '@/lib/environmental/signals/types';
import type { ProblemLoopWithTransitions, RockCreekSystemState } from '@/lib/environmental/signals/systemState';

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

// ─────────────────────────────────────────────────────────────────────────────
// CURRENT CONDITIONS — Stage 1 environmental observation strip.
//
// This is a REAL reading from a public weather feed (Open-Meteo, via
// scripts/ingest-environmental-observation.mts), rendered separately from
// Zone 01's MODELED scenario values below. That separation is the entire
// point: consoleMeta.disclosure (scenarios.ts) was amended to distinguish
// "modeled" from "measured" specifically so this strip could exist without
// weakening the fact/speculation boundary the console depends on. Never
// merge this into a scenario reading, and never let a scenario reading
// borrow this strip's "live" framing.
//
// Presentation-only helpers (compass label, time formatting) live here
// rather than in the domain model — lib/environmental/types.ts stays a pure
// data shape with no formatting opinion, per the class C boundary in
// docs/strategy/rock-creek-environmental-data-architecture.md §3.
// ─────────────────────────────────────────────────────────────────────────────

const COMPASS_POINTS = [
  'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
  'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// STAGE 4 — freshness honesty over a long-open tab.
//
// The server bakes one static string at build time ("Observed 12:14 PM").
// That string is accurate the moment the page is generated and then quietly
// wrong for as long as a visitor's tab stays open — which for a "live
// dashboard" claim is exactly backwards. `RelativeClock` recomputes a
// relative-age string on the CLIENT every 60s from the same ISO timestamp the
// server used, using the visitor's own Date.now(). No network request, no new
// data — just an honest clock.
//
// Hydration safety: the server-rendered text is shown as-is on first paint
// (so server and client markup match, avoiding a hydration mismatch), then
// swapped to the client-computed value inside useEffect — a single harmless
// post-mount update, the same pattern used for any "time ago" widget.
// ─────────────────────────────────────────────────────────────────────────────

function relativeAge(isoString: string, nowMs: number): string {
  const ageMs = nowMs - new Date(isoString).getTime();
  if (!Number.isFinite(ageMs)) return isoString;
  if (ageMs < 60_000) return 'just now';
  const minutes = Math.round(ageMs / 60_000);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

function RelativeClock({ isoTime, fallback }: { isoTime: string; fallback: string }) {
  const [display, setDisplay] = useState(fallback);

  useEffect(() => {
    const tick = () => setDisplay(relativeAge(isoTime, Date.now()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [isoTime]);

  return <>{display}</>;
}

/**
 * Stage 4 §3 — the only client-side "refresh" a static export can honestly
 * offer: if a visitor leaves the tab hidden long enough that a new deploy
 * plausibly shipped (the ingestion cron runs every 3h — see
 * `.github/workflows/environmental-ingest.yml`), reload on return so they see
 * whatever the CDN is currently serving. This makes ZERO network requests
 * beyond the reload itself — no polling, no API call, nothing that could
 * violate Open-Meteo's rate limit. Below the threshold, nothing happens.
 */
const REFRESH_AFTER_HIDDEN_MS = 20 * 60_000;

function useReloadOnLongReturn() {
  const hiddenAtRef = useRef<number | null>(null);
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        hiddenAtRef.current = Date.now();
        return;
      }
      const hiddenAt = hiddenAtRef.current;
      hiddenAtRef.current = null;
      if (hiddenAt !== null && Date.now() - hiddenAt >= REFRESH_AFTER_HIDDEN_MS) {
        window.location.reload();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);
}

function toCompass(degrees: number): string {
  const index = Math.round(degrees / 22.5) % 16;
  return COMPASS_POINTS[index] ?? 'N';
}

// The observation's own timezone (`America/Denver`, from ROCK_CREEK_LOCATION)
// is used explicitly — a visitor's browser may be in any timezone, and
// "Observed 12:14 PM" is only meaningful relative to the Ranch's own clock.
function formatObservedTime(isoString: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
      timeZone: 'America/Denver',
    }).format(new Date(isoString));
  } catch {
    return isoString;
  }
}

const FRESHNESS_TO_STATUS: Record<Exclude<ObservationFreshness, 'unavailable'>, ConditionStatus> = {
  fresh: 'optimal',
  stale: 'elevated',
  'very-stale': 'critical',
};

/**
 * Stage 4 §2 — the UI's four-word freshness vocabulary. Renamed from the
 * earlier ad-hoc labels to the brief's exact terms; the underlying
 * `ObservationFreshness` type and its thresholds (Stage 1 architecture doc §6:
 * fresh <3h, stale 3–12h, very-stale >12h) are unchanged and remain covered by
 * Stage 1's tests — only the display string changed.
 *
 * "Live" is used ONLY for fresh (<3h) data. A stale reading is labelled
 * "Recent", never "Live" — the brief is explicit that the word must not
 * outlive its accuracy.
 */
const FRESHNESS_LABEL: Record<ObservationFreshness, string> = {
  fresh: 'Live',
  stale: 'Recent',
  'very-stale': 'Stale',
  unavailable: 'Unavailable',
};

function CurrentConditionsStrip({
  observation,
  freshness,
}: {
  observation: EnvironmentalObservation | null;
  freshness: ObservationFreshness;
}) {
  if (!observation || freshness === 'unavailable') {
    return (
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-neutral-800 bg-neutral-900/40 px-4 py-3">
        <StatusDot status="critical" />
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500">
          Current conditions unavailable — last scheduled fetch did not complete
        </p>
      </div>
    );
  }

  const status = FRESHNESS_TO_STATUS[freshness];

  return (
    <div className="mt-4 rounded-xl border border-neutral-800/80 bg-neutral-900/60 px-4 py-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-mono text-[9px] font-black uppercase tracking-[0.24em] text-neutral-500">
          Current conditions · {observation.locationLabel}
        </p>
        <span
          className={cn(
            'inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em]',
            statusColors[status].text,
          )}
        >
          <StatusDot status={status} pulse={freshness === 'fresh'} />
          {FRESHNESS_LABEL[freshness]}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5">
        <span className="font-tiempos text-2xl font-bold text-white">
          {Math.round(observation.air.temperatureF)}°
        </span>
        <span className="text-sm text-neutral-400">
          {Math.round(observation.wind.speedMph)} mph {toCompass(observation.wind.directionDeg)}
        </span>
        <span className="text-sm text-neutral-400">
          {observation.precipitation.lastHourIn.toFixed(2)}&Prime; precip
        </span>
        <span className="text-sm text-neutral-400">{Math.round(observation.air.humidityPct)}% RH</span>
        {observation.airQuality && (
          <span className="text-sm text-neutral-400">AQI {observation.airQuality.usAqi}</span>
        )}
      </div>
      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-neutral-600">
        Observed {formatObservedTime(observation.observedAt)} ·{' '}
        <RelativeClock isoTime={observation.observedAt} fallback={FRESHNESS_LABEL[freshness]} /> · source:
        open-meteo.com
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM SIGNALS — Stage 2.
//
// The visual relationship this section exists to make legible is:
//     CURRENT CONDITIONS  →  SYSTEM SIGNALS  →  RELEVANT PROBLEM
//
// It is NOT a weather panel. Every row is a rule output, carrying the inputs
// that produced it, the rule id, and the problem it attaches to — so a reader
// can see WHY a signal exists rather than being asked to trust a badge.
//
// Two encodings matter more than the styling:
//
//   1. `indeterminate` is rendered in neutral grey with a hollow marker, NOT as
//      a severity colour. Missing data must never look like an all-clear, and
//      must never look like an alarm either.
//   2. When a problem's rules all evaluate cleanly and none fire, the section
//      says "no currently recorded trigger condition" and states that the
//      problem persists. Signal absence is a statement about this moment, not
//      about the problem (Stage 2 brief §7).
// ─────────────────────────────────────────────────────────────────────────────

const SIGNAL_STATE_TO_STATUS: Record<Exclude<SignalState, 'indeterminate'>, ConditionStatus> = {
  normal: 'optimal',
  watch: 'nominal',
  elevated: 'elevated',
  critical: 'critical',
};

const SIGNAL_STATE_LABEL: Record<SignalState, string> = {
  normal: 'Normal',
  watch: 'Watch',
  elevated: 'Elevated',
  critical: 'Critical',
  indeterminate: 'No data',
};

/**
 * PRESENTATION-ONLY REDESIGN — signal name, state, evidence, and metadata are
 * unchanged `EvaluatedSignal` fields, rendered with corrected hierarchy:
 *
 *   SIGNAL NAME (secondary)  →  STATE (now dominant, was 9px, now the
 *   largest text in the row) →  EVIDENCE (why — contrast-corrected to clear
 *   WCAG AA 4.5:1) → RULE METADATA (stays quiet, intentionally tertiary)
 *
 * State keeps its existing dual-coding — colored dot AND text label, never
 * color alone — that discipline was already correct. What changed is which
 * element in the row carries the most visual weight: previously the smallest
 * text in the row was the one answering "what does the system detect,"
 * which is backwards for a scannable operational interface.
 */
function SignalRow({ signal }: { signal: EvaluatedSignal }) {
  const isIndeterminate = signal.state === 'indeterminate';
  const status = isIndeterminate ? null : SIGNAL_STATE_TO_STATUS[signal.state];

  return (
    <li className="border-t border-neutral-800/60 py-3.5 first:border-t-0 sm:py-4">
      <div className="flex flex-col gap-y-1 sm:flex-row sm:items-start sm:justify-between sm:gap-x-4">
        <div className="flex items-center gap-2">
          {isIndeterminate ? (
            <span
              className="h-2 w-2 shrink-0 rounded-full border border-neutral-600"
              aria-hidden="true"
            />
          ) : (
            <StatusDot status={status!} />
          )}
          <h4 className="text-sm font-semibold text-neutral-200 sm:text-[15px]">{signal.name}</h4>
        </div>

        {/* STATE — the dominant element in the row by design. Same dual
            coding as before (dot + text); the text itself now carries real
            typographic weight instead of being the smallest thing here. */}
        <div className="flex shrink-0 items-center gap-2 pl-4 sm:pl-0">
          <span
            className={cn(
              'font-mono text-sm font-bold uppercase tracking-[0.06em]',
              isIndeterminate ? 'text-neutral-500' : statusColors[status!].text,
            )}
          >
            {SIGNAL_STATE_LABEL[signal.state]}
          </span>
          {signal.dataQuality === 'stale' && (
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-amber-400/70">
              stale data
            </span>
          )}
        </div>
      </div>

      {/* EVIDENCE — the "why." Contrast corrected: neutral-500 on this
          background measured 3.79:1, below WCAG AA's 4.5:1 floor for normal
          text; neutral-400 clears it (~7.9:1). Content unchanged. */}
      <p className="mt-1.5 pl-4 text-xs leading-relaxed text-neutral-400 sm:text-[13px]">
        {signal.inputs.map((i) => `${i.label}: ${i.value}`).join(' · ')}
      </p>

      {/* RULE METADATA — deliberately the quietest line. neutral-600
          measured 2.29:1 (a real AA failure even for tertiary text);
          neutral-500 clears the floor while staying visually subordinate. */}
      <p className="mt-1 pl-4 font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-500">
        {signal.ruleId} v{signal.ruleVersion}
        {signal.thresholdProvenance === 'prototype' && ' · prototype threshold'}
        {signal.thresholdProvenance === 'documented-public-standard' && ' · public standard'}
        {signal.evidenceBasis !== 'direct-measurement' && ' · proxy'}
      </p>
    </li>
  );
}

/**
 * Precedent — Stage 3 §9.
 *
 * Deliberately understated. This is a set intersection on rule ids: a past
 * decision appears because it cited a rule that is firing now. `matchedOnRuleIds`
 * is printed so the reader can see the match reason rather than being asked to
 * assume the system understands anything. No model, no scoring, no inference —
 * calling it precedent is accurate; calling it intelligence would not be.
 *
 * Only the most recent match is expanded. The rest are counted, not listed —
 * §10 asks for a compact loop, not a case file per problem.
 */
function PrecedentBlock({ loop }: { loop: ProblemLoopWithTransitions }) {
  if (!loop.reviewWarranted) return null;

  const [latest, ...rest] = loop.precedent;

  return (
    // Contrast-corrected: neutral-500/600 measured 3.79:1 / 2.29:1 against
    // this background — both below WCAG AA's 4.5:1 floor for normal text.
    // neutral-400/500 clear it. Content, structure, and logic unchanged.
    <div className="mt-2.5 border-l-2 border-amber-500/40 pl-4">
      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-amber-400/90">
        Review warranted · {loop.activeRuleIds.join(', ')} active
      </p>

      {!latest ? (
        <p className="mt-1 text-xs leading-relaxed text-neutral-400">
          No prior decision on record cites these rules.
        </p>
      ) : (
        <div className="mt-1.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-500">
            Precedent · {formatDecisionDate(latest.decision.decidedAtIso)} ·{' '}
            {latest.decision.decidedByRole} · matched on {latest.matchedOnRuleIds.join(', ')}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-neutral-300">
            &ldquo;{latest.decision.decision}&rdquo;
          </p>
          {latest.actions.slice(0, 2).map((action) => (
            <p key={action.id} className="mt-0.5 text-xs leading-relaxed text-neutral-400">
              → {action.detail}{' '}
              <span className="text-neutral-500">
                ({action.responsibleTeam} · {action.status})
              </span>
            </p>
          ))}
          {latest.outcomes.slice(0, 1).map((outcome) => (
            <p key={outcome.id} className="mt-1 text-xs leading-relaxed text-neutral-400">
              <span className="text-neutral-500">Outcome —</span> {outcome.observedEffect}{' '}
              <span className="text-neutral-500">Learning: {outcome.learning}</span>
            </p>
          ))}
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-500">
            Illustrative case-study record · no ranch decision is represented here
            {rest.length > 0 && ` · ${rest.length} further match${rest.length > 1 ? 'es' : ''}`}
          </p>
        </div>
      )}
    </div>
  );
}

function formatDecisionDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'America/Denver',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/**
 * ROCK CREEK SYSTEM STATE — Stage 4 §9.
 *
 * The top of the information hierarchy the brief asks for:
 *
 *   ROCK CREEK SYSTEM STATE → PROBLEM STATE → ENVIRONMENTAL SIGNAL → WEATHER CONTEXT
 *
 * This is the first thing rendered in the header, ABOVE the weather strip —
 * weather is context for the signals below it, not the page's subject. One
 * line: the worst state currently active anywhere in the system, when the
 * page was last regenerated (ticking, via `RelativeClock`), and — only when
 * true — an explicit note that part of the picture is missing data. That
 * last part matters as much as the state itself: §5 requires "no data" to
 * never read as "normal," and burying it in per-problem rows would let a
 * viewer miss it at the level that matters most.
 */
function SystemStatusHeader({ state }: { state: RockCreekSystemState }) {
  const isIndeterminate = state.overallState === 'indeterminate';
  const status = isIndeterminate ? null : SIGNAL_STATE_TO_STATUS[state.overallState];

  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
      {isIndeterminate ? (
        <span className="h-2 w-2 shrink-0 rounded-full border border-neutral-600" aria-hidden="true" />
      ) : (
        <StatusDot status={status!} pulse={status === 'critical' || status === 'elevated'} />
      )}
      <span className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-white">
        Rock Creek system · {SIGNAL_STATE_LABEL[state.overallState]}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-neutral-500">
        updated <RelativeClock isoTime={state.generatedAt} fallback="—" />
      </span>
      {state.hasDataGaps && (
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-neutral-500">
          · data gaps present
        </span>
      )}
    </div>
  );
}

const TIMELINE_ICON: Record<RockCreekSystemState['recentEvents'][number]['kind'], string> = {
  'signal-entered': '▲',
  'signal-cleared': '▽',
  'decision-recorded': '◆',
  'outcome-recorded': '●',
};

/**
 * Stage 4 §7 — a minimal recent-activity trail, not a generic feed.
 *
 * Every entry is one of exactly four kinds, all derived either from the
 * (deterministic, re-derivable) signal engine or from the immutable decision
 * record set — never invented, never a raw log dump. Purpose: show the OS is
 * a continuous loop rather than a snapshot. Capped at 5 by
 * `assembleSystemState`; nothing here re-slices it.
 */
function RecentActivity({ events }: { events: RockCreekSystemState['recentEvents'] }) {
  if (events.length === 0) return null;
  return (
    <div className="mt-3 border-t border-neutral-800/60 pt-2">
      <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">
        Recent activity
      </p>
      <ul className="mt-1.5 space-y-1">
        {events.map((e, i) => (
          <li key={`${e.kind}-${e.atIso}-${i}`} className="flex items-baseline gap-2 text-xs text-neutral-400">
            <span className="font-mono text-neutral-600" aria-hidden="true">
              {TIMELINE_ICON[e.kind]}
            </span>
            <span className="text-neutral-300">{e.label}</span>
            <span className="text-neutral-600">— {e.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SystemSignalsSection({ loops }: { loops: readonly ProblemLoopWithTransitions[] }) {
  if (loops.length === 0) return null;

  return (
    // Card treatment aligned to the established `ConditionCard`/`PanelFrame`
    // pattern (bg-neutral-950/60 + backdrop-blur-sm) rather than the
    // slightly-off bg-neutral-900/60 this block used in isolation — presentation
    // parity with its siblings, not a new visual language. Padding increased
    // for breathing room (Phase 8: more readable, not more empty — the
    // container already had unused width, this uses it).
    <section className="mt-4 rounded-xl border border-neutral-800/80 bg-neutral-950/60 px-5 py-4 backdrop-blur-sm md:px-6 md:py-5">
      {/* Real <h2>: only `h1` carries a forced global override in this
          codebase (globals.css) — h2/h3/h4 are safe to use as real headings
          here, giving screen-reader users correct structure instead of
          relying on visual styling alone (Phase 11). */}
      <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-500">
        System signals · derived from current conditions
      </h2>

      <div className="mt-4 space-y-5">
        {loops.map((loop) => {
          const problem = loop.problem;
          const isIndeterminate = problem.highestState === 'indeterminate';
          const problemStatus = isIndeterminate ? null : SIGNAL_STATE_TO_STATUS[problem.highestState];
          return (
          <div key={problem.problemId}>
            {/* Stage 4 §8 — the problem's own state, visible at a glance
                without reading every signal row beneath it. Reuses the exact
                dot/label vocabulary the signal rows already use, so a viewer
                learns one visual language once. */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {isIndeterminate ? (
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full border border-neutral-600"
                  aria-hidden="true"
                />
              ) : (
                <StatusDot status={problemStatus!} />
              )}
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-rockcreek-400">
                {problem.notionTitle}
              </h3>
              {loop.transitions.length > 0 && (
                // Stage 4 §6 — subtle, operational change indicator. No
                // animation: a small "changed" mark plus the exact from→to,
                // so a returning viewer can see what moved without a flourish.
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-amber-400/80">
                  · changed: {loop.transitions.map((t) => `${t.from}→${t.to}`).join(', ')}
                </span>
              )}
            </div>
            <ul className="mt-2">
              {problem.signals.map((signal) => (
                <SignalRow key={signal.ruleId} signal={signal} />
              ))}
            </ul>
            {problem.noTriggerRecorded && (
              // Contrast-corrected: neutral-500/600 measured 3.79:1 / 2.29:1
              // here — both below WCAG AA's 4.5:1 floor. Wording unchanged.
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                {problem.hasIndeterminate ? (
                  <>
                    No trigger condition recorded by the rules that could be evaluated — one or more rules
                    lack sufficient data.{' '}
                  </>
                ) : (
                  <>No currently recorded trigger condition. </>
                )}
                <span className="text-neutral-500">This does not indicate the problem is resolved.</span>
              </p>
            )}
            <PrecedentBlock loop={loop} />
          </div>
          );
        })}
      </div>

      <p className="mt-4 border-t border-neutral-800/60 pt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-neutral-500">
        Signals interpret conditions. They do not decide. Every response remains a human call.
      </p>
    </section>
  );
}

/**
 * STAGE 4 — one contract in, everything rendered from it.
 *
 * `systemState` is assembled ONCE, server-side, in `../page.tsx`
 * (`assembleSystemState`). This component and everything beneath it —
 * `SystemStatusHeader`, `CurrentConditionsStrip`, `SystemSignalsSection`,
 * `RecentActivity` — read fields off that one object. None of them fetches,
 * recomputes, or reconstructs system state independently; that was true
 * before this stage for the pieces that already existed, and consolidating
 * the four separate props into one object makes it structurally true rather
 * than true by convention (Stage 4 §4).
 *
 * `systemState` defaults to a fully-empty, `indeterminate`/`unavailable`
 * object rather than being required, so the console still renders (with an
 * honest "no data" state throughout) if a caller omits it — same
 * fail-safe-not-fail-silent posture Stage 1 established for the observation
 * loader.
 */
const EMPTY_SYSTEM_STATE: RockCreekSystemState = {
  generatedAt: new Date(0).toISOString(),
  observation: null,
  freshness: 'unavailable',
  overallState: 'indeterminate',
  hasDataGaps: false,
  loops: [],
  recentEvents: [],
  notionSource: null,
};

export function StewardshipConsole({
  systemState = EMPTY_SYSTEM_STATE,
}: {
  systemState?: RockCreekSystemState;
} = {}) {
  const [scenarioId, setScenarioId] = useState<ScenarioId>('normal');
  const [activated, setActivated] = useState(false);
  useReloadOnLongReturn();

  const scenario = scenarios[scenarioId];
  const needsDecision = scenario.response.recommendation !== null;
  const { notionSource, observation: environmentalObservation, freshness: environmentalFreshness, loops: problemLoops } =
    systemState;

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
          {/* CONNECTION PROOF — build-time provenance, not part of the case
              study's argument. Sits BELOW the disclosure so it can never
              displace or dilute it. Remove when the dashboard actually sources
              scenario data from Notion. */}
          {notionSource && (
            <p className="mt-2 flex w-fit items-center gap-2 rounded-full border border-teal-500/40 bg-teal-500/10 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-teal-300">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" aria-hidden="true" />
              Notion source · {notionSource.name} · {notionSource.maturityStage}
            </p>
          )}
          <SystemStatusHeader state={systemState} />
          <CurrentConditionsStrip observation={environmentalObservation} freshness={environmentalFreshness} />
          <SystemSignalsSection loops={problemLoops} />
          <RecentActivity events={systemState.recentEvents} />
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
