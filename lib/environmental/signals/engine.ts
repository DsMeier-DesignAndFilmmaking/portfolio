/**
 * Signal engine — pure evaluation. No I/O, no clock of its own, no persistence.
 *
 * Everything here is a deterministic function of (observations, now). Given the
 * same history and the same instant it returns the same signals, every time —
 * which is what makes signal history DERIVABLE rather than stored (brief §9).
 * Re-running the engine over `history.ndjson` reconstructs the exact signal
 * state at any past moment, so no signal table is needed and no duplication is
 * introduced.
 */

import type { EnvironmentalObservation } from '../types.ts';
import { getObservationFreshness } from '../types.ts';
import { SIGNAL_RULES } from './rules.ts';
import {
  PROBLEMS,
  SIGNAL_SEVERITY,
  type EvaluatedSignal,
  type ProblemId,
  type ProblemSignalSummary,
  type SignalDataQuality,
  type SignalRule,
  type SignalState,
} from './types.ts';

const HOUR_MS = 60 * 60 * 1000;

/** Newest-first observations inside the rule's window. */
function windowFor(
  rule: SignalRule,
  history: readonly EnvironmentalObservation[],
  nowMs: number,
): EnvironmentalObservation[] {
  return history
    .filter((o) => {
      const t = new Date(o.observedAt).getTime();
      return Number.isFinite(t) && nowMs - t <= rule.windowHours * HOUR_MS && nowMs - t >= 0;
    })
    .sort((a, b) => new Date(b.observedAt).getTime() - new Date(a.observedAt).getTime());
}

/**
 * Data quality is derived from the newest observation in the window and from
 * whether enough observations exist to satisfy the rule. It is deliberately a
 * separate axis from state — a stale `critical` is still `critical`, but the
 * consumer is told the reading is old rather than being handed a silent
 * downgrade.
 */
function qualityFor(window: readonly EnvironmentalObservation[], rule: SignalRule, nowMs: number): SignalDataQuality {
  if (window.length === 0) return 'unavailable';
  if (window.length < rule.minObservations) return 'insufficient';
  const freshness = getObservationFreshness(window[0]!, nowMs);
  if (freshness === 'unavailable') return 'unavailable';
  return freshness === 'fresh' ? 'current' : 'stale';
}

export function evaluateSignal(
  rule: SignalRule,
  history: readonly EnvironmentalObservation[],
  nowMs: number = Date.now(),
): EvaluatedSignal {
  const window = windowFor(rule, history, nowMs);
  const dataQuality = qualityFor(window, rule, nowMs);

  const base = {
    ruleId: rule.id,
    ruleVersion: rule.version,
    name: rule.name,
    problemId: rule.problemId,
    evidenceBasis: rule.evidenceBasis,
    thresholdProvenance: rule.thresholdProvenance,
    observedAt: window[0]?.observedAt ?? null,
    provenance: window[0]
      ? { source: window[0].source, observedAt: window[0].observedAt, ingestedAt: window[0].fetchedAt }
      : null,
    windowHours: rule.windowHours,
    observationsUsed: window.length,
    dataQuality,
  };

  // Not enough data to evaluate. This is `indeterminate`, NOT `normal` —
  // the whole point of brief §6 is that silence never reads as all-clear.
  if (dataQuality === 'unavailable' || dataQuality === 'insufficient') {
    return {
      ...base,
      state: 'indeterminate',
      inputs: [
        { label: 'Observations in window', value: `${window.length} of ${rule.minObservations} required` },
      ],
      rationale:
        dataQuality === 'unavailable'
          ? 'No environmental observation is available for this window, so the rule was not evaluated.'
          : 'Too few observations in the window to evaluate this rule. No state is asserted.',
      thresholdApplied: 'not applied — rule not evaluated',
      noTriggerRecorded: false,
    };
  }

  const result = rule.evaluate({ window, nowMs });

  return {
    ...base,
    state: result.state,
    inputs: result.inputs,
    rationale: result.rationale,
    thresholdApplied: result.thresholdApplied,
    // Only a clean `normal` counts as "evaluated and nothing found".
    noTriggerRecorded: result.state === 'normal',
  };
}

export function evaluateAllSignals(
  history: readonly EnvironmentalObservation[],
  nowMs: number = Date.now(),
): EvaluatedSignal[] {
  return SIGNAL_RULES.map((rule) => evaluateSignal(rule, history, nowMs));
}

export function highestState(signals: readonly EvaluatedSignal[]): SignalState {
  let best: SignalState = 'indeterminate';
  for (const s of signals) {
    if (SIGNAL_SEVERITY[s.state] > SIGNAL_SEVERITY[best]) best = s.state;
  }
  return best;
}

/**
 * Group signals under the existing three problems.
 *
 * `persistent: true` is a literal, so no code path can produce a summary that
 * says a problem is resolved. Signal absence is reported as
 * `noTriggerRecorded` — "no currently recorded trigger condition" — which is a
 * statement about the present moment, not about the problem (brief §7).
 */
export function summarizeByProblem(
  signals: readonly EvaluatedSignal[],
): ProblemSignalSummary[] {
  return (Object.keys(PROBLEMS) as ProblemId[]).map((problemId) => {
    const problem = PROBLEMS[problemId];
    const own = signals.filter((s) => s.problemId === problemId);
    const evaluated = own.filter((s) => s.state !== 'indeterminate');
    return {
      problemId,
      notionTitle: problem.notionTitle,
      layer: problem.layer,
      persistent: true,
      signals: own,
      highestState: highestState(own),
      noTriggerRecorded: evaluated.length > 0 && evaluated.every((s) => s.noTriggerRecorded),
      hasIndeterminate: own.some((s) => s.state === 'indeterminate'),
    };
  });
}
