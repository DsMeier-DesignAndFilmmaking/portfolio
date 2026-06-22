// Static Work section: no client hooks, no global navigation behavior.
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BrainCircuit,
  Building2,
  Compass,
  Layers3,
  MapPinned,
  Route,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

type LinkedWorkCard = {
  title: string;
  label: string;
  description: string;
  tags: string[];
  tagLinks?: Record<string, string>;
  cta: string;
  href: string;
  icon: LucideIcon;
  featured?: boolean;
};

type StaticWorkCard = {
  title: string;
  label: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  status?: string;
  href?: string;
};

const NOTION_OS_URL = 'https://app.notion.com/p/Environmental-Systems-Design-OS-37defa67177f80fcb70dc324c03e2e7d?source=copy_link';

const systemsDesignCards: LinkedWorkCard[] = [
  {
    title: 'The Architecture of Confidence',
    label: 'Framework',
    description:
      'A transferable framework for designing decision support that reduces uncertainty, preserves agency, and helps people recover when conditions change.',
    tags: ['Decision support', 'Confidence', 'Recovery'],
    tagLinks: {
      'Decision support': '/projects/architecture-of-confidence#aoc-architecture',
      Confidence: '/projects/architecture-of-confidence#aoc-model',
      Recovery: '/projects/architecture-of-confidence#aoc-scenario',
    },
    cta: 'Explore Framework',
    href: '/projects/architecture-of-confidence',
    icon: ShieldCheck,
    featured: true,
  },
  {
    title: 'HADE',
    label: 'Core Engine',
    description:
      'An adaptive decision-support engine that interprets live context signals and turns changing conditions into clearer next steps.',
    tags: ['AI reasoning', 'Context', 'Guidance'],
    tagLinks: {
      'AI reasoning': '/projects/travel-and-ai#tai-system',
      Context: '/projects/travel-and-ai#tai-constraints',
      Guidance: '/projects/travel-and-ai#tai-roadmap',
    },
    cta: 'Explore HADE',
    href: '/projects/travel-and-ai',
    icon: BrainCircuit,
    featured: true,
  },
  {
    title: 'Field Notes',
    label: 'Field Tool',
    description:
      'A place-aware product for capturing travel signals, environmental context, and local knowledge that can support better decisions in the moment.',
    tags: ['Travel signals', 'Place-aware', 'Field data'],
    tagLinks: {
      'Travel signals': '/projects/field-notes#fn-archive',
      'Place-aware': '/projects/field-notes#fn-system',
      'Field data': '/projects/field-notes#fn-archive',
    },
    cta: 'Explore Field Notes',
    href: '/projects/field-notes',
    icon: MapPinned,
  },
  {
    title: 'Digital Executor',
    label: 'Workflow Design',
    description:
      'A service recovery and coordination concept for helping people move forward when plans break, vendors hand off, or next steps become unclear.',
    tags: ['Recovery', 'Operations', 'Handoffs'],
    tagLinks: {
      Recovery: '/projects/digital-executor#fn-archive',
      Operations: '/projects/digital-executor#fn-logic',
      Handoffs: '/projects/digital-executor',
    },
    cta: 'Explore Case Study',
    href: '/projects/digital-executor',
    icon: Zap,
  },
  {
    title: 'Adaptive Ranch Experience\u00a0Companion',
    label: 'Systems Concept',
    description:
      'A systems design concept for confidence-centered outdoor hospitality, ranch operations, stewardship, guest guidance, and recovery. It is framed as a concept, not a shipped product.',
    tags: ['Hospitality', 'Stewardship', 'Recovery'],
    tagLinks: {
      Hospitality: '/projects/adaptive-ranch-experience-companion#problem',
      Stewardship: '/projects/adaptive-ranch-experience-companion#signals',
      Recovery: '/projects/adaptive-ranch-experience-companion#recovery',
    },
    cta: 'Explore Concept',
    href: '/projects/adaptive-ranch-experience-companion',
    icon: Compass,
  },
];

const researchFrameworkCards: StaticWorkCard[] = [
  {
    title: 'Environmental Systems Design OS',
    label: 'Research Environment',
    description:
      'A working environment for capturing observations, identifying patterns, and developing reusable design frameworks.',
    tags: ['Audits', 'Patterns', 'Projects & Concepts', 'Portfolio Assets'],
    icon: Layers3,
  },
];

const professionalPractice: LinkedWorkCard = {
  title: 'Selected Client Work',
  label: 'Professional Portfolio',
  description:
    'Over a decade designing digital products and services across healthcare, education, enterprise, commerce, and emerging technology.',
  tags: ['Healthcare', 'Higher education', 'Enterprise', 'Commerce', 'Emerging tech'],
  cta: 'View Selected Client Work',
  href: '/projects/previous',
  icon: Building2,
};

const explorationCards: StaticWorkCard[] = [
  {
    title: 'Responsive Ecologies',
    label: 'Exploratory',
    description:
      'A multi-agent AI land stewardship platform for backcountry outfitters and luxury eco-lodges. It processes edge-sensor telemetry (soil, fuel load, hydrology) to autonomously generate adaptive trail maintenance schedules and wildlife-safe guiding corridors.',
    tags: ['Predictive Agentic Modeling', 'Soft Adventure', 'Climate Resilience'],
    icon: Route,
    status: 'Currently Exploring',
    href: '/projects/responsive-ecologies',
  },
  {
    title: 'The Wayfinding Matrix',
    label: 'Exploratory',
    description:
      `An ambient, non-screen navigation framework for remote adventure parks and wilderness reserves. It matches a guest's real-time physical endurance data with changing weather patterns to deliver low-friction safety nets, allowing true off-grid spontaneity.`,
    tags: ['Ambient Intelligence', 'Intentional Spontaneity', 'Hushpitality'],
    icon: Compass,
    status: 'Currently Exploring',
    href: '/projects/wayfinding-matrix',
  },
  {
    title: 'The Intention Engine',
    label: 'Exploratory',
    description:
      `A semantic discovery and service recovery engine built for luxury ecotourism. It translates abstract human psychological states (burnout, transition) into highly specific spatial Blueprints and multi-sensory arrival-to-departure guest journeys.`,
    tags: ['Zero-Search Discovery', 'Psychological Blueprints', 'Whycations'],
    icon: BrainCircuit,
    status: 'Currently Exploring',
    href: '/projects/intention-engine',
  },
];

function TagList({
  tags,
  dark = false,
  compact = false,
  links,
  linkTone = 'stone',
}: {
  tags: string[];
  dark?: boolean;
  compact?: boolean;
  links?: Record<string, string>;
  linkTone?: 'blue' | 'neutral' | 'stone';
}) {
  const interactiveClasses =
    linkTone === 'blue'
      ? 'border-blue-100 bg-blue-50 text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2'
      : linkTone === 'neutral'
        ? 'border-neutral-200 bg-neutral-50 text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2'
        : 'border-stone-200 bg-stone-50 text-stone-600 transition-colors hover:border-stone-300 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-700 focus:ring-offset-2';

  const staticClasses = dark
    ? 'border-white/10 bg-white/5 text-white/70'
    : compact
      ? 'border-stone-200 bg-white/70 text-stone-500'
      : linkTone === 'neutral'
        ? 'border-neutral-200 bg-neutral-50 text-neutral-700'
        : 'border-stone-200 bg-stone-50 text-stone-600';

  return (
    <ul className={`flex flex-wrap ${compact ? 'gap-1.5' : 'gap-2'}`} aria-label="Tags">
      {tags.map((tag) => {
        const href = links?.[tag];

        return (
          <li key={tag}>
            {href ? (
              <Link
                href={href}
                className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${interactiveClasses}`}
                aria-label={`View ${tag}`}
              >
                {tag}
              </Link>
            ) : (
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${staticClasses}`}
              >
                {tag}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function SectionEyebrow({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 md:mb-7">
      <p
        id={id}
        className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500"
      >
        {children}
      </p>
    </div>
  );
}

function SystemDesignCard({ card }: { card: LinkedWorkCard }) {
  const Icon = card.icon;

  return (
    <article
      className={`rounded-lg border bg-white px-6 py-6 shadow-sm md:px-7 md:py-7 ${
        card.featured ? 'border-blue-200' : 'border-blue-100'
      }`}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-700">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.24em] text-blue-700/65">{card.label}</p>
            <h3
              className="mt-1 text-2xl font-bold leading-tight text-gray-950"
              style={{ fontFamily: "'tiempos-headline-regular', serif" }}
            >
              {card.title}
            </h3>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-gray-700 md:text-base">{card.description}</p>

        <div className="mt-4">
          <TagList tags={card.tags} links={card.tagLinks} linkTone="blue" />
        </div>
      </div>

      <div className="mt-6 flex">
        <Link
          href={card.href}
          className="inline-flex min-h-[44px] items-center justify-start gap-2 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-4"
        >
          {card.cta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function MethodCard({ card }: { card: StaticWorkCard }) {
  const Icon = card.icon;

  return (
    <article className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-700">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.24em] text-emerald-700/65">{card.label}</p>
            <h3 className="mt-1 text-xl font-bold leading-tight text-gray-950">{card.title}</h3>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{card.description}</p>
        <div className="mt-4">
          <TagList tags={card.tags} compact />
        </div>
      </div>
      <div className="mt-6 flex">
        <a
          href={NOTION_OS_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Explore Environmental Systems Design OS in Notion"
          className="inline-flex min-h-[44px] items-center justify-start gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-4"
        >
          Explore Notion OS
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function ProfessionalPracticeCallout({ card }: { card: LinkedWorkCard }) {
  const Icon = card.icon;

  return (
    <article
      aria-labelledby="professional-practice-card-title"
      className="rounded-lg border border-neutral-300 bg-white px-6 py-7 text-gray-950 shadow-sm md:px-8 md:py-8"
    >
      <div>
        <div className="min-w-0">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-700">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.24em] text-neutral-600">{card.label}</p>
              <h2
                id="professional-practice-card-title"
                className="mt-1 text-2xl font-bold leading-tight text-neutral-950"
                style={{ fontFamily: "'tiempos-headline-regular', serif" }}
              >
                {card.title}
              </h2>
            </div>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600">{card.description}</p>
          <div className="mt-5">
            <TagList tags={card.tags} linkTone="neutral" />
          </div>
        </div>

        <div className="mt-6 flex">
          <Link
            href={card.href}
            className="inline-flex min-h-[44px] max-w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
          >
            <span className="min-w-0 whitespace-normal">{card.cta}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function ExplorationCard({ card }: { card: StaticWorkCard }) {
  const Icon = card.icon;

  return (
    <article className="rounded-lg border border-dashed border-amber-200 bg-white p-5">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-100 bg-amber-50 text-amber-700">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <p className="font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.24em] text-amber-700/65">
              {card.label}
            </p>
            <h3 className="mt-1 text-xl font-bold leading-tight text-gray-950">
              {card.title}
            </h3>
          </div>
        </div>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600">
          {card.description}
        </p>

        <div className="mt-5">
          <TagList tags={card.tags} compact />
        </div>

        {card.href && (
          <div className="mt-4 pt-2">
            <a
              href={card.href}
              aria-label={`Explore ${card.title}`}
              className="group -ml-3 inline-flex min-h-[44px] items-center justify-start gap-2 rounded-lg px-3 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-50/60 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-4"
            >
              <span>Explore Project</span>
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
              />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

export default function DesignWork() {
  return (
    <section id="work" className="homepage-section relative bg-white" aria-label="Work">
      <div className="homepage-container relative">
        <header className="homepage-copy-column relative">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 border-b border-gray-200 pb-1 text-sm font-medium text-gray-600">
              <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
              Work
            </span>
          </div>

          <h1
            id="work-title"
            className="hero-title font-sf-pro-display font-bold leading-[1.1] tracking-tight text-left"
            style={{
              fontSize: 'clamp(2.125rem, 4.5vw, 3.75rem)',
              whiteSpace: 'normal',
              fontFamily: "'tiempos-headline-regular', serif",
              marginBottom: 'calc(1.32 * 1.5rem)',
            }}
          >
            <span className="bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent animate-gradient-shift bg-[length:300%_auto] font-bold">
              Designing confidence across products, services, and environments.
            </span>
          </h1>

          <p
            className="text-xl text-gray-700 leading-relaxed"
            style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}
          >
            Selected work exploring how people navigate complexity across products, services, and environments.
          </p>
        </header>

        <div className="homepage-copy-column relative mt-12 md:mt-16" aria-labelledby="work-title">
          <section aria-labelledby="flagship-public-work-title">
            <SectionEyebrow id="flagship-public-work-title">
              Flagship Public Work
            </SectionEyebrow>

            <div className="grid grid-cols-1 gap-5 md:gap-6">
              {systemsDesignCards.map((card) => (
                <SystemDesignCard key={card.title} card={card} />
              ))}
            </div>
          </section>

          <section aria-labelledby="research-environment-title" className="mt-14 md:mt-20">
            <SectionEyebrow id="research-environment-title">
              Research Environment
            </SectionEyebrow>

            <div className="grid grid-cols-1 gap-4 md:gap-5">
              {researchFrameworkCards.map((card) => (
                <MethodCard key={card.title} card={card} />
              ))}
            </div>
          </section>

          <section aria-labelledby="professional-practice-title" className="mt-14 md:mt-20">
            <SectionEyebrow id="professional-practice-title">
              Professional Practice
            </SectionEyebrow>

            <div>
              <ProfessionalPracticeCallout card={professionalPractice} />
            </div>
          </section>

          <section aria-labelledby="exploratory-systems-title" className="mt-14 md:mt-20">
            <SectionEyebrow id="exploratory-systems-title">
              Ideas & Concepts
            </SectionEyebrow>

            <div className="grid grid-cols-1 gap-4 md:gap-5">
              {explorationCards.map((card) => (
                <ExplorationCard key={card.title} card={card} />
              ))}
            </div>
          </section>

          <div className="mx-auto mt-14 flex max-w-xl flex-col items-center justify-center gap-3 border-t border-stone-200 pt-8 text-center md:mt-20">
            <Sparkles className="h-4 w-4 text-stone-400" aria-hidden="true" />
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500 text-balance">
              Public systems work, research environments, professional practice, and exploratory concepts
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
