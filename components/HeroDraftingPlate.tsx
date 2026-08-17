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
 *
 * WORKING BAND. The two dissolves leave a usable region of roughly
 * x 340-780, y 110-470 (in viewBox units). Geometry placed outside it is
 * attenuated to the point of disappearing — that is what made the Rock Creek
 * sheet read as empty. Every sheet below is composed inside the band so all
 * six carry the same perceived presence despite different compositions.
 *
 * The left ramp is deliberately steep and must not be widened: the plate box
 * overlaps the copy column horizontally, and that ramp is what keeps ink off
 * the hero text.
 * ------------------------------------------------------------------------- */

function SurveyMargin() {
  return (
    <>
      {/* Two measured runs terminating at a common scale — the margin of a field sheet. */}
      <TickScale x={720} y1={120} y2={456} />
      <g style={LINE} strokeWidth={1}>
        <path d="M 368 200 H 720" />
        <path d="M 368 408 H 720" />
      </g>
      <Bracket x={368} y={200} h={208} />
      <Registration x={560} y={152} />
      <text x={368} y={184} {...LABEL_PROPS}>
        SHEET 06
      </text>
    </>
  );
}

function Interval() {
  return (
    <>
      {/* Parallel grading intervals, cut by a section line. */}
      <g style={LINE} strokeWidth={1}>
        <path d="M 336 456 C 432 416 496 392 560 360 S 688 304 780 272" />
        <path d="M 336 416 C 432 376 496 352 560 320 S 688 264 780 232" />
        <path d="M 336 376 C 432 336 496 312 560 280 S 688 224 780 192" />
        <path d="M 336 336 C 432 296 496 272 560 240 S 688 184 780 152" />
        <path d="M 336 296 C 432 256 496 232 560 200 S 688 144 780 112" />
      </g>
      <g style={FAINT} strokeWidth={0.75} strokeDasharray="6 6">
        <path d="M 352 400 H 744" />
      </g>
      <g style={FAINT} strokeWidth={0.75}>
        <path d="M 352 384 v 32 M 744 384 v 32" />
      </g>
      <text x={352} y={376} {...LABEL_PROPS}>
        A
      </text>
      <text x={736} y={376} {...LABEL_PROPS}>
        A
      </text>
    </>
  );
}

function SiteCirculation() {
  return (
    <>
      {/* Contour interval crossed by a traverse; the terminal sits on a crossing. */}
      <g style={LINE} strokeWidth={1}>
        <path d="M 344 360 C 440 312 504 280 568 232 S 696 152 780 104" />
        <path d="M 344 400 C 440 352 504 320 568 272 S 696 192 780 144" />
        <path d="M 344 440 C 440 392 504 360 568 312 S 696 232 780 184" />
        <path d="M 344 480 C 440 432 504 400 568 352 S 696 272 780 224" />
      </g>
      <g style={LINE} strokeWidth={1} strokeDasharray="10 8">
        <path d="M 764 152 C 672 224 608 280 544 344 S 456 432 416 472" />
      </g>
      <Terminal x={568} y={312} />
      <Registration x={440} y={208} r={10} />
      <text x={424} y={152} {...LABEL_PROPS}>
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
        <path d="M 344 184 H 576 V 392" />
        <path d="M 576 184 H 736 V 296" />
        <path d="M 344 392 H 576" />
      </g>
      {/* A single run bifurcating past the parcel edge. */}
      <g style={LINE} strokeWidth={1}>
        <path d="M 408 480 V 456 a 32 32 0 0 1 32 -32 H 672" />
        <path d="M 512 424 a 32 32 0 0 0 32 -32 V 376" />
      </g>
      <Bracket x={344} y={184} h={208} dir="right" />
      <TickScale x={764} y1={184} y2={312} />
      <text x={344} y={160} {...LABEL_PROPS}>
        ORGANIZATION
      </text>
    </>
  );
}

function RouteTrace() {
  const vertices: Array<[number, number]> = [
    [352, 440],
    [448, 360],
    [544, 400],
    [656, 288],
    [764, 224],
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
      {/* Boundary fragment running against the traverse. */}
      <g style={LINE} strokeWidth={1}>
        <path d="M 344 144 C 456 200 552 168 648 216 S 736 256 780 240" />
      </g>
      <Registration x={400} y={272} r={10} />
      <TickScale x={764} y1={312} y2={456} />
      <text x={600} y={456} {...LABEL_PROPS}>
        TRACE
      </text>
    </>
  );
}

function FlowTerminal() {
  return (
    <>
      <g style={LINE} strokeWidth={1}>
        <path d="M 344 184 H 480 a 16 16 0 0 1 16 16 V 352" />
        <path d="M 376 456 V 304 a 16 16 0 0 1 16 -16 H 608" />
        <path d="M 672 136 V 248 a 16 16 0 0 1 -16 16 H 536" />
      </g>
      <Terminal x={496} y={352} />
      <Terminal x={672} y={136} r={9} />
      <Bracket x={344} y={208} h={128} dir="right" />
      <TickScale x={764} y1={312} y2={456} />
      <text x={400} y={168} {...LABEL_PROPS}>
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
            <stop offset="96%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.5" />
          </linearGradient>
          {/* Resolve into the section edges, as the homepage scrim resolves into white.
              Holds full strength longer than the horizontal ramp: this axis has no
              text to protect, and an early falloff was erasing the lower geometry. */}
          <linearGradient id={vId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
            <stop offset="20%" stopColor="#fff" stopOpacity="1" />
            <stop offset="82%" stopColor="#fff" stopOpacity="1" />
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
