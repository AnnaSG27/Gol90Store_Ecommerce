"use client"

import { RiLoader4Line } from "@remixicon/react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { toServiceDetailProps } from "./adapters"
import { FreelancerProfileCard } from "./components/FreelancerProfileCard"
import { ServiceDescription } from "./components/ServiceDescription"
import { ServiceGallery } from "./components/ServiceGallery"
import { ServicePricingCard } from "./components/ServicePricingCard"
import { usePublicacion } from "./hooks/usePublicacion"

interface ServiceDetailProps {
  id: string
}

export function ServiceDetail({ id }: ServiceDetailProps) {
  const { data, isLoading, error } = usePublicacion(id)

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <RiLoader4Line className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-sm text-destructive">Error al cargar el producto: {error}</p>
        <Link href="/productos">
          <Button variant="outline" size="sm">Volver al catalogo</Button>
        </Link>
      </div>
    )
  }

  if (!data) return null

  const s = toServiceDetailProps(data)

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">
          {s.category}
        </p>
        <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
          {s.title}
        </h1>
        <p className="max-w-2xl text-base text-slate-600">{s.subtitle}</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-[3] space-y-8">
          <ServiceGallery title={data.titulo} category={s.category} images={s.images} />

          <ServiceDescription
            description={s.description}
            sizes={s.sizes}
          />

          <FreelancerProfileCard
            category={s.category}
            team={s.team}
            season={s.season}
          />
        </div>

        <div className="flex-[2] lg:sticky lg:top-24 lg:self-start">
          <ServicePricingCard
            id={s.id}
            title={data.titulo}
            subtitle={s.subtitle}
            price={s.price}
            stock={s.stock}
            availability={s.availability}
            sizes={s.sizes}
            imageUrl={s.images[0]}
          />
        </div>
      </div>
    </div>
  )
}
