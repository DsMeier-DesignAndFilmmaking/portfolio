'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
  // Normalize current project ID (extract just the ID part if it's a full path)
  const normalizedCurrentId = currentProjectId.replace(/\/$/, '').split('/').pop() || currentProjectId;
  
  // Map base IDs to their logic equivalents for exclusion logic
  // If we're on a ProductSurfaceView (base ID), we should exclude the corresponding logic version
  const baseToLogicMap: Record<string, string> = {
    'context-aware-travel-decision-system': 'context-aware-travel-decision-system-logic',
    'social-graph-driven-travel-network': 'social-graph-driven-travel-network-logic',
    'social-opportunity-matching-module': 'social-opportunity-matching-module-logic',
    'narrative-driven-travel-experience-generator': 'narrative-driven-travel-experience-generator-logic',
  };

  // Determine which project IDs to exclude
  // If current ID is a base ID, exclude its logic version
  // If current ID is a logic ID, exclude it directly
  const logicIdToExclude = baseToLogicMap[normalizedCurrentId] || normalizedCurrentId;
  const idsToExclude = new Set([
    normalizedCurrentId,
    logicIdToExclude,
    // Also check if it's a logic ID and exclude the base version
    normalizedCurrentId.endsWith('-logic') ? normalizedCurrentId.replace('-logic', '') : '',
  ].filter(Boolean));

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
              Eplore more in the AI Travel Ecosystem
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableProjects.map((project) => {
                const projectPathId = project.path.split('/').pop() || '';
                const isNextStep = project.id === nextLogicalStepId || projectPathId === nextLogicalStepId;
                
                return (
                  <Link
                    key={project.id}
                    href={project.path}
                    className={`group flex items-center justify-between p-5 rounded-lg border transition-all duration-300 ${
                      isNextStep
                        ? 'border-blue-600 bg-blue-50 hover:border-blue-700 hover:bg-blue-100'
                        : 'border-gray-200 bg-white hover:border-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className={`font-medium ${
                      isNextStep ? 'text-gray-900 font-semibold' : 'text-gray-900'
                    }`}>
                      {project.title}
                    </span>
                    <svg 
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isNextStep 
                          ? 'text-blue-600 group-hover:text-blue-700' 
                          : 'text-gray-400 group-hover:text-blue-600'
                      }`}
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
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
