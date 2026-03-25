import type {
  CreatePublicacionPayload,
  PaginatedResponse,
  PublicacionDetail,
  PublicacionFilters,
  PublicacionListItem,
} from "../models"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const JSON_HEADERS = { Accept: "application/json" }

async function handleResponse<T>(res: Response): Promise<T> {
  let data: unknown
  try {
    data = await res.json()
  } catch {
    if (res.ok) return {} as T
    throw new Error(`Error del servidor (${res.status})`)
  }

  if (!res.ok) {
    const message =
      typeof data === "object" && data !== null
        ? Object.values(data).flat().join(" ")
        : "Error desconocido"
    throw new Error(message)
  }
  return data as T
}

export async function getPublicaciones(
  filters: PublicacionFilters = {},
): Promise<PaginatedResponse<PublicacionListItem>> {
  const params = new URLSearchParams()

  if (filters.q) params.set("q", filters.q)
  if (filters.categoria) params.set("categoria", filters.categoria)
  if (filters.precio_min != null)
    params.set("precio_min", String(filters.precio_min))
  if (filters.precio_max != null)
    params.set("precio_max", String(filters.precio_max))
  if (filters.ordering) params.set("ordering", filters.ordering)
  if (filters.page && filters.page > 1) params.set("page", String(filters.page))

  const qs = params.toString()
  const url = `${API_URL}/api/productos/${qs ? `?${qs}` : ""}`

  const res = await fetch(url, { headers: JSON_HEADERS })
  return handleResponse<PaginatedResponse<PublicacionListItem>>(res)
}

export async function getPublicacion(
  id: string,
): Promise<PublicacionDetail> {
  const res = await fetch(`${API_URL}/api/productos/${id}/`, { headers: JSON_HEADERS })
  return handleResponse<PublicacionDetail>(res)
}

export async function createPublicacion(
  payload: CreatePublicacionPayload,
  token: string,
): Promise<PublicacionDetail> {
  const formData = new FormData()
  formData.append("titulo", payload.titulo)
  formData.append("equipo", payload.equipo)
  formData.append("temporada", payload.temporada)
  formData.append("descripcion", payload.descripcion)
  formData.append("categoria", payload.categoria)
  formData.append("precio", String(payload.precio))
  formData.append("stock", String(payload.stock))
  if (payload.estado) formData.append("estado", payload.estado)

  for (const talla of payload.tallas_disponibles) {
    formData.append("tallas_disponibles", talla)
  }

  if (payload.imagenes) {
    for (const file of payload.imagenes) {
      formData.append("imagenes", file)
    }
  }

  const res = await fetch(`${API_URL}/api/productos/`, {
    method: "POST",
    headers: {
      ...JSON_HEADERS,
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
  return handleResponse<PublicacionDetail>(res)
}
