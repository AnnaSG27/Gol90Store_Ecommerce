"use client"

import { useEffect, useState } from "react"

import type { PublicacionDetail } from "../models"
import { getPublicacion } from "../services/publicacionService"

export function usePublicacion(id: string) {
  const [data, setData] = useState<PublicacionDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setError(null)

    getPublicacion(id)
      .then((result) => {
        if (!cancelled) setData(result)
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  return { data, isLoading, error }
}
