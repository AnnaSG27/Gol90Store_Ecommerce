import type { ServiceCardProps } from "./components/ServiceCard"
import { resolveProductImages } from "./catalog-assets"
import type { PublicacionDetail, PublicacionListItem } from "./models"

const CATEGORIA_LABELS: Record<string, string> = {
  liga_espanola: "Liga Española",
  liga_inglesa: "Liga Inglesa",
  liga_italiana: "Liga Italiana",
  liga_alemana: "Liga Alemana",
  liga_francesa: "Liga Francesa",
  liga_colombiana: "Liga Colombiana",
  selecciones: "Selecciones",
  retro: "Retro",
  otro: "Otro",
}

export function categoriaLabel(key: string): string {
  return CATEGORIA_LABELS[key] ?? key
}

export function toServiceCardProps(
  item: PublicacionListItem,
): ServiceCardProps {
  const images = resolveProductImages(
    `${item.id}-${item.titulo}`,
    item.imagenes,
    item.imagen_principal_url,
  )

  return {
    id: item.id,
    title: item.titulo,
    team: item.equipo,
    season: item.temporada,
    category: categoriaLabel(item.categoria),
    subtitle: `${item.equipo} · ${item.temporada}`,
    price: parseFloat(item.precio),
    availability:
      item.estado === "agotado" || item.stock <= 0
        ? "Agotado"
        : `${item.stock} disponibles`,
    imageUrl: images[0],
    href: `/productos/${item.id}`,
  }
}

export function toServiceDetailProps(detail: PublicacionDetail) {
  const images = resolveProductImages(
    `${detail.id}-${detail.titulo}`,
    detail.imagenes,
    detail.imagen_principal_url,
  )

  return {
    id: detail.id,
    title: detail.titulo,
    team: detail.equipo,
    season: detail.temporada,
    category: categoriaLabel(detail.categoria),
    subtitle: `${detail.equipo} · Temporada ${detail.temporada}`,
    price: parseFloat(detail.precio),
    description: detail.descripcion,
    images,
    stock: detail.stock,
    availability: detail.estado === "agotado" || detail.stock <= 0 ? "Agotado" : "Disponible",
    sizes: detail.tallas_disponibles,
  }
}
