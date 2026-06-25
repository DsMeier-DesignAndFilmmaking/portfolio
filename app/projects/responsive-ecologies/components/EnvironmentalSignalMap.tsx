import Image from 'next/image';

const desktopSignalMapSrc =
  '/portfolio/images/responsive-ecologies/environmental-signal-map.svg';
const mobileSignalMapSrc =
  '/portfolio/images/responsive-ecologies/environmental-signal-map-mobile.svg';

export default function EnvironmentalSignalMap() {
  return (
    <figure
      className="mb-8 overflow-hidden rounded-[1.5rem] border border-emerald-950/10 bg-white shadow-sm shadow-emerald-950/[0.03] md:mb-10"
      aria-describedby="environmental-signal-map-caption"
    >
      <div className="bg-white md:hidden">
        <Image
          src={mobileSignalMapSrc}
          alt="Mobile Environmental Signal Map showing signals flowing through ecological conditions, visitor factors, operational capacity, stewardship decisions, and monitoring."
          width={390}
          height={860}
          sizes="calc(100vw - 3rem)"
          className="h-auto w-full"
          priority={false}
        />
      </div>

      <div className="hidden bg-white md:block">
        <Image
          src={desktopSignalMapSrc}
          alt="Environmental Signal Map showing how climate, ecological, visitor, and operational indicators inform stewardship decisions."
          width={1200}
          height={760}
          sizes="(min-width: 1280px) 1200px, calc(100vw - 4rem)"
          className="h-auto w-full"
          priority={false}
        />
      </div>

      <figcaption
        id="environmental-signal-map-caption"
        className="border-t border-emerald-950/10 bg-neutral-50/80 p-5 text-sm leading-relaxed text-neutral-600"
      >
        The signal map shows how climate, ecological, visitor, and operational indicators
        inform stewardship decisions before they become domain-specific actions.
      </figcaption>
    </figure>
  );
}
