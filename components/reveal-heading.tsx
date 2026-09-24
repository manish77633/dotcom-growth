'use client'

import React, { useEffect, useRef, useState, useId } from 'react'

export interface RevealHeadingProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span'
  className?: string
  style?: React.CSSProperties
  stagger?: number
  baseDelay?: number
  delay?: number
  mode?: 'chars' | 'mask'
}

function extractRawText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }
  if (Array.isArray(node)) {
    return node.map(extractRawText).join('')
  }
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode }
    return props.children ? extractRawText(props.children) : ''
  }
  return ''
}

export function RevealHeading({
  children,
  as: Tag = 'h2',
  className = '',
  style,
  stagger = 0.028,
  baseDelay = 0.04,
  delay: customDelay = 0,
  mode = 'chars',
}: RevealHeadingProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const headingRef = useRef<HTMLElement | null>(null)
  const uniqueId = useId()

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setIsRevealed(true)
      return
    }

    const node = headingRef.current
    if (!node) return

    // Pure IntersectionObserver: triggers ONLY when heading enters viewport during scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true)
            observer.disconnect() // Triggers once, never reverses or replays
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
  }, [])

  const rawText = extractRawText(children)
  let charCounter = 0

  function renderNode(node: React.ReactNode, keyPrefix = 'node'): React.ReactNode {
    if (typeof node === 'string' || typeof node === 'number') {
      const text = String(node)
      const parts = text.split(/(\s+)/)

      return parts.map((part, pIdx) => {
        if (!part) return null

        if (/^\s+$/.test(part)) {
          return (
            <span key={`${keyPrefix}-sp-${pIdx}`} className="char-hero-space" aria-hidden="true">
              {' '}
            </span>
          )
        }

        const chars = Array.from(part)
        return (
          <span key={`${keyPrefix}-w-${pIdx}`} className="char-hero-word" aria-hidden="true">
            {chars.map((char) => {
              const charDelay = customDelay + baseDelay + charCounter * stagger
              charCounter++
              return (
                <span
                  key={`${keyPrefix}-c-${charCounter}`}
                  className="char-hero-letter"
                  style={{
                    transitionDelay: `${charDelay.toFixed(3)}s`,
                  }}
                >
                  {char}
                </span>
              )
            })}
          </span>
        )
      })
    }

    if (Array.isArray(node)) {
      return node.map((child, idx) => renderNode(child, `${keyPrefix}-${idx}`))
    }

    if (React.isValidElement(node)) {
      if (node.type === 'br') {
        return <br key={`${keyPrefix}-br`} />
      }

      const { children: subChildren, ...otherProps } = (node.props || {}) as {
        children?: React.ReactNode
        [key: string]: unknown
      }
      return React.cloneElement(
        node as React.ReactElement,
        {
          key: `${keyPrefix}-elem`,
          ...otherProps,
        },
        renderNode(subChildren, `${keyPrefix}-sub`)
      )
    }

    return node
  }

  const renderedContent = renderNode(children, uniqueId)

  return (
    <Tag
      ref={headingRef as React.RefObject<HTMLHeadingElement>}
      className={`char-hero-heading ${isRevealed ? 'is-settled' : ''} ${className}`}
      style={style}
      aria-label={rawText}
    >
      {renderedContent}
    </Tag>
  )
}

export const AnimatedHeroHeading = RevealHeading
