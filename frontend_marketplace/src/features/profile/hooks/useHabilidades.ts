"use client"

import { useEffect, useState } from "react"

import type { Habilidad } from "../models"
import { getHabilidades } from "../services/profileService"

export function useHabilidades() {
  const [habilidades, setHabilidades] = useState<Habilidad[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getHabilidades()
      .then(setHabilidades)
      .catch(() => setHabilidades([]))
      .finally(() => setIsLoading(false))
  }, [])

  return { habilidades, isLoading }
}
