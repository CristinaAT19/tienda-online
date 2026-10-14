import type { Category, Product } from '../types'
import ProductArt from './ProductArt'

/** Fondo de la ilustración según la categoría */
const BACKDROPS: Record<Category, string> = {
  cocina: 'bg-[#efe9df]',
  decoracion: 'bg-[#e6ecec]',
  textiles: 'bg-[#ece8e3]',
  iluminacion: 'bg-[#ebe9f0]',
}

interface Props {
  product: Product
  /** Nombre del color a mostrar; por defecto, el primero del producto */
  color?: string
  /** Índice de la foto a mostrar cuando el producto tiene imágenes reales */
  index?: number
  className?: string
}

/** Foto del producto o, si no tiene, su ilustración en el color elegido. */
export default function ProductImage({ product, color, index = 0, className = '' }: Props) {
  const src = product.images?.[index]

  if (src) {
    return <img src={src} alt={product.name} loading="lazy" className={`object-cover ${className}`} />
  }

  const option = product.colors.find((item) => item.name === color) ?? product.colors[0]

  return (
    <div
      role="img"
      aria-label={`${product.name}, color ${option.name.toLowerCase()}`}
      className={`flex items-center justify-center ${BACKDROPS[product.category]} ${className}`}
    >
      <ProductArt kind={product.art} color={option.hex} className="size-full max-h-full p-[6%]" />
    </div>
  )
}
