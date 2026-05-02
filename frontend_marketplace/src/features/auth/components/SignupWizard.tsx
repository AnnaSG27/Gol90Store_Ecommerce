"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { RiLockLine, RiMailLine, RiUserLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { registro } from "@/features/auth/services/authService"
import { BRAND_LOGO_PRIMARY, getBannerImage } from "@/features/services/catalog-assets"
import { useAuth } from "@/infrastructure/auth/AuthContext"
import { StoreHeader } from "@/shared/components/StoreHeader"

export function SignupWizard() {
  const { login } = useAuth()
  const router = useRouter()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await registro({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        tipo_usuario: "cliente",
      })
      await login({ email, password })
      router.push("/profile")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear la cuenta")
      setLoading(false)
      return
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eefbf4_100%)]">
      <StoreHeader />
      <section className="mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-8 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/12">
          <img
            src={getBannerImage(2)}
            alt="Banner Gol90 Store"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(2,6,23,0.88),rgba(6,95,70,0.68))]" />
          <div className="relative space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-200">
              Cuenta cliente
            </p>
            <h1 className="text-4xl font-black tracking-tight">
              Crea tu acceso a Gol90 Store.
            </h1>
            <p className="max-w-xl text-sm leading-7 text-slate-200">
              Registro simple para navegar el catalogo, guardar productos en el
              carrito y preparar la demo sin pasos extra ni perfiles complejos.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur">
                <p className="text-sm text-emerald-200">Modo tienda</p>
                <p className="mt-2 text-lg font-bold">Alta inmediata</p>
                <p className="mt-2 text-sm text-slate-300">
                  Registro simple, directo y pensado para compra.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur">
                <p className="text-sm text-emerald-200">Proximo paso</p>
                <p className="mt-2 text-lg font-bold">Explorar camisetas</p>
                <p className="mt-2 text-sm text-slate-300">
                  Home, catalogo, detalle y carrito quedan listos al entrar.
                </p>
              </div>
            </div>
          </div>
        </div>

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
                  Registro Gol90 Store
                </p>
                <h2 className="text-3xl font-black tracking-tight text-slate-950">
                  Crear cuenta
                </h2>
              </div>
            </div>

            {error && (
              <p className="rounded-2xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor="signup-first-name">Nombre</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <RiUserLine className="size-4 text-muted-foreground" />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="signup-first-name"
                      placeholder="Juan"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </InputGroup>
                </Field>

                <Field>
                  <FieldLabel htmlFor="signup-last-name">Apellido</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <RiUserLine className="size-4 text-muted-foreground" />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="signup-last-name"
                      placeholder="Perez"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </InputGroup>
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="signup-email">Correo electronico</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <RiMailLine className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="signup-email"
                    type="email"
                    placeholder="hincha@gol90store.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel htmlFor="signup-password">Contraseña</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <RiLockLine className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    required
                  />
                </InputGroup>
                <FieldDescription>Mínimo 8 caracteres.</FieldDescription>
              </Field>

              <Button
                type="submit"
                size="lg"
                className="h-11 w-full text-base font-semibold"
                disabled={loading}
              >
                {loading ? "Creando cuenta..." : "Crear cuenta y entrar"}
              </Button>
            </form>

            <p className="text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Iniciar sesion
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
