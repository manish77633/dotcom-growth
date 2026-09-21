'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface CityMarker {
  name: string
  label: string
  lat: number
  lng: number
  active?: boolean
}

const GLOBAL_HUBS: CityMarker[] = [
  { name: 'Jaipur', label: 'ONLINE — JAIPUR (HQ)', lat: 26.9124, lng: 75.7873, active: true },
  { name: 'San Francisco', label: 'SILICON VALLEY', lat: 37.7749, lng: -122.4194, active: true },
  { name: 'New York', label: 'NEW YORK', lat: 40.7128, lng: -74.006, active: true },
  { name: 'London', label: 'LONDON', lat: 51.5074, lng: -0.1278, active: true },
  { name: 'Singapore', label: 'SINGAPORE', lat: 1.3521, lng: 103.8198, active: true },
  { name: 'Tokyo', label: 'TOKYO', lat: 35.6762, lng: 139.6503 },
  { name: 'Dubai', label: 'DUBAI', lat: 25.2048, lng: 55.2708, active: true },
  { name: 'Sydney', label: 'SYDNEY', lat: -33.8688, lng: 151.2093 },
]

// Flight arc connections
const CONNECTIONS = [
  { from: 0, to: 1 }, // Jaipur -> SF
  { from: 0, to: 2 }, // Jaipur -> NY
  { from: 0, to: 3 }, // Jaipur -> London
  { from: 0, to: 4 }, // Jaipur -> Singapore
  { from: 0, to: 6 }, // Jaipur -> Dubai
  { from: 3, to: 2 }, // London -> NY
  { from: 4, to: 5 }, // Singapore -> Tokyo
  { from: 4, to: 7 }, // Singapore -> Sydney
]

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return new THREE.Vector3(x, y, z)
}

// Approximate landmass check for dense continent particle generation
function isLandmass(lat: number, lng: number): boolean {
  // India & South Asia
  if (lat >= 6 && lat <= 36 && lng >= 68 && lng <= 92) return true
  // East Asia & SE Asia
  if (lat >= 10 && lat <= 52 && lng >= 95 && lng <= 145) return true
  // Europe & Mediterranean
  if (lat >= 35 && lat <= 70 && lng >= -10 && lng <= 45) return true
  // North America
  if (lat >= 24 && lat <= 72 && lng >= -168 && lng <= -52) {
    if (lat < 30 && lng < -115) return false
    return true
  }
  // South America
  if (lat >= -56 && lat <= 12 && lng >= -82 && lng <= -34) {
    if (lat > 5 && lng > -50) return false
    return true
  }
  // Africa
  if (lat >= -35 && lat <= 37 && lng >= -18 && lng <= 52) return true
  // Australia & New Zealand
  if (lat >= -44 && lat <= -10 && lng >= 112 && lng <= 178) return true
  // Middle East & Central Asia
  if (lat >= 12 && lat <= 60 && lng >= 35 && lng <= 80) return true
  // Japan
  if (lat >= 30 && lat <= 46 && lng >= 128 && lng <= 146) return true
  // UK & Ireland
  if (lat >= 50 && lat <= 60 && lng >= -11 && lng <= 2) return true
  // Scandinavia & Russia
  if (lat >= 55 && lat <= 75 && lng >= 5 && lng <= 180) return true

  return false
}

export function InteractiveParticleGlobe({
  className = '',
  height = 560,
  showBadges = true,
}: {
  className?: string
  height?: number
  showBadges?: boolean
}) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [activeMarker, setActiveMarker] = useState<CityMarker>(GLOBAL_HUBS[0])
  const [isInteracting, setIsInteracting] = useState(false)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth || 560
    const canvasHeight = height

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, width / canvasHeight, 0.1, 1000)
    camera.position.set(0, 0, 4.8)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, canvasHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Master Globe Group
    const globeGroup = new THREE.Group()
    scene.add(globeGroup)

    const GLOBE_RADIUS = 1.42

    // ─── 1. Dense Continent Point Cloud ───────────────────────
    const pointCount = 18000
    const positions: number[] = []
    const colors: number[] = []
    const sizes: number[] = []

    const colorOrange = new THREE.Color(0xff5a1f)
    const colorBright = new THREE.Color(0xffffff)
    const colorDim = new THREE.Color(0x4a5568)

    // Generate Fibonacci spiral points
    const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle

    for (let i = 0; i < pointCount; i++) {
      const y = 1 - (i / (pointCount - 1)) * 2 // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y) // Radius at y
      const theta = phi * i // Golden angle increment

      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY

      // Convert back to lat/lng to check landmass
      const lat = 90 - Math.acos(y) * (180 / Math.PI)
      const lng = ((Math.atan2(z, -x) * (180 / Math.PI) + 360) % 360) - 180

      const isLand = isLandmass(lat, lng)

      // Only add points if it's land (with extra density) or random faint background stars
      if (isLand) {
        positions.push(x * GLOBE_RADIUS, y * GLOBE_RADIUS, z * GLOBE_RADIUS)

        // Accent India / Hub region with brand orange
        if (lat >= 15 && lat <= 32 && lng >= 70 && lng <= 88) {
          colors.push(colorOrange.r, colorOrange.g, colorOrange.b)
          sizes.push(0.026)
        } else if (Math.random() > 0.85) {
          colors.push(colorOrange.r * 0.9, colorOrange.g * 0.7, colorOrange.b * 0.5)
          sizes.push(0.022)
        } else {
          colors.push(colorBright.r, colorBright.g, colorBright.b)
          sizes.push(0.019)
        }
      } else if (Math.random() > 0.92) {
        // Very subtle ocean lattice
        positions.push(x * GLOBE_RADIUS, y * GLOBE_RADIUS, z * GLOBE_RADIUS)
        colors.push(colorDim.r, colorDim.g, colorDim.b)
        sizes.push(0.01)
      }
    }

    const pointGeometry = new THREE.BufferGeometry()
    pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    pointGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    // Canvas Point Texture for crisp circular particles
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')!
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.4, 'rgba(255,255,255,0.85)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(16, 16, 16, 0, Math.PI * 2)
    ctx.fill()
    const pointTexture = new THREE.CanvasTexture(canvas)

    const pointMaterial = new THREE.PointsMaterial({
      size: 0.032,
      vertexColors: true,
      map: pointTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.95,
    })

    const particleGlobe = new THREE.Points(pointGeometry, pointMaterial)
    globeGroup.add(particleGlobe)

    // ─── 2. Inner Atmosphere Dark Core Sphere ─────────────────
    const innerSphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.985, 48, 48)
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: 0x08090d,
      transparent: true,
      opacity: 0.94,
    })
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat)
    globeGroup.add(innerSphere)

    // ─── 3. Outer Glowing Atmosphere Rim ──────────────────────
    const atmosphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.04, 32, 32)
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          gl_FragColor = vec4(1.0, 0.35, 0.12, 1.0) * intensity * 0.85;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    })
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat)
    globeGroup.add(atmosphereMesh)

    // ─── 4. City Marker Pins & Pulsing Rings ───────────────────
    const markerGroup = new THREE.Group()
    globeGroup.add(markerGroup)

    const markerPositions: THREE.Vector3[] = []

    GLOBAL_HUBS.forEach((hub, idx) => {
      const pos = latLngToVector3(hub.lat, hub.lng, GLOBE_RADIUS * 1.01)
      markerPositions.push(pos)

      // Solid Glowing Center Pin
      const pinGeo = new THREE.SphereGeometry(0.028, 16, 16)
      const pinMat = new THREE.MeshBasicMaterial({
        color: hub.active ? 0xff5a1f : 0xffffff,
      })
      const pin = new THREE.Mesh(pinGeo, pinMat)
      pin.position.copy(pos)
      markerGroup.add(pin)

      // Outer Pulsing Ring
      const ringGeo = new THREE.RingGeometry(0.035, 0.052, 24)
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xff5a1f,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.position.copy(pos)
      ring.lookAt(pos.clone().multiplyScalar(2))
      markerGroup.add(ring)
    })

    // ─── 5. Curved Flight Arcs & Traveling Photons ────────────
    const arcGroup = new THREE.Group()
    globeGroup.add(arcGroup)

    interface ArcData {
      curve: THREE.QuadraticBezierCurve3
      line: THREE.Line
      photon: THREE.Mesh
      progress: number
      speed: number
    }

    const arcs: ArcData[] = []

    CONNECTIONS.forEach((conn) => {
      const start = markerPositions[conn.from]
      const end = markerPositions[conn.to]
      if (!start || !end) return

      // Midpoint projected outward to create arc elevation
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
      const distance = start.distanceTo(end)
      const altitude = GLOBE_RADIUS + distance * 0.45
      mid.normalize().multiplyScalar(altitude)

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
      const points = curve.getPoints(45)
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points)

      const arcMat = new THREE.LineBasicMaterial({
        color: 0xff5a1f,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      })
      const line = new THREE.Line(arcGeo, arcMat)
      arcGroup.add(line)

      // Traveling Photon Light Mesh
      const photonGeo = new THREE.SphereGeometry(0.024, 12, 12)
      const photonMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.95,
      })
      const photon = new THREE.Mesh(photonGeo, photonMat)
      arcGroup.add(photon)

      arcs.push({
        curve,
        line,
        photon,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.003,
      })
    })

    // ─── 6. Ambient Dot Grid Backdrop (Canvas background) ─────
    const bgCanvas = document.createElement('canvas')
    bgCanvas.width = 40
    bgCanvas.height = 40
    const bctx = bgCanvas.getContext('2d')!
    bctx.fillStyle = 'rgba(255, 255, 255, 0.04)'
    bctx.beginPath()
    bctx.arc(20, 20, 1.2, 0, Math.PI * 2)
    bctx.fill()
    const bgPattern = new THREE.CanvasTexture(bgCanvas)
    bgPattern.wrapS = THREE.RepeatWrapping
    bgPattern.wrapT = THREE.RepeatWrapping
    bgPattern.repeat.set(30, 20)

    const bgPlaneGeo = new THREE.PlaneGeometry(16, 10)
    const bgPlaneMat = new THREE.MeshBasicMaterial({
      map: bgPattern,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    })
    const bgPlane = new THREE.Mesh(bgPlaneGeo, bgPlaneMat)
    bgPlane.position.z = -2.5
    scene.add(bgPlane)

    // Initial orientation: Center on India / Asia
    globeGroup.rotation.y = -1.25
    globeGroup.rotation.x = 0.28

    // ─── 7. Interactive Drag & Momentum Controls ──────────────
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0
    let velX = 0
    let velY = 0
    let autoRotate = true

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true
      setIsInteracting(true)
      autoRotate = false
      prevMouseX = e.clientX
      prevMouseY = e.clientY
      velX = 0
      velY = 0
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevMouseX
      const deltaY = e.clientY - prevMouseY
      prevMouseX = e.clientX
      prevMouseY = e.clientY

      velX = deltaX * 0.005
      velY = deltaY * 0.005

      globeGroup.rotation.y += velX
      globeGroup.rotation.x += velY
      // Clamp vertical tilt
      globeGroup.rotation.x = Math.max(-0.85, Math.min(0.85, globeGroup.rotation.x))
    }

    const onPointerUp = () => {
      isDragging = false
      setIsInteracting(false)
      setTimeout(() => {
        if (!isDragging) autoRotate = true
      }, 3500)
    }

    const dom = renderer.domElement
    dom.style.cursor = 'grab'
    dom.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    // Dynamic Location Badge rotation
    let hubIndexInterval: NodeJS.Timeout
    hubIndexInterval = setInterval(() => {
      setActiveMarker((prev) => {
        const nextIdx = (GLOBAL_HUBS.findIndex((h) => h.name === prev.name) + 1) % GLOBAL_HUBS.length
        return GLOBAL_HUBS[nextIdx]
      })
    }, 4500)

    // ─── 8. Animation Render Loop ─────────────────────────────
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const delta = clock.getDelta()

      // Auto rotation with inertia damping
      if (autoRotate) {
        globeGroup.rotation.y += 0.0028
      } else if (!isDragging) {
        velX *= 0.94
        velY *= 0.94
        globeGroup.rotation.y += velX
        globeGroup.rotation.x += velY
        globeGroup.rotation.x = Math.max(-0.85, Math.min(0.85, globeGroup.rotation.x))
      }

      // Animate Arcs photon pulses
      arcs.forEach((arc) => {
        arc.progress = (arc.progress + arc.speed) % 1
        const pt = arc.curve.getPointAt(arc.progress)
        arc.photon.position.copy(pt)
        // Pulsing scale
        const scale = 0.8 + Math.sin(arc.progress * Math.PI) * 0.6
        arc.photon.scale.set(scale, scale, scale)
      })

      // Atmosphere pulse
      const t = clock.getElapsedTime()
      atmosphereMesh.scale.setScalar(1.0 + Math.sin(t * 1.5) * 0.008)

      renderer.render(scene, camera)
    }

    animate()

    // ─── 9. Responsive Resize Handler ─────────────────────────
    const handleResize = () => {
      if (!container) return
      const newWidth = container.clientWidth
      camera.aspect = newWidth / canvasHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, canvasHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(hubIndexInterval)
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      dom.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [height])

  return (
    <div className={`interactive-globe-container ${className}`}>
      {/* 3D WebGL Canvas Mount */}
      <div
        ref={mountRef}
        className="globe-canvas-mount"
        style={{
          width: '100%',
          height: `${height}px`,
          position: 'relative',
        }}
      />

      {/* Floating Interactive Live Badge Pill */}
      {showBadges && (
        <div className="globe-floating-badge" data-interacting={isInteracting}>
          <div className="globe-badge-dot" />
          <div className="globe-badge-content">
            <span className="globe-badge-title">{activeMarker.label}</span>
            <span className="globe-badge-status">
              {activeMarker.name === 'Jaipur'
                ? 'Primary Engineering Hub'
                : 'Active Global Node'}
            </span>
          </div>
        </div>
      )}

      {/* Interactive Control Hint */}
      <div className="globe-drag-hint">
        <span>↔ Drag to rotate globe</span>
      </div>
    </div>
  )
}
