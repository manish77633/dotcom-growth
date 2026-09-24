'use client'

import { useState, useEffect, useRef } from 'react'
import { ScrollDataScene } from './three-scenes'
import { AnimatedCounter } from '@/components/animated-counter'

const stages = [
  {
    step: '01',
    title: 'Systems Audit & Data Discovery',
    subtitle: 'TELEMETRY PHASE',
    description: 'We audit your entire martech stack, CRM pipelines, and digital architectures to identify leaks, bottlenecks, and high-yield growth leverage points.',
    metrics: [
      { label: 'Attribution Fidelity', value: '100%' },
      { label: 'Data Latency', value: '< 20ms' },
      { label: 'Stack Consolidation', value: '4 → 1' },
    ],
    badge: 'STAGE 01 // AUDIT',
  },
  {
    step: '02',
    title: 'Cloud Architecture & Modernization',
    subtitle: 'INFRASTRUCTURE PHASE',
    description: 'Migrate and deploy scalable microservices on AWS/Cloud with resilient APIs, bidirectional Salesforce/HubSpot sync, and automated event triggers.',
    metrics: [
      { label: 'System Uptime', value: '99.99%' },
      { label: 'API Response', value: '18ms' },
      { label: 'Security Level', value: 'CMMI L3' },
    ],
    badge: 'STAGE 02 // ARCHITECTURE',
  },
  {
    step: '03',
    title: 'Precision Performance & AI Engine',
    subtitle: 'GROWTH ACCELERATION',
    description: 'Deploy server-side conversion tracking, AI customer triage agents, and account-based marketing orchestration to scale qualified inbound pipeline.',
    metrics: [
      { label: 'CAC Compression', value: '-54%' },
      { label: 'Pipeline Velocity', value: '4.2×' },
      { label: 'Conversion Lift', value: '+340%' },
    ],
    badge: 'STAGE 03 // VELOCITY',
  },
  {
    step: '04',
    title: 'Compounding Revenue Delivery',
    subtitle: 'ENTERPRISE SCALE',
    description: 'Continuous optimization, omnichannel attribution loops, and certified DevOps engineering ensuring every marketing dollar maps directly to EBITDA.',
    metrics: [
      { label: 'Client Revenue Scaled', value: '$420M+' },
      { label: 'Enterprise Retention', value: '98.4%' },
      { label: 'Avg ROAS Growth', value: '3.8×' },
    ],
    badge: 'STAGE 04 // REVENUE',
  },
]

export function ScrollShowcase() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const totalHeight = rect.height - window.innerHeight
      if (totalHeight <= 0) return

      // Progress from 0 to 1
      const progress = Math.min(Math.max(-rect.top / totalHeight, 0), 1)
      const stepIndex = Math.min(Math.floor(progress * stages.length), stages.length - 1)
      setActiveStep(stepIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const current = stages[activeStep]

  return (
    <section className="scroll-showcase-section" ref={sectionRef} id="engine">
      <div className="container scroll-showcase-sticky-wrap">
        <div className="scroll-showcase-header">
          <div className="eyebrow orange">SCROLL-DRIVEN TRANSFORMATION ENGINE</div>
          <h2>
            From Legacy Architecture to<br />
            <span>Autonomous Revenue Velocity</span>
          </h2>
          <p>
            Experience the compounding phases of our commercial technology operating system.
          </p>
        </div>

        <div className="scroll-showcase-console">
          {/* Left: Step navigation & Stage Details */}
          <div className="scroll-showcase-content">
            <div className="scroll-steps-nav">
              {stages.map((st, idx) => (
                <button
                  key={st.step}
                  type="button"
                  className={`scroll-step-pill ${activeStep === idx ? 'active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <span className="step-num">{st.step}</span>
                  <span className="step-title">{st.title.split('&')[0]}</span>
                  <div className="step-progress-bar">
                    <div
                      className="step-progress-fill"
                      style={{ width: activeStep > idx ? '100%' : activeStep === idx ? '100%' : '0%' }}
                    />
                  </div>
                </button>
              ))}
            </div>

            <div className="scroll-stage-card">
              <div className="stage-badge-row">
                <span className="stage-badge">{current.badge}</span>
                <span className="stage-subtitle">{current.subtitle}</span>
              </div>

              <h3>{current.title}</h3>
              <p>{current.description}</p>

              <div className="stage-metrics-grid">
                {current.metrics.map((m) => (
                  <div className="stage-metric-box" key={m.label}>
                    <strong><AnimatedCounter value={m.value} /></strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: 3D Holographic Telemetry Core */}
          <div className="scroll-showcase-scene-wrap">
            <div className="scene-status-overlay">
              <span className="live-dot" /> TELEMETRY CORE // STAGE {current.step}
            </div>
            <ScrollDataScene activeStep={activeStep} />
          </div>
        </div>
      </div>
    </section>
  )
}
