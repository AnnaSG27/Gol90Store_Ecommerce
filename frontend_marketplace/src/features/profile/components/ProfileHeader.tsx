"use client"

import { Badge } from "@/components/ui/badge"

import type { PerfilCompleto } from "../models"
import { PhotoUpload } from "./PhotoUpload"

interface ProfileHeaderProps {
  perfil: PerfilCompleto
  onPhotoSelect: (file: File) => void
}

const TIPO_LABELS: Record<string, string> = {
  freelancer: "Freelancer",
  cliente: "Cliente",
  ambos: "Freelancer & Cliente",
}

export function ProfileHeader({ perfil, onPhotoSelect }: ProfileHeaderProps) {
  const initials =
    (perfil.first_name?.[0] ?? "") + (perfil.last_name?.[0] ?? "")

  return (
    <div className="flex items-center gap-6">
      <PhotoUpload
        currentUrl={perfil.foto_perfil_url}
        initials={initials.toUpperCase()}
        onSelect={onPhotoSelect}
      />
      <div className="min-w-0">
        <h1 className="text-2xl font-bold text-foreground">
          {perfil.nombre_completo || "Sin nombre"}
        </h1>
        <p className="text-sm text-muted-foreground">{perfil.email}</p>
        <Badge variant="secondary" className="mt-2">
          {TIPO_LABELS[perfil.tipo_usuario] ?? perfil.tipo_usuario}
        </Badge>
      </div>
    </div>
  )
}
