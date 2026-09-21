'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Sparkles } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

// ─── 1. HOME HERO 3D SCENE (SpaceX/Tesla Holographic Martech Engine) ───
function HomeEngine() {
  const coreRef = useRef<THREE.Mesh>(null)
  const cageRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.4
      coreRef.current.rotation.x = Math.sin(t * 0.3) * 0.2
    }
    if (cageRef.current) {
      cageRef.current.rotation.y = -t * 0.25
      cageRef.current.rotation.z = Math.cos(t * 0.2) * 0.15
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.3
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.2

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.35,
        0.05
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -state.pointer.y * 0.25,
        0.05
      )
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={2.2} />
      <directionalLight position={[5, 8, 5]} intensity={2.8} color="#ffffff" />
      <pointLight position={[3, 3, 3]} intensity={35} color="#ff5a1f" />
      <pointLight position={[-4, -3, 2]} intensity={20} color="#ff8a50" />

      {/* Solid Refractive Core */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[1.0, 0]} />
        <meshPhysicalMaterial
          color="#ff5a1f"
          emissive="#d63b00"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.8}
          transmission={0.3}
          thickness={0.6}
        />
      </mesh>

      {/* Outer Futuristic Wireframe Cage */}
      <mesh ref={cageRef}>
        <icosahedronGeometry args={[1.65, 2]} />
        <meshStandardMaterial
          color="#ff7a45"
          emissive="#ff3d00"
          emissiveIntensity={0.6}
          wireframe
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Primary Telemetry Ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0.2, 0]}>
        <torusGeometry args={[2.3, 0.024, 16, 100]} />
        <meshBasicMaterial color="#ff5a1f" transparent opacity={0.85} />
      </mesh>

      {/* Secondary Orbital Ring */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3.5, -0.3, 0.5]}>
        <torusGeometry args={[2.0, 0.016, 16, 100]} />
        <meshBasicMaterial color="#d45118" transparent opacity={0.6} />
      </mesh>

      <Sparkles count={45} scale={[5, 4.5, 3]} size={2.6} speed={0.4} color="#ff5a1f" />
    </group>
  )
}

export function HomeHeroScene() {
  return (
    <div className="three-hero-canvas-wrap" aria-label="3D Holographic Martech Engine">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 38 }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%', pointerEvents: 'auto', background: 'transparent' }}
        gl={{ alpha: true }}
      >
        <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.35}>
          <HomeEngine />
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  )
}

// ─── 2. SERVICES 3D SCENE (Interconnected Service Architecture Matrix) ───
function ServicesMatrix() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.25 + state.pointer.x * 0.3
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.1 - state.pointer.y * 0.2
    }
  })

  // 8 Interconnected satellite nodes
  const nodes = useMemo(() => [
    { pos: [0, 0, 0], size: 0.6, color: '#ff5a1f' },
    { pos: [1.6, 0.8, 0.5], size: 0.28, color: '#ff7a45' },
    { pos: [-1.6, -0.7, 0.4], size: 0.28, color: '#ff7a45' },
    { pos: [0.8, -1.5, -0.6], size: 0.3, color: '#e04e14' },
    { pos: [-0.9, 1.4, -0.5], size: 0.3, color: '#e04e14' },
    { pos: [1.4, -0.5, 1.2], size: 0.25, color: '#ff9060' },
    { pos: [-1.3, 0.6, -1.2], size: 0.25, color: '#ff9060' },
  ], [])

  return (
    <group ref={groupRef}>
      <ambientLight intensity={2.0} />
      <pointLight position={[5, 5, 5]} intensity={40} color="#ff5a1f" />
      <pointLight position={[-5, -4, 3]} intensity={20} color="#ff7a45" />

      {/* Nodes */}
      {nodes.map((n, i) => (
        <group key={i} position={n.pos as [number, number, number]}>
          <mesh>
            <octahedronGeometry args={[n.size, 0]} />
            <meshStandardMaterial
              color={n.color}
              emissive="#e03b00"
              emissiveIntensity={0.6}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
          <mesh>
            <octahedronGeometry args={[n.size * 1.35, 0]} />
            <meshBasicMaterial color="#ff7a45" wireframe transparent opacity={0.4} />
          </mesh>
        </group>
      ))}

      {/* Global Lattice Cage */}
      <mesh>
        <torusKnotGeometry args={[1.3, 0.12, 100, 16, 2, 3]} />
        <meshStandardMaterial
          color="#ff5a1f"
          emissive="#d43b00"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      <Sparkles count={40} scale={[5, 4.5, 3]} size={2.5} speed={0.4} color="#ff6b2b" />
    </group>
  )
}

export function ServicesHeroScene() {
  return (
    <div className="three-hero-canvas-wrap" aria-label="3D Service Architecture Matrix">
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 38 }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%', pointerEvents: 'auto', background: 'transparent' }}
        gl={{ alpha: true }}
      >
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <ServicesMatrix />
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  )
}

// ─── 3. TECHNOLOGY 3D SCENE (Futuristic Quantum Processor Grid) ───
function TechProcessor() {
  const chipRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (chipRef.current) {
      chipRef.current.rotation.y = t * 0.3 + state.pointer.x * 0.3
      chipRef.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.25) * 0.1 - state.pointer.y * 0.2
    }
  })

  return (
    <group ref={chipRef}>
      <ambientLight intensity={2.2} />
      <pointLight position={[0, 4, 4]} intensity={45} color="#ff5a1f" />
      <pointLight position={[0, -4, -3]} intensity={25} color="#3b82f6" />

      {/* Main Square Processor Die */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.0, 2.0, 0.18]} />
        <meshStandardMaterial
          color="#121316"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Golden/Orange Core Logic Gate */}
      <mesh position={[0, 0, 0.12]}>
        <boxGeometry args={[1.2, 1.2, 0.08]} />
        <meshStandardMaterial
          color="#ff5a1f"
          emissive="#ff3d00"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Holographic Circuit Ring */}
      <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[2.1, 0.02, 16, 60]} />
        <meshBasicMaterial color="#ff7a45" transparent opacity={0.8} />
      </mesh>

      {/* Diagonal Telemetry Beam Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[2.3, 0.018, 16, 60]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.65} />
      </mesh>

      <Sparkles count={50} scale={[5, 5, 3]} size={2.6} speed={0.5} color="#ff6a28" />
    </group>
  )
}

export function TechnologyHeroScene() {
  return (
    <div className="three-hero-canvas-wrap" aria-label="3D Quantum Processor Grid">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 38 }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%', pointerEvents: 'auto', background: 'transparent' }}
        gl={{ alpha: true }}
      >
        <Float speed={1.7} rotationIntensity={0.2} floatIntensity={0.35}>
          <TechProcessor />
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}

// ─── 4. SCROLL DATA SCENE (Interactive Timeline 3D Core) ───
function MorphingMesh({ activeStep }: { activeStep: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.y = t * (0.3 + activeStep * 0.2)
      meshRef.current.rotation.x = Math.sin(t * 0.3) * (0.15 + activeStep * 0.08)
    }
  })

  const geoArgs = useMemo(() => {
    switch (activeStep) {
      case 0: return { radius: 1.3, detail: 0 } // Octahedron
      case 1: return { radius: 1.4, detail: 1 } // Icosahedron
      case 2: return { radius: 1.5, detail: 2 } // High-density
      default: return { radius: 1.6, detail: 3 } // Compounding core
    }
  }, [activeStep])

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[geoArgs.radius, geoArgs.detail]} />
        <meshStandardMaterial
          color="#ff5a1f"
          emissive="#d43b00"
          emissiveIntensity={0.6 + activeStep * 0.15}
          wireframe
          roughness={0.15}
          metalness={0.8}
        />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0.3, 0]}>
        <torusGeometry args={[2.1, 0.02, 16, 80]} />
        <meshBasicMaterial color="#ff7a45" transparent opacity={0.8} />
      </mesh>
      <Sparkles count={35 + activeStep * 15} scale={[4.5, 4.5, 3]} size={2.5} color="#ff7a45" />
    </Float>
  )
}

export function ScrollDataScene({ activeStep }: { activeStep: number }) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '380px' }}>
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 40 }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={2.0} />
        <pointLight position={[3, 4, 3]} intensity={40} color="#ff5a1f" />
        <pointLight position={[-3, -3, 2]} intensity={20} color="#3b82f6" />
        <MorphingMesh activeStep={activeStep} />
      </Canvas>
    </div>
  )
}
