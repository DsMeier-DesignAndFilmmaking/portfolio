# Source Register

**Project:** Whitetail Shore Lodge — Stewardship Intelligence System
**Purpose:** Resolve Blocker 1 (missing source register) from `01-system-planning.md` §11 Q1.
**Method:** Forensic citation audit of `whitetail-research-to-design-handoff-v2.md` (and v1) against all research material available in the project environment.
**Status:** **Partially resolved.** A register has been reconstructed for the material that exists. The handoff's own sources `[1]`–`[8]` **could not be located and are not resolved.** See [Finding 3](#finding-3--the-handoff-and-the-research-corpus-are-two-disjoint-bodies-of-work).

> **No source was invented for this document.** Where a source could not be identified, it is recorded as `UNRESOLVED` and its claims are demoted. Where a source's *subject domain* could be inferred from the claims attached to it, that inference is labeled as an inference and never given a fabricated title.

---

## Executive findings

Five findings, in order of consequence.

### Finding 1 — The citation scheme is `[document, passage]`, not a flat source list

Every high-numbered citation in the handoff appears **only** in company of a low number, never alone:

| Pattern in handoff | Claim |
|---|---|
| `[5, 69]` | 1,300-acre property |
| `[5, 72]` | turf care |
| `[5, 73]` | trail care / bike→Nordic conversion |
| `[8, 141]` | waterfront care / Payette Lake |
| `[4, 67, 144]` | 102°F summer peaks |
| `[2, 13]` | transient seasonal crews |
| `[2, 14]` | paycheck-deducted housing |
| `[2, 26, 27]` | regional transit isolation |
| `[2, 28]` | weekday-only check-in windows |

This is a **two-level scheme**: the low number identifies a source document, the high number identifies a passage or chunk within it. It is the citation signature of a notebook-style research tool (chunk indices running into the hundreds).

**Consequence:** the missing register is not missing by accident. `[1]`–`[8]` were never a bibliography — they were internal pointers into a research environment, and they lost their anchor the moment the handoff was exported as standalone prose. **This is why no register exists to find.**

### Finding 2 — The citation numbering is unstable across revisions

Comparing v1 → v2 of the handoff, citations changed **without any change in the underlying claim**:

| Claim | v1 | v2 | What happened |
|---|---|---|---|
| "Wild Lands. Luxe Living" | `[4, 5]` | `[5]` | source dropped |
| flat-rate utility billing | `[2, 3]` | `[2]` | **`[3]` eliminated entirely** |
| Bentgrass / Pencross | `[5, 72]` | `[5]` | passage pointer dropped |
| 102°F summer peaks | `[4, 67, 144]` | `[4]` | passages dropped |
| housing utilities | `[2, 14, 79]` | `[2]` | **`[79]` eliminated entirely** |

`[3]` and `[7]` appear **nowhere in v2**. `[79]` was dropped between versions. A register that loses members between drafts is not a register; it is decoration.

**Consequence:** citation numbers in the handoff cannot be treated as stable identifiers. They must be retired, not renumbered.

### Finding 3 — The handoff and the research corpus are two disjoint bodies of work

The project environment contains a substantial research corpus — **26 synthesis documents dated 2026-08-02**, eighteen days before the handoff. It is specific, operationally rich, and internally cross-referenced.

**It shares almost no factual content with the handoff.** Traceability test, run across all 26 documents:

| Handoff headline claim | Files in corpus supporting it |
|---|---|
| 1,300-acre footprint | **0** |
| 7,200-yard course | **0** |
| 10 mi biking → 20 km Nordic | **0** |
| 102°F summer peak | **0** |
| flat-rate / paycheck-deducted housing utilities | **0** |
| Pencross | **0** |

| Corpus claim | Files attesting it | In handoff? |
|---|---|---|
| Audubon ACSP certification program | **24 of 26** | **absent** |
| 1.78 CFS water diversion limit | **22** | **absent** |
| Payette Lake / watershed | **19** | present (unquantified) |
| Firewise / wildfire buffer role | **13** | **absent** |
| 89-acre legal irrigation cap | **5** | **absent** |
| Water Right No. 78-12476 | **11** | **absent** |

**This is a complete inversion.** The handoff's most-cited facts (`[5]` × 25, `[2]` × 24) are untraceable, while the corpus's best-attested facts are missing from the handoff. The two were built from different source sets, and **the handoff was built on the weaker one.**

### Finding 4 — The corpus is secondary synthesis, not primary research

Every corpus document is an interpretive synthesis (several open in an analyst voice — *"As a GIS analyst… I have synthesized the spatial and regulatory data from the source material"*). They cite primary material that is **not held in the project environment**: a water right report, City of McCall planning records, an Audubon handbook, a wildfire study, equipment lease terms.

**Consequence:** the corpus is strong evidence of *what the primary sources say*, but it is one remove from them. It supports **Source-Reported Condition**, not **Verified Fact**, until primaries are produced.

### Finding 5 — Two integrity issues outside the citation question

Both were discovered during the audit and both affect publication.

**5a — The corpus names real, identifiable private individuals** in operational roles, with described daily routines, judgment patterns, and in one case a named 25-year tenure treated as a knowledge-loss risk. Publishing a case study that attributes decisions, limitations, or failure modes to named employees of a real, named business is a live privacy and professional exposure — regardless of accuracy. **Recommendation: anonymize to role titles before any published surface** ("a 25-year veteran superintendent," "the grounds director"). This costs the narrative nothing and removes the exposure entirely.

**5b — Provenance of any first-hand observation is unresolved for publication.** Some project material appears to reflect direct observation rather than desk research. Under [`00-project-governance.md`](00-project-governance.md) §7, the project's relationship to the property is **PRIVATE / UNRESOLVED FOR PUBLICATION**, and no conclusion about it is drawn, documented, or inferred here. What matters for this register is narrower and entirely separable: **whether observed conditions may be cited as a source tier, and whether the standing disclaimer may be published as written.** Both are held pending an explicit decision. Design proceeds unaffected. See [Q-A](#remaining-ambiguities).

---

## Register structure

Four tiers, because the material genuinely divides four ways. Tier assignment governs how a claim may be used in the portfolio.

| Tier | Meaning | Held? | Max portfolio usage |
|---|---|---|---|
| **P** — Primary | External documents of record (legal, regulatory, governmental, contractual). | **No** — cited by corpus, not present | Verified Fact **once produced**; Source-Reported until then |
| **S** — Secondary synthesis | The 26 research documents dated 2026-08-02. | **Yes** | Source-Reported Condition |
| **O** — Observation | First-hand site knowledge held by the author. | Pending | Observed Condition — **admissible only after Q-A is resolved** |
| **U** — Unresolved | The handoff's `[1]`–`[8]`. Not locatable. | **No** | **None.** Background Context at most, flagged as unverified |

---

## Tier P — Primary sources (cited by the corpus; not held)

These are named or described inside corpus documents. **Producing them is the single highest-value action available to this project** — each converts a cluster of Source-Reported claims into Verified Fact.

### [P1] Idaho Water Right Report — Water Right No. 78-12476 (Shore Lodge Whitetail LLC)

**Type:** Government record (Idaho Department of Water Resources)

**Key Evidence Contributed:**
- 1.78 CFS total diversion limit — the property's binding resource ceiling
- Legal irrigation cap of exactly 89 acres
- 320.5-acre place of use
- Permits for irrigation, domestic use, and fire protection
- Place of use filed in **Adams County** while the property sits in **Valley County**
- **Names the legal entity: "Shore Lodge Whitetail LLC"** — decisive for property framing

**Confidence:** High *(as a document type — it is a public record with a specific, quotable number)*
**Portfolio Usage:** **Verified Fact** once retrieved; Source-Reported until then
**Notes:** Retrievable from public IDWR records — this is the easiest and most valuable primary to obtain. The county-line discrepancy is reported consistently across corpus documents and is either a genuine filing defect or a research misreading; only the document settles it. **Do not publish the county-line claim until it is read directly.**

### [P2] City of McCall Planning & Zoning / City Council records

**Type:** Municipal government records
**Key Evidence Contributed:** PUD setbacks and subdivision approvals (Fairways at Whitetail Club — 39 units; Broken Timber 6.58 ac; Eagle Lake Phase II 4.37 ac; Camp Pinewood ~43.97 ac); 50-foot shoreline setback requirement; formal recognition of managed landscapes as non-burnable wildfire buffers; 12-foot snow storage easements; 20-foot emergency access widths.
**Confidence:** High *(public record)*
**Portfolio Usage:** Verified Fact once retrieved
**Notes:** Publicly requestable. Source of nearly every hard spatial number the corpus carries.

### [P3] Audubon Cooperative Sanctuary Program (ACSP) documentation

**Type:** Certification program handbook / certification records
**Key Evidence Contributed:** Triennial recertification cycle; required wildlife inventories and water-quality testing; Integrated Pest Management documentation; the "manage what you measure" compliance posture.
**Confidence:** High for the program's general requirements; **Unknown for Whitetail's actual certification status**
**Portfolio Usage:** Background Context for the program; **the property's participation is Source-Reported and unverified**
**Notes:** Attested in **24 of 26** corpus documents — the single most pervasive claim in the entire research body, and completely absent from the handoff. Program handbook is public; the property's certification status is not.

### [P4] Wildfire study — community barriers and development (McCall / regional)

**Type:** Technical study
**Key Evidence Contributed:** Wildfire driven predominantly by west/southwest winds, August–early October; managed landscapes as a "system of barriers"; localized east-wind reversal risk in at least one modeled area.
**Confidence:** Medium *(study identity not established; title and author unknown)*
**Portfolio Usage:** Source-Reported Condition
**Notes:** The corpus flags an internal conflict here (general west-wind model vs. localized east-wind modeling) — see [P4 vs. localized modeling] in the corpus contradiction map. Do not present wind direction as settled.

### [P5] Native plant directory (Idaho / local landscaping and erosion control)

**Type:** Reference directory
**Key Evidence Contributed:** Cold-hardy species suitable at elevation (Quaking Aspen, Englemann Spruce); erosion-control planting; failure of lower-elevation nursery stock.
**Confidence:** Medium
**Portfolio Usage:** Background Context

### [P6] Payette Land Trust materials

**Type:** Advocacy / conservation organization publication
**Key Evidence Contributed:** Perpetual conservation easements as a landscape-protection mechanism; state endowment land revenue argument.
**Confidence:** Medium — **advocacy source; carries a position**
**Portfolio Usage:** Background Context only
**Notes:** Explicitly advocacy. Must not be cited as neutral environmental assessment.

### [P7] PNC Equipment Finance lease terms

**Type:** Commercial contract
**Key Evidence Contributed:** Fleet lease structure; 600-hour annual usage ceiling; overage charges; the owned→leased fleet transition.
**Confidence:** Medium *(terms described in corpus, contract not held)*
**Portfolio Usage:** Source-Reported Condition
**Notes:** **Commercially sensitive.** Even if produced, specific financial terms should not appear in a public portfolio piece. Use the structural insight (leasing shifts labor from repair to stewardship), not the numbers.

---

## Tier S — Secondary synthesis corpus (held)

26 documents, all dated **2026-08-02**, in the project environment. Grouped by function. All share one Confidence and Portfolio Usage profile unless noted.

**Type:** Internal research synthesis (AI-assisted, analyst-voiced)
**Confidence:** **Medium** — internally consistent, densely cross-referenced, and specific, but one remove from primaries and not independently verified
**Portfolio Usage:** **Source-Reported Condition** — never Verified Fact on its own authority

### [S1] Research Project 001 — Whitetail Physical Boundary Audit
**Key Evidence Contributed:** Operational HQ at 501 West Lake Street, McCall ID 83638; 18-hole championship course plus "Tom's Ten" 10-hole par-3 on 35 acres; subdivision inventory with acreages; incomplete as-built documentation for buried utilities; the 89-acre vs. expansion conflict; the Adams/Valley county-line paradox.
**Notes:** The most spatially precise document in the corpus and the **direct counterpart to the handoff's unsupported "1,300-acre" claim.** Explicitly labels its own Unknowns and Conflicts — a good-faith document.

### [S2] Stewardship Operations Intelligence System — Whitetail Club & Shore Lodge
**Key Evidence Contributed:** Four-system model (Physical/Infrastructure, Environmental/Ecological, Human/Organizational, Knowledge/Intelligence); mechanic reportedly spends ~70% of time on reactive repair; institutional-memory dependency; Dominator Bentgrass; leverage-point analysis.
**Notes:** Lists **"facilities (Shore Lodge, Clubhouse)"** as components of one physical system — key framing evidence.

### [S3] Strategic Pillars of Whitetail Club and Shore Lodge Stewardship
**Key Evidence Contributed:** Five-pillar structure — water rights/irrigation, wildfire resiliency, watershed/shoreline protection, seasonal snow transition, institutional intelligence. 48-hour snow mold application window; irrigation blowout timing; 50-foot shoreline setbacks.

### [S4] Whitetail Club and Shore Lodge Stewardship Risk Analysis
**Key Evidence Contributed:** Five named blind spots, ranked; the 89-acre conflict as top research priority; technological skill-gap risk; the unquantified cost of institutional memory loss.
**Notes:** Unusually rigorous about its own limits. **Explicitly flags what is assumed vs. known** — the strongest evidence-discipline document in the corpus.

### [S5] Whitetail Stewardship Intelligence OS — User Roles and Journeys *(revised org structure)*
**Key Evidence Contributed:** Three-role structure (Grounds Director / Superintendent / Assistant Superintendent) with distinct mental frameworks; hour-by-hour decision timing.
**Notes:** **Supersedes [S6].** Contains named individuals — see Finding 5a. Also the document referenced in Finding 5b.

### [S6] Whitetail Club — Stewardship Intelligence and Operational User Journeys *(earlier org structure)*
**Key Evidence Contributed:** Five-role structure including VP of Maintenance, mechanic lead, and crew member; bilingual (English/Spanish) visual SOP requirement; bear-spray safety protocol; POGO/TDR moisture meter use.
**Notes:** **Superseded by [S5]** — role assignments differ because the organization restructured between documents. This is a revision, not a contradiction, but **the two must never be cited together** as if describing one org chart.

### [S7] The McCall Ecosystem — Stewardship and Operational Connectivity
**Key Evidence Contributed:** Five cross-system relationships; "The Great Melt" spring surface-water conveyance; knapweed in disturbed granitic soils; snow load and roof-shedding geometry; mentorship framed as a climate-adaptation mechanism.

### [S8] Whitetail Club and McCall Stewardship Intelligence Report
**Key Evidence Contributed:** Payette Lake as high-elevation glacial lake and regional water source; slopes exceeding 35%; snowpack November–April; late-frost growing constraints; frost delays; August–early October wildfire window.
**Notes:** Commendably explicit about a negative finding — states the Idaho Batholith is *not* named in its sources rather than assuming it.

### [S9] Whitetail Club — The Winter Transition System Map
**Key Evidence Contributed:** Winter transition modeled as agronomy→civil-engineering pivot; triggers, decisions, activities, risks, dependencies, outcomes; irrigation "Point of No Return"; 4–5 month construction window; October 1 fiscal year start.
**Notes:** **This is the corpus's actual seasonal-transition evidence — and it is about turf, irrigation, snow logistics, and fleet conversion. It contains no bike trails and no Nordic skiing.** Directly relevant to the handoff's Problem Domain B (see Citation Integrity Review, row C7).

### [S10] Stewardship System Contradiction Map
**Key Evidence Contributed:** Five documented source-vs-source conflicts, including the county-line paradox and the 89-acre cap.
**Notes:** **Methodologically the most valuable document in the corpus.** It does what this audit does, one level down. Its existence is evidence of genuine research discipline in the Aug 2 work.

### [S11] Stewardship Risk Register v1 · [S12] Stewardship Intelligence Data Model *(two near-duplicate copies)* · [S13] Research Repository Architecture · [S14] Stewardship Intelligence Research Roadmap v2 · [S15] Repository Migration Manifest · [S16] Research Synthesis & Next Directions
**Key Evidence Contributed:** Project-infrastructure layer — a six-folder repository blueprint, naming conventions, a Foundational vs. Exploratory classification, and named target primary documents.
**Notes:** [S13] names the primary documents the project intended to hold (water right audit, wildfire modeling, ACSP guide, shoreline setback enforcement). **This is the closest thing to an intended source register that exists, and it confirms the primaries were identified but never attached.** [S12] exists as two copies — deduplicate.

### [S17] ASC Opportunity Map · [S18] ASC Stewardship Operations Intelligence System Architecture · [S19] The Adaptive Stewardship Companion Framework
**Key Evidence Contributed:** 25 high-value opportunities; digital intelligence strategy; site-agnostic scaling logic.
**Notes:** **Scope caution — these belong to the Adaptive Stewardship Companion, a separate portfolio project.** Cited by the Whitetail corpus and partly about Whitetail, but they are not Whitetail sources. Keep the boundary clean.

### [S20] Conservation and Land Stewardship in the Payette Lake Basin
**Key Evidence Contributed:** **A prose summary of the primary source set** — the origin of [P3], [P5], [P6], [P4], and [P1].
**Notes:** The single most useful document for this audit. It is the only place where the primaries are described together.

### [S21] The McCall Stewardship Calendar · [S22] The McCall Architecture of Stewardship · [S23] Stewardship and Strategy — Managing the McCall Resort Environment · [S24] Whitetail Club — Ecosystem of Mountain Resort Operations · [S25] Whitetail Club — Ecosystem of Resort Stewardship and Operations · [S26] The Hierarchy of Resort Stewardship and Agronomic Intelligence
**Key Evidence Contributed:** Seasonal operational cadence; stewardship hierarchy; supporting ecosystem framing. Substantially overlapping with [S2], [S3], [S7].
**Notes:** High redundancy across this group. For citation purposes prefer [S2], [S3], [S7]; treat these as corroborating.

---

## Tier O — First-hand observation (pending authorization)

### [O1] Author's direct site knowledge — **STATUS: UNRESOLVED**

**Type:** First-hand professional observation
**Key Evidence Contributed:** *Not yet admissible — see below.*
**Confidence:** Potentially **High** — first-hand observation of a working landscape is among the strongest evidence a stewardship case study can carry
**Portfolio Usage:** **Observed Condition** — *available only if Q-A is resolved affirmatively and no confidentiality obligation applies*
**Notes:** The requested Portfolio Usage taxonomy includes "Observed Condition," which suggests this tier was always intended. It cannot be opened by this document. Per [`00-project-governance.md`](00-project-governance.md) §7, **an observed condition's evidentiary standing and its provenance are separable**: a claim may be carried internally as `[ODC]` while its origin is not exposed publicly. This tier therefore opens on an explicit decision about *publication of observed material*, not on any characterization of how the observation arose — which this project does not make.

---

## Tier U — Unresolved sources (the handoff's `[1]`–`[8]`)

**None of these could be located.** Subject domains below are **inferred from the claims each is attached to** — they are pattern inferences, not identifications. No titles are asserted.

| ID | Uses in v2 | Claims attached | Inferred domain *(inference only)* | Status |
|---|---|---|---|---|
| `[1]` | 1 | winter snowpack loading | climate/snow reference | **UNRESOLVED** |
| `[2]` | **24** | seasonal turnover, transit isolation, weekday check-in windows, paycheck-deducted flat-rate housing utilities | employee / seasonal housing documentation | **UNRESOLVED** |
| `[3]` | **0 in v2** (1 in v1) | flat-rate utility billing | — | **ELIMINATED between versions** |
| `[4]` | 7 | 102°F summer peaks, unseasonal heat | weather/climate dataset | **UNRESOLVED** |
| `[5]` | **25** | 1,300 acres, 7,200-yd course, turf species, trail network, bike→Nordic conversion, "Wild Lands. Luxe Living" | property overview / marketing material | **UNRESOLVED** |
| `[6]` | 4 | long-tenured employee dependency, turnover | workforce commentary or reviews | **UNRESOLVED** |
| `[7]` | **0 in v2** | — | — | **ABSENT from both versions** |
| `[8]` | 4 | Payette Lake shoreline, waterfront care | lake / shoreline reference | **UNRESOLVED** |

**Assessment.** `[2]` and `[5]` together carry **49 of the handoff's 85 citations** and supply nearly every headline fact in the case study — including all three problem domains' framing evidence. Neither can be traced. **The handoff's evidentiary base is two unidentified documents.**

---

# Citation Integrity Review

Every distinct claim-citation pairing in handoff v2, assessed. **Valid?** asks whether the citation can be traced and relied upon *today* — not whether the claim is false.

| Existing Citation | Claim it supports | Actual Source | Valid? | Action Required |
|---|---|---|---|---|
| `[5]`, `[5, 69]` | 1,300-acre footprint | Untraceable. **[S1] gives a different picture entirely** (320.5-ac place of use; 89-ac irrigation cap; 35-ac Tom's Ten; ~44-ac Camp Pinewood) | **No** | **Remove or re-source.** Replace with `[S1]`-backed figures, or state acreage as unverified. Do not publish "1,300 acres" as fact. |
| `[5]` | 7,200-yard championship course | Untraceable; corpus says "18-hole championship course" without yardage | **No** | **Remove yardage.** Retain "18-hole championship course" per `[S1]`. |
| `[5, 73]` | 10 mi biking trails → 20 km groomed Nordic | Untraceable. **[S9] documents the actual seasonal transition — turf, irrigation blowout, snow mold, fleet conversion — with no trail network at all** | **No** | **Remove.** This is Problem Domain B's entire evidence base. See Required Handoff Updates. |
| `[4]`, `[4, 67, 144]` | 102°F summer peaks | Untraceable | **No** | **Remove the figure.** Corpus supports heat/drought stress and an Aug–early Oct dry window qualitatively `[S8]`, `[P4]`. Use that instead. |
| `[2]`, `[2, 14]` | flat-rate, paycheck-deducted housing utilities | Untraceable. Corpus attests workforce housing **shortage** `[S3]`, not billing mechanics | **No** | **Remove as an evidence claim.** Already demoted to context in `01-system-planning.md` (Refinement 3). Now demote in the handoff too. |
| `[2, 26, 27]` | regional transit isolation | Untraceable | **Partial** | **Clarify.** McCall's remoteness is safely general knowledge; the specific "2.5-hour Boise transit" claim is not sourced. Keep the condition, drop the number. |
| `[2, 28]`, `[2, 14]` | weekday-only check-in windows | Untraceable | **No** | **Remove or re-source.** Load-bearing for Design Principle 2. |
| `[2, 13]`, `[2, 6]`, `[6]` | seasonal turnover; long-tenured dependency | **Strongly corroborated** by `[S2]`, `[S4]`, `[S7]`, `[S10]` (institutional memory, 25-year tenure, "tough to fill" seasonal roles) | **Yes — re-source** | **Rename.** Recite to `[S2]`, `[S4]`. This is the project's **best-supported claim** and its thesis. |
| `[5]` | Bentgrass / Pencross turf | **Partially corroborated** — corpus says **"Dominator Bentgrass"** `[S2]` | **Partial** | **Clarify.** Use "Dominator Bentgrass" per `[S2]`. Note: v1 rendered this as "Pencross and Bentgrass *townhome models*," conflating turf cultivars with residential units — evidence of a source-reading error. Drop "Pencross." |
| `[8]`, `[8, 141]` | Payette Lake shoreline / waterfront care | **Strongly corroborated** by `[S3]`, `[S7]`, `[S8]`, `[P1]` (50-ft setbacks, BMPs, IDEQ exposure) | **Yes — re-source** | **Rename** to `[S3]`, `[S8]`. Far better evidenced than the handoff claims. |
| `[1]` | extreme winter snowpack loading | **Strongly corroborated** by `[S3]`, `[S8]`, `[S9]` (Nov–Apr snowpack, 12-ft storage easements, roof-shedding design) | **Yes — re-source** | **Rename** to `[S8]`, `[S9]`. |
| `[5]` | "Wild Lands. Luxe Living" brand line | **Corroborated** by `[S2]`, `[S4]` | **Yes — re-source** | **Rename** to `[S2]`. |
| `[3]`, `[7]`, `[79]` | *(various, v1 only)* | Do not appear in v2 | **N/A** | **Remove** from the scheme. Confirms the numbering is not a register. |
| *(uncited)* | 1.78 CFS diversion limit; 89-acre cap; Audubon ACSP; Firewise buffer role; Water Right 78-12476 | `[P1]`, `[P2]`, `[P3]`, `[P4]`, `[S1]`, `[S3]`, `[S10]` | **Missing entirely** | **ADD.** The best-evidenced material in the project is absent from the handoff. |

### Summary of actions

| Action | Count | Claims |
|---|---|---|
| **Retain** | 0 | *No citation survives in its current form — the scheme itself is being retired.* |
| **Rename** (re-source to a traceable ID) | 5 | turnover/tenure · shoreline · snowpack · brand line · turf species |
| **Clarify** | 2 | transit isolation · turf cultivar naming |
| **Remove** | 7 | 1,300 acres · 7,200 yards · bike→Nordic · 102°F · flat-rate utilities · check-in windows · `[3]`/`[7]`/`[79]` |
| **Add** | 5+ | water rights · acreage cap · ACSP · wildfire buffer role · legal entity |

---

## Recommended citation convention

**Replace the opaque numeric scheme entirely.** Renaming `[5]` → `[S5] Property Overview` would give an unidentified document a title it has not earned — the opposite of traceability.

**Adopt: `[ID] Short Name — Tier`**

```
[P1] Water Right 78-12476 — Primary
[S1] Physical Boundary Audit — Synthesis
[O1] Site Observation — Observed
[U:2] Unverified — Employee Documentation
```

Rules:

1. **Tier letter is part of the ID.** A reader sees the evidence class before the content — the register becomes self-documenting.
2. **Every citation resolves to a row in this document.** No pointer without a destination.
3. **Unresolved sources keep the `U:` prefix and their original number** (`[U:2]`, `[U:5]`) — preserving the audit trail back to v2 while making unverifiability visible on every use. **This is the honest handling: the claim stays legible, and so does its weakness.**
4. **No passage-level numbers.** They were never resolvable outside the originating tool. Cite the document; quote directly if precision is needed.
5. **A claim carried by `[U:*]` alone may not be stated as fact** on any published surface.

**Why this is more defensible than renumbering:** it makes the evidence *class* impossible to overlook, it never invents a title, and it converts the project's biggest liability — 49 citations to two unidentified documents — into a visible, honest, and fixable state rather than a hidden one.

---

## Remaining ambiguities

| ID | Question | Blocking? |
|---|---|---|
| **Q-A** | **May observed conditions be cited, and may the standing disclaimer be published as written?** Governed by [`00-project-governance.md`](00-project-governance.md) §7 — relationship status is PRIVATE / UNRESOLVED and is not characterized by this project. Design is unaffected. | **Yes — publication only** |
| **Q-B** | Can `[P1]` (water right) and `[P2]` (City of McCall records) be retrieved? Both appear to be public. | No — but highest value |
| **Q-C** | Do the handoff's `[2]` and `[5]` still exist in the originating research environment? If recoverable, several removed claims could be restored. | No |
| **Q-D** | Is the Adams/Valley county-line discrepancy real, or a research artifact? | No — but do not publish either way until read |
| **Q-E** | Is the property actually ACSP-certified? Attested in 24 of 26 corpus documents but never verified. | No |
| **Q-F** | Will named individuals be anonymized? *(Recommended: yes, unconditionally.)* | **Yes — publication** |
