import '../../styles/section.css'

export default function EmptyState({ title, children }) {
  return (
    <div className="empty-state">
      <p className="empty-state__title">{title}</p>
      <p className="empty-state__body">{children}</p>
    </div>
  )
}
