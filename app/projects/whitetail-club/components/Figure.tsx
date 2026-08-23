import React from 'react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/**
 * Wireframe figure. The `src` is a real screenshot of the corresponding file in
 * docs/whitetail/wireframes/ — captured headlessly, not redrawn. Wide stills scroll
 * inside their own container so the page itself never scrolls horizontally.
 */
export function Figure({
  src,
  alt,
  caption,
  label,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption: React.ReactNode;
  label: string;
  width: number;
  height: number;
}) {
  return (
    <figure className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">{label}</p>
        {/* Scrollbars are suppressed site-wide, so the pan affordance has to be stated. */}
        <span
          aria-hidden="true"
          className="shrink-0 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-300 md:hidden"
        >
          Scroll →
        </span>
      </div>
      <div className="overflow-x-auto rounded-[1rem] border border-neutral-200 bg-neutral-50 p-3 md:p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}${src}`}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          className="h-auto w-full min-w-[640px] rounded-lg bg-white"
        />
      </div>
      <figcaption className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">{caption}</figcaption>
    </figure>
  );
}
