export type TipoUsuario = "freelancer" | "cliente" | "ambos"

export interface Perfil {
  email: string
  first_name: string
  last_name: string
  nombre_completo: string
  telefono: string
  bio: string
  url_portafolio: string
  tipo_usuario: TipoUsuario
  foto_perfil_url: string | null
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegistroPayload {
  email: string
  password: string
  first_name: string
  last_name: string
  telefono?: string
  bio?: string
  url_portafolio?: string
  tipo_usuario: TipoUsuario
}

export interface TokenResponse {
  access: string
  refresh: string
}
