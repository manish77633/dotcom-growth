import { notFound } from 'next/navigation'
import { ServiceDetailPage } from '@/components/service-detail-page'
import { services } from '@/lib/site-data'
import { getServiceDetail } from '@/lib/service-data'

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })) }
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const service = services.find((item) => item.slug === slug); if (!service) notFound(); return <ServiceDetailPage service={getServiceDetail(service)} /> }
