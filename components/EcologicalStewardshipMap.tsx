'use client';

export type EcologicalStewardshipMapVariant = 'presentation' | 'minimal';

interface EcologicalStewardshipMapProps {
  /** 'presentation' includes zone fills, loop badges, and legend.
   *  'minimal' uses a clean white background with no fills or badges.
   *  Default: 'presentation' */
  variant?: EcologicalStewardshipMapVariant;
  /** Override the accessible label. A default is provided. */
  'aria-label'?: string;
  /** Tailwind or CSS class applied to the outer wrapper div. */
  className?: string;
}

const ALT =
  'Ecological Stewardship Systems Map — a systems diagram showing four ' +
  'interconnected feedback loops (Small Water Cycle, Soil Carbon Cycle, ' +
  'Visitor Stewardship, and Adaptive Management) across 23 nodes and five ' +
  'ecological zones.';

const SRC = {
  presentation: '/portfolio/images/ecological-stewardship-map--presentation.svg',
  minimal:      '/portfolio/images/ecological-stewardship-map--minimal.svg',
} as const;

/**
 * EcologicalStewardshipMap
 *
 * Renders the Ecological Stewardship Systems Map as a responsive SVG figure.
 * The diagram is 1220px wide — wrap in a scrollable container on narrow
 * viewports or let the default wrapper handle it.
 *
 * Usage:
 *   <EcologicalStewardshipMap />
 *   <EcologicalStewardshipMap variant="minimal" className="my-8" />
 */
export function EcologicalStewardshipMap({
  variant = 'presentation',
  'aria-label': ariaLabel,
  className = '',
}: EcologicalStewardshipMapProps) {
  const src = SRC[variant];

  return (
    <div
      className={`w-full overflow-x-auto ${className}`}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* next/image doesn't scale SVG height automatically from viewBox,
          so we use a plain <img> with explicit intrinsic dimensions. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={ariaLabel ?? ALT}
        width={1220}
        height={variant === 'presentation' ? 940 : 900}
        style={{ width: '100%', height: 'auto', display: 'block', maxWidth: 1220 }}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
