import Icon from './Icon.jsx'
import '../../styles/section.css'

/**
 * Envoltura común de las tres secciones del rail: numeración de imprenta,
 * título en versalitas, hueco para acciones y una línea de estado que se
 * anuncia a los lectores de pantalla tras enviar.
 */
export default function SectionShell({
  number,
  title,
  actions,
  status,
  children,
}) {
  return (
    <section className="section" aria-labelledby={`section-${number}`}>
      <header className="section__head">
        <div className="section__label">
          <span className="section__number tnum" aria-hidden="true">
            {number}
          </span>
          <h2 className="section__title" id={`section-${number}`}>
            {title}
          </h2>
        </div>
        {actions && <div className="entry__actions">{actions}</div>}
      </header>

      {children}

      <p className="section__status" role="status" aria-live="polite">
        {status && (
          <>
            <Icon name="check" size={13} />
            {status}
          </>
        )}
      </p>
    </section>
  )
}
