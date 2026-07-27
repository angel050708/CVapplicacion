import { useState } from 'react'
import TextField from '../ui/TextField.jsx'
import DateRangeField from '../ui/DateRangeField.jsx'
import Button from '../ui/Button.jsx'
import '../../styles/form.css'

const EMPTY = { company: '', role: '', duties: '', start: '', end: '' }

function validate(draft) {
  const errors = {}
  if (!draft.company.trim()) errors.company = 'Falta el nombre de la empresa.'
  if (!draft.role.trim()) errors.role = 'Falta el puesto que ocupabas.'
  if (!draft.start) errors.start = 'Indica cuándo empezaste.'
  else if (draft.end && draft.end < draft.start)
    errors.end = 'La fecha final es anterior a la inicial.'
  return errors
}

export default function ExperienceEntryForm({
  initial = EMPTY,
  onSave,
  onCancel,
  submitLabel = 'Enviar',
}) {
  const [draft, setDraft] = useState(initial)
  const [errors, setErrors] = useState({})

  function handleSubmit(event) {
    event.preventDefault()
    const found = validate(draft)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onSave({
      ...draft,
      company: draft.company.trim(),
      role: draft.role.trim(),
      duties: draft.duties.trim(),
    })
  }

  const field = (key) => ({
    value: draft[key],
    onChange: (next) => setDraft({ ...draft, [key]: next }),
    error: errors[key],
  })

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <TextField
        label="Empresa"
        required
        autoComplete="organization"
        placeholder="Imprenta Tipográfica S.L."
        {...field('company')}
      />
      <TextField
        label="Puesto"
        required
        autoComplete="organization-title"
        placeholder="Cajista"
        {...field('role')}
      />
      <TextField
        label="Responsabilidades"
        multiline
        rows={4}
        placeholder={
          'Composición de textos para tirada corta\nRevisión de pruebas antes de imprenta'
        }
        hint="Una responsabilidad por línea. Cada línea se imprime como un punto."
        {...field('duties')}
      />
      <DateRangeField
        start={draft.start}
        end={draft.end}
        onChange={({ start, end }) => setDraft({ ...draft, start, end })}
        errors={errors}
      />

      <div className="form__actions">
        <Button type="submit" variant="primary" icon="check">
          {submitLabel}
        </Button>
        <Button variant="quiet" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
