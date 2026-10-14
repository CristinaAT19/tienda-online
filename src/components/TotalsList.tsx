import { formatPrice } from '../lib/format'
import { SHIPPING, type Totals } from '../lib/totals'
import type { ShippingMethod } from '../types'

interface Props {
  totals: Totals
  method: ShippingMethod
  coupon: string | null
}

export default function TotalsList({ totals, method, coupon }: Props) {
  return (
    <dl className="flex flex-col gap-2.5">
      <div className="flex justify-between gap-3">
        <dt className="text-muted">Subtotal</dt>
        <dd>{formatPrice(totals.subtotal)}</dd>
      </div>
      {totals.discount > 0 && (
        <div className="flex justify-between gap-3">
          <dt className="text-muted">Descuento ({coupon})</dt>
          <dd className="text-success">−{formatPrice(totals.discount)}</dd>
        </div>
      )}
      <div className="flex justify-between gap-3">
        <dt className="text-muted">Envío {SHIPPING[method].name.toLowerCase()}</dt>
        <dd>{totals.shipping === 0 ? 'Gratis' : formatPrice(totals.shipping)}</dd>
      </div>
      <div className="flex items-baseline justify-between gap-3 border-t border-line-strong pt-3.5">
        <dt className="text-[17px] font-semibold">Total</dt>
        <dd className="text-[26px] font-bold tracking-[-0.02em]">{formatPrice(totals.total)}</dd>
      </div>
    </dl>
  )
}
