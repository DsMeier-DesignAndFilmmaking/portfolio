/**
 * Illustrative decision / action / outcome records — Stage 3.
 *
 * ─── READ THIS BEFORE ADDING A RECORD ───────────────────────────────────────
 * NO RANCH EMPLOYEE MADE ANY DECISION IN THIS FILE. There is no client
 * relationship. Every record is an authored illustration of how the loop would
 * run, drawn from the modeled scenarios in `./scenarios.ts` — the same material
 * the console has always shown, now expressed as loop records so the chain
 * OBSERVATION → SIGNAL → PROBLEM → DECISION → ACTION → OUTCOME is traceable
 * end to end.
 *
 * `provenance: 'illustrative-case-study'` is the only value the type permits, so
 * an "operational" record cannot be represented here even by mistake.
 *
 * `decidedByRole` is always a ROLE from the live Notion `Responsible Team`
 * vocabulary, never a person. `problemId` always points at one of the three
 * existing Notion System Tensions — no problem is invented here.
 *
 * WHY THIS LIVES IN THE REPOSITORY AND NOT IN NOTION: no Decision, Action, or
 * Outcome database exists in the workspace, and creating one requires explicit
 * authorisation. These are authored case-study records — composition, not
 * measurement — which is the same classification `scenarios.ts` carries.
 *
 * IMMUTABILITY: nothing recomputes these. New weather changes signals; it must
 * never change what was decided (Stage 3 §11).
 */

import type {
  ActionRecord,
  DecisionRecord,
  LoopRecords,
  OutcomeRecord,
} from '@/lib/environmental/signals/loop';

const decisions: DecisionRecord[] = [
  {
    id: 'DEC-ILL-001',
    problemId: 'hydrological-flow-vs-guest-programming',
    triggeringRuleIds: ['RCO-H1', 'RCO-H2'],
    evidenceSnapshot: [
      { label: 'Peak air temperature', value: '94°F' },
      { label: 'Cumulative precipitation', value: '0.00″ / 72h' },
      { label: 'Mean relative humidity', value: '21%' },
    ],
    decision: 'Shift afternoon river activities to high-country alternatives.',
    rationale:
      'Guides and equipment can be repositioned before the 2:00 PM closure if the decision is made in ' +
      'the morning. The same pivot made at 1:45 PM reads to the guest as a cancellation.',
    decidedAtIso: '2025-08-14T09:20:00-06:00',
    decidedByRole: 'Leadership',
    authorityLevel: 'approves',
    provenance: 'illustrative-case-study',
  },
  {
    id: 'DEC-ILL-002',
    problemId: 'hydrological-flow-vs-guest-programming',
    triggeringRuleIds: ['RCO-H1', 'RCO-L2'],
    evidenceSnapshot: [
      { label: 'Peak air temperature', value: '96°F' },
      { label: 'Peak US AQI', value: '164' },
    ],
    decision: 'Activate sheltered valley-floor programming; hold high country in reserve.',
    rationale:
      'The usual highland substitute is unavailable, so the response set narrows to sheltered, ' +
      'low-exertion options. This is the decision most worth making early — the remaining ' +
      'alternatives have the least capacity.',
    decidedAtIso: '2025-08-22T08:05:00-06:00',
    decidedByRole: 'Leadership',
    authorityLevel: 'approves',
    provenance: 'illustrative-case-study',
  },
  {
    id: 'DEC-ILL-003',
    problemId: 'landscape-stewardship-vs-infrastructure-demand',
    triggeringRuleIds: ['RCO-L2', 'RCO-L1'],
    evidenceSnapshot: [
      { label: 'Peak US AQI', value: '164' },
      { label: 'Mean relative humidity', value: '19%' },
      { label: 'Peak wind', value: '27 mph' },
    ],
    decision: 'Withdraw exposed ridgeline routes; keep valley-floor circulation open.',
    rationale:
      'Air quality crossed the threshold for sustained outdoor exertion on the exposed routes ' +
      'specifically. Closing the whole trail network would have removed capacity that was still safe.',
    decidedAtIso: '2025-08-22T07:40:00-06:00',
    decidedByRole: 'Stewardship & Land Management',
    authorityLevel: 'recommends',
    provenance: 'illustrative-case-study',
  },
];

const actions: ActionRecord[] = [
  {
    id: 'ACT-ILL-001',
    decisionId: 'DEC-ILL-001',
    label: 'Guides reassigned',
    detail: 'Two river guides reassigned to highland routes',
    responsibleTeam: 'Activity Guides',
    status: 'completed',
    provenance: 'illustrative-case-study',
  },
  {
    id: 'ACT-ILL-002',
    decisionId: 'DEC-ILL-001',
    label: 'Transport re-sequenced',
    detail: 'Shuttle re-sequenced for a 1:30 PM highland departure',
    responsibleTeam: 'Transportation & Mobility',
    status: 'completed',
    provenance: 'illustrative-case-study',
  },
  {
    id: 'ACT-ILL-003',
    decisionId: 'DEC-ILL-002',
    label: 'Valley programming opened',
    detail: 'Saloon and riverside pavilion opened early with filtered air',
    responsibleTeam: 'Guest Services & Concierge',
    status: 'completed',
    provenance: 'illustrative-case-study',
  },
  {
    id: 'ACT-ILL-004',
    decisionId: 'DEC-ILL-002',
    label: 'Highland kit stood down',
    detail: 'Highland kit stood down; interpretive and indoor provision staged',
    responsibleTeam: 'Ranch Operations',
    status: 'completed',
    provenance: 'illustrative-case-study',
  },
  {
    id: 'ACT-ILL-005',
    decisionId: 'DEC-ILL-003',
    label: 'Ridgeline shuttle suspended',
    detail: 'Ridgeline shuttle suspended; short valley circuit only',
    responsibleTeam: 'Transportation & Mobility',
    status: 'completed',
    provenance: 'illustrative-case-study',
  },
];

const outcomes: OutcomeRecord[] = [
  {
    id: 'OUT-ILL-001',
    actionId: 'ACT-ILL-001',
    observedEffect: 'Closure arrived within the forecast window; the alternative held its booking rate.',
    conditionChange: 'unchanged',
    learning:
      'The threshold model held. The highland set is a reliable substitute when only the primary ' +
      'constraint is active.',
    recordedAtIso: '2025-08-14T19:00:00-06:00',
    provenance: 'illustrative-case-study',
  },
  {
    id: 'OUT-ILL-003',
    actionId: 'ACT-ILL-003',
    observedEffect: 'A compound event was absorbed without a cancellation, but with less margin.',
    conditionChange: 'unchanged',
    learning:
      'Sheltered capacity is the property’s real ceiling, and it is thinner than the highland set.',
    recordedAtIso: '2025-08-22T20:10:00-06:00',
    provenance: 'illustrative-case-study',
  },
  {
    id: 'OUT-ILL-005',
    actionId: 'ACT-ILL-005',
    observedEffect: 'Exposure on the affected routes ended when regional smoke cleared overnight.',
    conditionChange: 'improved',
    learning:
      'Route-level withdrawal preserved more capacity than a network-wide closure would have.',
    recordedAtIso: '2025-08-23T09:15:00-06:00',
    provenance: 'illustrative-case-study',
  },
];

/** The immutable record set the loop assembler reads. Nothing writes to it. */
export const LOOP_RECORDS: LoopRecords = { decisions, actions, outcomes };
