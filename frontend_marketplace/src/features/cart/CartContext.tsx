"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

export interface CartItem {
  id: string
  title: string
  subtitle: string
  price: number
  quantity: number
  stock: number
  size?: string
  imageUrl?: string
}

interface CartState {
  items: CartItem[]
  totalItems: number
  subtotal: number
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  removeItem: (id: string, size?: string) => void
  updateQuantity: (id: string, quantity: number, size?: string) => void
  clearCart: () => void
}

const STORAGE_KEY = "gol90store_cart"
const CartContext = createContext<CartState | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return
    try {
      setItems(JSON.parse(saved) as CartItem[])
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addItem(item: Omit<CartItem, "quantity">, quantity = 1) {
    setItems((current) => {
      const existing = current.find(
        (entry) => entry.id === item.id && entry.size === item.size,
      )

      if (existing) {
        return current.map((entry) =>
          entry.id === item.id && entry.size === item.size
            ? {
                ...entry,
                quantity: Math.min(entry.quantity + quantity, entry.stock),
              }
            : entry,
        )
      }

      return [
        ...current,
        {
          ...item,
          quantity: Math.min(quantity, item.stock || quantity),
        },
      ]
    })
  }

  function removeItem(id: string, size?: string) {
    setItems((current) =>
      current.filter((item) => !(item.id === id && item.size === size)),
    )
  }

  function updateQuantity(id: string, quantity: number, size?: string) {
    if (quantity <= 0) {
      removeItem(id, size)
      return
    }

    setItems((current) =>
      current.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.min(quantity, item.stock) }
          : item,
      ),
    )
  }

  function clearCart() {
    setItems([])
  }

  const value = useMemo<CartState>(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )

    return {
      items,
      totalItems,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider")
  return ctx
}
