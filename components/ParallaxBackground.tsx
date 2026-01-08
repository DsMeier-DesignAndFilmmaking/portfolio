'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useWebGL } from './WebGLContext'

export default function ParallaxBackground({ modelPath }: { modelPath: string }) {
  const [mounted, setMounted] = useState(false);
  const objectRef = useRef<THREE.Mesh | null>(null)
  const { scene } = useWebGL()

  // ✅ Mounting guard: Prevent hydration crashes
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Mounting guard: Return null until mounted
  if (!mounted) {
    return null;
  }

  useEffect(() => {
    if (!scene) return

    console.log('[ParallaxBackground] mounted', { modelPath })

    const mesh = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.3, 16, 100),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    )

    objectRef.current = mesh
    scene.add(mesh)

    return () => {
      console.log('[ParallaxBackground] unmounted', { modelPath })
      
      const mesh = objectRef.current
      const cleanupScene = scene
      
      if (!cleanupScene) {
        objectRef.current = null
        return
      }
      
      // ✅ Guard: Ensure mesh is valid and is an Object3D before removing
      if (!mesh) {
        objectRef.current = null
        return
      }
      if (!(mesh instanceof THREE.Object3D)) {
        objectRef.current = null
        return
      }
      
      // Remove from scene (idempotent - safe to call multiple times)
      if (cleanupScene.children.includes(mesh)) {
        cleanupScene.remove(mesh)
      }
      
      // Dispose geometry
      if ('geometry' in mesh && mesh.geometry) {
        mesh.geometry.dispose()
      }
      
      // Dispose material
      if ('material' in mesh && mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(m => m.dispose())
        } else {
          mesh.material.dispose()
        }
      }
      
      objectRef.current = null
    }
  }, [modelPath, scene])

  return null
}
