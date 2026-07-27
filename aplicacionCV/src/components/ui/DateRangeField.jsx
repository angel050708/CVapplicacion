import { useId } from 'react'
import TextField from './TextField.jsx'
import '../../styles/form.css'

/**
 * Par de fechas «desde / hasta». Marcar «en la actualidad» vacía y deshabilita
 * la fecha final en lugar de ocultarla, para que el layout no salte.
 *
 * Se usa `type="month"` porque en un CV el día es ruido: así el teclado móvil
 * correcto aparece solo y el valor queda normalizado a AAAA-MM.
 */
export default function DateRangeField({ start, end, onChange, errors = {} }) {
  const currentId = useId()
  const isCurrent = end === null

  return (
    <>
      <div className="form__row form__row--pair">
        <TextField
          label="Desde"
          type="month"
          value={start}
          onChange={(value) => onChange({ start: value, end })}
          error={errors.start}
          required
        />
        <TextField
          label="Hasta"
          type="month"
          value={isCurrent ? '' : end}
          onChange={(value) => onChange({ start, end: value })}
          disabled={isCurrent}
          error={errors.end}
        />
      </div>

      <label className="daterange__current" htmlFor={currentId}>
        <input
          id={currentId}
          type="checkbox"
          checked={isCurrent}
          onChange={(event) =>
            onChange({ start, end: event.target.checked ? null : '' })
          }
        />
        Sigo aquí en la actualidad
      </label>
    </>
  )
}
