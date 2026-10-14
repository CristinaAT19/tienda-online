import { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { CATEGORY_NAMES } from '../data/products'
import { formatPrice } from '../lib/format'
import { FREE_SHIPPING_FROM } from '../lib/totals'
import { useCartCount } from '../store/cart'
import { CATEGORIES } from '../types'
import { BagIcon, SearchIcon } from './Icons'

const navLink = 'inline-flex min-h-11 items-center hover:text-accent'

function Header() {
  const count = useCartCount()
  const location = useLocation()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const onCatalog = location.pathname === '/'
  const query = onCatalog ? (params.get('q') ?? '') : ''

  function search(value: string) {
    const next = new URLSearchParams(onCatalog ? params : undefined)
    if (value) next.set('q', value)
    else next.delete('q')
    navigate({ pathname: '/', search: next.toString() }, { replace: onCatalog })
  }

  return (
    <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-line py-4">
      <Link
        to="/"
        aria-label="Nido, inicio"
        className="inline-flex min-h-11 items-center text-[26px] font-bold tracking-[-0.04em]"
      >
        nido
      </Link>
      <nav aria-label="Categorías" className="flex flex-wrap gap-x-7">
        <Link to="/?orden=novedades" className={navLink}>
          Novedades
        </Link>
        {CATEGORIES.map((category) => (
          <Link key={category} to={`/?cat=${category}`} className={navLink}>
            {CATEGORY_NAMES[category]}
          </Link>
        ))}
      </nav>
      <div className="flex min-w-0 flex-[1_1_260px] items-center justify-end gap-2.5">
        <div className="relative min-w-0 flex-[0_1_280px]">
          <label htmlFor="buscar" className="sr-only">
            Buscar productos
          </label>
          <span className="pointer-events-none absolute top-3.5 left-3.5 text-muted">
            <SearchIcon />
          </span>
          <input
            id="buscar"
            type="search"
            placeholder="Buscar productos"
            value={query}
            onChange={(event) => search(event.target.value)}
            className="h-11 w-full rounded-full border border-transparent bg-tint pr-3.5 pl-10 placeholder:text-muted"
          />
        </div>
        <Link
          to="/carrito"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink px-4 font-medium hover:bg-ink hover:text-white"
        >
          <BagIcon size={18} />
          Carrito
          <span
            aria-label={`${count} artículos`}
            className="inline-flex h-5.5 min-w-5.5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-semibold text-white"
          >
            {count}
          </span>
        </Link>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-auto flex flex-wrap items-start justify-between gap-x-12 gap-y-6 border-t border-line pt-8 pb-10">
      <div className="flex max-w-[36ch] flex-col gap-2">
        <div className="text-[22px] font-bold tracking-[-0.04em]">nido</div>
        <p className="text-sm text-muted">Proyecto de demostración. No se realizan ventas reales.</p>
      </div>
      <nav aria-label="Pie de página" className="flex flex-wrap gap-x-7 text-sm">
        <Link to="/" className={navLink}>
          Catálogo
        </Link>
        <Link to="/carrito" className={navLink}>
          Carrito
        </Link>
      </nav>
    </footer>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      <div className="bg-ink px-4 py-2.5 text-center text-[13px] text-white">
        Envío gratis en pedidos desde {formatPrice(FREE_SHIPPING_FROM)}
      </div>
      <div className="container-page flex flex-1 flex-col">
        <Header />
        <main className="pb-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
