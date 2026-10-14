import { MAX_QTY } from '../store/cart'
import { MinusIcon, PlusIcon } from './Icons'

interface Props {
  value: number
  onChange: (value: number) => void
  min?: number
  size?: 'sm' | 'lg'
}

export default function QuantityStepper({ value, onChange, min = 1, size = 'lg' }: Props) {
  const button =
    size === 'lg'
      ? 'h-12.5 w-12 rounded-full'
      : 'h-9 w-11 rounded-full'

  return (
    <div
      role="group"
      aria-label="Cantidad"
      className="inline-flex items-center rounded-full border border-line-strong bg-white"
    >
      <button
        type="button"
        aria-label="Quitar uno"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className={`inline-flex items-center justify-center disabled:opacity-35 ${button}`}
      >
        <MinusIcon size={size === 'lg' ? 16 : 14} />
      </button>
      <span aria-live="polite" className="min-w-6 text-center font-semibold tabular-nums">
        {value}
      </span>
      <button
        type="button"
        aria-label="Añadir uno"
        disabled={value >= MAX_QTY}
        onClick={() => onChange(value + 1)}
        className={`inline-flex items-center justify-center disabled:opacity-35 ${button}`}
      >
        <PlusIcon size={size === 'lg' ? 16 : 14} />
      </button>
    </div>
  )
}
