import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORY_NAMES } from '../data/products'
import { formatPrice } from '../lib/format'
import { useCart } from '../store/cart'
import type { Product } from '../types'
import { CheckIcon, PlusIcon } from './Icons'
import ProductImage from './ProductImage'

export function productBadge(product: Product): string | null {
  if (product.oldPrice) {
    return `−${Math.round((1 - product.price / product.oldPrice) * 100)} %`
  }
  return product.isNew ? 'Nuevo' : null
}

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((state) => state.add)
  const [added, setAdded] = useState(false)
  const badge = productBadge(product)
  const href = `/producto/${product.id}`

  useEffect(() => {
    if (!added) return
    const timer = setTimeout(() => setAdded(false), 1600)
    return () => clearTimeout(timer)
  }, [added])

  return (
    <article className="flex min-w-0 flex-col gap-3.5">
      <Link to={href} tabIndex={-1} aria-hidden="true" className="group relative block overflow-hidden rounded-[14px]">
        <ProductImage
          product={product}
          className="aspect-[4/5] w-full transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {badge && (
          <span className="absolute top-3 left-3 rounded-full bg-white px-2.5 py-1 text-xs font-semibold">
            {badge}
          </span>
        )}
      </Link>
      <div className="flex flex-col gap-0.5">
        <div className="text-[13px] text-muted">{CATEGORY_NAMES[product.category]}</div>
        <div className="flex items-baseline justify-between gap-3">
          <Link to={href} className="text-base font-semibold tracking-[-0.01em] hover:text-accent">
            {product.name}
          </Link>
          <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
            {product.oldPrice && (
              <span className="text-[13px] text-muted line-through">
                <span className="sr-only">Antes </span>
                {formatPrice(product.oldPrice)}
              </span>
            )}
            <span className="text-base font-semibold">{formatPrice(product.price)}</span>
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          add(product.id, product.colors[0].name)
          setAdded(true)
        }}
        className="btn-outline"
      >
        {added ? <CheckIcon /> : <PlusIcon />}
        <span aria-live="polite">{added ? 'Añadido' : 'Añadir al carrito'}</span>
      </button>
    </article>
  )
}
