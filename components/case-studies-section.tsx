'use client'

import Link from 'next/link'
import { AnimatedHeroHeading, RevealHeading } from '@/components/reveal-heading'

export type CaseStudyItem = {
  slug: string
  image: string
  title: string
  category?: string
  description?: string
  tags?: string[]
}

export const defaultCaseStudies: CaseStudyItem[] = [
  {
    slug: 'real-estate',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&auto=format&fit=crop&q=80',
    title: 'How We Digitally Transformed the Operations of a Real Estate Group',
    tags: ['Dual-tech stack', '360° delivery'],
  },
  {
    slug: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=900&auto=format&fit=crop&q=80',
    title: 'How We Took an E-commerce Brand to €1M in Revenue in Under 12 Months',
    tags: ['1M revenue', '12 months'],
  },
  {
    slug: 'b2c-growth',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80',
    title: 'How a B2C Brand Grew Revenue Across Website and Marketplaces Semi-famously',
    tags: ['Multi-channel revenue', 'SEO growth'],
  },
  {
    slug: 'edtech-growth',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop&q=80',
    title: 'How an Edtech Brand Built 100K+ Followers and a Predictable Enrollment Pipeline',
    tags: ['100K+ audience', 'Consistent enrollment'],
  },
  {
    slug: 'saas-pipeline',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&auto=format&fit=crop&q=80',
    title: 'How We Built Brand Authority and Enterprise Pipeline for a SaaS Services Company',
    tags: ['Pipeline growth', 'Shorter sales cycle'],
  },
  {
    slug: 'hospitality-bookings',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&auto=format&fit=crop&q=80',
    title: 'How a Hospitality Brand Built a Digital Presence That Drives Bookings — Not Awareness',
    tags: ['Booking-led strategy', 'Brand recognition'],
  },
]

export function CaseStudiesSection({
  items = defaultCaseStudies,
}: {
  items?: CaseStudyItem[]
}) {
  const displayItems = items && items.length > 0 ? items : defaultCaseStudies

  return (
    <section className="case-studies-showcase-section" id="cases">
      <div className="container">
        {/* Header */}
        <header className="case-showcase-header" data-reveal>
          <div className="case-showcase-title-wrap">
            <span className="case-proven-badge">PROVEN CASE STUDIES</span>
            <AnimatedHeroHeading as="h2">
              Measurable impact,<br />
              delivered at scale.
            </AnimatedHeroHeading>
          </div>
          <p className="case-showcase-lead">
            What we have delivered across different verticals.<br />
            No theoretical gains — only compound outcomes.
          </p>
        </header>

        {/* 6 Cards Grid */}
        <div className="case-showcase-grid">
          {displayItems.slice(0, 6).map((study, idx) => (
            <article
              className="case-showcase-card"
              key={study.slug || idx}
              data-reveal
              data-reveal-delay={String((idx % 3) + 1)}
            >
              <Link href={`/case-studies/${study.slug}`} className="case-card-inner-link">
                <div className="case-card-image-wrap">
                  <img
                    src={study.image}
                    alt={study.title}
                    loading="lazy"
                    className="case-card-img"
                  />
                  <div className="case-card-img-glare" />
                </div>

                <div className="case-card-body">
                  <RevealHeading as="h3" className="case-card-title">{study.title}</RevealHeading>

                  {study.tags && study.tags.length > 0 && (
                    <div className="case-card-tags">
                      {study.tags.map((tag) => (
                        <span key={tag} className="case-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="case-card-action">
                    <span className="case-read-text">READ CASE STUDY</span>
                    <span className="case-arrow">→</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
