"use client"

import { useState } from "react"
import { RiAddLine, RiCloseLine } from "@remixicon/react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import type { Habilidad } from "../models"

interface SkillsSelectorProps {
  selected: Habilidad[]
  catalog: Habilidad[]
  onChange: (ids: string[]) => void
}

export function SkillsSelector({
  selected,
  catalog,
  onChange,
}: SkillsSelectorProps) {
  const [search, setSearch] = useState("")
  const selectedIds = new Set(selected.map((h) => h.id))

  const filtered = catalog.filter(
    (h) =>
      !selectedIds.has(h.id) &&
      h.nombre.toLowerCase().includes(search.toLowerCase()),
  )

  function add(skill: Habilidad) {
    onChange([...Array.from(selectedIds), skill.id])
    setSearch("")
  }

  function remove(id: string) {
    onChange(Array.from(selectedIds).filter((sid) => sid !== id))
  }

  return (
    <div className="space-y-4">
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((skill) => (
            <Badge
              key={skill.id}
              variant="secondary"
              className="gap-1 pr-1 text-sm"
            >
              {skill.nombre}
              <button
                type="button"
                onClick={() => remove(skill.id)}
                className="ml-0.5 rounded-full p-0.5 hover:bg-destructive/10 hover:text-destructive"
              >
                <RiCloseLine className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div className="relative">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar habilidad..."
          className="h-10"
        />

        {search.length > 0 && filtered.length > 0 && (
          <div className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-border bg-popover shadow-lg">
            {filtered.slice(0, 10).map((skill) => (
              <button
                key={skill.id}
                type="button"
                onClick={() => add(skill)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground hover:bg-muted"
              >
                <RiAddLine className="size-3.5 shrink-0 text-muted-foreground" />
                {skill.nombre}
              </button>
            ))}
          </div>
        )}

        {search.length > 0 && filtered.length === 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-lg border border-border bg-popover p-3 text-center text-sm text-muted-foreground shadow-lg">
            No se encontraron habilidades
          </div>
        )}
      </div>

      {selected.length === 0 && !search && (
        <p className="text-xs text-muted-foreground">
          Busca y agrega tus habilidades profesionales
        </p>
      )}
    </div>
  )
}
