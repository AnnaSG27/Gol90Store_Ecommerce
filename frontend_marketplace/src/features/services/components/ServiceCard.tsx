import { RiArrowRightUpLine, RiShieldCheckLine } from "@remixicon/react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface ServiceCardProps {
  id: string
  title: string
  team: string
  season: string
  category: string
  subtitle: string
  price: number
  availability: string
  imageUrl?: string
  href: string
}

export function ServiceCard({
  title,
  team,
  season,
  category,
  subtitle,
  price,
  availability,
  imageUrl,
  href,
}: ServiceCardProps) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/95 shadow-lg shadow-slate-950/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-950/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/5 text-primary/30">
            <span className="text-4xl font-bold">{category[0]}</span>
          </div>
        )}
        <Badge
          variant="secondary"
          className="absolute left-3 top-3 border border-white/70 bg-white/90 text-emerald-800 shadow-sm backdrop-blur"
        >
          {category}
        </Badge>
        <div className="absolute right-3 top-3 rounded-full bg-slate-950/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {season}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            {team}
          </p>
          <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
            <RiShieldCheckLine className="size-3.5" />
            Stock real
          </div>
        </div>
        <h3 className="mb-2 line-clamp-2 text-base font-bold text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
        <div className="mt-auto pt-3">
          <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
            {availability}
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">
            Desde
          </p>
          <p className="text-lg font-bold leading-none text-foreground">
            ${price.toLocaleString("es-CO")}
          </p>
        </div>
        <Button asChild size="sm" className="gap-1 text-xs font-bold">
          <Link href={href}>
            Ver detalle
            <RiArrowRightUpLine className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
