import Link from "next/link"
import { RiShieldCheckLine, RiStore2Line, RiTruckLine } from "@remixicon/react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface FreelancerProfileCardProps {
  category: string
  team: string
  season: string
}

export function FreelancerProfileCard({
  category,
  team,
  season,
}: FreelancerProfileCardProps) {
  return (
    <Card className="border-white/80 bg-white/90 shadow-lg shadow-slate-950/5">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <RiStore2Line className="size-7" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-foreground">Gol90 Store</h3>
              <Badge variant="secondary" className="text-xs">
                Tienda demo
              </Badge>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Seleccion curada para una experiencia de compra simple, visual y
              lista para demo.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Equipo
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-950">{team}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Temporada
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-950">{season}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Categoria
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-950">{category}</p>
          </div>
        </div>

        <div className="mt-5 space-y-2 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
          <div className="flex items-center gap-2 text-sm text-emerald-800">
            <RiShieldCheckLine className="size-4" />
            Catalogo pensado para una demo visual de camisetas de futbol.
          </div>
          <div className="flex items-center gap-2 text-sm text-emerald-800">
            <RiTruckLine className="size-4" />
            Base lista para evolucionar a checkout y compra completa.
          </div>
        </div>

        <Button asChild variant="outline" className="mt-4 w-full">
          <Link href="/productos">
            <RiStore2Line className="size-4" />
            Ver mas camisetas
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
