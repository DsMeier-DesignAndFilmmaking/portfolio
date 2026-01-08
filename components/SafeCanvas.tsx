'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let rafId: number | null = null

export function getScene() {
  return scene
}

export function getCamera() {
  return camera
}

export function getRenderer() {
  return renderer
}

export default function SafeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // ⛔ HARD GUARD — renderer already exists
    if (renderer) {
      // ✅ EXPECTED: Renderer already exists, component is reusing singleton
      console.log('[SafeCanvas] component mounted - reusing existing singleton renderer', {
        canvasCount: document.querySelectorAll('canvas').length,
        rendererContextLost: renderer.getContext()?.isContextLost() ?? 'N/A'
      })
      // Ensure canvas is attached (HMR safety)
      if (!containerRef.current.contains(renderer.domElement)) {
        containerRef.current.appendChild(renderer.domElement)
      }
      return
    }

    // ✅ EXPECTED: First mount - this should only happen ONCE per session
    console.log('[SafeCanvas] FIRST MOUNT - initializing singleton renderer', {
      canvasCount: document.querySelectorAll('canvas').length
    })

    // ✅ INIT ONCE
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    containerRef.current.appendChild(renderer.domElement)

    console.log('[SafeCanvas] ✅ singleton renderer initialized (should only see this ONCE per session)', {
      canvasCount: document.querySelectorAll('canvas').length,
      rendererContextLost: renderer.getContext()?.isContextLost() ?? 'N/A'
    })

    const renderLoop = () => {
      rafId = requestAnimationFrame(renderLoop)
      renderer!.render(scene!, camera!)
    }

    renderLoop()

    const handleResize = () => {
      if (!renderer || !camera) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // ❌ DO NOT CLEAN UP ON UNMOUNT - renderer persists as singleton
    return () => {
      console.log('[SafeCanvas] component unmounted (renderer persists as singleton)', {
        canvasCount: document.querySelectorAll('canvas').length,
        rendererContextLost: renderer?.getContext()?.isContextLost() ?? 'N/A'
      })
      window.removeEventListener('resize', handleResize)
      // ⛔ DO NOT dispose renderer - it persists across route changes
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}
