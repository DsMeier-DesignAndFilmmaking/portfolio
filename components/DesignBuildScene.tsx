'use client';
import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { deepDisposeObject, disposeRenderer } from '@/hooks/useDeepDispose';

export default function DesignBuildScene() {
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
      antialias: false, 
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    
    // Guard DOM mutation - prevent insertion if container unmounted
    if (!containerRef.current || !containerRef.current.parentNode) return;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    const domElement = renderer.domElement;

    // Create design-build elements
    const designGroup = new THREE.Group();

    // Create a cube using memoized geometry and material
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-1, 0, 0);
    designGroup.add(cube);

    // Create a sphere using memoized geometry and material
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(1, 0, 0);
    designGroup.add(sphere);

    // Create connecting lines using memoized geometry and material
    const line = new THREE.Line(lineGeometry, lineMaterial);
    designGroup.add(line);

    scene.add(designGroup);
    modelRef.current = designGroup;

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

    // Consolidated cleanup: ALL cleanup happens here in the unmount phase
    return () => {
      console.log('[DesignBuildScene] unmounted', { pathname, isProjectPage });
      
      // 1. Remove resize listener
      window.removeEventListener('resize', handleResize);
      
      // 2. Cancel animation frame FIRST to stop rendering
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
      
      // 3. Remove canvas from DOM before disposal
      if (rendererRef.current?.domElement && containerRef.current) {
        try {
          if (containerRef.current.contains(rendererRef.current.domElement)) {
            containerRef.current.removeChild(rendererRef.current.domElement);
          }
        } catch (error) {
          // Canvas may already be removed
          if (process.env.NODE_ENV === 'development') {
            console.warn('Error removing canvas from DOM:', error);
          }
        }
      }
      
      // 4. Dispose scene and all its resources (geometries, materials, textures)
      if (sceneRef.current) {
        const verbose = process.env.NODE_ENV === 'development';
        deepDisposeObject(sceneRef.current, verbose);
        sceneRef.current = null;
      }
      
      // 5. Dispose renderer (with forceContextLoss: false for internal navigation)
      if (rendererRef.current) {
        const verbose = process.env.NODE_ENV === 'development';
        disposeRenderer(rendererRef.current, verbose, false);
        rendererRef.current = null;
      }
      
      // 6. Clear remaining refs
      cameraRef.current = null;
      modelRef.current = null;
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