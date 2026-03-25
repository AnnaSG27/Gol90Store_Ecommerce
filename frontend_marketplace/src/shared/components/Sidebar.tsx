"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  RiHome5Line,
  RiShoppingCart2Line,
  RiSearchLine,
  RiUserLine,
} from "@remixicon/react"

import { useCart } from "@/features/cart/CartContext"
import { BRAND_LOGO_PRIMARY } from "@/features/services/catalog-assets"
import { cn } from "@/lib/utils"
import { useAuth } from "@/infrastructure/auth/AuthContext"

const navigation = [
  { name: "Inicio", href: "/", icon: RiHome5Line },
  { name: "Catalogo", href: "/productos", icon: RiSearchLine },
  { name: "Carrito", href: "/carrito", icon: RiShoppingCart2Line },
  { name: "Mi cuenta", href: "/profile", icon: RiUserLine },
] as const

export function Sidebar() {
  const pathname = usePathname()
  const { perfil, logout } = useAuth()
  const { totalItems } = useCart()

  const initials = perfil
    ? `${perfil.first_name?.[0] ?? ""}${perfil.last_name?.[0] ?? ""}`.toUpperCase()
    : ""

  return (
    <aside className="flex h-screen w-64 flex-col bg-[linear-gradient(180deg,#0b1f1a_0%,#133126_100%)] text-white">
      <div className="flex items-center gap-3 px-5 py-5">
        <img
          src={BRAND_LOGO_PRIMARY}
          alt="Gol90 Store"
          className="size-11 rounded-2xl border border-white/10 bg-white object-cover"
        />
        <div>
          <span className="block text-base font-bold tracking-tight text-white">
            Gol90 Store
          </span>
          <span className="text-[11px] uppercase tracking-[0.24em] text-emerald-200/70">
            Camisetas
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 pt-4">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-emerald-100/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="size-5" />
              {item.name}
              {item.href === "/carrito" && totalItems > 0 && (
                <span className="ml-auto rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-emerald-500 text-sm font-semibold text-white">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {perfil?.nombre_completo}
            </p>
            <p className="text-xs text-emerald-200/60 capitalize">
              Cuenta activa
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-3 w-full rounded-lg px-3 py-2 text-left text-sm text-emerald-100/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
