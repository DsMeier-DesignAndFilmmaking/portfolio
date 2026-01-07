'use client';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function SpecklesScene() {
  const pathname = usePathname();
  // Disable Three.js initialization on project routes to avoid race conditions
  const isProjectPage = pathname?.includes('/projects/') ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const specklesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    // Skip initialization on project routes to avoid race conditions
    if (isProjectPage) return;
    if (!containerRef.current) return;

    let frameId: number | undefined;

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

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      color: 0xffffff
    });

    const speckles = new THREE.Points(geometry, material);
    scene.add(speckles);
    specklesRef.current = speckles;

    // Animation
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (specklesRef.current) {
        specklesRef.current.rotation.y += 0.001;
        specklesRef.current.rotation.x += 0.0005;
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

    // Cleanup
    return () => {
      // Required disposal pattern for route transitions
      if (frameId) cancelAnimationFrame(frameId)

      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement = null as any

      scene.traverse((obj: any) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m: any) => m.dispose())
          } else {
            obj.material.dispose()
          }
        }
      })

      window.removeEventListener('resize', handleResize);

      // Defer DOM cleanup to avoid React error 423 (updates during reconciliation)
      // Dispose renderer and force context loss immediately
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement = null as any;
      
      // Defer DOM removal to next tick to avoid React reconciliation conflicts
      const container = containerRef.current;
      if (container && domElement && domElement.parentNode === container) {
        setTimeout(() => {
          try {
            // Double-check element is still a child before removing
            if (domElement.parentNode === container && container.contains(domElement)) {
              container.removeChild(domElement);
            }
          } catch (error) {
            // Element may have already been removed by React/Framer Motion
            // Silently ignore - this is expected during fast route transitions
          }
        }, 0);
      }

      scene.clear();
    };
  }, [isProjectPage]);

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