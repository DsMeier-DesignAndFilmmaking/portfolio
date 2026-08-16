import { Repeat } from 'lucide-react';
import {
  ecosystemActors,
  ecosystemDomains,
  ecosystemFinding,
  ecosystemRelations,
  getEcosystemDegrees,
  getFailurePoints,
  getFeedbackPairs,
  getUniversalConnectors,
  relationLabels,
  strengthLabels,
  type EcosystemDomain,
} from '../content/frameworks';
import {
  DegreeMeter,
  DiagramLegend,
  FailureCallout,
  FrameworkShell,
  MetaChip,
  RelationBadge,
  StrengthDots,
  ToneChip,
  cn,
  toneStyles,
} from './diagram-primitives';

// ─────────────────────────────────────────────────────────────────────────────
// Framework 01 · Environmental Experience Ecosystem
//
// Nine actors across three domains, with a typed, weighted relationship
// ledger. Connection counts, influence strength, and the "universal
// connector" finding are all DERIVED from `ecosystemRelations` — edit the
// edges and the findings follow.
// ─────────────────────────────────────────────────────────────────────────────

const DOMAIN_ORDER: EcosystemDomain[] = ['human', 'engineered', 'living'];

const actorName = (id: string) => ecosystemActors.find((a) => a.id === id)?.name ?? id;
const actorTone = (id: string) => ecosystemActors.find((a) => a.id === id)?.tone ?? 'operations';

export default function EnvironmentalExperienceEcosystem() {
  const degrees = getEcosystemDegrees();
  const maxDegree = Math.max(...Object.values(degrees));
  const connectors = getUniversalConnectors();
  const connectorIds = new Set(connectors.map((c) => c.id));
  const feedbackPairs = getFeedbackPairs();
  const failurePoints = getFailurePoints();

  return (
    <FrameworkShell
      id="rcos-ecosystem"
      eyebrow="Atlas 01"
      title="Environmental Experience Ecosystem"
      description="Nine actors, three domains, and the relationships that connect them — each one typed, weighted by influence strength, and named. Everything is connected. Not everything is connected equally."
      summary={`An ecosystem map of nine actors — guests, staff, operations, infrastructure, energy, water, landscape, wildlife, and stewardship — grouped into human, engineered, and living domains. ${ecosystemRelations.length} directed relationships connect them, typed as depends on, constrains, pressures, or sustains, and each rated for influence strength. ${ecosystemFinding}`}
      caption={ecosystemFinding}
    >
      {/* Actor cards, grouped by domain */}
      <div className="space-y-6">
        {DOMAIN_ORDER.map((domain) => {
          const actors = ecosystemActors.filter((a) => a.domain === domain);
          const meta = ecosystemDomains[domain];

          return (
            <section key={domain} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 md:p-6">
              <header className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <h4 className="font-tiempos text-xl font-bold leading-tight text-neutral-950">
                  {meta.label}
                </h4>
                <p className="max-w-md text-xs leading-relaxed text-neutral-500">{meta.description}</p>
              </header>

              <div className="grid gap-3 md:grid-cols-3">
                {actors.map((actor) => {
                  const tone = toneStyles[actor.tone];
                  const isConnector = connectorIds.has(actor.id);

                  return (
                    <article
                      key={actor.id}
                      className={cn(
                        'flex flex-col rounded-2xl border bg-white p-5',
                        isConnector ? 'border-rockcreek-300 ring-1 ring-rockcreek-200' : 'border-neutral-200',
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className={cn('h-2 w-2 rounded-full', tone.dot)} aria-hidden="true" />
                        <h5 className="font-tiempos text-xl font-bold leading-tight text-neutral-950">
                          {actor.name}
                        </h5>
                      </div>

                      <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">{actor.role}</p>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <ToneChip tone={actor.tone}>{tone.label}</ToneChip>
                        {isConnector && (
                          <span className="inline-flex items-center rounded-full border border-rockcreek-200 bg-rockcreek-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-rockcreek-700">
                            Universal connector
                          </span>
                        )}
                      </div>

                      <div className="mt-4 border-t border-neutral-100 pt-4">
                        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                          Connections
                        </p>
                        <DegreeMeter
                          value={degrees[actor.id] ?? 0}
                          max={maxDegree}
                          label={`${actor.name} connection count`}
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Relationship ledger */}
      <section className="mt-6 rounded-2xl border border-neutral-200 bg-white">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 p-5">
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
              Relationship ledger
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              {ecosystemRelations.length} directed relationships, four types.
            </p>
          </div>
          <DiagramLegend
            items={[
              { swatch: 'bg-violet-500', label: 'Depends on' },
              { swatch: 'bg-sky-500', label: 'Constrains' },
              { swatch: 'bg-rose-500', label: 'Pressures' },
              { swatch: 'bg-emerald-500', label: 'Sustains' },
            ]}
          />
        </header>

        {/* Desktop column headers */}
        <div className="hidden gap-4 border-b border-neutral-100 px-5 py-3 lg:grid lg:grid-cols-[minmax(0,7rem)_minmax(0,8rem)_minmax(0,7rem)_minmax(0,1fr)_minmax(0,5.5rem)]">
          {['Source', 'Relation', 'Target', 'Mechanism', 'Strength'].map((label) => (
            <p key={label} className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
              {label}
            </p>
          ))}
        </div>

        <ul className="divide-y divide-neutral-100">
          {ecosystemRelations.map((relation) => (
            <li
              key={`${relation.from}-${relation.type}-${relation.to}`}
              className="grid gap-2 px-5 py-4 lg:grid-cols-[minmax(0,7rem)_minmax(0,8rem)_minmax(0,7rem)_minmax(0,1fr)_minmax(0,5.5rem)] lg:items-center lg:gap-4"
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn('h-1.5 w-1.5 rounded-full', toneStyles[actorTone(relation.from)].dot)}
                  aria-hidden="true"
                />
                <span className="text-sm font-bold text-neutral-950">{actorName(relation.from)}</span>
              </div>

              <div>
                <RelationBadge type={relation.type} label={relationLabels[relation.type].label} />
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={cn('h-1.5 w-1.5 rounded-full', toneStyles[actorTone(relation.to)].dot)}
                  aria-hidden="true"
                />
                <span className="text-sm font-bold text-neutral-950">{actorName(relation.to)}</span>
              </div>

              <p className="text-sm leading-relaxed text-neutral-600">{relation.note}</p>

              <div>
                <StrengthDots value={relation.strength} label={strengthLabels[relation.strength]} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Feedback loops — reciprocal pairs derived from the ledger */}
      <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/50 p-4 md:p-6">
        <header className="mb-4 flex items-start gap-3">
          <Repeat className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">
              Feedback loops · {feedbackPairs.length} closed pairs
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-700">
              Six actor pairs run edges in both directions — a change in either one eventually
              feeds back on itself through the other.
            </p>
          </div>
        </header>

        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {feedbackPairs.map(({ a, b, relations }) => (
            <div key={`${a.id}-${b.id}`} className="rounded-xl border border-amber-200 bg-white p-4">
              <p className="text-sm font-bold text-neutral-900">
                {a.name} <span aria-hidden="true">↔</span> <span className="sr-only">and</span> {b.name}
              </p>
              <ul className="mt-2 space-y-1">
                {relations.map((r) => (
                  <li key={`${r.from}-${r.to}-${r.type}`} className="text-xs leading-relaxed text-neutral-500">
                    <span className="font-semibold text-neutral-700">{actorName(r.from)}</span>{' '}
                    {relationLabels[r.type].gloss} <span className="font-semibold text-neutral-700">{actorName(r.to)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Failure points — every relation that actively degrades its target */}
      <section className="mt-6 rounded-2xl border border-rose-200 bg-rose-50/40 p-4 md:p-6">
        <header className="mb-4">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-rose-700">
            Failure points · {failurePoints.length} pressuring relations
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-700">
            Every relationship typed “pressures” is a place the system degrades under load, not
            just where it depends or constrains.
          </p>
        </header>

        <div className="grid gap-3 md:grid-cols-2">
          {failurePoints.map((r) => (
            <FailureCallout key={`${r.from}-${r.to}`} label={`${actorName(r.from)} → ${actorName(r.to)}`}>
              {r.note}
            </FailureCallout>
          ))}
        </div>
      </section>

      {/* Derived finding */}
      <section className="mt-6 rounded-2xl border border-rockcreek-200 bg-rockcreek-50/60 p-5 md:p-6">
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-rockcreek-700">
          Derived from the ledger
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {connectors.map((connector) => (
            <div
              key={connector.id}
              className="flex items-center gap-3 rounded-xl border border-rockcreek-200 bg-white px-4 py-3"
            >
              <span className={cn('h-2 w-2 rounded-full', toneStyles[connector.tone].dot)} aria-hidden="true" />
              <div>
                <p className="text-sm font-bold text-neutral-950">{connector.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                  Adjacent to all {ecosystemActors.length - 1} others
                </p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <MetaChip>{ecosystemActors.length} actors</MetaChip>
            <MetaChip>{ecosystemRelations.length} relationships</MetaChip>
          </div>
        </div>
      </section>
    </FrameworkShell>
  );
}
