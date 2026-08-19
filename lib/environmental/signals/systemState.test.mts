import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { EnvironmentalObservation } from '../types.ts';
import { assembleSystemState } from './systemState.ts';
import type { LoopRecords } from './loop.ts';
import { LOOP_RECORDS } from '../../../app/projects/rock-creek-os/dashboard/content/decisions.ts';

const NOW = Date.parse('2026-08-19T18:00:00Z');
const HOUR = 3_600_000;

interface Shape { hoursAgo: number; tempF?: number; humidityPct?: number; windMph?: number; precipIn?: number; aqi?: number | null }
function obs({ hoursAgo, tempF = 65, humidityPct = 50, windMph = 5, precipIn = 0.1, aqi = 20 }: Shape): EnvironmentalObservation {
  return {
    observedAt: new Date(NOW - hoursAgo * HOUR).toISOString(),
    fetchedAt: new Date(NOW - hoursAgo * HOUR).toISOString(),
    source: 'open-meteo', locationLabel: 'Rock Creek, Montana',
    air: { temperatureF: tempF, apparentTemperatureF: tempF, humidityPct, pressureHpa: 850 },
    wind: { speedMph: windMph, directionDeg: 270, gustMph: windMph + 5 },
    precipitation: { lastHourIn: precipIn, probabilityPct: 0 },
    sky: { cloudCoverPct: 10, visibilityMi: 40 },
    solar: { sunriseIso: '2026-08-19T12:37:00Z', sunsetIso: '2026-08-20T02:35:00Z' },
    airQuality: aqi === null ? null : { usAqi: aqi, pm25: aqi / 10 },
    forecast: [],
  };
}
const EMPTY_RECORDS: LoopRecords = { decisions: [], actions: [], outcomes: [] };

test('empty history: overall state is indeterminate, no transitions, no data lie', () => {
  const s = assembleSystemState([], null, EMPTY_RECORDS, null, NOW);
  assert.equal(s.overallState, 'indeterminate');
  assert.equal(s.freshness, 'unavailable');
  assert.deepEqual(s.loops.flatMap((l) => l.transitions), []);
  assert.equal(s.observation, null);
});

test('single observation: no transitions — nothing to diff against', () => {
  const single = [obs({ hoursAgo: 0, tempF: 96, humidityPct: 15, aqi: 20 })];
  const s = assembleSystemState(single, single[0]!, EMPTY_RECORDS, null, NOW);
  assert.deepEqual(s.loops.flatMap((l) => l.transitions), []);
});

test('transition detected: normal → watch produces exactly one signal-entered event', () => {
  // 3 observations so the PRIOR evaluation point (the 3h mark) also has the
  // 2 observations RCO-H1 requires behind it — not just the current one does.
  const history = [
    obs({ hoursAgo: 0, tempF: 92, humidityPct: 50, aqi: 20 }), // now: hot enough to trip watch
    obs({ hoursAgo: 3, tempF: 60, humidityPct: 50, aqi: 20 }), // prior cycle: calm
    obs({ hoursAgo: 6, tempF: 60, humidityPct: 50, aqi: 20 }), // gives the prior point its own 2-obs window
  ];
  const s = assembleSystemState(history, history[0]!, EMPTY_RECORDS, null, NOW);
  const h1 = s.loops
    .flatMap((l) => l.transitions)
    .find((t) => t.ruleId === 'RCO-H1');
  assert.ok(h1, 'expected a transition on RCO-H1');
  assert.equal(h1!.from, 'normal');
  assert.notEqual(h1!.to, 'normal');

  const event = s.recentEvents.find((e) => e.kind === 'signal-entered' && e.label.includes('Thermal'));
  assert.ok(event, 'transition must surface as a timeline event');
});

test('clearing transition produces a signal-cleared event', () => {
  // RCO-L2 (12h window, 1 observation minimum) gives a clean clearing case:
  // the smoky reading is 13h old, so it has rolled OUT of the current 12h
  // window but was still the sole reading INSIDE the window at the prior
  // (13h-ago) evaluation point. A 24h-window rule can't demonstrate this as
  // simply, because a single new calm reading doesn't evict an old hot one
  // from a window that's still wide enough to contain both — see the RCO-H1
  // fixture above, which relies on 3 points precisely to avoid that trap.
  const history = [
    obs({ hoursAgo: 0, aqi: 20 }), // now: clean air
    obs({ hoursAgo: 13, aqi: 165 }), // prior cycle: smoky, now outside the 12h window
  ];
  const s = assembleSystemState(history, history[0]!, EMPTY_RECORDS, null, NOW);
  const l2 = s.loops.flatMap((l) => l.transitions).find((t) => t.ruleId === 'RCO-L2');
  assert.ok(l2, 'expected a transition on RCO-L2');
  assert.equal(l2!.to, 'normal');
  assert.notEqual(l2!.from, 'normal');

  const event = s.recentEvents.find((e) => e.kind === 'signal-cleared');
  assert.ok(event, 'a state moving back to normal must be reported as cleared, not silently dropped');
});

test('no false transitions when nothing changed between cycles', () => {
  const history = [
    obs({ hoursAgo: 0, tempF: 61, aqi: 20 }),
    obs({ hoursAgo: 3, tempF: 60, aqi: 20 }),
    obs({ hoursAgo: 6, tempF: 60, aqi: 20 }),
  ];
  const s = assembleSystemState(history, history[0]!, EMPTY_RECORDS, null, NOW);
  assert.deepEqual(
    s.loops.flatMap((l) => l.transitions),
    [],
    'a 1°F wobble that does not cross any rule threshold must not read as a transition',
  );
});

test('overallState is the highest severity across all problems, indeterminate signals do not suppress it', () => {
  // RCO-L1 needs 2 observations to leave `indeterminate` — 1 was not enough.
  const mixed = [
    obs({ hoursAgo: 0, tempF: 96, humidityPct: 14, windMph: 30, aqi: null }),
    obs({ hoursAgo: 3, tempF: 96, humidityPct: 14, windMph: 30, aqi: null }),
  ];
  const s = assembleSystemState(mixed, mixed[0]!, EMPTY_RECORDS, null, NOW);
  assert.notEqual(s.overallState, 'indeterminate', 'RCO-L1 is evaluable even though RCO-L2 (AQI) is not');
  assert.equal(s.hasDataGaps, true, 'RCO-L2 (AQI) is still indeterminate and must be disclosed');
});

test('hasDataGaps is true when any problem carries an indeterminate signal', () => {
  const noAqi = [obs({ hoursAgo: 0, aqi: null }), obs({ hoursAgo: 3, aqi: null })];
  const s = assembleSystemState(noAqi, noAqi[0]!, EMPTY_RECORDS, null, NOW);
  assert.equal(s.hasDataGaps, true);
});

test('hasDataGaps is false when every rule evaluated', () => {
  const full = Array.from({ length: 4 }, (_, i) => obs({ hoursAgo: i * 3, tempF: 60, aqi: 20 }));
  const s = assembleSystemState(full, full[0]!, EMPTY_RECORDS, null, NOW);
  assert.equal(s.hasDataGaps, false);
});

test('timeline merges decisions and outcomes with signal transitions, newest first, capped at 5', () => {
  const s = assembleSystemState(
    [obs({ hoursAgo: 0, tempF: 60, aqi: 20 })],
    obs({ hoursAgo: 0, tempF: 60, aqi: 20 }),
    LOOP_RECORDS,
    null,
    NOW,
  );
  assert.ok(s.recentEvents.length <= 5);
  const times = s.recentEvents.map((e) => Date.parse(e.atIso));
  assert.deepEqual(times, [...times].sort((a, b) => b - a));
  assert.ok(s.recentEvents.some((e) => e.kind === 'decision-recorded'));
});

test('state is pure: identical inputs produce identical output', () => {
  const h = [obs({ hoursAgo: 0, tempF: 88, aqi: 60 }), obs({ hoursAgo: 6, tempF: 70, aqi: 20 })];
  const a = assembleSystemState(h, h[0]!, LOOP_RECORDS, null, NOW);
  const b = assembleSystemState(h, h[0]!, LOOP_RECORDS, null, NOW);
  assert.deepEqual(a, b);
});

test('notionSource passes through untouched', () => {
  const src = { name: 'Rock Creek OS', maturityStage: 'Concepted' };
  const s = assembleSystemState([], null, EMPTY_RECORDS, src, NOW);
  assert.deepEqual(s.notionSource, src);
});
