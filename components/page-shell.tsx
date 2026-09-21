import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { Footer } from '@/components/site-footer'
import { CaseStudyHeroGlobe } from '@/components/case-study-hero-globe'

export function PageShell({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <main className="case-studies-page-wrap" style={{ minHeight: '100vh', background: '#000000', color: '#ffffff' }}>
      <SiteHeader />
      <section className="case-studies-hero-immersive">
        <CaseStudyHeroGlobe />
        <div className="container case-hero-foreground">
          <div className="case-hero-content-left">
            <div className="eyebrow orange">{eyebrow}</div>
            <h1>{title}</h1>
            <p className="lead-text">{description}</p>
            <div className="case-hero-actions">
              <Link className="orange-button" href="/#contact">TALK TO AN EXPERT</Link>
              <Link className="outline-button" href="/services" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}>VIEW CAPABILITIES</Link>
            </div>
          </div>
        </div>
      </section>
      {children}
      <Footer />
    </main>
  )
}

