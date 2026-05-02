"use client"

import { useCallback, useEffect, useState } from "react"

import { useAuth } from "@/infrastructure/auth/AuthContext"

import type { PerfilCompleto, UpdatePerfilPayload } from "../models"
import { getPerfilCompleto, updatePerfil } from "../services/profileService"

export function usePerfil() {
  const { token } = useAuth()
  const [perfil, setPerfil] = useState<PerfilCompleto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const fetchPerfil = useCallback(async () => {
    if (!token) return
    setIsLoading(true)
    setError(null)
    try {
      const data = await getPerfilCompleto(token)
      setPerfil(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar perfil")
    } finally {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    fetchPerfil()
  }, [fetchPerfil])

  const save = useCallback(
    async (payload: UpdatePerfilPayload) => {
      if (!token) return
      setIsSaving(true)
      setError(null)
      try {
        const updated = await updatePerfil(token, payload)
        setPerfil(updated)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al guardar perfil",
        )
        throw err
      } finally {
        setIsSaving(false)
      }
    },
    [token],
  )

  return { perfil, isLoading, error, isSaving, save, refetch: fetchPerfil }
}
