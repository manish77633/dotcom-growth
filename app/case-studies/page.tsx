'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { Footer } from '@/components/site-footer'
import { CaseStudyHeroGlobe } from '@/components/case-study-hero-globe'
import { CaseStudyCTAScene } from '@/components/case-study-hero-scene'
import { CaseStudiesShowcase } from '@/components/case-studies-showcase'
import { AnimatedHeroHeading, RevealHeading } from '@/components/reveal-heading'
import { AnimatedCounter } from '@/components/animated-counter'
import { TrustedBrands, Stats, CertifiedOperations, Voices, useScrollReveal } from '@/app/page'

export default function CaseStudiesPage() {
  useScrollReveal()

  return (
    <>
      <SiteHeader />
      <main className="case-studies-page-wrap" style={{ minHeight: '100vh', background: '#ffffff', color: '#111111' }}>
        {/* Hero Section with Full-Bleed 3D WebGL Globe in Background */}
        <section className="case-studies-hero-immersive">
          <div className="container case-hero-foreground">
            <div className="case-hero-content-left">
              <div className="case-hero-eyebrow-wrap">
                <div className="eyebrow orange">PROVEN REVENUE IMPACT</div>
              </div>

              {/* 3D Interactive WebGL Globe */}
              <CaseStudyHeroGlobe />

              <AnimatedHeroHeading as="h1">
                Measurable Impact.<br />
                <em>Delivered</em> <strong>At Scale.</strong>
              </AnimatedHeroHeading>
              <p className="lead-text">
                Commercial technology infrastructure and digital growth systems that show up in your <i>revenue</i> — not just reports.
              </p>

              <div className="case-hero-actions">
                <a className="orange-button" href="#case-studies-list">
                  EXPLORE PORTFOLIO ↓
                </a>
                <a className="outline-button" href="#benchmarks" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.25)' }}>
                  ROI BENCHMARKS
                </a>
              </div>

            {/* Seamless Inline Metrics */}
            <div className="case-hero-inline-stats">
              <div className="inline-stat-item">
                <strong><AnimatedCounter value="$420M+" /></strong>
                <span>Client Pipeline Value</span>
              </div>
              <div className="inline-stat-item">
                <strong><AnimatedCounter value="3.8×" /></strong>
                <span>Average ROAS Surge</span>
              </div>
              <div className="inline-stat-item">
                <strong><AnimatedCounter value="98.4%" /></strong>
                <span>Enterprise Retention</span>
              </div>
              <div className="inline-stat-item">
                <strong><AnimatedCounter value="350+" /></strong>
                <span>Engineers & Specialists</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filterable Case Studies Showcase */}
      <CaseStudiesShowcase />

      {/* Quantified Transformation Benchmarks Section */}
      <section className="case-benchmark-section" id="benchmarks">
        <div className="container">
          <div className="eyebrow orange">MEASURABLE OUTCOMES</div>
          <AnimatedHeroHeading as="h2" style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-1.5px', marginTop: 14, color: '#111111' }}>
            How dotcomGrowth Compares to<br />
            <span style={{ color: 'var(--orange)' }}>Traditional Agency Generalists</span>
          </AnimatedHeroHeading>
          <p style={{ color: '#556477', maxWidth: 540, marginTop: 12, fontSize: 16 }}>
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

      {/* Industry Playbooks Section */}
      <section className="case-industry-section">
        <div className="container">
          <div className="eyebrow orange">VERTICAL SPECIALIZATION</div>
          <AnimatedHeroHeading as="h2" style={{ fontSize: 'clamp(32px, 4vw, 50px)', letterSpacing: '-1.5px', marginTop: 14, color: '#111111' }}>
            Tailored Playbooks for<br />
            <span>High-Complexity Industries</span>
          </AnimatedHeroHeading>
          <p style={{ color: '#556477', maxWidth: 520, marginTop: 12, fontSize: 16 }}>
            Every vertical operates with distinct regulatory, technical, and commercial constraints. Our specialized hubs build custom systems designed for each domain.
          </p>

          <div className="industry-cards-grid">
            <div className="industry-card" data-reveal>
              <div className="industry-icon">🏢</div>
              <RevealHeading as="h3">PropTech &amp; Real Estate</RevealHeading>
              <p>Multi-brokerage CRM unification, automated property lead syndication, and geo-targeted digital acquisition.</p>
              <ul>
                <li>Automated Agent Lead Distribution</li>
                <li>Interactive 3D Virtual Tours</li>
                <li>ERP Inventory Synchronization</li>
              </ul>
            </div>

            <div className="industry-card" data-reveal>
              <div className="industry-icon">🛍️</div>
              <RevealHeading as="h3">High-Volume E-Commerce</RevealHeading>
              <p>Conversion rate optimization, multi-channel marketplace scaling, and real-time inventory feed automation.</p>
              <ul>
                <li>Sub-second Headless Checkout</li>
                <li>Dynamic Retention &amp; Loyalty Loops</li>
                <li>Omnichannel Margin Attribution</li>
              </ul>
            </div>

            <div className="industry-card" data-reveal>
              <div className="industry-icon">⚡</div>
              <RevealHeading as="h3">B2B Enterprise SaaS</RevealHeading>
              <p>Account-based marketing infrastructure, product-led growth analytics, and sales pipeline acceleration.</p>
              <ul>
                <li>HubSpot / Salesforce Deep Bi-directional Sync</li>
                <li>Buyer Intent Scoring Engine</li>
                <li>Executive Demo Funnel Optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* Certified Operations & Engineering Rigor */}
      <CertifiedOperations />

      {/* Voices & Testimonials */}
      <Voices />

      {/* 3D Three.js Interactive CTA Section */}
      <section className="case-cta-section" id="contact">
        <div className="container">
          <div className="case-cta-card">
            <div className="case-cta-content">
              <div className="eyebrow orange">COMMENCE TRANSFORMATION</div>
              <AnimatedHeroHeading as="h2">
                Ready to engineer your next<br />
                <span>exponential growth chapter?</span>
              </AnimatedHeroHeading>
              <p>
                Schedule an executive discovery session with our commercial architects. We will analyze your tech stack and map an actionable growth index for your business.
              </p>
              <div className="case-cta-actions">
                <a className="orange-button" href="/#contact">
                  BOOK STRATEGY CALL →
                </a>
                <a className="outline-button" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }} href="/services">
                  VIEW ALL SERVICES
                </a>
              </div>
            </div>

            {/* 3D CTA Interactive Sphere */}
            <CaseStudyCTAScene />
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}
