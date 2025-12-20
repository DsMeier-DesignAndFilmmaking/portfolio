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
} from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageTransitionOverlay from '../../../../../components/PageTransitionOverlay';
import StickyProgressNav from '../../../../../components/StickyProgressNav';

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

const TravelProjectDetailClient = ({ project, projectId }: TravelProjectDetailClientProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const router = useRouter();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileVideoLoaded, setIsMobileVideoLoaded] = useState(false);
  const [isMobileVideoError, setIsMobileVideoError] = useState(false);
  const [showFallbackImage, setShowFallbackImage] = useState(false);
  
  const isSpontaneousTravelCompanion = projectId === 'spontaneous-travel-companion';
  const isCulturalContextEngine = projectId === 'cultural-context-engine';
  const isTravelPlanningAssistant = projectId === 'travel-planning-assistant';
  const isLocalExperienceFinder = projectId === 'local-experience-finder';
  const isOtherProject = isCulturalContextEngine || isTravelPlanningAssistant || isLocalExperienceFinder;
  const sections = [
    { id: 'design-exploration', label: 'Observed Travel Frictions' },
    { id: 'research-audience', label: 'Audience & Research' },
    { id: 'designs-strategy', label: 'Concept & Strategy' },
    { id: 'wireframes-ui', label: 'Design Evolution' },
    { id: 'prototyping-ai', label: 'Build & Iteration' },
    { id: 'outcomes-launch', label: 'Launch & Testing' },
    { id: 'learnings-next', label: 'Learnings & Reflections' }
  ];

  useEffect(() => {
    window.addEventListener('scroll', () => {});
    return () => window.removeEventListener('scroll', () => {});
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVideoLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVideoLoaded) {
      const timer = setTimeout(() => setIsVideoReady(true), 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isVideoLoaded]);

  useEffect(() => {
    if (isVideoLoaded && !isVideoReady) {
      const errorTimer = setTimeout(() => {
        setIsVideoError(true);
        setShowFallbackImage(true);
      }, 4000);
      return () => clearTimeout(errorTimer);
    }
    return undefined;
  }, [isVideoLoaded, isVideoReady]);

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

  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => setIsMobileVideoLoaded(true), 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isMobile]);

  // STEP 2: Minimal conditional structure
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {!project ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p>Loading project…</p>
          </div>
        </div>
      ) : (
        <div>Project loaded</div>
      )}
    </main>
  );
}

export default TravelProjectDetailClient;
