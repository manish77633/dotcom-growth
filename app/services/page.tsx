import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { CaseStudyHeroGlobe } from '@/components/case-study-hero-globe'
import { CaseStudiesShowcase } from '@/components/case-studies-showcase'
import { AnimatedHeroHeading } from '@/components/animated-hero-heading'
import { AnimatedCounter } from '@/components/animated-counter'
import { Capabilities, Stats, CertifiedOperations, StrategicAdvantages, Solutions, Voices, CTA, Footer } from '@/app/page'

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main className="case-studies-page-wrap" style={{ minHeight: '100vh', background: '#000000', color: '#ffffff' }}>
        {/* Immersive Hero Section with Background Video */}
        <section className="case-studies-hero-immersive has-service-hero-video">
          <div className="case-hero-video-bg" aria-hidden="true">
            <video
              src="/assets/videos/digital-transformation-hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="case-hero-video-bg-media"
            >
              <source src="/assets/videos/digital-transformation-hero.mp4" type="video/mp4" />
            </video>
            <div className="case-hero-video-overlay" />
          </div>

          <div className="container case-hero-foreground">
            <div className="case-hero-content-left">
              <div className="case-hero-eyebrow-wrap">
                <div className="eyebrow orange">COMMERCIAL CAPABILITIES</div>
              </div>
              <div className="case-hero-video-mobile-card" aria-hidden="true">
                <video
                  src="/assets/videos/digital-transformation-hero.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="case-hero-video-mobile-media"
                >
                  <source src="/assets/videos/digital-transformation-hero.mp4" type="video/mp4" />
                </video>
              </div>

              <AnimatedHeroHeading as="h1">
                Capabilities Engineered for<br />
                <em>Compounding</em> <strong>Growth.</strong>
              </AnimatedHeroHeading>
              <p className="lead-text">
                Specialist engineering and growth teams connecting commercial strategy, enterprise technology, and measurable revenue across global markets. We architect scalable systems that bridge the gap between complex digital operations and predictable, compounding commercial growth.
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
                <strong><AnimatedCounter value="8+" /></strong>
                <span>Core Capabilities</span>
              </div>
              <div className="inline-stat-item">
                <strong><AnimatedCounter value="350+" /></strong>
                <span>Engineers & Specialists</span>
              </div>
              <div className="inline-stat-item">
                <strong><AnimatedCounter value="98.4%" /></strong>
                <span>Client Retention</span>
              </div>
              <div className="inline-stat-item">
                <strong><AnimatedCounter value="$420M+" /></strong>
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
    </>
  )
}
