'use client';

/**
 * HomePageWebGL
 * - Per-page WebGL instance (no singletons)
 * - Full cleanup on unmount with forceContextLoss()
 * - Route change detection to kill WebGL immediately
 * - Isolated renderer, scene, camera per page
 */

import { useEffect, useRef } from 'react';
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
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);
  const isMountedRef = useRef(false);

  // Route change detection - kill WebGL immediately when leaving homepage
  useEffect(() => {
    if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
      console.log('[HomePageWebGL] route changed - killing WebGL', {
        from: prevPathnameRef.current,
        to: pathname,
      });
      
      // Kill immediately
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        if (rendererRef.current.domElement.parentNode) {
          rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current = null;
      }
      if (sceneRef.current) {
        sceneRef.current.clear();
        sceneRef.current = null;
      }
      cameraRef.current = null;
      isMountedRef.current = false;
    }
    prevPathnameRef.current = pathname;
  }, [pathname]);

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
    isMountedRef.current = true;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
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

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    if (pointLight && pointLight.position && typeof pointLight.position.set === 'function') {
      pointLight.position.set(5, 5, 5);
    }
    scene.add(pointLight);

    // Append canvas
    containerRef.current.appendChild(renderer.domElement);

    // Render loop
    const animate = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
      frameIdRef.current = requestAnimationFrame(animate);
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!rendererRef.current || !cameraRef.current) return;
      if (!(cameraRef.current instanceof THREE.PerspectiveCamera)) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup function - GUARANTEED cleanup
    return () => {
      console.log('[HomePageWebGL] cleanup - disposing WebGL', { pathname });

      // Cancel animation frame
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }

      // Remove resize listener
      window.removeEventListener('resize', handleResize);

      // Clear scene
      if (sceneRef.current) {
        sceneRef.current.clear();
        sceneRef.current = null;
      }

      // Dispose renderer
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        
        // Remove canvas from DOM
        if (rendererRef.current.domElement.parentNode) {
          rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
        }
        
        rendererRef.current = null;
      }

      // Clear refs
      cameraRef.current = null;
      isMountedRef.current = false;
    };
  }, [pathname]); // Re-run on pathname change

  // Only render on homepage
  if (pathname !== '/') {
    return null;
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
