import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BagIcon, CheckIcon } from '../components/Icons'
import ProductCard, { productBadge } from '../components/ProductCard'
import ProductImage from '../components/ProductImage'
import QuantityStepper from '../components/QuantityStepper'
import { CATEGORY_NAMES, getProduct, products } from '../data/products'
import { formatPrice } from '../lib/format'
import { useCart } from '../store/cart'
import type { Product } from '../types'
import NotFound from './NotFound'

function Gallery({
  product,
  color,
  onColorChange,
}: {
  product: Product
  color: string
  onColorChange: (color: string) => void
}) {
  const [active, setActive] = useState(0)
  const images = product.images ?? []
  const badge = productBadge(product)

  return (
    <div className="flex min-w-0 flex-[3_1_460px] flex-col gap-3">
      <div className="relative overflow-hidden rounded-[18px]">
        <ProductImage product={product} color={color} index={active} className="aspect-[4/3] w-full" />
        {badge && (
          <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold">
            {badge}
          </span>
        )}
      </div>
      {images.length > 1 ? (
        <div role="group" aria-label="Más fotos" className="grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Foto ${i + 1}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={`overflow-hidden rounded-xl border-2 ${i === active ? 'border-ink' : 'border-transparent'}`}
            >
              <img src={src} alt="" className="aspect-square w-full object-cover" />
            </button>
          ))}
        </div>
      ) : (
        product.colors.length > 1 &&
        !images.length && (
          <div role="group" aria-label="Ver en otros colores" className="grid grid-cols-4 gap-3">
            {product.colors.map((option) => (
              <button
                key={option.name}
                type="button"
                aria-label={`Ver en ${option.name.toLowerCase()}`}
                aria-pressed={option.name === color}
                onClick={() => onColorChange(option.name)}
                className={`overflow-hidden rounded-xl border-2 ${
                  option.name === color ? 'border-ink' : 'border-transparent hover:border-line-strong'
                }`}
              >
                <ProductImage product={product} color={option.name} className="aspect-square w-full" />
              </button>
            ))}
          </div>
        )
      )}
    </div>
  )
}

function ProductInfo({
  product,
  color,
  onColorChange,
}: {
  product: Product
  color: string
  onColorChange: (color: string) => void
}) {
  const add = useCart((state) => state.add)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  return (
    <div className="flex min-w-0 flex-[2_1_360px] flex-col gap-6">
      <div className="flex flex-col gap-2.5">
        <div className="eyebrow">{CATEGORY_NAMES[product.category]}</div>
        <h1 className="text-[clamp(32px,3.6vw,46px)] leading-[1.05] font-bold tracking-[-0.04em]">
          {product.name}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="inline-flex items-baseline gap-2.5">
            <span className="text-[26px] font-semibold tracking-[-0.02em]">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-muted line-through">
                <span className="sr-only">Antes </span>
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-muted">
            <span aria-hidden="true" className="size-2 rounded-full bg-success" />
            En stock
          </span>
        </div>
      </div>

      <p className="max-w-[46ch] text-muted">{product.description}</p>

      <div className="flex flex-col gap-2.5">
        <div id="color-label" className="text-sm font-semibold">
          Color: <span className="font-normal text-muted">{color}</span>
        </div>
        <div role="group" aria-labelledby="color-label" className="flex flex-wrap gap-2">
          {product.colors.map((option) => {
            const selected = option.name === color
            return (
              <button
                key={option.name}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  onColorChange(option.name)
                  setAdded(false)
                }}
                className={`inline-flex min-h-11 items-center gap-2.5 rounded-full border-2 pr-4 pl-2.5 ${
                  selected ? 'border-ink font-medium' : 'border-line hover:border-line-strong'
                }`}
              >
                <span
                  aria-hidden="true"
                  className="size-5.5 rounded-full border border-ink/15"
                  style={{ backgroundColor: option.hex }}
                />
                {option.name}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <QuantityStepper value={qty} onChange={setQty} />
        <button
          type="button"
          onClick={() => {
            add(product.id, color, qty)
            setAdded(true)
          }}
          className="btn-primary flex-[1_1_220px]"
        >
          <BagIcon size={18} />
          Añadir al carrito
        </button>
      </div>

      <div aria-live="polite">
        {added && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-tint px-4 py-3">
            <span className="inline-flex items-center gap-2 font-medium">
              <span className="text-success">
                <CheckIcon />
              </span>
              Añadido al carrito
            </span>
            <Link to="/carrito" className="inline-flex min-h-11 items-center underline underline-offset-4">
              Ver carrito
            </Link>
          </div>
        )}
      </div>

      <div className="border-t border-line">
        {[
          { title: 'Detalles', text: product.details },
          { title: 'Cuidados', text: product.care },
          {
            title: 'Envíos y devoluciones',
            text: 'Entrega en 2 a 4 días hábiles. Devoluciones gratuitas durante 30 días.',
          },
        ].map((section, i) => (
          <details key={section.title} open={i === 0} className="border-b border-line">
            <summary className="flex min-h-13 cursor-pointer items-center font-semibold">
              {section.title}
            </summary>
            <p className="pb-4 text-sm text-muted">{section.text}</p>
          </details>
        ))}
      </div>
    </div>
  )
}

function ProductDetail({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0].name)
  return (
    <div className="flex flex-wrap items-start gap-x-[clamp(32px,5vw,72px)] gap-y-8">
      <Gallery product={product} color={color} onColorChange={setColor} />
      <ProductInfo product={product} color={color} onColorChange={setColor} />
    </div>
  )
}

export default function ProductPage() {
  const { id = '' } = useParams()
  const product = getProduct(id)

  if (!product) return <NotFound />

  const related = [
    ...products.filter((item) => item.id !== product.id && item.category === product.category),
    ...products.filter((item) => item.category !== product.category),
  ].slice(0, 4)

  return (
    <>
      <title>{`${product.name} · Nido`}</title>
      <meta name="description" content={product.description} />
      <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-x-2 py-3 text-sm text-muted">
        <Link to="/" className="inline-flex min-h-11 items-center hover:text-ink">
          Inicio
        </Link>
        <span aria-hidden="true">/</span>
        <Link to={`/?cat=${product.category}`} className="inline-flex min-h-11 items-center hover:text-ink">
          {CATEGORY_NAMES[product.category]}
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="text-ink">
          {product.name}
        </span>
      </nav>

      {/* key: reinicia color, cantidad y foto al cambiar de producto */}
      <ProductDetail key={product.id} product={product} />

      <section className="flex flex-col gap-7 pt-[clamp(56px,7vw,96px)]">
        <h2 className="text-[clamp(22px,2.4vw,28px)] font-bold tracking-[-0.03em]">También te puede gustar</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(232px,1fr))] gap-x-6 gap-y-10">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </>
  )
}
