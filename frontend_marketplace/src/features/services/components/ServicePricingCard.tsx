"use client"

import { useState } from "react"
import {
  RiCheckLine,
  RiHeartLine,
  RiInformation2Line,
  RiShoppingCart2Line,
} from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/features/cart/CartContext"

interface ServicePricingCardProps {
  id: string
  title: string
  subtitle: string
  price: number
  stock: number
  availability: string
  sizes: string[]
  imageUrl?: string
}

export function ServicePricingCard({
  id,
  title,
  subtitle,
  price,
  stock,
  availability,
  sizes,
  imageUrl,
}: ServicePricingCardProps) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] ?? "")
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAddToCart() {
    addItem(
      {
        id,
        title,
        subtitle,
        price,
        stock,
        size: selectedSize || undefined,
        imageUrl,
      },
      quantity,
    )
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <Card className="overflow-hidden border-white/80 bg-white/95 shadow-2xl shadow-slate-950/8">
      <CardContent className="p-6">
        <div className="mb-1">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
            Gol90 Store
          </p>
          <h3 className="text-2xl font-black text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <Separator className="my-4" />

        <div className="mb-4">
          <p className="text-3xl font-bold text-foreground">${price.toLocaleString("es-CO")}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Precio demo para el MVP.
          </p>
        </div>

        {sizes.length > 0 && (
          <div className="mb-4">
            <p className="mb-2 text-sm font-semibold text-foreground">
              Tallas
            </p>
            <ul className="flex flex-wrap gap-2">
              {sizes.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => setSelectedSize(item)}
                    className={`inline-flex rounded-full border px-3 py-1 text-sm transition ${
                      selectedSize === item
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-border text-muted-foreground hover:border-emerald-300 hover:text-foreground"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-4">
          <p className="mb-2 text-sm font-semibold text-foreground">Cantidad</p>
          <div className="inline-flex items-center rounded-full border border-border bg-slate-50">
            <button
              type="button"
              className="px-4 py-2 text-sm font-bold text-slate-600"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            >
              -
            </button>
            <span className="min-w-10 text-center text-sm font-semibold text-slate-950">
              {quantity}
            </span>
            <button
              type="button"
              className="px-4 py-2 text-sm font-bold text-slate-600"
              onClick={() => setQuantity((current) => Math.min(stock, current + 1))}
            >
              +
            </button>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2">
          <RiCheckLine className="size-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Estado: <span className="font-semibold text-foreground">{availability}</span>
          </span>
        </div>

        <div className="mb-4 flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2">
          <RiCheckLine className="size-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Stock disponible: <span className="font-semibold text-foreground">{stock}</span>
          </span>
        </div>

        <div className="mb-6 flex items-start gap-2 rounded-2xl bg-amber-50 px-3 py-3 text-sm text-amber-900">
          <RiInformation2Line className="mt-0.5 size-4 shrink-0" />
          Carrito funcional para demo MVP. El checkout completo llega en la
          siguiente fase.
        </div>

        <div className="space-y-2">
          <Button
            className="w-full font-semibold"
            disabled={stock <= 0}
            onClick={handleAddToCart}
          >
            <RiShoppingCart2Line className="size-4" />
            {stock > 0
              ? added
                ? "Agregado al carrito"
                : "Agregar al carrito"
              : "Producto agotado"}
          </Button>
          <Button variant="outline" className="w-full">
            <RiHeartLine className="size-4" />
            Guardar para despues
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
