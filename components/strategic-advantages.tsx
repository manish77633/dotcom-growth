'use client'

import { useState } from 'react'

export interface AdvantageTab {
  num: string
  title: string
  eyebrow: string
  description: string
}

const tabsData: AdvantageTab[] = [
  {
    num: '01',
    title: 'Revenue Outcomes',
    eyebrow: 'BEYOND THE VANITY METRICS.',
    description: "Impressions and clicks don't pay the bills. Every dollar of our work is mapped directly to your P&L through concrete Growth Indexes.",
  },
  {
    num: '02',
    title: 'Specialized Expertise',
    eyebrow: 'ZERO DILUTION, PURE PERFORMANCE.',
    description: "Creative, Performance, and Tech — each run by dedicated experts. We don't believe in generalists; we believe in mastery of every discipline.",
  },
  {
    num: '03',
    title: 'Infrastructure First',
    eyebrow: 'BUILT TO WITHSTAND SCALE.',
    description: 'Growth without stable foundations breaks operations. We build architectures that effortlessly handle 10x spikes in traffic and transaction volume.',
  },
  {
    num: '04',
    title: 'Agile Delivery',
    eyebrow: 'VELOCITY WITHOUT COMPROMISE.',
    description: 'Bi-weekly release sprints, continuous integration, and transparent sprint boards keep your project on schedule and budget.',
  },
]

type ExpertiseCategory = 'tech' | 'creative' | 'performance'

export function StrategicAdvantages() {
  const [activeTab, setActiveTab] = useState<number>(0)
  const [expertiseCategory, setExpertiseCategory] = useState<ExpertiseCategory>('tech')

  return (
    <section className="advantages" id="advantages" aria-label="Strategic Advantages">
      <div className="container">
        <div className="eyebrow orange">STRATEGIC ADVANTAGES</div>
        <h2>
          Design built for.<br />
          <span>Commercial impact.</span>
        </h2>

        <div className="advantage-layout">
          {/* Left Tabs List */}
          <div className="advantage-tabs" role="tablist">
            {tabsData.map((tab, idx) => {
              const isSelected = activeTab === idx
              return (
                <article
                  key={tab.num}
                  className={`advantage-tab-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => setActiveTab(idx)}
                  onMouseEnter={() => setActiveTab(idx)}
                  role="tab"
                  aria-selected={isSelected}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveTab(idx)
                    }
                  }}
                >
                  <i>{tab.num}</i>
                  <div className="advantage-tab-text">
                    <b>{tab.title}</b>
                    {isSelected && (
                      <div className="advantage-tab-expanded">
                        <small>{tab.eyebrow}</small>
                        <p>{tab.description}</p>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>

          {/* Right Interactive Visual Card */}
          <div className="growth-index-container" data-reveal>
            {activeTab === 0 && (
              <div className="growth-index visual-tab-pane animate-fade">
                <div className="vanity">
                  <span>◉ &nbsp; VANITY METRICS</span>
                  <em>Low ROI</em>
                </div>
                <div className="index-card">
                  <span>▥ &nbsp; OUTCOME DRIVEN</span>
                  <b>The Growth Index</b>
                  <div className="index-metrics">
                    <small>
                      P&amp;L CONTRIBUTION
                      <strong>+$1.2M</strong>
                    </small>
                    <small>
                      EFFICIENCY
                      <strong className="orange-stat">+240%</strong>
                    </small>
                  </div>
                  <hr className="index-bar" />
                </div>
                <em>&ldquo;We don&apos;t optimize for clicks.<br />We optimize for your bottom line.&rdquo;</em>
              </div>
            )}

            {activeTab === 1 && (
              <div className="growth-index visual-tab-pane animate-fade expertise-pane">
                {/* Category Pill Switcher */}
                <div className="expertise-pill-bar">
                  <button
                    className={`expertise-pill ${expertiseCategory === 'tech' ? 'active' : ''}`}
                    onClick={() => setExpertiseCategory('tech')}
                  >
                    TECH
                  </button>
                  <button
                    className={`expertise-pill ${expertiseCategory === 'creative' ? 'active' : ''}`}
                    onClick={() => setExpertiseCategory('creative')}
                  >
                    CREATIVE
                  </button>
                  <button
                    className={`expertise-pill ${expertiseCategory === 'performance' ? 'active' : ''}`}
                    onClick={() => setExpertiseCategory('performance')}
                  >
                    PERFORMANCE
                  </button>
                </div>

                {/* Sub-Card */}
                <div className="expertise-card">
                  <div className="expertise-icon-circle">
                    {expertiseCategory === 'tech' && <span>&lt;&gt;</span>}
                    {expertiseCategory === 'creative' && <span>✦</span>}
                    {expertiseCategory === 'performance' && <span>↗</span>}
                  </div>

                  {expertiseCategory === 'tech' && (
                    <div className="expertise-content">
                      <h4>Mastery over Scale</h4>
                      <p>Our engineers build proprietary stacks designed for 99.9% uptime and millisecond response times.</p>
                    </div>
                  )}

                  {expertiseCategory === 'creative' && (
                    <div className="expertise-content">
                      <h4>Storytelling that Converts</h4>
                      <p>High-impact brand positioning and campaign creative built to command authority in crowded markets.</p>
                    </div>
                  )}

                  {expertiseCategory === 'performance' && (
                    <div className="expertise-content">
                      <h4>Accountable Growth</h4>
                      <p>Data-driven media allocation, predictive attribution, and conversion rate engineering mapped to revenue.</p>
                    </div>
                  )}
                </div>

                <em>&ldquo;Specialized hubs with dedicated veterans. Zero generalists.&rdquo;</em>
              </div>
            )}

            {activeTab === 2 && (
              <div className="growth-index visual-tab-pane animate-fade">
                <div className="vanity">
                  <span>◈ &nbsp; CLOUD ARCHITECTURE</span>
                  <em>99.99% SLA</em>
                </div>
                <div className="index-card">
                  <span>▦ &nbsp; INFRASTRUCTURE METRICS</span>
                  <b>Mission-Critical Stability</b>
                  <div className="index-metrics">
                    <small>
                      API LATENCY
                      <strong>18ms</strong>
                    </small>
                    <small>
                      CONCURRENT LOAD
                      <strong className="orange-stat">500K+</strong>
                    </small>
                  </div>
                  <hr className="index-bar" />
                </div>
                <em>&ldquo;Scale without friction. Zero downtime architectures built for 10x growth.&rdquo;</em>
              </div>
            )}

            {activeTab === 3 && (
              <div className="growth-index visual-tab-pane animate-fade">
                <div className="vanity">
                  <span>▤ &nbsp; SPRINT VELOCITY</span>
                  <em>2-Week Sprints</em>
                </div>
                <div className="index-card">
                  <span>✓ &nbsp; AGILE RELEASE PIPELINE</span>
                  <b>Continuous Delivery</b>
                  <div className="index-metrics">
                    <small>
                      DEPLOY FREQUENCY
                      <strong>Daily</strong>
                    </small>
                    <small>
                      ON-TIME RATE
                      <strong className="orange-stat">99.4%</strong>
                    </small>
                  </div>
                  <hr className="index-bar" />
                </div>
                <em>&ldquo;Transparent execution with continuous integration every single week.&rdquo;</em>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
