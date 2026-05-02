"use client"

import { useState } from "react"
import {
  RiAddLine,
  RiBriefcaseLine,
  RiDeleteBinLine,
  RiEditLine,
  RiMapPinLine,
} from "@remixicon/react"

import { Button } from "@/components/ui/button"

import type { CreateExperienciaPayload, Experiencia } from "../models"
import { ExperienciaForm } from "./ExperienciaForm"

interface ExperienciaListProps {
  experiencias: Experiencia[]
  isLoading: boolean
  onCreate: (payload: CreateExperienciaPayload) => Promise<void>
  onUpdate: (
    id: string,
    payload: Partial<CreateExperienciaPayload>,
  ) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

function formatDate(dateStr: string) {
  const [y, m] = dateStr.split("-")
  const months = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
  ]
  return `${months[Number(m) - 1]} ${y}`
}

export function ExperienciaList({
  experiencias,
  isLoading,
  onCreate,
  onUpdate,
  onDelete,
}: ExperienciaListProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  async function handleCreate(payload: CreateExperienciaPayload) {
    await onCreate(payload)
    setShowForm(false)
  }

  async function handleUpdate(
    id: string,
    payload: Partial<CreateExperienciaPayload>,
  ) {
    await onUpdate(id, payload)
    setEditingId(null)
  }

  return (
    <div className="space-y-4">
      {experiencias.map((exp) =>
        editingId === exp.id ? (
          <ExperienciaForm
            key={exp.id}
            initial={exp}
            isLoading={isLoading}
            onSubmit={(p) => handleUpdate(exp.id, p)}
            onCancel={() => setEditingId(null)}
          />
        ) : (
          <div
            key={exp.id}
            className="group relative flex gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/30"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <RiBriefcaseLine className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-foreground">
                {exp.cargo}
              </h4>
              <p className="text-sm text-muted-foreground">{exp.empresa}</p>

              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span>
                  {formatDate(exp.fecha_inicio)} —{" "}
                  {exp.fecha_fin ? formatDate(exp.fecha_fin) : "Actual"}
                </span>
                {exp.ubicacion && (
                  <span className="flex items-center gap-1">
                    <RiMapPinLine className="size-3" />
                    {exp.ubicacion}
                  </span>
                )}
              </div>

              {exp.descripcion && (
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  {exp.descripcion}
                </p>
              )}
            </div>

            <div className="absolute right-3 top-3 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                onClick={() => setEditingId(exp.id)}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <RiEditLine className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(exp.id)}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <RiDeleteBinLine className="size-3.5" />
              </button>
            </div>
          </div>
        ),
      )}

      {showForm ? (
        <ExperienciaForm
          isLoading={isLoading}
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowForm(true)}
          className="h-9 gap-2 text-sm"
        >
          <RiAddLine className="size-4" />
          Agregar experiencia
        </Button>
      )}
    </div>
  )
}
