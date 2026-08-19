// ─────────────────────────────────────────────────────────────────────────────
// Adaptive Stewardship OS — scenario model for the conceptual console.
//
// Authoritative source: `rock-creek-os-foundation.md`. This file deliberately
// holds ONE small, coherent scenario set rather than a broad telemetry
// dataset. The previous version of this dashboard carried 18 metrics across
// four modules (energy resilience, supply-chain autonomy, carbon
// sequestration, guest HRV, sleep quality, response velocity…) — a metrics
// wall that demonstrated none of the three systems this case study is about,
// and which contradicted itself by displaying population biometrics beside a
// "zero unconsented data exposure" claim. All of it is gone.
//
// What remains is the minimum needed to demonstrate one thing: how an
// environmental signal becomes an operational decision and then a preserved
// guest experience. Three scenario states, four zones, one human decision.
//
// EVIDENCE BOUNDARY. Only the 70°F trout-stress threshold and the "Hoot Owl"
// 2:00 PM closure mechanism are documented (foundation doc §4, source [S1]).
// Every reading below — temperatures, flows, fire indices — is a MODELED
// value chosen to make the mechanism legible, not a measurement of anything.
// The console surfaces that distinction persistently rather than in a
// footnote. No sensor, API, staffing workflow, or software system described
// here is claimed to exist at The Ranch at Rock Creek.
// ─────────────────────────────────────────────────────────────────────────────

export type ConditionStatus = 'optimal' | 'nominal' | 'elevated' | 'critical';
export type TrendDirection = 'up' | 'down' | 'stable';

export type ScenarioId = 'normal' | 'heat' | 'compound';

export type ActivityImpact = {
  id: string;
  label: string;
  status: ConditionStatus;
  note: string;
};

export type LogisticsAction = {
  id: string;
  label: string;
  detail: string;
};

export type Scenario = {
  id: ScenarioId;
  label: string;
  /** Short form for the segmented control. */
  shortLabel: string;
  /** One line, shown under the selector — sets the situation in a breath. */
  premise: string;

  /** PRIMARY environmental input. Always rendered dominant. */
  river: {
    temperature: string;
    flow: string;
    status: ConditionStatus;
    trend: TrendDirection;
    /** The plain-language condition, e.g. "Fishing open". */
    condition: string;
    /** Why that condition follows from the reading. */
    thresholdNote: string;
  };

  /** SUPPORTING environmental input. Always rendered subordinate. */
  fire: {
    risk: string;
    status: ConditionStatus;
    trend: TrendDirection;
    condition: string;
    thresholdNote: string;
  };

  /** Zone 02 — what the conditions mean. */
  interpretation: {
    summary: string;
    affected: ActivityImpact[];
  };

  /** Zone 03 — what the system suggests, for a person to decide. */
  response: {
    /** Null when nothing needs deciding — the normal state. */
    recommendation: string | null;
    rationale: string;
    /** Label for the human decision control. */
    actionLabel: string;
    /** What logistics does once a person activates the recommendation. */
    logistics: LogisticsAction[];
  };

  /** Zone 04 — the output the whole system exists to protect. */
  guest: {
    /** Before any decision is taken. */
    current: string;
    /** After the human activates the recommendation. */
    adapted: string;
    /** Short status chip, post-decision. */
    status: string;
    statusTone: ConditionStatus;
  };

  /** Closes the loop — what this event teaches the next one. */
  outcome: string;
};

export const scenarios: Record<ScenarioId, Scenario> = {
  normal: {
    id: 'normal',
    label: 'Normal conditions',
    shortLabel: 'Normal',
    premise: 'Early season. The creek is cold, the forest is damp, and nothing needs deciding.',
    river: {
      temperature: '58°F',
      flow: 'Steady',
      status: 'optimal',
      trend: 'stable',
      condition: 'Fishing open',
      thresholdNote: 'Well below the 70°F trout-stress threshold. No closure mechanism engaged.',
    },
    fire: {
      risk: 'Low',
      status: 'optimal',
      trend: 'stable',
      condition: 'All zones open',
      thresholdNote: 'Fuel moisture high after spring melt. No access restrictions.',
    },
    interpretation: {
      summary:
        'No threshold is near. Every activity the property sells is available, and the system has nothing to escalate.',
      affected: [
        { id: 'fishing', label: 'Fishing', status: 'optimal', note: 'Full day available' },
        { id: 'trails', label: 'Trails', status: 'optimal', note: 'All routes open' },
        { id: 'access', label: 'Access', status: 'optimal', note: 'Normal circulation' },
      ],
    },
    response: {
      recommendation: null,
      rationale:
        'Nothing to recommend. The system is watching two thresholds and neither is in range — this is what the console looks like the overwhelming majority of the time.',
      actionLabel: 'No action required',
      logistics: [],
    },
    guest: {
      current: 'Full-day fly fishing on Rock Creek, as booked.',
      adapted: 'Full-day fly fishing on Rock Creek, as booked.',
      status: 'As planned',
      statusTone: 'optimal',
    },
    outcome:
      'Baseline conditions logged. Each normal day sharpens the model of what "normal" is, which is what makes the next departure from it legible.',
  },

  heat: {
    id: 'heat',
    label: 'Heat event',
    shortLabel: 'Heat event',
    premise: 'Mid-August. Four consecutive days above 90°F air temperature. The creek has been warming since dawn.',
    river: {
      temperature: '71°F',
      flow: 'Falling',
      status: 'critical',
      trend: 'up',
      condition: 'Hoot Owl restriction likely',
      thresholdNote:
        'Crossed the documented 70°F trout-stress threshold. Under "Hoot Owl" rules, fishing closes at 2:00 PM — a regulatory limit the property cannot negotiate.',
    },
    fire: {
      risk: 'Moderate',
      status: 'nominal',
      trend: 'up',
      condition: 'All zones open',
      thresholdNote: 'Drying trend noted, but no access or air-quality threshold reached.',
    },
    interpretation: {
      summary:
        'The property\'s primary activity loses its afternoon. High-country alternatives are unaffected and can absorb it — the supporting environmental system is not constraining the response.',
      affected: [
        { id: 'fishing', label: 'Fishing', status: 'critical', note: 'Closes 2:00 PM' },
        { id: 'trails', label: 'Trails', status: 'optimal', note: 'Unaffected — available to absorb' },
        { id: 'access', label: 'Access', status: 'optimal', note: 'Normal circulation' },
      ],
    },
    response: {
      recommendation: 'Shift afternoon river activities to high-country alternatives.',
      rationale:
        'Guides and equipment can be repositioned before the 2:00 PM closure if the decision is made this morning. The same pivot made at 1:45 PM reads to the guest as a cancellation.',
      actionLabel: 'Activate alternative',
      logistics: [
        { id: 'guides', label: 'Guides', detail: 'Two river guides reassigned to highland routes' },
        { id: 'equipment', label: 'Equipment', detail: 'Rods returned; hiking and mining kit staged at the trailhead' },
        { id: 'transport', label: 'Transport', detail: 'Shuttle re-sequenced for a 1:30 PM highland departure' },
        { id: 'setup', label: 'Setup', detail: 'Sapphire-mine site prepared ahead of guest arrival' },
      ],
    },
    guest: {
      current: 'Full-day fly fishing — afternoon portion no longer available.',
      adapted: 'Morning on the water as booked, then a guided sapphire-mine afternoon in the high country.',
      status: 'Experience preserved',
      statusTone: 'optimal',
    },
    outcome:
      'Closure arrived within the forecast window. The alternative held its booking rate. Both observations tighten the threshold model and confirm the highland set as a reliable substitute.',
  },

  compound: {
    id: 'compound',
    label: 'Heat + smoke',
    shortLabel: 'Heat + smoke',
    premise:
      'The same heat event, with regional wildfire smoke settling into the high country overnight. Both environmental systems are now constraining at once.',
    river: {
      temperature: '72°F',
      flow: 'Falling',
      status: 'critical',
      trend: 'up',
      condition: 'Hoot Owl restriction likely',
      thresholdNote:
        'Still above the 70°F threshold. The afternoon closure applies exactly as it did yesterday — the primary constraint has not changed.',
    },
    fire: {
      risk: 'Elevated',
      status: 'elevated',
      trend: 'up',
      condition: 'High-country access restricted',
      thresholdNote:
        'Air quality in the high country crossed the threshold for sustained outdoor exertion. The exposed ridgeline routes are the ones affected.',
    },
    interpretation: {
      summary:
        'This is the case that proves the systems are not independent. The primary constraint closes the river; the supporting constraint closes the alternative the river pivot depends on. The response has to satisfy both at once — sheltered, low-exertion, and low-elevation.',
      affected: [
        { id: 'fishing', label: 'Fishing', status: 'critical', note: 'Closes 2:00 PM' },
        { id: 'trails', label: 'Trails', status: 'elevated', note: 'High-country routes withdrawn' },
        { id: 'access', label: 'Access', status: 'elevated', note: 'Valley-floor circulation only' },
      ],
    },
    response: {
      recommendation: 'Activate sheltered valley-floor programming; hold high country in reserve.',
      rationale:
        'The usual highland substitute is unavailable, so the response set narrows to sheltered, low-exertion options. This is the decision most worth making early — the remaining alternatives have the least capacity.',
      actionLabel: 'Activate alternative',
      logistics: [
        { id: 'guides', label: 'Guides', detail: 'River and highland guides consolidated onto valley programming' },
        { id: 'equipment', label: 'Equipment', detail: 'Highland kit stood down; interpretive and indoor provision staged' },
        { id: 'transport', label: 'Transport', detail: 'Ridgeline shuttle suspended; short valley circuit only' },
        { id: 'setup', label: 'Setup', detail: 'Saloon and riverside pavilion opened early with filtered air' },
      ],
    },
    guest: {
      current: 'Full-day fly fishing — afternoon unavailable, and the usual alternative is too.',
      adapted:
        'Morning on the water as booked, then a sheltered valley afternoon — interpretive programming and the Silver Dollar Saloon.',
      status: 'Experience preserved',
      statusTone: 'nominal',
    },
    outcome:
      'A compound event was absorbed without a cancellation, but with less margin than a single-constraint day. The observation that matters most: sheltered capacity is the property\'s real ceiling, and it is thinner than the highland set.',
  },
};

export const scenarioOrder: ScenarioId[] = ['normal', 'heat', 'compound'];

/** The five stages of the loop, rendered as a persistent spine on the console. */
export const loopStages = [
  { id: 'conditions', number: '01', label: 'Conditions', question: 'What is happening?' },
  { id: 'interpretation', number: '02', label: 'Interpretation', question: 'What does it mean?' },
  { id: 'response', number: '03', label: 'Response', question: 'What should the team consider?' },
  { id: 'experience', number: '04', label: 'Experience', question: 'How does the stay adapt?' },
];

export const consoleMeta = {
  eyebrow: 'Adaptive Stewardship OS',
  title: 'Stewardship Console',
  /**
   * Never softened. This is the fact/speculation boundary, kept always-visible.
   *
   * Amended Stage 1 (environmental ingestion): the console now also renders a
   * real observation (`CurrentConditionsStrip` in `StewardshipConsole.tsx`,
   * sourced from Open-Meteo via `lib/environmental/`). This line still governs
   * the scenario content below — every reading in `river`/`fire`, every
   * threshold, every response is authored and modeled — but it can no longer
   * claim the whole page is unmeasured. The word split is deliberate:
   * "scenario values" scopes the disclaimer to what it has always covered;
   * "current conditions" names the one new exception, sourced and timestamped
   * in its own strip so the two are never visually or semantically merged.
   */
  disclosure: 'Scenario values are modeled · current conditions are live from a public feed',
  humanNote:
    'The system detects, interprets, and recommends. A person decides. Nothing here operates the property on its own.',
};
