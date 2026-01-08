'use client';

/**
 * WebGLSceneManager - Root-level WebGL scene coordinator
 * 
 * This component manages all WebGL/Three.js scenes from the root layout.
 * It ensures proper lifecycle management and prevents navigation crashes.
 * 
 * DO NOT place SafeCanvas in:
 * - Pages
 * - Project layouts  
 * - Transitions
 * - Conditional renders
 * 
 * This is the ONLY place SafeCanvas should be used.
 */

import { usePathname } from 'next/navigation';
import SafeCanvas from './SafeCanvas';
import dynamic from 'next/dynamic';

// Dynamically import ParallaxSection to avoid SSR issues
const ParallaxSection = dynamic(() => import('./ParallaxSection'), {
  ssr: false,
});

export default function WebGLSceneManager() {
  const pathname = usePathname();
  const isProjectPage = pathname?.includes('/projects/') ?? false;
  const isHomePage = pathname === '/';

  // ✅ Always render scenes, but control visibility via props
  // This prevents unmount/remount cycles
  const isEnabled = isHomePage && !isProjectPage;

  console.log('[WebGLSceneManager] rendering scenes', { pathname, isEnabled });

  return (
    <>
      {/* ✅ Only ONE SafeCanvas - singleton renderer/scene/camera */}
      <SafeCanvas />
      
      {/* Parallax sections - they add objects to the singleton scene */}
      <div className="-mt-16 md:-mt-20">
        <ParallaxSection
          title="Always Curious."
          description=""
          modelPath={isEnabled ? "ai-travel" : undefined}
          enabled={isEnabled}
          className="bg-transparent"
        />
      </div>

      <ParallaxSection
        title="I'm a designer and builder, but traveling the world is what really shaped my perspective. It taught me to build digital experiences that don't just work, but actually care for our global family and the planet we call home."
        description=""
        modelPath={isEnabled ? "torus" : undefined}
        enabled={isEnabled}
        className="bg-transparent"
        hideGradient={true}
        textColor="black"
      />
    </>
  );
}
