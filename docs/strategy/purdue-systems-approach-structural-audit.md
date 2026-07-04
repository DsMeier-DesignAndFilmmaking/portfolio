# Purdue Systems Approach Structural Audit

Read-only structural audit for the Purdue Graduate School project page.

Purpose: locate the existing **Systems Approach** content container, analyze its DOM architecture and stylistic primitives, and identify the safest terminal insertion node for a future Systems Architecture Deliverables Infrastructure Extension Block.

No code modifications, markup changes, routing changes, or asset injections were performed.

## 1. Codebase Geometry Scan

### File Path Discovered

- Route file: `app/projects/purdue/page.tsx`
- Rendering file: `components/PurdueProjectPage.tsx`
- Target module file: `components/SystemsModule.tsx`

The route imports and renders `<PurdueProjectPage />`. The actual Purdue page structure is owned by `components/PurdueProjectPage.tsx`.

### Target Container

The **Systems Approach** section is rendered through the reusable `<SystemsModule />` component in `components/PurdueProjectPage.tsx`.

Target usage:

- `components/PurdueProjectPage.tsx`, approximately lines `324-347`
- Component source: `components/SystemsModule.tsx`, export begins around line `69`

The target section is not bare MDX. It is a React component invocation with structured props:

- `eyebrow`
- `title`
- `intro`
- `metrics`
- `principles`
- `systemMap`
- `feedbackLoop`

### Target Container Sibling

Previous sibling:

- Performance section
- Tag: `<section>`
- ID: `performance`
- Class pattern: `py-20 bg-black/40`
- Ends immediately before the Systems Approach module.

Target sibling:

- Component: `<SystemsModule />`
- Renders a `<section>` internally.

Next sibling:

- Design in Progress section
- Tag: `<section>`
- ID: `design`
- Class pattern: `py-20 bg-white/5`
- Begins immediately after the Systems Approach module.

### Terminal Insertion Node

Safest Purdue-only insertion point:

```tsx
<SystemsModule ... />

{/* Insert future Purdue-only Systems Architecture Deliverables block here */}

{/* Design in Progress */}
<section id="design" className="py-20 bg-white/5">
```

This location preserves sibling-section architecture and avoids modifying the reusable `SystemsModule` globally.

Alternative global insertion point:

- Inside `components/SystemsModule.tsx`
- After the lower `lg:grid-cols-12` content grid
- Before the component's closing inner container and section tags

This is **not recommended** for a Purdue-specific extension because it would affect every page using `SystemsModule`.

### Existing Spacing Tokens Detected

Page-level neighboring section rhythm:

- Previous section: `py-20 bg-black/40`
- Target SystemsModule section: `bg-black py-20`
- Next section: `py-20 bg-white/5`

SystemsModule internal rhythm:

- Outer section: `bg-black py-20`
- Inner container: `container mx-auto px-6`
- Intro paragraph: `mt-6 max-w-3xl`
- Metrics grid: `mt-12 grid grid-cols-2 gap-6 md:grid-cols-4`
- Lower systems grid: `mt-12 grid gap-12 lg:grid-cols-12`
- Feedback loop block: `mt-10`

Recommended future extension rhythm:

- If appended as a separate sibling section but visually connected: use the same black surface and either `pt-0 pb-20` or `py-20` depending on whether the block should feel attached or independent.
- Use `container mx-auto px-6` to match the existing page geometry.
- Use `grid gap-12 lg:grid-cols-12` for major layout alignment or `grid gap-6` for card clusters.

### Active Responsive Grid Patterns

Detected nearby grid patterns:

- `grid grid-cols-2 gap-6 md:grid-cols-4`
- `grid gap-12 lg:grid-cols-12`
- `lg:col-span-5`
- `lg:col-span-7`
- `space-y-6`

Recommended alignment for a three-tier block:

- Use a single-column mobile stack.
- Use a three-card grid only if each tier has similar content weight.
- Use `lg:grid-cols-12` if one column needs explanatory context and the other carries the Substrate / Logic / Interface tier stack.

## 2. Color And Radii Matrix

### Primary Surface Background Token

Target container:

- `bg-black`

Nearby Purdue page surfaces:

- `bg-black/40`
- `bg-white/5`

### Structural Border Token

Target module border language:

- `border-white/10`
- `border-white/15`
- Hover state: `hover:border-white/25`

The component uses clean, low-contrast borders rather than high-shadow card treatment.

### Supporting Surface Token

Target module card/background language:

- `bg-white/5`
- `backdrop-blur-sm`

### Radius Constraint

Detected radius values:

- Metric cards: `rounded-xl`
- System map cards: `rounded-lg`

Interpretation:

- The page is not fully square/brutalist in the strictest sense.
- It uses restrained radii within a dark technical presentation system.
- Any extension should avoid larger, softer, or more decorative radii.

Recommended future extension radius:

- Use `rounded-lg` for tier cards if matching the system map cards.
- Avoid heavier radius values beyond `rounded-xl`.

### Typography Tokens

Primary section heading:

- Tag: `<h2>`
- Classes: `text-3xl font-bold text-white`

Intro text:

- Classes: `mt-6 max-w-3xl text-gray-300 leading-relaxed`

Small labels / metadata:

- Classes include `text-xs font-semibold uppercase tracking-[0.14em] text-gray-500`

Numeric / system labels:

- Uses `font-mono`
- Example pattern: `font-mono text-xs tabular-nums text-gray-500`

Body and technical notes:

- Primary font appears to be the default sans stack unless explicitly marked with `font-mono`.
- Technical metadata relies on small uppercase tracking and monospace numerics.

## 3. Stylistic And Systemic Accuracy Checks

### Zero-Gradient Law

Target SystemsModule container:

- No background gradient detected.
- No complex box-shadow detected.
- No heavy decorative radius detected.
- No ornate visual treatment detected.

Target module uses:

- `bg-black`
- `bg-white/5`
- `border-white/10`
- `border-white/15`
- `backdrop-blur-sm`
- `rounded-lg`
- `rounded-xl`
- `font-mono` for technical ordering labels

Important distinction:

- The broader Purdue page contains gradients and shadows elsewhere, including hero and screenshot treatments.
- The **Systems Approach** module itself follows a restrained dark systems language and should be matched locally.

### Typography Hierarchy Check

The Systems Approach heading hierarchy is clear:

1. Eyebrow / label: small uppercase tracking.
2. Section heading: `<h2>` with `text-3xl font-bold text-white`.
3. Intro paragraph: gray, relaxed line-height, constrained width.
4. Field labels: uppercase tracked technical labels.
5. Card titles: smaller white text, medium/semibold weight.
6. Supporting copy: gray text.
7. System indices: monospace numerics.

Future extension should preserve this hierarchy:

- Use one `<h3>` or label-level heading if appended inside the Systems context.
- Use `<h2>` only if the extension is a sibling section with its own standalone section identity.
- Keep technical labels in uppercase tracked small text.
- Use monospace only for system indices, tier IDs, or metadata.

### Semantic Anchor Point

Appending a new sibling `<section>` after `<SystemsModule />` is structurally safe.

Reasoning:

- `SystemsModule` is self-contained.
- It returns a complete `<section>` with a closed internal container.
- The next page block is an independent `<section id="design">`.
- There are no open wrappers or partially nested JSX structures around the module call.

Recommended insertion position:

- Directly after `</SystemsModule>` usage in `components/PurdueProjectPage.tsx`.
- Before the `Design in Progress` section comment and `<section id="design">`.

## 4. Integration Ready Signal

**YES.**

Appending a three-tiered architecture block directly after the Systems Approach target container can preserve standard DOM compilation without structural or responsive layout bugs, provided the block is added as a sibling section in `components/PurdueProjectPage.tsx`.

### Recommended Constraints For Future Implementation

The future Substrate / Logic / Interface block should:

- Preserve the existing dark surface language.
- Use `container mx-auto px-6`.
- Use clean borders such as `border-white/10`.
- Use `bg-white/5` for light card contrast.
- Use restrained radius, preferably `rounded-lg`.
- Use `font-mono` only for tier IDs or technical labels.
- Avoid gradients, heavy shadows, decorative glow, large badges, and dense annotations.
- Avoid modifying `SystemsModule.tsx` unless the extension is intended to become global.

### Integration Risk

Risk level: **Low** if appended as a Purdue-only sibling section.

Potential regression risk:

- Medium if inserted inside `SystemsModule.tsx`, because that component is reusable and may affect other project pages.
- Low if inserted in `components/PurdueProjectPage.tsx` between the Systems Approach module and Design in Progress section.

## 5. Final Audit Matrix

| Audit Node | Result |
| --- | --- |
| File Path Discovered | `components/PurdueProjectPage.tsx`; route owner `app/projects/purdue/page.tsx`; module source `components/SystemsModule.tsx` |
| Target Container Sibling | `<SystemsModule />` between `<section id="performance" className="py-20 bg-black/40">` and `<section id="design" className="py-20 bg-white/5">` |
| Existing Spacing Tokens Detected | `py-20`, `mt-6`, `mt-12`, `gap-6`, `gap-12`, `px-6`, `space-y-6` |
| Primary Surface Background Token | `bg-black` |
| Structural Border Token | `border-white/10`, `border-white/15`, `hover:border-white/25` |
| Radius Constraint | Existing `rounded-lg` and `rounded-xl`; avoid heavier radii |
| Typography System | `<h2>` section title, uppercase tracked labels, `font-mono` numeric metadata, gray supporting copy |
| Zero-Gradient Check | Target module passes locally; broader Purdue page contains gradients/shadows elsewhere |
| Safe Append Signal | YES |
| Preferred Insertion Node | Immediately after `<SystemsModule />` in `components/PurdueProjectPage.tsx`, before `<section id="design">` |

