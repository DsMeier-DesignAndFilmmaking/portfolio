'use client';
import { useRef, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { useWebGL } from './WebGLContext';

interface SpecklesSceneProps {
  enabled?: boolean;
}

export default function SpecklesScene({ enabled = true }: SpecklesSceneProps = {}) {
  // ✅ ALL HOOKS MUST BE CALLED FIRST - React Rules of Hooks
  const [mounted, setMounted] = useState(false);
  const specklesRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const { scene, camera, renderer } = useWebGL();

  // Memoize material - this is static and doesn't need to change on route
  // Only recreate if component unmounts/remounts (empty deps = create once per component instance)
  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    color: 0xffffff
  }), []);

  // ✅ Mounting guard: Prevent hydration crashes
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!scene || !camera || !renderer) {
      console.log('[SpecklesScene] WebGL context not ready yet', { enabled });
      return undefined;
    }
    
    // ✅ Update scene visibility instead of unmounting
    if (!enabled) {
      console.log('[SpecklesScene] disabled, clearing scene', { enabled });
      // Clear scene contents but keep renderer alive
      if (!specklesRef.current) return;
      if (!(specklesRef.current instanceof THREE.Object3D)) {
        specklesRef.current = null;
        return;
      }
      
      // Remove from scene (idempotent - safe to call multiple times)
      if (scene.children.includes(specklesRef.current)) {
        scene.remove(specklesRef.current);
      }
      
      // Dispose geometry and material
      if (specklesRef.current.geometry) {
        specklesRef.current.geometry.dispose();
      }
      if (specklesRef.current.material) {
        const mat = specklesRef.current.material;
        if (Array.isArray(mat)) {
          mat.forEach(m => m.dispose());
        } else {
          mat.dispose();
        }
      }
      specklesRef.current = null;
      // Stop animations but keep renderer
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
      return;
    }
    
    console.log('[SpecklesScene] updating scene', { enabled });

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

    // ✅ Animation loop - SafeCanvas handles rendering, we just update object rotation
    // 🚨 Never call renderer.render() manually - SafeCanvas owns the render loop
    const animate = () => {
      // ✅ Guard: Ensure specklesRef is valid and is an Object3D before mutating
      if (!specklesRef.current) return;
      if (!(specklesRef.current instanceof THREE.Object3D)) return;
      
      frameIdRef.current = requestAnimationFrame(animate);

      // ✅ Guard: Ensure rotation exists and properties are numbers before mutating
      if (specklesRef.current.rotation) {
        if (typeof specklesRef.current.rotation.y === 'number') {
          specklesRef.current.rotation.y += 0.001;
        }
        if (typeof specklesRef.current.rotation.x === 'number') {
          specklesRef.current.rotation.x += 0.0005;
        }
      }
    };

    animate();

    // ⛔ NO RENDERER DISPOSAL - Renderer persists across route changes
    // Only cleanup animations and remove objects from scene
    return () => {
      console.log('[SpecklesScene] cleanup (renderer persists)', { enabled });
      
      // Cancel animation frame
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
      
      // Remove objects from scene
      const cleanupScene = scene;
      if (!cleanupScene) return;
      
      // ✅ Guard: Ensure specklesRef is valid and is an Object3D before removing
      if (!specklesRef.current) return;
      if (!(specklesRef.current instanceof THREE.Object3D)) {
        specklesRef.current = null;
        return;
      }
      
      // Remove from scene (idempotent - safe to call multiple times)
      if (cleanupScene.children.includes(specklesRef.current)) {
        cleanupScene.remove(specklesRef.current);
      }
      
      // Dispose geometry and material
      if (specklesRef.current.geometry) {
        specklesRef.current.geometry.dispose();
      }
      if (specklesRef.current.material) {
        const mat = specklesRef.current.material;
        if (Array.isArray(mat)) {
          mat.forEach(m => m.dispose());
        } else {
          mat.dispose();
        }
      }
      specklesRef.current = null;
      
    };
  }, [enabled, material, scene]); // ✅ Update scene when enabled changes

  // ✅ Mounting guard: Return null until mounted (AFTER all hooks)
  if (!mounted) {
    return null;
  }

  // Component doesn't render anything - it only adds objects to singleton scene
  return null;
} 