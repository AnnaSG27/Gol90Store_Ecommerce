export interface Habilidad {
  id: string
  nombre: string
}

export interface Experiencia {
  id: string
  empresa: string
  cargo: string
  descripcion: string
  fecha_inicio: string
  fecha_fin: string | null
  ubicacion: string
}

export interface PerfilCompleto {
  email: string
  first_name: string
  last_name: string
  nombre_completo: string
  telefono: string
  bio: string
  url_portafolio: string
  tipo_usuario: string
  foto_perfil_url: string | null
  habilidades: Habilidad[]
  experiencias: Experiencia[]
}

export interface UpdatePerfilPayload {
  first_name?: string
  last_name?: string
  telefono?: string
  bio?: string
  url_portafolio?: string
  tipo_usuario?: string
  foto_perfil?: File
  habilidad_ids?: string[]
}

export interface CreateExperienciaPayload {
  empresa: string
  cargo: string
  descripcion?: string
  fecha_inicio: string
  fecha_fin?: string | null
  ubicacion?: string
}
