# Single Source of Truth Architecture

**Phase:** 3.0

| Track | Status |
|---|---|
| **Architecture** | ✅ **COMPLETE** — layer boundaries, ownership, lifecycle, governance defined below |
| **Implementation** | ⛔ **GATE BLOCKED** — live verification has not run; see §0 and §9 |
| **Phase 3 overall** | 🔶 **NOT COMPLETE.** An architecture being verification-independent does not make the phase done |
| **Phase 4** | ⛔ Must not start. Requires the §9 exit gate, all ten items |

No implementation, no databases, no schema changes, no repository code modified.
**Date:** 2026-08-18
**Authoritative predecessors:** [`rock-creek-os-architecture-gate-decision.md`](rock-creek-os-architecture-gate-decision.md) (Phase 1.5, approved) · [`rock-creek-os-data-architecture.md`](rock-creek-os-data-architecture.md) (Phase 2, approved)

---

## 0 — Phase 3 verification pass: BLOCKED

The read-only live-workspace verification pass **could not run.**

| Check | Result |
|---|---|
| `.env` / `.env.local` in repo | ❌ none |
| `NOTION_API_KEY` in shell | ❌ unset |
| `NOTION_TOKEN` in shell | ❌ unset |
| Notion credential file in `~` | ❌ none |
| Notion MCP connector this session | ❌ not available |

**Every ⚠ VERIFY item from Phase 2 remains unresolved.** No database may be created and no Phase 2 schema treated as confirmed until they are:

1. Does an **Environmental Signals** database already exist, unwired?
2. What are the **`Systems Layers`** multi-select options? (Prime reuse candidate for Loop Nodes — it is live on three databases at `lib/notion-os.ts:189, 261, 300`.)
3. Do **Experience Patterns** semantics collide with System Tensions?
4. Full property/option inventory of the five wired databases — needed to confirm the two type inconsistencies before new databases inherit them.

**To unblock — two paths:**

```bash
node --env-file=.env.local scripts/introspect-notion-os.mjs
```

Restore `.env.local` containing `NOTION_API_KEY` and run the above; it prints every property and every select/multi-select/status option for the five wired databases. **It does not discover unwired databases** — resolving question 1 additionally requires either a Notion search call or a manual check of the workspace sidebar.

Alternatively, authorize a Notion connector in an interactive session (`claude mcp` or `/mcp`), which would allow both introspection and discovery. This session is non-interactive and cannot run that flow.

**Why the architecture below still proceeds — and what that does NOT mean.** The Single Source of Truth architecture is *verification-independent*: layer boundaries, ownership rules, lifecycle, and governance do not change based on which databases already exist. Phase 2's **schema** depends on verification; Phase 3's **architecture** does not.

**This does not make Phase 3 complete.** Two tracks run separately and must never be collapsed:

- **Architecture track — COMPLETE.** Sections 1–8 are finished and reviewable.
- **Implementation track — GATE BLOCKED.** Nothing in subphases 3.2–3.8 may begin.

Treat "the architecture is done" as an invitation to review, never as authorization to build. An agent or contributor picking this document up mid-stream must not read a completed architecture as a green light — the §9 exit gate is the only authorization, and it is not satisfied. Every unresolved ⚠ VERIFY item above is a place where building now would encode a guess as structure.

---

## 1 — Resolving a conflict in the requirements

The brief states Notion should store *research, evidence, narratives, systems models, tensions, signals, scenarios* while Next.js stores *UI state, interactions, visualizations, presentation logic*.

Read literally, **narratives**, **systems models**, and **scenarios** contradict the approved Phase 1.5 Gate, which classified narrative prose, graph-shaped models, and scenario composition as repository-owned (~65% of Rock Creek content), and contradicts the standing objective to avoid becoming a database viewer.

The conflict is real but resolvable, because both statements are correct about different things. The resolution is the organizing principle of this document:

> ### The split is not by content type. It is by whether something is a **claim about the world** or a **decision about encounter.**
>
> Notion owns what the practice **knows and asserts**. Next.js owns how a visitor **meets it**. Content type is irrelevant — "narrative" appears on both sides, and so does "model."

Applied to the three contested classes:

| Class | Notion owns — the claim | Next.js owns — the encounter |
|---|---|---|
| **Narratives** | The canonical thesis. *"Complex environmental problems are rarely isolated problems. They are system relationships."* Stated once, cited by every project that uses it | The telling: sequencing, section framing, what appears where, prose written for a specific page position |
| **Systems models** | The definition. That Sense→Interpret→Decide→Adapt→Learn *is* the model, its stage meanings, which case studies use it | The encoding: typed edges, polarity, geometry, layout, interaction |
| **Scenarios** | The facts. Shock definitions, thresholds, threshold rationale, signal readings, sources, tiers | The composition: which shocks compose a scenario, the four console zones, the staff-decision gate, `scenarioOrder` |

This is a **refinement of the requirement, not a rejection.** It gives Notion genuine authority over every one of the seven named content classes — at the level where authority is meaningful. A narrative thesis restated inconsistently across three project pages is a real source-of-truth failure that this fixes. Hero deck copy living in a database is not a source-of-truth win; it is a formatting problem with extra steps.

---

## 2 — Architecture Diagram

```text
╔═══════════════════════════════════════════════════════════════════════════════╗
║  KNOWLEDGE LAYER — NOTION                                    AUTHORITATIVE     ║
║  "What the practice knows and asserts."                                       ║
║  Optimized for: truth, traceability, reuse, governance, querying              ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║   IDENTITY & PORTFOLIO         EVIDENCE SPINE          SYSTEMS VOCABULARY     ║
║   ┌────────────────────┐      ┌──────────────┐        ┌──────────────────┐   ║
║   │ Projects &Concepts │      │ Evidence     │        │ Environmental    │   ║
║   │  (case-study hub)  │      │ Claims       │        │ Signals          │   ║
║   │ Portfolio Assets   │      │ Sources      │        │ System Tensions  │   ║
║   │ Organizations      │      └──────────────┘        │ Scenario Shocks  │   ║
║   │ System Artifacts   │                              │ Loop Nodes       │   ║
║   │ Experience Patterns│      NARRATIVE CANON         │ Model Definitions│   ║
║   └────────────────────┘      ┌──────────────┐        └──────────────────┘   ║
║                               │ Practice     │         ▲ Phase 2 schema      ║
║                               │ Principles   │           (⚠ pending verify)  ║
║                               │ (candidate)  │                               ║
║                               └──────────────┘                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
                                      │
                                      │  read-only · build time · no writes
                                      ▼
╔═══════════════════════════════════════════════════════════════════════════════╗
║  OPERATIONAL LAYER — BUILD-TIME TRANSFORMATION           lib/notion/*          ║
║  "What is selected, checked, and shaped for a purpose."                       ║
║  NOT a runtime API. Runs inside `next build` under output:'export'.           ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║   1 FETCH        db-id registry · queryAll() pagination · relation resolution ║
║                  returning IDs (not just titles) · per-build cache            ║
║   2 VALIDATE     property presence · option conformance · governance checks   ║
║   3 ASSERT       ✗ non-empty result required → build FAILS loudly on          ║
║                    missing key or renamed property. Closes the silent-        ║
║                    degradation hole in today's integration                    ║
║   4 PROJECT      ★ hand-written narrow interfaces, one per consumer ★         ║
║                  ══ THE BOUNDARY. A new Notion property CANNOT reach a page  ║
║                     without a deliberate repository change. ══                ║
║   5 FALLBACK     curated static, explicitly labeled — never silent            ║
╚═══════════════════════════════════════════════════════════════════════════════╝
                                      │
                    projected, typed domain objects
                                      ▼
╔═══════════════════════════════════════════════════════════════════════════════╗
║  PRESENTATION LAYER — NEXT.JS                                 AUTHORITATIVE   ║
║  "How a visitor encounters it."                                               ║
║  Optimized for: comprehension, hierarchy, pacing, delight                     ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║   COMPOSITION            ENCODING                    INTERACTION              ║
║   scenario composition   architectureLayers          UI state                 ║
║   scenarioOrder          lifecycleFlows (typed)      staff-decision gate      ║
║   section sequencing     feedbackEdges (polarity)    scenario switching       ║
║   page IA                overlayNodes (geometry)     nav / disclosure         ║
║   which shocks compose   visual grammar · color      animation                ║
║   evidence-tier badges   typography · layout         responsive behavior      ║
╚═══════════════════════════════════════════════════════════════════════════════╝
                                      │
                        next build → output:'export'
                                      ▼
                    static HTML · out/ · zero runtime dependency
                                      │
        ┌─────────────────┬───────────┴────────┬──────────────────┐
        ▼                 ▼                    ▼                  ▼
   Rock Creek OS    ESD OS page          Shore Lodge         Whitetail /
   4 routes         (migrates to          (future)            Yellowstone
                     shared layer)                            (future)
```

**Why the operational layer is build-time and not an API.** The Gate approved `output: 'export'` and rejected runtime fetching, ISR, and webhooks. Removing static export would activate three dead API routes including a `POST` → `execSync` handler. "API transformations" in this architecture means a **transformation pipeline that runs during the build**, not an HTTP surface.

---

## 3 — Ownership Matrix

### Layer ownership by content class

| Content class | Knowledge (Notion) | Operational | Presentation (Next.js) |
|---|---|---|---|
| Research observations | ✅ **owns** | select, tier-filter | — |
| Evidence claims + tiers | ✅ **owns** | validate sourcing | badge rendering |
| Source citations | ✅ **owns** | resolve relations | citation display |
| Environmental signals | ✅ **owns** | project to route shape | visualization |
| Thresholds + rationale | ✅ **owns** *(on shocks)* | resolve | threshold display |
| System tensions | ✅ **owns** | hierarchy validation | primary/supporting visual weight |
| Scenario shocks | ✅ **owns** | resolve triggers | — |
| Loop node vocabulary | ✅ **owns** | resolve relations | node labels |
| Systems-model *definitions* | ✅ **owns** | — | — |
| Case-study metadata | ✅ **owns** | — | hero, breadcrumb |
| Disclaimers | ✅ **owns** | assert presence | placement |
| Narrative *theses* | ✅ **owns** | — | in-page framing |
| Artifact + roadmap records | ✅ **owns** | filter by maturity | — |
| — | — | — | — |
| Scenario *composition* | ❌ | — | ✅ **owns** |
| `scenarioOrder` (argument) | ❌ | — | ✅ **owns** |
| Architecture-layer graph | ❌ | — | ✅ **owns** |
| Lifecycle typed edges | ❌ | — | ✅ **owns** |
| Feedback edges + polarity | ❌ | — | ✅ **owns** |
| Overlay geometry | ❌ | — | ✅ **owns** |
| Section framing / headings | ❌ | — | ✅ **owns** |
| Page IA / sequencing | ❌ | — | ✅ **owns** |
| UI state / interaction | ❌ | — | ✅ **owns** |
| Visual grammar / motion | ❌ | — | ✅ **owns** |
| Evidence-tier *badge design* | ❌ | — | ✅ **owns** |

### Decision test — apply to any new content

```
   Is it a claim about the world that could be WRONG?
        │
   YES ─┴─ NO ──────────────▶  PRESENTATION (Next.js)
    │
    ▼
   Would it be restated by another case study?
        │
   YES ─┴─ NO ──▶ Does it need a source, a tier, or an audit trail?
    │                    │
    │              YES ──┴── NO ──▶ PRESENTATION
    │               │
    ▼               ▼
      KNOWLEDGE (Notion)
```

Two clarifying cases. *The 70°F trout-stress threshold* — a claim, could be wrong, recurs at other properties, needs a source → **Notion.** *The decision to render the primary tension at 6xl with a filled kicker* — not a claim, cannot be wrong, is a judgment about emphasis → **Next.js.**

---

## 4 — Data Governance Strategy

Phase 2 rules **G1–G10 remain in force.** These are the portfolio-wide additions.

### 4.1 Authority

| Principle | Rule |
|---|---|
| Single writer | Notion records are edited **in Notion only**. No repository file may restate a Notion-owned value; it must fetch it |
| Single reader path | All Notion access goes through the operational layer. No component imports `@notionhq/client` directly |
| No write-back | The portfolio never writes to Notion. Read-only, permanently. Analytics or engagement data does not flow back |
| Presentation independence | No Notion property may determine a heading, section order, color, component, or layout *(Gate G8)* |

### 4.2 Integrity

| Rule | Enforcement |
|---|---|
| **Fail loud, not quiet** | The build asserts non-empty results for every required query. A missing key or renamed property fails the build. This is the single most important change to today's integration |
| Fallback must be visible | Curated static content renders with an explicit label. Never silently substituted for live data |
| Schema drift detection | `scripts/introspect-notion-os.mjs` output is committed as a snapshot; a CI diff surfaces property renames before they break a build |
| Type consistency | `Status` always `status`; `Strategic Relevance` always `number`; `Evidence Tier` always the same four `select` options *(Phase 2 §6)* |
| ASCII property names | No en-dash, em-dash, or smart quotes. The existing `Strategic Relevance (1–5)` is a documented trap and must not be replicated |

### 4.3 Evidence governance

| Rule | Enforcement |
|---|---|
| No `Established` without a source | `Unsourced Established` rollup — publish blocker *(G2)* |
| `Future` is not `Proposed` | Automated triggers, real-time feeds, unified cross-domain claims are always `Future` *(G3)* |
| Publish gate | No case study reaches `Published (Portfolio)` without `Evidence Boundary Published` + G2 clean *(G5)* |
| Tier changes are logged | Re-tiering is a governance event, not a data edit. Record why |

### 4.4 Access and secrets

| Rule | Detail |
|---|---|
| Key is build-only | `NOTION_API_KEY` never in client bundle, never in `NEXT_PUBLIC_*` |
| Documented contract | `.env.local.example` must exist and list every required variable |
| One canonical pipeline | Resolve the dual-deploy split: add secrets to GitHub Actions or retire it. A pipeline that cannot fetch Notion must not deploy pages that claim live data |
| Integration scope | The Notion integration is shared to the minimum set of databases required. Review on each new database |

---

## 5 — Content Lifecycle Model

```
  ①  CAPTURE                    Notion · Status: Draft
      Raw observation, research note, field note. No tier yet.
      Nothing renders. Nothing is claimed.
                │
                │  GATE: is there a source, or is this reasoning?
                ▼
  ②  SOURCE                     Notion · Sources record created / linked
      Citation captured with type, URL, date, reliability.
      Unsourced material may proceed only to Inferred / Proposed / Future.
                │
                ▼
  ③  CLAIM                      Notion · Evidence Claims · tier assigned
      The assertion is stated once, tiered, and bound to its subject.
      G2 applies: Established requires ≥1 source.
                │
                ▼
  ④  STRUCTURE                  Notion · Signal / Tension / Shock record
      The claim becomes a queryable systems record with relations to
      loop nodes and case studies. Status: Draft → Active.
                │
                │  GATE: G4 reuse check — does this already exist?
                ▼
  ⑤  COMPOSE                    Repository · content modules
      The portfolio SELECTS which records appear, in what order, at what
      visual weight, inside which narrative. Notion cannot reach here
      on its own — composition is a deliberate authoring act.
                │
                ▼
  ⑥  PROJECT                    Operational layer · build time
      Fetch → validate → assert → project to a narrow interface.
      Build FAILS if required data is absent.
                │
                ▼
  ⑦  PUBLISH                    Static HTML · out/
      Baked at deploy. G5 gate: Evidence Boundary published, G2 clean.
                │
                ▼
  ⑧  REVIEW                     Notion · rollup audit
      Credibility ratio (Established vs Future). Unsourced-Established
      count. Signal reuse count. Primary-tension count = 1.
                │
       ┌────────┴────────┐
       ▼                 ▼
  ⑨ RE-TIER          ⑩ SUPERSEDE
    New evidence        Status: Retired / Superseded.
    moves a claim       Never deleted — the audit trail is the
    Future→Proposed     point. Superseded records keep their
    →Inferred→          relations so past claims stay explicable.
    Established
       │                 │
       └────────┬────────┘
                ▼
         back to ⑥ on next build
```

**Two properties of this model matter most.** Content only becomes visible through **⑤ Compose**, a deliberate repository act — so nothing can appear on the site because someone added a Notion row. And **⑩ Supersede never deletes**, because a practice whose credibility rests on evidence discipline must be able to explain what it used to claim and why that changed.

---

## 6 — Source-of-Truth Rules

Ten rules. Each is checkable; each names its failure mode.

| # | Rule | Failure it prevents |
|---|---|---|
| **S1** | **Notion is authoritative for claims; the repository is authoritative for encounter.** Content type never decides — the claim/encounter test does | Both "put everything in Notion" and "keep everything local" |
| **S2** | **A fact is stated once.** If a value appears in two places, one is a cache with a documented refresh path. No value is hand-copied between Notion and the repository | The `EvidenceTier` drift — two copies that diverged identically from the source doc |
| **S3** | **The projection interface is the contract.** Every Notion field crossing into presentation passes through a hand-written TypeScript interface | Becoming a database viewer |
| **S4** | **Notion cannot change what a page looks like.** No property maps to a heading, order, color, component, or layout | Editorial control leaking into a database |
| **S5** | **The repository cannot change what is true.** Presentation code may select, order, and style records; it may never restate a claim, alter a threshold, or override a tier | Drift between the site and the evidence base |
| **S6** | **Absent data fails the build.** Required queries assert non-empty. Fallback is explicit and labeled | Silent degradation — today's most dangerous behavior |
| **S7** | **Shared records, local composition.** Signals, claims, and shocks are shared and reused; how they are arranged is always local | Duplicate per-project signal rows |
| **S8** | **Read-only, one direction.** No write-back, ever | Notion becoming a database the site mutates |
| **S9** | **Every knowledge record carries a case-study relation and an evidence tier.** No untiered, unattributed record reaches publication | Unsourced claims on a page naming a real business |
| **S10** | **Reuse before create — for databases and for records.** A new database must serve ≥2 potential case studies; a new signal must not already exist | One-off Rock Creek structures |

### Conflict resolution

When Notion and the repository disagree about a **fact**, Notion wins and the repository is corrected. When they disagree about **presentation**, the repository wins and the Notion property should not have existed. If it is unclear which kind of disagreement it is, the boundary is drawn wrong — fix the boundary rather than picking a winner.

---

## 7 — Phase 3 subphases, gated

Each subphase has an entry gate and exit criteria. **None may begin before its gate is satisfied.**

| # | Subphase | Entry gate | Exit criteria |
|---|---|---|---|
| **3.0** | **Live verification** *(read-only)* | Credentials available | Verification report resolving all 4 ⚠ items; Phase 2 schema confirmed or explicitly amended. **← CURRENTLY BLOCKED** |
| **3.1** | Prerequisite corrections *(repo only, no Notion)* | 3.0 complete | Landing-page drift fixed; four-tier vocabulary restored (18 literals); `data/projects.ts` updated; `.env.local.example` added; frame decision recorded in foundation doc §0 |
| **3.2** | Notion schema creation | 3.1 complete + amended Phase 2 design | 5 databases created, 2 extended, per confirmed design. Governance views for G1/G2/G5 built. **No repo code touched** |
| **3.3** | Access-layer extraction | 3.2 complete | `lib/notion/*` with db registry, `queryAll`, property readers, ID-returning relation resolution, build assertion. `lib/notion-os.ts` refactored onto it with **zero behavior change** — the ESD OS page renders identically |
| **3.4** | First consumer *(one route only)* | 3.3 complete | One Rock Creek route reads Notion-owned records through a projection interface. Proves the pattern end-to-end. Everything else untouched |
| **3.5** | Remaining Rock Creek routes | 3.4 reviewed | `/explorer`, `/systems`, `/dashboard` migrated to the Phase 2 A/B/C split. Class-C content unchanged |
| **3.6** | ESD OS page onto shared layer | 3.5 complete | The original consumer uses the same infrastructure. Static fallbacks re-evaluated against S6 |
| **3.7** | Second-case-study proof | 3.6 complete | A Shore Lodge skeleton renders from existing databases with **zero new databases and zero new access-layer code**. This is the test the whole architecture was designed to pass |
| **3.8** | Cleanup | any time after 3.1 | Delete `lib/api/notion.js` and the three dead API routes; resolve the dual-pipeline split; relocate the Figma Make export |

**Rollback posture.** Through 3.3 nothing user-visible changes. From 3.4 each subphase touches one route, so any regression is revertable in isolation. Do not batch 3.4 and 3.5.

---

## 8 — Open decisions

Three items this architecture identifies but does not decide.

1. **Practice Principles as a Notion database?** The narrative-canon slot in §2 is a *candidate*, not a recommendation. The practice's philosophy currently lives in eight `practice-*.md` documents. Those are long-form argument and should stay markdown. What could justify a database is the **atomic, quotable principles** that recur across project pages and must stay verbatim-consistent. Decide in 3.6 or later — not needed for Rock Creek.

2. **Sync-to-JSON evolution.** As databases grow, every deploy hits the Notion API and build times rise. A CI step that fetches once, commits typed JSON, and builds from the committed data would give reproducible builds, offline development, and a reviewable diff of content changes. **Trigger to revisit:** Notion fetching exceeds ~30s of build time, or a build fails from API rate limiting. Not now.

3. **Systems-model definitions as records.** §3 assigns model *definitions* to Notion, but Phase 2 defined no database for them. If Sense→Interpret→Decide→Adapt→Learn is to be cited by multiple case studies, it needs a home — plausibly `Experience Patterns`, which may already serve this purpose. **This is a fifth question for the 3.0 verification pass.**

---

## 9 — Phase 3 exit gate

**Phase 4 must not start until all ten items are satisfied.** Each is binary — satisfied or not. Partial completion does not advance the gate.

| # | Requirement | Status | Evidence of completion |
|---|---|---|---|
| 1 | `.env.local` restored with `NOTION_API_KEY` | ⛔ | File present; key loads |
| 2 | `introspect-notion-os.mjs` run successfully | ⛔ | Full output captured and committed as a schema snapshot |
| 3 | Existing `Systems Layers` options inspected | ⛔ | Option list recorded; Loop Nodes reuse-vs-create decided |
| 4 | Existing `Experience Patterns` semantics inspected | ⛔ | Collision with System Tensions confirmed or ruled out |
| 5 | Five-database property/type inventory captured | ⛔ | Every property, type, and option recorded |
| 6 | Existing/unwired `Environmental Signals` database checked | ⛔ | Confirmed absent, or found and reconciled. **Note: the introspect script cannot answer this** — needs a workspace search |
| 7 | Systems-model-definition question resolved | ⛔ | §8.3 — where model definitions live, decided |
| 8 | Phase 2 amendments recorded | ⛔ | Amendments written into the Phase 2 document, or "no amendments" stated explicitly |
| 9 | Phase 3.1 prerequisite corrections completed | ⛔ | Landing-page drift fixed; four-tier vocabulary restored; `data/projects.ts` updated; `.env.local.example` added; frame decision recorded in foundation doc §0 |
| 10 | Final Phase 2 + Phase 3 architecture lock issued | ⛔ | A dated lock statement naming the confirmed schema and architecture as frozen for Phase 4 |

**Item 9 is the one most likely to be skipped**, because it is repository work sitting in the middle of a Notion sequence. It is a hard gate regardless: the landing page currently advertises frameworks `/systems` no longer contains, and the evidence vocabulary is missing the tier the foundation document calls most important. Building a system of record on top of content that is known-wrong encodes the error permanently.

**Item 10 is not ceremonial.** The lock is what lets downstream work — including agent-driven work — proceed without re-deriving decisions or quietly re-opening settled ones.
