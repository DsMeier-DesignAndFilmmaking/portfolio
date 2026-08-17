import React from 'react';

/**
 * HeroDraftingPlate
 *
 * A subtle background layer for eligible project-detail heroes.
 *
 * The homepage hero (app/page.tsx:309) carries a photographed field notebook at
 * `opacity: 0.1`, desktop-only, dissolving into white. This component extends that
 * language onto project heroes — but as clean extracted drafting geometry rather
 * than a recreation of the photographed notebook. The homepage is the whole
 * notebook spread; each project page is one drafting sheet pulled from the same set.
 *
 * Rules that hold across every plate:
 *   - single graphite ink, no second color, no gradient in the linework, no glow
 *   - all coordinates snap to a 32px module (the same module as the About-section
 *     paper grid at app/page.tsx:64) — the module governs placement, it is never
 *     drawn as a ruled field
 *   - >=60% of the plate is empty
 *   - anchored to the top-right of the hero box, dissolving left toward the copy
 *     column and down toward the section edge
 *   - static: no animation, no transition, nothing to disable under reduced motion
 *   - `lg:` and above only, matching the homepage's `hidden lg:block` gate
 *
 * Deliberately oblique: the plate is informed by the project's subject but never
 * illustrates it. It should reward inspection, not announce what the page is about.
 *
 * No 'use client' and no hooks — this renders inside both server trees
 * (architecture-of-confidence, rock-creek-os) and client trees (field-notes,
 * travel-and-ai, digital-executor, adaptive-ranch heroes are `motion.section`).
 *
 * Ink and opacity are tuned in one place: the `.project-copy` token block in
 * app/globals.css.
 */

export type PlateId =
  | 'survey-margin'
  | 'interval'
  | 'site-circulation'
  | 'spatial-organization'
  | 'route-trace'
  | 'flow-terminal';

const INK = 'rgb(var(--hero-plate-ink))';

/** Registration marks, tick scales, annotation — the quietest tier. */
const FAINT: React.CSSProperties = {
  stroke: INK,
  strokeOpacity: 'var(--hero-plate-grid)',
  fill: 'none',
};

/** Contours, traverses, routing — the primary drawn tier. */
const LINE: React.CSSProperties = {
  stroke: INK,
  strokeOpacity: 'var(--hero-plate-line)',
  fill: 'none',
};

const LABEL: React.CSSProperties = {
  fill: INK,
  fillOpacity: 'var(--hero-plate-grid)',
  stroke: 'none',
};

const LABEL_PROPS = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: 7,
  letterSpacing: 1.3,
  style: LABEL,
} as const;

/* ---------------------------------------------------------------------------
 * Shared primitives. Family resemblance across the six sheets comes from these
 * being identical everywhere; only their composition changes per plate.
 * ------------------------------------------------------------------------- */

/** Vertical tick scale: majors every 96, minors every 32. */
function TickScale({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  const ticks: React.ReactNode[] = [];
  for (let y = y1; y <= y2; y += 32) {
    const major = (y - y1) % 96 === 0;
    ticks.push(<path key={y} d={`M ${x} ${y} h ${major ? -20 : -10}`} />);
  }
  return (
    <g style={FAINT} strokeWidth={0.75}>
      <path d={`M ${x} ${y1} V ${y2}`} />
      {ticks}
    </g>
  );
}

/** Crosshair-in-circle registration mark. */
function Registration({ x, y, r = 14 }: { x: number; y: number; r?: number }) {
  return (
    <g style={FAINT} strokeWidth={0.75}>
      <circle cx={x} cy={y} r={r} />
      <path d={`M ${x - r - 8} ${y} h ${2 * r + 16} M ${x} ${y - r - 8} v ${2 * r + 16}`} />
    </g>
  );
}

/** Square annotation bracket. `dir` is which way the bracket opens. */
function Bracket({
  x,
  y,
  h,
  w = 16,
  dir = 'left',
}: {
  x: number;
  y: number;
  h: number;
  w?: number;
  dir?: 'left' | 'right';
}) {
  const d = dir === 'left' ? -w : w;
  return (
    <g style={FAINT} strokeWidth={0.75}>
      <path d={`M ${x} ${y} h ${d} v ${h} h ${-d}`} />
    </g>
  );
}

/** Open terminal: a hollow circle with a registration tick. Drafting convention, not a UI node. */
function Terminal({ x, y, r = 7 }: { x: number; y: number; r?: number }) {
  return (
    <g style={LINE} strokeWidth={1}>
      <circle cx={x} cy={y} r={r} />
      <path d={`M ${x} ${y - r - 8} v 6`} />
    </g>
  );
}

/* ---------------------------------------------------------------------------
 * The six sheets.
 * ------------------------------------------------------------------------- */

function SurveyMargin() {
  return (
    <>
      {/* Two measured runs terminating at a common scale — the margin of a field sheet. */}
      <TickScale x={704} y1={96} y2={512} />
      <g style={LINE} strokeWidth={1}>
        <path d="M 352 224 H 704" />
        <path d="M 352 416 H 704" />
      </g>
      <Bracket x={352} y={224} h={192} />
      <Registration x={544} y={128} />
      <text x={608} y={544} {...LABEL_PROPS}>
        SHEET 06
      </text>
    </>
  );
}

function Interval() {
  return (
    <>
      <g style={LINE} strokeWidth={1}>
        <path d="M 288 512 C 384 448 448 416 544 384 S 704 320 800 288" />
        <path d="M 320 544 C 416 480 480 448 576 416 S 736 352 832 320" />
        <path d="M 256 480 C 352 416 416 384 512 352 S 672 288 768 256" />
        <path d="M 224 448 C 320 384 384 352 480 320 S 640 256 736 224" />
        <path d="M 192 416 C 288 352 352 320 448 288 S 608 224 704 192" />
      </g>
      <g style={FAINT} strokeWidth={0.75} strokeDasharray="6 6">
        <path d="M 288 416 H 736" />
      </g>
      <g style={FAINT} strokeWidth={0.75}>
        <path d="M 288 400 v 32 M 736 400 v 32" />
      </g>
      <text x={288} y={392} {...LABEL_PROPS}>
        A
      </text>
      <text x={728} y={392} {...LABEL_PROPS}>
        A
      </text>
      <TickScale x={768} y1={96} y2={288} />
    </>
  );
}

function SiteCirculation() {
  return (
    <>
      <g style={LINE} strokeWidth={1}>
        <path d="M 192 544 C 320 480 416 448 512 400 S 704 320 800 256" />
        <path d="M 224 576 C 352 512 448 480 544 432 S 736 352 832 288" />
        <path d="M 160 512 C 288 448 384 416 480 368 S 672 288 768 224" />
        <path d="M 128 480 C 256 416 352 384 448 336 S 640 256 736 192" />
      </g>
      <g style={LINE} strokeWidth={1} strokeDasharray="10 8">
        <path d="M 736 64 C 640 160 576 224 512 320 S 384 480 320 576" />
      </g>
      <Terminal x={512} y={320} />
      <Registration x={672} y={128} r={10} />
      <text x={352} y={528} {...LABEL_PROPS}>
        TRAVERSE
      </text>
    </>
  );
}

function SpatialOrganization() {
  return (
    <>
      {/* Parcel corners sharing edges — organization implied by alignment, never closed. */}
      <g style={LINE} strokeWidth={1}>
        <path d="M 320 160 H 576 V 384" />
        <path d="M 576 160 H 736 V 288" />
        <path d="M 320 384 H 576" />
      </g>
      {/* A single run bifurcating past the parcel edge. */}
      <g style={LINE} strokeWidth={1}>
        <path d="M 384 544 V 480 a 32 32 0 0 1 32 -32 H 672" />
        <path d="M 512 448 a 32 32 0 0 0 32 -32 V 384" />
      </g>
      <Bracket x={288} y={160} h={224} dir="right" />
      <TickScale x={768} y1={352} y2={512} />
      <text x={320} y={128} {...LABEL_PROPS}>
        ORGANIZATION
      </text>
    </>
  );
}

function RouteTrace() {
  const vertices: Array<[number, number]> = [
    [256, 480],
    [384, 384],
    [512, 416],
    [640, 288],
    [768, 224],
  ];
  return (
    <>
      <g style={LINE} strokeWidth={1}>
        <path d={`M ${vertices.map(([x, y]) => `${x} ${y}`).join(' L ')}`} />
      </g>
      <g style={FAINT} strokeWidth={0.75}>
        {vertices.map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M ${x} ${y - 12} v 24`} />
        ))}
      </g>
      <g style={LINE} strokeWidth={1}>
        <path d="M 192 96 C 320 160 416 128 512 192 S 704 288 800 256" opacity={0.7} />
      </g>
      <Registration x={384} y={192} r={10} />
      <TickScale x={736} y1={384} y2={544} />
      <text x={224} y={528} {...LABEL_PROPS}>
        TRACE
      </text>
    </>
  );
}

function FlowTerminal() {
  return (
    <>
      <g style={LINE} strokeWidth={1}>
        <path d="M 256 160 H 480 a 16 16 0 0 1 16 16 V 352" />
        <path d="M 320 512 V 288 a 16 16 0 0 1 16 -16 H 608" />
        <path d="M 672 96 V 240 a 16 16 0 0 1 -16 16 H 528" />
      </g>
      <Terminal x={496} y={352} />
      <Terminal x={672} y={96} r={9} />
      <Bracket x={224} y={224} h={96} dir="right" />
      <TickScale x={768} y1={320} y2={512} />
      <text x={256} y={544} {...LABEL_PROPS}>
        ROUTING
      </text>
    </>
  );
}

const PLATES: Record<PlateId, () => React.ReactElement> = {
  'survey-margin': SurveyMargin,
  interval: Interval,
  'site-circulation': SiteCirculation,
  'spatial-organization': SpatialOrganization,
  'route-trace': RouteTrace,
  'flow-terminal': FlowTerminal,
};

export default function HeroDraftingPlate({
  plate,
  className = '',
}: {
  plate: PlateId;
  className?: string;
}) {
  const Sheet = PLATES[plate];
  if (!Sheet) return null;

  // Deterministic, collision-free: one plate renders per page.
  const hId = `hdp-${plate}-h`;
  const vId = `hdp-${plate}-v`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[62%] select-none lg:block ${className}`}
    >
      <svg
        viewBox="0 0 800 576"
        preserveAspectRatio="xMaxYMid slice"
        className="h-full w-full"
        focusable="false"
      >
        <defs>
          {/* Dissolve toward the copy column. Luminance masks: white reveals, black hides. */}
          <linearGradient id={hId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="30%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="62%" stopColor="#fff" stopOpacity="1" />
            <stop offset="93%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.35" />
          </linearGradient>
          {/* Resolve into the section edges, as the homepage scrim resolves into white. */}
          <linearGradient id={vId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.25" />
            <stop offset="24%" stopColor="#fff" stopOpacity="1" />
            <stop offset="72%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          {/* Nested masks rather than CSS mask-composite — no cross-browser caveat. */}
          <mask id={`${hId}-m`}>
            <rect x="0" y="0" width="800" height="576" fill={`url(#${hId})`} />
          </mask>
          <mask id={`${vId}-m`}>
            <rect x="0" y="0" width="800" height="576" fill={`url(#${vId})`} />
          </mask>
        </defs>

        <g mask={`url(#${hId}-m)`}>
          <g mask={`url(#${vId}-m)`} strokeLinecap="round" strokeLinejoin="round">
            <Sheet />
          </g>
        </g>
      </svg>
    </div>
  );
}
