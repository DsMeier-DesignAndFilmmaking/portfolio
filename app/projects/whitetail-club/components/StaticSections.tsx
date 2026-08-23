import React from 'react';
import { Check, X } from 'lucide-react';
import Link from 'next/link';
import { SectionKicker } from './SectionKicker';
import { CONTENT_BOUNDS, evidenceBoundary, INDEPENDENT_DISCLAIMER } from '../content';

/** 10 // Evidence Boundary — the required trust module. Under-claims on purpose. */
export function EvidenceBoundarySection() {
  return (
    <section id="wt-boundary" className="border-t border-neutral-100 bg-neutral-50 py-16 md:py-28">
      <div className={CONTENT_BOUNDS}>
        <SectionKicker
          eyebrow="10 // Evidence Boundary"
          title="What this project established, and what it does not claim."
        >
          <p>
            The distinction the system is built to preserve is the same one this page owes its reader. Stating the
            limits plainly is what makes the rest of it worth believing.
          </p>
        </SectionKicker>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-white p-6 md:p-8">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-emerald-700">
              Established
            </p>
            <ul className="mt-6 space-y-4">
              {evidenceBoundary.established.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-700">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-emerald-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-neutral-300 bg-white p-6 md:p-8">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-500">
              Not claimed
            </p>
            <ul className="mt-6 space-y-4">
              {evidenceBoundary.notClaimed.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-700">
                  <X className="mt-0.5 h-4 w-4 flex-none text-neutral-400" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-sm italic leading-relaxed text-neutral-500">{INDEPENDENT_DISCLAIMER}</p>
      </div>
    </section>
  );
}

/** Cross-project footer — mirrors the pattern used on sibling practice pages. */
export function CrossProjectFooter() {
  return (
    <section className="bg-neutral-950 py-16 md:py-24">
      <div className={CONTENT_BOUNDS}>
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">
          Elsewhere in the practice
        </p>
        <h2 className="mt-5 max-w-2xl font-tiempos text-2xl font-bold leading-tight text-white md:text-4xl">
          Related work on environmental systems and stewardship.
        </h2>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/projects/rock-creek-os"
            className="inline-flex min-h-[44px] items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            Case Study: The Ranch at Rock Creek
          </Link>
          <Link
            href="/projects/environmental-systems-design-os"
            className="inline-flex min-h-[44px] items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            Research OS
          </Link>
          <Link
            href="/projects"
            className="inline-flex min-h-[44px] items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            All projects
          </Link>
        </div>
      </div>
    </section>
  );
}
