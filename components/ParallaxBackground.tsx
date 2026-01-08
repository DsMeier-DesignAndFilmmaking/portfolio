'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import anime from 'animejs';
import { usePathname } from 'next/navigation';
import { useThreeCleanup } from '@/hooks/useThreeCleanup';
import { useDeepDispose } from '@/hooks/useDeepDispose';

interface ParallaxBackgroundProps {
  className?: string;
  modelPath?: string;
}

export default function ParallaxBackground({ className = '', modelPath }: ParallaxBackgroundProps) {
  const pathname = usePathname();
  // Disable Three.js initialization on project routes to avoid race conditions
  const isProjectPage = pathname?.includes('/projects/') ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const cameraAnimationRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Memoize geometries and materials - these are static and don't need to change on route
  // Only recreate if component unmounts/remounts (empty deps = create once per component instance)
  const particlesMaterial = useMemo(() => new THREE.PointsMaterial({
    size: 0.02,
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,
  }), []);

  const torusGeometry = useMemo(() => new THREE.TorusKnotGeometry(1, 0.3, 64, 16), []);
  const torusMaterial = useMemo(() => new THREE.MeshPhongMaterial({
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
      console.log('[ParallaxBackground] skipped (project page)', { pathname, isProjectPage, modelPath });
      return;
    }
    
    console.log('[ParallaxBackground] mounted', { pathname, isProjectPage, modelPath });
    if (!containerRef.current) return;

    // Reset refs before creating new objects (prevents stale references)
    sceneRef.current = null;
    cameraRef.current = null;
    rendererRef.current = null;
    particlesRef.current = null;
    modelRef.current = null;
    animationIdRef.current = null;
    cameraAnimationRef.current = null;

    // Track if component is still mounted for async callbacks
    let isMounted = true;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;
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

    // Renderer setup (optimized for performance)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, // Disabled for better performance
      alpha: true 
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Reduced for better performance
    
    // Guard DOM mutation - prevent insertion if container unmounted
    if (!containerRef.current || !containerRef.current.parentNode) return;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particles (optimized for performance) using memoized material
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800; // Reduced from 3000 for better performance
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    // Use memoized material instead of creating new one
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Load 3D model if provided
    if (modelPath && modelPath !== 'torus') {
      const loader = new GLTFLoader();
      loader.load(
        modelPath,
        (gltf) => {
          // Guard against unmounted component
          if (!isMounted) return;
          const model = gltf.scene;
          model.scale.set(2, 2, 2);
          model.position.set(0, 0, 0);
          scene.add(model);
          modelRef.current = model;
        },
        undefined,
        (error) => {
          if (!isMounted) return;
          if (process.env.NODE_ENV === 'development') {
            console.error('Error loading model:', error);
          }
        }
      );
    } else {
      // Create default torus knot if no model provided or if modelPath is 'torus'
      // Use memoized geometry and material instead of creating new ones
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      scene.add(torus);
      modelRef.current = torus;
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation (optimized for performance)
    // Guard: ensure renderer exists before rendering
    const animate = () => {
      // Race condition check: ensure renderer still exists before first frame
      const currentRenderer = rendererRef.current;
      const currentScene = sceneRef.current;
      const currentCamera = cameraRef.current;
      
      if (!currentRenderer || !currentScene || !currentCamera) {
        return;
      }
      
      animationIdRef.current = requestAnimationFrame(animate);

      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0002; // Slightly slower for better performance
        particlesRef.current.rotation.x += 0.00005;
      }

      if (modelRef.current) {
        modelRef.current.rotation.y += 0.002; // Slightly slower for better performance
        modelRef.current.rotation.x += 0.001;
      }

      currentRenderer.render(currentScene, currentCamera);
    };

    animate();

    // Anime.js animations - store reference for cleanup
    cameraAnimationRef.current = anime({
      targets: camera.position,
      z: [5, 3, 5],
      duration: 15000,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine',
    });

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
      console.log('[ParallaxBackground] unmounted', { pathname, isProjectPage, modelPath });
      isMounted = false;
      window.removeEventListener('resize', handleResize);
    };
  }, [modelPath, isProjectPage, particlesMaterial, torusGeometry, torusMaterial]); // Only re-init when modelPath or isProjectPage changes, not on every route change

  // Use reusable cleanup hook for Three.js resources (handles canvas removal, etc.)
  useThreeCleanup({
    rendererRef,
    sceneRef,
    containerRef,
    frameIdRef: animationIdRef,
    onCleanup: () => {
      // Stop anime.js animation
      if (cameraAnimationRef.current) {
        cameraAnimationRef.current.pause();
        cameraAnimationRef.current = null;
      }
    },
    deps: [isProjectPage],
  });

  // Use deep disposal hook for comprehensive GPU memory cleanup
  // This ensures all geometries, materials, textures, and renderers are fully disposed
  // Include pathname in deps to trigger cleanup immediately on route change
  useDeepDispose({
    objectRef: sceneRef,
    rendererRef: rendererRef,
    onBeforeDispose: () => {
      // Cancel animation frame before disposal
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      // Stop anime.js animation before disposal
      if (cameraAnimationRef.current) {
        cameraAnimationRef.current.pause();
        cameraAnimationRef.current = null;
      }
    },
    onAfterDispose: () => {
      // Clean up refs after disposal
      particlesRef.current = null;
      modelRef.current = null;
      cameraRef.current = null;
    },
    deps: [modelPath, isProjectPage], // Re-run cleanup when model or project page status changes, not on every route change
    verbose: process.env.NODE_ENV === 'development', // Enable verbose logging in dev
  });

  if (!isClient) {
    return (
      <div className={`absolute inset-0 ${className} bg-gradient-to-br from-gray-100 to-gray-200`}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      key={pathname}
      ref={containerRef} 
      className={`absolute inset-0 ${className}`}
    />
  );
} 