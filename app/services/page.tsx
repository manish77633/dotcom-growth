import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { CaseStudyHeroGlobe } from '@/components/case-study-hero-globe'
import { CaseStudiesShowcase } from '@/components/case-studies-showcase'
import { Capabilities, Stats, CertifiedOperations, StrategicAdvantages, Solutions, Voices, CTA, Footer } from '@/app/page'

export default function ServicesPage() {
  return (
    <main className="case-studies-page-wrap" style={{ minHeight: '100vh', background: '#000000', color: '#ffffff' }}>
      <SiteHeader />

      {/* Immersive 3D WebGL Globe Hero Section */}
      <section className="case-studies-hero-immersive">
        <CaseStudyHeroGlobe />

        <div className="container case-hero-foreground">
          <div className="case-hero-content-left">
            <div className="eyebrow orange">COMMERCIAL CAPABILITIES</div>
            <h1>
              Capabilities<br />
              Engineered for<br />
              <em>Compounding</em><br />
              <strong>Growth.</strong>
            </h1>
            <p className="lead-text">
              Specialist engineering and growth teams connecting commercial strategy, enterprise technology, and measurable revenue across global markets.
            </p>

            <div className="case-hero-actions">
              <Link className="orange-button" href="#capabilities-section">
                EXPLORE SERVICES ↓
              </Link>
              <Link className="outline-button" href="/#contact" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}>
                TALK TO AN EXPERT
              </Link>
            </div>

            {/* Seamless Inline Metrics */}
            <div className="case-hero-metrics-bar">
              <div className="inline-stat-item">
                <strong>8+</strong>
                <span>Core Capabilities</span>
              </div>
              <div className="inline-stat-item">
                <strong>350+</strong>
                <span>Engineers & Specialists</span>
              </div>
              <div className="inline-stat-item">
                <strong>98.4%</strong>
                <span>Client Retention</span>
              </div>
              <div className="inline-stat-item">
                <strong>$420M+</strong>
                <span>Generated Value</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="capabilities-section">
        <Capabilities />
      </div>
      <Stats />
      <CertifiedOperations />
      <StrategicAdvantages />
      <Solutions />

      {/* Full-Width Alternating Case Studies with Scroll Reveal Animation */}
      <CaseStudiesShowcase />

      <Voices />
      <CTA />
      <Footer />
    </main>
  )
}
