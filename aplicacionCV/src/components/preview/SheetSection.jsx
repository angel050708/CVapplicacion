import FlashWash from './FlashWash.jsx'
import '../../styles/sheet.css'

/**
 * Bloque tipográfico de la hoja: rótulo en versalitas con filete que corre
 * hasta el margen derecho, y las entradas debajo.
 *
 * `flashToken` llega con valor solo cuando el último envío afectó a esta
 * sección; entonces se pinta el lavado de acento.
 */
export default function SheetSection({ title, flashToken, children }) {
  return (
    <section className="sheet-section">
      <FlashWash token={flashToken} />
      <h3 className="sheet-section__title">{title}</h3>
      {children}
    </section>
  )
}
