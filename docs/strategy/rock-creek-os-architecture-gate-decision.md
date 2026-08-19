# Rock Creek OS — Architecture Gate Decision

**Type:** Architecture gate. Decision document only.
**Date:** 2026-08-18
**Precedes:** Phase 2 — Rock Creek OS Data Architecture
**Companions:** [`notion-os-current-architecture.md`](notion-os-current-architecture.md) · [`rock-creek-os-repository-architecture-audit.md`](rock-creek-os-repository-architecture-audit.md)

**Constraints honored.** No application code written. No databases created. No packages installed. No Notion integration implemented. No webhooks. No content migrated. `output: 'export'` untouched. No repository source, config, or content file modified — this document is the sole artifact produced.

**Verification boundary.** The live Notion workspace could not be queried (no `NOTION_API_KEY` present; see companion audit §0). Gate 6 reasons from the five databases the integration references. Where a conclusion depends on unverifiable workspace state, it is marked **⚠ verify before acting** rather than asserted.

---

## 1 — Recommended Rock Creek Frame

### Recommendation: **MERGE** — with Adaptive Stewardship as the host architecture

Not the merge the foundation doc §0 describes. That version proposed layering hydrology onto Infrastructure Sovereignty. **The correct direction is the inverse:** Adaptive Stewardship is the host; infrastructure re-enters as a *signal domain*, not as a competing frame or a sixth layer.

### The containment test

The gate specifies eight things the chosen frame must coherently contain. Tested against what each frame actually ships:

| Required | Adaptive Stewardship (current) | Infrastructure Sovereignty (superseded) |
|---|---|---|
| ecology | ✅ Layer 01 **Environment** | ⚠️ "Ecosystem" layer, static |
| infrastructure | ❌ **absent — and explicitly disclaimed** | ✅ "Resource Autonomy" — its core |
| operations | ✅ Layer 03 **Operational Decisions** | ✅ "Operations" layer |
| workforce | ✅ Layer 04 **Staff & Logistics** | ⚠️ partial |
| guest experience | ✅ Layer 05 **Guest Experience** | ✅ "Human Experience" |
| stewardship intelligence | ✅ Layer 02 — **named exactly this** | ❌ absent |
| environmental signals | ✅ Layer 01 emits typed signals | ❌ absent |
| recursive decision loops | ✅ Sense→Interpret→Decide→Adapt→Learn + typed feedback graph | ❌ absent — five static layers |

**Adaptive Stewardship: 7 of 8. Infrastructure Sovereignty: 3 of 8.**

The single gap is real and worse than "uncovered." In `systems-data.ts:506`, infrastructure appears in a **scope exclusion** — "Any existing staffing workflow, operational policy, or technology infrastructure" is listed among things the work does not claim. Elsewhere "infrastructure" survives only as the rhetorical phrase *quiet infrastructure* (a design principle about invisibility, not a system layer). The frame did not merely drop infrastructure; it disclaimed it.

### Why merge, and why in this direction

**Adaptive Stewardship must be the host** because closing its one gap costs one signal domain, while closing Infrastructure Sovereignty's four gaps means rebuilding the intelligence layer, the signal model, and the recursive loop — that is not a merge, it is a second rewrite. Three of four routes already ship Stewardship. It also carries the intellectual core: the human-decision gate in Zone 03 of the console, where a recommendation sits unexecuted until a person acts. That distinction — decision *support* versus automation — is the case study's actual argument, and Sovereignty's static layer model has no place to put it.

**Infrastructure must return** because the gate requires it, and because it is what makes a *remote wilderness* property structurally distinctive. Off-grid energy, water systems, and connectivity are exactly the constraints Shore Lodge, Whitetail Club, and Yellowstone-adjacent properties share. A frame that cannot hold infrastructure cannot generalize across the intended portfolio.

**The merge mechanism already exists in the codebase.** `/systems` ships a `WildfireExtensibility` section whose entire argument is *"same architecture, different signal"* — wildfire proving the hydrology model generalizes. **Infrastructure becomes the third instance of that argument, not an exception to it.** Energy load, water storage, and connectivity are signals with thresholds and response paths; they enter at Layer 01 as sensed conditions and at Layer 04 as constraints on logistics (you cannot reroute guests to a lodge without power). No new layer, no new frame — the existing extensibility thesis gets stronger by being proven a third time across a genuinely different domain.

### Why the alternatives are weaker

**Supersede is weaker** because it ratifies the loss of infrastructure. The gate's own criteria then go unmet, and the portfolio discards the most transferable dimension of the property — the one that would carry to four other named future case studies. It also silently abandons prior work rather than accounting for it.

**Fork is weakest.** It splits one property into two case studies, which directly violates the discipline `rock-creek-os-foundation.md` exists to enforce — *"this is one system... If a future edit adds a third tension with equal weight, it has broken the narrative this document exists to protect."* Two case studies about the same ranch invite the question of why they are not one, and neither can answer it. It also doubles maintenance for a practice whose recorded constraint is that it is brain-rich and body-poor. Two half-developed case studies are strictly worse than one complete one.

### Naming

The project title in the brief — *"Infrastructure Sovereignty & Stewardship Intelligence"* — is itself a merge, but an ampersand merge reads as two things joined, which is the exact failure mode the foundation doc guards. **A merge should produce one name.**

Recommend **Rock Creek OS — Adaptive Stewardship Intelligence**, with *infrastructure sovereignty* demoted from frame to **signal domain** alongside hydrology and fire. The landing page's existing `h1` — "Environmental & Experience Systems Architecture" — works as the discipline label above it. Retire "five-layer sovereignty model" as a named framework entirely.

**⚠ This decision must be recorded in `rock-creek-os-foundation.md` §0 with a date.** Its absence is what let the migration stall halfway.

---

## 2 — Evidence Model

### Final vocabulary: **`Established` · `Inferred` · `Proposed` · `Future`** — adopt as specified

Concur with the gate's recommendation, without reservation. The current three-tier code vocabulary is a defect, not a simplification. Two changes:

- `documented` → `established` — restores the foundation doc's term. "Documented" describes *whether something was written down*; "Established" describes *whether it is true*. On a project that names a real business, that distinction is the whole point.
- **`future` added** — the tier the foundation doc calls "the single most important line in the boundary," defined as *"further-out speculative capabilities, dependent on infrastructure or data access this research has no evidence exists today."*

Collapsing `Future` into `Proposed` is the highest-credibility-risk defect in the codebase: it presents capabilities requiring sensor networks and data feeds that do not exist as though they were near-term design proposals — on the one project the portfolio audit already flagged for unsourced precision.

### Migration map — every affected consumer

**Tier A · Type definitions (2 sites)** — extend union to four members
| File | Line |
|---|---|
| `explorer/content/explorer-data.ts` | 28 |
| `systems/content/evidence.ts` | 6 |

**Tier B · Label maps (2 sites)** — rename `documented`→`established`, add `future` entry with `note`
| File | Line |
|---|---|
| `explorer/content/explorer-data.ts` | 30 |
| `systems/content/evidence.ts` | 8 |

**Tier C · Style maps (2 sites)** — `Record<EvidenceTier, string>` becomes non-exhaustive; **requires a fourth badge treatment as a design decision, not a code change**
| File | Line |
|---|---|
| `explorer/components/PrimaryChallenge.tsx` | 23 |
| `systems/components/systems-primitives.tsx` | 13 |

**Tier D · Badge components (2) + render sites (5)** — no signature change; will render the new tier once C is defined
| File | Line |
|---|---|
| `explorer/components/PrimaryChallenge.tsx` | 29 (component), 109, 138 |
| `systems/components/systems-primitives.tsx` | 19 (component) |
| `explorer/components/SupportingSystems.tsx` | 51 |
| `systems/components/SystemArchitectureStack.tsx` | 129 |
| `systems/components/PrimaryLifecycle.tsx` | 66 |
| `explorer/components/index.ts` | 12 (re-export) |

**Tier E · Type field declarations (4)** — no edit needed, inherit from the union
`explorer-data.ts:41` (`ChainStep`), `:139` (`SupportingSystem`) · `systems-data.ts:38` (`ArchitectureLayer`), `:177` (`LifecycleStage`)

**Tier F · Data literals — 18 sites, the substantive work**

*Mechanical rename `documented` → `established` (6):*
`explorer-data.ts` 87, 95, 160 · `systems-data.ts` 72, 188, 323

*Editorial re-adjudication `proposed` → possibly `future` (12) — this is a judgment call, not a find-and-replace:*
`explorer-data.ts` 119, 179 · `systems-data.ts` 92, 115, 135, 153, 198, 209, 218, 227

**Strong `Future` candidates**, tested against the foundation doc's own examples (*automated predictive triggers, a real-time feed, any already-unified cross-domain claim*):

| Site | Content | Assessment |
|---|---|---|
| `systems-data.ts:92` | Layer 02 **Stewardship Intelligence** | **Future** — the unified cross-domain interpretation layer is precisely what §3.5 says must not be claimed as existing |
| `systems-data.ts:227` | Lifecycle stage **Learn** | **Future** — requires longitudinal data capture with no evidence it exists |
| `systems-data.ts:198` | Lifecycle stage **Interpret** | **Future** — automated interpretation is the named example |
| `systems-data.ts:209`, `:218` | **Decide**, **Adapt** | Likely **Proposed** — these are human actions, near-term plausible |
| `explorer-data.ts:119` | Final chain step | Review — depends on whether it asserts automation |

**Sequencing:** Tier A→B→C before F. The style map (C) needs a designed fourth badge state, and re-tiering (F) needs the frame decision from §1 settled — infrastructure content entering the frame will arrive with its own tiers.

---

## 3 — Notion Ownership Matrix

### The architectural rule (Gate 4)

> **Notion provides the data substrate; the portfolio provides the experience.**
>
> Notion owns records that are *true* — signals, claims, sources, metadata — and must be queryable, reusable, and auditable across case studies. The portfolio owns everything that determines how a visitor *encounters* those records: visual hierarchy, layout, interaction, visualization, narrative sequencing, animation, storytelling, interpretation.
>
> **Operational corollaries.** A Notion property must never determine a heading, a section order, a color, a component choice, or a layout decision. Every Notion query is filtered and projected into a hand-written TypeScript interface before rendering — the interface, not the database, is the contract. If a new Notion property would appear on the site without a deliberate repository change, the boundary has been crossed.

### Classification — every export in every content module

**`explorer/content/explorer-data.ts` (392 ln)**

| Export | Class | Reason |
|---|---|---|
| `EvidenceTier`, `evidenceTierLabels` | **B** | Vocabulary belongs in Notion as governance; the type stays local and authoritative |
| `explorerHero` | **C** | Page narrative — eyebrow, title, deck, premise, question |
| `premiseConditions` | **B** | The conditions *are* environmental signals; presentation tone is local |
| `primaryChallenge` | **B** | Claims + tiers from Notion; `ChainStep` sequencing and interaction are local |
| `ChainStep` | **C** | Interaction model |
| `supportingSystems` / `SupportingSystem` | **B** | The systems are records; `whyNotSeparate` is narrative argument — local |
| `overlayNodes` / `OverlayNode` | **C** | Graph geometry for the page's key visual |
| `overlayCopy` | **C** | Narrative |
| `signalToExperience` | **C** | Four-stage narrative model |
| `futureDesign` | **A** | Roadmap records — reusable, queryable |
| `evidenceBoundary` | **B** | Established/not-claimed lists are governance records; framing is local |
| `explorerSections` | **C** | Section map / navigation |

**`systems/content/systems-data.ts` (522 ln)**

| Export | Class | Reason |
|---|---|---|
| `systemsHero`, `architectureCopy`, `primaryLifecycleCopy`, `extensibilityCopy`, `logisticsCopy`, `feedbackCopy`, `futureDesignCopy` | **C** | All narrative framing |
| `architectureLayers` / `ArchitectureLayer` | **C** | The five-layer graph — nested, typed, ordered. Notion would degrade it |
| `hydrologyLifecycle` / `LifecycleStage` | **C** | Ordered stage graph |
| `lifecycleFlows` / `LifecycleFlow` | **C** | **Typed directed edges** — the clearest local-only case in the codebase |
| `extensibilityColumns` / `ExtensibilityColumn` | **B** | Domain comparison; **the merge point for infrastructure as a third column** |
| `logisticsChain` | **C** | Ordered propagation chain |
| `feedbackNodes` / `feedbackEdges` | **C** | Directed graph with typed edges |
| `futureArtifacts` / `FutureArtifact` | **B** | Artifact records → Notion; **`layerIds` binding stays local** — it references a local graph |
| `systemsEvidenceBoundary` | **B** | As above |
| `systemsSections` | **C** | Section map |

**`dashboard/content/scenarios.ts` (277 ln)**

| Export | Class | Reason |
|---|---|---|
| `ConditionStatus`, `TrendDirection` | **C** | Visualization vocabulary driving color and iconography |
| `ScenarioId` | **C** | Route/state key |
| `scenarios` / `Scenario` | **B** | **Split required** — see below |
| `ActivityImpact`, `LogisticsAction` | **B** | Records within a scenario |
| `scenarioOrder` | **C** | Narrative sequencing — the order builds an argument |
| `loopStages` | **C** | Console visualization structure |
| `consoleMeta` | **B** | Disclaimer text is governance; layout is local |

**The `Scenario` split — the sharpest boundary in the project.** Each scenario nests river state, fire state, interpretation with affected activities, a staged response with a human-decision gate, guest current/adapted states, and an outcome line. Notion should own the **facts inside**: signal readings, threshold values, threshold rationale, source citations, evidence tiers. The repository must own the **composition**: which zones exist, what resolves only after the staff decision, and the deliberate gap between recommendation and execution. That gap is the case study's argument and cannot live in a database row.

**`systems/content/evidence.ts` (12 ln)** — **B**. Vocabulary governed in Notion, type declared locally.

### Summary

| Class | Share of the 1,203 lines | Character |
|---|---|---|
| **A — Notion system of record** | ~5% | `futureDesign` roadmap records |
| **B — Hybrid** | ~30% | Signals, claims, thresholds, sources, boundaries, artifact records, scenario facts |
| **C — Repository-owned** | ~65% | Graphs, narrative, sequencing, interaction, visualization |

**Roughly two-thirds of Rock Creek should never go to Notion.** This is the expected result for a case study whose value is in modeling and storytelling. A migration that moved substantially more than a third of this content would be evidence the boundary had been drawn wrong.

---

## 4 — Existing Database Reuse Matrix

Existing databases (from `lib/notion-os.ts`): **Organizations** · **System Artifacts** · **Experience Patterns** · **Projects & Concepts** · **Portfolio Assets**.

| Proposed entity | Existing equivalent | Reuse? | Extend? | New? | Decision |
|---|---|---|---|---|---|
| **Case Study Metadata** | **Projects & Concepts** — carries `Work Type`, `Maturity Stage`, `Portfolio Priority`, `Systems Layers`, `External Link`, `Status` | ✅ **Yes** | Add `Disclaimer`, `Frame`, `Property Referenced` | ❌ **No** | **REUSE.** Rock Creek is already a record here. Creating a Case Studies DB would duplicate the practice's project registry |
| **Future Artifacts** | **System Artifacts** — has `Artifact Type`, `Maturity` (incl. `Concept`), `Evidence Confidence`, `Project` relation | ✅ **Yes** | Add `Case Study` relation; use `Maturity = Concept` | ❌ **No** | **REUSE + EXTEND.** "Future artifact" is an existing artifact at an early maturity, not a new entity |
| **Environmental Signals** | None. `System Artifacts` holds *"Environmental Signal Taxonomy"* — a **document about** signals, not the signals | ❌ | ❌ | ✅ **Yes** | **NEW — highest value.** Signal, domain (hydrology/fire/**infrastructure**/access), unit, threshold, rationale, source, tier, case-study relation. This is the registry the portfolio already claims and does not have |
| **Evidence Claims** | None. `Portfolio Assets.Evidence Role` describes assets, not claims | ❌ | ❌ | ✅ **Yes** | **NEW — second highest value.** Claim, tier, source relation, case-study relation. Makes evidence discipline auditable instead of re-typed per project |
| **Sources** | None | ❌ | ❌ | ✅ **Yes** | **NEW — small.** `[S1]`–`[S5]` are already a citation system in markdown. A thin table with a relation from Evidence Claims |
| **System Tensions** | **Experience Patterns** — partial. Patterns are recurring *design responses*; tensions are *problem structures* | ⚠️ | ⚠️ Possibly via a `Pattern Kind` discriminator | ⚠️ | **⚠ VERIFY LIVE FIRST.** Inspect `Experience Patterns` options before deciding. Default to extending with a discriminator; create new only if the semantics genuinely collide |
| **Scenario Metadata** | None | ❌ | ❌ | ✅ Small | **NEW — thin.** Scenario name, premise, domains engaged, tier, case-study relation. Nested state stays local (§3) |
| **Operational KPIs / Telemetry** | None | ❌ | ❌ | ❌ | **DEFER.** The case study states *modeled values, not Ranch measurements*. A telemetry database implies measurement that does not exist. Building it invites exactly the unsourced-precision failure already flagged. Revisit only if real data access is ever obtained |

**Net: 4 new databases (Signals, Evidence Claims, Sources, Scenario Metadata), 2 reuses, 1 pending verification, 1 deferred.** Against a naive reading of the original spec, this avoids creating Case Studies, Future Artifacts, and KPI Telemetry — three databases that would have duplicated or pre-empted existing structure.

### Multi-case-study discriminator (Gate 7)

Every new database and both extended databases carry a **`Case Study` relation** pointing at `Projects & Concepts` — not a per-project database, and not a text field.

```
Projects & Concepts  ("Rock Creek OS", "Shore Lodge", "Whitetail Club",
                      "Yellowstone …", "Adaptive Stewardship Companion")
        ▲  ▲  ▲  ▲  ▲
        │  │  │  │  └── Scenario Metadata  ── Case Study
        │  │  │  └───── System Artifacts   ── Case Study   (extended)
        │  │  └──────── Evidence Claims    ── Case Study
        │  └─────────── Environmental Signals ── Case Study
        └────────────── (existing relations preserved)
```

A signal defined once — *stream temperature, 70°F trout-stress threshold* — is then referenced by every case study where it applies. That is the cross-project reuse that justifies the database in the first place.

### Generalizing `lib/notion-os.ts` (Gate 5)

Assessment of the existing implementation:

| Aspect | State | Action |
|---|---|---|
| Database IDs | Hard-coded, **duplicated** in `lib/notion-os.ts` and `scripts/introspect-notion-os.mjs` | **Extract** to a single registry module |
| Query pattern | `queryAll()` — correct cursor pagination | **Extract** — reuse as-is |
| Property readers | `titleText`, `richText`, `selectName`, `statusName`, `multiNames`, `numberVal`, `urlVal`, `checkboxVal`, `relationIds` | **Extract** — a complete, sound toolkit |
| Sort helper | `rankOf()` categorical ranking | **Extract** |
| Types | Five bespoke interfaces, single-page shaped | **Keep local per consumer** — this is the projection boundary and must not be centralized |
| Relation handling | First-only, title-only, N+1 with per-build cache | **Rework** — must return IDs so records can link to pages; must support multi-relation |
| Error handling | try/catch → `[]` per function | **Keep, and add** a build-time assertion so a missing key fails loudly |
| Fallback | Curated `STATIC_*` in the component layer | **Keep and formalize** — the right pattern, worth a documented convention |
| Build-time behavior | Async RSC, key never client-side | **Keep** — correct and proven |

**Extract into shared infrastructure:** the client construction, `queryAll`, property readers, `rankOf`, and a database-ID registry. **Do not centralize** the domain interfaces — per-consumer projection is precisely what keeps the portfolio from becoming a database viewer.

---

## 5 — Final Data Architecture

```text
╔══════════════════════════════════════════════════════════════════════════════╗
║  NOTION — ENVIRONMENTAL SYSTEMS DESIGN OS          (system of record)         ║
╚══════════════════════════════════════════════════════════════════════════════╝

   EXISTING (reuse / extend)              NEW (create in Phase 2)
   ─────────────────────────              ───────────────────────
   Projects & Concepts  ◀── hub ──┐       Environmental Signals ──┐
     +Disclaimer +Frame           │         domain · unit ·       │
     +Property Referenced         │         threshold · tier      │
   System Artifacts               ├──────  Evidence Claims ───────┤ all carry
     +Case Study relation         │         claim · tier · source │ [Case Study]
   Experience Patterns  ⚠verify   │       Sources  [S1]–[S5] ─────┤ relation
   Organizations                  │       Scenario Metadata ──────┘
   Portfolio Assets               │
                                  └──  DEFERRED: KPI Telemetry
                                       (no real measurement exists)
                     │
                     │  read-only · build time · @notionhq/client
                     ▼
╔══════════════════════════════════════════════════════════════════════════════╗
║  SHARED ACCESS LAYER   lib/notion/*    (extracted from lib/notion-os.ts)      ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  db registry (single source of IDs) · queryAll() pagination · property        ║
║  readers · rankOf() · relation resolution returning IDs · fetch assertion     ║
╚══════════════════════════════════════════════════════════════════════════════╝
                     │
                     │  ⚠ PROJECTION BOUNDARY — hand-written interfaces per
                     │    consumer. Narrow. A new Notion property cannot
                     │    reach a page without a deliberate repo change.
                     ▼
   ┌──────────────────────────────┐        ┌──────────────────────────────────┐
   │  NOTION-DERIVED (class A/B)  │        │  REPOSITORY-OWNED (class C)      │
   │  ~35% of content             │        │  ~65% of content                 │
   ├──────────────────────────────┤        ├──────────────────────────────────┤
   │  signal defs + thresholds    │        │  architectureLayers (5-layer)    │
   │  evidence claims + tiers     │        │  lifecycleFlows (typed edges)    │
   │  source citations            │        │  feedbackNodes / feedbackEdges   │
   │  case-study metadata         │        │  overlayNodes (visual geometry)  │
   │  future artifact records     │        │  scenario composition + gate     │
   │  evidence boundary lists     │        │  scenarioOrder (argument order)  │
   │  scenario facts              │        │  all hero / section / copy       │
   └──────────────┬───────────────┘        └────────────────┬─────────────────┘
                  │                                         │
                  │      merged in the page component       │
                  └────────────────┬────────────────────────┘
                                   ▼
              ╔═══════════════════════════════════════════╗
              ║  ROCK CREEK OS — UX LAYER                 ║
              ║  hierarchy · layout · interaction ·       ║
              ║  visualization · sequencing · narrative   ║
              ╚═══════════════════════════════════════════╝
                    │            │            │
                    ▼            ▼            ▼
                 Explorer     Systems     Dashboard
                    │            │            │
                    └────────────┴────────────┘
                                 │
                      next build · output:'export'
                                 ▼
                          static HTML in out/

   ── SAME ACCESS LAYER, FUTURE CONSUMERS ──────────────────────────────
   Adaptive Stewardship Companion · Shore Lodge · Whitetail Club ·
   Yellowstone · environmental-systems-design-os (migrates onto it)
```

**Two improvements over the diagram in the brief.** First, the brief's version shows one data-access layer feeding Rock Creek; this version makes the **projection boundary** an explicit, named architectural element — it is the mechanism that enforces Gate 4, and leaving it implicit is how portfolios become database viewers. Second, the brief's version implies Notion and repository models merge in the access layer; they should merge **in the page component**, so the access layer stays project-agnostic and reusable by all six future case studies.

---

## 6 — Static Export Strategy

### Every dependency on `output: 'export'`

| # | Dependency | Breaks if removed? |
|---|---|---|
| 1 | `next.config.js` → produces `out/` | — |
| 2 | `vercel.json`: `framework: null`, `outputDirectory: "out"` | ✅ misconfigured |
| 3 | `.github/workflows/nextjs.yml` uploads `./out` to Pages | ✅ GitHub Pages deploy breaks entirely |
| 4 | `images.unoptimized: true` | Required by export; harmless if kept |
| 5 | `trailingSlash: true` + `cleanUrls` + 16 redirects | ✅ URL shape changes; redirects may misbehave |
| 6 | `basePath` switching for GitHub Pages `/portfolio` | ✅ dual-target logic loses meaning |
| 7 | 3 API routes marked `dynamic = "force-static"` | ✅ **all three become live** |
| 8 | `lib/notion-os.ts` header documents no-ISR contract | Documentation drift |

### Dead API routes that would become live

| Route | Handler | Risk if activated |
|---|---|---|
| `app/api/update-cursor-analytics/route.js` | `POST` → **`execSync`** on a path from `process.cwd()` | **Critical** — unauthenticated remote command execution |
| `app/api/strava/route.js` | `GET` → external API with `STRAVA_*` secrets | Credential exposure via an unreviewed endpoint |
| `app/api/openai/route.js` | `POST` → OpenAI with in-memory rate limiting | Billable endpoint, unauthenticated, rate limit resets per instance |

**All three should be deleted regardless of the Notion decision.** They cannot work today and are latent liabilities. The `execSync` route in particular should not remain in the tree.

### Comparison of the four integration models

| Model | Complexity | Failure mode | Secrets | Verdict |
|---|---|---|---|---|
| **Build-time fetch** | **Lowest** | Build fails or falls back — visible, pre-deploy | Build env only, never shipped | ✅ **RECOMMENDED** |
| Server-side runtime fetch | High — requires removing export | Runtime outage; activates dead routes | Runtime env | ❌ Rejected |
| ISR | High — incompatible with export | Same as above, plus cache-staleness debugging | Runtime env | ❌ Rejected |
| External sync → committed JSON | Medium | Sync drift; content in two places | CI only | ⚠️ Fallback only |

**Does Notion integration require server runtime? No.** The pattern is already proven in production on `/projects/environmental-systems-design-os`: an async Server Component fetches at build time, the key never reaches the browser, and data is baked into static HTML. Rock Creek needs exactly the same thing at larger scale.

**Recommendation: keep `output: 'export'`. Extend the proven build-time pattern.** Add one thing it lacks — a **build-time assertion** that live data was actually retrieved, so a missing key fails the build instead of silently rendering curated fallback as current content. Also resolve the dual-pipeline split: either add `NOTION_API_KEY` to GitHub Actions secrets or retire that workflow. A pipeline that cannot fetch Notion should not be deploying pages that claim to.

---

## 7 — Webhook Decision

### **NO. Do not build a webhook.** No reservations.

| Factor | Reality | Implication |
|---|---|---|
| Update frequency | Research synthesis — bursts during authoring, then static for weeks | Nothing to push |
| Content volatility | Case-study research, not operational data | Low |
| Portfolio traffic | Personal practice portfolio | No load argument |
| Build frequency | Already tied to deploys | Rebuild already happens when work happens |
| Deployment workflow | Vercel on push + GitHub Actions on push | Two triggers already exist |
| Infrastructure cost | Requires a live endpoint → removing static export → **activating the `execSync` route** | Disproportionate and dangerous |

A webhook would exist to make content propagate without a deploy. But the content changes *because someone is working on it*, and that work already produces commits. **The webhook would solve a synchronization problem that the workflow does not have** — while forcing the one architectural change (§6) with a critical security consequence.

**If push-button freshness is ever wanted:** use a **Vercel Deploy Hook** — a URL that triggers a rebuild, callable from a Notion button or manually. Zero application infrastructure, no endpoint in the app, no change to `output: 'export'`, no dead routes activated. It is a *deploy trigger*, not a webhook into the application, and it delivers the entire practical benefit at none of the cost.

---

## 8 — Phase 2 Inputs

Phase 2 — **Rock Creek OS Data Architecture** — should design exactly the following, and nothing beyond it.

### Prerequisites — Phase 2 must not start until these are true

1. **Frame decision recorded** in `rock-creek-os-foundation.md` §0 with a date (§1 recommends Merge, Stewardship as host).
2. **Landing-page drift fixed** — `page.tsx:255-258` still promises five frameworks that `/systems` no longer contains. Do not model a case study whose own landing page misdescribes it.
3. **`.env.local` restored** and `scripts/introspect-notion-os.mjs` run, so Gate 6's ⚠ items are resolved against the real workspace rather than inferred.
4. **Evidence vocabulary settled** — four tiers adopted, fourth badge treatment designed (§2 Tier C).

### In scope for Phase 2 — design only, still no code

**A. Schema design (4 new + 2 extensions)**
- `Environmental Signals` — signal, **domain (hydrology · fire · infrastructure · access)**, unit, threshold value, threshold rationale, source relation, evidence tier, case-study relation. *The `infrastructure` domain value is where the §1 merge lands in data.*
- `Evidence Claims` — claim text, tier, source relation, case-study relation, page/section binding
- `Sources` — `[S1]`–`[S5]` citation records, thin
- `Scenario Metadata` — name, premise, domains engaged, tier, case-study relation
- `Projects & Concepts` **extension** — `Disclaimer`, `Frame`, `Property Referenced`
- `System Artifacts` **extension** — `Case Study` relation

**B. Taxonomy reconciliation** — resolve the two inconsistencies in the companion audit §5 *before* adding databases that would inherit them: `Strategic Relevance` typed as select-string in three DBs and number in one; `Status` typed as `select` in two and `status` in two.

**C. Shared access-layer design** — module boundaries for the extraction in §4; the DB-ID registry shape; relation resolution returning IDs; the build-time fetch assertion; a documented fallback convention.

**D. Projection interfaces** — the hand-written TypeScript shapes each Rock Creek route will receive. This is the Gate 4 enforcement point and deserves explicit design, not incidental typing.

**E. Content split plan** — per module, which exports move to class A/B and which stay C, using §3 as the specification. Includes the `Scenario` fact/composition split.

**F. Migration sequencing** — order of operations that never leaves a page broken, given that `/explorer`, `/systems`, `/dashboard` all render today.

### Explicitly out of scope for Phase 2

KPI Telemetry database · webhooks or any runtime infrastructure · any change to `output: 'export'` · migrating narrative, graph, or visualization content · a Case Studies database (reuse `Projects & Concepts`) · a Future Artifacts database (extend `System Artifacts`) · per-project database architectures.

### Definition of done for Phase 2

A schema specification, an access-layer module design, a set of projection interfaces, and a sequenced migration plan — reviewed against this document's ownership matrix, with **no Notion database created and no repository file modified.** Implementation begins in Phase 3.
