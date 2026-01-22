"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Cpu, Layers, Sparkles, ChevronRight, Smartphone, Brain, Eye, Code, X, Users, Shield, MessageCircle, Copy, Check, Lock, EyeOff, Activity, Radio, Info, ChevronUp, ChevronLeft, Key, Search, Mic, Volume2, Watch, LayoutGrid, ChevronDown, Monitor } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker, Graticule } from 'react-simple-maps';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { projectRegistry } from '../data';
import LogicReceipt from '../../../../../components/LogicReceipt';
import HeatmapOverlay from '../../../../../components/HeatmapOverlay';
import SocialProximityAlerts from '../../../../../components/SocialProximityAlerts';
import SocialLogicReceipt from '../../../../../components/SocialLogicReceipt';
import SocialAffinitySurface from '../../../../../components/SocialAffinitySurface';
import SocialHandshakeSurface from '../../../../../components/SocialHandshakeSurface';
import SystemDebugOverlay from '../../../../../components/SystemDebugOverlay';
import MomentOfCalmSurface from '../../../../../components/MomentOfCalmSurface';
import NarrativeReflectionSurface from '../../../../../components/NarrativeReflectionSurface';
import SemanticStorySurface from '../../../../../components/SemanticStorySurface';
import ProjectNavigation from '../../../../../components/ProjectNavigation';

// Helper function to normalize image paths (handle both /portfolio/ prefix and base path)
function normalizeImagePath(imagePath: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  // If path starts with /portfolio/, replace it with basePath
  if (imagePath.startsWith('/portfolio/')) {
    return `${basePath}${imagePath.replace('/portfolio', '')}`;
  }
  // If path doesn't start with /, prepend basePath
  if (!imagePath.startsWith('/')) {
    return `${basePath}/${imagePath}`;
  }
  // Otherwise, prepend basePath to absolute paths
  return `${basePath}${imagePath}`;
}

// --- PRODUCTION GRAPHIC: CONTEXT-AWARE DETOURS ---
const DetourVisual = () => (
  <motion.div 
    initial={{ y: 20, opacity: 0 }} 
    animate={{ y: 0, opacity: 1 }} 
    className="w-80 bg-white/95 backdrop-blur-2xl rounded-[40px] border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] p-8 relative overflow-hidden"
  >
    {/* Real-time Status Header */}
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-2">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
        </div>
        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400">CATDS_ACTIVE</span>
      </div>
      <div className="px-3 py-1 bg-blue-50 rounded-full text-[9px] font-bold text-blue-600 uppercase tracking-tighter">
        Sensing v2.4
      </div>
    </div>

    {/* Detour Suggestion Content */}
    <div className="mb-8">
      <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-2">Recommended Divergence</div>
      <h4 className="text-2xl font-bold text-slate-900 leading-[1.2] tracking-tight mb-2">Ancient Cloister via Cobblestone Alley</h4>
      <p className="text-xs text-slate-500 leading-relaxed font-medium">1.2km walk • Hidden historical landmark with low foot traffic.</p>
    </div>

    {/* Metric Blocks: The "Proof of Work" */}
    <div className="space-y-4 mb-8">
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Arrival Slack</span>
          <span className="text-xs font-mono font-bold text-emerald-600">+18m Buffer</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: "75%" }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full" 
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 bg-blue-50/50 rounded-xl p-3 border border-blue-100/50">
          <div className="text-[8px] font-bold text-blue-400 uppercase mb-1">Weather</div>
          <div className="text-[11px] font-bold text-blue-700">Clear Skies</div>
        </div>
        <div className="flex-1 bg-amber-50/50 rounded-xl p-3 border border-amber-100/50">
          <div className="text-[8px] font-bold text-amber-400 uppercase mb-1">Crowd Density</div>
          <div className="text-[11px] font-bold text-amber-700">6% (Lull)</div>
        </div>
      </div>
    </div>

    {/* Action UI */}
    <div className="w-full bg-slate-950 text-white py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
      Accept Path Shift
      <ChevronRight size={14} />
    </div>
  </motion.div>
);

// --- NARRATIVE ENGINE: Mock function to find intersection points ---
type IntersectionType = 'Shared Hobby' | 'Recent Location' | 'Professional Goal' | 'Niche Interest';

interface Icebreaker {
  id: string;
  text: string;
  type: IntersectionType;
  confidenceScore: number;
  prompt: string; // Pre-filled message for chat
}

interface NarrativeLayer {
  interests: string[];
  recentLocations: string[];
  professionalGoals: string[];
  nicheInterests: string[];
}

const NarrativeEngine = (userNarrative: NarrativeLayer, matchNarrative: NarrativeLayer): Icebreaker[] => {
  const icebreakers: Icebreaker[] = [];
  let idCounter = 1;

  // Shared Hobby intersections
  userNarrative.interests.forEach(interest => {
    if (matchNarrative.interests.includes(interest)) {
      icebreakers.push({
        id: `hobby-${idCounter++}`,
        text: `Both interested in ${interest}`,
        type: 'Shared Hobby',
        confidenceScore: 0.85,
        prompt: `Hi! I noticed we're both interested in ${interest}. Want to explore that together?`,
      });
    }
  });

  // Recent Location intersections
  userNarrative.recentLocations.forEach(location => {
    if (matchNarrative.recentLocations.includes(location)) {
      icebreakers.push({
        id: `location-${idCounter++}`,
        text: `Both visited ${location}`,
        type: 'Recent Location',
        confidenceScore: 0.92,
        prompt: `Hey! I see we both visited ${location}. Did you enjoy it?`,
      });
    }
  });

  // Professional Goal intersections
  userNarrative.professionalGoals.forEach(goal => {
    if (matchNarrative.professionalGoals.includes(goal)) {
      icebreakers.push({
        id: `goal-${idCounter++}`,
        text: `Both working on ${goal}`,
        type: 'Professional Goal',
        confidenceScore: 0.78,
        prompt: `Hi! I noticed we're both focused on ${goal}. Would love to connect!`,
      });
    }
  });

  // Niche Interest intersections
  userNarrative.nicheInterests.forEach(interest => {
    if (matchNarrative.nicheInterests.includes(interest)) {
      icebreakers.push({
        id: `niche-${idCounter++}`,
        text: `Both into ${interest}`,
        type: 'Niche Interest',
        confidenceScore: 0.95,
        prompt: `Wow, we're both into ${interest}! That's rare. Want to chat?`,
      });
    }
  });

  // Sort by confidence score (highest first) and return top 3
  return icebreakers.sort((a, b) => b.confidenceScore - a.confidenceScore).slice(0, 3);
};

// --- PROXIMITY REVEAL LENS: High-Fidelity UX/UI for Social Opportunity Matching ---
const ProximityRevealLens = () => {
  // Mock dataset: 3 profiles with varying distances and trust levels, including Narrative Layer
  const [matches, setMatches] = useState([
    {
      id: 1,
      name: "Alex Chen",
      initials: "AC",
      blurLevel: 25,
      sharedNodes: 7,
      proximity: "240m",
      matchScore: 88,
      verified: false,
      narrative: {
        interests: ['Tokyo Jazz Clubs', 'ZK-Proofs', 'Minimalist Design'],
        recentLocations: ['Tokyo Design Week', 'Berlin Coffee Shops'],
        professionalGoals: ['Cryptographic Systems', 'UX Architecture'],
        nicheInterests: ['Zero-Knowledge Protocols', 'Japanese Jazz'],
      } as NarrativeLayer,
    },
    {
      id: 2,
      name: "Jordan Martinez",
      initials: "JM",
      blurLevel: 25,
      sharedNodes: 4,
      proximity: "180m",
      matchScore: 72,
      verified: false,
      narrative: {
        interests: ['Photography', 'Urban Exploration'],
        recentLocations: ['Barcelona', 'Amsterdam'],
        professionalGoals: ['Product Design'],
        nicheInterests: ['Film Photography'],
      } as NarrativeLayer,
    },
    {
      id: 3,
      name: "Sam Taylor",
      initials: "ST",
      blurLevel: 25,
      sharedNodes: 9,
      proximity: "400m",
      matchScore: 91,
      verified: false,
      narrative: {
        interests: ['ZK-Proofs', 'Minimalist Design', 'Coffee Culture'],
        recentLocations: ['Tokyo Design Week', 'Berlin Coffee Shops', 'Copenhagen'],
        professionalGoals: ['Cryptographic Systems', 'UX Architecture'],
        nicheInterests: ['Zero-Knowledge Protocols', 'Nordic Design'],
      } as NarrativeLayer,
    },
  ]);

  // Current user's narrative layer (mock)
  const userNarrative: NarrativeLayer = {
    interests: ['Tokyo Jazz Clubs', 'ZK-Proofs', 'Minimalist Design'],
    recentLocations: ['Tokyo Design Week', 'Berlin Coffee Shops'],
    professionalGoals: ['Cryptographic Systems', 'UX Architecture'],
    nicheInterests: ['Zero-Knowledge Protocols', 'Japanese Jazz'],
  };

  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'proving' | 'verified'>('idle');
  const [zkProofLogs, setZkProofLogs] = useState<string[]>([]);
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);
  const [revealedInterests, setRevealedInterests] = useState<Record<number, Icebreaker[]>>({});
  const [copiedIcebreakerId, setCopiedIcebreakerId] = useState<string | null>(null);

  const handleReveal = (matchId: number) => {
    setSelectedMatchId(matchId);
    setVerificationStatus('proving');
    setZkProofLogs([]);

    // Get the match's narrative layer
    const match = matches.find(m => m.id === matchId);
    if (!match) return;

    // Simulate ZK-Proof sequence
    const logs = [
      '[ZK_Gate_L1]: Initiating proximity proof verification...',
      '[ZK_Gate_L2]: Validating location attestation hash...',
      '[ZK_Gate_L3]: Checking mutual reveal consent...',
      '[ZK_Gate_L4]: Verifying social graph trust nodes...',
      '[ZK_Gate_L5]: ✓ Proof verified. Revealing identity.',
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setZkProofLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setVerificationStatus('verified');
          setMatches(prev => prev.map(m => 
            m.id === matchId 
              ? { ...m, blurLevel: 0, verified: true }
              : m
          ));
          
          // Generate icebreakers using NarrativeEngine
          const icebreakers = NarrativeEngine(userNarrative, match.narrative);
          setRevealedInterests(prev => ({ ...prev, [matchId]: icebreakers }));
        }
      }, (index + 1) * 600);
    });
  };

  const handleCopyIcebreaker = async (prompt: string, icebreakerId: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedIcebreakerId(icebreakerId);
      setTimeout(() => setCopiedIcebreakerId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      className="w-80 bg-slate-900/95 backdrop-blur-xl rounded-[40px] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] p-6 relative overflow-hidden"
    >
      {/* Background: Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-violet-500/5" />
      
      {/* Header: Lens Status */}
      <div className="relative z-10 flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#8b5cf6]" />
          <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-purple-400">PROXIMITY_LENS</span>
        </div>
        <div className="text-[9px] font-mono text-slate-400">
          {matches.length} Nearby
        </div>
      </div>

      {/* The Lens Overlay: List of Social Matches */}
      <div className="relative z-10 space-y-3 mb-6">
        {matches.map((match) => {
          const isHighMatch = match.matchScore > 80;
          const isVerified = match.verified || (selectedMatchId === match.id && verificationStatus === 'verified');
          const icebreakers = revealedInterests[match.id] || [];
          const hasIcebreakers = icebreakers.length > 0;
          
          return (
            <div key={match.id} className="space-y-3">
              <motion.div
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 hover:bg-white/[0.08] transition-all cursor-pointer"
                whileHover={{ scale: isVerified ? 1 : 1.02 }}
                animate={isHighMatch && !isVerified ? {
                  boxShadow: [
                    '0 0 0px rgba(139, 92, 246, 0)',
                    '0 0 12px rgba(139, 92, 246, 0.3)',
                    '0 0 0px rgba(139, 92, 246, 0)',
                  ],
                } : {}}
                transition={{ duration: 2, repeat: isHighMatch && !isVerified ? Infinity : 0 }}
                onClick={() => !isVerified && handleReveal(match.id)}
              >
                <div className="flex items-center gap-4">
                  {/* Blurred Avatar */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-violet-600 flex items-center justify-center text-white font-bold text-sm"
                      animate={{
                        filter: isVerified ? 'blur(0px)' : `blur(${match.blurLevel}px)`,
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      {match.initials}
                    </motion.div>
                  </div>

                  {/* Match Metadata */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-white truncate" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {isVerified ? match.name : 'Anonymous'}
                      </h4>
                      {isHighMatch && !isVerified && (
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-purple-400"
                        />
                      )}
                    </div>
                    
                    {/* Relational Heuristic Display */}
                    <div className="flex items-center gap-3">
                      {/* Social Trust Badge */}
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-purple-500/20 rounded-lg border border-purple-500/30">
                        <Users size={10} className="text-purple-400" />
                        <span className="text-[10px] font-mono font-bold text-purple-300">
                          {match.sharedNodes} nodes
                        </span>
                      </div>
                      
                      {/* Proximity Index */}
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-violet-500/20 rounded-lg border border-violet-500/30">
                        <Shield size={10} className="text-violet-400" />
                        <span className="text-[10px] font-mono font-bold text-violet-300">
                          {match.proximity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contextual Icebreakers Drawer - Only show when verified */}
              <AnimatePresence>
                {isVerified && hasIcebreakers && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white/[0.03] backdrop-blur-xl rounded-xl border border-white/10 p-4 space-y-3">
                      {/* Common Ground Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles size={12} className="text-purple-400" />
                        <span className="text-[10px] font-mono font-bold text-purple-300 uppercase tracking-wider">
                          Common Ground
                        </span>
                        <motion.div
                          className="flex-1 h-[1px] bg-gradient-to-r from-purple-500/30 to-transparent"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ delay: 0.4, duration: 0.3 }}
                        />
                      </div>

                      {/* Icebreaker Chips */}
                      <div className="space-y-2">
                        {icebreakers.map((icebreaker, index) => (
                          <motion.button
                            key={icebreaker.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                            onClick={() => handleCopyIcebreaker(icebreaker.prompt, icebreaker.id)}
                            className="w-full bg-transparent border border-white/20 rounded-lg px-3 py-2.5 hover:bg-white/[0.05] hover:border-white/30 transition-all text-left group"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <MessageCircle size={12} className="text-purple-400 flex-shrink-0" />
                                <span className="text-[11px] text-white font-medium truncate" style={{ fontFamily: "'Inter', sans-serif" }}>
                                  {icebreaker.text}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-[9px] font-mono text-slate-400">
                                  {Math.round(icebreaker.confidenceScore * 100)}%
                                </span>
                                {copiedIcebreakerId === icebreaker.id ? (
                                  <Check size={12} className="text-emerald-400" />
                                ) : (
                                  <Copy size={12} className="text-slate-400 group-hover:text-purple-400 transition-colors" />
                                )}
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* ZK-Proof Terminal Logs */}
      {verificationStatus !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mt-4"
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/5 p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                ZK-Proof Terminal
              </span>
            </div>
            <code className="block text-[9px] font-mono text-slate-300 space-y-1">
              {zkProofLogs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={log.includes('✓') ? 'text-emerald-400' : 'text-slate-400'}
                >
                  {log}
                </motion.div>
              ))}
              {verificationStatus === 'proving' && (
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-purple-400"
                >
                  ▋
                </motion.span>
              )}
            </code>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      {verificationStatus === 'idle' && (
        <div className="relative z-10 text-center">
          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            Tap a match to reveal
          </p>
        </div>
      )}
    </motion.div>
  );
};

const SocialRadarVisual = () => (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      className="w-80 bg-slate-900 rounded-[40px] border border-slate-800 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] p-8 relative overflow-hidden"
    >
      {/* Animated Radar Scanning Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-purple-500/50 rounded-full" />
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full origin-center"
        />
      </div>
  
      {/* Header: Encryption Status */}
      <div className="relative z-10 flex justify-between items-center mb-10">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#8b5cf6]" />
          <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-purple-400">HEURISTIC_SCAN</span>
        </div>
        <div className="flex -space-x-2">
          {[1, 2].map((i) => (
            <div key={i} className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <div className="w-1 h-1 bg-slate-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>
  
      {/* Match Result */}
      <div className="relative z-10 text-center mb-8">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }} 
          transition={{ repeat: Infinity, duration: 3 }}
          className="inline-block text-4xl font-bold text-white mb-2"
        >
          88%
        </motion.div>
        <div className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Affinity Probability</div>
      </div>
  
      {/* Commonality Tags */}
      <div className="relative z-10 space-y-2 mb-8">
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
          <Sparkles size={14} className="text-purple-400" />
          <div className="text-[11px] text-slate-300 font-medium">Shared Node: <span className="text-white font-bold">"Tech Design"</span></div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10 opacity-60">
          <div className="w-3.5 h-3.5 rounded bg-slate-700" />
          <div className="text-[11px] text-slate-400">Encrypted Proximity: 120m</div>
        </div>
      </div>
  
      {/* Reveal CTA */}
      <button className="relative z-10 w-full bg-purple-600 hover:bg-purple-500 text-white py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-lg shadow-purple-900/20">
        Request Reveal
      </button>
    </motion.div>
  );

  // --- SOCIAL GRAPH DATA MOCK ---
  interface SocialGraphNode {
    id: string;
    trustScore: number; // 0.0 to 1.0
    sharedInterests: string[];
    nodeDrift: number; // Drift radius in pixels
    position: { x: number; y: number };
    baseRadius: number;
  }

  interface PrivacyDataPoint {
    id: string;
    label: string;
    isMasked: boolean;
    category: 'location' | 'identity' | 'behavior';
  }

  const initialPrivacyData: PrivacyDataPoint[] = [
    { id: '1', label: 'Exact Coordinates', isMasked: true, category: 'location' },
    { id: '2', label: 'Search History', isMasked: true, category: 'behavior' },
    { id: '3', label: 'Last Name', isMasked: true, category: 'identity' },
    { id: '4', label: 'Mutual Interests', isMasked: false, category: 'behavior' },
    { id: '5', label: 'Trust Score', isMasked: false, category: 'identity' },
    { id: '6', label: 'General Neighborhood', isMasked: false, category: 'location' },
  ];

  // --- PRIVACY DASHBOARD (MASKING MONITOR) COMPONENT ---
  const PrivacyDashboard = () => {
    const [privacyData, setPrivacyData] = useState<PrivacyDataPoint[]>(initialPrivacyData);

    const handleToggle = (id: string) => {
      setPrivacyData(prev => prev.map(item => 
        item.id === id ? { ...item, isMasked: !item.isMasked } : item
      ));
    };

    const maskedItems = privacyData.filter(item => item.isMasked);
    const sharedItems = privacyData.filter(item => !item.isMasked);

    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-2xl rounded-2xl border-2 border-white/20 p-6 shadow-2xl"
      >
        <div className="flex items-center gap-2 mb-6">
          <Lock className="w-5 h-5 text-purple-300" />
          <h3 className="text-lg font-bold text-white">Privacy Dashboard</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Masked */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <EyeOff className="w-4 h-4 text-purple-300" />
              <span className="text-sm font-bold text-purple-300 uppercase tracking-wider">Masked</span>
            </div>
            <AnimatePresence>
              {maskedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-purple-500/20 border-2 border-purple-500/50 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative flex-1 overflow-hidden">
                      <div className="text-sm text-white font-semibold truncate">{item.label}</div>
                      {/* Shimmering redacted effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/40 to-transparent"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </div>
                    <button
                      onClick={() => handleToggle(item.id)}
                      className="flex-shrink-0 w-10 h-6 bg-purple-600/40 rounded-full p-1 transition-all hover:bg-purple-600/60 flex justify-start border border-purple-400/50"
                    >
                      <motion.div
                        className="w-4 h-4 bg-purple-300 rounded-full"
                        animate={{ x: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Column - Shared */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-lime-300" />
              <span className="text-sm font-bold text-lime-300 uppercase tracking-wider">Shared</span>
            </div>
            <AnimatePresence>
              {sharedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-lime-500/20 border-2 border-lime-500/50 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative flex-1 overflow-hidden">
                      <div className="text-sm text-white font-semibold truncate">{item.label}</div>
                    </div>
                    <button
                      onClick={() => handleToggle(item.id)}
                      className="flex-shrink-0 w-10 h-6 bg-lime-600/40 rounded-full p-1 transition-all hover:bg-lime-600/60 flex justify-start border border-lime-400/50"
                    >
                      <motion.div
                        className="w-4 h-4 bg-lime-300 rounded-full"
                        animate={{ x: 16 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  };

  // --- ENCRYPTED MATCH PULSE (PRIVACY RADAR) COMPONENT ---
  const EncryptedMatchPulse = ({ showIntelligence = false }: { showIntelligence?: boolean }) => {
    const [nodes, setNodes] = useState<SocialGraphNode[]>([
      {
        id: '1',
        trustScore: 0.85,
        sharedInterests: ['Design', 'Travel'],
        nodeDrift: 45,
        position: { x: 150, y: 120 },
        baseRadius: 20,
      },
      {
        id: '2',
        trustScore: 0.72,
        sharedInterests: ['Photography'],
        nodeDrift: 60,
        position: { x: 250, y: 180 },
        baseRadius: 18,
      },
      {
        id: '3',
        trustScore: 0.91,
        sharedInterests: ['Music', 'Art', 'Travel'],
        nodeDrift: 30,
        position: { x: 200, y: 250 },
        baseRadius: 24,
      },
    ]);

    const [pulseTime, setPulseTime] = useState(0);

    // Pulse animation every 3 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setPulseTime(prev => prev + 1);
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    // Node drift animation - update positions smoothly
    useEffect(() => {
      const interval = setInterval(() => {
        setNodes(prev => prev.map(node => {
          const angle = Math.random() * Math.PI * 2;
          const driftDistance = node.nodeDrift * (1 - node.trustScore); // Shrink drift as trust increases
          const maxDrift = driftDistance * 0.5; // Limit movement
          const newX = node.position.x + (Math.cos(angle) * maxDrift);
          const newY = node.position.y + (Math.sin(angle) * maxDrift);
          
          // Keep within bounds (assuming 400x400 canvas, centered at 200,200)
          const centerX = 200;
          const centerY = 200;
          const maxRadius = 130;
          const distanceFromCenter = Math.sqrt(
            Math.pow(newX - centerX, 2) + Math.pow(newY - centerY, 2)
          );
          
          let finalX = newX;
          let finalY = newY;
          if (distanceFromCenter > maxRadius) {
            const angleToCenter = Math.atan2(newY - centerY, newX - centerX);
            finalX = centerX + Math.cos(angleToCenter) * maxRadius;
            finalY = centerY + Math.sin(angleToCenter) * maxRadius;
          }
          
          return {
            ...node,
            position: {
              x: finalX,
              y: finalY,
            },
          };
        }));
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    const centerX = 200;
    const centerY = 200;
    const radarRadius = 150;

    return (
      <div className="w-full max-w-2xl mx-auto bg-slate-900/80 backdrop-blur-2xl rounded-2xl border-2 border-purple-500/30 p-8 shadow-2xl relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#818cf8_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Radio className="w-5 h-5 text-purple-300" />
            <h3 className="text-lg font-bold text-white">Encrypted Match Pulse</h3>
          </div>

          {/* Radar SVG */}
          <div className="relative w-full aspect-square max-w-md mx-auto bg-slate-900/50 rounded-xl p-4">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              {/* Radar Circles */}
              <circle cx={centerX} cy={centerY} r={radarRadius} fill="none" stroke="#818cf8" strokeWidth="2" opacity="0.6" />
              <circle cx={centerX} cy={centerY} r={radarRadius * 0.66} fill="none" stroke="#818cf8" strokeWidth="1.5" opacity="0.5" />
              <circle cx={centerX} cy={centerY} r={radarRadius * 0.33} fill="none" stroke="#818cf8" strokeWidth="1.5" opacity="0.5" />
              
              {/* Center Point */}
              <circle cx={centerX} cy={centerY} r={4} fill="#818cf8" />
              
              {/* Expanding Ripples */}
              <motion.circle
                cx={centerX}
                cy={centerY}
                r={radarRadius}
                fill="none"
                stroke="#a855f7"
                strokeWidth="3"
                opacity={0.6}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />

              {/* Probability Rings and Nodes */}
              {nodes.map((node) => {
                const highInterest = node.sharedInterests.length > 1;
                const pulseActive = pulseTime % 2 === 0 && highInterest;
                
                return (
                  <g key={node.id}>
                    {/* Probability Ring (drift area) */}
                    <circle
                      cx={node.position.x}
                      cy={node.position.y}
                      r={node.nodeDrift * (1 - node.trustScore)}
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.2"
                    />
                    
                    {/* Floating Node */}
                    <g transform={`translate(${node.position.x}, ${node.position.y})`}>
                      {/* Node Glow */}
                      <circle
                        cx={0}
                        cy={0}
                        r={node.baseRadius + 5}
                        fill={highInterest ? "#a855f7" : "#818cf8"}
                        opacity={pulseActive ? 0.4 : 0.2}
                      >
                        {pulseActive && (
                          <animate
                            attributeName="r"
                            values={`${node.baseRadius + 5};${node.baseRadius + 15};${node.baseRadius + 5}`}
                            dur="1.5s"
                            repeatCount="1"
                          />
                        )}
                      </circle>
                      
                      {/* Node Core */}
                      <circle
                        cx={0}
                        cy={0}
                        r={node.baseRadius}
                        fill={highInterest ? "#c084fc" : "#818cf8"}
                        stroke={highInterest ? "#d8b4fe" : "#a5b4fc"}
                        strokeWidth="2"
                        className="drop-shadow-lg"
                      />
                      
                      {/* Trust Score Indicator */}
                      <text
                        x={0}
                        y={-node.baseRadius - 12}
                        textAnchor="middle"
                        className="text-[11px] fill-white font-mono font-bold"
                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                      >
                        {Math.round(node.trustScore * 100)}%
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ZK-Proof Strings Overlay (Intelligence Layer) */}
          {showIntelligence && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl p-6 z-20"
            >
              <div className="space-y-2 font-mono text-xs text-purple-300">
                <div>[ZK_PROOF_001]: 0x4f2a8e1b3c9d...</div>
                <div>[ZK_PROOF_002]: 0x7b9c3f2a1e8d...</div>
                <div>[ZK_PROOF_003]: 0x2d5a8c7f1b4e...</div>
                <div className="text-lime-400">✓ All proofs verified</div>
              </div>
            </motion.div>
          )}

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-6 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-500 border-2 border-purple-300" />
              <span className="text-white font-medium">High Trust Match</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-indigo-500 border-2 border-indigo-300" />
              <span className="text-white font-medium">Standard Match</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- ENCRYPTED MATCH PULSE MOBILE MOCKUP (THE GLASS) - MAP-CENTRIC ---
  const EncryptedMatchPulseMobileMockup = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [photonProgress, setPhotonProgress] = useState<Record<string, number>>({});
    
    // Ensure client-side only rendering to prevent hydration errors
    useEffect(() => {
      setIsMounted(true);
    }, []);

    // Network Locations - Encrypted pins (Tokyo-focused with dense background network)
    const networkLocations = [
      { id: 'tokyo', name: 'Tokyo', coords: [139.69, 35.68] as [number, number], trust: 0.98, status: 'Active' },
      { id: 'seoul', name: 'Seoul', coords: [126.98, 37.57] as [number, number], trust: 0.88, status: 'Active' },
      { id: 'hongkong', name: 'Hong Kong', coords: [114.17, 22.28] as [number, number], trust: 0.85, status: 'Traveling' },
      { id: 'singapore', name: 'Singapore', coords: [103.85, 1.29] as [number, number], trust: 0.82, status: 'Active' },
      { id: 'taipei', name: 'Taipei', coords: [121.57, 25.03] as [number, number], trust: 0.87, status: 'Active' },
      { id: 'osaka', name: 'Osaka', coords: [135.50, 34.69] as [number, number], trust: 0.90, status: 'Active' },
      { id: 'bangkok', name: 'Bangkok', coords: [100.50, 13.75] as [number, number], trust: 0.80, status: 'Traveling' }
    ];
    
    // User's origin location (off-screen, west of Tokyo)
    const userOrigin: [number, number] = [100, 35]; // Approximate position west of Tokyo

    // Travel paths with major cities
    interface TravelPath {
      id: string;
      origin: {
        city: string;
        coordinates: [number, number]; // [lng, lat]
      };
      destination: {
        city: string;
        coordinates: [number, number];
        trustScore: number;
        driftRadius: number;
      };
    }
    
    const travelPaths: TravelPath[] = [
      {
        id: '1',
        origin: { city: 'New York', coordinates: [-74.0060, 40.7128] },
        destination: { city: 'London', coordinates: [-0.1276, 51.5074], trustScore: 0.88, driftRadius: 22 }
      },
      {
        id: '2',
        origin: { city: 'New York', coordinates: [-74.0060, 40.7128] },
        destination: { city: 'Tokyo', coordinates: [139.6503, 35.6762], trustScore: 0.92, driftRadius: 18 }
      },
      {
        id: '3',
        origin: { city: 'London', coordinates: [-0.1276, 51.5074] },
        destination: { city: 'Berlin', coordinates: [13.4050, 52.5200], trustScore: 0.85, driftRadius: 20 }
      },
      {
        id: '4',
        origin: { city: 'London', coordinates: [-0.1276, 51.5074] },
        destination: { city: 'Tokyo', coordinates: [139.6503, 35.6762], trustScore: 0.92, driftRadius: 18 }
      },
    ];

    // Animate photons traveling along paths
    useEffect(() => {
      if (!isMounted) return;
      
      const intervals = travelPaths.map((path) => {
        return setInterval(() => {
          setPhotonProgress(prev => ({
            ...prev,
            [path.id]: prev[path.id] === undefined ? 0 : (prev[path.id] + 0.01) % 1
          }));
        }, 50);
      });
      
      return () => intervals.forEach(clearInterval);
    }, [isMounted]);

    // Origin Node Component
    const OriginNode = ({ coordinates }: { coordinates: [number, number] }) => {
      return (
        <Marker coordinates={coordinates}>
          <div className="relative">
            <div
              className="absolute rounded-full border-2 border-white/40"
              style={{
                width: '10px',
                height: '10px',
                left: '-5px',
                top: '-5px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }}
            />
          </div>
        </Marker>
      );
    };

    // Destination Node with Probability Ring (Brownian motion drift)
    const DestinationNode = ({ 
      coordinates, 
      trustScore, 
      driftRadius 
    }: { 
      coordinates: [number, number];
      trustScore: number;
      driftRadius: number;
    }) => {
      const [driftX, setDriftX] = useState(0);
      const [driftY, setDriftY] = useState(0);
      
      // Brownian motion for location masking
      useEffect(() => {
        if (!isMounted) return;
        const interval = setInterval(() => {
          setDriftX((Math.random() - 0.5) * driftRadius * 0.6);
          setDriftY((Math.random() - 0.5) * driftRadius * 0.6);
        }, 2000);
        return () => clearInterval(interval);
      }, [isMounted, driftRadius]);
      
      const nodeColor = '#10b981'; // Emerald
      
      return (
        <Marker coordinates={coordinates}>
          <motion.div
            className="relative"
            animate={{
              x: driftX,
              y: driftY,
            }}
            transition={{
              duration: 2,
              ease: "easeOut"
            }}
          >
            {/* Probability Ring - Soft emerald glow */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: `${driftRadius * 2}px`,
                height: `${driftRadius * 2}px`,
                left: `-${driftRadius}px`,
                top: `-${driftRadius}px`,
                border: `1px solid ${nodeColor}`,
                opacity: 0.4,
                boxShadow: `0 0 ${driftRadius}px ${nodeColor}`,
              }}
              animate={{
                opacity: [0.4, 0.6, 0.4],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Node Core */}
            <div
              className="absolute rounded-full"
              style={{
                width: '12px',
                height: '12px',
                left: '-6px',
                top: '-6px',
                backgroundColor: nodeColor,
                opacity: 0.9,
                boxShadow: `0 0 12px ${nodeColor}`,
              }}
            />
          </motion.div>
        </Marker>
      );
    };

    // Network Location Marker Component - Tokyo Hero with Background Network
    const NetworkLocationMarker = ({ location }: { location: typeof networkLocations[0] }) => {
      const isTokyo = location.id === 'tokyo' || location.name === 'Tokyo';
      const labelY = -50;
      const labelHeight = 44;
      
      return (
        <Marker coordinates={location.coords}>
          <g style={{ zIndex: isTokyo ? 999 : 10 }}>
            {/* ZK-Proof Pulse Animation - Localized on Tokyo */}
            {isTokyo && (
              <>
                <motion.circle
                  cx={0}
                  cy={0}
                  r={40}
                  fill="none"
                  stroke="#00FF9D"
                  strokeWidth={1}
                  opacity={0}
                  animate={{
                    r: [40, 80, 40],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
                <motion.circle
                  cx={0}
                  cy={0}
                  r={40}
                  fill="none"
                  stroke="#00FF9D"
                  strokeWidth={1}
                  opacity={0}
                  animate={{
                    r: [40, 100, 40],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    delay: 1,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              </>
            )}
            
            {/* Outer Halo - ZK-Proof Trust Zone */}
            {isTokyo ? (
              // Tokyo: Larger, more visible halo
              <motion.circle
                cx={0}
                cy={0}
                r={24}
                fill="none"
                stroke="#00FF9D"
                strokeWidth={1}
                opacity={0.3}
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ) : (
              // Background nodes: Visible but muted halo with subtle pulse
              <motion.circle
                cx={0}
                cy={0}
                r={16}
                fill="none"
                stroke="#00FF9D"
                strokeWidth={0.8}
                opacity={0.3}
                animate={{
                  opacity: [0.3, 0.4, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
            
            {/* Inner Core - Hero status for Tokyo, muted for others */}
            {isTokyo ? (
              // Tokyo: Enhanced glow with intense drop-shadow
              <circle
                cx={0}
                cy={0}
                r={3}
                fill="#00FF9D"
                filter="url(#cyberPinGlow)"
                style={{
                  filter: 'drop-shadow(0 0 15px #00FF9D)',
                }}
              />
            ) : (
              // Background nodes: Visible dots with subtle glow
              <motion.circle
                cx={0}
                cy={0}
                r={2.5}
                fill="#00FF9D"
                opacity={0.6}
                style={{
                  filter: 'drop-shadow(0 0 6px #00FF9D)',
                }}
                animate={{
                  opacity: [0.6, 0.7, 0.6],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
            
            {/* Connector Line - Only for Tokyo */}
            {isTokyo && (
              <line
                x1={0}
                y1={0}
                x2={0}
                y2={labelY + labelHeight / 2}
                stroke="#00FF9D"
                strokeWidth={2}
                opacity={0.8}
              />
            )}
            
            {/* Label - ONLY render for Tokyo */}
            {isTokyo && (
              <foreignObject 
                x={-150} 
                y={labelY} 
                width={300}
                height={labelHeight}
              >
                <div 
                  className="flex items-center justify-center bg-black/80 backdrop-blur-md border border-emerald-500/50 rounded-full px-3 py-1.5"
                  style={{
                    display: 'flex',
                    width: 'fit-content',
                    minWidth: 'max-content',
                    whiteSpace: 'nowrap',
                    position: 'relative',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    margin: '0 auto',
                  }}
                >
                  <p 
                    className="font-bold whitespace-nowrap"
                    style={{ 
                      fontFamily: 'JetBrains Mono, monospace',
                      color: '#FFFFFF',
                      fontSize: '18px',
                      letterSpacing: '0.1em',
                      textAlign: 'center',
                    }}
                  >
                    TOKYO • REVEAL READY
                  </p>
                </div>
              </foreignObject>
            )}
          </g>
        </Marker>
      );
    };

    // World map GeoJSON URL
    const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

    // Prevent hydration errors
    if (!isMounted) {
      return (
        <div className="relative mx-auto" style={{ width: '390px', maxWidth: '100%', height: '844px' }}>
          <div className="relative bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-800">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-30" />
            <div 
              className="relative rounded-[2.5rem] overflow-hidden"
              style={{ 
                width: '100%', 
                height: '844px', 
                backgroundColor: '#000000'
              }}
            />
          </div>
        </div>
      );
    }

    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative mx-auto"
        style={{ width: '390px', maxWidth: '100%' }}
      >
        {/* Mobile Device Frame */}
        <div className="relative bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-800 mb-4 md:mb-0">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-30" />
          
          {/* Screen Container - 390x844 with Dead Zone padding */}
          <div 
            className="relative rounded-[2.5rem] overflow-hidden"
            style={{ 
              width: '100%', 
              height: '844px', 
              maxHeight: '100vh',
              backgroundColor: '#000000', // Pure black water
              overflow: 'hidden',
              position: 'relative',
              padding: '0 20px', // Dead Zone: prevents labels from touching edges
            }}
          >
            {/* THE CANVAS - Map occupying 100% viewport */}
            <div className="absolute inset-0 z-0" style={{ position: 'absolute', width: '100%', height: '100%' }}>
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 400,
                  center: [139.69, 35.68], // Tokyo-focused viewport
                }}
                style={{ width: '100%', height: '100%', position: 'absolute' }}
              >
                {/* World Map - Deep charcoal land, muted teal borders */}
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#111111" // Deep charcoal
                        stroke="#2dd4bf" // Muted teal
                        strokeWidth={0.5}
                        style={{
                          default: { outline: 'none' },
                          hover: { outline: 'none' },
                          pressed: { outline: 'none' },
                        }}
                      />
                    ))
                  }
                </Geographies>
                
                {/* SVG Defs for gradients and filters */}
                <defs>
                  {/* Connection Arc Gradient - Cyan to Emerald */}
                  <linearGradient id="connectionArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#00FF9D" stopOpacity={0.4} />
                  </linearGradient>
                  <linearGradient id="travelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.7} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  {/* Cyber-Pin Drop Shadow Filter */}
                  <filter id="cyberPinGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
                    <feOffset in="blur" dx="0" dy="0" result="offsetBlur"/>
                    <feFlood floodColor="#00FF9D" floodOpacity="1" result="glowColor"/>
                    <feComposite in="glowColor" in2="offsetBlur" operator="in" result="glow"/>
                    <feMerge>
                      <feMergeNode in="glow"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Connection Arc - From user origin (off-screen) to Tokyo */}
                {(() => {
                  const tokyoNode = networkLocations.find(loc => loc.id === 'tokyo');
                  if (!tokyoNode) return null;
                  
                  const [originLng, originLat] = userOrigin;
                  const [tokyoLng, tokyoLat] = tokyoNode.coords;
                  
                  // Calculate curved path midpoint (curve upward)
                  const midLng = (originLng + tokyoLng) / 2;
                  const midLat = Math.max(originLat, tokyoLat) + 8;
                  
                  const pathData = `M ${originLng} ${originLat} Q ${midLng} ${midLat} ${tokyoLng} ${tokyoLat}`;
                  
                  return (
                    <motion.path
                      key="connection-origin-tokyo"
                      d={pathData}
                      fill="none"
                      stroke="url(#connectionArcGradient)"
                      strokeWidth={2}
                      opacity={0.5}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                  );
                })()}
                
                {/* Connection Arcs - All background nodes connect to Tokyo (Social Graph) */}
                {networkLocations
                  .filter(loc => loc.id !== 'tokyo' && loc.name !== 'Tokyo')
                  .map((location) => {
                    const tokyoNode = networkLocations.find(loc => loc.id === 'tokyo');
                    if (!tokyoNode) return null;
                    
                    const [lng1, lat1] = location.coords;
                    const [lng2, lat2] = tokyoNode.coords;
                    
                    // Calculate curved path midpoint (arc toward Tokyo)
                    const midLng = (lng1 + lng2) / 2;
                    const midLat = Math.max(lat1, lat2) + 5;
                    
                    const pathData = `M ${lng1} ${lat1} Q ${midLng} ${midLat} ${lng2} ${lat2}`;
                    
                    return (
                      <motion.path
                        key={`connection-${location.id}-tokyo`}
                        d={pathData}
                        fill="none"
                        stroke="url(#connectionArcGradient)"
                        strokeWidth={1}
                        opacity={0.2}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2.5, delay: 0.8, ease: "easeInOut" }}
                      />
                    );
                  })}
                
                
                {/* Network Location Markers - Background Network First, Tokyo Last (Hero) */}
                {networkLocations
                  .filter(loc => loc.id !== 'tokyo' && loc.name !== 'Tokyo')
                  .map((location) => (
                    <NetworkLocationMarker key={location.id} location={location} />
                  ))}
                {/* Tokyo Marker - Rendered last for highest z-index priority */}
                {networkLocations
                  .filter(loc => loc.id === 'tokyo' || loc.name === 'Tokyo')
                  .map((location) => (
                    <NetworkLocationMarker key={location.id} location={location} />
                  ))}
              </ComposableMap>
            </div>

            {/* Scanline Overlay - High-tech monitor effect */}
            <div 
              className="absolute inset-0 pointer-events-none z-[1] opacity-[0.05]"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.1) 2px, rgba(255, 255, 255, 0.1) 4px)',
              }}
            />

            {/* THE GLASS CHROME - Foreground Layer */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {/* Floating Header - Thin pill at top */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
              >
                <div className="bg-white/5 backdrop-blur-[12px] rounded-full border border-white/10 px-4 py-2 shadow-2xl">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-wider">
                      ZK-PROOF ACTIVE
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Match Notification Card - Lower-third */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute bottom-20 left-6 right-6 z-20 pointer-events-none"
              >
                <div className="bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 p-5 shadow-2xl">
                  <h3 className="text-base font-bold text-emerald-300 mb-2">
                    Mutual Connection Detected in Tokyo
                  </h3>
                  <p className="text-[10px] text-white/50 leading-relaxed mb-4 font-mono">
                    Fostering safe serendipity without identity leaks.
                  </p>
                  <div 
                    className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(to right, #06b6d4, #8b5cf6)',
                      boxShadow: '0 0 20px rgba(6, 182, 212, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    <span className="relative z-10">Reveal Identity</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* User Story Text - Directly below the map */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 md:mt-6 text-center w-full"
        >
          <div className="bg-white/10 backdrop-blur-[12px] rounded-xl border border-white/20 px-5 py-4 shadow-xl inline-block max-w-lg">
            <p className="text-[10px] text-slate-700/90 leading-relaxed font-mono font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Narrative: As a traveler, I want to see my network's intersections in Tokyo via ZK-Proofs to foster safe serendipity without leaking identity.
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const PrivacyVaultVisual = () => (
    <motion.div 
      initial={{ y: 20, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      className="w-80 bg-[#0a0c10] rounded-[40px] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] p-8 relative overflow-hidden"
    >
      {/* Background Grid / Circuit Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-[size:16px_16px]" />
      
      {/* Header: Security Protocol */}
      <div className="relative z-10 flex justify-between items-center mb-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
          <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-indigo-400 uppercase">ZK_Protocol_v4</span>
        </div>
        <div className="h-4 w-4 rounded border border-indigo-500/30 flex items-center justify-center">
          <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse" />
        </div>
      </div>
  
      {/* Cryptographic Handshake Visual */}
      <div className="relative z-10 flex flex-col items-center justify-center py-6 mb-8">
        <div className="relative">
          {/* Outer Rotating Ring */}
          <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="w-24 h-24 border-2 border-dashed border-indigo-500/20 rounded-full" 
          />
          {/* Inner Static Shield */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl border border-indigo-500/50 flex items-center justify-center backdrop-blur-sm">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <div className="text-[10px] font-mono text-indigo-300 tracking-tighter mb-1 uppercase">Attestation Hash</div>
          <div className="text-[12px] font-mono text-white truncate w-48">0x8f2...e49c1a7</div>
        </div>
      </div>
  
      {/* Verification Steps */}
      <div className="relative z-10 space-y-3 mb-4">
        {[
          { label: 'Proximity Proof', status: 'Verified' },
          { label: 'Identity Obfuscation', status: 'Active' }
        ].map((step, i) => (
          <div key={i} className="flex justify-between items-center p-3 bg-white/[0.03] rounded-xl border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{step.label}</span>
            <span className="text-[9px] font-mono text-emerald-400 font-bold tracking-widest">{step.status}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );

  // Narrative-Driven Travel Experience - High-Fidelity Mobile Mockup
  const StoryCardVisual = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [toneMode, setToneMode] = useState<'Serene' | 'Energetic' | 'Curious'>('Serene');
    
    useEffect(() => {
      setIsMounted(true);
    }, []);

    // Story Cards Data
    const storyCards = [
      {
        id: 1,
        title: "Hidden Wine Window",
        image: "🍷",
        narrative: "The sun is beginning to set over the Arno. If you duck into this alleyway now, you'll catch the golden hour at a hidden wine window before the dinner rush begins.",
        location: "Florence, Italy",
        timeContext: "Evening"
      },
      {
        id: 2,
        title: "Morning Market Serenity",
        image: "🌅",
        narrative: "The morning market is at its quietest right now—just the vendors setting up. Perfect for a slow walk and fresh pastries without the crowds.",
        location: "Barcelona, Spain",
        timeContext: "Morning"
      },
      {
        id: 3,
        title: "Secret Garden Courtyard",
        image: "🌿",
        narrative: "Behind this unassuming door lies a courtyard that only locals know. The wisteria is in bloom, and there's a bench that catches the afternoon light perfectly.",
        location: "Kyoto, Japan",
        timeContext: "Afternoon"
      }
    ];

    const currentStory = storyCards[currentStoryIndex];

    // Adaptive Voice Wave Component
    const VoiceWave = () => {
      return (
        <div className="flex items-center justify-center gap-1.5 py-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full"
              style={{ 
                height: '20px',
                backgroundColor: 'rgba(134, 239, 172, 0.6)', // sage-300 equivalent
              }}
              animate={{
                height: ['8px', '24px', '8px'],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      );
    };

    // Widget/Smartwatch View Component
    const WidgetView = ({ mode }: { mode: 'widget' | 'watch' }) => {
      const isWatch = mode === 'watch';
      const toneColor = toneMode === 'Serene' ? 'rgba(134, 239, 172, 1)' : toneMode === 'Energetic' ? 'rgba(251, 191, 36, 1)' : 'rgba(148, 163, 184, 1)';
      
      if (isWatch) {
        // Watch Card: Circular/Square with centered content
        return (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-[220px] aspect-square rounded-[60px] shadow-lg overflow-hidden relative z-10 backdrop-blur-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(187, 247, 208, 0.5)',
              transformOrigin: 'top center',
            }}
          >
            {/* Text Container with Safe Area Padding */}
            <div className="w-full h-full flex flex-col items-center justify-center text-center px-6 py-10">
              {/* Micro-Header */}
              <div className="mb-2 flex-shrink-0">
                <span className="text-[8px] font-sans font-bold text-slate-500 uppercase tracking-[0.15em]">
                  MOMENT
                </span>
              </div>

              {/* Tone Mode Indicator */}
              <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: toneColor }} />
                <span className="text-[8px] font-sans font-medium text-slate-600 uppercase tracking-wider">
                  {toneMode}
                </span>
              </div>

              {/* Narrative Story Text - Cradled in Safe Area */}
              <div className="flex-1 flex items-center justify-center max-w-full flex-shrink-0">
                <p 
                  className="text-sm font-medium font-serif text-slate-800 leading-tight max-w-full"
                  style={{ 
                    fontFamily: 'Playfair Display, Georgia, serif',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {currentStory.narrative}
                </p>
              </div>

              {/* Location Footer */}
              <div className="text-[9px] font-sans text-slate-500 mt-auto pt-2 flex-shrink-0">
                {currentStory.location}
              </div>
            </div>
          </motion.div>
        );
      }

      // Widget Card: Rectangular with editorial padding
      return (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-[350px] aspect-[1.5/1] rounded-2xl shadow-lg overflow-hidden relative z-10 backdrop-blur-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(187, 247, 208, 0.5)',
            transformOrigin: 'top center',
          }}
        >
          {/* Internal Layout with justify-between */}
          <div className="w-full h-full flex flex-col justify-between">
            {/* Text Content Container with Editorial Padding */}
            <div className="p-8 flex flex-col flex-shrink-0 max-w-full">
              {/* Micro-Header */}
              <div className="mb-2">
                <span className="text-[9px] font-sans font-bold text-slate-500 uppercase tracking-[0.15em]">
                  SUGGESTION
                </span>
              </div>

              {/* Tone Mode Indicator */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: toneColor }} />
                <span className="text-[9px] font-sans font-medium text-slate-600 uppercase tracking-wider">
                  {toneMode}
                </span>
              </div>

              {/* Narrative Story Text - Cradled with Editorial Padding */}
              <div className="flex-shrink-0 max-w-full">
                <p 
                  className="text-lg font-serif text-slate-800 leading-snug max-w-full"
                  style={{ 
                    fontFamily: 'Playfair Display, Georgia, serif',
                    display: '-webkit-box',
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {currentStory.narrative}
                </p>
              </div>
            </div>

            {/* Location Footer */}
            <div className="px-8 pb-8 text-[10px] font-sans text-slate-500 flex-shrink-0">
              {currentStory.location}
            </div>
          </div>
        </motion.div>
      );
    };

    // Mobile View Component
    const MobileView = () => {
      return (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative mx-auto max-h-full"
          style={{ 
            width: '390px', 
            maxWidth: '100%',
            transformOrigin: 'top center',
          }}
        >
          {/* Mobile Device Frame */}
          <div 
            className="relative bg-slate-200 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-300"
            style={{ 
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-200 rounded-b-2xl z-30" />
            
            {/* Screen Container */}
            <div 
              className="relative rounded-[2.5rem] overflow-hidden"
              style={{ 
                width: '100%', 
                height: '844px',
                maxHeight: '100%',
                background: 'linear-gradient(to bottom, #fefdf8, rgba(240, 253, 244, 0.3), #fefdf8)',
              }}
            >
            {/* Main Content Area */}
            <div className="h-full flex flex-col px-6 pt-16 pb-8">
              {/* Concierge Card - Main Focus */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex-1 flex flex-col justify-center mb-8"
              >
                <div 
                  className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 relative overflow-hidden"
                  style={{
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(187, 247, 208, 0.5)',
                  }}
                >
                  {/* Tone Mode Indicator */}
                  <div className="flex items-center gap-2 mb-6">
                    <div 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: toneMode === 'Serene' ? 'rgba(134, 239, 172, 1)' : 
                                        toneMode === 'Energetic' ? 'rgba(251, 191, 36, 1)' : 
                                        'rgba(148, 163, 184, 1)',
                      }}
                    />
                    <span className="text-xs font-sans font-semibold text-slate-600 uppercase tracking-wider">
                      {toneMode} Mode
                    </span>
                  </div>

                  {/* Narrative Story */}
                  <p 
                    className="text-xl font-serif text-slate-900 leading-relaxed mb-6"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                  >
                    {currentStory.narrative}
                  </p>

                  {/* Location & Time Context */}
                  <div 
                    className="flex items-center justify-between pt-4"
                    style={{ borderTop: '1px solid rgba(240, 253, 244, 1)' }}
                  >
                    <span className="text-sm font-sans font-medium text-slate-600">
                      {currentStory.location}
                    </span>
                    <span className="text-xs font-sans text-slate-400">
                      {currentStory.timeContext}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Swipeable Story Deck */}
              <div className="relative">
                <div className="flex items-center gap-3 overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide touch-pan-x overscroll-x-contain" style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
                  {storyCards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: index === currentStoryIndex ? 1 : 0.95, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setCurrentStoryIndex(index)}
                      className={`flex-shrink-0 w-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all touch-pan-x select-none ${
                        index === currentStoryIndex ? 'ring-2' : 'ring-1 ring-slate-200'
                      }`}
                      style={{
                        scrollSnapAlign: 'start' as any,
                        ...(index === currentStoryIndex ? { 
                          boxShadow: '0 0 0 2px rgba(134, 239, 172, 1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        } : {})
                      }}
                    >
                      {/* Story Card Image */}
                      <div 
                        className="h-40 flex items-center justify-center relative"
                        style={{
                          background: 'linear-gradient(to bottom right, rgba(240, 253, 244, 1), rgba(254, 253, 248, 1))',
                        }}
                      >
                        <div className="text-6xl">{card.image}</div>
                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-lg font-serif font-bold text-white mb-1" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                            {card.title}
                          </h4>
                          <p className="text-xs font-sans text-white/90">{card.location}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Adaptive Voice Interface */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 bg-white/50 backdrop-blur-md rounded-2xl p-4"
                style={{
                  border: '1px solid rgba(187, 247, 208, 0.5)',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-sans font-medium text-slate-600">Voice Assistant</span>
                  <Mic className="w-4 h-4" style={{ color: 'rgba(134, 239, 172, 1)' }} />
                </div>
                <VoiceWave />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
    };

    if (!isMounted) {
      return (
        <div className="w-full h-[800px] flex items-center justify-center">
          <div className="relative mx-auto" style={{ width: '390px', maxWidth: '100%', height: '844px' }}>
            <div className="relative bg-slate-200 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-300">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-200 rounded-b-2xl z-30" />
              <div className="relative rounded-[2.5rem] overflow-hidden" style={{ width: '100%', height: '844px', backgroundColor: '#fefdf8' }} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full relative">
        {/* Mobile View Container */}
        <motion.div 
          className="w-full relative"
          style={{ 
            minHeight: '850px',
            height: 'auto',
            minWidth: '390px',
          }}
        >
          {/* Background Blob */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(134, 239, 172, 0.3), rgba(240, 253, 244, 0.1))',
              }}
            />
          </motion.div>

          {/* Content Container - Flex Column with Top Alignment */}
          <div className="w-full min-h-[850px] flex flex-col items-center justify-start pt-8 relative z-10">
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full flex items-start justify-center pb-8"
              style={{ transformOrigin: 'top center' }}
            >
              <div className="w-full max-w-full flex items-center justify-center" style={{ maxHeight: '100%' }}>
                <div style={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}>
                  <MobileView />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  };

// --- MAIN VIEW COMPONENT ---

export default function ProductSurfaceView({ projectId }: { projectId: string }) {
  const router = useRouter();
  const data = projectRegistry[projectId as keyof typeof projectRegistry];

  // System Surface View Toggle (for AI Systems)
  const isAISystem = (data as any)?.isAISystem === true;
  const [viewMode, setViewMode] = useState<'standard' | 'intelligence'>('standard');
  
  // System Debug Toggle (for Human Comfort Layer)
  const [showDebugOverlay, setShowDebugOverlay] = useState(false);

  // Mobile Demo state (only for social-graph-driven-travel-network)
  const [mobileDemoStage, setMobileDemoStage] = useState<'encrypted' | 'scanning' | 'connected'>('encrypted');
  const [mobileDemoLogs, setMobileDemoLogs] = useState<string[]>([]);
  const [showConnectionCard, setShowConnectionCard] = useState(false);
  const [activeTravelersCount, setActiveTravelersCount] = useState(13056);
  const [reciprocalMatchesCount, setReciprocalMatchesCount] = useState(11);

  // Animate counters for mobile demo
  useEffect(() => {
    if (projectId === 'social-graph-driven-travel-network') {
      const targetActive = 13056;
      const interval = setInterval(() => {
        setActiveTravelersCount(prev => {
          if (prev >= targetActive) {
            clearInterval(interval);
            return targetActive;
          }
          return prev + Math.floor(Math.random() * 5) + 1;
        });
      }, 100);

      const targetReciprocal = 11;
      const reciprocalInterval = setInterval(() => {
        setReciprocalMatchesCount(prev => {
          if (prev >= targetReciprocal) {
            clearInterval(reciprocalInterval);
            return targetReciprocal;
          }
          return prev + 1;
        });
      }, 300);

      return () => {
        clearInterval(interval);
        clearInterval(reciprocalInterval);
      };
    }
  }, [projectId]);

  if (!data) return null;

  // Render Intelligence Layer view if AI System and in intelligence mode
  if (isAISystem && viewMode === 'intelligence') {
    // Route to appropriate intelligence view based on projectId
    const renderIntelligenceView = () => {
      // Context-Aware Travel Decision System - uses LogicReceipt
      if (projectId === 'context-aware-travel-decision-system' && (data as any)?.systemSpecs) {
        return <LogicReceipt projectData={data as any} />;
      }
      
      // Social Opportunity Matching Module - show ZK-proof status, relational graph nodes, proximity heuristics
      if (projectId === 'social-opportunity-matching-module') {
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-purple-50/20">
            <div className="relative pt-24 pb-16 px-6">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/40 mb-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                    <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                      System Surface Active
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">{data.title}</h1>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">{data.subtitle}</p>
                </motion.div>

                {/* Human Problem */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-12"
                >
                  <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-8 md:p-10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">The Human Problem</h3>
                        <p className="text-lg text-slate-800 leading-relaxed italic">"{data.problem}"</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* ZK-Proof Status & Relational Graph */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                >
                  <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-purple-600" /> ZK-Proof Status
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Status</div>
                        <div className="text-2xl font-bold text-emerald-600">{(data as any)?.systemSpecs?.zkProofStatus || 'Active'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Anonymity Shield</div>
                        <div className="text-lg font-semibold text-purple-600">{(data as any)?.systemSpecs?.proximityHeuristics?.anonymityShield || 'Active'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-600" /> Relational Graph Nodes
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Shared Nodes</div>
                        <div className="text-2xl font-bold text-purple-600">{(data as any)?.systemSpecs?.relationalGraphNodes || 7}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Trust Degree</div>
                        <div className="text-lg font-semibold text-violet-600">{(data as any)?.systemSpecs?.proximityHeuristics?.trustDegree || '2nd'}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Proximity Heuristics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-8"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Proximity Heuristics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Distance</div>
                      <div className="text-2xl font-bold text-violet-600">{(data as any)?.systemSpecs?.proximityHeuristics?.distance || '240m'}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Confidence</div>
                      <div className="text-2xl font-bold text-emerald-600">{Math.round(((data as any)?.systemSpecs?.confidence || 0.88) * 100)}%</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Governor Status</div>
                      <div className="text-lg font-semibold text-purple-600">{(data as any)?.systemSpecs?.governorStatus || 'Optimal'}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        );
      }

      // Social Graph-Driven Travel Network - show ZK protocol, trust signals, encrypted proximity
      if (projectId === 'social-graph-driven-travel-network') {
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/20">
            <div className="relative pt-24 pb-16 px-6">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/40 mb-4">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                    <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">System Surface Active</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">{data.title}</h1>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">{data.subtitle}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-12"
                >
                  <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-8 md:p-10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">The Human Problem</h3>
                        <p className="text-lg text-slate-800 leading-relaxed italic">"{data.problem}"</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                >
                  <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-indigo-600" /> ZK Protocol
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Protocol Version</div>
                        <div className="text-2xl font-bold text-indigo-600">{(data as any)?.systemSpecs?.zkProtocol || 'v4'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Encrypted Proximity</div>
                        <div className="text-lg font-semibold text-emerald-600">{(data as any)?.systemSpecs?.encryptedProximity ? 'Active' : 'Inactive'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Users className="w-5 h-5 text-indigo-600" /> Trust Signals
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Active Travelers</div>
                        <div className="text-2xl font-bold text-indigo-600">{(data as any)?.metrics?.trustSignals || '13,056 active'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Verification Rate</div>
                        <div className="text-lg font-semibold text-emerald-600">{(data as any)?.metrics?.verificationRate || '98.5%'}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-8"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Trust Degree Distribution</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">1st Degree</div>
                      <div className="text-2xl font-bold text-indigo-600">{(data as any)?.systemSpecs?.trustDegree?.firstDegree || 45}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">2nd Degree</div>
                      <div className="text-2xl font-bold text-violet-600">{(data as any)?.systemSpecs?.trustDegree?.secondDegree || 312}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Verified</div>
                      <div className="text-lg font-semibold text-emerald-600">{(data as any)?.systemSpecs?.trustDegree?.verified ? 'Yes' : 'No'}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        );
      }

      // Narrative-Driven Travel Experience Generator - show LLM model, narrative weight, semantic synthesis
      if (projectId === 'narrative-driven-travel-experience-generator') {
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/20">
            <div className="relative pt-24 pb-16 px-6">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/40 mb-4">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                    <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">System Surface Active</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">{data.title}</h1>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">{data.subtitle}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-12"
                >
                  <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-8 md:p-10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">The Human Problem</h3>
                        <p className="text-lg text-slate-800 leading-relaxed italic">"{data.problem}"</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                >
                  <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-amber-600" /> LLM Model
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Model</div>
                        <div className="text-2xl font-bold text-amber-600">{(data as any)?.systemSpecs?.llmModel || 'GPT-4 Fine-tuned'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Narrative Accuracy</div>
                        <div className="text-lg font-semibold text-emerald-600">{(data as any)?.metrics?.narrativeAccuracy || '94%'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-amber-600" /> Narrative Weight
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Score</div>
                        <div className="text-2xl font-bold text-amber-600">{Math.round(((data as any)?.systemSpecs?.narrativeWeight || 0.92) * 100)}%</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Semantic Latency</div>
                        <div className="text-lg font-semibold text-blue-600">{(data as any)?.metrics?.semanticLatency || '<300ms'}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-8"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Semantic Synthesis</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Voice Tones</div>
                      <div className="flex gap-2">
                        {((data as any)?.systemSpecs?.semanticSynthesis?.voiceTones || ['concierge', 'friend', 'minimalist']).map((tone: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-sm font-semibold capitalize">{tone}</span>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Spontaneity Score</div>
                        <div className="text-xl font-bold text-amber-600">{Math.round(((data as any)?.systemSpecs?.semanticSynthesis?.spontaneityScore || 0.55) * 100)}%</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Story Quality</div>
                        <div className="text-xl font-bold text-emerald-600">{(data as any)?.metrics?.storyQuality || 'High'}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        );
      }

      // Fallback: try LogicReceipt if systemSpecs exists
      if ((data as any)?.systemSpecs) {
        return <LogicReceipt projectData={data as any} />;
      }

      return null;
    };

    return (
      <div className="bg-white min-h-screen">
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
          <button 
            onClick={() => router.back()} 
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-all"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Stack
          </button>
          <button
            onClick={() => setViewMode('standard')}
            className="group flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-white/40 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-700 hover:bg-white/80 transition-all"
          >
            <Eye size={12} /> Standard View
          </button>
        </nav>
        {renderIntelligenceView()}
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-slate-900 selection:bg-indigo-100">
      {/* 1. Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <button 
          onClick={() => router.back()} 
          className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-all"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Stack
        </button>
        <div className="flex items-center gap-2 md:gap-4">
          {isAISystem && (
            <button
              onClick={() => setViewMode('intelligence')}
              className="group flex items-center gap-1 md:gap-2.5 px-2.5 py-1.5 md:px-5 md:py-2.5 bg-gradient-to-r from-blue-500 to-emerald-500 border-2 border-blue-400/30 rounded-full text-[9px] md:text-xs font-bold uppercase tracking-tight md:tracking-wider text-white hover:from-blue-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 whitespace-nowrap"
            >
              <Brain size={11} className="md:w-[14px] md:h-[14px] drop-shadow-sm shrink-0" /> View Intelligence Layer
            </button>
          )}
         
        </div>
      </nav>

     {/* 2. Hero */}
     <header className="max-w-7xl mx-auto px-6 py-28 flex flex-col lg:flex-row gap-16 items-center min-h-[80vh]">
        {/* Left Column - Sticky Text Content */}
        <div 
          className="sticky top-24"
          style={{ 
            minHeight: '850px',
          }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-[1px] w-8 bg-slate-200" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">The Glass (Tier 3)</span>
                <div className="font-mono text-[9px] text-slate-300 uppercase tracking-tighter">
                Surface_ID // <span className="text-slate-900 font-bold">{projectId}</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-950 mb-6 leading-[1.05]">
              {data.title}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-lg mb-6">
              {data.subtitle}
            </p>
            <p className="text-base text-slate-600 leading-relaxed max-w-lg mb-8 font-medium">
              This page explores the high-fidelity UX/UI design phase of the system, polished interface work that translates complex system intelligence into intuitive, human-centered experiences.
            </p>
            <div className="inline-flex items-center w-auto max-w-full gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap border border-indigo-100/50">
              <Smartphone size={12} /> Human-Centric Output
            </div>
          </motion.div>
        </div>

        {/* Dynamic Mockup Container - Right Side */}
        <div 
          className={`aspect-[4/5] md:aspect-square rounded-[32px] md:rounded-[48px] flex flex-col items-center justify-center relative overflow-visible group mx-auto lg:mx-0 w-full max-w-lg lg:max-w-full box-border ${
            projectId === 'social-graph-driven-travel-network' || projectId === 'narrative-driven-travel-experience-generator' ? '' : 'bg-slate-100 shadow-2xl border border-slate-200'
          }`}
        >
          {/* Background pattern */}
          {projectId !== 'narrative-driven-travel-experience-generator' && (
            <div className="absolute inset-0 opacity-[0.05] rounded-[48px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          )}
          
          {/* Heatmap Overlay for Context-Aware Detours */}
          {projectId === 'context-aware-travel-decision-system' && (data as any)?.systemSpecs?.environment && (
            <HeatmapOverlay environment={(data as any).systemSpecs.environment} />
          )}
          
          <div className="z-10 relative">
              {/* Project Switcher */}
              {projectId === 'context-aware-travel-decision-system' && <DetourVisual />}
              {projectId === 'social-opportunity-matching-module' && <ProximityRevealLens />}
              {projectId === 'social-graph-driven-travel-network' && <EncryptedMatchPulseMobileMockup />}
              {projectId === 'narrative-driven-travel-experience-generator' && <StoryCardVisual />}
              
              {/* ✅ FIXED FALLBACK: Only shows if the ID is NOT one of our custom visuals */}
              {!['context-aware-travel-decision-system', 
                 'social-opportunity-matching-module', 
                 'social-graph-driven-travel-network',
                 'narrative-driven-travel-experience-generator'
                ].includes(projectId) && (
                <div className="text-center p-12">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-6 mx-auto">
                      <Sparkles className="text-indigo-500" size={24} />
                    </div>
                    <p className="text-slate-400 font-mono text-[10px] uppercase tracking-widest mb-2">Interface Prototype</p>
                    <h4 className="text-slate-900 font-bold text-xl tracking-tight">Rendered Surface: {data.title}</h4>
                </div>
              )}
          </div>
        </div>
      </header>

      {/* High-Fidelity Surface: Social Logic Receipt - Only for social-opportunity-matching-module */}
      {projectId === 'social-opportunity-matching-module' && (data as any)?.highFidelitySurface?.type === 'SocialLogicReceipt' && (
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-violet-500/20">
          {/* Narrative Bridge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-12 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Bridging the Gap: From Proximity to Connection
            </h3>
            <p className="text-slate-600 leading-relaxed">
              While the hero visual represents the ideal state of connection, the Social Logic Receipt below demonstrates the governing intelligence. The system must balance the user's dopamine levels and privacy requirements before a physical encounter is ever suggested.
            </p>
          </motion.div>

          {/* System Surface Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
          <div className="flex justify-center w-full">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-violet-50 border border-violet-200 rounded-full">
              <div className="w-2 h-2 rounded-full bg-violet-500" />
              <span className="text-[10px] font-mono font-bold text-violet-700 uppercase tracking-widest">
                SYSTEM SURFACE: RELATIONAL HEURISTICS
              </span>
            </div>
          </div>
          </motion.div>

          {/* Social Logic Receipt Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <SocialLogicReceipt 
              config={(data as any).highFidelitySurface.config}
              socialLogic={(data as any).socialLogic}
            />
          </motion.div>
        </section>
      )}

      {/* Moments of Calm Layer: Context-Aware Detours - Only for context-aware-travel-decision-system */}
      {projectId === 'context-aware-travel-decision-system' && (data as any)?.calmLogic && (
        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-amber-200/30">
          {/* Narrative Bridge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-8 text-center"
          >
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
              Moments of Calm: Transforming Transit into Serenity
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              In an era of hyper-optimization, the Spontaneity Engine treats 'Extra Time' as a luxury asset. By calculating 'Moments of Calm,' the system protects the traveler from the anxiety of the unknown, turning a standard detour into a curated experience of urban serenity.
            </p>
          </motion.div>

          {/* Moment of Calm Surface Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <MomentOfCalmSurface 
              calmLogic={(data as any).calmLogic}
              systemSpecs={(data as any).systemSpecs}
            />
          </motion.div>
        </section>
      )}

      {/* Human Comfort Layer: Social Affinity Surface - Only for social-opportunity-matching-module */}
      {projectId === 'social-opportunity-matching-module' && (data as any)?.humanContext && (
        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-amber-200/30">
          {/* Human Comfort Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-50/80 border border-amber-200/50 rounded-full">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-widest">
                HUMAN COMFORT LAYER
              </span>
            </div>
          </motion.div>

          {/* Social Affinity Surface Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <SocialAffinitySurface humanContext={(data as any).humanContext} />
          </motion.div>

          {/* Social Handshake Surface - Sheet/Drawer Pattern */}
          <div className="flex justify-center w-full">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-violet-50 border border-violet-200 rounded-full">
              <div className="w-2 h-2 rounded-full bg-violet-500" />
              <span className="text-[10px] font-mono font-bold text-violet-700 uppercase tracking-widest">
                Intersections in Real-Time
              </span>
            </div>
          </div>
          {(data as any)?.handshakeData && (
            <div className="relative">
              <SocialHandshakeSurface
                revealStatus={(data as any).handshakeData.revealStatus}
                sharedInterests={(data as any).handshakeData.sharedInterests}
                energyLevel={(data as any).handshakeData.energyLevel}
                locationContext={(data as any).handshakeData.locationContext}
                connectionName={(data as any).humanContext?.connectionName || "Alex"}
              />
            </div>
          )}

          {/* System Debug Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 pt-8 border-t border-slate-200/50"
          >
            <button
              onClick={() => setShowDebugOverlay(!showDebugOverlay)}
              className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-[10px] font-semibold text-slate-700 uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Code className="w-4 h-4" />
              {showDebugOverlay ? 'Hide System Debug' : 'Show System Debug'}
            </button>
          </motion.div>

          {/* System Debug Overlay */}
          {(data as any)?.highFidelitySurface && (
            <SystemDebugOverlay
              isVisible={showDebugOverlay}
              onClose={() => setShowDebugOverlay(false)}
              config={(data as any).highFidelitySurface.config}
              socialLogic={(data as any).socialLogic}
            />
          )}
        </section>
      )}

      {/* Screenshot Images - Only for social-graph-driven-travel-network */}
      {projectId === 'social-graph-driven-travel-network' && (
        <>
          <section className="max-w-7xl mx-auto px-6 pt-48 md:pt-12 pb-12 bg-white">
            {/* Design Concept Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <p className="text-sm text-slate-500 italic">
                Early design concepts created in Figma
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full flex items-center justify-center"
            >
              <div className="relative flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center w-full md:w-auto mx-auto">
                <div className="relative flex-shrink-0 flex items-center justify-center">
                  <div className="overflow-visible">
                    <Image
                      src={normalizeImagePath("/portfolio/images/HomeScreen_Website_x2.png")}
                      alt="Social Travel Network Concept Graphic"
                      width={280}
                      height={560}
                      className="w-[240px] sm:w-[280px] md:w-[240px] lg:w-[260px] xl:w-[280px] h-auto object-contain"
                      priority
                      quality={90}
                      sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, (max-width: 1024px) 260px, 280px"
                    />
                  </div>
                </div>
                <div className="relative flex-shrink-0 md:mt-8 lg:mt-12 flex items-center justify-center">
                  <div className="relative">
                    <Image
                      src={normalizeImagePath("/portfolio/images/NetworkTravelers_1.png")}
                      alt="Social Travel Network Concept Graphic 2"
                      width={280}
                      height={560}
                      className="w-[240px] sm:w-[280px] md:w-[240px] lg:w-[260px] xl:w-[280px] h-auto object-contain"
                      priority
                      quality={90}
                      sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, (max-width: 1024px) 260px, 280px"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Figma Travel App Design Screenshot - Full Width Background */}
          <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={normalizeImagePath("/portfolio/images/figmatravelAppScreenshot.png")}
                alt="Figma Travel App Design Screenshot"
                fill
                className="object-cover"
                sizes="100vw"
                priority={true}
                quality={90}
              />
            </div>
            {/* Transparent overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </section>

          {/* Video Container */}
          <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="relative max-w-4xl mx-auto">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  title="vimeo-player"
                  src="https://player.vimeo.com/video/1096448281?h=6e0a3fcbf5&autoplay=1&muted=1&background=1"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
                
                {/* Video overlay for better UX */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </section>
        </>
      )}

      {/* Privacy Dashboard & Encrypted Match Pulse - Only for social-graph-driven-travel-network */}
      {projectId === 'social-graph-driven-travel-network' && (
        <>
          {/* Privacy Dashboard Section */}
          <section className="max-w-7xl mx-auto px-6 py-16 bg-gradient-to-b from-white to-slate-50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Trust-Based Discovery
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Control what data is masked versus shared. Privacy-first design ensures you maintain control while enabling meaningful connections.
              </p>
            </motion.div>
            <PrivacyDashboard />
          </section>

          

        </>
      )}

      {/* 3. The Logic Receipt */}
<section className="px-4 md:px-6 py-12"> 
  <div className="max-w-7xl mx-auto bg-slate-950 rounded-[48px] md:rounded-[64px] py-16 px-6 md:py-24 md:px-12 text-white relative overflow-hidden">
    {/* Decorative background glow to anchor the center */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#312e81_0%,transparent_50%)] opacity-20 pointer-events-none" />

    <div className="max-w-6xl mx-auto relative z-10">
      <div className="mb-16 md:mb-20 text-center md:text-left">
         <h2 className="text-3xl md:text-4xl font-bold mb-6 italic" style={{ fontFamily: "serif" }}>The Logic Receipt</h2>
         <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed">
           This UI surface is a direct translation of system-level inference. We solve for human friction by bridging back-end logic with semantic storytelling.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <div className="p-8 md:p-10 rounded-[32px] md:rounded-[40px] bg-white/[0.03] border border-white/10 flex flex-col items-center md:items-start text-center md:text-left">
           <Cpu className="text-indigo-400 mb-6 md:mb-8" size={32} />
           <h3 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-4">Phase 01: The Brain</h3>
           <p className="text-lg md:text-xl text-slate-200 leading-relaxed italic font-medium">"{data.brainLogic}"</p>
        </div>
        
        <div className="p-8 md:p-10 rounded-[32px] md:rounded-[40px] bg-white/[0.03] border border-white/10 flex flex-col items-center md:items-start text-center md:text-left">
           <Layers className="text-emerald-400 mb-6 md:mb-8" size={32} />
           <h3 className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-4">Phase 02: The Middleware</h3>
           <p className="text-lg md:text-xl text-slate-200 leading-relaxed italic font-medium">"{data.middlewareLogic}"</p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* 4. Problem & Outcome */}
      <section className="max-w-5xl mx-auto py-32 px-6">
         <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
               <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-8">The Human Problem</h4>
               <p className="text-3xl font-medium text-slate-800 leading-tight">{data.problem}</p>
            </div>
            <div>
               <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-8">The System Outcome</h4>
               <p className="text-3xl font-medium text-slate-800 leading-tight mb-6">{data.outcome}</p>
               
               {/* Narrative Layer Outcome Addition - Only for narrative-driven-travel-experience-generator */}
               {projectId === 'narrative-driven-travel-experience-generator' && (
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6, delay: 0.2 }}
                   className="mt-6 pt-6 border-t border-amber-200/30"
                 >
                   <p className="text-lg text-slate-700 leading-relaxed italic" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                     <strong className="not-italic text-slate-900 font-semibold">From Logistics to Legacy:</strong> Most travel apps stop at the 'Arrival.' The Narrative Layer ensures the experience continues after the traveler returns home. By using LLMs to synthesize the Spontaneity Engine's decisions, we provide the user with a 'Semantic Receipt'—a digital artifact of their physical journey.
                   </p>
                 </motion.div>
               )}
            </div>
         </div>
      </section>

      {/* 5. Scalable Feature Grid */}
      {(() => {
        const features = (data as any).features;
        return features && features.length > 0 ? (
          <section className="bg-slate-50 py-24 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
              {features.map((feature: any, i: number) => (
                <div key={i} className="p-10 bg-white rounded-[32px] border border-slate-100 shadow-sm">
                  <h5 className="text-xl font-bold mb-3">{feature.title}</h5>
                  <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null;
      })()}

      {/* Narrative Reflection Surface - Only for narrative-driven-travel-experience-generator */}
      {projectId === 'narrative-driven-travel-experience-generator' && (data as any)?.narrativeData && (
        <section className="bg-slate-950 py-24 px-6 border-t border-amber-500/20">
          {/* Narrative Bridge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-12 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Memory Mirror: The Day's Reflection
            </h3>
            <p className="text-slate-400 leading-relaxed">
              The Narrative Layer turns disparate data points (GPS pings, weather, social interactions) into a cohesive memory. It helps the traveler answer the question: "What made today special?"
            </p>
          </motion.div>

          {/* Semantic Story Surface Component - Swipeable Card Interface */}
          {(data as any)?.narrativeData?.semanticStory && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center mb-12"
            >
              <SemanticStorySurface narrativeData={(data as any).narrativeData} />
            </motion.div>
          )}

          {/* Narrative Reflection Surface Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <NarrativeReflectionSurface narrativeData={(data as any).narrativeData} />
          </motion.div>
        </section>
      )}

      {/* 6. The System in Motion: Mobile Demo (Tier 3: The Glass) */}
      {projectId === 'social-graph-driven-travel-network' && (
        <section className="py-24 bg-gradient-to-b from-slate-50 via-slate-100 to-white relative overflow-hidden">
          {/* Glassmorphism background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-cyan-500/5 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  The System in Motion: Mobile Demo
                </h3>
                <p className="text-slate-600 text-lg max-w-3xl mx-auto">
                  This mobile simulation demonstrates how raw traveler telemetry is converted into verified social signals using the Influence Scorer and Privacy Gates.
                </p>
              </div>

              {/* Mobile Sandbox Container */}
              <div className="flex justify-center mb-8">
                <div className="relative" style={{ maxWidth: '375px', width: '100%' }}>
                  {/* Mobile Frame with Glassmorphism */}
                  <div 
                    className="relative bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-2 shadow-2xl border-4 border-white/40 ring-4 ring-indigo-500/20"
                    style={{ aspectRatio: '9/19' }}
                  >
                    {/* Mobile Screen */}
                    <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950 rounded-[2rem] overflow-hidden">
                      {/* Map Background */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="w-full h-full bg-gradient-to-br from-emerald-900/30 via-slate-900 to-cyan-900/30"></div>
                        {/* Grid pattern for map feel */}
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)',
                          backgroundSize: '40px 40px'
                        }}></div>
                      </div>

                      {/* Content Area */}
                      <div className="relative z-10 h-full flex flex-col p-6">
                        {/* Status Bar */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-white text-xs font-mono">
                            {mobileDemoStage === 'encrypted' && 'State: Stealth Mode (DID Encrypted)'}
                            {mobileDemoStage === 'scanning' && 'State: Network Scanning...'}
                            {mobileDemoStage === 'connected' && 'State: Connection Active'}
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                          </div>
                        </div>

                        {/* Map Area with Nodes */}
                        <div className="flex-1 relative mb-4">
                          {/* User Location (Center) */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <motion.div
                              animate={mobileDemoStage === 'scanning' ? {
                                scale: [1, 1.2, 1],
                                opacity: [0.8, 1, 0.8]
                              } : {}}
                              transition={{ duration: 2, repeat: mobileDemoStage === 'scanning' ? Infinity : 0 }}
                              className="w-4 h-4 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
                            />
                            {mobileDemoStage === 'scanning' && (
                              <>
                                {/* Scanning Ring 1 */}
                                <motion.div
                                  initial={{ scale: 0, opacity: 0.8 }}
                                  animate={{ scale: 4, opacity: 0 }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-emerald-400 rounded-full"
                                />
                                {/* Scanning Ring 2 */}
                                <motion.div
                                  initial={{ scale: 0, opacity: 0.6 }}
                                  animate={{ scale: 6, opacity: 0 }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-cyan-400 rounded-full"
                                />
                              </>
                            )}
                          </div>

                          {/* Anonymous Nodes (Blurred when encrypted) */}
                          {[
                            { x: '20%', y: '30%' },
                            { x: '80%', y: '25%' },
                            { x: '15%', y: '70%' },
                            { x: '75%', y: '75%' },
                            { x: '50%', y: '20%' }
                          ].map((pos, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0.3, scale: 0.8 }}
                              animate={{
                                opacity: mobileDemoStage === 'connected' && i < 2 ? 1 : 0.3,
                                scale: mobileDemoStage === 'connected' && i < 2 ? 1.2 : 0.8,
                                filter: mobileDemoStage === 'encrypted' ? 'blur(4px)' : 'blur(0px)'
                              }}
                              transition={{ duration: 0.5 }}
                              className="absolute"
                              style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
                            >
                              <div className={`w-8 h-8 rounded-full ${mobileDemoStage === 'connected' && i < 2 ? 'bg-emerald-400 ring-2 ring-emerald-300' : 'bg-slate-600'}`}></div>
                            </motion.div>
                          ))}
                        </div>

                        {/* AI Log Overlay (Enhanced Glassmorphism) */}
                        {mobileDemoStage === 'scanning' && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/20 backdrop-blur-xl rounded-xl border border-white/30 p-4 mb-4 shadow-[0_8px_32px_0_rgba(99,102,241,0.2)]"
                          >
                            <div className="text-xs font-mono text-emerald-300 space-y-1">
                              {mobileDemoLogs.map((log, i) => (
                                <div key={i}>{log}</div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Connection Card (Enhanced Glassmorphism) */}
                        {mobileDemoStage === 'connected' && showConnectionCard && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 backdrop-blur-xl rounded-xl border border-emerald-400/40 p-4 mb-4 shadow-[0_8px_32px_0_rgba(16,185,129,0.3)]"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-white font-bold">
                                JB
                              </div>
                              <div>
                                <div className="text-white font-semibold">James B.</div>
                                <div className="text-emerald-300 text-xs">Cape Town</div>
                              </div>
                            </div>
                            <div className="bg-white/10 rounded-lg p-3 mb-3">
                              <div className="text-emerald-300 text-xs font-mono mb-1">Reciprocal Intent</div>
                              <div className="text-white text-sm">Wants to visit your hometown. Share a tip?</div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setMobileDemoStage('encrypted');
                                  setShowConnectionCard(false);
                                  setMobileDemoLogs([]);
                                }}
                                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                              >
                                Share Tip
                              </button>
                              <button
                                onClick={() => {
                                  setMobileDemoStage('encrypted');
                                  setShowConnectionCard(false);
                                  setMobileDemoLogs([]);
                                }}
                                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                              >
                                Later
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {/* Pulse Button */}
                        <button
                          onClick={() => {
                            if (mobileDemoStage === 'encrypted') {
                              setMobileDemoStage('scanning');
                              setMobileDemoLogs([]);
                              setTimeout(() => {
                                setMobileDemoLogs(['[L1 Gate]: Scanning 2nd-Degree Network...']);
                              }, 500);
                              setTimeout(() => {
                                setMobileDemoLogs(prev => [...prev, '[L2 Gate]: Verifying ZK-Location Proofs...']);
                              }, 1500);
                              setTimeout(() => {
                                setMobileDemoLogs(prev => [...prev, '[L3 Gate]: Matching Travel DNA (Vibe: \'Art & Espresso\')...']);
                              }, 2500);
                              setTimeout(() => {
                                setMobileDemoStage('connected');
                                setTimeout(() => setShowConnectionCard(true), 500);
                              }, 3500);
                            } else {
                              setMobileDemoStage('encrypted');
                              setShowConnectionCard(false);
                              setMobileDemoLogs([]);
                            }
                          }}
                          className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 font-mono text-sm uppercase tracking-wider"
                        >
                          {mobileDemoStage === 'encrypted' ? 'Pulse' : 'Reset'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Status Card (Enhanced Glassmorphism) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/80 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-2xl p-6 md:p-8 relative overflow-hidden ring-2 ring-indigo-500/20"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2 font-mono">System Status: Global Pulse</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-emerald-600 text-sm font-mono">SYSTEM ONLINE</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Counters */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 p-4 shadow-sm">
                      <div className="text-emerald-600 text-xs font-mono uppercase tracking-wider mb-1">Active Travelers</div>
                      <div className="text-2xl font-bold text-slate-900 font-mono">
                        {activeTravelersCount.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 p-4 shadow-sm">
                      <div className="text-cyan-600 text-xs font-mono uppercase tracking-wider mb-1">Reciprocal Matches</div>
                      <div className="text-2xl font-bold text-slate-900 font-mono">
                        {reciprocalMatchesCount}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Project Navigation */}
      <ProjectNavigation currentProjectId={projectId} />

      {/* Product Surfaces (The Glass) Navigation */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                Product Surfaces (The "Glass")
              </h3>
              
              {/* Product Surface Links */}
              {(() => {
                // Define product surface projects (non-logic versions - only the 4 "Glass" surfaces)
                const productSurfaces: Array<{ id: string; title: string; path: string }> = [
                  {
                    id: 'context-aware-travel-decision-system',
                    title: 'Context-Aware Decision System',
                    path: '/projects/travel-and-ai/projects/context-aware-travel-decision-system',
                  },
                  {
                    id: 'social-opportunity-matching-module',
                    title: 'Social Opportunity Matching',
                    path: '/projects/travel-and-ai/projects/social-opportunity-matching-module',
                  },
                  {
                    id: 'social-graph-driven-travel-network',
                    title: 'Social Graph Network',
                    path: '/projects/travel-and-ai/projects/social-graph-driven-travel-network',
                  },
                  {
                    id: 'narrative-driven-travel-experience-generator',
                    title: 'Narrative Experience Generator',
                    path: '/projects/travel-and-ai/projects/narrative-driven-travel-experience-generator',
                  },
                ];

                // Normalize current project ID
                const normalizedCurrentId = projectId.replace(/\/$/, '').split('/').pop() || projectId;
                
                // Filter out the current project if it's a Glass page
                const availableSurfaces = productSurfaces.filter(surface => {
                  const surfacePathId = surface.path.split('/').pop() || '';
                  return surfacePathId !== normalizedCurrentId && surface.id !== normalizedCurrentId;
                });

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableSurfaces.map((surface) => (
                      <Link
                        key={surface.id}
                        href={surface.path}
                        className="group flex flex-col p-5 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
                            <Smartphone className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                            {surface.title}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">View Interface Design</span>
                      </Link>
                    ))}
                  </div>
                );
              })()}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}