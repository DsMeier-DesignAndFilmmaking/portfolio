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
  FaMountain,
  FaPlane,
  FaTrafficLight,
  FaBolt,
  FaExclamationTriangle,
  FaListUl,
  FaShieldAlt,
  FaLock,
  FaUserCircle,
  FaTags,
  FaSatellite,
  FaFingerprint,
} from 'react-icons/fa';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import PageTransitionOverlay from '../../../../../components/PageTransitionOverlay';
import StickyProgressNav from '../../../../../components/StickyProgressNav';
import SystemStack from '../../../../../components/SystemStack';
import NarrativeDiagram from '../../../../../components/NarrativeDiagram';
import EmotionalArcGraph from '../../../../../components/EmotionalArcGraph';
import RecoveryStateIndicator from '../../../../../components/RecoveryStateIndicator';
import PivotAnimation from '../../../../../components/PivotAnimation';
import TrustSignalDemo from '../../../../../components/LivePulseDemo';
import TrustPulseUI from '../../../../../components/TrustPulseUI';
import SystemOrchestrator from '../../SystemOrchestrator';
import ProjectNavigation from '../../../../../components/ProjectNavigation';
import { AlertCircle, CheckCircle2, UserCircle2, UserCheck, Link2, Terminal, Check, RefreshCw, CloudRain, BatteryLow, Coffee, MessageCircle, ShieldCheck, Target, ArrowRight, Shield, Share2, CheckCircle, Sparkles, MapPin, Clock, Utensils, Navigation, Compass, BookOpen, Zap, Cpu, Network, Database, Layers, Activity, Users, Globe, TrendingUp, Brain, GitBranch, Fingerprint, Eye, Monitor, Smartphone } from 'lucide-react';
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

const IntegratedSocialInvite = () => {
  return (
    /* Reduced bottom padding to allow the element to sit higher in the flex container */
    <div className="relative w-full max-w-2xl mx-auto pb-10 flex flex-col items-center">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 via-transparent to-transparent opacity-40 pointer-events-none" />

      {/* Main wrapper shifted up using negative top margin / translation */}
      <div className="relative w-full flex flex-col items-center -translate-y-16 lg:-translate-y-24">
        
        {/* The System Logic (Bottom Layer) */}
        <div className="relative w-72 h-72 md:w-80 md:h-80">
          <svg className="w-full h-full" viewBox="0 0 320 320">
            <motion.circle
              cx="160" cy="160" r="145" fill="none"
              stroke="url(#socialGradient)" strokeWidth="1.5" strokeDasharray="8 16"
              animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <motion.rect
              x="100" y="100" width="120" height="120" rx="40"
              className="fill-white stroke-slate-100" strokeWidth="1"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <defs>
              <linearGradient id="socialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#d946ef" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          {/* Logic Ring Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center -translate-y-16">
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em] mb-1">
              New Invite
            </div>
            <div className="text-lg font-bold text-slate-800 tracking-tight">
              Matching your vibe
            </div>
            <div className="mt-2 flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100">
              <Coffee size={10} />
              <span className="text-[9px] font-bold uppercase tracking-wider">15m Break</span>
            </div>
          </div>
        </div>

        {/* Marco's Invitation (Overlapping Layer) */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          /* Increased negative translate-y to -32 (up from -24) to finalize the 25% lift */
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-32 w-full max-w-[340px] z-20"
        >
          <div className="bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] border border-slate-100 rounded-[2.5rem] overflow-hidden">
            {/* Header / Meta */}
            <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    <UserCircle2 className="text-slate-400 w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">Marco just posted...</h4>
                    <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                      <MapPin size={10} className="text-amber-500" /> 200m away · Shared Interests
                    </p>
                  </div>
               </div>
               <Sparkles className="text-amber-400 w-4 h-4 animate-pulse" />
            </div>

            {/* Content Body */}
            <div className="p-6">
              <div className="relative bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50 mb-5">
                <MessageCircle size={14} className="absolute -top-2 -left-1 text-amber-200" />
                <p className="text-[13px] text-slate-700 leading-relaxed italic">
                  "Hey! I'm taking a quick break to check out this <strong>Modern Architecture</strong> spot. Since we both have a 15-minute gap, want to grab a coffee?"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-slate-900 text-white text-xs font-bold py-3 rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95">
                  Join Marco
                </button>
                <button className="flex-[0.5] bg-slate-100 text-slate-500 text-xs font-bold py-3 rounded-2xl hover:bg-slate-200 transition-all active:scale-95">
                  Skip
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Verification Tag - Adjusted negative margin to tuck it closer to the moved graphic */}
      <motion.div 
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="mt-0 lg:-mt-10 px-4 py-2 bg-white/80 backdrop-blur-md border border-emerald-500/20 rounded-full shadow-sm flex items-center gap-2 z-30"
      >
        <CheckCircle2 className="text-emerald-500 w-4 h-4" />
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">
          High Affinity · Zero Friction Match
        </span>
      </motion.div>
    </div>
  );
};

// Connection Path Visualization Component
const ConnectionPathVisualization = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative rounded-[2.5rem] border border-sky-100 bg-white/90 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.18)] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),_transparent_55%)]" />

        <div className="relative p-6 md:p-8">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400 mb-6">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            Connection Path
          </div>

          <div className="relative mt-6 h-[260px] rounded-[2rem] border border-slate-100 bg-gradient-to-br from-white via-slate-50 to-sky-50/40 overflow-hidden">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 260" fill="none">
              <defs>
                <linearGradient id="connectionPath" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.5" />
                </linearGradient>
                <radialGradient id="nodeGlowPath">
                  <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
                </radialGradient>
              </defs>
              
              {/* Connection Path Arrow */}
              <path d="M80 130 L440 130" stroke="url(#connectionPath)" strokeWidth="3" strokeLinecap="round" />
              <path d="M430 125 L440 130 L430 135" stroke="url(#connectionPath)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              
              {/* Connection Nodes */}
              {/* Node 1: You */}
              <g>
                <circle cx="120" cy="130" r="18" fill="#0EA5E9" opacity="0.9">
                  <animate attributeName="r" values="18;20;18" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="120" cy="130" r="25" fill="url(#nodeGlowPath)" opacity="0.3" />
                <text x="120" y="135" textAnchor="middle" className="fill-white text-[10px] font-bold">You</text>
              </g>
              
              {/* Node 2: Mutual Friend */}
              <g>
                <circle cx="260" cy="130" r="16" fill="#06B6D4" opacity="0.85">
                  <animate attributeName="r" values="16;18;16" dur="2.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="260" cy="130" r="22" fill="url(#nodeGlowPath)" opacity="0.25" />
                <text x="260" y="135" textAnchor="middle" className="fill-white text-[9px] font-semibold">Friend</text>
              </g>
              
              {/* Node 3: Planning Traveler */}
              <g>
                <circle cx="400" cy="130" r="18" fill="#0EA5E9" opacity="0.9">
                  <animate attributeName="r" values="24;26;24" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="400" cy="130" r="25" fill="url(#nodeGlowPath)" opacity="0.3" />
                <text x="400" y="135" textAnchor="middle" className="fill-white text-[10px] font-bold">Traveler</text>
              </g>
            </svg>

            {/* Expertise Match Label */}
            <div className="absolute top-4 left-4 right-4 rounded-xl border border-sky-100 bg-white/95 backdrop-blur-sm px-4 py-2.5 text-xs text-slate-700 shadow-sm">
              <span className="font-semibold text-sky-600">Expertise Match:</span> You (40 Countries) → Mutual Friend → Planning Traveler (Headed to Istanbul)
            </div>

            {/* Trust Validated Badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-semibold text-sky-700 shadow-sm">
              Trust Validated: 2nd Degree Connection
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RelationalHeuristicsVectorVisualization = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative rounded-[2.5rem] border border-amber-100 bg-white/90 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.18)] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.15),_transparent_55%)]" />

        <div className="relative p-6 md:p-8">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Vector Visualization
          </div>

          <div className="relative mt-6 h-[260px] rounded-[2rem] border border-slate-100 bg-gradient-to-br from-white via-slate-50 to-amber-50/40 overflow-hidden">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 260" fill="none">
              <defs>
                <linearGradient id="vectorLine" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#64748b" stopOpacity="0.35" />
                </linearGradient>
              </defs>
              <path d="M80 60 L220 120 L420 70" stroke="url(#vectorLine)" strokeWidth="2" strokeDasharray="6 10" />
              <path d="M120 200 L260 140 L400 190" stroke="url(#vectorLine)" strokeWidth="2" strokeDasharray="4 12" />
              <path d="M220 120 L260 140" stroke="#e2e8f0" strokeWidth="1.5" />
            </svg>

            <div className="absolute left-10 top-10 flex flex-col items-center">
              <div className="h-12 w-12 rounded-full border border-amber-200 bg-amber-50 text-amber-700 flex items-center justify-center font-mono text-xs font-bold shadow-sm">
                [T]
              </div>
              <span className="mt-2 text-[10px] uppercase tracking-widest text-amber-600">Traveler</span>
            </div>

            <div className="absolute right-14 top-8 flex flex-col items-center">
              <div className="h-12 w-12 rounded-full border border-slate-200 bg-slate-50 text-slate-700 flex items-center justify-center font-mono text-xs font-bold shadow-sm">
                [L]
              </div>
              <span className="mt-2 text-[10px] uppercase tracking-widest text-slate-500">Local</span>
            </div>

            <div className="absolute left-20 bottom-10 flex flex-col items-center">
              <div className="h-11 w-11 rounded-full border border-amber-200 bg-amber-50 text-amber-700 flex items-center justify-center font-mono text-[10px] font-bold shadow-sm">
                [T]
              </div>
              <span className="mt-2 text-[10px] uppercase tracking-widest text-amber-600">Traveler</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-amber-100 bg-white/90 px-4 py-3 text-xs text-slate-600 shadow-sm backdrop-blur-sm">
              <span className="font-semibold text-amber-600">Signal Detected:</span> Local Photography Expert (Istanbul) / Proximity: 400m / Context: Golden Hour / Match Probability: 96%
            </div>
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
      type: 'Traveler',
      degree: 1,
      distance: 120,
      interests: ['Art', 'Coffee', 'Architecture'],
      scheduleGap: 45,
      activityDuration: 30,
    },
    {
      id: 2,
      name: 'Local Guide: Emre',
      type: 'Local',
      degree: 1,
      distance: 400,
      interests: ['Photography', 'Architecture'],
      scheduleGap: 30,
      activityDuration: 20,
      localExpertise: 0.92,
      neighborhoodFamiliarity: 0.88,
    },
    {
      id: 3,
      name: 'Sarah Martinez',
      type: 'Traveler',
      degree: 2,
      distance: 350,
      interests: ['Art', 'Coffee'],
      scheduleGap: 20,
      activityDuration: 25,
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

    // Local Expertise Weight (for Local guides only)
    if (match.type === 'Local' && match.localExpertise) {
      const expertiseScore = Math.round(match.localExpertise * 35);
      score += expertiseScore;
      breakdown.push({
        step: 'Local Expertise Weight',
        value: expertiseScore,
        description: `+${expertiseScore}pts (${Math.round(match.localExpertise * 100)}% expertise)`
      });
    }

    // Neighborhood Familiarity (for Local guides only)
    if (match.type === 'Local' && match.neighborhoodFamiliarity) {
      const familiarityScore = Math.round(match.neighborhoodFamiliarity * 25);
      score += familiarityScore;
      breakdown.push({
        step: 'Neighborhood Familiarity',
        value: familiarityScore,
        description: `+${familiarityScore}pts (${Math.round(match.neighborhoodFamiliarity * 100)}% familiarity)`
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

    // Generate logic feed with relational logic comparison
    const feed: string[] = [];
    feed.push('> Relational Heuristics Engine v1.0');
    feed.push('> Calculating Exchange Value...');
    feed.push('');
    
    const alexChen = filtered.find(m => m.name === 'Alex Chen');
    const emre = filtered.find(m => m.name === 'Local Guide: Emre');
    
    if (alexChen && emre) {
      feed.push('> Comparing: Alex Chen vs. Local Guide: Emre');
      feed.push('');
      feed.push('[TRAVELER] Alex Chen:');
      alexChen.breakdown.forEach(step => {
        if (step.value !== 0 || step.step === 'Temporal Feasibility') {
          feed.push(`  ${step.step}: ${step.value > 0 ? '+' : ''}${step.value}pts - ${step.description}`);
        }
      });
      feed.push(`  → Final Score: ${alexChen.finalScore}pts`);
      feed.push('');
      feed.push('[LOCAL] Local Guide: Emre:');
      emre.breakdown.forEach(step => {
        if (step.value !== 0 || step.step === 'Temporal Feasibility') {
          feed.push(`  ${step.step}: ${step.value > 0 ? '+' : ''}${step.value}pts - ${step.description}`);
        }
      });
      feed.push(`  → Final Score: ${emre.finalScore}pts`);
      feed.push('');
      feed.push(`> Optimal Match: ${emre.finalScore > alexChen.finalScore ? 'Local Guide: Emre' : 'Alex Chen'}`);
      feed.push(`> Exchange Value: ${Math.max(emre.finalScore, alexChen.finalScore)}pts`);
    } else {
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
    }

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
      {/* Subtle glowing amber radial gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-amber-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      
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
                Relational Logic Engine
              </h2>
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-lg"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-green-400 uppercase tracking-wider">
                  STATUS: ACTIVE
                </span>
              </motion.div>
            </div>
            <p className="text-gray-400 text-sm md:text-base">
              Real-time relational heuristics calculation engine
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
                  <MapPin className="w-4 h-4 text-amber-400" />
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
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
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
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10min</span>
                    <span>120min</span>
                  </div>
                </div>

                {/* Interest Tags */}
                <div>
                  <label className="block text-sm text-gray-300 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Interest Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleInterestTag(tag)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                          interestTags.includes(tag)
                            ? 'bg-amber-500 text-white border border-amber-400'
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
                <Clock className="w-4 h-4 text-amber-400" />
                Logic Feed
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
                <Shield className="w-4 h-4 text-amber-400" />
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
                          <div className="text-2xl font-bold text-amber-400">{match.finalScore}</div>
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
                                ? 'bg-amber-500/30 text-amber-300 border border-amber-400/50'
                                : 'bg-white/5 text-gray-500 border border-white/10'
                            }`}
                          >
                            {interest}
                          </span>
                        ))}
                      </div>

                      {/* Score Breakdown on Hover */}
                      <div className="absolute inset-0 bg-black/95 border border-amber-500/50 rounded-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
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
                            <span className="text-amber-400 font-bold">{match.finalScore}pts</span>
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

          {/* Build Status Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <FaTools className="w-4 h-4 text-amber-400" />
              Build Status
            </h3>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="space-y-4">
                {/* Active Modules */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Active</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-md text-xs font-medium">
                      Proximity Hashing
                    </span>
                    <span className="px-3 py-1.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-md text-xs font-medium">
                      Interest Weighting
                    </span>
                  </div>
                </div>
                
                {/* Testing Modules */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Testing</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-md text-xs font-medium">
                      Exchange Value Heuristic
                    </span>
                    <span className="px-3 py-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-md text-xs font-medium">
                      Sentiment Translation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CATDSVisual = () => {
  const modules = [
    { 
      name: 'Context Interpreter', 
      desc: 'Semantic Vector Gen', 
      icon: Fingerprint,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50'
    },
    { 
      name: 'Veracity Logic', 
      desc: 'Real-time Verification', 
      icon: ShieldCheck,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    { 
      name: 'Scenario Logic', 
      desc: 'Multi-constraint Solver', 
      icon: Layers,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    }
  ];

  return (
    <div className="relative w-full max-w-lg flex flex-col items-center overflow-visible">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 via-transparent to-transparent opacity-30" />
      
      <div className="relative w-full bg-white border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] rounded-[2.5rem] p-8 overflow-visible">
        
        {/* Header: System Identity */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <Cpu className="text-amber-400 w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Logic Instance</div>
              <div className="text-sm font-bold text-slate-900">CATDS_v1.0_Middleware</div>
            </div>
          </div>
          <div className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider italic">Live Processing</span>
          </div>
        </div>

        {/* The Core Pipeline Visualization */}
        <div className="space-y-6 relative">
          
          {/* Input Layer */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
              <Activity className="text-slate-400 w-5 h-5" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                <span>Environmental Sensing</span>
                <span className="text-amber-600">Active</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-full w-1/3 bg-amber-400" 
                />
              </div>
            </div>
          </div>

          {/* Middleware Logic Bridge */}
          <div className="py-2 flex justify-center">
             <div className="h-8 w-px bg-gradient-to-b from-amber-400 to-cyan-400" />
          </div>

          {/* Processing Layer */}
          <div className="bg-slate-900 rounded-2xl p-5 text-white relative overflow-visible">
            <div className="absolute -top-3 left-6 px-3 py-0.5 bg-cyan-500 rounded-full text-[9px] font-bold uppercase tracking-widest z-10">
              Vector Generation
            </div>
            <div className="space-y-3 font-mono">
              <div className="flex justify-between text-[11px] opacity-60">
                <span>// Context Interpreter</span>
                <span className="text-cyan-400">0.04ms</span>
              </div>
              <div className="text-[12px] text-cyan-100 leading-relaxed">
                {"{ energy: 0.22, crowd: 0.89, terrain: 'accessible' }"}
              </div>
            </div>
          </div>

          <div className="py-2 flex justify-center">
             <div className="h-8 w-px bg-gradient-to-b from-cyan-400 to-emerald-400" />
          </div>

          {/* Output Layer */}
          <div className="flex items-center gap-4 bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-white border border-emerald-100 flex items-center justify-center shadow-sm">
              <ShieldCheck className="text-emerald-500 w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-0.5">Decision Vector Output</div>
              <div className="text-sm font-bold text-slate-800 tracking-tight">Indoor Pivot: Verified</div>
            </div>
          </div>
        </div>

        {/* Latency Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Database className="text-slate-300 w-4 h-4" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">latency</span>
          </div>
          <span className="text-xs font-mono font-bold text-slate-900 tracking-tighter">&lt; 140ms</span>
        </div>
      </div>

      {/* Verification Tag */}
      <div className="mt-8 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-100 rounded-full shadow-sm flex items-center gap-2">
        <Zap className="text-amber-500 w-3 h-3" />
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">
          Headless SDK Deployment Ready
        </span>
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
  const pathname = usePathname();
  
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
  const [showFullLuxuryInvite, setShowFullLuxuryInvite] = useState(false);
  const [expandedRoadmapPhases, setExpandedRoadmapPhases] = useState<Set<string>>(new Set());
  // Mobile accordion state for Learnings & Reflections section
  const [learningsAccordion, setLearningsAccordion] = useState<Set<string>>(new Set());
  // Demo state for Living Graph interactive demo
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [demoStage, setDemoStage] = useState<'idle' | 'activating' | 'matching' | 'complete'>('idle');
  const [activeTravelersCount, setActiveTravelersCount] = useState(13042);
  const [reciprocalMatchesCount, setReciprocalMatchesCount] = useState(8);
  const [demoLogs, setDemoLogs] = useState<string[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<{ name: string; location: string; match: number } | null>(null);
  
  // Check which project this is
  const isSpontaneousTravelCompanion = projectId === 'spontaneous-travel-companion';
  const isCulturalContextEngine = projectId === 'trust-framework-ai-travel';
  const isTravelPlanningAssistant = projectId === 'context-aware-travel-decision-system';
  const isLocalExperienceFinder = projectId === 'social-graph-driven-travel-network';
  const isSocialOpportunityMatching = projectId === 'social-opportunity-matching-module';
  const isNarrativeTravelGenerator = projectId === 'narrative-driven-travel-experience-generator';
  const isOtherProject = false; // All projects now have full implementations

  // Check if we're on the logic version of the context-aware-travel-decision-system page
  const isContextAwareLogicPage = isTravelPlanningAssistant && pathname?.includes('context-aware-travel-decision-system-logic');

  // Define sections for the sticky progress nav
  const sections = isNarrativeTravelGenerator
    ? [
        { id: 'narrative-thesis', label: 'The Thesis: Narrative Architecture' },
        { id: 'narrative-engine', label: 'The Narrative Engine' },
        { id: 'interface-logic', label: 'Design Evolution: From Latent Nodes to Active Story Beats' },
        { id: 'adaptive-re-anchoring', label: 'Adaptive Re-Anchoring: The Recovery Journey' },
        { id: 'industry-skins', label: 'Industry Skins: Same Engine, Different Soul' },
        { id: 'strategic-outlook', label: 'Strategic Outlook: The Horizon' }
      ]
    : isLocalExperienceFinder
    ? [
        // Social Graph-Driven Travel Network: 7 cohesive sections mapped to actual section IDs and titles
        { id: 'architecture', label: 'The Architecture' },
        { id: 'design-evolution-logic', label: 'Design Evolution' },
        { id: 'research-market-fit', label: 'Privacy-Discovery Paradox' },
        { id: 'journey-dna', label: 'Discovery Journey' },
        { id: 'ecosystem-impact', label: 'Ecosystem Impact' },
        { id: 'strategic-learnings', label: 'Strategic Learnings' },
        { id: 'the-horizon', label: 'The Horizon' }
      ]
    : isSocialOpportunityMatching
    ? [
        // Social Opportunity Matching Module page sections
        { id: 'architecture', label: 'The Architecture' },
        { id: 'wireframes-ui', label: 'Detailed Logic' },
        { id: 'system-principles', label: 'System Principles' },
        { id: 'design-evolution-logic', label: 'Design Evolution' },
        { id: 'research-market-fit', label: 'Research & Market Fit' },
        { id: 'strategic-learnings', label: 'Strategic Learnings' },
        { id: 'the-horizon', label: 'The Horizon' }
      ]
    : isCulturalContextEngine
    ? [
        // Trust Framework page sections - order matches actual page structure
        { id: 'design-exploration', label: 'Observed Travel Frictions' },
        { id: 'research-audience', label: 'Architectural Constraints' },
        { id: 'architecture', label: 'Architecture: Powering Spontaneity through Veracity Logic' },
        { id: 'wireframes-ui', label: 'Design Evolution' },
        { id: 'prototyping-ai', label: 'Development & Build' },
        { id: 'outcomes-launch', label: 'Launch & Testing' },
        { id: 'learnings-next', label: 'Learnings & Reflections' }
      ]
    : isTravelPlanningAssistant
    ? isContextAwareLogicPage
      ? [
          // Context-Aware Travel Decision System Logic page sections (order matches DOM)
          { id: 'research-audience', label: 'The Architecture' },
          { id: 'designs-strategy', label: 'Concept & Strategy' },
          { id: 'design-exploration', label: 'System Logic' },
          { id: 'wireframes-ui', label: 'Design Evolution' },
          { id: 'outcomes-launch', label: 'Launch & Testing' },
          { id: 'learnings-next', label: 'Learnings & Reflections' },
          { id: 'prototyping-ai', label: 'System Evolution & Deployment' }
        ]
      : [
          // Context-Aware Travel Decision System page sections (order matches DOM)
          { id: 'research-audience', label: 'Audience & Research' },
          { id: 'designs-strategy', label: 'Concept & Strategy' },
          { id: 'design-exploration', label: 'Observed Travel Frictions' },
          { id: 'wireframes-ui', label: 'Design Evolution' },
          { id: 'outcomes-launch', label: 'Launch & Testing' },
          { id: 'learnings-next', label: 'Learnings & Reflections' },
          { id: 'prototyping-ai', label: 'System Evolution & Deployment' }
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
      <div className="flex items-center gap-4">
        {/* Updated Back to Stack Button */}
        <button
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            setIsTransitioning(true);
            setTimeout(() => {
              if (typeof window !== 'undefined' && window.history.length > 1) {
                router.back();
              } else {
                router.push('/projects/travel-and-ai');
              }
            }, 500);
          }}
          className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-all cursor-pointer"
        >
          <FaArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Stack
        </button>

        {/* Subtle Divider */}
        <div className="h-3 w-[1px] bg-gray-300" aria-hidden="true" />

        {/* Travel & AI Home Link */}
        <Link
          href="/projects/travel-and-ai"
          onClick={(e) => {
            e.preventDefault();
            setIsTransitioning(true);
            setTimeout(() => router.push('/projects/travel-and-ai'), 500);
          }}
          className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-all"
        >
          Travel & AI Home
        </Link>
      </div>

      {/* Right side of nav (if needed) */}
      <div className="hidden md:block">
        {/* You can add a 'Status: Beta' or 'Module: 01' tag here for extra UX polish */}
      </div>
    </div>
  </div>
</motion.nav>

    {/* Sticky Progress Navigation */}
    {(isSpontaneousTravelCompanion || isCulturalContextEngine || isLocalExperienceFinder || isTravelPlanningAssistant || isSocialOpportunityMatching || isNarrativeTravelGenerator) && (
      <StickyProgressNav sections={sections} />
    )}

{isSpontaneousTravelCompanion && (
  <>
    {/* 1. HERO SECTION */}
    <section 
      className="bg-white min-h-[80vh] flex items-center pt-24 pb-20 lg:pt-[91px] lg:pb-[76px] overflow-visible" 
      aria-label="Project Hero"
    >
      <div className="container mx-auto px-6 overflow-visible">
        <div className="max-w-7xl mx-auto overflow-visible">
          {/* Main Grid Container */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-12 lg:items-center overflow-visible">
            
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                Spontaneity Engine
              </h1>
              
              <div className="mb-6">
                <span className="inline-block px-3 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                  In Development
                </span>
              </div>

              {/* Hero Copy - WCAG AA Compliant Typography */}
              <div className="space-y-6 mb-8 max-w-2xl">
                {/* Intro */}
                <p className="text-[16px] sm:text-[14px] text-gray-100 dark:text-gray-900 leading-relaxed tracking-wide">
                This architecture integrates private trust frameworks with environmental logic to bridge systemic safety with spontaneous discovery.               
                </p>

                {/* The Challenge */}
                <div className="space-y-2">
                  <div className="text-[12px] font-bold uppercase tracking-wide text-gray-900 dark:text-blue-700">
                    The Challenge
                  </div>
                  <p className="text-[16px] sm:text-[14px] text-gray-700 dark:text-gray-900 leading-relaxed tracking-wide">
                    Solving the 'Filter Bubble' and decision fatigue in live, spontaneous travel environments.
                  </p>
                </div>

                {/* The Solution */}
                <div className="space-y-2">
                  <div className="text-[12px] font-bold uppercase tracking-wide text-gray-900 dark:text-blue-700">
                    The Solution
                  </div>
                  <p className="text-[16px] sm:text-[14px] text-gray-700 dark:text-gray-900 leading-relaxed tracking-wide">
                    Context-driven AI designed for the moment, prioritizing live activation over static planning logic.
                  </p>
                </div>
              </div>

              


              {/* CTAs */}
              <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8">
                <a href="#live-demo" className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl text-base">Explore Prototype</a>
                <a href="#design-exploration" className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-900 text-slate-900 font-bold rounded-xl text-base">View Case Study</a>
              </nav>
            </motion.div>

            {/* Right Visual Column - SystemOrchestrator Interactive Component */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-2 mt-16 lg:mt-0 w-full h-full flex items-center justify-center overflow-visible"
            >
              <div className="relative z-10 w-full h-full flex items-center justify-center scale-[0.9]">
                <SystemOrchestrator hideHeader={true} />
              </div>
            </motion.div>

          </div> {/* End of Grid */}
        </div> {/* End of Max-Width */}
      </div> {/* End of Container */}
    </section>

    {/* 2. FAILURE PATTERNS SECTION */}
    <section id="design-exploration" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
      <div className="text-center mb-12">
        {/* text-wrap: balance ensures the headline splits into two roughly equal lines */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 [text-wrap:balance]">
          Systemic Travel Discovery Failures
        </h2>
  
  {/* text-gray-700 for ADA; \u00A0 to glue the final words together */}
  <p className="text-gray-700 text-lg max-w-2xl mx-auto [text-wrap:pretty]">
    Pattern-level breakdowns in how discovery {"platforms\u00A0operate."}
  </p>
</div>

          {/* New Scannable Systems Table */}
          <div className="overflow-hidden border border-gray-200 rounded-2xl shadow-sm bg-white">
            <div className="overflow-x-auto overflow-y-hidden touch-pan-x overscroll-x-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
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
              "These failures emerge from static, popularity-driven systems operating in {"dynamic,\u00A0time-sensitive\u00A0environments."}"
            </p>
          </div>
        </motion.div>
      </div>
    </section>

       
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

  {/* Headline: balanced for visual symmetry */}
  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 [text-wrap:balance]">
    Why Spontaneity Is a Systems Problem
  </h2>
  
  {/* Body: Darkened to gray-700 for ADA and glued final 3 words */}
  <p className="text-gray-700 text-lg max-w-2xl mx-auto [text-wrap:pretty]">
    The impact extends beyond individual travelers—it requires a systemic approach 
    that balances traveler needs with {"community\u00A0benefits."}
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
      <div className="mb-16 text-center max-w-4xl mx-auto">
  {/* Centered Headline with balanced wrapping logic */}
  <h2 className="text-3xl font-bold mb-4 text-gray-900 [text-wrap:balance]">
    Systemic Constraints
  </h2>
  
  {/* Centered Paragraph: mx-auto is required here to center the max-width container */}
  <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto [text-wrap:pretty]">
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
<section id="designs-strategy" className="py-20 bg-gray-50 overflow-x-hidden">
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
        <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto [text-wrap:balance]">
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

        {/* 4. Architectural Boundaries (System Constraints) */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300">
          <button
            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors focus:outline-none"
            onClick={() => setActiveAccordion(activeAccordion === 'avoid' ? null : 'avoid')}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-700 text-xs font-bold shrink-0">04</div>
              <h3 className="text-lg font-bold text-gray-900">Architectural Boundaries</h3>
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
                <div className="p-6">
                  {/* Status Badge */}
                  <div className="mb-6 flex items-center justify-start">
                    <div className="px-4 py-2 bg-slate-900/40 border border-slate-800 rounded-lg">
                      <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                        [LOGIC_STATUS: CONSTRAINT_ENFORCED]
                      </span>
                    </div>
                  </div>

                  {/* Architectural Boundary Table */}
                  <div className="bg-black rounded-2xl overflow-hidden border border-slate-800">
                    <div className="overflow-x-auto overflow-y-hidden touch-pan-x overscroll-x-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="p-5 text-left text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Anti-Goal</th>
                            <th className="p-5 text-left text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">The Technical Why</th>
                            <th className="p-5 text-left text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Architectural Displacement</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          <tr className="bg-gradient-to-br from-red-500/10 to-orange-500/5 border-l-4 border-red-500/30">
                            <td className="p-5 align-top">
                              <span className="text-base font-semibold text-gray-200" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>Not a Trip Planner</span>
                            </td>
                            <td className="p-5 align-top">
                              <p className="text-sm text-gray-300 leading-relaxed">
                                Pre-computed itineraries create temporal rigidity. The Narrative Engine requires <span className="font-semibold text-white">full temporal elasticity</span> to respond to real-time context shifts processed through CATDS middleware.
                              </p>
                            </td>
                            <td className="p-5 align-top">
                              <p className="text-sm text-gray-400 italic leading-relaxed pt-4 border-t border-white/5">
                                <strong className="text-gray-300 not-italic uppercase tracking-wider text-[10px]">Displaced:</strong> <span className="font-mono text-emerald-400">Semantic Translation</span> layer handles route optimization externally; system processes semantic intent into actionable signals.
                              </p>
                            </td>
                          </tr>
                          <tr className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 border-l-4 border-purple-500/30">
                            <td className="p-5 align-top">
                              <span className="text-base font-semibold text-gray-200" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>Not a Social Network</span>
                            </td>
                            <td className="p-5 align-top">
                              <p className="text-sm text-gray-300 leading-relaxed">
                                Persistent identity graphs create privacy overhead and reduce spontaneity. The system operates on <span className="font-semibold text-white">ephemeral connection signals</span> verified via ZK-proofs.
                              </p>
                            </td>
                            <td className="p-5 align-top">
                              <p className="text-sm text-gray-400 italic leading-relaxed pt-4 border-t border-white/5">
                                <strong className="text-gray-300 not-italic uppercase tracking-wider text-[10px]">Displaced:</strong> <span className="font-mono text-emerald-400">CATDS Trust Layer</span> handles social verification at middleware level; UI surfaces only verified connection states.
                              </p>
                            </td>
                          </tr>
                          <tr className="bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border-l-4 border-cyan-500/30">
                            <td className="p-5 align-top">
                              <span className="text-base font-semibold text-gray-200" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>Not a Feed</span>
                            </td>
                            <td className="p-5 align-top">
                              <p className="text-sm text-gray-300 leading-relaxed">
                                Infinite scroll patterns create decision paralysis. The system surfaces <span className="font-semibold text-white">activation-ready signals</span> via constraint-based filtering, not content aggregation.
                              </p>
                            </td>
                            <td className="p-5 align-top">
                              <p className="text-sm text-gray-400 italic leading-relaxed pt-4 border-t border-white/5">
                                <strong className="text-gray-300 not-italic uppercase tracking-wider text-[10px]">Displaced:</strong> <span className="font-mono text-emerald-400">Narrative Engine Logic</span> handles content discovery via temporal context processors; UI renders only actionable outcomes.
                              </p>
                            </td>
                          </tr>
                          <tr className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-l-4 border-amber-500/30">
                            <td className="p-5 align-top">
                              <span className="text-base font-semibold text-gray-200" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>Not a Dashboard</span>
                            </td>
                            <td className="p-5 align-top">
                              <p className="text-sm text-gray-300 leading-relaxed">
                                Static data visualization requires maintenance overhead. The system provides <span className="font-semibold text-white">situational intelligence</span> through real-time Semantic Translation, not historical analytics.
                              </p>
                            </td>
                            <td className="p-5 align-top">
                              <p className="text-sm text-gray-400 italic leading-relaxed pt-4 border-t border-white/5">
                                <strong className="text-gray-300 not-italic uppercase tracking-wider text-[10px]">Displaced:</strong> <span className="font-mono text-emerald-400">ZK-proof Verification</span> handles historical data storage off-system; UI displays only verified, context-relevant signals.
                              </p>
                            </td>
                          </tr>
                          <tr className="bg-gradient-to-br from-emerald-500/10 to-green-500/5 border-l-4 border-emerald-500/30">
                            <td className="p-5 align-top">
                              <span className="text-base font-semibold text-gray-200" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>Not Predictive</span>
                            </td>
                            <td className="p-5 align-top">
                              <p className="text-sm text-gray-300 leading-relaxed">
                                Behavioral prediction creates filter bubbles. The system operates on <span className="font-semibold text-white">reactive constraint resolution</span> via CATDS, prioritizing present-moment activation over future-state forecasting.
                              </p>
                            </td>
                            <td className="p-5 align-top">
                              <p className="text-sm text-gray-400 italic leading-relaxed pt-4 border-t border-white/5">
                                <strong className="text-gray-300 not-italic uppercase tracking-wider text-[10px]">Displaced:</strong> <span className="font-mono text-emerald-400">Real-time Context Processing</span> replaces prediction logic with constraint-based decision vectors; system responds to environmental signals, not user history patterns.
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Technical Footer */}
                  <div className="mt-6 pt-6 border-t border-slate-800">
                    <p className="text-xs text-slate-400 leading-relaxed italic font-mono">
                      The future of spontaneity requires the removal of legacy planning artifacts to allow the Narrative Engine full temporal elasticity.
                    </p>
                  </div>
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
<section id="wireframes-ui" className="py-24 bg-white border-t border-gray-100 overflow-x-hidden">
  <div className="container mx-auto px-6">
    <div className="max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-20 text-center lg:text-left">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
          Designing for Activation,<br />Not Planning
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed max-w-2xl [text-wrap:pretty]">
          By engineering moments of action directly into the logic layer, I ensured 
          that the interface serves as a direct-drive mechanism for user intent—where 
          every interaction is an outcome, not an {"item\u00A0on\u00A0a\u00A0list."}
        </p>
      </div>
      
      {/* Grid Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >

      </motion.div>

      {/* Iteration Gallery */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        

        <div className="relative h-auto">
          
          {/* Main Scroll Container */}
          <div 
            ref={wireframeScrollRef} // Isolated Ref
            onScroll={handleWireframeScroll}
            className="flex gap-4 overflow-x-auto overflow-y-hidden pb-6 snap-x snap-mandatory no-scrollbar md:justify-center px-4 overscroll-x-contain"
            style={{ 
              WebkitOverflowScrolling: 'touch',
              touchAction: 'auto'
            }}
          >
            {[
              "/images/TravelApp-UXpilot_Homescreen-WireFrame-2.png",
              "/images/TravelApp-UXpilot_Homescreen-WireFrame.png",
              "/images/TravelApp-UXpilot_Homescreen-WireFrame-5.png",
              "/images/TravelApp-UXpilot_Homescreen-WireFrame-4.png",
              "/images/TravelApp-UXpilot_Homescreen-WireFrame-3.png"
            ].map((src, idx) => (
              <div key={idx} className="flex-shrink-0 w-48 snap-center select-none" style={{ touchAction: 'auto' }}>
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

        {/* Visual Design Language Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 pt-16 border-t border-gray-200"
        >
          
        {/* Section Header Note */}
        <div className="max-w-4xl mx-auto mb-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold italic">
            *mockup design concepts
          </p>
        </div>

              {/* Image Gallery - Grid of 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          <div className="rounded-xl overflow-hidden shadow-xl bg-gray-100 w-fit h-fit">
            <Image 
              src={normalizeImagePath("/portfolio/images/Micro-Adventure_ConceptGraphic.png")} 
              alt="Concept Graphic 1" 
              width={280} 
              height={560} 
              className="w-full h-auto block" 
              priority 
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl bg-gray-100 w-fit h-fit">
            <Image 
              src={normalizeImagePath("/portfolio/images/Micro-Adventure_ConceptGraphic_2.png")} 
              alt="Concept Graphic 2" 
              width={280} 
              height={560} 
              className="w-full h-auto block" 
              priority 
            />
          </div>
        </div>
        </motion.div>
      </motion.div>
    </div>
  </div>
</section>

          {/* Build & Iteration Section */}
          <section id="prototyping-ai" className="py-20 bg-black">
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
                    
                    
                    <div className="flex flex-col items-center justify-center gap-2 md:gap-6 max-md:max-h-[600px] md:max-h-none">
                      
                      {/* Top Row: AI Models */}
                      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full">
                        {/* ChatGPT Step */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-8 border border-white/20 shadow-xl hover:bg-white/15 hover:border-green-400/30 transition-all duration-300 group w-full max-w-[280px]">
                          <div className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-3 md:gap-4">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-lg md:text-xl font-bold text-white mb-0.5 md:mb-1 group-hover:text-green-300 transition-colors">ChatGPT</h3>
                              <p className="text-xs md:text-base text-gray-400">Writing Prompts</p>
                            </div>
                          </div>
                        </div>

                        {/* Google Gemini Step */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-8 border border-white/20 shadow-xl hover:bg-white/15 hover:border-indigo-400/30 transition-all duration-300 group w-full max-w-[280px]">
                          <div className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-3 md:gap-4">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-7 h-7 md:w-9 md:h-9 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 22C12 22 12 17 10 15C8 13 3 13 3 13C3 13 8 13 10 11C12 9 12 4 12 4C12 4 12 9 14 11C16 13 21 13 21 13C21 13 16 13 14 15C12 17 12 22 12 22Z" />
                                <path d="M19 9C19 9 19 7 18.2 6.2C17.4 5.4 15.4 5.4 15.4 5.4C15.4 5.4 17.4 5.4 18.2 4.6C19 3.8 19 1.8 19 1.8C19 1.8 19 3.8 19.8 4.6C20.6 5.4 22.6 5.4 22.6 5.4C22.6 5.4 20.6 5.4 19.8 6.2C19 7 19 9 19 9Z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-lg md:text-xl font-bold text-white mb-0.5 md:mb-1 group-hover:text-indigo-300 transition-colors">Gemini</h3>
                              <p className="text-xs md:text-base text-gray-400">Logic & Analysis</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Arrow 1 - Down */}
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>

                      {/* Cursor Step - Middle */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-8 border border-white/20 shadow-xl hover:bg-white/15 hover:border-blue-400/30 transition-all duration-300 group w-full max-w-[280px]">
                        <div className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-3 md:gap-4">
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-0.5 md:mb-1 group-hover:text-blue-300 transition-colors">Cursor</h3>
                            <p className="text-xs md:text-sm text-gray-400">AI-assisted Code</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Arrow 2 - Down */}
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>

                      {/* Bottom Row: iOS, API Plugin, Widget */}
                      <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 w-full">
                        {/* Xcode Step */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-8 border border-white/20 shadow-xl hover:bg-white/15 hover:border-purple-400/30 transition-all duration-300 group flex-1 max-w-[240px] w-full">
                          <div className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-3 md:gap-4">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v1h12v-1l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z"/>
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-lg md:text-xl font-bold text-white mb-0.5 md:mb-1 group-hover:text-purple-300 transition-colors">Xcode</h3>
                              <p className="text-xs md:text-base text-gray-400">Real iOS Build</p>
                            </div>
                          </div>
                        </div>

                        {/* API Plugin Step */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-8 border border-white/20 shadow-xl hover:bg-white/15 hover:border-amber-400/30 transition-all duration-300 group flex-1 max-w-[240px] w-full">
                          <div className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-3 md:gap-4">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-lg md:text-xl font-bold text-white mb-0.5 md:mb-1 group-hover:text-amber-300 transition-colors">API Plugin</h3>
                              <p className="text-xs md:text-base text-gray-400">Industry Integration</p>
                            </div>
                          </div>
                        </div>

                        {/* Widget Step */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-8 border border-white/20 shadow-xl hover:bg-white/15 hover:border-cyan-400/30 transition-all duration-300 group flex-1 max-w-[240px] w-full">
                          <div className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-3 md:gap-4">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-cyan-400 to-teal-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-lg md:text-xl font-bold text-white mb-0.5 md:mb-1 group-hover:text-cyan-300 transition-colors">Widget</h3>
                              <p className="text-xs md:text-base text-gray-400">Client-facing</p>
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
    
    {/* Column 1: System Architecture & Readiness */}
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
          System Architecture
        </h3>
        
        <div className="space-y-8 text-gray-300">
          <div className="group">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold block mb-2">
              Production Ready
            </span>
            <p className="text-sm leading-relaxed text-gray-200 [text-wrap:pretty]">
              <strong className="text-white">On-Device Processing:</strong> Native iOS/SwiftUI environment leveraging Realm for offline-first persistence. On-hardware logic ensures {"zero-latency\u00A0interaction."}
            </p>
          </div>

          <div className="group">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 font-bold block mb-2">
              Operational Beta
            </span>
            <p className="text-sm leading-relaxed text-gray-200 [text-wrap:pretty]">
              <strong className="text-white">Sync Gateway:</strong> Opportunistic background synchronization designed to preserve battery health while maintaining {"global\u00A0state\u00A0consistency."}
            </p>
          </div>

          <div className="group">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 font-bold block mb-2">
              Active Simulation
            </span>
            <p className="text-sm leading-relaxed text-gray-200 [text-wrap:pretty]">
              <strong className="text-white">Inference Engine:</strong> Utilizing lightweight on-device models; cloud nodes are currently stubbed to accelerate {"recommendation\u00A0threshold\u00A0testing."}
            </p>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Column 2: Core Integration Points */}
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
        
        <div className="space-y-8">
          <div>
            <h4 className="text-white font-semibold mb-2">Data & Persistence Architecture</h4>
            <p className="text-sm leading-relaxed text-gray-200 [text-wrap:pretty]">
              Orchestrating Firebase/Supabase with local conflict resolution to eliminate UI "jank" and ensure seamless performance during {"intermittent\u00A0connectivity."}
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-2">Intelligence Layer</h4>
            <p className="text-sm leading-relaxed text-gray-200 [text-wrap:pretty]">
              Owning the proprietary prompt engineering and contextual weighting. Leveraging OpenAI/LangChain for synthesis, filtered through strict {"contextual\u00A0protocols."}
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-2">Extensibility & Scale</h4>
            <p className="text-sm leading-relaxed text-gray-200 [text-wrap:pretty]">
              Decoupled, headless architecture designed for modular widget and API plugins. Future-proof extensibility without {"architectural\u00A0debt."}
            </p>
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
        className="flex gap-4 overflow-x-auto overflow-y-hidden pb-6 snap-x snap-mandatory no-scrollbar md:justify-center px-4 overscroll-x-contain"
        style={{ 
          WebkitOverflowScrolling: 'touch',
          touchAction: 'auto'
        }}
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
          <div key={idx} className="flex-shrink-0 w-64 md:w-48 snap-center select-none" style={{ touchAction: 'auto' }}>
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
      desc: "On-device ML models are still being tuned. The system currently uses a high-pass filter to prevent 'hallucinated' suggestions, which can sometimes result in conservative system responsiveness.",
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
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Launch & Testing
                  </h2>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                    <p className="text-gray-300 mb-4">
                      Initial testing will be conducted through a limited closed beta designed to observe system behavior across varied travel contexts and connectivity conditions.
                    </p>
                    <p className="text-gray-300">
                      The primary goal is to validate system reliability, context accuracy, and failure handling in live conditions.
                      <br></br><br></br>A comprehensive Behavioral Validation & Edge-Case Testing Framework is currently being codified to evaluate system heuristics against high-variance user environments.                    
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
            A "perfect" recommendation delivered at the wrong moment is a system failure. I prioritized <strong className="text-gray-900 font-semibold">temporal and physical proximity</strong> over absolute content quality to reduce the friction between "seeing" and "doing."
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
        <blockquote className="text-2xl font-semibold text-gray-900 italic">
        The goal isn’t to help travelers plan better. It is to build a system that 
        provides the confidence to embrace the {"joy\u00A0of\u00A0discovery."}
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
       <div className="mb-12 text-center max-w-4xl mx-auto">
      {/* Balanced headline for visual symmetry */}
      <h2 className="text-3xl font-bold mb-4 text-gray-900 [text-wrap:balance]">
        Future Extensions
      </h2>
      
      {/* mx-auto centers the paragraph box; gray-700 for ADA; glue for the final line */}
      <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto [text-wrap:pretty]">
        The engine is architected as a modular core, designed to ingest evolving 
        intelligence layers via a {"decoupled\u00A0API\u00A0strategy."}
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

  </>
)}

{isCulturalContextEngine && (
  <section 
    className="bg-white min-h-[80vh] flex items-center pt-24 pb-20" 
    aria-label="Cultural Context Project Hero"
  >
    <div className="container mx-auto px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-12 lg:items-center">
          
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
              Trust Framework
            </h1>
            
            <div className="mb-6">
              <span className="inline-block px-3 py-1.5 rounded-full text-sm font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                In Research & Development
              </span>
            </div>

            <p className="text-sm md:text-lg text-gray-500 mb-8 leading-relaxed">
            Designing the freedom to be spontaneous. I architect the trust systems and safety logic that allow travelers to explore the unknown without ever feeling lost or unsafe.
            </p>

            {/* EXECUTIVE SUMMARY / TL;DR */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16 border-t border-b border-gray-100 py-10 space-y-8"
            >
              {/* The Challenge */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8">
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700 pt-1">
                  The Challenge
                </span>
                <div className="md:col-span-3">
                  <p className="text-base md:text-lg text-gray-800 leading-relaxed max-w-2xl [text-wrap:pretty]">
                  Bridging the "Verification Gap" in real-time environments: the inability of current systems to distinguish between high-engagement marketing and high-integrity, authentic local experiences.                  </p>
                </div>
              </div>

              {/* The Solution */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 pt-8 border-t border-gray-50">
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700 pt-1">
                  The Solution
                </span>
                <div className="md:col-span-3">
                  <p className="text-base md:text-lg text-gray-800 leading-relaxed max-w-2xl [text-wrap:pretty]">
                  An "Authenticity-First" engine that prioritizes cultural resonance and local sentiment, bypassing the homogenized results of traditional search to surface high-integrity, under-represented experiences.                  </p>
                </div>
              </div>

             
            </motion.div>

            {/* CTAs */}
            
          </motion.div>

          {/* Right Visual Column (TrustFrameworkVisual) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 mt-0 lg:mt-0 w-full flex justify-center lg:justify-end"
          >
            <TrustFrameworkVisual />
          </motion.div>

        </div>
      </div>
    </div>
  </section>
)}


        {isTravelPlanningAssistant && (
         <section 
         className="bg-white min-h-auto lg:min-h-[calc(100vh-4rem)] flex lg:items-center pt-24 pb-20 lg:pt-24 lg:pb-20" 
         aria-label="CATDS Project Hero"
       >
         <div className="container mx-auto px-6 overflow-visible">
           <div className="max-w-7xl mx-auto overflow-visible">
             <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-12 lg:items-center overflow-visible">
               
               {/* Left Content Column */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8 }}
                 className="order-1 overflow-visible"
               >
                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                   Context-Aware Travel Decision System
                 </h1>
                 
                 <div className="flex flex-wrap gap-3 mb-6">
                   <span className="inline-block px-3 py-1.5 rounded-full text-sm font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                     In Research & Development
                   </span>
                   <span className="inline-block px-3 py-1.5 rounded-full text-sm font-semibold bg-slate-50 text-slate-600 border border-slate-200">
                     Prototype Phase
                   </span>
                 </div>
       
                 <p className="text-base md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
                 An environmental sensing middleware that converts real-time variables,such as weather, energy, and availability into adaptive travel logic.
                 </p>
       
                 {/* EXECUTIVE SUMMARY / TL;DR */}
                 <motion.div 
                   initial={{ opacity: 0, y: -10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5 }}
                   className="mb-12 border-t border-b border-gray-100 py-10 space-y-8"
                 >
                   {/* The Challenge */}
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8">
                     <span className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700 pt-1">
                       The Challenge
                     </span>
                     <div className="md:col-span-3">
                       <p className="text-base text-gray-800 leading-relaxed max-w-2xl [text-wrap:pretty]">
                         Traditional travel tools are <span className="font-semibold text-gray-900">static and siloed</span>. They fail to account for the "Living Context"—the delta between a cached API response and the actual state of a traveler facing delays, fatigue, or weather shifts.
                       </p>
                     </div>
                   </div>
       
                   {/* The Solution */}
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 pt-8 border-t border-gray-50">
                     <span className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700 pt-1">
                       The Solution
                     </span>
                     <div className="md:col-span-3">
                       <p className="text-base text-gray-800 leading-relaxed max-w-2xl [text-wrap:pretty]">
                         A middleware framework that generates <span className="font-semibold text-gray-900">Decision Vectors</span> by mapping sentiment against real-time logistics. This moves AI from providing generic lists to offering adaptive orchestration for high-stakes, on-the-fly decisions.
                       </p>
                     </div>
                   </div>
       
                   {/* Core Pillars (Micro-Copy Stack) */}
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 pt-8 border-t border-gray-50">
                     <span className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 pt-1">
                       Core Pillars
                     </span>
                     <div className="md:col-span-3">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-600">
                         <div className="flex flex-col gap-1">
                           <strong className="text-gray-900">Orchestration Middleware</strong>
                           <span>A logic layer between data and discovery, not a standalone app.</span>
                         </div>
                         <div className="flex flex-col gap-1">
                           <strong className="text-gray-900">Decision Vectors</strong>
                           <span>High-confidence re-routing based on live contextual decay.</span>
                         </div>
                         <div className="flex flex-col gap-1">
                           <strong className="text-gray-900">SDK-First Architecture</strong>
                           <span>Modular intelligence built for cross-platform deployment.</span>
                         </div>
                         <div className="flex flex-col gap-1">
                           <strong className="text-gray-900">Trust Layer Logic</strong>
                           <span>Explainable re-routing that prioritizes user agency.</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 </motion.div>
       
                 {/* Scenario Metadata */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-l-2 border-amber-100 pl-6">
                   <div>
                     <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Target Scenario</span>
                     <p className="text-sm text-gray-700 font-medium italic leading-snug">"90m free, unfamiliar city, low energy, high crowd density."</p>
                   </div>
                   <div>
                     <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Architectural Constraint</span>
                     <p className="text-sm text-gray-700 font-medium italic leading-snug">Surfacing low-friction, spontaneous interventions only.</p>
                   </div>
                 </div>
                 
               </motion.div>
       
               {/* Right Visual Column */}
               <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="order-2 mt-16 lg:mt-0 lg:pt-[73px] w-full flex justify-center lg:flex lg:items-center lg:justify-end overflow-visible"
               >
                 <div className="w-full overflow-visible">
                   <CATDSVisual />
                 </div>
               </motion.div>
       
             </div>
           </div>
         </div>
       </section>
        )}
        {isSocialOpportunityMatching && (
          <>
          <section 
          className="bg-white min-h-[80vh] flex items-center pt-24 pb-20" 
          aria-label="Social Opportunity Matching Hero"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-12 lg:items-center">
                
                {/* Left Content Column */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="order-1"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Relational Heuristics Engine (v1.0)
                  </h1>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="inline-block px-3 py-1.5 rounded-full text-sm font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                      In Research & Development
                    </span>
                    <span className="inline-block px-3 py-1.5 rounded-full text-sm font-semibold bg-slate-50 text-slate-600 border border-slate-200">
                      Prototype Phase
                    </span>
                  </div>
        
                  <p className="text-base md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
                    A modular logic engine that calculates "Social Friction" and "Knowledge Affinity" to determine if a nearby connection—whether a fellow traveler or a verified local expert—warrants a system-level intervention.
                  </p>
       
                  {/* EXECUTIVE SUMMARY / TL;DR */}
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 border-t border-b border-gray-100 py-10 space-y-8"
                  >
                    {/* The Challenge */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8">
                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700 pt-1">
                        The Challenge
                      </span>
                      <div className="md:col-span-3">
                        <p className="text-base text-gray-800 leading-relaxed max-w-2xl [text-wrap:pretty]">
                          Social interaction in travel is often <span className="font-semibold text-gray-900">high-friction or forced</span>. Existing platforms struggle to bridge the gap between "nearby" and "compatible," leading to missed connections or high social anxiety.
                        </p>
                      </div>
                    </div>
       
                    {/* The Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 pt-8 border-t border-gray-50">
                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700 pt-1">
                        The Solution
                      </span>
                      <div className="md:col-span-3">
                        <p className="text-base text-gray-800 leading-relaxed max-w-2xl [text-wrap:pretty]">
                          A lightweight intelligence module that surfaces spontaneous, low-friction social moments. By exposing <span className="font-semibold text-gray-900">relational heuristics</span> through core platform APIs, it enables existing apps to facilitate organic meetups without the overhead of a standalone social network.
                        </p>
                      </div>
                    </div>
       
                    {/* Core Pillars (Micro-Copy Stack) */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 pt-8 border-t border-gray-50">
                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 pt-1">
                        Core Pillars
                      </span>
                      <div className="md:col-span-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-600">
                          <div className="flex flex-col gap-1">
                            <strong className="text-gray-900">Expertise-Weighted Logic</strong>
                            <span>Prioritizes "Local Insights" during discovery phases.</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <strong className="text-gray-900">Headless Deployment</strong>
                            <span>SDK-ready for integration into existing platforms.</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <strong className="text-gray-900">Low-Friction Exchange</strong>
                            <span>15-minute "Coffee-Length" commitment window.</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <strong className="text-gray-900">Identity Verification</strong>
                            <span>Veracity Layer ensures verified local experts.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
       
                  {/* Scenario Metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-l-2 border-amber-100 pl-6">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Target Scenario</span>
                      <p className="text-sm text-gray-700 font-medium italic leading-snug">"A local photography expert in Istanbul, just 400 meters away during golden hour. 96% match probability."</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Architectural Constraint</span>
                      <p className="text-sm text-gray-700 font-medium italic leading-snug">Low-friction, spontaneous interventions only.</p>
                    </div>
                  </div>
                  
                </motion.div>
        
                {/* Right Visual Column */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="order-2 mt-16 lg:mt-0 w-full flex justify-center lg:justify-end"
                >
                  {/* Relational Heuristics vector visualization */}
                  <RelationalHeuristicsVectorVisualization />
                </motion.div>
        
              </div>
            </div>
          </div>
        </section>

        {/* The Architecture: Relational Middleware */}
        <section id="architecture" className="bg-white py-24 border-t border-gray-50" aria-label="System Architecture">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Section Header */}
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  The Architecture: Relational Middleware
                </h2>
                <p className="text-gray-500 max-w-2xl text-lg">
                  A modular intelligence architecture designed for cross-platform deployment. The system functions as a "Logic Pipeline" that transforms relational signals into verified social opportunities.
                </p>
              </div>

              {/* Key Signals Visualization */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                
                {/* Connecting Line (Desktop Only) */}
                <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gray-100 -translate-y-1/2 z-0" />

                {/* Signal 01: Proximity */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 border border-amber-100">
                    <MapPin className="text-amber-600 w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded">Signal 01</span>
                    <h3 className="font-bold text-gray-900 italic">Proximity</h3>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Geospatial Location</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Real-time geospatial data normalizes user locations into a unified <strong className="text-gray-900">relational graph</strong>, identifying co-location patterns between travelers and local experts.
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-50 flex flex-wrap gap-2">
                    <span className="text-[10px] font-mono bg-gray-50 text-gray-500 px-2 py-1 rounded">Geo_Hashing</span>
                    <span className="text-[10px] font-mono bg-gray-50 text-gray-500 px-2 py-1 rounded">Distance_Calc</span>
                    <span className="text-[10px] font-mono bg-gray-50 text-gray-500 px-2 py-1 rounded">Zone_Mapping</span>
                  </div>
                </motion.div>

                {/* Signal 02: Shared Interests */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-lg shadow-gray-100/50 hover:shadow-xl transition-shadow ring-1 ring-amber-500/10"
                >
                  <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mb-6">
                    <Brain className="text-amber-400 w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded">Signal 02</span>
                    <h3 className="font-bold text-gray-900 italic">Shared Interests</h3>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Interest Alignment</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Calculates <strong className="text-gray-900">affinity scores</strong> by matching traveler interest profiles (e.g., Photography) against local expert knowledge domains and neighborhood expertise.
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-50 flex flex-wrap gap-2">
                    <span className="text-[10px] font-mono bg-amber-50 text-amber-600 px-2 py-1 rounded">Affinity_Score</span>
                    <span className="text-[10px] font-mono bg-amber-50 text-amber-600 px-2 py-1 rounded">Interest_Matching</span>
                    <span className="text-[10px] font-mono bg-amber-50 text-amber-600 px-2 py-1 rounded">Expertise_Weight</span>
                  </div>
                </motion.div>

                {/* Signal 03: Schedule Gaps */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6 border border-cyan-100">
                    <Clock className="text-cyan-600 w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest bg-cyan-50 px-2 py-0.5 rounded">Signal 03</span>
                    <h3 className="font-bold text-gray-900 italic">Schedule Gaps</h3>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Temporal Availability</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Identifies overlapping <strong className="text-gray-900">availability windows</strong> (15-20 minute gaps) where both parties are free and co-located, enabling spontaneous connections.
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-50 flex flex-wrap gap-2">
                    <span className="text-[10px] font-mono bg-gray-50 text-gray-500 px-2 py-1 rounded">Schedule_Gap</span>
                    <span className="text-[10px] font-mono bg-gray-50 text-gray-500 px-2 py-1 rounded">Temporal_Overlap</span>
                    <span className="text-[10px] font-mono bg-gray-50 text-gray-500 px-2 py-1 rounded">Availability_Window</span>
                  </div>
                </motion.div>

              </div>

              <div className="mt-12 max-w-3xl">
                <p className="text-sm text-gray-500 leading-relaxed italic border-l-2 border-amber-200 pl-6">
                  <strong className="text-gray-900 font-bold not-italic">Design Intent:</strong> The relational middleware operates as a connective layer between travel platforms and local expertise. By converting proximity signals into <span className="text-gray-900 font-semibold">Exchange Value</span>, the system suggests spontaneous connections without overriding <span className="text-gray-900 font-semibold">User Agency</span>—ensuring the AI remains a co-pilot, not a replacement.
                </p>
                <div className="mt-6 pt-4 border-t border-amber-50">
                  <p className="text-[10px] font-mono text-gray-500 leading-relaxed">
                    <span className="font-semibold text-amber-700">Social Opportunity</span> = [(Affinity + Local Expertise) × Proximity] / [Planning Time + Social Anxiety]
                  </p>
                </div>
              </div>

              {/* Middleware Callout Card */}
              <div className="mt-16 bg-slate-50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center shrink-0 mt-1">
                    <Database className="text-slate-400 w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900 mb-1">Intelligence Delivery: SDK-Ready</h5>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                      The entire "Relational Middleware Stack" is deployable via modular SDKs, allowing platforms to transform static social data into reactive, context-aware connection opportunities without refactoring legacy architecture.
                    </p>
                  </div>
                </div>
                <button className="whitespace-nowrap bg-white border border-slate-200 text-slate-900 text-xs font-bold py-3 px-6 rounded-xl hover:bg-slate-100 transition-colors shadow-sm">
                  Examine API Documentation
                </button>
              </div>

            </div>
          </div>
        </section>
        
        {/* Detailed System Logic Section */}
        <section id="wireframes-ui" className="bg-white py-24 border-t border-gray-50 overflow-x-hidden" aria-label="Detailed System Logic">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Section Header */}
              <div className="mb-20 text-center lg:text-left">
                <h4 className="text-amber-600 font-mono text-[10px] uppercase tracking-[0.3em] mb-4 font-bold">
                  Technical Deep Dive
                </h4>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  Relational Logic & Matching Signals
                </h2>
              </div>

              {/* 3-Stage Visual Pipeline */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
                
                {/* Stage 1: Matching Signals (Input) */}
                <div className="space-y-6 order-2 lg:order-1">
                  <h3 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">
                    01. Matching Signals
                  </h3>
                  {[
                    { label: 'Proximity Sensing', desc: 'Real-time monitoring within a 500m threshold using encrypted hashing' },
                    { label: 'Affinity Weighting', desc: 'Lightweight similarity scoring to maintain low computational overhead and <140ms response times' },
                    { label: 'Temporal Solver', desc: 'Analyzes movement patterns to isolate 15-minute schedule gaps' },
                  ].map((signal, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 10 }}
                      className="bg-slate-50 border border-slate-100 rounded-2xl p-6 transition-all"
                    >
                      <h4 className="text-gray-900 font-bold text-sm mb-1">{signal.label}</h4>
                      <p className="text-gray-500 text-xs">{signal.desc}</p>
                    </motion.div>
                  ))}
                </div>
                
                {/* Stage 2: The Core Processor (SVG Animation) */}
                <div className="flex justify-center order-1 lg:order-2">
                  <div className="relative w-64 h-64 md:w-80 md:h-80">
                    <svg className="w-full h-full" viewBox="0 0 320 320">
                      <motion.circle
                        cx="160" cy="160" r="140" fill="none"
                        stroke="#f59e0b" strokeWidth="1" strokeDasharray="8 4" opacity="0.2"
                        animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.circle
                        cx="160" cy="160" r="110" fill="none"
                        stroke="#cbd5e1" strokeWidth="2"
                        animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }}
                      />
                      <circle cx="160" cy="160" r="80" fill="#0f172a" />
                      <defs>
                        <radialGradient id="relationalLogicGradient">
                          <stop offset="0%" stopColor="#1e293b" />
                          <stop offset="100%" stopColor="#0f172a" />
                        </radialGradient>
                      </defs>
                    </svg>
                    
                    <div className="absolute inset-0 flex items-center justify-center text-center px-12">
                      <div>
                        <div className="text-[9px] font-bold text-amber-500 uppercase tracking-[0.3em] mb-2">
                          Relational Engine
                        </div>
                        <div className="text-xl font-bold text-white tracking-tight leading-none">RHE</div>
                        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-2">
                          V1.0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stage 3: The Output Signal */}
                <div className="space-y-6 order-3">
                  <h3 className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-[0.2em] mb-8">
                    02. Opportunity Signal
                  </h3>
                  <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 shadow-xl shadow-slate-100/50">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status: Active</span>
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-amber-500" 
                          animate={{ width: ['20%', '96%', '96%'] }} 
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400">
                        <span>Match Probability</span>
                        <span className="text-gray-900">96%</span>
                      </div>
                    </div>

                    <p className="text-gray-900 text-sm font-bold italic mb-2">"Local Photography Expert (Istanbul)"</p>
                    <p className="text-gray-500 text-[11px] leading-relaxed">
                      Signal detected: Proximity 400m / Context: Golden Hour / Exchange Value calculated via relational heuristics.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Mathematical Formula Footnote */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-20 pt-10 border-t border-slate-100 text-center"
              >
                <div className="inline-block px-8 py-4 rounded-full bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 font-mono text-xs uppercase tracking-widest">
                    The Logic: <span className="text-gray-900 font-bold">Social Opportunity</span> = [(<span className="text-amber-600 font-bold italic">Affinity + Local Expertise</span>) × <span className="text-amber-600 font-bold italic">Proximity</span>] / [<span className="text-gray-900">Planning Time + Social Anxiety</span>]
                  </span>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
        
        {/* System Principles */}
        <section id="system-principles" className="bg-slate-900 py-20" aria-label="System Principles">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                
                {/* Principle 01: Headless API Logic */}
                <div className="space-y-4">
                  <div className="text-amber-500 font-mono text-xs uppercase tracking-[0.3em]">01. Architecture</div>
                  <h4 className="text-white font-bold text-xl italic">Headless API Logic</h4>
                  <p className="text-slate-400 text-base leading-relaxed">
                    Designed as a modular middleware that exposes REST APIs/webhooks for integration into legacy travel apps. The system functions as a headless intelligence layer, enabling platforms to add relational matching capabilities without building custom infrastructure.
                  </p>
                </div>

                {/* Principle 02: Passive Orchestration */}
                <div className="space-y-4">
                  <div className="text-amber-500 font-mono text-xs uppercase tracking-[0.3em]">02. Processing</div>
                  <h4 className="text-white font-bold text-xl italic">Passive Orchestration</h4>
                  <p className="text-slate-400 text-base leading-relaxed">
                    Background monitoring of ambient data (location/calendar) to trigger matches without manual user input. The system operates silently, analyzing proximity, interests, and availability patterns to surface opportunities only when all conditions align.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-24 border-t border-gray-50 flex-shrink-0" id="design-evolution-logic">
          <div className="container mx-auto px-6 flex-shrink-0">
            <div className="max-w-7xl mx-auto flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16 text-center"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  Design Evolution: Logic in Action
                </h2>
                <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
                  Three pivot cases demonstrating how the relational middleware surfaces spontaneous, high-value connections
                </p>
              </motion.div>

              <div className="space-y-16 md:space-y-24">
                {/* Case A: The Local Knowledge Pivot */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
                >
                  {/* Image on Left */}
                  <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="w-full max-w-md bg-gradient-to-br from-amber-50 to-slate-50 rounded-2xl p-8 border border-amber-100 shadow-lg">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">A</div>
                          <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Istanbul Photography</h3>
                            <p className="text-xs text-gray-500">Golden Hour Signal</p>
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                            <span className="text-xs font-semibold text-gray-700">Galata Bridge</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                            <span className="text-xs text-gray-600">5 mins away</span>
                          </div>
                          <div className="mt-3 pt-3 border-t border-slate-100">
                            <p className="text-xs text-gray-500 italic">"Local photographer 'Emre' detected"</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text on Right */}
                  <div className="w-full lg:w-1/2">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 uppercase tracking-wider mb-3">
                        Case A
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">The Local Knowledge Pivot</h3>
                    </div>
                    <div className="space-y-4 text-gray-700">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Input:</p>
                        <p className="text-sm leading-relaxed">Traveler (Photography) + Local (Expert) + Golden Hour</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Action:</p>
                        <p className="text-sm leading-relaxed">Middleware triggers a "Spontaneous Knowledge Exchange" vector.</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Output:</p>
                        <p className="text-sm leading-relaxed italic">"Local photographer 'Emre' is 5 mins away at Galata Bridge. Connect for a quick shot?"</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Case B: The Spontaneity Gap */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12"
                >
                  {/* Image on Right (reversed) */}
                  <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="w-full max-w-md bg-gradient-to-br from-slate-50 to-amber-50 rounded-2xl p-8 border border-slate-200 shadow-lg">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm">B</div>
                          <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Schedule Gap</h3>
                            <p className="text-xs text-gray-500">15-Minute Window</p>
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">Time Available</span>
                            <span className="text-sm font-bold text-slate-900">15 min</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 w-full"></div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-slate-100">
                            <p className="text-xs text-gray-500 italic">Mutual contacts detected</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text on Left (reversed) */}
                  <div className="w-full lg:w-1/2">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 uppercase tracking-wider mb-3">
                        Case B
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">The Spontaneity Gap</h3>
                    </div>
                    <div className="space-y-4 text-gray-700">
                      <p className="text-sm leading-relaxed">
                        Logic surfaces a low-friction social moment based on a 15-minute schedule gap between mutual contacts.
                      </p>
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <p className="text-xs text-gray-600 leading-relaxed">
                          The temporal solver identifies overlapping availability windows, matching users with shared interests and verified connections within the same geographic zone.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Case C: The Safety-First Signal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
                >
                  {/* Image on Left */}
                  <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="w-full max-w-md bg-gradient-to-br from-emerald-50 to-slate-50 rounded-2xl p-8 border border-emerald-100 shadow-lg">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">C</div>
                          <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Safety Signal</h3>
                            <p className="text-xs text-gray-500">1st-Degree Priority</p>
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-emerald-200 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                            <span className="text-xs font-semibold text-gray-700">High-Density Area</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                            <span className="text-xs text-gray-600">Verified Connection</span>
                          </div>
                          <div className="mt-3 pt-3 border-t border-emerald-100">
                            <p className="text-xs text-emerald-700 font-semibold">Solo Traveler Alert</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text on Right */}
                  <div className="w-full lg:w-1/2">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider mb-3">
                        Case C
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">The Safety-First Signal</h3>
                    </div>
                    <div className="space-y-4 text-gray-700">
                      <p className="text-sm leading-relaxed">
                        Prioritizes 1st-degree connection alerts in high-density areas to increase perceived safety for solo travelers.
                      </p>
                      <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                        <p className="text-xs text-gray-600 leading-relaxed">
                          The veracity layer escalates trusted connections when users are in unfamiliar, high-traffic zones, providing an additional safety net through verified social graph connections.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Research & Market Fit */}
        <section id="research-market-fit" className="bg-white py-24 border-t border-gray-50" aria-label="Research & Market Fit">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Section Header */}
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  Research & Market Fit
                </h2>
                <p className="text-gray-500 max-w-2xl text-lg">
                  Bridging the "Friction Gap" between user needs and system capabilities through relational logic.
                </p>
              </div>

              {/* Friction vs. Solution Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Card 01: Planning Overhead */}
                <div className="group bg-slate-50 rounded-3xl p-8 border border-transparent hover:border-amber-200 transition-all">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-100/50 px-2 py-1 rounded uppercase tracking-widest">Friction</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Planning Overhead</span>
                  </div>
                  
                  <blockquote className="text-gray-700 italic text-sm leading-relaxed mb-8 border-l-2 border-slate-200 pl-4">
                    "Setting it up takes too much back-and-forth messaging."
                  </blockquote>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Solution</h4>
                    <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                      <p className="text-xs font-bold text-gray-900 mb-1">Headless Middleware</p>
                      <p className="text-[11px] text-gray-500 leading-normal">
                        Zero-Chat Logic eliminates messaging overhead by automatically identifying matches without requiring user-initiated coordination.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 02: Formal Commitment */}
                <div className="group bg-slate-50 rounded-3xl p-8 border border-transparent hover:border-cyan-200 transition-all">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-[10px] font-bold text-cyan-600 bg-cyan-100/50 px-2 py-1 rounded uppercase tracking-widest">Friction</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Formal Commitment</span>
                  </div>
                  
                  <blockquote className="text-gray-700 italic text-sm leading-relaxed mb-8 border-l-2 border-slate-200 pl-4">
                    "I don't want to commit to a 2-hour event—just a quick chat."
                  </blockquote>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Solution</h4>
                    <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                      <p className="text-xs font-bold text-gray-900 mb-1">Temporal Gap Solver</p>
                      <p className="text-[11px] text-gray-500 leading-normal">
                        15m Hard-Cap ensures all surfaced opportunities fit within a brief window, eliminating commitment anxiety.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 03: Missing Context */}
                <div className="group bg-slate-50 rounded-3xl p-8 border border-transparent hover:border-emerald-200 transition-all">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100/50 px-2 py-1 rounded uppercase tracking-widest">Friction</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Missing Context</span>
                  </div>
                  
                  <blockquote className="text-gray-700 italic text-sm leading-relaxed mb-8 border-l-2 border-slate-200 pl-4">
                    "I wish I could just know if someone nearby wants coffee right now."
                  </blockquote>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Solution</h4>
                    <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                      <p className="text-xs font-bold text-gray-900 mb-1">Live Heuristic Ingest</p>
                      <p className="text-[11px] text-gray-500 leading-normal">
                        Real-Time Availability surfaces spontaneous opportunities by processing proximity, intent, and temporal signals in the background.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Strategic Learnings & Matrix */}
        <section id="strategic-learnings" className="bg-white py-24 border-t border-gray-50" aria-label="Strategic Learnings and Matrix">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Section Header */}
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  Strategic Learnings & Matrix
                </h2>
                <p className="text-gray-500 max-w-2xl text-lg">
                  The development of the Relational Heuristics Engine revealed critical insights into spontaneous connection architecture. These findings shaped the final middleware design.
                </p>
              </div>

              {/* 4-Learning Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
                
                {/* Learning 01: Architecture over UI */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 border border-amber-100">
                    <Cpu className="text-amber-600 w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded">Learning 01</span>
                    <h3 className="font-bold text-gray-900 italic">Architecture over UI</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Spontaneous connection requires system-level decisions that minimize cognitive load before the user even sees a notification.
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-50">
                    <p className="text-[11px] font-bold text-amber-700 uppercase tracking-widest mb-1">Implementation</p>
                    <p className="text-xs text-gray-600 leading-relaxed italic">Background middleware processes proximity, affinity, and temporal signals to surface opportunities only when all conditions align—eliminating notification noise.</p>
                  </div>
                </motion.div>

                {/* Learning 02: Connective Tissue */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6 border border-cyan-100">
                    <Link2 className="text-cyan-600 w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest bg-cyan-50 px-2 py-0.5 rounded">Learning 02</span>
                    <h3 className="font-bold text-gray-900 italic">Connective Tissue</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    The engine's value is in its headless integration into existing tools, not as a standalone destination.
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-50">
                    <p className="text-[11px] font-bold text-cyan-700 uppercase tracking-widest mb-1">Implementation</p>
                    <p className="text-xs text-gray-600 leading-relaxed italic">REST APIs and webhooks enable travel platforms to embed relational matching capabilities without building custom infrastructure from scratch.</p>
                  </div>
                </motion.div>

                {/* Learning 03: The 15-Minute Threshold */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 border border-emerald-100">
                    <Clock className="text-emerald-600 w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">Learning 03</span>
                    <h3 className="font-bold text-gray-900 italic">The 15-Minute Threshold</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    15 minutes is identified as the optimal commitment window to bypass planning friction.
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-50">
                    <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest mb-1">Implementation</p>
                    <p className="text-xs text-gray-600 leading-relaxed italic">Temporal Solver analyzes movement patterns and calendar gaps to identify overlapping 15-minute windows where spontaneous connections are genuinely feasible.</p>
                  </div>
                </motion.div>

                {/* Learning 04: Privacy Sovereignty */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 border border-purple-100">
                    <Shield className="text-purple-600 w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2 py-0.5 rounded">Learning 04</span>
                    <h3 className="font-bold text-gray-900 italic">Privacy Sovereignty</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Balancing discovery with encrypted location hashing to ensure trust is a system default.
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-50">
                    <p className="text-[11px] font-bold text-purple-700 uppercase tracking-widest mb-1">Implementation</p>
                    <p className="text-xs text-gray-600 leading-relaxed italic">Real-time monitoring within a 500m threshold using encrypted hashing, with opt-in matching and granular user controls over discovery preferences.</p>
                  </div>
                </motion.div>

              </div>

              {/* Core Conclusion Card */}
              <div className="mt-16 bg-slate-900 rounded-[2.5rem] p-10 md:p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full -mr-20 -mt-20" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                  <div className="shrink-0">
                     <div className="text-5xl font-bold text-amber-400 leading-none">01</div>
                     <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500/60 mt-2">Core Conclusion</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      Social logic is a function of friction reduction, not feature density.
                    </h4>
                    <p className="text-slate-400 leading-relaxed max-w-2xl">
                      By building relational middleware that handles proximity, affinity, and temporal calculations at the system level, the architecture eliminates the cognitive overhead that prevents spontaneous connection. The engine's value lies in reducing friction—not adding features.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 max-w-3xl">
                <p className="text-sm text-gray-500 leading-relaxed italic border-l-2 border-sky-200 pl-6">
                  <strong className="text-gray-900 font-bold not-italic">Design Intent:</strong> These strategic learnings reveal that spontaneous connection requires architectural decisions at the system level, headless integration for existing platforms, temporal constraints that bypass planning friction, and privacy sovereignty through cryptographic validation—demonstrating that <span className="text-gray-900 font-semibold">friction reduction, not feature density</span>, enables authentic social connection.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* The Horizon Section */}
        <section id="the-horizon" className="py-24 bg-slate-900">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Section Header */}
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  The Horizon
                </h2>
                <p className="text-slate-400 max-w-2xl text-lg">
                  Roadmap for scaling relational logic across travel platforms
                </p>
              </div>

              <div className="space-y-8 mb-12">
                {/* Phase 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/30">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">Phase 1: B2B SDK for Tourism Boards</h3>
                      <p className="text-gray-300 leading-relaxed mb-3">
                        Facilitate niche traveler/local connections through embedded middleware. Tourism boards can deploy the relational logic engine to surface authentic local experiences without building custom infrastructure.
                      </p>
                      <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                        <li>Enables legacy platforms to unlock social engagement without building social infrastructure from scratch.</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Phase 2 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/30">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">Phase 2: Predictive Social Discovery</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Anticipating overlaps through temporal pattern recognition. The system learns from user behavior to predict optimal connection windows before they occur, reducing latency from signal to action.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Phase 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/30">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">Phase 3: Identity Sovereignty</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Zero-knowledge social proofing enables trust verification without exposing personal data. Users maintain full control over their identity while enabling secure, verified connections through cryptographic proofs.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 border-t border-white/10"
              >
                <a
                  href="mailto:hello@example.com"
                  className="px-8 py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors duration-300 text-center min-w-[200px]"
                >
                  Contact Designer
                </a>
                <a
                  href="#design-evolution-logic"
                  className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-colors duration-300 text-center min-w-[200px]"
                >
                  View System Demo
                </a>
              </motion.div>

            </div>
          </div>
        </section>
          </>
        )}
        {isLocalExperienceFinder && (
          <>
          <section 
          className="bg-white min-h-[80vh] flex items-center pt-24 pb-20 w-full overflow-x-hidden" 
          aria-label="Social Capital Orchestrator Hero"
        >
          <div className="container mx-auto px-4 md:px-6 w-full">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-12 lg:items-center">
                
                {/* Left Content Column */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="order-1"
                >
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight break-words" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Social Capital Orchestrator: The Mentorship Logic
                  </h1>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="inline-block px-3 py-1.5 rounded-full text-sm font-semibold bg-sky-100 text-sky-800 border border-sky-200">
                      In Research & Development
                    </span>
                    <span className="inline-block px-3 py-1.5 rounded-full text-sm font-semibold bg-slate-50 text-slate-600 border border-slate-200">
                      Prototype Phase
                    </span>
                  </div>
        
                  <p className="text-base md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
                    A high-trust middleware that converts your travel history into social capital, connecting travelers with verified experts in their extended network for spontaneous knowledge sharing.
                  </p>
       
                  {/* EXECUTIVE SUMMARY / TL;DR */}
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 border-t border-b border-gray-100 py-10 space-y-8"
                  >
                    {/* The Challenge */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8">
                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-sky-700 pt-1">
                        The Challenge
                      </span>
                      <div className="md:col-span-3">
                        <p className="text-base text-gray-800 leading-relaxed max-w-2xl [text-wrap:pretty]">
                          Users want social travel benefits but refuse to sacrifice persistent location data to central servers. Current systems force a binary choice: <span className="font-semibold text-gray-900">full visibility for discovery or complete privacy with isolation</span>.
                        </p>
                      </div>
                    </div>
       
                    {/* The Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 pt-8 border-t border-gray-50">
                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-sky-700 pt-1">
                        The Solution
                      </span>
                      <div className="md:col-span-3">
                        <p className="text-base text-gray-800 leading-relaxed max-w-2xl [text-wrap:pretty]">
                          A ZK-proof enabled system that autonomously surfaces high-trust social opportunities through multi-degree graph analysis. The engine operates as a <span className="font-semibold text-gray-900">headless intelligence layer</span>, enabling discovery without compromising user sovereignty or requiring manual search.
                        </p>
                      </div>
                    </div>
       
                    {/* Core Pillars (Micro-Copy Stack) */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 pt-8 border-t border-gray-50">
                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 pt-1">
                        Core Pillars
                      </span>
                      <div className="md:col-span-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-600">
                          <div className="flex flex-col gap-1">
                            <strong className="text-gray-900">Multi-Degree Graph Theory</strong>
                            <span>Maps 2nd and 3rd-degree trust nodes for autonomous discovery.</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <strong className="text-gray-900">Zero-Knowledge Privacy</strong>
                            <span>ZK-proofs verify connections without exposing PII.</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <strong className="text-gray-900">Autonomous Discovery</strong>
                            <span>Surfaces opportunities without requiring search or manual filtering.</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <strong className="text-gray-900">Headless Intelligence</strong>
                            <span>Modular middleware for integration into existing platforms.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Scenario Metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-l-2 border-sky-100 pl-6 mb-8">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Target Scenario</span>
                      <p className="text-sm text-gray-700 font-medium italic leading-snug">"You're connected through a mutual friend nearby—verified privately, with your personal information kept safe. Trust: 92%"</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Architectural Constraint</span>
                      <p className="text-sm text-gray-700 font-medium italic leading-snug">Privacy-first data ingestion (zero-knowledge proof).</p>
                    </div>
                  </div>
                </motion.div>
        
                {/* Right Visual Column */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="order-2 lg:order-2 mt-12 md:mt-16 lg:mt-0 w-full flex justify-center lg:flex lg:items-center lg:justify-end"
                >
                  <div className="w-full max-w-full">
                    <ConnectionPathVisualization />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* The Architecture: Knowledge-Trust Flow */}
        <section id="architecture" className="bg-white py-24 border-t border-gray-50" aria-label="System Architecture">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Section Header */}
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  The Architecture: Knowledge-Trust Flow
                </h2>
                <p className="text-gray-500 max-w-2xl text-lg">
                  A high-trust middleware that converts travel history into social capital through a three-stage knowledge validation pipeline.
                </p>
              </div>

              {/* 3-Stage Architecture Visualization */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                
                {/* Connecting Line (Desktop Only) */}
                <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gray-100 -translate-y-1/2 z-0" />

                {/* Stage 01: Presence Intelligence */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 border border-sky-100">
                    <Activity className="text-sky-600 w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-2 py-0.5 rounded">Stage 01</span>
                    <h3 className="font-bold text-gray-900 italic">Presence Intelligence</h3>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Ingest</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Monitoring <strong className="text-gray-900">location</strong> and <strong className="text-gray-900">"Future Intent" signals</strong> to find overlaps between expertise and demand within the social graph.
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-50 flex flex-wrap gap-2">
                    <span className="text-[10px] font-mono bg-gray-50 text-gray-500 px-2 py-1 rounded">Location_Monitor</span>
                    <span className="text-[10px] font-mono bg-sky-50 text-sky-600 px-2 py-1 rounded">Intent_Signals</span>
                    <span className="text-[10px] font-mono bg-sky-50 text-sky-600 px-2 py-1 rounded">Overlap_Detect</span>
                  </div>
                </motion.div>

                {/* Stage 02: Provenance Gate */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-lg shadow-gray-100/50 hover:shadow-xl transition-shadow ring-1 ring-sky-500/10"
                >
                  <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mb-6">
                    <ShieldCheck className="text-sky-400 w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded">Stage 02</span>
                    <h3 className="font-bold text-gray-900 italic">Provenance Gate</h3>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Cryptographic Verification</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Cryptographically verifying that the "Expert" traveler was <strong className="text-gray-900">actually on the ground</strong>, ensuring all advice is based on verified presence rather than speculation.
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-50 flex flex-wrap gap-2">
                    <span className="text-[10px] font-mono bg-sky-50 text-sky-600 px-2 py-1 rounded">ZK_Proof</span>
                    <span className="text-[10px] font-mono bg-sky-50 text-sky-600 px-2 py-1 rounded">Presence_Verify</span>
                    <span className="text-[10px] font-mono bg-sky-50 text-sky-600 px-2 py-1 rounded">Trust_Weight</span>
                  </div>
                </motion.div>

                {/* Stage 03: Identity Filter */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6 border border-cyan-100">
                    <Zap className="text-cyan-600 w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest bg-cyan-50 px-2 py-0.5 rounded">Stage 03</span>
                    <h3 className="font-bold text-gray-900 italic">Identity Filter</h3>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Scorer</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Using <strong className="text-gray-900">Travel DNA vectors</strong> (behavioral history) to match expertise rather than simple proximity, ensuring connections are based on verified knowledge overlap.
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-50 flex flex-wrap gap-2">
                    <span className="text-[10px] font-mono bg-cyan-50 text-cyan-600 px-2 py-1 rounded">Travel_DNA</span>
                    <span className="text-[10px] font-mono bg-cyan-50 text-cyan-600 px-2 py-1 rounded">Expertise_Match</span>
                    <span className="text-[10px] font-mono bg-gray-50 text-gray-500 px-2 py-1 rounded">Behavioral_History</span>
                  </div>
                </motion.div>

              </div>

              <div className="mt-12 max-w-3xl">
                <p className="text-sm text-gray-500 leading-relaxed italic border-l-2 border-sky-200 pl-6">
                  <strong className="text-gray-900 font-bold not-italic">Design Intent:</strong> The Knowledge-Trust flow transforms passive travel history into active social capital. By validating expertise through cryptographic proofs and triggering connections only when high-value overlaps are detected, the system ensures <span className="text-gray-900 font-semibold">quality over quantity</span> in mentorship opportunities.
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* Logic in Action: Mentorship Use Cases */}
        <section className="py-24 bg-white border-t border-gray-50" id="logic-in-action">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Section Header */}
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  Logic in Action: Mentorship Use Cases
                </h2>
                <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
                  Three cases demonstrating how the Knowledge-Trust flow surfaces high-value mentorship opportunities
                </p>
              </div>

              {/* 3-Case Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                
                {/* Case A: The Reciprocal Match */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 border border-sky-100">
                    <span className="text-sky-600 text-lg font-bold">A</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-2 py-0.5 rounded">Case A</span>
                    <h3 className="font-bold text-gray-900 italic">Reciprocal Match</h3>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Kyoto Expertise</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    <strong className="text-gray-900">Scenario:</strong> You've lived in Kyoto. A 2nd-degree connection is currently "Planning" Kyoto.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    <strong className="text-gray-900">Logic:</strong> System triggers a notification to both: "Willing to share 15 mins of Kyoto insight?"
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-50 bg-gradient-to-br from-sky-50 to-slate-50 rounded-xl p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-sky-400"></div>
                        <span className="text-xs font-semibold text-gray-700">You: Lived in Kyoto</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                        <span className="text-xs text-gray-600">2nd-degree: Planning Kyoto</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-sky-100">
                        <p className="text-xs text-sky-700 font-semibold italic">"Willing to share 15 mins of Kyoto insight?"</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Case B: The Active Network Pulse */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100">
                    <span className="text-slate-600 text-lg font-bold">B</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded">Case B</span>
                    <h3 className="font-bold text-gray-900 italic">Network Pulse</h3>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Active Travelers</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    <strong className="text-gray-900">Scenario:</strong> You open the map to see who is currently roaming.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    <strong className="text-gray-900">Logic:</strong> System filters for connections currently "on-trip" or planning trips to places you have expertise in.
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-50 bg-gradient-to-br from-slate-50 to-sky-50 rounded-xl p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Currently Roaming</span>
                        <span className="text-sm font-bold text-slate-900">12 connections</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full">
                        <div className="h-full bg-sky-400 w-3/4"></div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-100">
                        <p className="text-xs text-gray-500 italic">Filtered by your expertise regions</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Case C: Trust-Layer Validation */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6 border border-cyan-100">
                    <span className="text-cyan-600 text-lg font-bold">C</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest bg-cyan-50 px-2 py-0.5 rounded">Case C</span>
                    <h3 className="font-bold text-gray-900 italic">Trust Path</h3>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Validation Display</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    <strong className="text-gray-900">Scenario:</strong> A traveler reaches out.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    <strong className="text-gray-900">Logic:</strong> The UI shows the "Trust Path" (e.g., "Vouched by 3 mutual friends") to eliminate social anxiety.
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-50 bg-gradient-to-br from-cyan-50 to-slate-50 rounded-xl p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <span className="text-xs font-semibold text-gray-700">Trust Path Visible</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <span className="text-xs text-gray-600">3 mutual friends</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-cyan-100">
                        <p className="text-xs text-cyan-700 font-semibold">"Vouched by 3 mutual friends"</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>

              <div className="mt-12 max-w-3xl">
                <p className="text-sm text-gray-500 leading-relaxed italic border-l-2 border-sky-200 pl-6">
                  <strong className="text-gray-900 font-bold not-italic">Design Intent:</strong> These three cases demonstrate how the Knowledge-Trust flow surfaces high-value mentorship opportunities through verified expertise matching, active network filtering, and trust path visualization—ensuring <span className="text-gray-900 font-semibold">quality connections over quantity</span> in spontaneous knowledge sharing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed System Logic: Trust & Expertise Score */}
        <section id="wireframes-ui" className="bg-white py-24 border-t border-gray-50 overflow-x-hidden" aria-label="Detailed System Logic">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Section Header */}
              <div className="mb-20 text-center lg:text-left">
                <h4 className="text-sky-600 font-mono text-[10px] uppercase tracking-[0.3em] mb-4 font-bold">
                  Technical Deep Dive
                </h4>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  Trust & Expertise Score
                </h2>
              </div>

              {/* 3-Stage Visual Pipeline */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
                
                {/* Stage 1: Input Variables */}
                <div className="space-y-6 order-2 lg:order-1">
                  <h3 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">
                    01. Input Variables
                  </h3>
                  {[
                    { label: 'Expertise Weight', desc: 'Based on countries visited (e.g., 40 countries = high expertise weight)' },
                    { label: 'Connection Strength', desc: 'Degrees of separation (1st or 2nd-degree connection validation)' },
                    { label: 'Trust Coefficient', desc: 'Cryptographic verification of social graph path' },
                  ].map((variable, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 10 }}
                      className="bg-slate-50 border border-slate-100 rounded-2xl p-6 transition-all"
                    >
                      <h4 className="text-gray-900 font-bold text-sm mb-1">{variable.label}</h4>
                      <p className="text-gray-500 text-xs">{variable.desc}</p>
                    </motion.div>
                  ))}
                </div>
                
                {/* Stage 2: The Core Processor (SVG Animation) */}
                <div className="flex justify-center order-1 lg:order-2">
                  <div className="relative w-64 h-64 md:w-80 md:h-80">
                    <svg className="w-full h-full" viewBox="0 0 320 320">
                      {/* Outer rotating ring */}
                      <motion.circle
                        cx="160" cy="160" r="140" fill="none"
                        stroke="#0EA5E9" strokeWidth="1" strokeDasharray="8 4" opacity="0.2"
                        animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                      />
                      
                      {/* Logic Gate Ring (middle) - represents 1st/2nd degree validation */}
                      <motion.circle
                        cx="160" cy="160" r="110" fill="none"
                        stroke="#06B6D4" strokeWidth="2"
                        animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }}
                      />
                      
                      {/* Logic Gate Indicators - Small gates on the ring */}
                      <g>
                        {/* Gate 1 */}
                        <rect x="155" y="50" width="10" height="8" rx="2" fill="#06B6D4" opacity="0.8">
                          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                        </rect>
                        {/* Gate 2 */}
                        <rect x="265" y="155" width="10" height="8" rx="2" fill="#06B6D4" opacity="0.8">
                          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" begin="0.5s" />
                        </rect>
                        {/* Gate 3 */}
                        <rect x="155" y="262" width="10" height="8" rx="2" fill="#06B6D4" opacity="0.8">
                          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" begin="1s" />
                        </rect>
                        {/* Gate 4 */}
                        <rect x="45" y="155" width="10" height="8" rx="2" fill="#06B6D4" opacity="0.8">
                          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" begin="1.5s" />
                        </rect>
                      </g>
                      
                      {/* Inner core circle */}
                      <circle cx="160" cy="160" r="80" fill="#0f172a" />
                      <defs>
                        <radialGradient id="mentorshipGradient">
                          <stop offset="0%" stopColor="#1e293b" />
                          <stop offset="100%" stopColor="#0f172a" />
                        </radialGradient>
                      </defs>
                    </svg>
                    
                    <div className="absolute inset-0 flex items-center justify-center text-center px-12">
                      <div>
                        <div className="text-[9px] font-bold text-sky-500 uppercase tracking-[0.3em] mb-2">
                          Mentorship Match Engine
                        </div>
                        <div className="text-xl font-bold text-white tracking-tight leading-none">MME</div>
                        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-2">
                          V1.0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stage 3: The Output Signal */}
                <div className="space-y-6 order-3">
                  <h3 className="text-[10px] font-mono font-bold text-sky-600 uppercase tracking-[0.2em] mb-8">
                    02. Mentorship Signal
                  </h3>
                  <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 shadow-xl shadow-slate-100/50">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status: Validated</span>
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-sky-500" 
                          animate={{ width: ['30%', '92%', '92%'] }} 
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400">
                        <span>Signal Strength</span>
                        <span className="text-gray-900">92%</span>
                      </div>
                    </div>

                    <p className="text-gray-900 text-sm font-bold italic mb-2">"Kyoto Expertise Match"</p>
                    <p className="text-gray-500 text-[11px] leading-relaxed">
                      2nd-degree connection validated. Expertise Weight: 40 countries. Trust Coefficient: 0.92
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Mathematical Formula Footnote */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-20 pt-10 border-t border-slate-100 text-center"
              >
                <div className="inline-block px-8 py-4 rounded-full bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 font-mono text-xs uppercase tracking-widest">
                    The Logic: <span className="text-gray-900 font-bold">Mentorship Signal</span> = (<span className="text-indigo-600 font-bold italic">Expertise Match × Trust Coefficient</span>) / <span className="text-gray-900">Social Friction</span>
                  </span>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* System Principles: Validated Networking */}
        <section id="system-principles" className="bg-slate-900 py-24" aria-label="Validated Networking">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Section Header */}
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  Validated Networking
                </h2>
                <p className="text-slate-400 max-w-2xl text-lg">
                  Three core theses that define how the system activates travel history as social capital
                </p>
              </div>

              {/* 3-Thesis Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                
                {/* Thesis 01: Mentorship is Social Capital */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative z-10 bg-slate-800 border border-slate-700 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-sky-500/20 rounded-2xl flex items-center justify-center mb-6 border border-sky-500/30">
                    <span className="text-sky-400 text-lg font-bold">01</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest bg-sky-500/20 px-2 py-0.5 rounded">Core Principle</span>
                    <h3 className="font-bold text-white italic">Mentorship is Social Capital</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    Your travel history is a <strong className="text-white">valuable asset</strong>. The system's job is to <strong className="text-white">"activate"</strong> that asset for your network—converting passive experience into active mentorship opportunities.
                  </p>
                </motion.div>

                {/* Thesis 02: Validated Provenance */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative z-10 bg-slate-800 border border-slate-700 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-slate-700 rounded-2xl flex items-center justify-center mb-6 border border-slate-600">
                    <span className="text-slate-300 text-lg font-bold">02</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-700 px-2 py-0.5 rounded">Trust Architecture</span>
                    <h3 className="font-bold text-white italic">Validated Provenance</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    Trust isn't about <strong className="text-white">"rating" people</strong>; it's about <strong className="text-white">"verifying" history</strong> via ZK-Proofs. The system cryptographically validates that expertise claims are backed by actual presence.
                  </p>
                  <div className="mt-6 pt-6 border-t border-slate-700">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Technical Constraint</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      <strong className="text-slate-300">Sovereign Identity:</strong> Identity anchored to user-owned DIDs for cross-platform portability.
                    </p>
                  </div>
                </motion.div>

                {/* Thesis 03: Low-Friction Intro */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative z-10 bg-slate-800 border border-slate-700 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/30">
                    <span className="text-cyan-400 text-lg font-bold">03</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/20 px-2 py-0.5 rounded">Connection Design</span>
                    <h3 className="font-bold text-white italic">Low-Friction Intro</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    Connection triggers must be <strong className="text-white">"Opt-In"</strong> and <strong className="text-white">"Short-Term"</strong> (15 mins) to protect the Expert's time. The system respects expertise boundaries by limiting commitment windows.
                  </p>
                  <div className="mt-6 pt-6 border-t border-slate-700">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Technical Constraint</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      <strong className="text-slate-300">Ephemeral Activation:</strong> Nodes auto-deactivate post-trip to minimize the temporal exposure window. Activation occurs only during the 'Planning Window'.
                    </p>
                    <p className="text-xs text-slate-500 mt-2 italic">
                      Engine ingests hashed metadata only (Data Minimization).
                    </p>
                  </div>
                </motion.div>

              </div>

              <div className="mt-12 max-w-3xl">
                <p className="text-sm text-slate-400 leading-relaxed italic border-l-2 border-sky-500/50 pl-6">
                  <strong className="text-white font-bold not-italic">Design Intent:</strong> These three principles define how the system transforms passive travel history into active social capital through verified expertise, cryptographic validation, and low-friction connection design—ensuring <span className="text-white font-semibold">trust through verification</span> rather than ratings.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Design Evolution: Dual-Interface Strategy */}
        <section className="py-24 bg-white border-t border-gray-50" id="design-evolution-logic">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Section Header */}
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  Design Evolution: Density vs. Context
                </h2>
                <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
                  A dual-interface strategy balancing macro-discovery through spatial patterns with micro-matching via high-density metadata
                </p>
              </div>

              <div className="space-y-16 md:space-y-24">
                {/* Card 1: The Global Map (Macro-Discovery) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
                >
                  {/* Visual on Left */}
                  <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="w-full max-w-md bg-gradient-to-br from-sky-50 to-slate-50 rounded-2xl p-8 border border-sky-100 shadow-lg">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm">01</div>
                          <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Global Map</h3>
                            <p className="text-xs text-gray-500">Macro-Discovery</p>
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-sky-200 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-sky-400"></div>
                            <span className="text-xs font-semibold text-gray-700">Trust Clusters</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                            <span className="text-xs text-gray-600">Spatial Gravity</span>
                          </div>
                          <div className="mt-3 pt-3 border-t border-sky-100">
                            <p className="text-xs text-sky-700 font-semibold italic">"Map as Pattern Recognition"</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text on Right */}
                  <div className="w-full lg:w-1/2">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-700 uppercase tracking-wider mb-3">
                        Interface 01
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">The Global Map (Macro-Discovery)</h3>
                    </div>
                    <div className="space-y-4 text-gray-700">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-1">Logic:</p>
                        <p className="text-sm leading-relaxed">Visualizing <strong className="text-gray-900">'Trust Clusters'</strong> through spatial gravity, revealing patterns of expertise demand across geographic regions.</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-1">Context:</p>
                        <p className="text-sm leading-relaxed">Allows a user who has been to <strong className="text-gray-900">40 countries</strong> to see where their expertise is currently needed by their network.</p>
                      </div>
                      <div className="bg-sky-50 rounded-lg p-4 border border-sky-200">
                        <p className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-2">Design Detail:</p>
                        <p className="text-xs text-gray-800 italic leading-relaxed mb-3">"Map as Pattern Recognition"</p>
                        <div className="pt-3 border-t border-sky-200">
                          <span className="inline-block px-3 py-1.5 bg-sky-100 text-sky-700 rounded-full text-[10px] font-bold uppercase tracking-wider">Logic Pill: Pattern Recognition</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2: The Intent Table (Micro-Matching) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12"
                >
                  {/* Visual on Right (reversed) */}
                  <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="w-full max-w-md bg-gradient-to-br from-cyan-50 to-slate-50 rounded-2xl p-8 border border-cyan-100 shadow-lg">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-sm">02</div>
                          <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Intent Table</h3>
                            <p className="text-xs text-gray-500">Micro-Matching</p>
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-cyan-200 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">Who</span>
                            <span className="text-sm font-bold text-gray-900">2nd-degree</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">Where</span>
                            <span className="text-sm font-bold text-gray-900">Intent Nodes</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">When</span>
                            <span className="text-sm font-bold text-gray-900">Metadata Scan</span>
                          </div>
                          <div className="mt-3 pt-3 border-t border-cyan-100">
                            <p className="text-xs text-cyan-700 font-semibold italic">"Table as Source of Truth"</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text on Left (reversed) */}
                  <div className="w-full lg:w-1/2">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-700 uppercase tracking-wider mb-3">
                        Interface 02
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">The Intent Table (Micro-Matching)</h3>
                    </div>
                    <div className="space-y-4 text-gray-700">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-cyan-700 mb-1">Logic:</p>
                        <p className="text-sm leading-relaxed">High-density metadata scanning for specific <strong className="text-gray-900">intent nodes</strong>, enabling precise matching without spatial constraints.</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-cyan-700 mb-1">Context:</p>
                        <p className="text-sm leading-relaxed">Surfaces the raw <strong className="text-gray-900">'Who, Where, and When'</strong> to eliminate the coordination tax of travel planning.</p>
                      </div>
                      <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
                        <p className="text-xs font-bold text-cyan-900 uppercase tracking-wider mb-2">Design Detail:</p>
                        <p className="text-xs text-gray-800 italic leading-relaxed mb-3">"Table as Source of Truth"</p>
                        <div className="pt-3 border-t border-cyan-200">
                          <span className="inline-block px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-[10px] font-bold uppercase tracking-wider">Logic Pill: Data Precision</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Privacy Note Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-16 pt-10 border-t border-gray-100"
              >
                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                    <span className="inline-block px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-xs font-bold uppercase tracking-wider">Logic Pill: Pattern Recognition</span>
                    <span className="inline-block px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-xs font-bold uppercase tracking-wider">Logic Pill: Data Precision</span>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 leading-relaxed italic">
                      <strong className="text-gray-900 font-bold not-italic">Privacy as UX:</strong> Zero-Knowledge proofs build trust through cryptographic validation rather than data transparency.
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
          </>
        )}
        {isNarrativeTravelGenerator && (
          <>
          {/* [01] The Thesis: Narrative Architecture */}
          <section 
            id="narrative-thesis" 
            className="bg-white min-h-auto lg:min-h-[80vh] flex lg:items-center pt-24 pb-20 w-full overflow-x-hidden overflow-visible" 
            aria-label="Narrative Architecture Hero"
          >
            <div className="container mx-auto px-4 md:px-6 w-full overflow-visible">
              <div className="max-w-7xl mx-auto overflow-visible">
                <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-12 lg:items-center overflow-visible">
                  
                  {/* Left Content Column */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="order-1 overflow-visible"
                  >
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight break-words hyphens-auto" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      Narrative Architecture: Designing for How a Place Feels Over Time
                    </h1>
                    
                    <div className="flex flex-wrap gap-3 mb-6">
                      <span className="inline-block px-3 py-1.5 rounded-full text-sm font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                        In Research & Development
                      </span>
                      <span className="inline-block px-3 py-1.5 rounded-full text-sm font-semibold bg-slate-50 text-slate-700 border border-slate-200">
                        Prototype Phase
                      </span>
                    </div>
          
                    <p className="text-base text-gray-700 mb-8 leading-relaxed max-w-xl">
                      An AI system that generates emotional travel arcs instead of itineraries, designing for how a place feels over time rather than what to check off.
                    </p>
       
                    {/* EXECUTIVE SUMMARY / TL;DR */}
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mb-12 border-t border-b border-gray-100 py-10 space-y-8"
                    >
                      {/* The Challenge */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8">
                        <span className="text-base font-bold uppercase tracking-[0.15em] text-amber-700 pt-1">
                          The Challenge
                        </span>
                        <div className="md:col-span-3">
                          <p className="text-base text-gray-800 leading-relaxed max-w-2xl [text-wrap:pretty]">
                            Travel experiences are often reduced to checklists and maps. Current systems prioritize logistical efficiency over emotional resonance, leading to trips that feel transactional rather than transformative.
                          </p>
                        </div>
                      </div>
       
                      {/* The Solution */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 pt-8 border-t border-gray-50">
                        <span className="text-base font-bold uppercase tracking-[0.15em] text-amber-700 pt-1">
                          The Solution
                        </span>
                        <div className="md:col-span-3">
                          <p className="text-base text-gray-800 leading-relaxed max-w-2xl [text-wrap:pretty]">
                            A narrative-driven system that generates emotional travel arcs instead of itineraries. By embedding narrative architecture into the core logic, the system designs for how a place feels over time, prioritizing emotional resonance over logistical coverage.
                          </p>
                        </div>
                      </div>
       
                      {/* Core Pillars (Micro-Copy Stack) */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 pt-8 border-t border-gray-50">
                        <span className="text-xs font-bold uppercase tracking-[0.15em] text-gray-600 pt-1">
                          Core Pillars
                        </span>
                        <div className="md:col-span-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
                            <div className="flex flex-col gap-1">
                              <strong className="text-gray-900">Emotional Arc Orchestration</strong>
                              <span>Three-phase narrative structure: Arrival, Exploration, Familiarity.</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <strong className="text-gray-900">Information Scarcity Design</strong>
                              <span>No maps or schedules in the initial experience to force presence.</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <strong className="text-gray-900">Adaptive Re-Anchoring</strong>
                              <span>System prioritizes emotional safety over narrative progression.</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <strong className="text-gray-900">Headless Interface Layer</strong>
                              <span>Same engine adapts to Luxury, Creative, and Cultural industry skins.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
       
                    {/* Scenario Metadata */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-l-2 border-amber-100 pl-6">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-1">Key Constraint</span>
                        <p className="text-sm text-gray-800 font-medium italic leading-snug">"No maps or schedules in the initial experience. Designing for how a place feels over time."</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-1">Architectural Principle</span>
                        <p className="text-sm text-gray-800 font-medium italic leading-snug">Narrative as infrastructure, not decorative overlay.</p>
                      </div>
                    </div>
                  
                  </motion.div>
        
                  {/* Right Visual Column */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="order-2 mt-16 lg:mt-0 w-full flex justify-center lg:flex lg:items-center lg:justify-end overflow-visible"
                  >
                    {/* Narrative Diagram visualization */}
                    <div className="w-full max-w-full overflow-visible">
                      <div className="scale-90 md:scale-100 origin-center">
                        <NarrativeDiagram />
                      </div>
                    </div>
                  </motion.div>
        
                </div>
              </div>
            </div>
          </section>
          </>
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
         


{isCulturalContextEngine && (
        <>
       {/* Observed Travel Frictions: ADA AA Compliant Version */}
<section id="design-exploration" className="mb-0 lg:mb-20 px-6 bg-white py-0">
  <div className="max-w-6xl mx-auto">
    <div className="mb-16 border-l-4 border-slate-900 pl-6">
      <h4 className="text-cyan-800 font-mono text-xs uppercase tracking-[0.2em] mb-2 font-bold">
        Evidence Collection
      </h4>
      <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
        Observed Travel Frictions
      </h3>
      <p className="text-slate-600 text-lg max-w-2xl italic leading-relaxed [text-wrap:pretty]">
        "Synthesis of community feedback reveals a fundamental collapse in AI credibility due to {"data\u00A0decay."}"
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {[
        { category: "Veracity Gap", quote: "I followed an AI recommendation for a restaurant that had been closed for months. There was no way to verify the source.", source: "r/travel", insight: "Information Decay" },
        { category: "Attribution Gap", quote: "Without knowing the source, I can't judge if it's a real hidden gem or just marketing aggregated from random sites.", source: "r/solotravel", insight: "Trust Anonymity" },
        { category: "Temporal Gap", quote: "The museum closed two years ago. I need real-time verification and data freshness indicators to actually trust this.", source: "r/travelhacks", insight: "Freshness Friction" }
      ].map((item, i) => (
        <div key={i} className="flex flex-col group">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-cyan-800 uppercase tracking-widest font-bold">
              {item.category}
            </span>
            <div className="h-[1px] flex-grow bg-slate-200" />
          </div>
          
          <p className="text-slate-800 text-base leading-relaxed mb-8 italic border-l-2 border-slate-200 pl-5 [text-wrap:pretty]">
            "{item.quote}"
          </p>

          <div className="mt-auto border-t border-slate-100 pt-6">
            <div className="flex flex-col gap-2">
              {/* FIXED: Switched to slate-500 for better contrast on small caps */}
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                Pattern Discovery
              </span>
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-slate-900" />
                <span className="text-sm font-mono text-slate-900 font-bold tracking-tight">
                  {item.insight}
                </span>
              </div>
              {/* FIXED: Switched to slate-600 to meet 4.5:1 ratio */}
              <span className="text-[11px] text-slate-600 font-medium italic mt-1">
                Verified via {item.source}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Trust Strategy: Concept, UVP & Systemic Impact */}
<section id="designs-strategy" className="trust-framework-designs-strategy mt-0 pt-0 pb-24 lg:mt-0 lg:py-24 bg-white">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      {/* 01. The Strategic Context */}
      <div className="border-l-4 border-slate-900 pl-6 mb-16">
        <h4 className="text-cyan-800 font-mono text-xs uppercase tracking-[0.2em] mb-2 font-bold">
          The Strategy
        </h4>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight [text-wrap:balance]">
          The Trust & Authenticity Crisis
        </h2>
        <p className="mt-4 text-slate-600 text-lg max-w-3xl leading-relaxed [text-wrap:pretty]">
          I designed this systems-design framework to treat trust as a technical requirement, not a UI preference. 
          By processing cultural context and data freshness through verification logic, the system converts 
          ephemeral AI "guesses" into actionable, verifiable intelligence.
        </p>
      </div>

      {/* 02. The Pivot: Problem vs Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-amber-600 font-bold text-xl">✕</span>
            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">The Problem</h3>
          </div>
          <p className="text-slate-700 leading-relaxed">
            <strong>The Spontaneity Tax:</strong> Travelers want to be adventurous, but <span className="italic">"Hallucination Risk"</span> forces them back into over-researched, safe patterns. Current AI fails to support high-stakes, real-time decision making due to a lack of source-truth.
          </p>
        </div>

        <div className="p-8 bg-cyan-50 border border-cyan-100 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-cyan-700 font-bold text-xl">✓</span>
            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">The Solution</h3>
          </div>
          <p className="text-slate-700 leading-relaxed">
            <strong>Unique Value Proposition:</strong> An architecture that provides <strong>source verification and data provenance</strong> at the core. It tracks credibility and freshness signals to deliver trustworthy travel recommendations with total transparency.
          </p>
        </div>
      </div>

      {/* 03. The Impact Matrix: Verification Philosophy */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] flex-grow bg-slate-200" />
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">Verification Philosophy</span>
          <div className="h-[1px] flex-grow bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1: Travelers */}
          <div className="flex flex-col p-6 border-l-2 border-cyan-400 bg-white shadow-sm transition-all hover:shadow-md">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-600" /> Dynamic Provenance
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tracking source-truth in real-time. Users verify info via <strong>credible source chains</strong> rather than blind faith.
            </p>
          </div>

          {/* Pillar 2: Safety-Net */}
          <div className="flex flex-col p-6 border-l-2 border-emerald-400 bg-white shadow-sm transition-all hover:shadow-md">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" /> Spontaneity Safety-Net
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Automated logic layers that filter out "closed" or "fake" locations before they ever reach the user interface.
            </p>
          </div>

          {/* Pillar 3: Industry */}
          <div className="flex flex-col p-6 border-l-2 border-slate-900 bg-white shadow-sm transition-all hover:shadow-md">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-900" /> Liability Shield
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              A feature that converts AI reasoning into a permanent, <strong>downloadable audit trail</strong> for industry professionals.
            </p>
          </div>

          {/* Pillar 4: B2B */}
          <div className="flex flex-col p-6 border-l-2 border-indigo-400 bg-white shadow-sm transition-all hover:shadow-md">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600" /> Frictionless Verification
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Surfacing trust signals and freshness timestamps without breaking the user's flow of discovery.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>

{/* Trust Signals & System Constraints */}
<section id="research-audience" className="py-24 bg-black overflow-x-hidden" aria-label="Architectural Constraints">
  <div className="container mx-auto px-6">
    <div className="max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-20 text-center lg:text-left">
        <h4 className="text-cyan-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-4 font-bold">
          System Analysis: Core Trust
        </h4>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
          Architectural Constraints
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl [text-wrap:pretty]">
          Trust is an architectural requirement, not a UI preference. 
          These mandates define the system’s core {"logic\u00A0boundaries."}
        </p>
      </div>

      {/* Constraints Grid - Card Structure Matching wireframes-ui */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Card 01: Explainability */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">
            01. Explainability
          </h3>
          <motion.div
            whileHover={{ x: 10 }}
            className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 transition-all h-auto overflow-visible"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-4xl font-bold text-amber-400">62%</div>
              <Shield className="w-5 h-5 text-amber-500/50" />
            </div>
            <h4 className="text-white font-bold text-sm mb-1">Distrust unverified AI recommendations</h4>
            <p className="text-gray-500 text-xs mb-4">— Travel Industry Trust Survey 2024</p>
            <p className="text-gray-400 text-xs pt-4 border-t border-white/5">
              <strong className="text-gray-300 not-italic uppercase tracking-wider text-[10px]">Mandate:</strong> Every 
              output must expose its underlying {"source\u00A0chain."}
            </p>
          </motion.div>
        </div>

        {/* Card 02: Conflict Resolution */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-[0.2em] mb-8">
            02. Provenance & Conflict Resolution
          </h3>
          <motion.div
            whileHover={{ x: 10 }}
            className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 transition-all h-auto overflow-visible"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-4xl font-bold text-emerald-400">45%</div>
              <AlertCircle className="w-5 h-5 text-emerald-500/50" />
            </div>
            <h4 className="text-white font-bold text-sm mb-1">Misled by outdated or fake information</h4>
            <p className="text-gray-500 text-xs mb-4">— Trust & Authenticity Primary Research</p>
            <p className="text-gray-400 text-xs pt-4 border-t border-white/5">
              <strong className="text-gray-300 not-italic uppercase tracking-wider text-[10px]">Mandate:</strong> Conflict 
              logic must resolve disputes before reaching the {"user\u00A0interface."}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ x: 10 }}
            className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 transition-all h-auto overflow-visible"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-4xl font-bold text-cyan-400">78%</div>
              <Database className="w-5 h-5 text-cyan-500/50" />
            </div>
            <h4 className="text-white font-bold text-sm mb-1">Require origin and data credibility</h4>
            <p className="text-gray-500 text-xs mb-4">— Phocuswright Consumer Survey</p>
            <p className="text-gray-400 text-xs pt-4 border-t border-white/5">
              <strong className="text-gray-300 not-italic uppercase tracking-wider text-[10px]">Mandate:</strong> The system 
              must surface provenance and {"freshness\u00A0signals."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Trust Anti-Patterns - Human-Centric Narrative */}
      <div className="mt-20 pt-10 border-t border-white/10">
        <div className="mb-20 text-center lg:text-left">
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
            Where Current AI Fails the Traveler
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl [text-wrap:pretty]">
            I identified three "Anti-Patterns" where typical AI systems break user trust. 
            Designing for authenticity meant solving these architectural flaws first.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
    {[
      {
        title: "The Single-Source Trap",
        humanProblem: "What if the review is fake?",
        desc: "Most systems trust a single platform blindly. If TripAdvisor has a bot problem or Google is outdated, the user gets bad advice with no safety net.",
        logic: "Required: Arbitration Logic",
        color: "red"
      },
      {
        title: "The 'Black Box' Hallucination",
        humanProblem: "Why should I believe this?",
        desc: "Standard LLMs 'chat' but don't 'prove.' They treat travel advice like a creative writing exercise rather than a verifiable fact-finding mission.",
        logic: "Required: Data Provenance",
        color: "orange"
      },
      {
        title: "The Commission Conflict",
        humanProblem: "Are you helping me or selling to me?",
        desc: "Booking sites often prioritize 'What's available' over 'What's actually good.' In these systems, profit signals usually drown out authenticity signals.",
        logic: "Required: Logic Separation",
        color: "purple"
      }
    ].map((item, i) => (
      <motion.div
        key={i}
        whileHover={{ x: 10 }}
        className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 transition-all h-auto overflow-visible"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className={`h-2 w-2 rounded-full bg-${item.color}-500`} />
          <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
        </div>
        
        <p className="text-cyan-400 text-xs font-mono mb-3 uppercase tracking-wider">
          {item.humanProblem}
        </p>
        
        <p className="text-gray-500 text-xs mb-4">
          {item.desc}
        </p>

        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest border-t border-white/10 pt-4">
          {item.logic}
        </div>
      </motion.div>
    ))}
        </div>
      </div>

      {/* The Architectural Response: The Founder's Pitch */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 pt-10 border-t border-white/10 text-center"
      >
        <div className="inline-block px-8 py-4 rounded-full bg-slate-900/50 border border-slate-700/50 h-auto overflow-visible">
          <span className="text-slate-400 font-mono text-xs uppercase tracking-widest">
            The Thesis: <span className="text-white font-bold">Trust is a calculation, not a feeling.</span> Current AI "guesses" when data conflicts. I'm building a framework that <span className="text-cyan-400 font-bold italic">computes consensus.</span> By moving from binary logic to a probabilistic model, the system arbitrates between 
            conflicting sources to create a verifiable <span className="text-white underline underline-offset-4 decoration-cyan-500/50">Audit Trail</span> for the traveler.
          </span>
        </div>
      </motion.div>

    </div>
  </div>
</section>


{/* System Overview Section */}
<section id="architecture" className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden">
  {/* Refined Gradient: Moving from Indigo to Cyan/Slate for a "Trust" vibe */}
  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-zinc-950 to-cyan-950/20 pointer-events-none" />
  
  <div className="container mx-auto px-6 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 max-w-[18ch] sm:max-w-4xl mx-auto leading-[1.1] [text-wrap:balance]">
          Architecture: Powering Spontaneity through {"Veracity\u00A0Logic"}
        </h2>
        <p className="text-slate-400 text-lg max-w-3xl mx-auto text-balance mb-4">
          Every prompt triggers a race: the LLM generates the 'Spontaneous Spark,' while the Consensus Module audits that spark across the Trust Stack.
        </p>
        
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-slate-500/50 transition-colors">
            <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-3 font-bold">01. Discovery</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Generates creative, context-aware suggestions based on user mood.
            </p>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-colors">
            <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-3 font-bold">02. Verification</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Real-time RAG layer that 'fact-checks' ideas against live, verified data.
            </p>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-emerald-500/50 transition-colors">
            <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-3 font-bold">03. Authenticity</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              A real-time confidence metric: "Go for it—this is verified live."
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          
          {/* Stage 1 - Source Collection (Left) - Use SLATE */}
          <div className="space-y-6">
            <h3 className="text-sm font-mono font-bold text-slate-400 text-center lg:text-left mb-6 uppercase tracking-[0.2em]">
              Verified Provenance Ingest
            </h3>
            
            {[
              { icon: FaUniversity, label: 'Museums', desc: 'Curated collections' },
              { icon: FaArchive, label: 'Local Archives', desc: 'Historical records' },
              { icon: FaUserGraduate, label: 'Verified Historians', desc: 'Expert knowledge' },
            ].map((source, index) => (
              <motion.div
                key={index}
                className="group relative"
                whileHover={{ x: 5 }}
              >
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 hover:border-slate-500/50 transition-all">
                  <div className="flex items-center gap-4 mb-3">
                    <source.icon className="w-5 h-5 text-slate-400" />
                    <h4 className="text-white font-semibold text-base">{source.label}</h4>
                  </div>
                  <p className="text-slate-400 text-sm">{source.desc}</p>
                  
                  <motion.div
                    className="absolute -right-2 top-1/2 w-2 h-2 bg-slate-400 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{ x: [0, 150], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
         {/* Stage 2 - Verification Layer (Center) - Use CYAN */}
<div className="flex justify-center">
  <div className="relative w-64 h-64 md:w-80 md:h-80">
    <svg className="w-full h-full" viewBox="0 0 320 320">
      {/* Outer Ring - Animated */}
      <motion.circle
        cx="160" cy="160" r="145" fill="none"
        stroke="url(#verificationOuterGradient)" strokeWidth="1" strokeDasharray="12 8" opacity="0.3"
        animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      {/* Middle Ring - Pulsing */}
      <motion.circle
        cx="160" cy="160" r="115" fill="none"
        stroke="url(#verificationMiddleGradient)" strokeWidth="2"
        animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Inner Core - Cleaned & Spaced */}
      <circle cx="160" cy="160" r="72" fill="url(#verificationCoreGradient)" opacity="0.85" />
      
      <defs>
        <linearGradient id="verificationOuterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id="verificationMiddleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#2dd4bf" />
        </linearGradient>
        <radialGradient id="verificationCoreGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="70%" stopColor="#0369a1" />
          <stop offset="100%" stopColor="#083344" />
        </radialGradient>
      </defs>
    </svg>
    
    {/* Center Label - Maximal Negative Space */}
    <div className="absolute inset-0 flex items-center justify-center text-center">
      <div className="px-6"> 
        <div className="text-[10px] font-bold text-cyan-300 uppercase tracking-[0.55em] mb-2 opacity-90">
          Audit Protocol
        </div>
        <div className="text-xl md:text-2xl font-bold text-white tracking-tight leading-none">
          VALIDATION
        </div>
        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.55em] mt-2 opacity-90">
          Consensus Core
        </div>
      </div>
    </div>
  </div>
</div>
          
          {/* Stage 3 - Transparent Output (Right) - Use EMERALD */}
          <div className="space-y-6">
            <h3 className="text-sm font-mono font-bold text-emerald-400 text-center lg:text-right mb-6 uppercase tracking-[0.2em]">
              Verified Recommendations
            </h3>
            
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 hover:border-emerald-500/50 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <FaCheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Provenance Confirmed</span>
              </div>
              
              <h4 className="text-white font-semibold text-base mb-2">Authenticated Output</h4>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Recommendation cross-referenced for cultural authenticity and temporal relevance.
              </p>
              
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                {['Verified Record', 'Live API'].map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded border border-cyan-400/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Math Formula - Use Emerald for result */}
        <motion.div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-slate-500 text-xs font-mono uppercase tracking-[0.3em] mb-4">Lineage Formula</p>
          <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="text-white font-mono text-sm md:text-base">
              R<sub>trust</sub> = <span className="text-cyan-400">V</span>(<span className="text-slate-400">S<sub>n</sub></span>) × <span className="text-emerald-400">A<sub>trans</sub></span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </div>
</section>


         {/* Design Evolution Section */}
        <section id="wireframes-ui" className="py-24 bg-black overflow-x-hidden">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="mb-20 text-center lg:text-left">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  Design Evolution
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl [text-wrap:pretty]">
                  I translated the architecture and formulas above into a "Verified Cultural Context" component. This UI pattern replaces the traditional "trust me" AI chat with a rigorous evidence block.
                </p>
              </div>

              {/* High-Contrast / ADA Compliant Recommendation Component */}
<div className="bg-white border-2 border-slate-900 p-8 rounded-3xl max-w-2xl mx-auto shadow-[8px_8px_0px_rgba(15,23,42,1)]">
  <div className="flex justify-between items-start mb-6">
    <div>
      <h4 className="text-cyan-800 font-mono text-xs uppercase tracking-widest font-bold mb-2">
        Verified Cultural Context
      </h4>
      <p className="text-slate-800 text-sm leading-relaxed [text-wrap:pretty]">
        This recommendation has been cross-referenced through multiple expert 
        sources to ensure historical and operational {"authenticity\u00A0status."}
      </p>
    </div>
    <div className="bg-emerald-100 text-emerald-800 p-2 rounded-lg">
      <CheckCircle className="w-6 h-6" />
    </div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-slate-100 py-6 my-6">
    {[
      { label: "Museum Archive", status: "Verified" },
      { label: "Local Historian", status: "Endorsed" },
      { label: "Verified Record", status: "Official" }
    ].map((source, i) => (
      <div key={i} className="flex flex-col gap-1">
        <span className="text-slate-900 font-bold text-xs">{source.label}</span>
        <span className="text-slate-500 font-mono text-[10px] uppercase tracking-tighter">
          {source.status}
        </span>
      </div>
    ))}
  </div>

  <div className="flex justify-between items-center text-[11px] font-mono text-slate-500">
    <span className="font-bold uppercase tracking-widest">System Integrity: 98%</span>
    <span className="italic">Last verified: 2 days ago</span>
  </div>
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
            </div>
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
                    Development workflow and technical architecture details will be documented as the system build evolves.
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
                  <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto [text-wrap:pretty]">
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
          <section className="pt-20 pb-0 bg-white">
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
                  A live demo will be available once the verification system is fully implemented.
                  </p>
                </div>
              
              </motion.div>
            </div>
          </section>

          {/* Implementation Strategy & Design Roadmap */}
          <section id="implementation-strategy" className="pt-0 pb-16 bg-white overflow-x-hidden">
            <div className="container mx-auto px-6">
              <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="mb-20 text-center lg:text-left">
                  {/* Status Ribbon */}
                  <div className="flex md:inline-flex w-fit items-center px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-full mb-6 max-w-full">
                    <span className="text-xs font-mono font-semibold text-indigo-700 uppercase tracking-wider whitespace-nowrap">
                      STATUS: RESEARCH_&_VALIDATION_ACTIVE
                    </span>
                  </div>
                  
                  {/* Section Title */}
                  <h2 
                    className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6" 
                    style={{ fontFamily: "'tiempos-headline-regular', serif" }}
                  >
                    Implementation Strategy & Design Roadmap
                  </h2>
                </div>

                {/* Vertical Step Pattern */}
                <div className="space-y-12 h-auto overflow-visible">
                  {/* Phase 01 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <div className="flex items-start gap-3 md:gap-6">
                      <div className="flex-none">
                        <span className="text-xl md:text-2xl font-mono text-indigo-500 font-bold">[01]</span>
                      </div>
                      <div className="flex-1 min-w-0 h-auto overflow-visible">
                        <h3 className="text-lg font-bold mb-3 text-slate-900">
                          ARCHITECTURAL RESEARCH: Logic Mapping & Traceability
                        </h3>
                        <p className="text-gray-800 leading-relaxed">
                          The structural skeleton is operational, but the current focus is a deep-dive research phase into <span className="font-semibold text-slate-900">data-orchestration</span>. I am designing the implementation strategy for a "Verified Intelligence" layer—finalizing the schema that binds every LLM suggestion to a unique <span className="font-semibold text-slate-900">source ID</span>. This ensures that the system's "reasoning" is always auditable and grounded in factual middleware.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Phase 02 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="flex items-start gap-3 md:gap-6">
                      <div className="flex-none">
                        <span className="text-xl md:text-2xl font-mono text-indigo-500 font-bold">[02]</span>
                      </div>
                      <div className="flex-1 min-w-0 h-auto overflow-visible">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                          <h3 className="text-lg font-bold text-slate-900">
                            BEHAVIORAL ANALYSIS: Edge Case Stress Testing
                          </h3>
                          <div className="flex md:inline-flex w-fit items-center px-3 py-1 bg-amber-50 border border-amber-200 rounded-full flex-shrink-0 max-w-full">
                            <span className="text-xs font-mono font-semibold text-amber-700 uppercase tracking-wider whitespace-nowrap">
                              LOGIC_STATUS: CONSTRAINT_ENFORCED
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-800 leading-relaxed">
                          In the current Sandboxed Beta, I am observing how users navigate system uncertainty. I am specifically testing the implementation of <span className="font-semibold text-slate-900">Dynamic Freshness Indicators</span> (data decay logic). The goal is to determine the optimal threshold for flagging <span className="font-semibold text-slate-900">conflicting signals</span>, ensuring the AI prioritizes safety and accuracy over simple "helpfulness" when data is stale.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Phase 03 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="flex items-start gap-3 md:gap-6">
                      <div className="flex-none">
                        <span className="text-xl md:text-2xl font-mono text-indigo-500 font-bold">[03]</span>
                      </div>
                      <div className="flex-1 min-w-0 h-auto overflow-visible">
                        <h3 className="text-lg font-bold mb-3 text-slate-900">
                          SCALABILITY STRATEGY: From Logic to Ecosystem
                        </h3>
                        <p className="text-gray-800 leading-relaxed">
                          Following the validation of the core verification logic, the implementation roadmap moves toward systemic interoperability. This involves architecting a <span className="font-semibold text-slate-900">Liability Shield</span>—a standardized audit export for B2B stakeholders—and designing the API hooks required to integrate localized expert networks. This ensures the engine can scale from a personal companion to a professional-grade travel tool.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Outcome & Learnings Section */}
          <section id="learnings-next" className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    {/* Executive Summary */}
    <div className="max-w-3xl mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
        Verification as a {"Product\u00A0Value"}
      </h2>
      <p className="text-slate-600 text-lg leading-relaxed [text-wrap:pretty]">
        The core takeaway from this project is that <strong>Trust is the fuel for spontaneity.</strong> When cognitive load drops because the system handles the "sanity check," 
        users make faster, more adventurous decisions. I didn't just build a 
        database; I built the <span className="text-slate-900 font-bold">confidence to act.</span>
      </p>
    </div>

    {/* The Learning Matrix */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      
      {/* Pillar 1: The Design Challenge */}
      <div className="space-y-4">
        <h4 className="text-xs font-mono text-cyan-800 uppercase tracking-widest font-bold">
          01. Human-Centered Logic
        </h4>
        <h3 className="text-xl font-bold text-slate-900">Transparency vs. Friction</h3>
        <p className="text-slate-600 text-sm leading-relaxed [text-wrap:pretty]">
          Early testing revealed that raw technical data feels like bureaucracy, 
          while no data feels like a black box. The "UX Sweet Spot" lies in 
          <strong> accessible attribution</strong>—explaining the "Why" behind 
          the trust, not just the "How" of the code.
        </p>
      </div>

      {/* Pillar 2: Technical Reality */}
      <div className="space-y-4">
        <h4 className="text-xs font-mono text-cyan-800 uppercase tracking-widest font-bold">
          02. The API Infrastructure
        </h4>
        <h3 className="text-xl font-bold text-slate-900">The Attribution Gap</h3>
        <p className="text-slate-600 text-sm leading-relaxed [text-wrap:pretty]">
          I discovered that most travel APIs are optimized for speed, not 
          provenance. Solving this required building a <strong>custom abstraction 
          layer</strong> to inject verification logic into legacy systems 
          without breaking real-time performance.
        </p>
      </div>
    </div>

    {/* The Horizon: Next Steps */}
    <div className="mt-20 p-8 md:p-12 bg-slate-50 border border-slate-200 rounded-[2.5rem]">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">The Horizon: V1.0 & Beyond</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase mb-2">Community Consensus</span>
              <p className="text-sm text-slate-600">
                Moving from automated verification to a collaborative model where 
                collective traveler signals validate real-world {"authenticity\u00A0shifts."}
              </p>
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase mb-2">Industry Standardization</span>
              <p className="text-sm text-slate-600">
                Evolving the <strong>"Liability Shield"</strong> into a cross-platform 
                standard for Recommendation Provenance, reducing the global noise 
                of outdated travel {"data\u00A0decay."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        </>
      )}


      {isTravelPlanningAssistant && (
        <>

<section id="research-audience" className="bg-white py-24 border-t border-gray-50" aria-label="System Architecture">
  <div className="container mx-auto px-6">
    <div className="max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
          The Architecture: Modular Intelligence
        </h2>
        <p className="text-gray-500 max-w-2xl text-lg">
          A modular microservices architecture designed for cross-platform deployment. The system functions as a "Logic Pipeline" that transforms raw environmental entropy into verified human value.
        </p>
      </div>

      {/* Logic Pipeline Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        
        {/* Connecting Line (Desktop Only) */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gray-100 -translate-y-1/2 z-0" />

        {/* 01. Ingest: Context Interpreter */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 border border-amber-100">
            <Activity className="text-amber-600 w-6 h-6" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded">Stage 01</span>
            <h3 className="font-bold text-gray-900 italic">Ingest</h3>
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-3">Context Interpreter</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Normalizes unstructured streams—weather APIs, sensor data, and hyper-local signals—into high-dimensional <strong className="text-gray-900">Decision Vectors</strong>.
          </p>
          <div className="mt-6 pt-6 border-t border-gray-50 flex flex-wrap gap-2">
            <span className="text-[10px] font-mono bg-gray-50 text-gray-500 px-2 py-1 rounded">Weather_v2</span>
            <span className="text-[10px] font-mono bg-gray-50 text-gray-500 px-2 py-1 rounded">Sensor_Fusion</span>
            <span className="text-[10px] font-mono bg-gray-50 text-gray-500 px-2 py-1 rounded">Sentiment_Parser</span>
          </div>
        </motion.div>

        {/* 02. Verify: Veracity Logic */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-lg shadow-gray-100/50 hover:shadow-xl transition-shadow ring-1 ring-amber-500/10"
        >
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mb-6">
            <ShieldCheck className="text-amber-400 w-6 h-6" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded">Stage 02</span>
            <h3 className="font-bold text-gray-900 italic">Verify</h3>
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-3">Veracity Logic</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            A "Trust-Layer" safety net that cross-references LLM suggestions against <strong className="text-gray-900">physical ground truths</strong> like business hours, transit availability, and terrain difficulty.
          </p>
          <div className="mt-6 pt-6 border-t border-gray-50 flex flex-wrap gap-2">
            <span className="text-[10px] font-mono bg-emerald-50 text-emerald-600 px-2 py-1 rounded">Provenance_Check</span>
            <span className="text-[10px] font-mono bg-emerald-50 text-emerald-600 px-2 py-1 rounded">Anti-Hallucination</span>
          </div>
        </motion.div>

        {/* 03. Solve: Scenario Logic */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6 border border-cyan-100">
            <Zap className="text-cyan-600 w-6 h-6" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest bg-cyan-50 px-2 py-0.5 rounded">Stage 03</span>
            <h3 className="font-bold text-gray-900 italic">Solve</h3>
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-3">Scenario Logic</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            The multi-constraint solver that balances rigid logistics with <strong className="text-gray-900">real-world entropy</strong>, determining the optimal social or discovery pivot point.
          </p>
          <div className="mt-6 pt-6 border-t border-gray-50 flex flex-wrap gap-2">
            <span className="text-[10px] font-mono bg-gray-50 text-gray-500 px-2 py-1 rounded">Constraint_Fusion</span>
            <span className="text-[10px] font-mono bg-gray-50 text-gray-500 px-2 py-1 rounded">Heuristic_Eng</span>
          </div>
        </motion.div>

      </div>

      <div className="mt-12 max-w-3xl">
      <p className="text-sm text-gray-500 leading-relaxed italic border-l-2 border-amber-200 pl-6">
        <strong className="text-gray-900 font-bold not-italic">Design Intent:</strong> I am designing CATDS as a connective middleware layer that sits between global platforms and local context. By converting unstructured inputs into <span className="text-gray-900 font-semibold">Decision Vectors</span>, the system suggests pivots without overriding <span className="text-gray-900 font-semibold">User Agency</span>—ensuring the AI remains a co-pilot, not a replacement.
      </p>
    </div>

      {/* Middleware Callout Card */}
      <div className="mt-16 bg-slate-50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-100">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center shrink-0 mt-1">
            <Database className="text-slate-400 w-5 h-5" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-slate-900 mb-1">Intelligence Delivery: SDK-Ready</h5>
            <p className="text-xs text-slate-500 leading-relaxed max-w-md">
              The entire "Middleware Stack" is deployable via modular SDKs, allowing platforms to transform static booking data into reactive, context-aware experiences without refactoring legacy architecture.
            </p>
          </div>
        </div>
        <button className="whitespace-nowrap bg-white border border-slate-200 text-slate-900 text-xs font-bold py-3 px-6 rounded-xl hover:bg-slate-100 transition-colors shadow-sm">
          Examine API Documentation
        </button>
      </div>

    </div>
  </div>
</section>

        
<section id="designs-strategy" className="bg-slate-900 py-20" aria-label="Orchestration Philosophy">
  <div className="container mx-auto px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Principle 01 */}
        <div className="space-y-3">
          <div className="text-amber-500 font-mono text-xs uppercase tracking-[0.3em]">01. Philosophy</div>
          <h4 className="text-white font-bold text-lg italic">Flexible Structure</h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            Reduces decision fatigue without locking travelers into rigid, unchangeable schedules.
          </p>
        </div>

        {/* Principle 02 */}
        <div className="space-y-3">
          <div className="text-amber-500 font-mono text-xs uppercase tracking-[0.3em]">02. Logic</div>
          <h4 className="text-white font-bold text-lg italic">Latency-Aware</h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            Adjusts plans when real-world conditions deviate from cached or stale API states.
          </p>
        </div>

        {/* Principle 03 */}
        <div className="space-y-3">
          <div className="text-amber-500 font-mono text-xs uppercase tracking-[0.3em]">03. Integration</div>
          <h4 className="text-white font-bold text-lg italic">Unified Intel</h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            Consolidates planning and discovery into a single, adaptive logic chain.
          </p>
        </div>

        {/* Principle 04 */}
        <div className="space-y-3">
          <div className="text-amber-500 font-mono text-xs uppercase tracking-[0.3em]">04. Context</div>
          <h4 className="text-white font-bold text-lg italic">Context-Aware</h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            Pivots recommendations based on crowd density, weather, and user energy decay.
          </p>
        </div>

      </div>
    </div>
  </div>
</section>



<section id="design-exploration" className="bg-white py-24 border-t border-gray-50 overflow-hidden" aria-label="Detailed System Logic">
  <div className="container mx-auto px-6">
    <div className="max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-20 text-center lg:text-left">
        <h4 className="text-amber-600 font-mono text-[10px] uppercase tracking-[0.3em] mb-4 font-bold">
          Technical Deep Dive
        </h4>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
          Environmental Sensing & Decision Logic
        </h2>
      </div>

      {/* 3-Stage Visual Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
        
        {/* Stage 1: Sensing (Input) */}
        <div className="space-y-6 order-2 lg:order-1">
          <h3 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">
            01. Environmental Sensing
          </h3>
          {[
            { label: 'Atmospheric Data', desc: 'Precipitation & visibility mapping' },
            { label: 'Terrain Analysis', desc: 'Elevation & accessibility vectors' },
            { label: 'Urban Pulse', desc: 'Real-time density & shop availability' },
          ].map((sensor, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 10 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 transition-all"
            >
              <h4 className="text-gray-900 font-bold text-sm mb-1">{sensor.label}</h4>
              <p className="text-gray-500 text-xs">{sensor.desc}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Stage 2: The Core Processor (SVG Animation) */}
        <div className="flex justify-center order-1 lg:order-2 w-full md:w-auto">
          <div className="relative w-full aspect-square max-w-full md:w-80 md:h-80 md:max-w-none">
            <svg className="w-full h-full" viewBox="0 0 320 320">
              <motion.circle
                cx="160" cy="160" r="140" fill="none"
                stroke="#f59e0b" strokeWidth="1" strokeDasharray="8 4" opacity="0.2"
                animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle
                cx="160" cy="160" r="110" fill="none"
                stroke="#cbd5e1" strokeWidth="2"
                animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }}
              />
              <circle cx="160" cy="160" r="75" fill="#0f172a" />
              <defs>
                <radialGradient id="logicCoreGradient">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </radialGradient>
              </defs>
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center text-center px-8">
              <div>
                <div className="text-[9px] font-bold text-amber-500 uppercase tracking-[0.3em] mb-1">
                  Vector Engine
                </div>
                <div className="text-xl font-bold text-white tracking-tight">CATDS</div>
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1">
                  V1.0.4
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stage 3: The Output Signal */}
        <div className="space-y-6 order-3">
          <h3 className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-[0.2em] mb-8">
            03. Feasibility Signal
          </h3>
          <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 shadow-xl shadow-slate-100/50">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status: Adaptive</span>
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-amber-500" 
                  animate={{ width: ['20%', '94%', '94%'] }} 
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400">
                <span>Decision Confidence</span>
                <span className="text-gray-900">94%</span>
              </div>
            </div>

            <p className="text-gray-900 text-sm font-bold italic mb-2">"Terrain: Accessible"</p>
            <p className="text-gray-500 text-[11px] leading-relaxed">
              New discovery vector generated via high-confidence indoor archives due to precipitation delta.
            </p>
          </div>
        </div>
      </div>
      
      {/* Mathematical Formula Footnote */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 pt-10 border-t border-slate-100 text-center"
      >
        <div className="inline-block px-8 py-4 rounded-full bg-slate-50 border border-slate-200">
          <span className="text-slate-400 font-mono text-xs uppercase tracking-widest">
            The Logic: <span className="text-gray-900 font-bold">Feasibility Signal</span> = <span className="text-amber-600 font-bold italic">Context(Weather, Terrain)</span> / <span className="text-gray-900">Δ Latency</span>
          </span>
        </div>
      </motion.div>

    </div>
  </div>
</section>

<section id="wireframes-ui" className="bg-slate-50 py-24 overflow-x-hidden" aria-label="Design Evolution: Logic in Action">
  <div className="container mx-auto px-6">
    <div className="max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-20 text-center lg:text-left">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
          Design Evolution: Logic in Action
        </h2>
        <p className="text-gray-500 text-lg leading-relaxed max-w-2xl [text-wrap:pretty]">
          Visualizing the Intelligence Layer—how CATDS orchestrates context, trust, and semantic mapping to enable adaptive travel decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
        
        {/* CASE A: THE ENVIRONMENTAL PIVOT */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col lg:flex-row h-auto overflow-visible">
          <div className="p-8 lg:p-12 lg:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <CloudRain className="text-amber-600 w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Case A: Environmental Pivot</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 italic">The "Rainy Day" Re-Route</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              The Context Interpreter detects high-entropy signals (Weather API) and calculates a <strong className="text-gray-900">Constraint Delta</strong>—the gap between planned satisfaction and physical feasibility. 
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="w-16 font-bold uppercase text-[10px] tracking-tight">Input:</span>
                <span className="bg-slate-50 px-3 py-1 rounded-md">Outdoor Market Tour + Heavy Rain</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="w-16 font-bold uppercase text-[10px] tracking-tight">Action:</span>
                <span className="bg-slate-50 px-3 py-1 rounded-md text-amber-700 font-medium">Verify Indoor Alternatives</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="w-16 font-bold uppercase text-[10px] tracking-tight">Output:</span>
                <span className="text-gray-900 font-bold">94% Satisfaction Match: Indoor Market Hall</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 bg-slate-50 p-8 flex items-center justify-center border-l border-gray-50">
             {/* Placeholder for Environmental Graphic / Itinerary UI */}
             <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Itinerary Update</span>
                  <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-slate-200 line-through opacity-50">
                    <p className="text-xs font-bold">14:00 - Outdoor Market</p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-xl border-l-4 border-amber-500">
                    <p className="text-xs font-bold text-amber-900">14:15 - Indoor Market Hall</p>
                    <p className="text-[10px] text-amber-700 mt-1">Suggested for 100% weather compatibility</p>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* CASE B: THE SPONTANEITY GAP */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm flex flex-col lg:flex-row-reverse">
          <div className="p-8 lg:p-12 lg:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                <Users className="text-cyan-600 w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-600">Case B: Relational Context</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 italic">The Spontaneity Gap</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Middleware surfaces "low-friction" social moments via core platform APIs. The system detects a <strong className="text-gray-900">15-minute schedule gap</strong> between two compatible travelers.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="w-16 font-bold uppercase text-[10px] tracking-tight">Input:</span>
                <span className="bg-slate-50 px-3 py-1 rounded-md">Shared Interests + 200m Proximity</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="w-16 font-bold uppercase text-[10px] tracking-tight">Pattern:</span>
                <span className="bg-slate-50 px-3 py-1 rounded-md text-cyan-700 font-medium">Non-Intrusive Smart Toast</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 bg-slate-100 flex items-center justify-center py-12">
             <IntegratedSocialInvite /> {/* Marco Graphic used here */}
          </div>
        </div>

        {/* CASE C: THE ENERGY DECAY PIVOT */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm flex flex-col lg:flex-row">
          <div className="p-8 lg:p-12 lg:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <BatteryLow className="text-emerald-600 w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Case C: Internal User State</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 italic">Energy Conservation Mode</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              The Context Interpreter normalizes sensor data (step counts/heart rate) to detect <strong className="text-gray-900">User Fatigue</strong>. The system automatically shifts from high-intensity discovery to low-energy relaxation.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="w-16 font-bold uppercase text-[10px] tracking-tight">Signal:</span>
                <span className="bg-slate-50 px-3 py-1 rounded-md">12,000+ Steps + Low Battery</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="w-16 font-bold uppercase text-[10px] tracking-tight">Logic:</span>
                <span className="bg-slate-50 px-3 py-1 rounded-md text-emerald-700 font-medium">Auto-Filter High-Energy activities</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 bg-emerald-50/30 p-8 flex items-center justify-center border-l border-emerald-50">
             <div className="w-full max-w-sm bg-white rounded-[2rem] shadow-lg p-8 border border-emerald-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-emerald-500" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase">Low Energy</span>
                </div>
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                  <Coffee className="text-emerald-600" size={20} />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Suggesting: Quiet Cafe Lounge</p>
                    <p className="text-[10px] text-emerald-700">Priority: Conservation & Rest</p>
                  </div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</section>

<section className="bg-white py-24 border-t border-gray-50" aria-label="Research and Market Fit">
  <div className="container mx-auto px-6">
    <div className="max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
          Research & Market Fit
        </h2>
        <p className="text-gray-500 max-w-2xl text-lg">
          Bridging the "Friction Gap" between static travel legacy systems and the fluid reality of the traveler.
        </p>
      </div>

      {/* Validation Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Case 01: Interoperability */}
        <div className="group bg-slate-50 rounded-[2rem] p-8 border border-transparent hover:border-amber-200 transition-all">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[10px] font-bold text-amber-600 bg-amber-100/50 px-2 py-1 rounded uppercase tracking-widest">r/travel</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Interoperability</span>
          </div>
          
          <blockquote className="text-gray-700 italic text-sm leading-relaxed mb-8 border-l-2 border-slate-200 pl-4">
            "I use TripIt for flights, Sheets for itinerary, and Maps for discovery. Nothing talks to each other. Juggling five apps is a nightmare."
          </blockquote>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Systemic Solution</h4>
            <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
              <p className="text-xs font-bold text-gray-900 mb-1">Unified Logic Middleware</p>
              <p className="text-[11px] text-gray-500 leading-normal">
                Breaks the siloed app model by acting as a connective SDK for cross-platform data sync.
              </p>
            </div>
          </div>
        </div>

        {/* Case 02: Static Constraint */}
        <div className="group bg-slate-50 rounded-[2rem] p-8 border border-transparent hover:border-cyan-200 transition-all">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[10px] font-bold text-cyan-600 bg-cyan-100/50 px-2 py-1 rounded uppercase tracking-widest">r/solotravel</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Static Decay</span>
          </div>
          
          <blockquote className="text-gray-700 italic text-sm leading-relaxed mb-8 border-l-2 border-slate-200 pl-4">
            "I planned everything, but when the weather changed, half my plans were useless. The app didn't help me adapt."
          </blockquote>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Systemic Solution</h4>
            <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
              <p className="text-xs font-bold text-gray-900 mb-1">Adaptive State Management</p>
              <p className="text-[11px] text-gray-500 leading-normal">
                Maintains a safety net for spontaneity by calculating re-routes when weather or energy shifts.
              </p>
            </div>
          </div>
        </div>

        {/* Case 03: Real-Time Latency */}
        <div className="group bg-slate-50 rounded-[2rem] p-8 border border-transparent hover:border-emerald-200 transition-all">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100/50 px-2 py-1 rounded uppercase tracking-widest">r/travelhacks</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-Time Latency</span>
          </div>
          
          <blockquote className="text-gray-700 italic text-sm leading-relaxed mb-8 border-l-2 border-slate-200 pl-4">
            "I need a tool that adapts when trains are delayed or closures happen. Real travel is messy and unpredictable."
          </blockquote>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Systemic Solution</h4>
            <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
              <p className="text-xs font-bold text-gray-900 mb-1">Dynamic Optimization Engine</p>
              <p className="text-[11px] text-gray-500 leading-normal">
                Resilient ecosystem response that recalculates feasibility signals with &lt;140ms latency.
              </p>
            </div>
          </div>
        </div>

      </div>
      
      {/* Proof Point Meta */}
      <div className="mt-12 flex justify-center items-center gap-8 py-4 border-y border-gray-50">
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 tracking-tighter group-hover:text-cyan-600 transition-colors">64%</div>
          <div className="text-[11px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.25em]">Fragmentation Risk</div>
        </div>
        <div className="w-px h-8 bg-gray-100" />
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 tracking-tighter group-hover:text-cyan-600 transition-colors">58%</div>
          <div className="text-[11px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.25em]">Static Plan Decay</div>
        </div>
      </div>
    </div>
  </div>
</section>


<section id="outcomes-launch" className="bg-slate-50 py-24 border-t border-gray-100" aria-label="Launch and Testing Strategy">
  <div className="container mx-auto px-6">
    <div className="max-max-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
          Launch & Validation Strategy
        </h2>
        <p className="text-gray-500 max-w-xl text-md italic">
          Moving from theoretical logic to real-world reliability through high-fidelity stress testing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* The Metrics Table */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Success Metrics (KPIs)</h4>
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-slate-50 pb-4">
              <div>
                <p className="text-sm font-bold text-slate-900">Flexibility Score</p>
                <p className="text-[11px] text-slate-500">Autonomous resolution of schedule conflicts.</p>
              </div>
              <div className="text-xl font-mono font-bold text-amber-600">Target: 85%</div>
            </div>
            <div className="flex justify-between items-end border-b border-slate-50 pb-4">
              <div>
                <p className="text-sm font-bold text-slate-900">Adaptive Accuracy</p>
                <p className="text-[11px] text-slate-500">Re-routing alignment with human intent.</p>
              </div>
              <div className="text-xl font-mono font-bold text-cyan-600">Target: 92%</div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm font-bold text-slate-900">Constraint Latency</p>
                <p className="text-[11px] text-slate-500">Time to calculate environmental pivot.</p>
              </div>
              <div className="text-xl font-mono font-bold text-emerald-600">&lt;140ms</div>
            </div>
          </div>
        </div>

        {/* Beta Tracks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 bg-white rounded-2xl border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center mb-4">
              <Activity className="text-white w-4 h-4" />
            </div>
            <h5 className="text-sm font-bold text-slate-900 mb-2 tracking-tight">Track A: Algorithmic Stress</h5>
            <p className="text-xs text-slate-500 leading-relaxed">
              Testing the "Scenario Logic" against extreme multi-constraint environments (e.g., flight delays + storm + low battery).
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-2xl border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center mb-4">
              <UserCircle2 className="text-white w-4 h-4" />
            </div>
            <h5 className="text-sm font-bold text-slate-900 mb-2 tracking-tight">Track B: Human Intent</h5>
            <p className="text-xs text-slate-500 leading-relaxed">
              Closed beta focusing on qualitative satisfaction: does the "Smart Pivot" feel helpful or intrusive?
            </p>
          </div>
        </div>

      </div>

      {/* Deployment Note */}
      <div className="mt-12 flex items-center gap-4 px-6 py-4 bg-amber-50/50 rounded-2xl border border-amber-100/50">
        <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
        <p className="text-[11px] font-bold text-amber-800 uppercase tracking-widest">
          Current Status: Phase 1 Closed Beta Enrollment Open for System Stabilization
        </p>
      </div>

    </div>
  </div>
</section>

          <section id="learnings-next" className="bg-white py-24 border-t border-gray-50" aria-label="Technical Learnings and Strategic Insights">
  <div className="container mx-auto px-6">
    <div className="max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
          Strategic Learnings & Matrix
        </h2>
        <p className="text-gray-500 max-w-2xl text-lg">
          The development of CATDS revealed critical insights into the "Trust Gap" of AI in travel. These findings shaped the final middleware architecture.
        </p>
      </div>

      {/* Learnings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Learning 01: Human-Centered Logic */}
        <div className="flex flex-col h-full bg-slate-50 rounded-[2.5rem] p-10 border border-transparent hover:border-amber-200 transition-all">
          <div className="mb-8">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
              <UserCheck className="text-amber-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 italic leading-tight">Curated Pivots over Full Automation</h3>
          </div>
          
          <div className="flex-1 space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              Users don't want the system to decide for them; they want the system to <strong className="text-gray-900 font-bold">narrow the chaos</strong>. 
            </p>
            <div className="p-4 bg-white/60 rounded-xl border border-white">
              <p className="text-[11px] font-bold text-amber-700 uppercase tracking-widest mb-1">Key Insight</p>
              <p className="text-xs text-gray-800 italic">"Trust peaks when the system provides 2-3 viable alternatives with explainability."</p>
            </div>
          </div>
        </div>

        {/* Learning 02: The API Gap */}
        <div className="flex flex-col h-full bg-slate-50 rounded-[2.5rem] p-10 border border-transparent hover:border-cyan-200 transition-all">
          <div className="mb-8">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
              <Zap className="text-cyan-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 italic leading-tight">Bridging the API Impedance Mismatch</h3>
          </div>
          
          <div className="flex-1 space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              Legacy travel APIs are static. CATDS solves this by building a custom abstraction layer that translates <strong className="text-gray-900 font-bold">Static Bookings into Streaming Events</strong>.
            </p>
            <div className="p-4 bg-white/60 rounded-xl border border-white">
              <p className="text-[11px] font-bold text-cyan-700 uppercase tracking-widest mb-1">Architectural Solve</p>
              <p className="text-xs text-gray-800 italic">Moving from transactional ACID logic to event-driven context streams.</p>
            </div>
          </div>
        </div>

        {/* Learning 03: Interoperability */}
        <div className="flex flex-col h-full bg-slate-50 rounded-[2.5rem] p-10 border border-transparent hover:border-emerald-200 transition-all">
          <div className="mb-8">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
              <Link2 className="text-emerald-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 italic leading-tight">Tools as Connective Tissue</h3>
          </div>
          
          <div className="flex-1 space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              Travelers aren't looking for a "better" app; they are looking for <strong className="text-gray-900 font-bold">interoperability</strong>. Systems must act as a connective tissue between disparate data sources.
            </p>
            <div className="p-4 bg-white/60 rounded-xl border border-white">
              <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest mb-1">Strategic Shift</p>
              <p className="text-xs text-gray-800 italic">The value is in the 'Unified Logic' layer, not the siloed interface.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Final Outcome Summary */}
      <div className="mt-16 bg-slate-900 rounded-[2.5rem] p-10 md:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="shrink-0">
             <div className="text-5xl font-bold text-amber-400 leading-none">01</div>
             <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500/60 mt-2">Core Conclusion</div>
          </div>
          <div className="flex-1">
            <h4 className="text-2xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
              Context is the Engine, Trust is the Fuel.
            </h4>
            <p className="text-slate-400 leading-relaxed max-w-2xl">
              By building an environmental sensing layer that handles the "logistical sanity check," I reduced cognitive load—shifting the system from a static itinerary to a <strong className="text-white">living decision-support ecosystem</strong> that maintains user agency through every pivot.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<section id="prototyping-ai" className="bg-white py-24 border-t border-gray-100" aria-label="Build Status and Evolution Path">
  <div className="container mx-auto px-6">
    <div className="max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
            System Maturity & Build Status
          </h2>
          <p className="text-gray-500 max-w-xl text-md">
            Normalizing heterogeneous data streams into a unified context model. Currently moving from Core Framework to Experimental Middleware.
          </p>
        </div>
        <div className="px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Phase 2: Logic Integration</span>
        </div>
      </div>

      {/* Build Status Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Foundation Column */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Operational Foundation</h4>
          
          <div className="group flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
            <div>
              <p className="text-sm font-bold text-slate-900">Architectural Framework</p>
              <p className="text-[11px] text-slate-500">Context-aware state management core</p>
            </div>
            <span className="text-[9px] font-bold bg-slate-900 text-white px-2 py-1 rounded uppercase">Active</span>
          </div>

          <div className="group flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
            <div>
              <p className="text-sm font-bold text-slate-900">Itinerary Schema</p>
              <p className="text-[11px] text-slate-500">Non-linear data structures for fluid planning</p>
            </div>
            <span className="text-[9px] font-bold bg-slate-900 text-white px-2 py-1 rounded uppercase">Active</span>
          </div>

          <div className="group flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
            <div>
              <p className="text-sm font-bold text-slate-900">Gate Logic</p>
              <p className="text-[11px] text-slate-500">Temporal and geographical constraint triggers</p>
            </div>
            <span className="text-[9px] font-bold bg-slate-900 text-white px-2 py-1 rounded uppercase">Active</span>
          </div>
        </div>

        {/* Experimental Column */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-bold text-amber-600 uppercase tracking-[0.2em] mb-6">Experimental Middleware</h4>
          
          <div className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-amber-100 shadow-sm transition-all">
            <div>
              <p className="text-sm font-bold text-slate-900">Adaptive Re-routing</p>
              <p className="text-[11px] text-slate-500">Real-time 'Plan B' algorithmic generation</p>
            </div>
            <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded uppercase">Testing</span>
          </div>

          <div className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-amber-100 shadow-sm transition-all">
            <div>
              <p className="text-sm font-bold text-slate-900">Contextual Sentiment</p>
              <p className="text-[11px] text-slate-500">User energy/mood integration in suggestions</p>
            </div>
            <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded uppercase">Testing</span>
          </div>

          <div className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-amber-100 shadow-sm transition-all">
            <div>
              <p className="text-sm font-bold text-slate-900">Constraint Fusion</p>
              <p className="text-[11px] text-slate-500">Simultaneous multi-stream data processing</p>
            </div>
            <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded uppercase">Testing</span>
          </div>
        </div>
      </div>

      {/* Milestone Callout */}
      <div className="mt-12 p-8 bg-slate-900 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shrink-0">
             <Target className="text-white w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1">Next Milestone</p>
            <p className="text-sm text-white font-medium">Predictive Constraints: Solving friction before it occurs.</p>
          </div>
        </div>
        <div className="h-px w-full sm:h-8 sm:w-px bg-slate-700" />
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Integration Goal</p>
            <p className="text-sm text-white font-medium">Hyper-Local APIs: Deep-linking localized transit & events.</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<section className="bg-white py-24 border-t border-gray-50" aria-label="The Horizon: Future Roadmap">
  <div className="container mx-auto px-6">
    <div className="max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
          The Horizon: V1.0 & Beyond
        </h2>
        <p className="text-gray-500 max-w-2xl text-lg">
          Evolving CATDS from a reactive middleware to a predictive, multi-platform standard for recommendation provenance.
        </p>
      </div>

      {/* Roadmap Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Step 01: Modular SDK */}
        <div className="relative group">
          <div className="absolute -top-4 left-6 px-3 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full z-10">
            Phase 01
          </div>
          <div className="h-full bg-slate-50 rounded-[2rem] p-8 pt-12 border border-transparent hover:border-amber-200 transition-all flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Modular SDK Expansion</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-8 flex-1">
              Exposing decision vectors and trust signals via a modular SDK to help platforms like <strong className="text-gray-900">Expedia or Airbnb</strong> transform static itineraries into context-aware experiences without a complete rebuild.
            </p>
            <div className="flex items-center gap-2 text-amber-600 font-bold text-[10px] uppercase tracking-wider">
              <Share2 size={14} />
              <span>Cross-Platform Integration</span>
            </div>
          </div>
        </div>

        {/* Step 02: Predictive Logistics */}
        <div className="relative group">
          <div className="absolute -top-4 left-6 px-3 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full z-10">
            Phase 02
          </div>
          <div className="h-full bg-slate-50 rounded-[2rem] p-8 pt-12 border border-transparent hover:border-cyan-200 transition-all flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Predictive Logistics</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-8 flex-1">
              Moving toward <strong className="text-gray-900">Anticipatory Pivot Detection</strong>—anticipating logistics failures (delays, weather, closures) before they occur to proactively pivot the traveler’s day.
            </p>
            <div className="flex items-center gap-2 text-cyan-600 font-bold text-[10px] uppercase tracking-wider">
              <Compass size={14} />
              <span>Proactive State Management</span>
            </div>
          </div>
        </div>

        {/* Step 03: Liability Shield */}
        <div className="relative group">
          <div className="absolute -top-4 left-6 px-3 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full z-10">
            Phase 03
          </div>
          <div className="h-full bg-slate-50 rounded-[2rem] p-8 pt-12 border border-transparent hover:border-emerald-200 transition-all flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-4">The "Liability Shield"</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-8 flex-1">
              Establishing a cross-platform standard for <strong className="text-gray-900">Verified AI Reasoning</strong>. This reduces the noise and risk of outdated travel data decay globally through a shared provenance layer.
            </p>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-wider">
              <ShieldCheck size={14} />
              <span>Industry Standardization</span>
            </div>
          </div>
        </div>

      </div>

      {/* Final Call to Action / Project Conclusion */}
      <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h4 className="text-lg font-bold text-gray-900">Designing the future of Travel Intelligence.</h4>
          <p className="text-sm text-gray-500">Currently seeking opportunities to scale Context-Aware Systems.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-95">
            View System Demo
          </button>
          <button className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all active:scale-95">
            Contact Designer
          </button>
        </div>
      </div>

    </div>
  </div>
</section>

        </>
      )}
      {isLocalExperienceFinder && (
        <>
          {/* Research & Market Fit Section */}
          <section id="research-market-fit" className="bg-white py-24 border-t border-gray-50" aria-label="Research & Market Fit">
            <div className="container mx-auto px-6">
              <div className="max-w-7xl mx-auto">
                
                {/* Section Header */}
                <div className="mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    The Privacy-Discovery Paradox
                  </h2>
                  <p className="text-gray-500 max-w-2xl text-lg">
                    Travelers currently face a binary choice: full visibility for discovery or complete isolation for privacy.
                  </p>
                </div>

                {/* 3-Paradox Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                  
                  {/* Card 01: Superficiality vs. Identity */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 border border-indigo-100">
                      <Users className="text-indigo-600 w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">Paradox 01</span>
                      <h3 className="font-bold text-gray-900 italic">Superficiality vs. Identity</h3>
                    </div>
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold mb-4">
                        82% Authenticity Gap
                      </span>
                    </div>
                    <blockquote className="text-gray-700 italic text-sm leading-relaxed mb-4 border-l-2 border-gray-200 pl-4">
                      "Existing networks feel superficial for travel"
                    </blockquote>
                    <div className="mt-6 pt-6 border-t border-gray-50">
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Solution</h4>
                      <p className="text-xs font-bold text-gray-900 mb-1">Travel DNA & Verified Expertise</p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Prioritizing Travel DNA and verified 2nd-degree expertise to surface authentic, identity-focused connections beyond superficial matching.
                      </p>
                    </div>
                  </motion.div>

                  {/* Card 02: Discovery Blindness */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 border border-purple-100">
                      <Eye className="text-purple-600 w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2 py-0.5 rounded">Paradox 02</span>
                      <h3 className="font-bold text-gray-900 italic">Discovery Blindness</h3>
                    </div>
                    <blockquote className="text-gray-700 italic text-sm leading-relaxed mb-4 border-l-2 border-gray-200 pl-4">
                      "Lack of intent-based discovery signals"
                    </blockquote>
                    <div className="mt-6 pt-6 border-t border-gray-50">
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Solution</h4>
                      <p className="text-xs font-bold text-gray-900 mb-1">Proactive Graph Mapping</p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        A proactive graph mapping <strong className="text-gray-700">People → Places → Intent</strong>, enabling autonomous discovery of high-value opportunities without manual search.
                      </p>
                    </div>
                  </motion.div>

                  {/* Card 03: The Privacy Binary */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 border border-indigo-100">
                      <Shield className="text-indigo-600 w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">Paradox 03</span>
                      <h3 className="font-bold text-gray-900 italic">The Privacy Binary</h3>
                    </div>
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold mb-4">
                        73% Isolation Gap
                      </span>
                    </div>
                    <blockquote className="text-gray-700 italic text-sm leading-relaxed mb-4 border-l-2 border-gray-200 pl-4">
                      "Current UX is binary (Public vs. Private)"
                    </blockquote>
                    <div className="mt-6 pt-6 border-t border-gray-50">
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Solution</h4>
                      <p className="text-xs font-bold text-gray-900 mb-1">Zero-Knowledge Discovery</p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Proof of presence/expertise is shared, but precise GPS coordinates remain <strong className="text-gray-700">encrypted until a mutual match is confirmed</strong>. Zero-Knowledge proofs build trust through cryptographic validation rather than data transparency.
                      </p>
                    </div>
                  </motion.div>

                </div>

                <div className="mt-12 max-w-3xl">
                  <p className="text-sm text-gray-500 leading-relaxed italic border-l-2 border-sky-200 pl-6">
                    <strong className="text-gray-900 font-bold not-italic">Design Intent:</strong> The Privacy-Discovery Paradox highlights the fundamental tension between connection and privacy in travel networks. By addressing superficiality through Travel DNA verification, discovery blindness through proactive graph mapping, and the privacy binary through zero-knowledge proofs, the system enables <span className="text-gray-900 font-semibold">authentic connection without sacrificing privacy sovereignty</span>.
                  </p>
                </div>

              </div>
            </div>
          </section>

          {/* The Expertise Gap Section */}
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
                    The Expertise Gap
                  </h2>
                  
                </div>
                
                <div className="space-y-8">
                  {/* Signal 82%: The Authenticity Gap */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-indigo-100 hover:border-indigo-200 transition-all duration-300">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold">
                          Signal 82%
                        </span>
                        <h4 className="text-xl font-bold text-gray-900">The Authenticity Gap</h4>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-base mb-6">
                        Travelers want local/expert advice but find traditional forums <strong className="text-gray-900">"unvetted" and high-noise</strong>. The challenge isn't finding information—it's finding <strong className="text-gray-900">trustworthy expertise</strong> within their extended network.
                      </p>
                      
                      {/* System Requirement Card */}
                      <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200 mb-6">
                        <div className="flex items-start gap-3 mb-3">
                          <ShieldCheck className="text-indigo-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="text-sm font-bold text-indigo-900 mb-2 uppercase tracking-wider">System Requirement</h5>
                            <p className="text-sm text-gray-800 leading-relaxed">
                              Leverage the <strong className="text-indigo-900">"Social Graph"</strong> to provide a Trust-Layer—ensuring every connection is <strong className="text-indigo-900">1st or 2nd degree</strong>.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* User Voice Card */}
                      <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-xl p-6 border-2 border-slate-200">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                            <Users className="text-indigo-600 w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800 italic leading-relaxed text-base md:text-lg mb-2">
                              "I've been to 40 countries, but I have no way to see which of my friends' friends need help with my favorite spots."
                            </p>
                            <cite className="text-sm text-gray-500 not-italic font-medium">— Expert Traveler</cite>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* System Overview Section */}
          <section id="trust-layer" className="py-20 md:py-32 bg-zinc-950 relative">
            
            <div className="container mx-auto px-6">
              <div className="max-w-7xl mx-auto">
              
                {/* Section Header */}
                <div className="mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.1]">
                  The Trust Layer: Logic Gates & Validation Firewall
                </h2>
                <p className="text-gray-400 text-lg max-w-3xl mx-auto text-balance mb-8">
                  The Trust Layer acts as the system's validation firewall, processing raw social data through three sequential logic gates before surfacing a recommendation. Security-as-UX: Algorithmic integrity ensures privacy-preserving discovery.
                </p>
                </div>
                
                {/* Trust Layer Logic Gates */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-6 mb-16">
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
                    <p className="text-gray-400 text-base max-w-3xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>A cohesive flow from raw friend-of-a-friend connections to trusted travel mentorship through three sequential validation gates</p>
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
                    
                    {/* Main Flow: Three-Column Layout with Logic Gates */}
                    <div className="relative z-10">
                      {/* Connection Lines - Desktop Only */}
                      <div className="hidden lg:block absolute inset-0 pointer-events-none">
                        {/* Line 1: L1 → L2 */}
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
                            <div className="h-0.5 w-32 bg-gradient-to-r from-indigo-400/50 to-purple-400/50"></div>
                            <ArrowRight className="w-5 h-5 text-purple-400" />
                          </motion.div>
                        </div>
                        
                        {/* Line 2: L2 → L3 */}
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
                            <div className="h-0.5 w-32 bg-gradient-to-r from-purple-400/50 to-emerald-400/50"></div>
                            <ArrowRight className="w-5 h-5 text-emerald-400" />
                          </motion.div>
                        </div>
                      </div>
                      
                      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start mb-12 relative">
                        
                        {/* Column 1: L1 - The Proximity Gate (Input) */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                          className="lg:col-span-1"
                        >
                          <div className="relative">
                            {/* Gate Header */}
                            <div className="flex items-center gap-3 mb-6">
                              <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center border border-indigo-400/30">
                                <span className="text-indigo-400 font-bold text-lg">L1</span>
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-white">The Proximity Gate</h4>
                                <p className="text-xs text-gray-400">Input Filter</p>
                              </div>
                            </div>
                            
                            {/* Social Graph Visualization */}
                            <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border-2 border-indigo-500/40 rounded-3xl p-6 shadow-2xl mb-4">
                              {/* Graph Nodes */}
                              <div className="relative h-48 flex items-center justify-center">
                                {/* Center Node (User) */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                  <div className="w-12 h-12 bg-indigo-500 rounded-full border-2 border-indigo-300 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-white" />
                                  </div>
                                </div>
                                
                                {/* 1st Degree Connections */}
                                {[
                                  { angle: 0, distance: 60 },
                                  { angle: 120, distance: 60 },
                                  { angle: 240, distance: 60 }
                                ].map((node, i) => {
                                  const x = Math.cos((node.angle * Math.PI) / 180) * node.distance;
                                  const y = Math.sin((node.angle * Math.PI) / 180) * node.distance;
                                  return (
                                    <div
                                      key={i}
                                      className="absolute"
                                      style={{
                                        left: `calc(50% + ${x}px)`,
                                        top: `calc(50% + ${y}px)`,
                                        transform: 'translate(-50%, -50%)'
                                      }}
                                    >
                                      <div className="w-8 h-8 bg-emerald-500/60 rounded-full border-2 border-emerald-300"></div>
                                    </div>
                                  );
                                })}
                                
                                {/* 2nd Degree Connections (filtered) */}
                                {[
                                  { angle: 60, distance: 90 },
                                  { angle: 180, distance: 90 },
                                  { angle: 300, distance: 90 }
                                ].map((node, i) => {
                                  const x = Math.cos((node.angle * Math.PI) / 180) * node.distance;
                                  const y = Math.sin((node.angle * Math.PI) / 180) * node.distance;
                                  return (
                                    <div
                                      key={i}
                                      className="absolute"
                                      style={{
                                        left: `calc(50% + ${x}px)`,
                                        top: `calc(50% + ${y}px)`,
                                        transform: 'translate(-50%, -50%)'
                                      }}
                                    >
                                      <div className="w-6 h-6 bg-slate-600/40 rounded-full border border-slate-500/50"></div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            
                            {/* Gate Description */}
                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                              <p className="text-sm text-slate-300 leading-relaxed">
                                Prioritizing <strong className="text-white">1st & 2nd-degree connections</strong> using <code className="text-indigo-400 font-mono text-xs bg-slate-900/50 px-1.5 py-0.5 rounded">$1/d^2$</code>
                              </p>
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Column 2: L2 - The Verification Gate (Processing) */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="lg:col-span-1"
                        >
                          <div className="relative">
                            {/* Gate Header */}
                            <div className="flex items-center gap-3 mb-6">
                              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-400/30">
                                <span className="text-purple-400 font-bold text-lg">L2</span>
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-white">The Verification Gate</h4>
                                <p className="text-xs text-gray-400">Processing</p>
                              </div>
                            </div>
                            
                            {/* Expertise Data with Shield */}
                            <div className="bg-gradient-to-br from-purple-900/30 via-slate-900/90 to-purple-900/30 backdrop-blur-xl border-2 border-purple-500/50 rounded-3xl p-6 shadow-2xl mb-4 relative">
                              {/* Expertise Data Card */}
                              <div className="bg-slate-800/60 rounded-xl p-4 mb-4">
                                <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Expertise Telemetry</div>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-300">Countries Visited</span>
                                    <span className="text-purple-300 font-bold">40</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-300">Verified Locations</span>
                                    <span className="text-purple-300 font-bold">127</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-300">Timestamp Range</span>
                                    <span className="text-purple-300 font-mono text-xs">2015-2024</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Pulsing Shield Icon */}
                              <div className="absolute top-4 right-4">
                                <motion.div
                                  animate={{
                                    scale: [1, 1.15, 1],
                                    opacity: [0.7, 1, 0.7],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                  className="relative"
                                >
                                  <Shield className="w-8 h-8 text-purple-400 relative z-10" />
                                  <div className="absolute inset-0 bg-purple-400/30 blur-md rounded-full"></div>
                                </motion.div>
                              </div>
                              
                              <div className="text-center pt-2">
                                <span className="text-xs text-purple-300 font-mono">ZK-Proof Validated</span>
                              </div>
                            </div>
                            
                            {/* Gate Description */}
                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                              <p className="text-sm text-slate-300 leading-relaxed">
                                <strong className="text-white">ZK-Proof Expertise Validation.</strong> Verifying <strong className="text-white">40-country telemetry</strong> without data exfiltration.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Column 3: L3 - The Contextual Gate (Output) */}
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          className="lg:col-span-1"
                        >
                          <div className="relative">
                            {/* Gate Header */}
                            <div className="flex items-center gap-3 mb-6">
                              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-400/30">
                                <span className="text-emerald-400 font-bold text-lg">L3</span>
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-white">The Contextual Gate</h4>
                                <p className="text-xs text-gray-400">Output</p>
                              </div>
                            </div>
                            
                            {/* Istanbul Mentorship Card */}
                            <div className="bg-gradient-to-br from-emerald-900/30 via-slate-900/90 to-emerald-900/30 backdrop-blur-xl border-2 border-emerald-500/50 rounded-3xl p-6 shadow-2xl" style={{ maxWidth: '320px', margin: '0 auto' }}>
                              {/* Card Header */}
                              <div className="flex items-center gap-2 mb-4">
                                <CheckCircle className="w-5 h-5 text-emerald-400" />
                                <h5 className="text-white font-semibold text-sm">Verified Mentorship: Istanbul</h5>
                              </div>
                              
                              {/* Badges */}
                              <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-2">
                                  <span className="px-3 py-1.5 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-xs font-semibold text-indigo-300">2 Mutual Friends</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="px-3 py-1.5 bg-purple-500/20 border border-purple-400/30 rounded-full text-xs font-semibold text-purple-300">ZK-Verified Expert</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="px-3 py-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-semibold text-emerald-300">92% Style Match</span>
                                </div>
                              </div>
                              
                              {/* Travel DNA Match Info */}
                              <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700">
                                <div className="text-xs text-gray-400 mb-1">Travel DNA Alignment</div>
                                <div className="flex flex-wrap gap-2">
                                  <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded">Photography</span>
                                  <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded">Slow Travel</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Gate Description */}
                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mt-4 space-y-4">
                              <p className="text-sm text-slate-300 leading-relaxed">
                                <strong className="text-white">NLP Persona Alignment.</strong> Matching 'Travel DNA' vectors (Photography vs. Luxury).
                              </p>
                              
                              {/* Influence Scorer Formula */}
                              <div className="pt-4 border-t border-slate-700">
                                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 font-mono">
                                  <div className="text-sm text-emerald-400 mb-3 text-center">
                                    <span className="text-emerald-400">I</span> = (<span className="text-emerald-300">w</span><sub className="text-emerald-300">₁</sub> · <span className="text-emerald-300">T</span>) + (<span className="text-emerald-300">w</span><sub className="text-emerald-300">₂</sub> · <span className="text-emerald-300">R</span>) + (<span className="text-emerald-300">w</span><sub className="text-emerald-300">₃</sub> · <span className="text-emerald-300">S</span>)
                                  </div>
                                  
                                  {/* Legend Mapping */}
                                  <div className="space-y-2 text-xs mt-4">
                                    <div className="flex items-start gap-2">
                                      <span className="text-emerald-400 font-bold">T</span>
                                      <span className="text-slate-400">(Trust Strength): Density of mutual high-trust nodes</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <span className="text-emerald-400 font-bold">R</span>
                                      <span className="text-slate-400">(Recency): Temporal decay function (Ensures data &lt;18 months old)</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <span className="text-emerald-400 font-bold">S</span>
                                      <span className="text-slate-400">(Sentiment): LLM-driven alignment of source's style vs. user's preferences</span>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Technical Note */}
                                <p className="text-xs text-slate-500 mt-3 italic leading-relaxed">
                                  <strong className="text-slate-400 not-italic">Relative Ranking:</strong> The score is uniquely calculated for the observer, not the object—prioritizing personal trust density over static global ratings.
                                </p>
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
                        <div className="text-slate-400 text-sm mb-4">
                          <span className="text-purple-400">M</span><sub className="text-purple-300">connection</sub> = (<span className="text-indigo-400">I</span><sub className="text-indigo-300">A</sub> ∩ <span className="text-indigo-400">I</span><sub className="text-indigo-300">B</sub>) × (<span className="text-indigo-400">P</span><sub className="text-indigo-300">A</sub> · <span className="text-indigo-400">P</span><sub className="text-indigo-300">B</sub>) × <span className="text-emerald-400">vouch(n)</span>
                        </div>
                        
                        {/* Variable Key */}
                        <div className="border-t border-slate-700/50 pt-3 mt-3 space-y-2 text-xs">
                          <div className="text-slate-500 uppercase tracking-wider mb-2">Variable Key</div>
                          <div className="flex items-start gap-2">
                            <span className="text-indigo-400 font-bold">I</span>
                            <span className="text-slate-400">(Influence): Travel DNA similarity & vector alignment</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-indigo-400 font-bold">P</span>
                            <span className="text-slate-400">(Proximity): Temporal location overlap & intent matching</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">V</span>
                            <span className="text-slate-400">(Vouch): Degrees of separation weighted by the social graph</span>
                          </div>
                        </div>
                        
                        <div className="text-emerald-400 text-sm mt-4">
                          [SUCCESS] High-trust mentorship connection established: Score 0.92
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* System Architect Note */}
          <section className="py-20 bg-slate-900/50 border-t border-slate-800">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl border-2 border-amber-500/30 p-8 md:p-10 shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center border border-amber-500/30">
                      <span className="text-amber-400 font-bold text-lg">⚡</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-amber-400 font-mono text-xs uppercase tracking-widest mb-2">Architectural Trade-off: Graph vs. SQL</div>
                      <p className="text-white text-base leading-relaxed">
                        Traditional SQL fails at real-time Multi-Hop trust verification. This system utilizes a graph-traversal architecture to maintain <strong className="text-amber-400">&lt;140ms latency</strong> across 3rd-degree connection lookups.
                      </p>
                    </div>
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
                          The Social Graph utilizes <strong className="text-emerald-400">Index-Free Adjacency</strong>. Each node (Traveler) stores a direct physical pointer to its neighbors (Friends/Interests).
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
                            <p className="text-gray-300 mt-1">I implemented <strong className="text-white">Breadth-First Search (BFS) Capping</strong> and <strong className="text-white">Graph Partitioning</strong> to ensure that one "Influencer" doesn't bottleneck the entire network's performance.</p>
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


          {/* Journey: Autonomous Discovery Flow */}
          <section id="journey-dna" className="py-24 bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-6">
              <div className="max-w-7xl mx-auto">
                
                {/* Section Header */}
                <div className="mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Journey: Autonomous Discovery Flow
                  </h2>
                  <p className="text-slate-400 max-w-2xl text-lg">
                    How 40-country expertise triggers a notification for a friend-of-a-friend: from passive data to active intelligence
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                  
                  {/* Left Column: Travel DNA Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-1"
                  >
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                      <div className="text-indigo-400 font-mono text-xs uppercase tracking-[0.3em] mb-4">DNA Extraction</div>
                      <h3 className="text-xl font-bold text-white mb-4">Travel DNA: Beyond the Itinerary</h3>
                      <p className="text-slate-300 text-sm leading-relaxed mb-4">
                        Converting trip telemetry (duration, pace, location type) into a <strong className="text-white">'Travel DNA' vector</strong>.
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 mt-4">
                        <div className="text-xs text-slate-400 mb-2">Example:</div>
                        <div className="text-sm text-emerald-300 font-semibold">
                          Converting <strong className="text-white">40-country history</strong> into an <strong className="text-white">Expert-Explorer</strong> vector
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Columns: Vertical Journey Timeline */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    {/* Step 1: Ambient Signals */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="relative"
                    >
                      <div className="flex items-start gap-6">
                        {/* Timeline Indicator */}
                        <div className="flex-shrink-0 relative">
                          <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center border border-indigo-400/30">
                            <span className="text-indigo-400 font-bold text-lg">01</span>
                          </div>
                          <div className="absolute left-1/2 top-12 -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-indigo-400/30 to-emerald-400/30"></div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                          <div className="text-indigo-400 font-mono text-xs uppercase tracking-wider mb-2">System State: Ambient</div>
                          <h4 className="text-lg font-bold text-white mb-3">Ambient Signals</h4>
                          <p className="text-slate-300 text-sm leading-relaxed">
                            System monitors <strong className="text-white">proximity</strong> and <strong className="text-white">trust graph signals</strong> (1st, 2nd, 3rd degree) in the background. No user action required.
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Step 2: Reciprocal Matching */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="relative"
                    >
                      <div className="flex items-start gap-6">
                        {/* Timeline Indicator */}
                        <div className="flex-shrink-0 relative">
                          <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-400/30">
                            <span className="text-emerald-400 font-bold text-lg">02</span>
                          </div>
                          <div className="absolute left-1/2 top-12 -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-emerald-400/30 to-purple-400/30"></div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                          <div className="text-emerald-400 font-mono text-xs uppercase tracking-wider mb-2">System State: Logic</div>
                          <h4 className="text-lg font-bold text-white mb-3">Reciprocal Matching</h4>
                          <p className="text-slate-300 text-sm leading-relaxed mb-4">
                            AI cross-references <strong className="text-white">'Past Expertise'</strong> with <strong className="text-white">'Network Intent'</strong>.
                          </p>
                          <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                            <div className="text-xs text-slate-400">Example:</div>
                            <div className="text-sm text-emerald-300 font-semibold mt-1">
                              <strong className="text-white">11 connections</strong> wanting to visit your past destinations
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Step 3: Proactive Output */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <div className="flex items-start gap-6">
                        {/* Timeline Indicator */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-400/30">
                            <span className="text-purple-400 font-bold text-lg">03</span>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-4">
                            <div className="text-purple-400 font-mono text-xs uppercase tracking-wider mb-2">System State: Proactive Output</div>
                            <h4 className="text-lg font-bold text-white mb-4">Proactive Notification</h4>
                            
                            {/* UI Notification Mockup */}
                            <div className="bg-gradient-to-br from-purple-900/30 via-slate-900/90 to-emerald-900/30 backdrop-blur-xl border-2 border-purple-500/50 rounded-2xl p-6 shadow-xl max-w-sm mx-auto">
                              <div className="flex items-center gap-2 mb-4">
                                <CheckCircle className="w-5 h-5 text-purple-400" />
                                <h5 className="text-white font-semibold text-sm">High-Trust Mentor Match</h5>
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <div className="text-xs text-purple-300 mb-1">Istanbul</div>
                                  <div className="text-sm text-white font-semibold">2 verified connections planning</div>
                                </div>
                                <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700">
                                  <div className="text-xs text-slate-400 mb-1">Share insights?</div>
                                  <div className="flex gap-2">
                                    <button className="flex-1 px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 text-purple-300 text-xs font-semibold rounded-lg transition-colors">
                                      Accept
                                    </button>
                                    <button className="flex-1 px-3 py-2 bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600/30 text-slate-300 text-xs font-semibold rounded-lg transition-colors">
                                      Later
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Logic Note */}
                          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
                            <p className="text-xs text-slate-400 leading-relaxed italic">
                              <strong className="text-slate-300 not-italic">Dynamic Vibe Alignment:</strong> Travel DNA is not static; it evolves as users add new telemetry, ensuring matches reflect current exploration styles.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                  </div>
                </div>

              </div>
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
                    Development workflow and technical architecture details will be documented as the system build evolves.
                  </p>
                </div>

              </motion.div>
            </div>
          </section>

          {/* 08 Ecosystem Impact: The Value Exchange */}
          <section id="ecosystem-impact" className="bg-white py-24 border-t border-gray-50" aria-label="Ecosystem Impact: The Value Exchange">
            <div className="container mx-auto px-6">
              <div className="max-w-7xl mx-auto">
                
                {/* Section Header */}
                <div className="mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Ecosystem Impact: The Value Exchange
                  </h2>
                  <p className="text-gray-500 max-w-2xl text-lg">
                    Social impact as a direct byproduct of the system's technical architecture
                  </p>
                </div>

                {/* 3-Impact Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                  
                  {/* Card 01: Traveler Sovereignty & Trust */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 border border-amber-100">
                      <Users className="text-amber-600 w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded">Impact 01</span>
                      <h3 className="font-bold text-gray-900 italic">Traveler Sovereignty</h3>
                    </div>
                    <blockquote className="text-gray-700 italic text-sm leading-relaxed mb-4 border-l-2 border-gray-200 pl-4">
                      Reducing 'Stranger Danger' Cognitive Load
                    </blockquote>
                    <div className="mt-6 pt-6 border-t border-gray-50">
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Outcome</h4>
                      <p className="text-xs font-bold text-gray-900 mb-1">Multi-degree (FofF) Validation</p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Connections via Travel DNA vs. Proximity. Authentic connections triggered by shared identity signals rather than raw geographic proximity.
                      </p>
                    </div>
                  </motion.div>

                  {/* Card 02: Community Equilibrium */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6 border border-cyan-100">
                      <Globe className="text-cyan-600 w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest bg-cyan-50 px-2 py-0.5 rounded">Impact 02</span>
                      <h3 className="font-bold text-gray-900 italic">Community Equilibrium</h3>
                    </div>
                    <blockquote className="text-gray-700 italic text-sm leading-relaxed mb-4 border-l-2 border-gray-200 pl-4">
                      Mitigating 'Tourist Swarming'
                    </blockquote>
                    <div className="mt-6 pt-6 border-t border-gray-50">
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Outcome</h4>
                      <p className="text-xs font-bold text-gray-900 mb-1">Intent-based Discovery</p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Equitable benefit distribution. Facilitates meaningful cultural exchange and distributes tourism benefits more equitably across local communities.
                      </p>
                    </div>
                  </motion.div>

                  {/* Card 03: Terminal Stats */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 border border-emerald-100">
                      <TrendingUp className="text-emerald-600 w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">Metrics</span>
                      <h3 className="font-bold text-gray-900 italic">System Performance</h3>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-50 space-y-4">
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-1">Trust Confidence</div>
                        <div className="text-3xl font-bold text-emerald-700 font-mono">99.2%</div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="text-[10px] font-bold text-cyan-700 uppercase tracking-widest mb-1">Coordination Tax</div>
                        <div className="text-3xl font-bold text-cyan-700 font-mono">-65%</div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="text-[10px] font-bold text-purple-700 uppercase tracking-widest mb-1">Signal Density</div>
                        <div className="text-3xl font-bold text-purple-700 font-mono">+4.2x</div>
                      </div>
                    </div>
                  </motion.div>

                </div>

                <div className="mt-12 max-w-3xl">
                  <p className="text-sm text-gray-500 leading-relaxed italic border-l-2 border-sky-200 pl-6">
                    <strong className="text-gray-900 font-bold not-italic">Design Intent:</strong> The ecosystem impact demonstrates how technical architecture directly enables social value—traveler sovereignty through multi-degree validation, community equilibrium through intent-based discovery, and measurable system performance metrics—showing that <span className="text-gray-900 font-semibold">technical decisions create social outcomes</span>.
                  </p>
                </div>

              </div>
            </div>
          </section>

          {/* 11 Validation & Scale */}
          <section id="validation-scale" className="py-24 bg-white border-t border-gray-50">
            <div className="container mx-auto px-6">
              <div className="max-w-7xl mx-auto">
                
                {/* Section Header */}
                <div className="mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Validation & Scale
                  </h2>
                  <p className="text-gray-500 max-w-2xl text-lg">
                    Beta focus on identity matching & privacy satisfaction
                  </p>
                </div>

                {/* 3-Validation Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                  
                  {/* Launch Strategy */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 border border-amber-100">
                      <FaLightbulb className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded">Beta 01</span>
                      <h3 className="font-bold text-gray-900 italic">Launch Strategy</h3>
                    </div>
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-amber-700 mb-2">Beta</div>
                      <p className="text-sm text-gray-600">Focus on identity matching & privacy satisfaction</p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-50">
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Closed beta testing with gradual rollout based on connection quality metrics and user satisfaction with privacy controls.
                      </p>
                    </div>
                  </motion.div>

                  {/* Identity Matching Accuracy */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100">
                      <FaFingerprint className="w-6 h-6 text-slate-600" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded">Metric 01</span>
                      <h3 className="font-bold text-gray-900 italic">Identity Matching Accuracy</h3>
                    </div>
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-slate-700 mb-2">[01]</div>
                      <p className="text-sm text-gray-600">Travel DNA signal alignment precision</p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-50">
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Measuring precision of Travel DNA signal alignment and multi-degree trust validation accuracy through controlled beta testing scenarios.
                      </p>
                    </div>
                  </motion.div>

                  {/* Privacy Control Granularity */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 border border-emerald-100">
                      <FaShieldAlt className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">Metric 02</span>
                      <h3 className="font-bold text-gray-900 italic">Privacy Control Granularity</h3>
                    </div>
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-emerald-700 mb-2">[02]</div>
                      <p className="text-sm text-gray-600">User satisfaction with privacy controls</p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-50">
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Validating user satisfaction with privacy control granularity and zero-knowledge proof transparency through user feedback and system metrics.
                      </p>
                    </div>
                  </motion.div>

                </div>

                <div className="mt-12 max-w-3xl">
                  <p className="text-sm text-gray-500 leading-relaxed italic border-l-2 border-sky-200 pl-6">
                    <strong className="text-gray-900 font-bold not-italic">Design Intent:</strong> Beta validation focuses on identity matching accuracy and privacy control granularity—ensuring <span className="text-gray-900 font-semibold">trust through precision</span> rather than transparency, and user satisfaction through granular control rather than binary privacy choices.
                  </p>
                </div>

              </div>
            </div>
          </section>

          {/* 09 Strategic Learnings: The Privacy-Discovery Equilibrium */}
          <section id="strategic-learnings" className="bg-white py-24 border-t border-gray-50" aria-label="Strategic Learnings: The Privacy-Discovery Equilibrium">
            <div className="container mx-auto px-6">
              <div className="max-w-7xl mx-auto">
                
                {/* Section Header */}
                <div className="mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Strategic Learnings: The Privacy-Discovery Equilibrium
                  </h2>
                  <p className="text-gray-500 max-w-2xl text-lg">
                    Core architectural principles that emerged from building privacy-first social discovery
                  </p>
                </div>

                {/* Three-Stack Learning Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Learning 01: Architectural Privacy */}
                  <div className="flex flex-col h-full bg-slate-50 rounded-[2.5rem] p-10 border border-transparent hover:border-indigo-200 transition-all">
                    <div className="mb-8">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                        <Shield className="text-indigo-600 w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 italic leading-tight">Architectural Privacy</h3>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Privacy as a core constraint, not a toggle... enforcement happens at the data layer.
                      </p>
                      <div className="p-4 bg-white/60 rounded-xl border border-white">
                        <p className="text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-1">Implementation</p>
                        <p className="text-xs text-gray-800 italic">Privacy-by-Design means privacy enforcement happens at the data layer, not as a UI afterthought. The system must enable discovery through network effects while maintaining zero-knowledge proof concepts—building privacy into the core architecture from the ground up.</p>
                      </div>
                    </div>
                  </div>

                  {/* Learning 02: Transparency of Logic */}
                  <div className="flex flex-col h-full bg-slate-50 rounded-[2.5rem] p-10 border border-transparent hover:border-cyan-200 transition-all">
                    <div className="mb-8">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                        <Eye className="text-cyan-600 w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 italic leading-tight">Transparency of Logic</h3>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Explaining the 'Why' behind the match... Technical matching ≠ human connection.
                      </p>
                      <div className="p-4 bg-white/60 rounded-xl border border-white">
                        <p className="text-[11px] font-bold text-cyan-700 uppercase tracking-widest mb-1">Implementation</p>
                        <p className="text-xs text-gray-800 italic">The system must explain the social graph path (e.g., "Connected through 2 mutual friends who share your travel style") and identity signal alignment, not just present a match. Technical matching ≠ human connection without accessible attribution.</p>
                      </div>
                    </div>
                  </div>

                  {/* Learning 03: Identity Abstraction */}
                  <div className="flex flex-col h-full bg-slate-50 rounded-[2.5rem] p-10 border border-transparent hover:border-emerald-200 transition-all">
                    <div className="mb-8">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                        <Fingerprint className="text-emerald-600 w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 italic leading-tight">Identity Abstraction</h3>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Translating raw data into identity signals... shifting from logistical to identity vectors.
                      </p>
                      <div className="p-4 bg-white/60 rounded-xl border border-white">
                        <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest mb-1">Implementation</p>
                        <p className="text-xs text-gray-800 italic">The system must account for "Identity Signals" (shared values, travel style, cultural engagement depth) over "Logistical Signals" (same city, similar age). Building abstraction layers that translate profile data into identity vectors while maintaining privacy boundaries—enabling discovery through shared identity rather than raw geographic proximity.</p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </section>

          {/* 10 The Horizon */}
          <section id="the-horizon" className="py-20 bg-slate-900">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    The Horizon
                  </h2>
                  <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                    Roadmap for scaling privacy-first social discovery across travel platforms
                  </p>
                </div>

                <div className="space-y-8 mb-12">
                  {/* Phase 1 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/30">
                        1
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">Phase 1: Ephemeral Coordination</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">
                          Real-time group formation for solo travelers. The system enables real-time meetup facilitation, allowing travelers to form temporary groups based on shared intent and identity alignment, without requiring extensive pre-planning or long-term commitment.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Phase 2 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/30">
                        2
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">Phase 2: Lifetime Journey Graphs</h3>
                        <p className="text-gray-300 leading-relaxed">
                          Persistent social capital across destinations. Moving from "Trip-Specific" to "Journey-Long" social graphs—maintaining traveler networks over months or years, understanding that connections made in one location might be valuable in future destinations.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Phase 3 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/30">
                        3
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">Phase 3: Trust-Layered Transactions</h3>
                        <p className="text-gray-300 leading-relaxed">
                          Deep OTA/Booking API integration for verified group coordination. Connecting the Trust Layer directly to OTA (Online Travel Agency) APIs for seamless, verified group bookings, enabling verified group coordination at the point of booking.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

              </motion.div>
            </div>
          </section>

          {/* Final Project Thesis */}
          <section className="py-24 bg-white border-t border-gray-50">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4 text-slate-900">Project Thesis</p>
                  <blockquote className="text-3xl font-semibold italic" style={{ fontFamily: "serif" }}>
                    <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                      The future of private social discovery lies in architectural privacy—where identity signals enable authentic connections without data exposure, and trust validation becomes infrastructure, not an afterthought.
                    </span>
                  </blockquote>
                </motion.div>
              </div>
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
          <section id="wireframes-ui" className="py-24 bg-[#0a0a0a] overflow-x-hidden">
            <div className="container mx-auto px-6">
              <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="mb-20 text-center lg:text-left">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Design Evolution
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-2xl [text-wrap:pretty]">
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
              </div>
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
          

          {/* [04] The Narrative Engine: Emotional Arc Orchestration */}
          <section id="narrative-engine" className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <div className="max-w-7xl mx-auto">
                
                {/* Header & Technical Spec */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-16"
                >
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      The Narrative Engine
                    </h2>
                    <div className="text-[10px] font-mono text-amber-600 uppercase tracking-wider font-bold">
                      [SYSTEM_MODE: DYNAMIC_NARRATIVE_GENERATION]
                    </div>
                  </div>

                  {/* Technical Spec Block - Terminal Style */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-xl"
                    style={{
                      boxShadow: '0 0 20px rgba(251, 191, 36, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
                      <div>
                        <div className="text-gray-400 text-[10px] mb-2 uppercase tracking-wider">Arc Intensity Function</div>
                        <div className="text-amber-400 text-sm leading-relaxed">
                          Arc<sub className="text-xs">intensity</sub> = f(Phase, E<sub className="text-xs">state</sub>)
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-[10px] mb-2 uppercase tracking-wider">Emotional State</div>
                        <div className="text-amber-400 text-sm leading-relaxed">
                          E<sub className="text-xs">state</sub> = ∑(Behavior + Physiological + Sentiment)
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* The Logic Gates: Horizontal 3-Stage Pipeline */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative mb-16">
                  {/* Connecting Line (Desktop Only) */}
                  <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gray-200 -translate-y-1/2 z-0" />

                  {/* Step 01: Input - Emotional Telemetry */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ y: -5 }}
                    className="relative z-10 bg-white border border-gray-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
                      <span className="text-blue-600 text-xs font-mono font-bold">01</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">Step 01</span>
                      <h3 className="font-bold text-gray-900 italic">Input</h3>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      Emotional Telemetry
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      System receives real-time signals: <strong className="text-gray-900">Behavior</strong> patterns, <strong className="text-gray-900">Bio-feedback</strong> (heart rate, movement), and inferred emotional state (anxiety, excitement, overwhelm, comfort).
                    </p>
                  </motion.div>

                  {/* Step 02: Processing - Narrative State Machine */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    whileHover={{ y: -5 }}
                    className="relative z-10 bg-white border border-gray-200 p-8 rounded-[2rem] shadow-lg shadow-gray-100/50 hover:shadow-xl transition-shadow ring-1 ring-purple-500/10"
                  >
                    <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 border border-purple-100">
                      <span className="text-purple-600 text-xs font-mono font-bold">02</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2 py-0.5 rounded">Step 02</span>
                      <h3 className="font-bold text-gray-900 italic">Processing</h3>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      Narrative State Machine
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Engine maps emotional tone to narrative phase. If tone indicates overwhelm, system loops back to <strong className="text-gray-900">Familiarity anchors</strong>. If tone indicates readiness, advances to <strong className="text-gray-900">Exploration</strong>.
                    </p>
                  </motion.div>

                  {/* Step 03: Output - Experience Beats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    whileHover={{ y: -5 }}
                    className="relative z-10 bg-white border border-gray-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 border border-amber-100">
                      <span className="text-amber-600 text-xs font-mono font-bold">03</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded">Step 03</span>
                      <h3 className="font-bold text-gray-900 italic">Output</h3>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      Experience Beats
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      System generates <strong className="text-gray-900">non-linear storytelling beats</strong> (not schedules) that match the current phase. Each beat emphasizes emotional resonance over checklist completion.
                    </p>
                  </motion.div>
                </div>

                {/* The State Matrix: Phases & Constraints (3-Column Grid) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
                  {/* Column 1: Phase 01 - Arrival */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-xl p-8 border border-blue-200/30"
                  >
                    <div className="text-[10px] font-mono text-blue-600 uppercase tracking-wider mb-3 font-bold">Phase 01</div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      Arrival
                    </h4>
                    <div className="mb-4">
                      <div className="text-xs font-mono text-gray-500 mb-1">Metric:</div>
                      <div className="text-sm text-gray-700 font-medium">High Novelty / High Anxiety</div>
                    </div>
                    
                    {/* Constraint A nested inside */}
                    <div className="pt-4 border-t border-blue-200/50 mt-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-[10px] font-mono text-amber-600 uppercase tracking-wider font-bold">[CONSTRAINT_A]</div>
                        <div className="h-[1px] flex-grow bg-blue-200/50" />
                      </div>
                      <h5 className="text-sm font-bold text-gray-900 mb-2">Information Scarcity</h5>
                      <p className="text-xs text-gray-600 leading-relaxed mb-4">
                        The system deliberately withholds "check-off" lists to force presence.
                      </p>
                      <div className="space-y-1.5">
                        <div className="text-xs font-mono text-blue-600">NO_MAPS</div>
                        <div className="text-xs font-mono text-blue-600">NO_SCHEDULES</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Column 2: Phase 02 - Exploration */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-xl p-8 border border-purple-200/30"
                  >
                    <div className="text-[10px] font-mono text-purple-600 uppercase tracking-wider mb-3 font-bold">Phase 02</div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      Exploration
                    </h4>
                    <div className="mb-4">
                      <div className="text-xs font-mono text-gray-500 mb-1">Metric:</div>
                      <div className="text-sm text-gray-700 font-medium">Variable Novelty / Adaptive Comfort</div>
                    </div>
                    
                    {/* Constraint B nested inside */}
                    <div className="pt-4 border-t border-purple-200/50 mt-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-[10px] font-mono text-cyan-600 uppercase tracking-wider font-bold">[CONSTRAINT_B]</div>
                        <div className="h-[1px] flex-grow bg-purple-200/50" />
                      </div>
                      <h5 className="text-sm font-bold text-gray-900 mb-2">Temporal Elasticity</h5>
                      <p className="text-xs text-gray-600 leading-relaxed mb-4">
                        Narrative beats stretch or shrink based on traveler's comfort level.
                      </p>
                      <div className="space-y-1.5">
                        <div className="text-xs font-mono text-purple-600">BEAT_EXPANSION</div>
                        <div className="text-xs font-mono text-purple-600">REAL_TIME_PACING</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Column 3: Phase 03 - Familiarity */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-xl p-8 border border-amber-200/30"
                  >
                    <div className="text-[10px] font-mono text-amber-600 uppercase tracking-wider mb-3 font-bold">Phase 03</div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      Familiarity
                    </h4>
                    <div className="mb-4">
                      <div className="text-xs font-mono text-gray-500 mb-1">Metric:</div>
                      <div className="text-sm text-gray-700 font-medium">Low Novelty / High Comfort</div>
                    </div>
                    
                    {/* Constraint C nested inside */}
                    <div className="pt-4 border-t border-amber-200/50 mt-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-[10px] font-mono text-purple-600 uppercase tracking-wider font-bold">[CONSTRAINT_C]</div>
                        <div className="h-[1px] flex-grow bg-amber-200/50" />
                      </div>
                      <h5 className="text-sm font-bold text-gray-900 mb-2">Non-Linearity</h5>
                      <p className="text-xs text-gray-600 leading-relaxed mb-4">
                        System allows "loops"—returning to comfort if emotional tone dips.
                      </p>
                      <div className="space-y-1.5">
                        <div className="text-xs font-mono text-amber-600">REVERSE_TRANSITIONS</div>
                        <div className="text-xs font-mono text-amber-600">FAMILIARITY_ANCHORS</div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* The Visual Output: 3-Day Emotional Arc */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-gray-50 rounded-xl p-8 border border-gray-200 overflow-hidden"
                >
                  <div className="text-[10px] font-mono text-amber-600 uppercase tracking-wider mb-4 font-bold text-center">3-Day Emotional Arc Visualization</div>
                  <div className="relative w-full">
                    <EmotionalArcGraph />
                  </div>
                </motion.div>

              </div>
            </div>
          </section>

          {/* [02] Interface Logic: Presence over Coverage */}
          <section id="interface-logic" className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Design Evolution: From Latent Nodes to Active Story Beats
                  </h2>
                  <p className="text-gray-900 text-lg max-w-3xl mx-auto" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
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
                        <p className="text-sm md:text-xs text-gray-100 text-center leading-relaxed">
                          {narrativeEvolutionLevel === 1 && (
                            <><strong className="text-amber-400 not-italic">System Logic:</strong> Real-time API Logistics. The Spontaneity Engine processes Latent Nodes (POI data, distance, hours) into actionable routing information.</>
                          )}
                          {narrativeEvolutionLevel === 2 && (
                            <><strong className="text-violet-200 not-italic">Augmentation:</strong> Injecting Intent & Mystery. The Narrative Layer overlays story prompts onto logistics data, transforming waypoints into objectives.</>
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

          {/* [05] Adaptive Re-Anchoring: The Recovery Journey */}
          <section id="adaptive-re-anchoring" className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      Adaptive Re-Anchoring: The Recovery Journey
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
                      The system prioritizes emotional safety over narrative progression.
                    </p>
                  </motion.div>

                  {/* Vertical State Transition Timeline */}
                  <div className="relative max-w-4xl mx-auto overflow-hidden" style={{ touchAction: 'pan-y' }}>
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-200 via-purple-200 to-emerald-200" />

                    <div className="space-y-8 md:space-y-12">
                      {/* State 1: Overwhelm Detected */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative pl-12 md:pl-20"
                      >
                        {/* Timeline Dot */}
                        <div className="absolute left-2 md:left-6 top-6 w-4 h-4 bg-red-500 rounded-full border-4 border-white shadow-lg z-10" />
                        
                        <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="text-[10px] font-mono text-red-600 uppercase tracking-wider font-bold">State 1</div>
                            <div className="h-[1px] flex-grow bg-red-200" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                            Overwhelm Detected
                          </h3>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            Traveler is in "Exploration" phase, navigating a high-density urban environment. Emotional tone signals: overwhelm, anxiety, sensory overload.
                          </p>
                          <div className="bg-white rounded-lg p-4 border border-red-100">
                            <div className="text-xs font-mono text-red-600 mb-2">Threshold Breach:</div>
                            <div className="text-sm font-mono text-gray-700">
                              Anxiety &gt; 0.85<br />
                              Comfort Level: 0.25<br />
                              Phase: "exploration"
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* State 2: Soft Pivot */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative pl-12 md:pl-20"
                      >
                        {/* Timeline Dot */}
                        <div className="absolute left-2 md:left-6 top-6 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-lg z-10" />
                        
                        <div className="bg-purple-50 rounded-2xl p-8 border border-purple-200">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="text-[10px] font-mono text-purple-600 uppercase tracking-wider font-bold">State 2</div>
                            <div className="h-[1px] flex-grow bg-purple-200" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                            Soft Pivot: Adaptive Narrative Shift
                          </h3>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            Rather than breaking the narrative to show a map, the system identifies a "Familiarity Node" (e.g., a bookstore or a quiet park) that aligns with the current "Emotional Arc."
                          </p>
                          <div className="bg-white rounded-lg p-4 border border-purple-100">
                            <div className="text-xs font-mono text-purple-600 mb-2">Narrative Shift:</div>
                            <div className="text-sm text-gray-700 italic mb-2">
                              "Discover the hidden alleys" → "Find the silence in the stacks"
                            </div>
                            <div className="text-xs text-gray-600">
                              Phase transition: exploration → familiarity<br />
                              Narrative coherence maintained
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* State 3: The Safety Valve */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative pl-12 md:pl-20"
                      >
                        {/* Timeline Dot */}
                        <div className="absolute left-2 md:left-6 top-6 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-lg z-10" />
                        
                        <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="text-[10px] font-mono text-emerald-600 uppercase tracking-wider font-bold">State 3</div>
                            <div className="h-[1px] flex-grow bg-emerald-200" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                            The Safety Valve: Hard Anchor / Map Override
                          </h3>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            If the Soft Pivot fails or anxiety persists, the Trust Layer forces a "Hard Anchor." It breaks the narrative arc to provide literal, high-legibility guidance.
                          </p>
                          <div className="bg-white rounded-lg p-4 border border-emerald-100">
                            <div className="text-xs font-mono text-emerald-600 mb-2">Hard Anchor Output:</div>
                            <div className="text-sm font-mono text-gray-700 mb-2">
                              Map Coordinate: 48.8566° N, 2.3522° E
                            </div>
                            <div className="text-sm text-gray-700">
                              "Walk 200m North to the Metro"
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* [06] Industry Skins: Same Engine, Different Soul */}
          <section id="industry-skins" className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-16 text-center"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Industry Skins: Same Engine, Different Soul
                  </h2>
                  <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
                    The Narrative-Driven Travel Experience Generator is a headless system. The core logic remains constant (Spontaneity Engine + Narrative Layer), but the Interface Layer adapts to different business sectors.
                  </p>
                </motion.div>

                {/* Multi-Column Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                  {/* Column 1: Luxury */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-amber-50 rounded-2xl p-8 border border-amber-200"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="text-[10px] font-mono text-amber-600 uppercase tracking-wider font-bold">Luxury</div>
                      <div className="h-[1px] flex-grow bg-amber-200" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      The Art of Anticipation
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                      Personalized invitations crafted with heritage and stillness. The system curates experiences that create belonging, not just destinations.
                    </p>
                    <div className="bg-white rounded-lg p-6 border border-amber-100 mb-4">
                      <div className="text-[10px] font-mono text-amber-600 uppercase tracking-wider mb-3 font-bold">Metric</div>
                      <div className="text-3xl font-bold text-amber-700 mb-2">Belonging Index</div>
                      <div className="text-2xl font-bold text-amber-700 mb-4">8.7/10</div>
                      <div className="h-3 bg-amber-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '87%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
                        />
                      </div>
                      <div className="text-xs text-gray-600 mt-3">
                        Based on emotional resonance, cultural depth, and personal alignment with travel DNA.
                      </div>
                    </div>
                    <div className="text-xs font-mono text-gray-500 space-y-1 mb-6">
                      <div>Focus: Belonging & Stillness</div>
                      <div>Interface: Personal Invitation</div>
                    </div>
                  </motion.div>

                  {/* Column 2: Creative */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-slate-900 rounded-2xl p-8 border border-slate-800"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">Creative</div>
                      <div className="h-[1px] flex-grow bg-slate-700" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      Creative Quest
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6 text-sm">
                      Spatial problem-solving for creative blocks. The system transforms location into inspiration, mapping brand guidelines onto real-world architecture.
                    </p>
                    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-4">
                      <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-3 font-bold">Metric</div>
                      <div className="text-3xl font-bold text-cyan-400 mb-2">Flow State</div>
                      <div className="text-2xl font-bold text-cyan-400 mb-4">78%</div>
                      <div className="h-3 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '78%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                        />
                      </div>
                      <div className="text-xs text-gray-400 mt-3">
                        Focus: Negative Space & Brand Guidelines
                      </div>
                    </div>
                    <div className="text-xs font-mono text-gray-500 space-y-1">
                      <div>Focus: Negative Space & Brand Guidelines</div>
                      <div>Interface: Creative Quest</div>
                    </div>
                  </motion.div>

                  {/* Column 3: Cultural */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-amber-50 rounded-2xl p-8 border border-amber-200"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="text-[10px] font-mono text-amber-600 uppercase tracking-wider font-bold">Cultural</div>
                      <div className="h-[1px] flex-grow bg-amber-200" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      The Living Archive
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                      Historical layers revealed through spatial audio and narrative footprints. The system connects present location to past events, creating depth of connection.
                    </p>
                    <div className="bg-white rounded-lg p-6 border border-amber-100 mb-4">
                      <div className="text-[10px] font-mono text-amber-600 uppercase tracking-wider mb-3 font-bold">Metric</div>
                      <div className="text-3xl font-bold text-amber-700 mb-2">Depth of Connection</div>
                      <div className="text-2xl font-bold text-amber-700 mb-4">9.2/10</div>
                      <div className="h-3 bg-amber-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '92%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-orange-400 to-amber-600"
                        />
                      </div>
                      <div className="text-xs text-gray-600 mt-3">
                        Focus: Spatial Audio & Historical Footprints
                      </div>
                    </div>
                    <div className="text-xs font-mono text-gray-500 space-y-1">
                      <div>Focus: Spatial Audio & Historical Footprints</div>
                      <div>Interface: Time-Traveler's Lens</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* [07] Strategic Outlook: The Horizon */}
          <section id="strategic-outlook" className="py-24 bg-white border-t border-gray-50">
            <div className="container mx-auto px-6">
              <div className="max-w-7xl mx-auto">
                
                {/* Section Header */}
                <div className="mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Strategic Outlook: The Horizon
                  </h2>
                  <p className="text-gray-500 max-w-2xl text-lg">
                    Strategic learnings and future roadmap for narrative-driven travel systems.
                  </p>
                </div>

                {/* Strategic Learnings */}
                <div className="mb-16">
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-6 text-center">
                    Strategic Learnings
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
                    {/* Learning 01 */}
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 border border-amber-100">
                        <Brain className="text-amber-600 w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded">Learning 01</span>
                        <h3 className="font-bold text-gray-900 italic">Narrative as Infrastructure</h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        The Narrative-Driven Travel Experience Generator demonstrates that narrative architecture can function as foundational infrastructure, not just decorative overlay. By embedding emotional arcs into the system's core logic, the architecture creates travel experiences that adapt to how travelers feel, not just where they are.
                      </p>
                    </motion.div>

                    {/* Learning 02 */}
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 border border-purple-100">
                        <Eye className="text-purple-600 w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2 py-0.5 rounded">Learning 02</span>
                        <h3 className="font-bold text-gray-900 italic">The Transparency of Mood</h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Rather than hiding emotional state detection behind black-box AI, the system makes mood transparent and actionable. By surfacing emotional tone metrics (anxiety, comfort, curiosity), travelers can understand why the system suggests certain experiences, building trust through transparency rather than opacity.
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Roadmap */}
                <div className="mb-16">
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-6 text-center">
                    Roadmap
                  </div>
                  <div className="relative max-w-4xl mx-auto">
                      {/* Vertical Timeline Line */}
                      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-200 via-purple-200 to-emerald-200 hidden md:block" />

                      <div className="space-y-6 md:space-y-12">
                        {/* Phase 01 */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                          className="relative pl-0 md:pl-20"
                        >
                          {/* Timeline Dot */}
                          <div className="absolute left-6 top-6 w-4 h-4 bg-amber-500 rounded-full border-4 border-white shadow-lg z-10 hidden md:block" />
                          
                          <button
                            onClick={() => {
                              const newSet = new Set(expandedRoadmapPhases);
                              if (newSet.has('phase01')) {
                                newSet.delete('phase01');
                              } else {
                                newSet.add('phase01');
                              }
                              setExpandedRoadmapPhases(newSet);
                            }}
                            className="w-full text-left bg-amber-50 rounded-2xl p-6 md:p-8 border border-amber-200 transition-all active:scale-[0.98] touch-manipulation"
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="text-[10px] font-mono text-amber-600 uppercase tracking-wider font-bold">Phase 01</div>
                                <div className="h-[1px] flex-grow bg-amber-200 hidden md:block" />
                              </div>
                              <div className="md:hidden">
                                {expandedRoadmapPhases.has('phase01') ? '−' : '+'}
                              </div>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                              Multi-modal Sentiment Analysis
                            </h3>
                            {/* Mobile: Collapsible */}
                            <div className="md:hidden">
                              {expandedRoadmapPhases.has('phase01') && (
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  Expand emotional tone detection beyond text and behavior to include voice patterns, facial expression analysis (with user consent), and environmental audio cues. This multi-modal approach creates a richer understanding of traveler emotional state, enabling more nuanced narrative adjustments.
                                </p>
                              )}
                            </div>
                            {/* Desktop: Always visible */}
                            <div className="hidden md:block">
                              <p className="text-gray-700 leading-relaxed">
                                Expand emotional tone detection beyond text and behavior to include voice patterns, facial expression analysis (with user consent), and environmental audio cues. This multi-modal approach creates a richer understanding of traveler emotional state, enabling more nuanced narrative adjustments.
                              </p>
                            </div>
                          </button>
                        </motion.div>

                        {/* Phase 02 */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                          className="relative pl-0 md:pl-20"
                        >
                          {/* Timeline Dot */}
                          <div className="absolute left-6 top-6 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-lg z-10 hidden md:block" />
                          
                          <button
                            onClick={() => {
                              const newSet = new Set(expandedRoadmapPhases);
                              if (newSet.has('phase02')) {
                                newSet.delete('phase02');
                              } else {
                                newSet.add('phase02');
                              }
                              setExpandedRoadmapPhases(newSet);
                            }}
                            className="w-full text-left bg-purple-50 rounded-2xl p-6 md:p-8 border border-purple-200 transition-all active:scale-[0.98] touch-manipulation"
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="text-[10px] font-mono text-purple-600 uppercase tracking-wider font-bold">Phase 02</div>
                                <div className="h-[1px] flex-grow bg-purple-200 hidden md:block" />
                              </div>
                              <div className="md:hidden">
                                {expandedRoadmapPhases.has('phase02') ? '−' : '+'}
                              </div>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                              Multi-traveler Arc Syncing
                            </h3>
                            {/* Mobile: Collapsible */}
                            <div className="md:hidden">
                              {expandedRoadmapPhases.has('phase02') && (
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  Enable multiple travelers to share synchronized narrative arcs. When traveling with companions, the system can detect when one traveler's emotional state affects the group, adjusting recommendations to maintain group cohesion while respecting individual emotional boundaries.
                                </p>
                              )}
                            </div>
                            {/* Desktop: Always visible */}
                            <div className="hidden md:block">
                              <p className="text-gray-700 leading-relaxed">
                                Enable multiple travelers to share synchronized narrative arcs. When traveling with companions, the system can detect when one traveler's emotional state affects the group, adjusting recommendations to maintain group cohesion while respecting individual emotional boundaries.
                              </p>
                            </div>
                          </button>
                        </motion.div>

                        {/* Phase 03 */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="relative pl-0 md:pl-20"
                        >
                          {/* Timeline Dot */}
                          <div className="absolute left-6 top-6 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-lg z-10 hidden md:block" />
                          
                          <button
                            onClick={() => {
                              const newSet = new Set(expandedRoadmapPhases);
                              if (newSet.has('phase03')) {
                                newSet.delete('phase03');
                              } else {
                                newSet.add('phase03');
                              }
                              setExpandedRoadmapPhases(newSet);
                            }}
                            className="w-full text-left bg-emerald-50 rounded-2xl p-6 md:p-8 border border-emerald-200 transition-all active:scale-[0.98] touch-manipulation"
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="text-[10px] font-mono text-emerald-600 uppercase tracking-wider font-bold">Phase 03</div>
                                <div className="h-[1px] flex-grow bg-emerald-200 hidden md:block" />
                              </div>
                              <div className="md:hidden">
                                {expandedRoadmapPhases.has('phase03') ? '−' : '+'}
                              </div>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                              Direct Bio-feedback Integration
                            </h3>
                            {/* Mobile: Collapsible */}
                            <div className="md:hidden">
                              {expandedRoadmapPhases.has('phase03') && (
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  Integrate wearable device data (heart rate variability, skin conductance) to create a direct feedback loop between physiological state and narrative engine. This enables real-time detection of stress, excitement, or calm, allowing the system to respond to physical reactions before they become conscious awareness.
                                </p>
                              )}
                            </div>
                            {/* Desktop: Always visible */}
                            <div className="hidden md:block">
                              <p className="text-gray-700 leading-relaxed">
                                Integrate wearable device data (heart rate variability, skin conductance) to create a direct feedback loop between physiological state and narrative engine. This enables real-time detection of stress, excitement, or calm, allowing the system to respond to physical reactions before they become conscious awareness.
                              </p>
                            </div>
                          </button>
                        </motion.div>
                      </div>
                    </div>
                </div>

                {/* Final Thesis Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="bg-slate-900 rounded-2xl p-12 border border-slate-800 text-center">
                    <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mb-6">
                      Final Thesis
                    </div>
                    <blockquote className="text-2xl md:text-3xl font-bold text-white leading-relaxed" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      "The future of travel lies in narrative-driven systems that prioritize how we feel over where we go."
                    </blockquote>
                  </div>
                </motion.div>

                <div className="mt-12 max-w-3xl">
                  <p className="text-sm text-gray-500 leading-relaxed italic border-l-2 border-sky-200 pl-6">
                    <strong className="text-gray-900 font-bold not-italic">Design Intent:</strong> The strategic outlook demonstrates that narrative architecture functions as foundational infrastructure, with transparent mood detection building trust through visibility—enabling travel systems that <span className="text-gray-900 font-semibold">prioritize how travelers feel over where they go</span>.
                  </p>
                </div>

              </div>
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

      {/* Validation & Scale Section - Only for Social Opportunity Matching */}
      {isSocialOpportunityMatching && (
        <section id="validation-scale" className="py-24 bg-white border-t border-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Section Header */}
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  Validation & Scale
                </h2>
                <p className="text-gray-500 max-w-2xl text-lg">
                  Measuring impact through knowledge exchange and reduced social friction
                </p>
              </div>

              {/* 3-Metric Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                
                {/* Knowledge Exchange Rate */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 border border-amber-100">
                    <FaBrain className="text-amber-600 w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded">Metric 01</span>
                    <h3 className="font-bold text-gray-900 italic">Knowledge Exchange Rate</h3>
                  </div>
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-amber-700 mb-2">87%</div>
                    <p className="text-sm text-gray-600">Matches resulting in top-rated insights</p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-50">
                    <p className="text-xs text-gray-500 leading-relaxed">
                      High-quality connections where travelers receive actionable local knowledge, verified through post-interaction ratings.
                    </p>
                  </div>
                </motion.div>

                {/* Social Friction Delta */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100">
                    <FaClock className="text-slate-600 w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded">Metric 02</span>
                    <h3 className="font-bold text-gray-900 italic">Social Friction Delta</h3>
                  </div>
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-slate-700 mb-2">-73%</div>
                    <p className="text-sm text-gray-600">Time saved vs. traditional apps</p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-50">
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Reduction in planning overhead compared to scheduled meetups, measured from initial signal to confirmed interaction.
                    </p>
                  </div>
                </motion.div>

                {/* Local Retention */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative z-10 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 border border-emerald-100">
                    <FaUserCircle className="text-emerald-600 w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">Metric 03</span>
                    <h3 className="font-bold text-gray-900 italic">Local Retention</h3>
                  </div>
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-emerald-700 mb-2">62%</div>
                    <p className="text-sm text-gray-600">Local guides returning for exchanges</p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-50">
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Verified locals who continue participating after initial interactions, indicating sustainable value exchange.
                    </p>
                  </div>
                </motion.div>

              </div>

              <div className="mt-12 max-w-3xl">
                <p className="text-sm text-gray-500 leading-relaxed italic border-l-2 border-sky-200 pl-6">
                  <strong className="text-gray-900 font-bold not-italic">Design Intent:</strong> These metrics validate the system's impact on knowledge exchange quality, social friction reduction, and local guide retention—demonstrating <span className="text-gray-900 font-semibold">sustainable value creation</span> through verified expertise matching.
                </p>
              </div>

            </div>
          </div>
        </section>
      )}



      {/* Conditional ordering: For context-aware-travel-decision-system (non-logic), show Product Surfaces first, then Project Navigation.
          For context-aware-travel-decision-system-logic, show Project Navigation first, then Product Surfaces. */}
      {projectId === 'context-aware-travel-decision-system' && !isContextAwareLogicPage ? (
        <>
          {/* Product Surfaces (The Glass) Navigation - Always show all 4 on every project page */}
          <section className="py-8 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 
                  className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 leading-[1.1] tracking-tight" 
                  style={{ 
                    fontFamily: "'tiempos-headline-regular', serif",
                  }}
                >
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-600">
                    Product Surfaces
                  </span>
                  <span className="text-lg md:text-xl block mt-1 font-medium text-slate-500 italic opacity-90">
                  (The UX & UI "Glass")
                  </span>
                </h3>
                  
                  {/* Product Surface Links - All 4 always shown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Context-Aware Decision System */}
                    <Link
                      href="/projects/travel-and-ai/projects/context-aware-travel-decision-system"
                      className="group flex flex-col p-5 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all duration-300 h-auto overflow-visible"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
                          <Smartphone className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                          Context-Aware Decision System
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">View Interface Design</span>
                    </Link>

                    {/* Social Opportunity Matching */}
                    <Link
                      href="/projects/travel-and-ai/projects/social-opportunity-matching-module"
                      className="group flex flex-col p-5 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all duration-300 h-auto overflow-visible"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
                          <Smartphone className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                          Social Opportunity Matching
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">View Interface Design</span>
                    </Link>

                    {/* Social Graph Network */}
                    <Link
                      href="/projects/travel-and-ai/projects/social-graph-driven-travel-network"
                      className="group flex flex-col p-5 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all duration-300 h-auto overflow-visible"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
                          <Smartphone className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                          Social Graph Network
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">View Interface Design</span>
                    </Link>

                    {/* Narrative Experience Generator */}
                    <Link
                      href="/projects/travel-and-ai/projects/narrative-driven-travel-experience-generator"
                      className="group flex flex-col p-5 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all duration-300 h-auto overflow-visible"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
                          <Smartphone className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                          Narrative Experience Generator
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">View Interface Design</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Project Navigation */}
          <ProjectNavigation currentProjectId={projectId} />
        </>
      ) : projectId === 'context-aware-travel-decision-system' && isContextAwareLogicPage ? (
        <>
          {/* Project Navigation - Show first for logic page */}
          <ProjectNavigation currentProjectId={projectId} />

          {/* Product Surfaces (The Glass) Navigation - Show second for logic page */}
          <section className="py-8 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 
                  className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 leading-[1.1] tracking-tight" 
                  style={{ 
                    fontFamily: "'tiempos-headline-regular', serif",
                  }}
                >
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-600">
                    Product Surfaces
                  </span>
                  <span className="text-lg md:text-xl block mt-1 font-medium text-slate-500 italic opacity-90">
                    (The "Glass")
                  </span>
                </h3>
                  
                  {/* Product Surface Links - All 4 always shown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Context-Aware Decision System */}
                    <Link
                      href="/projects/travel-and-ai/projects/context-aware-travel-decision-system"
                      className="group flex flex-col p-5 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all duration-300 h-auto overflow-visible"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
                          <Smartphone className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                          Context-Aware Decision System
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">View Interface Design</span>
                    </Link>

                    {/* Social Opportunity Matching */}
                    <Link
                      href="/projects/travel-and-ai/projects/social-opportunity-matching-module"
                      className="group flex flex-col p-5 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all duration-300 h-auto overflow-visible"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
                          <Smartphone className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                          Social Opportunity Matching
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">View Interface Design</span>
                    </Link>

                    {/* Social Graph Network */}
                    <Link
                      href="/projects/travel-and-ai/projects/social-graph-driven-travel-network"
                      className="group flex flex-col p-5 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all duration-300 h-auto overflow-visible"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
                          <Smartphone className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                          Social Graph Network
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">View Interface Design</span>
                    </Link>

                    {/* Narrative Experience Generator */}
                    <Link
                      href="/projects/travel-and-ai/projects/narrative-driven-travel-experience-generator"
                      className="group flex flex-col p-5 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all duration-300 h-auto overflow-visible"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
                          <Smartphone className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                          Narrative Experience Generator
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">View Interface Design</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Project Navigation */}
          <ProjectNavigation currentProjectId={projectId} />

          {/* Product Surfaces (The Glass) Navigation - Always show all 4 on every project page */}
          <section className="py-8 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 
                  className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 leading-[1.1] tracking-tight" 
                  style={{ 
                    fontFamily: "'tiempos-headline-regular', serif",
                  }}
                >
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-600">
                    Product Surfaces
                  </span>
                  <span className="text-lg md:text-xl block mt-1 font-medium text-slate-500 italic opacity-90">
                  (The UX & UI "Glass")
                  </span>
                </h3>
                  
                  {/* Product Surface Links - All 4 always shown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Context-Aware Decision System */}
                    <Link
                      href="/projects/travel-and-ai/projects/context-aware-travel-decision-system"
                      className="group flex flex-col p-5 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all duration-300 h-auto overflow-visible"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
                          <Smartphone className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                          Context-Aware Decision System
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">View Interface Design</span>
                    </Link>

                    {/* Social Opportunity Matching */}
                    <Link
                      href="/projects/travel-and-ai/projects/social-opportunity-matching-module"
                      className="group flex flex-col p-5 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all duration-300 h-auto overflow-visible"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
                          <Smartphone className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                          Social Opportunity Matching
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">View Interface Design</span>
                    </Link>

                    {/* Social Graph Network */}
                    <Link
                      href="/projects/travel-and-ai/projects/social-graph-driven-travel-network"
                      className="group flex flex-col p-5 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all duration-300 h-auto overflow-visible"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
                          <Smartphone className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                          Social Graph Network
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">View Interface Design</span>
                    </Link>

                    {/* Narrative Experience Generator */}
                    <Link
                      href="/projects/travel-and-ai/projects/narrative-driven-travel-experience-generator"
                      className="group flex flex-col p-5 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all duration-300 h-auto overflow-visible"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
                          <Smartphone className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                          Narrative Experience Generator
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">View Interface Design</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Product Surface Navigation Footer - Only for logic pages */}
      {projectId.endsWith('-logic') && (
        <section className="py-24 bg-gray-50 border-t border-gray-100" id="surface-navigation" aria-label="Product Surface Navigation">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  Explore Product Surfaces
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                  See how this logic translates into user-facing interfaces.
                </p>
              </div>

              {/* Product Surface Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Surface 01: Context-Aware Travel Decision System */}
                <Link
                  href="/projects/travel-and-ai/projects/context-aware-travel-decision-system"
                  className="group"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="h-auto bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow overflow-visible"
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
                      <Compass className="text-blue-600 w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">Surface 01</span>
                      <h3 className="font-bold text-gray-900 italic">Context-Aware Travel Decision System</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      Environmental sensing and adaptive routing interfaces
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                      <span>Explore Surface</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </Link>

                {/* Surface 02: Social Graph Driven Travel Network */}
                <Link
                  href="/projects/travel-and-ai/projects/social-graph-driven-travel-network"
                  className="group"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="h-auto bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow overflow-visible"
                  >
                    <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 border border-purple-100">
                      <Network className="text-purple-600 w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2 py-0.5 rounded">Surface 02</span>
                      <h3 className="font-bold text-gray-900 italic">Social Graph Driven Travel Network</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      Trust verification and connection interfaces
                    </p>
                    <div className="flex items-center gap-2 text-purple-600 font-medium text-sm group-hover:gap-3 transition-all">
                      <span>Explore Surface</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </Link>

                {/* Surface 03: Trust Framework AI Travel */}
                <Link
                  href="/projects/travel-and-ai/projects/trust-framework-ai-travel"
                  className="group"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="h-auto bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow overflow-visible"
                  >
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100">
                      <Shield className="text-slate-600 w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded">Surface 03</span>
                      <h3 className="font-bold text-gray-900 italic">Trust Framework AI Travel</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      Cryptographic verification and trust infrastructure
                    </p>
                    <div className="flex items-center gap-2 text-slate-600 font-medium text-sm group-hover:gap-3 transition-all">
                      <span>Explore Surface</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </Link>

                {/* Surface 04: Spontaneous Travel Companion */}
                <Link
                  href="/projects/travel-and-ai/projects/spontaneous-travel-companion"
                  className="group"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="h-auto bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow overflow-visible"
                  >
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 border border-emerald-100">
                      <Sparkles className="text-emerald-600 w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">Surface 04</span>
                      <h3 className="font-bold text-gray-900 italic">Spontaneous Travel Companion</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      AI-powered spontaneous travel planning and discovery
                    </p>
                    <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm group-hover:gap-3 transition-all">
                      <span>Explore Surface</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Back to Projects Link */}
      <section className="py-6 bg-white">
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
