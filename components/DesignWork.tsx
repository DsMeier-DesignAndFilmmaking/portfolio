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
];

const researchFrameworkCards: StaticWorkCard[] = [
  {
    title: 'Environmental Systems Design OS',
    label: 'Internal Research Studio',
    description:
      'A working research environment for turning observations from products, services, and environments into reusable design frameworks.',
    tags: ['Audits', 'Patterns', 'Projects & Concepts', 'Portfolio Assets'],
    icon: Layers3,
  },
];

const professionalPractice: LinkedWorkCard = {
  title: 'Selected Client Work',
  label: 'Professional Portfolio',
  description:
    'Client and product work spanning UX, interface design, information architecture, product strategy, and digital experience delivery.',
  tags: ['Healthcare', 'Higher education', 'Enterprise', 'Commerce', 'Emerging tech'],
  cta: 'View Selected Client Work',
  href: '/projects/previous',
  icon: Building2,
};

const explorationCards: StaticWorkCard[] = [
  {
    title: 'Adaptive Ranch Experience Companion',
    label: 'Concept Direction',
    description:
      'A future-facing companion concept for helping guests understand activities, confidence levels, timing, etiquette, and recovery options in ranch environments.',
    tags: ['Hospitality', 'Guest confidence', 'Activities'],
    icon: Compass,
    status: 'Concept in development',
  },
  {
    title: 'Future Environmental Systems',
    label: 'Exploratory',
    description:
      'A broader exploration of how decision-support principles could transfer into parks, destinations, service ecosystems, and place-based operations.',
    tags: ['Destinations', 'Operations', 'Recovery'],
    icon: Route,
    status: 'Exploratory direction',
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

function GroupHeader({
  eyebrow,
  title,
  intro,
  titleId,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  titleId: string;
  compact?: boolean;
}) {
  return (
    <header>
      <p className="text-sm font-medium text-gray-500">{eyebrow}</p>
      <h2
        id={titleId}
        className={`${compact ? 'mt-2 text-2xl md:text-3xl' : 'mt-3 text-3xl md:text-4xl'} font-bold leading-tight text-gray-950`}
        style={{ fontFamily: "'tiempos-headline-regular', serif" }}
      >
        {title}
      </h2>
      <p className={`${compact ? 'mt-3 max-w-2xl text-sm' : 'mt-4 max-w-2xl text-base'} leading-relaxed text-gray-600`}>
        {intro}
      </p>
    </header>
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

        <div className="mt-6 border-t border-amber-100 pt-4">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-amber-700">
            {card.status}
          </p>
        </div>
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
            A portfolio of public systems design work, internal research methods, shipped professional practice, and future-facing concepts. The common thread is helping people make clearer decisions in complex contexts.
          </p>
        </header>

        <div className="homepage-copy-column relative mt-12 md:mt-16" aria-labelledby="work-title">
          <section aria-labelledby="systems-design-title">
            <GroupHeader
              eyebrow="Flagship Public Work"
              title="Systems Design"
              titleId="systems-design-title"
              intro="Public case studies showing how context, decision logic, recovery paths, and interface design can help people act with more confidence."
            />
            <div className="mt-5 grid grid-cols-1 gap-5 md:mt-7 md:gap-6">
              {systemsDesignCards.map((card) => (
                <SystemDesignCard key={card.title} card={card} />
              ))}
            </div>
          </section>

          <section aria-labelledby="research-frameworks-title" className="mt-14 md:mt-20">
            <GroupHeader
              eyebrow="Method Layer"
              title="Research & Frameworks"
              titleId="research-frameworks-title"
              intro="Internal tools for observing environments, extracting patterns, and turning research into reusable design principles."
              compact
            />
            <div className="mt-5 grid grid-cols-1 gap-4 md:mt-7 md:gap-5">
              {researchFrameworkCards.map((card) => (
                <MethodCard key={card.title} card={card} />
              ))}
            </div>
          </section>

          <section aria-labelledby="professional-practice-title" className="mt-14 md:mt-20">
            <GroupHeader
              eyebrow="Shipped Work"
              title="Professional Practice"
              titleId="professional-practice-title"
              intro="10+ years designing digital products and experiences across healthcare, higher education, enterprise, commerce, and emerging technology."
              compact
            />
            <div className="mt-5 md:mt-7">
              <ProfessionalPracticeCallout card={professionalPractice} />
            </div>
          </section>

          <section aria-labelledby="explorations-title" className="mt-14 md:mt-20">
            <GroupHeader
              eyebrow="Future Concepts"
              title="Explorations"
              titleId="explorations-title"
              intro="Early concept directions extending the same decision-support lens into hospitality, land-based experiences, and environmental service systems."
              compact
            />
            <div className="mt-5 grid grid-cols-1 gap-4 md:mt-7 md:gap-5">
              {explorationCards.map((card) => (
                <ExplorationCard key={card.title} card={card} />
              ))}
            </div>
          </section>

          <div className="mx-auto mt-14 flex max-w-xl flex-col items-center justify-center gap-3 border-t border-stone-200 pt-8 text-center md:mt-20">
            <Sparkles className="h-4 w-4 text-stone-400" aria-hidden="true" />
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500">
              Public case studies, research methods, shipped work, and future-facing concepts
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
