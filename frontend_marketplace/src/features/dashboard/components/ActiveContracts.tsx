import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiMessage3Line,
} from "@remixicon/react"
import Link from "next/link"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Contract {
  project: string
  id: string
  freelancer: string
  initials: string
  status: string
  statusColor: string
  progress: number
  progressColor: string
  price: number
}

interface ActiveContractsProps {
  contracts: readonly Contract[]
}

export function ActiveContracts({ contracts }: ActiveContractsProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">
          Mis Contratos Activos
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="size-9">
            <RiArrowLeftSLine className="size-5" />
          </Button>
          <Button variant="outline" size="icon" className="size-9">
            <RiArrowRightSLine className="size-5" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Proyecto
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Freelancer
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Estado
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Progreso
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Precio
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c) => (
              <tr
                key={c.id}
                className="border-b border-border last:border-0"
              >
                <td className="px-5 py-4">
                  <p className="font-medium text-foreground">{c.project}</p>
                  <p className="text-xs text-muted-foreground">ID: {c.id}</p>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                        {c.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-foreground">{c.freelancer}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${c.statusColor}`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      {c.progress}%
                    </span>
                    <div className="h-2 w-20 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${c.progressColor}`}
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 font-medium text-foreground">
                  ${c.price}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Button asChild size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                      <Link href={`/contracts/${c.id.replace("#", "")}`}>
                        Ver Detalles
                      </Link>
                    </Button>
                    <Button size="icon-xs" className="bg-green-600 text-white hover:bg-green-700">
                      <RiMessage3Line className="size-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
