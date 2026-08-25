import React from 'react';
import { PageNavIndicator } from '@/components/PageNavIndicator';
import ProjectHeader from '@/components/ProjectHeader';
import ProjectBreadcrumb from '@/components/ProjectBreadcrumb';

import { SectionKicker } from './components/SectionKicker';
import { WhitetailExperienceNav } from './components/WhitetailExperienceNav';
import { EvidenceBoundarySection } from './components/StaticSections';
import {
  CONTENT_BOUNDS,
  overviewSections,
  HERO,
  THESIS,
  contextPoints,
  insufficientRows,
} from './content';

/**
 * Whitetail Club & Shore Lodge — Stewardship Intelligence System.
 * Tab 1 of 4 — Overview.
 *
 * Presentation layer over the frozen artifacts in docs/whitetail/. This page must not
 * introduce claims those artifacts do not support. See content.ts for the four source
 * governance rules that constrain every string on this page.
 *
 * This is the case study's canonical route (data/projects.ts href/canonicalHref both
 * point here, unchanged by the tab restructure) — mirrors how Rock Creek's Overview
 * tab is the only one registered in site nav data; Architecture, Stress Testing, and
 * Resulting Surfaces are reachable only via the tab bar below, not the site's primary
 * nav or the /projects index.
 */
export default function WhitetailClubPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-amber-200/50">
      <a
        href="#wt-hero"
        className="sr-only fixed left-4 top-4 z-[140] rounded-md bg-white px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
      >
        Skip to Whitetail Club case study content
      </a>

      <PageNavIndicator sections={overviewSections} showDotsOnDesktop />
      <ProjectHeader focusRingClassName="focus-visible:ring-amber-600" />
      <WhitetailExperienceNav />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section id="wt-hero" className={`${CONTENT_BOUNDS} mt-8 pb-10 md:mt-12 md:pb-12`}>
        <div className="max-w-3xl">
          <div className="mb-3">
            <ProjectBreadcrumb projectId="whitetail-club" />
          </div>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-amber-700">
              {HERO.eyebrowLeft}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-neutral-600">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" aria-hidden="true" />
              {HERO.eyebrowRight}
            </span>
          </div>
          <h1 className="font-tiempos text-4xl font-bold leading-tight text-gray-950 md:text-6xl md:leading-tight">
            {HERO.title}
          </h1>
          <p className="mt-5 font-tiempos text-xl italic text-gray-500 md:text-2xl">{HERO.subtitle}</p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">{HERO.standfirst}</p>
        </div>
      </section>

      {/* Thesis, stated once, early. Unanchored — see content.ts overviewSections comment. */}
      <section id="wt-thesis" className={`${CONTENT_BOUNDS} pb-16 md:pb-24`} aria-label="Design thesis">
        <blockquote className="max-w-3xl rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 md:p-10">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">Thesis</p>
          <p className="mt-5 font-tiempos text-2xl font-bold leading-snug text-neutral-950 md:text-3xl">
            “{THESIS}”
          </p>
        </blockquote>
      </section>

      {/* ── 01 // CONTEXT ────────────────────────────────────── */}
      <section id="wt-context" className="bg-white py-16 md:py-28">
        <div className={CONTENT_BOUNDS}>
          <SectionKicker eyebrow="01 // Context" title="One property, several landscapes, and a crew that changes every season.">
            <p>
              A mountain property in Idaho, managed as a single grounds operation. The research established its
              scale and its seasonal workforce model; it did not establish sensors, telemetry, or automated
              irrigation, and nothing here assumes them.
            </p>
          </SectionKicker>
          <div className="grid gap-6 md:grid-cols-3">
            {contextPoints.map((point, i) => (
              <article key={point.label} className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
                <p className="font-mono text-xl font-bold text-amber-500">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-5 font-tiempos text-xl font-bold leading-tight text-neutral-950">{point.label}</h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">{point.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 // WHY CONVENTIONAL INTERFACES FAILED ─────────── */}
      <section id="wt-insufficient" className="bg-neutral-50 py-16 md:py-28">
        <div className={CONTENT_BOUNDS}>
          <SectionKicker
            eyebrow="02 // Why the obvious answers don’t work"
            title="Every conventional shape solves a problem this property doesn’t have."
          >
            <p>
              The root problem is not that work goes untracked. It is that the landscape has no addressable record
              of itself — so knowledge cannot be inherited, and each season starts closer to zero than it should.
            </p>
          </SectionKicker>
          <p
            aria-hidden="true"
            className="mb-2 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-300 md:hidden"
          >
            Scroll →
          </p>
          <div className="overflow-x-auto rounded-[1rem] border border-neutral-200 bg-white">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th scope="col" className="px-6 py-4 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
                    Conventional shape
                  </th>
                  <th scope="col" className="px-6 py-4 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
                    Why it is insufficient here
                  </th>
                </tr>
              </thead>
              <tbody>
                {insufficientRows.map((row) => (
                  <tr key={row.conventional} className="border-b border-neutral-100 last:border-0">
                    <td className="px-6 py-5 align-top text-sm font-semibold text-neutral-900">{row.conventional}</td>
                    <td className="px-6 py-5 align-top text-sm leading-relaxed text-neutral-600">{row.fails}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 10 // EVIDENCE BOUNDARY ──────────────────────────── */}
      {/* Relocated from the end of the single-route page to this tab, per the approved
          blueprint (MN-1): under a tab architecture Tabs 2–4 are optional views, so a
          reviewer who never leaves Overview must still reach the evidence boundary. */}
      <EvidenceBoundarySection />
    </main>
  );
}
