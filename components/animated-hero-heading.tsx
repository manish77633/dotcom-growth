'use client'

import React, { useEffect, useRef, useState, useId } from 'react'

interface AnimatedHeroHeadingProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'div' | 'span'
  className?: string
  style?: React.CSSProperties
  stagger?: number
  baseDelay?: number
  scale?: number
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

export function AnimatedHeroHeading({
  children,
  as: Tag = 'h1',
  className = '',
  style,
  stagger = 0.032,
  baseDelay = 0.05,
}: AnimatedHeroHeadingProps) {
  const [isSettled, setIsSettled] = useState(false)
  const headingRef = useRef<HTMLElement | null>(null)
  const uniqueId = useId()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsSettled(true)
      return
    }

    const node = headingRef.current
    if (!node) return

    // IntersectionObserver triggers automatically when heading is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSettled(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
    )

    observer.observe(node)

    // Fallback timer to ensure settling runs even if observer fails
    const timer = setTimeout(() => {
      setIsSettled(true)
    }, 150)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  const rawText = extractRawText(children)

  let charCounter = 0

  function renderNode(node: React.ReactNode, keyPrefix = 'node'): React.ReactNode {
    if (typeof node === 'string' || typeof node === 'number') {
      const text = String(node)
      // Split into words while keeping spaces
      const parts = text.split(/(\s+)/)
      
      return parts.map((part, pIdx) => {
        if (!part) return null
        
        // Whitespace between words
        if (/^\s+$/.test(part)) {
          return (
            <span key={`${keyPrefix}-sp-${pIdx}`} className="char-hero-space" aria-hidden="true">
              {' '}
            </span>
          )
        }

        // Word container with individual character spans
        const chars = Array.from(part)
        return (
          <span key={`${keyPrefix}-w-${pIdx}`} className="char-hero-word" aria-hidden="true">
            {chars.map((char) => {
              const delay = baseDelay + charCounter * stagger
              charCounter++
              return (
                <span
                  key={`${keyPrefix}-c-${charCounter}`}
                  className="char-hero-letter"
                  style={{
                    transitionDelay: `${delay.toFixed(3)}s`,
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

      const { children: subChildren, ...otherProps } = (node.props || {}) as { children?: React.ReactNode; [key: string]: unknown }
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
      className={`char-hero-heading ${isSettled ? 'is-settled' : ''} ${className}`}
      style={style}
      aria-label={rawText}
    >
      {renderedContent}
    </Tag>
  )
}
