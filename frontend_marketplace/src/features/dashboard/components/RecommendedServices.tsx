import { RiStarFill } from "@remixicon/react"
import Link from "next/link"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const CATEGORIES = [
  { label: "DISEÑO", color: "bg-blue-600" },
  { label: "MARKETING", color: "bg-green-600" },
  { label: "DESARROLLO", color: "bg-red-500" },
  { label: "NEGOCIOS", color: "bg-orange-500" },
] as const

interface RecommendedService {
  category: number
  freelancer: string
  initials: string
  title: string
  rating: number
  price: number
}

interface RecommendedServicesProps {
  services: readonly RecommendedService[]
}

export function RecommendedServices({ services }: RecommendedServicesProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">
          Servicios Recomendados
        </h2>
        <Link
          href="/services"
          className="text-sm font-medium text-primary hover:underline"
        >
          Ver todos
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => {
          const cat = CATEGORIES[s.category]
          return (
            <div
              key={s.title}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-36 bg-muted">
                <Badge
                  className={`absolute left-3 top-3 ${cat.color} border-0 text-[11px] font-bold uppercase tracking-wide text-white`}
                >
                  {cat.label}
                </Badge>
              </div>

              <div className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Avatar className="size-7">
                    <AvatarFallback className="bg-primary/10 text-[10px] font-semibold text-primary">
                      {s.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {s.freelancer}
                  </span>
                </div>

                <h3 className="mb-3 text-sm font-semibold leading-tight text-foreground">
                  {s.title}
                </h3>

                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 font-medium text-foreground">
                    <RiStarFill className="size-4 text-yellow-400" />
                    {s.rating}
                  </span>
                  <span className="text-muted-foreground">
                    Desde ${s.price}
                  </span>
                </div>

                <Button asChild className="w-full" size="sm">
                  <Link href="/services/1">Contratar</Link>
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
