import type { ShippingMethod } from '../types'

export const FREE_SHIPPING_FROM = 150

export const SHIPPING: Record<ShippingMethod, { name: string; eta: string; price: number }> = {
  estandar: { name: 'Estándar', eta: '2 a 4 días hábiles', price: 12 },
  expres: { name: 'Exprés', eta: '1 día hábil', price: 18 },
}

/** Códigos de descuento de ejemplo: código → fracción descontada */
export const COUPONS: Record<string, number> = {
  NIDO10: 0.1,
}

export interface Totals {
  subtotal: number
  discount: number
  shipping: number
  total: number
}

const round2 = (value: number) => Math.round(value * 100) / 100

export function shippingCost(method: ShippingMethod, amount: number): number {
  if (method === 'estandar' && amount >= FREE_SHIPPING_FROM) return 0
  return SHIPPING[method].price
}

export function computeTotals(
  lines: { price: number; qty: number }[],
  method: ShippingMethod,
  coupon: string | null,
): Totals {
  const subtotal = round2(lines.reduce((sum, line) => sum + line.price * line.qty, 0))
  const discount = round2(subtotal * (coupon ? (COUPONS[coupon] ?? 0) : 0))
  const shipping = subtotal === 0 ? 0 : shippingCost(method, subtotal - discount)
  return { subtotal, discount, shipping, total: round2(subtotal - discount + shipping) }
}
