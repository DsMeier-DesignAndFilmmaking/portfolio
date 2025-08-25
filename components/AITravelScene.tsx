// @ts-nocheck
'use client';
import { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Float, useTexture, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';


// Extend JSX.IntrinsicElements for Three.js elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      group: any;
      points: any;
      line: any;
      sphereGeometry: any;
      bufferGeometry: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      lineBasicMaterial: any;
      pointsMaterial: any;
      bufferAttribute: any;
    }
  }
}

function Globe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simple timeout to show the globe
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);

  useFrame((state) => {
    if (globeRef.current && isLoaded) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  if (!isLoaded) {
    return null;
  }

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[0.405, 24, 24]} />
      <meshStandardMaterial
        color="#4a9eff"
        metalness={0.8}
        roughness={0.2}
        emissive="#4a9eff"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function AIParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const count = 500;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const radius = 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      colors[i * 3] = Math.random() * 0.3 + 0.5;
      colors[i * 3 + 1] = Math.random() * 0.3 + 0.6;
      colors[i * 3 + 2] = Math.random() * 0.3 + 0.7;
    }
    setIsLoaded(true);
  }, []);

  useFrame((state) => {
    if (pointsRef.current && isLoaded) {
      pointsRef.current.rotation.y += 0.0003;
      pointsRef.current.rotation.x += 0.0001;
    }
  });

  if (!isLoaded) {
    return null;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function OrbitalAI() {
  const groupRef = useRef<THREE.Group>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const nodeRefs = useRef<THREE.Mesh[]>([]);
  const velocities = useRef<{ x: number; y: number; z: number }[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useFrame((state) => {
    if (groupRef.current && isLoaded) {
      timeRef.current += 0.001;
      
      // Update node positions for intersection motion
      nodeRefs.current.forEach((node, i) => {
        if (node) {
          // Create intersecting paths
          const pathIndex = Math.floor(i / 3); // 4 paths with 3 nodes each
          const nodeInPath = i % 3;
          const pathOffset = pathIndex * (Math.PI / 2); // 90-degree separation between paths
          
          // Calculate position along path
          const t = (timeRef.current + nodeInPath * 0.3) % (Math.PI * 2);
          const radius = 0.8;
          
          // Create intersecting paths
          if (pathIndex < 2) {
            // Horizontal paths
            node.position.x = Math.cos(t + pathOffset) * radius;
            node.position.y = Math.sin(t + pathOffset) * radius;
            node.position.z = (pathIndex === 0 ? 0.2 : -0.2);
          } else {
            // Vertical paths
            node.position.x = Math.cos(t + pathOffset) * radius;
            node.position.z = Math.sin(t + pathOffset) * radius;
            node.position.y = (pathIndex === 2 ? 0.2 : -0.2);
          }
        }
      });
    }
  });

  if (!isLoaded) return null;

  // Create nodes and lines
  const numNodes = 12; // 4 paths with 3 nodes each
  const nodes = [];
  const lines = [];

  // Initialize nodes
  for (let i = 0; i < numNodes; i++) {
    const pathIndex = Math.floor(i / 3);
    const nodeInPath = i % 3;
    const pathOffset = pathIndex * (Math.PI / 2);
    const radius = 0.8;
    const t = nodeInPath * 0.3;
    
    let x, y, z;
    if (pathIndex < 2) {
      // Horizontal paths
      x = Math.cos(t + pathOffset) * radius;
      y = Math.sin(t + pathOffset) * radius;
      z = (pathIndex === 0 ? 0.2 : -0.2);
    } else {
      // Vertical paths
      x = Math.cos(t + pathOffset) * radius;
      z = Math.sin(t + pathOffset) * radius;
      y = (pathIndex === 2 ? 0.2 : -0.2);
    }
    
    nodes.push({ x, y, z });
    velocities.current.push({ x: 0, y: 0, z: 0 }); // Velocities not used in new animation
  }

  // Create lines between nodes in the same path
  for (let i = 0; i < numNodes; i += 3) {
    // Connect nodes in the same path
    lines.push({ from: nodes[i], to: nodes[i + 1] });
    lines.push({ from: nodes[i + 1], to: nodes[i + 2] });
    
    // Connect to nodes in intersecting paths
    const pathIndex = Math.floor(i / 3);
    const nextPathIndex = (pathIndex + 1) % 4;
    const nextPathStart = nextPathIndex * 3;
    
    // Connect to middle node of next path
    lines.push({ from: nodes[i + 1], to: nodes[nextPathStart + 1] });
  }

  return (
    <group ref={groupRef}>
      {/* Lines */}
      {lines.map((line, i) => (
        <line key={`line-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                line.from.x, line.from.y, line.from.z,
                line.to.x, line.to.y, line.to.z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#4a9eff"
            transparent
            opacity={0.4}
            linewidth={2}
          />
        </line>
      ))}
      
      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh
          key={`node-${i}`}
          ref={el => nodeRefs.current[i] = el}
          position={[node.x, node.y, node.z]}
        >
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshBasicMaterial
            color="#9e4aff"
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color="#4a9eff" transparent opacity={0.6} />
    </mesh>
  );
}

function Scene() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Globe />
      </Float>
      <OrbitalAI />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping={false}
        showGrid={false}
      />
      <Environment preset="city" />
    </Suspense>
  );
}

export default function AITravelScene() {
  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 1.5,
        ease: "easeOut"
      }}
    >
      <Canvas 
        camera={{ position: [0, 0, 3], fov: 45 }}
        dpr={[1, 1]}
        performance={{ min: 0.5 }}
        gl={{ 
          antialias: false,
          powerPreference: 'high-performance',
          alpha: true,
          clearColor: [0.898, 0.827, 0.702, 0],
          stencil: false,
          depth: true
        }}
        style={{ background: 'transparent' }}
        frameloop="demand"
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Scene />
      </Canvas>
    </motion.div>
  );
} 