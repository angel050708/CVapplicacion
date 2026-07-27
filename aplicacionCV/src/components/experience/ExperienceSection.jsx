import EntryListSection from '../ui/EntryListSection.jsx'
import ExperienceEntryForm from './ExperienceEntryForm.jsx'

export default function ExperienceSection({ items, onAdd, onUpdate, onRemove }) {
  return (
    <EntryListSection
      number="03"
      title="Experiencia"
      items={items}
      Form={ExperienceEntryForm}
      describe={(item) => ({ primary: item.role, secondary: item.company })}
      emptyTitle="La hoja aún no tiene experiencia"
      emptyBody="Empresa, puesto, periodo y qué hacías allí. Escribe una responsabilidad por línea: cada una se compone como un punto en la hoja."
      messages={{
        added: 'Experiencia añadida a la hoja.',
        updated: 'Experiencia actualizada.',
        removed: (label) => `Se retiró «${label}» de la hoja.`,
      }}
      onAdd={onAdd}
      onUpdate={onUpdate}
      onRemove={onRemove}
    />
  )
}
