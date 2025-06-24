import * as THREE from 'three'
import { Object3DNode, BufferGeometryNode, MaterialNode } from '@react-three/fiber'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Three.js objects
      mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>
      group: Object3DNode<THREE.Group, typeof THREE.Group>
      points: Object3DNode<THREE.Points, typeof THREE.Points>
      line: Object3DNode<THREE.Line, typeof THREE.Line>
      
      // Geometries
      sphereGeometry: BufferGeometryNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>
      bufferGeometry: BufferGeometryNode<THREE.BufferGeometry, typeof THREE.BufferGeometry>
      
      // Materials
      meshStandardMaterial: MaterialNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>
      meshBasicMaterial: MaterialNode<THREE.MeshBasicMaterial, typeof THREE.MeshBasicMaterial>
      pointsMaterial: MaterialNode<THREE.PointsMaterial, typeof THREE.PointsMaterial>
      
      // Buffer attributes
      bufferAttribute: any
    }
  }
}

export {} 