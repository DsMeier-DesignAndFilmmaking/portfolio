import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageNavIndicator } from '@/components/PageNavIndicator';
import ProjectHeader from '@/components/ProjectHeader';
import ProjectBreadcrumb from '@/components/ProjectBreadcrumb';
import { ExperienceNav } from '../components/ExperienceNav';
import {
  Explorer01RusticReliability,
  Explorer02GlazingParadox,
  Explorer03FisheryFriction,
  Explorer04PrivacyService,
} from './components';
import { explorerHero, explorerSections } from './content/explorer-data';

export const metadata: Metadata = {
  title: 'Systems Explorer — Case Study: The Ranch at Rock Creek | Dan Meier',
  description:
    'Interactive investigation of four environmental, infrastructure, operational, and experience-design tensions that shaped Case Study: The Ranch at Rock Creek — an independent research project.',
};

const CONTENT_BOUNDS = 'container mx-auto px-6 md:px-8';

const sectionNavigation = [
  { id: 'explorer-hero', label: 'Overview' },
  ...explorerSections,
];

export default function SystemsExplorerPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-rockcreek-200/50">
      <a
        href="#explorer-hero"
        className="sr-only fixed left-4 top-4 z-[140] rounded-md bg-white px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600"
      >
        Skip to Systems Explorer
      </a>

      <PageNavIndicator sections={sectionNavigation} showDotsOnDesktop />
      <ProjectHeader focusRingClassName="focus-visible:ring-rockcreek-600" />
      <ExperienceNav />

      {/* Hero */}
      <section id="explorer-hero" className={`${CONTENT_BOUNDS} mt-8 md:mt-10`}>
        <div className="max-w-3xl">
          <div className="mb-6">
            <ProjectBreadcrumb projectId="rock-creek-os" nameProject />
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-neutral-600">
              Interactive Investigation
            </span>
          </div>

          <h1 className="font-tiempos text-4xl font-bold leading-tight text-gray-950 md:text-6xl md:leading-tight">
            {explorerHero.title}
          </h1>
          <p className="mt-5 font-tiempos text-xl italic text-gray-500 md:text-2xl">
            {explorerHero.deck}
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">
            {explorerHero.principle}
          </p>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-neutral-500">
            {explorerHero.disclosure}
          </p>
        </div>
      </section>

      {/* Challenge index */}
      <section className={`${CONTENT_BOUNDS} pb-16 md:pb-20`} aria-label="Explorer challenges">
        <div className="max-w-3xl rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 md:p-8">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
            Four system challenges
          </p>
          <ol className="mt-5 grid gap-2 sm:grid-cols-2">
            {explorerSections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:border-rockcreek-300 hover:bg-rockcreek-50 hover:text-rockcreek-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600"
                >
                  <span className="font-mono text-xs font-black text-rockcreek-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {section.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Four explorers */}
      <Explorer01RusticReliability />
      <Explorer02GlazingParadox />
      <Explorer03FisheryFriction />
      <Explorer04PrivacyService />

      {/* Onward */}
      <section className="bg-neutral-950 py-16 md:py-24">
        <div className={CONTENT_BOUNDS}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-rockcreek-300">
              Continue
            </p>
            <h2 className="mt-4 font-tiempos text-2xl font-bold leading-tight text-white md:text-3xl">
              The problems are mapped. The frameworks reveal the relationships.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              Move from interactive investigation to the Systems Atlas — five frameworks that model
              how experience, operations, infrastructure, ecology, and landscape interact.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/projects/rock-creek-os/systems"
                className="group inline-flex items-center gap-2 rounded-xl border border-rockcreek-500 bg-rockcreek-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-rockcreek-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                Explore the Systems Atlas
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/projects/rock-creek-os/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                Enter the Experience OS
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
