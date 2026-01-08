'use client';
import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useThreeCleanup } from '@/hooks/useThreeCleanup';
import { useDeepDispose } from '@/hooks/useDeepDispose';

export default function SpecklesScene() {
  const pathname = usePathname();
  // Disable Three.js initialization on project routes to avoid race conditions
  const isProjectPage = pathname?.includes('/projects/') ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const specklesRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Memoize material to ensure fresh instance on remount
  // This prevents using disposed objects when navigating back
  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    color: 0xffffff
  }), [pathname]);

  useEffect(() => {
    // Ensure DOM exists and skip on server-side
    if (typeof window === 'undefined') return;
    
    // Skip initialization on project routes to avoid race conditions
    if (isProjectPage) return;
    if (!containerRef.current) return;

    // Reset refs before creating new objects (prevents stale references)
    sceneRef.current = null;
    cameraRef.current = null;
    rendererRef.current = null;
    specklesRef.current = null;
    frameIdRef.current = null;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Guard DOM mutation - prevent insertion if container unmounted
    if (!containerRef.current || !containerRef.current.parentNode) return;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    const domElement = renderer.domElement;

    // Create speckles
    const speckleCount = 1000;
    const positions = new Float32Array(speckleCount * 3);
    const colors = new Float32Array(speckleCount * 3);

    for (let i = 0; i < speckleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Color
      colors[i * 3] = 1;     // R
      colors[i * 3 + 1] = 1; // G
      colors[i * 3 + 2] = 1; // B
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Use memoized material instead of creating new one
    const speckles = new THREE.Points(geometry, material);
    scene.add(speckles);
    specklesRef.current = speckles;

    // Animation
    // Guard: ensure renderer exists before rendering
    const animate = () => {
      // Race condition check: ensure renderer still exists before first frame
      const currentRenderer = rendererRef.current;
      const currentScene = sceneRef.current;
      const currentCamera = cameraRef.current;
      
      if (!currentRenderer || !currentScene || !currentCamera) {
        return;
      }
      
      frameIdRef.current = requestAnimationFrame(animate);

      if (specklesRef.current) {
        specklesRef.current.rotation.y += 0.001;
        specklesRef.current.rotation.x += 0.0005;
      }

      currentRenderer.render(currentScene, currentCamera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup resize listener only (Three.js cleanup handled by hook)
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isProjectPage, pathname, material]); // Include pathname and memoized objects to recreate on route change

  // Use reusable cleanup hook for Three.js resources (handles canvas removal, etc.)
  useThreeCleanup({
    rendererRef,
    sceneRef,
    containerRef,
    frameIdRef,
    deps: [isProjectPage],
  });

  // Use deep disposal hook for comprehensive GPU memory cleanup
  // This ensures all geometries, materials, textures, and renderers are fully disposed
  // Critical for SpecklesScene which creates geometry with BufferAttributes
  // Include pathname in deps to trigger cleanup immediately on route change
  useDeepDispose({
    objectRef: sceneRef,
    rendererRef: rendererRef,
    onBeforeDispose: () => {
      // Cancel animation frame before disposal
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
    },
    onAfterDispose: () => {
      // Clean up refs after disposal
      specklesRef.current = null;
      cameraRef.current = null;
    },
    deps: [isProjectPage, pathname], // Re-run cleanup when route or project state changes
    verbose: process.env.NODE_ENV === 'development', // Enable verbose logging in dev
  });

  if (!isClient) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      key={pathname}
      ref={containerRef}
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
  );
} 