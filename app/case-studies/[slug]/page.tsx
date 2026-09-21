import { notFound } from 'next/navigation'
import { CaseStudyDetail } from '@/components/case-study-detail'
import { caseStudies } from '@/lib/site-data'

export function generateStaticParams() { return caseStudies.map(({ slug }) => ({ slug })) }

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = caseStudies.find((item) => item.slug === slug)
  if (!study) notFound()
  return <CaseStudyDetail study={study} />
}

