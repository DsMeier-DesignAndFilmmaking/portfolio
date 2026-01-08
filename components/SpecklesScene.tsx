'use client';
import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
// ⛔ Removed usePathname - no longer needed, scene updates via enabled prop
// ⛔ Removed renderer disposal hooks - renderers persist across route changes

interface SpecklesSceneProps {
  enabled?: boolean;
}

export default function SpecklesScene({ enabled = true }: SpecklesSceneProps = {}) {
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

  // Memoize material - this is static and doesn't need to change on route
  // Only recreate if component unmounts/remounts (empty deps = create once per component instance)
  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    color: 0xffffff
  }), []);

  useEffect(() => {
    // Ensure DOM exists and skip on server-side
    if (typeof window === 'undefined') return;
    
    // ✅ Update scene visibility instead of unmounting
    if (!enabled) {
      console.log('[SpecklesScene] disabled, clearing scene', { enabled });
      // Clear scene contents but keep renderer alive
      if (sceneRef.current && specklesRef.current) {
        sceneRef.current.remove(specklesRef.current);
        specklesRef.current = null;
      }
      // Stop animations but keep renderer
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
      return;
    }
    
    console.log('[SpecklesScene] updating scene', { enabled });
    if (!containerRef.current) return;

    // ⛔ SINGLETON PATTERN: Reuse renderer/scene/camera if they exist
    let scene = sceneRef.current;
    let camera = cameraRef.current;
    let renderer = rendererRef.current;

    // Create or reuse scene
    if (!scene) {
      scene = new THREE.Scene();
      sceneRef.current = scene;
      console.log('[SpecklesScene] created new scene');
    } else {
      // Clear existing scene contents
      while (scene.children.length > 0) {
        const child = scene.children[0];
        scene.remove(child);
      }
      console.log('[SpecklesScene] reusing existing scene');
    }

    // Create or reuse camera
    if (!camera) {
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
      cameraRef.current = camera;
      console.log('[SpecklesScene] created new camera');
    } else {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      console.log('[SpecklesScene] reusing existing camera');
    }

    // Create or reuse renderer
    if (!renderer) {
      renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true 
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      if (!containerRef.current || !containerRef.current.parentNode) return;
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
      console.log('[SpecklesScene] created new renderer');
    } else {
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (!containerRef.current.contains(renderer.domElement) && containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }
      console.log('[SpecklesScene] reusing existing renderer');
    }

    // Clear old refs
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

    // Cleanup resize listener
    // ⛔ DO NOT dispose renderer/scene/camera - they persist across route changes
    return () => {
      console.log('[SpecklesScene] cleanup (renderer persists)', { enabled });
      window.removeEventListener('resize', handleResize);
      
      // Stop animations
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
      
      // ⛔ DO NOT dispose renderer, scene, or camera here
      // They are reused on next enabled=true update
    };
  }, [enabled, material]); // ✅ Update scene when enabled changes, not on route change

  // ⛔ NO RENDERER DISPOSAL HOOKS - Renderers persist across route changes
  // All cleanup is handled in the useEffect return function above

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
      ref={containerRef}
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
  );
} 