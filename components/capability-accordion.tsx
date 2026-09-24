'use client'

import { useState } from 'react'
import Link from 'next/link'
import { RevealHeading } from '@/components/reveal-heading'

export interface CapabilityCardItem {
  id: string
  verticalTitle: string
  title: string
  description: string
  image: string
  link?: string
}

export const defaultCapabilityCards: CapabilityCardItem[] = [
  {
    id: 'ai-development',
    verticalTitle: 'AI DEVELOPMENT',
    title: 'AI Development',
    description: 'Custom deep learning models, computer vision, and neural network architectures built for high-scale enterprise operations.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=80',
    link: '/technology/ai-development',
  },
  {
    id: 'agentic-ai',
    verticalTitle: 'AGENTIC AI',
    title: 'Agentic AI',
    description: 'Autonomous multi-agent workflows and generative AI integrations driving automated decision intelligence.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80',
    link: '/technology/genetic-ai',
  },
  {
    id: 'custom-software',
    verticalTitle: 'CUSTOM SOFTWARE',
    title: 'Custom Software',
    description: 'Design and execution of bespoke web and mobile products using secure, highly scalable software frameworks.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80',
    link: '/technology/custom-software',
  },
  {
    id: 'erp-implementation',
    verticalTitle: 'ERP IMPLEMENTATION',
    title: 'ERP Implementation',
    description: 'Enterprise resource planning, cloud systems integration, and seamless cross-functional data orchestration.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&auto=format&fit=crop&q=80',
    link: '/technology/erp-implementation',
  },
  {
    id: 'digital-transformation',
    verticalTitle: 'DIGITAL TRANSFORMATION',
    title: 'Digital Transformation',
    description: 'Modernizing legacy systems and operational methodologies to accelerate market velocity and scale.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&auto=format&fit=crop&q=80',
    link: '/technology/digital-transformation',
  },
  {
    id: 'engineers',
    verticalTitle: '350+ ENGINEERS',
    title: '350+ Engineers',
    description: 'Certified full-stack engineers and domain specialists ready for immediate deployment and execution.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80',
    link: '/services',
  },
]

export function CapabilityAccordion({
  cards = defaultCapabilityCards,
  initialActiveIndex = 2,
}: {
  cards?: CapabilityCardItem[]
  initialActiveIndex?: number
}) {
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex)

  return (
    <div
      className="capability-accordion-wrap"
      data-reveal
      onMouseLeave={() => setActiveIndex(initialActiveIndex)}
    >
      <div className="capability-accordion">
        {cards.map((card, idx) => {
          const isActive = activeIndex === idx
          const CardTag = card.link ? Link : 'div'

          return (
            <CardTag
              key={card.id}
              href={card.link || '#'}
              className={`capability-card ${isActive ? 'active' : ''}`}
              onMouseEnter={() => setActiveIndex(idx)}
              onFocus={() => setActiveIndex(idx)}
              tabIndex={0}
              aria-label={card.title}
              role="group"
            >
              <img
                src={card.image}
                alt={card.title}
                className="capability-card-bg"
                loading="lazy"
              />
              <div className="capability-card-overlay" />

              {/* Vertical Title (Shown on collapsed cards) */}
              <div className="capability-vertical-title" aria-hidden={isActive}>
                <span>{card.verticalTitle}</span>
              </div>

              {/* Horizontal Content (Shown on expanded/active card) */}
              <div className="capability-expanded-content" aria-hidden={!isActive}>
                <RevealHeading as="h3">{card.title}</RevealHeading>
                <p>{card.description}</p>
              </div>
            </CardTag>
          )
        })}
      </div>
    </div>
  )
}
