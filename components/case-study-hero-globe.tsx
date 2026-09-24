'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface HubData {
  name: string
  label: string
  lat: number
  lng: number
  isHQ?: boolean
}

const GLOBAL_HUBS: HubData[] = [
  { name: 'Jaipur', label: 'ONLINE — JAIPUR (HQ)', lat: 26.9124, lng: 75.7873, isHQ: true },
  { name: 'San Francisco', label: 'SILICON VALLEY', lat: 37.7749, lng: -122.4194 },
  { name: 'New York', label: 'NEW YORK', lat: 40.7128, lng: -74.006 },
  { name: 'London', label: 'LONDON', lat: 51.5074, lng: -0.1278 },
  { name: 'Singapore', label: 'SINGAPORE', lat: 1.3521, lng: 103.8198 },
  { name: 'Tokyo', label: 'TOKYO', lat: 35.6762, lng: 139.6503 },
  { name: 'Dubai', label: 'DUBAI', lat: 25.2048, lng: 55.2708 },
  { name: 'Sydney', label: 'SYDNEY', lat: -33.8688, lng: 151.2093 },
]

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

// Generate clean circular glowing particle texture per renderer instance
function createParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')!
  const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.35, 'rgba(255,255,255,0.9)')
  grad.addColorStop(0.8, 'rgba(255,255,255,0.3)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.arc(16, 16, 16, 0, Math.PI * 2)
  ctx.fill()
  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

export function CaseStudyHeroGlobe() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const isMobile = window.innerWidth <= 900
    let width = container.clientWidth || (isMobile ? 290 : Math.min(Math.round(window.innerWidth * 0.42), 580))
    let height = container.clientHeight || (isMobile ? 210 : width)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ─── Scene & Camera ───────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000)
    camera.position.set(0, 0, 5.0)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default',
        precision: 'mediump',
        failIfMajorPerformanceCaveat: false,
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)
    } catch (e) {
      console.warn('[CaseStudyHeroGlobe] WebGL initialization skipped or failed:', e)
      return
    }

    // Master Globe Pivot Group centered within its container
    const masterGroup = new THREE.Group()
    masterGroup.position.set(0, 0, 0)
    scene.add(masterGroup)

    const globeGroup = new THREE.Group()
    masterGroup.add(globeGroup)

    // Globe Radius
    const GLOBE_RADIUS = 1.15

    // ─── 1. Inner Dark Core (Add FIRST so dots render on top) ───
    const innerCoreGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.985, 36, 36)
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x030407,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    })
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat)
    innerCore.renderOrder = 0
    globeGroup.add(innerCore)

    // ─── 2. Instant 360° Dense Bright White & Orange Point Cloud ──
    const pointCount = isMobile ? 7000 : 14000
    const positions = new Float32Array(pointCount * 3)
    const colors = new Float32Array(pointCount * 3)

    const colorOrange = new THREE.Color(0xff5a1f)
    const colorWhite = new THREE.Color(0xffffff)
    const colorSoftWhite = new THREE.Color(0xe0eaff)

    const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle

    for (let i = 0; i < pointCount; i++) {
      const y = 1 - (i / (pointCount - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = phi * i

      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY

      const lat = 90 - Math.acos(y) * (180 / Math.PI)
      const lng = ((Math.atan2(z, -x) * (180 / Math.PI) + 360) % 360) - 180

      const isLand = isLandmass(lat, lng)

      positions[i * 3] = x * GLOBE_RADIUS
      positions[i * 3 + 1] = y * GLOBE_RADIUS
      positions[i * 3 + 2] = z * GLOBE_RADIUS

      if (isLand) {
        if (lat >= 12 && lat <= 34 && lng >= 68 && lng <= 90) {
          colors[i * 3] = colorOrange.r
          colors[i * 3 + 1] = colorOrange.g
          colors[i * 3 + 2] = colorOrange.b
        } else if (Math.random() > 0.8) {
          colors[i * 3] = colorOrange.r
          colors[i * 3 + 1] = colorOrange.g * 0.8
          colors[i * 3 + 2] = colorOrange.b * 0.4
        } else {
          colors[i * 3] = colorWhite.r
          colors[i * 3 + 1] = colorWhite.g
          colors[i * 3 + 2] = colorWhite.b
        }
      } else {
        // Bright luminous dots across the entire 360 sphere (never dark or faded)
        if (Math.random() > 0.5) {
          colors[i * 3] = colorWhite.r * 0.95
          colors[i * 3 + 1] = colorWhite.g * 0.95
          colors[i * 3 + 2] = colorWhite.b
        } else {
          colors[i * 3] = colorSoftWhite.r * 0.88
          colors[i * 3 + 1] = colorSoftWhite.g * 0.88
          colors[i * 3 + 2] = colorSoftWhite.b * 0.92
        }
      }
    }

    const pointGeometry = new THREE.BufferGeometry()
    pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const pointTexture = createParticleTexture()

    const pointMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.038 : 0.032,
      vertexColors: true,
      map: pointTexture,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.98,
    })

    const particleGlobe = new THREE.Points(pointGeometry, pointMaterial)
    particleGlobe.renderOrder = 2
    globeGroup.add(particleGlobe)

    // ─── 3. City Hub Markers & Pulsing Pins ───────────────────
    const markerGroup = new THREE.Group()
    markerGroup.renderOrder = 4
    globeGroup.add(markerGroup)

    const markerPositions: THREE.Vector3[] = []

    GLOBAL_HUBS.forEach((hub) => {
      const pos = latLngToVector3(hub.lat, hub.lng, GLOBE_RADIUS * 1.01)
      markerPositions.push(pos)

      // Solid Glowing Pin
      const pinGeo = new THREE.SphereGeometry(0.024, 12, 12)
      const pinMat = new THREE.MeshBasicMaterial({
        color: hub.isHQ ? 0xff5a1f : 0xffffff,
      })
      const pin = new THREE.Mesh(pinGeo, pinMat)
      pin.position.copy(pos)
      markerGroup.add(pin)

      // Outer Ring
      const ringGeo = new THREE.RingGeometry(0.028, 0.044, 20)
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xff5a1f,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
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
      photon: THREE.Mesh
      progress: number
      speed: number
    }

    const arcs: ArcData[] = []

    CONNECTIONS.forEach((conn) => {
      const start = markerPositions[conn.from]
      const end = markerPositions[conn.to]
      if (!start || !end) return

      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
      const distance = start.distanceTo(end)
      const altitude = GLOBE_RADIUS + distance * 0.38
      mid.normalize().multiplyScalar(altitude)

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
      const points = curve.getPoints(36)
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points)

      const arcMat = new THREE.LineBasicMaterial({
        color: 0xff5a1f,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
      })
      const line = new THREE.Line(arcGeo, arcMat)
      arcGroup.add(line)

      // Traveling Light Photon
      const photonGeo = new THREE.SphereGeometry(0.018, 10, 10)
      const photonMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.95,
      })
      const photon = new THREE.Mesh(photonGeo, photonMat)
      arcGroup.add(photon)

      arcs.push({
        curve,
        photon,
        progress: Math.random(),
        speed: 0.0035 + Math.random() * 0.003,
      })
    })

    // ─── 6. Ambient 3D Particle Sparkles Layer ────────────────
    const sparkleCount = isMobile ? 60 : 160
    const sparklePositions = new Float32Array(sparkleCount * 3)
    const sparkleColors = new Float32Array(sparkleCount * 3)

    for (let i = 0; i < sparkleCount; i++) {
      const r = 1.8 + Math.random() * 3.5
      const theta = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * 3.5

      sparklePositions[i * 3] = Math.cos(theta) * r
      sparklePositions[i * 3 + 1] = y
      sparklePositions[i * 3 + 2] = Math.sin(theta) * r

      if (Math.random() > 0.8) {
        sparkleColors[i * 3] = colorOrange.r
        sparkleColors[i * 3 + 1] = colorOrange.g
        sparkleColors[i * 3 + 2] = colorOrange.b
      } else {
        sparkleColors[i * 3] = 0.8 + Math.random() * 0.2
        sparkleColors[i * 3 + 1] = 0.85 + Math.random() * 0.15
        sparkleColors[i * 3 + 2] = 1.0
      }
    }

    const sparkleGeo = new THREE.BufferGeometry()
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3))
    sparkleGeo.setAttribute('color', new THREE.BufferAttribute(sparkleColors, 3))

    const sparkleMat = new THREE.PointsMaterial({
      size: 0.034,
      vertexColors: true,
      map: pointTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.85,
    })

    const sparklesMesh = new THREE.Points(sparkleGeo, sparkleMat)
    scene.add(sparklesMesh)

    // Initial globe orientation
    globeGroup.rotation.y = -1.25
    globeGroup.rotation.x = 0.26

    // ─── 7. Immediate Synchronous First Frame Draw (No pop-in delay) ──
    renderer.render(scene, camera)

    // ─── 8. Smooth Damped Mouse Parallax ────────────────────
    let targetMouseX = 0
    let targetMouseY = 0
    let currentMouseX = 0
    let currentMouseY = 0

    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      targetMouseX = nx
      targetMouseY = ny
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // ─── 9. Render Animation Loop ──────────────────
    let animId = 0
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      if (!prefersReducedMotion) {
        globeGroup.rotation.y += 0.0018

        currentMouseX += (targetMouseX - currentMouseX) * 0.04
        currentMouseY += (targetMouseY - currentMouseY) * 0.04

        masterGroup.rotation.y = currentMouseX * 0.24
        masterGroup.rotation.x = -currentMouseY * 0.15

        sparklesMesh.rotation.y = t * 0.02 + currentMouseX * 0.12
        sparklesMesh.rotation.x = Math.sin(t * 0.1) * 0.04 - currentMouseY * 0.08
      }

      arcs.forEach((arc) => {
        arc.progress = (arc.progress + arc.speed) % 1
        const pt = arc.curve.getPointAt(arc.progress)
        arc.photon.position.copy(pt)
        const scale = 0.8 + Math.sin(arc.progress * Math.PI) * 0.6
        arc.photon.scale.set(scale, scale, scale)
      })

      renderer.render(scene, camera)
    }

    animId = requestAnimationFrame(animate)

    // ─── 10. Resize Handling ───────────────────────────────
    const handleResize = () => {
      if (!container) return
      const isMob = window.innerWidth <= 900
      width = container.clientWidth || (isMob ? 290 : Math.min(Math.round(window.innerWidth * 0.42), 580))
      height = container.clientHeight || (isMob ? 210 : width)
      camera.aspect = width / height
      camera.position.set(0, 0, 5.0)
      masterGroup.position.set(0, 0, 0)
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animId) cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', handleResize)
      if (container && renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
      pointGeometry.dispose()
      pointMaterial.dispose()
      pointTexture.dispose()
      innerCoreGeo.dispose()
      innerCoreMat.dispose()
      sparkleGeo.dispose()
      sparkleMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="case-hero-globe-canvas-wrap"
      aria-hidden="true"
    />
  )
}
