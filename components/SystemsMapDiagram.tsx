'use client';

import React from 'react';

interface SystemsMapDiagramProps {
  showTitle?: boolean;
  highlightedSection?: 'spontaneity-engine' | 'trust-layer' | 'travel-decisions' | 'social-events' | 'narrative-experiences' | null;
  className?: string;
}

/**
 * Systems Map Diagram - Main canonical diagram for Travel & AI
 * Matches unified design language from SystemStack and project diagrams
 * 
 * Design tokens aligned with project pages:
 * - Typography: font-mono for section headers, uppercase tracking-wider
 * - Containers: Simple rounded borders, minimal backgrounds
 * - Flow indicators: Simple arrow characters (→)
 * - Color: Neutral grays, black/95 for foundational systems
 * - Spacing: Consistent gaps (gap-8, gap-12)
 */
export default function SystemsMapDiagram({
  showTitle = true,
  highlightedSection = null,
  className = '',
}: SystemsMapDiagramProps) {
  return (
    <div className={`w-full ${className}`} role="img" aria-label="Modular AI Systems for Context-Aware Travel diagram" key="systems-map-diagram">
      {/* Title Section */}
      {showTitle && (
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
            Modular AI Systems for Context-Aware Travel
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-light" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
            A shared intelligence layer powering multiple travel experiences
          </p>
        </div>
      )}

      {/* Diagram Container */}
      <div className="w-full">
        {/* Desktop: Horizontal Layout */}
        <div className="hidden lg:flex items-start justify-between gap-8 lg:gap-12">
          {/* LEFT COLUMN - Inputs */}
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-xs font-mono text-black/40 uppercase tracking-wider mb-6">
                Inputs
              </h3>
              <div className="space-y-3">
                {[
                  'Location',
                  'Time',
                  'Environment',
                  'User Intent',
                  'Cultural Context',
                ].map((item, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 bg-white border border-gray-200 rounded text-sm text-gray-900"
                    style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
                  >
                    {item}
                    {item === 'Environment' && (
                      <div className="text-xs text-gray-500 mt-1 font-normal">
                        (weather, transportation, crowd density)
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Flow Arrow */}
          <div className="flex items-center justify-center pt-12">
            <span className="text-gray-400 text-xl">→</span>
          </div>

          {/* CENTER COLUMN - Foundational Systems */}
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-xs font-mono text-black/40 uppercase tracking-wider mb-6">
                Foundational AI Systems
              </h3>
              <div className="space-y-3">
                {/* Spontaneity Engine */}
                <div
                  className={`px-4 py-3 bg-black/95 text-white rounded border transition-all ${
                    highlightedSection === 'spontaneity-engine'
                      ? 'border-blue-500/50 shadow-lg shadow-blue-500/10'
                      : 'border-black/20'
                  }`}
                >
                  <div className="text-sm font-semibold mb-1" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Spontaneity Engine
                  </div>
                  <div className="text-xs text-white/60 font-normal" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                    When and whether the system intervenes
                  </div>
                </div>

                {/* Trust & Authenticity Layer */}
                <div
                  className={`px-4 py-3 bg-black/95 text-white rounded border transition-all ${
                    highlightedSection === 'trust-layer'
                      ? 'border-blue-500/50 shadow-lg shadow-blue-500/10'
                      : 'border-black/20'
                  }`}
                >
                  <div className="text-sm font-semibold mb-1" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Trust & Authenticity Layer
                  </div>
                  <div className="text-xs text-white/60 font-normal" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                    What can be confidently recommended
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flow Arrow */}
          <div className="flex items-center justify-center pt-12">
            <span className="text-gray-400 text-xl">→</span>
          </div>

          {/* RIGHT COLUMN - Applied Systems */}
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-xs font-mono text-black/40 uppercase tracking-wider mb-6">
                Applied Systems
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Travel Decisions', key: 'travel-decisions' },
                  { name: 'Social Micro-Events', key: 'social-events' },
                  { name: 'Narrative Experiences', key: 'narrative-experiences' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`px-4 py-3 bg-white border border-gray-200 rounded text-sm text-gray-900 transition-all ${
                      highlightedSection === item.key
                        ? 'border-blue-500 shadow-md shadow-blue-500/10'
                        : ''
                    }`}
                    style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Stack */}
        <div className="lg:hidden space-y-8">
          {/* Inputs */}
          <div>
            <h3 className="text-xs font-mono text-black/40 uppercase tracking-wider mb-4">
              Inputs
            </h3>
            <div className="space-y-2">
              {[
                'Location',
                'Time',
                'Environment',
                'User Intent',
                'Cultural Context',
              ].map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-3 bg-white border border-gray-200 rounded text-sm text-gray-900"
                  style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
                >
                  {item}
                  {item === 'Environment' && (
                    <div className="text-xs text-gray-500 mt-1 font-normal">
                      (weather, transportation, crowd density)
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Flow Arrow (Down) */}
          <div className="flex items-center justify-center">
            <span className="text-gray-400 text-xl">↓</span>
          </div>

          {/* Foundational Systems */}
          <div>
            <h3 className="text-xs font-mono text-black/40 uppercase tracking-wider mb-4">
              Foundational AI Systems
            </h3>
            <div className="space-y-3">
              {/* Spontaneity Engine */}
              <div
                className={`px-4 py-3 bg-black/95 text-white rounded border transition-all ${
                  highlightedSection === 'spontaneity-engine'
                    ? 'border-blue-500/50 shadow-lg shadow-blue-500/10'
                    : 'border-black/20'
                }`}
              >
                <div className="text-sm font-semibold mb-1" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  Spontaneity Engine
                </div>
                <div className="text-xs text-white/60 font-normal" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                  When and whether the system intervenes
                </div>
              </div>

              {/* Trust & Authenticity Layer */}
              <div
                className={`px-4 py-3 bg-black/95 text-white rounded border transition-all ${
                  highlightedSection === 'trust-layer'
                    ? 'border-blue-500/50 shadow-lg shadow-blue-500/10'
                    : 'border-black/20'
                }`}
              >
                <div className="text-sm font-semibold mb-1" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  Trust & Authenticity Layer
                </div>
                <div className="text-xs text-white/60 font-normal" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                  What can be confidently recommended
                </div>
              </div>
            </div>
          </div>

          {/* Flow Arrow (Down) */}
          <div className="flex items-center justify-center">
            <span className="text-gray-400 text-xl">↓</span>
          </div>

          {/* Applied Systems */}
          <div>
            <h3 className="text-xs font-mono text-black/40 uppercase tracking-wider mb-4">
              Applied Systems
            </h3>
            <div className="space-y-2">
              {[
                { name: 'Travel Decisions', key: 'travel-decisions' },
                { name: 'Social Micro-Events', key: 'social-events' },
                { name: 'Narrative Experiences', key: 'narrative-experiences' },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`px-4 py-3 bg-white border border-gray-200 rounded text-sm text-gray-900 transition-all ${
                    highlightedSection === item.key
                      ? 'border-blue-500 shadow-md shadow-blue-500/10'
                      : ''
                  }`}
                  style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
