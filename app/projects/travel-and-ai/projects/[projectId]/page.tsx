import TravelProjectDetailClient from './TravelProjectDetailClient';
import ProductSurfaceView from './ProductSurfaceView';
import type { Metadata } from 'next';

// 1. Updated Static Params to include both Surface and Logic variants
export function generateStaticParams() {
  const baseIds = [
    'context-aware-travel-decision-system',
    'social-opportunity-matching-module',
    'social-graph-driven-travel-network',
    'narrative-driven-travel-experience-generator'
  ];

  // Map the base IDs for "The Glass" (Product Surfaces)
  const surfaceParams = baseIds.map(id => ({ projectId: id }));

  // Map the base IDs for "The Middleware" (Intelligence Modules) with the -logic suffix
  const logicParams = baseIds.map(id => ({ projectId: `${id}-logic` }));

  // Add the standalone foundational projects
  const otherParams = [
    { projectId: 'spontaneous-travel-companion' },
    { projectId: 'trust-framework-ai-travel' }
  ];

  return [...surfaceParams, ...logicParams, ...otherParams];
}

// 2. Updated Metadata to handle cleaned IDs for titles
export async function generateMetadata({ params }: { params: { projectId: string } }): Promise<Metadata> {
  const rawId = params?.projectId || '';
  const isLogic = rawId.endsWith('-logic');
  const cleanId = isLogic ? rawId.replace('-logic', '') : rawId;

  const titles: Record<string, string> = {
    'spontaneous-travel-companion': 'Spontaneous Travel Engine - Daniel Meier',
    'trust-framework-ai-travel': 'A Trust Framework for AI-Driven Travel Experiences - Daniel Meier',
    'context-aware-travel-decision-system': 'Context-Aware Travel Decision System - Daniel Meier',
    'social-graph-driven-travel-network': 'Social Graph-Driven Travel Network - Daniel Meier',
    'social-opportunity-matching-module': 'Spontaneous Social Opportunity Matching - Daniel Meier',
    'narrative-driven-travel-experience-generator': 'Narrative-Driven Travel Experience Generator - Daniel Meier'
  };

  const baseTitle = titles[cleanId] || 'Travel & AI Project';
  return {
    title: isLogic ? `${baseTitle} (System Logic)` : baseTitle,
  };
}

// 3. Main Page Switcher Logic
export default function TravelProjectDetailPage({ params }: { params: { projectId: string } }) {
  // ✅ Extract the raw ID from the URL
  const rawId = params?.projectId || '';

  // Detect if the user clicked a link from the "Middleware" section (ending in -logic)
  const isLogicView = rawId.endsWith('-logic');
  
  // Clean the ID so both templates can find the correct data in data.ts
  const cleanId = isLogicView ? rawId.replace('-logic', '') : rawId;

  // IDs categorized as "Product Surfaces" (The Glass)
  const productSurfaceIds = [
    'context-aware-travel-decision-system',
    'social-opportunity-matching-module',
    'social-graph-driven-travel-network',
    'narrative-driven-travel-experience-generator'
  ];

  /**
   * ROUTING LOGIC:
   * 1. If it's a Surface ID and NOT a logic request -> Show "The Glass" (UI/UX focus)
   * 2. Otherwise -> Show "The Middleware" (Technical/Logic focus)
   */
  if (productSurfaceIds.includes(cleanId) && !isLogicView) {
    return <ProductSurfaceView projectId={cleanId} />;
  }
  
  // Fallback to the standard technical detail client (Intelligence Modules / The Brain)
  return <TravelProjectDetailClient project={null} projectId={cleanId} />;
}