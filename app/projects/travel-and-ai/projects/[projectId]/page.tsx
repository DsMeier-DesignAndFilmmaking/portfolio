import TravelProjectDetailClient from './TravelProjectDetailClient';
import ProductSurfaceView from './ProductSurfaceView';
import type { Metadata } from 'next';
import { projectRegistry } from '../data';

// 1. Updated Static Params to include both Surface and Logic variants
const productSurfaceIds = [
  'context-aware-travel-decision-system',
  'social-opportunity-matching-module',
  'social-graph-driven-travel-network',
  'narrative-driven-travel-experience-generator'
] as const;

export function generateStaticParams() {
  const projectIds = Object.keys(projectRegistry);

  // Map all data-backed project IDs
  const projectParams = projectIds.map(id => ({ projectId: id }));

  // Add "The Middleware" (Intelligence Modules) with the -logic suffix
  const logicParams = productSurfaceIds.map(id => ({ projectId: `${id}-logic` }));

  return [...projectParams, ...logicParams];
}

// 2. Updated Metadata to handle cleaned IDs for titles
export async function generateMetadata({ params }: { params: Promise<{ projectId: string }> }): Promise<Metadata> {
  const { projectId } = await params;
  const rawId = projectId || '';
  const isLogic = rawId.endsWith('-logic');
  const cleanId = isLogic ? rawId.replace('-logic', '') : rawId;

  const titleOverrides: Record<string, string> = {
    'spontaneous-travel-companion': 'Spontaneous Travel Engine — Dan Meier',
    'trust-framework-ai-travel': 'A Trust Framework for AI-Driven Travel Experiences — Dan Meier',
    'context-aware-travel-decision-system': 'Context-Aware Travel Decision System — Dan Meier',
    'social-graph-driven-travel-network': 'Social Graph-Driven Travel Network — Dan Meier',
    'social-opportunity-matching-module': 'Spontaneous Social Opportunity Matching — Dan Meier',
    'narrative-driven-travel-experience-generator': 'Narrative-Driven Travel Experience Generator — Dan Meier'
  };

  const registryProject = projectRegistry[cleanId as keyof typeof projectRegistry];
  const registryTitle = registryProject?.title ? `${registryProject.title} — Dan Meier` : undefined;
  const baseTitle = titleOverrides[cleanId] || registryTitle || 'Travel & AI Project';
  return {
    title: isLogic ? `${baseTitle} (System Logic)` : baseTitle,
  };
}

// 3. Main Page Switcher Logic
export default async function TravelProjectDetailPage({ params }: { params: Promise<{ projectId: string }> }) {
  // ✅ Extract the raw ID from the URL
  const { projectId } = await params;
  const rawId = projectId || '';

  // Detect if the user clicked a link from the "Middleware" section (ending in -logic)
  const isLogicView = rawId.endsWith('-logic');
  
  // Clean the ID so both templates can find the correct data in data.ts
  const cleanId = isLogicView ? rawId.replace('-logic', '') : rawId;

  const registryProject = projectRegistry[cleanId as keyof typeof projectRegistry];
  const normalizedProject = registryProject
    ? {
        ...registryProject,
        tagline: (registryProject as { tagline?: string }).tagline ?? registryProject.subtitle,
      }
    : null;

  /**
   * ROUTING LOGIC:
   * 1. If it's a Surface ID and NOT a logic request -> Show "The Glass" (UI/UX focus)
   * 2. Otherwise -> Show "The Middleware" (Technical/Logic focus)
   */
  if (productSurfaceIds.includes(cleanId as typeof productSurfaceIds[number]) && !isLogicView) {
    return <ProductSurfaceView projectId={cleanId} />;
  }
  
  // Fallback to the standard technical detail client (Intelligence Modules / The Brain)
  return <TravelProjectDetailClient project={normalizedProject} projectId={cleanId} />;
}
