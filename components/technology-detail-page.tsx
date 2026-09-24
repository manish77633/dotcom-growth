"use client"

import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { Footer } from '@/components/site-footer'
import { CaseStudyHeroGlobe } from '@/components/case-study-hero-globe'
import { CaseStudiesShowcase } from '@/components/case-studies-showcase'
import { TrustedBrands, Stats, CertifiedOperations, StrategicAdvantages, Voices, CTA, useScrollReveal } from '@/app/page'
import { AnimatedHeroHeading, RevealHeading } from '@/components/reveal-heading'
import type { Technology } from '@/lib/site-data'

const techDetails: Record<string, {
  icon: string
  gradient: string
  points: { title: string; body: string }[]
  tools: string[]
}> = {
  'marketing-automation': {
    icon: '↗',
    gradient: 'linear-gradient(145deg,#112638,#2a7ec0)',
    points: [
      { title: 'Connected lead lifecycles', body: 'Automate the journey from first touch to closed deal with intelligent routing, scoring, and nurturing.' },
      { title: 'Cross-platform workflows', body: 'Integrate CRM, email, social, and analytics into a single operating layer that runs without manual intervention.' },
      { title: 'Measurable at every stage', body: 'Track attribution, velocity, and conversion at every step so you always know where to invest next.' },
    ],
    tools: ['HubSpot', 'Marketo', 'Salesforce', 'Zapier', 'ActiveCampaign', 'Make'],
  },
  'digital-transformation': {
    icon: '◌',
    gradient: 'linear-gradient(145deg,#1f3a72,#345da1)',
    points: [
      { title: 'Legacy to modern infrastructure', body: 'Migrate systems, data, and workflows onto scalable cloud platforms without disrupting daily operations.' },
      { title: 'People, process, and platform', body: 'Transformation only works when change is designed around real teams — we ensure adoption alongside technology.' },
      { title: 'Operational clarity', body: 'End-to-end visibility of how work flows across the business so leaders can make faster, better decisions.' },
    ],
    tools: ['AWS', 'ServiceNow', 'Salesforce', 'Azure', 'Custom APIs', 'Power BI'],
  },
  'custom-software': {
    icon: '</>',
    gradient: 'linear-gradient(145deg,#161b25,#8a5a32)',
    points: [
      { title: 'Purpose-built for your problem', body: 'Off-the-shelf never fits perfectly. We design and build software around your specific commercial need.' },
      { title: 'Scalable architecture', body: 'Every system we build is designed to grow — with your team, your data, and your ambitions.' },
      { title: 'Full-stack delivery', body: 'From backend infrastructure to polished user interfaces, delivered by a single accountable team.' },
    ],
    tools: ['React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'AWS'],
  },
  'erp-implementation': {
    icon: 'ERP',
    gradient: 'linear-gradient(145deg,#3a2d7a,#c04070)',
    points: [
      { title: 'Integrated enterprise operations', body: 'Connect finance, HR, supply chain, and customer operations into a single system of record.' },
      { title: 'Configured, not just installed', body: 'We configure ERP around your actual workflows — not the other way around.' },
      { title: 'Continuous improvement', body: 'Post-go-live support ensures you keep extracting more value as your business evolves.' },
    ],
    tools: ['SAP', 'Oracle', 'Microsoft Dynamics', 'ServiceNow', 'NetSuite', 'Odoo'],
  },
  'ai-development': {
    icon: 'AI',
    gradient: 'linear-gradient(145deg,#0d1a2e,#1a4a6e)',
    points: [
      { title: 'AI embedded in real workflows', body: 'We don\'t build AI demos. We build AI that reduces manual work, surfaces better decisions, and improves over time.' },
      { title: 'Trained on your context', body: 'Models are fine-tuned on your data, your language, and your specific operational needs.' },
      { title: 'Explainable and auditable', body: 'Every AI system we build has observable behaviour — so your team stays in control of what it does.' },
    ],
    tools: ['OpenAI', 'Python', 'LangChain', 'Pinecone', 'HuggingFace', 'Custom APIs'],
  },
  'genetic-ai': {
    icon: 'DNA',
    gradient: 'linear-gradient(145deg,#1a0a2e,#4a1a7e)',
    points: [
      { title: 'Intelligent generative interfaces', body: 'Create AI experiences that adapt, generate, and personalise in real time based on user context.' },
      { title: 'Evolutionary system design', body: 'Systems that improve through feedback loops — optimising outputs based on what actually works.' },
      { title: 'Research to production', body: 'We take emerging AI capabilities and translate them into reliable, scalable production systems.' },
    ],
    tools: ['GPT-4', 'Claude', 'Stable Diffusion', 'Python', 'Custom ML', 'TensorFlow'],
  },
}

export function TechnologyDetailPage({ technology }: { technology: Technology }) {
  useScrollReveal()
  const detail = techDetails[technology.slug] ?? {
    icon: '→',
    gradient: 'linear-gradient(145deg,#111,#333)',
    points: [
      { title: 'Architecture that supports the commercial goal.', body: 'Designed around your people, process, data, and measurable commercial outcome.' },
      { title: 'Connected workflows for teams and customers.', body: 'Every system we build is designed to connect the right people with the right information at the right time.' },
      { title: 'A system designed to improve over time.', body: 'Post-delivery optimisation ensures you keep extracting value as your business evolves.' },
    ],
    tools: ['Strategy', 'Analytics', 'Technology', 'Delivery', 'Optimisation'],
  }

  const heroVideo = technology.slug === 'marketing-automation'
    ? '/assets/videos/marketing-automation-hero.mp4'
    : technology.slug === 'digital-transformation'
    ? '/assets/videos/digital-transformation-hero.mp4'
    : technology.slug === 'custom-software'
    ? '/assets/videos/digital-transformation-hero.mp4'
    : technology.slug === 'erp-implementation'
    ? '/assets/videos/marketing-automation-hero.mp4'
    : technology.slug === 'ai-development'
    ? '/assets/videos/digital-transformation-hero.mp4'
    : technology.slug === 'genetic-ai'
    ? '/assets/videos/digital-transformation-hero.mp4'
    : '/assets/videos/demand-generation-hero.mp4'

  return (
    <>
      <SiteHeader />
      <main className="case-studies-page-wrap" style={{ minHeight: '100vh', background: '#ffffff', color: '#111111' }}>
        {/* Full-Bleed Video Hero with Cinematic Dark Overlay */}
        <section className="tech-hero-fullbleed">
          {heroVideo ? (
            <div className="tech-hero-video-bg" aria-hidden="true">
              <video
                src={heroVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="tech-hero-video-media"
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
              <div className="tech-hero-video-overlay" />
            </div>
          ) : (
            <div className="tech-hero-globe-wrap" aria-hidden="true">
              <CaseStudyHeroGlobe />
              <div className="tech-hero-video-overlay" />
            </div>
          )}

          <div className="container tech-hero-content-container">
            <div className="tech-hero-main-content" data-reveal>
              <div className="tech-hero-eyebrow-wrap">
                <div className="eyebrow orange">TECHNOLOGY SYSTEM</div>
              </div>

              <AnimatedHeroHeading as="h1" className="tech-hero-title">
                {technology.title}<br />
                <em style={{ color: 'var(--orange)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 400 }}>built for scale.</em>
              </AnimatedHeroHeading>
              
              <p className="tech-hero-description">
                {technology.description} We turn platform capability into a clear, measurable operating advantage.
              </p>

              <div className="tech-hero-actions">
                <a className="orange-button" href="#tech-tools">SEE THE SYSTEM</a>
                <Link className="outline-button" href="/#contact" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.25)' }}>TALK TO AN EXPERT</Link>
              </div>
            </div>

            {/* 3 Supporting Points Directly Integrated in Hero */}
            <div className="tech-hero-points-grid" data-reveal>
              {detail.points.map((pt, i) => (
                <div key={pt.title} className="tech-hero-point-item">
                  <span className="tech-hero-point-num">0{i + 1}</span>
                  <RevealHeading as="h3" className="tech-hero-point-title">{pt.title}</RevealHeading>
                  <p className="tech-hero-point-body">{pt.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools & Platforms */}
        <section id="tech-tools" className="tech-platforms-section">
          <div className="container">
            <div className="eyebrow orange" style={{ marginBottom: 20 }}>TOOLS & PLATFORMS</div>
            <AnimatedHeroHeading as="h2" style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: 16, fontWeight: 500, maxWidth: 640, color: '#111111' }}>
              The platforms behind the system.
            </AnimatedHeroHeading>
            <p style={{ color: '#556477', fontSize: 16.5, marginBottom: 44, maxWidth: 540, lineHeight: 1.6 }}>
              We are platform-agnostic — we select tools that fit your context, not the ones we prefer.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {detail.tools.map(tool => (
                <span
                  key={tool}
                  className="tech-tool-pill"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        <Stats />
        <CertifiedOperations />
        <StrategicAdvantages />
        <CaseStudiesShowcase />
        <Voices />
        <CTA />
        <Footer />
      </main>
    </>
  )
}
