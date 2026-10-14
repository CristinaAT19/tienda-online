import type { ComponentProps } from 'react'
import { AlertIcon } from './Icons'

interface Props extends ComponentProps<'input'> {
  id: string
  label: string
  optional?: boolean
  error?: string
}

/** Campo de texto con etiqueta y mensaje de error accesible. */
export default function Field({ id, label, optional, error, className = '', ...input }: Props) {
  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium">
        {label} {optional && <span className="font-normal text-muted">(opcional)</span>}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field"
        {...input}
      />
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-[13px] text-danger">
          <AlertIcon size={14} />
          {error}
        </p>
      )}
    </div>
  )
}
