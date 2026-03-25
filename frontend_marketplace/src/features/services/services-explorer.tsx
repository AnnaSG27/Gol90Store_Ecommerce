"use client"

import { useMemo, useState } from "react"
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiLoader4Line,
  RiSearchLine,
} from "@remixicon/react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { getBannerImage } from "./catalog-assets"
import { toServiceCardProps } from "./adapters"
import { ServiceCard } from "./components/ServiceCard"
import { ServiceFilters } from "./components/ServiceFilters"
import { usePublicaciones } from "./hooks/usePublicaciones"

const ORDERING_MAP: Record<string, string> = {
  relevancia: "",
  "precio-bajo": "precio",
  nuevos: "-created_at",
}

export function ServicesExplorer() {
  const {
    results,
    count,
    isLoading,
    error,
    filters,
    totalPages,
    currentPage,
    updateFilter,
    setPage,
  } = usePublicaciones()
  const [selectedTeam, setSelectedTeam] = useState<string | undefined>()
  const [selectedSeason, setSelectedSeason] = useState<string | undefined>()
  const [selectedSize, setSelectedSize] = useState<string | undefined>()
  const [selectedPriceRange, setSelectedPriceRange] = useState("all")

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    updateFilter("q", e.target.value)
  }

  function handleOrdering(value: string) {
    updateFilter("ordering", ORDERING_MAP[value] || "")
  }

  function handlePriceFilter(filters: { precio_min?: number; precio_max?: number }) {
    if (filters.precio_min != null) updateFilter("precio_min", filters.precio_min)
    else updateFilter("precio_min", undefined)
    if (filters.precio_max != null) updateFilter("precio_max", filters.precio_max)
    else updateFilter("precio_max", undefined)
  }

  const filterOptions = useMemo(() => {
    const categories = Array.from(new Set(results.map((item) => item.categoria)))
    const teams = Array.from(new Set(results.map((item) => item.equipo))).sort()
    const seasons = Array.from(new Set(results.map((item) => item.temporada))).sort()
    const sizes = Array.from(
      new Set(results.flatMap((item) => item.tallas_disponibles ?? [])),
    ).sort()

    return { categories, teams, seasons, sizes }
  }, [results])

  const visibleResults = useMemo(() => {
    return results.filter((item) => {
      if (selectedTeam && item.equipo !== selectedTeam) return false
      if (selectedSeason && item.temporada !== selectedSeason) return false
      if (
        selectedSize &&
        !(item.tallas_disponibles ?? []).includes(selectedSize)
      ) {
        return false
      }
      return true
    })
  }, [results, selectedSeason, selectedSize, selectedTeam])

  function clearFilters() {
    setSelectedTeam(undefined)
    setSelectedSeason(undefined)
    setSelectedSize(undefined)
    setSelectedPriceRange("all")
    updateFilter("categoria", undefined)
    updateFilter("precio_min", undefined)
    updateFilter("precio_max", undefined)
  }

  return (
    <div className="flex flex-col gap-8 xl:flex-row">
      <div className="xl:hidden">
        <div className="mb-6">
          <ServiceFilters
            categories={filterOptions.categories}
            teams={filterOptions.teams}
            seasons={filterOptions.seasons}
            sizes={filterOptions.sizes}
            selectedCategory={filters.categoria}
            selectedTeam={selectedTeam}
            selectedSeason={selectedSeason}
            selectedSize={selectedSize}
            selectedPrice={selectedPriceRange}
            onCategoryChange={(value) => updateFilter("categoria", value)}
            onTeamChange={setSelectedTeam}
            onSeasonChange={setSelectedSeason}
            onSizeChange={setSelectedSize}
            onPriceChange={(priceFilters, range) => {
              setSelectedPriceRange(range ?? "all")
              handlePriceFilter(priceFilters)
            }}
            onClear={clearFilters}
          />
        </div>
      </div>
      <aside className="hidden w-64 shrink-0 xl:block">
        <ServiceFilters
          categories={filterOptions.categories}
          teams={filterOptions.teams}
          seasons={filterOptions.seasons}
          sizes={filterOptions.sizes}
          selectedCategory={filters.categoria}
          selectedTeam={selectedTeam}
          selectedSeason={selectedSeason}
          selectedSize={selectedSize}
          selectedPrice={selectedPriceRange}
          onCategoryChange={(value) => updateFilter("categoria", value)}
          onTeamChange={setSelectedTeam}
          onSeasonChange={setSelectedSeason}
          onSizeChange={setSelectedSize}
          onPriceChange={(priceFilters, range) => {
            setSelectedPriceRange(range ?? "all")
            handlePriceFilter(priceFilters)
          }}
          onClear={clearFilters}
        />
      </aside>

      <section className="min-w-0 flex-1">
        <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-white/80 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/10">
          <img
            src={getBannerImage(1)}
            alt="Camiseta destacada"
            className="absolute inset-y-0 right-0 hidden h-full w-72 object-cover opacity-35 md:block"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.28),_transparent_42%)]" />
          <div className="relative max-w-3xl space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-200">
              Catalogo vivo
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Camisetas originales y retro para una demo mucho mas creible.
            </h2>
            <p className="text-sm leading-7 text-slate-300 md:text-base">
              Filtra por equipo, temporada, talla y precio mientras navegas un
              catalogo conectado al backend real de Gol90 Store.
            </p>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md flex-1">
            <InputGroup>
              <InputGroupAddon>
                <RiSearchLine className="size-4 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Buscar por equipo, producto o temporada..."
                onChange={handleSearch}
              />
            </InputGroup>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="relevancia" onValueChange={handleOrdering}>
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={4} align="end">
                <SelectGroup>
                  <SelectItem value="relevancia">Relevancia</SelectItem>
                  <SelectItem value="precio-bajo">Precio más bajo</SelectItem>
                  <SelectItem value="nuevos">Nuevos ingresos</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Catalogo de camisetas</h2>
          <p className="text-sm text-muted-foreground">
            {visibleResults.length} producto{visibleResults.length !== 1 ? "s" : ""} mostrado{visibleResults.length !== 1 ? "s" : ""} de {count} disponible{count !== 1 ? "s" : ""}
          </p>
        </div>

        {isLoading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <RiLoader4Line className="size-8 animate-spin text-primary" />
          </div>
        )}

        {error && !isLoading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-destructive">Error al cargar productos: {error}</p>
          </div>
        )}

        {!isLoading && !error && visibleResults.length === 0 && (
          <div className="flex min-h-[300px] flex-col items-center justify-center gap-2">
            <p className="text-sm font-medium text-muted-foreground">
              No se encontraron productos
            </p>
            <p className="text-xs text-muted-foreground">
              Intenta con otros filtros o términos de búsqueda
            </p>
          </div>
        )}

        {!isLoading && !error && visibleResults.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-3">
            {visibleResults.map((item) => {
              const props = toServiceCardProps(item)
              return <ServiceCard key={item.id} {...props} />
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="size-10"
              disabled={currentPage <= 1}
              onClick={() => setPage(currentPage - 1)}
            >
              <RiArrowLeftSLine className="size-5" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(
              (page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="icon"
                  className="size-10"
                  onClick={() => setPage(page)}
                >
                  {page}
                </Button>
              ),
            )}
            {totalPages > 5 && (
              <span className="flex size-10 items-center justify-center text-muted-foreground">
                ...
              </span>
            )}
            <Button
              variant="outline"
              size="icon"
              className="size-10"
              disabled={currentPage >= totalPages}
              onClick={() => setPage(currentPage + 1)}
            >
              <RiArrowRightSLine className="size-5" />
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}
