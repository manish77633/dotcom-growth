'use client'

import React, { useEffect, useRef } from 'react'

interface StarSparkle {
  x: number
  y: number
  size: number
  baseAlpha: number
  alpha: number
  alphaSpeed: number
  vx: number
  vy: number
  color: string
  isCrossFlare?: boolean
}

export function AmbientSparklesCanvas({
  particleCount = 110,
  className = '',
}: {
  particleCount?: number
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animId: number
    let isVisible = true
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    // Mouse tracking for subtle ambient parallax
    let targetMouseX = 0
    let targetMouseY = 0
    let currentMouseX = 0
    let currentMouseY = 0

    const stars: StarSparkle[] = []
    const starPalettes = [
      '255, 90, 31',   // Brand orange
      '255, 140, 60',  // Warm amber
      '180, 195, 215', // Soft slate sparkle
      '255, 120, 50',  // Golden orange
    ]

    const resize = () => {
      if (!container || !canvas) return
      const rect = container.getBoundingClientRect()
      width = rect.width || window.innerWidth
      height = rect.height || 800
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const initStars = () => {
      stars.length = 0
      const count = window.innerWidth < 768 ? Math.floor(particleCount * 0.45) : particleCount

      for (let i = 0; i < count; i++) {
        const color = starPalettes[Math.floor(Math.random() * starPalettes.length)]
        const isDistant = Math.random() > 0.35
        const size = isDistant ? 0.6 + Math.random() * 0.9 : 1.4 + Math.random() * 1.6
        const baseAlpha = isDistant ? 0.2 + Math.random() * 0.45 : 0.45 + Math.random() * 0.5
        const isCrossFlare = !isDistant && Math.random() > 0.75

        stars.push({
          x: Math.random() * (width || window.innerWidth),
          y: Math.random() * (height || 800),
          size,
          baseAlpha,
          alpha: baseAlpha,
          alphaSpeed: (0.006 + Math.random() * 0.015) * (Math.random() > 0.5 ? 1 : -1),
          vx: (Math.random() - 0.5) * 0.15,
          vy: -0.08 - Math.random() * 0.22, // Deep space gentle upward drift
          color,
          isCrossFlare,
        })
      }
    }

    resize()
    initStars()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      targetMouseX = (e.clientX - rect.left - rect.width / 2) * 0.02
      targetMouseY = (e.clientY - rect.top - rect.height / 2) * 0.02
    }

    container.addEventListener('mousemove', handleMouseMove, { passive: true })

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible && !animId) {
          lastTime = performance.now()
          animId = requestAnimationFrame(render)
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(container)

    let lastTime = performance.now()

    const render = (now: number) => {
      if (!isVisible) {
        animId = 0
        return
      }

      animId = requestAnimationFrame(render)
      const delta = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now

      ctx.clearRect(0, 0, width, height)

      // Smooth mouse damping
      currentMouseX += (targetMouseX - currentMouseX) * 0.04
      currentMouseY += (targetMouseY - currentMouseY) * 0.04

      if (prefersReducedMotion) {
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i]
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${s.color}, ${s.baseAlpha * 0.5})`
          ctx.fill()
        }
        return
      }

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]

        s.x += s.vx + currentMouseX * 0.15 * delta
        s.y += s.vy + currentMouseY * 0.15 * delta

        if (s.y < -12) s.y = height + 12
        if (s.y > height + 12) s.y = -12
        if (s.x < -12) s.x = width + 12
        if (s.x > width + 12) s.x = -12

        s.alpha += s.alphaSpeed
        if (s.alpha > s.baseAlpha) {
          s.alpha = s.baseAlpha
          s.alphaSpeed = -Math.abs(s.alphaSpeed)
        } else if (s.alpha < 0.08) {
          s.alpha = 0.08
          s.alphaSpeed = Math.abs(s.alphaSpeed)
        }

        // Draw star core
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${s.color}, ${s.alpha.toFixed(3)})`
        ctx.shadowColor = `rgba(${s.color}, 0.85)`
        ctx.shadowBlur = s.size > 1.4 ? 7 : 2
        ctx.fill()

        // Subtle 4-point cross diffraction on brighter stars
        if (s.isCrossFlare && s.alpha > 0.35) {
          ctx.strokeStyle = `rgba(${s.color}, ${(s.alpha * 0.4).toFixed(3)})`
          ctx.lineWidth = 0.75
          const flareLen = s.size * 3.2
          ctx.beginPath()
          ctx.moveTo(s.x - flareLen, s.y)
          ctx.lineTo(s.x + flareLen, s.y)
          ctx.moveTo(s.x, s.y - flareLen)
          ctx.lineTo(s.x, s.y + flareLen)
          ctx.stroke()
        }
      }
      ctx.shadowBlur = 0
    }

    animId = requestAnimationFrame(render)

    const handleWindowResize = () => {
      resize()
      initStars()
    }
    window.addEventListener('resize', handleWindowResize)

    return () => {
      cancelAnimationFrame(animId)
      observer.disconnect()
      container.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [particleCount])

  return (
    <div
      ref={containerRef}
      className={`ambient-sparkles-overlay ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="ambient-sparkles-canvas" />
    </div>
  )
}
