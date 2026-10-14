import { describe, expect, it } from 'vitest'
import { formatCardNumber, formatExpiry, isExpired, paymentSchema, shippingSchema } from './schemas'

describe('formatCardNumber', () => {
  it('agrupa los dígitos de cuatro en cuatro y descarta el resto', () => {
    expect(formatCardNumber('4242424242424242')).toBe('4242 4242 4242 4242')
    expect(formatCardNumber('4242-42ab42')).toBe('4242 4242')
    expect(formatCardNumber('42424242424242429999')).toBe('4242 4242 4242 4242')
  })
})

describe('formatExpiry', () => {
  it('inserta la barra tras el mes', () => {
    expect(formatExpiry('1')).toBe('1')
    expect(formatExpiry('12')).toBe('12')
    expect(formatExpiry('1229')).toBe('12/29')
    expect(formatExpiry('12/295')).toBe('12/29')
  })
})

describe('isExpired', () => {
  const today = new Date(2026, 9, 13)

  it('la tarjeta vale hasta el último día de su mes', () => {
    expect(isExpired('10/26', today)).toBe(false)
    expect(isExpired('09/26', today)).toBe(true)
    expect(isExpired('01/30', today)).toBe(false)
  })
})

describe('paymentSchema', () => {
  const valid = { titular: 'Ana Pérez', numero: '4242 4242 4242 4242', caducidad: '12/39', cvc: '123' }

  it('acepta una tarjeta de prueba', () => {
    expect(paymentSchema.safeParse(valid).success).toBe(true)
  })

  it('rechaza números incompletos y CVC mal formados', () => {
    expect(paymentSchema.safeParse({ ...valid, numero: '4242 4242' }).success).toBe(false)
    expect(paymentSchema.safeParse({ ...valid, cvc: '12' }).success).toBe(false)
    expect(paymentSchema.safeParse({ ...valid, caducidad: '13/30' }).success).toBe(false)
  })
})

describe('shippingSchema', () => {
  const valid = {
    email: 'ana@example.com',
    nombre: 'Ana',
    apellidos: 'Pérez',
    direccion: 'Av. Larco 123',
    ciudad: 'Lima',
    cp: '15074',
    telefono: '',
    envio: 'estandar' as const,
  }

  it('el teléfono es opcional', () => {
    expect(shippingSchema.safeParse(valid).success).toBe(true)
    expect(shippingSchema.safeParse({ ...valid, telefono: '+51 987 654 321' }).success).toBe(true)
  })

  it('exige un correo y un código postal válidos', () => {
    expect(shippingSchema.safeParse({ ...valid, email: 'ana@' }).success).toBe(false)
    expect(shippingSchema.safeParse({ ...valid, cp: '150' }).success).toBe(false)
  })
})
