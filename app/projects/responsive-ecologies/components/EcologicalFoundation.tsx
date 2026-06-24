import { contentBounds } from './shared';

/**
 * Ellipse: cx=300, cy=205, rx=188, ry=152 (no rotation).
 *
 * Six node centers sit on this ellipse at 60° intervals:
 *   EH  (300, 53)   θ = -90°   12 o'clock
 *   CS  (463, 129)  θ = -30°    2 o'clock
 *   SP  (463, 281)  θ =  30°    4 o'clock
 *   SE  (300, 357)  θ =  90°    6 o'clock
 *   PS  (137, 281)  θ = 150°    8 o'clock
 *   FM  (137, 129)  θ = 210°   10 o'clock
 *
 * Arrow arcs use "A 188 152 0 0 1 x y" so they trace the same ellipse.
 * Each arc path runs center-to-center; the node white fills clip the visible
 * endpoints so arrows appear to start/end at node boundaries.
 *
 * Arrowhead placement:
 *   - Polygon `points="0,-8 -4,0 4,0"` has its pointy tip at (0,-8).
 *   - After `translate(tx,ty) rotate(rot)`, the tip lands at:
 *       tip_x = tx + 8·sin(rot)
 *       tip_y = ty − 8·cos(rot)
 *   - To place the tip at desired (px, py):
 *       tx = px − 8·sin(rot)
 *       ty = py + 8·cos(rot)
 *
 * Rotation = atan2(dx, −dy) where (dx,dy) is the clockwise ellipse tangent
 * at the target node. Tangent at angle θ (clockwise in SVG):
 *   dx = −rx·sin(θ)   dy = ry·cos(θ)
 *
 * Tip is placed 3 px outside each target node boundary so the arrowhead is
 * fully visible against the node edge.
 */

function StewardshipLoopDiagram() {
  return (
    <svg
      viewBox="0 0 600 410"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="sl-title sl-desc"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <title id="sl-title">Ecological Stewardship Loop</title>
      <desc id="sl-desc">
        A reinforcing loop diagram with six connected stages arranged in a circle.
        Ecological Health leads to Cultural Significance, which creates a Sense of Place,
        which cultivates a Stewardship Ethic, which builds Public Support, which enables
        Funding and Management, which in turn restores Ecological Health.
      </desc>

      {/* Dashed ellipse track — arrows follow this exactly */}
      <ellipse
        cx="300" cy="205"
        rx="188" ry="152"
        fill="none"
        stroke="#d6d3d1"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/*
        Arrow arcs — drawn BEFORE nodes so node white fills clip the arc
        at each end. Each path is a clockwise arc (sweep-flag=1, large-arc=0)
        on our ellipse (rx=188 ry=152) from one node center to the next.
      */}
      {/* EH → CS */}
      <path d="M 300,53 A 188 152 0 0 1 463,129" fill="none" stroke="#047857" strokeWidth="1.75" strokeLinecap="round"/>
      {/* CS → SP */}
      <path d="M 463,129 A 188 152 0 0 1 463,281" fill="none" stroke="#047857" strokeWidth="1.75" strokeLinecap="round"/>
      {/* SP → SE */}
      <path d="M 463,281 A 188 152 0 0 1 300,357" fill="none" stroke="#047857" strokeWidth="1.75" strokeLinecap="round"/>
      {/* SE → PS */}
      <path d="M 300,357 A 188 152 0 0 1 137,281" fill="none" stroke="#047857" strokeWidth="1.75" strokeLinecap="round"/>
      {/* PS → FM */}
      <path d="M 137,281 A 188 152 0 0 1 137,129" fill="none" stroke="#047857" strokeWidth="1.75" strokeLinecap="round"/>
      {/* FM → EH */}
      <path d="M 137,129 A 188 152 0 0 1 300,53" fill="none" stroke="#047857" strokeWidth="1.75" strokeLinecap="round"/>

      {/* Center badge */}
      <circle cx="300" cy="205" r="44" fill="#f0fdf4" stroke="#a7f3d0" strokeWidth="1.25"/>
      <text x="300" y="197" textAnchor="middle" fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif" fontSize="8.5" fontWeight="700" fill="#065f46" letterSpacing="0.12em">REINFORCING</text>
      <text x="300" y="209" textAnchor="middle" fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif" fontSize="8.5" fontWeight="700" fill="#065f46" letterSpacing="0.12em">LOOP</text>
      <text x="300" y="227" textAnchor="middle" fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif" fontSize="16" fill="#059669">↻</text>

      {/*
        Nodes — drawn AFTER arcs so white fill clips the visible arc endpoints.
        The left accent rect overlaps the node border rect (drawn on top).
      */}

      {/* Node 1: Ecological Health  (12 o'clock)  center=(300,53) */}
      <rect x="226" y="38" width="148" height="30" rx="5" fill="white" stroke="#e7e5e4" strokeWidth="1"/>
      <rect x="226" y="38" width="3" height="30" rx="1.5" fill="#059669"/>
      <text x="302" y="57" textAnchor="middle" fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif" fontSize="10.5" fontWeight="500" fill="#1c1917">Ecological Health</text>

      {/* Node 2: Cultural Significance  (2 o'clock)  center=(463,129) */}
      <rect x="382" y="114" width="162" height="30" rx="5" fill="white" stroke="#e7e5e4" strokeWidth="1"/>
      <rect x="382" y="114" width="3" height="30" rx="1.5" fill="#059669"/>
      <text x="465" y="133" textAnchor="middle" fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif" fontSize="10.5" fontWeight="500" fill="#1c1917">Cultural Significance</text>

      {/* Node 3: Sense of Place  (4 o'clock)  center=(463,281) */}
      <rect x="397" y="266" width="132" height="30" rx="5" fill="white" stroke="#e7e5e4" strokeWidth="1"/>
      <rect x="397" y="266" width="3" height="30" rx="1.5" fill="#059669"/>
      <text x="465" y="285" textAnchor="middle" fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif" fontSize="10.5" fontWeight="500" fill="#1c1917">Sense of Place</text>

      {/* Node 4: Stewardship Ethic  (6 o'clock)  center=(300,357) */}
      <rect x="225" y="342" width="150" height="30" rx="5" fill="white" stroke="#e7e5e4" strokeWidth="1"/>
      <rect x="225" y="342" width="3" height="30" rx="1.5" fill="#059669"/>
      <text x="302" y="361" textAnchor="middle" fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif" fontSize="10.5" fontWeight="500" fill="#1c1917">Stewardship Ethic</text>

      {/* Node 5: Public Support  (8 o'clock)  center=(137,281) */}
      <rect x="71" y="266" width="132" height="30" rx="5" fill="white" stroke="#e7e5e4" strokeWidth="1"/>
      <rect x="71" y="266" width="3" height="30" rx="1.5" fill="#059669"/>
      <text x="139" y="285" textAnchor="middle" fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif" fontSize="10.5" fontWeight="500" fill="#1c1917">Public Support</text>

      {/* Node 6: Funding & Management  (10 o'clock)  center=(137,129) */}
      <rect x="52" y="114" width="170" height="30" rx="5" fill="white" stroke="#e7e5e4" strokeWidth="1"/>
      <rect x="52" y="114" width="3" height="30" rx="1.5" fill="#059669"/>
      <text x="139" y="133" textAnchor="middle" fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif" fontSize="10.5" fontWeight="500" fill="#1c1917">Funding &amp; Management</text>

      {/*
        Arrowheads — drawn LAST on top of node fills.
        Polygon: points="0,-8 -4,0 4,0" — tip at (0,−8) in local space.
        After translate(tx,ty) rotate(rot): tip_world = (tx+8·sin(rot), ty−8·cos(rot))
        To place tip at (px,py): tx = px−8·sin(rot), ty = py+8·cos(rot)

        Rotation uses the ellipse tangent at the BOUNDARY INTERSECTION, not the node center.
        The arc crosses the node boundary at angle θ_b (not θ_node_center).
        Tangent at θ_b: (dx,dy) = (−188·sin(θ_b), 152·cos(θ_b))
        rot = atan2(dx, −dy)

        Tip is placed AT the node boundary (0 px offset) so the arc line
        flows seamlessly into the arrowhead base.

        Boundary intersections and tangents (computed geometrically):
          1 EH→CS  arc crosses CS top   (y=114) at x≈451, θ_b≈−36.7°  rot≈137°
          2 CS→SP  arc crosses SP top   (y=266) at x≈472, θ_b≈ 23.7°  rot≈209°
          3 SP→SE  arc crosses SE right (x=375) at y≈344, θ_b≈ 66.5°  rot≈251°
          4 SE→PS  arc crosses PS bot   (y=296) at x≈149, θ_b≈143.3°  rot≈317°
          5 PS→FM  arc crosses FM bot   (y=144) at x≈128, θ_b≈203.7°  rot≈ 29°
          6 FM→EH  arc crosses EH left  (x=226) at y≈ 65, θ_b≈246.8°  rot≈ 71°
      */}

      {/* 1. EH→CS  tip=(451,114) rot=137  tx=446 ty=108 */}
      <polygon points="0,-8 -4,0 4,0" fill="#047857" transform="translate(446,108) rotate(137)"/>

      {/* 2. CS→SP  tip=(472,266) rot=209  tx=476 ty=259 */}
      <polygon points="0,-8 -4,0 4,0" fill="#047857" transform="translate(476,259) rotate(209)"/>

      {/* 3. SP→SE  tip=(375,344) rot=251  tx=383 ty=341 */}
      <polygon points="0,-8 -4,0 4,0" fill="#047857" transform="translate(383,341) rotate(251)"/>

      {/* 4. SE→PS  tip=(149,296) rot=317  tx=155 ty=302 */}
      <polygon points="0,-8 -4,0 4,0" fill="#047857" transform="translate(155,302) rotate(317)"/>

      {/* 5. PS→FM  tip=(128,144) rot=29   tx=124 ty=151 */}
      <polygon points="0,-8 -4,0 4,0" fill="#047857" transform="translate(124,151) rotate(29)"/>

      {/* 6. FM→EH  tip=(226,65)  rot=71   tx=218 ty=68 */}
      <polygon points="0,-8 -4,0 4,0" fill="#047857" transform="translate(218,68) rotate(71)"/>
    </svg>
  );
}

export default function EcologicalFoundation() {
  return (
    <section
      id="ecological-foundation"
      aria-labelledby="ecological-foundation-title"
      className="bg-white py-12 md:py-16"
    >
      <div className={contentBounds}>
        <header className="mb-8 max-w-2xl">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-emerald-700">
            Ecological Foundation
          </p>
          <h2
            id="ecological-foundation-title"
            className="mt-4 font-tiempos text-2xl font-bold leading-tight text-neutral-950 md:text-3xl"
          >
            Ecological vitality enables cultural meaning.
            Cultural meaning sustains stewardship.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Healthy landscapes generate cultural significance — a sense that this place
            matters and is worth protecting. That sense of place cultivates stewardship
            ethics and public support. Support funds management. Management restores
            ecological health. The decision architecture in this project is designed to
            protect this cycle — not to optimize individual metrics, but to preserve a
            reinforcing dynamic that data alone cannot capture.
          </p>
        </header>

        <figure
          className="rounded-[1.5rem] border border-stone-200 bg-white p-5 md:p-8"
          aria-describedby="eco-loop-sr-desc"
        >
          <p id="eco-loop-sr-desc" className="sr-only">
            Reinforcing loop diagram: Ecological Health generates Cultural Significance.
            Cultural Significance creates a Sense of Place. Sense of Place cultivates
            Stewardship Ethic. Stewardship Ethic builds Public Support. Public Support
            enables Funding and Management. Funding and Management restores Ecological
            Health. The loop then repeats.
          </p>

          <div className="mx-auto w-full max-w-[580px] overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div style={{ minWidth: 320 }}>
              <StewardshipLoopDiagram />
            </div>
          </div>

          <figcaption className="mt-5 text-sm leading-relaxed text-neutral-500">
            A single reinforcing loop. Disruption at any stage reduces the whole.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
