'use client'

import React, { useEffect, useRef, useState } from 'react'

export interface AnimatedCounterProps {
  value?: string | number
  number?: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

export function parseStatValue(raw: string | number) {
  if (typeof raw === 'number') {
    return {
      prefix: '',
      target: raw,
      suffix: '',
      decimals: Number.isInteger(raw) ? 0 : 1,
      isValid: true,
    }
  }
  const str = String(raw).trim()
  const match = str.match(/^([^\d\-+]*[-+]?[^\d\s.]*)(\d+(?:\.\d+)?)(.*)$/)
  if (!match) {
    return { prefix: '', target: 0, suffix: str, decimals: 0, isValid: false }
  }
  const prefix = match[1] ?? ''
  const numStr = match[2]
  const suffix = match[3] ?? ''
  const target = parseFloat(numStr)
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0
  return { prefix, target, suffix, decimals, isValid: true }
}

export function AnimatedCounter({
  value,
  number,
  prefix: propPrefix,
  suffix: propSuffix,
  duration = 1800,
  decimals: propDecimals,
  className = '',
  style,
  children,
}: AnimatedCounterProps) {
  const rawInput = value ?? (typeof children === 'string' || typeof children === 'number' ? children : '')
  const parsed = parseStatValue(rawInput)

  const finalPrefix = propPrefix ?? parsed.prefix
  const finalSuffix = propSuffix ?? parsed.suffix
  const finalTarget = number ?? parsed.target
  const finalDecimals = propDecimals ?? parsed.decimals
  const isValid = number !== undefined || parsed.isValid

  const initialDisplay = isValid
    ? `${finalPrefix}${(0).toFixed(finalDecimals)}${finalSuffix}`
    : String(rawInput)

  const finalDisplay = isValid
    ? `${finalPrefix}${finalTarget.toFixed(finalDecimals)}${finalSuffix}`
    : String(rawInput)

  const [displayValue, setDisplayValue] = useState<string>(initialDisplay)
  const spanRef = useRef<HTMLSpanElement | null>(null)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (!isValid || hasAnimatedRef.current) {
      setDisplayValue(finalDisplay)
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setDisplayValue(finalDisplay)
      hasAnimatedRef.current = true
      return
    }

    const node = spanRef.current
    if (!node) return

    const startAnimation = () => {
      if (hasAnimatedRef.current) return
      hasAnimatedRef.current = true

      let startTime: number | null = null
      const startVal = 0
      const endVal = finalTarget

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(1, elapsed / duration)

        // Premium ease-out quart curve: smooth acceleration then gentle, progressive landing
        const easeProgress = 1 - Math.pow(1 - progress, 4)
        const currentVal = startVal + (endVal - startVal) * easeProgress

        setDisplayValue(`${finalPrefix}${currentVal.toFixed(finalDecimals)}${finalSuffix}`)

        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          setDisplayValue(finalDisplay)
        }
      }

      requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation()
            observer.disconnect()
          }
        })
      },
      {
        root: null,
        threshold: 0.01,
        rootMargin: '0px 0px -15px 0px',
      }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [finalTarget, finalPrefix, finalSuffix, finalDecimals, duration, finalDisplay, isValid])

  return (
    <span ref={spanRef} className={`animated-counter-num ${className}`} style={style}>
      {displayValue}
    </span>
  )
}
