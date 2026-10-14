export const CATEGORIES = ['cocina', 'decoracion', 'textiles', 'iluminacion'] as const
export type Category = (typeof CATEGORIES)[number]

export interface ProductColor {
  name: string
  hex: string
}

export interface Product {
  /** También es el slug de la URL */
  id: string
  name: string
  category: Category
  price: number
  /** Precio anterior, si está rebajado */
  oldPrice?: number
  isNew?: boolean
  description: string
  details: string
  care: string
  colors: ProductColor[]
  /** Rutas a las fotos reales; sin ellas se muestra un marcador de color */
  images?: string[]
  /** Posición en el orden «Novedades» (mayor = más reciente) */
  addedAt: number
}

export interface CartItem {
  productId: string
  color: string
  qty: number
}

export type ShippingMethod = 'estandar' | 'expres'
