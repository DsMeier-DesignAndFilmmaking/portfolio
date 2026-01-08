'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { getScene } from './SafeCanvas'

export default function ParallaxBackground({ modelPath }: { modelPath: string }) {
  const objectRef = useRef<THREE.Mesh | null>(null)

  useEffect(() => {
    const scene = getScene()
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
      const cleanupScene = getScene()
      
      if (mesh && cleanupScene) {
        cleanupScene.remove(mesh)
        
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
    }
  }, [modelPath])

  return null
}
