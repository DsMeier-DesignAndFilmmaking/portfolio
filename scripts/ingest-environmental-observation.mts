// Environmental observation ingestion — Stage 1 (weather/environmental only).
//
// Fetches one normalized `EnvironmentalObservation` from Open-Meteo and
// writes it to `data/environmental/`. Designed to run on a schedule via
// GitHub Actions (see .github/workflows/environmental-ingest.yml), which
// commits the result — the push then triggers a Vercel deploy that bakes
// the observation into the next build. `output: 'export'` has no runtime,
// so this file-plus-commit path IS the update mechanism, not a workaround.
//
// FAILURE CONTRACT: on any error this script logs and exits non-zero WITHOUT
// touching either output file. No partial write, no fabricated fallback.
// A workflow step checks the exit code before committing — see the workflow
// file. This mirrors Phase 7 of
// docs/strategy/rock-creek-environmental-data-architecture.md exactly.
//
// Run manually:
//   node --experimental-strip-types --env-file=.env.local scripts/ingest-environmental-observation.mts
// (No env vars are actually required — Open-Meteo needs no key — but
// --env-file is harmless and kept for consistency with the Notion scripts.)

import { mkdir, readFile, writeFile, appendFile } from 'node:fs/promises';
import path from 'node:path';
import {
  fetchOpenMeteoObservation,
  EnvironmentalIngestionError,
} from '../lib/environmental/open-meteo-adapter.ts';

const OUT_DIR = path.join(process.cwd(), 'data', 'environmental');
const CURRENT_PATH = path.join(OUT_DIR, 'current.json');
const HISTORY_PATH = path.join(OUT_DIR, 'history.ndjson');

async function main() {
  console.log('Fetching Open-Meteo observation for Rock Creek…');

  const observation = await fetchOpenMeteoObservation(); // throws on any failure — no fallback

  // Sanity check before writing anything: this is a code-level assertion,
  // not a network failure, and should fail loudly if it's ever wrong.
  const requiredNumeric = [
    observation.air.temperatureF,
    observation.air.humidityPct,
    observation.wind.speedMph,
    observation.precipitation.lastHourIn,
  ];
  if (requiredNumeric.some((v) => typeof v !== 'number' || Number.isNaN(v))) {
    throw new EnvironmentalIngestionError(
      'Adapter returned a required field as non-numeric or NaN.',
      'This indicates a bug in open-meteo-adapter.ts, not a provider outage. Do not commit.',
    );
  }

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(CURRENT_PATH, JSON.stringify(observation, null, 2) + '\n', 'utf8');
  await appendFile(HISTORY_PATH, JSON.stringify(observation) + '\n', 'utf8');

  console.log(`OK — observed ${observation.observedAt}, fetched ${observation.fetchedAt}`);
  console.log(
    `  ${observation.air.temperatureF}°F (feels ${observation.air.apparentTemperatureF}°F) · ` +
      `wind ${observation.wind.speedMph} mph · precip ${observation.precipitation.lastHourIn}" · ` +
      `humidity ${observation.air.humidityPct}%` +
      (observation.airQuality ? ` · AQI ${observation.airQuality.usAqi}` : ' · AQI unavailable'),
  );

  // Prove the file is at least well-formed JSON before declaring success —
  // guards against a future edit to the write path introducing corruption
  // that would otherwise only surface at the next `next build`.
  JSON.parse(await readFile(CURRENT_PATH, 'utf8'));
}

main().catch((err) => {
  if (err instanceof EnvironmentalIngestionError) {
    console.error(`INGESTION FAILED: ${err.message}`);
    console.error(`  Remediation: ${err.remediation}`);
    if (err.cause) console.error(`  Cause: ${String(err.cause)}`);
  } else {
    console.error('INGESTION FAILED (unexpected error):', err);
  }
  console.error('No file was written or modified.');
  process.exit(1);
});
