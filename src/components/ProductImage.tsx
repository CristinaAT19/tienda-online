import type { Product } from '../types'

interface Props {
  product: Product
  /** Índice de la foto a mostrar cuando el producto tiene imágenes reales */
  index?: number
  className?: string
}

/** Foto del producto o, si aún no tiene, un marcador con su nombre. */
export default function ProductImage({ product, index = 0, className = '' }: Props) {
  const src = product.images?.[index]

  if (src) {
    return <img src={src} alt={product.name} loading="lazy" className={`object-cover ${className}`} />
  }

  return (
    <div
      role="img"
      aria-label={`${product.name} (foto pendiente)`}
      className={`flex items-center justify-center bg-tint p-4 text-center text-[13px] text-muted ${className}`}
    >
      {product.name}
    </div>
  )
}
