export interface ImagenProducto {
  id: string
  url: string
  orden: number
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ProductoListItem {
  id: string
  titulo: string
  equipo: string
  temporada: string
  categoria: string
  precio: string
  stock: number
  estado: string
  tallas_disponibles: string[]
  imagen_principal_url: string | null
  vendedor: {
    nombre_completo: string
    iniciales: string
  }
  imagenes: ImagenProducto[]
  created_at: string
}

export interface ProductoDetail extends ProductoListItem {
  descripcion: string
  vendedor: {
    nombre_completo: string
    iniciales: string
    email: string
    first_name: string
    last_name: string
    bio: string
    tipo_usuario: string
  }
  updated_at: string
}

export interface CreateProductoPayload {
  titulo: string
  equipo: string
  temporada: string
  descripcion: string
  categoria: string
  precio: number
  tallas_disponibles: string[]
  stock: number
  estado?: string
  imagenes?: File[]
}

export interface ProductoFilters {
  q?: string
  categoria?: string
  precio_min?: number
  precio_max?: number
  ordering?: string
  page?: number
}

export type PublicacionListItem = ProductoListItem
export type PublicacionDetail = ProductoDetail
export type CreatePublicacionPayload = CreateProductoPayload
export type PublicacionFilters = ProductoFilters
