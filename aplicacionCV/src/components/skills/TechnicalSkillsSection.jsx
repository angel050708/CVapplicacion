import TagListSection from '../ui/TagListSection.jsx'

export default function TechnicalSkillsSection({ items, onAdd, onRemove }) {
  return (
    <TagListSection
      number="04"
      title="Competencias técnicas"
      items={items}
      addLabel="Nueva competencia técnica"
      addButtonLabel="Añadir competencia técnica"
      placeholder="React, PostgreSQL, Figma…"
      emptyTitle="La hoja aún no tiene competencias técnicas"
      emptyBody="Lenguajes, frameworks y herramientas con los que trabajas. Se componen como una línea de términos al pie del currículum."
      messages={{
        added: (name) => `«${name}» añadida a la hoja.`,
        removed: (name) => `Se retiró «${name}» de la hoja.`,
      }}
      onAdd={onAdd}
      onRemove={onRemove}
    />
  )
}
