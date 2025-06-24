// @ts-nocheck
'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="royalblue" wireframe />
      </mesh>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}