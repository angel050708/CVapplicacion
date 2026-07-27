import FlashWash from './FlashWash.jsx'
import '../../styles/sheet.css'

export default function SheetSection({ title, flashToken, children }) {
  return (
    <section className="sheet-section">
      <FlashWash token={flashToken} />
      <h3 className="sheet-section__title">{title}</h3>
      {children}
    </section>
  )
}
