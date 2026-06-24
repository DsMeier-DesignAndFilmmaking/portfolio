import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionKicker } from './SectionKicker';
import { LayerTags, Tag, RelevanceMeter, ConfidenceBadge, SectionPlaceholder } from './primitives';
import { CONTENT_BOUNDS, NOTION_OS_URL } from '../content';
import type {
  StudiedOrganization,
  SystemArtifact,
  ExperiencePattern,
  OsProject,
  PortfolioAsset,
} from '@/lib/notion-os';

// ── Curated static entries ───────────────────────────────────────────────────
// These are used when the Notion databases haven't been exported yet.
// All entries are sourced from existing OS documentation and downstream project pages —
// not fabricated. When Notion returns data, that takes precedence.

const STATIC_ARTIFACTS: SystemArtifact[] = [
  {
    name: 'Environmental Signal Taxonomy',
    artifactType: 'Taxonomy',
    status: '',
    maturity: '',
    evidenceConfidence: '',
    version: '',
    project: '',
  },
  {
    name: 'Confidence Assessment Model',
    artifactType: 'Model',
    status: '',
    maturity: 'Portfolio Candidate',
    evidenceConfidence: '',
    version: '',
    project: 'Architecture of Confidence',
  },
  {
    name: 'Authority Routing Framework',
    artifactType: 'Framework',
    status: '',
    maturity: '',
    evidenceConfidence: '',
    version: '',
    project: 'Architecture of Confidence',
  },
  {
    name: 'Recovery Path Architecture',
    artifactType: 'Architecture',
    status: '',
    maturity: '',
    evidenceConfidence: '',
    version: '',
    project: 'Responsive Ecologies',
  },
  {
    name: 'Experience Patterns Library',
    artifactType: 'Library',
    status: '',
    maturity: '',
    evidenceConfidence: '',
    version: '',
    project: '',
  },
];

// Pattern names and value intents sourced from Architecture of Confidence page.tsx
// (patternGroups + confidencePrinciples arrays). These are the six patterns extracted
// from field research that produced the Architecture of Confidence framework.
const STATIC_PATTERNS: ExperiencePattern[] = [
  {
    name: 'Context Clarity',
    valueIntent:
      'Provides the situational information people need before acting — making the decision window clear rather than assumed.',
    systemsLayers: [],
    strategicRelevance: 0,
    maturity: 'Validated',
  },
  {
    name: 'Timing Support',
    valueIntent:
      'Delivers guidance within the moment of decision — not before uncertainty arrives or after the window has passed.',
    systemsLayers: [],
    strategicRelevance: 0,
    maturity: 'Validated',
  },
  {
    name: 'Human Validation',
    valueIntent:
      'Confirms that human judgment remains part of the decision — the system informs without replacing the person.',
    systemsLayers: [],
    strategicRelevance: 0,
    maturity: 'Validated',
  },
  {
    name: 'Cognitive Load Reduction',
    valueIntent:
      'Reduces interpretation work so cognitive energy goes toward the decision rather than understanding the context.',
    systemsLayers: [],
    strategicRelevance: 0,
    maturity: 'Validated',
  },
  {
    name: 'Recovery Paths',
    valueIntent:
      'Treats recovery as a designed state — not an edge case — so people can act without fear of irreversible failure.',
    systemsLayers: [],
    strategicRelevance: 0,
    maturity: 'Validated',
  },
  {
    name: 'Autonomy Preservation',
    valueIntent:
      'Keeps decision authority with the person. The system offers guidance; it does not assume the right to choose.',
    systemsLayers: [],
    strategicRelevance: 0,
    maturity: 'Validated',
  },
];

// Project pitches are verbatim from data/projects.ts summaries.
const STATIC_OS_PROJECTS: OsProject[] = [
  {
    name: 'The Architecture of Confidence',
    pitch:
      'A transferable framework for designing decision support that reduces uncertainty, preserves agency, and helps people recover when conditions change.',
    workType: 'Framework',
    maturityStage: 'Published',
    systemsLayers: ['Human', 'Digital', 'Operational'],
    portfolioPriority: 'High',
    externalLink: '/projects/architecture-of-confidence/',
    status: 'Published (Portfolio)',
  },
  {
    name: 'The Wayfinding Matrix',
    pitch:
      "An ambient, non-screen navigation framework for remote adventure parks and wilderness reserves. Matches guest endurance data with changing conditions to deliver low-friction safety nets.",
    workType: 'Concept',
    maturityStage: 'Published',
    systemsLayers: ['Spatial', 'Human', 'Operational'],
    portfolioPriority: 'High',
    externalLink: '/projects/wayfinding-matrix/',
    status: 'Published (Portfolio)',
  },
  {
    name: 'Responsive Ecologies',
    pitch:
      'A multi-agent AI land stewardship platform that processes edge-sensor telemetry to autonomously generate adaptive trail maintenance schedules and wildlife-safe guiding corridors.',
    workType: 'Concept',
    maturityStage: 'Published',
    systemsLayers: ['Ecological', 'Operational', 'Human', 'Digital'],
    portfolioPriority: 'High',
    externalLink: '/projects/responsive-ecologies/',
    status: 'Published (Portfolio)',
  },
  {
    name: 'Adaptive Outdoor Hospitality Companion',
    pitch:
      'A systems design concept for confidence-centered outdoor hospitality, ranch operations, stewardship, guest guidance, and recovery.',
    workType: 'Concept',
    maturityStage: 'Published',
    systemsLayers: ['Human', 'Ecological', 'Operational'],
    portfolioPriority: 'High',
    externalLink: '/projects/adaptive-ranch-experience-companion/',
    status: 'Published (Portfolio)',
  },
];

// ── Shared UI ────────────────────────────────────────────────────────────────

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

function CuratedNote({ href }: { href: string }) {
  return (
    <p className="mt-6 text-xs text-neutral-400">
      Curated selection from the OS documentation.{' '}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-semibold text-amber-700 hover:text-amber-800"
      >
        Full registry in the working OS
        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
      </a>
    </p>
  );
}

// ── 03 // Organizations Being Studied ────────────────────────────────────────
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
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-10 text-center">
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-neutral-500">
              Organizations are tracked in the working OS with audit notes, systems-layer analysis, and strategic
              relevance ratings. Entries are curated here as audits are structured to the point where they represent
              portfolio-ready evidence — not works-in-progress.
            </p>
            <a
              href={NOTION_OS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-800"
            >
              View the working OS
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
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

// ── 04 // System Artifacts Registry ──────────────────────────────────────────
export function ArtifactsSection({ artifacts }: { artifacts: SystemArtifact[] }) {
  const entries = artifacts.length > 0 ? artifacts : STATIC_ARTIFACTS;
  const isStatic = artifacts.length === 0;

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
            {entries.map((a) => (
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

        {isStatic && <CuratedNote href={NOTION_OS_URL} />}
      </div>
    </section>
  );
}

// ── 05 // Experience Patterns Library ────────────────────────────────────────
export function PatternsSection({ patterns }: { patterns: ExperiencePattern[] }) {
  const entries = patterns.length > 0 ? patterns : STATIC_PATTERNS;
  const isStatic = patterns.length === 0;

  return (
    <section id="osds-patterns" className="border-t border-neutral-100 bg-white py-16 md:py-28">
      <div className={CONTENT_BOUNDS}>
        <SectionKicker
          eyebrow="05 // Experience Patterns Library"
          title="Recurring design patterns extracted from research and observation."
        >
          <p>
            Each pattern represents a repeatedly observed mechanism — a way that well-designed systems help people
            navigate uncertainty, act with confidence, or recover from disruption. The six patterns below were extracted
            from field research and produced the Architecture of Confidence framework.
          </p>
        </SectionKicker>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {entries.map((p) => (
            <article
              key={p.name}
              className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-950/[0.03]"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-tiempos text-xl font-bold leading-tight text-neutral-950">{p.name}</h3>
                {p.strategicRelevance > 0 && (
                  <span className="font-mono text-sm font-bold text-amber-500">{p.strategicRelevance}</span>
                )}
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

        {isStatic && <CuratedNote href={NOTION_OS_URL} />}
      </div>
    </section>
  );
}

// ── 06 // Projects Pipeline ───────────────────────────────────────────────────
export function ProjectsSection({ projects }: { projects: OsProject[] }) {
  const entries = projects.length > 0 ? projects : STATIC_OS_PROJECTS;
  const isStatic = projects.length === 0;

  return (
    <section id="osds-projects" className="bg-neutral-50 py-16 md:py-28">
      <div className={CONTENT_BOUNDS}>
        <SectionKicker eyebrow="06 // Projects Pipeline" title="What the OS has produced.">
          <p>
            Portfolio projects that emerged from OS research, pattern synthesis, and design opportunity development. Each
            project connects back to evidence in the OS through its system artifacts and portfolio assets.
          </p>
        </SectionKicker>

        <div className="grid gap-6 md:grid-cols-2">
          {entries.map((project) => {
            const isInternal = project.externalLink?.startsWith('/');
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

            if (project.externalLink && isInternal) {
              return (
                <Link
                  key={project.name}
                  href={project.externalLink}
                  className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-950/[0.03] transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 md:p-8"
                >
                  {card}
                </Link>
              );
            }

            if (project.externalLink) {
              return (
                <a
                  key={project.name}
                  href={project.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-950/[0.03] transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 md:p-8"
                >
                  {card}
                </a>
              );
            }

            return (
              <article
                key={project.name}
                className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-950/[0.03] md:p-8"
              >
                {card}
              </article>
            );
          })}
        </div>

        {isStatic && <CuratedNote href={NOTION_OS_URL} />}
      </div>
    </section>
  );
}

// ── 07 // Portfolio Assets ────────────────────────────────────────────────────
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
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-10 text-center">
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-neutral-500">
              The four projects published from this OS — Architecture of Confidence, Wayfinding Matrix, Responsive
              Ecologies, and Adaptive Outdoor Hospitality Companion — are the primary portfolio-ready outputs.
              Individual artifact-to-asset traceability records for each are maintained in the working OS, not shown
              here until they&rsquo;re structured for portfolio review.
            </p>
            <a
              href={NOTION_OS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-800"
            >
              View the working OS
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
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
