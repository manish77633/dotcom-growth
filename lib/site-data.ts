export const services = [
  { slug: 'marketing-automation', title: 'Marketing Automation', description: 'Streamlining lead lifecycles with connected, measurable systems.' },
  { slug: 'digital-transformation', title: 'Digital Transformation', description: 'Modernizing core architectures for resilient growth.' },
  { slug: 'demand-generation', title: 'Demand Generation', description: 'Building scalable pipelines with focused go-to-market execution.' },
  { slug: 'performance-marketing', title: 'Performance Marketing', description: 'Turning media investment into accountable revenue.' },
  { slug: 'ai-martech', title: 'AI & Martech', description: 'Intelligent workflow automation for faster decisions.' },
  { slug: 'brand-strategy', title: 'Brand Strategy', description: 'Creating authority, clarity, and market positioning.' },
  { slug: 'seo-content', title: 'SEO & Content', description: 'Growing durable visibility through useful content systems.' },
  { slug: 'crm-integration', title: 'CRM Integration', description: 'Unifying data, teams, and customer journeys.' },
] as const

export const technologies = [
  { slug: 'marketing-automation', title: 'Marketing Automation', description: 'Connected workflows that move prospects and teams forward.' },
  { slug: 'digital-transformation', title: 'Digital Transformation', description: 'Modern architectures built for measurable operational outcomes.' },
  { slug: 'custom-software', title: 'Custom Software', description: 'Purpose-built products and platforms for complex growth needs.' },
  { slug: 'erp-implementation', title: 'ERP Implementation', description: 'Integrated enterprise operations with a clear path to scale.' },
  { slug: 'ai-development', title: 'AI Development', description: 'Practical AI systems embedded into real business workflows.' },
  { slug: 'genetic-ai', title: 'Genetic AI', description: 'Exploring intelligent interfaces and generative experiences.' },
] as const

export const caseStudies = [
  {
    slug: 'real-estate',
    title: 'How We Digitally Transformed the Operations of a Real Estate Group',
    tags: ['Dual-tech stack', '360° delivery'],
    description: 'A practical transformation story built around connected operations, unified CRM workflows, and measurable pipeline acceleration.',
    category: 'PROPTECH & REAL ESTATE',
    metric: '-68% Lead Time',
    metricLabel: 'Response speed across 12 regions',
    roi: '+$4.2M',
    roiLabel: 'Pipeline Value Unlocked',
  },
  {
    slug: 'ecommerce',
    title: 'How We Took an E-commerce Brand to €1M in Revenue in Under 12 Months',
    tags: ['1M revenue', '12 months'],
    description: 'A focused growth system connecting precision performance media, content architecture, and conversion rate engineering.',
    category: 'E-COMMERCE & RETAIL',
    metric: '€1M+ ARR',
    metricLabel: 'Achieved in 11.5 months from scratch',
    roi: '+340%',
    roiLabel: 'YoY Organic Revenue',
  },
  {
    slug: 'b2c-growth',
    title: 'How a B2C Brand Grew Revenue Across Website and Marketplaces Semi-famously',
    tags: ['Multi-channel revenue', 'SEO growth'],
    description: 'A unified digital growth engine scaling multichannel presence, automated stock syndication, and brand equity.',
    category: 'MULTI-CHANNEL GROWTH',
    metric: '+220%',
    metricLabel: 'Marketplace Gross Merchandise Value',
    roi: '100K+',
    roiLabel: 'Direct Consumer Audience',
  },
  {
    slug: 'edtech-growth',
    title: 'How an Edtech Brand Built 100K+ Followers and a Predictable Enrollment Pipeline',
    tags: ['100K+ audience', 'Consistent enrollment'],
    description: 'Engineering a viral social presence, high-converting learning funnels, and an automated student enrollment CRM.',
    category: 'EDTECH & DIGITAL LEARNING',
    metric: '100K+',
    metricLabel: 'Organic Student Community',
    roi: '3.4x',
    roiLabel: 'Enrollment Velocity',
  },
  {
    slug: 'saas-pipeline',
    title: 'How We Built Brand Authority and Enterprise Pipeline for a SaaS Services Company',
    tags: ['Pipeline growth', 'Shorter sales cycle'],
    description: 'Positioning, executive thought leadership, and account-based sales orchestration delivering repeatable enterprise demand.',
    category: 'B2B ENTERPRISE SAAS',
    metric: '+$18M',
    metricLabel: 'Qualified Sales Pipeline',
    roi: '-45%',
    roiLabel: 'Sales Cycle Length',
  },
  {
    slug: 'hospitality-bookings',
    title: 'How a Hospitality Brand Built a Digital Presence That Drives Bookings — Not Awareness',
    tags: ['Booking-led strategy', 'Brand recognition'],
    description: 'Direct-to-consumer booking architecture with immersive digital storytelling that reduces reliance on third-party OTAs.',
    category: 'HOSPITALITY & LUXURY TRAVEL',
    metric: '+180%',
    metricLabel: 'Direct Website Bookings',
    roi: '-35%',
    roiLabel: 'OTA Commission Costs',
  },
] as const

export type Service = (typeof services)[number] & { label?: string; visualMark?: string; visualCaption?: string; buildFor?: { title: string; description: string }; problems?: { title: string; description: string }[]; deliverables?: string[]; process?: { title: string; description: string }[]; technologies?: string[]; relatedCaseStudies?: { slug: string; type: string; title: string }[]; cta?: { eyebrow: string; title: string; description: string } }
export type Technology = (typeof technologies)[number]
export type CaseStudy = (typeof caseStudies)[number]
