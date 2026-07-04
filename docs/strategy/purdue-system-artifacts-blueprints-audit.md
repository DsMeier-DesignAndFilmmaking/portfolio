# System Artifacts & Blueprints — Structural, Utility & Narrative Audit

Audit target: the "[ SYSTEM ARTIFACTS & BLUEPRINTS ] Mapping Institutional Policy onto Modular Infrastructure" module in [`components/PurdueProjectPage.tsx`](../../components/PurdueProjectPage.tsx) (lines ~349–532), covering the three-card Layer 01/02/03 block.

Verification method: read the live component directly, cross-checked the Tailwind version in use (`3.4.1` — no native 3D-axis utilities), and confirmed the highest-severity finding against Turbopack's **actual compiled CSS output** rather than inferring cascade behavior. Live browser verification (preview tool) was blocked by a pre-existing `next dev` process already bound to port 3000; static/compiled verification was used instead.

Follow-up to [`purdue-systems-approach-structural-audit.md`](purdue-systems-approach-structural-audit.md), which scoped the insertion point before this block existed. This audit reviews the block as built.

---

## 1. The Glass — Mathematical Correction & Visual Engineering

### 1.1 CONFIRMED: `transform` authority collision on the Layer 01 isometric stage (high severity)

`components/PurdueProjectPage.tsx:380`:

```tsx
className="relative h-36 w-56 transition-all duration-500 ease-out group-hover:-translate-y-1 [transform:rotateX(54deg)_rotateZ(-45deg)_scale(.9)] [transform-style:preserve-3d]"
```

`group-hover:-translate-y-1` and the arbitrary `[transform:...]` both write to the literal `transform` property. Compiled CSS output confirms:

```css
.\[transform\:rotateX\(54deg\)_rotateZ\(-45deg\)_scale\(\.9\)\] {   /* specificity 0,1,0 */
  transform: rotateX(54deg)rotateZ(-45deg)scale(.9);
}
.group:hover .group-hover\:-translate-y-1 {                          /* specificity 0,3,0 */
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) ...;
}
```

`(0,3,0) > (0,1,0)` — the hover rule wins unconditionally, independent of stylesheet order. `group` is on the entire 560px `<article>` (line 367), so the trigger region is the whole card, not just the diagram — this fires on nearly every mouse pass. On hover, the isometric tilt is fully discarded and replaced by a flat `translateY(-4px)`; the three `translateZ`-offset pills lose the shared 3D space and visually snap flat, then jump back on mouse-out.

**Fix** — fold the hover delta into the same transform string so it composes instead of competing:

```tsx
<div className="relative flex h-36 w-56 items-center justify-center [perspective:900px]">
  <div className="relative h-36 w-56 [transform-style:preserve-3d] [transform:rotateX(54deg)_rotateZ(-45deg)_scale(.9)] transition-transform duration-500 ease-out group-hover:[transform:translateY(-4px)_rotateX(54deg)_rotateZ(-45deg)_scale(.9)]">
    <div className="absolute left-1/2 top-1/2 flex h-10 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-between rounded-md border border-[#cfb991]/40 bg-white/[0.03] px-3 backdrop-blur-md transition-[transform,background-color,border-color] duration-500 ease-out hover:border-[#cfb991] hover:bg-white/[0.07] [transform:translateZ(24px)] hover:[transform:translateZ(36px)]">
      <span className="font-mono text-[8px] font-bold tracking-wider text-[#cfb991]">01_ADMISSIONS</span>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
    </div>

    <div className="absolute left-1/2 top-1/2 flex h-10 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-between rounded-md border border-white/20 bg-white/[0.03] px-3 backdrop-blur-md transition-[transform,background-color] duration-500 ease-out hover:bg-white/[0.07] [transform:translateZ(0px)] hover:[transform:translateZ(10px)]">
      <span className="font-mono text-[8px] tracking-wider text-white">02_OGA_META</span>
      <span aria-hidden="true" className="h-0.5 w-3 rounded bg-white/30" />
    </div>

    <div className="absolute left-1/2 top-1/2 flex h-10 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-between rounded-md border border-white/5 bg-white/[0.02] px-3 backdrop-blur-md transition-[transform,border-color] duration-500 ease-out hover:border-white/15 [transform:translateZ(-24px)] hover:[transform:translateZ(-16px)]">
      <span className="font-mono text-[8px] tracking-wider text-gray-500">03_POSTDOC_CORE</span>
      <span className="font-mono text-[7px] text-gray-600">UUID</span>
    </div>
  </div>
</div>
```

Note what was deliberately left untouched: each pill's own `hover:[transform:translateZ(Npx)]` vs. its base `[transform:translateZ(Npx)]` is `(0,2,0)` vs `(0,1,0)` on the same element — an intentional, correctly-functioning override. Don't extend this fix to those.

### 1.2 `vectorEffect="non-scaling-stroke"` on the Layer 02 arrow — correct, not a bug

`components/PurdueProjectPage.tsx:428-443` renders `viewBox="0 0 24 24"` into a `h-5 w-5` (20px) box — a 0.833× downscale that would ordinarily thin `strokeWidth="1.5"` to a blurry 1.25px. `vector-effect="non-scaling-stroke"` cancels exactly that: it removes the current coordinate-system scale (which includes the viewBox-to-viewport ratio, not just CSS `transform`) from the stroke while leaving path geometry scaled normally. Correct tool, correctly applied. No change needed.

### 1.3 Overflow-clip risk — not where a naive audit would look

768–1023px is single-column (`grid-cols-1`, `lg:grid-cols-3` only activates at 1024px) with 670px+ of inner card width against a fixed 224px 3D stage — very safe. The real pinch point is exactly at the 1024px breakpoint: `container`(1024) − `px-6`×2(48) − two `gap-6`(48), ÷3 columns, − card `p-6`×2(48) ≈ **261px available vs. 224px fixed stage** — 37px slack, still safe.

Where clipping is a real, reachable hazard: sub-360px mobile. At a 320px viewport the same arithmetic gives exactly 224px available — zero slack — and `rotateZ(-45deg)` bleeds the stage's visual footprint diagonally past its axis-aligned box, into the `overflow-hidden` frame at line 376.

**Fix:**

```tsx
<div className="relative flex h-36 w-full max-w-56 items-center justify-center [perspective:900px]">
```

### 1.4 Monospace labels — not currently wrapping, but undefended

`[ SYSTEM ARTIFACTS & BLUEPRINTS ]` and the three `[ LAYER 0X // ... ]` tags have no `whitespace-nowrap`. Not currently breaking at any real card width, but undefended against a future copy edit.

```tsx
<div className="mb-4 whitespace-nowrap font-mono text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
  [ SYSTEM ARTIFACTS & BLUEPRINTS ]
</div>
```

(same addition on the three `[ LAYER 0X // ... ]` divs at lines 369, 411, 470).

---

## 2. The Infrastructure — Core Utility & Tailwind Architecture

### 2.1 `backdrop-blur-md` on the three pills — earning its keep, don't strip it

`rotateX(54deg)` converts a `translateZ` offset to on-screen displacement at `sin(54°) ≈ 0.81`; the three pills (±24px Z) land only ~14–27px apart on screen against a 144×36px footprint — substantial overlap in projection. The blur is doing real depth-of-field work here; removing it would flatten the intended "stacked glass" read. Only caveat: this project has 40+ `backdrop-blur-*` instances across components already (`SocialLogicReceipt`, `SystemsMapDiagram`, `ProjectPracticeNavDropdown`, etc.), each a distinct compositor backdrop-root — worth tracking as a site-wide budget line if mobile Safari scroll performance is ever audited, not a fix for this file.

### 2.2 Section landmark + heading level — breaks an established pattern

`components/PurdueProjectPage.tsx:350` opens with a bare `<section className="bg-black pb-20 pt-0">`, with an `h3` for its title. Compare `components/SystemsModule.tsx:80-83` (the component rendered immediately before it):

```tsx
<section aria-labelledby={headingId} className="bg-black py-20">
  ...
  <h2 id={headingId} className="text-3xl font-bold text-white">
```

Every other top-level section on this page uses `h2` for its title, including "New Design" directly after this block (line 541). This section alone drops to `h3` for a structurally identical role — the document outline reads this block as a subsection of whatever heading last rendered inside `SystemsModule`, not as its own top-level section.

```tsx
<section aria-labelledby="system-artifacts-heading" className="bg-black pb-20 pt-0">
  <div className="container mx-auto px-6">
    <div className="border-t border-white/10 pt-16">
      <div className="mb-4 whitespace-nowrap font-mono text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
        [ SYSTEM ARTIFACTS & BLUEPRINTS ]
      </div>

      <h2 id="system-artifacts-heading" className="mb-6 text-2xl font-bold text-white md:text-3xl">
        Mapping Institutional Policy onto Modular Infrastructure
      </h2>
```

Promoting the section title to `h2` requires demoting the three card titles from `h4` to `h3` to avoid skipping a level in the other direction:

```tsx
{/* apply to all three: Cross-Departmental ERD Schema / Multi-Tenant Routing Matrix / Unified Tokenized Framework */}
<h3 className="mb-4 border-b border-white/5 pb-2 text-base font-medium text-white">
```

### 2.3 `transition-all` — not a CLS risk here, but real, needless cost

None of the properties that change on hover in this block are layout-triggering (`transform` is compositor-only, `background-color`/`border-color` are paint-only) — so `transition-all` isn't causing reflow or CLS. It's still the wrong tool: it arms change-detection on every animatable property instead of the 2–3 that move, across the stage wrapper + 3 pills. Resolved in the 1.1 code block via `transition-transform` / `transition-[transform,background-color,border-color]`. Rule going forward: never pair `transition-all` with an arbitrary-property transform — always enumerate.

### 2.4 `shadow-none` — dead utility, ×3

Lines 381/386/391 each carry `shadow-none`, compiling to `box-shadow: 0 0 #0000` — the browser default, with no earlier shadow utility anywhere in the ancestry to cancel. Pure no-op, shipped three times. Removed in the 1.1 block.

### 2.5 Missing measure control — real typographic overflow in the 768–1023px band

`grid-cols-1 lg:grid-cols-3` (line 365) means 768–1023px renders full-width single-column cards, and the body paragraphs (`text-xs leading-relaxed text-gray-400`, no `max-w`) stretch to ~670px+ line length at 12px type. Don't fix via `md:grid-cols-2` (orphans the third card in a 2-column row) — cap the measure directly:

```tsx
<p className="max-w-[60ch] font-sans text-xs leading-relaxed text-gray-400">
```

(apply to all three card paragraphs — lines 399, 458, 521).

### 2.6 Decorative elements without `aria-hidden`

The SVG arrow correctly has `aria-hidden="true"`. The status dot (line 383) and its siblings (388, 393), plus the skeleton-bar mockup divs in Layer 03 (490–501, 507–508), don't. Low practical impact (empty divs are generally skipped by AT) but will surface in automated audits (axe/Lighthouse). Applied to the status dots in the 1.1 block; same treatment applies to the Layer 03 skeleton bars.

---

## 3. The Cognitive Layer — Executive UX Narrative & Alignment

**What's working:** "a Postdoctoral Fellow acting simultaneously as a Graduate Applicant" is a specific, credible edge case a technical director will recognize as real, not filler. The three footer labels (`Relational Taxonomy Map` / `Contextual Flow State` / `Component Architecture`) are precise without being try-hard. Use these as the calibration bar for future copy in this module.

**Finding — fabricated code presented with no honesty marker, inconsistent with the file's own convention.** Two cards earlier, this same component explicitly flags unverified numbers: `{ value: '340 → 12', label: 'Duplicate Page Clusters Resolved', isPlaceholder: true }` (lines 335-336). That's good discipline. But Layer 02 renders `contextAwareHydrator()` inside a panel styled as a literal terminal/log — a function name, an `OK` status, a resolved path — with no indication it's illustrative rather than a real symbol from the shipped codebase. Same with `<ApplicationTable variant="dense" />` in Layer 03. The named audience (VC partners, technology directors) is exactly the audience most likely to ask "walk me through `contextAwareHydrator()`" in a follow-up call. The `isPlaceholder` pattern already exists in this file; it isn't applied where the risk is highest. Content decision, not a code defect — flagging rather than prescribing a fix. If a marker is wanted, the file already has a diegetic caption convention (`// DATA HORIZON LAYERS`, `// RUNTIME INTERCEPT ROUTING`, `// TOKENIZED COMPONENT CANVAS` at lines 377/419/479) that a one-line `// illustrative — simplified for clarity` tag could extend.

**Finding — gold is spent before it's needed.** `#cfb991` appears 13 times in this one block: 3 eyebrow labels, a status accent, an SVG icon, a highlighted logic box, a "12-COL" badge, the literal string `#cfb991` rendered as content twice (lines 486 and 516), plus swatch fills. `#cfb991` is also this page's sole signal color for its highest-stakes action — the "View Live Site" CTA at line 558. By the time a reader reaches that button, gold has already read as ambient wallpaper thirteen times over rather than "pay attention here." Recommend one or two load-bearing gold uses per card (the eyebrow label is enough) with the rest falling back to white/gray, so the CTA retains sole claim to the color.

---

## Summary Table

| # | Finding | Severity | Status |
|---|---|---|---|
| 1.1 | `group-hover:-translate-y-1` vs. arbitrary `[transform:...]` — confirmed via compiled CSS specificity | High | Fix provided |
| 1.3 | Isometric stage clips at ≤~320px viewports (not 768–1024px) | Low | Fix provided |
| 1.4 | Monospace labels undefended against wrap | Low | Fix provided |
| 2.2 | Section missing `aria-labelledby`; heading demoted to `h3` vs. sibling `h2` convention | Medium | Fix provided |
| 2.3 | `transition-all` paired with arbitrary transform — inefficient, not a CLS source | Low | Fix provided |
| 2.4 | `shadow-none` ×3 — dead utility | Low | Fix provided |
| 2.5 | No measure cap on card paragraphs — 670px+ line length in 768–1023px band | Medium | Fix provided |
| 2.6 | Decorative dots/skeleton bars missing `aria-hidden` | Low | Fix provided |
| 3 | Fabricated code artifacts (`contextAwareHydrator()`, `<ApplicationTable />`) lack the `isPlaceholder` honesty marker used elsewhere in the same file | Medium (narrative risk) | Flagged, not prescribed |
| 3 | `#cfb991` overused (13× in-block) dilutes signal value of the page's sole CTA color | Medium (narrative risk) | Flagged, not prescribed |

Non-findings worth recording so they aren't re-litigated: `vectorEffect="non-scaling-stroke"` on the Layer 02 arrow is correct as-is; `backdrop-blur-md` on the Layer 01 pills is load-bearing (verified via projection overlap, not decorative).
