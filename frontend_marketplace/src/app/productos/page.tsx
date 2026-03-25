import { ServicesExplorer } from "@/features/services/services-explorer"
import { StoreHeader } from "@/shared/components/StoreHeader"

export default function ProductosPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eefbf4_100%)]">
      <StoreHeader />
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="mb-8 flex flex-col gap-3">
          <span className="w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
            Catalogo Gol90Store
          </span>
          <h1 className="text-4xl font-black tracking-tight text-slate-950">
            Camisetas para cada hincha y cada temporada.
          </h1>
          <p className="max-w-2xl text-base text-slate-600">
            Explora camisetas de clubes, selecciones y ediciones retro con una
            experiencia visual mas coherente para tienda.
          </p>
        </div>
        <ServicesExplorer />
      </section>
    </main>
  )
}
