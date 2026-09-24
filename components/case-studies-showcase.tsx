'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { caseStudies } from '@/lib/site-data'
import { AmbientSparklesCanvas } from './ambient-sparkles-canvas'
import { AnimatedCounter } from '@/components/animated-counter'

const caseImages: Record<string, string> = {
  'real-estate': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=85',
  'ecommerce': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=85',
  'b2c-growth': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=85',
  'edtech-growth': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=85',
  'saas-pipeline': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=85',
  'hospitality-bookings': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=85',
}

const categories = [
  'All Work',
  'PropTech & Real Estate',
  'E-Commerce & Retail',
  'Multi-Channel Growth',
  'EdTech & Digital Learning',
  'B2B Enterprise SaaS',
  'Hospitality & Luxury Travel',
]

/** Reusable CaseStudyRow with independent scroll-triggered entrance */
function CaseStudyRow({
  study,
  idx,
  isReversed,
  img,
}: {
  study: (typeof caseStudies)[number]
  idx: number
  isReversed: boolean
  img: string
}) {
  const rowRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setInView(true)
      return
    }

    const fallbackTimer = setTimeout(() => {
      setInView(true)
    }, 450)

    const el = rowRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.01,
        rootMargin: '100px 0px 50px 0px',
      }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      clearTimeout(fallbackTimer)
    }
  }, [])

  return (
    <article
      ref={rowRef}
      className={`case-editorial-row ${isReversed ? 'row-reversed' : ''} ${inView ? 'is-in-view' : ''}`}
    >
      {/* Large Real Image / Visual Canvas */}
      <div className="case-editorial-media">
        <Link href={`/case-studies/${study.slug}`} className="case-editorial-img-wrap" style={{ display: 'block', textDecoration: 'none' }}>
          <img src={img} alt={study.title} loading="lazy" />
          <div className="case-editorial-img-overlay" />
          <span className="case-editorial-category-badge">{study.category}</span>
          <div className="case-editorial-metric-chip">
            <strong><AnimatedCounter value={study.metric} /></strong>
            <small>{study.metricLabel}</small>
          </div>
        </Link>
      </div>

      {/* Case Study Details (Animates together as a coherent block) */}
      <div className="case-editorial-content">
        <span className="case-editorial-index">0{idx + 1} / CASE STUDY</span>
        <Link href={`/case-studies/${study.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3>{study.title}</h3>
        </Link>
        <p className="case-editorial-desc">{study.description}</p>

        <div className="case-editorial-meta-grid">
          <div>
            <small>COMMERCIAL IMPACT</small>
            <strong>{study.roi}</strong>
            <span>{study.roiLabel}</span>
          </div>
          <div>
            <small>DELIVERY ARCHITECTURE</small>
            <div className="case-editorial-tags">
              {study.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="case-editorial-action">
          <Link className="orange-button" href={`/case-studies/${study.slug}`}>
            EXPLORE CASE STUDY <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

export function CaseStudiesShowcase() {
  const [activeCategory, setActiveCategory] = useState('All Work')

  const filtered = caseStudies.filter((study) => {
    if (activeCategory === 'All Work') return true
    return study.category.toLowerCase().includes(activeCategory.toLowerCase().split(' ')[0])
  })

  return (
    <section className="case-editorial-showcase" id="case-studies-list">
      {/* High-Performance Ambient Sparkles Background */}
      <AmbientSparklesCanvas particleCount={80} />

      <div className="container">
        {/* Section Header */}
        <div className="case-section-header">
          <div>
            <div className="eyebrow orange">PORTFOLIO OF COMMERCIAL DELIVERY</div>
            <h2>
              Enterprise Impact.<br />
              <span style={{ color: 'var(--orange)' }}>Documented Results.</span>
            </h2>
          </div>
          <p>
            Explore real-world commercial transformations across complex tech stacks, high-volume commerce, and enterprise engineering.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="case-filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`case-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              type="button"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Full-Width Alternating Case Study Sections (NO CARDS, Full Continuous Visual Canvas) */}
        <div className="case-editorial-list">
          {filtered.map((study, idx) => {
            const isReversed = idx % 2 === 1
            const img = caseImages[study.slug] || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85'

            return (
              <CaseStudyRow
                key={study.slug}
                study={study}
                idx={idx}
                isReversed={isReversed}
                img={img}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
