/**
 * The operational loop — Stage 3.
 *
 *   OBSERVATION → SIGNAL → PROBLEM → DECISION → ACTION → OUTCOME → KNOWLEDGE
 *
 * Where the automation stops, precisely:
 *
 *   OBSERVATION → SIGNAL → PROBLEM   AUTOMATED. Deterministic, recomputed every
 *                                     build from the observation log.
 *   ─────────────── human judgment boundary ───────────────
 *   DECISION → ACTION → OUTCOME       HUMAN-AUTHORED RECORDS. Never generated,
 *                                     never mutated by the engine, never
 *                                     recomputed when the weather changes.
 *
 * The engine may say "review is warranted". It may surface precedent. It may
 * assemble evidence. It may NOT create a decision — and nothing in this file
 * has a code path that writes one (Stage 3 §7).
 *
 * VOCABULARY REUSE — no new concepts were invented here. `AuthorityLevel` is
 * the live Notion `Stakeholders.Authority Level` option set; `ResponsibleTeam`
 * is the live `Responsible Team` set shared by Environmental Signals and
 * Recursive Loop Nodes; the loop stages are the six Recursive Loop Nodes,
 * whose `Node Type` values already read Signal / Intelligence / Decision /
 * Action / Outcome.
 */

import type { EvaluatedSignal, ProblemId, ProblemSignalSummary, SignalInput } from './types.ts';
import { SIGNAL_SEVERITY } from './types.ts';

/** Live Notion `Stakeholders.Authority Level` options. */
export type AuthorityLevel = 'informed' | 'consulted' | 'recommends' | 'approves' | 'acts';

/** Live Notion `Responsible Team` options (shared by Signals and Loop Nodes). */
export type ResponsibleTeam =
  | 'Stewardship & Land Management'
  | 'Ranch Operations'
  | 'Guest Services & Concierge'
  | 'Activity Guides'
  | 'Transportation & Mobility'
  | 'Facilities & Maintenance'
  | 'Leadership';

/**
 * Every record in this stage carries this, and it has exactly one legal value.
 *
 * There is no client relationship. No ranch employee made any decision recorded
 * here. Making this a single-member literal type means the codebase cannot
 * express an "operational" decision record even by accident — the honesty
 * requirement in §7 is enforced by the compiler rather than by a disclaimer.
 */
export type RecordProvenance = 'illustrative-case-study';

/** Minimal set. `in-progress` was deliberately omitted — see §5, do not overbuild workflow machinery. */
export type ActionStatus = 'recommended' | 'approved' | 'completed' | 'cancelled';

export type ConditionChange = 'improved' | 'unchanged' | 'worsened' | 'not-assessed';

export interface DecisionRecord {
  readonly id: string;
  readonly problemId: ProblemId;
  /** Rules cited as evidence AT THE TIME OF THE DECISION. Immutable. */
  readonly triggeringRuleIds: readonly string[];
  /** Frozen copy of the evidence as it stood. Never recomputed from today's weather. */
  readonly evidenceSnapshot: readonly SignalInput[];
  readonly decision: string;
  readonly rationale: string;
  readonly decidedAtIso: string;
  /** A ROLE, never a named individual. */
  readonly decidedByRole: ResponsibleTeam;
  readonly authorityLevel: AuthorityLevel;
  readonly provenance: RecordProvenance;
}

export interface ActionRecord {
  readonly id: string;
  readonly decisionId: string;
  readonly label: string;
  readonly detail: string;
  readonly responsibleTeam: ResponsibleTeam;
  readonly status: ActionStatus;
  readonly provenance: RecordProvenance;
}

export interface OutcomeRecord {
  readonly id: string;
  readonly actionId: string;
  readonly observedEffect: string;
  readonly conditionChange: ConditionChange;
  /** Feeds Recursive Loop Node 6, Operational Learning — the loop closing. */
  readonly learning: string;
  readonly recordedAtIso: string;
  readonly provenance: RecordProvenance;
}

/** A prior decision surfaced because it cites a rule that is active now. */
export interface PrecedentMatch {
  readonly decision: DecisionRecord;
  readonly actions: readonly ActionRecord[];
  readonly outcomes: readonly OutcomeRecord[];
  /** WHY this precedent surfaced. Deterministic rule-id overlap — no inference. */
  readonly matchedOnRuleIds: readonly string[];
}

export interface ProblemLoop {
  readonly problem: ProblemSignalSummary;
  /**
   * True when at least one signal is at `watch` or above. This is a PROMPT FOR
   * HUMAN REVIEW, not a decision and not a problem-state change.
   */
  readonly reviewWarranted: boolean;
  /** Rules currently at watch or above — the evidence a reviewer would look at. */
  readonly activeRuleIds: readonly string[];
  readonly precedent: readonly PrecedentMatch[];
}

export interface LoopRecords {
  readonly decisions: readonly DecisionRecord[];
  readonly actions: readonly ActionRecord[];
  readonly outcomes: readonly OutcomeRecord[];
}

/** Signals at `watch` or above. `indeterminate` never counts as active. */
export function activeSignals(signals: readonly EvaluatedSignal[]): EvaluatedSignal[] {
  return signals.filter((s) => SIGNAL_SEVERITY[s.state] >= SIGNAL_SEVERITY.watch);
}

/**
 * Precedent lookup — deterministic set intersection, nothing more.
 *
 * A past decision surfaces when it cites a rule that is active right now. That
 * is the entire matching logic, and `matchedOnRuleIds` exposes it so a reader
 * can check the reasoning rather than trust it. No similarity scoring, no
 * embeddings, no model. Calling this "finding precedent" is accurate; calling
 * it intelligence would not be.
 */
export function findPrecedent(
  problemId: ProblemId,
  activeRuleIds: readonly string[],
  records: LoopRecords,
): PrecedentMatch[] {
  if (activeRuleIds.length === 0) return [];
  const active = new Set(activeRuleIds);

  return records.decisions
    .filter((d) => d.problemId === problemId)
    .map((decision) => {
      const matchedOnRuleIds = decision.triggeringRuleIds.filter((r) => active.has(r));
      const actions = records.actions.filter((a) => a.decisionId === decision.id);
      const actionIds = new Set(actions.map((a) => a.id));
      const outcomes = records.outcomes.filter((o) => actionIds.has(o.actionId));
      return { decision, actions, outcomes, matchedOnRuleIds };
    })
    .filter((m) => m.matchedOnRuleIds.length > 0)
    .sort((a, b) => Date.parse(b.decision.decidedAtIso) - Date.parse(a.decision.decidedAtIso));
}

/**
 * Assemble the loop for each problem.
 *
 * Pure. Takes today's signals and the immutable record set and returns a view.
 * It never writes, so re-running it after new weather arrives cannot alter a
 * single historical record (§11).
 */
export function assembleLoops(
  summaries: readonly ProblemSignalSummary[],
  records: LoopRecords,
): ProblemLoop[] {
  return summaries.map((problem) => {
    const active = activeSignals(problem.signals);
    const activeRuleIds = active.map((s) => s.ruleId);
    return {
      problem,
      reviewWarranted: active.length > 0,
      activeRuleIds,
      precedent: findPrecedent(problem.problemId, activeRuleIds, records),
    };
  });
}
