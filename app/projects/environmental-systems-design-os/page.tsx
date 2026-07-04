import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageNavIndicator } from '@/components/PageNavIndicator';
import {
  getStudiedOrganizations,
  getSystemArtifacts,
  getExperiencePatterns,
  getProjects,
  getPortfolioAssets,
} from '@/lib/notion-os';

import ProjectHeader from '@/components/ProjectHeader';
import { SectionKicker } from './components/SectionKicker';
import { OsArchitectureDiagram } from './components/OsArchitectureDiagram';
import {
  OrganizationsSection,
  ArtifactsSection,
  PatternsSection,
  ProjectsSection,
  PortfolioAssetsSection,
} from './components/LiveSections';
import {
  OperatingPrinciplesSection,
  EvidenceBoundarySection,
  ExploreCtaSection,
  CrossProjectFooter,
} from './components/StaticSections';
import { CONTENT_BOUNDS, sectionNavigation, whatTheOsIs } from './content';
import ProjectBreadcrumb from '@/components/ProjectBreadcrumb';

/**
 * Static export (`output: 'export'`): this async Server Component runs at BUILD
 * time. The Notion fetches below are baked into the static HTML and the API key
 * never reaches the browser. ISR (`export const revalidate`) is intentionally
 * NOT used — it is incompatible with static export and would fail the build.
 * Data refreshes on each deploy/build.
 */
export default async function EnvironmentalSystemsDesignOsPage() {
  const [orgs, artifacts, patterns, projects, assets] = await Promise.all([
    getStudiedOrganizations(),
    getSystemArtifacts(),
    getExperiencePatterns(),
    getProjects(),
    getPortfolioAssets(),
  ]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-amber-200/50">
      <a
        href="#osds-hero"
        className="sr-only fixed left-4 top-4 z-[140] rounded-md bg-white px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
      >
        Skip to Environmental Systems Design OS content
      </a>

      <PageNavIndicator sections={sectionNavigation} showDotsOnDesktop />
      <ProjectHeader focusRingClassName="focus-visible:ring-amber-600" />

      {/* HERO */}
      <section id="osds-hero" className={`${CONTENT_BOUNDS} mt-[100px] pb-10 md:pb-12`}>
        <div className="max-w-3xl">
          <div className="mb-3">
            <ProjectBreadcrumb projectId="environmental-systems-design-os" />
          </div>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-amber-700">
              Research Infrastructure
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              Active
            </span>
          </div>
          <h1 className="font-tiempos text-4xl font-bold leading-tight text-gray-950 md:text-6xl md:leading-tight">
            Environmental Systems Design OS
          </h1>
          <p className="mt-5 font-tiempos text-xl italic text-gray-500 md:text-2xl">
            The research and synthesis environment behind the practice.
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">
            A structured research environment for capturing observations, identifying patterns across environmental
            systems, and developing the reusable artifacts, confidence models, and evidence records that appear across
            this portfolio. Not a project. The engine behind the projects.
          </p>
        </div>
      </section>

      <section className={`${CONTENT_BOUNDS} pb-16 md:pb-24`} aria-label="Environmental Systems Design OS evidence path">
        <div className="max-w-3xl rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 md:p-8">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
            Evidence path
          </p>
          <div className="mt-5 space-y-3">
            {['Observation', 'Evidence', 'Artifact', 'Framework'].map((step, i, arr) => (
              <React.Fragment key={step}>
                <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-amber-600">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-2 text-sm font-bold text-neutral-900">{step}</p>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="mx-auto h-4 w-4 rotate-90 text-neutral-300" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 01 // What the OS Is */}
      <section id="osds-what" className="bg-white py-16 md:py-28">
        <div className={CONTENT_BOUNDS}>
          <SectionKicker eyebrow="01 // What the OS Is" title="A practice method, not a deliverable.">
            <p>
              The OS is the structure behind finished work — where raw
              observations from system audits, field study, and research are converted into structured evidence, evidence
              into reusable artifacts, and artifacts into the frameworks that appear across every project in this
              portfolio.
            </p>
          </SectionKicker>
          <div className="grid gap-6 md:grid-cols-3">
            {whatTheOsIs.map((callout, i) => (
              <article key={callout.id} className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
                <p className="font-mono text-xl font-bold text-amber-500">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-5 font-tiempos text-xl font-bold leading-tight text-neutral-950">{callout.label}</h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">{callout.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 02 // OS Architecture */}
      <section id="osds-architecture" className="bg-neutral-50 py-16 md:py-28">
        <div className={CONTENT_BOUNDS}>
          <SectionKicker
            eyebrow="02 // OS Architecture"
            title="How the OS converts observations into output."
          >
            <p>One traceable evidence path connects field observation to published work.</p>
          </SectionKicker>
          <OsArchitectureDiagram />
        </div>
      </section>

      {/* 03–07 // Live data */}
      <OrganizationsSection orgs={orgs} />
      <ArtifactsSection artifacts={artifacts} />
      <PatternsSection patterns={patterns} />
      <ProjectsSection projects={projects} />
      <PortfolioAssetsSection assets={assets} />

      {/* 08–10 // Static */}
      <OperatingPrinciplesSection />
      <EvidenceBoundarySection />
      <ExploreCtaSection />

      {/* Cross-project footer */}
      <CrossProjectFooter />
    </main>
  );
}
