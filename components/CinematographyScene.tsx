'use client';
import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { getScene, getCamera, getRenderer } from './SafeCanvas';

export default function CinematographyScene() {
  // ✅ ALL HOOKS MUST BE CALLED FIRST - React Rules of Hooks
  const pathname = usePathname();
  // Disable Three.js initialization on project routes to avoid race conditions
  const isProjectPage = pathname?.includes('/projects/') ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Memoize geometries and materials - these are static and don't need to change on route
  // Only recreate if component unmounts/remounts (empty deps = create once per component instance)
  const reelGeometry = useMemo(() => new THREE.TorusGeometry(1, 0.2, 16, 32), []);
  const reelMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color: 0x4a90e2,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  }), []);

  const stripGeometry = useMemo(() => new THREE.BoxGeometry(3, 0.1, 0.1), []);
  const stripMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color: 0x4a90e2,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  }), []);

  const frameGeometry = useMemo(() => new THREE.BoxGeometry(0.3, 0.2, 0.05), []);
  const frameMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color: 0x4a90e2,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  }), []);

  const lensGeometry = useMemo(() => new THREE.CylinderGeometry(0.5, 0.5, 0.2, 32), []);
  const lensMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color: 0x4a90e2,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  }), []);

  // ✅ Mounting guard: Prevent hydration crashes
  useEffect(() => {
    setMounted(true);
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Ensure DOM exists and skip on server-side
    if (typeof window === 'undefined') return undefined;
    
    // Skip initialization on project routes to avoid race conditions
    if (isProjectPage) {
      console.log('[CinematographyScene] skipped (project page)', { pathname, isProjectPage });
      return undefined;
    }
    
    console.log('[CinematographyScene] mounted', { pathname, isProjectPage });
    
    // ✅ Use singleton renderer/scene/camera from SafeCanvas
    const scene = getScene();
    const camera = getCamera();
    const renderer = getRenderer();
    
    if (!scene || !camera || !renderer) {
      console.warn('[CinematographyScene] singleton renderer/scene/camera not initialized yet');
      return;
    }

    // Create cinematography elements
    const filmGroup = new THREE.Group();

    // Create film reel using memoized geometry and material
    const reel = new THREE.Mesh(reelGeometry, reelMaterial);
    filmGroup.add(reel);

    // Create film strip using memoized geometry and material
    const strip = new THREE.Mesh(stripGeometry, stripMaterial);
    // ✅ Guard: Ensure strip is valid and .set() exists before setting position
    if (strip && strip.position && typeof strip.position.set === 'function') {
      strip.position.set(0, 0, 0);
    }
    filmGroup.add(strip);

    // Create film frames using memoized geometry and material
    for (let i = -1; i <= 1; i++) {
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      // ✅ Guard: Ensure frame is valid and .set() exists before setting position
      if (frame && frame.position && typeof frame.position.set === 'function') {
        frame.position.set(i * 1, 0, 0);
      }
      filmGroup.add(frame);
    }

    // Create camera lens using memoized geometry and material
    const lens = new THREE.Mesh(lensGeometry, lensMaterial);
    // ✅ Guard: Ensure lens is valid before setting rotation and position
    if (lens && lens.rotation && lens.position) {
      // ✅ Soft update: rotation.x is a number, but we guard it
      if (typeof lens.rotation.x === 'number') {
        lens.rotation.x = Math.PI / 2;
      }
      // ✅ Soft update: Use .set() for position
      if (typeof lens.position.set === 'function') {
        lens.position.set(0, 0, -1);
      }
    }
    filmGroup.add(lens);

    scene.add(filmGroup);
    modelRef.current = filmGroup;

    // ✅ Lights are managed by SafeCanvas - no need to add them here
    // Lights are shared across all scenes and persist for the session

    // ✅ Animation loop - SafeCanvas handles rendering, we just update object rotation
    const animate = () => {
      // ✅ Guard: Ensure modelRef is valid and is an Object3D before mutating
      if (!modelRef.current) return;
      if (!(modelRef.current instanceof THREE.Object3D)) return;
      
      frameIdRef.current = requestAnimationFrame(animate);

      // ✅ Guard: Ensure rotation exists and properties are numbers before mutating
      if (modelRef.current.rotation) {
        if (typeof modelRef.current.rotation.y === 'number') {
          modelRef.current.rotation.y += 0.003;
        }
        if (typeof modelRef.current.rotation.x === 'number') {
          modelRef.current.rotation.x += 0.002;
        }
      }
    };

    animate();

    // ⛔ NO RENDERER DISPOSAL - Renderer persists across route changes
    // Only cleanup animations and remove objects from scene
    return () => {
      console.log('[CinematographyScene] cleanup (renderer persists)', { pathname, isProjectPage });
      
      // Cancel animation frame
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
      
      // Remove objects from singleton scene
      const cleanupScene = getScene();
      if (!cleanupScene) return;
      
      // ✅ Guard: Ensure modelRef is valid and is an Object3D before removing
      if (!modelRef.current) return;
      if (!(modelRef.current instanceof THREE.Object3D)) {
        modelRef.current = null;
        return;
      }
      
      // Remove from scene (idempotent - safe to call multiple times)
      if (cleanupScene.children.includes(modelRef.current)) {
        cleanupScene.remove(modelRef.current);
      }
      
      // Dispose geometries and materials recursively
      modelRef.current.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if ('geometry' in mesh && mesh.geometry) {
          const geometry = mesh.geometry as THREE.BufferGeometry;
          if (geometry && typeof geometry.dispose === 'function') {
            geometry.dispose();
          }
        }
        if ('material' in mesh && mesh.material) {
          const mat = mesh.material as THREE.Material | THREE.Material[];
          if (Array.isArray(mat)) {
            mat.forEach(m => m.dispose());
          } else if (mat && typeof mat.dispose === 'function') {
            mat.dispose();
          }
        }
      });
      modelRef.current = null;
      
      // ⛔ DO NOT dispose renderer - it persists across route changes
      // ⛔ DO NOT dispose scene - it persists across route changes
    };
  }, [isProjectPage, reelGeometry, reelMaterial, stripGeometry, stripMaterial, frameGeometry, frameMaterial, lensGeometry, lensMaterial]); // Only re-init when isProjectPage changes, not on every route change

  // ✅ Mounting guard: Return null until mounted (AFTER all hooks)
  if (!mounted) {
    return null;
  }

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