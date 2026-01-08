'use client';

/**
 * HomePageWebGL
 * - Page-specific WebGL instance (NO singletons)
 * - Full cleanup on unmount with forceContextLoss()
 * - Route change detection to kill WebGL immediately
 * - Isolated renderer, scene, camera per page mount
 * - Defensive guards for WebGL initialization failures
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import * as THREE from 'three';
import { WebGLProvider } from './WebGLContext';
import ParallaxSection from './ParallaxSection';

export default function HomePageWebGL() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const resizeHandlerRef = useRef<(() => void) | null>(null);
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);
  const isMountedRef = useRef(false);
  const isCleaningUpRef = useRef(false); // Prevent multiple cleanup calls
  const [webglError, setWebglError] = useState<string | null>(null);
  // State for WebGL objects passed to provider (triggers re-render when ready)
  const [webglReady, setWebglReady] = useState(false);

  // ✅ PHASE 3: Route change detection - kill WebGL IMMEDIATELY when leaving homepage
  useEffect(() => {
    if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
      console.log('[HomePageWebGL] route changed - killing WebGL immediately', {
        from: prevPathnameRef.current,
        to: pathname,
      });
      
      // ✅ Kill immediately - don't wait for cleanup
      cleanupWebGL();
    }
    prevPathnameRef.current = pathname;
  }, [pathname]);

  // ✅ Cleanup function - GUARANTEED cleanup
  // Use useCallback to prevent recreation and ensure stable reference
  const cleanupWebGL = useCallback(() => {
    // ✅ Guard: Prevent multiple cleanup calls
    if (isCleaningUpRef.current) {
      console.log('[HomePageWebGL] cleanup already in progress, skipping');
      return;
    }
    isCleaningUpRef.current = true;
    
    console.log('[HomePageWebGL] cleanup - disposing WebGL');

    // Cancel animation frame FIRST
    if (frameIdRef.current !== null) {
      cancelAnimationFrame(frameIdRef.current);
      frameIdRef.current = null;
    }

    // Remove resize listener
    if (resizeHandlerRef.current) {
      window.removeEventListener('resize', resizeHandlerRef.current);
      resizeHandlerRef.current = null;
    }

    // Clear scene
    if (sceneRef.current) {
      // Dispose all objects in scene
      sceneRef.current.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(m => m.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      sceneRef.current.clear();
      sceneRef.current = null;
    }

    // Dispose renderer
    // ✅ React owns the DOM lifecycle - we only dispose Three.js resources
    // The canvas will be automatically removed when React unmounts the container div
    if (rendererRef.current) {
      try {
        // Dispose renderer and force context loss
        // DO NOT manually remove the canvas - React will handle DOM removal
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
      } catch (error) {
        console.warn('[HomePageWebGL] error during renderer disposal:', error);
      }
      rendererRef.current = null;
    }

    // Clear refs
    cameraRef.current = null;
    isMountedRef.current = false;
    
    // ✅ Defer state updates to avoid React error #418 (updates during render)
    // Use setTimeout to ensure state updates happen outside of render phase
    setTimeout(() => {
      setWebglError(null);
      setWebglReady(false);
      isCleaningUpRef.current = false; // Reset cleanup flag
    }, 0);
  }, []); // Empty deps - cleanup function doesn't depend on props/state

  // ✅ PHASE 2: Main WebGL initialization - page-specific, no singletons
  useEffect(() => {
    // Skip on server-side
    if (typeof window === 'undefined') return;
    if (!containerRef.current) return;

    // Only render on homepage
    if (pathname !== '/') {
      console.log('[HomePageWebGL] skipped - not on homepage', { pathname });
      return;
    }

    // Prevent double initialization
    if (isMountedRef.current) {
      console.log('[HomePageWebGL] already mounted, skipping');
      return;
    }

    console.log('[HomePageWebGL] initializing WebGL', { pathname });
    
    // ✅ Reset cleanup flag when initializing
    isCleaningUpRef.current = false;
    
    try {
      isMountedRef.current = true;

      // ✅ Create renderer with error handling
      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        });
      } catch (error) {
        console.error('[HomePageWebGL] failed to create renderer:', error);
        setWebglError('WebGL not supported');
        isMountedRef.current = false;
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;

      // ✅ Create scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // ✅ Create camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      if (camera && camera.position && typeof camera.position.set === 'function') {
        camera.position.set(0, 0, 5);
      }
      cameraRef.current = camera;

      // ✅ Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 1);
      if (pointLight && pointLight.position && typeof pointLight.position.set === 'function') {
        pointLight.position.set(5, 5, 5);
      }
      scene.add(pointLight);

      // ✅ Append canvas
      containerRef.current.appendChild(renderer.domElement);

      // ✅ Mark WebGL as ready (triggers WebGLProvider re-render)
      setWebglReady(true);

      // ✅ Render loop with guards
      const animate = () => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current) {
          return;
        }
        
        // Check if context is lost
        const context = rendererRef.current.getContext();
        if (context && context.isContextLost()) {
          console.warn('[HomePageWebGL] WebGL context lost, stopping animation');
          return;
        }
        
        try {
          frameIdRef.current = requestAnimationFrame(animate);
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        } catch (error) {
          console.error('[HomePageWebGL] render error:', error);
          // Stop animation on error
          if (frameIdRef.current !== null) {
            cancelAnimationFrame(frameIdRef.current);
            frameIdRef.current = null;
          }
        }
      };
      animate();

      // ✅ Resize handler
      const handleResize = () => {
        if (!rendererRef.current || !cameraRef.current) return;
        if (!(cameraRef.current instanceof THREE.PerspectiveCamera)) return;
        
        const context = rendererRef.current.getContext();
        if (context && context.isContextLost()) {
          console.warn('[HomePageWebGL] WebGL context lost, skipping resize');
          return;
        }
        
        try {
          cameraRef.current.aspect = window.innerWidth / window.innerHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        } catch (error) {
          console.error('[HomePageWebGL] resize error:', error);
        }
      };
      resizeHandlerRef.current = handleResize;
      window.addEventListener('resize', handleResize);

      // ✅ Context loss handlers
      const handleContextLost = (event: Event) => {
        event.preventDefault();
        console.warn('[HomePageWebGL] WebGL context lost');
        if (frameIdRef.current !== null) {
          cancelAnimationFrame(frameIdRef.current);
          frameIdRef.current = null;
        }
      };

      const handleContextRestored = () => {
        console.log('[HomePageWebGL] WebGL context restored - reinitializing');
        // Reinitialize on context restore
        cleanupWebGL();
        // Trigger re-mount by updating a state or re-running effect
        isMountedRef.current = false;
      };

      const canvas = renderer.domElement;
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);

      // ✅ Cleanup function - GUARANTEED cleanup
      return () => {
        console.log('[HomePageWebGL] useEffect cleanup - disposing WebGL');
        
        // Remove event listeners
        if (canvas) {
          canvas.removeEventListener('webglcontextlost', handleContextLost);
          canvas.removeEventListener('webglcontextrestored', handleContextRestored);
        }
        
        cleanupWebGL();
      };
    } catch (error) {
      console.error('[HomePageWebGL] initialization error:', error);
      setWebglError('WebGL initialization failed');
      isMountedRef.current = false;
    }
  }, [pathname]); // Re-run on pathname change

  // ✅ PHASE 4: Only render on homepage
  if (pathname !== '/') {
    return null;
  }

  // ✅ PHASE 6: Defensive fallback UI if WebGL fails
  if (webglError) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="text-center text-gray-400 text-sm">
          WebGL unavailable
        </div>
      </div>
    );
  }

  return (
    <WebGLProvider
      scene={sceneRef.current}
      camera={cameraRef.current}
      renderer={rendererRef.current}
    >
      <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="-mt-16 md:-mt-20">
        <ParallaxSection
          title="Always Curious."
          description=""
          modelPath="ai-travel"
          enabled={true}
          className="bg-transparent"
        />
      </div>
      <ParallaxSection
        title="I'm a designer and builder, but traveling the world is what really shaped my perspective. It taught me to build digital experiences that don't just work, but actually care for our global family and the planet we call home."
        description=""
        modelPath="torus"
        enabled={true}
        className="bg-transparent"
        hideGradient={true}
        textColor="black"
      />
    </WebGLProvider>
  );
}
