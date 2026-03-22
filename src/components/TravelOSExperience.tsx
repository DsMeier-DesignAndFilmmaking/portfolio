'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  BrainCircuit,
  CloudSun,
  Database,
  HardDriveDownload,
  ShieldCheck,
  Smartphone,
  Users,
  X,
} from 'lucide-react';

type ScenarioId = 'coldStart' | 'socialHit' | 'offlineSurvival';
type NodeId =
  | 'db'
  | 'weather'
  | 'social'
  | 'vault'
  | 'context'
  | 'aggregator'
  | 'trust'
  | 'score'
  | 'ui';

interface TraceScenario {
  id: ScenarioId;
  label: string;
  trigger: string;
  logicSnapshot: string;
  uiHeadline: string;
  uiMessage: string;
  uiRationale: string;
  badge: string;
  badgeTone: 'blue' | 'lime' | 'amber';
  sourceInterface: string;
  activeNodes: NodeId[];
  activeEdges: string[];
  packetPath: NodeId[];
  logSteps: string[];
}

interface TraceNode {
  id: NodeId;
  label: string;
  lane: 'infra' | 'middleware' | 'interface';
  icon: LucideIcon;
}

interface Edge {
  id: string;
  from: NodeId;
  to: NodeId;
}

interface TravelOSExperienceProps {
  isOpen: boolean;
  onClose: () => void;
}

const traceNodes: TraceNode[] = [
  { id: 'db', label: 'Supabase / PostGIS', lane: 'infra', icon: Database },
  { id: 'weather', label: 'Weather API', lane: 'infra', icon: CloudSun },
  { id: 'social', label: 'Social Graph', lane: 'infra', icon: Users },
  { id: 'vault', label: 'Local Tactical Vault (IndexedDB)', lane: 'infra', icon: HardDriveDownload },
  { id: 'context', label: 'Context Engine', lane: 'middleware', icon: BrainCircuit },
  { id: 'aggregator', label: 'Signal Aggregator', lane: 'middleware', icon: BrainCircuit },
  { id: 'trust', label: 'Trust Layer', lane: 'middleware', icon: ShieldCheck },
  { id: 'score', label: 'Agentic Score', lane: 'middleware', icon: BrainCircuit },
  { id: 'ui', label: 'Field Notes Tactical UI', lane: 'interface', icon: Smartphone },
];

const traceEdges: Edge[] = [
  { id: 'db-context', from: 'db', to: 'context' },
  { id: 'weather-context', from: 'weather', to: 'context' },
  { id: 'social-aggregator', from: 'social', to: 'aggregator' },
  { id: 'aggregator-trust', from: 'aggregator', to: 'trust' },
  { id: 'context-score', from: 'context', to: 'score' },
  { id: 'trust-score', from: 'trust', to: 'score' },
  { id: 'score-ui', from: 'score', to: 'ui' },
  { id: 'vault-ui', from: 'vault', to: 'ui' },
];

const nodePositions: Record<NodeId, { x: number; y: number }> = {
  db: { x: 14, y: 86 },
  weather: { x: 14, y: 68 },
  social: { x: 14, y: 50 },
  vault: { x: 14, y: 32 },
  context: { x: 48, y: 72 },
  aggregator: { x: 48, y: 54 },
  trust: { x: 48, y: 36 },
  score: { x: 48, y: 18 },
  ui: { x: 84, y: 30 },
};

const scenarios: TraceScenario[] = [
  {
    id: 'coldStart',
    label: 'Cold Start',
    trigger: 'social_graph: [] -> Trigger Environmental Pivot',
    logicSnapshot: `{
  "identity": "Anonymous",
  "location": { "city": "Denver", "lat": 39.7392, "lng": -104.9903 },
  "environment": { "weather": "Sunny", "temperature_f": 72, "noise": "Quiet" },
  "social_graph": []
}`,
    uiHeadline: 'Sunny & Quiet',
    uiMessage: 'Based on the current 72° weather in Denver, we suggest the patio at Little Owl Coffee.',
    uiRationale: 'Environmental Pivot: no social anchor detected, so the kernel prioritizes weather comfort and low-friction focus.',
    badge: 'LIVE SIGNALS',
    badgeTone: 'blue',
    sourceInterface: `interface TravelContext {
  identity: "Anonymous" | "Verified";
  location: { lat: number; lng: number; altitude: number };
  environment: {
    weather: string;
    uv_index: number;
    time_bucket: "morning" | "noon" | "night";
  };
  social_graph: string[];
}

const activeContext: TravelContext = {
  identity: "Anonymous",
  location: { lat: 39.7392, lng: -104.9903, altitude: 1609 },
  environment: { weather: "Sunny", uv_index: 7, time_bucket: "noon" },
  social_graph: []
};`,
    activeNodes: ['db', 'weather', 'context', 'score', 'ui'],
    activeEdges: ['db-context', 'weather-context', 'context-score', 'score-ui'],
    packetPath: ['db', 'context', 'weather', 'score', 'ui'],
    logSteps: [
      'Inbound Signal detected...',
      'social_graph returned empty array (n=0).',
      'Applying cliff-edge decay for social confidence.',
      'Environmental Pivot enabled via Context Engine + Weather API.',
      'Scoring candidate venues by weather-fit + calmness.',
      'Rendering persuasive rationale in Field Notes.',
    ],
  },
  {
    id: 'socialHit',
    label: 'Social Hit',
    trigger: 'social_graph: ["Friend_A", "Friend_B"] -> Trigger Trust Layer',
    logicSnapshot: `{
  "identity": "Verified",
  "location": { "city": "Denver", "lat": 39.7392, "lng": -104.9903 },
  "social_graph": ["Friend_A", "Friend_B"],
  "signal_confidence": 0.92,
  "venue": "Forest Room 5"
}`,
    uiHeadline: 'Social Pulse',
    uiMessage: '2 friends are currently at Forest Room 5. It’s trending in your network right now.',
    uiRationale: 'Trust Layer confirmed a high-confidence social match, so the system prioritized social relevance over weather priors.',
    badge: 'VERIFIED TRUST',
    badgeTone: 'lime',
    sourceInterface: `interface TravelContext {
  identity: "Anonymous" | "Verified";
  location: { lat: number; lng: number; altitude: number };
  environment: {
    weather: string;
    uv_index: number;
    time_bucket: "morning" | "noon" | "night";
  };
  social_graph: string[] | null;
}

const activeContext: TravelContext = {
  identity: "Verified",
  location: { lat: 39.7392, lng: -104.9903, altitude: 1609 },
  environment: { weather: "Partly Cloudy", uv_index: 4, time_bucket: "night" },
  social_graph: ["Friend_A", "Friend_B"]
};`,
    activeNodes: ['db', 'social', 'aggregator', 'trust', 'score', 'ui'],
    activeEdges: ['social-aggregator', 'aggregator-trust', 'trust-score', 'score-ui'],
    packetPath: ['db', 'aggregator', 'social', 'trust', 'score', 'ui'],
    logSteps: [
      'Inbound Signal detected...',
      'Social Graph match found (n=2).',
      'Applying trust weighting with recency score.',
      'Signal Aggregator merged venue + affinity streams.',
      'Trust Layer passed confidence threshold (0.92).',
      'Rendering persuasive rationale in Field Notes.',
    ],
  },
  {
    id: 'offlineSurvival',
    label: 'Offline Survival',
    trigger: 'connection: offline -> Trigger Graceful Degradation',
    logicSnapshot: `{
  "connection": "offline",
  "location": { "district": "LoDo" },
  "signal_streams": null,
  "fallback_source": "IndexedDB"
}`,
    uiHeadline: 'Offline Mode',
    uiMessage: 'Showing verified local essentials for LoDo. (Real-time signals unavailable).',
    uiRationale: 'Graceful Degradation activated: HADE cloud modules pause while the Local Tactical Vault keeps utility intact.',
    badge: 'TACTICAL OFFLINE',
    badgeTone: 'amber',
    sourceInterface: `interface OfflineTravelContext {
  connection: "offline";
  location: { district: string };
  cached_essentials: Array<{ name: string; category: string; verified: boolean }>;
}

const activeContext: OfflineTravelContext = {
  connection: "offline",
  location: { district: "LoDo" },
  cached_essentials: [
    { name: "Union Station Restrooms", category: "Essential", verified: true },
    { name: "24h Pharmacy", category: "Medical", verified: true }
  ]
};`,
    activeNodes: ['vault', 'ui'],
    activeEdges: ['vault-ui'],
    packetPath: ['vault', 'ui'],
    logSteps: [
      'Connection dropped. Entering fail-safe path.',
      'Remote streams unavailable, skipping live middleware checks.',
      'Graceful Degradation enabled.',
      'Loading Local Tactical Vault cache (IndexedDB).',
      'Publishing verified essentials for current district.',
      'Rendering fallback rationale for user trust continuity.',
    ],
  },
];

const badgeToneClass: Record<TraceScenario['badgeTone'], string> = {
  blue: 'border-sky-300/50 bg-sky-300/15 text-sky-100',
  lime: 'border-lime-300/50 bg-lime-300/15 text-lime-100',
  amber: 'border-amber-300/60 bg-amber-300/15 text-amber-100',
};

const HADE_MIDDLEWARE = new Set<NodeId>(['context', 'aggregator', 'trust', 'score']);

export default function TravelOSExperience({ isOpen, onClose }: TravelOSExperienceProps) {
  const [activeScenario, setActiveScenario] = useState<ScenarioId>('coldStart');
  const [showSource, setShowSource] = useState(false);
  const [packetStep, setPacketStep] = useState(0);
  const [logicLog, setLogicLog] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const scenario = useMemo(
    () => scenarios.find((entry) => entry.id === activeScenario) ?? scenarios[0],
    [activeScenario],
  );

  const activePacketNode = scenario.packetPath[packetStep] ?? scenario.packetPath[0];

  useEffect(() => {
    if (!isOpen) {
      setShowSource(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    setPacketStep(0);
    const path = scenario.packetPath;
    const pulseInterval = window.setInterval(() => {
      setPacketStep((prev) => (prev + 1) % path.length);
    }, 520);

    return () => window.clearInterval(pulseInterval);
  }, [scenario.id, scenario.packetPath, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    setLogicLog([]);
    let index = 0;
    const lines = scenario.logSteps;

    const logInterval = window.setInterval(() => {
      setLogicLog((prev) => [...prev, lines[index]]);
      index += 1;
      if (index >= lines.length) {
        window.clearInterval(logInterval);
      }
    }, 420);

    return () => window.clearInterval(logInterval);
  }, [scenario.id, scenario.logSteps, isOpen]);

  useEffect(() => {
    if (!logContainerRef.current) return;
    logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
  }, [logicLog]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100]"
          role="dialog"
          aria-modal="true"
          aria-label="Travel OS Experience Trace"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.35, ease: [0.2, 0.85, 0.2, 1] }}
        >
          <motion.button
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-label="Close ecosystem trace backdrop"
          />

          <div className="relative z-10 h-full w-full p-8">
            <div className="mx-auto flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 text-slate-200 shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
              <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 px-6 py-5 backdrop-blur-xl md:px-8">
                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-2">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-sky-400">System Architecture: HADE x Field Notes</p>
                    <h2 className="text-xl font-semibold text-white md:text-2xl">Travel OS Experience Trace</h2>
                    <p className="max-w-3xl text-sm text-slate-200" style={{ fontFamily: '"Inter", "Helvetica Neue", sans-serif' }}>
                      Live prototype of the intelligence middleware pipeline and the end-user UI outcome.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-200 transition hover:border-white/45 hover:text-white"
                    aria-label="Close architecture"
                  >
                    <X className="h-3.5 w-3.5" />
                    [ CLOSE ARCHITECTURE ]
                  </button>
                </div>
              </header>

              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="mx-auto w-full max-w-7xl p-6 md:p-8">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                    <section className="md:col-span-7 space-y-6">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lime-400">Signal Trigger</p>
                        <div className="mt-3 grid gap-2 sm:grid-cols-3">
                          {scenarios.map((entry) => {
                            const active = entry.id === activeScenario;
                            return (
                              <button
                                key={entry.id}
                                type="button"
                                onClick={() => setActiveScenario(entry.id)}
                                className={`rounded-xl border px-3 py-3 text-left transition ${
                                  active
                                    ? 'border-sky-400/60 bg-sky-400/10'
                                    : 'border-white/15 bg-black/20 hover:border-white/30 hover:bg-white/5'
                                }`}
                              >
                                <p className="text-sm font-semibold text-white" style={{ fontFamily: '"Inter", "Helvetica Neue", sans-serif' }}>
                                  {entry.label}
                                </p>
                                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-sky-400">{entry.trigger}</p>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-sky-400">System Logic</p>
                        <pre className="mt-2 overflow-x-auto text-xs leading-5 text-slate-200" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                          <code>{scenario.logicSnapshot}</code>
                        </pre>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="mb-3 flex items-center justify-between gap-4">
                          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lime-400">Data Flow</p>
                          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-sky-400">Infrastructure {'->'} Middleware {'->'} Interface</p>
                        </div>

                        <LayoutGroup id="travel-os-packet">
                          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#030914]/70">
                            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                              {traceEdges.map((edge) => {
                                const from = nodePositions[edge.from];
                                const to = nodePositions[edge.to];
                                const active = scenario.activeEdges.includes(edge.id);

                                return (
                                  <motion.line
                                    key={edge.id}
                                    x1={from.x}
                                    y1={from.y}
                                    x2={to.x}
                                    y2={to.y}
                                    stroke={active ? '#38bdf8' : 'rgba(148, 163, 184, 0.24)'}
                                    strokeWidth={active ? 1.6 : 0.8}
                                    strokeDasharray={active ? '6 6' : '2 8'}
                                    initial={false}
                                    animate={
                                      active
                                        ? { strokeDashoffset: [0, -22], opacity: [0.6, 1, 0.6] }
                                        : { strokeDashoffset: 0, opacity: 0.35 }
                                    }
                                    transition={{ duration: active ? 1.2 : 0.2, repeat: active ? Infinity : 0, ease: 'linear' }}
                                  />
                                );
                              })}
                            </svg>

                            {traceNodes.map((node) => {
                              const Icon = node.icon;
                              const position = nodePositions[node.id];
                              const active = scenario.activeNodes.includes(node.id);
                              const muted = scenario.id === 'offlineSurvival' && HADE_MIDDLEWARE.has(node.id);
                              const packetHere = activePacketNode === node.id;

                              return (
                                <motion.div
                                  key={node.id}
                                  style={{ left: `${position.x}%`, top: `${position.y}%` }}
                                  className={`absolute w-28 sm:w-32 md:w-40 -translate-x-1/2 -translate-y-1/2 rounded-lg border p-2 ${
                                    muted
                                      ? 'border-slate-500/20 bg-slate-700/15 text-slate-500'
                                      : active
                                        ? 'border-sky-400/55 bg-sky-400/12 text-sky-100'
                                        : 'border-white/15 bg-black/35 text-slate-300'
                                  }`}
                                  animate={active && !muted ? { scale: [1, 1.025, 1] } : { scale: 1 }}
                                  transition={{ duration: 1.1, repeat: active && !muted ? Infinity : 0 }}
                                >
                                  {packetHere && (
                                    <motion.div
                                      layoutId="trace-packet"
                                      className="absolute -right-2 -top-2 h-3 w-3 rounded-full bg-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.95)]"
                                      transition={{ type: 'spring', damping: 20, stiffness: 220 }}
                                    />
                                  )}
                                  <div className="flex items-center gap-2">
                                    <Icon className="h-4 w-4" />
                                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-sky-400">{node.lane}</p>
                                  </div>
                                  <p className="mt-1 text-xs leading-snug text-slate-200" style={{ fontFamily: '"Inter", "Helvetica Neue", sans-serif' }}>
                                    {node.label}
                                  </p>
                                </motion.div>
                              );
                            })}
                          </div>
                        </LayoutGroup>
                      </div>
                    </section>

                    <section className="md:col-span-5 space-y-6">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lime-400">Live Mockup</p>
                          <button
                            type="button"
                            onClick={() => setShowSource((prev) => !prev)}
                            className="rounded-full border border-white/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-sky-400 transition hover:border-white/45"
                          >
                            {showSource ? 'Hide Source' : 'View Source'}
                          </button>
                        </div>

                        <div className="mt-4 flex justify-center">
                          <div className="w-[290px] rounded-[2rem] border border-white/25 bg-gradient-to-b from-slate-200/15 to-slate-900/25 p-2 shadow-[0_30px_80px_rgba(2,6,23,0.8)]">
                            <div className="rounded-[1.5rem] border border-white/10 bg-[#020612] p-4">
                              <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-white/20" />
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={scenario.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.28 }}
                                  className="space-y-3"
                                >
                                  <span
                                    className={`inline-flex rounded-full border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${badgeToneClass[scenario.badgeTone]}`}
                                  >
                                    {scenario.badge}
                                  </span>
                                  <h3 className="text-lg font-semibold text-white" style={{ fontFamily: '"Inter", "Helvetica Neue", sans-serif' }}>
                                    {scenario.uiHeadline}
                                  </h3>
                                  <p className="text-sm leading-relaxed text-slate-200" style={{ fontFamily: '"Inter", "Helvetica Neue", sans-serif' }}>
                                    {scenario.uiMessage}
                                  </p>
                                  <div className="rounded-lg border border-white/15 bg-white/5 p-3">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-sky-400">Rationale</p>
                                    <p className="mt-1 text-xs leading-relaxed text-slate-200">{scenario.uiRationale}</p>
                                  </div>
                                </motion.div>
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>

                        <AnimatePresence mode="wait">
                          {showSource && (
                            <motion.div
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 12 }}
                              transition={{ duration: 0.22 }}
                              className="mt-4 rounded-xl border border-white/15 bg-black/35 p-3"
                            >
                              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sky-400">TypeScript Source</p>
                              <pre className="mt-2 max-h-64 overflow-auto text-xs leading-5 text-slate-200" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                                <code>{scenario.sourceInterface}</code>
                              </pre>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-lime-400">Logic Log</p>
                          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-sky-400">Realtime Decision Stream</p>
                        </div>
                        <div
                          ref={logContainerRef}
                          className="h-36 overflow-y-auto rounded-lg border border-white/10 bg-[#020710]/70 p-3 text-xs leading-6 text-slate-200"
                          style={{ fontFamily: '"JetBrains Mono", monospace' }}
                        >
                          {logicLog.map((line, index) => (
                            <p key={`${line}-${index}`} className="whitespace-pre-wrap">
                              <span className="text-slate-500">{`[${String(index + 1).padStart(2, '0')}]`}</span> {line}
                            </p>
                          ))}
                          {logicLog.length === 0 && <p className="text-slate-500">Waiting for signal...</p>}
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
