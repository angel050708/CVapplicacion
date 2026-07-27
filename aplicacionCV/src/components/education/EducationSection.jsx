import EntryListSection from '../ui/EntryListSection.jsx'
import EducationEntryForm from './EducationEntryForm.jsx'

export default function EducationSection({ items, onAdd, onUpdate, onRemove }) {
  return (
    <EntryListSection
      number="06"
      title="Formación"
      items={items}
      Form={EducationEntryForm}
      describe={(item) => ({ primary: item.degree, secondary: item.school })}
      emptyTitle="La hoja aún no tiene formación"
      emptyBody="Añade el centro, la titulación y el periodo. Puedes registrar tantas etapas como quieras y reordenarlas después cambiando sus fechas."
      messages={{
        added: 'Formación añadida a la hoja.',
        updated: 'Formación actualizada.',
        removed: (label) => `Se retiró «${label}» de la hoja.`,
      }}
      onAdd={onAdd}
      onUpdate={onUpdate}
      onRemove={onRemove}
    />
  )
}
