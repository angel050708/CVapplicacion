import { useState } from 'react'
import SectionShell from '../ui/SectionShell.jsx'
import Button from '../ui/Button.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import ExperienceEntryForm from './ExperienceEntryForm.jsx'
import { EMPTY_EXPERIENCE } from '../../lib/entries.js'
import { formatRange } from '../../lib/dates.js'
import '../../styles/section.css'

/**
 * Sección 3 — experiencia.
 *
 * Misma mecánica que Formación: los datos son props de App, y el único estado
 * local es qué formulario está abierto.
 */
export default function ExperienceSection({
  items,
  onAdd,
  onUpdate,
  onRemove,
}) {
  const [openForm, setOpenForm] = useState(null)
  const [status, setStatus] = useState('')

  function handleAdd(entry) {
    onAdd(entry)
    setOpenForm(null)
    setStatus('Experiencia añadida a la hoja.')
  }

  function handleUpdate(id, entry) {
    onUpdate(id, entry)
    setOpenForm(null)
    setStatus('Experiencia actualizada.')
  }

  function handleRemove(id, role) {
    onRemove(id)
    if (openForm === id) setOpenForm(null)
    setStatus(`Se retiró «${role}» de la hoja.`)
  }

  return (
    <SectionShell
      number="03"
      title="Experiencia"
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
        <EmptyState title="La hoja aún no tiene experiencia">
          Empresa, puesto, periodo y qué hacías allí. Escribe una
          responsabilidad por línea: cada una se compone como un punto en la
          hoja.
        </EmptyState>
      )}

      {items.length > 0 && (
        <ul className="entry-list">
          {items.map((item, index) =>
            openForm === item.id ? (
              <li key={item.id} style={{ padding: '0.75rem 0' }}>
                <ExperienceEntryForm
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
                  <div className="entry__primary">{item.role}</div>
                  <div className="entry__secondary">{item.company}</div>
                  <div className="entry__dates tnum">
                    {formatRange(item.start, item.end)}
                  </div>
                </div>
                <div className="entry__actions">
                  <Button
                    variant="quiet"
                    size="sm"
                    icon="edit"
                    label={`Editar ${item.role}`}
                    onClick={() => {
                      setOpenForm(item.id)
                      setStatus('')
                    }}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    icon="trash"
                    label={`Eliminar ${item.role}`}
                    onClick={() => handleRemove(item.id, item.role)}
                  />
                </div>
              </li>
            ),
          )}
        </ul>
      )}

      {openForm === 'new' && (
        <ExperienceEntryForm
          initial={EMPTY_EXPERIENCE}
          onSave={handleAdd}
          onCancel={() => setOpenForm(null)}
        />
      )}
    </SectionShell>
  )
}
