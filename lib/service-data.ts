import type { Service } from './site-data'

const common = { problems: [{ title: 'Disconnected systems', description: 'Important work is spread across tools, teams, and handoffs.' }, { title: 'Unclear priorities', description: 'Activity grows faster than the operating model behind it.' }, { title: 'Slow feedback loops', description: 'Teams need better signals to make confident decisions.' }], deliverables: ['Strategy and operating model', 'Implementation and enablement', 'Measurement and optimization'], process: [{ title: 'Diagnose', description: 'Map the current system and identify the highest-leverage move.' }, { title: 'Design', description: 'Turn the opportunity into a clear plan, workflow, and owner.' }, { title: 'Deliver', description: 'Launch the work in focused increments with useful feedback.' }, { title: 'Improve', description: 'Keep learning and compound what is working.' }] }

const specifics: Record<string, Partial<Service>> = {
  'marketing-automation': {
    label: 'MARKETING AUTOMATION',
    visualMark: '↗',
    visualCaption: 'CONNECTED WORKFLOWS',
    heroVideo: '/assets/videos/marketing-automation-hero.mp4',
    heroDescription: 'Streamline complex lead lifecycles and unify commercial touchpoints with intelligent automation workflows. We design, build, and optimize connected martech systems that eliminate manual handoffs, accelerate pipeline velocity, and turn customer signals into predictable, compounding revenue.',
    buildFor: { title: 'Growth that moves without more manual work.', description: 'Build a connected lifecycle that helps teams act faster and customers move forward.' },
    technologies: ['HubSpot', 'Marketo', 'Salesforce', 'Zapier'],
    relatedCaseStudies: [{ slug: 'ecommerce', type: 'GROWTH SYSTEM', title: 'A connected engine for measurable revenue.' }]
  },
  'digital-transformation': {
    label: 'DIGITAL TRANSFORMATION',
    visualMark: '◌',
    visualCaption: 'CONNECTED SYSTEMS',
    heroVideo: '/assets/videos/digital-transformation-hero.mp4',
    heroDescription: 'Modernize legacy architectures and operational foundations with resilient, enterprise-grade technology ecosystems. We align distributed teams, modernize core software, and establish scalable cloud workflows that reduce operational friction and unlock sustained commercial momentum.',
    buildFor: { title: 'Modern operations with a practical path forward.', description: 'Make complex change understandable, sequenced, and accountable.' },
    technologies: ['AWS', 'ServiceNow', 'Salesforce', 'Custom Software'],
    relatedCaseStudies: [{ slug: 'real-estate', type: 'TRANSFORMATION', title: 'Digitally transforming a real estate group.' }]
  },
  'demand-generation': {
    label: 'DEMAND GENERATION',
    visualMark: '⌁',
    visualCaption: 'AUDIENCE FLOW',
    heroVideo: '/assets/videos/demand-generation-hero.mp4',
    heroDescription: 'Build sustainable, high-converting pipelines through targeted go-to-market orchestration and precision multi-channel distribution. We integrate strategic audience positioning, performance media, and automated nurture loops into a closed-loop demand engine that consistently generates qualified enterprise pipeline.',
    buildFor: { title: 'A pipeline built around the right audience.', description: 'Connect positioning, content, and distribution into a demand system that learns.' },
    technologies: ['Google Ads', 'LinkedIn', 'HubSpot', 'GA4'],
    relatedCaseStudies: [{ slug: 'b2c-growth', type: 'DEMAND ENGINE', title: 'Growing revenue across channels.' }]
  },
  'performance-marketing': {
    label: 'PERFORMANCE MARKETING',
    visualMark: '+',
    visualCaption: 'SIGNAL → ACTION',
    heroVideo: '/assets/videos/demand-generation-hero.mp4',
    heroDescription: 'Turn media investments into measurable, accountable bottom-line revenue with full-funnel performance infrastructure. We combine advanced attribution modeling, continuous creative experimentation, and algorithmic budget allocation to maximize return on ad spend and scale customer acquisition efficiently.',
    buildFor: { title: 'More signal from every marketing dollar.', description: 'Create a sharper feedback loop between media, creative, conversion, and revenue.' },
    technologies: ['Google Ads', 'Meta', 'GA4', 'Looker'],
    relatedCaseStudies: [{ slug: 'ecommerce', type: 'PERFORMANCE', title: 'Taking an e-commerce brand to €1M.' }]
  },
  'ai-martech': {
    label: 'AI & MARTECH',
    visualMark: 'AI',
    visualCaption: 'INTELLIGENT SYSTEMS',
    heroVideo: '/assets/videos/digital-transformation-hero.mp4',
    heroDescription: 'Embed practical artificial intelligence and automated decision intelligence directly into core business workflows. From predictive lead scoring to dynamic workflow agents, we build tailored AI systems that speed up operational execution, enhance team productivity, and surface actionable insights in real time.',
    buildFor: { title: 'Useful intelligence inside the workflow.', description: 'Apply AI where it makes decisions clearer, processes faster, and teams more effective.' },
    technologies: ['OpenAI', 'Python', 'HubSpot', 'Custom AI'],
    relatedCaseStudies: [{ slug: 'b2c-growth', type: 'INTELLIGENCE', title: 'A more responsive growth system.' }]
  },
  'brand-strategy': {
    label: 'BRAND STRATEGY',
    visualMark: 'Aa',
    visualCaption: 'MARKET POSITIONING',
    heroVideo: '/assets/videos/demand-generation-hero.mp4',
    heroDescription: 'Establish undeniable market positioning, distinctive brand authority, and authentic resonance across every audience touchpoint. We craft comprehensive narrative systems, visual identities, and messaging frameworks that differentiate your enterprise, earn long-term trust, and drive lasting market leadership.',
    buildFor: { title: 'Clarity that earns attention and trust.', description: 'Build a distinctive system for how your business looks, sounds, and is remembered.' },
    technologies: ['Research', 'Positioning', 'Content', 'Design Systems'],
    relatedCaseStudies: [{ slug: 'b2c-growth', type: 'POSITIONING', title: 'Building a stronger market presence.' }]
  },
  'seo-content': {
    label: 'SEO & CONTENT',
    visualMark: '⌕',
    visualCaption: 'DURABLE VISIBILITY',
    heroVideo: '/assets/videos/marketing-automation-hero.mp4',
    heroDescription: 'Capture durable search visibility and organic customer demand with authoritative, intent-driven content architectures. We combine rigorous technical SEO, semantic content strategies, and high-performance digital distribution to dominate search rankings and generate high-intent inbound traffic.',
    buildFor: { title: 'Useful visibility that compounds over time.', description: 'Turn customer questions into an organized content system built to be found and trusted.' },
    technologies: ['Technical SEO', 'Content Strategy', 'Analytics', 'CMS'],
    relatedCaseStudies: [{ slug: 'b2c-growth', type: 'ORGANIC GROWTH', title: 'Growing visibility across owned channels.' }]
  },
  'crm-integration': {
    label: 'CRM INTEGRATION',
    visualMark: '↔',
    visualCaption: 'UNIFIED JOURNEYS',
    heroVideo: '/assets/videos/marketing-automation-hero.mp4',
    heroDescription: 'Unify fragmented data silos, customer journeys, and cross-functional teams into a single, cohesive source of truth. We architect and implement bi-directional CRM integrations, custom API bridges, and lifecycle synchronization so every team operates with clear context and seamless velocity.',
    buildFor: { title: 'One customer view across every handoff.', description: 'Unify data, teams, and customer journeys so every interaction has context.' },
    technologies: ['Salesforce', 'HubSpot', 'ServiceNow', 'APIs'],
    relatedCaseStudies: [{ slug: 'real-estate', type: 'OPERATIONS', title: 'Connected operations for a growing group.' }]
  },
}

export const serviceDetails: Service[] = [
  ...([] as Service[]),
]

export function getServiceDetail(base: Service) {
  const detail = specifics[base.slug] ?? {}
  const description = detail.heroDescription ?? detail.description ?? base.description
  return {
    ...base,
    label: detail.label ?? base.title.toUpperCase(),
    visualMark: detail.visualMark ?? '•',
    visualCaption: detail.visualCaption ?? 'CONNECTED GROWTH',
    heroVideo: detail.heroVideo,
    heroDescription: detail.heroDescription,
    description: description,
    buildFor: detail.buildFor ?? { title: base.description, description: base.description },
    problems: common.problems,
    deliverables: common.deliverables,
    process: common.process,
    technologies: detail.technologies ?? ['Strategy', 'Analytics', 'Technology'],
    relatedCaseStudies: detail.relatedCaseStudies ?? [{ slug: 'real-estate', type: 'CASE STUDY', title: 'A practical transformation story.' }],
    cta: { eyebrow: 'READY TO MOVE', title: `Let’s build your ${base.title.toLowerCase()} system.`, description: 'Bring us the growth challenge. We will bring the structure to solve it.' }
  }
}
