'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, Variants, easeOut } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Compass,
  Gauge,
  GitBranch,
  Globe2,
  Hotel,
  Layers3,
  MapPinned,
  Mountain,
  Network,
  RefreshCw,
  Route,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react';
import { PageNavIndicator } from '@/components/PageNavIndicator';
import ProjectPracticeNavDropdown, { PROJECT_NAV_MOBILE_MENU_ID } from '@/components/ProjectPracticeNavDropdown';

const AOC_SECTIONS = [
  { id: 'aoc-hero', label: 'Overview' },
  { id: 'aoc-why', label: 'Problem' },
  { id: 'aoc-research', label: 'Research' },
  { id: 'aoc-synthesis', label: 'Framework' },
  { id: 'aoc-model', label: 'Model' },
  { id: 'aoc-applications', label: 'Applications' },
  { id: 'aoc-future', label: 'Future' },
];

const contentBounds = 'container mx-auto px-6 md:px-8';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const fadeItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const uncertaintyCards = [
  {
    title: 'Unfamiliar Environment',
    body: 'The person knows the goal, but not which signals in the environment deserve attention.',
    Icon: MapPinned,
  },
  {
    title: 'Dynamic Conditions',
    body: 'Plans lose value when timing, weather, service availability, or social conditions shift.',
    Icon: Clock3,
  },
  {
    title: 'Cognitive Load',
    body: 'More information does not help when the person still has to interpret the moment alone.',
    Icon: BrainCircuit,
  },
];

const researchInputs = [
  {
    name: 'Aspen One',
    focus: 'Destination ecosystem',
    finding:
      'Confidence comes from helping guests understand terrain, timing, services, and recovery options across a complex place.',
  },
  {
    name: 'Google Maps',
    focus: 'Wayfinding context',
    finding:
      'Confidence grows when live context narrows attention to timing, proximity, movement, and next-best routes.',
  },
  {
    name: 'Rick Steves',
    focus: 'Editorial guidance',
    finding:
      'Confidence often comes from human judgment: what to skip, what to prioritize, and why a choice fits the moment.',
  },
  {
    name: 'HADE',
    focus: 'Adaptive decision support',
    finding:
      'Confidence requires interpreting live signals, suppressing weak suggestions, and supporting action without removing agency.',
  },
];

const patternGroups = [
  'Context Clarity',
  'Timing Support',
  'Human Validation',
  'Cognitive Load Reduction',
  'Recovery Paths',
  'Autonomy Preservation',
];

const confidencePrinciples = [
  'Context before recommendation',
  'Guidance inside the decision window',
  'Trust through human judgment',
  'Less interpretation work',
  'Recovery as a designed state',
  'Choice remains with the person',
];

const synthesisStages = [
  {
    label: 'Research Inputs',
    description: 'Real systems studied for how they help people act under uncertainty.',
    items: researchInputs.map((item) => item.name),
    tone: 'border-neutral-200 bg-white',
    eyebrow: 'Inputs',
  },
  {
    label: 'Environmental Systems Design OS',
    description: 'Internal workspace where observations are structured into traceable evidence.',
    items: ['Audit notes', 'Evidence links', 'Pattern library'],
    tone: 'border-cyan-200 bg-cyan-50',
    eyebrow: 'Synthesis Engine',
  },
  {
    label: 'Pattern Extraction',
    description: 'Repeated mechanisms pulled from destination, wayfinding, editorial, and adaptive systems.',
    items: patternGroups,
    tone: 'border-neutral-200 bg-white',
    eyebrow: 'Patterns',
  },
  {
    label: 'Confidence Principles',
    description: 'Design principles distilled from the extracted patterns.',
    items: confidencePrinciples,
    tone: 'border-neutral-200 bg-white',
    eyebrow: 'Principles',
  },
  {
    label: 'Architecture of Confidence',
    description: 'A public-facing framework that explains how observations become confident action.',
    items: ['Decision-support model', 'Portfolio framework', 'Transferable system logic'],
    tone: 'border-neutral-900 bg-neutral-950 text-white',
    eyebrow: 'Framework',
  },
];

const keyInsights = [
  {
    title: 'Confidence begins before the decision.',
    detail:
      'People need the environment translated before they need a recommendation. Context comes first; instruction comes later.',
  },
  {
    title: 'Timing is a design material.',
    detail:
      'Guidance only matters inside the decision window. Too early becomes noise; too late becomes apology.',
  },
  {
    title: 'Low-attention guidance protects agency.',
    detail:
      'The system should reduce interpretation work without forcing obedience or turning every moment into a task.',
  },
  {
    title: 'Human validation changes the feel of trust.',
    detail:
      'Editorial, local, expert, or lived judgment can make a system feel grounded rather than merely computed.',
  },
  {
    title: 'Recovery is part of confidence.',
    detail:
      'When conditions change, the system should help people regain orientation instead of pretending the original plan still holds.',
  },
];

const confidenceDrivers = [
  { label: 'Context Clarity', value: 'The person understands what matters here.', Icon: Compass },
  { label: 'Timing Fit', value: 'Guidance arrives while action is still possible.', Icon: Clock3 },
  { label: 'Human Validation', value: 'Judgment grounds the signal in lived or expert context.', Icon: ShieldCheck },
  { label: 'Autonomy Preservation', value: 'The person keeps authority over the final choice.', Icon: Route },
  { label: 'Recovery Path', value: 'A fallback exists if confidence drops.', Icon: RefreshCw },
];

const confidenceReducers = [
  { label: 'Cognitive Load', value: 'Too much interpretation work remains.', Icon: BrainCircuit },
  { label: 'Perceived Risk', value: 'The cost of being wrong feels too high.', Icon: Gauge },
];

const architectureSteps = [
  {
    title: 'Decision Moment',
    role: 'Frame',
    detail: 'Identify the actual choice, constraint, or hesitation point before suggesting action.',
  },
  {
    title: 'Signal Capture',
    role: 'Sense',
    detail: 'Gather traveler, place, environmental, operational, and social signals from the moment.',
  },
  {
    title: 'Context Interpretation',
    role: 'Interpret',
    detail: 'Use OS patterns to decide which signals matter now and which can be ignored.',
  },
  {
    title: 'Confidence Assessment',
    role: 'Assess',
    detail: 'Evaluate clarity, timing, validation, load, risk, autonomy, and recovery support.',
  },
  {
    title: 'Decision Logic',
    role: 'Decide',
    detail: 'Choose whether to clarify, recommend, wait, suppress, redirect, or prepare fallback.',
  },
  {
    title: 'Trusted Guidance',
    role: 'Express',
    detail: 'Translate system judgment into concise framing that supports action without command.',
  },
  {
    title: 'Human Action',
    role: 'Act',
    detail: 'The person chooses, adapts, pauses, ignores, reroutes, or commits with greater clarity.',
  },
  {
    title: 'Confidence Recovery / Learning Loop',
    role: 'Recover',
    detail: 'Capture hesitation, disruption, and changed conditions so the next decision improves.',
  },
];

const scenarioSteps = [
  {
    title: 'Decision Moment',
    text: 'A person enters an unfamiliar place with limited time and unclear tradeoffs.',
  },
  {
    title: 'Signal Capture',
    text: 'The system reads goal, location, time window, conditions, and visible constraints.',
  },
  {
    title: 'Context Interpretation',
    text: 'Environmental Systems Design OS patterns identify which signals matter now.',
  },
  {
    title: 'Confidence Assessment',
    text: 'Load, timing, risk, validation, autonomy, and recovery options are weighed together.',
  },
  {
    title: 'Decision Logic',
    text: 'The system decides whether to clarify, suggest, wait, suppress, or prepare recovery.',
  },
  {
    title: 'Trusted Guidance',
    text: 'The person receives a concise framing of the moment, not a command.',
  },
  {
    title: 'Human Action',
    text: 'The person chooses, adapts, ignores, or delays with greater clarity.',
  },
  {
    title: 'Recovery Loop',
    text: 'If confidence drops, the system learns from hesitation and changing conditions.',
  },
];

const applications = [
  {
    number: '01',
    environment: 'International Travel',
    uncertainty: 'Unfamiliar places. High\u00a0uncertainty.',
    breakdown: 'Local signals are present, but the traveler cannot tell which ones matter now.',
    signals: ['Intent', 'location', 'weather', 'time', 'source freshness'],
    mechanism: 'Context interpretation',
    action: 'Commit to the right experience.',
    Icon: Globe2,
    accent: {
      border: 'border-blue-200',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      icon: 'text-blue-700',
      line: 'bg-blue-500/55',
    },
  },
  {
    number: '02',
    environment: 'Destination Hospitality',
    uncertainty: 'Too many options. Limited time.',
    breakdown: 'The guest sees services and activities, but not which choice fits this stay moment.',
    signals: ['Guest goal', 'stay phase', 'availability', 'weather', 'staff knowledge'],
    mechanism: 'Guided prioritization',
    action: 'Book and participate.',
    Icon: Hotel,
    accent: {
      border: 'border-teal-200',
      bg: 'bg-teal-50',
      text: 'text-teal-700',
      icon: 'text-teal-700',
      line: 'bg-teal-500/55',
    },
  },
  {
    number: '03',
    environment: 'National Parks',
    uncertainty: 'Dynamic conditions. Safety\u00a0uncertain.',
    breakdown: 'Popularity and distance can hide weather, terrain, closure, or capacity risk.',
    signals: ['Weather', 'daylight', 'trail state', 'skill level', 'ranger guidance'],
    mechanism: 'Risk-aware guidance',
    action: 'Continue, reroute, or pause.',
    Icon: Mountain,
    accent: {
      border: 'border-green-200',
      bg: 'bg-green-50',
      text: 'text-green-700',
      icon: 'text-green-700',
      line: 'bg-green-600/50',
    },
  },
  {
    number: '04',
    environment: 'Guest Ranches',
    uncertainty: 'New activities. Social and skill\u00a0uncertainty.',
    breakdown: 'Participation can feel risky when etiquette, ability, safety, and pacing are unclear.',
    signals: ['Guest confidence', 'activity intensity', 'weather', 'staff availability'],
    mechanism: 'Confidence-building participation guidance',
    action: 'Join the experience.',
    Icon: Users,
    accent: {
      border: 'border-amber-200',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      icon: 'text-amber-700',
      line: 'bg-amber-500/55',
    },
  },
  {
    number: '05',
    environment: 'Service Recovery',
    uncertainty: 'Plans change. Things go wrong.',
    breakdown: 'Trust drops when the next step, ownership path, or viable alternative is unclear.',
    signals: ['Failure type', 'urgency', 'emotional state', 'alternatives', 'authority path'],
    mechanism: 'Intent-preserving recovery',
    action: 'Adapt and move forward.',
    Icon: AlertTriangle,
    accent: {
      border: 'border-orange-200',
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      icon: 'text-orange-700',
      line: 'bg-orange-500/55',
    },
  },
  {
    number: '06',
    environment: 'HADE',
    uncertainty: 'Context ambiguity. Decision fatigue.',
    breakdown: 'Too many weak signals can make adaptive guidance feel generic, opaque, or\u00a0over-directive.',
    signals: ['Decision moment', 'intent', 'risk', 'timing', 'cognitive load'],
    mechanism: 'Decision framing',
    action: 'Act with confidence.',
    Icon: Network,
    accent: {
      border: 'border-purple-200',
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      icon: 'text-purple-700',
      line: 'bg-purple-500/55',
    },
  },
];

const sharedArchitectureSteps = [
  { label: 'Decision Moment', Icon: Target },
  { label: 'Signal Capture', Icon: Gauge },
  { label: 'Context Interpretation', Icon: BrainCircuit },
  { label: 'Confidence Assessment', Icon: ShieldCheck },
  { label: 'Decision Logic', Icon: GitBranch },
  { label: 'Trusted Guidance', Icon: MapPinned },
  { label: 'Human Action', Icon: Route },
  { label: 'Recovery Mode', Icon: RefreshCw },
];

const sharedArchitectureClusters = [
  {
    label: 'Sense',
    steps: sharedArchitectureSteps.slice(0, 2),
  },
  {
    label: 'Interpret',
    steps: sharedArchitectureSteps.slice(2, 5),
  },
  {
    label: 'Act + Recover',
    steps: sharedArchitectureSteps.slice(5),
  },
];

const crossSystemTruths = [
  'Context Clarity',
  'Timing Support',
  'Human Validation',
  'Recovery Paths',
  'Autonomy Preservation',
];

const roadmap = [
  {
    phase: '01',
    title: 'Framework Definition',
    text: 'Formalize confidence principles, vocabulary, and evaluation criteria.',
  },
  {
    phase: '02',
    title: 'Research OS',
    text: 'Use Environmental Systems Design OS to structure audits, patterns, and confidence criteria.',
  },
  {
    phase: '03',
    title: 'Architecture v2',
    text: 'Convert the model into decision-flow diagrams and scenario traces.',
  },
  {
    phase: '04',
    title: 'Pattern Library',
    text: 'Translate audits into reusable confidence mechanisms across environments.',
  },
  {
    phase: '05',
    title: 'Applied Systems',
    text: 'Apply the framework across HADE, Field Notes, Digital Executor, and destination ecosystems.',
  },
];

function SectionKicker({
  eyebrow,
  title,
  children,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <header className="mb-10 max-w-3xl md:mb-14">
      <div className="mb-6 flex items-center gap-3">
        <div className={`h-10 w-10 rounded-full ${dark ? 'bg-cyan-400 text-black' : 'bg-neutral-900 text-white'} flex items-center justify-center`}>
          <Layers3 className="h-5 w-5" aria-hidden="true" />
        </div>
        <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${dark ? 'text-neutral-500' : 'text-neutral-400'}`}>
          {eyebrow}
        </span>
      </div>
      <h2 className={`font-tiempos text-3xl font-bold leading-[1.08] md:text-5xl md:leading-[1.05] ${dark ? 'text-white' : 'text-neutral-950'}`}>
        {title}
      </h2>
      {children && (
        <div className={`mt-6 max-w-2xl text-base leading-relaxed md:text-lg ${dark ? 'text-neutral-400' : 'text-neutral-600'}`}>
          {children}
        </div>
      )}
    </header>
  );
}

function MiniFlow({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
      {items.map((item, index) => (
        <React.Fragment key={item}>
          <div className={`rounded-2xl border p-5 ${dark ? 'border-white/10 bg-white/[0.04]' : 'border-neutral-200 bg-white'}`}>
            <p className={`text-[10px] font-black uppercase tracking-[0.24em] ${dark ? 'text-cyan-300' : 'text-neutral-400'}`}>
              {String(index + 1).padStart(2, '0')}
            </p>
            <p className={`mt-3 text-sm font-bold leading-snug ${dark ? 'text-white' : 'text-neutral-900'}`}>{item}</p>
          </div>
          {index < items.length - 1 && (
            <ArrowRight className={`mx-auto hidden h-5 w-5 md:block ${dark ? 'text-white/30' : 'text-neutral-300'}`} aria-hidden="true" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function ArchitectureRibbon() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 shadow-xl shadow-black/10 md:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-500">Shared Architecture</p>
        <p className="text-sm font-medium text-neutral-400">One architecture. Many environments.</p>
      </div>
      <div className="grid gap-3 lg:grid-cols-[minmax(0,0.78fr)_auto_minmax(0,1.14fr)_auto_minmax(0,1.08fr)] lg:items-stretch">
        {sharedArchitectureClusters.map((cluster, index) => (
          <React.Fragment key={cluster.label}>
            <div className="rounded-xl border border-white/10 bg-neutral-950/65 p-4">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">{cluster.label}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {cluster.steps.map((step) => (
                  <div key={step.label} className="flex min-h-[48px] items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2.5">
                    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08]">
                      <step.Icon className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-tight text-neutral-100">{step.label}</p>
                      <p className="mt-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-neutral-600">
                        {String(
                          sharedArchitectureSteps.findIndex((architectureStep) => architectureStep.label === step.label) + 1
                        ).padStart(2, '0')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {index < sharedArchitectureClusters.length - 1 && (
              <div className="flex items-center justify-center py-1 lg:py-0">
                <ArrowRight className="h-5 w-5 rotate-90 text-white/25 lg:rotate-0" aria-hidden="true" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function TraceRow({
  label,
  value,
  tone,
  isLast = false,
}: {
  label: string;
  value: string;
  tone: (typeof applications)[number]['accent'];
  isLast?: boolean;
}) {
  return (
    <div className="relative grid min-h-[70px] grid-cols-[22px_minmax(0,1fr)] gap-3 pb-4 last:pb-0 md:min-h-[76px]">
      {!isLast && <div className={`absolute left-[7px] top-4 h-[calc(100%-8px)] w-px ${tone.line}`} aria-hidden="true" />}
      <div className={`relative z-10 mt-1 h-4 w-4 rounded-full border ${tone.border} bg-white shadow-sm`}>
        <div className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${tone.line}`} />
      </div>
      <div>
        <p className={`font-mono text-[9px] font-black uppercase tracking-[0.18em] ${tone.text}`}>{label}</p>
        <p className="mt-2 text-sm font-semibold leading-snug text-neutral-900">{value}</p>
      </div>
    </div>
  );
}

function TracePanel({
  nodes,
  tone,
}: {
  nodes: { label: string; value: string }[];
  tone: (typeof applications)[number]['accent'];
}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-4 md:p-5">
      {nodes.map((node, index) => (
        <TraceRow key={node.label} label={node.label} value={node.value} tone={tone} isLast={index === nodes.length - 1} />
      ))}
    </div>
  );
}

function ApplicationCard({ application }: { application: (typeof applications)[number] }) {
  const nodes = [
    { label: 'Uncertainty', value: application.uncertainty },
    { label: 'Mechanism', value: application.mechanism },
    { label: 'Action', value: application.action },
  ];

  return (
    <article className="group flex min-h-[620px] flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_18px_44px_rgba(15,23,42,0.10)] transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_24px_58px_rgba(15,23,42,0.14)] md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`inline-flex rounded-full border ${application.accent.border} ${application.accent.bg} px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.22em] ${application.accent.text}`}>
            {application.number}
          </p>
          <h3 className="mt-4 font-tiempos text-[1.7rem] font-bold leading-tight text-neutral-950">{application.environment}</h3>
          <p className="mt-2 max-w-[15rem] text-sm font-medium leading-snug text-neutral-600">{application.uncertainty}</p>
        </div>
        <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 transition duration-300 group-hover:border-neutral-300 group-hover:bg-white">
          <application.Icon className={`h-7 w-7 ${application.accent.icon}`} strokeWidth={1.8} aria-hidden="true" />
        </div>
      </div>

      <div className="mt-6 flex min-h-[250px] flex-col rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
        <div className="flex min-h-[82px] items-center justify-center">
          <div className={`flex h-20 w-20 items-center justify-center rounded-2xl border ${application.accent.border} bg-white shadow-sm`}>
            <application.Icon className={`h-11 w-11 ${application.accent.icon}`} strokeWidth={1.75} aria-hidden="true" />
          </div>
        </div>
        <p className="mt-5 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Confidence Breakdown</p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700">{application.breakdown}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {application.signals.map((signal) => (
            <span key={signal} className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-500">
              {signal}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6">
        <TracePanel nodes={nodes} tone={application.accent} />
      </div>
    </article>
  );
}

function CrossSystemTruths() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
      <div className="grid gap-4 md:grid-cols-[220px_1fr] md:items-center">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-500">Cross-System Truths</p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400">The same confidence mechanisms recur across the environments.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {crossSystemTruths.map((truth) => (
            <div key={truth} className="rounded-xl border border-white/10 bg-neutral-950/60 p-4">
              <CheckCircle2 className="h-4 w-4 text-cyan-300" aria-hidden="true" />
              <p className="mt-3 text-sm font-bold leading-snug text-neutral-100">{truth}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResearchSynthesisVisual() {
  const topStages = synthesisStages.slice(0, 2);
  const bottomStages = synthesisStages.slice(2);

  const renderStageCard = (stage: (typeof synthesisStages)[number], index: number, emphasis: 'standard' | 'bridge' | 'final' = 'standard') => {
    const isFinal = emphasis === 'final';
    const isBridge = emphasis === 'bridge';

    return (
      <article
        key={stage.label}
        className={`flex h-full flex-col rounded-2xl border ${
          isFinal
            ? 'min-h-[260px] border-2 border-neutral-900 bg-neutral-950 p-7 shadow-xl shadow-neutral-950/15 md:p-8'
            : `min-h-[220px] p-5 md:p-6 ${isBridge ? 'border-cyan-200 bg-cyan-50 shadow-sm shadow-cyan-950/[0.04]' : stage.tone}`
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className={`text-[10px] font-black uppercase tracking-[0.24em] ${
                isFinal ? 'text-cyan-300' : isBridge ? 'text-cyan-700' : 'text-neutral-400'
              }`}
            >
              {stage.eyebrow}
            </p>
            <h3 className={`mt-3 font-tiempos font-bold leading-tight ${isFinal ? 'text-3xl text-white md:text-4xl' : 'text-2xl text-neutral-950'}`}>
              {stage.label}
            </h3>
          </div>
          <span className={`font-mono text-xs font-bold ${isFinal ? 'text-white/40' : isBridge ? 'text-cyan-700/40' : 'text-neutral-300'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <p className={`mt-4 leading-relaxed ${isFinal ? 'max-w-3xl text-base text-neutral-300' : isBridge ? 'text-sm text-neutral-700' : 'text-sm text-neutral-600'}`}>
          {stage.description}
        </p>

        <div className={`${isFinal ? 'mt-8 grid gap-3 md:grid-cols-3' : 'mt-6 flex flex-1 flex-col gap-2'}`}>
          {stage.items.map((item) => (
            <div
              key={item}
              className={`flex items-start gap-2 rounded-xl border px-3 py-2 text-sm font-semibold leading-snug ${
                isFinal
                  ? 'border-white/10 bg-white/[0.04] text-neutral-200'
                  : isBridge
                    ? 'border-cyan-200 bg-white/70 text-neutral-800'
                    : 'border-neutral-200 bg-white/80 text-neutral-800'
              }`}
            >
              <CheckCircle2 className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${isFinal ? 'text-cyan-300' : 'text-cyan-600'}`} aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </article>
    );
  };

  const renderConnector = (direction: 'right' | 'down' = 'right') => (
    <div className="flex items-center justify-center" aria-hidden="true">
      <div className={`${direction === 'down' ? 'h-12 w-px' : 'h-px w-12'} flex items-center justify-center bg-neutral-200`}>
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm">
          <ArrowRight className={`h-3.5 w-3.5 text-neutral-400 ${direction === 'down' ? 'rotate-90' : ''}`} aria-hidden="true" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-4 shadow-sm shadow-neutral-950/[0.03] md:p-6 lg:p-8">
      <div className="lg:hidden">
        <div className="grid gap-4 md:grid-cols-2">
          {synthesisStages.map((stage, index) =>
            renderStageCard(
              stage,
              index,
              index === 1 ? 'bridge' : index === synthesisStages.length - 1 ? 'final' : 'standard'
            )
          )}
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch">
          {renderStageCard(topStages[0], 0)}
          {renderConnector()}
          {renderStageCard(topStages[1], 1, 'bridge')}
        </div>

        <div className="flex justify-center py-6">
          {renderConnector('down')}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch">
          {renderStageCard(bottomStages[0], 2)}
          {renderConnector()}
          {renderStageCard(bottomStages[1], 3)}
        </div>

        <div className="flex justify-center py-6">
          {renderConnector('down')}
        </div>

        <div>
          {renderStageCard(bottomStages[2], 4, 'final')}
        </div>
      </div>

      <div className="mt-6 grid gap-4 border-t border-neutral-200 pt-6 md:grid-cols-3">
        {[
          ['Observation', 'System examples reveal repeated confidence failures and support mechanisms.'],
          ['Extraction', 'The OS turns those observations into patterns and reusable design principles.'],
          ['Framework', 'The public case study translates the internal synthesis into a coherent model.'],
        ].map(([title, text]) => (
          <div key={title} className="rounded-2xl border border-neutral-200 bg-white p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-600">{title}</p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConfidenceFactorCard({
  label,
  value,
  Icon,
  polarity,
}: {
  label: string;
  value: string;
  Icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  polarity: 'driver' | 'reducer';
}) {
  const isDriver = polarity === 'driver';

  return (
    <article
      className={`rounded-2xl border p-4 ${
        isDriver
          ? 'border-cyan-300/20 bg-cyan-300/[0.08]'
          : 'border-white/10 bg-white/[0.04]'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
            isDriver
              ? 'border-cyan-300/30 bg-cyan-300/10 text-cyan-300'
              : 'border-red-300/20 bg-red-300/10 text-red-200'
          }`}
        >
          <span className="font-mono text-sm font-bold">{isDriver ? '+' : '-'}</span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Icon className={`h-4 w-4 shrink-0 ${isDriver ? 'text-cyan-300' : 'text-red-200'}`} aria-hidden={true} />
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-white">{label}</h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400">{value}</p>
        </div>
      </div>
    </article>
  );
}

function ConfidenceModelGraphic() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/20 md:p-6 lg:p-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.75fr)_minmax(0,0.85fr)] lg:items-stretch">
        <div className="flex flex-col">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300">Strengthening Conditions</p>
          <div className="mt-5 grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {confidenceDrivers.map((factor) => (
              <ConfidenceFactorCard key={factor.label} {...factor} polarity="driver" />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-sm rounded-[2rem] border border-cyan-300/30 bg-neutral-950 p-6 text-center shadow-2xl shadow-cyan-950/20 md:p-8">
            <div className="absolute -left-3 top-1/2 hidden h-px w-3 bg-cyan-300/30 lg:block" aria-hidden="true" />
            <div className="absolute -right-3 top-1/2 hidden h-px w-3 bg-red-200/20 lg:block" aria-hidden="true" />
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-neutral-500">Emergent State</p>
            <h3 className="mt-5 font-tiempos text-4xl font-bold leading-tight text-white md:text-5xl">
              Confidence
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-neutral-400">
              The ability to act with enough interpreted context, trust, agency, and fallback support.
            </p>
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="font-mono text-[11px] leading-relaxed text-cyan-200">
                clarity + timing + validation + autonomy + recovery
              </p>
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-red-100/70">
                reduced by load + risk
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">Dampening Conditions</p>
          <div className="mt-5 grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:content-center">
            {confidenceReducers.map((factor) => (
              <ConfidenceFactorCard key={factor.label} {...factor} polarity="reducer" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchitectureStepNode({
  step,
  index,
}: {
  step: (typeof architectureSteps)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)] lg:items-stretch">
      <article
        className={`rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm shadow-neutral-950/[0.03] lg:p-6 ${
          isEven ? 'lg:col-start-1' : 'lg:col-start-3'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-600">
              {step.role}
            </p>
            <h3 className="mt-3 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
              {step.title}
            </h3>
          </div>
          <span className="font-mono text-sm font-bold text-neutral-300">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">{step.detail}</p>
      </article>

      <div className="absolute -left-10 top-0 flex h-full w-8 items-center justify-center lg:static lg:col-start-2 lg:row-start-1 lg:w-auto">
        <div className="flex h-full w-px items-center justify-center bg-neutral-200">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-200 bg-white shadow-sm shadow-cyan-950/5">
            <span className="font-mono text-xs font-bold text-cyan-700">{String(index + 1).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <div className={`hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-5 lg:block ${isEven ? 'lg:col-start-3' : 'lg:col-start-1'}`}>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-400">
          System Function
        </p>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          {index < 3
            ? 'Transforms raw uncertainty into an interpretable decision context.'
            : index < 6
              ? 'Converts interpreted context into confidence-calibrated system response.'
              : 'Returns the outcome to the learning loop so future guidance improves.'}
        </p>
      </div>
    </div>
  );
}

function SystemArchitectureV2Diagram() {
  return (
    <div className="rounded-[2rem] border border-neutral-200 bg-white p-4 shadow-sm shadow-neutral-950/[0.04] md:p-6 lg:p-8">
      <div className="grid gap-6 border-b border-neutral-200 pb-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.38fr)] lg:items-end">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-700">
            Primary Visual Artifact
          </p>
          <h3 className="mt-4 font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-4xl">
            System Architecture v2
          </h3>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-600 md:text-base">
            A linear decision-support architecture that moves from uncertainty capture to trusted action, then uses recovery and learning to improve the next decision moment.
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-700">
            Operating Thesis
          </p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700">
            Confidence is designed by interpreting context before asking a person to act.
          </p>
        </div>
      </div>

      <div className="relative mt-8 space-y-5 pl-10 lg:pl-0">
        {architectureSteps.map((step, index) => (
          <React.Fragment key={step.title}>
            <ArchitectureStepNode step={step} index={index} />
            {index < architectureSteps.length - 1 && (
              <div className="flex h-8 items-center justify-start pl-4 lg:justify-center lg:pl-0" aria-hidden="true">
                <ArrowRight className="h-5 w-5 rotate-90 text-neutral-300" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-8 grid gap-4 border-t border-neutral-200 pt-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-400">Knowledge Layer</p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            Environmental Systems Design OS feeds Context Interpretation and Confidence Assessment with audit patterns, validation criteria, and recovery principles.
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-700">Learning Loop</p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700">
            Recovery signals return to the next Decision Moment, turning breakdowns, hesitation, and changed conditions into better future guidance.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProjectNav({
  pathname,
  isNavbarWhite,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  pathname: string;
  isNavbarWhite: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}) {
  return (
    <ProjectPracticeNavDropdown
      pathname={pathname}
      isNavbarWhite={isNavbarWhite}
      isMobileMenuOpen={isMobileMenuOpen}
      setIsMobileMenuOpen={setIsMobileMenuOpen}
    />
  );
}

export default function ArchitectureOfConfidencePage() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [atTop, setAtTop] = useState(true);
  const [isNavbarWhite, setIsNavbarWhite] = useState(false);
  const lastScrollYRef = useRef(0);
  const isMobileMenuOpenRef = useRef(false);

  useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavbarWhite(currentScrollY > 100);
      setAtTop(currentScrollY < 10);
      if (isMobileMenuOpenRef.current) setIsMobileMenuOpen(false);
      if (currentScrollY > lastScrollYRef.current) setScrollDirection('down');
      else if (currentScrollY < lastScrollYRef.current) setScrollDirection('up');
      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-cyan-200/50">
      <PageNavIndicator sections={AOC_SECTIONS} showDotsOnDesktop />

      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isNavbarWhite ? 'bg-white border-b border-neutral-100' : 'bg-transparent'
        } ${atTop ? 'translate-y-0' : scrollDirection === 'down' ? 'lg:translate-y-0 -translate-y-full' : 'translate-y-0'}`}
      >
        <div className="container mx-auto px-6 relative z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => router.push('/')} className="p-0 m-0 flex h-fit w-fit items-center py-4" aria-label="Return to home page">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/signature-25.png`}
                  alt="Dan Meier"
                  width={150}
                  height={37}
                  priority
                  className="h-9 w-auto brightness-0"
                />
              </button>
              <div className="ml-3 flex flex-shrink-0 items-center">
                <div className="h-5 w-px flex-shrink-0 bg-slate-300" aria-hidden="true" />
                <span className={`ml-3 whitespace-nowrap text-xs font-medium transition-colors duration-500 md:text-sm ${isNavbarWhite ? 'text-black' : 'text-gray-700'}`}>
                  Work
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-project-nav-trigger
              aria-haspopup="menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls={PROJECT_NAV_MOBILE_MENU_ID}
              className={`lg:hidden flex items-center justify-end py-2 pl-4 transition-colors duration-500 ${isNavbarWhite ? 'text-black' : 'text-gray-700'}`}
              aria-label="Toggle mobile menu"
            >
              <div className="relative flex h-5 w-6 flex-col items-center justify-between">
                <span className={`h-0.5 w-full bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`h-0.5 w-full bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 w-full bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
            <ProjectNav
              pathname={pathname}
              isNavbarWhite={isNavbarWhite}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>
        </div>
      </motion.nav>

      <motion.section
        id="aoc-hero"
        className={`${contentBounds} mt-[100px] pb-16 md:pb-24`}
        initial="hidden"
        animate="show"
        variants={sectionVariants}
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-[3px] w-12 bg-cyan-500" />
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-neutral-500">Systems Design Framework</p>
            </div>
            <h1 className="font-tiempos text-4xl font-bold leading-tight text-gray-950 md:text-6xl md:leading-tight">
              The Architecture of Confidence.
              <span className="mt-4 block italic text-gray-500">Clear action in unfamiliar places.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">
              A systems design framework for helping people act confidently in unfamiliar, dynamic environments by interpreting context, reducing uncertainty, and preserving autonomy.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 md:p-8">
              <MiniFlow
                items={[
                  'Unfamiliar Context',
                  'Interpreted Signals',
                  'Confidence Assessment',
                ]}
              />
              <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
                <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">04</p>
                  <p className="mt-3 text-sm font-bold leading-snug text-neutral-900">Trusted Guidance</p>
                </div>
                <ArrowRight className="mx-auto hidden h-5 w-5 text-neutral-300 md:block" aria-hidden="true" />
                <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-700">05</p>
                  <p className="mt-3 text-sm font-bold leading-snug text-neutral-900">Human Action</p>
                </div>
              </div>
              <p className="mt-6 border-t border-neutral-200 pt-5 text-sm leading-relaxed text-neutral-500">
                The goal is not to automate decisions. The goal is to help people understand enough of the moment to act with confidence.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <section id="aoc-why" className="bg-white py-16 md:py-28">
        <div className={contentBounds}>
          <SectionKicker eyebrow="01 // Why Confidence Matters" title="Confidence is not certainty. It is enough clarity to act.">
            <p>
              Dynamic environments ask people to make decisions before all information is available. The work of the system is to interpret the moment, reduce unnecessary ambiguity, and keep the person in control.
            </p>
          </SectionKicker>
          <motion.div className="grid gap-6 md:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {uncertaintyCards.map(({ title, body, Icon }) => (
              <motion.article key={title} variants={fadeItem} className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
                <Icon className="mb-8 h-7 w-7 text-cyan-600" aria-hidden="true" />
                <h3 className="font-tiempos text-2xl font-bold text-neutral-950">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">{body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="aoc-research" className="bg-neutral-950 py-20 text-white md:py-28">
        <div className={contentBounds}>
          <SectionKicker eyebrow="02 // Research Foundation" title="Studying systems that help people navigate uncertainty." dark>
            <p>
              The framework began inside the Environmental Systems Design OS, where destination, wayfinding, editorial, and adaptive decision systems were audited for how they create clarity in unfamiliar conditions.
            </p>
          </SectionKicker>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {researchInputs.map((item) => (
              <article key={item.name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">{item.focus}</p>
                <h3 className="mt-4 font-tiempos text-2xl font-bold text-white">{item.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-400">{item.finding}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-300">Environmental Systems Design OS</p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-300">
              Internal research and synthesis workspace for audit notes, environmental patterns, confidence mechanisms, and transferable design principles.
            </p>
            <p className="mt-3 text-sm text-neutral-400">
              This framework emerged from research structured inside the{' '}
              <a
                href="/projects/environmental-systems-design-os"
                className="text-cyan-300 underline underline-offset-2 transition-colors hover:text-cyan-200"
              >
                Environmental Systems Design OS →
              </a>
            </p>
          </div>
        </div>
      </section>

      <section id="aoc-synthesis" className="bg-neutral-50 py-16 md:py-28">
        <div className={contentBounds}>
          <SectionKicker eyebrow="03 // Research Synthesis" title="From observation to framework.">
            <p>
              The Architecture of Confidence was not invented as a standalone concept. It emerged from studying how real-world systems help people navigate uncertainty, build trust, recover from disruptions, and act with greater clarity.
            </p>
          </SectionKicker>
          <ResearchSynthesisVisual />
        </div>
      </section>

      <section id="aoc-insights" className="border-t border-neutral-100 bg-white py-16 md:py-28">
        <div className={contentBounds}>
          <SectionKicker eyebrow="04 // Key Insights" title="What the audits revealed.">
            <p>Across the research, confidence appeared as a relationship between context, timing, cognitive effort, validation, autonomy, and recovery.</p>
          </SectionKicker>
          <motion.div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {keyInsights.map((insight, index) => (
              <motion.article key={insight.title} variants={fadeItem} className="rounded-2xl border border-neutral-200 bg-white p-6">
                <p className="font-mono text-xl font-bold text-cyan-600">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-5 font-tiempos text-xl font-bold leading-tight text-neutral-950">{insight.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">{insight.detail}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="aoc-model" className="bg-neutral-950 py-20 text-white md:py-28">
        <div className={contentBounds}>
          <SectionKicker eyebrow="05 // Confidence Model" title="A model for designing confident action." dark>
            <p>
              The model treats confidence as the result of interpreted context, appropriate timing, grounded judgment, and preserved human choice.
            </p>
          </SectionKicker>
          <ConfidenceModelGraphic />
        </div>
      </section>

      <section id="aoc-architecture" className="bg-neutral-50 py-16 md:py-28">
        <div className={contentBounds}>
          <SectionKicker eyebrow="06 // System Architecture v2" title="How confidence moves through a system.">
            <p>
              The architecture operationalizes the model as a decision-support loop, beginning with a moment of uncertainty and ending with action, recovery, and learning.
            </p>
          </SectionKicker>
          <SystemArchitectureV2Diagram />
        </div>
      </section>

      <section id="aoc-scenario" className="border-t border-neutral-100 bg-white py-16 md:py-28">
        <div className={contentBounds}>
          <SectionKicker eyebrow="07 // Scenario Walkthrough" title="A decision trace without designing screens.">
            <p>
              This walkthrough shows the framework at work as a person encounters uncertainty, receives context, and chooses a next step while retaining autonomy.
            </p>
          </SectionKicker>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="relative space-y-6">
                <div className="absolute left-4 top-4 bottom-4 hidden w-px bg-neutral-200 md:block" aria-hidden="true" />
                {scenarioSteps.map((step, index) => (
                  <div key={step.title} className="relative md:pl-12">
                    <div className="absolute left-1.5 top-2 hidden h-5 w-5 rounded-full border-2 border-cyan-500 bg-white md:block" aria-hidden="true" />
                    <article className="rounded-2xl border border-neutral-200 bg-white p-5">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-600">{String(index + 1).padStart(2, '0')}</p>
                      <h3 className="mt-3 font-tiempos text-xl font-bold text-neutral-950">{step.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-600">{step.text}</p>
                    </article>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-neutral-500">Pattern Match</p>
                <h3 className="mt-5 font-tiempos text-3xl font-bold leading-tight text-neutral-950">
                  Unfamiliar destination + time pressure + low local knowledge
                </h3>
                <div className="mt-8 space-y-4">
                  {['Clarify the context', 'Reduce interpretation work', 'Preserve the choice', 'Prepare a recovery path'].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 text-sm font-medium text-neutral-800">
                      <CheckCircle2 className="h-4 w-4 text-cyan-600" aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="aoc-applications" className="bg-neutral-950 py-20 text-white md:py-28">
        <div className={contentBounds}>
          <SectionKicker eyebrow="08 // Applications" title="Where the framework transfers." dark>
            <p>
              One architecture can support many environments when it interprets uncertainty, identifies the confidence breakdown, and helps people move toward action without losing agency.
            </p>
          </SectionKicker>
          <div className="space-y-6">
            <ArchitectureRibbon />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {applications.map((application) => (
                <ApplicationCard key={application.environment} application={application} />
              ))}
            </div>
            <CrossSystemTruths />
          </div>
        </div>
      </section>

      <section id="aoc-future" className="border-t border-neutral-100 bg-neutral-50 py-16 md:py-28">
        <div className={contentBounds}>
          <SectionKicker eyebrow="09 // Future Direction" title="From research studio to applied confidence systems.">
            <p>
              The OS continues to act as the internal design studio where audits, patterns, and confidence criteria are refined before becoming public-facing frameworks.
            </p>
          </SectionKicker>
          <div className="space-y-6">
            {roadmap.map((item) => (
              <article key={item.phase} className="grid gap-4 rounded-2xl border border-neutral-200 bg-white p-6 md:grid-cols-[90px_1fr] md:items-start">
                <p className="font-mono text-2xl font-bold text-cyan-600">[{item.phase}]</p>
                <div>
                  <h3 className="font-tiempos text-2xl font-bold text-neutral-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 border-l border-neutral-200 pl-6">
            <p className="max-w-3xl font-tiempos text-2xl font-bold leading-relaxed text-neutral-950 md:text-3xl">
              Confidence is the bridge between context and action. The framework exists to help people cross it without surrendering their judgment.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
