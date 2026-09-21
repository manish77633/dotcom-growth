'use client'

import { useState, useEffect, useRef } from 'react'
import { SiteHeader } from '@/components/site-header'
import { CaseStudiesSection } from '@/components/case-studies-section'
import { CapabilityAccordion } from '@/components/capability-accordion'
import { StrategicAdvantages } from '@/components/strategic-advantages'

const services = [
  ['Marketing Automation', 'Streamlining lead lifecycles.', '⚡'],
  ['Digital Transformation', 'Modernizing core architectures.', '▦'],
  ['Demand Generation', 'Building scalable pipelines.', '◎'],
  ['Performance Marketing', 'Ad spend optimization.', '↗'],
  ['AI & Martech', 'Intelligent workflow automation.', '✧'],
  ['Brand Strategy', 'Authority and positioning.', '♢'],
  ['SEO & Content', 'Organic growth and visibility.', '⌕'],
  ['CRM Integration', 'Unified data systems.', '▤'],
]

const cases = [
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

const brands = [
  { label: 'street', small: 'with love', cls: 'muted' },
  { label: 'HEALTHY DAY', cls: 'blue' },
  { label: 'HOOPTALE', cls: 'blue strong' },
  { label: 'BCM', small: 'Brand Coupon Mall', cls: 'coupon' },
  { label: 'Bibliophile', small: 'Study Centre', cls: 'purple' },
]

export function Logo() {
  return (
    <a className="logo" href="#top">
      <span>dotcom</span>Gr<span className="arrow">↑</span>wth
    </a>
  )
}

function Header() { return <SiteHeader /> }

/** Scroll-reveal hook */
export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <div className="hero-copy">
          <div className="hero-badge-row">
            <div className="eyebrow vertical">STRATEGIC DIVISION</div>
            <div className="eyebrow">MARTECH</div>
          </div>
          <h1>
            Enterprise Scale.<br />
            <em>Agency Speed.</em><br />
            <strong>Revenue Focus.</strong>
          </h1>
          <p>Growth That Shows Up in Your <i>Revenue.</i> Not Just Your Reports.</p>
          <div className="button-row">
            <a className="orange-button" href="#contact">TALK TO AN EXPERT</a>
            <a className="outline-button" href="#contact">SCHEDULE A CALL</a>
          </div>
        </div>
      </div>
      <div className="steps" aria-hidden="true">
        <div /><div /><div /><div /><div />
      </div>
    </section>
  )
}

export function TrustedBrands() {
  const allBrands = [...brands, ...brands]
  return (
    <section className="trusted-brands" aria-labelledby="trusted-title">
      <div className="container">
        <div className="eyebrow" id="trusted-title">TRUSTED BY BRANDS ACROSS VERTICALS</div>
        <div className="brand-marquee-wrap" style={{ marginTop: '40px' }}>
          <div className="brand-row">
            {allBrands.map((b, i) => (
              <span key={i} className={`brand ${b.cls}`}>
                {b.label}{b.small && <small>{b.small}</small>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Capabilities() {
  return (
    <section className="dark-section capabilities-section" id="solutions">
      <div className="container capabilities">
        <div className="section-intro" data-reveal>
          <div className="eyebrow orange">SERVICES SPECTRUM</div>
          <h2>Capabilities<br />engineered for<br /><span>compounding growth</span></h2>
          <p>Technology is only valuable when it creates measurable business outcomes. We engineer systems that directly impact operations, revenue, and growth.</p>
        </div>
        <div className="service-grid">
          {services.map(([title, desc, icon], i) => (
            <a className={`service-card ${i === 5 ? 'active' : ''}`} href="#contact" key={title as string} data-reveal data-reveal-delay={String((i % 4) + 1)}>
              <span className="service-icon">{icon}</span>
              <span>
                <b>{title}</b>
                <small>{desc}</small>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Stats() {
  return (
    <section className="stats-section-wrap">
      <div className="container stats-section">
        {[
          ['REVENUE GROWTH', '$1M+', 'Driven for a single client in under 12 months.'],
          ['AUDIENCE SCALE', '100K+', 'Built completely from scratch for a mid-market brand.'],
          ['ON-DEMAND TALENT', '350+', 'Engineers available for custom software and transformation.'],
          ['SPECIALIST HUBS', '3', 'Dedicated teams focusing on Tech, Creative, and Performance.'],
        ].map(([label, number, copy], i) => (
          <article className={i === 2 ? 'featured-stat' : ''} key={label} data-reveal data-reveal-delay={String(i + 1)}>
            <div className="eyebrow orange">{label}</div>
            <strong>{number}</strong>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function CertifiedOperations() {
  return (
    <section className="certified" id="technology-capabilities" aria-labelledby="certified-title">
      <div className="container">
        <div className="technology-header-block" data-reveal>
          <h3 className="tech-eyebrow-text">When growth requires more than marketing</h3>
          <h2 className="tech-main-title" id="certified-title">We deliver the technology too.</h2>
          <p className="tech-description-text">
            Our engineering team bridges the gap between commercial strategy &amp; deep technology execution, deploying certified development operations directly in alignment with your business goals.
          </p>
        </div>
        <CapabilityAccordion />
        <div className="certified-grid">
          {[
            { logo: 'CMMI', sub: 'LEVEL 3', label: 'CMMI Level 3', cls: '' },
            { logo: 'aws', sub: '', label: 'AWS Partner', cls: 'aws' },
            { logo: 'salesforce', sub: '', label: 'Salesforce Partner', cls: 'salesforce' },
            { logo: '◯', sub: '', label: 'ServiceNow Partner', cls: 'servicenow' },
            { logo: '21', sub: 'YEARS', label: '21 Years Delivery', cls: '' },
            { logo: '∞', sub: '', label: 'DevOps & Security', cls: 'devops' },
          ].map(({ logo, sub, label, cls }) => (
            <article key={label} data-reveal>
              <span className={`cert-logo ${cls}`}>
                {logo}
                {sub && <small>{sub}</small>}
              </span>
              <b>{label}</b>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export { StrategicAdvantages }

export function Voices() {
  return (
    <section className="voices">
      <div className="container">
        <div className="eyebrow orange">CLIENT ECHOES</div>
        <h2>Voices of <span>transformation.</span></h2>
      </div>
      <div className="testimonial-row">
        <article>
          <p>&ldquo;The work was completed to a very high standard, communication was clear and concise. Professional and quick turnaround.&rdquo;</p>
          <b>Samuel Vowles</b>
          <small>PARTNER</small>
        </article>
        <article>
          <p>&ldquo;A dedicated team of professionals. Pleasure to work with them and see the results come to life.&rdquo;</p>
          <b>Rakesh Gargajan</b>
          <small>PARTNER</small>
        </article>
        <article>
          <p>&ldquo;They brought clarity, speed, and measurable growth to every stage of the engagement.&rdquo;</p>
          <b>Client Partner</b>
          <small>DIRECTOR</small>
        </article>
        <article>
          <p>&ldquo;Outstanding results across every channel. The team became a true extension of our business.&rdquo;</p>
          <b>Maria Chen</b>
          <small>CEO, TechBridge</small>
        </article>
      </div>
    </section>
  )
}

export function Solutions() {
  return (
    <section className="dark-section solutions" id="about">
      <div className="container">
        <div className="eyebrow orange">CORE SOLUTIONS</div>
        <h2>Three specialized arenas.<br />Powered by dedicated experts.</h2>
        <p className="lead">We operate without generalists. Each division is staffed exclusively by veterans in that specific lane to deliver deep capability without dilution.</p>
        <div className="solution-grid">
          <article data-reveal>
            <span>01</span>
            <h3>Martech &amp; Digital<br />Transformation</h3>
            {['Martech stack audit & architecture', 'Marketing automation setup', 'CRM integration & data flow', 'AI-powered workflow automation', 'Analytics & attribution infrastructure'].map(x => <p key={x}>✓ &nbsp; {x}</p>)}
          </article>
          <article data-reveal data-reveal-delay="2">
            <span>02</span>
            <h3>Growth &amp; Performance<br />Marketing</h3>
            {['B2B demand generation', 'Paid media — Google, Meta, LinkedIn', 'SEO & content strategy', 'Conversion rate optimization', 'Pipeline & revenue attribution'].map(x => <p key={x}>✓ &nbsp; {x}</p>)}
          </article>
          <article className="wide" data-reveal>
            <span>03</span>
            <h3>Brand &amp; Creative Production</h3>
            <div className="columns">
              {['Brand identity & positioning', 'Social media management', 'Video & visual storytelling', 'Campaign creative & production', 'Content marketing', 'Thought leadership content'].map(x => <p key={x}>✓ &nbsp; {x}</p>)}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export function Cases() { return <CaseStudiesSection items={cases} /> }

export function CTA() {
  const [sent, setSent] = useState(false)
  return (
    <section style={{ padding: '80px 0', background: 'var(--cream)' }}>
      <div className="container">
        <div className="cta" id="contact">
          <div className="eyebrow orange">SCHEDULE A SESSION</div>
          <h2>Ready to <span>engineer</span> your<br />growth?</h2>
          <p>Select a time that works for you and let&apos;s discuss your scaling strategy.</p>
          <div className="calendar">
            <h3>Select a Date &amp; Time</h3>
            <div className="month">‹ <b>September 2026</b> ›</div>
            <div className="days">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(x => <span key={x}>{x}</span>)}
              {Array.from({ length: 30 }, (_, i) => (
                <button key={i} onClick={() => setSent(true)} className={i > 19 ? 'available' : ''}>{i + 1}</button>
              ))}
            </div>
            {sent && <div className="success">✓ &nbsp; Thanks — we&apos;ll be in touch within 24 hours.</div>}
          </div>
          <div className="contact-row">
            <div><small>DIRECT INQUIRY</small><b>hi@dotcomgrowth.com</b></div>
            <div><small>CALL US</small><b>+91 95882 07166</b></div>
            <div><small>VISIT US</small><b>SM Tower 386, Near Elements Mall,<br />DCM, Jaipur, 302021</b></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer>
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo />
          <p>We design, build, and scale commercial technology infrastructure for high-growth enterprise and mid-market organizations. No generalists. Only dedicated subject-matter expertise.</p>
        </div>
        <div>
          <b>SOLUTIONS</b>
          <a href="/services">Martech Setup</a>
          <a href="/services">Growth Marketing</a>
          <a href="/services">Brand Positioning</a>
          <a href="/technology">Custom Software</a>
        </div>
        <div>
          <b>DIFFERENTIATORS</b>
          <a href="/technology">Infrastructure First</a>
          <a href="/services">Specialist Teams</a>
          <a href="/services">Revenue KPIs</a>
          <a href="/services">Enterprise Agile</a>
        </div>
        <div>
          <b>CONTACT</b>
          <a className="orange-text" href="/#contact">Request Strategy Call</a>
          <a href="mailto:hi@dotcomgrowth.com">hi@dotcomgrowth.com</a>
          <a>Headquarters:<br />Austin, Texas</a>
        </div>
        <small className="copyright">
          <span>© 2026 Dotcom Growth. All rights reserved.</span>
          <span className="footer-legal">
            <a>Privacy Policy</a>
            <a>Terms of Service</a>
          </span>
        </small>
      </div>
    </footer>
  )
}

export default function Home() {
  useScrollReveal()

  return (
    <main>
      <Header />
      <Hero />
      <TrustedBrands />
      <Capabilities />
      <Stats />
      <CertifiedOperations />
      <StrategicAdvantages />
      <Solutions />
      <Cases />
      <Voices />
      <CTA />
      <Footer />
      <button className="chat" aria-label="Open chat">💬</button>
    </main>
  )
}
