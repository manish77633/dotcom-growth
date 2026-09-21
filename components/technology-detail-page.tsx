"use client"

import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { Footer } from '@/components/site-footer'
import { CaseStudyHeroGlobe } from '@/components/case-study-hero-globe'
import { CaseStudiesShowcase } from '@/components/case-studies-showcase'
import { TrustedBrands, Stats, CertifiedOperations, StrategicAdvantages, Voices, CTA, useScrollReveal } from '@/app/page'
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

  return (
    <>
      <SiteHeader />
      <main className="case-studies-page-wrap" style={{ minHeight: '100vh', background: '#000000', color: '#ffffff' }}>
        {/* Immersive 3D WebGL Globe Hero (Matching Case Studies) */}
        <section className="case-studies-hero-immersive">
          <div className="container case-hero-foreground">
            <div className="case-hero-content-left">
              <div className="case-hero-eyebrow-wrap">
                <div className="eyebrow orange">TECHNOLOGY SYSTEM</div>
              </div>

              <CaseStudyHeroGlobe />

              <h1>
                {technology.title}<br />
                <em style={{ color: 'var(--orange)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 400 }}>built for scale.</em>
              </h1>
              <p className="lead-text">
                {technology.description} We turn platform capability into a clear, measurable operating advantage.
              </p>
              <div className="case-hero-actions">
                <Link className="orange-button" href="#technology-detail">SEE THE SYSTEM</Link>
                <Link className="outline-button" href="/#contact" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}>TALK TO AN EXPERT</Link>
              </div>
            </div>
          </div>
        </section>

        {/* What it enables */}
        <section id="technology-detail" className="tech-enables-section">
          <div className="container tech-enables-grid">
            <div data-reveal className="tech-enables-copy">
              <div className="eyebrow orange" style={{ marginBottom: 20 }}>WHAT IT ENABLES</div>
              <h2>
                Technology that makes the next move clearer.
              </h2>
              <p>
                We don&apos;t implement technology for its own sake. Every system we build is mapped to a commercial goal and measured against it.
              </p>
            </div>
            <div className="tech-enables-points">
              {detail.points.map((pt, i) => (
                <div key={pt.title} data-reveal data-reveal-delay={String(i + 1)} className="tech-enable-point-item">
                  <b>0{i + 1}</b>
                  <h3>{pt.title}</h3>
                  <p>{pt.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools & Tech */}
        <section style={{ background: '#000000', color: '#fff', padding: '100px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="container">
            <div className="eyebrow orange" style={{ marginBottom: 24 }}>TOOLS & PLATFORMS</div>
            <h2 style={{ fontSize: 'clamp(36px,4.5vw,56px)', lineHeight: 1.05, letterSpacing: '-2px', marginBottom: 16, fontWeight: 500, maxWidth: 600 }}>
              The platforms behind the system.
            </h2>
            <p style={{ color: '#8a94a6', fontSize: 17, marginBottom: 48, maxWidth: 500 }}>
              We are platform-agnostic — we select tools that fit your context, not the ones we prefer.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {detail.tools.map(tool => (
                <span key={tool} style={{ padding: '14px 24px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 100, background: 'rgba(255,255,255,0.04)', fontSize: 15, color: '#d0d4dc', transition: 'border-color 0.2s, color 0.2s', cursor: 'default' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = 'var(--orange)'; (e.target as HTMLElement).style.color = 'var(--orange)' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.target as HTMLElement).style.color = '#d0d4dc' }}
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
