// Static Work section: no client hooks, no global navigation behavior.
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Layers3 } from 'lucide-react';
import { orderedTracks } from '@/data/projects';
import type { TrackMeta } from '@/data/projects';

function TagRow({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag}>
          <span className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-700">
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}

function TrackCard({ meta }: { meta: TrackMeta }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <Link href={meta.href} className="block focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2" aria-label={meta.label}>
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
          <Image
            src={meta.image}
            alt={meta.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-6 py-6 md:px-7 md:py-7">
        <h3
          className="text-2xl font-bold leading-tight text-gray-950 text-balance"
          style={{ fontFamily: "'tiempos-headline-regular', serif" }}
        >
          {meta.label}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base text-pretty">
          {meta.subtext}
        </p>

        {!meta.hideTags && meta.tags.length > 0 && (
          <div className="mt-4">
            <TagRow tags={meta.tags} />
          </div>
        )}

        <div className="mt-6 flex flex-1 items-end">
          <Link
            href={meta.href}
            className="inline-flex min-h-[44px] items-center justify-start gap-2 text-sm font-semibold text-neutral-900 transition-colors hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-4"
          >
            {meta.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function DesignWork() {
  return (
    <section id="work" className="homepage-section relative bg-white" aria-label="Work">
      <div className="homepage-container relative">
        <header className="homepage-copy-column relative">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 border-b border-gray-200 pb-1 text-sm font-medium text-gray-600">
              <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
              Work
            </span>
          </div>

          <h1
            id="work-title"
            className="hero-title font-sf-pro-display font-bold leading-[1.1] tracking-tight text-left text-balance"
            style={{
              fontSize: 'clamp(2.125rem, 4.5vw, 3.75rem)',
              whiteSpace: 'normal',
              fontFamily: "'tiempos-headline-regular', serif",
              marginBottom: 'calc(1.32 * 1.5rem)',
            }}
          >
            <span className="bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent animate-gradient-shift bg-[length:300%_auto] font-bold text-balance">
            A practice built to understand systems before improving them.
            </span>
          </h1>

          <p
            className="text-xl text-gray-700 leading-relaxed text-pretty"
            style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}
          >
            Two bodies of work: a self-directed research practice exploring decision-making and systems design in environmental contexts, and a decade of professional work across industries.
          </p>
        </header>

        <div className="homepage-copy-column relative mt-12 md:mt-16" aria-labelledby="work-title">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
            {orderedTracks.map(({ meta }) => (
              <TrackCard key={meta.track} meta={meta} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
