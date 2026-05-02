"use client"

import Link from "next/link"
import {
  RiShoppingCart2Line,
  RiUser3Line,
} from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/features/cart/CartContext"
import { useAuth } from "@/infrastructure/auth/AuthContext"

export function TopBar() {
  const { perfil } = useAuth()
  const { totalItems } = useCart()

  return (
    <header className="flex items-center justify-between border-b border-border bg-white/90 px-8 py-3 backdrop-blur">
      <h1 className="text-lg font-bold text-foreground">
        Hola, {perfil?.first_name ?? "hincha"}.
      </h1>

      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" className="relative">
          <Link href="/carrito" className="flex items-center gap-2 text-sm text-muted-foreground">
            <RiShoppingCart2Line className="size-5" />
            Carrito
            {totalItems > 0 && (
              <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </Button>

        <Button asChild variant="ghost" className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/profile">
            Mi cuenta
            <RiUser3Line className="size-5" />
          </Link>
        </Button>
      </div>
    </header>
  )
}
