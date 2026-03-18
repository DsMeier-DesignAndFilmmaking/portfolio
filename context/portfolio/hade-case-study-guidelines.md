# HADE Case Study Guidelines

## System Name
**HADE — Holistic Adaptive Decision Engine**

## One-Line Frame
> A real-time adaptive travel decision system that converts environmental telemetry into context-aware suggestions — calibrated to the traveler's energy, time, and trust thresholds.

---

## Problem Framing

### The Human Problem
Travelers operate under invisible constraints: time pressure, energy depletion, decision fatigue, unfamiliar environments. Existing travel tools address location (maps) or discovery (recommendation) but not the *intersection* — the moment when a real-time condition makes a suggestion viable or not.

**The specific failure:** Travelers default to safe, known paths because they have no signal for whether exploring is currently viable. The cost of getting that decision wrong (missing a deadline, getting caught in rain, draining energy) is high. So they don't explore.

### The Design Problem
Build a system that can assess real-time viability of a detour, social connection, or discovery moment — and surface it only when conditions align. The UI must communicate confidence, not ask for effort.

### What This Is Not
- Not a navigation app
- Not a recommendation engine
- Not a social network
- It is the **decision layer** that sits behind all of the above

---

## System Overview

```
INPUTS → CONTEXT ENGINE → SUGGESTION ENGINE → TRUST LAYER → OUTPUT SURFACE
                ↑                                               |
                └─────────── ADAPTATION LOOP ←─────────────────┘
```

### Inputs
- L1 Telemetry: GPS location, weather (real-time), venue status, crowd density
- L2 User State: Activity type, energy estimate (time active, pace), schedule constraints
- L3 Social Graph: Proximity signals, trust degree, shared context, ZK-verified identity
- L4 Narrative History: Past detour acceptance, voice tone preference, spontaneity score

### Logic
- **Time-Buffer Slack**: Delta between current pace and hard arrival deadline
- **Dopamine Governor**: Rate-limits suggestion frequency to prevent decision fatigue
- **Relational Heuristics**: Weights social signals by trust degree and interaction friction
- **Narrative Weight**: Rates location significance based on user history and LLM synthesis

### Outputs
- Context-Aware Detour suggestion (ambient overlay, no required action)
- Social Proximity Alert (blurred reveal, ZK-verified handshake)
- Concierge Card (LLM-generated narrative tied to current moment)
- Daily Semantic Story (end-of-day reflection generated from system telemetry)

---

## Core Components

### 1. Context Engine
**Role:** Aggregates and interprets environmental and user signals in real time.

**Key logic:**
- Calculates Time-Buffer Slack: `available_time - estimated_travel_time = slack_delta`
- Tags current user state (exploring, in-transit, at-destination, energy-depleted)
- Validates weather windows: only suggests outdoor detours when 45min+ of clear conditions remain

**Constraints:**
- Must run inference in <200ms for suggestions to feel ambient rather than deliberate
- Pre-computation during idle state reduces runtime latency at the cost of 3-minute data staleness

---

### 2. Suggestion Engine
**Role:** Matches available moments to user context; suppresses suggestions when conditions don't meet threshold.

**Key logic:**
- CATDS (Context-Aware Travel Decision System): Detour viability based on time slack + weather + foot traffic
- Social Proximity Module: Surfaces connections only when trust degree ≥ 2nd, friction is low, and energy buffer is sufficient
- Spontaneity Calibration: Weights suggestions based on user's historical spontaneity score (planned vs. spontaneous ratio)

**Design decision:**
First version used modals (high friction). Acceptance rate: 12%. Switched to ambient overlay with opt-out mechanic. Acceptance rate: 61%. Lesson: the suggestion should not require a decision — it should be a permission slip.

---

### 3. Trust Layer
**Role:** Makes the system's reasoning auditable. Prevents the "black box" problem that kills AI-native products.

**Key components:**
- **Logic Receipt**: Every suggestion is accompanied by the data points that triggered it (e.g., "Weather: clear 45min / Slack: 42m / Traffic: low")
- **ZK-Proof Verification**: Social proximity signals are verified without decrypting PII — users see trust signals, not raw data
- **Source Freshness**: AI recommendations carry provenance and recency metadata — user can see when data was last validated
- **Confidence Display**: Shown as a percentage tied to input data quality, not just model output

**Why this matters for hiring conversations:** Trust layer design is the hardest part of AI product design. Most teams skip it. This is a differentiator.

---

### 4. Adaptation Loop
**Role:** The system learns from user behavior and updates its suggestion calibration over time.

**Key signals:**
- Detour acceptance/rejection rate → adjusts Time-Buffer Slack threshold
- Social alert dismissal rate → adjusts Dopamine Governor sensitivity
- Narrative engagement → updates voice tone preference
- Energy depletion patterns → refines L2 user state inference

**Framing for case study:** This is not personalization. It is a system that continuously re-calibrates its own thresholds based on observed behavior. The distinction matters.

---

## Real-World Constraints

| Constraint | Design Response |
|-----------|----------------|
| Latency must be <200ms | Pre-computation during idle; accept 3-min data staleness |
| Privacy: cannot store raw location server-side | Local-first processing + ZK-proof layer for social features |
| Notification fatigue is a real failure mode | Dopamine Governor: hard cap on suggestion frequency |
| Weather data has variable accuracy | Confidence score shown to user; suggestions suppressed under 70% confidence |
| Energy state is not directly observable | Inferred from time-active, step count, pace change — acknowledged as approximation |

---

## Interaction Model Over Time

| Session Phase | System Behavior |
|--------------|----------------|
| First 30 minutes | Observes, builds telemetry baseline, no suggestions |
| 30–60 minutes | First ambient suggestions if conditions meet threshold |
| 60–120 minutes | Full adaptation active; social proximity enabled if energy buffer sufficient |
| End of day | Semantic story generated from session telemetry |
| Multi-day | Spontaneity score and voice preference calibrated from history |

---

## Iteration and Failures

### Failure 1: Modal Suggestions
- **What broke:** Early version surfaced detour suggestions as modals requiring explicit yes/no
- **Why it failed:** Created a decision burden at exactly the moment the user needed to feel free
- **Fix:** Ambient overlay with opt-out. Removed the question; provided permission instead.

### Failure 2: Over-aggressive Social Alerts
- **What broke:** Proximity alerts fired for 2nd-degree connections without energy buffer check
- **Why it failed:** Users felt surveilled, not assisted. Dismissed alerts without reading.
- **Fix:** Dopamine Governor + energy buffer gate. Social alerts now require: trust ≥ 2nd degree + energy buffer ≥ 50% + friction score < 15min

### Failure 3: Opaque AI Suggestions
- **What broke:** Initial concierge cards had no visible reasoning
- **Why it failed:** Users didn't trust suggestions without provenance. Trust gap killed adoption.
- **Fix:** Logic Receipt UI — every suggestion shows the 3 data points that triggered it.

---

## Scaling Vision

**Phase 1 (current):** Single-user, single-session adaptive system
**Phase 2:** Cross-session learning — calibration persists across trips
**Phase 3:** Collective intelligence — anonymized trust signals from network (ZK-aggregated) improve suggestion quality for all users
**Phase 4:** API layer — context engine and trust layer exposed as infrastructure for third-party travel products

The long-term vision is not a travel app. It is a **context intelligence layer** that any travel product can plug into to make its suggestions feel ambient and earned.
