import React from 'react';
import { pressureCases, scenarioLoad, resilienceBoundary } from '../content';

/**
 * The operating pressure the design has to survive. This block is REASONING, not
 * measurement — docs/whitetail/06-operational-validation.md is labelled
 * [OPERATIONAL HYPOTHESIS] throughout and contains no data. The label above the table
 * says so plainly, because everything else on this page is a measurement and a reader
 * is entitled to know which is which. Card idiom matches LoopDiagram/SystemsStack.
 */
export function PressureCases() {
  return (
    <div className="mb-8 rounded-[2rem] border border-neutral-200 bg-white p-6 md:p-8">
      <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
        Reasoning, not measurement
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600">
        Before any surface was drawn, the failure modes were mapped against the pressures a grounds operation
        actually runs under. Nothing in this block was measured or observed — it is analysis of how the system
        could be bent, and three of the five bends are rated as fatal to it.
      </p>

      <p
        aria-hidden="true"
        className="mb-2 mt-6 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-300 md:hidden"
      >
        Scroll →
      </p>
      <div className="mt-2 overflow-x-auto rounded-[1rem] border border-neutral-200 md:mt-6">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-neutral-200">
              <th scope="col" className="px-5 py-4 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
                Pressure
              </th>
              <th scope="col" className="px-5 py-4 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
                The temptation
              </th>
              <th scope="col" className="px-5 py-4 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
                Damage
              </th>
            </tr>
          </thead>
          <tbody>
            {pressureCases.map((row) => (
              <tr key={row.pressure} className="border-b border-neutral-100 last:border-0">
                <td className="px-5 py-4 align-top text-sm font-semibold leading-relaxed text-neutral-900">
                  {row.pressure}
                </td>
                <td className="px-5 py-4 align-top text-sm leading-relaxed text-neutral-600">{row.temptation}</td>
                <td
                  className={`px-5 py-4 align-top text-sm leading-relaxed ${
                    row.fatal ? 'font-bold text-neutral-950' : 'text-neutral-600'
                  }`}
                >
                  {row.damage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * What each surface was carrying when it was measured. The `condition` strings are
 * verbatim from the wireframe files; the amber treatment is the same one the 28-zone
 * [DH] callout uses, and for the same reason — this is test content, not property fact.
 */
export function ScenarioLoad() {
  return (
    <div className="mb-8 rounded-[2rem] border border-amber-200 bg-amber-50/60 p-6 md:p-8">
      <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-amber-700">
        Test content — not property facts
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-700">
        Each surface was loaded with a real operating decision written out in full, rather than with placeholder
        text. The quoted lines below are what the tested artifacts actually rendered. The intervals inside them are
        illustrative — no such window is established anywhere in the research — and what was measured is never the
        operation. It is always the structure.
      </p>

      <dl className="mt-6 space-y-4">
        {scenarioLoad.map((item) => (
          <div key={item.surface} className="rounded-2xl border border-neutral-200 bg-white p-5">
            <dt className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
              {item.surface}
            </dt>
            <dd className="mt-2.5">
              <p className="font-tiempos text-base leading-snug text-neutral-900 md:text-lg">
                “{item.condition}”
              </p>
              <p className="mt-3 border-t border-neutral-100 pt-3 text-sm leading-relaxed text-neutral-600">
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
                  Measured
                </span>{' '}
                {item.measured}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * What was never stress-tested. Mirrors BoundaryStrip on the Architecture tab — same
 * treatment, same purpose: a stated limit reads as rigor, an unstated one reads as a gap.
 */
export function ResilienceBoundary() {
  return (
    <div className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 md:mt-10 md:p-8">
      <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
        What was never stress-tested
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600">
        Everything above was measured against rendered HTML. That is a real form of evidence and a narrow one.
        Four things this design has to survive were not put under load at all.
      </p>
      <dl className="mt-6 grid gap-4 md:grid-cols-2">
        {resilienceBoundary.map((item) => (
          <div key={item.gap} className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
            <dt className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-amber-700">
              {item.gap}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-neutral-700">{item.reason}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
