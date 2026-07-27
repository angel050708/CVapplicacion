import { useState } from 'react'
import SectionShell from '../ui/SectionShell.jsx'
import TextField from '../ui/TextField.jsx'
import Button from '../ui/Button.jsx'
import '../../styles/form.css'

export default function ProfileSection({
  value,
  editing,
  onSubmit,
  onEdit,
  onCancel,
}) {
  const [draft, setDraft] = useState(value)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')

  function startEditing() {
    setDraft(value)
    setError('')
    setStatus('')
    onEdit()
  }

  function handleSubmit(event) {
    event.preventDefault()
    const text = draft.trim()
    if (!text) {
      setError('Escribe un par de frases antes de enviarlas.')
      return
    }
    onSubmit(text)
    setStatus('Perfil enviado a la hoja.')
  }

  if (!editing) {
    return (
      <SectionShell
        number="02"
        title="Perfil"
        status={status}
        actions={
          <Button variant="ghost" size="sm" icon="edit" onClick={startEditing}>
            Editar
          </Button>
        }
      >
        <div className="entry-list">
          <div className="entry">
            <p className="entry__prose">{value}</p>
          </div>
        </div>
      </SectionShell>
    )
  }

  return (
    <SectionShell number="02" title="Perfil" status={status}>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Quién eres"
          multiline
          rows={5}
          required
          value={draft}
          onChange={(next) => {
            setDraft(next)
            setError('')
          }}
          error={error}
          hint="Dos o tres frases: a qué te dedicas, qué se te da bien y qué buscas."
          placeholder="Desarrolladora front-end con cinco años componiendo interfaces…"
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
