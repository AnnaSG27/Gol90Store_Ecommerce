"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"

import { getPerfil, login as apiLogin } from "@/features/auth/services/authService"
import type { LoginPayload, Perfil } from "@/features/auth/models"

interface AuthState {
  token: string | null
  perfil: Perfil | null
  isLoading: boolean
  login: (payload: LoginPayload) => Promise<void>
  logout: () => void
  refreshPerfil: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("access_token")
    if (stored) {
      setToken(stored)
      getPerfil(stored)
        .then(setPerfil)
        .catch(() => {
          localStorage.removeItem("access_token")
          setToken(null)
        })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (payload: LoginPayload) => {
    const { access } = await apiLogin(payload)
    localStorage.setItem("access_token", access)
    setToken(access)
    const data = await getPerfil(access)
    setPerfil(data)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("access_token")
    setToken(null)
    setPerfil(null)
  }, [])

  const refreshPerfil = useCallback(async () => {
    if (!token) return
    const data = await getPerfil(token)
    setPerfil(data)
  }, [token])

  return (
    <AuthContext.Provider value={{ token, perfil, isLoading, login, logout, refreshPerfil }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider")
  return ctx
}
