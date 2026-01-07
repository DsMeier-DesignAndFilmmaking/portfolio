/**
 * EXAMPLE: Using useThreeCleanup hook in a Three.js component
 * 
 * This example shows how to refactor a Three.js component to use
 * the reusable useThreeCleanup hook instead of inline cleanup logic.
 */

'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThreeCleanup } from '@/hooks/useThreeCleanup';
import { usePathname } from 'next/navigation';

export default function ExampleThreeScene() {
  const pathname = usePathname();
  // Disable Three.js initialization on project routes to avoid race conditions
  const isProjectPage = pathname?.includes('/projects/') ?? false;
  
  // Create refs for Three.js objects
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameIdRef = useRef<number | null>(null);
  
  // Initialize Three.js scene
  useEffect(() => {
    // Skip initialization on project routes
    if (isProjectPage) return;
    
    // Guard DOM mutation - prevent insertion if container unmounted
    if (!containerRef.current || !containerRef.current.parentNode) return;
    
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
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    
    // Guard DOM mutation - prevent insertion if container unmounted
    if (!containerRef.current || !containerRef.current.parentNode) return;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Create geometry and material
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup for resize listener (handled separately since it's not Three.js specific)
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isProjectPage]);
  
  // Use the reusable cleanup hook
  // This handles all Three.js cleanup automatically
  useThreeCleanup({
    rendererRef,
    sceneRef,
    containerRef,
    frameIdRef,
    deps: [isProjectPage], // Re-run cleanup if route changes
  });
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0"
    />
  );
}

/**
 * BEFORE REFACTORING (inline cleanup):
 * 
 * useEffect(() => {
 *   // ... initialization code ...
 *   
 *   return () => {
 *     // Inline cleanup - duplicated in every component
 *     if (frameId) cancelAnimationFrame(frameId);
 *     renderer.dispose();
 *     renderer.forceContextLoss();
 *     // ... more cleanup code ...
 *   };
 * }, []);
 * 
 * 
 * AFTER REFACTORING (using hook):
 * 
 * useThreeCleanup({
 *   rendererRef,
 *   sceneRef,
 *   containerRef,
 *   frameIdRef,
 * });
 * 
 * // Cleanup is now centralized and reusable!
 */

