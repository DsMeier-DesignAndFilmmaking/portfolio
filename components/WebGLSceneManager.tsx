'use client';

/**
 * WebGLSceneManager
 * - Add / remove objects from the shared scene
 * - Update object state only
 * 
 * SafeCanvas owns the renderer, render loop, and resize handling.
 * This component only manages scene objects.
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
      <SafeCanvas />
      
      {/* Parallax sections add objects to the singleton scene */}
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
