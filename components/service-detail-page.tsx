'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { SiteHeader } from '@/components/site-header'
import { CaseStudyHeroGlobe } from '@/components/case-study-hero-globe'
import { CaseStudiesShowcase } from '@/components/case-studies-showcase'
import { Capabilities, Stats, CertifiedOperations, Solutions, Voices, CTA, Footer, useScrollReveal } from '@/app/page'
import type { Service } from '@/lib/site-data'

export function ServiceDetailPage({ service }: { service: Service }) {
  useScrollReveal()

  return (
    <>
      <SiteHeader />
      <main className="case-studies-page-wrap" style={{ minHeight: '100vh', background: '#000000', color: '#ffffff' }}>
        <section className="case-studies-hero-immersive" data-reveal>
          <div className="container case-hero-foreground">
            <div className="case-hero-content-left">
              <div className="case-hero-eyebrow-wrap">
                <div className="eyebrow orange">{service.label || 'ENTERPRISE SERVICE'}</div>
              </div>

              <CaseStudyHeroGlobe />

              <h1>{service.title}</h1>
              <p className="lead-text">{service.description}</p>
              <div className="case-hero-actions">
                <Link className="orange-button" href="/#contact">TALK TO AN EXPERT</Link>
                <Link className="outline-button" href="#service-capabilities" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}>EXPLORE CAPABILITY</Link>
              </div>
            </div>
          </div>
        </section>
      <div id="service-capabilities">
        <Capabilities />
      </div>
      <Stats />
      <CertifiedOperations />
      <Solutions />
      <CaseStudiesShowcase />
      <Voices />
      <CTA />
      <Footer />
    </main>
    </>
  )
}
