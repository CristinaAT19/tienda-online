import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowRightIcon } from '../components/Icons'
import { ArtGroup } from '../components/ProductArt'
import ProductCard from '../components/ProductCard'
import { CATEGORY_NAMES, products } from '../data/products'
import { CATEGORIES, type Category, type Product } from '../types'

const SORTS = {
  destacados: { name: 'Destacados', compare: null },
  'precio-asc': { name: 'Precio: menor a mayor', compare: (a: Product, b: Product) => a.price - b.price },
  'precio-desc': { name: 'Precio: mayor a menor', compare: (a: Product, b: Product) => b.price - a.price },
  novedades: { name: 'Novedades', compare: (a: Product, b: Product) => b.addedAt - a.addedAt },
} as const
type Sort = keyof typeof SORTS

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

/** Bodegón con varias piezas del catálogo sobre una repisa. */
function HeroScene() {
  return (
    <svg
      role="img"
      aria-label="Lámpara, jarrón con ramas, taza y cuenco de la colección sobre una repisa"
      viewBox="0 0 600 460"
      preserveAspectRatio="xMidYMax slice"
      className="size-full"
    >
      <circle cx="330" cy="130" r="80" fill="#f3e7cf" />
      <rect x="-200" y="380" width="1000" height="100" fill="#d9cfbf" />
      <rect x="-200" y="380" width="1000" height="6" fill="#000" opacity="0.06" />
      <ArtGroup kind="lampara" color="#22252a" transform="translate(-40 121) scale(0.82)" />
      <ArtGroup kind="jarron" color="#4f6b5a" transform="translate(110 96) scale(0.9)" />
      <ArtGroup kind="cuenco" color="#b08d5b" transform="translate(395 206) scale(0.55)" />
      <ArtGroup kind="taza" color="#233252" transform="translate(318 247) scale(0.42)" />
    </svg>
  )
}

function Hero() {
  return (
    <section className="mt-6 flex flex-wrap overflow-hidden rounded-[20px] bg-tint">
      <div className="flex min-w-0 flex-[1_1_420px] flex-col justify-center gap-5 p-[clamp(28px,5vw,72px)]">
        <div className="eyebrow">Colección de otoño</div>
        <h1 className="max-w-[14ch] text-[clamp(34px,4.6vw,60px)] leading-[1.04] font-bold tracking-[-0.04em]">
          Objetos sencillos para una casa vivida.
        </h1>
        <p className="max-w-[38ch] text-[17px] text-muted">
          Piezas hechas a mano en pequeños talleres: cerámica, textiles y luz para el día a día.
        </p>
        <a href="#productos" className="btn-primary self-start">
          Ver la colección
          <ArrowRightIcon />
        </a>
      </div>
      <div className="flex min-h-80 min-w-0 flex-[1_1_420px] bg-[#e9e3d8]">
        <HeroScene />
      </div>
    </section>
  )
}

export default function Catalog() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const catParam = params.get('cat')
  const category = CATEGORIES.includes(catParam as Category) ? (catParam as Category) : null
  const sortParam = params.get('orden') ?? ''
  const sort: Sort = sortParam in SORTS ? (sortParam as Sort) : 'destacados'

  const visible = useMemo(() => {
    const needle = normalize(query.trim())
    const filtered = products.filter(
      (product) =>
        (!category || product.category === category) &&
        (!needle ||
          normalize(`${product.name} ${CATEGORY_NAMES[product.category]}`).includes(needle)),
    )
    const compare = SORTS[sort].compare
    return compare ? [...filtered].sort(compare) : filtered
  }, [query, category, sort])

  function setParam(key: string, value: string | null) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const chip = (active: boolean) =>
    `min-h-11 rounded-full border px-4.5 transition-colors ${
      active ? 'border-ink bg-ink font-medium text-white' : 'border-line-strong hover:border-ink'
    }`

  return (
    <>
      <title>{category ? `${CATEGORY_NAMES[category]} · Nido` : 'Nido · Objetos para casa'}</title>
      {!query && <Hero />}

      <section id="productos" className="flex scroll-mt-6 flex-col gap-7 pt-[clamp(48px,6vw,80px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <h2 className="text-[clamp(24px,2.6vw,32px)] leading-[1.1] font-bold tracking-[-0.03em]">
              {query ? `Resultados para «${query}»` : category ? CATEGORY_NAMES[category] : 'Todos los productos'}
            </h2>
            <span aria-live="polite" className="text-sm text-muted">
              {visible.length} {visible.length === 1 ? 'producto' : 'productos'}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <label htmlFor="orden" className="text-sm text-muted">
              Ordenar por
            </label>
            <select
              id="orden"
              value={sort}
              onChange={(event) =>
                setParam('orden', event.target.value === 'destacados' ? null : event.target.value)
              }
              className="h-11 rounded-[10px] border border-line-strong bg-white px-3"
            >
              {Object.entries(SORTS).map(([key, { name }]) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={!category}
            onClick={() => setParam('cat', null)}
            className={chip(!category)}
          >
            Todo
          </button>
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setParam('cat', item)}
              className={chip(category === item)}
            >
              {CATEGORY_NAMES[item]}
            </button>
          ))}
        </div>

        {visible.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(232px,1fr))] gap-x-6 gap-y-10">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-start gap-4 rounded-[18px] bg-tint p-8">
            <p className="text-[17px] font-semibold">No hay productos que coincidan.</p>
            <p className="text-muted">Prueba con otra búsqueda o quita los filtros.</p>
            <button type="button" onClick={() => setParams({}, { replace: true })} className="btn-outline">
              Quitar filtros
            </button>
          </div>
        )}
      </section>
    </>
  )
}
