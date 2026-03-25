"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { RiLockLine, RiMailLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { BRAND_LOGO_PRIMARY, getBannerImage } from "@/features/services/catalog-assets"
import { useAuth } from "@/infrastructure/auth/AuthContext"
import { StoreHeader } from "@/shared/components/StoreHeader"

export function LoginForm() {
  const { login } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await login({ email, password })
      router.push("/profile")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Credenciales inválidas")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eefbf4_100%)]">
      <StoreHeader />
      <section className="mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-8 px-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Card className="border-white/80 bg-white/95 shadow-2xl shadow-slate-950/8">
          <CardContent className="flex flex-col gap-6 p-8">
            <div className="flex items-center gap-4">
              <img
                src={BRAND_LOGO_PRIMARY}
                alt="Gol90 Store"
                className="size-16 rounded-3xl border border-emerald-100 object-cover"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">
                  Acceso a tienda
                </p>
                <h1 className="text-3xl font-black tracking-tight text-slate-950">
                  Inicia sesion
                </h1>
              </div>
            </div>

            <p className="text-sm leading-7 text-slate-600">
              Entra a tu cuenta para revisar el carrito, volver al catalogo y
              continuar la demo de compra.
            </p>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {error && (
                <p className="rounded-2xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}

              <Field>
                <FieldLabel htmlFor="login-email">Correo electronico</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <RiMailLine className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="login-email"
                    type="email"
                    placeholder="hincha@gol90store.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel htmlFor="login-password">Contraseña</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <RiLockLine className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </InputGroup>
              </Field>

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="size-4 rounded border-input accent-primary"
                />
                <span className="text-sm text-muted-foreground">
                  Recordar mi cuenta en este dispositivo
                </span>
              </label>

              <Button
                type="submit"
                size="lg"
                className="h-11 w-full text-base font-semibold"
                disabled={loading}
              >
                {loading ? "Ingresando..." : "Entrar a mi cuenta"}
              </Button>
            </form>

            <p className="text-sm text-muted-foreground">
              ¿Aun no tienes cuenta?{" "}
              <Link href="/signup" className="font-semibold text-primary hover:underline">
                Crear cuenta
              </Link>
            </p>
          </CardContent>
        </Card>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/12">
          <img
            src={getBannerImage(4)}
            alt="Banner de camisetas"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.88),rgba(6,95,70,0.65))]" />
          <div className="relative space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-200">
                Demo Gol90 Store
              </p>
              <h2 className="text-4xl font-black tracking-tight">
                Vuelve a tu catalogo de camisetas en segundos.
              </h2>
              <p className="max-w-xl text-sm leading-7 text-slate-200">
                Home, catalogo, detalle y carrito listos para mostrar una tienda
                de futbol mucho mas consistente visualmente.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur">
                <p className="text-sm text-emerald-200">Acceso directo</p>
                <p className="mt-2 text-lg font-bold">Acceso simple</p>
                <p className="mt-2 text-sm text-slate-300">
                  Inicio de sesion limpio para entrar al catalogo y al carrito.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur">
                <p className="text-sm text-emerald-200">Flujo visible</p>
                <p className="mt-2 text-lg font-bold">100% tienda</p>
                <p className="mt-2 text-sm text-slate-300">
                  Identidad de compra, filtros y productos reales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
