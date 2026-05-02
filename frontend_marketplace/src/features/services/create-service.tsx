"use client"

import Link from "next/link"
import { RiArrowRightLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"

export function CreateService() {
  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 shadow-sm">
      <div className="space-y-4 text-center">
        <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
          Funcionalidad fuera del MVP visible
        </span>
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          La creacion de productos no forma parte de esta demo frontend.
        </h1>
        <p className="text-sm leading-7 text-muted-foreground">
          En esta fase el flujo principal esta centrado en explorar el catalogo y ver el detalle
          de las camisetas. La gestion de productos sigue disponible desde el backend y admin.
        </p>
        <Button asChild className="gap-2">
          <Link href="/productos">
            Ir al catalogo
            <RiArrowRightLine className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
