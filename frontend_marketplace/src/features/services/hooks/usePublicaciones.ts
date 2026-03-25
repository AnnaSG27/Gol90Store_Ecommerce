"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import type { PublicacionFilters, PublicacionListItem } from "../models"
import { getPublicaciones } from "../services/publicacionService"

const PAGE_SIZE = 20

export function usePublicaciones() {
  const [results, setResults] = useState<PublicacionListItem[]>([])
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<PublicacionFilters>({})

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchData = useCallback((currentFilters: PublicacionFilters) => {
    setIsLoading(true)
    setError(null)

    getPublicaciones(currentFilters)
      .then((res) => {
        setResults(res.results)
        setCount(res.count)
      })
      .catch((err: Error) => {
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const updateFilter = useCallback(
    (key: keyof PublicacionFilters, value: PublicacionFilters[keyof PublicacionFilters]) => {
      setFilters((prev) => {
        const next = { ...prev, [key]: value || undefined, page: key === "page" ? (value as number) : 1 }
        if (key === "q") {
          if (debounceRef.current) clearTimeout(debounceRef.current)
          debounceRef.current = setTimeout(() => fetchData(next), 300)
        } else {
          fetchData(next)
        }
        return next
      })
    },
    [fetchData],
  )

  const setPage = useCallback(
    (page: number) => {
      updateFilter("page", page)
    },
    [updateFilter],
  )

  useEffect(() => {
    fetchData(filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE))

  return {
    results,
    count,
    isLoading,
    error,
    filters,
    totalPages,
    currentPage: filters.page ?? 1,
    updateFilter,
    setPage,
  }
}
