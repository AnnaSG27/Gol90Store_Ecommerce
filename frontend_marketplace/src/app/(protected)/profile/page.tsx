"use client"

import Link from "next/link"
import {
  RiLogoutBoxRLine,
  RiShoppingBag3Line,
  RiShoppingCart2Line,
  RiStore2Line,
} from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/features/cart/CartContext"
import { useAuth } from "@/infrastructure/auth/AuthContext"

export default function ProfilePage() {
  const { perfil, logout } = useAuth()
  const { totalItems } = useCart()

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100 text-xl font-black text-emerald-700">
            {`${perfil?.first_name?.[0] ?? ""}${perfil?.last_name?.[0] ?? ""}`.toUpperCase() || "GS"}
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Mi cuenta
            </p>
            <h1 className="text-3xl font-black tracking-tight text-foreground">
              {perfil?.nombre_completo || "Usuario Gol90Store"}
            </h1>
            <p className="text-sm text-muted-foreground">{perfil?.email}</p>
          </div>
        </div>

        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          Esta vista queda simplificada para el MVP. La demo principal se enfoca en explorar el
          catalogo y abrir productos reales desde Gol90Store.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/productos"
            className="rounded-2xl border border-border bg-muted/20 p-5 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            <RiStore2Line className="size-6 text-emerald-600" />
            <p className="mt-3 font-semibold text-foreground">Seguir comprando</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Volver al catalogo principal de camisetas.
            </p>
          </Link>

          <Link
            href="/carrito"
            className="rounded-2xl border border-border bg-muted/20 p-5 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            <RiShoppingCart2Line className="size-6 text-slate-700" />
            <p className="mt-3 font-semibold text-foreground">Mi carrito</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {totalItems > 0
                ? `Tienes ${totalItems} producto${totalItems !== 1 ? "s" : ""} listo${totalItems !== 1 ? "s" : ""} para la demo.`
                : "Aun no agregas camisetas. Puedes hacerlo desde el detalle de producto."}
            </p>
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <div className="rounded-2xl border border-border bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
            <RiShoppingBag3Line className="mr-2 inline size-4" />
            Login activo, catalogo real y carrito basico listos para demo.
          </div>
          <Button variant="outline" onClick={logout} className="gap-2">
            <RiLogoutBoxRLine className="size-4" />
            Cerrar sesion
          </Button>
        </div>
      </div>
    </div>
  )
}
