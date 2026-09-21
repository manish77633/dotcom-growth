'use client'

import Link from 'next/link'
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
  const img = caseImages[study.slug] ?? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80'
  const detail = caseDetails[study.slug]

  return (
    <div className="case-detail-page">
      <section className="case-detail-hero">
        <div className="container">
          <Link className="case-link" href="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
            ← ALL CASE STUDIES
          </Link>
          <div className="eyebrow orange" style={{ marginBottom: 20 }}>{study.tags[0]}</div>
          <h1>{study.title}</h1>
          <p style={{ marginTop: 20 }}>{study.description}</p>
        </div>
        <div className="container" style={{ marginTop: 48 }}>
          <img src={img} alt={study.title} style={{ width: '100%', height: 'min(56vw, 600px)', objectFit: 'cover', borderRadius: 28, display: 'block' }} />
        </div>
      </section>

      {detail && (
        <>
          <section className="case-detail-overview">
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, padding: '100px clamp(20px,5vw,100px)' }}>
              <div>
                <div className="eyebrow orange" style={{ marginBottom: 20 }}>PROJECT OVERVIEW</div>
                <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.08, letterSpacing: '-2px', marginBottom: 24 }}>
                  A focused story of strategy, delivery, and measurable outcomes.
                </h2>
                <p style={{ color: '#536074', fontSize: 18, lineHeight: 1.6 }}>{study.description}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 8 }}>
                {detail.results.map(r => (
                  <div key={r.label} style={{ background: '#f9f8f6', borderRadius: 20, padding: '28px 32px', border: '1px solid #e8e4df' }}>
                    <div className="eyebrow orange" style={{ marginBottom: 12 }}>{r.label}</div>
                    <strong style={{ fontSize: 48, fontWeight: 700, color: 'var(--orange)', letterSpacing: '-2px', lineHeight: 1 }}>{r.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={{ background: '#0b0b0c', color: '#fff', padding: '100px 0' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72 }}>
              <div>
                <div className="eyebrow orange" style={{ marginBottom: 20 }}>THE CHALLENGE</div>
                <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: 24 }}>
                  Growth needed a stronger operating system.
                </h2>
                <p style={{ color: '#aab2c0', fontSize: 17, lineHeight: 1.65 }}>{detail.challenge}</p>
              </div>
              <div>
                <div className="eyebrow orange" style={{ marginBottom: 20 }}>THE APPROACH</div>
                <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: 24 }}>
                  Strategy, execution, and technology in one lane.
                </h2>
                <p style={{ color: '#aab2c0', fontSize: 17, lineHeight: 1.65 }}>{detail.approach}</p>
              </div>
            </div>
          </section>
        </>
      )}

      <section style={{ background: 'var(--cream)', padding: '100px 0', textAlign: 'center' }}>
        <div className="container">
          <div className="eyebrow orange" style={{ marginBottom: 24 }}>KEEP EXPLORING</div>
          <h2 style={{ fontSize: 'clamp(36px,5vw,60px)', lineHeight: 1.08, letterSpacing: '-2px', marginBottom: 36 }}>
            More work, built for measurable outcomes.
          </h2>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link className="orange-button" href="/case-studies">VIEW ALL CASE STUDIES</Link>
            <Link className="outline-button" href="/#contact">START YOUR PROJECT</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
