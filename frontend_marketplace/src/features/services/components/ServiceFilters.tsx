"use client"

import { RiFilter3Line, RiMoneyDollarCircleLine, RiTShirt2Line } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ServiceFiltersProps {
  categories: string[]
  teams: string[]
  seasons: string[]
  sizes: string[]
  selectedCategory?: string
  selectedTeam?: string
  selectedSeason?: string
  selectedSize?: string
  selectedPrice?: string
  onCategoryChange?: (value?: string) => void
  onTeamChange?: (value?: string) => void
  onSeasonChange?: (value?: string) => void
  onSizeChange?: (value?: string) => void
  onPriceChange?: (filters: { precio_min?: number; precio_max?: number }, range?: string) => void
  onClear?: () => void
}

const PRICE_RANGES = [
  { id: "all", label: "Todos los precios" },
  { id: "price-0-260000", label: "Hasta $260.000", min: 0, max: 260000 },
  { id: "price-260000-320000", label: "$260.000 - $320.000", min: 260000, max: 320000 },
  { id: "price-320000", label: "Mas de $320.000", min: 320000, max: undefined },
] as const

function FilterBlock({
  title,
  icon: Icon,
  children,
}: {
  title: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
        <Icon className="size-4 text-emerald-700" />
        {title}
      </div>
      {children}
    </div>
  )
}

function SelectField({
  placeholder,
  value,
  onChange,
  options,
}: {
  placeholder: string
  value?: string
  onChange?: (value?: string) => void
  options: string[]
}) {
  return (
    <Select
      value={value ?? "all"}
      onValueChange={(next) => onChange?.(next === "all" ? undefined : next)}
    >
      <SelectTrigger className="w-full rounded-2xl border-slate-200 bg-white">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{placeholder}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function ServiceFilters({
  categories,
  teams,
  seasons,
  sizes,
  selectedCategory,
  selectedTeam,
  selectedSeason,
  selectedSize,
  selectedPrice = "all",
  onCategoryChange,
  onTeamChange,
  onSeasonChange,
  onSizeChange,
  onPriceChange,
  onClear,
}: ServiceFiltersProps) {
  function handlePriceChange(rangeId: string) {
    const range = PRICE_RANGES.find((item) => item.id === rangeId)
    if (!range || !onPriceChange) return

    if (rangeId === "all") {
      onPriceChange({ precio_min: undefined, precio_max: undefined }, rangeId)
      return
    }

    onPriceChange(
      {
        precio_min: "min" in range ? range.min : undefined,
        precio_max: "max" in range ? range.max : undefined,
      },
      rangeId,
    )
  }

  return (
    <div className="sticky top-24 space-y-6 rounded-[2rem] border border-white/80 bg-white/95 p-6 shadow-xl shadow-slate-950/5">
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
          Filtros de tienda
        </p>
        <h3 className="text-xl font-black text-slate-950">
          Encuentra tu camiseta ideal
        </h3>
      </div>

      <FilterBlock icon={RiFilter3Line} title="Categoria">
        <SelectField
          placeholder="Todas las categorias"
          value={selectedCategory}
          onChange={onCategoryChange}
          options={categories}
        />
      </FilterBlock>

      <FilterBlock icon={RiTShirt2Line} title="Equipo">
        <SelectField
          placeholder="Todos los equipos"
          value={selectedTeam}
          onChange={onTeamChange}
          options={teams}
        />
      </FilterBlock>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
        <FilterBlock icon={RiFilter3Line} title="Temporada">
          <SelectField
            placeholder="Todas las temporadas"
            value={selectedSeason}
            onChange={onSeasonChange}
            options={seasons}
          />
        </FilterBlock>

        <FilterBlock icon={RiTShirt2Line} title="Talla">
          <SelectField
            placeholder="Todas las tallas"
            value={selectedSize}
            onChange={onSizeChange}
            options={sizes}
          />
        </FilterBlock>
      </div>

      <FilterBlock icon={RiMoneyDollarCircleLine} title="Precio">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-600">
            Rango disponible
          </Label>
          <Select value={selectedPrice} onValueChange={handlePriceChange}>
            <SelectTrigger className="w-full rounded-2xl border-slate-200 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRICE_RANGES.map((range) => (
                <SelectItem key={range.id} value={range.id}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </FilterBlock>

      <Button
        variant="outline"
        className="w-full rounded-2xl border-slate-200"
        onClick={onClear}
      >
        Limpiar filtros
      </Button>
    </div>
  )
}
