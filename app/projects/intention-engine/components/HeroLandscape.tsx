import { ArrowDown, Compass, Footprints, Leaf, Waves } from 'lucide-react';
import Image from 'next/image';
import { projectMetadata } from '../content';
import { contentBounds, Tag } from './shared';
import ProjectBreadcrumb from '@/components/ProjectBreadcrumb';

const experienceLayers = [
  { label: 'Landscape', Icon: Compass, value: 'Elevation + horizon' },
  { label: 'Movement', Icon: Footprints, value: 'Gradual ascent' },
  { label: 'Senses', Icon: Waves, value: 'Wind + distance' },
  { label: 'Service', Icon: Leaf, value: 'Optional guidance' },
];

export default function HeroLandscape() {
  return (
    <>
      <section
        id="intention-hero"
        aria-labelledby="intention-title"
        tabIndex={-1}
        className={`${contentBounds} mt-[100px] scroll-mt-20 pb-10 md:pb-12`}
      >
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-[3px] w-12 bg-emerald-800" aria-hidden="true" />
            <ProjectBreadcrumb projectId="intention-engine" />
          </div>
          <h1 id="intention-title" className="font-tiempos text-4xl font-bold leading-tight text-neutral-950 md:text-6xl md:leading-tight">
            Designing Experiences
            <span className="mt-3 block italic text-stone-500">Around Human Intent.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-700 md:text-xl">
            {projectMetadata.summary}
          </p>
          <p className="mt-7 max-w-xl border-l-2 border-emerald-800 pl-4 text-sm font-medium leading-relaxed text-neutral-700">
            {projectMetadata.thesis}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <Tag>{projectMetadata.practice}</Tag>
            <Tag>{projectMetadata.status}</Tag>
            <Tag>{projectMetadata.maturity}</Tag>
          </div>
        </div>
      </section>

      <section className={`${contentBounds} pb-16 md:pb-24`} aria-label="Intention Engine landscape artifact">
        <figure
          className="overflow-hidden rounded-[2rem] border border-stone-200 bg-[#eee9dc] shadow-sm"
          aria-describedby="intention-landscape-summary"
        >
          <p id="intention-landscape-summary" className="sr-only">
            An expansive view across Garden of the Gods represents perspective as an
            environmental affordance. The supporting framework connects landscape,
            movement, senses, and service to a desired transformation.
          </p>

          <div className="relative aspect-[4/3] min-h-[300px] overflow-hidden sm:aspect-[3/2] lg:aspect-[4/3]">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/GardenOfTheGods.jpg`}
              alt="Expansive view across the rock formations, forest, and distant mountains at Garden of the Gods"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/75" aria-hidden="true" />

            <div className="absolute inset-x-0 top-0 flex flex-wrap items-center justify-between gap-2 p-5 sm:p-6">
              <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-white">
                Environmental affordance // Perspective
              </p>
              <span className="rounded-full border border-white/30 bg-black/20 px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                Elevated view
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
              <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-amber-100">
                Self-described intention
              </p>
              <p className="mt-2 font-tiempos text-2xl font-bold sm:text-3xl">“I need perspective.”</p>
              <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-white/90">
                <span>Narrowed</span>
                <ArrowDown className="h-4 w-4 -rotate-90" aria-hidden="true" />
                <span>Expansive</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px border-t border-stone-200 bg-stone-200 sm:grid-cols-4">
            {experienceLayers.map(({ label, Icon, value }) => (
              <div key={label} className="bg-white p-4">
                <Icon className="h-4 w-4 text-emerald-800" aria-hidden="true" />
                <p className="mt-3 font-mono text-[9px] font-black uppercase tracking-[0.13em] text-stone-700">
                  {label}
                </p>
                <p className="mt-1 text-xs font-bold leading-relaxed text-neutral-900">{value}</p>
              </div>
            ))}
          </div>

          <figcaption className="border-t border-stone-200 bg-white/85 p-5 text-sm leading-relaxed text-neutral-600 md:p-6">
            The project treats landscape, hospitality, and sensory composition as materials
            for supporting a desired change—not as inventory to be filtered.
          </figcaption>
        </figure>
      </section>
    </>
  );
}
