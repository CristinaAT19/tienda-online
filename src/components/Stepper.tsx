import { Fragment } from 'react'
import { CheckIcon } from './Icons'

export const CHECKOUT_STEPS = ['Carrito', 'Envío', 'Pago', 'Confirmación']

/** Indicador de pasos de la compra; `current` es el índice del paso activo. */
export default function Stepper({ current }: { current: number }) {
  return (
    <ol aria-label="Pasos de la compra" className="flex flex-wrap items-center gap-x-4 gap-y-3 py-7 text-sm">
      {CHECKOUT_STEPS.map((step, i) => {
        const done = i < current
        const active = i === current
        return (
          <Fragment key={step}>
            {i > 0 && (
              <li
                aria-hidden="true"
                className={`h-px min-w-4 flex-[0_1_48px] ${i <= current ? 'bg-ink' : 'bg-line-strong'}`}
              />
            )}
            <li
              aria-current={active ? 'step' : undefined}
              className={`inline-flex items-center gap-2.5 ${active ? 'font-semibold' : done ? '' : 'text-muted'}`}
            >
              <span
                className={`inline-flex size-7 items-center justify-center rounded-full text-[13px] font-semibold ${
                  done
                    ? 'bg-ink text-white'
                    : active
                      ? 'bg-accent text-white'
                      : 'border border-line-strong'
                }`}
              >
                {done ? <CheckIcon size={14} /> : i + 1}
              </span>
              {step}
            </li>
          </Fragment>
        )
      })}
    </ol>
  )
}
