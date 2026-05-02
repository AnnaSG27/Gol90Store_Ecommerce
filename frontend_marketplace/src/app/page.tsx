import Link from "next/link"
import { RiArrowRightLine, RiShieldCheckLine, RiTShirt2Line } from "@remixicon/react"

import {
  BRAND_LOGO_PRIMARY,
  getBannerImage,
  getProductFallbackImages,
} from "@/features/services/catalog-assets"
import { StoreHeader } from "@/shared/components/StoreHeader"

export default function Page() {
  const featuredImages = getProductFallbackImages("home-featured", 3)

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eefbf4_100%)] text-slate-900">
      <StoreHeader />
      <section className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-10 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-7">
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-semibold text-emerald-700">
              Tienda demo conectada al backend real
            </span>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
                Camisetas de futbol para vivir cada partido con identidad.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Explora clubes, selecciones y referencias retro con una
                experiencia centrada en tienda, producto y compra.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/productos"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
              >
                Ir al catalogo
                <RiArrowRightLine className="size-5" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Entrar a mi cuenta
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">Catalogo real</p>
                <p className="mt-1 text-sm text-slate-500">Productos conectados a `api/productos`.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">Exploracion simple</p>
                <p className="mt-1 text-sm text-slate-500">Busqueda, filtros, detalle y carrito basico.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">Base segura</p>
                <p className="mt-1 text-sm text-slate-500">Auth preservado y flujo visible alineado a tienda.</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-2xl shadow-slate-900/10">
            <img
              src={getBannerImage(0)}
              alt="Banner Gol90 Store"
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.35),_transparent_45%)]" />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur">
                <div>
                  <p className="text-sm text-slate-300">Drop de la semana</p>
                  <p className="text-xl font-bold">Camisetas de clubes y retro</p>
                </div>
                <RiShieldCheckLine className="size-8 text-emerald-400" />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {featuredImages.map((image, index) => (
                  <div key={image} className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur">
                    <img
                      src={image}
                      alt={`Producto destacado ${index + 1}`}
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-300">Propuesta de valor</p>
                <p className="mt-2 text-lg font-semibold">
                  Tienda enfocada en camisetas de futbol, con navegacion clara,
                  assets reales y detalle de producto listo para demo.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-white/80 bg-white/90 p-8 shadow-xl shadow-slate-950/5">
            <div className="flex items-center gap-4">
              <img
                src={BRAND_LOGO_PRIMARY}
                alt="Logo Gol90 Store"
                className="h-[4.5rem] w-[4.5rem] rounded-3xl border border-emerald-100 object-cover"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">
                  Identidad visual
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                  Gol90 Store ya se siente como tienda.
                </h2>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              Logo propio, filtros de tienda, detalle con imágenes reales y
              carrito básico funcional para una presentación seria del MVP.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {featuredImages.map((image, index) => (
              <div
                key={image}
                className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-lg shadow-slate-950/5"
              >
                <img
                  src={image}
                  alt={`Selección destacada ${index + 1}`}
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    Seleccion #{index + 1}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-950">
                    Visual real para demo de catalogo
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
