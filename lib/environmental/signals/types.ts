/**
 * Environmental Signal Engine — domain model.
 *
 * The strict conceptual ladder this file exists to protect (Stage 2 brief §2):
 *
 *   OBSERVATION  a measured fact                  → EnvironmentalObservation
 *   SIGNAL       a current condition suggesting   → EvaluatedSignal
 *                a problem may need attention
 *   PROBLEM      a persistent systemic issue      → Problem (never resolved by a signal)
 *   DECISION     a human determination            → NOT MODELLED YET
 *   ACTION       something performed              → NOT MODELLED YET
 *   OUTCOME      what happened after              → NOT MODELLED YET
 *
 * Raw weather never reaches a problem. It reaches a RULE, which produces a
 * SIGNAL, which ATTACHES to a problem. The engine interprets; it does not decide.
 */

import type { EnvironmentalObservation } from '../types.ts';

/**
 * `indeterminate` is NOT a severity — it is the absence of an evaluation, and
 * it exists specifically so missing data can never silently become `normal`
 * (Stage 2 brief §6). Ordering below is severity ordering; `indeterminate`
 * deliberately sits outside it.
 */
export type SignalState = 'normal' | 'watch' | 'elevated' | 'critical' | 'indeterminate';

export const SIGNAL_SEVERITY: Record<SignalState, number> = {
  indeterminate: -1,
  normal: 0,
  watch: 1,
  elevated: 2,
  critical: 3,
};

/** Data quality is a SEPARATE axis from state. A `critical` signal on `stale` data is not the same claim as one on `current` data. */
export type SignalDataQuality = 'current' | 'stale' | 'insufficient' | 'unavailable';

/**
 * How honestly the observation maps to the thing the signal is about.
 * `proxy` is the important one: air temperature is not water temperature, and
 * a signal built on it must say so rather than imply a measurement it does not have.
 */
export type EvidenceBasis = 'direct-measurement' | 'proxy' | 'composite-proxy';

/** Where a threshold came from. Prototype thresholds are NOT Ranch operational standards. */
export type ThresholdProvenance = 'prototype' | 'documented-public-standard' | 'documented-source';

/**
 * The three existing Rock Creek problems, keyed to the live Notion
 * `System Tensions` records. These are NOT invented here and must not be
 * renamed — `notionTitle` is the exact title string in the workspace.
 */
export type ProblemId =
  | 'hydrological-flow-vs-guest-programming'
  | 'landscape-stewardship-vs-infrastructure-demand'
  | 'remote-operations-vs-forbes-service-consistency';

export interface Problem {
  readonly id: ProblemId;
  readonly notionTitle: string;
  readonly shortLabel: string;
  readonly layer: 'Ecology' | 'Infrastructure' | 'Experience';
}

export const PROBLEMS: Readonly<Record<ProblemId, Problem>> = {
  'hydrological-flow-vs-guest-programming': {
    id: 'hydrological-flow-vs-guest-programming',
    notionTitle: 'Hydrological Flow vs Guest Programming',
    shortLabel: 'Hydrological Flow vs Guest Programming',
    layer: 'Ecology',
  },
  'landscape-stewardship-vs-infrastructure-demand': {
    id: 'landscape-stewardship-vs-infrastructure-demand',
    notionTitle: 'Landscape Stewardship vs Infrastructure Demand',
    shortLabel: 'Landscape Stewardship vs Infrastructure Demand',
    layer: 'Infrastructure',
  },
  'remote-operations-vs-forbes-service-consistency': {
    id: 'remote-operations-vs-forbes-service-consistency',
    notionTitle: 'Remote Operations vs Forbes Service Consistency',
    shortLabel: 'Remote Operations vs Forbes Service Consistency',
    layer: 'Experience',
  },
};

/** One input value that drove an evaluation — rendered verbatim in the explanation. */
export interface SignalInput {
  readonly label: string;
  readonly value: string;
}

export interface EvaluatedSignal {
  readonly ruleId: string;
  readonly ruleVersion: string;
  readonly name: string;
  readonly problemId: ProblemId;

  readonly state: SignalState;
  readonly dataQuality: SignalDataQuality;
  readonly evidenceBasis: EvidenceBasis;
  readonly thresholdProvenance: ThresholdProvenance;

  /** The values that produced this state. Requirement §8: a signal must be explainable. */
  readonly inputs: readonly SignalInput[];
  /** One sentence naming the rule's logic in plain language. */
  readonly rationale: string;
  /** The threshold expression actually applied, quoted for inspection. */
  readonly thresholdApplied: string;

  readonly observedAt: string | null;
  /**
   * Stage 3 §8 — full provenance chain for the reading behind this signal.
   * SOURCE → VALUE → OBSERVED AT → INGESTED AT → RULE → THRESHOLD → SIGNAL.
   * `values` are carried in `inputs`; `rule`/`threshold` in ruleId/thresholdApplied.
   * null when the rule could not be evaluated.
   */
  readonly provenance: {
    readonly source: string;
    readonly observedAt: string;
    readonly ingestedAt: string;
  } | null;
  /** How many hours of observations the rule considered. */
  readonly windowHours: number;
  /** How many observations were actually available in that window. */
  readonly observationsUsed: number;

  /**
   * True only when the rule evaluated CLEANLY and found no condition.
   * Never true for `indeterminate`. This is the encoded form of
   * "NO SIGNAL DETECTED ≠ NO PROBLEM EXISTS" (brief §7).
   */
  readonly noTriggerRecorded: boolean;
}

/**
 * Problem-level rollup.
 *
 * `persistent` is a literal `true` on purpose: it is structurally impossible to
 * construct a summary that marks a problem resolved. Signal absence describes
 * the present moment, never the problem (brief §7).
 */
export interface ProblemSignalSummary {
  readonly problemId: ProblemId;
  readonly notionTitle: string;
  readonly layer: Problem['layer'];
  readonly persistent: true;
  readonly signals: readonly EvaluatedSignal[];
  readonly highestState: SignalState;
  /** Every rule for this problem evaluated cleanly and none fired. */
  readonly noTriggerRecorded: boolean;
  /** At least one rule could not be evaluated (missing/stale inputs). */
  readonly hasIndeterminate: boolean;
}

/** Newest-first window of observations handed to a rule. */
export interface RuleContext {
  readonly window: readonly EnvironmentalObservation[];
  readonly nowMs: number;
}

export interface RuleResult {
  readonly state: SignalState;
  readonly inputs: readonly SignalInput[];
  readonly rationale: string;
  readonly thresholdApplied: string;
}

export interface SignalRule {
  readonly id: string;
  readonly version: string;
  readonly name: string;
  readonly problemId: ProblemId;
  readonly evidenceBasis: EvidenceBasis;
  readonly thresholdProvenance: ThresholdProvenance;
  /** Hours of history the rule needs to reach a determinate answer. */
  readonly windowHours: number;
  /** Minimum observations inside the window before the rule may report anything but `indeterminate`. */
  readonly minObservations: number;
  readonly evaluate: (ctx: RuleContext) => RuleResult;
}
