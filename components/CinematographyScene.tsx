'use client';
import { useRef, useEffect, useState } from 'react';
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

  useEffect(() => {
    // Ensure DOM exists and skip on server-side
    if (typeof window === 'undefined') return;
    
    // Skip initialization on project routes to avoid race conditions
    if (isProjectPage) return;
    if (!containerRef.current) return;

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

    // Create film reel
    const reelGeometry = new THREE.TorusGeometry(1, 0.2, 16, 32);
    const reelMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a90e2,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const reel = new THREE.Mesh(reelGeometry, reelMaterial);
    filmGroup.add(reel);

    // Create film strip
    const stripGeometry = new THREE.BoxGeometry(3, 0.1, 0.1);
    const stripMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a90e2,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const strip = new THREE.Mesh(stripGeometry, stripMaterial);
    strip.position.set(0, 0, 0);
    filmGroup.add(strip);

    // Create film frames
    for (let i = -1; i <= 1; i++) {
      const frameGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.05);
      const frameMaterial = new THREE.MeshPhongMaterial({
        color: 0x4a90e2,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      frame.position.set(i * 1, 0, 0);
      filmGroup.add(frame);
    }

    // Create camera lens
    const lensGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.2, 32);
    const lensMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a90e2,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
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
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (modelRef.current) {
        modelRef.current.rotation.y += 0.003;
        modelRef.current.rotation.x += 0.002;
      }

      renderer.render(scene, camera);
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
  }, [isProjectPage]);

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
      ref={containerRef}
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
  );
} 