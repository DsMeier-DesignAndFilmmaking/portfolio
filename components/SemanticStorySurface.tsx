"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Sparkles, Code, MapPin } from 'lucide-react';

interface SemanticTag {
  label: string;
  value: string;
}

interface InsightNode {
  time: string;
  event: string;
  logic: string;
}

interface SemanticStorySurfaceProps {
  narrativeData: {
    narrativeThemes: string[];
    dailySummary: string;
    semanticStory?: {
      location: string;
      reflectionHeader: string;
      storyBody: {
        storyteller: string;
        concierge: string;
        minimalist: string;
      };
      semanticTags: SemanticTag[];
      insightNodes: InsightNode[];
      engineData: {
        gpsPings: number;
        weatherChecks: number;
        socialInteractions: number;
        detoursSuggested: number;
        detoursAccepted: number;
      };
    };
  };
}

const SemanticStorySurface: React.FC<SemanticStorySurfaceProps> = ({ narrativeData }) => {
  const [voiceTone, setVoiceTone] = useState<'minimalist' | 'concierge' | 'storyteller'>('storyteller');
  const [showLogic, setShowLogic] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [dragX, setDragX] = useState(0);

  const semanticStory = narrativeData.semanticStory || {
    location: "Tokyo",
    reflectionHeader: "Evening Reflection",
    storyBody: {
      storyteller: narrativeData.dailySummary,
      concierge: narrativeData.dailySummary,
      minimalist: "Path: Efficient | Mood: Neutral"
    },
    semanticTags: [],
    insightNodes: [],
    engineData: {
      gpsPings: 0,
      weatherChecks: 0,
      socialInteractions: 0,
      detoursSuggested: 0,
      detoursAccepted: 0
    }
  };

  // Typewriter effect
  useEffect(() => {
    const toneText = semanticStory.storyBody[voiceTone];
    setDisplayText('');
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex < toneText.length) {
        setDisplayText(toneText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [voiceTone, semanticStory.storyBody]);

  // Generate arc path for SVG
  const generateArcPath = (nodes: InsightNode[]) => {
    const width = 350;
    const height = 150;
    const padding = 30;
    const usableWidth = width - padding * 2;
    const usableHeight = height - padding * 2;
    
    const points = nodes.map((node, index) => {
      const x = padding + (index / (nodes.length - 1)) * usableWidth;
      const y = padding + usableHeight / 2 + Math.sin((index / nodes.length) * Math.PI) * (usableHeight / 3);
      return { x, y, node };
    });

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const cp1x = current.x + (next.x - current.x) / 3;
      const cp1y = current.y;
      const cp2x = next.x - (next.x - current.x) / 3;
      const cp2y = next.y;
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }

    return { path, points };
  };

  const { path, points } = generateArcPath(semanticStory.insightNodes);

  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <div className="w-full max-w-[390px] mx-auto">
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-3xl border border-amber-500/20 overflow-hidden">
        {/* Paper Grain Overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />

        {/* Daily Arc Path Background */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="200" viewBox="0 0 350 150" className="overflow-visible" style={{ position: 'absolute', top: '20%' }}>
            <defs>
              <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <motion.path
              d={path}
              fill="none"
              stroke="url(#arcGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            
            {/* Insight Nodes */}
            {points.map((point, index) => (
              <g key={index}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="15"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNode(index)}
                  onMouseLeave={() => setHoveredNode(null)}
                />
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r={hoveredNode === index ? 5 : 4}
                  fill="#f59e0b"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: hoveredNode === index ? 1 : 0.6,
                    r: hoveredNode === index ? 6 : 4
                  }}
                  transition={{ delay: index * 0.2, type: "spring" }}
                  style={{
                    filter: hoveredNode === index ? 'drop-shadow(0 0 8px #f59e0b)' : 'none'
                  }}
                />
              </g>
            ))}
          </svg>
        </div>

        <div className="relative z-10 p-6">
          {/* Voice Tone Toggle */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-[9px] font-mono text-amber-300/70 uppercase tracking-wider">Voice Tone:</span>
            <div className="flex gap-1 bg-slate-800/60 rounded-lg p-1 border border-amber-500/20">
              {(['minimalist', 'concierge', 'storyteller'] as const).map((tone) => (
                <button
                  key={tone}
                  onClick={() => setVoiceTone(tone)}
                  className={`px-3 py-1.5 rounded text-[9px] font-semibold uppercase tracking-wider transition-all ${
                    voiceTone === tone
                      ? 'bg-amber-500/80 text-white shadow-lg'
                      : 'text-slate-400 hover:text-amber-300'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          {/* Story Card - Swipeable */}
          <div className="relative" style={{ perspective: '1000px' }}>
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(event, info) => {
                if (info.offset.x > 100) {
                  // Swipe right - could trigger next card
                } else if (info.offset.x < -100) {
                  // Swipe left - could trigger previous card
                }
              }}
              animate={{ rotateY: showLogic ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative"
            >
              {/* Front of Card - Story */}
              <motion.div
                style={{ backfaceVisibility: 'hidden' }}
                className={`bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-amber-500/10 backdrop-blur-[20px] rounded-2xl border border-white/10 p-6 shadow-xl shadow-amber-500/10 ${
                  showLogic ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span className="text-[10px] font-mono text-amber-300/70 uppercase tracking-wider">
                      {semanticStory.reflectionHeader}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {semanticStory.location}
                  </h3>
                </div>

                {/* Narrative Body */}
                <div className="mb-6">
                  {voiceTone === 'minimalist' ? (
                    <div className="space-y-2 font-mono text-[11px] text-slate-300">
                      {semanticStory.storyBody.minimalist.split(' | ').map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-amber-400">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <motion.p
                      key={voiceTone}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`text-base leading-relaxed text-white ${
                        voiceTone === 'storyteller' 
                          ? "font-serif italic" 
                          : "font-sans"
                      }`}
                      style={{ 
                        fontFamily: voiceTone === 'storyteller' 
                          ? "'tiempos-headline-regular', serif" 
                          : "'Inter', sans-serif"
                      }}
                    >
                      {displayText}
                      {displayText.length < semanticStory.storyBody[voiceTone].length && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="inline-block w-0.5 h-5 bg-amber-400 ml-1 align-middle"
                        />
                      )}
                    </motion.p>
                  )}
                </div>

                {/* Semantic Tags */}
                {semanticStory.semanticTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {semanticStory.semanticTags.map((tag, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="px-3 py-1.5 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full"
                      >
                        <span className="text-[9px] font-mono text-amber-300 uppercase tracking-wider">
                          {tag.label}: <span className="text-white font-semibold">{tag.value}</span>
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* View Engine Data Button */}
                <button
                  onClick={() => setShowLogic(!showLogic)}
                  className="w-full py-2.5 px-4 bg-slate-800/60 hover:bg-slate-800/80 border border-amber-500/20 rounded-xl text-[10px] font-semibold text-amber-300 uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <Code className="w-3.5 h-3.5" />
                  View Engine Data
                </button>
              </motion.div>

              {/* Back of Card - Logic/JSON */}
              <div
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
                className={`absolute inset-0 bg-slate-800/95 backdrop-blur-[20px] rounded-2xl border border-slate-600/30 p-6 shadow-xl ${
                  showLogic ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="w-4 h-4 text-amber-400" />
                    <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider">
                      Engine Data
                    </span>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-[10px] text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">GPS Pings:</span>
                    <span className="text-amber-400">{semanticStory.engineData.gpsPings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Weather Checks:</span>
                    <span className="text-amber-400">{semanticStory.engineData.weatherChecks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Social Interactions:</span>
                    <span className="text-amber-400">{semanticStory.engineData.socialInteractions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Detours Suggested:</span>
                    <span className="text-amber-400">{semanticStory.engineData.detoursSuggested}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Detours Accepted:</span>
                    <span className="text-amber-400">{semanticStory.engineData.detoursAccepted}</span>
                  </div>
                </div>

                {/* JSON Preview */}
                <div className="mt-4 pt-4 border-t border-slate-600/30">
                  <pre className="text-[8px] text-slate-400 font-mono overflow-x-auto">
                    {JSON.stringify(semanticStory.engineData, null, 2)}
                  </pre>
                </div>

                <button
                  onClick={() => setShowLogic(false)}
                  className="w-full mt-4 py-2.5 px-4 bg-slate-700/60 hover:bg-slate-700/80 border border-slate-600/30 rounded-xl text-[10px] font-semibold text-white uppercase tracking-wider transition-all"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Back to Story
                </button>
              </div>
            </motion.div>
          </div>

          {/* Insight Node Tooltips */}
          <AnimatePresence>
            {hoveredNode !== null && points[hoveredNode] && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-md border border-amber-500/30 rounded-lg p-3 shadow-xl z-20"
                style={{ minWidth: '280px' }}
              >
                <div className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
                  {points[hoveredNode].node.event}
                </div>
                <div className="text-[8px] font-mono text-slate-300 mb-2">
                  {points[hoveredNode].node.time}
                </div>
                <div className="text-[9px] text-slate-200">
                  {points[hoveredNode].node.logic}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SemanticStorySurface;
