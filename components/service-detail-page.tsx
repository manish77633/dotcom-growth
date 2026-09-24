'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { SiteHeader } from '@/components/site-header'
import { CaseStudyHeroGlobe } from '@/components/case-study-hero-globe'
import { CaseStudiesShowcase } from '@/components/case-studies-showcase'
import { Capabilities, Stats, CertifiedOperations, StrategicAdvantages, Solutions, Voices, CTA, Footer, useScrollReveal } from '@/app/page'
import { AnimatedHeroHeading } from '@/components/animated-hero-heading'
import { AnimatedCounter } from '@/components/animated-counter'
import type { Service } from '@/lib/site-data'

export function ServiceDetailPage({ service }: { service: Service }) {
  useScrollReveal()

  return (
    <>
      <SiteHeader />
      <main className="case-studies-page-wrap" style={{ minHeight: '100vh', background: '#000000', color: '#ffffff' }}>
        <section className={`case-studies-hero-immersive ${service.heroVideo ? 'has-service-hero-video' : ''}`}>
          {service.heroVideo && (
            <div className="case-hero-video-bg" aria-hidden="true">
              <video
                src={service.heroVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="case-hero-video-bg-media"
              >
                <source src={service.heroVideo} type="video/mp4" />
              </video>
              <div className="case-hero-video-overlay" />
            </div>
          )}

          <div className="container case-hero-foreground">
            <div className="case-hero-content-left">
              <div className="case-hero-eyebrow-wrap">
                <div className="eyebrow orange">{service.label || 'ENTERPRISE SERVICE'}</div>
              </div>

              {service.heroVideo ? (
                <div className="case-hero-video-mobile-card" aria-hidden="true">
                  <video
                    src={service.heroVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="case-hero-video-mobile-media"
                  >
                    <source src={service.heroVideo} type="video/mp4" />
                  </video>
                </div>
              ) : (
                <CaseStudyHeroGlobe />
              )}

              <AnimatedHeroHeading as="h1">{service.title}</AnimatedHeroHeading>
              <p className="lead-text">{service.description}</p>
              <div className="case-hero-actions">
                <Link className="orange-button" href="/#contact">TALK TO AN EXPERT</Link>
                <Link className="outline-button" href="#service-capabilities" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}>EXPLORE CAPABILITY</Link>
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
        <div id="service-capabilities">
          <Capabilities />
        </div>
        <Stats />
        <CertifiedOperations />
        <StrategicAdvantages />
        <Solutions />
        <CaseStudiesShowcase />
        <Voices />
        <CTA />
        <Footer />
      </main>
    </>
  )
}
