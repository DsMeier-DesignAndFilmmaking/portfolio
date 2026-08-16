import { AlertTriangle, Repeat } from 'lucide-react';
import {
  sovereigntyCascade,
  sovereigntyEvidenceNote,
  sovereigntyFinding,
  sovereigntyMutualNote,
  sovereigntySystems,
  sovereigntyTiers,
  type SovereigntyTier,
} from '../content/frameworks';
import {
  DegreeMeter,
  FrameworkShell,
  MetaChip,
  ModeledNote,
  ToneChip,
  cn,
  toneStyles,
} from './diagram-primitives';

// ─────────────────────────────────────────────────────────────────────────────
// Atlas 04a · Infrastructure Dependency Model (supporting evidence)
//
// Seven physical systems ordered by dependency depth, from the ecological
// substrate up to what the guest touches. This is the companion evidence for
// the interactive five-layer Sovereignty stack (SovereigntyLayerStack.tsx):
// the stack answers "who is responsible," this answers "what breaks
// together." Cascade breadth is derived by walking `dependsOn` one level, so
// the "widest cascade" claim is computed, not asserted.
// ─────────────────────────────────────────────────────────────────────────────

const TIER_ORDER: SovereigntyTier[] = ['derived', 'primary', 'root', 'substrate'];

const systemName = (id: string) => sovereigntySystems.find((s) => s.id === id)?.name ?? id;

/**
 * Systems that directly require `id`.
 *
 * Deliberately first-order. The dependency graph is cyclic — energy needs the
 * road that needs energy — so a transitive walk collapses to "everything takes
 * down everything" and destroys the diagram's information value. The cycles
 * themselves are surfaced separately by `findMutualDependencies`.
 */
function directDependents(id: string): string[] {
  return sovereigntySystems.filter((s) => s.dependsOn.includes(id)).map((s) => s.id);
}

/** Pairs where each system requires the other. Neither can be restored first. */
function findMutualDependencies(id: string): string[] {
  const system = sovereigntySystems.find((s) => s.id === id);
  if (!system) return [];
  return system.dependsOn.filter((depId) => {
    const dep = sovereigntySystems.find((s) => s.id === depId);
    return Boolean(dep?.dependsOn.includes(id));
  });
}

export default function InfrastructureDependencyModel() {
  const cascades = Object.fromEntries(
    sovereigntySystems.map((system) => [system.id, directDependents(system.id)]),
  ) as Record<string, string[]>;

  const mutuals = Object.fromEntries(
    sovereigntySystems.map((system) => [system.id, findMutualDependencies(system.id)]),
  ) as Record<string, string[]>;


  return (
    <FrameworkShell
      id="rcos-dependency-model"
      eyebrow="Atlas 04a · Supporting evidence"
      title="Infrastructure Dependency Model"
      description="Seven physical systems ordered by dependency depth. Read bottom to top: ecology carries everything, energy carries everything engineered, and what the guest touches fails last — which is why it fails visibly."
      summary={`A dependency model of seven systems — ecology, energy, water, connectivity, mobility, shelter, and food — arranged in four tiers from substrate to derived. Each system shows what it depends on, its modeled days of autonomous operation, its single point of failure, and the systems that directly fail with it. Two pairs are mutually dependent. A worst-case cascade runs from a road closure through fuel resupply, generation, water treatment, and habitability. ${sovereigntyFinding}`}
      caption={sovereigntyFinding}
    >
      <div className="space-y-4">
        {TIER_ORDER.map((tierId) => {
          const systems = sovereigntySystems.filter((s) => s.tier === tierId);
          if (systems.length === 0) return null;
          const tierMeta = sovereigntyTiers[tierId];

          return (
            <section key={tierId} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 md:p-6">
              <header className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <div className="flex items-center gap-3">
                  <MetaChip>{tierMeta.label}</MetaChip>
                  <p className="text-xs leading-relaxed text-neutral-500">{tierMeta.description}</p>
                </div>
              </header>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {systems.map((system) => {
                  const tone = toneStyles[system.tone];
                  const cascade = cascades[system.id] ?? [];
                  const mutual = mutuals[system.id] ?? [];

                  return (
                    <article
                      key={system.id}
                      className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={cn('h-2 w-2 rounded-full', tone.dot)} aria-hidden="true" />
                          <h4 className="font-tiempos text-xl font-bold leading-tight text-neutral-950">
                            {system.name}
                          </h4>
                        </div>
                        <ToneChip tone={system.tone}>{tone.label}</ToneChip>
                      </div>

                      {/* Autonomy */}
                      <div className="mt-5">
                        <div className="mb-2 flex items-baseline justify-between gap-2">
                          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                            Autonomy
                          </p>
                          <p className="text-[11px] font-semibold text-neutral-600">{system.autonomyLabel}</p>
                        </div>
                        <DegreeMeter
                          value={system.autonomy}
                          max={5}
                          label={`${system.name} modeled autonomy`}
                        />
                      </div>

                      {/* Dependencies */}
                      <div className="mt-5">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                          Depends on
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {system.dependsOn.length > 0 ? (
                            system.dependsOn.map((dep) => (
                              <span
                                key={dep}
                                className={cn(
                                  'inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-semibold',
                                  mutual.includes(dep)
                                    ? 'border-amber-300 bg-amber-50 text-amber-800'
                                    : 'border-neutral-200 bg-neutral-50 text-neutral-700',
                                )}
                              >
                                {systemName(dep)}
                                {mutual.includes(dep) && (
                                  <span className="font-mono text-[9px] font-black uppercase tracking-[0.1em]">
                                    mutual
                                  </span>
                                )}
                              </span>
                            ))
                          ) : (
                            <span className="text-[11px] font-semibold italic text-neutral-500">
                              Nothing in this model
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Direct dependents */}
                      <div className="mt-5">
                        <div className="mb-2 flex items-baseline justify-between gap-2">
                          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                            Direct cascade
                          </p>
                          <p className="text-[11px] font-semibold text-neutral-600">
                            {cascade.length === 0 ? 'Contained' : 'Immediate'}
                          </p>
                        </div>
                        <DegreeMeter
                          value={cascade.length}
                          max={sovereigntySystems.length - 1}
                          label={`${system.name} direct cascade breadth`}
                          tone="rose"
                        />
                        <p className="mt-2 text-[11px] leading-relaxed text-neutral-500">
                          {cascade.length > 0
                            ? `Fails with it: ${cascade.map(systemName).join(', ')}.`
                            : 'Nothing else in this model depends on it directly.'}
                        </p>
                      </div>

                      {/* SPOF */}
                      <div className="mt-5 flex-1 rounded-xl border border-rose-200 bg-rose-50/70 p-3">
                        <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-rose-700">
                          Single point of failure
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-neutral-700">
                          {system.singlePointOfFailure}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Mutual dependencies — the cycles in the graph */}
      <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/50 p-4 md:p-6">
        <header className="mb-4 flex items-start gap-3">
          <Repeat className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">
              Mutual dependencies
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-700">
              {sovereigntyMutualNote}
            </p>
          </div>
        </header>

        <ul className="flex flex-wrap gap-2">
          {sovereigntySystems.flatMap((system) =>
            (mutuals[system.id] ?? [])
              // render each pair once
              .filter((depId) => system.id < depId)
              .map((depId) => (
                <li
                  key={`${system.id}-${depId}`}
                  className="rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900"
                >
                  {system.name} <span aria-hidden="true">↔</span>
                  <span className="sr-only">and</span> {systemName(depId)}
                </li>
              )),
          )}
        </ul>
      </section>

      {/* Worst-case cascade chain */}
      <section className="mt-6 rounded-2xl border border-rose-200 bg-rose-50/50 p-4 md:p-6">
        <header className="mb-5 flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" aria-hidden="true" />
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-rose-700">
              Worst-case cascade
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-700">
              No single failure ends a stay. The sequence does — and it starts with the least
              engineered system on the property.
            </p>
          </div>
        </header>

        <ol className="grid gap-2 md:grid-cols-3 xl:grid-cols-6">
          {sovereigntyCascade.map((step, index) => (
            <li
              key={step}
              className="rounded-xl border border-rose-200 bg-white px-4 py-3"
            >
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-rose-600">
                Step {String(index + 1).padStart(2, '0')}
              </p>
              <p className="mt-2 text-sm font-semibold leading-snug text-neutral-900">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <ModeledNote>{sovereigntyEvidenceNote}</ModeledNote>
    </FrameworkShell>
  );
}
