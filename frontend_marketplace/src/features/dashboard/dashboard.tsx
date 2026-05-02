"use client"

import { RiEqualizerLine, RiSearchLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ActiveContracts } from "./components/ActiveContracts"
import { RecommendedServices } from "./components/RecommendedServices"

const SERVICES = [
  {
    category: 0,
    freelancer: "Ana Ruiz",
    initials: "AR",
    title: "Diseño de Logo Profesional",
    rating: 4.9,
    price: 120,
  },
  {
    category: 1,
    freelancer: "Marcos L.",
    initials: "ML",
    title: "Estrategia SEO Avanzada",
    rating: 4.8,
    price: 250,
  },
  {
    category: 2,
    freelancer: "Elena V.",
    initials: "EV",
    title: "Web App en React/NextJS",
    rating: 5.0,
    price: 800,
  },
  {
    category: 3,
    freelancer: "David S.",
    initials: "DS",
    title: "Plan de Negocios Startup",
    rating: 4.7,
    price: 450,
  },
] as const

const CONTRACTS = [
  {
    project: "Desarrollo API",
    id: "#49201",
    freelancer: "Carlos M.",
    initials: "CM",
    status: "EN PROGRESO",
    statusColor: "bg-blue-100 text-blue-700",
    progress: 60,
    progressColor: "bg-blue-600",
    price: 500,
  },
  {
    project: "Redacción de Blog",
    id: "#49188",
    freelancer: "Lucia G.",
    initials: "LG",
    status: "COMPLETADO",
    statusColor: "bg-green-100 text-green-700",
    progress: 100,
    progressColor: "bg-green-500",
    price: 150,
  },
] as const

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Search bar */}
      <div className="flex items-center gap-4">
        <div className="max-w-xl flex-1">
          <InputGroup>
            <InputGroupAddon>
              <RiSearchLine className="size-4 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Buscar servicios..." />
          </InputGroup>
        </div>
        <Button variant="outline">
          <RiEqualizerLine className="size-4" />
          Filtros
        </Button>
      </div>

      <RecommendedServices services={SERVICES} />
      <ActiveContracts contracts={CONTRACTS} />
    </div>
  )
}
