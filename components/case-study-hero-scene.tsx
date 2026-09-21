'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function WireframeGlobe() {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.35
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.15
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.25
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.5
    }
    if (groupRef.current) {
      // Smooth interactive mouse parallax
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.4,
        0.05
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -state.pointer.y * 0.3,
        0.05
      )
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={2.2} />
      <directionalLight position={[5, 6, 5]} intensity={2.5} color="#ffffff" />
      <pointLight position={[4, 4, 4]} intensity={45} color="#ff5a1f" />
      <pointLight position={[-4, -3, 3]} intensity={25} color="#ff7a45" />
      <pointLight position={[0, 0, 6]} intensity={20} color="#ff4500" />

      {/* Main Glowing Wireframe Globe */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.55, 2]} />
        <meshStandardMaterial
          color="#ff5a1f"
          emissive="#e03d00"
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.7}
          wireframe
        />
      </mesh>

      {/* Subtle Inner Core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial
          color="#ff7a45"
          emissive="#ff5a1f"
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.4}
          wireframe
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Primary Orbiting Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3.2, 0.25, 0]}>
        <torusGeometry args={[2.35, 0.028, 16, 100]} />
        <meshBasicMaterial color="#ff5a1f" transparent opacity={0.9} />
      </mesh>

      {/* Secondary Counter-rotating Ring */}
      <mesh rotation={[-Math.PI / 4, -0.3, 0.4]}>
        <torusGeometry args={[2.0, 0.018, 16, 100]} />
        <meshBasicMaterial color="#d45118" transparent opacity={0.65} />
      </mesh>

      {/* Floating Sparkles Field */}
      <Sparkles count={42} scale={[5.5, 4.5, 3.5]} size={2.8} speed={0.45} color="#ff5a1f" />
    </group>
  )
}

export function CaseStudyHeroScene() {
  return (
    <div className="case-hero-scene-wrap" aria-label="Interactive 3D Growth Globe">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 38 }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%', pointerEvents: 'auto', background: 'transparent' }}
        gl={{ alpha: true }}
      >
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.35}>
          <WireframeGlobe />
        </Float>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}

export function CaseStudyCTAScene() {
  return (
    <div className="case-cta-scene-wrap" aria-label="3D Interactive Sphere">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 40 }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%' }}
      >
        <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.4}>
          <WireframeGlobe />
        </Float>
      </Canvas>
    </div>
  )
}
