"use client"

import Link from "next/link"
import {
  RiAddLine,
  RiDeleteBin6Line,
  RiSubtractLine,
  RiShoppingBag3Line,
} from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/features/cart/CartContext"
import { StoreHeader } from "@/shared/components/StoreHeader"

export default function CarritoPage() {
  const { items, subtotal, totalItems, updateQuantity, removeItem, clearCart } =
    useCart()

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eefbf4_100%)]">
      <StoreHeader />
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="mb-8 flex flex-col gap-3">
          <span className="w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
            Carrito Gol90 Store
          </span>
          <h1 className="text-4xl font-black tracking-tight text-slate-950">
            Tu seleccion para la proxima fecha.
          </h1>
          <p className="max-w-2xl text-base text-slate-600">
            Revisa productos, ajusta cantidades y deja lista la demo de compra.
          </p>
        </div>

        {items.length === 0 ? (
          <Card className="border-white/80 bg-white/90 shadow-xl shadow-emerald-950/5">
            <CardContent className="flex flex-col items-center gap-4 px-6 py-16 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <RiShoppingBag3Line className="size-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-950">
                  Tu carrito esta vacio
                </h2>
                <p className="max-w-md text-sm leading-7 text-slate-600">
                  Agrega camisetas desde el catalogo para mostrar una experiencia
                  de compra mas completa en la demo.
                </p>
              </div>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-500">
                <Link href="/productos">Explorar catalogo</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={`${item.id}-${item.size ?? "sin-talla"}`} className="border-white/80 bg-white/90 shadow-lg shadow-slate-950/5">
                  <CardContent className="flex flex-col gap-4 p-5 sm:flex-row">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-32 w-full rounded-2xl object-cover sm:w-36"
                    />
                    <div className="flex flex-1 flex-col justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h2 className="text-lg font-bold text-slate-950">
                              {item.title}
                            </h2>
                            <p className="text-sm text-slate-500">
                              {item.subtitle}
                            </p>
                            {item.size && (
                              <p className="text-sm font-medium text-emerald-700">
                                Talla {item.size}
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id, item.size)}
                            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-red-500"
                          >
                            <RiDeleteBin6Line className="size-5" />
                          </button>
                        </div>
                        <p className="text-xl font-black text-slate-950">
                          ${(item.price * item.quantity).toLocaleString("es-CO")}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1, item.size)
                            }
                            className="px-3 py-2 text-slate-600 hover:text-slate-950"
                          >
                            <RiSubtractLine className="size-4" />
                          </button>
                          <span className="min-w-10 text-center text-sm font-semibold text-slate-950">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1, item.size)
                            }
                            className="px-3 py-2 text-slate-600 hover:text-slate-950"
                          >
                            <RiAddLine className="size-4" />
                          </button>
                        </div>
                        <p className="text-sm text-slate-500">
                          Stock demo: {item.stock}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="h-fit border-white/80 bg-slate-950 text-white shadow-2xl shadow-slate-950/15">
              <CardContent className="space-y-5 p-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-emerald-200/80">
                    Resumen
                  </p>
                  <h2 className="mt-2 text-2xl font-black">Pedido demo</h2>
                </div>
                <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Productos</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Envio</span>
                    <span>Se define en checkout</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold text-white">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString("es-CO")}</span>
                  </div>
                </div>
                <Button className="w-full bg-emerald-600 font-bold hover:bg-emerald-500">
                  Continuar compra
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </Button>
                <Link
                  href="/productos"
                  className="block text-center text-sm font-medium text-emerald-200 hover:text-white"
                >
                  Seguir explorando camisetas
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </main>
  )
}
