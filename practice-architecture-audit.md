# Practice Architecture Audit — Research Practice vs Services

> Strategic audit of `/projects/research-practice/` and `/services/`
> Scope: Information architecture, UX strategy, content strategy, narrative design, conversion, positioning, SEO, scalability.
> Status: Analysis only — no changes implemented.
> Date: 2026-07-01

---

## Executive Summary

The two pages are **not duplicates competing for the same job — they are two different stages of one funnel**, and the codebase already proves it: `research-practice` links forward to `/services` ("View Services"), and `services` links back to `research-practice` as its "Method source." That bidirectional dependency is the strongest possible signal that each page owns distinct territory.

- **`/projects/research-practice/`** is the **intellectual home** of the practice — the thesis, the four-capability vocabulary, and the pipeline of actual IP (Research OS → Frameworks → Concepts → Experimental Builds). Its job is *authority and proof-of-thinking*. Visitor intent is exploratory and low-commitment.
- **`/services/`** is the **commercial offer** — three productized engagements, a process, fit boundaries, an FAQ, and a scoping-call conversion. Its job is *qualification and inquiry*. Visitor intent is evaluative and high-commitment.

Merging them would fuse a "browse my thinking" experience with a "buy a bounded engagement" experience — two opposite psychological modes — into one very long page. That **weakens conversion, dilutes the authority play, and reduces scalability** as frameworks, publications, and field guides accumulate.

**Recommended direction: Option B — keep both pages, sharpen each page's role, and fix the two real structural defects** (the `/projects/` URL burial of the practice page, and two competing capability taxonomies). Do **not** merge. **Confidence: High.**

The genuine problems are *not* "two pages exist." They are:

1. The flagship thesis page lives at a **portfolio-item URL** (`/projects/research-practice`) that undersells it and fragments topical authority.
2. **Two different vocabularies** describe what the practice does (capabilities vs. engagements), creating a subtle taxonomy conflict.
3. The **`Foundations & Philosophy` block on Services** partially re-states credibility that Research Practice already embodies — a moderate, fixable duplication.

---

## Detailed Audit

### 1. Purpose Analysis

| Dimension | Research Practice (`/projects/research-practice`) | Services (`/services`) |
|---|---|---|
| **Primary purpose** | Demonstrate original systems thinking as a body of IP | Convert qualified visitors into scoping calls |
| **Secondary purpose** | Feed credibility into the commercial offer | Explain *how* to engage and *whether* there's a fit |
| **Primary audience** | Research collaborators, product/innovation leaders evaluating depth, hiring managers | Founders, product leaders, AI/ops teams ready to buy |
| **Secondary audience** | Curious peers, future-client "top of funnel" | Skeptics doing due diligence before inquiry |
| **Primary CTA** | Explore the pipeline (self-directed browsing) | "Start a Scoping Call" |
| **Supporting CTA** | "View Services" / "View Professional Validation" | "Explore Engagements" / links to method + delivery proof |
| **Visitor intent** | *"Does this person actually think in systems?"* | *"Can this person solve my specific problem, and how?"* |

**Verdict:** Each page has a genuinely unique responsibility. This is the textbook boutique-consultancy split of **thought-leadership vs. commercial offer**. The responsibilities do not collapse into one another.

---

### 2. Content Ownership & Overlap

**Estimated overlap: Moderate** (roughly 20–30%), concentrated in three places:

1. **Positioning language** — both open with "independent systems design" across "physical / digital / operational" layers. This is *intentional reinforcement*, not harmful duplication. Keep, but ensure the headline claims are phrased distinctly (thesis-voice vs. offer-voice).
2. **Credibility / proof** — Services' `Foundations & Philosophy` block ("10+ years…", "Published frameworks…") **re-asserts** what Research Practice *demonstrates* by showing the actual pipeline. This is the one duplication worth reducing: Services should *point to* the proof, not re-list it.
3. **Taxonomy conflict (the most important finding)** — the practice is described with **two non-matching vocabularies**:
   - Research Practice capabilities: *Systems Infrastructure · Decision Support & Wayfinding · Adaptive Stewardship · Service Recovery*
   - Services engagements: *Systems Audit · Adaptive Logic Framing · Structural Design Strategy*

   A sophisticated visitor moving between pages cannot map one onto the other. This is a coherence risk that merging would *not* fix — it needs a deliberate reconciliation regardless of architecture.

**Single source of truth assignments:**

- *Frameworks / concepts / builds (the IP)* → **Research Practice** (only).
- *Engagements / pricing posture / process / fit / FAQ* → **Services** (only).
- *Positioning thesis* → **Research Practice owns the canonical statement**; Services quotes a compressed version.
- *Credibility record* → **Research Practice demonstrates it; Services links to it.**

---

### 3. Narrative Architecture

The intended story is coherent and largely working:

> **Home** (who Dan is — the lens) → **Practice** (how he thinks — the IP) → **Case Studies / Client Work** (proof it ships) → **Services** (how to engage) → **Contact** (scoping call).

**Strengths:**

- Research Practice ends by pointing to Services *and* to Professional Validation — it deliberately hands the visitor forward.
- Services' "04 // Why This Practice" routes back to method + delivery, closing the loop.

**Gaps / friction:**

- **The practice page is reachable mainly via a "Projects" dropdown**, which frames the single most differentiating asset as just another portfolio item. The narrative says "this is a practice with original IP"; the IA says "this is a project."
- **No page explicitly names the relationship** between "capabilities" and "engagements," so the two taxonomies read as two different businesses.
- The narrative is *sequential but not enforced* — a visitor landing on Services cold gets credibility claims before they've seen the IP that backs them.

The pages **reinforce** rather than compete — but the reinforcement is undercut by URL/nav framing.

---

### 4. Information Architecture Assessment

**Rating: Acceptable, trending Confusing at the seams.**

Why not higher:

- Flagship thesis content sits at `/projects/research-practice` — a URL that signals "sub-item of Projects," not "core pillar." Nav exposes it only inside a Projects dropdown, while "Services" gets a top-level slot. The hierarchy inverts the strategic priority (thinking is the differentiator; services is the transaction).
- The mobile nav's "Site" group lists Home / Services / Contact but **omits the Practice page entirely** — the IP is invisible at the top level on mobile.

Why not lower:

- Content *within* each page is well-structured, numbered, and scannable.
- Cross-links exist and are semantically labeled.

**Improvement:** promote the practice to a top-level concept and give it a first-class URL (see Recommended Architecture).

---

### 5. User Journey Analysis

**Current dominant path (works, but fragile):**

```
Home → Projects dropdown → Research Practice → (View Services) → Services → Scoping Call
```

**Cold-inbound path (common for referrals / search):**

```
Google/LinkedIn → Services → credibility claims BEFORE seeing IP → (must click "Method source") → Research Practice → back to Services → Contact
```

The cold path front-loads *assertions* ("published frameworks") before *evidence*. That's the higher-friction route, and it's the one paid/referral traffic actually takes.

**Proposed lower-friction path:**

```
Home → Practice (top-level) → Case Studies → Services → Contact
```

…with Services always one click from Practice, and Practice always one click from Services.

The merge alternative (`Home → Practice → Contact`) *looks* shorter but forces a single page to switch the reader from exploratory to transactional mode mid-scroll — which increases cognitive load and bounce, not decreases it. **Separation with strong cross-linking wins on friction-adjusted-for-trust.**

---

### 6. Independent Practice Benchmarking

The established pattern among credible boutique consultancies, research studios, and design-led advisories (IDEO-style studios, independent strategy shops, systems/service-design practices, solo "practice" brands):

- **Thought-leadership / IP page or hub** (essays, frameworks, research, point of view) — builds authority, is browsed, is *evergreen and shareable*.
- **A distinct "Work with me / Services / Engagements" page** — productized, honest about fit, ends in a single conversion.

Almost none collapse these into one page once the IP corpus is non-trivial, because:

- **Separate** communicates *"a practice with a body of knowledge"* — highest authority signal.
- **Combined** communicates *"a freelancer with a rate card"* once you scroll to engagements — precisely the "freelance UX portfolio" positioning the brief wants to escape.
- **Hybrid** (a "Practice" hub that routes to Research and to Services) is common at scale but risks a **thin routing page** when the corpus is still young.

For this practice's stated 3–5-year ambition (frameworks, publications, field guides, speaking), the **separate-but-linked model is the industry-standard authority architecture.** The only adjustment benchmarking suggests is *elevating* the practice page from "project" to "pillar."

---

### 7. SEO & Discoverability

- **Search intent is different, not overlapping.** Research Practice targets *informational / topical-authority* queries ("systems design framework," "adaptive decision logic," domain terms). Services targets *commercial-investigation* queries ("systems design consultant," "AI logic strategy engagement"). Merging would force one URL to rank for two intents — generally *weakening* both.
- **The `/projects/research-practice` URL actively dilutes topical authority.** Burying the pillar under `/projects/` tells search engines it's a portfolio entry, not a topic hub. A top-level `/practice` (or `/systems-design-practice`) URL concentrates relevance and earns better internal-link equity.
- **Cross-linking is already good** for semantic clarity; keeping two focused pages *strengthens* the topical cluster (pillar page + commercial page + case studies all interlinking).

**Verdict: merging would weaken discoverability. Keeping them separate — and fixing the URL — strengthens it.**

---

### 8. Conversion Strategy

**Where it succeeds:**

- Services is a genuinely strong conversion page: recognition band ("Typical Problems"), productized engagements, honest fit table, FAQ pre-empting objections, single clear CTA. Don't disturb this.
- The "Not yet a fit" disqualification is excellent for lead quality.

**Where it breaks down:**

- **Cold visitors hit credibility claims before proof.** The `Foundations & Philosophy` list asserts authority the visitor hasn't yet earned belief in.
- **Two taxonomies** make the offer feel less coherent than the thinking.
- **The practice page's CTAs are soft** ("View Services," "View Professional Validation") — it hands off but doesn't *drive* toward the scoping call for a high-intent reader who's already convinced.

**Would merging help conversion? No.** A merged page would be long, and the transactional CTA would either sit far below the exploratory IP (buried) or interrupt it (jarring). The proven pattern is: let Practice build belief, let Services close — and make the bridge between them frictionless. Add a **single strong "Start a Scoping Call" CTA at the bottom of the Practice page** for readers who are already sold.

---

### 9. Scalability (3–5 years)

This is the decisive dimension.

As the corpus grows — more frameworks, publications, downloadable field guides, speaking, new research initiatives — a **merged page becomes unmaintainable and unreadable.** You cannot append a growing IP library *and* a commercial offer to one scroll.

- **Research Practice is designed to scale**: the pipeline accordion already ingests new projects by type from a data file. Adding frameworks/concepts/builds requires zero structural change. This is the natural **home for a future `/research` or `/writing` expansion.**
- **Services is designed to stay stable**: three engagements, a process, fit, FAQ. It should *resist* growth — a tight offer converts better than a sprawling one.

Separation lets each scale on its own axis (IP expands; offer stays sharp). Merging couples them, so every new framework destabilizes the conversion page. **Separation scales; merge does not.**

---

### 10. Decision Matrix

Scored 1 (poor) – 5 (excellent).

| Criterion | A: Keep separate, as-is | B: Keep both, redefine roles + fix URL/nav | C: Merge into one Practice page | D: Hybrid hub (Practice hub → Research + Services) |
|---|---|---|---|---|
| UX clarity | 3 | **5** | 2 | 4 |
| Content strategy | 3 | **5** | 2 | 4 |
| Conversion | 3 | **5** | 2 | 4 |
| Positioning | 3 | **5** | 3 | 4 |
| SEO | 2 | **5** | 2 | 4 |
| Scalability | 3 | **5** | 1 | 5 |
| Maintainability | 4 | **5** | 2 | 3 |
| **Total** | **21** | **35** | **14** | **28** |

**Winner: Option B.** Option D (hybrid hub) is the credible runner-up and the likely *evolution* of B once the IP corpus justifies a dedicated hub — but today a hybrid hub risks being a thin routing page, and it adds a third surface to maintain. Option C (merge) scores lowest on every strategic axis. Option A leaves the URL/nav defects unaddressed.

---

## Content Ownership Matrix

| Content area | Research Practice | Services | Action |
|---|---|---|---|
| Systems-thinking thesis / positioning | ✅ Canonical | ↩ Compressed quote | **Keep on RP; link/quote from Services** |
| Four capabilities vocabulary | ✅ Owns | — | **Keep on RP — reconcile with engagements** |
| Three engagements (Audit / Logic / Structural) | — | ✅ Owns | **Keep on Services** |
| Pipeline of IP (Research OS, Frameworks, Concepts, Builds) | ✅ Owns | — | **Keep on RP (single source)** |
| Process (scope → read → frame → handoff) | — | ✅ Owns | **Keep on Services** |
| Fit / "Not yet a fit" | — | ✅ Owns | **Keep on Services** |
| FAQ | — | ✅ Owns | **Keep on Services** |
| Credibility record ("10+ yrs", "published frameworks") | ✅ Demonstrated | ⚠ Re-listed | **Reduce duplication — Services links to RP as proof** |
| Professional / client-work validation | ↩ Links out | ↩ Links out | **Shared via links to `/projects/previous`** |
| Scoping-call CTA | ➕ Add one | ✅ Primary | **Add a bottom-of-page CTA on RP; Services stays primary** |

---

## Recommended Site Architecture

```
Home  (who — the lens, personal narrative)
  │
  ├──► Practice  ← promote from /projects/research-practice to top-level
  │      (how he thinks: thesis + capabilities + IP pipeline)
  │        │
  │        ├──► Case Studies / Client Work  (/projects/previous — proof it ships)
  │        └──► Services  (how to engage)
  │
  ├──► Services  (the offer: engagements, process, fit, FAQ)
  │        └──► Contact / Scoping Call
  │
  └──► (future) Research / Field Guides / Writing  ← expands UNDER Practice
```

**Movement rules:**

- **Practice ⇄ Services** must be reciprocal and one click apart (already true — preserve it).
- **Practice → Case Studies → Services** is the trust-building spine.
- **Every page terminates at the scoping call**, but only Services makes it the *primary* action.

---

## Navigation Recommendations

- **Primary nav:** `Home · Practice · Services · Contact` (+ Projects/Case Studies as a dropdown or under Practice). Give **Practice a top-level slot** — it is currently demoted inside a "Projects" dropdown, which contradicts the positioning.
- **Fix the mobile nav omission:** the mobile "Site" group lists Home / Services / Contact but not the practice page. Add **Practice**.
- **Footer:** you already list "Systems Design Practice" (Quick Links) and "Services & Engagements" + "Book A Scoping Call" (Learn More). Keep this, but align the label — the footer says "Systems Design Practice," the nav dropdown groups it under "Independent Research Practice," and the page `<title>` is "Systems Design Practice." **Pick one canonical name** for the practice and use it everywhere.
- **Contextual CTAs:** add a single "Start a Scoping Call" at the foot of the Practice page for already-convinced readers; keep Services' CTA primary.
- **Cross-linking:** maintain the "Method source ⇄ View Services" loop; ensure Case Studies link both ways too.

---

## URL Recommendations

- **Consolidate the practice URL.** Move `/projects/research-practice` → a top-level `/practice` (or `/systems-design-practice`). Add a permanent redirect (`redirectFrom` already exists on the project record type). This is the single highest-leverage IA change: it fixes positioning, SEO topical authority, and nav hierarchy at once.
- **Keep `/services`** unchanged.
- **Keep `/projects/previous`** as the client-work/case-study space (optionally alias to `/work` or `/case-studies` for clarity later).
- Do **not** consolidate the two pages into one URL.

---

## If a Merge Were Pursued (Not Recommended)

For completeness — should you ever choose Option C, here is the safe shape. This is **not** a recommendation.

- **Outline:** Thesis → Capabilities → *(bridge)* → Engagements → Process → Fit → Selected IP (linked, not embedded) → FAQ → Scoping Call.
- **Hierarchy:** IP browsing must stay *above* and *visually distinct from* the transactional block; the scoping-call CTA repeats at the fold and the foot.
- **Content ownership:** the full pipeline cannot live inline at scale — it must become a linked index, which effectively *recreates a separate Practice page*, revealing why the merge is self-defeating.
- **CTA strategy:** one primary (scoping call), one secondary (browse IP).
- **Transition plan:** redirect both old URLs; preserve anchor IDs; expect SEO turbulence while one URL re-ranks for two intents.
- **Migration risk:** loss of topical-authority separation, a very long page, and a positioning slide toward "freelancer with a rate card."

---

## Final Recommendation

**Keep the two pages separate. Do not merge. Adopt Option B: preserve Research Practice as the authority/IP pillar and Services as the commercial offer, then execute three fixes — (1) promote the practice page to a top-level `/practice` URL, (2) reconcile the "capabilities" and "engagements" vocabularies into one coherent map, and (3) replace Services' re-listed credibility with links to the proof the Practice page already demonstrates.**

**Confidence: High.**

Primary reasons:

1. The pages already cross-reference each other with explicitly distinct roles ("Method source" ⇄ "View Services") — the code itself demonstrates complementary, non-duplicative functions.
2. They serve **opposite visitor intents and funnel stages** (explore vs. buy); merging them fights established boutique-consultancy and content-strategy practice.
3. **Scalability is decisive** — the IP pipeline is built to grow; the offer is built to stay tight. Only separation lets each scale on its own axis.
4. The real problems (URL burial, taxonomy conflict, duplicated credibility) are **structural defects that a merge would not solve** and in some cases would worsen.

The only reason confidence is not "absolute": the two capability taxonomies suggest the underlying service model may still be stabilizing. If, over the next year, the engagement model consolidates toward a single named methodology, revisit whether Option D (a "Practice" hub routing to Research and Services) becomes the better long-term frame. Until then, B is the correct, lower-risk direction.
