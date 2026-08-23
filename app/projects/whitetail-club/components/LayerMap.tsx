import React from 'react';
import { answerValueMap } from '../content';

/**
 * Four peer answers at the interaction layer -> five stored values at the storage layer.
 * The branch on the fourth row is the entire distinction the project spent three phases on.
 */
export function LayerMap() {
  return (
    <div className="overflow-x-auto rounded-[2rem] border border-neutral-200 bg-white p-6 md:p-8">
      <div className="min-w-[520px]">
        <div className="grid grid-cols-2 gap-4 border-b border-neutral-200 pb-3">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
            Interaction layer — four peer answers
          </p>
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
            Storage layer — five outcome values
          </p>
        </div>
        {answerValueMap.map((row) => (
          <div key={row.answer} className="grid grid-cols-2 items-center gap-4 border-b border-neutral-100 py-4">
            <p className="text-sm font-semibold text-neutral-900">{row.answer}</p>
            <p className="font-mono text-xs text-neutral-600">
              {row.branches && <span className="mr-2 text-amber-600" aria-hidden="true">↳</span>}
              {row.value}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-600">
        Four answers. Five stored values. The fourth answer branches through one follow-up question, because
        “I confirmed it isn’t there” and “I couldn’t find it” are epistemically opposite — one raises confidence,
        the other suppresses it. Collapsing them would make the confidence model uncomputable.
      </p>
    </div>
  );
}
