import { useState } from 'react'
import SectionShell from '../ui/SectionShell.jsx'
import TextField from '../ui/TextField.jsx'
import Button from '../ui/Button.jsx'
import '../../styles/form.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(draft) {
  const errors = {}
  if (!draft.name.trim())
    errors.name = 'Necesitamos un nombre para encabezar la hoja.'
  if (!draft.email.trim()) errors.email = 'Sin correo no hay forma de contestarte.'
  else if (!EMAIL_RE.test(draft.email.trim()))
    errors.email = 'Ese correo no tiene una forma válida.'
  return errors
}

export default function GeneralInfoSection({
  value,
  editing,
  onSubmit,
  onEdit,
  onCancel,
}) {
  const [draft, setDraft] = useState(value)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  function startEditing() {
    setDraft(value)
    setErrors({})
    setStatus('')
    onEdit()
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validate(draft)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    onSubmit({
      name: draft.name.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
    })
    setStatus('Datos personales enviados a la hoja.')
  }

  const field = (key) => ({
    value: draft[key],
    onChange: (next) => setDraft({ ...draft, [key]: next }),
    error: errors[key],
  })

  if (!editing) {
    return (
      <SectionShell
        number="01"
        title="Datos personales"
        status={status}
        actions={
          <Button variant="ghost" size="sm" icon="edit" onClick={startEditing}>
            Editar
          </Button>
        }
      >
        <div className="entry-list">
          <div className="entry">
            <div className="entry__body">
              <div className="entry__primary">{value.name}</div>
              <div className="entry__secondary">{value.email}</div>
              {value.phone && (
                <div className="entry__dates tnum">{value.phone}</div>
              )}
            </div>
          </div>
        </div>
      </SectionShell>
    )
  }

  return (
    <SectionShell number="01" title="Datos personales" status={status}>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Nombre completo"
          required
          autoComplete="name"
          placeholder="Ada Lovelace"
          {...field('name')}
        />
        <TextField
          label="Correo electrónico"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="ada@ejemplo.com"
          {...field('email')}
        />
        <TextField
          label="Teléfono"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+34 600 00 00 00"
          hint="Opcional. Se imprime junto al correo."
          {...field('phone')}
        />

        <div className="form__actions">
          <Button type="submit" variant="primary" icon="check">
            Enviar
          </Button>
          {onCancel && (
            <Button variant="quiet" onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </SectionShell>
  )
}
