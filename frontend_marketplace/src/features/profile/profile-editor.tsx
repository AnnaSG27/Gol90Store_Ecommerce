"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  RiAlertLine,
  RiBriefcaseLine,
  RiLoader4Line,
  RiStackLine,
  RiUserLine,
} from "@remixicon/react"

import { useAuth } from "@/infrastructure/auth/AuthContext"

import { ExperienciaList } from "./components/ExperienciaList"
import { ProfileHeader } from "./components/ProfileHeader"
import { ProfileInfoForm } from "./components/ProfileInfoForm"
import { SkillsSelector } from "./components/SkillsSelector"
import { useExperiencias } from "./hooks/useExperiencias"
import { useHabilidades } from "./hooks/useHabilidades"
import { usePerfil } from "./hooks/usePerfil"
import type { UpdatePerfilPayload } from "./models"

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="size-5 text-primary" />
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
    </div>
  )
}

export function ProfileEditor() {
  const { token } = useAuth()
  const { perfil, isLoading, error, isSaving, save, refetch } = usePerfil()
  const { habilidades: catalog } = useHabilidades()
  const experienciasHook = useExperiencias()
  const [pendingPhoto, setPendingPhoto] = useState<File | null>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (perfil && !initializedRef.current) {
      experienciasHook.sync(perfil.experiencias)
      initializedRef.current = true
    }
  }, [perfil])

  const handleSaveInfo = useCallback(
    async (payload: UpdatePerfilPayload) => {
      if (pendingPhoto) {
        payload.foto_perfil = pendingPhoto
      }
      await save(payload)
      setPendingPhoto(null)
    },
    [save, pendingPhoto],
  )

  const handleSkillsChange = useCallback(
    async (ids: string[]) => {
      await save({ habilidad_ids: ids })
    },
    [save],
  )

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <RiLoader4Line className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error && !perfil) {
    return (
      <div className="mx-auto max-w-2xl rounded-xl border border-destructive/20 bg-destructive/5 p-6">
        <div className="flex items-start gap-3">
          <RiAlertLine className="mt-0.5 size-5 text-destructive" />
          <div>
            <p className="font-medium text-destructive">Error al cargar perfil</p>
            <p className="mt-1 text-sm text-destructive/80">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!perfil) return null

  return (
    <div className="mx-auto max-w-2xl space-y-8 pb-12">
      {/* Header */}
      <div className="rounded-xl border border-border bg-card p-6">
        <ProfileHeader perfil={perfil} onPhotoSelect={setPendingPhoto} />
        {pendingPhoto && (
          <p className="mt-3 text-xs text-muted-foreground">
            Foto seleccionada — se guardará al hacer click en &quot;Guardar
            cambios&quot;
          </p>
        )}
      </div>

      {/* Info */}
      <div className="rounded-xl border border-border bg-card p-6">
        <SectionTitle icon={RiUserLine} title="Información personal" />
        <div className="mt-5">
          <ProfileInfoForm
            perfil={perfil}
            isSaving={isSaving}
            onSave={handleSaveInfo}
          />
        </div>
        {error && (
          <p className="mt-3 text-sm text-destructive">{error}</p>
        )}
      </div>

      {/* Skills */}
      <div className="rounded-xl border border-border bg-card p-6">
        <SectionTitle icon={RiStackLine} title="Habilidades" />
        <div className="mt-5">
          <SkillsSelector
            selected={perfil.habilidades}
            catalog={catalog}
            onChange={handleSkillsChange}
          />
        </div>
      </div>

      {/* Experience */}
      <div className="rounded-xl border border-border bg-card p-6">
        <SectionTitle icon={RiBriefcaseLine} title="Experiencia" />
        <div className="mt-5">
          <ExperienciaList
            experiencias={experienciasHook.experiencias}
            isLoading={experienciasHook.isLoading}
            onCreate={experienciasHook.create}
            onUpdate={experienciasHook.update}
            onDelete={experienciasHook.remove}
          />
        </div>
      </div>
    </div>
  )
}
