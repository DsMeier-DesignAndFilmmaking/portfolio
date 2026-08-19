/**
 * Signal rules — deterministic, explainable, inspectable, configurable, reversible.
 *
 * ─── THRESHOLD PROVENANCE — READ THIS BEFORE CHANGING A NUMBER ──────────────
 * Almost every number in this file is a CASE-STUDY PROTOTYPE THRESHOLD. It is
 * a value chosen to make a mechanism legible in a portfolio prototype. It is
 * NOT a Ranch at Rock Creek operational standard, and no number here was
 * supplied by the property.
 *
 * The single exception is RCO-L2, whose breakpoints are the published US EPA
 * Air Quality Index categories — a public standard, not an invention. That is
 * why it alone carries `documented-public-standard`.
 *
 * ─── PROXY HONESTY ──────────────────────────────────────────────────────────
 * Air temperature is NOT water temperature. The foundation doc's documented
 * 70°F trout-stress threshold is a WATER reading; this engine has no water
 * sensor. RCO-H1 therefore reports "thermal stress conditions" (an air-side
 * proxy) and is marked `proxy`. It must never be rendered as a stream reading.
 *
 * ─── ANTI-FLAPPING (brief §10) ──────────────────────────────────────────────
 * Two mechanisms, both stateless so signals stay derivable from history alone:
 *   1. SUSTAIN — a condition must hold across N consecutive observations to
 *      escalate. A single spike cannot move a signal.
 *   2. THRESHOLD GAP — the value that clears a state is separated from the
 *      value that triggers it, so hovering at the boundary cannot oscillate.
 */

import type { EnvironmentalObservation } from '../types.ts';
import type { RuleContext, RuleResult, SignalRule, SignalState } from './types.ts';

// ── window helpers ───────────────────────────────────────────────────────────
const maxTemp = (w: readonly EnvironmentalObservation[]) => Math.max(...w.map((o) => o.air.temperatureF));
const minTemp = (w: readonly EnvironmentalObservation[]) => Math.min(...w.map((o) => o.air.temperatureF));
const meanHumidity = (w: readonly EnvironmentalObservation[]) =>
  w.reduce((s, o) => s + o.air.humidityPct, 0) / w.length;
const maxWind = (w: readonly EnvironmentalObservation[]) => Math.max(...w.map((o) => o.wind.speedMph));
const totalPrecip = (w: readonly EnvironmentalObservation[]) =>
  w.reduce((s, o) => s + o.precipitation.lastHourIn, 0);
const fmt = (n: number, d = 0) => n.toFixed(d);

/**
 * Count how many of the most recent consecutive observations satisfy `test`.
 * Window is newest-first, so this counts a run backwards from now.
 */
function sustainedCount(
  w: readonly EnvironmentalObservation[],
  test: (o: EnvironmentalObservation) => boolean,
): number {
  let n = 0;
  for (const o of w) {
    if (!test(o)) break;
    n += 1;
  }
  return n;
}

// ── RCO-H1 · Thermal Stress Conditions ───────────────────────────────────────
const thermalStress: SignalRule = {
  id: 'RCO-H1',
  version: '1.0.0',
  name: 'Thermal Stress Conditions',
  problemId: 'hydrological-flow-vs-guest-programming',
  evidenceBasis: 'proxy',
  thresholdProvenance: 'prototype',
  windowHours: 24,
  minObservations: 2,
  evaluate({ window }): RuleResult {
    const hi = maxTemp(window);
    const sustained85 = sustainedCount(window, (o) => o.air.temperatureF >= 85);
    const sustained90 = sustainedCount(window, (o) => o.air.temperatureF >= 90);

    let state: SignalState = 'normal';
    if (hi >= 95 && sustained90 >= 2) state = 'critical';
    else if (hi >= 90 && sustained85 >= 2) state = 'elevated';
    else if (hi >= 85) state = 'watch';
    // THRESHOLD GAP: clearing needs < 80°F, not < 85°F.
    else if (hi >= 80) state = 'watch';

    return {
      state,
      inputs: [
        { label: 'Peak air temperature', value: `${fmt(hi, 1)}°F` },
        { label: 'Consecutive readings ≥ 85°F', value: String(sustained85) },
        { label: 'Window', value: `${window.length} observations` },
      ],
      rationale:
        'Air temperature is an upstream proxy for stream warming. It is not a water measurement, ' +
        'and no stream sensor exists in this system.',
      thresholdApplied:
        'watch ≥ 80°F · elevated ≥ 90°F sustained 2 · critical ≥ 95°F sustained 2 (PROTOTYPE)',
    };
  },
};

// ── RCO-H2 · Precipitation Deficit ───────────────────────────────────────────
const precipitationDeficit: SignalRule = {
  id: 'RCO-H2',
  version: '1.0.0',
  name: 'Precipitation Deficit',
  problemId: 'hydrological-flow-vs-guest-programming',
  evidenceBasis: 'proxy',
  thresholdProvenance: 'prototype',
  windowHours: 72,
  minObservations: 4,
  evaluate({ window }): RuleResult {
    const precip = totalPrecip(window);
    const rh = meanHumidity(window);

    let state: SignalState = 'normal';
    if (precip <= 0.001 && rh < 25) state = 'critical';
    else if (precip < 0.02 && rh < 35) state = 'elevated';
    else if (precip < 0.05) state = 'watch';

    return {
      state,
      inputs: [
        { label: 'Cumulative precipitation', value: `${fmt(precip, 2)}″` },
        { label: 'Mean relative humidity', value: `${fmt(rh)}%` },
        { label: 'Window', value: `${window.length} observations` },
      ],
      rationale:
        'Sustained absence of precipitation combined with low humidity is an upstream proxy for ' +
        'declining flow. Flow itself is not measured by this system.',
      thresholdApplied:
        'watch < 0.05″/72h · elevated < 0.02″ & RH < 35% · critical 0.00″ & RH < 25% (PROTOTYPE)',
    };
  },
};

// ── RCO-L1 · Fire Weather Conditions ─────────────────────────────────────────
const fireWeather: SignalRule = {
  id: 'RCO-L1',
  version: '1.0.0',
  name: 'Fire Weather Conditions',
  problemId: 'landscape-stewardship-vs-infrastructure-demand',
  evidenceBasis: 'composite-proxy',
  thresholdProvenance: 'prototype',
  windowHours: 12,
  minObservations: 2,
  evaluate({ window }): RuleResult {
    const rh = meanHumidity(window);
    const wind = maxWind(window);
    const temp = maxTemp(window);

    let state: SignalState = 'normal';
    if (rh <= 20 && wind >= 25 && temp >= 85) state = 'critical';
    else if (rh <= 25 && wind >= 20) state = 'elevated';
    else if (rh <= 30 || wind >= 20) state = 'watch';

    return {
      state,
      inputs: [
        { label: 'Mean relative humidity', value: `${fmt(rh)}%` },
        { label: 'Peak wind', value: `${fmt(wind)} mph` },
        { label: 'Peak air temperature', value: `${fmt(temp, 1)}°F` },
      ],
      rationale:
        'Composite of the three factors conventionally used in fire-weather assessment — low humidity, ' +
        'wind, and heat. This is not an official fire-danger rating and carries no agency authority.',
      thresholdApplied:
        'watch RH ≤ 30% or wind ≥ 20mph · elevated RH ≤ 25% & wind ≥ 20mph · ' +
        'critical RH ≤ 20% & wind ≥ 25mph & ≥ 85°F (PROTOTYPE)',
    };
  },
};

// ── RCO-L2 · Smoke / Air Quality ─────────────────────────────────────────────
// The only rule built on a published public standard rather than a prototype
// assumption, and the only DIRECT measurement in the set. It is also the rule
// that could eventually give the `Wildfire Smoke Ingress` shock a defensible
// triggering signal — see the standing rule in the Notion workspace notes.
const smokeAirQuality: SignalRule = {
  id: 'RCO-L2',
  version: '1.0.0',
  name: 'Smoke / Air Quality',
  problemId: 'landscape-stewardship-vs-infrastructure-demand',
  evidenceBasis: 'direct-measurement',
  thresholdProvenance: 'documented-public-standard',
  windowHours: 12,
  minObservations: 1,
  evaluate({ window }): RuleResult {
    const readings = window.map((o) => o.airQuality).filter((a): a is NonNullable<typeof a> => a !== null);

    // Missing AQI must NOT read as clean air (brief §6).
    if (readings.length === 0) {
      return {
        state: 'indeterminate',
        inputs: [{ label: 'US AQI', value: 'not reported by the feed' }],
        rationale:
          'The air-quality feed returned no value for this window. Absence of a reading is not a ' +
          'reading of zero, so no state is asserted.',
        thresholdApplied: 'US EPA AQI categories (DOCUMENTED PUBLIC STANDARD)',
      };
    }

    const aqi = Math.max(...readings.map((r) => r.usAqi));
    const pm25 = Math.max(...readings.map((r) => r.pm25));

    let state: SignalState = 'normal';
    if (aqi > 150) state = 'critical';
    else if (aqi > 100) state = 'elevated';
    else if (aqi > 50) state = 'watch';
    // THRESHOLD GAP: 45–50 holds `watch` rather than dropping straight to normal.
    else if (aqi > 45) state = 'watch';

    return {
      state,
      inputs: [
        { label: 'Peak US AQI', value: String(Math.round(aqi)) },
        { label: 'Peak PM2.5', value: `${fmt(pm25, 1)} µg/m³` },
        { label: 'Readings available', value: `${readings.length} of ${window.length}` },
      ],
      rationale:
        'Directly measured particulate air quality. EPA category boundaries mark where guidance for ' +
        'sustained outdoor exertion changes.',
      thresholdApplied:
        'watch AQI > 45 (Moderate) · elevated > 100 (Unhealthy for Sensitive Groups) · ' +
        'critical > 150 (Unhealthy) — US EPA categories (DOCUMENTED PUBLIC STANDARD)',
    };
  },
};

// ── RCO-O1 · Freeze Exposure ─────────────────────────────────────────────────
const freezeExposure: SignalRule = {
  id: 'RCO-O1',
  version: '1.0.0',
  name: 'Freeze Exposure',
  problemId: 'remote-operations-vs-forbes-service-consistency',
  evidenceBasis: 'direct-measurement',
  thresholdProvenance: 'prototype',
  windowHours: 24,
  minObservations: 2,
  evaluate({ window }): RuleResult {
    const lo = minTemp(window);

    let state: SignalState = 'normal';
    if (lo <= 15) state = 'critical';
    else if (lo <= 25) state = 'elevated';
    else if (lo <= 32) state = 'watch';
    // THRESHOLD GAP: clearing needs > 35°F.
    else if (lo <= 35) state = 'watch';

    return {
      state,
      inputs: [
        { label: 'Minimum air temperature', value: `${fmt(lo, 1)}°F` },
        { label: 'Window', value: `${window.length} observations` },
      ],
      rationale:
        'Freezing conditions bear on utility continuity and access reliability at a remote property — ' +
        'the operational side of service consistency.',
      thresholdApplied: 'watch ≤ 35°F · elevated ≤ 25°F · critical ≤ 15°F (PROTOTYPE)',
    };
  },
};

/** Registry. Adding a rule here is the only way to add a signal. */
export const SIGNAL_RULES: readonly SignalRule[] = [
  thermalStress,
  precipitationDeficit,
  fireWeather,
  smokeAirQuality,
  freezeExposure,
];
