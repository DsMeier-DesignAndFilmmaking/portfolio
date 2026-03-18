# System Diagram Principles

## Goal
Every system diagram should be **screenshot-worthy in 10 seconds.**

A hiring manager, design lead, or PM should be able to look at your diagram and immediately understand:
1. What the system does
2. How it works (at a structural level)
3. That the designer who made this thinks in systems

If they have to read a paragraph to understand the diagram, the diagram has failed.

---

## What a Strong System Diagram Shows

### Required Elements

**Inputs**
- Named data sources (not just "data")
- Layer-labeled: L1 (environmental/telemetry), L2 (user state), L3 (social/network), L4 (history/preference)
- Typed: real-time vs. pre-computed, observed vs. inferred

**Logic Layer**
- Named components with specific functions (not just "processor" or "AI")
- Decision rules visible: thresholds, weights, governors
- Suppression logic shown: what conditions prevent a suggestion from firing

**Outputs**
- Named surface types (ambient overlay, modal, card, notification)
- Tied back to the logic that triggered them
- Accompanied by confidence or quality signal if AI-generated

**Feedback Loops**
- User behavior feeds back into system calibration
- Loops are labeled with the signal being tracked
- Adaptation mechanism named (not implied)

---

## What a Strong Diagram Does NOT Show

- Every possible state (that's an engineering spec, not a design diagram)
- Generic boxes labeled "Frontend" / "Backend" / "Database"
- Arrows with no labels
- UI screens embedded in the flow (separate concern — show the logic, then show the UI)
- The happy path only — the most interesting diagrams show suppression, failure, and override paths

---

## Visual Style Principles

### Structure Over Decoration
- Use monospace or geometric type for labels — it reads as systematic
- Use whitespace aggressively — crowded diagrams are unreadable
- Align everything — misaligned nodes signal sloppy thinking
- No gradients, drop shadows, or decorative elements — they distract from structure

### Color as Signal, Not Style
- Use color to communicate layer or status, not aesthetics
- 3 colors maximum: one for inputs, one for logic, one for outputs
- Use opacity to show suppressed or inactive states
- Avoid color combinations that rely on hue alone — works in grayscale too

### Typography
- Section labels: all-caps, wide tracking, small size — reads as taxonomy
- Component names: sentence case, medium weight — reads as named entity
- Data values: monospace — reads as machine output
- Avoid italic for technical labels — use it only for human-facing narrative

### Hierarchy via Size and Weight
- The most important component should be the largest or boldest
- Supporting components should visually recede
- Annotations should be clearly secondary — smaller, lighter, indented

---

## Diagram Types for HADE

### 1. Full System Architecture (top-level)
Shows: all four layers (inputs → context engine → suggestion engine → trust layer → outputs) with the adaptation loop

Use for: portfolio hero, case study opening, interview whiteboard

### 2. Decision Tree (per module)
Shows: one component's internal logic — what conditions trigger what output, what suppresses

Use for: case study depth sections, engineering alignment

### 3. Interaction Timeline
Shows: one session over time — when the system is observing, when it first suggests, when it adapts

Use for: explaining the interaction model over time without showing screens

### 4. Constraint Map
Shows: named constraints → design decisions they forced → resulting system behavior

Use for: demonstrating systems thinking under pressure — strongest differentiator for hiring

---

## Inspiration References

### Stripe
- Documentation diagrams: extreme clarity, monospace labels, structured whitespace
- API flow diagrams: show input → processing → output with named intermediate states
- Lesson: structure is the message — the diagram earns trust before the reader reads a word

### Airbnb
- Trust and safety systems documentation: layers, thresholds, override paths all visible
- Design system documentation: components named, relationships typed, hierarchy clear
- Lesson: named relationships between components matter as much as the components themselves

### Anthropic
- Constitutional AI and safety specification diagrams: layered logic, feedback loops, suppression conditions shown
- Research paper figures: hypothesis → mechanism → evidence flow
- Lesson: the diagram communicates scientific rigor — same discipline applies to product systems

---

## The Screenshot Test

Before finalizing any system diagram, apply this test:

1. Screenshot the diagram
2. Reduce it to 50% size
3. Send it to someone unfamiliar with the work
4. Ask: "What does this system do?"

If they can answer correctly at 50% size, the diagram passes. If they cannot, simplify further.

**The goal is not completeness. The goal is immediate comprehension of the system's structure and purpose.**
