/**
 * Operational loop tests — Stage 3.
 *
 * The load-bearing assertions are the negative ones: that the engine never
 * fabricates a decision, and that recomputing signals cannot alter a historical
 * record. A loop that quietly rewrote its own history would be worse than no
 * loop at all.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { EnvironmentalObservation } from '../types.ts';
import { evaluateAllSignals, summarizeByProblem } from './engine.ts';
import { assembleLoops, findPrecedent, activeSignals } from './loop.ts';
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
const series = (n: number, s: Omit<Shape, 'hoursAgo'>, stepH = 3) =>
  Array.from({ length: n }, (_, i) => obs({ ...s, hoursAgo: i * stepH }));

const loopsFor = (history: readonly EnvironmentalObservation[], records: LoopRecords = LOOP_RECORDS) =>
  assembleLoops(summarizeByProblem(evaluateAllSignals(history, NOW)), records);

const CALM = series(8, { tempF: 60, humidityPct: 60, windMph: 3, precipIn: 0.2, aqi: 15 });
const HOT_DRY = series(8, { tempF: 96, humidityPct: 18, windMph: 8, precipIn: 0, aqi: 20 });
const SMOKY = series(8, { tempF: 70, humidityPct: 45, windMph: 8, precipIn: 0.1, aqi: 165 });

// ── the full chain ───────────────────────────────────────────────────────────
test('full chain: observation → signal → problem → decision → action → outcome', () => {
  const hydro = loopsFor(HOT_DRY).find((l) => l.problemId === undefined || l.problem.problemId === 'hydrological-flow-vs-guest-programming')!;

  // observation → signal
  const thermal = hydro.problem.signals.find((s) => s.ruleId === 'RCO-H1')!;
  assert.equal(thermal.state, 'critical');
  assert.ok(thermal.provenance, 'signal must carry provenance back to the reading');
  assert.equal(thermal.provenance!.source, 'open-meteo');

  // signal → problem
  assert.equal(hydro.problem.notionTitle, 'Hydrological Flow vs Guest Programming');
  assert.equal(hydro.reviewWarranted, true);

  // problem → decision
  const precedent = hydro.precedent[0]!;
  assert.ok(precedent, 'an active RCO-H1 should surface prior decisions citing it');
  assert.ok(precedent.matchedOnRuleIds.includes('RCO-H1'), 'match reason must be inspectable');

  // decision → action
  assert.ok(precedent.actions.length > 0);
  assert.ok(precedent.actions.every((a) => a.decisionId === precedent.decision.id));

  // action → outcome
  const actionIds = new Set(precedent.actions.map((a) => a.id));
  assert.ok(precedent.outcomes.length > 0);
  assert.ok(precedent.outcomes.every((o) => actionIds.has(o.actionId)));
  assert.ok(precedent.outcomes[0]!.learning.length > 0, 'outcome must close the loop with learning');
});

// ── human-in-the-loop ────────────────────────────────────────────────────────
test('the engine never creates a decision, however severe the conditions', () => {
  const extreme = series(8, { tempF: 105, humidityPct: 8, windMph: 40, precipIn: 0, aqi: 400 });
  const before = LOOP_RECORDS.decisions.length;
  loopsFor(extreme);
  assert.equal(LOOP_RECORDS.decisions.length, before, 'record set must be untouched by evaluation');
});

test('every record is provenance-locked to illustrative-case-study', () => {
  for (const r of [...LOOP_RECORDS.decisions, ...LOOP_RECORDS.actions, ...LOOP_RECORDS.outcomes]) {
    assert.equal(r.provenance, 'illustrative-case-study');
  }
});

test('decisions name a role, never a person, and use the live Notion team vocabulary', () => {
  const teams = new Set([
    'Stewardship & Land Management', 'Ranch Operations', 'Guest Services & Concierge',
    'Activity Guides', 'Transportation & Mobility', 'Facilities & Maintenance', 'Leadership',
  ]);
  for (const d of LOOP_RECORDS.decisions) assert.ok(teams.has(d.decidedByRole), `${d.id}: ${d.decidedByRole}`);
});

// ── signal lifecycle vs record immutability ──────────────────────────────────
test('signal clears: precedent withdraws but the decision record is unchanged', () => {
  const snapshot = structuredClone(LOOP_RECORDS.decisions);

  const hot = loopsFor(HOT_DRY).find((l) => l.problem.problemId === 'hydrological-flow-vs-guest-programming')!;
  assert.ok(hot.precedent.length > 0);

  const calm = loopsFor(CALM).find((l) => l.problem.problemId === 'hydrological-flow-vs-guest-programming')!;
  assert.equal(calm.reviewWarranted, false);
  assert.equal(calm.precedent.length, 0, 'no active rule → no precedent surfaced');

  assert.deepEqual(LOOP_RECORDS.decisions, snapshot, 'records must survive a weather change untouched');
});

test('new signal appears: smoke surfaces the landscape precedent that heat did not', () => {
  const hotLandscape = loopsFor(HOT_DRY).find((l) => l.problem.problemId === 'landscape-stewardship-vs-infrastructure-demand')!;
  const smokyLandscape = loopsFor(SMOKY).find((l) => l.problem.problemId === 'landscape-stewardship-vs-infrastructure-demand')!;

  assert.ok(smokyLandscape.activeRuleIds.includes('RCO-L2'));
  assert.ok(
    smokyLandscape.precedent.some((p) => p.matchedOnRuleIds.includes('RCO-L2')),
    'an active smoke rule must surface the smoke decision',
  );
  assert.ok(smokyLandscape.precedent.length >= hotLandscape.precedent.length);
});

test('historical decisions are not mutated by recomputation', () => {
  const first = structuredClone(loopsFor(HOT_DRY).map((l) => l.precedent.map((p) => p.decision)));
  loopsFor(SMOKY);
  loopsFor(CALM);
  const again = loopsFor(HOT_DRY).map((l) => l.precedent.map((p) => p.decision));
  assert.deepEqual(again, first, 'the same conditions must reproduce identical historical records');
});

// ── problem state vs signal state ────────────────────────────────────────────
test('a problem is never resolved by signals clearing', () => {
  for (const loop of loopsFor(CALM)) {
    assert.equal(loop.problem.persistent, true);
    assert.equal(loop.reviewWarranted, false, 'calm conditions warrant no review');
  }
});

// ── multiple + conflicting ───────────────────────────────────────────────────
test('multiple signals affect the same problem simultaneously', () => {
  const landscape = loopsFor(series(8, { tempF: 96, humidityPct: 15, windMph: 30, precipIn: 0, aqi: 165 }))
    .find((l) => l.problem.problemId === 'landscape-stewardship-vs-infrastructure-demand')!;
  assert.deepEqual([...landscape.activeRuleIds].sort(), ['RCO-L1', 'RCO-L2']);
  assert.equal(landscape.problem.highestState, 'critical');
});

test('conflicting conditions: freeze and fire-weather can be active at once without contradiction', () => {
  // A dry, windy, freezing night — genuinely possible, and the two rules attach
  // to DIFFERENT problems, so neither has to win.
  const conflicted = series(8, { tempF: 20, humidityPct: 18, windMph: 30, precipIn: 0, aqi: 20 });
  const loops = loopsFor(conflicted);
  const landscape = loops.find((l) => l.problem.problemId === 'landscape-stewardship-vs-infrastructure-demand')!;
  const ops = loops.find((l) => l.problem.problemId === 'remote-operations-vs-forbes-service-consistency')!;

  assert.ok(landscape.activeRuleIds.includes('RCO-L1'), 'dry + windy is fire weather even when cold');
  assert.ok(ops.activeRuleIds.includes('RCO-O1'), 'freeze exposure is active on the operations problem');
  assert.notEqual(landscape.problem.problemId, ops.problem.problemId);
});

// ── degraded data ────────────────────────────────────────────────────────────
test('stale data still assembles a loop and still warrants review', () => {
  const stale = [obs({ hoursAgo: 6, tempF: 96, humidityPct: 18, precipIn: 0 }), obs({ hoursAgo: 9, tempF: 96, humidityPct: 18, precipIn: 0 })];
  const hydro = loopsFor(stale).find((l) => l.problem.problemId === 'hydrological-flow-vs-guest-programming')!;
  const thermal = hydro.problem.signals.find((s) => s.ruleId === 'RCO-H1')!;
  assert.equal(thermal.dataQuality, 'stale');
  assert.equal(hydro.reviewWarranted, true, 'staleness is disclosed, not used to suppress review');
});

test('missing data never warrants review and never surfaces precedent', () => {
  const loops = loopsFor([]);
  for (const l of loops) {
    assert.equal(l.reviewWarranted, false, 'indeterminate is not an active signal');
    assert.equal(l.precedent.length, 0);
    assert.equal(l.problem.persistent, true);
  }
});

test('missing AQI does not surface smoke precedent', () => {
  const noAqi = series(8, { aqi: null });
  const landscape = loopsFor(noAqi).find((l) => l.problem.problemId === 'landscape-stewardship-vs-infrastructure-demand')!;
  assert.ok(!landscape.activeRuleIds.includes('RCO-L2'));
  assert.ok(!landscape.precedent.some((p) => p.matchedOnRuleIds.includes('RCO-L2')));
});

// ── precedent matching is deterministic, not inferred ────────────────────────
test('precedent matching is pure rule-id intersection with no hidden scoring', () => {
  const empty: LoopRecords = { decisions: [], actions: [], outcomes: [] };
  assert.deepEqual(findPrecedent('hydrological-flow-vs-guest-programming', ['RCO-H1'], empty), []);

  const matches = findPrecedent('hydrological-flow-vs-guest-programming', ['RCO-H1'], LOOP_RECORDS);
  assert.ok(matches.length > 0);
  for (const m of matches) {
    assert.ok(m.decision.triggeringRuleIds.includes('RCO-H1'));
    assert.equal(m.decision.problemId, 'hydrological-flow-vs-guest-programming');
  }
});

test('precedent is ordered most-recent-first', () => {
  const m = findPrecedent('hydrological-flow-vs-guest-programming', ['RCO-H1', 'RCO-L2'], LOOP_RECORDS);
  const times = m.map((x) => Date.parse(x.decision.decidedAtIso));
  assert.deepEqual(times, [...times].sort((a, b) => b - a));
});

test('activeSignals excludes normal and indeterminate', () => {
  const sigs = evaluateAllSignals(CALM, NOW);
  assert.equal(activeSignals(sigs).length, 0);
  assert.equal(activeSignals(evaluateAllSignals([], NOW)).length, 0);
});
