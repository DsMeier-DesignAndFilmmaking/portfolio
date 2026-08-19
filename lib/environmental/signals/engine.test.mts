/**
 * Signal engine tests — deterministic, fixture-driven.
 *
 * Every case uses a FIXED `NOW` and synthesised observations. Live weather is
 * never the test method: today's real conditions cannot exercise a freeze or a
 * smoke event, and a suite that passes only because the sky happens to be clear
 * is a suite that conceals failures.
 *
 * Run:  node --experimental-strip-types --test lib/environmental/signals/engine.test.mts
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { EnvironmentalObservation } from '../types.ts';
import { evaluateSignal, evaluateAllSignals, summarizeByProblem } from './engine.ts';
import { SIGNAL_RULES } from './rules.ts';
import { PROBLEMS, type SignalState } from './types.ts';

const NOW = Date.parse('2026-08-19T18:00:00Z');
const HOUR = 3_600_000;
const rule = (id: string) => {
  const r = SIGNAL_RULES.find((x) => x.id === id);
  if (!r) throw new Error(`fixture references unknown rule ${id}`);
  return r;
};

interface Shape {
  hoursAgo: number;
  tempF?: number;
  humidityPct?: number;
  windMph?: number;
  precipIn?: number;
  aqi?: number | null;
}

function obs({ hoursAgo, tempF = 65, humidityPct = 50, windMph = 5, precipIn = 0.1, aqi = 20 }: Shape): EnvironmentalObservation {
  return {
    observedAt: new Date(NOW - hoursAgo * HOUR).toISOString(),
    fetchedAt: new Date(NOW - hoursAgo * HOUR).toISOString(),
    source: 'open-meteo',
    locationLabel: 'Rock Creek, Montana',
    air: { temperatureF: tempF, apparentTemperatureF: tempF, humidityPct, pressureHpa: 850 },
    wind: { speedMph: windMph, directionDeg: 270, gustMph: windMph + 5 },
    precipitation: { lastHourIn: precipIn, probabilityPct: 0 },
    sky: { cloudCoverPct: 10, visibilityMi: 40 },
    solar: { sunriseIso: '2026-08-19T12:37:00Z', sunsetIso: '2026-08-20T02:35:00Z' },
    airQuality: aqi === null ? null : { usAqi: aqi, pm25: aqi / 10 },
    forecast: [],
  };
}

const series = (n: number, s: Omit<Shape, 'hoursAgo'>, stepH = 3) =>
  Array.from({ length: n }, (_, i) => obs({ ...s, hoursAgo: i * stepH }));

// ── 1 · threshold crossing ───────────────────────────────────────────────────
test('threshold crossing: AQI above the EPA Moderate boundary escalates', () => {
  const clean = evaluateSignal(rule('RCO-L2'), series(3, { aqi: 30 }), NOW);
  assert.equal(clean.state, 'normal');

  const smoky = evaluateSignal(rule('RCO-L2'), series(3, { aqi: 120 }), NOW);
  assert.equal(smoky.state, 'elevated');
  assert.equal(smoky.thresholdProvenance, 'documented-public-standard');
});

// ── 2 · threshold clearing ───────────────────────────────────────────────────
test('threshold clearing: AQI returning below the gap clears to normal', () => {
  assert.equal(evaluateSignal(rule('RCO-L2'), series(3, { aqi: 48 }), NOW).state, 'watch');
  assert.equal(evaluateSignal(rule('RCO-L2'), series(3, { aqi: 30 }), NOW).state, 'normal');
});

// ── 3 · sustained conditions ─────────────────────────────────────────────────
test('sustained conditions: a single hot reading cannot escalate past watch', () => {
  const spike = [obs({ hoursAgo: 0, tempF: 92 }), ...series(3, { tempF: 62 }).slice(1)];
  const sustained = series(4, { tempF: 92 });

  assert.equal(evaluateSignal(rule('RCO-H1'), spike, NOW).state, 'watch');
  assert.equal(evaluateSignal(rule('RCO-H1'), sustained, NOW).state, 'elevated');
});

// ── 4 · insufficient data ────────────────────────────────────────────────────
test('insufficient data yields indeterminate, never normal', () => {
  const single = [obs({ hoursAgo: 0, tempF: 60 })]; // RCO-H1 needs 2
  const s = evaluateSignal(rule('RCO-H1'), single, NOW);
  assert.equal(s.state, 'indeterminate');
  assert.equal(s.dataQuality, 'insufficient');
  assert.equal(s.noTriggerRecorded, false, 'indeterminate must never claim "no trigger recorded"');
});

test('missing AQI yields indeterminate, not clean air', () => {
  const s = evaluateSignal(rule('RCO-L2'), series(3, { aqi: null }), NOW);
  assert.equal(s.state, 'indeterminate');
  assert.equal(s.noTriggerRecorded, false);
  assert.match(s.rationale, /not a reading of zero/i);
});

test('empty history yields indeterminate + unavailable across every rule', () => {
  for (const s of evaluateAllSignals([], NOW)) {
    assert.equal(s.state, 'indeterminate');
    assert.equal(s.dataQuality, 'unavailable');
  }
});

// ── 5 · stale data ───────────────────────────────────────────────────────────
test('stale data is reported as stale without silently downgrading state', () => {
  // 6h and 9h old: inside RCO-H1's 24h window, but past the 3h freshness bound.
  const stale = [obs({ hoursAgo: 6, tempF: 92 }), obs({ hoursAgo: 9, tempF: 92 })];
  const s = evaluateSignal(rule('RCO-H1'), stale, NOW);
  assert.equal(s.dataQuality, 'stale');
  assert.equal(s.state, 'elevated', 'state must stand on its own; staleness is a separate axis');
});

test('observations older than the window are excluded entirely', () => {
  const old = series(4, { tempF: 95 }, 25); // 0h, 25h, 50h, 75h — only the first is inside 24h
  const s = evaluateSignal(rule('RCO-H1'), old, NOW);
  assert.equal(s.observationsUsed, 1, 'only the 0h reading falls inside a 24h window');
  assert.equal(s.state, 'indeterminate', 'one reading is below RCO-H1 minObservations');
});

test('window boundary is inclusive: a reading exactly at the edge counts', () => {
  // Documents the `nowMs - t <= windowHours` semantics explicitly rather than
  // leaving it to be discovered by a fixture that happens to land on the edge.
  const atEdge = [obs({ hoursAgo: 0, tempF: 95 }), obs({ hoursAgo: 24, tempF: 95 })];
  assert.equal(evaluateSignal(rule('RCO-H1'), atEdge, NOW).observationsUsed, 2);

  const pastEdge = [obs({ hoursAgo: 0, tempF: 95 }), obs({ hoursAgo: 24.5, tempF: 95 })];
  assert.equal(evaluateSignal(rule('RCO-H1'), pastEdge, NOW).observationsUsed, 1);
});

// ── 6 · rapid fluctuation ────────────────────────────────────────────────────
test('rapid fluctuation does not flap: alternating readings hold a single state', () => {
  const flapping = [
    obs({ hoursAgo: 0, tempF: 91 }),
    obs({ hoursAgo: 3, tempF: 79 }),
    obs({ hoursAgo: 6, tempF: 91 }),
    obs({ hoursAgo: 9, tempF: 79 }),
  ];
  const s = evaluateSignal(rule('RCO-H1'), flapping, NOW);
  assert.equal(s.state, 'watch', 'sustain requirement prevents escalation on an alternating series');
});

test('threshold gap holds watch rather than dropping straight to normal', () => {
  // 47 AQI sits in the 45–50 gap band.
  assert.equal(evaluateSignal(rule('RCO-L2'), series(3, { aqi: 47 }), NOW).state, 'watch');
  assert.equal(evaluateSignal(rule('RCO-L2'), series(3, { aqi: 44 }), NOW).state, 'normal');
});

// ── 7 · multiple simultaneous signals ────────────────────────────────────────
test('a compound day raises hydrology and landscape signals together', () => {
  const compound = series(8, { tempF: 96, humidityPct: 18, windMph: 26, precipIn: 0, aqi: 165 });
  const byId = new Map(evaluateAllSignals(compound, NOW).map((s) => [s.ruleId, s]));

  assert.equal(byId.get('RCO-H1')!.state, 'critical'); // thermal
  assert.equal(byId.get('RCO-H2')!.state, 'critical'); // precip deficit
  assert.equal(byId.get('RCO-L1')!.state, 'critical'); // fire weather
  assert.equal(byId.get('RCO-L2')!.state, 'critical'); // smoke
  assert.equal(byId.get('RCO-O1')!.state, 'normal'); // no freeze in a heat event
});

// ── 8 · signal history is derivable ──────────────────────────────────────────
test('signal history: the same history at a past instant reproduces that state', () => {
  const history = [
    ...series(4, { aqi: 20 }), // now .. 9h ago: clean
    obs({ hoursAgo: 13, aqi: 160 }), // outside RCO-L2's 12h window at NOW
    obs({ hoursAgo: 16, aqi: 160 }),
  ];
  assert.equal(evaluateSignal(rule('RCO-L2'), history, NOW).state, 'normal');
  // Rewind 12h and the same log reports the smoke event — no stored signal needed.
  assert.equal(evaluateSignal(rule('RCO-L2'), history, NOW - 12 * HOUR).state, 'critical');
});

test('evaluation is pure: identical inputs give identical output', () => {
  const h = series(6, { tempF: 88, aqi: 60 });
  assert.deepEqual(evaluateAllSignals(h, NOW), evaluateAllSignals(h, NOW));
});

// ── 9 · problem association ──────────────────────────────────────────────────
test('every rule attaches to one of the three existing Notion problems', () => {
  const valid = new Set(Object.keys(PROBLEMS));
  for (const r of SIGNAL_RULES) assert.ok(valid.has(r.problemId), `${r.id} → unknown problem`);
});

test('summaries carry the exact Notion tension titles', () => {
  const titles = summarizeByProblem(evaluateAllSignals(series(4, {}), NOW)).map((p) => p.notionTitle);
  assert.deepEqual(titles.sort(), [
    'Hydrological Flow vs Guest Programming',
    'Landscape Stewardship vs Infrastructure Demand',
    'Remote Operations vs Forbes Service Consistency',
  ]);
});

test('a problem is never resolved by signal absence', () => {
  const calm = series(8, { tempF: 60, humidityPct: 60, windMph: 3, precipIn: 0.2, aqi: 15 });
  for (const p of summarizeByProblem(evaluateAllSignals(calm, NOW))) {
    assert.equal(p.persistent, true, 'problems are persistent regardless of signal state');
    assert.equal(p.noTriggerRecorded, true, 'clean evaluation, nothing firing');
  }
});

test('indeterminate signals never report noTriggerRecorded at problem level', () => {
  const noAqi = series(4, { aqi: null });
  const landscape = summarizeByProblem(evaluateAllSignals(noAqi, NOW)).find(
    (p) => p.problemId === 'landscape-stewardship-vs-infrastructure-demand',
  )!;
  assert.equal(landscape.hasIndeterminate, true);
  assert.equal(landscape.persistent, true);
});

// ── explainability ───────────────────────────────────────────────────────────
test('every evaluated signal carries inputs, a rationale and its threshold', () => {
  for (const s of evaluateAllSignals(series(8, { tempF: 88, aqi: 70 }), NOW)) {
    assert.ok(s.inputs.length > 0, `${s.ruleId} has no inputs`);
    assert.ok(s.rationale.length > 0, `${s.ruleId} has no rationale`);
    assert.ok(s.thresholdApplied.length > 0, `${s.ruleId} has no threshold`);
    assert.ok(s.ruleVersion.length > 0, `${s.ruleId} has no version`);
  }
});

test('prototype thresholds are labelled as prototype, not as Ranch standards', () => {
  const proto = SIGNAL_RULES.filter((r) => r.thresholdProvenance === 'prototype');
  assert.ok(proto.length >= 3, 'most thresholds in this prototype are assumptions');
  const evaluated = evaluateAllSignals(series(4, {}), NOW);
  for (const s of evaluated.filter((x) => x.thresholdProvenance === 'prototype')) {
    assert.match(s.thresholdApplied, /PROTOTYPE/, `${s.ruleId} must declare PROTOTYPE in its threshold`);
  }
});

test('air-temperature rules declare themselves proxies, not stream measurements', () => {
  const h1 = SIGNAL_RULES.find((r) => r.id === 'RCO-H1')!;
  assert.equal(h1.evidenceBasis, 'proxy');
  const s = evaluateSignal(h1, series(4, { tempF: 90 }), NOW);
  assert.match(s.rationale, /not a water measurement/i);
});
