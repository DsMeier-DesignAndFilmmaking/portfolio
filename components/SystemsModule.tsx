// SystemsModule — a reusable "systems design" narrative section for the case
// study pages (app/projects/previous/<id>/page.tsx and the Purdue page).
//
// Visual language is derived entirely from the existing dark case-study pages:
//   - section chrome:   py-20 bg-black / container mx-auto px-6
//   - headings:         text-3xl font-bold text-white
//   - body / labels:    text-gray-300 / text-gray-400 / text-gray-500
//   - cards:            bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl
// The metrics cards reuse the existing StatCard chrome + typography exactly
// (minus the icon, which has no field in the prop shape) so a visitor cannot
// tell new numbers from the ones already on the page.
//
// Pure presentational component: no hooks, no client-only APIs, no animation
// libraries — safe to drop into the 'use client' case-study pages or render
// on its own. Any color transition is gated behind motion-safe:.

import React from 'react';

export interface SystemsMetric {
  value: string;
  label: string;
  /** Marks a hypothetical/illustrative figure. Code-clarity annotation only —
   *  it intentionally does NOT change how the metric renders. */
  isPlaceholder?: boolean;
}

export interface SystemMapStep {
  label: string;
  /** Optional sub-branches shown nested under the step (e.g. decision options). */
  branch?: string[];
}

export interface SystemsModuleProps {
  heading?: string;
  introText: string;
  decisionPoints: string[];
  metrics: SystemsMetric[];
  feedbackLoop: string;
  systemMap: SystemMapStep[];
}

/** Small uppercase section label, matching the existing "Tools Used:" idiom. */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
      {children}
    </p>
  );
}

/** Downward connector arrow drawn between system-map steps. Inline SVG so the
 *  module carries no icon dependency of its own. */
function StepConnector() {
  return (
    <div aria-hidden="true" className="flex items-center gap-2 py-2 pl-5 text-gray-600">
      <svg width="14" height="18" viewBox="0 0 14 18" fill="none" className="shrink-0">
        <path
          d="M7 0v16M7 16l-5-5M7 16l5-5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function SystemsModule({
  heading = 'Systems Approach',
  introText,
  decisionPoints,
  metrics,
  feedbackLoop,
  systemMap,
}: SystemsModuleProps) {
  const headingId = React.useId();

  return (
    <section aria-labelledby={headingId} className="bg-black py-20">
      <div className="container mx-auto px-6">
        {/* Heading + intro */}
        <h2 id={headingId} className="text-3xl font-bold text-white">
          {heading}
        </h2>
        <p className="mt-6 max-w-3xl text-gray-300 leading-relaxed">{introText}</p>

        {/* Metrics — reuses the existing StatCard chrome/typography exactly */}
        {metrics.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {metrics.map((metric, i) => (
              <div
                key={`${metric.label}-${i}`}
                data-placeholder={metric.isPlaceholder ? 'true' : undefined}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="mb-2 text-3xl font-bold text-white">{metric.value}</div>
                <div className="text-gray-400">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Lower half: decision points + feedback loop (left), system map (right) */}
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          {/* Left column */}
          <div className="lg:col-span-5">
            {decisionPoints.length > 0 && (
              <div>
                <FieldLabel>Key decision points</FieldLabel>
                <ul className="space-y-3">
                  {decisionPoints.map((point, i) => (
                    <li key={i} className="flex gap-3 text-gray-300">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40"
                      />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {feedbackLoop && (
              <div className="mt-10">
                <FieldLabel>Feedback loop</FieldLabel>
                <p className="border-l-2 border-white/15 pl-4 text-gray-300 leading-relaxed">
                  {feedbackLoop}
                </p>
              </div>
            )}
          </div>

          {/* Right column — the system map (signature element) */}
          {systemMap.length > 0 && (
            <div className="lg:col-span-7">
              <FieldLabel>System map</FieldLabel>
              <ol className="mt-1">
                {systemMap.map((step, i) => (
                  <li key={i}>
                    <div className="group rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm motion-safe:transition-colors hover:border-white/25">
                      <div className="flex items-baseline gap-3">
                        <span className="shrink-0 font-mono text-xs tabular-nums text-gray-500">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-medium text-white">{step.label}</span>
                      </div>
                    </div>

                    {step.branch && step.branch.length > 0 && (
                      <ul className="ml-5 mt-3 space-y-2 border-l border-white/10 pl-5">
                        {step.branch.map((b, j) => (
                          <li key={j} className="relative text-sm leading-relaxed text-gray-400">
                            <span
                              aria-hidden="true"
                              className="absolute top-2.5 -left-5 h-px w-3 bg-white/15"
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {i < systemMap.length - 1 && <StepConnector />}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
