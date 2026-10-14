import { beforeEach, describe, expect, it } from 'vitest'
import { MAX_QTY, useCart } from './cart'

const cart = () => useCart.getState()

describe('carrito', () => {
  beforeEach(() => cart().clear())

  it('suma unidades al añadir el mismo producto y color', () => {
    cart().add('taza-de-gres', 'Arena')
    cart().add('taza-de-gres', 'Arena', 2)
    cart().add('taza-de-gres', 'Azul noche')
    expect(cart().items).toEqual([
      { productId: 'taza-de-gres', color: 'Arena', qty: 3 },
      { productId: 'taza-de-gres', color: 'Azul noche', qty: 1 },
    ])
  })

  it(`no pasa de ${MAX_QTY} unidades por línea`, () => {
    cart().add('taza-de-gres', 'Arena', 8)
    cart().add('taza-de-gres', 'Arena', 8)
    expect(cart().items[0].qty).toBe(MAX_QTY)
  })

  it('quita la línea al bajar la cantidad a cero', () => {
    cart().add('manta-de-lino', 'Natural')
    cart().setQty('manta-de-lino', 'Natural', 0)
    expect(cart().items).toEqual([])
  })

  it('normaliza los cupones y rechaza los desconocidos', () => {
    expect(cart().applyCoupon('  nido10 ')).toBe(true)
    expect(cart().coupon).toBe('NIDO10')
    expect(cart().applyCoupon('GRATIS')).toBe(false)
    expect(cart().coupon).toBe('NIDO10')
  })
})
