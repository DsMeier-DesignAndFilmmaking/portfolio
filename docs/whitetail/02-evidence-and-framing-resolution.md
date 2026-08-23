# Phase 01b — Evidence Integrity & Project Framing Resolution

**Purpose:** Resolve the two blockers identified in [`01-system-planning.md`](01-system-planning.md) §11 (Q1 missing source register, Q2 property framing) before Phase 02 System Modeling.
**Scope:** Documentation and strategic alignment only. No product redesign, no UI, no new research, no invented sources.

**Deliverables produced:**

| # | Output | Location |
|---|---|---|
| 1 | Executive summary | *this document, §1* |
| 2 | Source Register | [`source-register.md`](source-register.md) |
| 3 | Citation Integrity Review | [`source-register.md`](source-register.md#citation-integrity-review) |
| 4 | Property Framing Analysis | [`property-framing-analysis.md`](property-framing-analysis.md) |
| 5 | Recommended Operating Model | [`property-framing-analysis.md`](property-framing-analysis.md#4--recommendation) |
| 6 | Required Handoff Updates | *this document, §2* |
| 7 | Updated wording for affected sections | [`research-to-design-handoff-v3.md`](research-to-design-handoff-v3.md) |
| 8 | Remaining risks and ambiguities | *this document, §3* |
| 9 | Go / No-Go recommendation | *this document, §4* |

---

## 1 — Executive summary

Both blockers are resolved. Neither resolved the way the task anticipated, and the project is materially stronger for it.

### Blocker 1 — the source register

**The register was not missing. It never existed.**

Forensic audit of the citation pattern shows a two-level scheme: `[N, MMM]` = `[document N, passage MMM]`. Every high-numbered citation appears only paired with a low one — the signature of a notebook-style research tool whose internal pointers lost their anchor when the brief was exported as standalone prose. The numbers were never a bibliography.

Two further findings confirm this and rule out rehabilitation:

- **The numbering is unstable.** Between v1 and v2, citations changed with no change in the underlying claim. `[3]` and `[79]` were eliminated entirely; `[7]` appears in neither version. A register that loses members between drafts is not a register.
- **The claims are untraceable.** A substantial research corpus *does* exist — **26 synthesis documents dated 2026-08-02**, eighteen days before the handoff. Traceability testing across all 26 returned **zero** support for the handoff's headline claims: 1,300 acres, 7,200 yards, the 10-mile-biking-to-20-km-Nordic conversion, 102°F peaks, flat-rate housing utilities, "Pencross."

**And the inverse is worse.** The corpus's best-attested facts are absent from the handoff entirely: Audubon ACSP (**24 of 26 documents**), the 1.78 CFS diversion limit (**22**), Payette Lake (**19**), the Firewise wildfire-buffer role (**13**), Water Right No. 78-12476 (**11**), the 89-acre legal irrigation cap (**5**).

> **The handoff was built on the weaker of two available source sets.** Its two most-cited sources — `[2]` and `[5]`, carrying 49 of 85 citations and nearly every headline fact — are unidentified documents.

**Resolution:** a four-tier register (`[P]` primary · `[S]` secondary synthesis · `[O]` observation · `[U]` unresolved) built entirely from material that actually exists. The v2 numbers are **retired, not renumbered** — renaming `[5]` to `[S5] Property Overview` would grant an unidentified document a title it has not earned. They survive as `[U:2]`, `[U:5]`, preserving the audit trail while making unverifiability visible at every point of use.

### Blocker 2 — property framing

**Resolved on unusually clean evidence: Model B — two operational domains, one shared stewardship system.**

The decisive fact is legal. Water Right No. 78-12476 is held by a single entity, **"Shore Lodge Whitetail LLC"** — one 1.78 CFS diversion limit and one 89-acre irrigation cap governing both landscapes. Supported by one operational HQ, one management hierarchy explicitly spanning *"Golf, Parks, and Janitorial… under one roof,"* and an environmental envelope in which **not one condition in the entire corpus applies to one name and not the other.**

- **Model A** (one property) rejected — requires asserting the two names denote one place, which nothing supports, and it deletes the project's most interesting systems property.
- **Model C** (two case studies) rejected — you cannot write two independent stewardship case studies about one water right. Shore Lodge operations are a named *data gap*, not a subject. It would also make four adjacent ranch/resort case studies in this portfolio.

**One structural refinement to Model B:** *two operational domains, not two product experiences.* Read literally, "two experiences" would duplicate the product per property. The four experiences from `01-system-planning.md` §8 are organized by posture (field vs. management), not by property, and stay as they are.

**Naming correction:** "Whitetail Shore Lodge" appears in no source. Adopt **"Whitetail Club & Shore Lodge."**

### The net effect on the project

The audit removed eight unsupported claims and replaced them with better-evidenced material. **Problem Domain B is the clearest gain:** it rested entirely on an untraceable bike-to-Nordic trail conversion. The corpus's actual seasonal-transition document describes an agronomy→winter-infrastructure pivot containing *named, irreversible, time-boxed decisions* — a 48-hour snow mold window, an irrigation blowout "point of no return." That is far better decision-support material than a trail conversion. The domain was strengthened by losing its original evidence.

**A new central constraint emerged.** The 1.78 CFS ceiling across an 89-acre cap, held by one entity against a documented expanding footprint, is legally binding, genuinely zero-sum, and shared across both domains. It now anchors the Central Systemic Problem, Design Principle 4, and Problem Domain C — replacing the untraceable housing-utility thread that `01-system-planning.md` had already demoted on independent grounds (Refinement 3). **That earlier judgment is now confirmed by evidence rather than reasoning.**

### Two issues surfaced that were not in scope

Both affect publication and neither can be resolved from documents:

- **The research corpus names real, identifiable private individuals** in operational roles, with described routines and, in one case, a named tenure treated as a knowledge-loss risk. **Recommendation: anonymize to role titles unconditionally.** Costs the narrative nothing.
- **Provenance of observed material is unresolved for publication.** Some project material appears to reflect direct observation rather than desk research. Per [`00-project-governance.md`](00-project-governance.md) §7 this is **PRIVATE / UNRESOLVED FOR PUBLICATION** — no characterization of the project's relationship to the property is drawn or recorded. The narrow open question is whether observed conditions may be cited and whether the standing disclaimer may be published as written. **Design is unaffected; only publication waits.**

---

## 2 — Required handoff updates

All applied in [`research-to-design-handoff-v3.md`](research-to-design-handoff-v3.md). Not a rewrite — only affected sections changed; approved content preserved verbatim, with a change log at the top.

### Claims removed (8)

| Claim | Citation | Reason |
|---|---|---|
| 1,300-acre footprint | `[U:5, 69]` | Untraceable; `[S1]` gives a different and specific spatial picture |
| 7,200-yard course | `[U:5]` | Untraceable |
| 10 mi biking → 20 km Nordic | `[U:5, 73]` | Untraceable; **Domain B's entire evidence base** |
| 102°F summer peaks | `[U:4, 67, 144]` | Untraceable |
| Flat-rate paycheck-deducted housing utilities | `[U:2, 14]` | Untraceable; out of product boundary |
| Weekday-only check-in windows | `[U:2, 28]` | Untraceable; was load-bearing for Principle 2 |
| 2.5-hour Boise transit | `[U:2, 26]` | Untraceable |
| "Pencross" turf | `[U:5]` | Untraceable; corpus says "Dominator Bentgrass" |

### Claims added (5)

1.78 CFS diversion limit and 89-acre irrigation cap `[P1]` · Water Right No. 78-12476 and the Adams/Valley county-line discrepancy `[P1]`, `[S10]` · Audubon ACSP obligations `[P3]` · Firewise wildfire-buffer role `[P4]` · incomplete buried-utility as-builts as a named risk `[S1]`, `[S4]`.

### Claims re-sourced (5)

Seasonal turnover and long-tenure dependency → `[S2]`, `[S4]` *(the project's best-supported claim and its thesis)* · Payette Lake shoreline → `[S3]`, `[S8]` · winter snowpack → `[S8]`, `[S9]` · "Wild Lands. Luxe Living" → `[S2]` · turf species → `[S2]`.

### Structural changes

New §0 Evidence Boundary · header renamed to "Whitetail Club & Shore Lodge" with entity of record · system-model loop closure made explicit · Product Boundary added (*not a facilities/utility-billing dashboard*) · Design Opportunity added (*Regulatory Compliance Ledger*, contingent on Q-E) · Instruction 5 replaced (housing utilities → water-right ceiling) · Instruction 10 rewritten (HR silos → operational domains) · Instruction 13 added (anonymize individuals) · **quantified ROI claims removed** from narrative beat 8.

---

## 3 — Remaining risks and ambiguities

| ID | Item | Severity | Blocks |
|---|---|---|---|
| **Q-A** | **Whether observed conditions may be cited, and whether the standing disclaimer may be published as written.** Relationship status is PRIVATE / UNRESOLVED per governance §7 and is not characterized. | **High** | **Publication** |
| **Q-F** | **Anonymization of named individuals.** *Recommended: yes, unconditionally.* | **High** | **Publication** |
| Q-B | Retrieval of `[P1]` water right and `[P2]` City of McCall records — both appear to be public. | Medium | Nothing — **highest value action available** |
| Q-C | Whether `[U:2]` and `[U:5]` still exist in the originating research environment. If recoverable, several removed claims could be restored. | Medium | Nothing |
| Q-D | Whether the Adams/Valley county-line discrepancy is real or a research artifact. | Medium | Publishing that claim either way |
| Q-E | Whether the property is actually ACSP-certified. Attested in 24 of 26 corpus documents, never verified. | Medium | The Compliance Ledger opportunity |
| A1 | That Whitetail Club and Shore Lodge are two distinguishable operational domains — inferred from naming and one facility inventory, not directly sourced. | Medium | Nothing — carried as a stated assumption |
| — | **Coverage asymmetry.** Research depth is overwhelmingly Whitetail Club grounds; Shore Lodge operations are a named data gap. | Medium | Any claim of Shore Lodge operational depth |
| — | Corpus is **secondary synthesis**, one remove from primaries — supports *Source-Reported*, not *Verified Fact*. | Medium | Verified-Fact claims |
| — | Roadmap conflict: practice documents list Shore Lodge and Whitetail Club as two future case studies; Model B consumes both. | Low | Nothing — deliberate; net reduction in an already-crowded territory |

---

## 4 — Go / No-Go recommendation

> ## ✅ GO for Phase 02 — System Modeling
> ## ⛔ NO-GO for publication until Q-A and Q-F are resolved

**These are different gates, and the distinction matters.** System modeling is internal work on an evidence base that is now honest and a framing that is now decided. Publication exposes a real, named business and real, named individuals — and that gate is not yet clear.

### Why Phase 02 can proceed

| Success criterion | Status |
|---|---|
| Every citation can be traced | **Met, honestly.** Every citation resolves to a register row — including `[U:*]` rows that resolve to *"unresolved, do not state as fact."* Visible unverifiability satisfies traceability; hidden unverifiability does not. |
| Every evidence claim can be explained | **Met.** Four tiers, per-source contributions, and a full claim-by-claim integrity review. |
| Property relationships explicitly defined | **Met.** Model B, on legal-entity evidence, with shared geography, shared concerns, and distinct domains defined. |
| Portfolio narrative remains coherent | **Met — improved.** Domain B is better evidenced than before; the water-right ceiling is a stronger spine than the housing-utility thread. |
| Stewardship system has a defensible scope | **Met.** Two domains, one record, four capabilities, four experiences. |
| No unsupported assumptions promoted to facts | **Met.** Eight removed; two framing assumptions stated openly rather than hidden. |
| Ready for system modeling | **Met.** |

### Conditions on the GO

1. **Phase 02 uses handoff v3 and the register as sole evidence basis.** v2 is superseded; do not cite it.
2. **No `[U:*]` claim may be stated as fact** in any Phase 02 artifact.
3. **Model the system across both domains; model depth only where evidence is deep.** Shore Lodge stays in scope structurally without acquiring invented operational detail.
4. **Use role titles, never names**, in every artifact from this point — regardless of how Q-F resolves.

### Before publication

Resolve **Q-A** and **Q-F**. `[P1]` and `[P2]` are **no longer characterized as the highest-value next action** — under [`00-project-governance.md`](00-project-governance.md) §2 and §9 they are *Useful for Strengthening / potentially Required for Publication of specific claims*, explicitly **not Required for Phase 02 Design**. Retrieve them only if a published claim depends on one.

### One honest note on what this audit cost

The evidence base is now smaller and better. Eight claims were removed, five were re-sourced, five were added, and the project's central constraint changed from an untraceable billing arrangement to a legally binding water right. **A case study whose stated subject is evidence integrity cannot be built on citations that resolve to nothing** — and the corrected version is the more interesting one to design against.
