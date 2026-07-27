import { useState } from 'react'
import SectionShell from '../ui/SectionShell.jsx'
import Button from '../ui/Button.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import EducationEntryForm from './EducationEntryForm.jsx'
import { EMPTY_EDUCATION } from '../../lib/entries.js'
import { formatRange } from '../../lib/dates.js'
import '../../styles/section.css'

/**
 * Sección 2 — formación.
 *
 * Los datos llegan y salen por props (viven en App). Lo único que esta sección
 * guarda en local es qué formulario está abierto: `null`, `'new'`, o el id de
 * la entrada que se está editando. Eso es estado de interfaz, no del CV.
 */
export default function EducationSection({ items, onAdd, onUpdate, onRemove }) {
  const [openForm, setOpenForm] = useState(null)
  const [status, setStatus] = useState('')

  function handleAdd(entry) {
    onAdd(entry)
    setOpenForm(null)
    setStatus('Formación añadida a la hoja.')
  }

  function handleUpdate(id, entry) {
    onUpdate(id, entry)
    setOpenForm(null)
    setStatus('Formación actualizada.')
  }

  function handleRemove(id, degree) {
    onRemove(id)
    if (openForm === id) setOpenForm(null)
    setStatus(`Se retiró «${degree}» de la hoja.`)
  }

  return (
    <SectionShell
      number="02"
      title="Formación"
      status={status}
      actions={
        openForm !== 'new' && (
          <Button
            variant="ghost"
            size="sm"
            icon="plus"
            onClick={() => {
              setOpenForm('new')
              setStatus('')
            }}
          >
            Añadir
          </Button>
        )
      }
    >
      {items.length === 0 && openForm !== 'new' && (
        <EmptyState title="La hoja aún no tiene formación">
          Añade el centro, la titulación y el periodo. Puedes registrar tantas
          etapas como quieras y reordenarlas después cambiando sus fechas.
        </EmptyState>
      )}

      {items.length > 0 && (
        <ul className="entry-list">
          {items.map((item, index) =>
            openForm === item.id ? (
              <li key={item.id} style={{ padding: '0.75rem 0' }}>
                <EducationEntryForm
                  initial={item}
                  submitLabel="Guardar cambios"
                  onSave={(entry) => handleUpdate(item.id, entry)}
                  onCancel={() => setOpenForm(null)}
                />
              </li>
            ) : (
              <li
                key={item.id}
                className="entry"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <div className="entry__body">
                  <div className="entry__primary">{item.degree}</div>
                  <div className="entry__secondary">{item.school}</div>
                  <div className="entry__dates tnum">
                    {formatRange(item.start, item.end)}
                  </div>
                </div>
                <div className="entry__actions">
                  <Button
                    variant="quiet"
                    size="sm"
                    icon="edit"
                    label={`Editar ${item.degree}`}
                    onClick={() => {
                      setOpenForm(item.id)
                      setStatus('')
                    }}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    icon="trash"
                    label={`Eliminar ${item.degree}`}
                    onClick={() => handleRemove(item.id, item.degree)}
                  />
                </div>
              </li>
            ),
          )}
        </ul>
      )}

      {openForm === 'new' && (
        <EducationEntryForm
          initial={EMPTY_EDUCATION}
          onSave={handleAdd}
          onCancel={() => setOpenForm(null)}
        />
      )}
    </SectionShell>
  )
}
