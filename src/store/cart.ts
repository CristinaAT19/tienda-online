import { useMemo } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getProduct } from '../data/products'
import { COUPONS } from '../lib/totals'
import type { CartItem, Product } from '../types'

export const MAX_QTY = 10

interface CartState {
  items: CartItem[]
  coupon: string | null
  add: (productId: string, color: string, qty?: number) => void
  setQty: (productId: string, color: string, qty: number) => void
  remove: (productId: string, color: string) => void
  /** Devuelve false si el código no existe */
  applyCoupon: (code: string) => boolean
  removeCoupon: () => void
  clear: () => void
}

const same = (item: CartItem, productId: string, color: string) =>
  item.productId === productId && item.color === color

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      coupon: null,
      add: (productId, color, qty = 1) =>
        set((state) => {
          const existing = state.items.find((item) => same(item, productId, color))
          if (!existing) return { items: [...state.items, { productId, color, qty }] }
          return {
            items: state.items.map((item) =>
              item === existing ? { ...item, qty: Math.min(MAX_QTY, item.qty + qty) } : item,
            ),
          }
        }),
      setQty: (productId, color, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((item) => !same(item, productId, color))
              : state.items.map((item) =>
                  same(item, productId, color) ? { ...item, qty: Math.min(MAX_QTY, qty) } : item,
                ),
        })),
      remove: (productId, color) =>
        set((state) => ({ items: state.items.filter((item) => !same(item, productId, color)) })),
      applyCoupon: (code) => {
        const normalized = code.trim().toUpperCase()
        if (!(normalized in COUPONS)) return false
        set({ coupon: normalized })
        return true
      },
      removeCoupon: () => set({ coupon: null }),
      clear: () => set({ items: [], coupon: null }),
    }),
    { name: 'nido-cart' },
  ),
)

export interface CartLine extends CartItem {
  product: Product
  price: number
  lineTotal: number
}

/** Líneas del carrito con los datos de su producto ya resueltos. */
export function useCartLines(): CartLine[] {
  const items = useCart((state) => state.items)
  return useMemo(
    () =>
      items.flatMap((item) => {
        const product = getProduct(item.productId)
        if (!product) return []
        return [{ ...item, product, price: product.price, lineTotal: product.price * item.qty }]
      }),
    [items],
  )
}

export function useCartCount(): number {
  return useCart((state) => state.items.reduce((sum, item) => sum + item.qty, 0))
}
