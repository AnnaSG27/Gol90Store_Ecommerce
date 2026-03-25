import { ServiceDetail } from "@/features/services/service-detail"
import { StoreHeader } from "@/shared/components/StoreHeader"

export default async function ProductoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eefbf4_100%)]">
      <StoreHeader />
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <ServiceDetail id={id} />
      </section>
    </main>
  )
}
