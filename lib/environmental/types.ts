/**
 * Environmental Observation — normalized domain model.
 *
 * This is the ONLY environmental shape the dashboard is allowed to know
 * about. No provider-specific field name, unit, or structure crosses this
 * boundary — that is the entire point of the adapter layer (see
 * `open-meteo-adapter.ts`). Swapping providers later means writing a new
 * adapter that returns this same type; nothing downstream changes.
 *
 * Field selection is deliberate, not exhaustive — see
 * docs/strategy/rock-creek-environmental-data-architecture.md §3 for the
 * per-field justification against the three Rock Creek problems (hydrology,
 * fire/air, logistics). Do not add a field "because the API provides it."
 *
 * `airQuality` is nullable: the feed can be legitimately unavailable, and a
 * missing measurement must never be presented as a zero reading.
 */
export interface EnvironmentalObservation {
  readonly observedAt: string; // ISO-8601, from the provider
  readonly fetchedAt: string; // ISO-8601, when the ingestion job called the API
  readonly source: 'open-meteo';
  readonly locationLabel: string; // e.g. "Rock Creek, Montana" — never coordinates

  readonly air: {
    readonly temperatureF: number;
    readonly apparentTemperatureF: number;
    readonly humidityPct: number;
    readonly pressureHpa: number;
  };
  readonly wind: {
    readonly speedMph: number;
    readonly directionDeg: number;
    readonly gustMph: number | null;
  };
  readonly precipitation: {
    readonly lastHourIn: number;
    readonly probabilityPct: number | null;
  };
  readonly sky: {
    readonly cloudCoverPct: number;
    readonly visibilityMi: number | null;
  };
  readonly solar: {
    readonly sunriseIso: string;
    readonly sunsetIso: string;
  };
  /** null = the air-quality feed did not return a value for this fetch. */
  readonly airQuality: { readonly usAqi: number; readonly pm25: number } | null;
  /** 3-day outlook, not the provider's full 16-day forecast. */
  readonly forecast: ReadonlyArray<{
    readonly dateIso: string;
    readonly highF: number;
    readonly lowF: number;
    readonly precipProbabilityPct: number;
  }>;
}

/**
 * Freshness is derived from `observedAt`, never from build time or "now" in
 * the browser — this file has no notion of "now" itself, callers pass it in,
 * which keeps the function pure and testable.
 *
 * Thresholds: docs/strategy/rock-creek-environmental-data-architecture.md §6.
 */
export type ObservationFreshness = 'fresh' | 'stale' | 'very-stale' | 'unavailable';

export function getObservationFreshness(
  observation: EnvironmentalObservation | null,
  nowMs: number = Date.now(),
): ObservationFreshness {
  if (!observation) return 'unavailable';
  const ageMs = nowMs - new Date(observation.observedAt).getTime();
  if (!Number.isFinite(ageMs) || ageMs < 0) return 'unavailable';
  const ageHours = ageMs / (1000 * 60 * 60);
  if (ageHours < 3) return 'fresh';
  if (ageHours < 12) return 'stale';
  return 'very-stale';
}
