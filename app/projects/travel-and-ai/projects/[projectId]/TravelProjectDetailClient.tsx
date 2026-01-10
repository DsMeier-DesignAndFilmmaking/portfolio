'use client';

import React, { useState, useEffect } from 'react';
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
import { Shield, CheckCircle, Sparkles, MapPin, Clock, Utensils } from 'lucide-react';

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
                  <p className="text-xs text-cyan-300/70 font-medium">{label}</p>
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
                className="text-xs font-semibold text-cyan-300 uppercase tracking-wider"
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
                <span className="text-xs font-semibold text-cyan-300">AI Verified</span>
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
              <h3 className="text-sm font-bold text-white mb-1">Santorini Retreat</h3>
              <p className="text-xs text-gray-400">Cultural & Historical Experience</p>
            </div>
            
            {/* Verification Details */}
            <div className="space-y-1.5 pt-2 border-t border-gray-700/50">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                <span className="text-xs text-gray-300">3 Verified Sources</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                <span className="text-xs text-gray-300">Updated 2 days ago</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Planning Assistant Visual Component - "The Intelligent Orchestrator"
const PlanningAssistantVisual = () => {
  const constraints = [
    { label: '$200/day', icon: Sparkles },
    { label: 'Vegetarian', icon: Utensils },
    { label: 'Hidden Gems', icon: MapPin },
    { label: 'Tokyo', icon: MapPin },
  ];

  const activities = [
    { time: 'Morning', title: 'Tsukiji Market', icon: MapPin },
    { time: 'Afternoon', title: 'TeamLab Borderless', icon: Sparkles },
    { time: 'Evening', title: 'Shibuya Sky', icon: Clock },
  ];

  return (
    <div className="relative w-full max-w-md aspect-[4/3] mx-auto">
      <div className="relative w-full h-full flex items-center justify-between px-2 md:px-4">
        {/* Left: Constraint Chips */}
        <div className="flex flex-col gap-3 w-1/4 items-start">
          {(Array.isArray(constraints) ? constraints : []).map((constraint, i) => {
            const Icon = constraint.icon;
            return (
              <motion.div
                key={constraint.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: [0, 15, 0],
                }}
                transition={{ 
                  opacity: {
                    duration: 0.6, 
                    delay: i * 0.15,
                  },
                  x: {
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5 + 0.6,
                    ease: 'easeInOut',
                  }
                }}
                className="relative"
              >
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-br from-violet-100/80 to-blue-100/80 dark:from-violet-900/40 dark:to-blue-900/40 backdrop-blur-sm rounded-lg border border-violet-200/50 dark:border-violet-700/50 shadow-sm">
                  <Icon className="w-3 h-3 text-violet-600 dark:text-violet-400" />
                  <span className="text-xs font-medium text-violet-700 dark:text-violet-300 whitespace-nowrap">
                    {constraint.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Center: Processing Unit */}
        <div className="relative w-1/3 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full h-[80%] bg-gradient-to-br from-violet-200/40 via-blue-200/30 to-violet-200/40 dark:from-violet-900/30 dark:via-blue-900/20 dark:to-violet-900/30 backdrop-blur-xl rounded-2xl border border-violet-300/40 dark:border-violet-700/40 shadow-lg overflow-hidden"
          >
            {/* Scanning Light Bar */}
            <motion.div
              animate={{
                y: ['0%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
              style={{ top: '-2px' }}
            />
            
            {/* Processing Indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
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
                className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400/40 to-blue-400/40 backdrop-blur-sm border border-violet-300/50 dark:border-violet-600/50 flex items-center justify-center"
              >
                <Sparkles className="w-8 h-8 text-violet-600 dark:text-violet-400" />
              </motion.div>
            </div>

            {/* Processing Label */}
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                Processing
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right: Activity Cards with Timeline */}
        <div className="flex flex-col gap-3 w-1/3 items-end relative">
          {/* Timeline Line */}
          <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-300/50 via-blue-300/50 to-violet-300/50 dark:from-violet-600/50 dark:via-blue-600/50 dark:to-violet-600/50" />
          
          {(Array.isArray(activities) ? activities : []).map((activity, i) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, x: 30, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  scale: 1,
                }}
                transition={{ 
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: 0.6 + i * 0.2,
                }}
                className="relative w-full pr-2"
              >
                {/* Timeline Dot */}
                <div className="absolute right-5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-violet-400 dark:bg-violet-500 border-2 border-white dark:border-gray-900 shadow-sm z-10" />
                
                {/* Activity Card */}
                <div className="bg-gradient-to-br from-white/90 to-violet-50/90 dark:from-gray-800/90 dark:to-violet-900/30 backdrop-blur-sm rounded-lg p-3 border border-violet-200/50 dark:border-violet-700/50 shadow-md">
                  <div className="flex items-start gap-2 mb-1.5">
                    <Icon className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-violet-700 dark:text-violet-300 uppercase tracking-wide">
                          {activity.time}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                        {activity.title}
                      </h4>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const TravelProjectDetailClient = ({ project, projectId }: TravelProjectDetailClientProps) => {
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
  
  // Check which project this is
  const isSpontaneousTravelCompanion = projectId === 'spontaneous-travel-companion';
  const isCulturalContextEngine = projectId === 'trust-framework-ai-travel';
  const isTravelPlanningAssistant = projectId === 'context-aware-travel-decision-system';
  const isLocalExperienceFinder = projectId === 'social-graph-driven-travel-network';
  const isNarrativeTravelGenerator = projectId === 'narrative-driven-travel-experience-generator';
  const isOtherProject = false; // All projects now have full implementations

  // Define sections for the sticky progress nav
  const sections = isNarrativeTravelGenerator
    ? [
        { id: 'narrative-architecture', label: 'Narrative Architecture' },
        { id: 'system-constraints', label: 'System Constraints' },
        { id: 'scenarios-failure', label: 'Scenarios & Failure Cases' },
        { id: 'success-case', label: 'Success Case' },
        { id: 'business-use', label: 'Business Use' }
      ]
    : [
        { id: 'design-exploration', label: 'Systemic Travel Discovery Failures' },
        { id: 'research-audience', label: 'Behavioral & Environmental Constraints' },
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
              <span className="text-sm font-medium">Back to Travel & AI</span>
            </button>
          </div>
        </div>
      </motion.nav>

    {/* Sticky Progress Navigation */}
    {(isSpontaneousTravelCompanion || isCulturalContextEngine || isLocalExperienceFinder || isTravelPlanningAssistant || isNarrativeTravelGenerator) && (
      <StickyProgressNav sections={sections} />
    )}

      {/* Hero Section */}
      <section className=" bg-white
        min-h-[80vh]
        flex items-center
        pt-20 pb-20" aria-label="Project Hero">
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
                  <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 md:mb-7 lg:mb-8 leading-tight tracking-tight">
                    Spontaneity Engine
              </h1>
                  <div className="mb-6 md:mb-7">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                      In Development
                    </span>
                  </div>
                  <p className="text-sm md:text-base lg:text-lg text-gray-500 mb-8 md:mb-10 lg:mb-12 leading-relaxed font-normal">
                    Foundational AI System · Real-Time Decision Intelligence
                  </p>
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      A foundational AI system designed to enable real-time, context-aware travel decisions — prioritizing action over planning.
                    </p>
                  </div>
                  <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4" aria-label="Hero actions">
                    <a
                      href="#design-exploration"
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        const target = document.querySelector('#design-exploration');
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
                      href="#prototyping-ai"
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        const target = document.querySelector('#prototyping-ai');
                        if (target) {
                          const offset = 120;
                          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                          window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className="inline-flex items-center justify-center px-6 py-3.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 min-h-[44px] text-center text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                      aria-label="Explore Working Prototype (Experimental)"
                    >
                      Explore Prototype <span className="ml-2 text-xs opacity-70 font-normal">(Experimental)</span>
                    </a>
                  </nav>
            </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                  className="order-2 lg:order-2 mt-8 md:mt-10 lg:mt-0 flex items-center justify-center lg:justify-start"
                >
                  <div className="relative flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                    <div className="relative flex-shrink-0">
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
                    <div className="relative flex-shrink-0 md:mt-8 lg:mt-12">
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
                  <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 md:mb-4 lg:mb-5 leading-tight tracking-tight">
                    The Spontaneity Engine: A Trust Framework for Real-Time Travel AI
                  </h1>
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                      Research & Development
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
                  <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 md:mb-7 lg:mb-8 leading-tight tracking-tight">
                    Context-Aware Travel Decision System (CATDS)
                  </h1>
                  <div className="mb-6 md:mb-7">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                      Research & Development
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

                  {/* System Stack Component */}
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <SystemStack stack={['Spontaneity Engine', 'Trust Layer', 'Context Interpreter']} />
                  </div>

                  {/* System Specs Grid */}
                  <div className="mb-8 md:mb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider opacity-70 mb-2">
                          Scenario
                        </div>
                        <div className="text-sm md:text-base text-gray-900 font-normal leading-relaxed">
                          90m free, unfamiliar city, low energy, high crowd.
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider opacity-70 mb-2">
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
        {isLocalExperienceFinder && (
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
                    Social Graph-Driven Travel Network
                  </h1>
                  <div className="mb-6 md:mb-7">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                      Research & Development
                    </span>
                  </div>
                  <p className="text-sm md:text-base lg:text-lg text-gray-500 mb-8 md:mb-10 lg:mb-12 leading-relaxed font-normal">
                    Social Networks · AI · Systems Design
                  </p>
                  
                  {/* Overview Block */}
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      To utilize existing social connections and trust hierarchies to filter and rank travel recommendations. This exists to demonstrate how the Trust Layer handles complex social data in a travel context.
                    </p>
                  </div>

                  {/* System Stack Component */}
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <SystemStack stack={['Social Graph API', 'Trust Layer', 'Influence Scorer']} />
                  </div>

                  {/* System Specs Grid */}
                  <div className="mb-8 md:mb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider opacity-70 mb-2">
                          Scenario
                        </div>
                        <div className="text-sm md:text-base text-gray-900 font-normal leading-relaxed">
                          Planning a group trip where "friend-of-a-friend" validation is more valuable than anonymous reviews.
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider opacity-70 mb-2">
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
                      View Figma Prototype <span className="ml-2 text-xs opacity-70 font-normal">(Video Demo)</span>
                    </a>
                  </nav>
                </motion.div>
                <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                  className="order-2 lg:order-2 mt-12 md:mt-16 lg:mt-0 flex items-center justify-center lg:justify-start"
                >
                  <div className="relative flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                  <div className="relative flex-shrink-0">
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
                    <div className="relative flex-shrink-0 md:mt-8 lg:mt-12">
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
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                      Research & Development
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

                  {/* System Stack Component */}
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <SystemStack stack={['Traveler Intent', 'Spontaneity Engine', 'Trust & Authenticity Layer', 'Narrative Engine', 'Experience Phases']} />
                  </div>

                  {/* System Specs Grid */}
                  <div className="mb-8 md:mb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider opacity-70 mb-2">
                          Scenario
                        </div>
                        <div className="text-sm md:text-base text-gray-900 font-normal leading-relaxed">
                          Designing for emotional arcs & belonging over coverage.
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider opacity-70 mb-2">
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
        {(isOtherProject || (!isSpontaneousTravelCompanion && !isCulturalContextEngine && !isTravelPlanningAssistant && !isLocalExperienceFinder && !isNarrativeTravelGenerator && !isOtherProject)) && (
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
                    Pattern-level breakdowns in how discovery platforms operate
                    </p>
                  </div>
                  
                <div className="space-y-8 md:space-y-10">
                    {/* Failure 1: Simulated Spontaneity */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:border-red-200 transition-all duration-300">
                      <div className="mb-4">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">Failure 1: Simulated Spontaneity</h4>
                        <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
                          Recommendation systems exhibit popularity bias, systematically favoring frequently-booked experiences and repeatable formats over situationally relevant alternatives, creating the appearance of discovery while reinforcing predictable patterns.
                        </p>
                        <p className="text-sm text-gray-500 italic">
                          Source: Frontiers in Big Data, Popularity Bias and Filter Bubbles in Recommender Systems, 2023
                        </p>
                      </div>
                    </div>

                    {/* Failure 2: Homogenized Cultural Discovery */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-orange-100 hover:border-orange-200 transition-all duration-300">
                      <div className="mb-4">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">Failure 2: Homogenized Cultural Discovery</h4>
                        <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
                          Recommender systems create filter bubbles and echo chambers by overemphasizing content aligned with users' previous interactions, limiting exposure to diverse destinations and experiences while amplifying homogenization effects across user populations.
                        </p>
                        <p className="text-sm text-gray-500 italic">
                          Source: Microsoft Research, Revisiting Popularity and Demographic Biases in Recommender Evaluation and Effectiveness, 2021
                        </p>
                      </div>
                    </div>
                    
                    {/* Failure 3: Static Recommendations in Dynamic Environments */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-100 hover:border-purple-200 transition-all duration-300">
                      <div className="mb-4">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">Failure 3: Static Recommendations in Dynamic Environments</h4>
                        <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
                          Traditional travel recommendation systems rely on static data and predefined user profiles, limiting their effectiveness in dynamic environments where real-time contextual factors such as weather, availability, and situational constraints significantly impact relevance.
                        </p>
                        <p className="text-sm text-gray-500 italic">
                          Source: MDPI Sensors, R2Tour Real-Time Context-Aware Tourism Recommendation System, 2023
                        </p>
                      </div>
                    </div>

                    {/* Failure 4: Overchoice Without Context */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-100 hover:border-blue-200 transition-all duration-300">
                      <div className="mb-4">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">Failure 4: Overchoice Without Context</h4>
                        <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
                          Discovery platforms present excessive options without sufficient contextual filtering, contributing to the paradox of choice where abundant options lead to decision fatigue, decreased satisfaction, and increased cognitive load during time-sensitive decision moments.
                        </p>
                        <p className="text-sm text-gray-500 italic">
                          Source: Annals of Tourism Research, Choice Overload and Decision Quality in Tourism, 2016
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 md:mt-12 text-center">
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                      These failures emerge from static, popularity-driven systems operating in dynamic, time-sensitive environments.
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
                      Spontaneous travel leads to <span className="font-semibold text-cyan-700">deeper connections with places and people</span>. It reduces the pressure of rigid planning and opens space for <span className="font-semibold text-cyan-700">unexpected moments that become the most memorable parts of a journey</span>.
                    </p>
                  </div>
                  
                  {/* Impact for Local Communities */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border-2 border-emerald-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
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
          <section className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden">
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
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.1]">
                    System Overview: How the Spontaneity Engine Works
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
                            <p className="text-gray-400 text-sm">{input.desc}</p>
                            
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
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                      >
                        {/* Animated SVG Core */}
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                          <svg
                            className="w-full h-full"
                            viewBox="0 0 320 320"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {/* Outer Ring - Rules & Constraints - Rotating */}
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
                                stroke="url(#outerGradient)"
                                strokeWidth="2"
                                strokeDasharray="8 4"
                                opacity="0.6"
                              />
                            </motion.g>
                            
                            {/* Middle Ring - Context Weighting */}
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
                                stroke="url(#middleGradient)"
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
                            
                            {/* Inner Nucleus - AI Logic */}
                            <circle
                              cx="160"
                              cy="160"
                              r="60"
                              fill="url(#coreGradient)"
                              opacity="0.9"
                            />
                            
                            {/* Shimmering nodes inside nucleus */}
                            {[...Array(8)].map((_, i) => {
                              const angle = (i * 360) / 8;
                              const rad = (angle * Math.PI) / 180;
                              const x = 160 + Math.cos(rad) * 40;
                              const y = 160 + Math.sin(rad) * 40;
                              return (
                                <motion.circle
                                  key={i}
                                  cx={x}
                                  cy={y}
                                  r="4"
                                  fill="#a78bfa"
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
                          
                          {/* Center Label */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1">
                                The
                              </div>
                              <div className="text-xl md:text-2xl font-bold text-white">
                                SPONTANEITY AI
                              </div>
                              <div className="text-xs font-medium text-violet-300 uppercase tracking-wider mt-1">
                                Engine
                              </div>
                      </div>
                    </div>
                    
                          {/* Ring Labels */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium">
                            Rules & Constraints
                      </div>
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium">
                            Context Weighting
                    </div>
                          <div className="absolute text-xs text-gray-400 font-medium whitespace-nowrap z-50 bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded border border-gray-700/50" style={{ top: '20%', left: '20%', transform: 'translate(-50%, -50%) rotate(-45deg)' }}>
                            AI Logic
                  </div>
                        </div>
                      </motion.div>
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
                            <p className="text-gray-400 text-sm lg:text-right">{output.desc}</p>
                            
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
                  
                  {/* Mathematical Formula - Bottom */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-16 pt-8 border-t border-white/10"
                  >
                    <div className="text-center">
                      <p className="text-gray-400 text-sm mb-2">The Spontaneity Engine Logic</p>
                      <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-4 md:p-6">
                        <div className="text-white font-mono text-sm md:text-base">
                          <div className="mb-2">S<sub>score</sub> = w<sub>1</sub>(L) + w<sub>2</sub>(T) + w<sub>3</sub>(B) - ΣC</div>
                          <div className="text-xs md:text-sm text-gray-400 space-y-1">
                            <div>L, T, B: Location, Time, and Behavior variables</div>
                            <div>w: Dynamic weights based on AI learning</div>
                            <div>C: Constraints (e.g., closing times, budget, travel distance)</div>
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
                        <p className="text-white/70 text-sm">Loading video...</p>
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

          {/* Behavioral & Environmental Constraints Section */}
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
                    Behavioral & Environmental Constraints
                  </h2>
                  <p className="text-gray-300 text-lg">
                    The system is designed around real-world constraints that limit planning, attention, and risk tolerance in live travel contexts.
                  </p>
                </div>
                
                {/* Constraint Blocks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* Constraint 1: Time-Constrained Decision Windows */}
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-4">Time-Constrained Decision Windows</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Decisions often occur within minutes, not hours. Availability changes in real time for venues, transport, and events. Delayed decisions increase friction and reduce viable options. This constraint requires the system to provide low-latency, actionable output that enables immediate action.
                    </p>
                  </div>
                  
                  {/* Constraint 2: Cognitive Load in Unfamiliar Environments */}
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-4">Cognitive Load in Unfamiliar Environments</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Travelers operate under information overload in unfamiliar settings. Comparing options across multiple platforms increases decision fatigue. Excess choice reduces decision confidence and increases abandonment. This constraint limits the acceptable information density and response complexity the system can present.
                    </p>
                  </div>
                  
                  {/* Constraint 3: Social & Reputational Risk */}
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-4">Social & Reputational Risk</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Acting on recommendations often involves public or interpersonal exposure. Poor suggestions carry social cost, not just inconvenience. Actions that feel awkward, unsafe, or misaligned are avoided regardless of objective quality. This constraint requires the system to incorporate social context awareness in recommendation generation.
                    </p>
                  </div>
                  
                  {/* Constraint 4: Trust, Safety, and Legitimacy Signals */}
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-4">Trust, Safety, and Legitimacy Signals</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Unknown recommendations must signal credibility quickly under time pressure. Users rely on implicit trust markers when explicit verification is impractical. Safety concerns override novelty in unfamiliar settings. This constraint shapes how recommendations are framed and validated within the system interface.
                    </p>
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
                  <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
                    This system is designed around real-world constraints, not idealized travel behavior. Each design decision reflects trade-offs required to enable spontaneity without increasing cognitive load, social risk, or dependency on constant connectivity.
                  </p>
                </div>
                
                <div className="space-y-4">

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
                      <h3 className="text-xl font-semibold text-gray-900">What intelligence is required?</h3>
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
                            <div className="space-y-4">
                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Distinguishing high-value moments from background noise</h5>
                                    <p className="text-gray-700">Filtering location, time, and movement signals to identify decision-relevant opportunities.</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Interpreting place, time, and user state as decision signals</h5>
                                    <p className="text-gray-700">Context interpretation that maps environmental cues to actionable suggestions without requiring user input.</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Timing sensitivity for moment-based relevance</h5>
                                    <p className="text-gray-700">Recognizing when proximity, time of day, weather, or movement patterns indicate a decision window.</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Producing suggestions that require minimal evaluation</h5>
                                    <p className="text-gray-700">Curating options to reduce cognitive load, prioritizing relevance over breadth.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* User Experience */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <motion.button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:ring-inset"
                      onClick={() => setActiveAccordion(activeAccordion === 'ux' ? null : 'ux')}
                      aria-expanded={activeAccordion === 'ux'}
                      aria-controls="ux-content"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">What constraints shape the system?</h3>
                      <motion.div
                        animate={{ rotate: activeAccordion === 'ux' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeAccordion === 'ux' && (
                        <motion.div
                          id="ux-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-6">
                            <div className="space-y-4">
                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Limited attention in unfamiliar environments</h5>
                                    <p className="text-gray-700">Must operate with minimal screen time and cognitive load. Cannot require extended evaluation or comparison.</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Intermittent connectivity</h5>
                                    <p className="text-gray-700">Designed to operate under unreliable or absent network conditions. Cannot depend on real-time data synchronization.</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Physical movement and safety</h5>
                                    <p className="text-gray-700">Must not distract from navigation or situational awareness. Cannot require sustained interaction while in motion.</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Battery and device resource limits</h5>
                                    <p className="text-gray-700">Must minimize background processing and data usage. Cannot assume continuous location tracking or cloud API access.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Functionality */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <motion.button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:ring-inset"
                      onClick={() => setActiveAccordion(activeAccordion === 'functionality' ? null : 'functionality')}
                      aria-expanded={activeAccordion === 'functionality'}
                      aria-controls="functionality-content"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">Implementation approach</h3>
                      <motion.div
                        animate={{ rotate: activeAccordion === 'functionality' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeAccordion === 'functionality' && (
                        <motion.div
                          id="functionality-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-6">
                            <p className="text-gray-700 leading-relaxed">
                              Content is preloaded as region-specific packs before travel. Local storage handles all runtime data access. Sync occurs opportunistically when connectivity is available, not as a blocking operation. This architecture supports the offline-first constraint while enabling periodic content updates.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* AI + Context Layer */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <motion.button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:ring-inset"
                      onClick={() => setActiveAccordion(activeAccordion === 'ai' ? null : 'ai')}
                      aria-expanded={activeAccordion === 'ai'}
                      aria-controls="ai-content"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">What trade-offs were intentionally made?</h3>
                      <motion.div
                        animate={{ rotate: activeAccordion === 'ai' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeAccordion === 'ai' && (
                        <motion.div
                          id="ai-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-6">
                            <div className="space-y-4">
                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">On-device inference over cloud intelligence</h5>
                                    <p className="text-gray-700">Favors lightweight, local processing (Core ML, TensorFlow Lite) to enable offline operation. Accepts reduced model complexity and accuracy in exchange for independence from network connectivity.</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Timely relevance over exhaustive coverage</h5>
                                    <p className="text-gray-700">Prioritizes context-weighted suggestions (location, time, weather, movement) that are actionable in the moment. Does not attempt to provide comprehensive destination research or long-term planning.</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Reactivity over prediction</h5>
                                    <p className="text-gray-700">Responds to immediate context signals rather than attempting to predict future behavior or preferences. Context signals are weighted to avoid over-personalization that could reduce serendipity.</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Offline-first architecture over real-time sync</h5>
                                    <p className="text-gray-700">Preloaded content packs and local storage (SQLite, MMKV) take precedence over live data. Sync occurs opportunistically when connectivity is available, not as a blocking requirement.</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Breadth of content over depth of personalization</h5>
                                    <p className="text-gray-700">Uses lightweight context weighting rather than deep learning from historical behavior. Accepts less personalized results to maintain simplicity and reduce dependency on user data collection.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Key Considerations */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <motion.button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:ring-inset"
                      onClick={() => setActiveAccordion(activeAccordion === 'considerations' ? null : 'considerations')}
                      aria-expanded={activeAccordion === 'considerations'}
                      aria-controls="considerations-content"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">What the system deliberately avoids doing</h3>
                      <motion.div
                        animate={{ rotate: activeAccordion === 'considerations' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeAccordion === 'considerations' && (
                        <motion.div
                          id="considerations-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-6">
                            <div className="space-y-4">
                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Not a trip planner</h5>
                                    <p className="text-gray-700">Does not generate itineraries, book accommodations, or manage reservations. Focuses on moment-to-moment decisions, not pre-travel planning.</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Not a social network</h5>
                                    <p className="text-gray-700">Does not maintain user profiles, friend connections, or persistent social graphs. Avoids features that require network effects or community building.</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Not a recommendation feed</h5>
                                    <p className="text-gray-700">Does not provide scrolling lists of options, ratings, or reviews. Avoids content browsing patterns that encourage extended screen engagement.</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Not a dashboard or content browser</h5>
                                    <p className="text-gray-700">Does not aggregate information for later review or provide comprehensive destination guides. Avoids interfaces that require navigation, filtering, or comparison.</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Not a predictive system</h5>
                                    <p className="text-gray-700">Does not attempt to learn long-term preferences or build user models over time. Avoids personalization that could reduce discovery of unexpected experiences.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Architecture and Tech Stack */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <motion.button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:ring-inset"
                      onClick={() => setActiveAccordion(activeAccordion === 'architecture' ? null : 'architecture')}
                      aria-expanded={activeAccordion === 'architecture'}
                      aria-controls="architecture-content"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">Technical foundation</h3>
                      <motion.div
                        animate={{ rotate: activeAccordion === 'architecture' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeAccordion === 'architecture' && (
                        <motion.div
                          id="architecture-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-6">
                            <p className="text-gray-700 leading-relaxed">
                              Mobile-native implementation with local storage for offline data persistence. On-device ML models enable context processing without network dependency. Content management and sync services operate asynchronously, supporting the offline-first constraint while allowing periodic updates when connectivity is available.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Design Process Section */}
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
                    Designing for Activation, Not Planning
                  </h2>
                  <div className="max-w-3xl mx-auto space-y-4">
                    <p className="text-gray-300 text-lg leading-relaxed">
                      The interface is designed to collapse decision-making into moments of action, using AI to narrow options rather than expand them. This requires reducing the cognitive cost of each choice while maintaining contextual relevance in high-mobility environments.
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Design decisions prioritize immediate activation over contemplation. The system must operate under constraints of limited attention, intermittent connectivity, and physical movement—conditions that make traditional planning interfaces ineffective.
                    </p>
                  </div>
                </div>

                {/* Design Constraints */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-16"
                >
                  <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                        <h4 className="text-white font-semibold mb-3">Decision cost reduction</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Each interaction must require minimal evaluation. Options are pre-filtered by context signals, eliminating comparison overhead.
                        </p>
                      </div>
                      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                        <h4 className="text-white font-semibold mb-3">Timing sensitivity</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Suggestions are weighted by temporal relevance. Proximity, time of day, and movement state determine when information surfaces.
                        </p>
                      </div>
                      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                        <h4 className="text-white font-semibold mb-3">Choice reduction through intelligence</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          AI narrows the option space before presentation. The system filters rather than aggregates, reducing selection burden.
                        </p>
                      </div>
                      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                        <h4 className="text-white font-semibold mb-3">Contextual relevance over breadth</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Information is constrained to what is actionable in the current moment. Historical data and future planning are excluded from the primary interface.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Iteration Evidence */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mt-16"
                >
                  <div className="text-center mb-8">
                    <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                      Iteration explored activation thresholds and constraint testing using Figma and UX Pilot for rapid pattern exploration.
                    </p>
                  </div>
                
                  {/* Wireframes Row - Evidence of Constraint Testing */}
                  <div className="mb-12">
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 md:justify-center">
                      <div className="flex-shrink-0 w-48">
                        <div className="relative aspect-[9/19.5] rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={normalizeImagePath("/portfolio/images/TravelApp-UXpilot_Homescreen-WireFrame-2.png")}
                            alt="Iteration exploring decision cost reduction patterns"
                            fill
                            className="object-cover"
                            sizes="192px"
                            priority={false}
                            quality={85}
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-48">
                        <div className="relative aspect-[9/19.5] rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={normalizeImagePath("/portfolio/images/TravelApp-UXpilot_Homescreen-WireFrame.png")}
                            alt="Iteration testing choice reduction approaches"
                            fill
                            className="object-cover"
                            sizes="192px"
                            priority={false}
                            quality={85}
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-48">
                        <div className="relative aspect-[9/19.5] rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={normalizeImagePath("/portfolio/images/TravelApp-UXpilot_Homescreen-WireFrame-5.png")}
                            alt="Iteration examining activation threshold variations"
                            fill
                            className="object-cover"
                            sizes="192px"
                            priority={false}
                            quality={85}
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-48">
                        <div className="relative aspect-[9/19.5] rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={normalizeImagePath("/portfolio/images/TravelApp-UXpilot_Homescreen-WireFrame-4.png")}
                            alt="Iteration exploring contextual relevance patterns"
                            fill
                            className="object-cover"
                            sizes="192px"
                            priority={false}
                            quality={85}
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-48">
                        <div className="relative aspect-[9/19.5] rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={normalizeImagePath("/portfolio/images/TravelApp-UXpilot_Homescreen-WireFrame-3.png")}
                            alt="Iteration testing narrowed option space"
                            fill
                            className="object-cover"
                            sizes="192px"
                            priority={false}
                            quality={85}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* High-Fidelity Iterations - Activation Pattern Exploration */}
                  <div>
                    <div className="flex justify-center gap-8 flex-wrap">
                      <div className="w-64 md:w-72">
                        <div className="relative aspect-[9/19.5] rounded-xl overflow-hidden shadow-xl">
                          <Image
                            src={normalizeImagePath("/portfolio/images/HomeScreen-UX-Pilot-Recco-2.png")}
                            alt="Iteration exploring AI-narrowed suggestion presentation"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 256px, 288px"
                            priority={false}
                            quality={90}
                          />
                        </div>
                      </div>
                      <div className="w-64 md:w-72">
                        <div className="relative aspect-[9/19.5] rounded-xl overflow-hidden shadow-xl">
                          <Image
                            src={normalizeImagePath("/portfolio/images/HomeScreen-UX-Pilot-Recco.png")}
                            alt="Iteration testing immediate action affordances"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 256px, 288px"
                            priority={false}
                            quality={90}
                          />
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                      <p className="text-amber-300 text-sm font-medium">
                    Work In Progress
                  </p>
                    </div>
                  </motion.div>
                </div>

                {/* System Build Approach */}
                <div className="mb-16">
                  <h3 className="text-2xl font-bold mb-8 text-white text-center">
                    System Build Approach
                  </h3>
                  
                  {/* Enhanced AI Workflow Process Diagram */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="mb-20"
                >
                  <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-8">
                      <p className="text-gray-400 text-sm max-w-3xl mx-auto leading-relaxed">
                        The workflow diagram below shows how responsibilities are separated: AI assists with prompt refinement and code generation, while engineering decisions determine architecture, integration points, and system boundaries.
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
                              <p className="text-sm text-gray-400">Writing Prompts</p>
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
                              <p className="text-sm text-gray-400">Logic & Analysis</p>
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
                              <p className="text-sm text-gray-400">Real iOS Build</p>
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
                              <p className="text-sm text-gray-400">Industry Integration</p>
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
                              <p className="text-sm text-gray-400">Client-facing</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* System Ownership and Integration */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">System Ownership</h3>
                    <div className="space-y-4 text-gray-300">
                      <div>
                        <p className="text-sm mb-2"><span className="text-emerald-400 font-medium">Currently being implemented:</span> iOS SwiftUI app with offline-first local storage (Realm). Core context processing logic runs on-device.</p>
                      </div>
                      <div>
                        <p className="text-sm mb-2"><span className="text-amber-400 font-medium">Partially operational:</span> Sync gateway for content updates. Background sync occurs opportunistically when connectivity is available.</p>
                      </div>
                      <div>
                        <p className="text-sm mb-2"><span className="text-gray-400 font-medium">Simulated under controlled conditions:</span> AI recommendation engine uses lightweight on-device models. Cloud-based inference is stubbed for testing.</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Integration Points</h3>
                    <div className="space-y-4 text-gray-300">
                      <div>
                        <p className="text-sm mb-2">Third-party services (Firebase, Supabase) handle data persistence and sync orchestration. The system owns the sync logic and conflict resolution.</p>
                      </div>
                      <div>
                        <p className="text-sm mb-2">AI services (OpenAI, LangChain) provide inference capabilities. The system owns prompt engineering, context weighting, and response filtering.</p>
                      </div>
                      <div>
                        <p className="text-sm mb-2">Widget and API plugin architectures are designed for external integration, but client implementations are not yet deployed.</p>
                      </div>
                    </div>
                  </motion.div>
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
                <div className="mb-16 mt-20">
                  <h3 className="text-2xl font-bold mb-8 text-white text-center">
                    Iteration Loop
                  </h3>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="max-w-4xl mx-auto mb-12"
                  >
                    <p className="text-gray-300 leading-relaxed mb-6">
                      Ideas move from prompt → logic → code → device through tight feedback cycles. Design constraints inform AI logic requirements, which shape code structure, which reveals failures on real devices. Each iteration validates assumptions about activation thresholds, context sensitivity, and offline behavior.
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      Failures are discovered through real-device testing, not simulation. Rapid validation occurs by deploying to iOS simulators and physical devices, observing how context signals behave under actual network conditions and battery constraints. Design, AI logic, and engineering inform each other: a design constraint reveals a logic gap, which requires an architectural adjustment, which surfaces a new design question.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      This cadence prioritizes working code over perfect architecture. The system evolves through constraint-driven iteration, not upfront planning.
                    </p>
                  </motion.div>

                {/* Mobile Build Iterations - Part of Build & Iteration */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-12"
                >
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                      <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                        Screenshots document real builds across iteration cycles, showing how failures were discovered and corrected through device testing.
                      </p>
                    </div>
                    
                    {/* Mobile Screenshots Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Screenshot 1 - October 1 */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative group"
                      >
                        <div className="relative aspect-[9/19.5] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                          <Image
                            src={normalizeImagePath("/portfolio/images/mobile-screenshots/simulator-2025-10-01-15-38-09.webp")}
                            alt="Build iteration evidence - October 1, 2025"
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </motion.div>

                      {/* Screenshot 2 - October 3 */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative group"
                      >
                        <div className="relative aspect-[9/19.5] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                          <Image
                            src={normalizeImagePath("/portfolio/images/mobile-screenshots/simulator-2025-10-03-22-43-11.webp")}
                            alt="Build iteration evidence - October 3, 2025"
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </motion.div>

                      {/* Screenshot 3 - October 4 */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="relative group"
                      >
                        <div className="relative aspect-[9/19.5] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                          <Image
                            src={normalizeImagePath("/portfolio/images/mobile-screenshots/simulator-2025-10-04-13-04-38.webp")}
                            alt="Build iteration evidence - October 4, 2025"
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </motion.div>

                      {/* Screenshot 4 - October 5 */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="relative group"
                      >
                        <div className="relative aspect-[9/19.5] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                          <Image
                            src={normalizeImagePath("/portfolio/images/mobile-screenshots/simulator-2025-10-05-09-44-52-2.webp")}
                            alt="Build iteration evidence - October 5, 2025"
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </motion.div>

                      {/* Screenshot 5 - October 7 */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="relative group"
                      >
                        <div className="relative aspect-[9/19.5] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                          <Image
                            src={normalizeImagePath("/portfolio/images/mobile-screenshots/simulator-2025-10-07-22-01-21.webp")}
                            alt="Build iteration evidence - October 7, 2025"
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </motion.div>

                      {/* Screenshot 6 - September 29 */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="relative group"
                      >
                        <div className="relative aspect-[9/19.5] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                          <Image
                            src={normalizeImagePath("/portfolio/images/mobile-screenshots/simulator-2025-09-29-16-25-52.webp")}
                            alt="Build iteration evidence - September 29, 2025"
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                </div>

                {/* Current System Limitations */}
                <div className="mt-20 mb-12">
                  <h3 className="text-2xl font-bold mb-8 text-white text-center">
                    Current System Limitations
                  </h3>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="max-w-4xl mx-auto"
                  >
                    <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                      <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start gap-3">
                          <span className="text-amber-400 mt-1">•</span>
                          <span className="leading-relaxed">
                            <strong className="text-white">Offline sync conflicts:</strong> Rapid context switching under intermittent connectivity can produce sync conflicts. Conflict resolution logic handles common cases but edge conditions remain unhandled.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-amber-400 mt-1">•</span>
                          <span className="leading-relaxed">
                            <strong className="text-white">Limited social graph depth:</strong> Early builds operate with shallow user interaction data. Social triggers and recommendations are constrained by the current data model's limited depth.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-amber-400 mt-1">•</span>
                          <span className="leading-relaxed">
                            <strong className="text-white">AI decision confidence thresholds:</strong> On-device ML models produce confidence scores that are still being tuned. Some suggestions may surface with insufficient confidence, requiring manual filtering.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-amber-400 mt-1">•</span>
                          <span className="leading-relaxed">
                            <strong className="text-white">Battery optimization trade-offs:</strong> Background context processing is constrained by battery limits. The system prioritizes responsiveness over continuous monitoring, which may miss some context signals.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-amber-400 mt-1">•</span>
                          <span className="leading-relaxed">
                            <strong className="text-white">Widget and API plugin deployment:</strong> Architecture supports external integration, but client-facing implementations are not yet deployed. Integration testing occurs in controlled environments only.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
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
                    Live System Prototype
                  </h2>
                  <p className="text-gray-600 text-lg">
                    This is an active system build, not a concept mock.
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
                      View Live Demo
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
                      Initial testing is conducted through a limited closed beta designed to observe system behavior across varied travel contexts and connectivity conditions.
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
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    These insights reflect ongoing system behavior observed during live prototyping and iteration, not final conclusions.
                  </p>
                </div>
                
                <div className="space-y-12">
                  {/* System-Level Insights */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">System-Level Insights</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        Early iterations revealed that the system's activation threshold is critical—too many suggestions, even when contextually relevant, can feel like planning in disguise. The system demonstrated that information suppression is as important as disclosure. Observed behavior indicates restraint is necessary: the system should only activate when context genuinely creates value, not when data is simply available.
                      </p>
                      <p>
                        Offline-first architecture exposed gaps in how AI recommendations degrade gracefully. A suggestion that works with full connectivity shouldn't break without it. The system required modular design where core logic works independently of real-time data layers. Observed behavior indicates that degradation must be predictable and transparent, not silent failure.
                      </p>
                      <p>
                        Real-world context signals are messier than prototypes suggest. Location accuracy varies, time zones shift, and behavioral patterns aren't always consistent. The system demonstrated that multiple fallback strategies are essential, not just one primary path. This complexity is invisible to users but essential for reliability under imperfect conditions.
                      </p>
                    </div>
                </div>
                
                  {/* Behavioral & Intelligence Trade-offs */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Behavioral & Intelligence Trade-offs</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        The tension between choice reduction and choice abundance remains unresolved. The system must narrow options to reduce cognitive load, but over-narrowing can feel restrictive. Observed behavior indicates users want one good suggestion at the right moment, but the threshold for "good enough" varies by context and user state. This trade-off requires ongoing calibration.
                      </p>
                      <p>
                        Trust calibration and explainability present an ongoing challenge. Users are comfortable sharing location and behavior data when the value exchange is clear and immediate. However, observed behavior indicates discomfort when the system seems to know too much without explanation. Transparency in AI reasoning is required, but the level of explanation needed varies by situation. This tension between transparency and simplicity is not yet resolved.
                      </p>
                      <p>
                        Signal ambiguity in real-world environments creates reliability challenges. Location accuracy, time zone shifts, and behavioral inconsistencies produce conflicting context signals. The system must operate under uncertainty, but current confidence thresholds are still being tuned. Observed behavior indicates that the system needs better handling of ambiguous or conflicting signals.
                      </p>
                      <p>
                        API misalignment with real-time decision support remains a constraint. Most existing travel APIs are optimized for pre-trip planning, not moment-to-moment decision support. The system requires abstraction layers that translate booking-focused data into context-rich signals, but this translation introduces latency and potential information loss. This architectural tension is ongoing.
                      </p>
                  </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Future System Extensions Section */}
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
                    Future System Extensions
                  </h2>
                  </div>
                
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    The core spontaneity engine is designed to support additional intelligence modules through API interfaces. Social signal ingestion modules could be exposed as API-consumable context layers, allowing external systems to push group behavior patterns, shared interest indicators, and proximity-based signals into the engine. These modules are designed to operate independently of the core recommendation logic, consumable by any system that needs to enrich context with social signals.
                  </p>
                  <p>
                    Longitudinal preference models could be implemented as an intelligence service that operates across sessions and destinations. This service would query recommendation confidence scores and subscribe to suggestion triggers, building preference patterns over time without requiring explicit user input. The model would be exposed as a separate service layer, allowing the core engine to remain session-focused while supporting cross-trip learning.
                  </p>
                  <p>
                    Physical environment context APIs could integrate as external data sources that enrich decision confidence. The system could consume real-time venue capacity, environmental conditions, and location energy levels from third-party services, treating these as additional context signals rather than primary decision factors. These APIs would be designed to degrade gracefully—when unavailable, the system continues operating with reduced confidence rather than failing.
                  </p>
                  <p>
                    These extensions align with near-term platform trends: the growth of embedded AI decision systems that operate independently of primary interfaces (Gartner, 2024), the shift from planning tools to real-time intelligence services (McKinsey, 2024), and increased emphasis on explainability and trust calibration in AI systems (MIT Technology Review, 2024). The architecture supports these trends by maintaining modular boundaries and exposing capabilities through well-defined interfaces.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}
      {isCulturalContextEngine && (
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
                    Understanding the trust crisis in AI-powered travel recommendations
                  </p>
                </div>
                
                {/* Key Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-6 rounded-xl border border-amber-500/30">
                    <div className="text-3xl font-bold text-amber-400 mb-2">62%</div>
                    <div className="text-gray-300 text-sm">of travelers distrust AI-generated recommendations without source verification</div>
                    <div className="text-gray-500 text-xs mt-2">— Travel Industry Trust Survey 2024</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-xl border border-cyan-500/30">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">78%</div>
                    <div className="text-gray-300 text-sm">want to know the origin and credibility of travel suggestions</div>
                    <div className="text-gray-500 text-xs mt-2">— Phocuswright Consumer Survey</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-6 rounded-xl border border-emerald-500/30">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">45%</div>
                    <div className="text-gray-300 text-sm">have been misled by fake or outdated travel recommendations</div>
                    <div className="text-gray-500 text-xs mt-2">— Trust & Authenticity Research</div>
                  </div>
                </div>
                
                {/* Market & Competitive Analysis */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-8 text-white text-center">Market & Competitive Analysis</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Review Platforms</h4>
                      <p className="text-gray-300 text-sm mb-4">TripAdvisor and Yelp rely on user-generated content without verification, leading to fake reviews and outdated information that misleads travelers.</p>
                      <div className="text-xs text-gray-400">Examples: TripAdvisor, Yelp, Google Reviews</div>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">AI Travel Assistants</h4>
                      <p className="text-gray-300 text-sm mb-4">ChatGPT and similar tools generate recommendations without source attribution or data provenance, making it impossible to verify authenticity.</p>
                      <div className="text-xs text-gray-400">Examples: ChatGPT, Claude, Perplexity</div>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Booking Platforms</h4>
                      <p className="text-gray-300 text-sm mb-4">Booking.com and Airbnb prioritize availability over authenticity, often featuring promoted listings without clear source verification.</p>
                      <div className="text-xs text-gray-400">Examples: Booking.com, Airbnb, Expedia</div>
                    </div>
                  </div>
                  
                  {/* Our Approach */}
                  <div className="mt-8 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-6 md:p-8 rounded-xl border border-cyan-500/30">
                    <h4 className="text-xl font-semibold text-white mb-4">Approach: Trust Through Transparency</h4>
                    <p className="text-gray-200 text-base leading-relaxed">
                      We moved from a 'binary' trust model (True/False) to a 'probabilistic' one. By exposing the Consensus Logic, we show the user that the AI isn't just hallucinating a 'Yes'—it is actively negotiating between different data providers to ensure the traveler's spontaneity is grounded in reality. The framework implements Explainable Provenance (XAI). When the system detects a data conflict—such as a Google Maps 'Closed' status being contradicted by real-time social activity—it doesn't just pick a side. It documents the resolution logic in an Audit Trail, allowing the user to inspect the 'Source Chain' and understand why a recommendation was deemed trustworthy despite conflicting signals. This trust framework differentiates itself by providing source verification, data provenance, and authenticity validation at the architectural level. Every recommendation includes clear attribution, allowing travelers to understand where information comes from and make informed decisions.
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
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/travel</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-red-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"ChatGPT recommended a 'hidden gem' that was actually a <span className="font-semibold text-red-700">tourist trap with fake reviews</span>. I had no way to verify the source of the recommendation."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
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
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/solotravel</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-orange-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"Without knowing the source, I can't judge if a recommendation is <span className="font-semibold text-orange-700">credible or just marketing</span>. This makes me skeptical of all AI suggestions."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
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
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/travelhacks</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-purple-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I need recommendations with <span className="font-semibold text-purple-700">real-time verification and data freshness indicators</span> to trust the information."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
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
                            <p className="text-gray-400 text-sm">{source.desc}</p>
                            
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
                              <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1">
                                Multi-Mechanism
                              </div>
                              <div className="text-xl md:text-2xl font-bold text-white">
                                VALIDATION
                              </div>
                              <div className="text-xs font-medium text-violet-300 uppercase tracking-wider mt-1">
                                Prism
                              </div>
                            </div>
                          </div>
                          
                          {/* Ring Labels */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium">
                            Source Verification
                          </div>
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium">
                            Cross-Reference
                          </div>
                          <div className="absolute text-xs text-gray-400 font-medium whitespace-nowrap z-50 bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded border border-gray-700/50" style={{ top: '20%', left: '20%', transform: 'translate(-50%, -50%) rotate(-45deg)' }}>
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
                            <p className="text-gray-300 text-sm leading-relaxed">
                              This recommendation has been verified through multiple sources and cross-referenced for authenticity.
                            </p>
                          </div>
                          
                          {/* Source Links */}
                          <div className="pt-4 border-t border-white/10">
                            <p className="text-gray-400 text-xs mb-2 uppercase tracking-wider">Sources</p>
                            <div className="flex flex-wrap gap-2">
                              {['Museum Archive', 'Local Historian', 'Verified Record'].map((source, idx) => (
                                <motion.div
                                  key={idx}
                                  whileHover={{ scale: 1.05 }}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 rounded-md border border-white/10 hover:border-violet-400/50 transition-colors"
                                >
                                  <FaLink className="w-3 h-3 text-violet-400" />
                                  <span className="text-violet-300 text-xs">{source}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Freshness Indicator */}
                          <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
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
                      <p className="text-gray-400 text-sm mb-2">The Trust Framework Information Lineage</p>
                      <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-4 md:p-6">
                        <div className="text-white font-mono text-sm md:text-base">
                          <div className="mb-2">R<sub>trust</sub> = V(S<sub>1</sub>, S<sub>2</sub>, ..., S<sub>n</sub>) × C<sub>fresh</sub> × A<sub>trans</sub></div>
                          <div className="text-xs md:text-sm text-gray-400 space-y-1">
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
                      <p className="text-amber-300 text-sm font-medium">
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
                    <div className="text-gray-300 text-sm">of travelers struggle with balancing structured planning and spontaneous exploration</div>
                    <div className="text-gray-500 text-xs mt-2">— Travel Planning Behavior Study 2024</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-xl border border-cyan-500/30">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">64%</div>
                    <div className="text-gray-300 text-sm">feel overwhelmed by fragmented planning tools that don't work together</div>
                    <div className="text-gray-500 text-xs mt-2">— Phocuswright Consumer Survey</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-6 rounded-xl border border-emerald-500/30">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">58%</div>
                    <div className="text-gray-300 text-sm">want planning tools that adapt to real-time changes and constraints</div>
                    <div className="text-gray-500 text-xs mt-2">— Travel Technology Research</div>
                  </div>
                </div>
                
                {/* Market & Competitive Analysis */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-8 text-white text-center">Architectural Archetypes</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Archetype A: Deterministic Systems</h4>
                      <p className="text-gray-300 text-sm mb-4">High structure, zero adaptability. Systems like Wanderlog and TripIt enforce rigid planning models with no capacity for real-time context integration.</p>
                      <div className="text-xs text-gray-400">Examples: Wanderlog, TripIt, Google Trips</div>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Archetype B: Discovery Engines</h4>
                      <p className="text-gray-300 text-sm mb-4">High entropy, zero structural logic. Systems like Google Maps and Yelp provide real-time discovery but lack the orchestration layer needed to bridge logistics with spontaneity.</p>
                      <div className="text-xs text-gray-400">Examples: Google Maps, Yelp, Foursquare</div>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">The CATDS Value</h4>
                      <p className="text-gray-300 text-sm mb-4">Contextual Orchestration: Bridging high-structure logistics with high-entropy real-time discovery through an AI middleware layer that interprets context and maintains trust boundaries.</p>
                      <div className="text-xs text-gray-400">Middleware Architecture</div>
                    </div>
                  </div>
                  
                  {/* Our Approach */}
                  <div className="mt-8 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-6 md:p-8 rounded-xl border border-cyan-500/30">
                    <h4 className="text-xl font-semibold text-white mb-4">Approach: Contextual Orchestration</h4>
                    <p className="text-gray-200 text-base leading-relaxed">
                      CATDS operates as a middleware layer that sits between existing travel platforms (Expedia, Airbnb, etc.) and the Spontaneity Engine. The Context Interpreter ingests unstructured data (weather, LLM-parsed sentiment, sensor data) and converts it into Decision Vectors. The Trust Layer provides human-in-the-loop verification, suggesting changes without overriding user agency—avoiding AI hallucinations in logistics.
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
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        The Problem: Data Latency
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      The fundamental gap between a static API response ("Flight is Booked") and real-world context ("User is tired, it's raining, and the flight is delayed"). Current systems are <span className="font-semibold text-red-700">transactional (Booking) or static (Itinerary)</span>, but travel requires fluid, contextual intelligence that adapts to moment-to-moment reality.
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
                        The Solution: Contextual Orchestration
                      </h3>
                    </div>
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
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/travel</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-red-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"Planning a trip means juggling <span className="font-semibold text-red-700">five different apps that don't sync</span>. There has to be a better way."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
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
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/solotravel</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-orange-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"My itinerary was set in stone, but I wanted to <span className="font-semibold text-orange-700">extend my stay somewhere</span>. Reorganizing everything was a nightmare."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
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
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/travelhacks</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-purple-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"Planning tools assume everything goes according to plan. <span className="font-semibold text-purple-700">Real travel is messy and needs flexibility</span>."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
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
                            <p className="text-gray-400 text-sm relative z-10">{sensor.desc}</p>
                            
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
                              <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
                                Adaptive
                              </div>
                              <div className="text-xl md:text-2xl font-bold text-white">
                                PROCESSOR
                              </div>
                              <div className="text-xs font-medium text-amber-400 uppercase tracking-wider mt-1">
                                Re-calculating
                              </div>
                            </div>
                          </div>
                          
                          {/* Hexagon Labels */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium">
                            Constraint Input
                          </div>
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium">
                            Processing Layer
                          </div>
                          <div className="absolute text-xs text-gray-400 font-medium whitespace-nowrap z-50 bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded border border-gray-700/50" style={{ top: '20%', left: '20%', transform: 'translate(-50%, -50%) rotate(-45deg)' }}>
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
                                  <span className="text-cyan-300 text-xs font-medium">{item.time}</span>
                                </div>
                                
                                {/* Activity Content */}
                                <div className="flex-1">
                                  <p className="text-white text-sm font-medium mb-1">{item.activity}</p>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-xs px-2 py-0.5 rounded ${
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
                          <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-gray-400">
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
                      <p className="text-gray-400 text-sm mb-2">The Travel Planning Assistant Feedback Loop</p>
                      <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-4 md:p-6">
                        <div className="text-white font-mono text-sm md:text-base">
                          <div className="mb-2">P<sub>adaptive</sub> = f(C<sub>t</sub>, P<sub>t-1</sub>, U<sub>pref</sub>) + ΔC</div>
                          <div className="text-xs md:text-sm text-gray-400 space-y-1">
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
                      <p className="text-gray-400 text-sm">Visualizing the Delta between planned state and contextual reality</p>
                    </div>
                    
                    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 md:p-8">
                      {/* Static Itinerary Card */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Static Itinerary</h4>
                          <span className="text-xs text-gray-500">14:00 - 16:00</span>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                              <FaMapMarkerAlt className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-medium">Outdoor Market Tour</p>
                              <p className="text-gray-400 text-sm">Walking tour through local markets</p>
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
                              <p className="text-gray-300 text-sm">Weather: Heavy Rain • Intensity: High</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* System Calculation */}
                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-medium text-gray-400 uppercase">System Processing</span>
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
                        <p className="text-xs text-gray-500 mt-2">Probability of Satisfaction</p>
                      </div>
                      
                      {/* Adaptive Suggestion */}
                      <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-400/30">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-400/20 rounded-lg flex items-center justify-center">
                            <FaMapMarkerAlt className="w-5 h-5 text-emerald-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-emerald-400 font-medium">Indoor Market Hall</p>
                            <p className="text-gray-300 text-sm">Covered alternative with similar experience</p>
                            <p className="text-xs text-gray-400 mt-1">Constraint Delta: -6% satisfaction, +85% weather compatibility</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Technical Insight */}
                    <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border-l-4 border-amber-400">
                      <p className="text-xs text-gray-400 leading-relaxed">
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
                      <p className="text-gray-400 text-sm">Orchestration Layer presenting decision paths with explainability</p>
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
                            <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded">High Friction</span>
                          </div>
                          <p className="text-xs text-gray-400 mb-4">Keep original itinerary despite 2h delay</p>
                          
                          {/* Mini Sparkline - Energy Levels */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-500">Energy Impact</span>
                              <span className="text-xs text-red-400">-42%</span>
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
                          
                          <div className="text-xs text-gray-500">
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
                            <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">Optimized</span>
                          </div>
                          <p className="text-xs text-gray-300 mb-4">Re-route to nearby attractions, maintain experience quality</p>
                          
                          {/* Mini Sparkline - Energy Levels */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-400">Energy Impact</span>
                              <span className="text-xs text-emerald-400">+18%</span>
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
                          
                          <div className="text-xs text-gray-400">
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
                      <p className="text-xs text-gray-400 leading-relaxed">
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
                      <p className="text-gray-400 text-sm">Context Interpreter converting unstructured signals into Decision Vectors</p>
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
                                  <p className="text-xs text-gray-500 mb-1">{item.source}</p>
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
                                <span className="text-xs text-gray-400">{vector.constraint}</span>
                                <span className={`text-xs px-2 py-1 ${vector.bgClass} ${vector.textClass} rounded`}>
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
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-semibold ${
                                  idx === 0 ? 'bg-amber-400/20 text-amber-400 border-2 border-amber-400/50' :
                                  idx === 3 ? 'bg-emerald-400/20 text-emerald-400 border-2 border-emerald-400/50' :
                                  'bg-slate-700 text-gray-300 border-2 border-slate-600'
                                }`}>
                                  {label[0]}
                                </div>
                                <p className="text-xs text-gray-500 mt-1 text-center">{label}</p>
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
                      <p className="text-xs text-gray-400 leading-relaxed">
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
                      <p className="text-gray-400 text-sm">How the Intelligence Layer manifests in realistic mobile interfaces</p>
                    </div>
                    
                    {/* Mobile Frames Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
                      
                      {/* Mobile Screen A: The Adaptive Intervention */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-full max-w-[280px] aspect-[9/19.5] bg-slate-800 rounded-[2.5rem] p-2 shadow-2xl">
                          {/* Device Frame */}
                          <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                            {/* Status Bar */}
                            <div className="h-12 bg-gradient-to-b from-gray-50 to-white flex items-center justify-between px-6 pt-2">
                              <span className="text-xs font-semibold text-gray-900">9:41</span>
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
                                      <p className="text-xs text-gray-500">14:00 - 16:00</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg"></div>
                                    <div className="flex-1">
                                      <p className="font-semibold text-gray-900">Tea Ceremony</p>
                                      <p className="text-xs text-gray-500">17:00 - 18:30</p>
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
                                      <p className="text-white/90 text-xs leading-relaxed">
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
                          <p className="text-xs text-gray-400 italic leading-relaxed text-center">
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
                              <span className="text-xs font-semibold text-gray-900">9:41</span>
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
                                  <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full font-semibold">High Friction</span>
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
                                    <span className="text-xs text-gray-500">Match Score</span>
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
                                  <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-600 rounded-full font-semibold">Optimized</span>
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
                                    <span className="text-xs text-gray-500">Match Score</span>
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
                          <p className="text-xs text-gray-400 italic leading-relaxed text-center">
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
                              <span className="text-xs font-semibold text-gray-900">9:41</span>
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
                                      <p className="text-xs text-gray-500">Balance between flexibility and planning</p>
                                    </div>
                                  </div>
                                  <div className="relative">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-xs text-gray-500">Structured</span>
                                      <span className="text-xs text-gray-500">Spontaneous</span>
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
                                      <p className="text-xs text-gray-500">Prioritize low-intensity activities</p>
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
                                  <p className="text-xs text-gray-400 mt-2">
                                    {true ? 'Active' : 'Inactive'} • System will filter high-energy activities
                                  </p>
                                </div>
                                
                                {/* Preference 3: Indoor Preference */}
                                <div className="bg-white rounded-xl p-5 shadow-sm">
                                  <div className="flex items-center justify-between mb-4">
                                    <div className="flex-1">
                                      <h3 className="font-semibold text-gray-900 mb-1">Indoor Preference</h3>
                                      <p className="text-xs text-gray-500">Weather-triggered auto-adjustment</p>
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
                                      <span className="text-xs font-semibold text-amber-900">Weather Trigger Active</span>
                                    </div>
                                    <p className="text-xs text-amber-700">
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
                          <p className="text-xs text-gray-400 italic leading-relaxed text-center">
                            <strong className="text-amber-400 not-italic">System Logic:</strong> Semantic Preference Tuning allows users to configure how the Context Interpreter weights different signals. These preferences generate Decision Vector parameters, enabling personalized orchestration. The system maintains explainability by showing active triggers and their effects in real-time.
                          </p>
                        </div>
                      </div>
                      
                    </div>
                  </motion.div>
                  
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
                      <p className="text-amber-300 text-sm font-medium">
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
                    A comprehensive system for adaptive planning that bridges structure with spontaneity
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    The Travel Planning Assistant provides adaptive planning algorithms that maintain flexibility while providing structure when needed. The system processes real-time constraints, preferences, and context to deliver unified planning that adapts to changing conditions, enabling travelers to plan and explore seamlessly.
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
                      Will start with a closed beta focusing on adaptive planning accuracy and user satisfaction with flexible itinerary management, followed by gradual rollout based on constraint detection system performance.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Beta Testing</span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Adaptive Algorithms</span>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">Constraint Detection</span>
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
                      A live demo will be available once the adaptive planning system is fully implemented.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        What Currently Works
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        System architecture and adaptive planning framework are being developed. Core components for constraint detection and flexible itinerary management are in progress.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        What is Experimental
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Adaptive planning algorithms, real-time constraint detection, and flexible itinerary adjustment logic are in active development and testing.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        What is Planned Next
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Expanded constraint detection, advanced adaptive algorithms, and user-facing flexibility features. Timeline depends on adaptive system validation and user feedback.
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
                    Audience & Research
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Understanding the need for meaningful social connections in travel
                  </p>
                </div>
                
                {/* Key Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-6 rounded-xl border border-amber-500/30">
                    <div className="text-3xl font-bold text-amber-400 mb-2">69%</div>
                    <div className="text-gray-300 text-sm">of solo travelers want to meet like-minded people but struggle to find authentic connections</div>
                    <div className="text-gray-500 text-xs mt-2">— Solo Travel Social Connection Study 2024</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-xl border border-cyan-500/30">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">54%</div>
                    <div className="text-gray-300 text-sm">feel that traditional social networks don't facilitate meaningful travel connections</div>
                    <div className="text-gray-500 text-xs mt-2">— Travel Social Behavior Research</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-6 rounded-xl border border-emerald-500/30">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">62%</div>
                    <div className="text-gray-300 text-sm">want privacy controls when sharing travel experiences and connecting with others</div>
                    <div className="text-gray-500 text-xs mt-2">— Privacy & Travel Social Survey</div>
                  </div>
                </div>
                
                {/* Market & Competitive Analysis */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-8 text-white text-center">Market & Competitive Analysis</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Social Travel Apps</h4>
                      <p className="text-gray-300 text-sm mb-4">Apps like Couchsurfing and Meetup focus on meetups but lack identity-focused discovery and granular privacy controls that travelers need.</p>
                      <div className="text-xs text-gray-400">Examples: Couchsurfing, Meetup, Travel Buddies</div>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">General Social Networks</h4>
                      <p className="text-gray-300 text-sm mb-4">Facebook and Instagram enable connection but aren't designed for travel-specific discovery or privacy-focused social interaction.</p>
                      <div className="text-xs text-gray-400">Examples: Facebook Groups, Instagram, Twitter</div>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Travel Review Platforms</h4>
                      <p className="text-gray-300 text-sm mb-4">TripAdvisor and similar platforms enable reviews but don't facilitate real-time connection or identity-based discovery between travelers.</p>
                      <div className="text-xs text-gray-400">Examples: TripAdvisor, Yelp, Google Reviews</div>
                    </div>
                  </div>
                  
                  {/* Our Approach */}
                  <div className="mt-8 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-6 md:p-8 rounded-xl border border-cyan-500/30">
                    <h4 className="text-xl font-semibold text-white mb-4">Approach: Prototyping a Peer to Peer Travel Graph</h4>
                    <div className="grid md:grid-cols-3 gap-12 text-left">
                      <div>
                        <h3 className="text-white font-semibold mb-3">Verified Experience</h3>
                        <p className="text-gray-400 leading-relaxed">
                          I am designing a system that maps the overlap between one person's past trip and another person's future plans.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-3">Future Intent</h3>
                        <p className="text-gray-400 leading-relaxed">
                          I am prototyping ways for travelers to find each other based on where they want to go next.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-3">Trusted Privacy</h3>
                        <p className="text-gray-400 leading-relaxed">
                          I am testing UI patterns that allow for high-level networking while keeping personal data under the user's total control.
                        </p>
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
                    The Challenge: Social Connection in Travel
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Current social platforms don't facilitate meaningful travel connections while respecting privacy and enabling authentic discovery
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 p-8 rounded-2xl border-2 border-amber-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        The Problem
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Travelers want to connect with like-minded people but struggle to find authentic connections. Traditional social networks lack <span className="font-semibold text-red-700">travel-specific discovery mechanisms and privacy controls</span>, while travel-focused apps don't facilitate meaningful social interaction.
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
                      A system that provides <span className="font-semibold text-blue-700">social graph–driven discovery through network effects</span>, enabling travelers to discover travel through real people and social connections rather than listings, while maintaining full control over their information and privacy.
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
                    Real user feedback reveals pattern-level insights about the gaps in social connection for travelers
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {/* Lack of Authentic Connections */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:border-red-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      
                      <h4 className="text-xl font-bold text-gray-900">Lack of Authentic Connections</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-red-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I want to meet people who share my travel style, but <span className="font-semibold text-red-700">most apps are just for hookups or generic meetups</span>. There's no way to find like-minded travelers."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/solotravel</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-red-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I joined a travel group but it was just <span className="font-semibold text-red-700">tourists doing tourist things</span>. I want to connect with people who explore like I do."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Twitter, Travel Community</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Concerns */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-orange-100 hover:border-orange-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      
                      <h4 className="text-xl font-bold text-gray-900">Privacy Concerns</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-orange-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I want to share my travel experiences but <span className="font-semibold text-orange-700">don't want everyone to see where I am in real-time</span>. There's no middle ground."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/solotravel</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-orange-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"Social travel apps require <span className="font-semibold text-orange-700">full profile visibility</span>. I want to control who sees what about me."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                          <span>Blog Comment on Nomadic Matt</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Generic Discovery Mechanisms */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-100 hover:border-purple-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      
                      <h4 className="text-xl font-bold text-gray-900">Generic Discovery</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-purple-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I need a way to find people based on <span className="font-semibold text-purple-700">shared interests and travel style</span>, not just location or age."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/travelhacks</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-purple-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"Current apps show me everyone nearby, but I want to <span className="font-semibold text-purple-700">discover people who match my travel identity</span>."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
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
                      An AI-powered social discovery platform that connects travelers through identity-focused discovery with granular privacy controls.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      This system processes travel identity, shared interests, and experiences through discovery algorithms to deliver meaningful connections while maintaining full user control over privacy and visibility.
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
                      <h3 className="text-xl font-semibold text-gray-900">✨ What Does Identity-Focused Discovery Mean In Travel?</h3>
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
                              Identity-focused discovery doesn't mean public profiles—it means connecting based on shared travel identity, interests, and experiences while respecting privacy.
                            </p>
                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Identity-based matching</h5>
                                  <p className="text-gray-700">Connect travelers based on shared travel style, interests, and experiences, not just location.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Granular privacy controls</h5>
                                  <p className="text-gray-700">Control what information is visible, to whom, and when—full transparency and control.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Opt-in discovery</h5>
                                  <p className="text-gray-700">Travelers choose when and how to be discoverable, maintaining agency over their social connections.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Authentic connections</h5>
                                  <p className="text-gray-700">Facilitate meaningful connections based on shared values and travel experiences, not just proximity.</p>
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
                  System Overview: How the Social Graph Driven Travel Network Works
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto text-balance">
                  Architectural system for social graph driven discovery and network effects in travel
                </p>
                </div>
                
                {/* Privacy-Gated Matching Diagram */}
                <div className="relative">
                  {/* Main Grid Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
                    
                    {/* Stage 1 - Social Graph Processing (Left) */}
                    <div className="space-y-8">
                      <h3 className="text-lg font-semibold text-indigo-400 text-center lg:text-left mb-6">
                        Social Graph Processing
                      </h3>
                      
                      {/* Two Identity Clusters */}
                      {[
                        {
                          user: 'User A',
                          interests: ['Architecture', 'Street Food', 'Photography'],
                          color: 'indigo',
                        },
                        {
                          user: 'User B',
                          interests: ['Street Food', 'Art', 'Local Culture'],
                          color: 'violet',
                        },
                      ].map((identity, clusterIndex) => (
                        <motion.div
                          key={clusterIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: clusterIndex * 0.2 }}
                          className="group relative"
                        >
                          {/* Identity Cluster Card */}
                          <div className={`relative backdrop-blur-xl bg-white/5 border ${clusterIndex === 0 ? 'border-indigo-500/30 hover:border-indigo-400/60' : 'border-violet-500/30 hover:border-violet-400/60'} rounded-xl p-6 shadow-lg transition-all duration-300`}>
                            {/* User Profile Icon */}
                            <div className="flex items-center gap-3 mb-4">
                              <div className="relative">
                                <div className={`absolute inset-0 ${clusterIndex === 0 ? 'bg-indigo-500/30' : 'bg-violet-500/30'} blur-xl rounded-full`} />
                                <FaUserCircle className={`w-8 h-8 ${clusterIndex === 0 ? 'text-indigo-400' : 'text-violet-400'} relative z-10`} />
                              </div>
                              <h4 className="text-white font-semibold text-base">{identity.user}</h4>
                            </div>
                            
                            {/* Floating Interest Tags */}
                            <div className="space-y-2">
                              {(Array.isArray(identity.interests) ? identity.interests : []).map((interest, tagIndex) => (
                                <motion.div
                                  key={tagIndex}
                                  initial={{ opacity: 0, y: 10 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  animate={{
                                    y: [0, -3, 0],
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: clusterIndex * 0.2 + tagIndex * 0.2,
                                    ease: "easeInOut",
                                  }}
                                  className={`inline-flex items-center gap-2 px-3 py-1.5 ${clusterIndex === 0 ? 'bg-indigo-500/20 border-indigo-400/30' : 'bg-violet-500/20 border-violet-400/30'} border rounded-lg mr-2 mb-2`}
                                >
                                  <FaTags className={`w-3 h-3 ${clusterIndex === 0 ? 'text-indigo-300' : 'text-violet-300'}`} />
                                  <span className={`${clusterIndex === 0 ? 'text-indigo-300' : 'text-violet-300'} text-xs font-medium`}>{interest}</span>
                                </motion.div>
                              ))}
                            </div>
                            
                            {/* Data signal to privacy layer */}
                            <motion.div
                              className={`absolute -right-2 top-1/2 w-2 h-2 ${clusterIndex === 0 ? 'bg-indigo-400' : 'bg-violet-400'} rounded-full opacity-0 group-hover:opacity-100`}
                              animate={{
                                x: [0, 200, 200],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: clusterIndex * 0.3,
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Stage 2 - Privacy Gateway (Center) */}
                    <div className="flex justify-center my-12 lg:my-0">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                      >
                        {/* Privacy Shield Gateway */}
                        <div className="relative w-48 h-96 md:w-56 md:h-[500px] flex flex-col items-center justify-center">
                          {/* Translucent Vertical Gateway Bar */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              className="w-1 h-full bg-gradient-to-b from-emerald-500/20 via-emerald-400/40 to-emerald-500/20 rounded-full backdrop-blur-sm border border-emerald-400/30"
                              animate={{
                                opacity: [0.6, 1, 0.6],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                          </div>
                          
                          {/* Shield Icon - Centered */}
                          <div className="relative z-10">
                            <motion.div
                              animate={{
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="w-24 h-24 md:w-32 md:h-32 bg-emerald-500/20 backdrop-blur-xl rounded-full border-2 border-emerald-400/50 flex items-center justify-center"
                            >
                              <FaShieldAlt className="w-12 h-12 md:w-16 md:h-16 text-emerald-400" />
                            </motion.div>
                          </div>
                          
                          {/* Data Signals Attempting to Pass Through */}
                          {/* Blocked Signal (from left) */}
                          <motion.div
                            className="absolute left-0 top-1/4 w-3 h-3 bg-red-400 rounded-full"
                            animate={{
                              x: [0, 100, 100],
                              opacity: [1, 0.5, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 0.5,
                              ease: "easeIn",
                            }}
                          />
                          <motion.div
                            className="absolute left-0 top-1/4 w-1 h-12 bg-red-400/50 rounded-full"
                            animate={{
                              x: [0, 100, 100],
                              opacity: [0.5, 0, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 0.5,
                              ease: "easeIn",
                            }}
                          />
                          
                          {/* Allowed Signal (from left - Opt-in) */}
                          <motion.div
                            className="absolute left-0 top-1/2 w-3 h-3 bg-emerald-400 rounded-full"
                            animate={{
                              x: [0, 120, 120],
                              opacity: [1, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 1.5,
                              ease: "easeInOut",
                            }}
                          />
                          <motion.div
                            className="absolute left-0 top-1/2 w-1 h-12 bg-emerald-400/50 rounded-full"
                            animate={{
                              x: [0, 120, 120],
                              opacity: [0.5, 0.5, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 1.5,
                              ease: "easeInOut",
                            }}
                          />
                          
                          {/* Blocked Signal (from right) */}
                          <motion.div
                            className="absolute right-0 top-3/4 w-3 h-3 bg-red-400 rounded-full"
                            animate={{
                              x: [0, -100, -100],
                              opacity: [1, 0.5, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 2.5,
                              ease: "easeIn",
                            }}
                          />
                          <motion.div
                            className="absolute right-0 top-3/4 w-1 h-12 bg-red-400/50 rounded-full"
                            animate={{
                              x: [0, -100, -100],
                              opacity: [0.5, 0, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 2.5,
                              ease: "easeIn",
                            }}
                          />
                          
                          {/* Labels */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium whitespace-nowrap">
                            Privacy Gateway
                          </div>
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium">
                            Opt-in Only
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Stage 3 - Network Effects (Right) */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-emerald-400 text-center lg:text-right mb-6">
                        Network Effects
                      </h3>
                      
                      {/* Match Notification */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        whileHover={{ scale: 1.02, x: -5 }}
                        className="group relative"
                      >
                        {/* Connection Signal Pulse */}
                        <motion.div
                          className="absolute -left-4 top-1/2 w-16 h-16 border-2 border-emerald-400/50 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.6, 0, 0.6],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                        <motion.div
                          className="absolute -left-4 top-1/2 w-12 h-12 border-2 border-emerald-400/70 rounded-full"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.8, 0, 0.8],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.2,
                            ease: "easeOut",
                          }}
                        />
                        
                        {/* Match Card */}
                        <div className="relative backdrop-blur-xl bg-white/5 border border-emerald-500/30 rounded-xl p-6 shadow-lg hover:border-emerald-400/60 transition-all duration-300">
                          {/* Match Header */}
                          <div className="flex items-center gap-3 mb-4">
                            <motion.div
                              animate={{
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <FaCheckCircle className="w-6 h-6 text-emerald-400" />
                            </motion.div>
                            <h4 className="text-white font-semibold text-base">Match Found</h4>
                          </div>
                          
                          {/* Connection Details */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                              <span className="text-indigo-400 font-medium">User A</span>
                              <span className="text-gray-500">↔</span>
                              <span className="text-violet-400 font-medium">User B</span>
                            </div>
                            
                            {/* Shared Interests */}
                            <div className="pt-3 border-t border-white/10">
                              <p className="text-gray-400 text-xs mb-2 uppercase tracking-wider">Shared Interests</p>
                              <div className="flex flex-wrap gap-2">
                                {['Street Food'].map((interest, idx) => (
                                  <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.05 }}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/20 rounded-md border border-emerald-400/30"
                                  >
                                    <FaTags className="w-3 h-3 text-emerald-300" />
                                    <span className="text-emerald-300 text-xs">{interest}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Privacy Status */}
                            <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-gray-400">
                              <FaLock className="w-3 h-3 text-emerald-400" />
                              <span>Both users opted in</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Privacy-Gated Matching Formula - Bottom */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-16 pt-8 border-t border-white/10"
                  >
                    <div className="text-center">
                      <p className="text-gray-400 text-sm mb-2">The Social Graph–Driven Travel Network: Privacy-Gated Network Effects</p>
                      <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-4 md:p-6">
                        <div className="text-white font-mono text-sm md:text-base">
                          <div className="mb-2">M<sub>connection</sub> = I<sub>A</sub> ∩ I<sub>B</sub> × P<sub>A</sub> × P<sub>B</sub></div>
                          <div className="text-xs md:text-sm text-gray-400 space-y-1">
                            <div>I<sub>A</sub>, I<sub>B</sub>: Social graph nodes (people, places, trips, intent)</div>
                            <div>P<sub>A</sub>, P<sub>B</sub>: Privacy gates (1 = opt-in, 0 = blocked)</div>
                            <div>Network connection occurs when: I<sub>A</sub> ∩ I<sub>B</sub> ≠ ∅ AND P<sub>A</sub> = P<sub>B</sub> = 1</div>
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
                    Why Social Connection Matters in Travel
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    The impact extends beyond individual travelers—it requires systemic solutions that balance connection with privacy
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
                      Meaningful social connections lead to <span className="font-semibold text-cyan-700">richer travel experiences and deeper cultural understanding</span>. Travelers can connect with like-minded people while maintaining <span className="font-semibold text-cyan-700">full control over their privacy and visibility</span>.
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
                        Impact for Communities
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      When travelers connect authentically, local communities benefit from <span className="font-semibold text-emerald-700">more meaningful cultural exchange</span>. Identity-based discovery creates connections that respect both traveler privacy and local community values.
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
                  <p className="text-gray-300 text-lg">
                    Designing for transparency and trust—prioritizing source verification and data provenance in the user experience.
                  </p>
                </div>

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
                      <p className="text-amber-300 text-sm font-medium">
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
                    A comprehensive system for identity-focused discovery that balances connection with privacy
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    This social graph–driven travel network provides network-based discovery through social graphs connecting people, places, trips, and intent. The system processes travel identity, shared interests, and experiences to deliver meaningful connections through network effects while maintaining full user control over privacy, visibility, and interaction, enabling travelers to discover travel through real people rather than listings.
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
                      A live demo will be available once the identity-focused discovery system is fully implemented.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        What Currently Works
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        System architecture and identity processing framework are being developed. Core components for privacy controls and connection matching are in progress.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        What is Experimental
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Identity-based matching algorithms, privacy control mechanisms, and connection quality scoring are in active development and testing.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        What is Planned Next
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Expanded identity processing, advanced privacy features, and user-facing connection tools. Timeline depends on identity system validation and user feedback.
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
                        Building an identity-focused discovery system means constantly questioning how to balance connection with privacy. The challenge isn't having enough social features—it's knowing when to enable discovery versus when to protect privacy. Early prototypes showed that too much visibility can feel invasive, while too much privacy can prevent meaningful connections. The system needs to find the right balance for each traveler and situation.
                      </p>
                      <p>
                        Privacy controls require architectural decisions that happen at the data layer. The system needs to enforce granular privacy settings—controlling what information is visible, to whom, and when—which means building privacy enforcement into the core architecture, not adding it as an afterthought.
                      </p>
                      <p>
                        Identity-based matching is more complex than simple profile matching. A connection can be technically possible but still feel inauthentic if the identity signals don't align. The system needs multiple matching layers that work together to assess connection quality and authenticity.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">What Surprised Me</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        The depth of user concern about privacy in social travel apps was more pronounced than expected. Users don't just want privacy controls—they want to understand how their data is used and who can see what. This requires explaining privacy mechanisms in accessible language, not just showing technical settings.
                      </p>
                      <p>
                        The technical challenge of identity processing revealed that most existing social APIs aren't built for identity-focused discovery. They're optimized for location-based or profile-based matching, not identity-rich connection signals. Adapting these systems required building abstraction layers that translate profile data into identity signals.
                      </p>
                      <p>
                        User preferences around social connection emerged as highly individual. Some travelers want minimal discovery, others want extensive connection opportunities. The system needed to learn and adapt to individual preferences, not assume a one-size-fits-all approach.
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
                    Real-time meetup facilitation remains underexplored. The system currently processes identity and matches travelers, but doesn't yet facilitate real-time meetups or group formation. Adding real-time coordination could create more immediate connection opportunities without requiring extensive pre-planning.
                  </p>
                  <p>
                    Long-term traveler networks could shift the system from trip-specific to lifetime connections. Instead of processing connections for a single trip, the system could maintain traveler networks over months or years, understanding that connections made in one location might be valuable in future destinations. This moves beyond single-trip social discovery to lifetime traveler community building.
                  </p>
                  <p>
                    Integration with travel platforms represents a significant opportunity. The system knows about traveler identity and preferences, but doesn't yet integrate deeply with booking or planning platforms to facilitate connections around shared itineraries. Partnerships with travel platforms could close this gap, creating a more seamless social discovery experience.
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
                        <p className="text-gray-300 text-sm">{insight}</p>
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

          {/* Section 11: Learnings & Reflections */}
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
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Key Learnings</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        {isCulturalContextEngine && 'Trust cannot be designed into a system after the fact—it must be architected from the ground up. Verification and provenance tracking require data-layer solutions, not just UI indicators.'}
                        {isTravelPlanningAssistant && 'Flexible planning requires balancing structure with spontaneity. The challenge is providing enough guidance to reduce stress while maintaining freedom for unplanned exploration.'}
                        {isLocalExperienceFinder && 'Social connections in travel require careful privacy design. Identity-focused discovery works better when travelers control what they share and who can discover them.'}
                      </p>
                      {project?.overview?.outcomes && (
                        <ul className="space-y-2 mt-4">
                          {(Array.isArray(project?.overview?.outcomes) ? project.overview.outcomes : []).slice(0, 3).map((outcome: string, index: number) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
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
                        <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-3">Phase 1: Arrival</div>
                        <div className="text-white font-semibold mb-2">High Novelty / High Anxiety</div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Initial exposure to new environment. System provides orientation cues and establishes safe anchors.
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-lg border border-purple-500/30">
                        <div className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-3">Phase 2: Exploration</div>
                        <div className="text-white font-semibold mb-2">Variable Novelty / Adaptive Comfort</div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Active engagement with environment. System adapts narrative beats based on real-time emotional tone feedback.
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-6 rounded-lg border border-amber-500/30">
                        <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">Phase 3: Familiarity</div>
                        <div className="text-white font-semibold mb-2">Low Novelty / High Comfort</div>
                        <p className="text-gray-300 text-sm leading-relaxed">
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
                          <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Input: Emotional Tone</div>
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
                          <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Processing: Narrative Engine</div>
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
                          <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Output: Experience Phases</div>
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
                        <div className="text-xs font-mono text-red-600 uppercase tracking-wider mb-1">Constraint A</div>
                        <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                          Information Scarcity
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                      The system deliberately withholds "check-off" lists and comprehensive location databases to force presence. Travelers receive narrative beats, not itineraries.
                    </p>
                    <div className="mt-4 pt-4 border-t border-red-200">
                      <div className="text-xs font-mono text-gray-600">
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
                        <div className="text-xs font-mono text-blue-600 uppercase tracking-wider mb-1">Constraint B</div>
                        <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                          Temporal Elasticity
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                      Narrative beats stretch or shrink based on the traveler's comfort level. A single beat can expand into hours if the emotional tone indicates deep engagement.
                    </p>
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <div className="text-xs font-mono text-gray-600">
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
                        <div className="text-xs font-mono text-purple-600 uppercase tracking-wider mb-1">Constraint C</div>
                        <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                          Non-Linearity
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                      The system must allow for "loops"—returning to a place of comfort if the emotional tone dips. Progression is not unidirectional.
                    </p>
                    <div className="mt-4 pt-4 border-t border-purple-200">
                      <div className="text-xs font-mono text-gray-600">
                        <span className="font-semibold">Implementation:</span> Familiarity anchors remain accessible. System can reverse phase transitions based on emotional feedback.
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
                        <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">Initial State</div>
                        <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                          Traveler is in "Exploration" phase, navigating a high-density urban environment. Emotional tone signals: <span className="font-mono text-red-400">overwhelm</span>, <span className="font-mono text-red-400">anxiety</span>, <span className="font-mono text-red-400">sensory overload</span>.
                        </p>
                        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                          <div className="text-xs font-mono text-red-400 mb-2">Emotional Tone Input:</div>
                          <div className="text-sm font-mono text-gray-300">
                            anxiety_level: 0.85<br />
                            comfort_level: 0.25<br />
                            phase: "exploration"
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs font-mono text-green-400 uppercase tracking-wider mb-3">System Response</div>
                        <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                          Narrative Engine detects emotional tone threshold breach. System immediately loops back to "Familiarity" phase, providing anchor points:
                        </p>
                        <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                          <div className="text-xs font-mono text-green-400 mb-2">Narrative Output:</div>
                          <div className="text-sm font-mono text-gray-300">
                            phase_transition: "exploration → familiarity"<br />
                            anchor_type: "quiet_space"<br />
                            suggestions: ["library", "known_cafe", "park_bench"]
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">System Logic</div>
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
                      <div className="text-xs font-mono text-amber-500/80 uppercase tracking-wider mb-3">Failure State: Semantic Over-Abstraction</div>
                      <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                        <span className="font-semibold text-amber-400">Definition:</span> When the Narrative Engine prioritizes "mood" over "orientation" to the point where the user feels lost rather than immersed.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-amber-500/20">
                        <div className="text-xs font-mono text-amber-400/80 mb-2">Example Failure Output:</div>
                        <div className="text-sm text-gray-300 italic mb-2" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                          "Find the rhythm of the city's heartbeat in the spaces between buildings..."
                        </div>
                        <div className="text-xs font-mono text-red-400/80">
                          Result: Too abstract. No actionable anchor points. Traveler is lost.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trigger Conditions */}
                  <div className="bg-white/5 p-8 rounded-xl border border-white/10 mb-8">
                    <div className="mb-6">
                      <div className="text-xs font-mono text-amber-500/80 uppercase tracking-wider mb-3">Trigger Conditions</div>
                      <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                        The system detects failure state through behavioral and temporal signals:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/30 p-4 rounded-lg border border-amber-500/20">
                          <div className="text-xs font-mono text-amber-400/80 mb-2">Temporal Signal:</div>
                          <div className="text-sm font-mono text-gray-300">
                            User dwell time in non-destination zone &gt; 20 minutes
                          </div>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-amber-500/20">
                          <div className="text-xs font-mono text-amber-400/80 mb-2">Physiological Signal:</div>
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
                      <div className="text-xs font-mono text-red-400/80 uppercase tracking-wider mb-3">The Intervention: The "Safety Valve"</div>
                      <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                        The Trust Layer forces a <span className="font-semibold text-red-400">"Hard Anchor"</span>. It breaks the narrative arc to provide literal, high-legibility guidance.
                      </p>
                      
                      <div className="bg-black/30 p-6 rounded-lg border border-red-500/20 mb-4">
                        <div className="text-xs font-mono text-red-400/80 mb-3">Hard Anchor Output:</div>
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
                      <div className="text-xs font-mono text-green-400/80 uppercase tracking-wider mb-3">Recovery Logic</div>
                      <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                        Once the user reaches a <span className="font-semibold text-green-400">"Safety Node"</span>, the system recalibrates:
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-green-500/20">
                        <div className="text-xs font-mono text-green-400/80 mb-2">Recovery Protocol:</div>
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
                    <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-4 text-center">
                      System State Transition Visualization
                    </div>
                    <RecoveryStateIndicator autoTransition={true} transitionDelay={3000} />
                  </div>

                  {/* Threshold Visualization: Atmosphere vs Utility */}
                  <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                    <div className="mb-6">
                      <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">System Threshold: Atmosphere vs Utility</div>
                      <p className="text-gray-300 leading-relaxed mb-6 text-sm" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                        The system maintains a dynamic balance between immersive narrative ("Atmosphere") and actionable guidance ("Utility"). When the threshold is breached, the system automatically shifts to utility-first mode.
                      </p>
                      
                      {/* Threshold Bar */}
                      <div className="relative h-16 bg-black/30 rounded-lg border border-white/10 overflow-hidden mb-4">
                        {/* Atmosphere Zone (Left) */}
                        <div className="absolute left-0 top-0 bottom-0 w-[70%] bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-r border-white/20">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-mono text-blue-400">Atmosphere Zone</span>
                          </div>
                        </div>
                        
                        {/* Threshold Line */}
                        <div className="absolute left-[70%] top-0 bottom-0 w-px bg-amber-500/80">
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500 rounded-full border-2 border-gray-900"></div>
                        </div>
                        
                        {/* Utility Zone (Right) */}
                        <div className="absolute right-0 top-0 bottom-0 w-[30%] bg-gradient-to-r from-amber-500/20 to-red-500/20">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-mono text-amber-500">Utility Zone</span>
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
                      
                      <div className="grid grid-cols-2 gap-4 text-xs">
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
                        <div className="text-xs font-mono text-amber-400/80 mb-2">Behavioral Signal:</div>
                        <div className="text-sm text-gray-300">Rapid movement in high-density crowds</div>
                      </div>
                      <div className="bg-black/30 p-4 rounded-lg border border-amber-500/20">
                        <div className="text-xs font-mono text-amber-400/80 mb-2">Interaction Signal:</div>
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
                        <div className="text-xs font-mono text-emerald-400/80 uppercase tracking-wider mb-3">Before: Exploration Phase</div>
                        <div className="text-sm text-gray-300 italic mb-2" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                          "Discover the hidden alleys"
                        </div>
                        <div className="text-xs text-gray-500">
                          High novelty, high stimulation
                        </div>
                      </div>
                      
                      <div className="bg-black/30 p-6 rounded-lg border border-emerald-500/20">
                        <div className="text-xs font-mono text-teal-400/80 uppercase tracking-wider mb-3">After: Refuge Phase</div>
                        <div className="text-sm text-gray-300 italic mb-2" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                          "Find the silence in the stacks"
                        </div>
                        <div className="text-xs text-gray-500">
                          Lower entropy, maintained immersion
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Success Pivot Logic Component */}
                <div className="mb-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs border border-emerald-500/20 bg-emerald-500/5 p-6 rounded-lg">
                    <div className="space-y-3">
                      <p className="text-emerald-400 uppercase font-bold tracking-tighter">Detection: Sensory Overload</p>
                      <p className="text-white/60 leading-relaxed">Metric: Crowd density &gt; 80% + Pace velocity increase.</p>
                      <div className="text-xs text-emerald-300/80 mt-2">
                        System identifies: High-anxiety threshold breached
                      </div>
                    </div>
                    <div className="space-y-3 md:border-l md:border-emerald-500/20 md:pl-6">
                      <p className="text-blue-400 uppercase font-bold tracking-tighter">Pivot: Adaptive Narrative</p>
                      <p className="text-white/60 leading-relaxed">Action: Prioritize "Enclosure" nodes. Recalculate arc for "Refuge" phase.</p>
                      <div className="text-xs text-blue-300/80 mt-2">
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
                      <div className="text-xs font-mono text-emerald-400/80 mb-3">Narrative Continuity:</div>
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
                          <div className="text-xs text-emerald-300/80">
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
                        <div className="text-xs font-mono text-emerald-400/80 mb-2">Outcome 1:</div>
                        <div className="text-sm text-gray-300">Narrative coherence preserved</div>
                      </div>
                      <div className="bg-black/30 p-4 rounded-lg border border-emerald-500/20">
                        <div className="text-xs font-mono text-emerald-400/80 mb-2">Outcome 2:</div>
                        <div className="text-sm text-gray-300">Physiological stress reduced</div>
                      </div>
                      <div className="bg-black/30 p-4 rounded-lg border border-emerald-500/20">
                        <div className="text-xs font-mono text-emerald-400/80 mb-2">Outcome 3:</div>
                        <div className="text-sm text-gray-300">User trust in system maintained</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pivot Animation Visual */}
                <div className="mb-8">
                  <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-4 text-center">
                    Path Transition Visualization
                  </div>
                  <PivotAnimation autoPlay={true} transitionDelay={2000} />
                </div>

                {/* Logic Visualization: Balancing Novelty vs Comfort */}
                <div className="bg-white/5 p-8 rounded-xl border border-emerald-500/20">
                  <div className="mb-6">
                    <div className="text-xs font-mono text-emerald-400/80 uppercase tracking-wider mb-3">System Logic: Balancing Novelty vs Comfort</div>
                    <p className="text-gray-300 leading-relaxed text-sm mb-6" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                      The Soft Pivot demonstrates the system's ability to balance "Novelty" against "Comfort" without breaking the narrative arc. Instead of a jarring "GPS Recalculating" alert, the AI uses environmental cues to guide the user toward familiarity.
                    </p>
                    
                    {/* Balance Visualization */}
                    <div className="relative h-16 bg-black/30 rounded-lg border border-emerald-500/20 overflow-hidden mb-4">
                      {/* Novelty Zone (Left) */}
                      <div className="absolute left-0 top-0 bottom-0 w-[60%] bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-r border-white/20">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-mono text-amber-400">Novelty Zone</span>
                        </div>
                      </div>
                      
                      {/* Comfort Zone (Right) */}
                      <div className="absolute right-0 top-0 bottom-0 w-[40%] bg-gradient-to-r from-teal-500/20 to-emerald-500/20">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-mono text-teal-400">Comfort Zone</span>
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
                    
                    <div className="grid grid-cols-2 gap-4 text-xs">
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

          {/* Section 4: Business Use & Applications */}
          <section id="business-use" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Business Use & Applications
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                    Organizations that prioritize emotional experience over transactional travel planning
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-100">
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">Use Case 1</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      High-End Travel Planners
                    </h3>
                    <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                      Luxury travel agencies can offer narrative-driven experiences that emphasize emotional connection and belonging, differentiating from checklist-based itineraries.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-100">
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">Use Case 2</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      Creative Studios
                    </h3>
                    <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                      Design and creative agencies can use narrative systems to craft immersive brand experiences, retreats, and creative journeys that prioritize emotional resonance.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-100">
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">Use Case 3</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      Cultural Tourism Organizations
                    </h3>
                    <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                      Cultural institutions and tourism boards can deploy narrative systems to create deeper, more meaningful visitor experiences that emphasize belonging over coverage.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}

      {!isSpontaneousTravelCompanion && !isCulturalContextEngine && !isNarrativeTravelGenerator && !isOtherProject && (
        <>
          {/* Overview / Project Summary Section */}
          <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Overview</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {project?.overview?.description || 'Project overview coming soon.'}
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                    <FaRocket className="w-5 h-5 text-blue-600" />
                    Goals & Objectives
                  </h3>
                  <ul className="space-y-3">
                    {project?.overview?.goals?.map((goal: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{goal}</span>
                      </li>
                    )) || <li className="text-gray-500">Goals will be added soon.</li>}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                    <FaLightbulb className="w-5 h-5 text-blue-600" />
                    Key Outcomes
                  </h3>
                  <ul className="space-y-3">
                    {project?.overview?.outcomes?.map((outcome: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      

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
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
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
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
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
      </>
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

