'use client';

import React from 'react';

interface SystemBlock {
  label: string;
  subtitle?: string;
  type?: 'input' | 'foundational' | 'applied';
}

interface SystemDiagramProps {
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
  sections: {
    label: string;
    blocks: SystemBlock[];
  }[];
  highlightedSection?: string | null;
  className?: string;
}

/**
 * Unified SystemDiagram component
 * Matches the visual language used across Travel & AI project pages
 * 
 * Design tokens:
 * - Typography: Uppercase section headers with tracking-wider, monospace for technical labels
 * - Containers: Simple rounded borders, minimal backgrounds
 * - Flow indicators: Simple arrows (→ or SVG)
 * - Color: Mostly neutral grays with subtle accent colors
 * - Spacing: Consistent gaps (gap-6, gap-8, gap-12)
 * - Borders: Thin borders (border, border-2), subtle colors
 */
export default function SystemDiagram({
  title,
  subtitle,
  showTitle = true,
  sections,
  highlightedSection = null,
  className = '',
}: SystemDiagramProps) {
  return (
    <div className={`w-full ${className}`} role="img" aria-label={title || 'System diagram'}>
      {/* Title Section */}
      {showTitle && title && (
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm md:text-base text-gray-600 font-light" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Diagram Container */}
      <div className="w-full">
        {/* Desktop: Horizontal Layout */}
        <div className="hidden lg:flex items-start justify-between gap-8 lg:gap-12">
          {sections.map((section, sectionIndex) => (
            <React.Fragment key={sectionIndex}>
              {/* Section */}
              <div className="flex-1">
                <div className="mb-4">
                  <h3 className="text-xs font-mono text-black/40 uppercase tracking-wider mb-6" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                    {section.label}
                  </h3>
                  <div className="space-y-3">
                    {section.blocks.map((block, blockIndex) => {
                      const isFoundational = block.type === 'foundational' || (!block.type && sectionIndex === 1);
                      const isHighlighted = highlightedSection === block.label.toLowerCase().replace(/\s+/g, '-');
                      
                      return (
                        <div
                          key={blockIndex}
                          className={`px-4 py-3 rounded border transition-all ${
                            isFoundational
                              ? `bg-black/95 text-white border-black/20 ${
                                  isHighlighted ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : ''
                                }`
                              : `bg-white text-gray-900 border-gray-200 ${
                                  isHighlighted ? 'border-blue-500 shadow-md shadow-blue-500/10' : ''
                                }`
                          }`}
                          style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
                        >
                          <div className={`text-sm ${isFoundational ? 'font-semibold' : 'font-medium'}`} style={{ fontFamily: isFoundational ? "'tiempos-headline-regular', serif" : "'Roboto', Helvetica, sans-serif" }}>
                            {block.label}
                          </div>
                          {block.subtitle && (
                            <div className={`text-xs mt-1 ${isFoundational ? 'text-white/60' : 'text-gray-500'} font-normal`} style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                              {block.subtitle}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Flow Arrow (between sections, not after last) */}
              {sectionIndex < sections.length - 1 && (
                <div className="flex items-center justify-center pt-12">
                  <span className="text-gray-400 text-xl">→</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile: Vertical Stack */}
        <div className="lg:hidden space-y-8">
          {sections.map((section, sectionIndex) => (
            <React.Fragment key={sectionIndex}>
              {/* Section */}
              <div>
                <h3 className="text-xs font-mono text-black/40 uppercase tracking-wider mb-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                  {section.label}
                </h3>
                <div className="space-y-2">
                  {section.blocks.map((block, blockIndex) => {
                    const isFoundational = block.type === 'foundational' || (!block.type && sectionIndex === 1);
                    const isHighlighted = highlightedSection === block.label.toLowerCase().replace(/\s+/g, '-');
                    
                    return (
                      <div
                        key={blockIndex}
                        className={`px-4 py-3 rounded border transition-all ${
                          isFoundational
                            ? `bg-black/95 text-white border-black/20 ${
                                isHighlighted ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : ''
                              }`
                            : `bg-white text-gray-900 border-gray-200 ${
                                isHighlighted ? 'border-blue-500 shadow-md shadow-blue-500/10' : ''
                              }`
                        }`}
                        style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
                      >
                        <div className={`text-sm ${isFoundational ? 'font-semibold' : 'font-medium'}`} style={{ fontFamily: isFoundational ? "'tiempos-headline-regular', serif" : "'Roboto', Helvetica, sans-serif" }}>
                          {block.label}
                        </div>
                        {block.subtitle && (
                          <div className={`text-xs mt-1 ${isFoundational ? 'text-white/60' : 'text-gray-500'} font-normal`} style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                            {block.subtitle}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Flow Arrow (Down) */}
              {sectionIndex < sections.length - 1 && (
                <div className="flex items-center justify-center">
                  <span className="text-gray-400 text-xl">↓</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
