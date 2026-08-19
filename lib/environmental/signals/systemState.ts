/**
 * Rock Creek System State — Stage 4.
 *
 * THE single authoritative contract the dashboard renders from. Every UI
 * component reads a field off this object; none reconstructs state from raw
 * observations or history itself. That is the whole point of this file.
 *
 *   REAL WORLD → OBSERVATION → SIGNAL ENGINE → SYSTEM STATE → DASHBOARD
 *
 * `assembleSystemState` is pure — same history + same `nowMs` always produces
 * the same object. It is called once, at build time, in the dashboard's async
 * Server Component (`output: 'export'` has no runtime, so "build time" is the
 * only time this ever runs — see Stage 1 architecture doc §6). There is no
 * later mutation path; a fresh state is produced only by the next deploy.
 */

import type { EnvironmentalObservation, ObservationFreshness } from '../types.ts';
import { getObservationFreshness } from '../types.ts';
import { evaluateAllSignals, highestState } from './engine.ts';
import { assembleLoops } from './loop.ts';
import type { LoopRecords, ProblemLoop } from './loop.ts';
import type { EvaluatedSignal, ProblemId, SignalState } from './types.ts';
import { summarizeByProblem } from './engine.ts';

/**
 * A signal's state differs between this build and the previous ingestion
 * cycle. Computed by re-running the (pure, deterministic) engine at the prior
 * distinct `observedAt` in history and diffing — no transition is ever stored,
 * so this can never drift from what the engine would say if asked directly
 * (Stage 2/3's "signal history is derivable, not stored" principle, extended
 * one step: TRANSITIONS are derivable too).
 */
export interface SignalTransition {
  readonly ruleId: string;
  readonly signalName: string;
  readonly problemId: ProblemId;
  readonly from: SignalState;
  readonly to: SignalState;
}

export type ProblemLoopWithTransitions = ProblemLoop & {
  readonly transitions: readonly SignalTransition[];
};

export type TimelineEventKind = 'signal-entered' | 'signal-cleared' | 'decision-recorded' | 'outcome-recorded';

export interface TimelineEvent {
  readonly kind: TimelineEventKind;
  readonly atIso: string;
  readonly label: string;
  readonly detail: string;
}

export interface RockCreekSystemState {
  readonly generatedAt: string;
  readonly observation: EnvironmentalObservation | null;
  readonly freshness: ObservationFreshness;
  /** Highest severity across every signal. `indeterminate` only when EVERY signal is. */
  readonly overallState: SignalState;
  /** True if any problem has at least one rule that could not be evaluated. */
  readonly hasDataGaps: boolean;
  readonly loops: readonly ProblemLoopWithTransitions[];
  /** Most recent first, capped at 5 — see Stage 4 §7: narrative events only, not a generic feed. */
  readonly recentEvents: readonly TimelineEvent[];
  readonly notionSource: { readonly name: string; readonly maturityStage: string } | null;
}

/** All distinct `observedAt` values in history, newest first. */
function distinctTimestamps(history: readonly EnvironmentalObservation[]): string[] {
  return [...new Set(history.map((o) => o.observedAt))].sort(
    (a, b) => Date.parse(b) - Date.parse(a),
  );
}

/**
 * Diff this build's signals against the prior ingestion cycle's. Requires at
 * least two distinct observation timestamps in history; with fewer, there is
 * nothing to diff against and the function returns no transitions rather than
 * guessing — the same "insufficient data → no claim" discipline as Stage 2.
 */
function computeTransitions(
  history: readonly EnvironmentalObservation[],
  currentSignals: readonly EvaluatedSignal[],
  nowMs: number,
): SignalTransition[] {
  const timestamps = distinctTimestamps(history);
  if (timestamps.length < 2) return [];

  const previousMs = Date.parse(timestamps[1]!);
  const previousSignals = evaluateAllSignals(history, previousMs);
  const previousByRule = new Map(previousSignals.map((s) => [s.ruleId, s]));

  const transitions: SignalTransition[] = [];
  for (const current of currentSignals) {
    const prior = previousByRule.get(current.ruleId);
    if (!prior || prior.state === current.state) continue;
    transitions.push({
      ruleId: current.ruleId,
      signalName: current.name,
      problemId: current.problemId,
      from: prior.state,
      to: current.state,
    });
  }
  return transitions;
}

function buildTimeline(
  loops: readonly ProblemLoopWithTransitions[],
  records: LoopRecords,
  observedAt: string | null,
): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  // Signal transitions — timestamped to the observation that revealed them,
  // not to an exact crossing instant we don't have.
  if (observedAt) {
    for (const loop of loops) {
      for (const t of loop.transitions) {
        const entering = t.to !== 'normal' && t.to !== 'indeterminate';
        events.push({
          kind: entering ? 'signal-entered' : 'signal-cleared',
          atIso: observedAt,
          label: entering ? `${t.signalName} → ${t.to}` : `${t.signalName} cleared`,
          detail: `${loop.problem.notionTitle} · was ${t.from}`,
        });
      }
    }
  }

  for (const d of records.decisions) {
    events.push({
      kind: 'decision-recorded',
      atIso: d.decidedAtIso,
      label: 'Decision recorded',
      detail: d.decision,
    });
  }
  for (const o of records.outcomes) {
    events.push({
      kind: 'outcome-recorded',
      atIso: o.recordedAtIso,
      label: 'Outcome recorded',
      detail: o.observedEffect,
    });
  }

  return events.sort((a, b) => Date.parse(b.atIso) - Date.parse(a.atIso)).slice(0, 5);
}

export function assembleSystemState(
  history: readonly EnvironmentalObservation[],
  current: EnvironmentalObservation | null,
  records: LoopRecords,
  notionSource: { name: string; maturityStage: string } | null,
  nowMs: number = Date.now(),
): RockCreekSystemState {
  const signals = evaluateAllSignals(history, nowMs);
  const summaries = summarizeByProblem(signals);
  const baseLoops = assembleLoops(summaries, records);
  const transitions = computeTransitions(history, signals, nowMs);

  const loops: ProblemLoopWithTransitions[] = baseLoops.map((loop) => ({
    ...loop,
    transitions: transitions.filter((t) => t.problemId === loop.problem.problemId),
  }));

  return {
    generatedAt: new Date(nowMs).toISOString(),
    observation: current,
    freshness: getObservationFreshness(current, nowMs),
    overallState: highestState(signals),
    hasDataGaps: summaries.some((p) => p.hasIndeterminate),
    loops,
    recentEvents: buildTimeline(loops, records, current?.observedAt ?? null),
    notionSource,
  };
}
