/**
 * Open-Meteo provider adapter.
 *
 * THIS IS THE ONLY FILE IN THE REPOSITORY ALLOWED TO KNOW OPEN-METEO'S
 * RESPONSE SHAPE. Its job is to fetch two keyless public endpoints (forecast
 * + air quality) and return an `EnvironmentalObservation` — nothing else
 * crosses this boundary. Swapping providers later means writing a sibling
 * adapter with this same return type; the dashboard never changes.
 *
 * No API key: neither endpoint requires one. There is nothing to leak.
 *
 * Field selection matches the domain model exactly — see
 * docs/strategy/rock-creek-environmental-data-architecture.md §3 for why
 * each retained field serves one of the three Rock Creek problems, and
 * which available fields (UV index, dew point, snow depth, 16-day forecast,
 * …) were deliberately left out.
 */

import { ROCK_CREEK_LOCATION } from '../../data/rockCreekLocation.ts';
import type { EnvironmentalObservation } from './types.ts';

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const AIR_QUALITY_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';
const FORECAST_DAYS = 3;
const FETCH_TIMEOUT_MS = 10_000;

const CURRENT_PARAMS = [
  'temperature_2m',
  'apparent_temperature',
  'relative_humidity_2m',
  'surface_pressure',
  'wind_speed_10m',
  'wind_direction_10m',
  'wind_gusts_10m',
  'precipitation',
  'precipitation_probability',
  'cloud_cover',
  'visibility',
].join(',');

const DAILY_PARAMS = [
  'sunrise',
  'sunset',
  'temperature_2m_max',
  'temperature_2m_min',
  'precipitation_probability_max',
].join(',');

interface OpenMeteoForecastResponse {
  utc_offset_seconds: number;
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    surface_pressure: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
    precipitation: number;
    precipitation_probability: number;
    cloud_cover: number;
    visibility: number; // feet, per current_units when temperature_unit=fahrenheit
  };
  daily: {
    time: string[];
    sunrise: string[];
    sunset: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
}

interface OpenMeteoAirQualityResponse {
  current: {
    time: string;
    us_aqi: number | null;
    pm2_5: number | null;
  };
}

/** Named, remediation-carrying failure — never a silent `[]`/`null` fallback. */
export class EnvironmentalIngestionError extends Error {
  readonly remediation: string;
  readonly cause?: unknown;

  constructor(message: string, remediation: string, cause?: unknown) {
    super(message);
    this.name = 'EnvironmentalIngestionError';
    this.remediation = remediation;
    this.cause = cause;
  }
}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Open-Meteo returns local time as "2026-08-19T12:15" with NO UTC offset
 * suffix, even though `timezone=` was requested — it is implicitly in that
 * timezone. This turns it into a real, unambiguous ISO-8601 instant using
 * the `utc_offset_seconds` the same response carries. Without this, every
 * downstream freshness calculation (`getObservationFreshness`) would silently
 * assume UTC and misjudge staleness by up to the offset itself.
 */
function toIsoWithOffset(localTime: string, utcOffsetSeconds: number): string {
  const sign = utcOffsetSeconds >= 0 ? '+' : '-';
  const abs = Math.abs(utcOffsetSeconds);
  const hh = String(Math.floor(abs / 3600)).padStart(2, '0');
  const mm = String(Math.floor((abs % 3600) / 60)).padStart(2, '0');
  return `${localTime}:00${sign}${hh}:${mm}`;
}

const FEET_PER_MILE = 5280;

export async function fetchOpenMeteoObservation(
  fetchedAt: string = new Date().toISOString(),
): Promise<EnvironmentalObservation> {
  const { latitude, longitude, timezone, label } = ROCK_CREEK_LOCATION;

  const forecastUrl =
    `${FORECAST_URL}?latitude=${latitude}&longitude=${longitude}` +
    `&current=${CURRENT_PARAMS}&daily=${DAILY_PARAMS}` +
    `&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch` +
    `&timezone=${encodeURIComponent(timezone)}&forecast_days=${FORECAST_DAYS}`;
  const aqUrl =
    `${AIR_QUALITY_URL}?latitude=${latitude}&longitude=${longitude}` +
    `&current=us_aqi,pm2_5&timezone=${encodeURIComponent(timezone)}`;

  let forecastRes: Response;
  try {
    forecastRes = await fetchWithTimeout(forecastUrl);
  } catch (err) {
    throw new EnvironmentalIngestionError(
      'Open-Meteo forecast request failed or timed out.',
      'Check network connectivity from the runner; retry. No commit should follow this failure.',
      err,
    );
  }
  if (!forecastRes.ok) {
    throw new EnvironmentalIngestionError(
      `Open-Meteo forecast endpoint returned HTTP ${forecastRes.status}.`,
      forecastRes.status === 429
        ? 'Rate limited — back off and retry on the next scheduled run.'
        : 'Inspect the response body; the request shape may be malformed.',
    );
  }
  const forecast = (await forecastRes.json()) as OpenMeteoForecastResponse;
  if (!forecast?.current || !forecast?.daily) {
    throw new EnvironmentalIngestionError(
      'Open-Meteo forecast response is missing required `current` or `daily` blocks.',
      'Do not synthesize the missing fields. Treat as malformed — no commit.',
    );
  }

  // Air quality is best-effort: its absence produces `airQuality: null`,
  // never a fabricated reading, never a failed ingestion.
  let airQuality: EnvironmentalObservation['airQuality'] = null;
  try {
    const aqRes = await fetchWithTimeout(aqUrl);
    if (aqRes.ok) {
      const aq = (await aqRes.json()) as OpenMeteoAirQualityResponse;
      if (typeof aq?.current?.us_aqi === 'number' && typeof aq?.current?.pm2_5 === 'number') {
        airQuality = { usAqi: aq.current.us_aqi, pm25: aq.current.pm2_5 };
      }
    }
  } catch {
    // Swallowed deliberately — air quality is supplementary, not required.
    airQuality = null;
  }

  const c = forecast.current;
  const d = forecast.daily;
  const offset = forecast.utc_offset_seconds;

  return {
    observedAt: toIsoWithOffset(c.time, offset),
    fetchedAt,
    source: 'open-meteo',
    locationLabel: label,
    air: {
      temperatureF: c.temperature_2m,
      apparentTemperatureF: c.apparent_temperature,
      humidityPct: c.relative_humidity_2m,
      pressureHpa: c.surface_pressure,
    },
    wind: {
      speedMph: c.wind_speed_10m,
      directionDeg: c.wind_direction_10m,
      gustMph: c.wind_gusts_10m ?? null,
    },
    precipitation: {
      lastHourIn: c.precipitation,
      probabilityPct: c.precipitation_probability ?? null,
    },
    sky: {
      cloudCoverPct: c.cloud_cover,
      visibilityMi: typeof c.visibility === 'number' ? c.visibility / FEET_PER_MILE : null,
    },
    solar: {
      sunriseIso: toIsoWithOffset(d.sunrise[0]!, offset),
      sunsetIso: toIsoWithOffset(d.sunset[0]!, offset),
    },
    airQuality,
    forecast: d.time.map((dateIso, i) => ({
      dateIso,
      highF: d.temperature_2m_max[i]!,
      lowF: d.temperature_2m_min[i]!,
      precipProbabilityPct: d.precipitation_probability_max[i]!,
    })),
  };
}
