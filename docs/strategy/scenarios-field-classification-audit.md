# `scenarios.ts` Field Classification Audit

**Type:** Field-level audit against the **live** Notion workspace. No code, no schema changes, no repository source modified.
**Date:** 2026-08-19
**Method:** every field in `dashboard/content/scenarios.ts` (277 lines) classified against the actual property inventory of the workspace, read live via `databases.retrieve` and `search`.

---

## 0 — Correction to Phase 2, discovered while auditing

The workspace contains **17 databases, not 5.** `lib/notion-os.ts` wires five; twelve more exist and are already shared with the integration. Several are the exact databases Phase 2 recommended creating.

| Phase 2 said | Live reality | Verdict |
|---|---|---|
| **Environmental Signals** — create new | ✅ **EXISTS** — `74ba06f2…`, **11 records** | ❌ Phase 2 wrong |
| **System Tensions** — create (verify first) | ✅ **EXISTS** — `69dddbad…`, **3 records** | ❌ Phase 2 wrong |
| **Scenario Shocks** — create new | ✅ **EXISTS** — `be77b2b9…`, **3 records** | ❌ Phase 2 wrong |
| **Loop Nodes** — verify `Systems Layers` first | ✅ **Recursive Loop Nodes EXISTS** — `e6b98859…`, **exactly 6 records** | ❌ Phase 2 wrong |
| **Sources** — create new | ✅ **Research Library EXISTS** — 22 records | ❌ superseded |
| **Case Studies** — do NOT create, reuse Projects & Concepts | ✅ **EXISTS separately** — 17 records | ❌ **Phase 2 wrong** |
| **Evidence Claims** — create new | ❌ does not exist | ✅ Phase 2 correct |

**Five of seven recommended databases already existed.** The single genuinely-missing entity is **Evidence Claims**.

Two sub-findings that resolve open ⚠ VERIFY items:

- **`Systems Layers` is NOT the loop-node taxonomy.** Its options are `Human | Spatial | Operational | Digital | Ecological` — a different axis entirely. Recursive Loop Nodes is its own database. Gate item 3 resolved.
- **`Recursive Loop Nodes` holds exactly the six-node model**, in order: Environmental Signals → Stewardship Intelligence → Operational Decisions → Staff Actions & Logistics → Guest Experience → Operational Learning. This was designed independently in Phase 6 and matches the workspace exactly.

Also: **Portfolio Assets has 12 records but `verify-notion-os.mts` reports 0** — because `getPortfolioAssets()` filters on `Portfolio Ready = true` and no record has it checked. Not a bug; a content state.

---

## 1 — What the live databases actually hold

Three findings that drive the classification below.

**`Environmental Signals.Current Value` is empty on all 11 records.** The database deliberately holds no readings. `Rock Creek Water Temperature` and `Rock Creek Stream Flow` exist as *definitions* with `Trend`, `Threshold`, `Reliability`, `Risk if Wrong`, and `Source / Sensing Method` — the latter reading *"Conceptual model input. Operating implementation would require in-stream temperature logging."*

**`Threshold` holds rationale, not numbers.** For water temperature: *"Documented thermal stress threshold for cold-water species; sustained exceedance rather than a momentary spike is what drives restriction."* No `70°F`.

**This is already the correct architecture.** Notion holds what a signal *is*; it does not claim what a signal *reads*. The discipline the design documents argued for is already implemented in the workspace.

**Scenario Shocks maps 1:1 onto the console's scenarios:**

| `scenarios.ts` | Notion Scenario Shock |
|---|---|
| `normal` | *(none — deliberate absence)* |
| `heat` | Mid-August Hoot Owl Restrictions |
| `compound` | Compound Event — Hoot Owl and Smoke Concurrent |
| *(component of compound)* | Wildfire Smoke Ingress |

---

## 2 — Classification key

| | Class | Meaning |
|---|---|---|
| **A** | **Notion-owned fact** | A claim about the world. Belongs in Notion — and in most cases a property already exists |
| **B** | **Local authored scenario/composition** | Written for this console. Could in principle be reconsidered, but has no home in Notion and gains nothing from one |
| **C** | **Derived presentation value** | Computed or mapped for display. Should be *derived*, never stored — storing it duplicates a fact |
| **D** | **Should not migrate** | Protected. Migrating it would either manufacture a false claim or destroy the argument. Permanent |

**B vs D is the distinction that matters.** B is "local for now." D is "local forever, and here is what breaks otherwise."

---

## 3 — Field-by-field classification

### 3.1 Type-level

| Field | Class | Notion counterpart | Note |
|---|---|---|---|
| `ConditionStatus` (optimal/nominal/elevated/critical) | **C** | none | Severity of *this reading against its threshold*. Derived, not stored |
| `TrendDirection` (up/down/stable) | **C** | ⚠️ `Signals.Trend` exists — but different | Notion's trend is the signal's **standing** characterization (`Water Temperature = Rising`). The console's is **in-scenario**. Do not conflate. Notion also has a 4th value, `Volatile`, with no repo equivalent |
| `ScenarioId` | **B** | none | Composition key |
| `ActivityImpact.id` · `.label` | **B** | none | Fishing / Trails / Access — no activity database exists |
| `ActivityImpact.status` | **C** | none | |
| `ActivityImpact.note` | **B** | none | Per-scenario consequence |
| `LogisticsAction.id` · `.label` | **B** *(vocabulary partly **A**)* | `Responsible Team` select on Signals + Loop Nodes | Notion's vocabulary (`Activity Guides`, `Transportation & Mobility`, …) overlaps `guides`/`transport`. The **taxonomy** is Notion-owned; the per-scenario instance is local |
| `LogisticsAction.detail` | **B** | partially `Shocks.Response Playbook` | |

### 3.2 Scenario identity and framing

| Field | Class | Notion counterpart | Note |
|---|---|---|---|
| `id` · `label` · `shortLabel` | **B** | `Shocks.Shock Name` (loosely) | Console labels are shorter and authored for the segmented control |
| `premise` | **B** | none | *"Mid-August. Four consecutive days above 90°F…"* — narrative scene-setting |

### 3.3 `river` — primary environmental input

| Field | Class | Notion counterpart | Note |
|---|---|---|---|
| `river.temperature` (`58°F`/`71°F`/`72°F`) | 🔴 **D** | `Signals.Current Value` **exists and is deliberately empty** | **Do not migrate.** Writing a modeled number into `Current Value` converts an authored illustration into an apparent measurement. This is the single highest-risk field in the file |
| `river.flow` (`Steady`/`Falling`) | 🔴 **D** | same | Same reasoning |
| `river.status` | **C** | — | Derived: reading vs threshold |
| `river.trend` | **C** | ⚠️ see `TrendDirection` above | |
| `river.condition` (`Hoot Owl restriction likely`) | **A + B** | `Shocks.Shock Name` / `Operational Impact` | The *consequence of crossing* is a Notion fact; the short display phrasing is local |
| `river.thresholdNote` | **A + B** | `Signals.Threshold` + `Shocks.Operational Impact` | **Composite.** The documented facts — 70°F trout-stress, the 2:00 PM Hoot Owl closure — are Notion-owned. The per-scenario framing (*"Well below…"* vs *"Crossed…"*) is local. **This field must be split** |

### 3.4 `fire` — supporting environmental input

| Field | Class | Notion counterpart | Note |
|---|---|---|---|
| `fire.risk` (`Low`/`Moderate`/`Elevated`) | 🔴 **D** | none | Modeled. ⚠️ No fire-risk signal exists — nearest is `Forest Health Index — 6,600 Acre Programme` (`Fire & Fuel Management`). **Gap** |
| `fire.status` · `.trend` | **C** | — | |
| `fire.condition` | **A + B** | `Shocks` (Wildfire Smoke Ingress) | |
| `fire.thresholdNote` | **A + B** | `Signals.Threshold` | Air-quality threshold is a fact; framing is local |

### 3.5 `interpretation` — Zone 02

| Field | Class | Notion counterpart | Note |
|---|---|---|---|
| `interpretation.summary` | **B** | none | *"This is the case that proves the systems are not independent"* — **the case study's argument.** Notion has no property for it and should not |
| `interpretation.affected[]` | **B + C** | none | Labels and notes authored; status derived |

### 3.6 `response` — Zone 03, the human decision

| Field | Class | Notion counterpart | Note |
|---|---|---|---|
| `response.recommendation` | **A + B** | `Shocks.Response Playbook` | The playbook is Notion-owned; the one-line console phrasing is local |
| `response.rationale` | **B** | none | *"The same pivot made at 1:45 PM reads to the guest as a cancellation."* Authored insight — the timing argument is the point |
| `response.actionLabel` | 🔴 **D** | none | The decision gate's control label. **Protected (Phase 9 S3)** |
| `response.logistics[]` | **A + B** | `Shocks.Response Playbook`, `Responsible Team` | Team vocabulary A; per-scenario detail B |

### 3.7 `guest` — Zone 04

| Field | Class | Notion counterpart | Note |
|---|---|---|---|
| `guest.current` · `.adapted` | **B** | none | The before/after the whole system exists to protect. Authored |
| `guest.status` (`Experience preserved`) | **B** | none | |
| `guest.statusTone` | **C** | — | |

### 3.8 `outcome` — closes the loop

| Field | Class | Notion counterpart | Note |
|---|---|---|---|
| `outcome` | **B** *(partly **A**)* | `Shocks.Recovery Metrics`, Loop Node 6 *Operational Learning* | The learning *mechanism* is Notion-modeled; the per-scenario observation (*"sheltered capacity is the property's real ceiling"*) is an authored finding |

### 3.9 Module-level exports

| Field | Class | Notion counterpart | Note |
|---|---|---|---|
| `scenarios` | **B** | — | The composition itself |
| `scenarioOrder` | 🔴 **D** | none | Normal → Heat → Compound **is an argument**: baseline, single constraint, compound proof. Sorting this by any property destroys it |
| `loopStages` (4 zones) | 🔴 **D** | ⚠️ `Recursive Loop Nodes` has **6** | **Not the same thing.** The console compresses 6 nodes into 4 zones + an outcome line: zone 03 carries both *Operational Decisions* and *Staff Actions*, and `outcome` carries *Operational Learning*. The 6-node vocabulary is **A**; this 4-zone compression is a design decision |
| `consoleMeta.eyebrow` · `.title` | **B** | — | |
| `consoleMeta.disclosure` | 🔴 **D** | none | *"Never softened."* **Protected (Phase 9 S4)** |
| `consoleMeta.humanNote` | 🔴 **D** | none | States the decision-support thesis. **Protected** |

---

## 4 — Tally

| Class | Fields | Share |
|---|---|---|
| **A** — Notion-owned fact | 0 pure · **7 composite** | ~15% |
| **B** — Local authored | **19** | ~50% |
| **C** — Derived presentation | **8** | ~20% |
| **D** — Should not migrate | **9** | ~25% |

**No field in `scenarios.ts` is purely Notion-owned.** Every point of contact is a composite where a Notion fact is wrapped in authored framing. That is not a defect — it is the ownership boundary working exactly as designed, and it is why a naive "point the dashboard at Notion" migration would be wrong.

### The nine protected (D) fields

`river.temperature` · `river.flow` · `fire.risk` · `response.actionLabel` · `scenarioOrder` · `loopStages` · `consoleMeta.disclosure` · `consoleMeta.humanNote` — plus the composite decision-gate behavior in `response`.

**Three of these are protected for a reason worth restating:** `river.temperature`, `river.flow`, and `fire.risk` are modeled illustrations. `Signals.Current Value` exists and is empty *by choice*. Filling it from the console's scenario values would take the one discipline the workspace already gets right and quietly reverse it.

---

## 5 — Why this prevents a database viewer

| Symptom (Phase 9 §1.3) | Prevented by |
|---|---|
| Uniform rows | 19 B-fields are per-scenario prose that no query returns |
| Identical card treatment | `river` dominant / `fire` subordinate is layout, not data |
| Property names as labels | `Threshold` renders as an authored sentence, never a labeled field |
| Data-determined order | `scenarioOrder` is class D |
| *"No records found"* | `normal` composes **zero** shocks and renders as a complete state |
| Row added → page changes | Only 7 composite fields touch Notion, each through a projection |

---

## 6 — Practical consequences

1. **Split the composite fields before migrating anything.** `thresholdNote` currently fuses a Notion fact with local framing in one string. Migration means separating them, not moving the string.
2. **Never write to `Signals.Current Value` from the console.** Add it to the protected list explicitly.
3. **`Scenario Shocks.Trigger Signal` is `rich_text`, not a relation.** The shock→signal link is currently a text field, so the chain is not traversable. Converting it to a relation to Environmental Signals is the highest-value single schema change available.
4. **`Signals.Trend` and `river.trend` are different concepts** with different value sets (4 vs 3, including `Volatile`). Do not map one onto the other.
5. **No fire-risk signal exists.** `fire.risk` has no Notion counterpart. Either add one, or keep it local and say so.
6. **Phase 2's database plan needs rewriting** against the real 17-database workspace before any creation work begins. Only Evidence Claims is genuinely missing.
