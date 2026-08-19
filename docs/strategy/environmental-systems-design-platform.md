# Future-State Environmental Systems Design Platform

**Master suite:** Phase 10 — final. Architecture only; no code, no repository source modified.
**Date:** 2026-08-18
**Inputs:** Phases 1.5–9, all approved.

---

## 0 — Framing, stated honestly

Two constraints shape this document more than the requirements do.

**First, the practice has not yet had market contact.** The recorded red-team rule — no new strategy documents until the first invoice — exists precisely to catch documents like this one. A five-year platform roadmap for a practice with one published case study is the archetypal artifact that rule guards against.

I am delivering it, because the architecture question is real and answering it now prevents expensive mistakes at case study #2. But it is delivered under a hard constraint: **this platform must not require five years of investment to pay off.** Everything below is designed so that the *second* case study is cheap, and nothing is built for the sixth before the second exists.

The roadmap in §9 is therefore **capability-gated, not time-gated.** Milestones trigger on real events — a second case study existing, a client asking for a system — not on elapsed quarters. A time-based roadmap for a practice with no market signal is fiction with dates on it.

**Second, the Phase 9 warning is load-bearing.** Rock Creek's narrative structure — one primary tension, two supporting systems — is a *finding about Rock Creek*, not a template. A platform that forces every property into that shape fails exactly as badly as a database viewer, arriving from the opposite direction.

---

## 1 — Platform thesis

> **Share the substrate. Never share the argument.**

| Compounds across case studies | Must be re-derived per case study |
|---|---|
| Signal definitions, units, sensing methods | Which signals matter here, and why |
| Shock archetypes and thresholds | Which shocks this property actually faces |
| Evidence tiers, sources, citation discipline | What this property's evidence establishes |
| Loop-node vocabulary (closed, 6) | How this property's loop actually behaves |
| Tension archetypes | This property's tension hierarchy |
| Primitives, badges, diagram grammar | Page IA, visual emphasis, narrative order |
| Governance rules G1–G10 | The argument the case study makes |

**The test for the left column:** would a second case study restate this identically? If yes, it belongs to the platform. **The test for the right column:** is this a finding? Findings never generalize — that is what makes them findings.

Getting this line wrong in either direction is fatal. Too little sharing and each case study costs what Rock Creek cost. Too much and the portfolio becomes six renderings of one template, which is worth less than one good case study.

---

## 2 — Five-Year Information Architecture

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║  L0 — PRACTICE CANON                                    grows slowly, ~never  ║
║  Loop Nodes (6, closed) · Evidence Tiers (4, closed) · Governance G1–G10      ║
║  Boundary Roles (2, closed)                                                   ║
║  → Changing anything here is an architecture decision with a written rationale║
╠═══════════════════════════════════════════════════════════════════════════════╣
║  L1 — DOMAIN VOCABULARY                                 bounded growth        ║
║  Signal Domains (8) · Shock Kinds (5) · Sensing Methods (5) · Claim Kinds (5) ║
║  Onset Speed (4) · Reversibility (3)                                          ║
║  → A new value requires review; expect ~2–4 additions across six case studies ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║  L2 — SHARED KNOWLEDGE RECORDS                          grows with each study ║
║  Environmental Signals ······· shared, many-to-many    ← reuse compounds      ║
║  Scenario Shocks ············· shared, many-to-many    ← reuse compounds      ║
║  Sources ····················· shared                  ← reuse compounds      ║
║  System Artifacts ············ shared                                         ║
║  Systems Models ·············· shared  ⚠ may already be Experience Patterns   ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║  L3 — CASE-STUDY RECORDS                                grows linearly        ║
║  Projects & Concepts (the hub) · System Tensions · Evidence Claims            ║
║  → One case study's tensions and claims are its own. No cross-study reuse.    ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║  L4 — SHARED PRESENTATION            components/esd/    grows very slowly     ║
║  EvidenceTierBadge · SourceCitation · ConditionCard · TensionAxis             ║
║  RecursiveLoopDiagram · diagram-primitives                                    ║
║  → Promotion requires a SECOND real consumer, never anticipation              ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║  L5 — CASE-STUDY EXPERIENCE          app/projects/<case-study>/               ║
║  Narrative · page IA · visual argument · interaction · geometry · composition ║
║  → Re-derived every time. Nothing here is ever promoted to L4.                ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

### Projected growth at six case studies

| Layer | Today | At 6 | Shape |
|---|---|---|---|
| L0 | 12 values | 12 | **flat — by design** |
| L1 | 30 values | ~34 | near-flat |
| L2 Signals | ~15 | **~40, not ~90** | **sub-linear ← the whole bet** |
| L2 Shocks | ~6 | ~25 | sub-linear |
| L2 Sources | 5 | ~40 | roughly linear |
| L3 Tensions | 3 | ~18 | linear |
| L3 Claims | ~30 | ~180 | **linear — the largest table** |
| L4 components | 6 | ~10 | near-flat |
| L5 | 1 route group | 6 | linear — **correct** |

**The single measurable success criterion:** L2 Signals must grow **sub-linearly**. If six case studies produce ~90 signals, each with `Case Study Count = 1`, the shared registry failed and is just six private tables in a trench coat. The `GOVERN — Signal Reuse Audit` view (Phase 4 §5) is the instrument that measures this, and it should be read after every new case study.

---

## 3 — Database Consolidation Strategy

### 3.1 No consolidation is needed — that is the finding

The Phase 2 schema already consolidates. It produced **5 new databases from 8 proposed entities** by rejecting three:

| Rejected | Consolidated into |
|---|---|
| Case Studies | `Projects & Concepts` (extended) |
| Future Artifacts | `System Artifacts` (`Maturity = Concept`) |
| Signal Thresholds | `Scenario Shocks` (a threshold *is* a crossing that does something) |
| KPI Telemetry | deferred — no source of record |

**The consolidation discipline to carry forward:** before any future database, ask whether it is a *discriminated variant* of an existing one. Three of the four rejections above were exactly that.

### 3.2 Stress test at six case studies

| Database | Holds up? | Pressure point |
|---|---|---|
| Environmental Signals | ✅ | **Signal proliferation.** Two properties describing "stream temperature" differently create duplicates that look distinct. Mitigated by G4 + the reuse audit |
| Scenario Shocks | 🟡 | Shocks drift case-study-specific. *"Mid-August Hoot Owl Restriction"* is Montana-specific. **Fix: add `Shock Archetype`** (§6) |
| System Tensions | ✅ | Already solved via `Tension Archetype` — the same pattern |
| Evidence Claims | ✅ | Largest table but structurally simple; governance views keep it navigable |
| Sources | ✅ | — |
| Loop Nodes | ✅ | Closed at 6 |
| Projects & Concepts | 🟡 | Case-study properties may exceed the 8-property tripwire (Phase 2 §2). Revisit the 1:1 split then, not before |

### 3.3 The one consolidation still open

**Systems Models.** Phase 3 §8.3 flagged that model *definitions* need a home and Phase 2 gave them none. Before creating a database: **verify whether `Experience Patterns` already is this.** It carries `Value Focus / Structural Intent`, `Systems Layers`, `Maturity`, `Strategic Relevance` — which is close to what a model definition needs. Extending it with a `Pattern Kind` discriminator is more likely correct than a new table. This is the fifth item on the verification pass.

---

## 4 — Shared Taxonomies

**Governance differs by class.** Treating all vocabularies alike is how taxonomies rot.

| Class | Vocabularies | Rule |
|---|---|---|
| **Closed** | Evidence Tiers (4) · Loop Nodes (6) · Boundary Roles (2) · Onset Speed (4) · Reversibility (3) | **Frozen.** A change is an architecture decision with written rationale (G6). These define the practice's method — if they drift, cross-study comparison becomes meaningless |
| **Bounded** | Signal Domains (8) · Shock Kinds (5) · Sensing Methods (5) · Claim Kinds (5) | Additions allowed with review. A new value must be a genuinely new *kind*, not a synonym |
| **Open** | Tension Archetypes (5) · Shock Archetypes (new) | Grow with each property type. These are pattern libraries; growth is the point |

### Expected bounded growth

`Signal Domains` currently covers hydrology · fire · air · wildlife · forest · infrastructure · access · weather. Likely additions across the named future projects: **`snow-ice`** (winter operations at mountain properties), **`lacustrine`** (lake systems), possibly **`geothermal`** for Yellowstone-adjacent work. That is ~3 additions across five new case studies — which is the signature of a well-sized taxonomy.

**Anti-pattern to watch:** a new domain added because one property phrases something differently. `water-temperature` is not a domain; it is a signal in `hydrology`.

---

## 5 — Shared Signal Frameworks

The registry is the artifact; the **chain** is the framework:

```
   SIGNAL ──▶ THRESHOLD ──▶ SHOCK ──▶ INTERPRETATION ──▶ DECISION ──▶ ACTION ──▶ EXPERIENCE
     │            │           │                                                      │
   L2 shared   on shock    L2 shared        ────── L5 per case study ──────          │
     │                                                                                │
     └──────────────────────────── LEARNING (loop node 6) ◀───────────────────────────┘
```

This is the practice's reusable intellectual product, and it transfers to any property in any landscape. **What transfers is the chain; what does not is which link binds hardest.** At Rock Creek, hydrology binds. At a lake property it may be water quality; at a winter property, snowpack and access.

### The reuse mechanism, concretely

A signal defined once — *stream temperature, °F, continuous measurement, hydrology, public feed* — is referenced by every case study where it applies. Thresholds stay per-property, on shocks (Phase 2 §4.3), which is what makes sharing possible at all.

**If two of the named future projects share a geography — which appears likely for Shore Lodge and Whitetail Club — they should share signals directly.** That would be the cleanest available proof the registry works, and the cheapest second case study possible. Worth confirming early, because it would make Whitetail the ideal candidate for the platform test in §9.

---

## 6 — Shared Scenario Libraries

**Shocks are shared. Compositions are local.** Established in Phase 2 §1 and unchanged.

### The one schema addition this phase recommends

Add **`Shock Archetype`** (select) to Scenario Shocks, mirroring `Tension Archetype`:

| Archetype | Rock Creek instance | Plausible elsewhere |
|---|---|---|
| Regulatory activity closure | Mid-August Hoot Owl Restriction | algae-bloom swim closure |
| Air-quality event | Wildfire Smoke Ingress | regional smoke |
| Access severance | Road Closure | avalanche closure |
| Utility interruption | Utility Failure | grid or water-system failure |
| Compound event | heat + smoke | any co-occurrence |

**Why it matters at scale:** a shock *instance* is property-specific and does not reuse. The *archetype* does. Without this field, six case studies produce ~25 shocks with no way to see that five of them are the same structural event. With it, the library becomes queryable as a pattern set — *"every case study facing an access-severance shock"* — which is a genuine practice asset.

This is the same insight that made `Tension Archetype` work, applied to the entity that needs it next.

---

## 7 — Shared Systems Models

| Model | Definition (L2, shared) | Rendering (L5, local) |
|---|---|---|
| Sense→Interpret→Decide→Adapt→Learn | ✅ canonical | per-case-study lifecycle content |
| Six-node recursive loop | ✅ L0, closed | `RecursiveLoopDiagram` (L4 shared) |
| Signal→Threshold→Shock→Response | ✅ canonical | per-case-study chain |
| Layer stack (Environment→Guest Experience) | 🟡 canonical *shape*; layer content is local | `SystemArchitectureStack` per study |
| Evidence-tier discipline | ✅ L0 | badges (L4) |
| Typed feedback graph with polarity | ❌ **local** | `FeedbackLoop` per study |

**The distinction:** a model *definition* says what the model is and means. A model *instance* says what it contains here. The first compounds; the second is a finding.

The layer stack is the interesting middle case — the five-layer shape (environment → intelligence → decisions → actions → experience) likely holds across properties, while its per-layer signal lists are entirely local. Share the shape, never the contents.

---

## 8 — Shared Dashboard Components

L4 evolution, governed by the Phase 7 promotion rule: **a second real consumer, never anticipation.**

| Component | Today | At 6 case studies |
|---|---|---|
| `EvidenceTierBadge` | promote (already duplicated) | stable |
| `SourceCitation` | new — nothing renders citations | stable |
| `ConditionCard` | extract from the console | stable — **the signal renderer** |
| `TensionAxis` | promote — already correct | stable |
| `RecursiveLoopDiagram` | new | stable |
| `diagram-primitives` | promote wholesale | +1–2 primitives |
| `ScenarioSelector` | — | **candidate at case study #2** |
| `ZoneFrame` | — | **candidate at case study #2** |

**~6 components today, ~10 at six case studies.** Near-flat, because the shared layer holds *renderers of domain types*, not page structures.

**What never enters L4:** `StewardshipConsole` and its decision gate · `SystemOverlayDiagram` geometry · `PrimaryLifecycle` · `FeedbackLoop` · any hero or section copy. These carry Rock Creek's argument.

**The failure signature to watch for:** an L4 component accumulating configuration props to serve a second case study. Five booleans in a shared component means two different components were merged prematurely. Split it.

---

## 9 — Platform Evolution Roadmap

**Capability-gated, not time-gated.** Each gate opens on a real event.

| Gate | Trigger | Build | Do NOT build |
|---|---|---|---|
| **G-0 · Foundation** | now — unblocked | Phase 8 Stage 0: props-in, dedupe, extract, `SourceCitation` | anything Notion |
| **G-1 · First integration** | verification passes | Phase 2 schema, `lib/notion/*`, migrations M1–M4 | anything for case study #2 |
| **G-2 · Second case study** | a real second subject exists | Its L5 directory. `Shock Archetype`. Promote L4 candidates **that a second consumer actually needs** | new databases |
| **G-3 · Reuse proven** | signal reuse audit shows meaningful cross-study sharing | Nothing new. **Publish the finding** — a signal registry with real reuse is a portfolio asset in itself | platform features |
| **G-4 · External demand** | someone asks for a system, or pays for one | Only what that engagement requires | speculative tooling |
| **G-5 · Scale pressure** | build time >30 s, or API rate-limit failure | The cached-JSON layer (Phase 5 §2.2) | ISR, webhooks, runtime infra |

**G-2 is the decisive gate.** It is where the architecture is proven or falsified, and it should be attempted with the *cheapest* available second subject rather than the most impressive one.

**Anti-milestone:** there is no gate for "build platform features." Every gate is triggered by a real consumer. A platform capability with no consumer is inventory.

---

## 10 — Portfolio Growth Strategy

### The economics this is built for

| | Rock Creek | Case study #2 | #3–#6 |
|---|---|---|---|
| New databases | 5 | **0** | **0** |
| New access-layer code | full build | **0** | **0** |
| New L4 components | 6 | 0–2 | 0–1 |
| New taxonomy values | 30 | 0–2 | 0–1 |
| **New narrative + IA** | full | **full** | **full** |

**Substrate cost collapses. Narrative cost does not — and must not.** If case study #2's narrative is cheap, it is because it was templated, and Phase 9 explains why that is a failure rather than a saving.

### The three-tier portfolio shape

Not every case study needs four routes.

| Depth | Surfaces | For |
|---|---|---|
| **Full** | Overview · Explorer · Systems · Dashboard | the flagship — Rock Creek |
| **Standard** | Overview · Explorer · Systems | most projects |
| **Compact** | Overview only, evidence-boundary complete | early or thin subjects |

Phase 4 §9 already establishes Dashboard as the only optional surface. This makes that a deliberate portfolio strategy: **a compact case study with a complete evidence boundary is worth more than a four-route case study with thin evidence.**

### What actually compounds

The signal registry, the source library, the evidence discipline, the archetype libraries, and the six governance rules encoded in types. **After six case studies the most valuable asset is not any one of them — it is a cross-referenced evidence base that no single case study could demonstrate.** That is the argument for the platform, and it is the only argument that survives the red-team rule: it produces something sellable that the case studies alone do not.

---

## 11 — Anti-goals

| Do not build | Why |
|---|---|
| A case-study template or generator | Phase 9 — the narrative must be re-derived. This is the primary failure mode |
| A shared page-IA abstraction | Same |
| A CMS-like admin surface | Notion is that |
| Runtime infrastructure — ISR, webhooks, servers | Phase 5, approved. Build-time static is correct and creates no attack surface |
| KPI telemetry without a real feed | Phase 2/6 — manufactures the exact credibility failure the evidence discipline prevents |
| Databases for anticipated projects | G-2 — a database with no records is a guess |
| A public API over the knowledge base | No consumer. Revisit only at G-4 |
| More strategy documents | The recorded red-team rule. **This document should be the last architecture artifact before implementation** |

---

## 12 — Closing position

The platform worth building is **narrow**: a shared knowledge substrate, a closed method vocabulary, six presentation primitives, and ten governance rules — several already enforced by the type system rather than by discipline.

Everything else is a case study, and case studies do not compound by being similar. They compound by sharing evidence.

**The one-sentence test for every future decision:**

> Does this make the *next* case study cheaper without making it more similar?

Yes → platform. No → case study. Both → look again, because that combination usually means a narrative structure is being promoted to infrastructure.

**Phase 10 closes the design suite.** The next action remains the one the reconciliation audit identified: restore `.env.local`, run the introspection pass, and open Phase 8 Stage 0 — which needs no credentials and can begin immediately.
