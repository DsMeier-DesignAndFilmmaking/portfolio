import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionKicker } from './SectionKicker';
import { LayerTags, Tag, RelevanceMeter, ConfidenceBadge, SectionPlaceholder } from './primitives';
import { CONTENT_BOUNDS } from '../content';
import type {
  StudiedOrganization,
  SystemArtifact,
  ExperiencePattern,
  OsProject,
  PortfolioAsset,
} from '@/lib/notion-os';

function MaturityBadge({ value }: { value: string }) {
  const prominent = value === 'Portfolio Candidate';
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
        prominent
          ? 'border-amber-400 bg-amber-400 text-neutral-900'
          : 'border-neutral-200 bg-white text-neutral-500'
      }`}
    >
      {value || '—'}
    </span>
  );
}

// 03 // Organizations Being Studied
export function OrganizationsSection({ orgs }: { orgs: StudiedOrganization[] }) {
  return (
    <section id="osds-organizations" className="border-t border-neutral-100 bg-white py-16 md:py-28">
      <div className={CONTENT_BOUNDS}>
        <SectionKicker eyebrow="03 // Organizations Being Studied" title="Real systems under active research.">
          <p>
            The OS audits how real organizations help people navigate complexity across environmental, operational, and
            digital layers. Each study builds the evidence base for pattern extraction and artifact development.
          </p>
        </SectionKicker>
        {orgs.length === 0 ? (
          <SectionPlaceholder>
            Research organizations are tracked in the OS and will appear here as the integration is populated.
          </SectionPlaceholder>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {orgs.map((org) => (
              <article
                key={org.name}
                className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-950/[0.03] transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-tiempos text-2xl font-bold leading-tight text-neutral-950">{org.name}</h3>
                </div>
                {org.orgType && <Tag className="mt-3 w-fit">{org.orgType}</Tag>}
                <LayerTags layers={org.systemsLayers} className="mt-5" />
                <div className="mt-auto pt-6">
                  <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                    Strategic relevance
                  </p>
                  <RelevanceMeter value={org.strategicRelevance} />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// 04 // System Artifacts Registry
export function ArtifactsSection({ artifacts }: { artifacts: SystemArtifact[] }) {
  return (
    <section id="osds-artifacts" className="bg-neutral-50 py-16 md:py-28">
      <div className={CONTENT_BOUNDS}>
        <SectionKicker
          eyebrow="04 // System Artifacts Registry"
          title="The OS maintains a registry of reusable system artifacts."
        >
          <p>
            Artifacts are typed, evidenced design components — not one-off illustrations. Each carries its artifact type,
            maturity level, and evidence confidence. They supply the decision models, signal taxonomies, and recovery
            architectures used across every portfolio project.
          </p>
        </SectionKicker>
        {artifacts.length === 0 ? (
          <SectionPlaceholder>
            System artifacts are maintained in the OS registry and will appear here as the integration is populated.
          </SectionPlaceholder>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            {/* Header row (desktop) */}
            <div className="hidden grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.2fr)] gap-4 border-b border-neutral-200 bg-neutral-50 px-6 py-3 lg:grid">
              {['Artifact', 'Type', 'Maturity', 'Confidence', 'Project'].map((h) => (
                <p key={h} className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">
                  {h}
                </p>
              ))}
            </div>
            <ul>
              {artifacts.map((a) => (
                <li
                  key={`${a.name}-${a.version}`}
                  className="grid gap-3 border-b border-neutral-100 px-6 py-5 last:border-b-0 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center lg:gap-4"
                >
                  <div>
                    <p className="font-tiempos text-lg font-bold leading-snug text-neutral-950">{a.name}</p>
                    {a.version && (
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-400">
                        {a.version}
                      </p>
                    )}
                  </div>
                  <div>{a.artifactType && <Tag>{a.artifactType}</Tag>}</div>
                  <div>
                    <MaturityBadge value={a.maturity} />
                  </div>
                  <div>
                    <ConfidenceBadge value={a.evidenceConfidence} />
                  </div>
                  <div>
                    {a.project ? (
                      <span className="inline-flex items-center rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-700">
                        {a.project}
                      </span>
                    ) : (
                      <span className="text-xs text-neutral-300">—</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

// 05 // Experience Patterns Library
export function PatternsSection({ patterns }: { patterns: ExperiencePattern[] }) {
  return (
    <section id="osds-patterns" className="border-t border-neutral-100 bg-white py-16 md:py-28">
      <div className={CONTENT_BOUNDS}>
        <SectionKicker
          eyebrow="05 // Experience Patterns Library"
          title="Recurring design patterns extracted from research and observation."
        >
          <p>
            Each pattern represents a repeatedly observed mechanism — a way that well-designed systems help people
            navigate uncertainty, act with confidence, or recover from disruption. Patterns with Strategic Relevance ≥ 4
            are shown here.
          </p>
        </SectionKicker>
        {patterns.length === 0 ? (
          <SectionPlaceholder>
            High-relevance experience patterns are extracted in the OS and will appear here as the integration is
            populated.
          </SectionPlaceholder>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {patterns.map((p) => (
              <article
                key={p.name}
                className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-950/[0.03]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-tiempos text-xl font-bold leading-tight text-neutral-950">{p.name}</h3>
                  <span className="font-mono text-sm font-bold text-amber-500">{p.strategicRelevance}</span>
                </div>
                {p.valueIntent && (
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{p.valueIntent}</p>
                )}
                <LayerTags layers={p.systemsLayers} className="mt-5" />
                <div className="mt-auto pt-5">
                  {p.maturity && <Tag>{p.maturity}</Tag>}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// 06 // Projects Pipeline
export function ProjectsSection({ projects }: { projects: OsProject[] }) {
  return (
    <section id="osds-projects" className="bg-neutral-50 py-16 md:py-28">
      <div className={CONTENT_BOUNDS}>
        <SectionKicker eyebrow="06 // Projects Pipeline" title="What the OS has produced.">
          <p>
            Portfolio projects that emerged from OS research, pattern synthesis, and design opportunity development. Each
            project connects back to evidence in the OS through its system artifacts and portfolio assets.
          </p>
        </SectionKicker>
        {projects.length === 0 ? (
          <SectionPlaceholder>
            Projects move through the OS pipeline and will appear here as the integration is populated.
          </SectionPlaceholder>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => {
              const card = (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-tiempos text-2xl font-bold leading-tight text-neutral-950">{project.name}</h3>
                    {project.externalLink && (
                      <ArrowUpRight
                        className="h-5 w-5 flex-none text-neutral-300 transition-colors group-hover:text-amber-500"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  {project.pitch && (
                    <p className="mt-4 text-sm leading-relaxed text-neutral-600">{project.pitch}</p>
                  )}
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {project.workType && <Tag>{project.workType}</Tag>}
                    {project.maturityStage && (
                      <Tag className="border-amber-200 bg-amber-50 text-amber-700">{project.maturityStage}</Tag>
                    )}
                  </div>
                  <LayerTags layers={project.systemsLayers} className="mt-4" />
                </>
              );

              return project.externalLink ? (
                <a
                  key={project.name}
                  href={project.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-950/[0.03] transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 md:p-8"
                >
                  {card}
                </a>
              ) : (
                <article
                  key={project.name}
                  className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-950/[0.03] md:p-8"
                >
                  {card}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

// 07 // Portfolio Assets
export function PortfolioAssetsSection({ assets }: { assets: PortfolioAsset[] }) {
  return (
    <section id="osds-assets" className="border-t border-neutral-100 bg-white py-16 md:py-28">
      <div className={CONTENT_BOUNDS}>
        <SectionKicker
          eyebrow="07 // Portfolio Assets"
          title="Published portfolio outputs traced to internal artifacts."
        >
          <p>
            Each portfolio asset represents a public translation of one or more internal system artifacts. The
            traceability from evidence to artifact to published asset is the OS&rsquo;s core governance function.
          </p>
        </SectionKicker>
        {assets.length === 0 ? (
          <SectionPlaceholder>
            Portfolio assets are curated in the OS and will appear here once outputs are marked portfolio-ready.
          </SectionPlaceholder>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <div className="hidden grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_minmax(0,1fr)] gap-4 border-b border-neutral-200 bg-neutral-50 px-6 py-3 lg:grid">
              {['Asset', 'Type', 'Section', 'Evidence role', 'Status'].map((h) => (
                <p key={h} className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">
                  {h}
                </p>
              ))}
            </div>
            <ul>
              {assets.map((asset) => {
                const published = asset.status === 'Published';
                return (
                  <li
                    key={asset.name}
                    className="grid gap-3 border-b border-neutral-100 px-6 py-5 last:border-b-0 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-4"
                  >
                    <p className="font-tiempos text-lg font-bold leading-snug text-neutral-950">{asset.name}</p>
                    <div>{asset.assetType && <Tag>{asset.assetType}</Tag>}</div>
                    <p className="text-sm text-neutral-600">{asset.portfolioSection || '—'}</p>
                    <p className="text-sm text-neutral-600">{asset.evidenceRole || '—'}</p>
                    <div>
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                          published
                            ? 'border-emerald-300 bg-emerald-500 text-white'
                            : 'border-neutral-200 bg-white text-neutral-500'
                        }`}
                      >
                        {asset.status || '—'}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
