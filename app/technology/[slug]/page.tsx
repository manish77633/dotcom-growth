import { notFound } from 'next/navigation'
import { TechnologyDetailPage } from '@/components/technology-detail-page'
import { technologies } from '@/lib/site-data'

export function generateStaticParams() { return technologies.map(({ slug }) => ({ slug })) }
export default async function TechnologyDetailPageRoute({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const technology = technologies.find((item) => item.slug === slug); if (!technology) notFound(); return <TechnologyDetailPage technology={technology} /> }
