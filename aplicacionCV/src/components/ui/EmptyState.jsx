import '../../styles/section.css'

/** Estado vacío con texto que explica qué hacer, no un «sin elementos». */
export default function EmptyState({ title, children }) {
  return (
    <div className="empty-state">
      <p className="empty-state__title">{title}</p>
      <p className="empty-state__body">{children}</p>
    </div>
  )
}
