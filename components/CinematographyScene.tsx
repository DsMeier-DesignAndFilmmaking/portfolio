'use client';
import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { getScene, getCamera, getRenderer } from './SafeCanvas';

export default function CinematographyScene() {
  const pathname = usePathname();
  // Disable Three.js initialization on project routes to avoid race conditions
  const isProjectPage = pathname?.includes('/projects/') ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  useEffect(() => {
    // Ensure DOM exists and skip on server-side
    if (typeof window === 'undefined') return;
    
    // Skip initialization on project routes to avoid race conditions
    if (isProjectPage) {
      console.log('[CinematographyScene] skipped (project page)', { pathname, isProjectPage });
      return;
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
    strip.position.set(0, 0, 0);
    filmGroup.add(strip);

    // Create film frames using memoized geometry and material
    for (let i = -1; i <= 1; i++) {
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      frame.position.set(i * 1, 0, 0);
      filmGroup.add(frame);
    }

    // Create camera lens using memoized geometry and material
    const lens = new THREE.Mesh(lensGeometry, lensMaterial);
    lens.rotation.x = Math.PI / 2;
    lens.position.set(0, 0, -1);
    filmGroup.add(lens);

    scene.add(filmGroup);
    modelRef.current = filmGroup;

    // Add lights (only if not already added)
    const hasLights = scene.children.some(child => child instanceof THREE.AmbientLight);
    if (!hasLights) {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);
    }

    // ✅ Animation loop - SafeCanvas handles rendering, we just update object rotation
    const animate = () => {
      if (!modelRef.current) {
        return;
      }
      
      frameIdRef.current = requestAnimationFrame(animate);

      if (modelRef.current) {
        modelRef.current.rotation.y += 0.003;
        modelRef.current.rotation.x += 0.002;
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
      if (cleanupScene && modelRef.current) {
        cleanupScene.remove(modelRef.current);
        // Dispose geometries and materials recursively
        modelRef.current.traverse((child) => {
          if ('geometry' in child && child.geometry) {
            child.geometry.dispose();
          }
          if ('material' in child && child.material) {
            const mat = child.material;
            if (Array.isArray(mat)) {
              mat.forEach(m => m.dispose());
            } else {
              mat.dispose();
            }
          }
        });
        modelRef.current = null;
      }
      
      // ⛔ DO NOT dispose renderer - it persists across route changes
      // ⛔ DO NOT dispose scene - it persists across route changes
    };
  }, [isProjectPage, reelGeometry, reelMaterial, stripGeometry, stripMaterial, frameGeometry, frameMaterial, lensGeometry, lensMaterial]); // Only re-init when isProjectPage changes, not on every route change

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