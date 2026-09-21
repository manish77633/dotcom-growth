import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { Footer } from '@/components/site-footer'
import { CaseStudyHeroGlobe } from '@/components/case-study-hero-globe'
import { AmbientSparklesCanvas } from '@/components/ambient-sparkles-canvas'
import { CaseStudiesShowcase } from '@/components/case-studies-showcase'
import { technologies } from '@/lib/site-data'

export default function TechnologyPage() {
  return (
    <>
      <SiteHeader />
      <main className="case-studies-page-wrap" style={{ minHeight: '100vh', background: '#000000', color: '#ffffff' }}>
        {/* Immersive 3D WebGL Globe Hero Section */}
        <section className="case-studies-hero-immersive">
          <div className="container case-hero-foreground">
            <div className="case-hero-content-left">
              <div className="case-hero-eyebrow-wrap">
                <div className="eyebrow orange">ENTERPRISE TECHNOLOGY STACK</div>
              </div>

              {/* 3D Interactive WebGL Globe */}
              <CaseStudyHeroGlobe />

              <h1>
                The Technology Behind<br />
                <em>Meaningful</em> <strong>Growth.</strong>
              </h1>
              <p className="lead-text">
                Certified delivery capability, hardened cloud systems, and custom software architectures that make commercial strategy operational.
              </p>

              <div className="case-hero-actions">
                <a className="orange-button" href="#tech-directory">
                  EXPLORE TECH STACKS ↓
                </a>
                <Link className="outline-button" href="/#contact" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}>
                  TALK TO AN EXPERT
                </Link>
              </div>

            {/* Seamless Inline Metrics */}
            <div className="case-hero-metrics-bar">
              <div className="inline-stat-item">
                <strong>100%</strong>
                <span>Certified Delivery</span>
              </div>
              <div className="inline-stat-item">
                <strong>99.99%</strong>
                <span>System Uptime</span>
              </div>
              <div className="inline-stat-item">
                <strong>50+</strong>
                <span>Enterprise Integrations</span>
              </div>
              <div className="inline-stat-item">
                <strong>24/7</strong>
                <span>SLA Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Directory Grid with Ambient Sparkles Canvas */}
      <section className="case-editorial-showcase" id="tech-directory" style={{ padding: '100px 0 120px' }}>
        <AmbientSparklesCanvas particleCount={80} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="case-section-header">
            <div>
              <div className="eyebrow orange">CORE PLATFORMS & FRAMEWORKS</div>
              <h2>
                Enterprise Technology.<br />
                <span style={{ color: 'var(--orange)' }}>Engineered for Scale.</span>
              </h2>
            </div>
            <p>
              High-performance stacks configured for maximum security, instantaneous pipeline velocity, and seamless multi-channel sync.
            </p>
          </div>

          <div className="tech-directory-grid">
            {technologies.map((technology) => (
              <Link
                className="tech-directory-card"
                href={`/technology/${technology.slug}`}
                key={technology.slug}
              >
                <div className="tech-card-top">
                  <span className="tech-card-arrow">↗</span>
                  <span className="tech-card-tag">CERTIFIED STACK</span>
                </div>
                <h2>{technology.title}</h2>
                <p>{technology.description}</p>
                <div className="tech-card-footer">
                  <span>Explore Architecture →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Full-Width Alternating Case Studies with Scroll Reveal Animation */}
      <CaseStudiesShowcase />

      <Footer />
    </main>
    </>
  )
}
