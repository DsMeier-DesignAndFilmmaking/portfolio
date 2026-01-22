'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ProjectNavigationProps {
  currentProjectId: string;
}

interface ProjectLink {
  id: string;
  title: string;
  path: string;
}

const ALL_PROJECTS: ProjectLink[] = [
  {
    id: 'spontaneous-travel-companion',
    title: 'Spontaneous Travel Companion',
    path: '/projects/travel-and-ai/projects/spontaneous-travel-companion',
  },
  {
    id: 'trust-framework-ai-travel',
    title: 'Trust Framework',
    path: '/projects/travel-and-ai/projects/trust-framework-ai-travel',
  },
  {
    id: 'context-aware-travel-decision-system-logic',
    title: 'Context-Aware Decision Logic',
    path: '/projects/travel-and-ai/projects/context-aware-travel-decision-system-logic',
  },
  {
    id: 'social-graph-driven-travel-network-logic',
    title: 'Social Graph Network',
    path: '/projects/travel-and-ai/projects/social-graph-driven-travel-network-logic',
  },
  {
    id: 'social-opportunity-matching-module-logic',
    title: 'Social Opportunity Matching',
    path: '/projects/travel-and-ai/projects/social-opportunity-matching-module-logic',
  },
  {
    id: 'narrative-driven-travel-experience-generator-logic',
    title: 'Narrative Experience Generator',
    path: '/projects/travel-and-ai/projects/narrative-driven-travel-experience-generator-logic',
  },
];

// Define the logical next step in the user journey
// Maps both base IDs and logic IDs to their next step
const NEXT_LOGICAL_STEP: Record<string, string> = {
  'spontaneous-travel-companion': 'trust-framework-ai-travel',
  'trust-framework-ai-travel': 'context-aware-travel-decision-system-logic',
  'context-aware-travel-decision-system': 'context-aware-travel-decision-system-logic',
  'context-aware-travel-decision-system-logic': 'social-graph-driven-travel-network-logic',
  'social-graph-driven-travel-network': 'social-opportunity-matching-module-logic',
  'social-graph-driven-travel-network-logic': 'social-opportunity-matching-module-logic',
  'social-opportunity-matching-module': 'narrative-driven-travel-experience-generator-logic',
  'social-opportunity-matching-module-logic': 'narrative-driven-travel-experience-generator-logic',
  'narrative-driven-travel-experience-generator': '',
  'narrative-driven-travel-experience-generator-logic': '', // End of journey
};

export default function ProjectNavigation({ currentProjectId }: ProjectNavigationProps) {
  const pathname = usePathname();
  
  // Normalize current project ID (extract just the ID part if it's a full path)
  const normalizedCurrentId = currentProjectId.replace(/\/$/, '').split('/').pop() || currentProjectId;
  
  // Check the actual URL to see if we're on a logic page (ends with -logic)
  const isActuallyLogicPage = pathname?.endsWith('-logic') || pathname?.endsWith('-logic/');
  
  // Map base IDs to their logic equivalents
  const baseToLogicMap: Record<string, string> = {
    'context-aware-travel-decision-system': 'context-aware-travel-decision-system-logic',
    'social-graph-driven-travel-network': 'social-graph-driven-travel-network-logic',
    'social-opportunity-matching-module': 'social-opportunity-matching-module-logic',
    'narrative-driven-travel-experience-generator': 'narrative-driven-travel-experience-generator-logic',
  };

  // Product Glass page IDs (the 4 base IDs that use ProductSurfaceView)
  const productGlassPageIds = [
    'context-aware-travel-decision-system',
    'social-opportunity-matching-module',
    'social-graph-driven-travel-network',
    'narrative-driven-travel-experience-generator',
  ];

  // Check if we're on a Product Glass page
  const isProductGlassPage = productGlassPageIds.includes(normalizedCurrentId);
  
  // Get the logic version ID if it exists
  const logicVersionId = baseToLogicMap[normalizedCurrentId];

  // Determine which project IDs to exclude
  let idsToExclude: Set<string>;
  
  if (isProductGlassPage && !isActuallyLogicPage) {
    // On Product Glass pages (ProductSurfaceView): Show all 6 links, only exclude the current page itself
    // Don't exclude the logic version - it should be shown
    idsToExclude = new Set([normalizedCurrentId]);
  } else {
    // On other pages (Logic pages, etc.): Use existing exclusion logic
    // Exclude both the current page and its related version (base/logic)
    idsToExclude = new Set([
      normalizedCurrentId,
      // Exclude the base version if we're on a logic page
      normalizedCurrentId.endsWith('-logic') ? normalizedCurrentId.replace('-logic', '') : '',
      // Exclude the logic version if we're on a base page (for non-Product Glass pages or logic pages)
      baseToLogicMap[normalizedCurrentId] || '',
    ].filter(Boolean));
    
    // If we're actually on a logic page (URL ends with -logic), explicitly exclude the logic version
    if (isActuallyLogicPage && logicVersionId) {
      idsToExclude.add(logicVersionId);
    }
  }
  
  // Special case: On social-graph-driven-travel-network-logic page, ensure Social Graph Network is excluded
  if (normalizedCurrentId === 'social-graph-driven-travel-network-logic' || 
      (normalizedCurrentId === 'social-graph-driven-travel-network' && isActuallyLogicPage)) {
    idsToExclude.add('social-graph-driven-travel-network-logic');
  }
  
  // Special case: On context-aware-travel-decision-system-logic page, ensure Context-Aware Decision Logic is excluded
  if (normalizedCurrentId === 'context-aware-travel-decision-system-logic' || 
      (normalizedCurrentId === 'context-aware-travel-decision-system' && isActuallyLogicPage)) {
    idsToExclude.add('context-aware-travel-decision-system-logic');
  }

  // Filter out the current project (check against all variations)
  const availableProjects = ALL_PROJECTS.filter(project => {
    const projectPathId = project.path.split('/').pop() || '';
    return !idsToExclude.has(projectPathId) && !idsToExclude.has(project.id);
  });

  // Determine which project is the "next logical step"
  // For base IDs, map to logic ID first to find next step
  const logicEquivalent = baseToLogicMap[normalizedCurrentId] || normalizedCurrentId;
  const nextLogicalStepId = NEXT_LOGICAL_STEP[normalizedCurrentId] || NEXT_LOGICAL_STEP[logicEquivalent] || '';

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-3xl font-bold mb-8 text-gray-900 tracking-tight" 
              style={{ fontFamily: "'tiempos-headline-regular', serif" }}
            >
              Explore more in the AI Travel Ecosystem (The Logic Layer)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableProjects.map((project) => (
                <Link
                  key={project.id}
                  href={project.path}
                  className="group flex items-center justify-between p-5 rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
                >
                  <span className="font-medium text-gray-900">
                    {project.title}
                  </span>
                  <svg 
                    className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-300"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" 
                    />
                  </svg>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
