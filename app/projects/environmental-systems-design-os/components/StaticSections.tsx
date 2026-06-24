import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, X } from 'lucide-react';
import { SectionKicker } from './SectionKicker';
import {
  CONTENT_BOUNDS,
  NOTION_OS_URL,
  operatingPrinciples,
  evidenceBoundary,
  crossProjectCards,
} from '../content';

// 08 // OS Operating Principles
export function OperatingPrinciplesSection() {
  return (
    <section id="osds-principles" className="bg-neutral-950 py-16 text-white md:py-28">
      <div className={CONTENT_BOUNDS}>
        <SectionKicker eyebrow="08 // Operating Principles" title="The principles that govern how the OS works." dark>
          <p>Six rules define how the OS converts observation into publishable work.</p>
        </SectionKicker>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {operatingPrinciples.map((p) => (
            <article key={p.number} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="font-mono text-xl font-bold text-amber-300">{p.number} /</p>
              <h3 className="mt-4 font-tiempos text-xl font-bold leading-tight text-white">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// 09 // Evidence Boundary
export function EvidenceBoundarySection() {
  return (
    <section id="osds-boundary" className="border-t border-neutral-100 bg-neutral-50 py-16 md:py-28">
      <div className={CONTENT_BOUNDS}>
        <SectionKicker eyebrow="09 // Evidence Boundary" title="What the OS contains and what it does not claim." />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-white p-6 md:p-8">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-emerald-700">Established</p>
            <ul className="mt-6 space-y-4">
              {evidenceBoundary.established.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-700">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-emerald-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">Not claimed</p>
            <ul className="mt-6 space-y-4">
              {evidenceBoundary.notClaimed.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-500">
                  <X className="mt-0.5 h-4 w-4 flex-none text-neutral-400" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ExploreCtaSection() {
  return (
    <section id="osds-explore" className="bg-white py-16 md:py-28 flex flex-col items-center">
      <div className={`${CONTENT_BOUNDS} w-full`}>
        <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-8 text-center md:p-14 flex flex-col items-center">
          
          {/* Force any internal flex container inside SectionKicker to center its items */}
<div className="w-full flex justify-center [&_div]:justify-center [&_header]:justify-center">
  <SectionKicker eyebrow="10 // Explore the OS" title="The OS is a living research environment." />
</div>

          <div className="mx-auto -mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
            <p>
              What appears in this portfolio represents its published outputs and curated artifacts. The working
              environment contains audit notes, in-progress hypotheses, and research that has not yet been structured
              into portfolio-ready frameworks.
            </p>
          </div>
          <div className="mt-8 flex flex-col items-center">
            <a
              href={NOTION_OS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            >
              Explore the Notion OS
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-neutral-400">
              The OS is shared as a research artifact. Some material is in active development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Cross-project footer (before the site footer)
export function CrossProjectFooter() {
  return (
    <section id="osds-connections" className="border-t border-neutral-100 bg-neutral-950 py-16 text-white md:py-24">
      <div className={CONTENT_BOUNDS}>
        <h2 className="font-tiempos text-2xl font-bold leading-tight text-white md:text-3xl">
          Where the OS connects to the portfolio
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {crossProjectCards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-amber-300/40 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-amber-300">
                {card.relationship}
              </p>
              <h3 className="mt-4 font-tiempos text-xl font-bold leading-tight text-white">{card.title}</h3>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-300 transition-colors group-hover:text-white">
                View project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
