import { useState } from 'react'
import SectionShell from './SectionShell.jsx'
import Button from './Button.jsx'
import EmptyState from './EmptyState.jsx'
import { formatRange } from '../../lib/dates.js'
import '../../styles/section.css'

export default function EntryListSection({
  number,
  title,
  items,
  Form,
  describe,
  emptyTitle,
  emptyBody,
  messages,
  onAdd,
  onUpdate,
  onRemove,
}) {
  const [openForm, setOpenForm] = useState(null)
  const [status, setStatus] = useState('')

  function add(entry) {
    onAdd(entry)
    setOpenForm(null)
    setStatus(messages.added)
  }

  function update(id, entry) {
    onUpdate(id, entry)
    setOpenForm(null)
    setStatus(messages.updated)
  }

  function remove(item, label) {
    onRemove(item.id)
    if (openForm === item.id) setOpenForm(null)
    setStatus(messages.removed(label))
  }

  function open(which) {
    setOpenForm(which)
    setStatus('')
  }

  return (
    <SectionShell
      number={number}
      title={title}
      status={status}
      actions={
        openForm !== 'new' && (
          <Button
            variant="ghost"
            size="sm"
            icon="plus"
            onClick={() => open('new')}
          >
            Añadir
          </Button>
        )
      }
    >
      {items.length === 0 && openForm !== 'new' && (
        <EmptyState title={emptyTitle}>{emptyBody}</EmptyState>
      )}

      {items.length > 0 && (
        <ul className="entry-list">
          {items.map((item, index) => {
            const { primary, secondary } = describe(item)

            if (openForm === item.id) {
              return (
                <li key={item.id} className="entry--editing">
                  <Form
                    initial={item}
                    submitLabel="Guardar cambios"
                    onSave={(entry) => update(item.id, entry)}
                    onCancel={() => setOpenForm(null)}
                  />
                </li>
              )
            }

            return (
              <li
                key={item.id}
                className="entry"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <div className="entry__body">
                  <div className="entry__primary">{primary}</div>
                  <div className="entry__secondary">{secondary}</div>
                  <div className="entry__dates tnum">
                    {formatRange(item.start, item.end)}
                  </div>
                </div>
                <div className="entry__actions">
                  <Button
                    variant="quiet"
                    size="sm"
                    icon="edit"
                    label={`Editar ${primary}`}
                    onClick={() => open(item.id)}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    icon="trash"
                    label={`Eliminar ${primary}`}
                    onClick={() => remove(item, primary)}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      )}

      {openForm === 'new' && (
        <Form onSave={add} onCancel={() => setOpenForm(null)} />
      )}
    </SectionShell>
  )
}
