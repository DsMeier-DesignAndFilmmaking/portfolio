# Environmental Data Ingestion — Architecture Proposal

**Stage:** 1 — real environmental observations. Proposal only; nothing implemented.
**Date:** 2026-08-19
**Scope:** weather/environmental observations only. No automated status changes, decisions, or actions.

---

## 0 — Three premise corrections

Each of these changes the architecture, so they come before the proposal.

### 0.1 The dashboard is **not** syncing with Rock Creek OS data

The brief states *"the existing dashboard appears to be syncing correctly with the underlying Rock Creek OS data."* It is not.

| What the dashboard reads | Source |
|---|---|
| **All scenario data** — readings, thresholds, interpretation, response, guest experience | `dashboard/content/scenarios.ts`, **277 lines of local TypeScript** |
| `notionSource` badge — 2 strings | Notion `Projects & Concepts`, via `getProjects()` |

The only Notion connection is the two-field connection proof added earlier (`Notion source · Rock Creek OS · Concepted`). `StewardshipConsole.tsx` imports **no** Notion module. This matters because weather cannot "join" a Notion sync that does not exist — it needs its own path to the page.

### 0.2 `output: 'export'` is the governing constraint

`next.config.js` line 6 is `output: 'export'`. **The deployed site is static HTML with no server at runtime.** There is no request-time fetch, no ISR, no server action, no API route that executes. Phase 6's options are therefore not all available, and this single fact determines the whole design.

The Gate decision that established this also rejected removing it, because three dead API routes — including a `POST` handler running `execSync` — would become live.

### 0.3 There is no database

No Postgres, Prisma, Drizzle, SQLite, Mongo, Supabase, or Redis in `package.json`. **Notion is the only datastore.** Phase 5's "persist into the existing database" therefore means either Notion or a committed file.

Also relevant: `Environmental Signals` has **no date property of any kind** — no observed-at, no created-time. An observation written there would carry no timestamp except Notion's page `last_edited_time`.

---

## 1 — Phase 1 audit findings

| Area | State |
|---|---|
| Database schema | None. Notion (17 databases) is the datastore |
| Notion sync | `lib/notion-os.ts` — 5 of 17 DBs, read-only, build-time, one consumer route + the dashboard badge |
| Rock Creek entities | `Environmental Signals` (11), `Scenario Shocks` (3), `System Tensions` (3), `Recursive Loop Nodes` (6) |
| Dashboard data fetching | `dashboard/page.tsx` — async RSC, `getProjects()`, 2 strings passed as props |
| API routes | 3 exist, all `dynamic = "force-static"` → **inert**. None usable |
| Server actions | None |
| Env conventions | `NOTION_API_KEY` build-time server-only. **No `.env.local.example` exists** |
| Caching / revalidation | **None.** No `revalidate` anywhere; a comment records that ISR is deliberately unused |
| TS domain models | Per-route content modules. No shared domain layer |
| Seed data | None |
| Dashboard components | `StewardshipConsole` (559 ln) + `viz-primitives` (StatusDot, SparkLine, TrendBadge, PanelFrame, `statusColors`) |
| **Existing geo config** | **None.** No latitude/longitude anywhere in the repo |
| **Existing weather integration** | **None** |
| Scheduling infra | `node-cron` used by one local script only. One GH Actions workflow (Pages, no secrets) |

**Where observations fit:** `Environmental Signals` is the conceptually correct home — it already has `Current Value`, `Trend`, `Update Cadence` (including `Near-real-time`), `Reliability`, and `Source / Sensing Method`. **The schema was designed for this.** Two things block using it directly: `Current Value` is under an explicit protection order, and there is no timestamp field. See §5 and the open decisions.

---

## 2 — Phase 2: provider recommendation

### Recommended: **Open-Meteo** (primary), with **NWS api.weather.gov** reserved for alerts

| Criterion | Open-Meteo | NWS | OpenWeatherMap | Tomorrow.io |
|---|---|---|---|---|
| **API key** | **None required** | None | Required | Required |
| Cost | Free (non-commercial) | Free | Free tier 1k/day | Free tier |
| Current conditions | ✅ | ✅ station obs | ✅ | ✅ |
| Hourly / daily forecast | ✅ / ✅ | ✅ / ✅ | ✅ / ✅ | ✅ / ✅ |
| **Historical archive** | ✅ **ERA5, back to 1940** | Limited | Paid | Limited |
| Weather alerts | ❌ | ✅ **official US** | ✅ (One Call) | ✅ |
| **AQI / PM2.5** | ✅ **separate Air Quality API** | ❌ | ✅ | ✅ |
| Geographic resolution | ~1–11 km models | US grid | ~10 km | ~1 km |
| Rate limit | ~10k/day | generous | 1k/day | tiered |

**Why Open-Meteo wins for this project specifically:**

1. **No API key eliminates an entire risk class.** Phase 9 asks for an audit against credential exposure; with no credential there is nothing to expose, nothing to rotate, and nothing to leak in a build log. Given this repo already shipped a `NEXT_PUBLIC_STRAVA_ACCESS_TOKEN`, removing the possibility outright is worth more than marginal data quality.
2. **Historical archive directly serves Phase 5's stated future capability** — *"what environmental conditions existed when this decision occurred?"* — without paying for it or building it.
3. **The Air Quality API is the missing piece elsewhere in this system.** `Wildfire Smoke Ingress` currently has zero triggering signals because no air-quality signal exists, and your standing rule requires a defensible definition before one is created. Open-Meteo supplies US AQI and PM2.5 from a published public feed with documented thresholds — which is precisely what would let that signal clear your bar later. It is not a placeholder.
4. Open models, cited sources, no signup — appropriate for an evidence-disciplined practice.

**Its one real gap is alerts.** NWS `api.weather.gov` provides official US alerts, free and keyless, and can be added as a second adapter in a later stage without changing the normalized model. **Not proposed for Stage 1.**

**No existing provider to retain** — there is no weather integration in the repo today.

---

## 3 — Phase 3: normalized domain model

Provider shapes never leave the adapter. Only fields serving the three identified problems are retained.

```ts
type ObservationFreshness = 'fresh' | 'stale' | 'very-stale' | 'unavailable';

interface EnvironmentalObservation {
  readonly observedAt: string;      // ISO-8601, from the provider
  readonly fetchedAt: string;       // ISO-8601, when we called
  readonly source: 'open-meteo';
  readonly locationLabel: string;   // "Rock Creek, Montana" — never coordinates

  readonly air: {
    temperatureF: number;
    apparentTemperatureF: number;
    humidityPct: number;
    pressureHpa: number;
  };
  readonly wind: { speedMph: number; directionDeg: number; gustMph: number | null };
  readonly precipitation: { lastHourIn: number; probabilityPct: number | null };
  readonly sky: { cloudCoverPct: number; visibilityMi: number | null };
  readonly solar: { sunriseIso: string; sunsetIso: string };
  readonly airQuality: { usAqi: number; pm25: number } | null;   // null = feed unavailable
  readonly forecast: ReadonlyArray<{
    dateIso: string; highF: number; lowF: number; precipProbabilityPct: number;
  }>;                                                            // 3 days, not 16
}
```

### Field justification — each retained field serves a stated problem

| Field | Hydrology / Hoot Owl | Fire & air | Logistics / access |
|---|---|---|---|
| temperature, apparent temperature | ✅ drives stream warming | ✅ fuel drying | ✅ exertion safety |
| humidity | ✅ | ✅ fuel moisture | — |
| precipitation + probability | ✅ flow | ✅ fire risk | ✅ road/trail |
| wind speed, direction, gust | — | ✅ **smoke transport** | ✅ |
| **AQI / PM2.5** | — | ✅ **the Smoke Ingress trigger** | ✅ exertion thresholds |
| visibility | — | ✅ smoke proxy | ✅ |
| cloud cover | ✅ solar load on water | — | — |
| pressure | ✅ frontal change | ✅ | — |
| sunrise / sunset | ✅ **daylight fishing window** | — | ✅ activity scheduling |
| 3-day forecast | ✅ **lead time before a closure** | ✅ | ✅ |

**Deliberately excluded** despite being available: UV index, dew point, soil temperature/moisture, snow depth, freezing level, evapotranspiration, moon phase, 16-day forecast, minutely precipitation. None serves a current problem; each would be a metric on a wall.

```
Open-Meteo  →  adapter  →  EnvironmentalObservation  →  Rock Creek OS
             (only file that knows the provider)
```

---

## 4 — Phase 4: location

Single config module, not scattered through components:

```ts
// data/rockCreekLocation.ts  (proposed)
export const ROCK_CREEK_LOCATION = {
  label: 'Rock Creek, Montana',   // the only string the UI ever renders
  latitude: 46.33,                // 2 dp ≈ 1 km — deliberately coarse
  longitude: -113.29,
  timezone: 'America/Denver',
} as const;
```

The Ranch at Rock Creek is near Philipsburg, Granite County, Montana. **Two decimal places is deliberate** — it is enough for a weather grid cell and not enough to locate anything on the property. **No coordinate is ever rendered in the UI**, per Phase 4.

---

## 5 — Phase 5: storage strategy

### Recommended: **C — hybrid.** Committed snapshot + append-only history, read at build.

```
GitHub Actions (cron)
   → fetch Open-Meteo
   → normalize via adapter
   → write  data/environmental/current.json      (overwritten)
   → append data/environmental/history.ndjson    (one line per observation)
   → commit + push
        ↓  push triggers Vercel deploy
   next build  →  imports current.json  →  static HTML
```

**Why not each alternative:**

- **A (live fetch + cache)** — impossible. Static export has no runtime.
- **B (persist to Notion)** — `Environmental Signals.Current Value` is under your protection order, and the database has **no timestamp field**, so an observation would be undated. It also means a machine writing continuously into the practice's system of record. Possible later; wrong for Stage 1.

**Why the hybrid is right here:** the observation is a **file the build imports**, so nothing about static export changes. `history.ndjson` makes Phase 5's future question — *"what conditions existed when this decision occurred?"* — answerable by reading one file, and git history independently preserves every observation with a commit timestamp. Roughly 500 bytes per observation; at 8/day that is **~1.5 MB/year**.

Crucially this is **not a parallel weather database.** It is a cache of a normalized domain object, and it does not model signals, thresholds, shocks, or decisions — those stay in Notion.

---

## 6 — Phase 6: update frequency

| Strategy | Viable under static export? |
|---|---|
| Request-time fetch | ❌ no runtime |
| Server-side cache | ❌ no server |
| ISR / periodic revalidation | ❌ incompatible with `output: 'export'` |
| **Scheduled ingestion** | ✅ **recommended** |
| Event-driven | Later — needs the above first |

**Recommended interval: every 3 hours** (8 commits/day). Weather relevant to these thresholds moves on an hourly-to-daily scale; 3 hours is responsive enough to be credible and quiet enough not to flood the history. It is a single cron expression to change later.

**Freshness contract, driven by `observedAt` (never by build time):**

| Age | State | UI |
|---|---|---|
| < 3 h | `fresh` | timestamp shown normally |
| 3–12 h | `stale` | timestamp + explicit "last updated" emphasis |
| > 12 h | `very-stale` | visibly flagged as not current |
| no data | `unavailable` | explicit unavailable state |

---

## 7 — Phase 7: failure states

**No failure path ever fabricates a reading.**

| Failure | Ingestion job | Build | Dashboard |
|---|---|---|---|
| API unavailable / timeout | log, exit non-zero, **commit nothing** | reads last good file | age-based staleness label |
| Rate limited (429) | back off, retry once, then no commit | unchanged | unchanged |
| Malformed response | adapter throws, **no commit** | unchanged | unchanged |
| Missing optional field (AQI, visibility) | write with `null` | fine | that row omitted, not zeroed |
| Missing **required** field | treat as malformed, no commit | unchanged | unchanged |
| Invalid credentials | **N/A — no key** | — | — |
| Datastore failure | N/A — file write | — | — |
| First load / file absent | — | render explicit unavailable state, **do not fail the build** | "Environmental data unavailable" |
| File present but corrupt | — | **fail the build** — that is a code defect, not a data state | — |

The last two rows differ deliberately: an absent file is a legitimate first-run state; a corrupt file is a bug and should stop the build (SSOT rule S6).

---

## 8 — Phase 8: dashboard integration

Minimum viable, in the existing visual language — mono uppercase tracked labels, `viz-primitives`, dark canvas:

```
CURRENT CONDITIONS · ROCK CREEK, MONTANA
86°   18 MPH NW   0.00"   18% RH   AQI 42
Observed 12:14 PM MDT
```

Placement: the console header block, below the disclosure and Notion badge — contextual system information, not a zone. **No new zone, no chart, no forecast strip, no generic weather widget.**

### ⚠ The governance risk this creates — needs your decision

`consoleMeta.disclosure` currently reads:

> **"Conceptual prototype · modeled values, not Ranch measurements"**

annotated in-code as *"Never softened. This is the fact/speculation boundary, kept always-visible."*

**Adding real observations makes that sentence partly untrue.** Some values on the page would now be genuine measurements from a public feed. Left unchanged, the disclosure would understate what the page shows; changed carelessly, it would weaken the boundary the case study depends on.

The two must be visually and verbally separated — modeled scenario readings in Zone 01 versus a real observation strip that is explicitly sourced and timestamped. **This is a design decision, not an implementation detail, and it is the single biggest risk in Stage 1.**

---

## 9 — Phase 9: security

| Control | Status under this proposal |
|---|---|
| API key in browser | **N/A — Open-Meteo needs no key** |
| Any new credential | None introduced |
| Ingestion runs where | GitHub Actions runner, not the browser |
| Data reaching the client | The normalized observation only — a public weather reading |
| Coordinates in the bundle | Present in the config module but **never rendered**; coarse by design |
| Existing exposure | Unrelated but open: `NEXT_PUBLIC_STRAVA_ACCESS_TOKEN` in `hooks/useStravaData.ts:146` |

---

## 10 — Open decisions before implementation

| # | Decision | Why it blocks |
|---|---|---|
| **D1** | Ingestion model — scheduled commit (recommended) vs build-time-only vs client-side | Determines whether "real conditions" means hourly or deploy-frequency |
| **D2** | Disclosure semantics — how modeled and measured are separated | The console's core discipline; cannot be inferred |
| **D3** | Notion involvement — file-only for Stage 1 (recommended) vs writing `Current Value` | `Current Value` is under an explicit protection order |

**Nothing is implemented until D1–D3 are settled.** The brief's Step 3 permits implementation only where the architecture "does not conflict with existing systems" — it conflicts with static export, with the `Current Value` protection, and with the disclosure invariant. All three are yours to resolve.
