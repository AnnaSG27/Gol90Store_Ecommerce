"use client"

import Link from "next/link"
import { RiArrowRightLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"

interface CreateServiceFormProps {
  isSubmitting: boolean
  error: string | null
  onSubmit: () => void
}

export function CreateServiceForm({
  isSubmitting: _isSubmitting,
  error: _error,
  onSubmit: _onSubmit,
}: CreateServiceFormProps) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 p-6 text-center">
      <h2 className="text-lg font-semibold text-foreground">
        Publicar productos no hace parte del recorrido principal del MVP.
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        La demo actual esta enfocada en home, catalogo, detalle y autenticacion.
      </p>
      <Button asChild className="mt-4 gap-2">
        <Link href="/productos">
          Ver catalogo
          <RiArrowRightLine className="size-4" />
        </Link>
      </Button>
    </div>
  )
}
