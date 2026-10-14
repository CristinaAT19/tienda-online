import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '../components/Icons'
import ProductImage from '../components/ProductImage'
import QuantityStepper from '../components/QuantityStepper'
import Stepper from '../components/Stepper'
import TotalsList from '../components/TotalsList'
import { formatPrice } from '../lib/format'
import { computeTotals, FREE_SHIPPING_FROM } from '../lib/totals'
import { useCart, useCartLines } from '../store/cart'

function CouponForm() {
  const coupon = useCart((state) => state.coupon)
  const applyCoupon = useCart((state) => state.applyCoupon)
  const removeCoupon = useCart((state) => state.removeCoupon)
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)

  if (coupon) {
    return (
      <div className="flex items-center justify-between gap-3 border-t border-line-strong pt-5">
        <span>
          Código <strong>{coupon}</strong> aplicado
        </span>
        <button
          type="button"
          onClick={removeCoupon}
          className="min-h-11 px-1 text-[13px] text-muted underline underline-offset-[3px] hover:text-ink"
        >
          Quitar
        </button>
      </div>
    )
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!code.trim()) return
    const ok = applyCoupon(code)
    setError(!ok)
    if (ok) setCode('')
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 border-t border-line-strong pt-5">
      <div className="flex gap-2">
        <label htmlFor="cupon" className="sr-only">
          Código de descuento
        </label>
        <input
          id="cupon"
          type="text"
          placeholder="Código de descuento"
          autoComplete="off"
          value={code}
          onChange={(event) => {
            setCode(event.target.value)
            setError(false)
          }}
          aria-invalid={error}
          aria-describedby={error ? 'cupon-error' : undefined}
          className="field h-11.5 min-w-0 flex-1"
        />
        <button
          type="submit"
          className="min-h-11.5 rounded-[10px] border border-ink bg-white px-4.5 font-medium hover:bg-ink hover:text-white"
        >
          Aplicar
        </button>
      </div>
      {error && (
        <p id="cupon-error" role="alert" className="text-[13px] text-danger">
          Ese código no es válido.
        </p>
      )}
      <p className="text-[13px] text-muted">Prueba con NIDO10.</p>
    </form>
  )
}

export default function CartPage() {
  const lines = useCartLines()
  const coupon = useCart((state) => state.coupon)
  const setQty = useCart((state) => state.setQty)
  const remove = useCart((state) => state.remove)
  const totals = computeTotals(lines, 'estandar', coupon)
  const units = lines.reduce((sum, line) => sum + line.qty, 0)
  const missing = FREE_SHIPPING_FROM - (totals.subtotal - totals.discount)

  if (lines.length === 0) {
    return (
      <section className="flex flex-col items-start gap-4 py-20">
        <h1 className="text-[clamp(28px,3vw,38px)] leading-[1.08] font-bold tracking-[-0.035em]">
          Tu carrito está vacío.
        </h1>
        <p className="text-muted">Cuando añadas productos, aparecerán aquí.</p>
        <Link to="/" className="btn-primary">
          Ver el catálogo
        </Link>
      </section>
    )
  }

  return (
    <>
      <title>Carrito · Nido</title>
      <Stepper current={0} />
      <div className="flex flex-wrap items-start gap-x-[clamp(32px,5vw,72px)] gap-y-10">
        <section className="flex min-w-0 flex-[3_1_480px] flex-col gap-6">
          <h1 className="text-[clamp(28px,3vw,38px)] leading-[1.08] font-bold tracking-[-0.035em]">Tu carrito</h1>
          <ul className="flex flex-col border-t border-line">
            {lines.map((line) => (
              <li key={`${line.productId}-${line.color}`} className="flex gap-4 border-b border-line py-5">
                <Link to={`/producto/${line.productId}`} tabIndex={-1} aria-hidden="true" className="shrink-0">
                  <ProductImage product={line.product} color={line.color} className="h-30 w-24 rounded-[10px]" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <Link to={`/producto/${line.productId}`} className="text-base font-semibold hover:text-accent">
                      {line.product.name}
                    </Link>
                    <span className="font-semibold whitespace-nowrap">{formatPrice(line.lineTotal)}</span>
                  </div>
                  <div className="text-[13px] text-muted">
                    {line.color} · {formatPrice(line.price)} c/u
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                    <QuantityStepper
                      size="sm"
                      value={line.qty}
                      onChange={(qty) => setQty(line.productId, line.color, qty)}
                    />
                    <button
                      type="button"
                      onClick={() => remove(line.productId, line.color)}
                      aria-label={`Quitar ${line.product.name} del carrito`}
                      className="min-h-11 px-1 text-[13px] text-muted underline underline-offset-[3px] hover:text-ink"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/" className="inline-flex min-h-11 items-center self-start underline underline-offset-4">
            Seguir comprando
          </Link>
        </section>

        <aside
          aria-label="Resumen del pedido"
          className="flex min-w-0 flex-[2_1_340px] flex-col gap-5 rounded-[18px] bg-tint p-[clamp(20px,3vw,32px)]"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-xl font-bold tracking-[-0.02em]">Resumen</h2>
            <span className="text-sm text-muted">
              {units} {units === 1 ? 'artículo' : 'artículos'}
            </span>
          </div>
          {missing > 0 && (
            <p className="text-sm text-muted">
              Te faltan {formatPrice(Math.round(missing * 100) / 100)} para el envío gratis.
            </p>
          )}
          <CouponForm />
          <TotalsList totals={totals} method="estandar" coupon={coupon} />
          <Link to="/checkout" className="btn-primary">
            Continuar con la compra
            <ArrowRightIcon />
          </Link>
        </aside>
      </div>
    </>
  )
}
