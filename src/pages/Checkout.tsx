import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Field from '../components/Field'
import { ArrowRightIcon, CheckIcon, InfoIcon } from '../components/Icons'
import ProductImage from '../components/ProductImage'
import Stepper from '../components/Stepper'
import TotalsList from '../components/TotalsList'
import { formatPrice } from '../lib/format'
import {
  formatCardNumber,
  formatExpiry,
  paymentSchema,
  shippingSchema,
  type PaymentData,
  type ShippingData,
} from '../lib/schemas'
import { computeTotals, shippingCost, SHIPPING, type Totals } from '../lib/totals'
import { useCart, useCartLines, type CartLine } from '../store/cart'
import type { ShippingMethod } from '../types'

const heading = 'text-[clamp(28px,3vw,38px)] leading-[1.08] font-bold tracking-[-0.035em]'
const legend = 'pb-3.5 text-lg font-semibold tracking-[-0.01em]'

interface Order {
  number: string
  shipping: ShippingData
  lines: CartLine[]
  totals: Totals
  coupon: string | null
}

function ShippingStep({
  defaults,
  amount,
  onMethodChange,
  onSubmit,
}: {
  defaults: ShippingData
  /** Importe sobre el que se decide el envío gratis */
  amount: number
  onMethodChange: (method: ShippingMethod) => void
  onSubmit: (data: ShippingData) => void
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ShippingData>({ resolver: zodResolver(shippingSchema), defaultValues: defaults })
  const method = watch('envio')

  useEffect(() => {
    onMethodChange(method)
  }, [method, onMethodChange])

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-9">
      <h1 className={heading}>Datos de envío</h1>

      <fieldset className="flex flex-col gap-4">
        <legend className={legend}>Contacto</legend>
        <Field
          id="email"
          label="Correo electrónico"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className={legend}>Dirección</legend>
        <div className="flex flex-wrap items-start gap-4">
          <Field
            id="nombre"
            label="Nombre"
            autoComplete="given-name"
            className="flex-[1_1_200px]"
            error={errors.nombre?.message}
            {...register('nombre')}
          />
          <Field
            id="apellidos"
            label="Apellidos"
            autoComplete="family-name"
            className="flex-[1_1_200px]"
            error={errors.apellidos?.message}
            {...register('apellidos')}
          />
        </div>
        <Field
          id="direccion"
          label="Dirección"
          placeholder="Calle, número, piso"
          autoComplete="street-address"
          error={errors.direccion?.message}
          {...register('direccion')}
        />
        <div className="flex flex-wrap items-start gap-4">
          <Field
            id="ciudad"
            label="Ciudad"
            autoComplete="address-level2"
            className="flex-[2_1_200px]"
            error={errors.ciudad?.message}
            {...register('ciudad')}
          />
          <Field
            id="cp"
            label="Código postal"
            inputMode="numeric"
            autoComplete="postal-code"
            className="flex-[1_1_140px]"
            error={errors.cp?.message}
            {...register('cp')}
          />
        </div>
        <Field
          id="telefono"
          label="Teléfono"
          optional
          type="tel"
          autoComplete="tel"
          error={errors.telefono?.message}
          {...register('telefono')}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-2.5">
        <legend className={legend}>Método de envío</legend>
        {(Object.keys(SHIPPING) as ShippingMethod[]).map((key) => {
          const cost = shippingCost(key, amount)
          return (
            <label
              key={key}
              className={`flex min-h-16 cursor-pointer items-center gap-3.5 rounded-xl px-4 outline-2 -outline-offset-2 ${
                method === key ? 'outline-ink' : 'outline-transparent ring-1 ring-line-strong ring-inset'
              }`}
            >
              <input type="radio" value={key} className="size-4.5 accent-accent" {...register('envio')} />
              <span className="flex flex-1 flex-col">
                <span className="font-semibold">{SHIPPING[key].name}</span>
                <span className="text-[13px] text-muted">{SHIPPING[key].eta}</span>
              </span>
              <span className="font-semibold">{cost === 0 ? 'Gratis' : formatPrice(cost)}</span>
            </label>
          )
        })}
      </fieldset>

      <div className="flex flex-wrap-reverse items-center justify-between gap-x-6 gap-y-3">
        <Link to="/carrito" className="inline-flex min-h-11 items-center underline underline-offset-4">
          Volver al carrito
        </Link>
        <button type="submit" className="btn-primary">
          Continuar al pago
          <ArrowRightIcon />
        </button>
      </div>
    </form>
  )
}

function PaymentStep({
  total,
  onBack,
  onSubmit,
}: {
  total: number
  onBack: () => void
  onSubmit: (data: PaymentData) => void
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { titular: '', numero: '', caducidad: '', cvc: '' },
  })

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-9">
      <h1 className={heading}>Pago</h1>

      <p className="flex items-start gap-2.5 rounded-xl bg-tint px-4 py-3.5 text-sm">
        <span className="mt-0.5 text-accent">
          <InfoIcon />
        </span>
        Pago simulado: no introduzcas una tarjeta real. Ningún dato se envía ni se guarda. Puedes usar
        4242 4242 4242 4242.
      </p>

      <fieldset className="flex flex-col gap-4">
        <legend className={legend}>Tarjeta</legend>
        <Field
          id="titular"
          label="Titular de la tarjeta"
          autoComplete="off"
          error={errors.titular?.message}
          {...register('titular')}
        />
        <Field
          id="numero"
          label="Número de tarjeta"
          inputMode="numeric"
          autoComplete="off"
          placeholder="0000 0000 0000 0000"
          error={errors.numero?.message}
          {...register('numero', {
            onChange: (event) => setValue('numero', formatCardNumber(event.target.value)),
          })}
        />
        <div className="flex flex-wrap items-start gap-4">
          <Field
            id="caducidad"
            label="Caducidad"
            inputMode="numeric"
            autoComplete="off"
            placeholder="MM/AA"
            className="flex-[1_1_140px]"
            error={errors.caducidad?.message}
            {...register('caducidad', {
              onChange: (event) => setValue('caducidad', formatExpiry(event.target.value)),
            })}
          />
          <Field
            id="cvc"
            label="CVC"
            inputMode="numeric"
            autoComplete="off"
            maxLength={4}
            className="flex-[1_1_140px]"
            error={errors.cvc?.message}
            {...register('cvc')}
          />
        </div>
      </fieldset>

      <div className="flex flex-wrap-reverse items-center justify-between gap-x-6 gap-y-3">
        <button type="button" onClick={onBack} className="min-h-11 underline underline-offset-4">
          Volver al envío
        </button>
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          Pagar {formatPrice(total)}
        </button>
      </div>
    </form>
  )
}

function Confirmation({ order }: { order: Order }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <section className="flex max-w-[720px] flex-col gap-7">
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-success text-white">
        <CheckIcon size={26} />
      </span>
      <div className="flex flex-col gap-3">
        <h1 ref={headingRef} tabIndex={-1} className={`${heading} outline-none`}>
          ¡Gracias, {order.shipping.nombre}! Tu pedido está confirmado.
        </h1>
        <p className="text-muted">
          Pedido <strong className="text-ink">{order.number}</strong>. En una tienda real enviaríamos la
          confirmación a {order.shipping.email}.
        </p>
      </div>

      <div className="flex flex-col gap-5 rounded-[18px] bg-tint p-[clamp(20px,3vw,32px)]">
        <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm">
          <div className="flex flex-col gap-1">
            <div className="font-semibold">Enviar a</div>
            <div className="text-muted">
              {order.shipping.nombre} {order.shipping.apellidos}
              <br />
              {order.shipping.direccion}
              <br />
              {order.shipping.cp} {order.shipping.ciudad}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold">Envío</div>
            <div className="text-muted">
              {SHIPPING[order.shipping.envio].name}
              <br />
              {SHIPPING[order.shipping.envio].eta}
            </div>
          </div>
        </div>
        <OrderLines lines={order.lines} />
        <TotalsList totals={order.totals} method={order.shipping.envio} coupon={order.coupon} />
      </div>

      <Link to="/" className="btn-primary self-start">
        Seguir comprando
      </Link>
    </section>
  )
}

function OrderLines({ lines }: { lines: CartLine[] }) {
  return (
    <ul className="flex flex-col gap-4 border-t border-[#d5d8dd] pt-5">
      {lines.map((line) => (
        <li key={`${line.productId}-${line.color}`} className="flex gap-3.5">
          <ProductImage
            product={line.product}
            className="h-20 w-16 shrink-0 rounded-[10px] bg-white! p-1.5! text-[10px]!"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-semibold">{line.product.name}</span>
              <span className="font-semibold whitespace-nowrap">{formatPrice(line.lineTotal)}</span>
            </div>
            <div className="text-[13px] text-muted">
              {line.color} · Cantidad: {line.qty}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

const emptyShipping: ShippingData = {
  email: '',
  nombre: '',
  apellidos: '',
  direccion: '',
  ciudad: '',
  cp: '',
  telefono: '',
  envio: 'estandar',
}

export default function Checkout() {
  const lines = useCartLines()
  const coupon = useCart((state) => state.coupon)
  const clear = useCart((state) => state.clear)
  const [step, setStep] = useState<'envio' | 'pago'>('envio')
  const [shipping, setShipping] = useState<ShippingData>(emptyShipping)
  const [method, setMethod] = useState<ShippingMethod>('estandar')
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step, order])

  if (order) {
    return (
      <>
        <Stepper current={3} />
        <Confirmation order={order} />
      </>
    )
  }

  if (lines.length === 0) {
    return (
      <section className="flex flex-col items-start gap-4 py-20">
        <h1 className={heading}>No hay nada que pagar todavía.</h1>
        <p className="text-muted">Añade algún producto al carrito para continuar.</p>
        <Link to="/" className="btn-primary">
          Ver el catálogo
        </Link>
      </section>
    )
  }

  const totals = computeTotals(lines, method, coupon)
  const units = lines.reduce((sum, line) => sum + line.qty, 0)

  function placeOrder() {
    setOrder({
      number: `NID-${Math.floor(100000 + Math.random() * 900000)}`,
      shipping,
      lines,
      totals,
      coupon,
    })
    clear()
  }

  return (
    <>
      <Stepper current={step === 'envio' ? 1 : 2} />
      <div className="flex flex-wrap items-start gap-x-[clamp(32px,5vw,72px)] gap-y-10">
        <div className="min-w-0 flex-[3_1_480px]">
          {step === 'envio' ? (
            <ShippingStep
              defaults={shipping}
              amount={totals.subtotal - totals.discount}
              onMethodChange={setMethod}
              onSubmit={(data) => {
                setShipping(data)
                setStep('pago')
              }}
            />
          ) : (
            <PaymentStep total={totals.total} onBack={() => setStep('envio')} onSubmit={placeOrder} />
          )}
        </div>

        <aside
          aria-label="Resumen del pedido"
          className="flex min-w-0 flex-[2_1_340px] flex-col gap-5 rounded-[18px] bg-tint p-[clamp(20px,3vw,32px)]"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-xl font-bold tracking-[-0.02em]">Tu pedido</h2>
            <span className="text-sm text-muted">
              {units} {units === 1 ? 'artículo' : 'artículos'}
            </span>
          </div>
          <OrderLines lines={lines} />
          <div className="border-t border-[#d5d8dd] pt-5">
            <TotalsList totals={totals} method={method} coupon={coupon} />
          </div>
          <p className="flex items-start gap-2 text-[13px] text-muted">
            <span className="mt-0.5">
              <InfoIcon />
            </span>
            Pago simulado: es un proyecto de demostración y no se cobra nada.
          </p>
        </aside>
      </div>
    </>
  )
}
