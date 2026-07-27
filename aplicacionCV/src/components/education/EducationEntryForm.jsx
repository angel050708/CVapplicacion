import { useState } from 'react'
import TextField from '../ui/TextField.jsx'
import DateRangeField from '../ui/DateRangeField.jsx'
import Button from '../ui/Button.jsx'
import '../../styles/form.css'

const EMPTY = { school: '', degree: '', start: '', end: '' }

function validate(draft) {
  const errors = {}
  if (!draft.school.trim()) errors.school = 'Falta el centro de estudios.'
  if (!draft.degree.trim()) errors.degree = 'Falta la titulación.'
  if (!draft.start) errors.start = 'Indica cuándo empezaste.'
  else if (draft.end && draft.end < draft.start)
    errors.end = 'La fecha final es anterior a la inicial.'
  return errors
}

export default function EducationEntryForm({
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
      school: draft.school.trim(),
      degree: draft.degree.trim(),
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
        label="Centro de estudios"
        required
        placeholder="Universidad de Salamanca"
        {...field('school')}
      />
      <TextField
        label="Titulación"
        required
        placeholder="Grado en Ingeniería Informática"
        {...field('degree')}
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
