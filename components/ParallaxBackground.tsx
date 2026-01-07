'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import anime from 'animejs';
import { usePathname } from 'next/navigation';

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Skip initialization on project routes to avoid race conditions
    if (isProjectPage) return;
    if (!containerRef.current || typeof window === 'undefined') return;

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

    // Create particles (optimized for performance)
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

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02, // Slightly smaller for better performance
      color: 0xffffff,
      transparent: true,
      opacity: 0.5, // Slightly reduced opacity
    });

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
      const torusGeometry = new THREE.TorusKnotGeometry(1, 0.3, 64, 16); // Reduced complexity for better performance
      const torusMaterial = new THREE.MeshPhongMaterial({
        color: 0x4a90e2,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
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
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0002; // Slightly slower for better performance
        particlesRef.current.rotation.x += 0.00005;
      }

      if (modelRef.current) {
        modelRef.current.rotation.y += 0.002; // Slightly slower for better performance
        modelRef.current.rotation.x += 0.001;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Anime.js animations - store reference for cleanup
    const cameraAnimation = anime({
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

    // Full cleanup on unmount
    return () => {
      isMounted = false;
      
      // Remove event listeners
      window.removeEventListener('resize', handleResize);
      
      // Cancel animation frame
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      // Stop anime.js animation
      if (cameraAnimation) {
        cameraAnimation.pause();
      }
      
      // Dispose all geometries and materials in the scene
      scene.traverse((obj: THREE.Object3D) => {
        if ((obj as THREE.Mesh).geometry) {
          (obj as THREE.Mesh).geometry.dispose();
        }
        if ((obj as THREE.Mesh).material) {
          const material = (obj as THREE.Mesh).material;
          if (Array.isArray(material)) {
            material.forEach(m => m.dispose());
          } else {
            material.dispose();
          }
        }
      });
      
      // Clear the scene
      scene.clear();
      
      // Dispose renderer and force context loss
      renderer.dispose();
      renderer.forceContextLoss();
      
      // Safe DOM removal - guard against unmounted container
      // Check that element is a DIRECT child (not just contained in subtree)
      const container = containerRef.current;
      const domElement = renderer.domElement;
      if (container && container.parentNode && domElement && domElement.parentNode === container) {
        try {
          container.removeChild(domElement);
        } catch (error) {
          // Element may have already been removed by React/Framer Motion
          if (process.env.NODE_ENV === 'development') {
            console.warn('Canvas already removed from DOM:', error);
          }
        }
      }
      
      // Null out renderer reference
      (renderer as any).domElement = null;
    };
  }, [modelPath, isProjectPage]);

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
      ref={containerRef} 
      className={`absolute inset-0 ${className}`}
    />
  );
} 