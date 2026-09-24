'use client'

import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { Footer } from '@/components/site-footer'
import { CaseStudiesShowcase } from '@/components/case-studies-showcase'
import { Stats, CertifiedOperations, StrategicAdvantages, Voices, CTA, useScrollReveal } from '@/app/page'
import { AnimatedHeroHeading } from '@/components/animated-hero-heading'
import { AnimatedCounter } from '@/components/animated-counter'
import type { CaseStudy } from '@/lib/site-data'

const caseImages: Record<string, string> = {
  'real-estate': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80',
  'ecommerce': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80',
  'b2c-growth': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
  'edtech-growth': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
  'saas-pipeline': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=80',
  'hospitality-bookings': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=80',
}

const caseDetails: Record<string, {
  challenge: string
  approach: string
  results: { label: string; value: string }[]
}> = {
  'real-estate': {
    challenge: 'A fast-growing real estate group was operating across disconnected systems — separate CRMs, manual reporting, and no unified view of leads or performance. Growth was happening, but operations couldn\'t keep up.',
    approach: 'We started with a full systems audit and designed a connected stack using Salesforce CRM, automated lead routing, and a centralised performance dashboard. Each department was onboarded in phases to minimise disruption.',
    results: [
      { label: 'Lead Response Time', value: '−68%' },
      { label: 'Pipeline Visibility', value: '100%' },
      { label: 'Manual Reporting', value: 'Eliminated' },
    ],
  },
  'ecommerce': {
    challenge: 'An e-commerce brand had strong product-market fit but was struggling to convert traffic into consistent revenue. Paid channels were underperforming, organic was untapped, and the funnel lacked coherent structure.',
    approach: 'We rebuilt the performance marketing funnel from scratch — restructured Google and Meta campaigns, launched a content-driven SEO programme, and implemented conversion rate optimisation across the site\'s key pages.',
    results: [
      { label: 'Revenue in 12 Months', value: '€1M+' },
      { label: 'Organic Traffic Growth', value: '+340%' },
      { label: 'ROAS Improvement', value: '+2.8×' },
    ],
  },
  'b2c-growth': {
    challenge: 'A B2C brand was relying too heavily on a single channel and had no system to grow audience or revenue predictably. Marketplace presence was minimal, and the website was not converting.',
    approach: 'We built a multi-channel growth engine — connecting SEO, paid social, and marketplace optimisation into a single operating rhythm. Each channel was treated as a connected part of the revenue system, not a standalone effort.',
    results: [
      { label: 'Revenue Channels', value: '4 → 7' },
      { label: 'Marketplace Revenue', value: '+220%' },
      { label: 'Audience Built', value: '100K+' },
    ],
  },
  'edtech-growth': {
    challenge: 'An emerging edtech platform struggled with fluctuating monthly student acquisition costs and inconsistent organic community engagement across social channels.',
    approach: 'Engineered an organic content syndication engine and built an automated student onboarding funnel connected directly to a custom CRM and analytics attribution system.',
    results: [
      { label: 'Organic Audience', value: '100K+' },
      { label: 'Enrollment Pipeline', value: '+280%' },
      { label: 'Student CAC', value: '-52%' },
    ],
  },
  'saas-pipeline': {
    challenge: 'A B2B SaaS company had high-quality solutions but struggled to penetrate enterprise buying committees, resulting in long sales cycles and missed quota targets.',
    approach: 'Deployed an executive thought leadership and Account-Based Marketing (ABM) infrastructure, creating deterministic revenue attribution and tailored sales enablement pipelines.',
    results: [
      { label: 'Qualified Enterprise Pipeline', value: '+$18M' },
      { label: 'Sales Cycle Velocity', value: '+45%' },
      { label: 'Win Rate Improvement', value: '2.4×' },
    ],
  },
  'hospitality-bookings': {
    challenge: 'A premium luxury boutique hotel collection was overly dependent on third-party OTA platforms, losing up to 25% of top-line revenue to high commission fees.',
    approach: 'Designed a direct-to-consumer booking architecture with immersive editorial storytelling, VIP guest personalization, and automated retargeting workflows.',
    results: [
      { label: 'Direct Bookings Surge', value: '+180%' },
      { label: 'OTA Commission Saved', value: '35%' },
      { label: 'Guest Lifetime Value', value: '+42%' },
    ],
  },
}

export function CaseStudyDetail({ study }: { study: CaseStudy }) {
  useScrollReveal()

  const img = caseImages[study.slug] ?? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80'
  const detail = caseDetails[study.slug] ?? {
    challenge: 'The enterprise required a robust operational overhaul to eliminate manual friction and scale commercial performance.',
    approach: 'We architected a bespoke growth infrastructure with full-funnel tracking, integrated technology, and agile execution.',
    results: [
      { label: 'Efficiency Gain', value: '+140%' },
      { label: 'Pipeline Velocity', value: '2.5×' },
      { label: 'Data Accuracy', value: '99.9%' },
    ],
  }

  return (
    <>
      <SiteHeader />
      <main className="case-studies-page-wrap" style={{ minHeight: '100vh', background: '#07080b', color: '#ffffff' }}>
        {/* Premium White-Theme 2-Column Hero */}
        <section className="case-detail-hero-white">
          <div className="container case-detail-hero-grid">
            {/* Left Column: Title, Description, Metrics */}
            <div className="case-detail-hero-content" data-reveal>
              <AnimatedHeroHeading as="h1" className="case-detail-hero-title">
                {study.title}
              </AnimatedHeroHeading>
              
              <p className="case-detail-hero-desc">
                {study.description}
              </p>

              {/* Metrics Horizontal Strip */}
              <div className="case-detail-metrics-strip">
                <div className="case-detail-metric-card">
                  <strong className="case-detail-metric-val">
                    <AnimatedCounter value={study.roi} />
                  </strong>
                  <span className="case-detail-metric-lbl">{study.roiLabel}</span>
                </div>

                <div className="case-detail-metric-sep" />

                <div className="case-detail-metric-card">
                  <strong className="case-detail-metric-val">
                    <AnimatedCounter value={study.metric} />
                  </strong>
                  <span className="case-detail-metric-lbl">{study.metricLabel}</span>
                </div>

                {detail.results[0] && (
                  <>
                    <div className="case-detail-metric-sep" />
                    <div className="case-detail-metric-card">
                      <strong className="case-detail-metric-val" style={{ color: '#111111' }}>
                        <AnimatedCounter value={detail.results[0].value} />
                      </strong>
                      <span className="case-detail-metric-lbl">{detail.results[0].label}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Hero Visual Image */}
            <div className="case-detail-hero-visual" data-reveal>
              <div className="case-detail-hero-img-box">
                <img src={img} alt={study.title} />
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Case Study Narrative */}
        <section id="case-study-narrative" style={{ background: '#07080b', color: '#ffffff', padding: '80px 0 100px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="container">

            {/* Challenge & Approach 2-Column Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginBottom: 56 }}>
              <div data-reveal style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '36px 32px' }}>
                <div className="eyebrow orange" style={{ marginBottom: 16 }}>THE CHALLENGE</div>
                <h3 style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 500, color: '#ffffff', marginBottom: 16, letterSpacing: '-0.5px' }}>
                  Disconnected systems and untapped potential.
                </h3>
                <p style={{ color: '#a0acbe', fontSize: 16, lineHeight: 1.65, margin: 0 }}>
                  {detail.challenge}
                </p>
              </div>

              <div data-reveal style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '36px 32px' }}>
                <div className="eyebrow orange" style={{ marginBottom: 16 }}>OUR APPROACH</div>
                <h3 style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 500, color: '#ffffff', marginBottom: 16, letterSpacing: '-0.5px' }}>
                  Deterministic architecture and full-funnel engineering.
                </h3>
                <p style={{ color: '#a0acbe', fontSize: 16, lineHeight: 1.65, margin: 0 }}>
                  {detail.approach}
                </p>
              </div>
            </div>

            {/* Measured Impact Matrix */}
            <div data-reveal style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,90,31,0.08) 0%, rgba(12,14,19,0.95) 100%)', border: '1px solid rgba(255,90,31,0.25)', borderRadius: 24, padding: '40px 32px' }}>
              <div className="eyebrow orange" style={{ marginBottom: 12 }}>DELIVERED OUTCOMES</div>
              <h3 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 500, color: '#ffffff', marginBottom: 28, letterSpacing: '-1px' }}>
                Measurable commercial impact across every dimension.
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24 }}>
                <div style={{ padding: '20px 24px', background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: 12, color: '#8c97a8', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>{study.roiLabel}</span>
                  <strong style={{ fontSize: 36, color: 'var(--orange)', fontWeight: 600, letterSpacing: '-1px' }}><AnimatedCounter value={study.roi} /></strong>
                </div>
                <div style={{ padding: '20px 24px', background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: 12, color: '#8c97a8', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>{study.metricLabel}</span>
                  <strong style={{ fontSize: 36, color: 'var(--orange)', fontWeight: 600, letterSpacing: '-1px' }}><AnimatedCounter value={study.metric} /></strong>
                </div>
                {detail.results.map((r) => (
                  <div key={r.label} style={{ padding: '20px 24px', background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontSize: 12, color: '#8c97a8', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>{r.label}</span>
                    <strong style={{ fontSize: 36, color: '#ffffff', fontWeight: 600, letterSpacing: '-1px' }}><AnimatedCounter value={r.value} /></strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quantified Transformation Benchmarks Section */}
        <section className="case-benchmark-section" id="benchmarks">
          <div className="container">
            <div className="eyebrow orange">MEASURABLE OUTCOMES</div>
            <AnimatedHeroHeading as="h2" style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-1.5px', marginTop: 14 }}>
              How dotcomGrowth Compares to<br />
              <span style={{ color: 'var(--orange)' }}>Traditional Agency Generalists</span>
            </AnimatedHeroHeading>
            <p style={{ color: '#8f9db3', maxWidth: 540, marginTop: 12, fontSize: 16 }}>
              We replace siloed guesswork with unified engineering, precise attribution models, and full-funnel revenue architectures.
            </p>

            <div className="benchmark-grid">
              <div className="benchmark-card" data-reveal>
                <div className="dimension">Pipeline Velocity</div>
                <strong><AnimatedCounter value="4.2× Faster" /></strong>
                <p>Automated lead enrichment and instantaneous sales routing algorithms.</p>
                <div className="comparison-row">
                  Industry Avg: <span>1.1×</span>
                </div>
              </div>

              <div className="benchmark-card" data-reveal>
                <div className="dimension">CAC Compression</div>
                <strong><AnimatedCounter value="-54% Cost" /></strong>
                <p>Intent-driven audience clustering and deep server-side conversion API tracking.</p>
                <div className="comparison-row">
                  Industry Avg: <span>-8%</span>
                </div>
              </div>

              <div className="benchmark-card" data-reveal>
                <div className="dimension">System Uptime</div>
                <strong><AnimatedCounter value="99.99%" /></strong>
                <p>Enterprise microservices architecture with automated failover on AWS & Cloud.</p>
                <div className="comparison-row">
                  Industry Avg: <span>99.2%</span>
                </div>
              </div>

              <div className="benchmark-card" data-reveal>
                <div className="dimension">Attribution Precision</div>
                <strong><AnimatedCounter value="100% Deterministic" /></strong>
                <p>Unified data warehouse with multi-touch pipeline attribution and CRM sync.</p>
                <div className="comparison-row">
                  Industry Avg: <span>Estimated</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Explore More Case Studies */}
        <CaseStudiesShowcase />

        {/* Global Sections Matching Case Studies Page */}
        <Stats />
        <CertifiedOperations />
        <StrategicAdvantages />
        <Voices />
        <CTA />
        <Footer />
      </main>
    </>
  )
}
