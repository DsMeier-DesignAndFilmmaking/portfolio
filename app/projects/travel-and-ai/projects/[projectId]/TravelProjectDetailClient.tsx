'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  FaArrowLeft,
  FaCode,
  FaLink,
  FaCalendarAlt,
  FaUser,
  FaTools,
  FaRocket,
  FaLightbulb,
  FaPalette,
  FaLaptopCode,
  FaMapMarkerAlt,
  FaClock,
  FaHeartbeat,
  FaBrain,
  FaLightbulb as FaBulb,
  FaShareAlt,
  FaUniversity,
  FaArchive,
  FaUserGraduate,
  FaCheckCircle,
  FaCertificate,
  FaCloudSun,
  FaPlane,
  FaExclamationTriangle,
  FaListUl,
  FaShieldAlt,
  FaLock,
  FaUserCircle,
  FaTags,
} from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageTransitionOverlay from '../../../../../components/PageTransitionOverlay';
import StickyProgressNav from '../../../../../components/StickyProgressNav';
import SystemStack from '../../../../../components/SystemStack';
import NarrativeDiagram from '../../../../../components/NarrativeDiagram';
import EmotionalArcGraph from '../../../../../components/EmotionalArcGraph';
import RecoveryStateIndicator from '../../../../../components/RecoveryStateIndicator';
import PivotAnimation from '../../../../../components/PivotAnimation';
import TrustSignalDemo from '../../../../../components/LivePulseDemo';
import TrustPulseUI from '../../../../../components/TrustPulseUI';
import { Shield, CheckCircle, Sparkles, MapPin, Clock, Utensils, Navigation, Compass, BookOpen, Zap, Cpu, Network, Database, Layers, Activity, Users, Globe, TrendingUp, Brain, GitBranch, ArrowRight } from 'lucide-react';

interface TravelProjectDetailClientProps {
  project: any;
  projectId: string;
}

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

// Trust Framework Visual Component - "The Trust Stack"
const TrustFrameworkVisual = () => {
  return (
    <div className="relative w-full max-w-md aspect-[4/3] mx-auto">
      {/* Container with 3D perspective */}
      <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
        {/* Base Layer - Data Layer Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 rounded-xl overflow-hidden"
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-20px) scale(0.95)' }}
        >
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
              {[...Array(48)].map((_, i) => (
                <div
                  key={i}
                  className="border border-cyan-500/20"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Data Input Nodes */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-4 w-full px-6">
              {['Itineraries', 'Preferences', 'Context'].map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="w-6 h-6 text-cyan-400" />
                  </div>
                  <p className="text-sm md:text-xs text-cyan-300/70 font-medium">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Middle Layer - Trust Framework Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(10px)' }}
        >
          <div className="relative w-[85%] h-[70%] bg-gradient-to-br from-indigo-800/40 via-indigo-700/30 to-cyan-800/40 backdrop-blur-xl rounded-2xl border border-cyan-400/30 shadow-2xl">
            {/* Glowing Verification Nodes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-32 h-32">
                {/* Pulsing Core */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 bg-cyan-400/30 rounded-full blur-xl"
                />
                
                {/* Verification Nodes */}
                {[...Array(6)].map((_, i) => {
                  const angle = (i * 360) / 6;
                  const rad = (angle * Math.PI) / 180;
                  const radius = 50;
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;
                  
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                      className="absolute"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: 'easeInOut',
                        }}
                        className="w-8 h-8 bg-cyan-400 rounded-full border-2 border-cyan-300 flex items-center justify-center shadow-lg shadow-cyan-400/50"
                      >
                        <CheckCircle className="w-4 h-4 text-indigo-900" />
                      </motion.div>
                    </motion.div>
                  );
                })}
                
                {/* Center Shield Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Shield className="w-12 h-12 text-cyan-300" />
                </motion.div>
              </div>
            </div>
            
            {/* Framework Label */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="text-sm md:text-xs font-semibold text-cyan-300 uppercase tracking-wider"
              >
                Trust & Authenticity Framework
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Top Layer - Verified Travel Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -8, 0],
          }}
          transition={{ 
            duration: 0.8, 
            delay: 0.6,
            y: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          }}
          className="absolute top-4 right-4 w-[60%]"
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}
        >
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-4 shadow-2xl border border-cyan-400/20 backdrop-blur-sm">
            {/* AI Authenticity Badge */}
            <div className="flex items-center justify-between mb-3">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center gap-2 px-2.5 py-1 bg-cyan-500/20 border border-cyan-400/40 rounded-lg"
              >
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-sm md:text-xs font-semibold text-cyan-300">AI Verified</span>
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </motion.div>
            </div>
            
            {/* Destination */}
            <div className="mb-2">
              <h3 className="text-base md:text-sm font-bold text-white mb-1">Santorini Retreat</h3>
              <p className="text-sm md:text-xs text-gray-400">Cultural & Historical Experience</p>
            </div>
            
            {/* Verification Details */}
            <div className="space-y-1.5 pt-2 border-t border-gray-700/50">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                <span className="text-sm md:text-xs text-gray-300">3 Verified Sources</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                <span className="text-sm md:text-xs text-gray-300">Updated 2 days ago</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Social Opportunity Matching Module - System Diagram
const SocialOpportunityMatchingVisual = () => {
  // Matching signals for input
  const matchingSignals = [
    { label: 'Proximity', icon: MapPin },
    { label: 'Shared Interests', icon: Sparkles },
    { label: 'Schedule Gaps', icon: Clock },
  ];

  // Matching modules
  const matchingModules = [
    { name: 'Proximity Detector', icon: MapPin },
    { name: 'Interest Matcher', icon: Sparkles },
    { name: 'Schedule Analyzer', icon: Clock },
  ];

  return (
    <div className="relative w-full max-w-7xl lg:max-w-5xl mx-auto -mx-6 lg:mx-auto px-0 lg:px-6">
      {/* Main Architecture Container */}
      <div className="relative bg-gradient-to-br from-blue-950/98 via-blue-900/98 to-blue-950/98 rounded-xl border border-blue-800/50 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="grid grid-cols-10 grid-rows-8 h-full w-full">
            {[...Array(80)].map((_, i) => (
              <div key={i} className="border border-blue-500/20" />
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-6 md:p-8 lg:p-10">
          {/* Vertical Stack Layout */}
          <div className="flex flex-col items-center gap-6 md:gap-8">
            
            {/* Center: Matching Engine */}
            <div className="w-full flex flex-col gap-4 max-w-2xl mx-auto">
              {/* Matching Engine Container */}
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                {/* Matching Engine Container - Lighter, Glowing */}
                <div className="relative bg-gradient-to-br from-blue-800/60 via-blue-700/50 to-blue-800/60 rounded-lg border border-blue-500/40 shadow-xl shadow-blue-500/15 p-5 md:p-6 backdrop-blur-sm">
                  {/* Pulsing Intelligence Glow */}
                  <motion.div
                    animate={{
                      opacity: [0.2, 0.35, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-blue-500/15 rounded-lg"
                  />

                  {/* Matching Engine Label */}
                  <div className="relative z-10 mb-4 text-center">
                    <h3 className="text-base md:text-lg font-semibold text-white tracking-tight mb-1">
                      Social Opportunity Matching
                    </h3>
                    <p className="text-sm md:text-base font-medium text-blue-800 uppercase tracking-[0.15em] mb-2">
                      Lightweight Intelligence · Spontaneous Connection · Low Friction
                    </p>
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                  </div>

                  {/* Matching Sub-modules */}
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-3 lg:gap-4">
                    {matchingModules.map((module, i) => {
                      const Icon = module.icon;
                      return (
                        <React.Fragment key={module.name}>
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                            className="flex flex-col items-center gap-1.5"
                          >
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-blue-900/80 border border-blue-500/30 flex items-center justify-center backdrop-blur-sm">
                              <Icon className="w-6 h-6 md:w-7 md:h-7 text-blue-300" />
                            </div>
                            <p className="text-sm md:text-base font-medium text-blue-200 text-center leading-tight max-w-[120px] md:max-w-[110px]">
                              {module.name}
                            </p>
                          </motion.div>
                          
                          {/* Internal flow - horizontal on desktop only */}
                          {i < matchingModules.length - 1 && (
                            <motion.div
                              initial={{ opacity: 0, scaleX: 0 }}
                              animate={{ opacity: 1, scaleX: 1 }}
                              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                              className="hidden md:block"
                            >
                              <motion.div
                                animate={{
                                  opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.25,
                                  ease: 'easeInOut',
                                }}
                                className="w-6 h-[1px] bg-gradient-to-r from-blue-400/40 via-blue-400/60 to-blue-400/40"
                              />
                            </motion.div>
                          )}
                          {/* Vertical flow connector on mobile */}
                          {i < matchingModules.length - 1 && (
                            <motion.div
                              initial={{ opacity: 0, scaleY: 0 }}
                              animate={{ opacity: 1, scaleY: 1 }}
                              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                              className="md:hidden"
                            >
                              <motion.div
                                animate={{
                                  opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.25,
                                  ease: 'easeInOut',
                                }}
                                className="w-[1px] h-4 bg-gradient-to-b from-blue-400/40 via-blue-400/60 to-blue-400/40"
                              />
                            </motion.div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Flow Arrow to Output */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative w-full flex items-center justify-center max-w-2xl mx-auto"
            >
              <motion.div
                animate={{
                  y: [0, 4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.3,
                  ease: 'easeInOut',
                }}
                className="flex items-center justify-center"
                style={{ willChange: 'transform' }}
              >
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-blue-700 rotate-90" />
              </motion.div>
            </motion.div>

            {/* Bottom: Social Match Output */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full flex flex-col items-center justify-center"
            >
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-sm md:text-base font-medium text-blue-300 uppercase tracking-[0.2em] mb-3">
                  Social Opportunity
                </p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/20 border border-blue-500/40 flex items-center justify-center backdrop-blur-sm mx-auto"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Users className="w-8 h-8 md:w-10 md:h-10 text-blue-300" />
                  </motion.div>
                </motion.div>
                <p className="text-sm md:text-base font-medium text-blue-600 mt-2 text-center">
                  15-minute interaction
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Social Matching Lab - R&D Sandbox Component
const SocialMatchingLab = () => {
  const [trustRadius, setTrustRadius] = useState(500); // meters
  const [timeGap, setTimeGap] = useState(30); // minutes
  const [interestTags, setInterestTags] = useState<string[]>(['Art', 'Coffee', 'Architecture']);
  const [logicFeed, setLogicFeed] = useState<string[]>([]);
  const [matches, setMatches] = useState<any[]>([]);

  // Mock match data for demonstration
  const mockMatches = useMemo(() => [
    {
      id: 1,
      name: 'Alex Chen',
      degree: 1,
      distance: 120,
      interests: ['Art', 'Coffee', 'Architecture'],
      scheduleGap: 45,
      activityDuration: 30,
    },
    {
      id: 2,
      name: 'Sarah Martinez',
      degree: 2,
      distance: 350,
      interests: ['Art', 'Coffee'],
      scheduleGap: 20,
      activityDuration: 25,
    },
    {
      id: 3,
      name: 'Jordan Kim',
      degree: 1,
      distance: 80,
      interests: ['Architecture'],
      scheduleGap: 60,
      activityDuration: 20,
    },
    {
      id: 4,
      name: 'Taylor Brown',
      degree: 3,
      distance: 600,
      interests: ['Coffee'],
      scheduleGap: 15,
      activityDuration: 15,
    },
  ], []);

  // Calculate match score with detailed breakdown
  const calculateMatchScore = useCallback((match: any) => {
    const breakdown: { step: string; value: number; description: string }[] = [];
    let score = 0;

    // Base Score
    const baseScores: Record<number, number> = { 1: 50, 2: 25, 3: 10 };
    const baseScore = baseScores[match.degree] || 0;
    score += baseScore;
    const degreeOrdinal = match.degree === 1 ? '1st' : match.degree === 2 ? '2nd' : '3rd';
    breakdown.push({
      step: 'Base Score',
      value: baseScore,
      description: `${degreeOrdinal} Degree Connection`
    });

    // Interest Alignment
    const matchingInterests = match.interests.filter((interest: string) =>
      interestTags.includes(interest)
    );
    const interestScore = matchingInterests.length * 20;
    score += interestScore;
    if (interestScore > 0) {
      breakdown.push({
        step: 'Interest Alignment',
        value: interestScore,
        description: `+${interestScore}pts (${matchingInterests.length} matches)`
      });
    }

    // Proximity Decay
    const proximityPenalty = Math.floor(match.distance / 100) * 2;
    score -= proximityPenalty;
    if (proximityPenalty > 0) {
      breakdown.push({
        step: 'Proximity Decay',
        value: -proximityPenalty,
        description: `-${proximityPenalty}pts (${match.distance}m)`
      });
    }

    // Temporal Feasibility (Stress Penalty)
    const timeAvailable = match.scheduleGap - match.activityDuration;
    if (timeAvailable < 15) {
      const originalScore = score;
      score = score * 0.4; // Apply 0.4x penalty
      const stressPenalty = originalScore - score;
      breakdown.push({
        step: 'Stress Penalty',
        value: -stressPenalty,
        description: `0.4x multiplier (${timeAvailable}min gap)`
      });
    } else {
      breakdown.push({
        step: 'Temporal Feasibility',
        value: 0,
        description: `✓ ${timeAvailable}min available`
      });
    }

    return {
      finalScore: Math.round(score),
      breakdown,
    };
  }, [interestTags]);

  // Filter and calculate matches
  const processedMatches = useMemo(() => {
    const filtered = mockMatches
      .filter(match => match.distance <= trustRadius)
      .filter(match => (match.scheduleGap - match.activityDuration) >= timeGap - 15)
      .map(match => ({
        ...match,
        ...calculateMatchScore(match),
      }))
      .sort((a, b) => b.finalScore - a.finalScore);

    // Generate logic feed
    const feed: string[] = [];
    filtered.forEach(match => {
      feed.push(`> Processing: ${match.name}`);
      match.breakdown.forEach(step => {
        if (step.value !== 0 || step.step === 'Temporal Feasibility') {
          feed.push(`  ${step.step}: ${step.value > 0 ? '+' : ''}${step.value}pts - ${step.description}`);
        }
      });
      feed.push(`> Final Score: ${match.finalScore}pts`);
      feed.push('');
    });

    setLogicFeed(feed);
    return filtered;
  }, [trustRadius, timeGap, calculateMatchScore]);

  useEffect(() => {
    setMatches(processedMatches);
  }, [processedMatches]);

  const toggleInterestTag = (tag: string) => {
    setInterestTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const availableTags = ['Art', 'Coffee', 'Architecture', 'Music', 'Food', 'Photography'];

  return (
    <section className="border-t border-white/10 bg-[#050505] relative overflow-hidden">
      {/* Subtle glowing indigo radial gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Experimental Middleware Sandbox
              </h2>
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-lg"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-green-400 uppercase tracking-wider">
                  STATUS: ACTIVE
                </span>
              </motion.div>
            </div>
            <p className="text-gray-400 text-sm md:text-base">
              Real-time weighted trust score calculation engine
            </p>
          </motion.div>

          {/* Three-Column Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Interactive Sliders */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  Control Parameters
                </h3>
                
                {/* Trust Radius Slider */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-300 mb-2">
                    Trust Radius: {trustRadius}m
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={trustRadius}
                    onChange={(e) => setTrustRadius(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>100m</span>
                    <span>1000m</span>
                  </div>
                </div>

                {/* Time Gap Slider */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-300 mb-2">
                    Time Gap: {timeGap}min
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="120"
                    step="5"
                    value={timeGap}
                    onChange={(e) => setTimeGap(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10min</span>
                    <span>120min</span>
                  </div>
                </div>

                {/* Interest Tags */}
                <div>
                  <label className="block text-sm text-gray-300 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-400" />
                    Interest Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleInterestTag(tag)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                          interestTags.includes(tag)
                            ? 'bg-indigo-500 text-white border border-indigo-400'
                            : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Center: Live Logic Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                Live Logic Feed
              </h3>
              <div className="bg-black/50 rounded-md p-4 font-mono text-xs text-green-400 h-[400px] overflow-y-auto">
                <AnimatePresence>
                  {logicFeed.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="mb-1"
                    >
                      {line || '\u00A0'}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {logicFeed.length === 0 && (
                  <div className="text-gray-500">Waiting for calculations...</div>
                )}
              </div>
            </motion.div>

            {/* Right: Match Output Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-400" />
                Match Output
              </h3>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                <AnimatePresence>
                  {matches.map((match, index) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group relative bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-white font-semibold">{match.name}</h4>
                          <p className="text-xs text-gray-400">
                            {match.degree === 1 ? '1st' : match.degree === 2 ? '2nd' : '3rd'} Degree
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-indigo-400">{match.finalScore}</div>
                          <div className="text-xs text-gray-500">pts</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {match.distance}m
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {match.scheduleGap}min
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {match.interests.map((interest: string) => (
                          <span
                            key={interest}
                            className={`px-2 py-0.5 rounded text-xs ${
                              interestTags.includes(interest)
                                ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-400/50'
                                : 'bg-white/5 text-gray-500 border border-white/10'
                            }`}
                          >
                            {interest}
                          </span>
                        ))}
                      </div>

                      {/* Score Breakdown on Hover */}
                      <div className="absolute inset-0 bg-black/95 border border-indigo-500/50 rounded-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                        <h5 className="text-white font-semibold mb-3 text-sm">Score Breakdown</h5>
                        <div className="space-y-2">
                          {match.breakdown.map((step: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center text-xs">
                              <span className="text-gray-400">{step.step}:</span>
                              <span className={`font-mono ${
                                step.value > 0 ? 'text-green-400' : step.value < 0 ? 'text-red-400' : 'text-gray-500'
                              }`}>
                                {step.value > 0 ? '+' : ''}{step.value}pts
                              </span>
                            </div>
                          ))}
                          <div className="border-t border-white/10 pt-2 mt-2 flex justify-between items-center">
                            <span className="text-white font-semibold">Final Score:</span>
                            <span className="text-indigo-400 font-bold">{match.finalScore}pts</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {matches.length === 0 && (
                  <div className="text-center text-gray-500 py-8 text-sm">
                    No matches found with current parameters
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// CATDS Architecture Diagram - Hierarchical Stack (Engine → CATDS)
const PlanningAssistantVisual = () => {
  // Context signals for input
  const contextSignals = [
    { label: 'Time', icon: Clock },
    { label: 'Place', icon: MapPin },
    { label: 'Energy', icon: Activity },
    { label: 'Crowd', icon: Users },
  ];

  // CATDS orchestration modules
  const catdsModules = [
    { name: 'Context Interpreter', icon: Brain },
    { name: 'Trust Layer', icon: Shield },
    { name: 'Decision Vector Composer', icon: TrendingUp },
  ];

  return (
    <div className="relative w-full max-w-7xl lg:max-w-5xl mx-auto -mx-6 lg:mx-auto px-0 lg:px-6">
      {/* Main Architecture Container */}
      <div className="relative bg-gradient-to-br from-slate-950/98 via-slate-900/98 to-slate-950/98 rounded-xl border border-slate-800/50 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="grid grid-cols-10 grid-rows-8 h-full w-full">
            {[...Array(80)].map((_, i) => (
              <div key={i} className="border border-cyan-500/20" />
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-6 md:p-8 lg:p-10">
          {/* Vertical Stack Layout */}
          <div className="flex flex-col items-center gap-6 md:gap-8">
            
            {/* Top: Live Context Vector Input */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center"
            >
              <div className="mb-4 text-center">
                <p className="text-sm md:text-base font-medium text-cyan-500 uppercase tracking-[0.2em] mb-4">
                  Live Context Vector
                </p>
                <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-center gap-4 md:gap-6">
                  {contextSignals.map((signal, i) => {
                    const Icon = signal.icon;
                    return (
                      <motion.div
                        key={signal.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-slate-800/70 border border-cyan-500/25 flex items-center justify-center backdrop-blur-sm">
                          <Icon className="w-5 h-5 md:w-6 md:h-6 text-cyan-500" />
                        </div>
                        <span className="text-sm md:text-base font-medium text-slate-400 uppercase tracking-wider">
                          {signal.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              
              {/* Scenario Chip */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-4"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/60 backdrop-blur-sm rounded-full border border-slate-700/40">
                  <span className="text-sm md:text-base font-medium text-slate-200">90m</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-sm md:text-base font-medium text-slate-200">New City</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-sm md:text-base font-medium text-slate-200">Low Energy</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-sm md:text-base font-medium text-slate-200">High Crowd</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Flow Arrow from Input */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative w-full flex items-center justify-center"
            >
              <motion.div
                animate={{
                  y: [0, 4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute left-1/2 -translate-x-1/2"
                style={{ willChange: 'transform' }}
              >
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-slate-700 rotate-90" />
              </motion.div>
            </motion.div>

            {/* Center: 2-Tier Stack Architecture */}
            <div className="w-full flex flex-col gap-4 max-w-2xl mx-auto">

              {/* Top Layer - CATDS Orchestration */}
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                {/* CATDS Container - Lighter, Glowing */}
                <div className="relative bg-gradient-to-br from-slate-800/60 via-slate-700/50 to-slate-800/60 rounded-lg border border-cyan-500/40 shadow-xl shadow-cyan-500/15 p-5 md:p-6 backdrop-blur-sm">
                  {/* Pulsing Intelligence Glow */}
                  <motion.div
                    animate={{
                      opacity: [0.2, 0.35, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-lg"
                  />

                  {/* CATDS Label */}
                  <div className="relative z-10 mb-4 text-center">
                    <h3 className="text-base md:text-lg font-semibold text-white tracking-tight mb-1">
                      Context-Aware Travel Decision System
                    </h3>
                    <p className="text-sm md:text-base font-medium text-cyan-300 uppercase tracking-[0.15em] mb-2">
                      AI Orchestration · Semantic Context · Trust Mediation
                    </p>
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
                  </div>

                  {/* CATDS Sub-modules */}
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-3 lg:gap-4">
                    {catdsModules.map((module, i) => {
                      const Icon = module.icon;
                      return (
                        <React.Fragment key={module.name}>
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                            className="flex flex-col items-center gap-1.5"
                          >
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-slate-900/80 border border-cyan-500/30 flex items-center justify-center backdrop-blur-sm">
                              <Icon className="w-6 h-6 md:w-7 md:h-7 text-cyan-300" />
                            </div>
                            <p className="text-sm md:text-base font-medium text-slate-200 text-center leading-tight max-w-[120px] md:max-w-[110px]">
                              {module.name}
                            </p>
                          </motion.div>
                          
                          {/* Internal flow - horizontal on desktop only */}
                          {i < catdsModules.length - 1 && (
                            <motion.div
                              initial={{ opacity: 0, scaleX: 0 }}
                              animate={{ opacity: 1, scaleX: 1 }}
                              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                              className="hidden md:block"
                            >
                              <motion.div
                                animate={{
                                  opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.25,
                                  ease: 'easeInOut',
                                }}
                                className="w-6 h-[1px] bg-gradient-to-r from-cyan-400/40 via-cyan-400/60 to-cyan-400/40"
                              />
                            </motion.div>
                          )}
                          {/* Vertical flow connector on mobile */}
                          {i < catdsModules.length - 1 && (
                            <motion.div
                              initial={{ opacity: 0, scaleY: 0 }}
                              animate={{ opacity: 1, scaleY: 1 }}
                              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                              className="md:hidden"
                            >
                              <motion.div
                                animate={{
                                  opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.25,
                                  ease: 'easeInOut',
                                }}
                                className="w-[1px] h-4 bg-gradient-to-b from-cyan-400/40 via-cyan-400/60 to-cyan-400/40"
                              />
                            </motion.div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

                {/* Dependency Lines - Downward from CATDS to Engine */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-8">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                      className="relative"
                    >
                      <motion.div
                        animate={{
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: 'easeInOut',
                        }}
                        className="w-[1px] h-4 bg-gradient-to-b from-cyan-400/50 to-slate-600/50"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Bottom Layer - Spontaneity Engine Foundation */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative"
              >
                {/* Engine Container - Darker, Heavier, Grounded */}
                <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90 rounded-lg border-2 border-slate-700/60 shadow-2xl p-5 md:p-6 backdrop-blur-sm">
                  {/* Dense Infrastructure Feel */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950/30 to-transparent rounded-lg" />

                  {/* Engine Label */}
                  <div className="relative z-10 text-center">
                    <h3 className="text-lg md:text-xl font-bold text-slate-100 tracking-tight mb-1.5">
                      Spontaneity Engine
                    </h3>
                    <p className="text-sm md:text-base font-medium text-slate-300 uppercase tracking-[0.15em]">
                      Real-Time Logistics · POI Streams · Availability · Mobility
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Flow Arrow to Output */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative w-full flex items-center justify-center"
            >
              <motion.div
                animate={{
                  y: [0, 4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.3,
                  ease: 'easeInOut',
                }}
                className="absolute left-1/2 -translate-x-1/2"
                style={{ willChange: 'transform' }}
              >
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-slate-700 rotate-90" />
              </motion.div>
            </motion.div>

            {/* Bottom: Adaptive Decision Output */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full flex flex-col items-center justify-center"
            >
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-sm md:text-base font-medium text-cyan-300 uppercase tracking-[0.2em] mb-3">
                  Adaptive Decision
                </p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 flex items-center justify-center backdrop-blur-sm mx-auto"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Navigation className="w-8 h-8 md:w-10 md:h-10 text-cyan-300" />
                  </motion.div>
                </motion.div>
                <p className="text-sm md:text-base font-medium text-slate-600 mt-2 text-center">
                  Next best action
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};


const TravelProjectDetailClient = ({ project, projectId }: TravelProjectDetailClientProps) => {
  
// Your Logic (which should now be error-free)
const scrollRef = useRef<HTMLDivElement>(null);
const [activeIndex, setActiveIndex] = useState(0);

const handleScroll = () => {
  if (scrollRef.current) {
    const { scrollLeft, offsetWidth } = scrollRef.current;
    
    // Calculate based on the item width (75% of container) 
    // plus the gap-5 (which is 20px)
    const itemWidthPlusGap = (offsetWidth * 0.75) + 20; 
    
    const index = Math.round(scrollLeft / itemWidthPlusGap);
    setActiveIndex(index);
  }

};

//SECTION 2: Wireframe Gallery Logic
// SECTION 1: Builds Gallery (The one using w-64)
const buildsScrollRef = useRef<HTMLDivElement>(null); // New Ref
const [buildsActiveIndex, setBuildsActiveIndex] = useState(0); // New State

// SECTION 2: Wireframe Gallery (The one using w-48)
const wireframeScrollRef = useRef<HTMLDivElement>(null);
const [wireframeActiveIndex, setWireframeActiveIndex] = useState(0);

const handleWireframeScroll = () => {
  if (wireframeScrollRef.current) {
    const { scrollLeft } = wireframeScrollRef.current;
    
    // w-48 (192px) + gap-4 (16px) = 208px
    // Adding an offset of 50px ensures the dot flips 
    // when the next card is partially visible
    const itemWidth = 208;
    const index = Math.round(scrollLeft / itemWidth);
    
    setWireframeActiveIndex(index);
  }
}; // close handleWireframeScroll

const handleBuildsScroll = () => {
  // 1. Ensure it uses buildsScrollRef
  if (buildsScrollRef.current) {
    const { scrollLeft } = buildsScrollRef.current;
    
    // 272 = 256 (w-64) + 16 (gap-4)
    const itemWidth = 272;
    const index = Math.round(scrollLeft / itemWidth);
    
    // 2. IMPORTANT: Update buildsActiveIndex, NOT wireframeActiveIndex
    setBuildsActiveIndex(index);
  }
};

const [activeVar, setActiveVar] = useState<string | null>(null);

const variables: Record<string, { title: string; desc: string }> = {
  w: { title: "Dynamic Weights", desc: "AI-calibrated significance based on historical success and intent logic." },
  L: { title: "Location (L)", desc: "Real-time GPS proximity, venue density, and transit accessibility." },
  T: { title: "Temporal Context (T)", desc: "Time of day, weather state, and seasonal availability triggers." },
  B: { title: "Behavior (B)", desc: "Immediate movement patterns and interaction history telemetry." },
  C: { title: "Constraints (ΣC)", desc: "Hard stops: Closing times, budget limits, and travel distance." }
};

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const router = useRouter();
  
  // Video-related state
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileVideoLoaded, setIsMobileVideoLoaded] = useState(false);
  const [isMobileVideoError, setIsMobileVideoError] = useState(false);
  const [showFallbackImage, setShowFallbackImage] = useState(false);
  const [isTechnicalModalOpen, setIsTechnicalModalOpen] = useState(false);
  const [narrativeEvolutionLevel, setNarrativeEvolutionLevel] = useState(1);
  const [activeIndustrySkin, setActiveIndustrySkin] = useState<'luxury' | 'creative' | 'cultural'>('luxury');
  // Mobile accordion state for Learnings & Reflections section
  const [learningsAccordion, setLearningsAccordion] = useState<Set<string>>(new Set());
  // Demo state for Living Graph interactive demo
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [demoStage, setDemoStage] = useState<'idle' | 'activating' | 'matching' | 'complete'>('idle');
  const [activeTravelersCount, setActiveTravelersCount] = useState(13042);
  const [reciprocalMatchesCount, setReciprocalMatchesCount] = useState(8);
  const [demoLogs, setDemoLogs] = useState<string[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<{ name: string; location: string; match: number } | null>(null);
  // Mobile demo state
  const [mobileDemoStage, setMobileDemoStage] = useState<'encrypted' | 'scanning' | 'connected'>('encrypted');
  const [mobileDemoLogs, setMobileDemoLogs] = useState<string[]>([]);
  const [showConnectionCard, setShowConnectionCard] = useState(false);
  
  // Check which project this is
  const isSpontaneousTravelCompanion = projectId === 'spontaneous-travel-companion';
  const isCulturalContextEngine = projectId === 'trust-framework-ai-travel';
  const isTravelPlanningAssistant = projectId === 'context-aware-travel-decision-system';
  const isLocalExperienceFinder = projectId === 'social-graph-driven-travel-network';
  const isSocialOpportunityMatching = projectId === 'social-opportunity-matching-module';
  const isNarrativeTravelGenerator = projectId === 'narrative-driven-travel-experience-generator';
  const isOtherProject = false; // All projects now have full implementations

  // Define sections for the sticky progress nav
  const sections = isNarrativeTravelGenerator
    ? [
        { id: 'narrative-architecture', label: 'Narrative Architecture' },
        { id: 'system-constraints', label: 'System Constraints' },
        { id: 'design-evolution', label: 'Design Evolution' },
        { id: 'scenarios-failure', label: 'Scenarios & Failure Cases' },
        { id: 'success-case', label: 'Success Case' },
        { id: 'business-use', label: 'Business Use' }
      ]
    : isLocalExperienceFinder
    ? [
        // Social Graph-Driven Travel Network page sections - order matches actual page structure
        { id: 'research-audience', label: 'Market Friction' },
        { id: 'design-exploration', label: 'Observed Travel Frictions' },
        { id: 'designs-strategy', label: 'Concept & Strategy' },
        { id: 'spontaneity-core', label: 'The Spontaneity Core' },
        { id: 'wireframes-ui', label: 'Design Evolution' },
        { id: 'prototyping-ai', label: 'Development & Build' },
        { id: 'outcomes-launch', label: 'Launch & Testing' }
      ]
    : isSocialOpportunityMatching
    ? [
        // Social Opportunity Matching Module page sections
        { id: 'research-audience', label: 'The Problem' },
        { id: 'design-exploration', label: 'Market Friction' },
        { id: 'designs-strategy', label: 'The Solution' },
        { id: 'wireframes-ui', label: 'Technical Architecture' },
        { id: 'prototyping-ai', label: 'Design Impact' },
        { id: 'learnings-next', label: 'Learnings & Reflections' }
      ]
    : isCulturalContextEngine
    ? [
        // Trust Framework page sections - order matches actual page structure
        { id: 'research-audience', label: 'Trust Signals & System Constraints' },
        { id: 'design-exploration', label: 'Observed Travel Frictions' },
        { id: 'designs-strategy', label: 'Concept & Strategy' },
        { id: 'wireframes-ui', label: 'Design Evolution' },
        { id: 'prototyping-ai', label: 'Development & Build' },
        { id: 'outcomes-launch', label: 'Launch & Testing' },
        { id: 'learnings-next', label: 'Learnings & Reflections' }
      ]
    : isTravelPlanningAssistant
    ? [
        // Context-Aware Travel Decision System page sections
        { id: 'research-audience', label: 'Audience & Research' },
        { id: 'design-exploration', label: 'Observed Travel Frictions' },
        { id: 'designs-strategy', label: 'Concept & Strategy' },
        { id: 'wireframes-ui', label: 'Design Evolution' },
        { id: 'prototyping-ai', label: 'System Evolution & Deployment' },
        { id: 'outcomes-launch', label: 'Launch & Testing' },
        { id: 'learnings-next', label: 'Learnings & Reflections' }
      ]
    : [
        // Default sections for other projects (Spontaneity Engine, etc.)
        { id: 'design-exploration', label: 'Systemic Travel Discovery Failures' },
        { id: 'system-overview', label: 'Systems Overview' },
        { id: 'designs-strategy', label: 'Concept & Strategy' },
        { id: 'wireframes-ui', label: 'Design Evolution' },
        { id: 'prototyping-ai', label: 'Build & Iteration' },
        { id: 'outcomes-launch', label: 'Launch & Testing' },
        { id: 'learnings-next', label: 'Learnings & Reflections' }
      ];

  useEffect(() => {
    // Handle scroll for navbar
    const handleScroll = () => {
      // Add scroll behavior if needed
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle video loading with error detection
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 1500); // Increased delay to ensure iframe starts loading

    return () => clearTimeout(timer);
  }, []);

  // Handle video ready state for smooth transition
  useEffect(() => {
    if (isVideoLoaded) {
      const timer = setTimeout(() => {
        setIsVideoReady(true);
      }, 500); // Additional delay for smooth transition

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isVideoLoaded]);

  // Handle video error detection and fallback
  useEffect(() => {
    if (isVideoLoaded && !isVideoReady) {
      const errorTimer = setTimeout(() => {
        // If video hasn't loaded after 4 seconds, assume it failed
        setIsVideoError(true);
        setShowFallbackImage(true);
      }, 4000);

      return () => clearTimeout(errorTimer);
    }
    return undefined;
  }, [isVideoLoaded, isVideoReady]);

  // Handle mobile video error detection
  useEffect(() => {
    if (isMobile && !isMobileVideoLoaded) {
      const errorTimer = setTimeout(() => {
        setIsMobileVideoError(true);
        setShowFallbackImage(true);
      }, 3000);

      return () => clearTimeout(errorTimer);
    }
    return undefined;
  }, [isMobile, isMobileVideoLoaded]);

  // Animate counters for demo section
  useEffect(() => {
    if (isLocalExperienceFinder) {
      // Animate active travelers counter
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

      // Animate reciprocal matches counter
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
    return undefined;
  }, [isLocalExperienceFinder]);

  // Demo simulation logic
  useEffect(() => {
    if (!isDemoOpen) {
      setDemoStage('idle');
      setDemoLogs([]);
      setSelectedMatch(null);
      return;
    }

    if (demoStage === 'idle') {
      return;
    }

    if (demoStage === 'activating') {
      const logs = [
        '[LOG]: Running Proximity Gate (L1)...',
        '[LOG]: Scanning network for 1st & 2nd degree connections...',
        '[LOG]: Found 23 potential matches within trust radius'
      ];
      
      let logIndex = 0;
      const logInterval = setInterval(() => {
        if (logIndex < logs.length) {
          setDemoLogs(prev => [...prev, logs[logIndex]]);
          logIndex++;
        } else {
          clearInterval(logInterval);
          setTimeout(() => setDemoStage('matching'), 500);
        }
      }, 800);

      return () => clearInterval(logInterval);
    }

    if (demoStage === 'matching') {
      const matchingLogs = [
        '[LOG]: Verifying Travel DNA (L3)...',
        '[LOG]: Cross-referencing past trips with network future plans...',
        '[LOG]: Match Found: User "James B." in Cape Town (89% Vibe Match)'
      ];
      
      let logIndex = 0;
      const logInterval = setInterval(() => {
        if (logIndex < matchingLogs.length) {
          setDemoLogs(prev => [...prev, matchingLogs[logIndex]]);
          logIndex++;
          if (logIndex === matchingLogs.length) {
            setSelectedMatch({ name: 'James B.', location: 'Cape Town', match: 89 });
            setTimeout(() => setDemoStage('complete'), 500);
          }
        } else {
          clearInterval(logInterval);
        }
      }, 1000);

      return () => clearInterval(logInterval);
    }
    return undefined;
  }, [isDemoOpen, demoStage]);

  // Handle mobile video loading
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setIsMobileVideoLoaded(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isMobile]);

  return (
    <>
      <div className="min-h-screen bg-white text-gray-900">
      <AnimatePresence mode="wait">
        {isTransitioning && <PageTransitionOverlay key="page-transition" />}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                setIsTransitioning(true);
                setTimeout(() => {
                  router.push('/projects/travel-and-ai');
                }, 500);
              }}
              className="hover:opacity-80 transition-opacity flex items-center gap-2 text-gray-900"
              aria-label="Back to projects"
            >
              <FaArrowLeft className="w-5 h-5" />
              <span className="text-base md:text-sm font-medium">Back to Travel & AI</span>
            </button>
          </div>
        </div>
      </motion.nav>

    {/* Sticky Progress Navigation */}
    {(isSpontaneousTravelCompanion || isCulturalContextEngine || isLocalExperienceFinder || isTravelPlanningAssistant || isSocialOpportunityMatching || isNarrativeTravelGenerator) && (
      <StickyProgressNav sections={sections} />
    )}

      {/* Hero Section */}
      <section className="bg-white
        min-h-[80vh]
        flex items-center
        pt-24 pb-20" aria-label="Project Hero">
        {isSpontaneousTravelCompanion && (
        <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-12 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
                  className="order-1 lg:order-1"
            >
              <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 md:mb-7 lg:mb-8 leading-tight tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  Spontaneity Engine
              </h1>
                  <div className="mb-6 md:mb-7">
                    <span className="inline-block px-3 py-1.5 rounded-full text-sm md:text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200 whitespace-nowrap">
                      In Development
                    </span>
                  </div>
                  <p className="text-sm md:text-base lg:text-lg text-gray-500 mb-8 md:mb-10 lg:mb-12 leading-relaxed font-normal">
                    Foundational AI System · Real-Time Decision Intelligence
                  </p>
                  

{/* EXECUTIVE SUMMARY / TL;DR - Vertical Stack Version */}
<motion.div 
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="mb-16 border-t border-b border-gray-100 py-10 space-y-8"
>
  {/* The Challenge */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8">
    <span className="text-xs font-bold uppercase tracking-[0.15em] text-blue-700 pt-1">
      The Challenge
    </span>
    <div className="md:col-span-3">
      <p className="text-base md:text-lg text-gray-800 leading-relaxed max-w-2xl [text-wrap:pretty]">
        Solving the "Filter Bubble" and decision fatigue in live, spontaneous travel environments.
      </p>
    </div>
  </div>

  {/* The Solution */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 pt-8 border-t border-gray-50">
    <span className="text-xs font-bold uppercase tracking-[0.15em] text-blue-700 pt-1">
      The Solution
    </span>
    <div className="md:col-span-3">
    <p className="text-base md:text-lg text-gray-800 leading-relaxed max-w-2xl [text-wrap:pretty]">
  Context-driven AI designed for the moment, prioritizing live activation 
  over {"static\u00A0planning\u00A0logic."}
</p>
    </div>
  </div>

  {/* My Role */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 pt-8 border-t border-gray-50">
    <span className="text-xs font-bold uppercase tracking-[0.15em] text-blue-700 pt-1">
      My Role
    </span>
    <div className="md:col-span-3">
      <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl font-medium italic">
      <strong>Project Creator & Lead Architect.</strong> End-to-end ownership of the product lifecycle—from systemic AI logic and prompt engineering to the native iOS implementation.
      </p>
    </div>
  </div>
</motion.div>

        <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8" aria-label="Hero actions">
  {/* Primary Action */}
  <a
    href="#live-demo" 
    onClick={(e) => {
      e.preventDefault();
      const target = document.querySelector('#live-demo');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }}
    className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all duration-200 min-h-[48px] text-center text-base cursor-pointer"
  >
    <span>Explore Prototype</span>
    <span className="ml-3 relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
    </span>
  </a>

  {/* Secondary Action: Updated to target design-exploration */}
  <a
    href="#design-exploration"
    onClick={(e) => {
      e.preventDefault();
      const target = document.querySelector('#design-exploration');
      if (target) {
        // scrollIntoView is the most reliable method for cross-browser smooth scrolling
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }}
    className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all duration-200 min-h-[48px] text-center text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
    aria-label="View Case Study"
  >
    View Case Study
  </a>
</nav>
                 
</motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                  className="order-2 lg:order-2 mt-16 md:mt-10 lg:mt-0 w-full flex items-center justify-center lg:justify-start"
                >
                  <div className="relative flex flex-col md:flex-row gap-4 md:gap-8 items-center w-full md:w-auto">
                  
                    <div className="relative flex-shrink-0 flex justify-center md:justify-start">
                      <div className="rounded-xl overflow-hidden shadow-lg bg-gray-100">
                    <Image
                          src={normalizeImagePath("/portfolio/images/Micro-Adventure_ConceptGraphic.png")}
                      alt="Micro Adventure Concept Graphic"
                          width={280}
                          height={560}
                          className="w-[240px] sm:w-[280px] md:w-[240px] lg:w-[260px] xl:w-[280px] h-auto object-contain"
                      priority
                      quality={90}
                          sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, (max-width: 1024px) 260px, 280px"
                    />
                  </div>
                </div>
                    <div className="relative flex-shrink-0 md:mt-8 lg:mt-12 flex justify-center md:justify-start">
                      <div className="rounded-xl overflow-hidden shadow-lg bg-gray-100">
                    <Image
                          src={normalizeImagePath("/portfolio/images/Micro-Adventure_ConceptGraphic_2.png")}
                      alt="Micro Adventure Concept Graphic 2"
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
              </div>
            </div>
          </div>
        )}
        {isCulturalContextEngine && (
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto pt-12 md:pt-16">
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-12 lg:items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="order-1 lg:order-1"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 md:mb-4 lg:mb-5 leading-tight tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    A Trust Framework for Real-Time Travel AI
                  </h1>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1.5 rounded-full text-sm md:text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 whitespace-nowrap">
                      In Research & Development
                    </span>
                  </div>
                  <p className="text-sm md:text-base lg:text-lg text-gray-500 mb-6 md:mb-8 lg:mb-10 leading-relaxed font-normal">
                    How architectural provenance and data integrity enable travelers to make bold, spontaneous choices with zero-risk 'hallucination' protection.
                  </p>
                  <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4" aria-label="Hero actions">
                    <a
                      href="#research-audience"
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        const target = document.querySelector('#research-audience');
                        if (target) {
                          const offset = 120;
                          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                          window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className="inline-flex items-center justify-center px-6 py-3.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 active:bg-gray-700 transition-colors duration-200 min-h-[44px] text-center text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      aria-label="View Case Study"
                    >
                      View Case Study
                    </a>
                  </nav>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="order-2 lg:order-2 mt-8 md:mt-10 lg:mt-0 flex items-center justify-center lg:justify-start"
                >
                  <TrustFrameworkVisual />
                </motion.div>
              </div>
            </div>
          </div>
        )}
        {isTravelPlanningAssistant && (
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto pt-12 md:pt-16">
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-12 lg:items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="order-1 lg:order-1"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 md:mb-7 lg:mb-8 leading-tight tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Context-Aware Travel Decision System (CATDS)
                  </h1>
                  <div className="mb-6 md:mb-7">
                    <span className="inline-block px-3 py-1.5 rounded-full text-sm md:text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 whitespace-nowrap">
                      In Research & Development
                    </span>
                  </div>
                  <p className="text-sm md:text-base lg:text-lg text-gray-500 mb-8 md:mb-10 lg:mb-12 leading-relaxed font-normal">
                    AI Orchestration · Semantic Context Mapping · System Middleware
                  </p>
                  
                  {/* Overview Block */}
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      An architectural framework for adaptive orchestration in travel planning. A sophisticated AI middleware layer that bridges the gap between static travel data and real-world contextual intelligence.
                    </p>
                  </div>

                  {/* Technical Stack */}
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <p className="text-sm md:text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Technical Stack</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span className="text-base md:text-sm text-gray-700"><strong className="font-semibold">Spontaneity Engine:</strong> Real-time logistics and POI data processing</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span className="text-base md:text-sm text-gray-700"><strong className="font-semibold">Trust Layer:</strong> Human-in-the-loop verification and explainability</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span className="text-base md:text-sm text-gray-700"><strong className="font-semibold">Context Interpreter:</strong> Semantic context mapping and Decision Vector generation</span>
                      </div>
                    </div>
                  </div>

                  {/* System Specs Grid */}
                  <div className="mb-8 md:mb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <div className="text-sm md:text-xs font-medium text-gray-500 uppercase tracking-wider opacity-70 mb-2">
                          Scenario
                        </div>
                        <div className="text-sm md:text-base text-gray-900 font-normal leading-relaxed">
                          90m free, unfamiliar city, low energy, high crowd.
                        </div>
                      </div>
                      <div>
                        <div className="text-sm md:text-xs font-medium text-gray-500 uppercase tracking-wider opacity-70 mb-2">
                          Constraint
                        </div>
                        <div className="text-sm md:text-base text-gray-900 font-normal leading-relaxed">
                          One decision at a time.
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="order-2 lg:order-2 mt-12 md:mt-16 lg:mt-0 flex items-center justify-center lg:justify-start"
                >
                  <PlanningAssistantVisual />
                </motion.div>
              </div>
            </div>
          </div>
        )}
        {isSocialOpportunityMatching && (
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto pt-12 md:pt-16">
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-12 lg:items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="order-1 lg:order-1"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 md:mb-7 lg:mb-8 leading-tight tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Social Opportunity Matching
                  </h1>
                  <div className="mb-6 md:mb-7">
                    <span className="inline-block px-3 py-1.5 rounded-full text-sm md:text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 whitespace-nowrap">
                      In Research & Development
                    </span>
                  </div>
                  <p className="text-sm md:text-base lg:text-lg text-gray-500 mb-8 md:mb-10 lg:mb-12 leading-relaxed font-normal">
                  Trust Layer Middleware · Multi-Degree Matching · Real-Time Social Logic
                  </p>
                  
                  {/* Overview Block */}
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      A lightweight intelligence module that detects and surfaces spontaneous, low-friction social moments. Designed for integration into existing applications, exposing matching logic through core platform APIs rather than a standalone app.
                    </p>
                  </div>

                  {/* Technical Stack */}
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <p className="text-sm md:text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Technical Stack</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span className="text-base md:text-sm text-gray-700"><strong className="font-semibold">Proximity Detection:</strong> Real-time location-based matching</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span className="text-base md:text-sm text-gray-700"><strong className="font-semibold">Interest Matching:</strong> Shared preferences and activity detection</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span className="text-base md:text-sm text-gray-700"><strong className="font-semibold">Schedule Gap Analysis:</strong> Identifying 15-minute interaction windows</span>
                      </div>
                    </div>
                  </div>

                  {/* System Specs Grid */}
                  <div className="mb-8 md:mb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <div className="text-sm md:text-xs font-medium text-gray-500 uppercase tracking-wider opacity-70 mb-2">
                          Scenario
                        </div>
                        <div className="text-sm md:text-base text-gray-900 font-normal leading-relaxed">
                          Two travelers near each other with shared interests and a 15-minute schedule gap.
                        </div>
                      </div>
                      <div>
                        <div className="text-sm md:text-xs font-medium text-gray-500 uppercase tracking-wider opacity-70 mb-2">
                          Key Constraint
                        </div>
                        <div className="text-sm md:text-base text-gray-900 font-normal leading-relaxed">
                          Low-friction, spontaneous interactions only.
                        </div>
                      </div>
                    </div>
                  </div>

                  <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4" aria-label="Hero actions">
                    <a
                      href="#research-audience"
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        const target = document.querySelector('#research-audience');
                        if (target) {
                          const offset = 120;
                          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                          window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className="inline-flex items-center justify-center px-6 py-3.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 active:bg-gray-700 transition-colors duration-200 min-h-[44px] text-center text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      aria-label="View Case Study"
                    >
                      View Case Study
                    </a>
                  </nav>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="order-2 lg:order-2 mt-12 md:mt-16 lg:mt-0 flex items-center justify-center lg:justify-start"
                >
                  <SocialOpportunityMatchingVisual />
                </motion.div>
              </div>
            </div>
          </div>
        )}
        {isLocalExperienceFinder && (
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto pt-12 md:pt-16">
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-12 lg:items-center items-center lg:items-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="order-1 lg:order-1"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 md:mb-7 lg:mb-8 leading-tight tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Social Graph-Driven Travel Network
                  </h1>
                  <div className="mb-6 md:mb-7">
                    <span className="inline-block px-3 py-1.5 rounded-full text-sm md:text-sm font-semibold bg-amber-100 text-amber-800 border border-amber-200 whitespace-nowrap">
                      In Research & Development
                    </span>
                  </div>
                  <p className="text-sm md:text-base lg:text-lg text-gray-500 mb-8 md:mb-10 lg:mb-12 leading-relaxed font-normal">
                    AI Systems · Social Graph Theory · Zero-Knowledge Privacy · Network Effects
                  </p>
                  
                  {/* Overview Block */}
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                      <strong className="font-semibold">Real-Time Network Effects for Spontaneous Global Discovery</strong>
                    </p>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      Transitioning social capital from passive data to active intelligence. This system leverages ZK-proofs and multi-degree graph analysis to autonomously surface high-trust, low-friction social opportunities without compromising user sovereignty.
                    </p>
                  </div>
                  
                  {/* Technical Stack */}
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <p className="text-sm md:text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Technical Stack: Spatial & Tabular Logic</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span className="text-base md:text-base text-gray-700"><strong className="font-semibold">Social Graph API:</strong> Serves as the backend for both views, feeding real-time 'Intent' data into the Map (for heat-mapping Trust Clusters) and the Table (for filtered sorting). Continuously mapping 2nd and 3rd-degree trust nodes.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span className="text-base md:text-base text-gray-700"><strong className="font-semibold">Trust Layer:</strong> The 'Validator' — utilizing Zero-Knowledge proofs to verify "Friend-of-a-Friend" status without exposing PII (Personally Identifiable Information)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span className="text-base md:text-base text-gray-700"><strong className="font-semibold">Influence Scorer:</strong> Weights the 'Trust Clusters' on the map, highlighting regions where the user has the highest concentration of verified connections. The prioritization engine weights matches based on shared context, current intent, and historical trust-density.</span>
                      </div>
                    </div>
                  </div>

                  {/* System Specs Grid */}
                  <div className="mb-8 md:mb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <div className="text-sm md:text-sm font-medium text-gray-500 uppercase tracking-wider opacity-70 mb-2">
                          Scenario
                        </div>
                        <div className="text-sm md:text-base text-gray-900 font-normal leading-relaxed">
                        A traveler opens the Global Map View and sees a live "Pulse" in Tokyo—the system indicates a high density of their extended social network is currently active there.
                         <br></br><br></br>By switching to the Network Table, the traveler sees exactly who is "Roaming the Planet" in that region. They notice some mutual friends or connections are currently in Shibuya and 11 others have "Intent" signals to visit soon. This allows the traveler to move from observing a global trend to initiating a low-friction social moment with a verified connection already on the ground.
                        </div>
                      </div>
                      <div>
                        <div className="text-sm md:text-sm font-medium text-gray-500 uppercase tracking-wider opacity-70 mb-2">
                          Constraint
                        </div>
                        <div className="text-sm md:text-base text-gray-900 font-normal leading-relaxed">
                          Privacy-first data ingestion (zero-knowledge proof).
                        </div>
                      </div>
                    </div>
                  </div>

                  <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4" aria-label="Hero actions">
                    <a
                      href="#research-audience"
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        const target = document.querySelector('#research-audience');
                        if (target) {
                          const offset = 120;
                          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                          window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className="inline-flex items-center justify-center px-6 py-3.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 active:bg-gray-700 transition-colors duration-200 min-h-[44px] text-center text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      aria-label="View Case Study"
                    >
                      View Case Study
                    </a>
                    <a
                      href="#wireframes-ui"
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        // Changed selector to match the "Design Evolution" section ID
                        const target = document.querySelector('#wireframes-ui');
                        if (target) {
                          const offset = 100; // Adjust based on your header height
                          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                          window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className="inline-flex items-center justify-center px-6 py-3.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 min-h-[44px] text-center text-base focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                      aria-label="View Design Evolution Video Demo"
                    >
                      View Figma Prototype <span className="ml-2 text-sm md:text-sm opacity-70 font-normal">(Video Demo)</span>
                    </a>
                  </nav>
                </motion.div>
                <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                  className="order-2 lg:order-2 mt-12 md:mt-16 lg:mt-0 w-full flex items-center justify-center lg:justify-start"
                >
                  <div className="relative flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center md:justify-start w-full md:w-auto mx-auto md:mx-0">
                  <div className="relative flex-shrink-0 flex items-center justify-center">
                      {/* Removed bg-gray-100 and rounded-xl (optional) to ensure no background container is visible */}
                      <div className="overflow-visible"> 
                        <Image
                          src={normalizeImagePath("/portfolio/images/HomeScreen_Website_x2.png")}
                          alt="Social Travel Network Concept Graphic"
                          width={280}
                          height={560}
                          /* Ensure object-contain is used with h-auto to maintain aspect ratio without stretching */
                          className="w-[240px] sm:w-[280px] md:w-[240px] lg:w-[260px] xl:w-[280px] h-auto object-contain"
                          priority
                          quality={90}
                          sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, (max-width: 1024px) 260px, 280px"
                        />
                      </div>
                    </div>
                    <div className="relative flex-shrink-0 md:mt-8 lg:mt-12 flex items-center justify-center">
                      {/* Removed rounded-xl, overflow-hidden, shadow-lg, and bg-gray-100 */}
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
              </div>
            </div>
          </div>
        )}
        {isNarrativeTravelGenerator && (
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto pt-12 md:pt-16">
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-12 lg:items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="order-1 lg:order-1"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 md:mb-7 lg:mb-8 leading-tight tracking-tight">
                    Narrative-Driven Travel Experience Generator
                  </h1>
                  <div className="mb-6 md:mb-7">
                    <span className="inline-block px-3 py-1.5 rounded-full text-sm md:text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 whitespace-nowrap">
                      In Research & Development
                    </span>
                  </div>
                  <p className="text-sm md:text-base lg:text-lg text-gray-500 mb-8 md:mb-10 lg:mb-12 leading-relaxed font-normal">
                    AI · Narrative Design · Experience Systems
                  </p>
                  
                  {/* Overview Block */}
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      An AI system that generates emotional travel arcs instead of itineraries—designing for how a place feels over time rather than what to check off.
                    </p>
                  </div>

                  {/* Technical Stack */}
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <p className="text-sm md:text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Technical Stack</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span className="text-base md:text-sm text-gray-700"><strong className="font-semibold">Traveler Intent:</strong> Emotional state and preference analysis</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span className="text-base md:text-sm text-gray-700"><strong className="font-semibold">Spontaneity Engine:</strong> Real-time logistics and POI data processing</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span className="text-base md:text-sm text-gray-700"><strong className="font-semibold">Trust & Authenticity Layer:</strong> Verification and safety overrides</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span className="text-base md:text-sm text-gray-700"><strong className="font-semibold">Narrative Engine:</strong> Story generation and emotional arc orchestration</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span className="text-base md:text-sm text-gray-700"><strong className="font-semibold">Experience Phases:</strong> Arrival, Exploration, and Familiarity state management</span>
                      </div>
                    </div>
                  </div>

                  {/* System Specs Grid */}
                  <div className="mb-8 md:mb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <div className="text-sm md:text-xs font-medium text-gray-500 uppercase tracking-wider opacity-70 mb-2">
                          Scenario
                        </div>
                        <div className="text-sm md:text-base text-gray-900 font-normal leading-relaxed">
                          Designing for emotional arcs & belonging over coverage.
                        </div>
                      </div>
                      <div>
                        <div className="text-sm md:text-xs font-medium text-gray-500 uppercase tracking-wider opacity-70 mb-2">
                          Key Constraint
                        </div>
                        <div className="text-sm md:text-base text-gray-900 font-normal leading-relaxed">
                          No maps or schedules in the initial experience.
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="order-2 lg:order-2 mt-12 md:mt-16 lg:mt-0 flex items-center justify-center lg:justify-start"
                >
                  <NarrativeDiagram />
                </motion.div>
              </div>
            </div>
          </div>
        )}
        {(isOtherProject || (!isSpontaneousTravelCompanion && !isCulturalContextEngine && !isTravelPlanningAssistant && !isLocalExperienceFinder && !isSocialOpportunityMatching && !isNarrativeTravelGenerator && !isOtherProject)) && (
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  {project?.title || "Project Title"}
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                  {project?.tagline || "Project description"}
                </p>
              </motion.div>
            </div>
          </div>
        )}
        
        {/* Subtle Divider */}
        <div className="border-b border-gray-100 mt-16 md:mt-20 lg:mt-24"></div>
      </section>

      {/* Why Social Connection Matters in Travel Section - Only for local-experience-finder */}
      {isLocalExperienceFinder && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  Why Social Connection Matters in Travel
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  The impact extends beyond individual travelers—it requires systemic solutions that balance connection with privacy
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl border-2 border-cyan-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Impact for Travelers
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Meaningful social connections lead to <span className="font-semibold text-cyan-700">richer travel experiences and deeper cultural understanding</span>. Travelers can connect with like-minded people while maintaining <span className="font-semibold text-cyan-700">full control over their privacy and visibility</span>.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border-2 border-emerald-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Impact for Communities
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    When travelers connect authentically, local communities benefit from <span className="font-semibold text-emerald-700">more meaningful cultural exchange</span>. Identity-based discovery creates connections that respect both traveler privacy and local community values.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Conditional Content: Full content for spontaneous-travel-companion, template for others */}
      {isSpontaneousTravelCompanion && (
  <>
    {/* Systemic Travel Discovery Failures Section */}
    <section id="design-exploration" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Systemic Travel Discovery Failures
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Pattern-level breakdowns in how discovery platforms operate.
            </p>
          </div>

          {/* New Scannable Systems Table */}
          <div className="overflow-hidden border border-gray-200 rounded-2xl shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100/50 border-b border-gray-200">
                    <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 w-1/3">Failure Pattern</th>
                    <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500">The Systemic Gap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-5 align-top">
                      <span className="block font-bold text-gray-900">Simulated Spontaneity</span>
                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">Popularity Bias</span>
                    </td>
                    <td className="p-5 text-gray-600 leading-relaxed text-sm md:text-base">
                      Recommendation systems favor frequently-booked experiences over <strong className="text-gray-900 font-semibold">situational relevance</strong>, creating predictable loops.
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-5 align-top">
                      <span className="block font-bold text-gray-900">Cultural Echo Chambers</span>
                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">Homogenization</span>
                    </td>
                    <td className="p-5 text-gray-600 leading-relaxed text-sm md:text-base">
                      Filter bubbles overemphasize past interactions, limiting exposure to <strong className="text-gray-900 font-semibold">diverse, authentic destinations</strong>.
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-5 align-top">
                      <span className="block font-bold text-gray-900">Static Data Models</span>
                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">Temporal Neglect</span>
                    </td>
                    <td className="p-5 text-gray-600 leading-relaxed text-sm md:text-base">
                      Reliance on fixed user profiles ignores <strong className="text-gray-900 font-semibold">dynamic triggers</strong> like weather, transit, and immediate availability.
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-5 align-top">
                      <span className="block font-bold text-gray-900">The Paradox of Choice</span>
                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">Cognitive Load</span>
                    </td>
                    <td className="p-5 text-gray-600 leading-relaxed text-sm md:text-base">
                      Excessive options without contextual filtering lead to <strong className="text-gray-900 font-semibold">decision fatigue</strong> in time-sensitive moments.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-6 text-[10px] text-gray-400 text-center uppercase tracking-[0.2em]">
            Sources: Frontiers in Big Data (2023) • Microsoft Research (2021) • MDPI (2023)
          </p>

          <div className="mt-12 text-center border-t border-gray-200 pt-10">
          <p className="text-gray-900 font-semibold text-lg md:text-xl leading-[1.6] max-w-2xl mx-auto italic [text-wrap:pretty]">
            "These failures emerge from static, popularity-driven systems operating in {"dynamic,\u00A0time-sensitive\u00A0environments."}
          </p>
          </div>
        </motion.div>
      </div>
    </section>
  </>
)}

          {/* Why Spontaneity Is a Systems Problem Section */}
          <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Why Spontaneity Is a Systems Problem
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    The impact extends beyond individual travelers—it requires a systemic approach that balances traveler needs with community benefits
                    </p>
                  </div>
                  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  {/* Impact for Travelers */}
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl border-2 border-cyan-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 flex-shrink-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Impact for Travelers
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Spontaneous travel leads to <span className="font-semibold text-cyan-700">deeper connections with places and people</span>. It reduces the pressure of rigid planning and opens space for <span className="font-semibold text-cyan-700">unexpected moments that become the most memorable parts of a journey</span>.
                    </p>
                  </div>
                  
                  {/* Impact for Local Communities */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border-2 border-emerald-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 flex-shrink-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Impact for Local Communities
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      When travelers explore beyond predictable routes, local businesses and communities benefit. Tourism becomes more distributed, creating opportunities for <span className="font-semibold text-emerald-700">authentic cultural exchange and economic growth</span>.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* System Overview Section */}
          <section id="system-overview" className="py-20 md:py-32 bg-zinc-950 relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-zinc-950 to-violet-950/20 pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
              >
                <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.1] [text-wrap:balance]">
                  System Overview: <br className="hidden sm:block" /> How the {"Spontaneity\u00A0Engine\u00A0Works"}
                </h2>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto text-balance">
                    Conceptual system diagram
                    </p>
                  </div>
                
                {/* Diagram Container */}
                <div className="relative">
                  {/* Main Grid Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
                    
                    {/* Left Column - Inputs */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-indigo-400 text-center lg:text-left mb-6">
                        Contextual Awareness
                      </h3>
                      
                      {/* Input Cards */}
                      {[
                        { icon: FaMapMarkerAlt, label: 'Real-time Location', desc: 'Where the traveler is' },
                        { icon: FaClock, label: 'Temporal Context', desc: 'Current time & weather' },
                        { icon: FaHeartbeat, label: 'User Behavior', desc: 'Historical preferences' },
                      ].map((input, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, x: 5 }}
                          className="group relative"
                        >
                          {/* Connection line to core */}
                          <div className="hidden lg:block absolute right-0 top-1/2 w-full h-0.5 bg-gradient-to-r from-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1/2" />
                          
                          {/* Glass card */}
                          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg hover:border-indigo-500/50 transition-all duration-300">
                            {/* Glowing icon */}
                            <div className="flex items-center gap-4 mb-3">
                              <div className="relative">
                                <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
                                <input.icon className="w-6 h-6 text-indigo-400 relative z-10" />
                    </div>
                              <h4 className="text-white font-semibold text-base">{input.label}</h4>
                            </div>
                            <p className="text-gray-400 text-base md:text-sm">{input.desc}</p>
                            
                            {/* Energy particles */}
                            <motion.div
                              className="absolute -right-2 top-1/2 w-2 h-2 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100"
                              animate={{
                                x: [0, 200, 200],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.3,
                              }}
                            />
                      </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Center Column - The Engine Core */}
<div className="flex justify-center my-12 lg:my-0">
  {/* The Outer Wrapper now handles the vertical stacking of labels naturally */}
  <div className="flex flex-col items-center">
    
    {/* Top Label - Now relative/static so it occupies real space */}
    <div className="text-sm md:text-xs text-gray-400 font-medium mb-8">
      Rules & Constraints
    </div>

    {/* SVG Container - overflow-visible prevents clipping of glows or rotated elements */}
    <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-visible">
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 320 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Ring */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '160px 160px', transformBox: 'fill-box' }}
        >
          <circle cx="160" cy="160" r="140" fill="none" stroke="url(#outerGradient)" strokeWidth="2" strokeDasharray="8 4" opacity="0.6" />
        </motion.g>
        
        {/* Middle Ring */}
        <motion.g
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: '160px 160px', transformBox: 'fill-box' }}
        >
          <circle cx="160" cy="160" r="110" fill="none" stroke="url(#middleGradient)" strokeWidth="2.5" opacity="0.9" />
        </motion.g>
        
        {/* Inner Nucleus */}
        <circle cx="160" cy="160" r="60" fill="url(#coreGradient)" opacity="0.9" />
        
        {/* Shimmering Nodes */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 360) / 8;
          const rad = (angle * Math.PI) / 180;
          return (
            <motion.circle
              key={i}
              cx={160 + Math.cos(rad) * 40}
              cy={160 + Math.sin(rad) * 40}
              r="4"
              fill="#a78bfa"
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
              style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
            />
          );
        })}

        <defs>
          <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="middleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="coreGradient">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#6366f1" />
          </radialGradient>
        </defs>
      </svg>
      
      {/* Center Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-sm md:text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1">The</div>
          <div className="text-xl md:text-2xl font-bold text-white">SPONTANEITY AI</div>
          <div className="text-sm md:text-xs font-medium text-violet-300 uppercase tracking-wider mt-1">Engine</div>
        </div>
      </div>

      {/* Internal floating label - positioned INSIDE the box so it won't scroll */}
      <div className="absolute text-[10px] md:text-xs text-gray-400 font-medium whitespace-nowrap z-50 bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded border border-gray-700/50" 
           style={{ top: '22%', left: '22%', transform: 'translate(-50%, -50%) rotate(-45deg)' }}>
        AI Logic
      </div>
    </div>

    {/* Bottom Label - Now relative/static so it occupies real space */}
    <div className="text-sm md:text-xs text-gray-400 font-medium mt-8">
      Context Weighting
    </div>

  </div>
</div>
                    
                    {/* Right Column - Outputs */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-violet-400 text-center lg:text-right mb-6">
                        Frictionless Discovery
                      </h3>
                      
                      {/* Output Cards */}
                      {[
                        { icon: FaBulb, label: 'Smart Suggestions', desc: 'Actionable recommendations' },
                        { icon: FaBrain, label: 'Adaptive Prompts', desc: 'Context-aware guidance' },
                        { icon: FaShareAlt, label: 'Viral Social Triggers', desc: 'Engagement catalysts' },
                      ].map((output, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, x: -5 }}
                          className="group relative"
                        >
                          {/* Connection line from core */}
                          <div className="hidden lg:block absolute left-0 top-1/2 w-full h-0.5 bg-gradient-to-l from-violet-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1/2" />
                          
                          {/* Glass card */}
                          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg hover:border-violet-500/50 transition-all duration-300">
                            {/* Glowing icon */}
                            <div className="flex items-center gap-4 mb-3 lg:flex-row-reverse">
                              <div className="relative">
                                <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full" />
                                <output.icon className="w-6 h-6 text-violet-400 relative z-10" />
                      </div>
                              <h4 className="text-white font-semibold text-base lg:text-right">{output.label}</h4>
                    </div>
                            <p className="text-gray-400 text-base md:text-sm lg:text-right">{output.desc}</p>
                            
                            {/* Energy particles */}
                            <motion.div
                              className="absolute -left-2 top-1/2 w-2 h-2 bg-violet-400 rounded-full opacity-0 group-hover:opacity-100"
                              animate={{
                                x: [0, -200, -200],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.3,
                              }}
                            />
                  </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
{/* The Spontaneity Engine Logic */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="mt-20 pt-12 border-t border-gray-200"
>
  <div className="max-w-4xl mx-auto">
    <div className="text-center mb-10">
      <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600 mb-6">
        System Logic: The Spontaneity Engine
      </h3>

      {/* Interactive Black Box */}
      <div className="bg-slate-900 rounded-3xl p-6 md:p-12 shadow-2xl w-full relative overflow-hidden">
        
        {/* Interaction Affordance Hint */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
              Select variables to inspect logic
            </span>
          </div>
        </div>
        
        {/* Formula Container */}
        <div className="text-white font-light text-2xl md:text-5xl mb-12 tracking-tight flex flex-wrap justify-center items-center gap-2 md:gap-4 select-none">
          <span className="opacity-40">S<sub>score</sub> =</span>
          
          {['w', 'L', 'T', 'B', 'C'].map((key, index) => (
            <span key={key} className="flex items-center gap-2 md:gap-4">
              {/* Operators */}
              {index === 2 || index === 3 ? <span className="text-gray-600 text-xl md:text-3xl">+</span> : null}
              {index === 4 ? <span className="text-gray-600 text-xl md:text-3xl">−</span> : null}
              
              <button 
                type="button"
                onClick={() => setActiveVar(activeVar === key ? null : key)}
                className={`group relative transition-all duration-300 pb-1 border-b-2 min-h-[44px] px-2 flex items-center ${
                  activeVar === key 
                  ? 'text-blue-400 border-blue-400 bg-blue-400/5' 
                  : 'text-white border-dashed border-gray-600 hover:border-blue-400/50 hover:bg-white/5'
                }`}
              >
                {key === 'w' ? <>w<sub>n</sub></> : key === 'C' ? 'ΣC' : `(${key})`}
                
                {/* Visual hint that it's clickable (Active Dot) */}
                {activeVar !== key && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-blue-500/40 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                )}
              </button>
            </span>
          ))}
        </div>

        {/* Dedicated Info Panel */}
        <div className="min-h-[120px] flex items-center justify-center bg-white/[0.03] border border-white/5 rounded-2xl p-6 transition-all duration-300">
          {activeVar ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              key={activeVar}
              className="text-center"
            >
              <div className="inline-block px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-tighter mb-3">
                Variable Parameters
              </div>
              <h4 className="block font-bold mb-1 text-white text-base md:text-xl">
                {variables[activeVar].title}
              </h4>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                {variables[activeVar].desc}
              </p>
            </motion.div>
          ) : (
            <div className="text-center group">
               <svg className="w-5 h-5 text-gray-600 mx-auto mb-2 animate-bounce group-hover:text-blue-500/50 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              <p className="text-gray-500 text-xs md:text-sm font-medium tracking-wide">
                Interactive logic engine: Tap parameters above
              </p>
            </div>
          )}
        </div>

        {/* Legend Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 text-left border-t border-white/10 pt-8 mt-10 opacity-40">
          <div className="space-y-1">
            <span className="text-blue-400 font-bold text-[10px] uppercase tracking-widest">Input Layer</span>
            <p className="text-gray-400 text-xs italic">Environmental telemetry</p>
          </div>
          <div className="space-y-1 text-center">
            <span className="text-blue-400 font-bold text-[10px] uppercase tracking-widest">Logic Layer</span>
            <p className="text-gray-400 text-xs italic">Inference engine</p>
          </div>
          <div className="space-y-1 text-right">
            <span className="text-blue-400 font-bold text-[10px] uppercase tracking-widest">Filter Layer</span>
            <p className="text-gray-400 text-xs italic">Constraint exclusion</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Video Section */}
          {isSpontaneousTravelCompanion && (
            <section className="relative w-full overflow-hidden py-0" aria-label="Video Background">
              <div className={`relative w-full ${isMobile ? 'h-full' : ''}`} style={{ ...(!isMobile ? { aspectRatio: '16/9' } : {}), backgroundColor: 'white' }}>
                {/* Fallback Image - Always loaded first for instant display */}
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: showFallbackImage || (isVideoError || isMobileVideoError) ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Image
                    src={normalizeImagePath("/portfolio/images/ai-travel-hero.svg")}
                    alt="AI Sandbox - Creative technology playground with abstract digital elements and neural network patterns representing AI innovation and travel technology"
                    fill
                    className="object-cover opacity-50"
                    priority
                    quality={10}
                  />
                </motion.div>

                {/* Loading Overlay */}
                <AnimatePresence>
                  {(!isVideoReady && !isMobile && !isVideoError) || (!isMobileVideoLoaded && isMobile && !isMobileVideoError) ? (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute inset-0 bg-black z-20 flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-center"
                      >
                        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4 mx-auto"></div>
                        <p className="text-white/70 text-base md:text-sm">Loading video...</p>
                      </motion.div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {/* Desktop Video Container (Vimeo iframe) */}
                {!isMobile && !isVideoError && (
                  <motion.div
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVideoReady ? 1 : 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  >
                    {isVideoLoaded && (
                      <iframe
                        title="vimeo-player"
                        src="https://player.vimeo.com/video/1096119218?h=92fa54736f&autoplay=1&muted=1&background=1"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0"
                        onError={() => {
                          setIsVideoError(true);
                          setShowFallbackImage(true);
                        }}
                      />
                    )}
                  </motion.div>
                )}

                {/* Mobile Video Container (Local video) */}
                {isMobile && !isMobileVideoError && (
                  <motion.div
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isMobileVideoLoaded ? 1 : 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  >
                    {isMobileVideoLoaded && (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={() => {
                          setIsMobileVideoError(true);
                          setShowFallbackImage(true);
                        }}
                        onLoadStart={() => {
                          // Reset error state when video starts loading
                          setIsMobileVideoError(false);
                        }}
                      >
                        <source src="/portfolio/videos/Create_a_cinematic_web.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </motion.div>
                )}
                
                {/* Gradient Overlay - single div, overlays exactly over the video */}
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
                  {/* Extended top gradient - fades from white background */}
                  <div 
                    className="absolute inset-x-0 top-0 h-80" 
                    style={{
                      background: 'linear-gradient(to bottom, white 0%, rgba(255, 255, 255, 0.98) 20%, rgba(255, 255, 255, 0.95) 35%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.70) 65%, rgba(255, 255, 255, 0.50) 78%, rgba(255, 255, 255, 0.30) 88%, rgba(255, 255, 255, 0.15) 94%, rgba(255, 255, 255, 0.05) 98%, rgba(255, 255, 255, 0) 100%)'
                    }}
                  />
                  {/* Center radial gradient */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/60 to-black/80" />
                  {/* Bottom white gradient - fades to white page background */}
                  <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-white via-white/50 via-black/25 to-black/50" />
                </div>

                {/* Quote Overlay - Left Aligned */}
                <div className="absolute inset-0 z-30 flex items-center pointer-events-none">
                  <div className="container mx-auto px-6 md:px-12">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      className="max-w-[30vw]"
                    >
                      <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-white italic leading-relaxed mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        "A good traveler has no fixed plans and is not intent on arriving."
                      </blockquote>
                      <p className="text-base md:text-lg text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                        — Lao Tzu
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
          )}

{/* Behavioral & Environmental Constraints */}
<section className="py-24 bg-white">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Systemic Constraints</h2>
        <p className="text-gray-700 text-lg leading-relaxed [text-wrap:pretty]">
        The engine’s architecture is a direct response to the friction of live travel. 
        I translated these behavioral realities into core {"system\u00A0requirements."}
      </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
        {/* Constraint 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h4 className="font-bold uppercase tracking-widest text-[11px]">Time Sensitivity</h4>
          </div>
          <h3 className="text-xl font-bold text-gray-900 leading-tight">Decisions in Minutes, not Hours</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            <span className="text-gray-900 font-medium italic">Requirement:</span> Low-latency, actionable output. The system prioritizes "Activation" over "Browsing" to beat real-time availability decay.
          </p>
        </div>

        {/* Constraint 2 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            <h4 className="font-bold uppercase tracking-widest text-[11px]">Cognitive Load</h4>
          </div>
          <h3 className="text-xl font-bold text-gray-900 leading-tight">Filtering by Intelligence</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            <span className="text-gray-900 font-medium italic">Requirement:</span> Information suppression. To prevent decision fatigue in unfamiliar settings, the system aggressively narrows the option space.
          </p>
        </div>

        {/* Constraint 3 */}
        <div className="space-y-3">
        <div className="flex items-center gap-3 text-blue-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h4 className="font-bold uppercase tracking-widest text-[11px]">Social Risk</h4>
        </div>
          <h3 className="text-xl font-bold text-gray-900 leading-tight">Reputational Safeguards</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            <span className="text-gray-900 font-medium italic">Requirement:</span> Social context awareness. Recommendations are weighted by social safety and implicit trust markers to reduce public friction.
          </p>
        </div>

        {/* Constraint 4 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <h4 className="font-bold uppercase tracking-widest text-[11px]">Trust & Safety</h4>
          </div>
          <h3 className="text-xl font-bold text-gray-900 leading-tight">Credibility Over Novelty</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            <span className="text-gray-900 font-medium italic">Requirement:</span> Immediate legitimacy signaling. Safety concerns override novelty, requiring fast, explicit validation markers for "unknown" gems.
          </p>
        </div>
      </div>
    </motion.div>
  </div>
</section>

 {/* Concept & Strategy Section */}
<section id="designs-strategy" className="py-20 bg-white overflow-x-hidden">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-4xl mx-auto w-full"
    >
      <div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6 max-w-4xl mx-auto leading-[1.1]">
            Concept & Strategy
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
          This system is built for real-world chaos, not idealized travel behavior. I translated behavioral constraints into <span className="text-black font-semibold underline decoration-amber-400/50">core system requirements</span>.
        </p>
      </div>
      
      <div className="space-y-4 w-full">

        {/* 1. Intelligence required? */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300">
          <button
            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors focus:outline-none"
            onClick={() => setActiveAccordion(activeAccordion === 'philosophy' ? null : 'philosophy')}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 text-xs font-bold shrink-0">01</div>
              <h3 className="text-lg font-bold text-gray-900">Required Intelligence</h3>
            </div>
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <motion.svg 
                animate={{ rotate: activeAccordion === 'philosophy' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </div>
          </button>
          
          <AnimatePresence>
            {activeAccordion === 'philosophy' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden bg-white border-t border-gray-100"
              >
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Signal Filtering", desc: "Isolating high-value opportunities from GPS and movement noise." },
                    { title: "Context Mapping", desc: "Converting environmental cues into actionable user suggestions." },
                    { title: "Timing Sensitivity", desc: "Recognizing decision windows based on proximity and weather." },
                    { title: "Cognitive Load", desc: "Curating options to prioritize immediate relevance over breadth." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                      <div>
                        <h5 className="text-sm font-bold text-gray-900">{item.title}</h5>
                        <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. System Constraints */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300">
          <button
            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors focus:outline-none"
            onClick={() => setActiveAccordion(activeAccordion === 'ux' ? null : 'ux')}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold shrink-0">02</div>
              <h3 className="text-lg font-bold text-gray-900">Systemic Constraints</h3>
            </div>
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <motion.svg 
                animate={{ rotate: activeAccordion === 'ux' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </div>
          </button>
          
          <AnimatePresence>
            {activeAccordion === 'ux' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden bg-white border-t border-gray-100"
              >
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Limited Attention", desc: "Optimized for minimal screen-time in high-stimulus settings." },
                    { title: "Offline-First", desc: "Designed for unreliable networks via local storage and SQLite." },
                    { title: "Physical Safety", desc: "Interaction patterns that prioritize situational awareness." },
                    { title: "Resource Limits", desc: "Minimizing background sync to preserve device battery life." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                      <div>
                        <h5 className="text-sm font-bold text-gray-900">{item.title}</h5>
                        <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. Strategic Trade-offs */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300">
          <button
            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors focus:outline-none"
            onClick={() => setActiveAccordion(activeAccordion === 'ai' ? null : 'ai')}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold shrink-0">03</div>
              <h3 className="text-lg font-bold text-gray-900">Strategic Trade-offs</h3>
            </div>
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <motion.svg 
                animate={{ rotate: activeAccordion === 'ai' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </div>
          </button>
          
          <AnimatePresence>
            {activeAccordion === 'ai' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden bg-white border-t border-gray-100"
              >
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  {[
                    { choice: "On-Device Inference", over: "Cloud Intelligence", detail: "Prioritizes CoreML for offline autonomy over complex LLM latency." },
                    { choice: "Timely Relevance", over: "Exhaustive Coverage", detail: "Focuses on 'now' rather than being a comprehensive travel wiki." },
                    { choice: "Reactivity", over: "Behavioral Prediction", detail: "Uses real-time cues to avoid over-personalization bubbles." },
                    { choice: "Local Storage", over: "Real-time Sync", detail: "Accepts opportunistic sync to guarantee offline stability." }
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter">
                        <span className="text-emerald-600">{item.choice}</span>
                        <span className="text-gray-300">over</span>
                        <span className="text-gray-400">{item.over}</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-tight">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4. Anti-Goals (System Avoidance) */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300">
          <button
            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors focus:outline-none"
            onClick={() => setActiveAccordion(activeAccordion === 'avoid' ? null : 'avoid')}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-700 text-xs font-bold shrink-0">04</div>
              <h3 className="text-lg font-bold text-gray-900">Deliberate Anti-Goals</h3>
            </div>
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <motion.svg 
                animate={{ rotate: activeAccordion === 'avoid' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </div>
          </button>
          
          <AnimatePresence>
            {activeAccordion === 'avoid' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden bg-white border-t border-gray-100"
              >
                <div className="p-6 flex flex-wrap gap-3">
                  {['Not a Trip Planner', 'Not a Social Network', 'Not a Feed', 'Not a Dashboard', 'Not Predictive'].map((goal) => (
                    <span key={goal} className="px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wide flex items-center gap-2">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      {goal}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  </div>
</section>

{/* Wireframes Section */}
<section id="wireframes-ui" className="py-20 bg-[#0a0a0a] overflow-x-hidden">
  <div className="container mx-auto px-6">
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6 max-w-4xl mx-auto leading-[1.1]">
      Designing for Activation,<br></br>Not Planning
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed [text-wrap:balance]">
        By engineering moments of action directly into the logic layer, we ensure that the interface serves as a direct-drive mechanism for user intent—where every interaction is an outcome, not an item on a list.
        </p>
      </div>

      {/* Grid Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >

      </motion.div>

      {/* Iteration Gallery */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <div className="text-center mb-8">
          <p className="text-gray-400 text-base md:text-sm max-w-2xl mx-auto">
            Iteration explored activation thresholds and constraint testing using Figma and UX Pilot.
          </p>
        </div>

        <div className="mb-4">
          
          {/* Main Scroll Container */}
          <div 
            ref={wireframeScrollRef} // Isolated Ref
            onScroll={handleWireframeScroll}
            className="flex gap-4 overflow-x-auto pb-6 touch-pan-x snap-x snap-mandatory no-scrollbar md:justify-center px-4"
          >
            {[
              "/images/TravelApp-UXpilot_Homescreen-WireFrame-2.png",
              "/images/TravelApp-UXpilot_Homescreen-WireFrame.png",
              "/images/TravelApp-UXpilot_Homescreen-WireFrame-5.png",
              "/images/TravelApp-UXpilot_Homescreen-WireFrame-4.png",
              "/images/TravelApp-UXpilot_Homescreen-WireFrame-3.png"
            ].map((src, idx) => (
              <div key={idx} className="flex-shrink-0 w-48 snap-center">
                <div className="relative aspect-[9/19.5] rounded-xl overflow-hidden shadow-lg border border-white/5 bg-neutral-900">
                  <img src={src} alt="Wireframe iteration" className="object-cover w-full h-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center items-center gap-2.5 mt-4 md:hidden">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  wireframeActiveIndex === i // Isolated State
                    ? "w-6 bg-blue-600" 
                    : "w-1.5 bg-neutral-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Final Mockups */}
        <div className="mt-12">
          <div className="flex justify-center gap-8 flex-wrap px-4">
            <div className="w-64 md:w-72">
              <div className="relative aspect-[9/19.5] rounded-xl overflow-hidden shadow-xl border border-white/10 bg-neutral-900">
                <img src="/images/HomeScreen-UX-Pilot-Recco-2.png" alt="Final UI" className="object-cover w-full h-full" />
              </div>
            </div>
            <div className="w-64 md:w-72">
              <div className="relative aspect-[9/19.5] rounded-xl overflow-hidden shadow-xl border border-white/10 bg-neutral-900">
                <img src="/images/HomeScreen-UX-Pilot-Recco.png" alt="Final UI" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </div>
</section>

          {/* Build & Iteration Section */}
          <section id="prototyping-ai" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                {/* Enhanced Header */}
                <div className="text-center mb-20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                      Builds & Iterations
                  </h2>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full w-fit whitespace-nowrap">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse shrink-0"></div>
                  <p className="text-amber-300 text-base md:text-sm font-medium">
                    Work In Progress
                  </p>
                </div>
                  </motion.div>
                </div>

                {/* System Build Approach */}
                <div className="mb-16">
                  
                  {/* Enhanced AI Workflow Process Diagram */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="mb-20"
                >
                  <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-8">
                      <p className="text-gray-400 text-base md:text-sm max-w-3xl mx-auto leading-relaxed">
                        The workflow diagram below shows how responsibilities are separated.
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center gap-6">
                      
                      {/* Top Row: AI Models */}
                      <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
                        {/* ChatGPT Step */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl hover:bg-white/15 hover:border-green-400/30 transition-all duration-300 group w-full max-w-[280px]">
                          <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-300 transition-colors">ChatGPT</h3>
                              <p className="text-base md:text-sm text-gray-400">Writing Prompts</p>
                            </div>
                          </div>
                        </div>

                        {/* Google Gemini Step */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl hover:bg-white/15 hover:border-indigo-400/30 transition-all duration-300 group w-full max-w-[280px]">
                          <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 22C12 22 12 17 10 15C8 13 3 13 3 13C3 13 8 13 10 11C12 9 12 4 12 4C12 4 12 9 14 11C16 13 21 13 21 13C21 13 16 13 14 15C12 17 12 22 12 22Z" />
                                <path d="M19 9C19 9 19 7 18.2 6.2C17.4 5.4 15.4 5.4 15.4 5.4C15.4 5.4 17.4 5.4 18.2 4.6C19 3.8 19 1.8 19 1.8C19 1.8 19 3.8 19.8 4.6C20.6 5.4 22.6 5.4 22.6 5.4C22.6 5.4 20.6 5.4 19.8 6.2C19 7 19 9 19 9Z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">Gemini</h3>
                              <p className="text-base md:text-sm text-gray-400">Logic & Analysis</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Arrow 1 - Down */}
                      <div className="flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>

                      {/* Cursor Step - Middle */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl hover:bg-white/15 hover:border-blue-400/30 transition-all duration-300 group w-full max-w-[280px]">
                        <div className="flex flex-col items-center text-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">Cursor</h3>
                            <p className="text-sm text-gray-400">AI-assisted Code</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Arrow 2 - Down */}
                      <div className="flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>

                      {/* Bottom Row: iOS, API Plugin, Widget */}
                      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full">
                        {/* Xcode Step */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl hover:bg-white/15 hover:border-purple-400/30 transition-all duration-300 group flex-1 max-w-[240px] w-full">
                          <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v1h12v-1l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z"/>
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">Xcode</h3>
                              <p className="text-base md:text-sm text-gray-400">Real iOS Build</p>
                            </div>
                          </div>
                        </div>

                        {/* API Plugin Step */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl hover:bg-white/15 hover:border-amber-400/30 transition-all duration-300 group flex-1 max-w-[240px] w-full">
                          <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">API Plugin</h3>
                              <p className="text-base md:text-sm text-gray-400">Industry Integration</p>
                            </div>
                          </div>
                        </div>

                        {/* Widget Step */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl hover:bg-white/15 hover:border-cyan-400/30 transition-all duration-300 group flex-1 max-w-[240px] w-full">
                          <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">Widget</h3>
                              <p className="text-base md:text-sm text-gray-400">Client-facing</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>


{/* System Architecture & Integration Section */}
<div className="max-w-4xl mx-auto"> 
  {/* 1. Added 'items-stretch' to force both columns to the same height on desktop.
      2. Keep gap-8 for the vertical stack on mobile.
  */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-16">
    
    {/* Column 1: System Ownership */}
    {/* Added 'h-full' to ensure the background fills the grid cell height */}
    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 block h-full touch-none">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="block h-full"
      >
        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          System Ownership
        </h3>
        
        <div className="space-y-8 text-gray-300">
          <div className="group">
            {/* 400-level emerald is excellent for black; it glows without being blurry */}
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold block mb-2">
              Production Ready
            </span>
            <p className="text-sm leading-relaxed text-gray-200 [text-wrap:pretty]">
              <strong className="text-white">On-Device Processing:</strong> iOS SwiftUI app using Realm for offline-first persistence. Context logic stays on the hardware to ensure {"zero-latency\u00A0responses."}
            </p>
          </div>

          <div className="group">
            {/* Amber-400 provides high visibility and warmth against black */}
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 font-bold block mb-2">
              Operational Beta
            </span>
            <p className="text-sm leading-relaxed text-gray-200 [text-wrap:pretty]">
              <strong className="text-white">Sync Gateway:</strong> Opportunistic background syncing that respects battery life and data constraints while maintaining {"state\u00A0consistency."}
            </p>
          </div>

          <div className="group">
            {/* Switched to gray-400 for the label to ensure it doesn't disappear */}
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 font-bold block mb-2">
              Simulated/Stubbed
            </span>
            <p className="text-sm leading-relaxed text-gray-200 [text-wrap:pretty]">
              <strong className="text-white">Inference Engine:</strong> Utilizing lightweight on-device models; cloud LLMs are currently stubbed for rapid testing of {"recommendation\u00A0thresholds."}
            </p>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Column 2: Integration Logic */}
    {/* Added 'h-full' here as well to match the emerald column */}
    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 block h-full touch-none">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="block h-full"
      >
        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          Integration Points
        </h3>
        
        <div className="space-y-8 text-gray-400">
        <div className="space-y-8">
  <div>
    <h4 className="text-white font-semibold mb-2">Data & Persistence</h4>
    <p className="text-sm leading-relaxed text-gray-200 [text-wrap:pretty]">
      Orchestrating Firebase/Supabase for cloud state. The system manages conflict 
      resolution locally to prevent UI "jank" during intermittent connectivity logic.
    </p>
  </div>
  
  <div>
    <h4 className="text-white font-semibold mb-2">AI Intelligence Layer</h4>
    <p className="text-sm leading-relaxed text-gray-200 [text-wrap:pretty]">
      Owning the prompt engineering and context-weighting logic. We use OpenAI/LangChain 
      for heavy lifting, but the system filters responses to ensure contextual protocols.
    </p>
  </div>
  
  <div>
    <h4 className="text-white font-semibold mb-2">Extensibility</h4>
    <p className="text-sm leading-relaxed text-gray-200 [text-wrap:pretty]">
      Architected for widget and API plugins. The interface is designed to be "headless," 
      allowing future integrations without breaking the core architecture.
    </p>
  </div>
</div>
        </div>
      </motion.div>
    </div>
  </div>
</div>
                
                {/* Build Evidence Screenshots */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-16"
                >
                  <div className="relative max-w-4xl mx-auto mb-8">
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                      <Image
                        src={normalizeImagePath("/portfolio/images/xcode-screenshot.jpg")}
                        alt="Evidence of real iOS build iteration under constraint"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        priority={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                  
                  <div className="relative max-w-4xl mx-auto">
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                      <Image
                        src={normalizeImagePath("/portfolio/images/n8n_travelAgent-1.png")}
                        alt="Validation artifact showing workflow iteration"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 896px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </motion.div>
                </div>

      

 {/* Iteration Loop */}
<div className="max-w-4xl mx-auto mb-16 mt-20">
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
  {[
    {
      step: "01. Define",
      title: "Prompt → Logic",
      desc: "Translating behavioral constraints into AI requirements. Design intent directly shapes logic gates and context weighting.",
      color: "text-amber-400"
    },
    {
      step: "02. Synthesize",
      title: "Code → Deployment",
      desc: "Moving from simulation to Swift. Implementing CoreML and SQLite to test how data behaves in an offline-first environment.",
      color: "text-blue-400"
    },
    {
      step: "03. Validate",
      title: "Device → Reality",
      desc: "Testing on physical hardware to observe battery drain, network jitter, and real-world activation thresholds.",
      color: "text-emerald-400"
    }
  ].map((item, idx) => (
    /* 1. STATIC WRAPPER: Matches the working 'System Ownership' block exactly.
       No animation on this div ensures the grid and borders never 'wiggle'. 
    */
    <div 
      key={idx} 
      className="bg-white/5 p-8 rounded-2xl border border-white/10 block h-full touch-none"
    >
      {/* 2. INTERNAL ANIMATION: Moves the text independently of the container. */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: idx * 0.1 }}
        className="block h-full"
      >
        <span className={`font-mono text-[10px] uppercase tracking-[0.2em] font-bold ${item.color} block mb-2`}>
          {item.step}
        </span>
        <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
        <p className="text-gray-400 text-sm leading-relaxed">
          {item.desc}
        </p>
      </motion.div>
    </div>
  ))}
</div>


 {/* Mobile Build Iterations */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="mt-12 overflow-hidden"
>
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-8 px-6">
      <p className="text-gray-500 text-base md:text-sm max-w-2xl mx-auto">
        Screenshots document real builds across iteration cycles.
      </p>
    </div>

      {/* Main Scroll Container */}
      <div 
        ref={buildsScrollRef}
        onScroll={handleBuildsScroll}
        className="flex gap-4 overflow-x-auto pb-6 touch-pan-x snap-x snap-mandatory no-scrollbar md:justify-center px-4"
      >
        {[
          { src: "/images/mobile-screenshots/simulator-2025-10-01-15-38-09.webp", alt: "Oct 1" },
          { src: "/images/mobile-screenshots/simulator-2025-10-03-22-43-11.webp", alt: "Oct 3" },
          { src: "/images/mobile-screenshots/simulator-2025-10-04-13-04-38.webp", alt: "Oct 4" },
          { src: "/images/mobile-screenshots/simulator-2025-10-05-09-44-52-2.webp", alt: "Oct 5" },
          { src: "/images/mobile-screenshots/simulator-2025-10-07-22-01-21.webp", alt: "Oct 7" },
          { src: "/images/mobile-screenshots/simulator-2025-09-29-16-25-52.webp", alt: "Sept 29" },
        ].map((item, idx) => (
          /* flex-shrink-0 is the key to preventing image "squishing" */
          <div key={idx} className="flex-shrink-0 w-64 md:w-48 snap-center">
            <div className="relative aspect-[9/19.5] rounded-xl overflow-hidden shadow-lg border border-white/10 bg-neutral-900">
              <img 
                src={item.src} 
                alt={`Build iteration - ${item.alt}`} 
                className="object-cover w-full h-full" 
              />
            </div>
          </div>
        ))}
        
        {/* Optional: Spacer for better end-of-list padding on mobile */}
        <div className="flex-shrink-0 w-4 md:hidden" aria-hidden="true" />
      </div>

 {/* Dot Indicators using buildsActiveIndex */}
<div className="flex justify-center items-center gap-2.5 mt-4 md:hidden">
  {[0, 1, 2, 3, 4, 5].map((i) => (
    <div
      key={i}
      className={`h-1.5 rounded-full transition-all duration-300 ${
        /* FIX: Change wireframeActiveIndex to buildsActiveIndex */
        buildsActiveIndex === i 
          ? "w-6 bg-blue-600" 
          : "w-1.5 bg-neutral-700"
      }`}
    />
  ))}
</div>

</div>
</motion.div>

</div>


<div className="max-w-4xl mx-auto mb-16 mt-20">
 {/* 2x2 Grid - Tightened Vertical Spacing */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">
  {[
    {
      label: "Data Integrity",
      title: "Offline Sync Conflicts",
      desc: "Rapid context switching under intermittent connectivity can produce edge-case conflicts. Current resolution logic handles 80% of common cases; deep-state resolution is in active development.",
    },
    {
      label: "Intelligence",
      title: "Confidence Thresholds",
      desc: "On-device ML models are still being tuned. We currently use a high-pass filter to prevent 'hallucinated' suggestions, which can sometimes result in conservative system responsiveness.",
    },
    {
      label: "Hardware",
      title: "Battery Trade-offs",
      desc: "Background processing is throttled to preserve device longevity. The system prioritizes reactive responsiveness over continuous monitoring to avoid significant power drain.",
    },
    {
      label: "Scale",
      title: "Social Graph Depth",
      desc: "Early builds operate on shallow interaction data. Recommendations are currently weighted toward immediate physical proximity rather than long-term behavioral patterns.",
    }
  ].map((item, idx) => (
    /* STATIC WRAPPER: Matches your working wiggle-free blocks exactly */
    <div 
      key={idx} 
      className="bg-white/5 p-8 rounded-2xl border border-white/10 block h-full touch-none"
    >
      {/* INTERNAL ANIMATION: Text translates within the static padding */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: idx * 0.1 }}
        className="block h-full"
      >
        <span className="text-[12px] font-bold uppercase tracking-wider text-indigo-400 block mb-3">
          {item.label}
        </span>
        <h4 className="text-xl font-bold text-white mb-3">
          {item.title}
        </h4>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          {item.desc}
        </p>
      </motion.div>
    </div>
  ))}
  </div>

  {/* Architecture Status Note */}
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="p-6 bg-indigo-500/10 border border-indigo-500/30 rounded-xl"
  >
    <p className="text-indigo-200 text-sm md:text-base leading-relaxed text-center font-medium">
      <span className="uppercase tracking-widest text-[11px] bg-indigo-500/30 px-2 py-0.5 rounded mr-2 border border-indigo-400/20">
        Architecture Status
      </span>
      Currently stress-testing the system to get it ready for beta. The focus right now is on hardening the API and plugin logic.
    </p>
  </motion.div>
</div>

  </motion.div>
    </div>
</section>

  {/* Live Demo Section */}
<section id="live-demo" className="py-20 bg-white scroll-mt-24">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Functional System Prototype
        </h2>
        <p className="text-gray-600 text-lg">
        This is an active production build, not a static concept mock.
        </p>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-8 md:p-10 border border-gray-200">
        {/* Demo Link */}
        <div className="text-center">
          <a
            href="https://spontaneity-engine.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 min-h-[48px] text-center"
            aria-label="View Live Demo"
          >
            Explore Active Build
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  </div>
</section>

          {/* Launch & Testing Section */}
          <section id="outcomes-launch" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Launch & Testing
                  </h2>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4 text-white">Launch Strategy</h3>
                    <p className="text-gray-300 mb-4">
                      Initial testing will be conducted through a limited closed beta designed to observe system behavior across varied travel contexts and connectivity conditions.
                    </p>
                    <p className="text-gray-300">
                      The primary goal is to validate system reliability, context accuracy, and failure handling in live conditions.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

{/* Learnings & Reflections Section */}
<section id="learnings-next" className="py-24 bg-white border-t border-gray-100">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Refining System Intuition
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Prototyping in live travel environments shifted the project from "adding features" to "managing constraints." These principles now drive the system architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Principle 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-blue-600"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Principle 01</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Restraint is Intelligence</h3>
          <p className="text-gray-600 leading-relaxed">
            The system creates more value by <strong className="text-gray-900 font-semibold">suppressing irrelevant data</strong> than by exposing it. High-quality discovery requires the AI to act as a high-pass filter, ensuring only "activation-ready" signals reach the user.
          </p>
        </div>

        {/* Principle 2 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-blue-600"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Principle 02</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Graceful Degradation</h3>
          <p className="text-gray-600 leading-relaxed">
            AI trust is fragile and easily lost when connectivity drops. My <strong className="text-gray-900 font-semibold">offline-first logic</strong> ensures the system simplifies its reasoning rather than failing silently, maintaining utility in low-signal environments.
          </p>
        </div>

        {/* Principle 3 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-blue-600"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Principle 03</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Context &gt; Content</h3>
          <p className="text-gray-600 leading-relaxed">
            A "perfect" recommendation delivered at the wrong moment is a system failure. We prioritize <strong className="text-gray-900 font-semibold">temporal and physical proximity</strong> over absolute content quality to reduce the friction between "seeing" and "doing."
          </p>
        </div>

        {/* Principle 4 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-blue-600"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Principle 04</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Transparency vs. Simplicity</h3>
          <p className="text-gray-600 leading-relaxed">
            Users accept data-sharing when the value exchange is immediate. The system must balance <strong className="text-gray-900 font-semibold">explainable AI</strong> with a low-noise UI, revealing the "why" only when it aids the decision-making process.
          </p>
        </div>
      </div>

      {/* Final "Closing Argument" Callout */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center"
      >
        <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4 text-slate-900">Project Thesis</p>
        <blockquote className="text-2xl font-light text-gray-900 italic">
          "The goal is not to help travelers plan better, but to build a system that makes planning unnecessary."
        </blockquote>
      </motion.div>
    </motion.div>
  </div>
</section>

          {/* Future System Extensions */}
<section id="roadmap" className="py-24 bg-slate-50">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Future Extensions</h2>
        <p className="text-gray-600 text-lg">
          The engine is architected as a modular core, designed to ingest evolving intelligence layers via a decoupled API strategy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Module 1 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <h4 className="font-bold text-gray-900 mb-2">Social Ingestion</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            API-consumable layers for group behavior patterns and shared proximity signals.
          </p>
        </div>

        {/* Module 2 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h4 className="font-bold text-gray-900 mb-2">Longitudinal ML</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Cross-session preference modeling that builds patterns without explicit user input.
          </p>
        </div>

        {/* Module 3 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h4 className="font-bold text-gray-900 mb-2">Environmental APIs</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Real-time venue capacity and "energy levels" as secondary context weightings.
          </p>
        </div>
      </div>

      {/* Market Alignment Footer */}
      <div className="mt-16 pt-8 border-t border-gray-200 flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
        <span className="flex items-center gap-2">Gartner: Embedded AI Systems</span>
        <span className="flex items-center gap-2">McKinsey: Real-time Intel</span>
        <span className="flex items-center gap-2">MIT: Trust Calibration</span>
      </div>
    </motion.div>
  </div>
</section>


      {isCulturalContextEngine && (
        <>
          {/* Trust Signals & System Constraints Section */}
          {/* REFRAME: Positioned as system-level inputs that directly shaped the trust architecture, not traditional UX research */}
          <section id="research-audience" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Trust Signals & System Constraints
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Research findings that define non-negotiable system requirements. Trust is treated as an architectural problem, not a UI preference.
                  </p>
                </div>
                
                {/* System Constraints Grid */}
                {/* REFRAME: Statistics reframed as system constraints mapping directly to architectural requirements */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-6 rounded-xl border border-amber-500/30">
                    <div className="text-3xl font-bold text-amber-400 mb-2">62%</div>
                    <div className="text-gray-300 text-base md:text-sm mb-2">Distrust AI recommendations without source verification</div>
                    <div className="text-gray-400 text-sm md:text-xs italic">System requirement: Explainability and attribution become mandatory system outputs. Every recommendation must expose its source chain.</div>
                    <div className="text-gray-500 text-sm md:text-xs mt-2">— Travel Industry Trust Survey 2024</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-xl border border-cyan-500/30">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">78%</div>
                    <div className="text-gray-300 text-base md:text-sm mb-2">Require origin and credibility visibility</div>
                    <div className="text-gray-400 text-sm md:text-xs italic">System requirement: Provenance visibility is non-negotiable. The system must surface data origin, freshness indicators, and credibility signals at the architectural level.</div>
                    <div className="text-gray-500 text-sm md:text-xs mt-2">— Phocuswright Consumer Survey</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-6 rounded-xl border border-emerald-500/30">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">45%</div>
                    <div className="text-gray-300 text-base md:text-sm mb-2">Have been misled by fake or outdated information</div>
                    <div className="text-gray-400 text-sm md:text-xs italic">System requirement: Conflict resolution logic must operate before recommendations reach users. The system must detect and resolve data conflicts, not defer to single sources.</div>
                    <div className="text-gray-500 text-sm md:text-xs mt-2">— Trust & Authenticity Research</div>
                  </div>
                </div>
                
                {/* System Failure Modes */}
                {/* REFRAME: Competitive analysis reframed as system failure modes and trust anti-patterns */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-8 text-white text-center">System Failure Modes</h3>
                  <p className="text-gray-400 text-base md:text-sm text-center mb-8 max-w-3xl mx-auto">
                    Current approaches fail because they treat trust as a presentation problem rather than an architectural constraint. These patterns illustrate systemic failures that must be avoided.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Single-Source Trust</h4>
                      <p className="text-gray-300 text-base md:text-sm mb-4">Review platforms (TripAdvisor, Yelp, Google Reviews) rely on unverified user-generated content, creating a single-source dependency. This architecture fails when the source is compromised or outdated, leaving no fallback mechanism.</p>
                      <div className="text-sm md:text-xs text-gray-400 italic">Failure pattern: No verification layer, no conflict detection, no audit trail</div>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Opaque Generation</h4>
                      <p className="text-gray-300 text-base md:text-sm mb-4">AI assistants (ChatGPT, Claude, Perplexity) generate recommendations without exposing source attribution or data provenance. The system architecture treats trust as an output, not an input—making verification impossible by design.</p>
                      <div className="text-sm md:text-xs text-gray-400 italic">Failure pattern: No provenance tracking, no explainability layer, no source chain</div>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Commercial Bias Override</h4>
                      <p className="text-gray-300 text-base md:text-sm mb-4">Booking platforms (Booking.com, Airbnb, Expedia) prioritize availability and promotion over authenticity verification. The system architecture allows commercial signals to override trust signals, creating a fundamental conflict of interest.</p>
                      <div className="text-sm md:text-xs text-gray-400 italic">Failure pattern: Trust signals subordinated to business logic, no separation of concerns</div>
                    </div>
                  </div>
                  
                  {/* Trust Through Transparency: The Architectural Response */}
                  {/* REFRAME: Elevated as the core architectural response with tighter language and explicit system flow */}
                  <div className="mt-8 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-6 md:p-8 rounded-xl border border-cyan-500/30">
                    <h4 className="text-xl font-semibold text-white mb-4">Trust Through Transparency: The Architectural Response</h4>
                    <p className="text-gray-200 text-base leading-relaxed mb-4">
                      These constraints force a fundamental architectural shift: trust must be computed, not assumed. The system moves from a binary trust model (True/False) to a probabilistic one, where Consensus Logic arbitrates between data sources rather than averaging them. When the system detects a conflict—a Google Maps 'Closed' status contradicted by real-time social activity—it doesn't pick a side. It documents the resolution logic in an Audit Trail, exposing the Source Chain so users can inspect why a recommendation was deemed trustworthy despite conflicting signals.
                    </p>
                    <div className="mt-4 pt-4 border-t border-cyan-500/30">
                      <p className="text-gray-300 text-base md:text-sm font-medium mb-2">System Flow:</p>
                      <div className="text-gray-400 text-base md:text-sm font-mono space-y-1">
                        <div>Inputs (Multiple Sources) → Consensus Logic (Arbitration)</div>
                        <div>→ Conflict Detection → Audit Trail (Resolution Documentation)</div>
                        <div>→ User Attribution (Source Chain Exposure)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Challenge Section */}
          <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    The Challenge: Trust & Authenticity Crisis
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Current AI-powered travel tools lack transparency in source verification and data provenance, creating a fundamental trust problem
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 p-8 rounded-2xl border-2 border-amber-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-[0_8px_30px_rgb(245,158,11,0.2)]">
                      <svg 
                        className="w-7 h-7 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                        />
                      </svg>
                    </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        The Problem
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      The Spontaneity Tax: Travelers want to be adventurous, but 'Hallucination Risk' forces them back into over-researched, safe patterns. Current AI lacks the real-time veracity needed to support 'on-the-fly' decision making.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        The Solution
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      A system that provides <span className="font-semibold text-blue-700">source verification, data provenance, and authenticity validation</span> at the architectural level, ensuring every recommendation includes clear attribution and verifiable information.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Observed Travel Frictions Section */}
          <section id="design-exploration" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Observed Travel Frictions
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Real user feedback reveals pattern-level insights about trust and authenticity gaps in current travel recommendation systems
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {/* Fake Reviews & Misinformation */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:border-red-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      
                      <h4 className="text-xl font-bold text-gray-900">Fake Reviews & Misinformation</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-red-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I followed an AI recommendation for a restaurant that turned out to be <span className="font-semibold text-red-700">closed for months</span>. The AI had no way to verify if the information was current or accurate."</p>
                        <div className="flex items-center gap-2 text-sm md:text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/travel</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-red-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"ChatGPT recommended a 'hidden gem' that was actually a <span className="font-semibold text-red-700">tourist trap with fake reviews</span>. I had no way to verify the source of the recommendation."</p>
                        <div className="flex items-center gap-2 text-sm md:text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Twitter, Travel Community</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lack of Source Attribution */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-orange-100 hover:border-orange-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      
                      <h4 className="text-xl font-bold text-gray-900">Lack of Source Attribution</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-orange-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I want to know where the AI got its information from. Is it from <span className="font-semibold text-orange-700">reliable sources or just aggregated from random websites</span>?"</p>
                        <div className="flex items-center gap-2 text-sm md:text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/solotravel</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-orange-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"Without knowing the source, I can't judge if a recommendation is <span className="font-semibold text-orange-700">credible or just marketing</span>. This makes me skeptical of all AI suggestions."</p>
                        <div className="flex items-center gap-2 text-sm md:text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                          <span>Blog Comment on Nomadic Matt</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Outdated Information */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-100 hover:border-purple-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      
                      <h4 className="text-xl font-bold text-gray-900">Outdated Information</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-purple-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"The AI recommended a museum that <span className="font-semibold text-purple-700">closed two years ago</span>. There's no timestamp or way to verify when the information was last updated."</p>
                        <div className="flex items-center gap-2 text-sm md:text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/travelhacks</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-purple-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I need recommendations with <span className="font-semibold text-purple-700">real-time verification and data freshness indicators</span> to trust the information."</p>
                        <div className="flex items-center gap-2 text-sm md:text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/onebag</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Concept & Strategy Section */}
          <section id="designs-strategy" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-black">
                    Concept & Strategy
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {/* Unique Value Proposition */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-gray-50 p-8 rounded-xl border border-gray-200"
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">Unique Value Proposition</h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      A systems-design framework that provides source verification, data provenance, and authenticity validation for every AI-powered travel recommendation.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      This system processes cultural context, source credibility, and data freshness through verification logic and provenance tracking to deliver trustworthy, verifiable travel recommendations with full transparency.
                    </p>
                  </motion.div>

                  {/* Core Philosophy */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <motion.button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:ring-inset"
                      onClick={() => setActiveAccordion(activeAccordion === 'philosophy' ? null : 'philosophy')}
                      aria-expanded={activeAccordion === 'philosophy'}
                      aria-controls="philosophy-content"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">✨ What Does Trust & Authenticity Mean In Travel Recommendations?</h3>
                      <motion.div
                        animate={{ rotate: activeAccordion === 'philosophy' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeAccordion === 'philosophy' && (
                        <motion.div
                          id="philosophy-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-6">
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                              Trust in travel recommendations doesn't mean blind faith—it means transparency, verifiability, and understanding the source of information.
                            </p>
                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Dynamic Provenance</h5>
                                  <p className="text-gray-700">Tracking source-truth in real-time as the traveler moves through a city.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">The Spontaneity Safety-Net</h5>
                                  <p className="text-gray-700">Logic layers that filter out 'closed' or 'fake' locations before they reach the UI.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Frictionless Verification</h5>
                                  <p className="text-gray-700">Providing trust signals (source logos, freshness timestamps) without breaking the flow of discovery.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* System Overview Section */}
          <section className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-zinc-950 to-violet-950/20 pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.1]">
                    Architecture: Powering Spontaneity through Veracity
                  </h2>
                  <p className="text-gray-400 text-lg max-w-3xl mx-auto text-balance mb-4">
                    Every prompt triggers a race: the LLM generates the 'Spontaneous Spark,' while the Consensus Module audits that spark across the Trust Stack. The result is a recommendation with a verifiable integrity score.
                  </p>
                  <p className="text-gray-400 text-lg max-w-3xl mx-auto text-balance mb-8">
                    A Spontaneity Engine requires high-velocity data. I designed a three-tier architecture to support 'Living' recommendations:
                  </p>
                  <div className="max-w-4xl mx-auto space-y-6 text-left">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-3">1. The Discovery Layer (LLM)</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Generates creative, context-aware 'spontaneous' suggestions based on user mood and local vibes.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-3">2. The Verification Middleware (The Guardrail)</h3>
                      <p className="text-gray-300 leading-relaxed">
                        A real-time RAG (Retrieval-Augmented Generation) layer that 'fact-checks' the spontaneous idea against live data (e.g., 'Is that jazz club actually open right now?').
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-3">3. The Authenticity Score</h3>
                      <p className="text-gray-300 leading-relaxed">
                        A real-time confidence metric that tells the user: 'Go for it—this is verified live,' or 'Proceed with caution—data is 4+ hours old.'
                      </p>
                    </div>
                  </div>
                </div>

                {/* Consensus Logic Demo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mt-12 mb-16 md:mb-20 lg:mb-24 max-w-4xl mx-auto"
                  style={{ minHeight: '280px' }}
                >
                  <TrustSignalDemo />
                </motion.div>
                
                {/* Detailed 3-Stage Flow Diagram */}
                <div className="relative">
                  {/* Main Grid Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
                    
                    {/* Stage 1 - Source Collection (Left) */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-indigo-400 text-center lg:text-left mb-6">
                        Verified Provenance Ingest
                      </h3>
                      
                      {/* Data Source Nodes */}
                      {[
                        { icon: FaUniversity, label: 'Museums', desc: 'Curated collections' },
                        { icon: FaArchive, label: 'Local Archives', desc: 'Historical records' },
                        { icon: FaUserGraduate, label: 'Verified Historians', desc: 'Expert knowledge' },
                      ].map((source, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, x: 5 }}
                          className="group relative"
                        >
                          {/* Connection line to verification layer */}
                          <div className="hidden lg:block absolute right-0 top-1/2 w-full h-0.5 bg-gradient-to-r from-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1/2" />
                          
                          {/* Glass card */}
                          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg hover:border-indigo-500/50 transition-all duration-300">
                            {/* Glowing icon */}
                            <div className="flex items-center gap-4 mb-3">
                              <div className="relative">
                                <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
                                <source.icon className="w-6 h-6 text-indigo-400 relative z-10" />
                              </div>
                              <h4 className="text-white font-semibold text-base">{source.label}</h4>
                            </div>
                            <p className="text-gray-400 text-base md:text-sm">{source.desc}</p>
                            
                            {/* Data flow particles */}
                            <motion.div
                              className="absolute -right-2 top-1/2 w-2 h-2 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100"
                              animate={{
                                x: [0, 200, 200],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.3,
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                      
                      {/* Merging Stream Animation */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="hidden lg:block relative h-1 mt-4"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-indigo-400/50 to-transparent rounded-full" />
                        <motion.div
                          className="absolute inset-0 bg-indigo-400 rounded-full"
                          animate={{
                            width: ['0%', '100%', '100%'],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Stage 2 - Verification Layer (Center) */}
                    <div className="flex justify-center my-12 lg:my-0">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                      >
                        {/* Verification Prism - Animated Processing Box */}
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                          <svg
                            className="w-full h-full"
                            viewBox="0 0 320 320"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {/* Outer Ring - Source Verification - Rotating */}
                            <motion.g
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                            >
                              <circle
                                cx="160"
                                cy="160"
                                r="140"
                                fill="none"
                                stroke="url(#verificationOuterGradient)"
                                strokeWidth="2"
                                strokeDasharray="8 4"
                                opacity="0.6"
                              />
                            </motion.g>
                            
                            {/* Middle Ring - Cross-Reference Validation - Pulsing */}
                            <motion.g
                              animate={{
                                scale: [1, 1.05, 1],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              style={{ transformOrigin: '160px 160px' }}
                            >
                              <motion.circle
                                cx="160"
                                cy="160"
                                r="110"
                                fill="none"
                                stroke="url(#verificationMiddleGradient)"
                                strokeWidth="2.5"
                                animate={{
                                  opacity: [0.8, 1, 0.8],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              />
                            </motion.g>
                            
                            {/* Inner Core - Multi-Mechanism Validation */}
                            <motion.circle
                              cx="160"
                              cy="160"
                              r="60"
                              fill="url(#verificationCoreGradient)"
                              opacity="0.9"
                              animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.9, 1, 0.9],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            
                            {/* Verification nodes inside core */}
                            {[...Array(6)].map((_, i) => {
                              const angle = (i * 360) / 6;
                              const rad = (angle * Math.PI) / 180;
                              const x = 160 + Math.cos(rad) * 40;
                              const y = 160 + Math.sin(rad) * 40;
                              return (
                                <motion.circle
                                  key={i}
                                  cx={x}
                                  cy={y}
                                  r="4"
                                  fill="#818cf8"
                                  animate={{
                                    opacity: [0.4, 1, 0.4],
                                    scale: [1, 1.3, 1],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut",
                                  }}
                                />
                              );
                            })}
                            
                            {/* Gradients */}
                            <defs>
                              <linearGradient id="verificationOuterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8" />
                              </linearGradient>
                              <linearGradient id="verificationMiddleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.9" />
                              </linearGradient>
                              <radialGradient id="verificationCoreGradient">
                                <stop offset="0%" stopColor="#a78bfa" />
                                <stop offset="100%" stopColor="#6366f1" />
                              </radialGradient>
                            </defs>
                          </svg>
                          
                          {/* Center Label */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-sm md:text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1">
                                Multi-Mechanism
                              </div>
                              <div className="text-xl md:text-2xl font-bold text-white">
                                VALIDATION
                              </div>
                              <div className="text-sm md:text-xs font-medium text-violet-300 uppercase tracking-wider mt-1">
                                Prism
                              </div>
                            </div>
                          </div>
                          
                          {/* Ring Labels */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm md:text-xs text-gray-400 font-medium">
                            Source Verification
                          </div>
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm md:text-xs text-gray-400 font-medium">
                            Cross-Reference
                          </div>
                          <div className="absolute text-sm md:text-xs text-gray-400 font-medium whitespace-nowrap z-50 bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded border border-gray-700/50" style={{ top: '20%', left: '20%', transform: 'translate(-50%, -50%) rotate(-45deg)' }}>
                            Validation Core
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Stage 3 - Transparent Output (Right) */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-violet-400 text-center lg:text-right mb-6">
                        Attributed Recommendations
                      </h3>
                      
                      {/* Output Card - Context Card UI */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        whileHover={{ scale: 1.02, x: -5 }}
                        className="group relative"
                      >
                        {/* Connection line from verification layer */}
                        <div className="hidden lg:block absolute left-0 top-1/2 w-full h-0.5 bg-gradient-to-l from-violet-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1/2" />
                        
                        {/* Context Card UI */}
                        <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg hover:border-violet-500/50 transition-all duration-300">
                          {/* Verified Badge */}
                          <div className="flex items-center gap-2 mb-4">
                            <FaCheckCircle className="w-5 h-5 text-emerald-400" />
                            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">Verified</span>
                          </div>
                          
                          {/* Recommendation Content */}
                          <div className="mb-4">
                            <h4 className="text-white font-semibold text-base mb-2">
                              Cultural Context Recommendation
                            </h4>
                            <p className="text-gray-300 text-base md:text-sm leading-relaxed">
                              This recommendation has been verified through multiple sources and cross-referenced for authenticity.
                            </p>
                          </div>
                          
                          {/* Source Links */}
                          <div className="pt-4 border-t border-white/10">
                            <p className="text-gray-400 text-base md:text-sm md:text-xs mb-2 uppercase tracking-wider">Sources</p>
                            <div className="flex flex-wrap gap-2">
                              {['Museum Archive', 'Local Historian', 'Verified Record'].map((source, idx) => (
                                <motion.div
                                  key={idx}
                                  whileHover={{ scale: 1.05 }}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 rounded-md border border-white/10 hover:border-violet-400/50 transition-colors"
                                >
                                  <FaLink className="w-3 h-3 text-violet-400" />
                                  <span className="text-violet-300 text-sm md:text-xs">{source}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Freshness Indicator */}
                          <div className="mt-4 flex items-center gap-2 text-sm md:text-xs text-gray-400">
                            <FaClock className="w-3 h-3" />
                            <span>Last verified: 2 days ago</span>
                          </div>
                          
                          {/* Output particles */}
                          <motion.div
                            className="absolute -left-2 top-1/2 w-2 h-2 bg-violet-400 rounded-full opacity-0 group-hover:opacity-100"
                            animate={{
                              x: [0, -200, -200],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 0.3,
                            }}
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Information Lineage Formula - Bottom */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-16 pt-8 border-t border-white/10"
                  >
                    <div className="text-center">
                      <p className="text-gray-400 text-base md:text-sm mb-2">The Trust Framework Information Lineage</p>
                      <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-4 md:p-6">
                        <div className="text-white font-mono text-sm md:text-base">
                          <div className="mb-2">R<sub>trust</sub> = V(S<sub>1</sub>, S<sub>2</sub>, ..., S<sub>n</sub>) × C<sub>fresh</sub> × A<sub>trans</sub></div>
                          <div className="text-sm md:text-sm text-gray-400 space-y-1">
                            <div>S: Verified sources (museums, archives, historians)</div>
                            <div>V: Multi-mechanism validation function</div>
                            <div>C: Freshness coefficient (temporal relevance)</div>
                            <div>A: Attribution transparency (source links & provenance)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Value Proposition Section */}
          <section className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Why Trust & Authenticity Matter
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    The impact extends beyond individual travelers—it requires systemic solutions that balance transparency with usability
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl border-2 border-cyan-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Impact for Travelers
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Transparent recommendations lead to <span className="font-semibold text-cyan-700">better decision-making and increased confidence</span> in travel choices. Travelers can verify information and make informed decisions based on <span className="font-semibold text-cyan-700">credible, verifiable sources</span>.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border-2 border-emerald-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Impact for the Industry
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      For travel professionals and B2B platforms, trust is a matter of liability. I designed the 'Liability Shield'—a feature that converts ephemeral AI reasoning into a permanent, downloadable audit trail. This allows travel agents to provide AI-generated 'spontaneous' recommendations while maintaining a verifiable record of data freshness and source origin, effectively insulating the professional from the risks of AI hallucinations.
                    </p>
                  </div>
                </div>

                {/* Impact for B2B & Agents - New Section */}
                <div className="mt-8 md:mt-10">
                  <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-8 rounded-2xl border-2 border-violet-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Impact for B2B & Agents
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Enables the 'Professional-in-the-Loop' model. Agents can leverage high-velocity AI discovery tools with the security of a technical audit trail, ensuring that every 'spontaneous' suggestion is backed by professional-grade verification standards.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

         {/* Design Evolution Section */}
        <section id="wireframes-ui" className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-6 text-white">
                  Design Evolution
                </h2>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                  Designing for 'The Pulse': Moving from static lists to a living, breathing UI that reflects the real-time heartbeat of a city, backed by a rigorous verification stack.
                </p>
              </div>
              
              {/* TrustPulseUI Component */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <TrustPulseUI />
              </motion.div>
            </motion.div>
          </div>
        </section>

          {/* Development & Build Section */}
          <section id="prototyping-ai" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                      Development & Build
                    </h2>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                      <p className="text-amber-300 text-base md:text-sm font-medium">
                        Work In Progress
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                  <p className="text-gray-300 text-center">
                    Development workflow and technical architecture details will be documented as the system is built.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Solution Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">
                    Solution
                  </h2>
                  <p className="text-gray-600 text-lg">
                    A comprehensive system for trust and authenticity in AI-powered travel recommendations
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    This trust framework provides source verification, data provenance tracking, and authenticity validation at the architectural level. Every recommendation includes clear attribution, freshness indicators, and verifiable source information, enabling travelers to make informed decisions with confidence.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Launch & Testing Section */}
          <section id="outcomes-launch" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Launch & Testing
                  </h2>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4 text-white">Launch Strategy</h3>
                    <p className="text-gray-300 mb-4">
                      Will start with a closed beta focusing on source verification accuracy and user trust metrics, followed by gradual rollout based on verification system performance.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Beta Testing</span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Source Verification</span>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">Trust Metrics</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Live Demo Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">
                    Live Demo
                  </h2>
                  <p className="text-gray-600 text-lg">
                    This product is actively being built and deployed
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-8 md:p-10 border border-gray-200">
                  <div className="mb-8 text-center">
                    <p className="text-gray-600 mb-4">
                      A live demo will be available once the verification system is fully implemented.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        What Currently Works
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        System architecture and verification framework are being developed. Core components for source tracking and provenance are in progress.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        What is Experimental
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Source verification algorithms, authenticity validation logic, and real-time freshness indicators are in active development and testing.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        What is Planned Next
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Expanded source network, advanced verification mechanisms, and user-facing transparency features. Timeline depends on verification system validation and user feedback.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Outcome & Learnings Section */}
          <section id="learnings-next" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Outcome & Learnings
                  </h2>
                </div>
                
                <div className="space-y-12">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Key Learnings</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        Trust is the fuel for spontaneity. When users see clear data provenance (knowing exactly where a recommendation comes from), their 'cognitive load' drops, allowing them to make faster, more adventurous decisions. The system doesn't just provide data; it provides the *confidence* to act.
                      </p>
                      <p>
                        Building a trust system means constantly questioning how to balance transparency with usability. The challenge isn't having enough information—it's presenting verification data in a way that builds confidence without overwhelming users. Early prototypes showed that too much technical detail can feel like bureaucracy, while too little transparency undermines trust.
                      </p>
                      <p>
                        Source verification requires architectural decisions that happen long before the UI. The system needs to track data lineage from collection through processing to recommendation, which means building provenance tracking into the core architecture, not adding it as an afterthought.
                      </p>
                      <p>
                        Authenticity validation is more complex than simple source checking. A recommendation can come from a verified source but still be outdated, misleading, or contextually inappropriate. The system needs multiple verification layers that work together to assess credibility.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">What Surprised Me</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        The depth of user skepticism about AI recommendations was more pronounced than expected. Users don't just want to know if information is accurate—they want to understand why they should trust it. This requires explaining verification processes in accessible language, not just showing technical indicators.
                      </p>
                      <p>
                        The technical challenge of real-time source verification revealed that most existing travel data APIs aren't built for provenance tracking. They're optimized for fast retrieval, not source attribution. Adapting these systems required building abstraction layers that add verification without breaking existing integrations.
                      </p>
                      <p>
                        Privacy concerns around source tracking emerged as a nuanced challenge. Users want transparency about where recommendations come from, but they also want assurance that their personal data isn't being shared with those sources. Balancing these needs required careful architectural design.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Reflections & Next Steps Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Reflections & Next Steps
                  </h2>
                </div>
                
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Cross-platform verification remains underexplored. The system currently processes source verification within a single platform, but travel recommendations often span multiple sources and platforms. Adding cross-platform provenance tracking could create more comprehensive trust signals without requiring users to manually verify each source.
                  </p>
                  <p>
                    Community-driven verification could shift the system from automated to collaborative. Instead of relying solely on technical verification, the system could incorporate community signals—recognizing when multiple travelers verify the same information or flagging discrepancies between sources. This moves beyond individual source checking to collective trust building.
                  </p>
                  <p>
                    Integration with verification standards represents a significant opportunity. The travel industry lacks universal standards for source attribution and data freshness. Establishing or adopting verification standards could create a foundation for trust that extends beyond this single system, benefiting the entire travel ecosystem.
                  </p>
                  <p>
                    Standardizing the 'Verification PDF' into a travel industry protocol. By creating a cross-platform standard for 'Recommendation Provenance,' we can move toward an ecosystem where AI agents can trade verified data securely, reducing the global 'noise' of outdated travel information.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}
      {isTravelPlanningAssistant && (
        <>
          {/* Audience & Research Section */}
          <section id="research-audience" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Audience & Research
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Understanding the fragmentation between planning and spontaneous exploration
                  </p>
                </div>
                
                {/* Key Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-6 rounded-xl border border-amber-500/30">
                    <div className="text-3xl font-bold text-amber-400 mb-2">71%</div>
                    <div className="text-gray-300 text-base md:text-sm">of travelers struggle with balancing structured planning and spontaneous exploration</div>
                    <div className="text-gray-500 text-sm md:text-xs mt-2">— Travel Planning Behavior Study 2024</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-xl border border-cyan-500/30">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">64%</div>
                    <div className="text-gray-300 text-base md:text-sm">feel overwhelmed by fragmented planning tools that don't work together</div>
                    <div className="text-gray-500 text-sm md:text-xs mt-2">— Phocuswright Consumer Survey</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-6 rounded-xl border border-emerald-500/30">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">58%</div>
                    <div className="text-gray-300 text-base md:text-sm">want planning tools that adapt to real-time changes and constraints</div>
                    <div className="text-gray-500 text-sm md:text-xs mt-2">— Travel Technology Research</div>
                  </div>
                </div>
                
                {/* Market & Competitive Analysis */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-8 text-white text-center">Architectural Archetypes</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Archetype A: Deterministic Systems</h4>
                      <p className="text-gray-300 text-base md:text-sm mb-4">High structure, zero adaptability. Systems like Wanderlog and TripIt enforce rigid planning models with no capacity for real-time context integration.</p>
                      <div className="text-sm md:text-xs text-gray-400">Examples: Wanderlog, TripIt, Google Trips</div>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Archetype B: Discovery Engines</h4>
                      <p className="text-gray-300 text-base md:text-sm mb-4">High entropy, zero structural logic. Systems like Google Maps and Yelp provide real-time discovery but lack the orchestration layer needed to bridge logistics with spontaneity.</p>
                      <div className="text-sm md:text-xs text-gray-400">Examples: Google Maps, Yelp, Foursquare</div>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">The CATDS Value</h4>
                      <p className="text-gray-300 text-base md:text-sm mb-4">Contextual Orchestration: Bridging high-structure logistics with high-entropy real-time discovery through an AI middleware layer that interprets context and maintains trust boundaries.</p>
                      <div className="text-sm md:text-xs text-gray-400">Middleware Architecture</div>
                    </div>
                  </div>
                  
                  {/* Our Approach */}
                  <div className="mt-8 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-6 md:p-8 rounded-xl border border-cyan-500/30">
                    <h4 className="text-xl font-semibold text-white mb-4">Approach: Contextual Orchestration</h4>
                    <p className="text-gray-200 text-base leading-relaxed">
                      The CATDS concept is intended to operate as a middleware layer that sits between existing travel platforms (Expedia, Airbnb, etc.) and the Spontaneity Engine. The Context Interpreter ingests unstructured data (weather, LLM-parsed sentiment, sensor data) and converts it into Decision Vectors. The Trust Layer provides human-in-the-loop verification, suggesting changes without overriding user agency—avoiding AI hallucinations in logistics.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Challenge Section */}
          <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    The Challenge: Systemic Rigidity and Data Latency
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    The gap between static API responses and real-world context creates systemic rigidity in travel systems
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 p-8 rounded-2xl border-2 border-amber-100 hover:shadow-lg transition-all duration-300">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      The Problem: Data Latency
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      The fundamental gap between a static API response ("Flight is Booked") and real-world context ("User is tired, it's raining, and the flight is delayed"). Current systems are <span className="font-semibold text-red-700">transactional (Booking) or static (Itinerary)</span>, but travel requires fluid, contextual intelligence that adapts to moment-to-moment reality.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      The Solution: Contextual Orchestration
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      CATDS is a <span className="font-semibold text-blue-700">sophisticated AI middleware layer</span> that bridges high-structure logistics with high-entropy real-time discovery. A Context Interpreter and Trust Layer orchestrate data between a Spontaneity Engine and existing travel platforms, enabling fluid, contextual decision-making.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Observed Travel Frictions Section */}
          <section id="design-exploration" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Observed Travel Frictions
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Real user feedback reveals pattern-level insights about the gaps between planning and spontaneous exploration
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {/* Tool Fragmentation */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:border-red-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                     
                      <h4 className="text-xl font-bold text-gray-900">Tool Fragmentation</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-red-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I use TripIt for flights, Google Sheets for itinerary, Booking.com for hotels, and Google Maps for discovery. <span className="font-semibold text-red-700">Nothing talks to each other</span>."</p>
                        <div className="flex items-center gap-2 text-sm md:text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/travel</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-red-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"Planning a trip means juggling <span className="font-semibold text-red-700">five different apps that don't sync</span>. There has to be a better way."</p>
                        <div className="flex items-center gap-2 text-sm md:text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Twitter, Travel Community</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rigid Planning Constraints */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-orange-100 hover:border-orange-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      
                      <h4 className="text-xl font-bold text-gray-900">Rigid Planning Constraints</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-orange-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I planned everything in advance, but when I got there, <span className="font-semibold text-orange-700">the weather changed and half my plans were useless</span>. The app didn't help me adapt."</p>
                        <div className="flex items-center gap-2 text-sm md:text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/solotravel</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-orange-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"My itinerary was set in stone, but I wanted to <span className="font-semibold text-orange-700">extend my stay somewhere</span>. Reorganizing everything was a nightmare."</p>
                        <div className="flex items-center gap-2 text-sm md:text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                          <span>Blog Comment on Nomadic Matt</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Lack of Real-Time Adaptation */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-100 hover:border-purple-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      
                      <h4 className="text-xl font-bold text-gray-900">Lack of Real-Time Adaptation</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-purple-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I need a tool that <span className="font-semibold text-purple-700">adapts when trains are delayed or attractions are closed</span>, not one that just shows me a static plan."</p>
                        <div className="flex items-center gap-2 text-sm md:text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/travelhacks</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-purple-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"Planning tools assume everything goes according to plan. <span className="font-semibold text-purple-700">Real travel is messy and needs flexibility</span>."</p>
                        <div className="flex items-center gap-2 text-sm md:text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/onebag</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Concept & Strategy Section */}
          <section id="designs-strategy" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-black">
                    Concept & Strategy
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {/* Unique Value Proposition */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-gray-50 p-8 rounded-xl border border-gray-200"
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">Unique Value Proposition</h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      An AI-powered travel planning assistant that adapts to real-time constraints and preferences, balancing structure with spontaneity.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      This system processes travel constraints, preferences, and real-time context through adaptive algorithms to deliver flexible planning that maintains structure when needed while enabling spontaneous exploration.
                    </p>
                  </motion.div>

                  {/* Core Philosophy */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <motion.button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:ring-inset"
                      onClick={() => setActiveAccordion(activeAccordion === 'philosophy' ? null : 'philosophy')}
                      aria-expanded={activeAccordion === 'philosophy'}
                      aria-controls="philosophy-content"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">✨ What Does Contextual Orchestration Mean In Travel?</h3>
                      <motion.div
                        animate={{ rotate: activeAccordion === 'philosophy' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeAccordion === 'philosophy' && (
                        <motion.div
                          id="philosophy-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-6">
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                              Contextual orchestration means a middleware layer that interprets real-world context and orchestrates data between structured logistics and spontaneous discovery. The system provides structure when needed and freedom when desired, bridging the gap between static APIs and fluid reality.
                            </p>
                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Flexible structure</h5>
                                  <p className="text-gray-700">Provide enough planning to reduce stress without locking travelers into rigid schedules.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Latency-Aware Constraint Processing</h5>
                                  <p className="text-gray-700">Process constraints with awareness of data latency—adjusting plans when real-world conditions change, accounting for the gap between API responses and actual state.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Unified experience</h5>
                                  <p className="text-gray-700">Consolidate planning, booking, and discovery into a single adaptive system.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Context-aware suggestions</h5>
                                  <p className="text-gray-700">Provide recommendations that adapt to current location, time, weather, and preferences.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* System Overview Section */}
          <section className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-zinc-950 to-violet-950/20 pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.1]">
                    System Architecture: Context Interpreter & Trust Layer Orchestration
                  </h2>
                  <p className="text-gray-400 text-lg max-w-3xl mx-auto text-balance mb-6">
                    A sophisticated AI middleware layer that orchestrates data between the Spontaneity Engine and existing travel platforms
                  </p>
                  <div className="max-w-4xl mx-auto space-y-4 text-left mt-8">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-3">Context Interpreter: Decision Vector Generation</h3>
                      <p className="text-gray-300 leading-relaxed">
                        The Context Interpreter ingests unstructured data streams (weather APIs, LLM-parsed sentiment from user messages, sensor data from devices) and converts them into structured 'Decision Vectors.' These vectors encode contextual signals—energy levels, environmental conditions, temporal constraints—into a format that the Spontaneity Engine can process. The interpreter operates as a real-time ETL pipeline, normalizing heterogeneous data sources into a unified context model.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-3">Trust Layer: Human-in-the-Loop Verification</h3>
                      <p className="text-gray-300 leading-relaxed">
                        The Trust Layer implements 'Human-in-the-Loop' verification—the system suggests changes without overriding user agency. This prevents AI hallucinations in logistics by requiring explicit user confirmation for critical decisions (flight changes, hotel cancellations). The layer maintains an audit trail of all suggestions and user responses, enabling transparency and learning. It acts as a safety net, ensuring that automated recommendations never compromise user control or safety.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Dynamic Feedback Loop Diagram */}
                <div className="relative">
                  {/* Main Grid Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                    
                    {/* Stage 1 - Constraint Detection (Left) */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-amber-400 text-center lg:text-left mb-6">
                        Constraint Detection
                      </h3>
                      
                      {/* Constraint Sensor Icons - Floating with Ping Animation */}
                      {[
                        { icon: FaCloudSun, label: 'Weather', desc: 'Real-time conditions', color: 'amber' },
                        { icon: FaPlane, label: 'Delays', desc: 'Flight & transit status', color: 'amber' },
                        { icon: FaExclamationTriangle, label: 'Closures', desc: 'Business hours & availability', color: 'amber' },
                      ].map((sensor, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, x: 5 }}
                          className="group relative"
                        >
                          {/* Connection line to processor */}
                          <div className="hidden lg:block absolute right-0 top-1/2 w-full h-0.5 bg-gradient-to-r from-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1/2" />
                          
                          {/* Sensor Card with Ping Effect */}
                          <div className="relative backdrop-blur-xl bg-white/5 border border-amber-500/30 rounded-xl p-6 shadow-lg hover:border-amber-400/60 transition-all duration-300">
                            {/* Ping Animation Ring */}
                            <motion.div
                              className="absolute inset-0 rounded-xl border-2 border-amber-400/40"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.4,
                                ease: "easeOut",
                              }}
                            />
                            
                            {/* Glowing icon */}
                            <div className="flex items-center gap-4 mb-3 relative z-10">
                              <div className="relative">
                                <div className="absolute inset-0 bg-amber-500/30 blur-xl rounded-full" />
                                <sensor.icon className="w-6 h-6 text-amber-400 relative z-10" />
                              </div>
                              <h4 className="text-white font-semibold text-base">{sensor.label}</h4>
                            </div>
                            <p className="text-gray-400 text-base md:text-sm relative z-10">{sensor.desc}</p>
                            
                            {/* Data flow particles to center */}
                            <motion.div
                              className="absolute -right-2 top-1/2 w-2 h-2 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100"
                              animate={{
                                x: [0, 200, 200],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.3,
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Stage 2 - Adaptive Algorithms (Center) */}
                    <div className="flex justify-center my-12 lg:my-0">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                      >
                        {/* Hexagonal Constraint Processor */}
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                          <svg
                            className="w-full h-full"
                            viewBox="0 0 320 320"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {/* Outer Hexagon - Constraint Input Ring */}
                            <motion.g
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 25,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              style={{ transformBox: 'fill-box', transformOrigin: '160px 160px' }}
                            >
                              <polygon
                                points="160,20 280,80 280,200 160,260 40,200 40,80"
                                fill="none"
                                stroke="url(#constraintOuterGradient)"
                                strokeWidth="2"
                                strokeDasharray="8 4"
                                opacity="0.6"
                              />
                            </motion.g>
                            
                            {/* Middle Hexagon - Processing Layer - Pulsing */}
                            <motion.g
                              animate={{
                                scale: [1, 1.05, 1],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              style={{ transformOrigin: '160px 160px' }}
                            >
                              <motion.polygon
                                points="160,50 250,95 250,185 160,230 70,185 70,95"
                                fill="none"
                                stroke="url(#constraintMiddleGradient)"
                                strokeWidth="2.5"
                                animate={{
                                  opacity: [0.8, 1, 0.8],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              />
                            </motion.g>
                            
                            {/* Inner Hexagon - Algorithm Core - Re-arranging Blocks */}
                            <motion.polygon
                              points="160,80 220,110 220,170 160,200 100,170 100,110"
                              fill="url(#constraintCoreGradient)"
                              opacity="0.9"
                              animate={{
                                scale: [1, 1.08, 1],
                                opacity: [0.9, 1, 0.9],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            
                            {/* Internal Blocks - Re-arranging on Constraint Ping */}
                            {[...Array(6)].map((_, i) => {
                              const angle = (i * 360) / 6;
                              const rad = (angle * Math.PI) / 180;
                              const baseX = 160 + Math.cos(rad) * 50;
                              const baseY = 160 + Math.sin(rad) * 50;
                              return (
                                <motion.g key={i}>
                                  <motion.rect
                                    x={baseX - 8}
                                    y={baseY - 8}
                                    width="16"
                                    height="16"
                                    fill="#fbbf24"
                                    rx="2"
                                    animate={{
                                      x: [baseX - 8, baseX - 8 + Math.cos(rad) * 10, baseX - 8],
                                      y: [baseY - 8, baseY - 8 + Math.sin(rad) * 10, baseY - 8],
                                      opacity: [0.6, 1, 0.6],
                                      rotate: [0, 90, 0],
                                    }}
                                    transition={{
                                      duration: 3,
                                      repeat: Infinity,
                                      delay: i * 0.3,
                                      ease: "easeInOut",
                                    }}
                                  />
                                </motion.g>
                              );
                            })}
                            
                            {/* Gradients */}
                            <defs>
                              <linearGradient id="constraintOuterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
                              </linearGradient>
                              <linearGradient id="constraintMiddleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#fcd34d" stopOpacity="0.9" />
                              </linearGradient>
                              <radialGradient id="constraintCoreGradient">
                                <stop offset="0%" stopColor="#fcd34d" />
                                <stop offset="100%" stopColor="#f59e0b" />
                              </radialGradient>
                            </defs>
                          </svg>
                          
                          {/* Center Label */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-sm md:text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
                                Adaptive
                              </div>
                              <div className="text-xl md:text-2xl font-bold text-white">
                                PROCESSOR
                              </div>
                              <div className="text-sm md:text-xs font-medium text-amber-400 uppercase tracking-wider mt-1">
                                Re-calculating
                              </div>
                            </div>
                          </div>
                          
                          {/* Hexagon Labels */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm md:text-xs text-gray-400 font-medium">
                            Constraint Input
                          </div>
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm md:text-xs text-gray-400 font-medium">
                            Processing Layer
                          </div>
                          <div className="absolute text-sm md:text-xs text-gray-400 font-medium whitespace-nowrap z-50 bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded border border-gray-700/50" style={{ top: '20%', left: '20%', transform: 'translate(-50%, -50%) rotate(-45deg)' }}>
                            Algorithm Core
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Stage 3 - Unified Planning (Right) */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-cyan-400 text-center lg:text-right mb-6">
                        Unified Planning
                      </h3>
                      
                      {/* Fluid Timeline Visualization */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        whileHover={{ scale: 1.02, x: -5 }}
                        className="group relative"
                      >
                        {/* Connection line from processor */}
                        <div className="hidden lg:block absolute left-0 top-1/2 w-full h-0.5 bg-gradient-to-l from-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1/2" />
                        
                        {/* Timeline Card */}
                        <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg hover:border-cyan-500/50 transition-all duration-300">
                          {/* Timeline Header */}
                          <div className="flex items-center gap-2 mb-4">
                            <FaListUl className="w-5 h-5 text-cyan-400" />
                            <h4 className="text-white font-semibold text-base">Fluid Timeline</h4>
                          </div>
                          
                          {/* Timeline Items - Shifting in Real-time */}
                          <div className="space-y-3">
                            {[
                              { time: '9:00 AM', activity: 'Museum Visit', status: 'confirmed' },
                              { time: '12:00 PM', activity: 'Lunch', status: 'flexible' },
                              { time: '3:00 PM', activity: 'Walking Tour', status: 'adjusted' },
                            ].map((item, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ x: 0 }}
                                animate={{
                                  x: [0, idx % 2 === 0 ? 5 : -5, 0],
                                  opacity: [1, 0.8, 1],
                                }}
                                transition={{
                                  duration: 4,
                                  repeat: Infinity,
                                  delay: idx * 0.5,
                                  ease: "easeInOut",
                                }}
                                className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/50 transition-colors"
                              >
                                {/* Time Indicator */}
                                <div className="flex flex-col items-center min-w-[60px]">
                                  <div className="w-2 h-2 bg-cyan-400 rounded-full mb-1" />
                                  <span className="text-cyan-300 text-sm md:text-xs font-medium">{item.time}</span>
                                </div>
                                
                                {/* Activity Content */}
                                <div className="flex-1">
                                  <p className="text-white text-base md:text-sm font-medium mb-1">{item.activity}</p>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-sm md:text-xs px-2 py-0.5 rounded ${
                                      item.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300' :
                                      item.status === 'flexible' ? 'bg-amber-500/20 text-amber-300' :
                                      'bg-cyan-500/20 text-cyan-300'
                                    }`}>
                                      {item.status}
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* Real-time Update Indicator */}
                          <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-sm md:text-xs text-gray-400">
                            <motion.div
                              className="w-2 h-2 bg-cyan-400 rounded-full"
                              animate={{
                                opacity: [1, 0.3, 1],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            <span>Updating in real-time</span>
                          </div>
                          
                          {/* Output particles */}
                          <motion.div
                            className="absolute -left-2 top-1/2 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100"
                            animate={{
                              x: [0, -200, -200],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 0.3,
                            }}
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Feedback Loop Formula - Bottom */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-16 pt-8 border-t border-white/10"
                  >
                    <div className="text-center">
                      <p className="text-gray-400 text-base md:text-sm mb-2">The Travel Planning Assistant Feedback Loop</p>
                      <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-4 md:p-6">
                        <div className="text-white font-mono text-sm md:text-base">
                          <div className="mb-2">P<sub>adaptive</sub> = f(C<sub>t</sub>, P<sub>t-1</sub>, U<sub>pref</sub>) + ΔC</div>
                          <div className="text-sm md:text-sm text-gray-400 space-y-1">
                            <div>C<sub>t</sub>: Real-time constraints (weather, delays, closures)</div>
                            <div>P<sub>t-1</sub>: Previous plan state</div>
                            <div>U<sub>pref</sub>: User preferences and constraints</div>
                            <div>ΔC: Constraint change delta (triggers re-calculation)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Value Proposition Section */}
          <section className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Dynamic Re-Optimization Engine
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    The impact extends beyond individual travelers—it requires systemic solutions that balance structure with flexibility
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl border-2 border-cyan-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Impact for Travelers
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Adaptive planning leads to <span className="font-semibold text-cyan-700">reduced stress and increased confidence</span> in travel decisions. Travelers can plan with structure while maintaining the <span className="font-semibold text-cyan-700">freedom to explore spontaneously</span>.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border-2 border-emerald-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Impact for the Industry
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      When planning tools adapt to real-time constraints, the entire travel ecosystem becomes more resilient. <span className="font-semibold text-emerald-700">Travelers make better decisions</span>, businesses optimize operations, and the industry becomes more responsive to changing conditions.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Design Evolution Section */}
          <section id="wireframes-ui" className="py-20 bg-slate-900">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Design Evolution: System Intelligence in Action
                  </h2>
                  <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                    Visualizing the Intelligence Layer—how CATDS orchestrates context, trust, and semantic mapping to enable adaptive travel decisions.
                  </p>
                </div>
                
                {/* Component Grid */}
                <div className="space-y-16">
                  
                  {/* Component A: Contextual Pivot Overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 md:p-10"
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">A. Contextual Pivot Overlay</h3>
                      <p className="text-gray-400 text-base md:text-sm">Visualizing the Delta between planned state and contextual reality</p>
                    </div>
                    
                    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 md:p-8">
                      {/* Static Itinerary Card */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Static Itinerary</h4>
                          <span className="text-sm md:text-xs text-gray-500">14:00 - 16:00</span>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                              <FaMapMarkerAlt className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-medium">Outdoor Market Tour</p>
                              <p className="text-gray-400 text-base md:text-sm">Walking tour through local markets</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Context Event Interception */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="relative mb-6"
                      >
                        <div className="absolute inset-0 bg-amber-400/10 rounded-lg blur-xl"></div>
                        <div className="relative bg-gradient-to-r from-amber-500/20 to-amber-400/10 rounded-lg p-4 border-2 border-amber-400/50">
                          <div className="flex items-center gap-3">
                            <motion.div
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                              className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center border border-amber-400/30"
                            >
                              <FaCloudSun className="w-5 h-5 text-amber-400" />
                            </motion.div>
                            <div className="flex-1">
                              <p className="text-amber-400 font-semibold">Context Event Detected</p>
                              <p className="text-gray-300 text-base md:text-sm">Weather: Heavy Rain • Intensity: High</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* System Calculation */}
                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm md:text-xs font-medium text-gray-400 uppercase">System Processing</span>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                          ></motion.div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Calculating re-route...</span>
                          <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.5 }}
                            className="text-lg font-bold text-emerald-400"
                          >
                            94%
                          </motion.span>
                        </div>
                        <p className="text-sm md:text-xs text-gray-500 mt-2">Probability of Satisfaction</p>
                      </div>
                      
                      {/* Adaptive Suggestion */}
                      <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-400/30">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-400/20 rounded-lg flex items-center justify-center">
                            <FaMapMarkerAlt className="w-5 h-5 text-emerald-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-emerald-400 font-medium">Indoor Market Hall</p>
                            <p className="text-gray-300 text-base md:text-sm">Covered alternative with similar experience</p>
                            <p className="text-sm md:text-xs text-gray-400 mt-1">Constraint Delta: -6% satisfaction, +85% weather compatibility</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Technical Insight */}
                    <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border-l-4 border-amber-400">
                      <p className="text-sm md:text-xs text-gray-400 leading-relaxed">
                        <strong className="text-amber-400">System Logic:</strong> The Context Interpreter detects high-entropy signals (weather API) and calculates a Constraint Delta—the gap between planned satisfaction and contextual feasibility. The system presents the re-route with explainability metrics, showing why the pivot maintains experience quality while adapting to reality.
                      </p>
                    </div>
                  </motion.div>
                  
                  {/* Component B: Trust Layer Component */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 md:p-10"
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">B. Trust Layer: Human-in-the-Loop</h3>
                      <p className="text-gray-400 text-base md:text-sm">Orchestration Layer presenting decision paths with explainability</p>
                    </div>
                    
                    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 md:p-8">
                      {/* Modal Header */}
                      <div className="mb-6 pb-4 border-b border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-emerald-400/20 rounded-lg flex items-center justify-center">
                            <FaShieldAlt className="w-4 h-4 text-emerald-400" />
                          </div>
                          <h4 className="text-lg font-semibold text-white">Context Change Detected</h4>
                        </div>
                        <p className="text-sm text-gray-400">Flight delay detected. System suggests adaptive pivot.</p>
                      </div>
                      
                      {/* Decision Paths */}
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {/* Path 1: Maintain Original */}
                        <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-gray-300">Maintain Original</span>
                            <span className="text-sm md:text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded">High Friction</span>
                          </div>
                          <p className="text-sm md:text-xs text-gray-400 mb-4">Keep original itinerary despite 2h delay</p>
                          
                          {/* Mini Sparkline - Energy Levels */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm md:text-xs text-gray-500">Energy Impact</span>
                              <span className="text-sm md:text-xs text-red-400">-42%</span>
                            </div>
                            <div className="h-8 bg-slate-900 rounded flex items-end gap-1 p-1">
                              {[65, 58, 52, 45, 38, 32, 28].map((val, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ height: 0 }}
                                  whileInView={{ height: `${val}%` }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.5 + i * 0.1 }}
                                  className="flex-1 bg-red-400/60 rounded-sm"
                                />
                              ))}
                            </div>
                          </div>
                          
                          <div className="text-sm md:text-xs text-gray-500">
                            <div className="flex justify-between mb-1">
                              <span>Time Loss:</span>
                              <span className="text-red-400">2h 15m</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Satisfaction Risk:</span>
                              <span className="text-red-400">High</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Path 2: Adaptive Suggestion */}
                        <div className="bg-emerald-500/10 rounded-lg p-5 border-2 border-emerald-400/50">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-emerald-400">Adaptive Suggestion</span>
                            <span className="text-sm md:text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">Optimized</span>
                          </div>
                          <p className="text-sm md:text-xs text-gray-300 mb-4">Re-route to nearby attractions, maintain experience quality</p>
                          
                          {/* Mini Sparkline - Energy Levels */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm md:text-xs text-gray-400">Energy Impact</span>
                              <span className="text-sm md:text-xs text-emerald-400">+18%</span>
                            </div>
                            <div className="h-8 bg-slate-900 rounded flex items-end gap-1 p-1">
                              {[45, 52, 58, 63, 68, 72, 75].map((val, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ height: 0 }}
                                  whileInView={{ height: `${val}%` }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.5 + i * 0.1 }}
                                  className="flex-1 bg-emerald-400/60 rounded-sm"
                                />
                              ))}
                            </div>
                          </div>
                          
                          <div className="text-sm md:text-xs text-gray-400">
                            <div className="flex justify-between mb-1">
                              <span>Time Savings:</span>
                              <span className="text-emerald-400">45m</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Satisfaction Score:</span>
                              <span className="text-emerald-400">94%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors">
                          Keep Original
                        </button>
                        <button className="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors">
                          Accept Suggestion
                        </button>
                      </div>
                    </div>
                    
                    {/* Technical Insight */}
                    <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border-l-4 border-emerald-400">
                      <p className="text-sm md:text-xs text-gray-400 leading-relaxed">
                        <strong className="text-emerald-400">System Logic:</strong> The Trust Layer implements Human-in-the-Loop verification—the system curates the pivot but never overrides user agency. Data visualizations (sparklines) provide explainability, showing energy/time trade-offs. This prevents AI hallucinations in logistics by requiring explicit confirmation for critical decisions.
                      </p>
                    </div>
                  </motion.div>
                  
                  {/* Component C: Semantic Data Mapping */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 md:p-10"
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">C. Semantic Data Mapping</h3>
                      <p className="text-gray-400 text-base md:text-sm">Context Interpreter converting unstructured signals into Decision Vectors</p>
                    </div>
                    
                    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 md:p-8">
                      {/* Input: Unstructured Data */}
                      <div className="mb-8">
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Unstructured Input Signals</h4>
                        <div className="space-y-3">
                          {[
                            { source: 'User Message', data: "I'm feeling tired", icon: FaUser },
                            { source: 'Weather API', data: 'Temperature: 32°C, Humidity: 85%', icon: FaCloudSun },
                            { source: 'Sensor Data', data: 'Steps: 12,847 | Battery: 23%', icon: FaHeartbeat },
                          ].map((item, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1 * idx }}
                              className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-amber-400/20 rounded-lg flex items-center justify-center">
                                  <item.icon className="w-4 h-4 text-amber-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm md:text-xs text-gray-500 mb-1">{item.source}</p>
                                  <p className="text-sm text-gray-300">{item.data}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Processing Arrow */}
                      <div className="flex items-center justify-center my-6">
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="flex items-center gap-2"
                        >
                          <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400 to-amber-400"></div>
                          <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                          <div className="h-px w-16 bg-gradient-to-l from-transparent via-amber-400 to-amber-400"></div>
                        </motion.div>
                      </div>
                      
                      {/* Output: Decision Vectors */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Structured Decision Vectors</h4>
                        <div className="grid md:grid-cols-3 gap-3">
                          {[
                            { constraint: 'Activity Intensity', value: 'Low', confidence: 92, colorClass: 'emerald', bgClass: 'bg-emerald-500/20', textClass: 'text-emerald-400', barClass: 'bg-emerald-400' },
                            { constraint: 'Energy Level', value: 'Depleted', confidence: 88, colorClass: 'amber', bgClass: 'bg-amber-500/20', textClass: 'text-amber-400', barClass: 'bg-amber-400' },
                            { constraint: 'Time Window', value: 'Reduced', confidence: 85, colorClass: 'blue', bgClass: 'bg-blue-500/20', textClass: 'text-blue-400', barClass: 'bg-blue-400' },
                          ].map((vector, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 + 0.1 * idx }}
                              className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm md:text-xs text-gray-400">{vector.constraint}</span>
                                <span className={`text-sm md:text-xs px-2 py-1 ${vector.bgClass} ${vector.textClass} rounded`}>
                                  {vector.confidence}%
                                </span>
                              </div>
                              <p className="text-sm font-semibold text-white mb-2">{vector.value}</p>
                              <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${vector.confidence}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, delay: 0.5 + 0.1 * idx }}
                                  className={`h-full ${vector.barClass}`}
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Node Diagram Visualization */}
                      <div className="mt-8 pt-6 border-t border-slate-700">
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Semantic Mapping Flow</h4>
                        <div className="relative h-32 bg-slate-800/30 rounded-lg p-4 overflow-hidden">
                          {/* Nodes */}
                          <div className="absolute inset-0 flex items-center justify-around p-4">
                            {['Input', 'Parse', 'Enrich', 'Vector'].map((label, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 + idx * 0.2 }}
                                className="relative"
                              >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm md:text-xs font-semibold ${
                                  idx === 0 ? 'bg-amber-400/20 text-amber-400 border-2 border-amber-400/50' :
                                  idx === 3 ? 'bg-emerald-400/20 text-emerald-400 border-2 border-emerald-400/50' :
                                  'bg-slate-700 text-gray-300 border-2 border-slate-600'
                                }`}>
                                  {label[0]}
                                </div>
                                <p className="text-sm md:text-xs text-gray-500 mt-1 text-center">{label}</p>
                                {idx < 3 && (
                                  <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.8 + idx * 0.2 }}
                                    className="absolute top-1/2 left-full w-8 h-0.5 bg-gradient-to-r from-amber-400 to-emerald-400"
                                  />
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Technical Insight */}
                    <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border-l-4 border-amber-400">
                      <p className="text-sm md:text-xs text-gray-400 leading-relaxed">
                        <strong className="text-amber-400">System Logic:</strong> The Context Interpreter operates as a real-time ETL pipeline, normalizing heterogeneous data sources (LLM-parsed sentiment, sensor data, weather APIs) into unified Decision Vectors. Each vector encodes contextual signals with confidence scores, enabling the Spontaneity Engine to process high-entropy signals into actionable constraints. This semantic mapping bridges the gap between unstructured reality and structured system logic.
                      </p>
                    </div>
                  </motion.div>
                  
                  {/* Mobile Implementation Gallery */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 pt-12 border-t border-slate-700/50"
                  >
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">Mobile Implementation: System Logic in User Experience</h3>
                      <p className="text-gray-400 text-base md:text-sm">How the Intelligence Layer manifests in realistic mobile interfaces</p>
                    </div>
                    
                    {/* Mobile Frames Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 lg:gap-8">
                      
                      {/* Mobile Screen A: The Adaptive Intervention */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-full max-w-[280px] aspect-[9/19.5] bg-slate-800 rounded-[2.5rem] p-2 shadow-2xl">
                          {/* Device Frame */}
                          <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                            {/* Status Bar */}
                            <div className="h-12 bg-gradient-to-b from-gray-50 to-white flex items-center justify-between px-6 pt-2">
                              <span className="text-sm md:text-xs font-semibold text-gray-900">9:41</span>
                              <div className="flex items-center gap-1">
                                <div className="w-4 h-2 border border-gray-900 rounded-sm">
                                  <div className="w-3 h-1.5 bg-gray-900 rounded-sm m-0.5"></div>
                                </div>
                              </div>
                            </div>
                            
                            {/* App Content */}
                            <div className="h-[calc(100%-3rem)] bg-gray-50 overflow-y-auto">
                              {/* Header */}
                              <div className="bg-white px-6 py-4 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900">Kyoto Day 2</h2>
                                <p className="text-sm text-gray-500 mt-1">March 15, 2024</p>
                              </div>
                              
                              {/* Blurred Itinerary (Background) */}
                              <div className="px-6 py-4 space-y-4 blur-sm opacity-40">
                                <div className="bg-white rounded-xl p-4 shadow-sm">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg"></div>
                                    <div className="flex-1">
                                      <p className="font-semibold text-gray-900">Fushimi Inari Shrine</p>
                                      <p className="text-sm md:text-xs text-gray-500">14:00 - 16:00</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg"></div>
                                    <div className="flex-1">
                                      <p className="font-semibold text-gray-900">Tea Ceremony</p>
                                      <p className="text-sm md:text-xs text-gray-500">17:00 - 18:30</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* System Intervention Toast (Foreground) */}
                              <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                                className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 z-10"
                              >
                                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-5 shadow-xl border border-amber-400/30">
                                  <div className="flex items-start gap-3 mb-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                      <FaCloudSun className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="text-white font-bold text-sm mb-1">Context Change Detected</h4>
                                      <p className="text-white/90 text-sm md:text-xs leading-relaxed">
                                        Heavy Rain Detected. High crowd density at Fushimi Inari. Suggesting indoor alternative.
                                      </p>
                                    </div>
                                  </div>
                                  <button className="w-full bg-white text-amber-600 font-semibold py-3 rounded-xl text-sm shadow-lg hover:bg-amber-50 transition-colors">
                                    View Re-Optimized Plan
                                  </button>
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Designer Note */}
                        <div className="mt-4 max-w-[280px]">
                          <p className="text-sm md:text-xs text-gray-400 italic leading-relaxed text-center">
                            <strong className="text-amber-400 not-italic">System Logic:</strong> The Orchestration Layer surfaces contextual pivots through non-intrusive interventions. The toast pattern maintains user agency while providing explainability—showing why the system suggests a change (Constraint Delta visible in the message).
                          </p>
                        </div>
                      </div>
                      
                      {/* Mobile Screen B: The Trust-Layer Comparison */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-full max-w-[280px] aspect-[9/19.5] bg-slate-800 rounded-[2.5rem] p-2 shadow-2xl">
                          {/* Device Frame */}
                          <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                            {/* Status Bar */}
                            <div className="h-12 bg-gradient-to-b from-gray-50 to-white flex items-center justify-between px-6 pt-2">
                              <span className="text-sm md:text-xs font-semibold text-gray-900">9:41</span>
                              <div className="flex items-center gap-1">
                                <div className="w-4 h-2 border border-gray-900 rounded-sm">
                                  <div className="w-3 h-1.5 bg-gray-900 rounded-sm m-0.5"></div>
                                </div>
                              </div>
                            </div>
                            
                            {/* App Content */}
                            <div className="h-[calc(100%-3rem)] bg-gray-50 p-6 overflow-y-auto">
                              {/* Header */}
                              <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-1">Route Comparison</h2>
                                <p className="text-sm text-gray-500">Choose your preferred option</p>
                              </div>
                              
                              {/* Top Card: Original Plan */}
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl p-5 shadow-lg border-2 border-red-100 mb-4"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <h3 className="font-bold text-gray-900">Original Plan</h3>
                                  <span className="text-sm md:text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full font-semibold">High Friction</span>
                                </div>
                                <div className="space-y-2 mb-4">
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <FaClock className="w-4 h-4 text-red-500" />
                                    <span>1hr commute</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <FaMapMarkerAlt className="w-4 h-4 text-red-500" />
                                    <span>3 transfers required</span>
                                  </div>
                                </div>
                                <div className="pt-3 border-t border-gray-100">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm md:text-xs text-gray-500">Match Score</span>
                                    <span className="text-sm font-semibold text-gray-700">67%</span>
                                  </div>
                                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      whileInView={{ width: "67%" }}
                                      viewport={{ once: true }}
                                      transition={{ delay: 0.4, duration: 0.8 }}
                                      className="h-full bg-red-400 rounded-full"
                                    />
                                  </div>
                                </div>
                              </motion.div>
                              
                              {/* Bottom Card: Smart Pivot */}
                              <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-2xl p-5 shadow-lg border-2 border-emerald-400 mb-6"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <h3 className="font-bold text-gray-900">Smart Pivot</h3>
                                  <span className="text-sm md:text-xs px-2 py-1 bg-emerald-100 text-emerald-600 rounded-full font-semibold">Optimized</span>
                                </div>
                                <div className="space-y-2 mb-4">
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <FaClock className="w-4 h-4 text-emerald-500" />
                                    <span>15min walk</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <FaMapMarkerAlt className="w-4 h-4 text-emerald-500" />
                                    <span>No transfers needed</span>
                                  </div>
                                </div>
                                <div className="pt-3 border-t border-gray-100">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm md:text-xs text-gray-500">Match Score</span>
                                    <span className="text-sm font-semibold text-emerald-600">92%</span>
                                  </div>
                                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      whileInView={{ width: "92%" }}
                                      viewport={{ once: true }}
                                      transition={{ delay: 0.5, duration: 0.8 }}
                                      className="h-full bg-emerald-400 rounded-full"
                                    />
                                  </div>
                                </div>
                              </motion.div>
                              
                              {/* Action Button */}
                              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-xl shadow-lg transition-colors">
                                Accept & Update Itinerary
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Designer Note */}
                        <div className="mt-4 max-w-[280px]">
                          <p className="text-sm md:text-xs text-gray-400 italic leading-relaxed text-center">
                            <strong className="text-emerald-400 not-italic">System Logic:</strong> The Trust Layer presents decision paths with explainability metrics. Visual data (satisfaction percentages, progress bars) shows the trade-offs transparently. Human-in-the-Loop verification requires explicit confirmation, maintaining user agency while leveraging system intelligence.
                          </p>
                        </div>
                      </div>
                      
                      {/* Mobile Screen C: Semantic Preference Tuning */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-full max-w-[280px] aspect-[9/19.5] bg-slate-800 rounded-[2.5rem] p-2 shadow-2xl">
                          {/* Device Frame */}
                          <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                            {/* Status Bar */}
                            <div className="h-12 bg-gradient-to-b from-gray-50 to-white flex items-center justify-between px-6 pt-2">
                              <span className="text-sm md:text-xs font-semibold text-gray-900">9:41</span>
                              <div className="flex items-center gap-1">
                                <div className="w-4 h-2 border border-gray-900 rounded-sm">
                                  <div className="w-3 h-1.5 bg-gray-900 rounded-sm m-0.5"></div>
                                </div>
                              </div>
                            </div>
                            
                            {/* App Content */}
                            <div className="h-[calc(100%-3rem)] bg-gray-50 overflow-y-auto">
                              {/* Header */}
                              <div className="bg-white px-6 py-4 border-b border-gray-100 sticky top-0 z-10">
                                <h2 className="text-xl font-bold text-gray-900">System Preferences</h2>
                                <p className="text-sm text-gray-500 mt-1">Customize AI behavior</p>
                              </div>
                              
                              <div className="p-6 space-y-6">
                                {/* Preference 1: Spontaneity vs Structure */}
                                <div className="bg-white rounded-xl p-5 shadow-sm">
                                  <div className="flex items-center justify-between mb-4">
                                    <div>
                                      <h3 className="font-semibold text-gray-900 mb-1">Spontaneity vs Structure</h3>
                                      <p className="text-sm md:text-xs text-gray-500">Balance between flexibility and planning</p>
                                    </div>
                                  </div>
                                  <div className="relative">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-sm md:text-xs text-gray-500">Structured</span>
                                      <span className="text-sm md:text-xs text-gray-500">Spontaneous</span>
                                    </div>
                                    <div className="relative h-2 bg-gray-200 rounded-full">
                                      <motion.div
                                        initial={{ width: "35%" }}
                                        whileInView={{ width: "65%" }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2, duration: 0.8 }}
                                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                      />
                                      <motion.div
                                        initial={{ left: "35%" }}
                                        whileInView={{ left: "65%" }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                                        className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2 border-purple-500"
                                      />
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Preference 2: Energy Conservation Mode */}
                                <div className="bg-white rounded-xl p-5 shadow-sm">
                                  <div className="flex items-center justify-between mb-4">
                                    <div className="flex-1">
                                      <h3 className="font-semibold text-gray-900 mb-1">Energy Conservation Mode</h3>
                                      <p className="text-sm md:text-xs text-gray-500">Prioritize low-intensity activities</p>
                                    </div>
                                    <motion.button
                                      whileTap={{ scale: 0.95 }}
                                      className={`relative w-12 h-6 rounded-full transition-colors ${
                                        true ? 'bg-emerald-500' : 'bg-gray-300'
                                      }`}
                                    >
                                      <motion.div
                                        animate={{ x: true ? 24 : 0 }}
                                        className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
                                      />
                                    </motion.button>
                                  </div>
                                  <p className="text-sm md:text-xs text-gray-400 mt-2">
                                    {true ? 'Active' : 'Inactive'} • System will filter high-energy activities
                                  </p>
                                </div>
                                
                                {/* Preference 3: Indoor Preference */}
                                <div className="bg-white rounded-xl p-5 shadow-sm">
                                  <div className="flex items-center justify-between mb-4">
                                    <div className="flex-1">
                                      <h3 className="font-semibold text-gray-900 mb-1">Indoor Preference</h3>
                                      <p className="text-sm md:text-xs text-gray-500">Weather-triggered auto-adjustment</p>
                                    </div>
                                    <motion.button
                                      whileTap={{ scale: 0.95 }}
                                      className={`relative w-12 h-6 rounded-full transition-colors ${
                                        true ? 'bg-amber-500' : 'bg-gray-300'
                                      }`}
                                    >
                                      <motion.div
                                        animate={{ x: true ? 24 : 0 }}
                                        className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
                                      />
                                    </motion.button>
                                  </div>
                                  <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                                    <div className="flex items-center gap-2 mb-1">
                                      <FaCloudSun className="w-4 h-4 text-amber-600" />
                                      <span className="text-sm md:text-xs font-semibold text-amber-900">Weather Trigger Active</span>
                                    </div>
                                    <p className="text-sm md:text-xs text-amber-700">
                                      System will automatically suggest indoor alternatives when rain is in the forecast
                                    </p>
                                  </div>
                                </div>
                                
                                {/* Save Button */}
                                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-colors">
                                  Save Preferences
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Designer Note */}
                        <div className="mt-4 max-w-[280px]">
                          <p className="text-sm md:text-xs text-gray-400 italic leading-relaxed text-center">
                            <strong className="text-amber-400 not-italic">System Logic:</strong> Semantic Preference Tuning allows users to configure how the Context Interpreter weights different signals. These preferences generate Decision Vector parameters, enabling personalized orchestration. The system maintains explainability by showing active triggers and their effects in real-time.
                          </p>
                        </div>
                      </div>
                      
                      {/* Mobile Screen D: The Spontaneous Landing (Arrival Portal) */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-full max-w-[280px] aspect-[9/19.5] bg-slate-800 rounded-[2.5rem] p-2 shadow-2xl">
                          {/* Device Frame */}
                          <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                            {/* Status Bar */}
                            <div className="h-12 bg-gradient-to-b from-gray-50 to-white flex items-center justify-between px-6 pt-2">
                              <span className="text-sm md:text-xs font-semibold text-gray-900">9:41</span>
                              <div className="flex items-center gap-1">
                                <div className="w-4 h-2 border border-gray-900 rounded-sm">
                                  <div className="w-3 h-1.5 bg-gray-900 rounded-sm m-0.5"></div>
                                </div>
                              </div>
                            </div>
                            
                            {/* App Content */}
                            <div className="h-[calc(100%-3rem)] bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 overflow-y-auto">
                              {/* Flight Info Header */}
                              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 border-b border-blue-500/30">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="font-mono text-sm md:text-xs tracking-wider">
                                    FLIGHT BA247 • LANDED • LISBON
                                  </div>
                                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                </div>
                                <div className="text-sm font-semibold mt-1">Adventure Awaits</div>
                              </div>
                              
                              {/* Main Content */}
                              <div className="p-6 space-y-6">
                                {/* Narrative Prompt */}
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.2 }}
                                  className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100"
                                >
                                  <div className="text-sm md:text-xs font-mono text-blue-600 uppercase tracking-wider mb-3">The Arrival Portal</div>
                                  <div className="text-gray-800 leading-relaxed text-sm space-y-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    <p>
                                      The baggage carousel is a transition, not a destination. While you wait for your luggage, the city is breathing.
                                    </p>
                                    <p>
                                      A vintage tram is departing in <strong className="text-blue-600">40 minutes</strong> from the terminal exit—it's the slow way into the Chiado district, passing the bakeries as they pull the first morning <em>pastéis de nata</em> from the ovens.
                                    </p>
                                    <p className="font-semibold text-blue-700">
                                      Shall we take the scenic route instead of a taxi?
                                    </p>
                                  </div>
                                </motion.div>
                                
                                {/* Action Buttons */}
                                <div className="space-y-3">
                                  <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
                                  >
                                    Initiate Scenic Route
                                  </motion.button>
                                  <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 }}
                                    className="w-full bg-white border-2 border-blue-300 text-blue-700 font-semibold py-3 rounded-xl hover:bg-blue-50 transition-all"
                                  >
                                    Standard Transit (Logistics Only)
                                  </motion.button>
                                </div>
                                
                                {/* System Logic Footer - Scanning Animation */}
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  whileInView={{ opacity: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.6 }}
                                  className="bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl p-4 space-y-3"
                                >
                                  <div className="text-sm md:text-xs font-mono text-blue-400/80 mb-2">System Logic (The Engine):</div>
                                  
                                  {/* Scanning Indicators */}
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <motion.div
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="w-2 h-2 bg-blue-400 rounded-full"
                                      />
                                      <span className="text-sm md:text-xs font-mono text-gray-300">[Syncing Flight API]</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <motion.div
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                                        className="w-2 h-2 bg-cyan-400 rounded-full"
                                      />
                                      <span className="text-sm md:text-xs font-mono text-gray-300">[Local Transit Real-time]</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <motion.div
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                                        className="w-2 h-2 bg-blue-400 rounded-full"
                                      />
                                      <span className="text-sm md:text-xs font-mono text-gray-300">[Hyper-local POI Density]</span>
                                    </div>
                                  </div>
                                  
                                  {/* Data Points */}
                                  <div className="pt-3 border-t border-slate-700 space-y-1">
                                    <div className="flex items-center justify-between text-sm md:text-xs font-mono">
                                      <span className="text-gray-400">GATE:</span>
                                      <span className="text-blue-400">B12</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm md:text-xs font-mono">
                                      <span className="text-gray-400">ARRIVAL:</span>
                                      <span className="text-green-400">+4m early</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm md:text-xs font-mono">
                                      <span className="text-gray-400">TAXI QUEUE:</span>
                                      <span className="text-amber-400">18min wait</span>
                                    </div>
                                  </div>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Designer Note */}
                        <div className="mt-4 max-w-[280px]">
                          <p className="text-sm md:text-xs text-gray-400 italic leading-relaxed text-center">
                            <strong className="text-blue-400 not-italic">System Logic:</strong> The "Waiting Window" solves a critical UX pain point: the dead time at baggage carousel. By showing the AI is already "thinking" ahead of the user's luggage, we prove the system's value as a proactive companion. The prompt emphasizes Meaning over Efficiency—Scenic Route vs. Taxi—highlighting the core value proposition of the Narrative Layer.
                          </p>
                        </div>
                      </div>
                      
                    </div>
                  </motion.div>
                  
                </div>
              </motion.div>
            </div>
          </section>

          {/* System Evolution & Deployment Section */}
          <section id="prototyping-ai" className="py-20 bg-gradient-to-b from-white via-gray-50 to-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                {/* Section Header */}
                <div className="text-center mb-16">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                      System Evolution & Deployment
                    </h2>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                      <p className="text-amber-700 text-sm font-medium">
                        Work In Progress
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* The Core Solution */}
                <div className="bg-white rounded-xl p-8 md:p-10 border border-gray-200 shadow-lg mb-12">
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                      The Core Solution
                    </h3>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                      A comprehensive system for adaptive planning that bridges structure with spontaneity.
                    </p>
                  </div>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    The Travel Planning Assistant utilizes adaptive planning algorithms to maintain fluidity without sacrificing structure. By processing real-time constraints (weather, transit delays, crowd density) alongside user preferences, the system delivers a unified itinerary that evolves as the trip unfolds.
                  </p>
                </div>

                {/* Horizontal Rule Separator */}
                <div className="my-12 border-t border-gray-300"></div>

                {/* Build Status: Active Development */}
                <div className="bg-black rounded-xl p-8 md:p-10 border border-gray-800 mb-12">
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full mb-4">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                      <p className="text-amber-300 text-sm font-medium" style={{ fontFamily: 'monospace' }}>
                        Work In Progress
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-400 mb-2" style={{ fontFamily: 'monospace' }}>
                        Status:
                      </p>
                      <p className="text-lg font-semibold text-white" style={{ fontFamily: 'monospace' }}>
                        Phase 2 - Constraint Engine Integration
                      </p>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      Development is focused on the bridge between static itinerary data and real-time environmental APIs.
                    </p>
                  </div>

                  {/* Bento-box Layout: Current Capabilities vs Future Intent */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {/* What Currently Works */}
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        1. What Currently Works
                        <span className="text-sm font-normal text-gray-400 ml-auto">(The Foundation)</span>
                      </h4>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-gray-500 mt-1">•</span>
                          <span><strong className="text-white">Architectural Framework:</strong> Core system design for context-aware state management.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-500 mt-1">•</span>
                          <span><strong className="text-white">Flexible Itinerary Schema:</strong> Data structures built to support non-linear planning.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-500 mt-1">•</span>
                          <span><strong className="text-white">Initial Constraint Detection:</strong> Logic gates for basic temporal and geographical constraints.</span>
                        </li>
                      </ul>
                    </div>

                    {/* What is Experimental */}
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        2. What is Experimental
                        <span className="text-sm font-normal text-gray-400 ml-auto">(The AI Edge)</span>
                      </h4>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-gray-500 mt-1">•</span>
                          <span><strong className="text-white">Adaptive Re-routing Algorithms:</strong> Testing how the system handles sudden "Plan B" triggers.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-500 mt-1">•</span>
                          <span><strong className="text-white">Contextual Sentiment Analysis:</strong> Experimenting with how user mood/energy levels influence adaptive suggestions.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-500 mt-1">•</span>
                          <span><strong className="text-white">Real-Time Constraint Fusion:</strong> Processing multiple live data streams simultaneously.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Live Demo & Future Roadmap */}
                <div className="bg-white rounded-xl p-8 md:p-10 border border-gray-200">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">
                    Live Demo & Future Roadmap
                  </h3>
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <p className="text-gray-700 italic mb-4">
                        A live demo will be available once the adaptive planning system completes Phase 3 validation.
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 mb-3">
                        <strong className="text-gray-900">Planned Next:</strong> Advanced predictive algorithms for anticipatory planning (solving friction before the user notices it).
                      </p>
                      <p className="text-gray-700">
                        <strong className="text-gray-900">Integration:</strong> Deep-linking with localized transit and event APIs for hyper-local context.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Launch & Testing Section */}
          <section id="outcomes-launch" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Launch & Testing
                  </h2>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4 text-white">Launch Strategy</h3>
                    <p className="text-gray-300 mb-4">
                      Will start with a closed beta focusing on adaptive planning accuracy and user satisfaction with flexible itinerary management, followed by gradual rollout based on constraint detection system performance.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Beta Testing</span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Adaptive Algorithms</span>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">Constraint Detection</span>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-xl p-8 md:p-10 border border-gray-800">
                    <h3 className="text-2xl font-bold mb-6 text-white">
                      Launch & Testing Strategy
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <p className="text-gray-300 mb-3">
                          <strong className="text-white">Closed Beta:</strong> Focusing on "Adaptive Accuracy"—how often the system's re-routing matches human intent.
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-300 mb-3">
                          <strong className="text-white">Performance Metrics:</strong> Success is measured by the "Flexibility Score"—the system's ability to resolve schedule conflicts with zero manual input.
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-300 mb-2">
                          <strong className="text-white">Beta Tracks:</strong>
                        </p>
                        <ul className="space-y-2 ml-4">
                          <li className="text-gray-300 flex items-start gap-2">
                            <span className="text-gray-500 mt-1">•</span>
                            <span><strong className="text-white">Track A:</strong> Adaptive Algorithmic Stress Testing</span>
                          </li>
                          <li className="text-gray-300 flex items-start gap-2">
                            <span className="text-gray-500 mt-1">•</span>
                            <span><strong className="text-white">Track B:</strong> Real-time Constraint Ingestion Performance</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Outcome & Learnings Section */}
          <section id="learnings-next" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Outcome & Learnings
                  </h2>
                </div>
                
                <div className="space-y-12">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Key Learnings</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        Building an adaptive planning system means constantly questioning when to provide structure versus when to enable freedom. The challenge isn't having enough planning features—it's knowing when to step back and let travelers explore. Early prototypes showed that too much structure can feel restrictive, while too little can feel chaotic. The system needs to find the right balance for each traveler and situation.
                      </p>
                      <p>
                        Real-time constraint detection requires architectural decisions that happen at the data layer. The system needs to monitor multiple constraint sources—delays, closures, weather, availability—and process them in real-time to generate adaptive suggestions. This means building constraint detection into the core architecture, not adding it as an afterthought.
                      </p>
                      <p>
                        Flexible planning is more complex than simply allowing edits. A plan can be technically editable but still feel rigid if the adaptation process is cumbersome. The system needs to make adaptation feel natural and effortless, automatically suggesting alternatives when constraints change.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Technical Surprises & Insights</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        <strong className="text-gray-900">Surprise 1: The API Impedance Mismatch.</strong> Most travel APIs (Amadeus, Sabre) are built for ACID transactions, not event-driven streaming. CATDS had to bridge this fundamental architectural gap. These APIs return "Flight is Booked" as a static state, but the system needs to process "Flight is Delayed" as a streaming event. This required building an abstraction layer that translates transactional responses into event streams, introducing latency but enabling real-time adaptation.
                      </p>
                      <p>
                        <strong className="text-gray-900">Surprise 2: The Paradox of Choice in Automation.</strong> Users don't want the AI to *decide*; they want the AI to *curate the pivot.* The system learned that automation works best when it narrows options rather than making final decisions. When a flight is delayed, users don't want the system to automatically rebook—they want it to present 2-3 viable alternatives with clear trade-offs. This human-in-the-loop pattern became central to the Trust Layer's design.
                      </p>
                      <p>
                        The depth of user frustration with tool fragmentation was more pronounced than expected. Users don't just want better planning tools—they want tools that work together seamlessly. This requires building integration capabilities from the ground up, not just improving individual features.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Reflections & Next Steps Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Reflections & Next Steps
                  </h2>
                </div>
                
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    <strong className="text-gray-900">Modular API Integration:</strong> CATDS is designed as a modular system that can be integrated via API into existing platforms (Expedia, Airbnb, etc.) to make their static itineraries "Context-Aware." The middleware layer exposes decision vectors and trust signals through a well-defined API, allowing travel platforms to enhance their existing systems without rebuilding from scratch.
                  </p>
                  <p>
                    Predictive constraint detection remains underexplored. The system currently processes constraints reactively, but travel planning could benefit from predictive models that anticipate delays, closures, or availability issues before they occur. This moves beyond adaptive planning to predictive planning.
                  </p>
                  <p>
                    Integration with booking platforms represents a significant opportunity. The system knows about constraints and preferences, but doesn't yet integrate deeply with booking systems to automatically adjust reservations. Partnerships with booking platforms could close this gap, creating a more seamless adaptive planning experience.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}
      {isSocialOpportunityMatching && (
        <>
          {/* The Problem Section */}
          <section id="research-audience" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    The Problem: The Loneliness Epidemic vs. High Friction
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Understanding the gap between the need for social connection and the friction of planning formal meetups
                  </p>
                </div>
                
                {/* Key Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/20 p-6 rounded-xl border border-blue-500/30">
                    <div className="text-3xl font-bold text-blue-400 mb-2">73%</div>
                    <div className="text-gray-300 text-base md:text-sm">of travelers report feeling lonely while traveling solo</div>
                    <div className="text-gray-500 text-sm md:text-xs mt-2">— Travel Loneliness Study 2024</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/20 p-6 rounded-xl border border-blue-500/30">
                    <div className="text-3xl font-bold text-blue-400 mb-2">67%</div>
                    <div className="text-gray-300 text-base md:text-sm">cite "too much planning required" as barrier to spontaneous social connection</div>
                    <div className="text-gray-500 text-sm md:text-xs mt-2">— Social Connection Research</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/20 p-6 rounded-xl border border-blue-500/30">
                    <div className="text-3xl font-bold text-blue-400 mb-2">15min</div>
                    <div className="text-gray-300 text-base md:text-sm">average time people are willing to commit for low-friction social interactions</div>
                    <div className="text-gray-500 text-sm md:text-xs mt-2">— Behavioral Research</div>
                  </div>
                </div>

                {/* Problem Explanation */}
                <div className="mt-12">
                  <div className="bg-white/5 p-6 md:p-8 rounded-xl border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4">The Loneliness Epidemic</h3>
                    <p className="text-gray-200 text-base leading-relaxed mb-4">
                      Travel inherently creates moments of isolation—solo travelers in new cities, business travelers with empty evenings, and even groups seeking authentic local connections. While the desire for spontaneous social interaction is universal, traditional meetup platforms require extensive planning, mutual availability alignment, and social commitment that creates high friction.
                    </p>
                    <p className="text-gray-300 text-base leading-relaxed">
                      The gap between wanting connection and actually achieving it is often a function of <span className="font-semibold text-blue-400">cognitive load and planning overhead</span> rather than lack of interest. People want lightweight, spontaneous interactions—not formal meetups that require scheduling days in advance.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Market Friction Section */}
          <section id="design-exploration" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Market Friction: The High Cost of Low-Friction Connection
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Existing platforms create barriers through planning overhead and formal commitment requirements
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {/* Friction 1: Planning Overhead */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-100 hover:border-blue-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <h4 className="text-xl font-bold text-gray-900">Planning Overhead</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-blue-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I'd love to grab coffee with someone, but setting it up takes too much back-and-forth messaging. <span className="font-semibold text-blue-700">By the time we coordinate, I'm already somewhere else</span>."</p>
                        <div className="flex items-center gap-2 text-sm md:text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/solotravel</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Friction 2: Formal Commitment */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-100 hover:border-blue-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <h4 className="text-xl font-bold text-gray-900">Formal Commitment</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-blue-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"Meetup apps feel too formal. <span className="font-semibold text-blue-700">I don't want to commit to a 2-hour event</span>—just a quick chat if we're both free."</p>
                        <div className="flex items-center gap-2 text-sm md:text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Twitter, Travel Community</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Friction 3: Missing Context */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-100 hover:border-blue-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <h4 className="text-xl font-bold text-gray-900">Missing Context</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-blue-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I wish I could just know if someone nearby wants to grab a quick coffee <span className="font-semibold text-blue-700">right now</span>, not plan it for tomorrow."</p>
                        <div className="flex items-center gap-2 text-sm md:text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/travelhacks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* The Solution Section */}
          <section id="designs-strategy" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-black">
                    The Solution: Lightweight Intelligence for Spontaneous Connection
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
                    A background module that monitors ambient data to trigger low-friction social matches—designed for integration into existing applications rather than a standalone app.
                  </p>
                </div>
                
                <div className="space-y-4">
                  {/* Core Value Proposition */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-gray-50 p-8 rounded-xl border border-gray-200"
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">How It Works</h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      The Social Opportunity Matching Module operates as a <span className="font-semibold">background intelligence layer</span> that continuously monitors three key signals: <strong>Proximity</strong> (users near each other), <strong>Shared Interests</strong> (common preferences or activities), and <strong>Schedule Gaps</strong> (15-minute windows of availability).
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      When all three signals align, the module surfaces a low-friction opportunity: "Coffee nearby? 15 minutes free?" The interaction is designed to be spontaneous, requiring minimal commitment and zero planning overhead.
                    </p>
                  </motion.div>

                  {/* Integration Approach */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <motion.button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:ring-inset"
                      onClick={() => setActiveAccordion(activeAccordion === 'integration' ? null : 'integration')}
                      aria-expanded={activeAccordion === 'integration'}
                      aria-controls="integration-content"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">Integration Architecture</h3>
                      <motion.div
                        animate={{ rotate: activeAccordion === 'integration' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeAccordion === 'integration' && (
                        <motion.div
                          id="integration-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-6">
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                              The module is designed for integration into existing applications rather than operating as a standalone app. It exposes matching logic through <span className="font-semibold">core platform APIs</span>, allowing travel apps, social platforms, or location-based services to embed spontaneous connection capabilities.
                            </p>
                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">API-First Design</h5>
                                  <p className="text-gray-700">Matching logic exposed through REST APIs and webhooks, enabling integration without UI dependencies.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Background Processing</h5>
                                  <p className="text-gray-700">Continuous monitoring of proximity, interests, and schedule gaps operates in the background without user intervention.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Low-Friction Notifications</h5>
                                  <p className="text-gray-700">Opportunities surface as lightweight notifications or in-app prompts, requiring minimal interaction to accept or decline.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Technical Architecture Section */}
          <section id="wireframes-ui" className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-zinc-950 to-blue-950/20 pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.1]">
                    Technical Architecture: Matching Logic
                  </h2>
                  <p className="text-gray-400 text-lg max-w-3xl mx-auto text-balance mb-6">
                    Proximity + Context + Intent = Low-Friction Social Opportunity
                  </p>
                  <div className="max-w-4xl mx-auto space-y-4 text-left mt-8">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-3">Proximity Detection</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Real-time location monitoring identifies when users are within a configurable proximity threshold (e.g., 500m). Privacy-first implementation uses encrypted location data and only surfaces matches when both parties are available.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-3">Interest Matching</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Shared interests are detected through user preferences, activity history, and profile data. The system uses lightweight similarity scoring rather than deep learning to maintain low computational overhead and fast response times.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-3">Schedule Gap Analysis</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Calendar integration and movement pattern analysis identify 15-minute "schedule gaps" when users have availability. The system prioritizes matches where both parties have overlapping gaps, ensuring interactions are genuinely low-friction.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Design Impact Section */}
          <section id="prototyping-ai" className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Design Impact: Reducing Cognitive Load
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    The system is designed to reduce the cognitive overhead of social planning
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-50 p-8 rounded-2xl border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Impact for Users
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Spontaneous social connection leads to <span className="font-semibold text-blue-700">reduced loneliness and increased travel satisfaction</span>. By eliminating planning overhead, users can engage in <span className="font-semibold text-blue-700">genuinely spontaneous interactions</span> without the cognitive burden of coordination.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-blue-50 p-8 rounded-2xl border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Sparkles className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Impact for Platforms
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      When platforms integrate this module, they unlock new engagement opportunities without building from scratch. <span className="font-semibold text-blue-700">Users spend more time in-app</span>, and platforms can differentiate through unique social connection capabilities.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}
      {isLocalExperienceFinder && (
        <>
          {/* Audience & Research Section */}
          <section id="research-audience" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Market Friction
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Systemic gaps in social discovery for travelers
                  </p>
                </div>
                
                {/* Market Friction Table */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden mb-12">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/5 border-b border-white/10">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm md:text-sm font-semibold text-gray-300 uppercase tracking-wider">Insight</th>
                          <th className="px-6 py-4 text-left text-sm md:text-sm font-semibold text-gray-300 uppercase tracking-wider">Systemic Gap</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        <tr className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-gray-300 text-base md:text-base">
                            Struggle to find authentic connections
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-base md:text-base">
                            Existing apps prioritize "matches" over "identity"
                          </td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-gray-300 text-base md:text-base">
                            Traditional networks feel superficial for travel
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-base md:text-base">
                            Lack of intent-based discovery signals
                          </td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-gray-300 text-base md:text-base">
                            Demand high-granularity privacy controls
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-base md:text-base">
                            Current UX is binary (Public vs. Private)
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
              </motion.div>
            </div>
          </section>

          {/* Challenge Section */}
          <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    The Challenge: Systemic Social Friction
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    The Privacy-Discovery Paradox: Travelers face a fundamental tension between meaningful connections and data protection
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 p-8 rounded-2xl border-2 border-amber-100 hover:shadow-lg transition-all duration-300">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">
                        The Problem: Privacy-Discovery Paradox
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Travelers face a "Privacy-Discovery Paradox." To find meaningful connections, they must over-expose personal data; to stay private, they sacrifice discovery. Current systems force a binary choice: <span className="font-semibold text-red-700">full visibility for discovery or complete privacy with isolation</span>.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">
                        The Solution: Discovery Through Network Effects
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      An AI-orchestrated system that enables <span className="font-semibold text-blue-700">autonomous discovery through network effects</span>. Instead of browsing "listings," the system autonomously surfaces opportunities from a graph of <strong>People → Places → Intent</strong>, where the AI acts as a proactive, privacy-preserving concierge. The system surfaces high-trust social opportunities without requiring search or full data exposure.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Observed Travel Frictions Section */}
          <section id="design-exploration" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Observed Travel Frictions: User Signal Analysis
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Real user feedback reveals pattern-level insights about systemic gaps in social discovery
                  </p>
                </div>
                
                <div className="space-y-8">
                  {/* Friction 1: Style-Identity Metadata Gap */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:border-red-200 transition-all duration-300">
                    <div className="mb-4">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Friction: Lack of Style-Identity Metadata</h4>
                      <blockquote className="border-l-4 border-red-400 pl-4 mb-4">
                        <p className="text-gray-700 italic leading-relaxed mb-2">
                          "I want to meet people who share my travel style, but most apps are just for hookups... there's no way to find like-minded travelers."
                        </p>
                        <cite className="text-sm md:text-sm text-gray-500 not-italic">— r/solotravel</cite>
                      </blockquote>
                      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                        <p className="text-base md:text-base text-gray-700">
                          <strong className="text-red-700">Systemic Analysis:</strong> Current systems lack "Style-Identity" metadata. Matching algorithms operate on location, age, and generic interests, but fail to encode travel-specific identity signals (exploration style, cultural engagement depth, spontaneity preferences).
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Friction 2: Graded Visibility Failure */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-orange-100 hover:border-orange-200 transition-all duration-300">
                    <div className="mb-4">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Friction: Architectural Failure in Graded Visibility</h4>
                      <blockquote className="border-l-4 border-orange-400 pl-4 mb-4">
                        <p className="text-gray-700 italic leading-relaxed mb-2">
                          "Social travel apps require full profile visibility. I want to control who sees what about me."
                        </p>
                        <cite className="text-sm md:text-sm text-gray-500 not-italic">— Blog Comment</cite>
                      </blockquote>
                      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                        <p className="text-base md:text-base text-gray-700">
                          <strong className="text-orange-700">Systemic Analysis:</strong> Architectural failure to implement "Graded Visibility." Privacy controls are binary (Public/Private) rather than context-aware. The system cannot support zero-knowledge proof concepts where users share *proof* of travel style without sharing specific itinerary data.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Concept & Strategy Section */}
          <section id="designs-strategy" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-black">
                    Concept & Strategy
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {/* Unique Value Proposition */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-gray-50 p-8 rounded-xl border border-gray-200"
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">Macro-Mapping & Micro-Intent: The Dual-Interface Strategy</h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      The system provides two complementary views: a high-density <strong>Intent Table</strong> for precise node analysis and a <strong>Global Map View</strong> for spatial pattern recognition. Users can toggle between these views to move seamlessly from macro-trend discovery to micro-intent matching.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      This dual-interface design ensures both analytical and exploratory UI needs are met—enabling users to see 'Trust Clusters' forming globally while providing granular access to specific "who wants to visit where" metadata.
                    </p>
                    
                    <div className="space-y-4 mt-6">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-1">The Intent Table (Micro-Analysis)</h5>
                          <p className="text-gray-700 text-base md:text-base">Designed for high-density scanning of specific nodes. It surfaces the raw metadata of "who" and "where" (e.g., "[User] wants to visit [City]") to minimize the "coordination tax" of travel planning. The table format allows for quick comparison of temporal and geographic data that maps often obscure.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-1">The Global Map (Macro-Discovery)</h5>
                          <p className="text-gray-700 text-base md:text-base">A spatial visualization of the social graph's gravity. It allows users to see "Trust Clusters" forming globally, identifying where their network is trending before they even decide on a destination. The map visualizes the 'Reach' of the user's influence and the density of the Trust Layer across different territories.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Design Decisions: Density vs. Context */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gray-50 p-8 rounded-xl border border-gray-200 mt-6"
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">Design Decisions: Density vs. Context</h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      The dual-interface design addresses two distinct analytical needs: precision for comparison (table) and pattern recognition for discovery (map).
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-1">Table as Source of Truth</h5>
                          <p className="text-gray-700 text-base md:text-base">Why a table? Because social data requires precision. The "Wants to Visit" schema allows for quick comparison of temporal and geographic data that maps often obscure. The tabular format minimizes the "coordination tax" by presenting "who" and "where" metadata in a scannable, filterable format.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-1">Map as Pattern Recognition</h5>
                          <p className="text-gray-700 text-base md:text-base">Why a map? To visualize the 'Reach' of the user's influence and the density of the Trust Layer across different territories. The Global Map View enables macro-discovery—identifying where Trust Clusters are forming before the user commits to a destination, revealing network trends that tables cannot easily communicate.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-1">Privacy as UX</h5>
                          <p className="text-gray-700 text-base md:text-base">Using ZK-proofs as a design feature that builds user confidence. Users can verify connections without exposing personal data, creating trust through cryptographic validation rather than data transparency.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* The Spontaneity Core Section */}
          <section id="spontaneity-core" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    The Spontaneity Core: Reducing Social Friction
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    To facilitate authentic connection, the system automates the 'Coordination Tax' through three AI-driven lenses
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">The Identity Filter</h3>
                        <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                          Matches users based on 'Travel DNA' (Vibe-based alignment) instead of raw proximity.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Zero-Knowledge Discovery</h3>
                        <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                          Allows users to be 'discoverable' in the graph without leaking precise GPS data until a mutual match is confirmed.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Presence Intelligence</h3>
                        <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                          Prioritizes connections currently where you are, or where you intend to be, enabling real-time spontaneous coordination.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* System Overview Section */}
          <section className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-zinc-950 to-violet-950/20 pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
              >
                <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.1]">
                  The Trust Layer: Logic Gates & Validation Firewall
                </h2>
                <p className="text-gray-400 text-lg max-w-3xl mx-auto text-balance mb-8">
                  The Trust Layer acts as the system's validation firewall, processing raw social data through three sequential logic gates before surfacing a recommendation. Security-as-UX: Algorithmic integrity ensures privacy-preserving discovery.
                </p>
                </div>
                
                {/* Trust Layer Logic Gates */}
                <div className="max-w-5xl mx-auto flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-6 mb-16">
                  {/* Gate 01: Proximity Gate */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-indigo-500/30 p-6 md:p-8"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center border border-indigo-400/30">
                        <span className="text-2xl font-bold text-indigo-400">L1</span>
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-white text-left">Gate 01: The Proximity Gate</h3>
                        <p className="text-sm text-gray-400 text-left">Degrees of Separation Filter</p>
                      </div>
                    </div>
                    <div className="ml-0 space-y-3 text-left">
                      <div>
                        <p className="text-sm text-gray-400 mb-1 text-left"><strong className="text-white">Metric:</strong> Degrees of Separation (d)</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 font-mono text-sm text-left">
                        <div className="text-emerald-400 mb-1 text-left">Score = 1/d²</div>
                      </div>
                      <div>
                        <p className="text-gray-300 text-base md:text-base leading-relaxed text-left">
                          <strong className="text-white">System Action:</strong> Prioritizes 1st and 2nd-degree connections. 3rd-degree nodes are held in a "Probationary State" until a secondary "Vouch" signal is detected.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Gate 02: Verification Gate */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-emerald-500/30 p-6 md:p-8"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-400/30">
                        <span className="text-2xl font-bold text-emerald-400">L2</span>
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-white text-left">Gate 02: The Verification Gate</h3>
                        <p className="text-sm text-gray-400 text-left">ZK-Proof Travel Validation</p>
                      </div>
                    </div>
                    <div className="ml-0 space-y-3 text-left">
                      <div>
                        <p className="text-sm text-gray-400 mb-1 text-left"><strong className="text-white">Metric:</strong> ZK-Proof Travel Validation</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 text-left">
                        <p className="text-emerald-400 text-sm font-mono mb-2 text-left">Cryptographic verification of location history</p>
                        <p className="text-gray-400 text-base md:text-base text-left">Without data exfiltration</p>
                      </div>
                      <div>
                        <p className="text-gray-300 text-base md:text-base leading-relaxed text-left">
                          <strong className="text-white">System Action:</strong> If a user claims expertise in "Kyoto," the gate verifies the timestamped proof. Verified nodes receive a +40% weighting in the discovery feed.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Gate 03: Contextual Gate */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6 md:p-8"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-400/30">
                        <span className="text-2xl font-bold text-purple-400">L3</span>
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-white text-left">Gate 03: The Contextual Gate</h3>
                        <p className="text-sm text-gray-400 text-left">Persona Alignment (NLP)</p>
                      </div>
                    </div>
                    <div className="ml-0 space-y-3 text-left">
                      <div>
                        <p className="text-sm text-gray-400 mb-1 text-left"><strong className="text-white">Metric:</strong> Persona Alignment (NLP)</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 text-left">
                        <p className="text-purple-400 text-sm font-mono text-left">Vector similarity between requester's "Travel DNA"</p>
                        <p className="text-gray-400 text-base md:text-base mt-1 text-left">and source's historical behavior</p>
                      </div>
                      <div>
                        <p className="text-gray-300 text-base md:text-base leading-relaxed text-left">
                          <strong className="text-white">System Action:</strong> Downgrades high-trust connections if travel styles are mismatched (e.g., a Luxury traveler recommending a hostel to a Backpacker).
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Privacy-Gated Network Effects: Logic-to-Interface Schematic */}
                <div className="relative mt-16 pt-12 border-t border-white/10">
                  <div className="text-center mb-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>From Black Box to Transparent Trust</h3>
                    <p className="text-gray-400 text-base max-w-3xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>Evidence-Based UI: How the Trust Layer manifests as real-time feedback in the user interface</p>
                  </div>
                  
                  {/* Schematic Container with Grid Background */}
                  <div className="relative max-w-7xl mx-auto">
                    {/* Technical Grid Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="grid grid-cols-20 grid-rows-12 h-full w-full">
                        {[...Array(240)].map((_, i) => (
                          <div key={i} className="border border-indigo-500/20" />
                        ))}
                      </div>
                    </div>
                    
                    {/* Main Flow: User Terminal → Trust Intersection → Trust Card */}
                    <div className="relative z-10">
                      {/* Connection Lines - Desktop Only */}
                      <div className="hidden lg:block absolute inset-0 pointer-events-none">
                        {/* Line 1: Input → Processing */}
                        <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          <motion.div
                            animate={{
                              x: [0, 20, 0],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="flex items-center gap-2"
                          >
                            <div className="h-0.5 w-32 bg-gradient-to-r from-indigo-400/50 to-emerald-400/50"></div>
                            <ArrowRight className="w-5 h-5 text-emerald-400" />
                            <span className="text-xs text-gray-400 font-mono absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                              [DATA MINIMIZED]
                            </span>
                          </motion.div>
                        </div>
                        
                        {/* Line 2: Processing → Output */}
                        <div className="absolute right-1/3 top-1/2 translate-x-1/2 -translate-y-1/2">
                          <motion.div
                            animate={{
                              x: [0, 20, 0],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: 0.3,
                            }}
                            className="flex items-center gap-2"
                          >
                            <div className="h-0.5 w-32 bg-gradient-to-r from-emerald-400/50 to-cyan-400/50"></div>
                            <ArrowRight className="w-5 h-5 text-cyan-400" />
                            <span className="text-xs text-gray-400 font-mono absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                              [TRUST VERIFIED]
                            </span>
                          </motion.div>
                        </div>
                      </div>
                      
                      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start mb-12 relative">
                        
                        {/* Stage 1: User Terminal (Input State) */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                          className="lg:col-span-1"
                        >
                          <div className="relative">
                            {/* Annotated Label */}
                            <div className="absolute -top-6 left-0 text-xs text-gray-400 font-mono uppercase tracking-wider">
                              <span className="text-indigo-400">[INPUT STATE]</span>
                            </div>
                            
                            {/* Mobile UI Frame - Privacy Dashboard */}
                            <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border-2 border-indigo-500/40 rounded-3xl p-6 shadow-2xl" style={{ maxWidth: '320px', margin: '0 auto' }}>
                              {/* Mobile Frame Header */}
                              <div className="flex items-center justify-between mb-6">
                                <div className="text-white font-semibold text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Privacy Dashboard</div>
                                <Shield className="w-5 h-5 text-indigo-400" />
                              </div>
                              
                              {/* Toggle State */}
                              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 mb-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-gray-300 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Active Discovery</span>
                                  <div className="relative inline-block w-12 h-6 bg-emerald-500/30 rounded-full">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-emerald-400 rounded-full shadow-lg"></div>
                                  </div>
                                </div>
                                <div className="text-gray-400 text-xs font-mono">Next 14 Days</div>
                              </div>
                              
                              {/* Identity Chip */}
                              <div className="bg-indigo-500/10 backdrop-blur-sm rounded-xl border border-indigo-400/30 p-4">
                                <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Identity Chip</div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="px-3 py-1.5 bg-indigo-500/20 border border-indigo-400/40 rounded-lg text-indigo-300 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    Slow Travel
                                  </span>
                                  <span className="px-3 py-1.5 bg-indigo-500/20 border border-indigo-400/40 rounded-lg text-indigo-300 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    Street Photography
                                  </span>
                                </div>
                              </div>
                              
                              {/* Micro-copy Label */}
                              <div className="mt-4 text-center">
                                <span className="text-xs text-gray-500 font-mono px-2 py-1 bg-slate-800/50 rounded border border-slate-700/50">
                                  [EPHEMERAL NODE ACTIVE]
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Stage 2: Trust Intersection (Processing State) */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="lg:col-span-1"
                        >
                          <div className="relative">
                            {/* Annotated Label */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-mono uppercase tracking-wider whitespace-nowrap">
                              <span className="text-emerald-400">[PROCESSING STATE]</span>
                            </div>
                            
                            {/* Processing Hub */}
                            <div className="bg-gradient-to-br from-emerald-900/30 via-slate-900/90 to-cyan-900/30 backdrop-blur-xl border-2 border-emerald-500/50 rounded-3xl p-6 shadow-2xl">
                              <div className="text-center mb-6">
                                <div className="relative inline-block">
                                  <motion.div
                                    animate={{
                                      scale: [1, 1.1, 1],
                                      opacity: [0.6, 1, 0.6],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full"
                                  />
                                  <Network className="w-12 h-12 text-emerald-400 relative z-10" />
                                </div>
                                <h5 className="text-white font-semibold mt-3 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Processing Hub</h5>
                              </div>
                              
                              {/* Logic Gates (Visualized) */}
                              <div className="space-y-4">
                                {/* Scan 01: Connection Strength */}
                                <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-300 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>Connection Strength</span>
                                    <span className="text-emerald-400 text-xs font-mono">75%</span>
                                  </div>
                                  {/* Signal Strength Bar */}
                                  <div className="w-full h-2 bg-slate-800/50 rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      whileInView={{ width: '75%' }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 1, delay: 0.5 }}
                                      className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                                    />
                                  </div>
                                  <div className="text-gray-400 text-xs mt-1 font-mono">Mutual Friends</div>
                                </div>
                                
                                {/* Scan 02: Verification Proof */}
                                <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-300 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>Verification Proof</span>
                                    <motion.div
                                      animate={{
                                        scale: [1, 1.2, 1],
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                      }}
                                    >
                                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                                    </motion.div>
                                  </div>
                                  <div className="text-gray-400 text-xs font-mono">ZK-Proof Validated</div>
                                </div>
                                
                                {/* Scan 03: Interest Overlap (Venn Diagram) */}
                                <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-3">
                                  <div className="text-gray-300 text-xs mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Interest Overlap</div>
                                  {/* Simple Venn Diagram Representation */}
                                  <div className="relative h-20 flex items-center justify-center">
                                    <div className="absolute left-4 w-12 h-12 bg-indigo-500/30 rounded-full border border-indigo-400/50"></div>
                                    <div className="absolute right-4 w-12 h-12 bg-violet-500/30 rounded-full border border-violet-400/50"></div>
                                    <div className="absolute w-10 h-10 bg-emerald-500/40 rounded-full border-2 border-emerald-400 z-10 flex items-center justify-center">
                                      <span className="text-xs text-white font-semibold">Ramen</span>
                                    </div>
                                  </div>
                                  <div className="flex justify-center gap-2 mt-2">
                                    <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-400/30 rounded text-emerald-300 text-xs font-mono">Architecture</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Micro-copy Label */}
                              <div className="mt-4 text-center">
                                <span className="text-xs text-gray-500 font-mono px-2 py-1 bg-slate-800/50 rounded border border-slate-700/50">
                                  [IDENTITY MATCHED]
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Stage 3: Trust Card (Output State) */}
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          className="lg:col-span-1"
                        >
                          <div className="relative">
                            {/* Annotated Label */}
                            <div className="absolute -top-6 right-0 text-xs text-gray-400 font-mono uppercase tracking-wider">
                              <span className="text-cyan-400">[OUTPUT STATE]</span>
                            </div>
                            
                            {/* Trust Card UI */}
                            <div className="bg-gradient-to-br from-cyan-900/30 via-slate-900/90 to-emerald-900/30 backdrop-blur-xl border-2 border-cyan-500/50 rounded-3xl p-6 shadow-2xl" style={{ maxWidth: '320px', margin: '0 auto' }}>
                              {/* Card Header */}
                              <div className="flex items-center gap-2 mb-4">
                                <CheckCircle className="w-5 h-5 text-cyan-400" />
                                <h5 className="text-white font-semibold text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Verified Recommendation</h5>
                              </div>
                              
                              {/* Recommendation Content */}
                              <div className="space-y-4">
                                {/* Place/Experience Info */}
                                <div>
                                  <h6 className="text-white font-semibold mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Tokyo Ramen District</h6>
                                  <p className="text-gray-400 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>Local street food experience</p>
                                </div>
                                
                                {/* Vouched By Badge */}
                                <div className="bg-emerald-500/10 backdrop-blur-sm rounded-lg border border-emerald-400/30 p-3">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Users className="w-4 h-4 text-emerald-400" />
                                    <span className="text-emerald-300 text-xs font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>Vouched By</span>
                                  </div>
                                  <p className="text-gray-300 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>3 Mutual Friends have stayed here</p>
                                </div>
                                
                                {/* Proximity Indicator */}
                                <div className="bg-indigo-500/10 backdrop-blur-sm rounded-lg border border-indigo-400/30 p-3">
                                  <div className="flex items-center gap-2">
                                    <Network className="w-4 h-4 text-indigo-400" />
                                    <span className="text-indigo-300 text-xs font-mono">Friend-of-a-Friend (FofF) Match</span>
                                  </div>
                                </div>
                                
                                {/* Privacy Guardrail */}
                                <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 p-3">
                                  <div className="flex items-start gap-2">
                                    <Shield className="w-4 h-4 text-slate-400 mt-0.5" />
                                    <p className="text-gray-400 text-xs leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                                      Location shared only because you both opted-in for Tokyo
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Micro-copy Label */}
                              <div className="mt-4 text-center">
                                <span className="text-xs text-gray-500 font-mono px-2 py-1 bg-slate-800/50 rounded border border-slate-700/50">
                                  [RECOMMENDATION VERIFIED]
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {/* System Log - Mathematical Model */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-16 pt-8 border-t border-white/10"
                  >
                    <div className="text-center">
                      <p className="text-gray-400 text-xs mb-3 font-mono uppercase tracking-wider">System Log</p>
                      <div className="inline-block backdrop-blur-xl bg-slate-900/90 border border-slate-700/50 rounded-lg p-4 md:p-6 shadow-xl max-w-3xl font-mono text-left">
                        <div className="text-gray-500 text-xs mb-2">[INFO] Connection calculation executed</div>
                        <div className="text-cyan-300 text-sm md:text-base mb-2">
                          M<sub>connection</sub> = (I<sub>A</sub> ∩ I<sub>B</sub>) × (P<sub>A</sub> · P<sub>B</sub>) × vouch(n)
                        </div>
                        <div className="text-gray-400 text-xs space-y-1 border-t border-slate-700/50 pt-2 mt-2">
                          <div><span className="text-cyan-400">→</span> I: Multi-modal graph nodes (Intent, Interest, Provenance)</div>
                          <div><span className="text-emerald-400">→</span> P: Privacy Gate Status (Binary)</div>
                          <div><span className="text-indigo-400">→</span> vouch(n): Trust Coefficient based on degrees of separation</div>
                          <div className="text-gray-500 mt-2">[SUCCESS] High-trust connection established: Score 0.92</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Technical Constraints Section */}
          <section className="py-20 bg-slate-800/50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 md:p-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">System Architecture: Technical Deep-Dive</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Data Privacy Layer</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-semibold text-emerald-100 mb-2">DIDs</h4>
                          <p className="text-white leading-relaxed">
                            Identity is anchored to user-owned DIDs to prevent central harvesting. This architecture ensures that user identity remains portable across platforms and cannot be controlled by a single entity.
                          </p>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-emerald-100 mb-2">Ephemeral Activation</h4>
                          <p className="text-white leading-relaxed">
                            Users appear on the "Living Map" only during active transit or planning states. Nodes only enter the active graph during a defined 'Planning Window' and auto-deactivate post-trip. This temporal activation model minimizes exposure windows and ensures that user data is only discoverable during relevant travel periods.
                          </p>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-emerald-100 mb-2">Data Minimization</h4>
                          <p className="text-white leading-relaxed">
                            The engine ingests only 'Identity Metadata' (hashed interests) rather than raw PII. By operating on cryptographically hashed identity signals rather than personally identifiable data, the system enables matching while maintaining zero-knowledge privacy.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Influence Scorer (I)</h3>
                      <p className="text-white leading-relaxed mb-4">
                        Calculates connection weights based on Travel DNA similarity and network proximity. The Influence Scorer processes Friend-of-a-Friend (FofF) validation by analyzing:
                      </p>
                      <div className="space-y-3 ml-4">
                        <div className="flex items-start gap-2">
                          <span className="text-emerald-100 mt-1">•</span>
                          <p className="text-white leading-relaxed"><strong className="text-emerald-100">Travel DNA Similarity:</strong> Vector comparison of exploration style, cultural engagement depth, and spontaneity preferences</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-emerald-100 mt-1">•</span>
                          <p className="text-white leading-relaxed"><strong className="text-emerald-100">Network Proximity:</strong> Degrees of separation weighted by trust signals and mutual connections</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-emerald-100 mt-1">•</span>
                          <p className="text-white leading-relaxed"><strong className="text-emerald-100">Presence Intelligence:</strong> Real-time location overlap and intent matching for spontaneous coordination</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Operational Trade-offs</h3>
                      <p className="text-white leading-relaxed">
                        The decision to move away from a traditional SQL-based architecture was driven by the computational cost of "Multi-Hop" discovery. While a standard database excels at transactional integrity, it fails at the scale required for real-time trust verification.
                      </p>
                    </div>
                    
                    <button
                      onClick={() => setIsTechnicalModalOpen(true)}
                      className="w-full md:w-auto px-6 py-3 bg-slate-900/80 hover:bg-slate-900 border border-slate-600 hover:border-slate-500 text-emerald-400 font-mono text-sm rounded transition-all duration-200 hover:shadow-lg hover:shadow-emerald-400/10"
                    >
                      View Technical Deep Dive: Graph Traversal vs. SQL Lookups
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Technical Deep Dive Modal */}
          <AnimatePresence>
            {isTechnicalModalOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsTechnicalModalOpen(false)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                />
                
                {/* Modal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                >
                  <div 
                    className="bg-slate-900 rounded-xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div className="sticky top-0 bg-slate-900 border-b border-slate-700 px-6 md:px-8 py-5 flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          The Computational Cost of Trust: Graph vs. Relational
                        </h3>
                        <p className="text-sm text-gray-400">
                          Why standard SQL lookups break at 3+ degrees of separation.
                        </p>
                      </div>
                      <button
                        onClick={() => setIsTechnicalModalOpen(false)}
                        className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
                        aria-label="Close modal"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Modal Content */}
                    <div className="px-6 md:px-8 py-6 space-y-8">
                      {/* Section 1: The "Join-Hell" Problem */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30">
                            <span className="text-xl font-bold text-red-400">1</span>
                          </div>
                          <h4 className="text-xl font-bold text-white">The "Join-Hell" Problem (Relational/SQL)</h4>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                          In a standard SQL database, finding a "Friend-of-a-Friend" (FofF) who has visited Tokyo requires joining the <code className="bg-slate-800 px-2 py-1 rounded text-emerald-400 font-mono text-sm">Users</code>, <code className="bg-slate-800 px-2 py-1 rounded text-emerald-400 font-mono text-sm">Friendships</code>, and <code className="bg-slate-800 px-2 py-1 rounded text-emerald-400 font-mono text-sm">Trips</code> tables.
                        </p>
                        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 space-y-2">
                          <div className="flex items-start gap-2">
                            <span className="text-red-400 font-mono text-sm">•</span>
                            <div>
                              <strong className="text-white">Complexity:</strong>
                              <span className="text-gray-300 ml-2">As degrees of separation increase, the number of JOINs grows exponentially.</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-red-400 font-mono text-sm">•</span>
                            <div>
                              <strong className="text-white">Latency:</strong>
                              <span className="text-gray-300 ml-2">A 4-degree search in a table of 1 million users can take several seconds—unacceptable for a real-time discovery feed.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Section 2: Index-Free Adjacency */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-500/30">
                            <span className="text-xl font-bold text-emerald-400">2</span>
                          </div>
                          <h4 className="text-xl font-bold text-white">Index-Free Adjacency (Graph/AI)</h4>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                          Our Social Graph utilizes <strong className="text-emerald-400">Index-Free Adjacency</strong>. Each node (Traveler) stores a direct physical pointer to its neighbors (Friends/Interests).
                        </p>
                        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 space-y-2">
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-400 font-mono text-sm">•</span>
                            <div>
                              <strong className="text-white">O(1) Traversal:</strong>
                              <span className="text-gray-300 ml-2">Moving from one traveler to another is a simple pointer hop, not a complex index search.</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-400 font-mono text-sm">•</span>
                            <div>
                              <strong className="text-white">Discovery at Scale:</strong>
                              <span className="text-gray-300 ml-2">This allows the system to scan thousands of potential "trust-paths" in milliseconds to find the single most relevant connection.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Section 3: The "Supernode" Constraint */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center border border-amber-500/30">
                            <span className="text-xl font-bold text-amber-400">3</span>
                          </div>
                          <h4 className="text-xl font-bold text-white">The "Supernode" Constraint</h4>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 space-y-3">
                          <div>
                            <strong className="text-amber-400">The Challenge:</strong>
                            <p className="text-gray-300 mt-1">High-influence travelers (Power Users) create "Supernodes" with 10k+ connections.</p>
                          </div>
                          <div>
                            <strong className="text-emerald-400">The AI Solution:</strong>
                            <p className="text-gray-300 mt-1">We implemented <strong className="text-white">Breadth-First Search (BFS) Capping</strong> and <strong className="text-white">Graph Partitioning</strong> to ensure that one "Influencer" doesn't bottleneck the entire network's performance.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Modal Footer */}
                    <div className="sticky bottom-0 bg-slate-900 border-t border-slate-700 px-6 md:px-8 py-4 flex justify-end">
                      <button
                        onClick={() => setIsTechnicalModalOpen(false)}
                        className="px-6 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-400 font-medium rounded-lg transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Living Graph Interactive Demo Modal */}
          <AnimatePresence>
            {isDemoOpen && isLocalExperienceFinder && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsDemoOpen(false)}
                  className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60]"
                />

                {/* Demo Modal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
                >
                  <div
                    className="bg-slate-950 rounded-2xl border border-slate-700 max-w-7xl w-full h-[90vh] flex flex-col pointer-events-auto shadow-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-slate-900/50">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1 font-mono">The Living Graph: Interactive Demo</h3>
                        <p className="text-sm text-gray-400 font-mono">Real-time Trust Layer simulation</p>
                      </div>
                      <button
                        onClick={() => setIsDemoOpen(false)}
                        className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
                        aria-label="Close demo"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Demo Content */}
                    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                      {/* Left: Node Visualization Canvas */}
                      <div className="flex-1 p-6 bg-slate-950 relative overflow-hidden">
                        <div className="h-full w-full relative">
                          {/* Node Canvas Area */}
                          <svg className="w-full h-full" viewBox="0 0 800 600">
                            {/* Background Grid */}
                            <defs>
                              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148, 163, 184, 0.1)" strokeWidth="1"/>
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />

                            {/* Connection Lines */}
                            {demoStage !== 'idle' && (
                              <>
                                <line x1="400" y1="300" x2="300" y2="200" stroke="rgba(34, 197, 94, 0.4)" strokeWidth="2" />
                                <line x1="400" y1="300" x2="500" y2="200" stroke="rgba(34, 197, 94, 0.4)" strokeWidth="2" />
                                <line x1="400" y1="300" x2="450" y2="450" stroke="rgba(34, 197, 94, 0.4)" strokeWidth="2" />
                                <line x1="400" y1="300" x2="200" y2="350" stroke="rgba(34, 197, 94, 0.4)" strokeWidth="2" />
                                <line x1="400" y1="300" x2="600" y2="380" stroke="rgba(34, 197, 94, 0.4)" strokeWidth="2" />
                              </>
                            )}

                            {/* Network Nodes */}
                            {[
                              { x: 300, y: 200, active: demoStage !== 'idle' },
                              { x: 500, y: 200, active: demoStage !== 'idle' },
                              { x: 450, y: 450, active: demoStage !== 'idle' },
                              { x: 200, y: 350, active: demoStage !== 'idle' },
                              { x: 600, y: 380, active: demoStage !== 'idle' && selectedMatch }
                            ].map((node, i) => (
                              <circle
                                key={i}
                                cx={node.x}
                                cy={node.y}
                                r={node.active ? 12 : 6}
                                fill={node.active ? (selectedMatch && i === 4 ? '#22c55e' : 'rgba(34, 197, 94, 0.6)') : 'rgba(148, 163, 184, 0.3)'}
                                stroke={node.active ? '#22c55e' : 'rgba(148, 163, 184, 0.5)'}
                                strokeWidth={node.active ? 2 : 1}
                                className="transition-all duration-500"
                              />
                            ))}

                            {/* User Node (Center) */}
                            <circle
                              cx="400"
                              cy="300"
                              r={demoStage !== 'idle' ? 20 : 12}
                              fill={demoStage !== 'idle' ? '#22c55e' : 'rgba(148, 163, 184, 0.5)'}
                              stroke="#22c55e"
                              strokeWidth={3}
                              className="transition-all duration-500"
                            />
                            <circle
                              cx="400"
                              cy="300"
                              r={demoStage !== 'idle' ? 20 : 12}
                              fill="none"
                              stroke="#22c55e"
                              strokeWidth={2}
                              opacity={demoStage !== 'idle' ? 0.5 : 0}
                              className="animate-ping"
                            />
                          </svg>

                          {/* Activation Button (if idle) */}
                          {demoStage === 'idle' && (
                            <motion.button
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              onClick={() => setDemoStage('activating')}
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg font-mono uppercase tracking-wider shadow-lg"
                            >
                              Activate My DID
                            </motion.button>
                          )}
                        </div>
                      </div>

                      {/* Right: Processing Log & Results */}
                      <div className="w-full lg:w-96 p-6 bg-slate-900/50 border-t lg:border-t-0 lg:border-l border-slate-700 flex flex-col">
                        <h4 className="text-lg font-bold text-white mb-4 font-mono">AI Processing...</h4>
                        
                        {/* Log Output */}
                        <div className="flex-1 bg-slate-950 rounded-lg border border-slate-700 p-4 font-mono text-sm overflow-y-auto mb-4">
                          {demoLogs.length === 0 ? (
                            <div className="text-gray-500">Waiting for activation...</div>
                          ) : (
                            <div className="space-y-2">
                              {demoLogs.map((log, i) => (
                                <div key={i} className="text-emerald-400">
                                  {log}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Match Result Card */}
                        {selectedMatch && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl border border-emerald-500/30 p-6"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <CheckCircle className="w-6 h-6 text-emerald-400" />
                              <h5 className="text-lg font-bold text-white">Match Found</h5>
                            </div>
                            <div className="space-y-2 text-white">
                              <div><strong>User:</strong> {selectedMatch.name}</div>
                              <div><strong>Location:</strong> {selectedMatch.location}</div>
                              <div className="flex items-center gap-2 mt-3">
                                <span className="text-sm text-gray-300">Vibe Match:</span>
                                <span className="text-2xl font-bold text-emerald-400">{selectedMatch.match}%</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-slate-700 bg-slate-900/50 flex justify-between items-center">
                      <button
                        onClick={() => setIsDemoOpen(false)}
                        className="px-4 py-2 text-gray-400 hover:text-white text-sm font-mono"
                      >
                        ← Return to Case Study
                      </button>
                      {demoStage === 'idle' && (
                        <button
                          onClick={() => setDemoStage('activating')}
                          className="px-6 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-400 font-medium rounded-lg transition-colors font-mono"
                        >
                          Start Simulation
                        </button>
                      )}
                      {demoStage === 'complete' && (
                        <button
                          onClick={() => {
                            setDemoStage('idle');
                            setDemoLogs([]);
                            setSelectedMatch(null);
                          }}
                          className="px-6 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-400 font-medium rounded-lg transition-colors font-mono"
                        >
                          Reset Demo
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Influence Scorer Algorithm Section */}
          <section className="py-20 bg-slate-900">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white mb-4">The Influence Scorer Algorithm</h2>
                  <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                    A dynamic, relative-ranking engine. Unlike static rating systems (Yelp/TripAdvisor), the score is uniquely calculated for the <strong className="text-white">observer</strong>, not the <strong className="text-white">object</strong>.
                  </p>
                </div>
                
                {/* Scoring Formula */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-emerald-500/30 p-8 mb-8">
                  <h3 className="text-xl font-bold text-white mb-6">The Scoring Formula</h3>
                  <div className="space-y-4">
                    <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700 font-mono text-center">
                      <div className="text-2xl md:text-3xl text-emerald-400 mb-4">
                        I = (w₁ · T) + (w₂ · R) + (w₃ · S)
                      </div>
                      <div className="text-sm text-gray-400 space-y-2 text-left max-w-2xl mx-auto">
                        <div>Where the Influence Score (<span className="text-emerald-400 font-semibold">I</span>) is determined by:</div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                        <div className="text-emerald-400 font-mono text-lg mb-2 font-bold">T</div>
                        <div className="text-sm text-gray-400 mb-1"><strong className="text-white">Trust Strength:</strong></div>
                        <div className="text-sm md:text-xs text-gray-500">Density of mutual "High-Trust" nodes</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                        <div className="text-emerald-400 font-mono text-lg mb-2 font-bold">R</div>
                        <div className="text-sm text-gray-400 mb-1"><strong className="text-white">Recency:</strong></div>
                        <div className="text-sm md:text-xs text-gray-500">Temporal decay function ensuring tips are &lt;18 months old</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                        <div className="text-emerald-400 font-mono text-lg mb-2 font-bold">S</div>
                        <div className="text-sm text-gray-400 mb-1"><strong className="text-white">Sentiment Alignment:</strong></div>
                        <div className="text-sm md:text-xs text-gray-500">LLM-based analysis of source's descriptive style vs. user's preferences</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Design Evolution Section */}
          <section id="wireframes-ui" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Design Evolution
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Users can toggle between a high-density tabular view for intent-matching and a global map for spatial trend discovery, ensuring both analytical and exploratory UI needs are met.
                  </p>
                </div>

              {/* User Journey Map - Only for social-graph-driven-travel-network */}
              {isLocalExperienceFinder && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-16 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 md:p-10"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">Journey: Autonomous Discovery Flow</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8 text-center max-w-3xl mx-auto">
                    The system proactively surfaces opportunities—moving from passive privacy to active intelligence without requiring search or manual filtering.
                  </p>
                  <div className="space-y-6 max-w-4xl mx-auto">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center border border-indigo-400/30 flex-shrink-0 mt-1">
                        <span className="text-indigo-400 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Input: Ambient Signals</h4>
                        <p className="text-gray-300 leading-relaxed">System continuously monitors proximity, schedule gaps, and trust graph signals. No user action required—the Sensor layer maps 2nd and 3rd-degree connections in the background.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-400/30 flex-shrink-0 mt-1">
                        <span className="text-emerald-400 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Logic: Proactive Matching</h4>
                        <p className="text-gray-300 leading-relaxed">The Validator (Trust Layer) and Prioritization Engine (Influence Scorer) autonomously detect High-Trust Clusters. When all conditions align—proximity, shared interests, and schedule gaps—the system prepares an opportunity notification.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-400/30 flex-shrink-0 mt-1">
                        <span className="text-purple-400 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Proactive Output: Opportunity Notification</h4>
                        <p className="text-gray-300 leading-relaxed">System surfaces a low-friction notification: "High-Trust Cluster detected: 2 verified connections nearby with a 15-minute Window of Opportunity." No search required—the system transforms cold proximity into a warm, validated social graph in real-time.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Figma Travel App Design Screenshot - Full Width Background - Only for social-graph-driven-travel-network */}
              {isLocalExperienceFinder && (
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
              )}
              <br /><br />

              {/* Profile Screen & Travel DNA Section - Only for social-graph-driven-travel-network */}
              {isLocalExperienceFinder && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-16 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 md:p-10"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">Generating Travel DNA: Beyond the Itinerary</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6 text-center max-w-3xl mx-auto">
                    The Profile Screen is more than a list of pins; it is the ingestion point for the <strong className="text-purple-400">Contextual Gate (L3)</strong>.
                  </p>
                  <div className="space-y-6 max-w-4xl mx-auto">
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                        Signal Extraction
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        AI analyzes past trip telemetry (duration, pace, location type) to extract "Identity Signals"—transforming raw data into a "Travel DNA" vector (e.g., 'Off-the-beaten-path Explorer' vs. 'Urban Luxury Seeker').
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                        Reciprocal Intent Matching
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        The system cross-references your "Past Trips" with your network's "Future Plans." If 11 connections want to go where you have been, the AI triggers a mentorship signal, facilitating spontaneous knowledge sharing.
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        Dynamic Vibe Alignment
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        Travel DNA is not static; it evolves as users add new experiences, ensuring that spontaneity is always matched to the user's <em className="text-purple-300">current</em> exploration style.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

                {/* Video Container */}
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

              </motion.div>
            </div>
          </section>

          {/* Development & Build Section */}
          <section id="prototyping-ai" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                      Development & Build
                    </h2>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                      <p className="text-amber-300 text-base md:text-sm font-medium">
                        Work In Progress
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="bg-white/5 p-8 rounded-xl border border-white/10 mb-12">
                  <p className="text-gray-300 text-center">
                    Development workflow and technical architecture details will be documented as the system is built.
                  </p>
                </div>

                {/* The System in Motion: Mobile Demo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="max-w-5xl mx-auto"
                >
                  <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      The System in Motion: Mobile Demo
                    </h3>
                    <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                      This mobile simulation demonstrates how raw traveler telemetry is converted into verified social signals using the Influence Scorer and Privacy Gates.
                    </p>
                  </div>

                  {/* Mobile Sandbox Container */}
                  <div className="flex justify-center mb-8">
                    <div className="relative" style={{ maxWidth: '375px', width: '100%' }}>
                      {/* Mobile Frame */}
                      <div 
                        className="relative bg-slate-900 rounded-[2.5rem] p-2 shadow-2xl border-4 border-slate-700"
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

                            {/* AI Log Overlay (Glass-morphism) */}
                            {mobileDemoStage === 'scanning' && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 mb-4"
                              >
                                <div className="text-xs font-mono text-emerald-300 space-y-1">
                                  {mobileDemoLogs.map((log, i) => (
                                    <div key={i}>{log}</div>
                                  ))}
                                </div>
                              </motion.div>
                            )}

                            {/* Connection Card */}
                            {mobileDemoStage === 'connected' && showConnectionCard && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 backdrop-blur-md rounded-xl border border-emerald-400/30 p-4 mb-4"
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
                                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                                    aria-label="Share tip with James B."
                                    tabIndex={0}
                                  >
                                    Share Tip
                                  </button>
                                  <button
                                    onClick={() => {
                                      setMobileDemoStage('encrypted');
                                      setShowConnectionCard(false);
                                      setMobileDemoLogs([]);
                                    }}
                                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                                    aria-label="Dismiss connection card"
                                    tabIndex={0}
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
                                  // Simulate AI processing logs
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
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
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
                                }
                              }}
                              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 font-mono text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                              aria-label={mobileDemoStage === 'encrypted' ? 'Activate discovery and scan network' : 'Reset demo to encrypted state'}
                              tabIndex={0}
                            >
                              {mobileDemoStage === 'encrypted' ? 'Pulse' : 'Reset'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* System Status Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl p-6 md:p-8 relative overflow-hidden"
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="text-xl font-bold text-white mb-2 font-mono">System Status: Global Pulse</h4>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                            <span className="text-emerald-400 text-sm font-mono">SYSTEM ONLINE</span>
                          </div>
                        </div>
                      </div>

                      {/* Live Counters */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
                          <div className="text-emerald-400 text-xs font-mono uppercase tracking-wider mb-1">Active Travelers</div>
                          <div className="text-2xl font-bold text-white font-mono">
                            {activeTravelersCount.toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
                          <div className="text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">Reciprocal Matches</div>
                          <div className="text-2xl font-bold text-white font-mono">
                            {reciprocalMatchesCount}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Live Demo Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mt-12 max-w-4xl mx-auto"
                >
                  <div className="bg-white/5 rounded-xl p-8 md:p-10 border border-white/10">
                    <div className="mb-8 text-center">
                      <h3 className="text-2xl font-bold mb-4 text-white">Live Demo</h3>
                      <p className="text-gray-400 mb-4">
                        A live demo will be available once the identity-focused discovery system is fully implemented.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Impact Analysis Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">
                    Impact Analysis
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    How the Trust Layer and Privacy-First Social Graphs create value across the travel ecosystem
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl border-2 border-cyan-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Impact for Travelers
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Richer connections via "Vouched" networks, reducing the "Stranger Danger" cognitive load. The Trust Layer enables discovery through multi-degree connections (Friend-of-a-Friend validation), creating <span className="font-semibold text-cyan-700">authentic connections based on shared identity signals rather than proximity alone</span>.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border-2 border-emerald-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Impact for Communities
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Facilitating high-intent cultural exchange rather than mass-market "Tourist Swarming." The system enables <span className="font-semibold text-emerald-700">identity-aligned connections that respect local culture and create meaningful interactions</span>, distributing tourism benefits more equitably across communities.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Launch & Testing Section */}
          <section id="outcomes-launch" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Launch & Testing
                  </h2>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4 text-white">Launch Strategy</h3>
                    <p className="text-gray-300 mb-4">
                      Will start with a closed beta focusing on identity-based matching accuracy and user satisfaction with privacy controls, followed by gradual rollout based on connection quality metrics.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Beta Testing</span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Identity Matching</span>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">Privacy Controls</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Outcome & Learnings Section */}
          <section id="learnings-next" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Outcome & Learnings
                  </h2>
                </div>
                
                <div className="space-y-12">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">The Privacy-Discovery Equilibrium</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        Building this system required questioning the "data-hungry" nature of social AI. The challenge isn't the matching algorithm—it's the <strong className="text-gray-900">Data Layer</strong>. Privacy-by-Design means privacy isn't a toggle; it's a core architectural constraint. The system must enable discovery through network effects while maintaining zero-knowledge proof concepts.
                      </p>
                      <p>
                        <strong className="text-gray-900">The "Authenticity" Signal:</strong> Learned that technical matching ≠ human connection. The AI must account for "Identity Signals" (shared values, travel style, cultural engagement depth) over "Logistical Signals" (same city, similar age). The Influence Scorer processes Friend-of-a-Friend validation to create trust hierarchies that enable discovery without requiring full profile exposure.
                      </p>
                      <p>
                        Privacy controls require architectural decisions that happen at the data layer. The system needs to enforce granular privacy settings—controlling what information is visible, to whom, and when—which means building privacy enforcement into the core architecture, not adding it as an afterthought.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">The Surprise: Transparency of Logic</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        Users don't just want privacy; they want <strong className="text-gray-900">Transparency of Logic</strong>. They want to know *why* the AI thinks this person is a "Trusted Connection." The system must explain the social graph path (e.g., "Connected through 2 mutual friends who share your travel style") and the identity signal alignment, not just present a match.
                      </p>
                      <p>
                        The technical challenge of identity processing revealed that most existing social APIs aren't built for identity-focused discovery. They're optimized for location-based or profile-based matching, not identity-rich connection signals. Adapting these systems required building abstraction layers that translate profile data into identity signals while maintaining privacy boundaries.
                      </p>
                      <p>
                        The "Graded Visibility" architectural pattern emerged as essential. Users need context-aware privacy—sharing proof of travel style without exposing specific itinerary data. This requires zero-knowledge proof concepts where the system can validate identity alignment without requiring full data disclosure.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Reflections & Next Steps Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Reflections & Next Steps
                  </h2>
                </div>
                
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    <strong className="text-gray-900">1. Real-Time Coordination:</strong> Facilitating ephemeral group formation for solo travelers. The system could enable real-time meetup facilitation, allowing travelers to form temporary groups based on shared intent and identity alignment, without requiring extensive pre-planning or long-term commitment.
                  </p>
                  <p>
                    <strong className="text-gray-900">2. Lifetime Networks:</strong> Moving from "Trip-Specific" to "Journey-Long" social graphs. Instead of processing connections for a single trip, the system could maintain traveler networks over months or years, understanding that connections made in one location might be valuable in future destinations. This moves beyond single-trip social discovery to lifetime traveler community building.
                  </p>
                  <p>
                    <strong className="text-gray-900">3. Booking Integration:</strong> Connecting the Trust Layer directly to OTA (Online Travel Agency) APIs for seamless, verified group bookings. The system knows about traveler identity and preferences, and could integrate deeply with booking platforms to facilitate connections around shared itineraries, enabling verified group bookings with trust validation.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}
      {isOtherProject && (
        <>
          {/* Section 1: Observed Travel Frictions */}
          <section id="design-exploration" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Observed Travel Frictions
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Real-world breakdowns during travel, not planning
                  </p>
                </div>
                
                {/* Map research insights to friction patterns */}
                <div className="space-y-6">
                  {(Array.isArray(project?.research?.insights) ? project.research.insights : []).slice(0, 3).map((insight: string, index: number) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
                      <p className="text-gray-700 leading-relaxed">{insight}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 2: Why This Is a Systems Problem */}
          <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Why This Is a Systems Problem
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Why current tools fail structurally and why this cannot be solved with better UI alone
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {project?.research?.description || project?.overview?.description}
                  </p>
                  {isCulturalContextEngine && (
                    <p className="text-base text-gray-600 leading-relaxed">
                      This trust crisis cannot be solved through UI improvements alone—it requires fundamental changes to how recommendation systems handle source verification, data provenance, and authenticity validation at the architectural level.
                    </p>
                  )}
                  {isTravelPlanningAssistant && (
                    <p className="text-base text-gray-600 leading-relaxed">
                      The fragmentation between planning and spontaneous exploration is a structural issue—it requires systems that can adapt in real-time to changing constraints and preferences, not just better interfaces for existing rigid planning tools.
                    </p>
                  )}
                  {isLocalExperienceFinder && (
                    <p className="text-base text-gray-600 leading-relaxed">
                      Building meaningful social connections in travel requires rethinking how travelers discover and connect with each other—moving beyond traditional social networks to create identity-focused discovery mechanisms that respect privacy while enabling authentic connection.
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 3: Audience & Research */}
          <section id="research-audience" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Audience & Research
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Behavioral insights, constraints, and user context
                  </p>
                </div>
                
                {project?.research?.insights && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(Array.isArray(project?.research?.insights) ? project.research.insights : []).slice(0, 3).map((insight: string, index: number) => (
                      <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <p className="text-gray-300 text-base md:text-sm">{insight}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </section>

          {/* Section 4: Concept & Strategy */}
          <section id="designs-strategy" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-black">
                    Concept & Strategy
                  </h2>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Core Hypothesis</h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {project?.overview?.description}
                  </p>
                  
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="text-xl font-semibold mb-4 text-gray-900">Strategic Restraint</h4>
                    <ul className="space-y-2 text-gray-700">
                      {(Array.isArray(project?.overview?.goals) ? project.overview.goals : []).slice(0, 3).map((goal: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 5: System Overview */}
          <section className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-zinc-950 to-violet-950/20 pointer-events-none" />
            <div className="container mx-auto px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white mx-auto">
                    System Overview
                  </h2>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto text-balance">
                    How the system works at a conceptual level
                  </p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
                  <p className="text-gray-300 leading-relaxed">
                    {project?.overview?.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 6: Design Evolution */}
          <section id="wireframes-ui" className="py-20 bg-[#0a0a0a]">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Design Evolution
                  </h2>
                  <p className="text-gray-300 text-lg">
                    UX decisions as intent-driven outcomes, highlighting removals and simplifications
                  </p>
                </div>
                
                {project?.uxDesign && (
                  <div className="mb-12">
                    <p className="text-gray-300 leading-relaxed mb-8">{project.uxDesign.description}</p>
                    {project.uxDesign.images && project.uxDesign.images.length > 0 && (
                      <div className="grid md:grid-cols-3 gap-6">
                        {(Array.isArray(project?.uxDesign?.images) ? project.uxDesign.images : []).slice(0, 3).map((image: string, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative w-full h-64 rounded-lg overflow-hidden"
                          >
                            <Image
                              src={normalizeImagePath(image)}
                              alt={`Design evolution ${index + 1}`}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 30vw"
                            />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </section>

          {/* Section 7: Build & Iteration */}
          <section id="prototyping-ai" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-20">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    Build & Iteration
                  </h2>
                </div>
                
                {project?.development && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-6">Tech Stack</h3>
                      {project.development.techStack && (
                        <ul className="space-y-3 text-gray-300">
                          {project.development.techStack.map((tech: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-cyan-400 mt-1">•</span>
                              <span>{tech}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-6">Development Approach</h3>
                      <p className="text-gray-300 leading-relaxed">{project.development.description}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </section>

          {/* Section 8: Core Technical Challenge → Solution */}
          <section className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-purple-500/10 p-8 md:p-10 rounded-2xl border border-amber-500/20 backdrop-blur-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-bold text-white">Challenge</h4>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        {isCulturalContextEngine && 'Establishing trust and authenticity in AI-powered travel recommendations requires systemic solutions beyond UI improvements.'}
                        {isTravelPlanningAssistant && 'Balancing flexible planning with spontaneous exploration requires adaptive systems that respond to real-time constraints.'}
                        {isLocalExperienceFinder && 'Creating meaningful social connections in travel requires balancing privacy, discovery, and authentic interaction.'}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                    </div>
                        <h4 className="text-xl font-bold text-white">Solution</h4>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        {isCulturalContextEngine && 'Developing verification systems, source provenance tracking, and confidence scoring mechanisms that operate at the data layer.'}
                        {isTravelPlanningAssistant && 'Building adaptive planning algorithms that maintain flexibility while providing structure when needed.'}
                        {isLocalExperienceFinder && 'Designing opt-in social layers with granular privacy controls and identity-focused discovery mechanisms.'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 9: Live Product Status / Demo */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">
                    Live Product Status
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Current functionality and limitations
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-8 md:p-10 border border-gray-200">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Current Status
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {isCulturalContextEngine && 'Early-stage R&D project exploring trust and authenticity mechanisms for travel AI systems.'}
                        {isTravelPlanningAssistant && 'Development in progress—adaptive planning algorithms and flexible itinerary management.'}
                        {isLocalExperienceFinder && 'Active development—social layer infrastructure and global traveler connection features.'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 10: Launch & Validation Plan */}
          <section id="outcomes-launch" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Launch & Validation Plan
                  </h2>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4 text-white">Validation Strategy</h3>
                    <p className="text-gray-300 mb-4">
                      {isCulturalContextEngine && 'Early research validation through user perception studies and trust signal analysis. Prototype testing with real traveler data to validate authenticity verification mechanisms.'}
                      {isTravelPlanningAssistant && 'Beta testing with flexible travel scenarios, measuring adaptability and user satisfaction with spontaneous planning support.'}
                      {isLocalExperienceFinder && 'Community-driven validation through early adopter groups, measuring connection quality and social discovery effectiveness.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 12: Where This Could Evolve Next */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Where This Could Evolve Next
                  </h2>
                </div>
                
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    {isCulturalContextEngine && 'Expanding verification mechanisms to include real-time traveler verification, cross-platform trust signals, and community-driven authenticity validation. Long-term evolution could include blockchain-based provenance tracking and decentralized trust networks.'}
                    {isTravelPlanningAssistant && 'Evolving toward predictive planning that learns from travel patterns, integrating real-time constraint detection, and expanding to group travel scenarios. Future iterations could include AI that anticipates needs before they arise.'}
                    {isLocalExperienceFinder && 'Expanding social discovery to include real-time meetup facilitation, travel group formation, and long-term traveler network building. Evolution could move toward creating sustained global traveler communities beyond single trips.'}
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Figma Travel App Design Screenshot - Full Width Background - Only for social-graph-driven-travel-network */}
          {isLocalExperienceFinder && (
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
              <div className="absolute inset-0 bg-black/40" />
            </section>
          )}

          {/* Social Travel Exploration - Only for social-graph-driven-travel-network */}
          {isLocalExperienceFinder && (
            <section className="py-20 bg-black">
              <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-semibold mb-4 text-white">
                        Social Travel Exploration
                      </h3>
                      <p className="text-gray-300 max-w-2xl mx-auto">
                        An early design concept and prototype demo
                      </p>
                    </div>
                    
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {isNarrativeTravelGenerator && (
        <>
          {/* Section 1: Narrative Architecture */}
          <section id="narrative-architecture" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Narrative Architecture
                  </h2>
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                    How the system transitions from high novelty to familiarity, designing for emotional arcs over efficiency
                  </p>
                </div>

                {/* Transition Logic Explanation */}
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 text-white" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Transition Logic
                  </h3>
                  <div className="bg-white/5 p-8 rounded-xl border border-white/10 mb-8">
                    <p className="text-gray-300 leading-relaxed mb-6" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                      The system moves through three distinct phases, each defined by the relationship between novelty and comfort:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-lg border border-blue-500/30">
                        <div className="text-sm md:text-xs font-mono text-blue-400 uppercase tracking-wider mb-3">Phase 1: Arrival</div>
                        <div className="text-white font-semibold mb-2">High Novelty / High Anxiety</div>
                        <p className="text-gray-300 text-base md:text-sm leading-relaxed">
                          Initial exposure to new environment. System provides orientation cues and establishes safe anchors.
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-lg border border-purple-500/30">
                        <div className="text-sm md:text-xs font-mono text-purple-400 uppercase tracking-wider mb-3">Phase 2: Exploration</div>
                        <div className="text-white font-semibold mb-2">Variable Novelty / Adaptive Comfort</div>
                        <p className="text-gray-300 text-base md:text-sm leading-relaxed">
                          Active engagement with environment. System adapts narrative beats based on real-time emotional tone feedback.
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-6 rounded-lg border border-amber-500/30">
                        <div className="text-sm md:text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">Phase 3: Familiarity</div>
                        <div className="text-white font-semibold mb-2">Low Novelty / High Comfort</div>
                        <p className="text-gray-300 text-base md:text-sm leading-relaxed">
                          Established sense of belonging. System emphasizes depth over breadth, allowing for meaningful return visits.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Process Flow */}
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 text-white" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Process Flow: Emotional Tone → Experience Output
                  </h3>
                  <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
                          <span className="text-blue-400 text-sm font-mono font-bold">1</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm md:text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Input: Emotional Tone</div>
                          <p className="text-gray-300 leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                            System receives real-time emotional state signals (anxiety, excitement, overwhelm, comfort) from traveler feedback or inferred behavioral patterns.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center py-2">
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center">
                          <span className="text-purple-400 text-sm font-mono font-bold">2</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm md:text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Processing: Narrative Engine</div>
                          <p className="text-gray-300 leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                            Engine maps emotional tone to narrative phase. If tone indicates overwhelm, system can loop back to Familiarity anchors. If tone indicates readiness, system advances to Exploration.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center py-2">
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
                          <span className="text-amber-400 text-sm font-mono font-bold">3</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm md:text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Output: Experience Phases</div>
                          <p className="text-gray-300 leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                            System generates narrative beats (not schedules) that match the current phase. Each beat emphasizes emotional resonance over checklist completion.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emotional Arc Graph */}
                <div className="mt-12">
                  <EmotionalArcGraph />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 2: Core Constraints */}
          <section id="system-constraints" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    System Constraints
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                    Architectural limitations that force presence and prevent checklist-driven behavior
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Constraint A */}
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border-2 border-red-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm md:text-xs font-mono text-red-600 uppercase tracking-wider mb-1">Constraint A</div>
                        <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                          Information Scarcity
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                      The system deliberately withholds "check-off" lists and comprehensive location databases to force presence. Travelers receive narrative beats, not itineraries.
                    </p>
                    <div className="mt-4 pt-4 border-t border-red-200">
                      <div className="text-sm md:text-xs font-mono text-gray-600">
                        <span className="font-semibold">Implementation:</span> No maps or schedules in initial experience. Only emotional anchors and narrative prompts.
                      </div>
                    </div>
                  </div>

                  {/* Constraint B */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm md:text-xs font-mono text-blue-600 uppercase tracking-wider mb-1">Constraint B</div>
                        <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                          Temporal Elasticity
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                      Narrative beats stretch or shrink based on the traveler's comfort level. A single beat can expand into hours if the emotional tone indicates deep engagement.
                    </p>
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <div className="text-sm md:text-xs font-mono text-gray-600">
                        <span className="font-semibold">Implementation:</span> Time-based constraints are secondary to emotional state. System adapts pacing in real-time.
                      </div>
                    </div>
                  </div>

                  {/* Constraint C */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm md:text-xs font-mono text-purple-600 uppercase tracking-wider mb-1">Constraint C</div>
                        <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                          Non-Linearity
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                      The system must allow for "loops"—returning to a place of comfort if the emotional tone dips. Progression is not unidirectional.
                    </p>
                    <div className="mt-4 pt-4 border-t border-purple-200">
                      <div className="text-sm md:text-xs font-mono text-gray-600">
                        <span className="font-semibold">Implementation:</span> Familiarity anchors remain accessible. System can reverse phase transitions based on emotional feedback.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Design Evolution Section */}
          <section id="design-evolution" className="py-20 bg-slate-950">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Design Evolution: From Latent Nodes to Active Story Beats
                  </h2>
                  <p className="text-gray-300 text-lg max-w-3xl mx-auto" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                    Three distinct UI states demonstrating the evolution from raw logistics data (Spontaneity Engine) to full narrative immersion (Narrative Layer)
                  </p>
                </div>

                {/* Mobile Device Frame with Interactive Mockups */}
                <div className="flex flex-col items-center">
                  {/* Mobile Device Container */}
                  <div className="relative w-full max-w-[375px]">
                    {/* Device Frame */}
                    <div className="relative bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-800">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-20"></div>
                      
                      {/* Screen Container */}
                      <div className="relative bg-slate-950 rounded-[2.5rem] overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
                        {/* Level 1: Core Spontaneity Engine */}
                        <AnimatePresence mode="wait">
                          {narrativeEvolutionLevel === 1 && (
                            <motion.div
                              key="level1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                              className="absolute inset-0 bg-slate-50"
                            >
                              {/* Map View */}
                              <div className="relative h-full bg-gradient-to-br from-blue-100 to-green-100">
                                {/* Map Grid Pattern */}
                                <div className="absolute inset-0 opacity-20" style={{
                                  backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                                  backgroundSize: '40px 40px'
                                }}></div>
                                
                                {/* Map Pins */}
                                <div className="absolute top-1/4 left-1/3">
                                  <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg" />
                                </div>
                                <div className="absolute top-1/2 right-1/4">
                                  <MapPin className="w-8 h-8 text-blue-500 drop-shadow-lg" />
                                </div>
                                <div className="absolute bottom-1/3 left-1/2">
                                  <MapPin className="w-8 h-8 text-emerald-500 drop-shadow-lg" />
                                </div>
                                
                                {/* Top Bar */}
                                <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 border-b border-gray-200">
                                  <div className="flex items-center justify-between">
                                    <div className="text-sm font-semibold text-gray-900">Current Location</div>
                                    <Navigation className="w-5 h-5 text-gray-600" />
                                  </div>
                                </div>
                                
                                {/* Bottom Info Card */}
                                <motion.div
                                  initial={{ y: 100 }}
                                  animate={{ y: 0 }}
                                  className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl p-6"
                                >
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <h3 className="text-lg font-bold text-gray-900">Historic District</h3>
                                      <span className="text-sm md:text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">Open</span>
                                    </div>
                                    <div className="space-y-2 text-sm text-gray-600">
                                      <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>Distance: 0.4 miles</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>Open until 9 PM</span>
                                      </div>
                                    </div>
                                    <button className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors">
                                      Route Me
                                    </button>
                                  </div>
                                </motion.div>
                              </div>
                            </motion.div>
                          )}

                          {/* Level 2: Narrative Overlay */}
                          {narrativeEvolutionLevel === 2 && (
                            <motion.div
                              key="level2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                              className="absolute inset-0"
                            >
                              {/* Base Map (Desaturated) */}
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
                                <div className="absolute inset-0 opacity-20" style={{
                                  backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                                  backgroundSize: '40px 40px'
                                }}></div>
                                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
                                
                                {/* Map Pins (Faded) */}
                                <div className="absolute top-1/4 left-1/3 opacity-30">
                                  <MapPin className="w-8 h-8 text-red-500" />
                                </div>
                                <div className="absolute top-1/2 right-1/4 opacity-30">
                                  <MapPin className="w-8 h-8 text-blue-500" />
                                </div>
                              </div>
                              
                              {/* Narrative Prompt Card (Sliding Up) */}
                              <motion.div
                                initial={{ y: '100%' }}
                                animate={{ y: '30%' }}
                                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-br from-amber-900/95 via-violet-900/95 to-indigo-900/95 backdrop-blur-xl rounded-t-3xl border-t border-amber-500/30 shadow-2xl"
                                style={{ height: '70%' }}
                              >
                                <div className="p-6 h-full flex flex-col">
                                  {/* Narrative Pulse Icon */}
                                  <div className="flex items-center justify-center mb-4">
                                    <motion.div
                                      animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                      className="relative"
                                    >
                                      <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-xl"></div>
                                      <Zap className="w-12 h-12 text-amber-400 relative z-10" />
                                    </motion.div>
                                  </div>
                                  
                                  {/* Story Text */}
                                  <div className="flex-1 space-y-4">
                                    <div className="text-sm md:text-xs font-mono text-amber-400/80 uppercase tracking-wider mb-2">
                                      Narrative Pulse Active
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                                      The cobblestones here hold a secret from 1924.
                                    </h3>
                                    <p className="text-amber-100/90 leading-relaxed text-sm">
                                      Your objective: Find the door with the iron lion. The Latent Nodes have been activated—what you see is not just a street, but a story waiting to unfold.
                                    </p>
                                  </div>
                                  
                                  {/* Action Button */}
                                  <button className="mt-4 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 font-semibold py-3 rounded-xl transition-colors">
                                    Begin Investigation
                                  </button>
                                </div>
                              </motion.div>
                            </motion.div>
                          )}

                          {/* Level 3: Full Narrative Immersion */}
                          {narrativeEvolutionLevel === 3 && (
                            <motion.div
                              key="level3"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                              className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-900 to-indigo-900"
                            >
                              {/* Chapter Progress Bar */}
                              <div className="absolute top-0 left-0 right-0 bg-black/40 backdrop-blur-sm p-4 border-b border-white/10">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="text-sm md:text-xs font-mono text-amber-400/80 uppercase tracking-wider">Chapter 2: The Hidden Quarter</div>
                                  <div className="text-sm md:text-xs text-gray-400">3/7 Active Story Beats</div>
                                </div>
                                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '43%' }}
                                    transition={{ duration: 1 }}
                                    className="h-full bg-gradient-to-r from-amber-400 to-violet-400"
                                  />
                                </div>
                              </div>
                              
                              {/* Compass (Minimalist) */}
                              <div className="absolute top-20 right-4">
                                <div className="bg-black/40 backdrop-blur-sm rounded-full p-3 border border-white/10">
                                  <Compass className="w-6 h-6 text-amber-400" />
                                </div>
                              </div>
                              
                              {/* Main Content Area */}
                              <div className="absolute inset-0 flex items-center justify-center pt-24 pb-32 px-6">
                                <div className="text-center space-y-6 max-w-sm">
                                  {/* Atmospheric Image Placeholder */}
                                  <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="relative rounded-2xl overflow-hidden shadow-2xl"
                                  >
                                    <div className="aspect-[4/3] bg-gradient-to-br from-amber-900/40 via-violet-900/40 to-indigo-900/40 relative">
                                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHJlc3VsdD0ibm9pc2UiLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+PC9maWx0ZXI+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMWUxZTFlIiBmaWx0ZXI9InVybCgjbm9pc2UpIi8+PC9zdmc+')] opacity-30"></div>
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <BookOpen className="w-16 h-16 text-amber-400/40" />
                                      </div>
                                    </div>
                                  </motion.div>
                                  
                                  {/* Narrative Text */}
                                  <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-3"
                                  >
                                    <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                                      The Shadowy Alley
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed text-sm">
                                      Between the old apothecary and the forgotten theater, a narrow passageway catches the evening light. Something moves in the shadows—or is it just your imagination?
                                    </p>
                                  </motion.div>
                                  
                                  {/* Narrative Action Button */}
                                  <motion.button
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="w-full bg-gradient-to-r from-amber-500/20 to-violet-500/20 hover:from-amber-500/30 hover:to-violet-500/30 border-2 border-amber-400/50 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20"
                                  >
                                    Investigate the Shadowy Alley
                                  </motion.button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                  
                  {/* Evolution Switcher */}
                  <div className="mt-12 w-full max-w-md">
                    <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm md:text-xs font-mono text-gray-400 uppercase tracking-wider">Evolution Level</span>
                        <span className="text-sm font-mono text-amber-400">
                          {narrativeEvolutionLevel === 1 && 'Latent Nodes'}
                          {narrativeEvolutionLevel === 2 && 'Augmentation'}
                          {narrativeEvolutionLevel === 3 && 'Active Story Beats'}
                        </span>
                      </div>
                      
                      {/* Step Switcher */}
                      <div className="flex gap-2">
                        {[1, 2, 3].map((level) => (
                          <button
                            key={level}
                            onClick={() => setNarrativeEvolutionLevel(level)}
                            className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${
                              narrativeEvolutionLevel === level
                                ? 'bg-gradient-to-r from-amber-500/30 to-violet-500/30 border-2 border-amber-400/50 text-white shadow-lg'
                                : 'bg-slate-800/50 border border-slate-700 text-gray-400 hover:bg-slate-800 hover:text-gray-300'
                            }`}
                          >
                            {level === 1 && 'Level 1'}
                            {level === 2 && 'Level 2'}
                            {level === 3 && 'Level 3'}
                          </button>
                        ))}
                      </div>
                      
                      {/* System Logic Label */}
                      <div className="mt-6 pt-4 border-t border-slate-700">
                        <p className="text-sm md:text-xs text-gray-400 text-center leading-relaxed">
                          {narrativeEvolutionLevel === 1 && (
                            <><strong className="text-amber-400 not-italic">System Logic:</strong> Real-time API Logistics. The Spontaneity Engine processes Latent Nodes (POI data, distance, hours) into actionable routing information.</>
                          )}
                          {narrativeEvolutionLevel === 2 && (
                            <><strong className="text-violet-400 not-italic">Augmentation:</strong> Injecting Intent & Mystery. The Narrative Layer overlays story prompts onto logistics data, transforming waypoints into objectives.</>
                          )}
                          {narrativeEvolutionLevel === 3 && (
                            <><strong className="text-amber-400 not-italic">The Experience:</strong> Story-First Exploration. Active Story Beats replace maps entirely—the system orchestrates meaning, not just directions.</>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 3: Scenarios & Failure Cases */}
          <section id="scenarios-failure" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Scenarios & Failure Cases
                  </h2>
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                    Stress testing the system: how it handles edge cases and when safety overrides narrative
                  </p>
                </div>

                {/* Scenario: Overwhelmed Traveler */}
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 text-white" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Scenario: Overwhelmed in High-Density City
                  </h3>
                  <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <div className="text-sm md:text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">Initial State</div>
                        <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                          Traveler is in "Exploration" phase, navigating a high-density urban environment. Emotional tone signals: <span className="font-mono text-red-400">overwhelm</span>, <span className="font-mono text-red-400">anxiety</span>, <span className="font-mono text-red-400">sensory overload</span>.
                        </p>
                        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                          <div className="text-sm md:text-xs font-mono text-red-400 mb-2">Emotional Tone Input:</div>
                          <div className="text-sm font-mono text-gray-300">
                            anxiety_level: 0.85<br />
                            comfort_level: 0.25<br />
                            phase: "exploration"
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm md:text-xs font-mono text-green-400 uppercase tracking-wider mb-3">System Response</div>
                        <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                          Narrative Engine detects emotional tone threshold breach. System immediately loops back to "Familiarity" phase, providing anchor points:
                        </p>
                        <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                          <div className="text-sm md:text-xs font-mono text-green-400 mb-2">Narrative Output:</div>
                          <div className="text-sm font-mono text-gray-300">
                            phase_transition: "exploration → familiarity"<br />
                            anchor_type: "quiet_space"<br />
                            suggestions: ["library", "known_cafe", "park_bench"]
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="text-sm md:text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">System Logic</div>
                      <p className="text-gray-300 leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                        The system prioritizes emotional safety over narrative progression. When comfort drops below threshold (0.3), the engine automatically reverts to Familiarity anchors, allowing the traveler to recalibrate before re-engaging with Exploration.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Failure Modes & System Recovery */}
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 text-white" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Failure Modes & System Recovery
                  </h3>
                  
                  {/* Failure State Definition */}
                  <div className="bg-gradient-to-br from-amber-500/10 to-red-500/10 p-8 rounded-xl border border-amber-500/20 mb-8">
                    <div className="mb-6">
                      <div className="text-sm md:text-xs font-mono text-amber-500/80 uppercase tracking-wider mb-3">Failure State: Semantic Over-Abstraction</div>
                      <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                        <span className="font-semibold text-amber-400">Definition:</span> When the Narrative Engine prioritizes "mood" over "orientation" to the point where the user feels lost rather than immersed.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-amber-500/20">
                        <div className="text-sm md:text-xs font-mono text-amber-400/80 mb-2">Example Failure Output:</div>
                        <div className="text-sm text-gray-300 italic mb-2" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                          "Find the rhythm of the city's heartbeat in the spaces between buildings..."
                        </div>
                        <div className="text-sm md:text-xs font-mono text-red-400/80">
                          Result: Too abstract. No actionable anchor points. Traveler is lost.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trigger Conditions */}
                  <div className="bg-white/5 p-8 rounded-xl border border-white/10 mb-8">
                    <div className="mb-6">
                      <div className="text-sm md:text-xs font-mono text-amber-500/80 uppercase tracking-wider mb-3">Trigger Conditions</div>
                      <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                        The system detects failure state through behavioral and temporal signals:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/30 p-4 rounded-lg border border-amber-500/20">
                          <div className="text-sm md:text-xs font-mono text-amber-400/80 mb-2">Temporal Signal:</div>
                          <div className="text-sm font-mono text-gray-300">
                            User dwell time in non-destination zone &gt; 20 minutes
                          </div>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-amber-500/20">
                          <div className="text-sm md:text-xs font-mono text-amber-400/80 mb-2">Physiological Signal:</div>
                          <div className="text-sm font-mono text-gray-300">
                            Elevated heart rate + erratic movement patterns
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* The Intervention */}
                  <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 p-8 rounded-xl border border-red-500/20 mb-8">
                    <div className="mb-6">
                      <div className="text-sm md:text-xs font-mono text-red-400/80 uppercase tracking-wider mb-3">The Intervention: The "Safety Valve"</div>
                      <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                        The Trust Layer forces a <span className="font-semibold text-red-400">"Hard Anchor"</span>. It breaks the narrative arc to provide literal, high-legibility guidance.
                      </p>
                      
                      <div className="bg-black/30 p-6 rounded-lg border border-red-500/20 mb-4">
                        <div className="text-sm md:text-xs font-mono text-red-400/80 mb-3">Hard Anchor Output:</div>
                        <div className="text-base font-mono text-gray-200 mb-2">
                          Map Coordinate: 48.8566° N, 2.3522° E
                        </div>
                        <div className="text-base text-gray-300" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                          "Walk 200m North to the Metro"
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recovery Logic */}
                  <div className="bg-white/5 p-8 rounded-xl border border-white/10 mb-8">
                    <div className="mb-6">
                      <div className="text-sm md:text-xs font-mono text-green-400/80 uppercase tracking-wider mb-3">Recovery Logic</div>
                      <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                        Once the user reaches a <span className="font-semibold text-green-400">"Safety Node"</span>, the system recalibrates:
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-green-500/20">
                        <div className="text-sm md:text-xs font-mono text-green-400/80 mb-2">Recovery Protocol:</div>
                        <div className="text-sm font-mono text-gray-300 space-y-1">
                          <div>1. User reaches Safety Node (cafe, library, hotel)</div>
                          <div>2. System reduces narrative complexity for next 4 hours</div>
                          <div>3. Trust Layer gradually reintroduces narrative elements</div>
                          <div>4. System rebuilds user trust before returning to full narrative mode</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recovery State Indicator Visual */}
                  <div className="mb-8">
                    <div className="text-sm md:text-xs font-mono text-gray-400 uppercase tracking-wider mb-4 text-center">
                      System State Transition Visualization
                    </div>
                    <RecoveryStateIndicator autoTransition={true} transitionDelay={3000} />
                  </div>

                  {/* Threshold Visualization: Atmosphere vs Utility */}
                  <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                    <div className="mb-6">
                      <div className="text-sm md:text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">System Threshold: Atmosphere vs Utility</div>
                      <p className="text-gray-300 leading-relaxed mb-6 text-sm" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                        The system maintains a dynamic balance between immersive narrative ("Atmosphere") and actionable guidance ("Utility"). When the threshold is breached, the system automatically shifts to utility-first mode.
                      </p>
                      
                      {/* Threshold Bar */}
                      <div className="relative h-16 bg-black/30 rounded-lg border border-white/10 overflow-hidden mb-4">
                        {/* Atmosphere Zone (Left) */}
                        <div className="absolute left-0 top-0 bottom-0 w-[70%] bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-r border-white/20">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm md:text-xs font-mono text-blue-400">Atmosphere Zone</span>
                          </div>
                        </div>
                        
                        {/* Threshold Line */}
                        <div className="absolute left-[70%] top-0 bottom-0 w-px bg-amber-500/80">
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500 rounded-full border-2 border-gray-900"></div>
                        </div>
                        
                        {/* Utility Zone (Right) */}
                        <div className="absolute right-0 top-0 bottom-0 w-[30%] bg-gradient-to-r from-amber-500/20 to-red-500/20">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm md:text-xs font-mono text-amber-500">Utility Zone</span>
                          </div>
                        </div>
                        
                        {/* Current State Indicator */}
                        <motion.div
                          initial={{ x: '10%' }}
                          animate={{ x: ['10%', '75%', '10%'] }}
                          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm md:text-xs">
                        <div className="text-center">
                          <div className="font-mono text-blue-400 mb-1">Normal Operation</div>
                          <div className="text-gray-400">70% Atmosphere / 30% Utility</div>
                        </div>
                        <div className="text-center">
                          <div className="font-mono text-amber-500 mb-1">Failure Recovery</div>
                          <div className="text-gray-400">20% Atmosphere / 80% Utility</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Success Case: Adaptive Re-Anchoring */}
          <section id="success-case" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Success Case: Adaptive Re-Anchoring
                  </h2>
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                    The system acts as an Invisible Navigator—using a "Soft Pivot" to steer toward comfort without breaking immersion
                  </p>
                </div>

                {/* Context */}
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 text-white" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Context: High-Anxiety State Detection
                  </h3>
                  <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-8 rounded-xl border border-amber-500/20">
                    <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                      User enters a <span className="font-semibold text-amber-400">"High-Anxiety" state</span>, detected via:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-black/30 p-4 rounded-lg border border-amber-500/20">
                        <div className="text-sm md:text-xs font-mono text-amber-400/80 mb-2">Behavioral Signal:</div>
                        <div className="text-sm text-gray-300">Rapid movement in high-density crowds</div>
                      </div>
                      <div className="bg-black/30 p-4 rounded-lg border border-amber-500/20">
                        <div className="text-sm md:text-xs font-mono text-amber-400/80 mb-2">Interaction Signal:</div>
                        <div className="text-sm text-gray-300">Repeated app checks (seeking orientation)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* The Logic */}
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 text-white" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    The Logic: Soft Pivot Without Breaking Narrative
                  </h3>
                  <div className="bg-white/5 p-8 rounded-xl border border-emerald-500/20">
                    <p className="text-gray-300 leading-relaxed mb-6" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                      Rather than breaking the narrative to show a map, the system identifies a <span className="font-semibold text-emerald-400">"Familiarity Node"</span> (e.g., a bookstore or a quiet park) that aligns with the current "Emotional Arc."
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-black/30 p-6 rounded-lg border border-emerald-500/20">
                        <div className="text-sm md:text-xs font-mono text-emerald-400/80 uppercase tracking-wider mb-3">Before: Exploration Phase</div>
                        <div className="text-sm text-gray-300 italic mb-2" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                          "Discover the hidden alleys"
                        </div>
                        <div className="text-sm md:text-xs text-gray-500">
                          High novelty, high stimulation
                        </div>
                      </div>
                      
                      <div className="bg-black/30 p-6 rounded-lg border border-emerald-500/20">
                        <div className="text-sm md:text-xs font-mono text-teal-400/80 uppercase tracking-wider mb-3">After: Refuge Phase</div>
                        <div className="text-sm text-gray-300 italic mb-2" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                          "Find the silence in the stacks"
                        </div>
                        <div className="text-sm md:text-xs text-gray-500">
                          Lower entropy, maintained immersion
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Success Pivot Logic Component */}
                <div className="mb-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm md:text-xs border border-emerald-500/20 bg-emerald-500/5 p-6 rounded-lg">
                    <div className="space-y-3">
                      <p className="text-emerald-400 uppercase font-bold tracking-tighter">Detection: Sensory Overload</p>
                      <p className="text-white/60 leading-relaxed">Metric: Crowd density &gt; 80% + Pace velocity increase.</p>
                      <div className="text-sm md:text-xs text-emerald-300/80 mt-2">
                        System identifies: High-anxiety threshold breached
                      </div>
                    </div>
                    <div className="space-y-3 md:border-l md:border-emerald-500/20 md:pl-6">
                      <p className="text-blue-400 uppercase font-bold tracking-tighter">Pivot: Adaptive Narrative</p>
                      <p className="text-white/60 leading-relaxed">Action: Prioritize "Enclosure" nodes. Recalculate arc for "Refuge" phase.</p>
                      <div className="text-sm md:text-xs text-blue-300/80 mt-2">
                        System maintains: Narrative coherence while reducing stress
                      </div>
                    </div>
                  </div>
                </div>

                {/* The Narrative Shift */}
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 text-white" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    The Narrative Shift
                  </h3>
                  <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-8 rounded-xl border border-emerald-500/20">
                    <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                      The AI shifts the prompt from <span className="font-semibold text-amber-400">Exploration</span> to <span className="font-semibold text-teal-400">Refuge</span>, maintaining the narrative thread while guiding toward comfort.
                    </p>
                    
                    <div className="bg-black/30 p-6 rounded-lg border border-emerald-500/20 mt-4">
                      <div className="text-sm md:text-xs font-mono text-emerald-400/80 mb-3">Narrative Continuity:</div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="text-emerald-400 mt-1">→</div>
                          <div className="flex-1">
                            <div className="text-sm text-gray-300 mb-1">Exploration Theme:</div>
                            <div className="text-sm text-gray-400 italic">"Discover the hidden alleys"</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="text-teal-400 mt-1">→</div>
                          <div className="flex-1">
                            <div className="text-sm text-gray-300 mb-1">Refuge Theme:</div>
                            <div className="text-sm text-gray-400 italic">"Find the silence in the stacks"</div>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-emerald-500/20">
                          <div className="text-sm md:text-xs text-emerald-300/80">
                            Both prompts maintain the "discovery" narrative while shifting from high-stimulation to low-entropy environments.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Result */}
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 text-white" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Result: Immersion Maintained, Stress Reduced
                  </h3>
                  <div className="bg-white/5 p-8 rounded-xl border border-emerald-500/20">
                    <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                      The user is guided toward a lower-entropy environment using environmental cues, maintaining the <span className="font-semibold text-emerald-400">"immersion"</span> while lowering physiological stress.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-black/30 p-4 rounded-lg border border-emerald-500/20">
                        <div className="text-sm md:text-xs font-mono text-emerald-400/80 mb-2">Outcome 1:</div>
                        <div className="text-sm text-gray-300">Narrative coherence preserved</div>
                      </div>
                      <div className="bg-black/30 p-4 rounded-lg border border-emerald-500/20">
                        <div className="text-sm md:text-xs font-mono text-emerald-400/80 mb-2">Outcome 2:</div>
                        <div className="text-sm text-gray-300">Physiological stress reduced</div>
                      </div>
                      <div className="bg-black/30 p-4 rounded-lg border border-emerald-500/20">
                        <div className="text-sm md:text-xs font-mono text-emerald-400/80 mb-2">Outcome 3:</div>
                        <div className="text-sm text-gray-300">User trust in system maintained</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pivot Animation Visual */}
                <div className="mb-8">
                  <div className="text-sm md:text-xs font-mono text-gray-400 uppercase tracking-wider mb-4 text-center">
                    Path Transition Visualization
                  </div>
                  <PivotAnimation autoPlay={true} transitionDelay={2000} />
                </div>

                {/* Logic Visualization: Balancing Novelty vs Comfort */}
                <div className="bg-white/5 p-8 rounded-xl border border-emerald-500/20">
                  <div className="mb-6">
                    <div className="text-sm md:text-xs font-mono text-emerald-400/80 uppercase tracking-wider mb-3">System Logic: Balancing Novelty vs Comfort</div>
                    <p className="text-gray-300 leading-relaxed text-sm mb-6" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                      The Soft Pivot demonstrates the system's ability to balance "Novelty" against "Comfort" without breaking the narrative arc. Instead of a jarring "GPS Recalculating" alert, the AI uses environmental cues to guide the user toward familiarity.
                    </p>
                    
                    {/* Balance Visualization */}
                    <div className="relative h-16 bg-black/30 rounded-lg border border-emerald-500/20 overflow-hidden mb-4">
                      {/* Novelty Zone (Left) */}
                      <div className="absolute left-0 top-0 bottom-0 w-[60%] bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-r border-white/20">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm md:text-xs font-mono text-amber-400">Novelty Zone</span>
                        </div>
                      </div>
                      
                      {/* Comfort Zone (Right) */}
                      <div className="absolute right-0 top-0 bottom-0 w-[40%] bg-gradient-to-r from-teal-500/20 to-emerald-500/20">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm md:text-xs font-mono text-teal-400">Comfort Zone</span>
                        </div>
                      </div>
                      
                      {/* Soft Pivot Indicator */}
                      <motion.div
                        initial={{ x: '30%' }}
                        animate={{ x: ['30%', '70%', '30%'] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full shadow-lg border-2 border-gray-900"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm md:text-xs">
                      <div className="text-center">
                        <div className="font-mono text-amber-400 mb-1">Exploration State</div>
                        <div className="text-gray-400">60% Novelty / 40% Comfort</div>
                      </div>
                      <div className="text-center">
                        <div className="font-mono text-teal-400 mb-1">Soft Pivot State</div>
                        <div className="text-gray-400">30% Novelty / 70% Comfort</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 4: Business Use & Applications - Industry Skins */}
          <section id="business-use" className="py-20 bg-slate-950">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Industry Skins: Same Engine, Different Soul
                  </h2>
                  <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                    The Narrative-Driven Travel Experience Generator is a headless system. The core logic remains constant (Spontaneity Engine + Narrative Layer), but the Interface Layer adapts to different business sectors.
                  </p>
                  <p className="text-gray-400 text-sm max-w-2xl mx-auto" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                    Each industry measures success differently—beyond just "getting from A to B."
                  </p>
                </div>

                {/* Industry Selector Tabs */}
                <div className="flex justify-center mb-12">
                  <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-2 border border-slate-700 inline-flex gap-2">
                    {[
                      { id: 'luxury', label: 'Luxury', icon: '✨' },
                      { id: 'creative', label: 'Creative', icon: '🎨' },
                      { id: 'cultural', label: 'Cultural', icon: '🏛️' }
                    ].map((skin) => (
                      <button
                        key={skin.id}
                        onClick={() => setActiveIndustrySkin(skin.id as 'luxury' | 'creative' | 'cultural')}
                        className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                          activeIndustrySkin === skin.id
                            ? 'bg-gradient-to-r from-amber-500/30 to-violet-500/30 border-2 border-amber-400/50 text-white shadow-lg'
                            : 'bg-transparent border border-transparent text-gray-400 hover:text-gray-300 hover:bg-slate-800/50'
                        }`}
                      >
                        <span className="mr-2">{skin.icon}</span>
                        {skin.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Device Frame with Industry Skins */}
                <div className="flex flex-col items-center">
                  <div className="relative w-full max-w-[375px]">
                    {/* Device Frame */}
                    <div className="relative bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-800">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-20"></div>
                      
                      {/* Screen Container */}
                      <div className="relative bg-slate-950 rounded-[2.5rem] overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
                        <AnimatePresence mode="wait">
                          {/* Luxury Travel Skin */}
                          {activeIndustrySkin === 'luxury' && (
                            <motion.div
                              key="luxury"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.5 }}
                              className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50/30"
                              style={{ fontFamily: "'Playfair Display', 'Cormorant', serif" }}
                            >
                              {/* Header */}
                              <div className="absolute top-0 left-0 right-0 bg-white backdrop-blur-md p-6 border-b border-amber-200/50 z-10">
                                <div className="text-sm md:text-xs tracking-[0.2em] text-amber-700/80 uppercase mb-1">Personal Invitation</div>
                                <div className="text-2xl font-bold text-gray-900">Your Journey Awaits</div>
                              </div>
                              
                              {/* Main Content - Letter Style */}
                              <div className="absolute inset-0 pt-32 pb-32 px-6 overflow-y-auto">
                                <div className="max-w-sm mx-auto space-y-6">
                                  <div className="text-amber-700/60 text-sm leading-relaxed">
                                    Dear Traveler,
                                  </div>
                                  
                                  {/* The Art of Anticipation Narrative */}
                                  <div className="text-gray-800 leading-relaxed text-base space-y-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    <p>
                                      The artisans at the atelier in Florence have been briefed on your arrival. They aren't just showing you leather; they are sharing the heritage of the 4th generation.
                                    </p>
                                    <p>
                                      We've carved out ninety minutes of stillness before your dinner—a private terrace overlooking the Arno where the light hits exactly as you described in your 'Serenity' preference. It's not just a view; it's your space in the city.
                                    </p>
                                  </div>
                                  
                                  {/* Curation Score */}
                                  <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm md:text-xs text-amber-700/80 uppercase tracking-wider">Curation Score</span>
                                      <span className="text-2xl font-bold text-amber-700">94%</span>
                                    </div>
                                    <div className="h-2 bg-amber-200/50 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '94%' }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                        className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
                                      />
                                    </div>
                                  </div>
                                  
                                  {/* Belonging Index */}
                                  <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm md:text-xs text-amber-700/80 uppercase tracking-wider">Belonging Index</span>
                                      <span className="text-2xl font-bold text-amber-700">8.7/10</span>
                                    </div>
                                    <div className="text-sm md:text-xs text-gray-600 leading-relaxed">
                                      Based on emotional resonance, cultural depth, and personal alignment with your travel DNA. Focus: Belonging & Stillness.
                                    </div>
                                  </div>
                                  
                                  {/* Action Buttons */}
                                  <div className="space-y-3">
                                    <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:from-amber-700 hover:to-amber-800 transition-all">
                                      Accept Invitation
                                    </button>
                                    <button className="w-full bg-white border-2 border-amber-300 text-amber-700 font-semibold py-3 rounded-xl hover:bg-amber-50 transition-all">
                                      Request Alternative Mood
                                    </button>
                                  </div>
                                  
                                  {/* Data Overlay - Spontaneity Layer */}
                                  <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-3 mt-4">
                                    <div className="text-sm md:text-xs font-mono text-amber-400/80 mb-1">System Note (Spontaneity Layer):</div>
                                    <div className="text-sm md:text-xs font-mono text-gray-300 leading-relaxed">
                                      Syncing with Atelier private calendar... Real-time weather check: 22°C with golden hour at 18:42.
                                    </div>
                                  </div>
                                  
                                  {/* System Logic Footer */}
                                  <div className="pt-4 border-t border-amber-200/50 mt-4">
                                    <div className="text-sm md:text-xs font-mono text-gray-500 space-y-1">
                                      <div>GPS: 43.7696°N, 11.2558°E</div>
                                      <div>Weather API: Active | Calendar API: Synced</div>
                                      <div>Narrative Engine: "Art of Anticipation" mode</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* Creative Studio Skin */}
                          {activeIndustrySkin === 'creative' && (
                            <motion.div
                              key="creative"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.5 }}
                              className="absolute inset-0 bg-black"
                              style={{ fontFamily: "'Inter', 'Grotesk', sans-serif" }}
                            >
                              {/* Glitch Overlay */}
                              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)'
                              }}></div>
                              
                              {/* Header */}
                              <div className="absolute top-0 left-0 right-0 bg-black backdrop-blur-md p-6 border-b-2 border-cyan-400/50 z-10">
                                <div className="text-sm md:text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">Creative Quest</div>
                                <div className="text-2xl font-bold text-white">Objective Active</div>
                              </div>
                              
                              {/* Main Content */}
                              <div className="absolute inset-0 pt-32 pb-32 px-6 overflow-y-auto">
                                <div className="max-w-sm mx-auto space-y-6">
                                  {/* The Creative Quest Narrative */}
                                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/50 rounded-xl p-6">
                                    <div className="text-sm md:text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">Creative Quest</div>
                                    <div className="text-base font-bold text-white mb-3 leading-relaxed" style={{ fontFamily: "'Inter', monospace" }}>
                                      Creative Block is a spatial problem, not a mental one.
                                    </div>
                                    <div className="text-sm text-gray-300 leading-relaxed space-y-3" style={{ fontFamily: "'Inter', monospace" }}>
                                      <p>
                                        Your mission for the next hour is <strong className="text-cyan-400">'The Brutalist Walk.'</strong> Navigate to the concrete monoliths on the East Side.
                                      </p>
                                      <p>
                                        Don't look at the buildings—look at the <strong className="text-cyan-400">negative space between them</strong>. Find the 'Vaporwave' color palette we discussed for the project launch. Capture three frames where the shadow cuts the light at a 45-degree angle.
                                      </p>
                                    </div>
                                  </div>
                                  
                                  {/* Mood Spectrum Toggle */}
                                  <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 space-y-3">
                                    <div className="text-sm md:text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">Mood Spectrum</div>
                                    <div className="flex gap-2">
                                      {['Minimal', 'Bold', 'Experimental'].map((mood, idx) => (
                                        <button
                                          key={mood}
                                          className={`flex-1 py-2 rounded-lg text-sm md:text-xs font-semibold transition-all ${
                                            idx === 1
                                              ? 'bg-cyan-500/30 border-2 border-cyan-400 text-white'
                                              : 'bg-slate-800 border border-slate-700 text-gray-400'
                                          }`}
                                        >
                                          {mood}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  {/* Creative Flow Progress */}
                                  <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm md:text-xs font-mono text-cyan-400 uppercase tracking-wider">Creative Flow</span>
                                      <span className="text-xl font-bold text-cyan-400">78%</span>
                                    </div>
                                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '78%' }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                                      />
                                    </div>
                                    <div className="text-sm md:text-xs text-gray-400 font-mono">
                                      Focus: Negative Space & Brand Guidelines
                                    </div>
                                  </div>
                                  
                                  {/* Action Buttons */}
                                  <div className="space-y-3">
                                    <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/30 hover:from-cyan-400 hover:to-blue-400 transition-all">
                                      Begin Mission
                                    </button>
                                    <button className="w-full bg-slate-800 border-2 border-cyan-400/30 text-cyan-400 font-bold py-3 rounded-xl hover:bg-slate-700 transition-all">
                                      Shuffle Inspiration Source
                                    </button>
                                  </div>
                                  
                                  {/* Data Overlay - Spontaneity Layer */}
                                  <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-3 mt-4">
                                    <div className="text-sm md:text-xs font-mono text-cyan-400/80 mb-1">System Note (Spontaneity Layer):</div>
                                    <div className="text-sm md:text-xs font-mono text-gray-300 leading-relaxed">
                                      Mapping high-contrast architectural zones... Filtering by Project Alpha Brand Guidelines.
                                    </div>
                                  </div>
                                  
                                  {/* System Logic Footer */}
                                  <div className="pt-4 border-t border-slate-700 mt-4">
                                    <div className="text-sm md:text-xs font-mono text-gray-500 space-y-1">
                                      <div>GPS: 40.7128°N, 74.0060°W</div>
                                      <div>POI API: Active | Brand Guidelines: Loaded</div>
                                      <div>Narrative Engine: "Creative Quest" mode</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* Cultural Tourism Skin */}
                          {activeIndustrySkin === 'cultural' && (
                            <motion.div
                              key="cultural"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.5 }}
                              className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-green-50"
                            >
                              {/* Header */}
                              <div className="absolute top-0 left-0 right-0 bg-white backdrop-blur-md p-6 border-b border-amber-300/50 z-10">
                                <div className="text-sm md:text-xs text-amber-700/80 uppercase tracking-wider mb-1">Time-Traveler's Lens</div>
                                <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                                  Historical Layers
                                </div>
                              </div>
                              
                              {/* Main Content */}
                              <div className="absolute inset-0 pt-32 pb-32 px-6 overflow-y-auto">
                                <div className="max-w-sm mx-auto space-y-6">
                                  {/* The Living Archive Narrative */}
                                  <div className="bg-white border-2 border-amber-200/50 rounded-xl p-6 space-y-4">
                                    <div className="text-sm md:text-xs text-amber-700/80 uppercase tracking-wider mb-2">The Living Archive</div>
                                    <div className="text-gray-800 leading-relaxed text-base space-y-3" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                                      <p>
                                        You are standing where the <strong className="text-amber-700">1921 strike began</strong>. The plaque tells you the date, but the narrative is in the echoes.
                                      </p>
                                      <p>
                                        Move toward the old tannery entrance. If you stand near the rusted gate, the acoustics of the alleyway allow you to hear the bustle of the modern market exactly as it would have sounded to a worker a century ago.
                                      </p>
                                      <p className="font-semibold text-amber-700">
                                        You aren't just visiting history; you are standing in its footprint.
                                      </p>
                                    </div>
                                  </div>
                                  
                                  {/* Map View with Historical Overlay */}
                                  <div className="relative bg-gradient-to-br from-orange-100 to-green-100 rounded-2xl overflow-hidden border-2 border-amber-200/50" style={{ height: '180px' }}>
                                    {/* Map Pattern */}
                                    <div className="absolute inset-0 opacity-20" style={{
                                      backgroundImage: 'linear-gradient(rgba(139,69,19,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,69,19,0.1) 1px, transparent 1px)',
                                      backgroundSize: '30px 30px'
                                    }}></div>
                                    
                                    {/* Historical Timeline Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900/80 to-transparent p-4">
                                      <div className="text-sm md:text-xs text-white/90 font-semibold mb-1">1921: The Strike Begins</div>
                                      <div className="text-sm md:text-xs text-white/70">Workers gathered here to demand fair wages. The echoes remain.</div>
                                    </div>
                                    
                                    {/* AR Layer Indicator */}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-amber-300/50">
                                      <div className="text-sm md:text-xs font-semibold text-amber-700">History Layer Active</div>
                                    </div>
                                  </div>
                                  
                                  {/* Depth of Connection Meter */}
                                  <div className="bg-white border-2 border-amber-200/50 rounded-xl p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm md:text-xs text-amber-700/80 uppercase tracking-wider">Depth of Connection</span>
                                      <span className="text-2xl font-bold text-amber-700">9.2/10</span>
                                    </div>
                                    <div className="h-3 bg-amber-100 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '92%' }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                        className="h-full bg-gradient-to-r from-orange-400 to-amber-600"
                                      />
                                    </div>
                                    <div className="text-sm md:text-xs text-gray-600 leading-relaxed">
                                      Focus: Spatial Audio & Historical Footprints. This location connects to 3 major historical narratives and 7 cultural touchpoints.
                                    </div>
                                  </div>
                                  
                                  {/* Cultural Impact Badges */}
                                  <div className="space-y-2">
                                    <div className="text-sm md:text-xs text-amber-700/80 uppercase tracking-wider mb-2">Cultural Impact</div>
                                    <div className="flex flex-wrap gap-2">
                                      {['Heritage Site', 'Labor History', 'Acoustic Landmark'].map((badge) => (
                                        <span
                                          key={badge}
                                          className="px-3 py-1.5 bg-amber-100 border border-amber-300/50 text-amber-700 rounded-full text-sm md:text-xs font-semibold"
                                        >
                                          {badge}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  {/* Action Buttons */}
                                  <div className="space-y-3">
                                    <button className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:from-orange-600 hover:to-amber-700 transition-all">
                                      Listen to the Echo
                                    </button>
                                    <button className="w-full bg-white border-2 border-amber-300 text-amber-700 font-semibold py-3 rounded-xl hover:bg-amber-50 transition-all">
                                      Reveal Hidden Layer
                                    </button>
                                  </div>
                                  
                                  {/* Data Overlay - Spontaneity Layer */}
                                  <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-3 mt-4">
                                    <div className="text-sm md:text-xs font-mono text-amber-400/80 mb-1">System Note (Spontaneity Layer):</div>
                                    <div className="text-sm md:text-xs font-mono text-gray-300 leading-relaxed">
                                      Cross-referencing 1920s city blueprints with GPS coordinates... Triggering spatial audio node.
                                    </div>
                                  </div>
                                  
                                  {/* System Logic Footer */}
                                  <div className="pt-4 border-t border-amber-200/50 mt-4">
                                    <div className="text-sm md:text-xs font-mono text-gray-500 space-y-1">
                                      <div>GPS: 40.7589°N, 73.9851°W</div>
                                      <div>Historical API: Active | Spatial Audio: Triggered</div>
                                      <div>Narrative Engine: "Living Archive" mode</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                  
                  {/* Explanation Text */}
                  <div className="mt-12 max-w-3xl mx-auto">
                    <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                      <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                        Same Engine, Different Soul
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                        The core Narrative-Driven Travel Experience Generator remains constant: the Spontaneity Engine processes real-time logistics, and the Narrative Layer injects story and meaning. What changes is the <strong className="text-amber-400">Interface Layer</strong>—the visual language, metrics, and interaction patterns that translate system logic into business value.
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                        Notice how each industry measures success differently: Luxury focuses on <strong className="text-amber-400">Belonging Index</strong>, Creative tracks <strong className="text-cyan-400">Creative Flow</strong>, and Cultural emphasizes <strong className="text-amber-400">Depth of Connection</strong>. The system adapts its metrics to match business objectives, proving that AI isn't just giving directions—it's world-building in real-time, tailored to each sector's definition of value.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}

      {/* Project Metadata Sidebar Section - Only for projects with metadata */}
      {project?.metadata && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <FaUser className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Role</h3>
                  </div>
                  <p className="text-gray-700">{project.metadata.role || 'Role information coming soon.'}</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <FaTools className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Skills</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.metadata.skills?.map((skill: string, index: number) => (
                      <span key={index} className="text-sm md:text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <FaLaptopCode className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Tools</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.metadata.tools?.map((tool: string, index: number) => (
                      <span key={index} className="text-sm md:text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <FaCalendarAlt className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Timeline</h3>
                  </div>
                  <p className="text-gray-700">{project.metadata.timeline || 'Timeline information coming soon.'}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Research & Insights Section - Only for projects with research data */}
      {project?.research && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{project.research.title}</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {project.research.description}
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {project.research.insights?.map((insight: string, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <p className="text-gray-700 leading-relaxed">{insight}</p>
                    </div>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.research.images?.map((image: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative w-full h-64 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={normalizeImagePath(image)}
                      alt={`Research insight ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* UX Design & Wireframes Section - Only for projects with uxDesign data */}
      {project?.uxDesign && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{project.uxDesign.title}</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-12">
                  {project.uxDesign.description}
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {project.uxDesign.images?.map((image: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative w-full h-80 rounded-lg overflow-hidden bg-white shadow-sm"
                  >
                    <Image
                      src={normalizeImagePath(image)}
                      alt={`Wireframe ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 30vw"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* UI Design & Visuals Section - Only for projects with uiDesign data */}
      {project?.uiDesign && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                  <FaPalette className="w-8 h-8 text-blue-600" />
                  {project.uiDesign.title}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-12">
                  {project.uiDesign.description}
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  {project.uiDesign.images?.map((image: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative w-full h-96 rounded-lg overflow-hidden shadow-lg"
                  >
                    <Image
                      src={normalizeImagePath(image)}
                      alt={`UI Design ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* Development & Tech Stack Section - Only for projects with development data */}
      {project?.development && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                  <FaCode className="w-8 h-8 text-blue-600" />
                  {project.development.title}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {project.development.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-12">
                  {project.development.techStack?.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="grid md:grid-cols-1 gap-6">
                  {project.development.images?.map((image: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="group relative w-full h-64 rounded-lg overflow-hidden bg-white shadow-sm"
                  >
                    <Image
                      src={normalizeImagePath(image)}
                      alt={`Development ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 896px"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* External Links Section - Only for projects with links data */}
      {project?.links && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                {project.links.prototype !== '#' && (
                  <a
                    href={project.links.prototype}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-sm hover:shadow-md"
                >
                  <FaLink className="w-4 h-4" />
                  View Prototype
                </a>
              )}
              {project.links.liveDemo !== '#' && (
                <a
                  href={project.links.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 shadow-sm hover:shadow-md"
                >
                  <FaLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.links.caseStudy !== '#' && (
                <a
                  href={project.links.caseStudy}
                  className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-900 px-6 py-3 rounded-lg hover:border-gray-400 transition-colors duration-300"
                >
                  Full Case Study
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* R&D Sandbox Section - Only for Social Opportunity Matching */}
      {isSocialOpportunityMatching && <SocialMatchingLab />}

      {/* Section 11: Learnings & Reflections - Only for Social Opportunity Matching */}
      {isSocialOpportunityMatching && (
        <section id="learnings-next" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  Learnings & Reflections
                </h2>
              </div>
              
              <div className="space-y-12">
                {/* Key Learnings - Mobile: Accordion item; Desktop: Always expanded */}
                <div
                  className="learnings-accordion-item"
                  aria-expanded={learningsAccordion.has('key-learnings') || !isMobile}
                  role="region"
                >
                  <h3 
                    id="key-learnings-heading"
                    className="text-xl font-semibold mb-4 text-gray-900 learnings-accordion-trigger"
                    onClick={() => {
                      if (isMobile) {
                        setLearningsAccordion(prev => {
                          const next = new Set(prev);
                          if (next.has('key-learnings')) {
                            next.delete('key-learnings');
                          } else {
                            next.add('key-learnings');
                          }
                          return next;
                        });
                      }
                    }}
                    role={isMobile ? "button" : "heading"}
                    tabIndex={isMobile ? 0 : undefined}
                    aria-controls="key-learnings-content"
                    aria-expanded={learningsAccordion.has('key-learnings') || !isMobile}
                    onKeyDown={(e) => {
                      if (isMobile && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        setLearningsAccordion(prev => {
                          const next = new Set(prev);
                          if (next.has('key-learnings')) {
                            next.delete('key-learnings');
                          } else {
                            next.add('key-learnings');
                          }
                          return next;
                        });
                      }
                    }}
                  >
                    Key Learnings
                  </h3>
                  <div 
                    id="key-learnings-content"
                    className="space-y-4 text-gray-700 leading-relaxed"
                    role="region"
                    aria-labelledby="key-learnings-heading"
                  >
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Low-friction requires system-level design</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Spontaneous social connection cannot be achieved through UI improvements alone—it requires architectural decisions that minimize cognitive load at the data processing layer. The matching logic must operate in the background, surfacing opportunities only when all conditions align.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Integration over standalone</h4>
                        <p className="text-gray-700 leading-relaxed">
                          The module's value is maximized when integrated into existing platforms rather than operating as a standalone app. Users don't want another app to manage—they want social connection capabilities embedded in the tools they already use.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">15-minute commitment window</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Research indicates that 15 minutes represents the optimal commitment threshold for truly low-friction interactions. Anything longer requires planning, and anything shorter feels too fleeting to be meaningful.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Privacy-first matching</h4>
                        <p className="text-gray-700 leading-relaxed">
                          The module must balance discovery with privacy. Users need granular control over who can discover them and when, with encrypted location data and opt-in matching rather than default-on behavior.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Back to Projects Link */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/projects/travel-and-ai"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Travel & AI Projects
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default TravelProjectDetailClient;

