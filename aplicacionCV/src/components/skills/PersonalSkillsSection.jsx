import TagListSection from '../ui/TagListSection.jsx'

export default function PersonalSkillsSection({ items, onAdd, onRemove }) {
  return (
    <TagListSection
      number="05"
      title="Competencias personales"
      items={items}
      addLabel="Nueva competencia personal"
      addButtonLabel="Añadir competencia personal"
      placeholder="Trabajo en equipo, autonomía…"
      emptyTitle="La hoja aún no tiene competencias personales"
      emptyBody="Cómo trabajas y cómo te relacionas. Mejor pocas y concretas que una lista larga de tópicos."
      messages={{
        added: (name) => `«${name}» añadida a la hoja.`,
        removed: (name) => `Se retiró «${name}» de la hoja.`,
      }}
      onAdd={onAdd}
      onRemove={onRemove}
    />
  )
}
