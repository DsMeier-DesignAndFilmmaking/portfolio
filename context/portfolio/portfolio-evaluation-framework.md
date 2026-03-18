# Portfolio Evaluation Framework

Use this rubric to audit any case study or portfolio piece. Score each dimension 1–5. A total score of 28+ indicates a strong, hireable case study.

---

## Scoring System

| Score | Meaning |
|-------|---------|
| 1 | Missing or placeholder |
| 2 | Present but generic |
| 3 | Competent, clear |
| 4 | Strong, specific, defensible |
| 5 | Exceptional — shows rare product depth |

---

## Dimensions

### 1. SIGNAL — First Impression Clarity
*Does the opening 10 seconds tell me who this is and what they built?*

| Level | Example |
|-------|---------|
| Weak | "A redesign of a travel app to improve user engagement" |
| Strong | "A real-time adaptive system that decides when a traveler can safely detour without missing their deadline" |

**Audit questions:**
- Can I explain what this product does in one sentence?
- Is the problem stated in human terms, not designer terms?
- Is the designer's role and ownership level immediately clear?

---

### 2. PROBLEM QUALITY
*Is the problem worth solving? Is it specific enough to be real?*

| Level | Example |
|-------|---------|
| Weak | "Travelers find it hard to discover new places" |
| Strong | "Travelers miss serendipitous detours because they have no signal for whether they can afford the time — so they default to the safe, known path" |

**Audit questions:**
- Is there a specific human behavior being changed?
- Is there a clear failure mode being addressed?
- Does the problem frame imply a system, not just a screen?

---

### 3. SYSTEM DEPTH
*Does the work show understanding of the full product, not just one surface?*

| Level | Example |
|-------|---------|
| Weak | Screens only, no logic diagram |
| Strong | Input → inference → output diagram with named components, data types, and decision rules |

**Audit questions:**
- Are inputs (data, signals, user state) defined?
- Is the logic layer (rules, weights, inferences) visible?
- Are outputs (UI surfaces, actions, notifications) shown as product of the logic?
- Are there feedback loops or adaptation mechanisms?

---

### 4. CONSTRAINTS
*Does the work show real-world pressure that shaped the design?*

| Level | Example |
|-------|---------|
| Weak | No mention of constraints |
| Strong | "Latency had to be under 200ms for the detour suggestion to feel ambient — longer and it becomes a decision, not a nudge. This forced us to pre-compute routes during idle state." |

**Audit questions:**
- Are technical, business, or human constraints named explicitly?
- Did constraints change the design direction?
- Is there evidence of designing under resource pressure?

---

### 5. DECISION-MAKING
*Can I see the designer making choices and explaining them?*

| Level | Example |
|-------|---------|
| Weak | "We explored several options and landed on this direction" |
| Strong | "We considered two approaches: real-time calculation vs. pre-computed buffers. Real-time was more accurate but introduced latency spikes. We chose pre-computation and accepted a 3-minute staleness window as acceptable for this use case." |

**Audit questions:**
- Are alternatives mentioned and rejected with reasoning?
- Are tradeoffs named explicitly?
- Does the designer show confidence in the decision?

---

### 6. ITERATION
*Is there evidence of the design changing in response to reality?*

| Level | Example |
|-------|---------|
| Weak | "After testing, we refined the design" |
| Strong | "The first version surfaced detour suggestions as a modal. Users dismissed them without reading. We moved the signal to an ambient overlay that required no action — opt-out instead of opt-in. Acceptance rate went from 12% to 61%." |

**Audit questions:**
- What broke, and why?
- What changed in response?
- Was the failure meaningful (reveals something about the system) or cosmetic?

---

### 7. TRANSFERABILITY
*Would a hiring manager at a different company see this as relevant to their problem?*

| Level | Example |
|-------|---------|
| Weak | Work is travel-specific with no abstraction |
| Strong | "The same context-aware buffer logic that powers detour suggestions could apply to any ambient recommendation system operating under hard time constraints" |

**Audit questions:**
- Is the underlying system pattern named and generalizable?
- Does the case study show a *class* of problem being solved, not just one instance?
- Would a product team working on a different domain see the relevance?

---

## Quick Audit Checklist

- [ ] Opening sentence explains product + problem without jargon
- [ ] System diagram present (not optional)
- [ ] At least one constraint named that changed the design
- [ ] At least one alternative considered and rejected with reasoning
- [ ] At least one iteration shown with before/after and reason for change
- [ ] Transferable pattern named at the end
- [ ] Total score: _____ / 35
