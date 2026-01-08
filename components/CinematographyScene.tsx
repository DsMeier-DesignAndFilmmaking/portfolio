'use client';
import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useThreeCleanup } from '@/hooks/useThreeCleanup';
import { useDeepDispose } from '@/hooks/useDeepDispose';

export default function CinematographyScene() {
  const pathname = usePathname();
  // Disable Three.js initialization on project routes to avoid race conditions
  const isProjectPage = pathname?.includes('/projects/') ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Memoize geometries and materials to ensure fresh instances on remount
  // This prevents using disposed objects when navigating back
  const reelGeometry = useMemo(() => new THREE.TorusGeometry(1, 0.2, 16, 32), [pathname]);
  const reelMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color: 0x4a90e2,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  }), [pathname]);

  const stripGeometry = useMemo(() => new THREE.BoxGeometry(3, 0.1, 0.1), [pathname]);
  const stripMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color: 0x4a90e2,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  }), [pathname]);

  const frameGeometry = useMemo(() => new THREE.BoxGeometry(0.3, 0.2, 0.05), [pathname]);
  const frameMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color: 0x4a90e2,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  }), [pathname]);

  const lensGeometry = useMemo(() => new THREE.CylinderGeometry(0.5, 0.5, 0.2, 32), [pathname]);
  const lensMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color: 0x4a90e2,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
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
    modelRef.current = null;
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

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

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

      if (modelRef.current) {
        modelRef.current.rotation.y += 0.003;
        modelRef.current.rotation.x += 0.002;
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
  }, [isProjectPage, pathname, reelGeometry, reelMaterial, stripGeometry, stripMaterial, frameGeometry, frameMaterial, lensGeometry, lensMaterial]); // Include pathname and memoized objects to recreate on route change

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
  // Critical for CinematographyScene which creates multiple meshes with materials in loops
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
      modelRef.current = null;
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