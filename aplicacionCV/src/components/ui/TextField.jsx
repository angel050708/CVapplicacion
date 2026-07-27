import { useId } from 'react'
import Icon from './Icon.jsx'
import '../../styles/form.css'

/**
 * Campo de texto controlado. La etiqueta siempre es visible (nunca solo
 * placeholder) y el error aparece pegado al campo, no en un resumen lejano.
 */
export default function TextField({
  label,
  value,
  onChange,
  type = 'text',
  multiline = false,
  required = false,
  error,
  hint,
  ...rest
}) {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const Control = multiline ? 'textarea' : 'input'

  return (
    <div className="field" data-invalid={Boolean(error)}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required && (
          <span className="field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <Control
        id={id}
        className="field__control"
        type={multiline ? undefined : type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [error && errorId, hint && hintId].filter(Boolean).join(' ') ||
          undefined
        }
        {...rest}
      />

      {hint && !error && (
        <p className="field__hint" id={hintId}>
          {hint}
        </p>
      )}

      {error && (
        <p className="field__error" id={errorId}>
          <Icon name="alert" size={13} />
          {error}
        </p>
      )}
    </div>
  )
}
