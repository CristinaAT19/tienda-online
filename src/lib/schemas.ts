import { z } from 'zod'

export const shippingSchema = z.object({
  email: z.string().trim().min(1, 'Ingresa tu correo').email('El correo no es válido'),
  nombre: z.string().trim().min(2, 'Ingresa tu nombre'),
  apellidos: z.string().trim().min(2, 'Ingresa tus apellidos'),
  direccion: z.string().trim().min(5, 'Ingresa la dirección completa'),
  ciudad: z.string().trim().min(2, 'Ingresa la ciudad'),
  cp: z.string().trim().regex(/^\d{5}$/, 'Debe tener 5 dígitos'),
  telefono: z
    .string()
    .trim()
    .regex(/^(\+?\d[\d\s]{6,14})?$/, 'El teléfono no es válido'),
  envio: z.enum(['estandar', 'expres']),
})
export type ShippingData = z.infer<typeof shippingSchema>

const digits = (value: string) => value.replace(/\s/g, '')

/** true si la fecha MM/AA ya pasó */
export function isExpired(expiry: string, today = new Date()): boolean {
  const [month, year] = expiry.split('/').map(Number)
  // Día 0 del mes siguiente = último día del mes de caducidad
  const lastDay = new Date(2000 + year, month, 0, 23, 59, 59)
  return lastDay < today
}

export const paymentSchema = z.object({
  titular: z.string().trim().min(3, 'Ingresa el nombre del titular'),
  numero: z.string().refine((value) => /^\d{16}$/.test(digits(value)), 'Debe tener 16 dígitos'),
  caducidad: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Usa el formato MM/AA')
    .refine((value) => !isExpired(value), 'La tarjeta está vencida'),
  cvc: z.string().trim().regex(/^\d{3,4}$/, 'Debe tener 3 o 4 dígitos'),
})
export type PaymentData = z.infer<typeof paymentSchema>

/** Agrupa los dígitos de la tarjeta de cuatro en cuatro mientras se escribe. */
export function formatCardNumber(value: string): string {
  return (
    value
      .replace(/\D/g, '')
      .slice(0, 16)
      .match(/.{1,4}/g)
      ?.join(' ') ?? ''
  )
}

export function formatExpiry(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 4)
  return clean.length > 2 ? `${clean.slice(0, 2)}/${clean.slice(2)}` : clean
}
