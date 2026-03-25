"use client"

import { useCallback, useState } from "react"

import { useAuth } from "@/infrastructure/auth/AuthContext"

import type { CreateExperienciaPayload, Experiencia } from "../models"
import {
  createExperiencia,
  deleteExperiencia,
  updateExperiencia,
} from "../services/profileService"

export function useExperiencias(initial: Experiencia[] = []) {
  const { token } = useAuth()
  const [experiencias, setExperiencias] = useState<Experiencia[]>(initial)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sync = useCallback((list: Experiencia[]) => {
    setExperiencias(
      [...list].sort(
        (a, b) =>
          new Date(b.fecha_inicio).getTime() -
          new Date(a.fecha_inicio).getTime(),
      ),
    )
  }, [])

  const create = useCallback(
    async (payload: CreateExperienciaPayload) => {
      if (!token) return
      setIsLoading(true)
      setError(null)
      try {
        const created = await createExperiencia(token, payload)
        sync([...experiencias, created])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al crear")
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [token, experiencias, sync],
  )

  const update = useCallback(
    async (id: string, payload: Partial<CreateExperienciaPayload>) => {
      if (!token) return
      setIsLoading(true)
      setError(null)
      try {
        const updated = await updateExperiencia(token, id, payload)
        sync(experiencias.map((e) => (e.id === id ? updated : e)))
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al actualizar")
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [token, experiencias, sync],
  )

  const remove = useCallback(
    async (id: string) => {
      if (!token) return
      setIsLoading(true)
      setError(null)
      try {
        await deleteExperiencia(token, id)
        setExperiencias((prev) => prev.filter((e) => e.id !== id))
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al eliminar")
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [token],
  )

  return { experiencias, isLoading, error, create, update, remove, sync }
}
