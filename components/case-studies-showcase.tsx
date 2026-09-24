'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { caseStudies } from '@/lib/site-data'
import { AmbientSparklesCanvas } from './ambient-sparkles-canvas'
import { AnimatedHeroHeading, RevealHeading } from '@/components/reveal-heading'

const caseImages: Record<string, string> = {
  'edtech-growth': 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=85',
  'real-estate': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=85',
  'ecommerce': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=85',
  'b2c-growth': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=85',
  'saas-pipeline': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=85',
  'hospitality-bookings': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=85',
}

const categories = [
  'All Work',
  'Education & E-Learning',
  'PropTech & Real Estate',
  'E-Commerce & Retail',
  'Multi-Channel Growth',
  'B2B Enterprise SaaS',
  'Hospitality & Luxury Travel',
]

/** Case study card matching the target layout */
function CaseStudyCard({
  study,
  img,
}: {
  study: (typeof caseStudies)[number]
  img: string
}) {
  const technologies = ('technologies' in study && Array.isArray(study.technologies))
    ? study.technologies
    : study.tags

  const impactText = ('impact' in study && study.impact)
    ? study.impact
    : `${study.metric} ${study.metricLabel || ''}`

  return (
    <article className="case-study-card-item">
      {/* Left Column: Media */}
      <div className="case-study-card-image-col">
        <Link href={`/case-studies/${study.slug}`} className="case-study-card-image-link" tabIndex={-1}>
          <img src={img} alt={study.title} loading="lazy" />
        </Link>
      </div>

      {/* Right Column: Content */}
      <div className="case-study-card-content-col">
        <div className="case-study-card-header-row">
          <Link href={`/case-studies/${study.slug}`} className="case-study-card-title-link">
            <RevealHeading as="h3" className="case-study-card-title">{study.title}</RevealHeading>
          </Link>
          <Link
            href={`/case-studies/${study.slug}`}
            className="case-study-card-arrow-link"
            aria-label={`View ${study.title}`}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="case-study-card-arrow-icon"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>
        </div>

        <p className="case-study-card-description">{study.description}</p>

        <div className="case-study-card-impact-row">
          <strong className="case-study-impact-label">Impact:</strong>{' '}
          <span className="case-study-impact-value">{impactText}</span>
        </div>

        <div className="case-study-card-category-row">
          <span className="case-study-category-badge">{study.category}</span>
        </div>

        {technologies && technologies.length > 0 && (
          <div className="case-study-card-tech-row">
            {technologies.map((tech) => (
              <span key={tech} className="case-study-tech-pill">
                {tech}
              </span>
            ))}
          </div>
        )}
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
      <AmbientSparklesCanvas particleCount={70} />

      <div className="container">
        {/* Section Header */}
        <div className="case-section-header">
          <div>
            <div className="eyebrow orange">PORTFOLIO OF COMMERCIAL DELIVERY</div>
            <AnimatedHeroHeading as="h2">
              Enterprise Impact.<br />
              <span style={{ color: 'var(--orange)' }}>Documented Results.</span>
            </AnimatedHeroHeading>
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

        {/* Case Studies Card List */}
        <div className="case-study-cards-list">
          {filtered.map((study) => {
            const img = caseImages[study.slug] || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85'

            return (
              <CaseStudyCard
                key={study.slug}
                study={study}
                img={img}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
