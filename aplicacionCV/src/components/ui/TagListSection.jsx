import { useId, useState } from 'react'
import SectionShell from './SectionShell.jsx'
import Button from './Button.jsx'
import EmptyState from './EmptyState.jsx'
import Icon from './Icon.jsx'
import '../../styles/tags.css'

export default function TagListSection({
  number,
  title,
  items,
  addLabel,
  addButtonLabel,
  placeholder,
  emptyTitle,
  emptyBody,
  messages,
  onAdd,
  onRemove,
}) {
  const id = useId()
  const errorId = `${id}-error`
  const [draft, setDraft] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const name = draft.trim()

    if (!name) {
      setError('Escribe una competencia antes de añadirla.')
      return
    }
    if (items.some((item) => item.toLowerCase() === name.toLowerCase())) {
      setError(`«${name}» ya está en la lista.`)
      return
    }

    onAdd(name)
    setDraft('')
    setError('')
    setStatus(messages.added(name))
  }

  function handleRemove(name) {
    onRemove(name)
    setStatus(messages.removed(name))
  }

  return (
    <SectionShell number={number} title={title} status={status}>
      {items.length === 0 ? (
        <EmptyState title={emptyTitle}>{emptyBody}</EmptyState>
      ) : (
        <ul className="tags">
          {items.map((name, index) => (
            <li
              key={name}
              className="tag"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              {name}
              <button
                type="button"
                className="tag__remove"
                aria-label={`Quitar ${name}`}
                onClick={() => handleRemove(name)}
              >
                <Icon name="close" size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <form className="tag-form" onSubmit={handleSubmit} noValidate>
        <label className="field__label" htmlFor={id}>
          {addLabel}
        </label>
        <div className="tag-form__row">
          <input
            id={id}
            className="field__control"
            value={draft}
            placeholder={placeholder}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            onChange={(event) => {
              setDraft(event.target.value)
              setError('')
            }}
          />
          <Button
            type="submit"
            variant="primary"
            icon="plus"
            label={addButtonLabel}
          />
        </div>
        {error && (
          <p className="field__error" id={errorId}>
            <Icon name="alert" size={13} />
            {error}
          </p>
        )}
      </form>
    </SectionShell>
  )
}
