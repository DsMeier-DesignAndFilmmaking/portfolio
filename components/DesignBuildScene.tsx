'use client';
import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { getScene, getCamera, getRenderer } from './SafeCanvas';

export default function DesignBuildScene() {
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
  const cubeGeometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const cubeMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  }), []);

  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(0.5, 32, 32), []);
  const sphereMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  }), []);

  const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(1, 0, 0)
  ]), []);
  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.3,
  }), []);

  useEffect(() => {
    // Ensure DOM exists and skip on server-side
    if (typeof window === 'undefined') return;
    
    // Skip initialization on project routes to avoid race conditions
    if (isProjectPage) {
      console.log('[DesignBuildScene] skipped (project page)', { pathname, isProjectPage });
      return;
    }
    
    console.log('[DesignBuildScene] mounted', { pathname, isProjectPage });
    
    // ✅ Use singleton renderer/scene/camera from SafeCanvas
    const scene = getScene();
    const camera = getCamera();
    const renderer = getRenderer();
    
    if (!scene || !camera || !renderer) {
      console.warn('[DesignBuildScene] singleton renderer/scene/camera not initialized yet');
      return;
    }

    // Create design-build elements
    const designGroup = new THREE.Group();

    // Create a cube using memoized geometry and material
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // ✅ Guard: Ensure cube is valid before setting position
    if (cube && cube.position) {
      cube.position.set(-1, 0, 0);
    }
    designGroup.add(cube);

    // Create a sphere using memoized geometry and material
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // ✅ Guard: Ensure sphere is valid before setting position
    if (sphere && sphere.position) {
      sphere.position.set(1, 0, 0);
    }
    designGroup.add(sphere);

    // Create connecting lines using memoized geometry and material
    const line = new THREE.Line(lineGeometry, lineMaterial);
    designGroup.add(line);

    scene.add(designGroup);
    modelRef.current = designGroup;

    // Add lights (only if not already added)
    // ⚠️ Note: Lights are shared across scenes - they will persist unless explicitly removed
    const hasLights = scene.children.some(child => child instanceof THREE.AmbientLight);
    if (!hasLights) {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 1);
      // ✅ Guard: Ensure pointLight is valid before setting position
      if (pointLight && pointLight.position) {
        pointLight.position.set(5, 5, 5);
      }
      scene.add(pointLight);
    }

    // ✅ Animation loop - SafeCanvas handles rendering, we just update object rotation
    const animate = () => {
      // ✅ Guard: Ensure modelRef is valid and is an Object3D before mutating
      if (!modelRef.current) return;
      if (!(modelRef.current instanceof THREE.Object3D)) return;
      
      frameIdRef.current = requestAnimationFrame(animate);

      // ✅ Guard: Ensure rotation exists before mutating
      if (modelRef.current.rotation) {
        modelRef.current.rotation.y += 0.003;
        modelRef.current.rotation.x += 0.002;
      }
    };

    animate();

    // ⛔ NO RENDERER DISPOSAL - Renderer persists across route changes
    // Only cleanup animations and remove objects from scene
    return () => {
      console.log('[DesignBuildScene] cleanup (renderer persists)', { pathname, isProjectPage });
      
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
      
      // Dispose geometry and materials recursively
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
  }, [isProjectPage, cubeGeometry, cubeMaterial, sphereGeometry, sphereMaterial, lineGeometry, lineMaterial]); // Only re-init when isProjectPage changes, not on every route change

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