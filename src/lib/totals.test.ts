import { describe, expect, it } from 'vitest'
import { computeTotals } from './totals'

describe('computeTotals', () => {
  it('cobra el envío estándar por debajo del mínimo', () => {
    expect(computeTotals([{ price: 45, qty: 2 }], 'estandar', null)).toEqual({
      subtotal: 90,
      discount: 0,
      shipping: 12,
      total: 102,
    })
  })

  it('regala el envío estándar desde el mínimo', () => {
    const totals = computeTotals(
      [
        { price: 45, qty: 1 },
        { price: 189, qty: 1 },
        { price: 240, qty: 1 },
      ],
      'estandar',
      null,
    )
    expect(totals).toEqual({ subtotal: 474, discount: 0, shipping: 0, total: 474 })
  })

  it('el envío exprés siempre se cobra', () => {
    expect(computeTotals([{ price: 240, qty: 1 }], 'expres', null).shipping).toBe(18)
  })

  it('aplica el cupón antes de decidir el envío gratis', () => {
    // 156 − 10 % = 140,40, que ya no llega al mínimo de 150
    expect(computeTotals([{ price: 156, qty: 1 }], 'estandar', 'NIDO10')).toEqual({
      subtotal: 156,
      discount: 15.6,
      shipping: 12,
      total: 152.4,
    })
  })

  it('ignora cupones desconocidos y carritos vacíos', () => {
    expect(computeTotals([{ price: 45, qty: 1 }], 'estandar', 'NOEXISTE').discount).toBe(0)
    expect(computeTotals([], 'expres', null).total).toBe(0)
  })
})
