import { Fragment } from 'react'
import SheetSection from './SheetSection.jsx'
import FlashWash from './FlashWash.jsx'
import { formatRange, byMostRecent } from '../../lib/dates.js'
import '../../styles/sheet.css'

/** Divide el textarea de responsabilidades en líneas imprimibles. */
function toLines(text) {
  return text
    .split('\n')
    .map((line) => line.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean)
}

export default function CvSheet({ general, education, experience, flash }) {
  // El token solo viaja a la sección que originó el último envío.
  const tokenFor = (section) =>
    flash && flash.section === section ? flash.token : null

  const hasName = Boolean(general.name)
  const contact = [general.email, general.phone].filter(Boolean)
  const isBlank = !hasName && education.length === 0 && experience.length === 0

  const sortedEducation = [...education].sort(byMostRecent)
  const sortedExperience = [...experience].sort(byMostRecent)

  return (
    <article className="sheet" aria-label="Vista previa del currículum">
      <header className="sheet__head">
        <FlashWash token={tokenFor('general')} />
        <h2 className="sheet__name" data-placeholder={!hasName || undefined}>
          {hasName ? general.name : 'Tu nombre aquí'}
        </h2>
        {contact.length > 0 && (
          <p className="sheet__contact">
            {contact.map((item, index) => (
              <Fragment key={item}>
                {/* El separador es un hermano más del flex, no va dentro del
                    dato: así el hueco a izquierda y derecha es el mismo. */}
                {index > 0 && (
                  <span className="sheet__contact-sep" aria-hidden="true">
                    ·
                  </span>
                )}
                {item.includes('@') ? (
                  <a href={`mailto:${item}`}>{item}</a>
                ) : (
                  <a href={`tel:${item.replace(/\s/g, '')}`}>{item}</a>
                )}
              </Fragment>
            ))}
          </p>
        )}
      </header>

      {isBlank && (
        <p className="sheet__blank">
          Esta hoja está en blanco. Rellena los datos del panel izquierdo y ve
          apareciendo aquí, compuesto, listo para imprimir.
        </p>
      )}

      {sortedExperience.length > 0 && (
        <SheetSection title="Experiencia" flashToken={tokenFor('experience')}>
          <ul className="sheet-entries">
            {sortedExperience.map((item, index) => {
              const duties = toLines(item.duties)
              return (
                <li
                  key={item.id}
                  className="sheet-entry"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <div className="sheet-entry__top">
                    <span className="sheet-entry__primary">{item.role}</span>
                    <span className="sheet-entry__dates">
                      {formatRange(item.start, item.end)}
                    </span>
                  </div>
                  <div className="sheet-entry__org">{item.company}</div>
                  {duties.length > 0 && (
                    <ul className="sheet-entry__duties">
                      {duties.map((duty) => (
                        <li key={duty}>{duty}</li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </SheetSection>
      )}

      {sortedEducation.length > 0 && (
        <SheetSection title="Formación" flashToken={tokenFor('education')}>
          <ul className="sheet-entries">
            {sortedEducation.map((item, index) => (
              <li
                key={item.id}
                className="sheet-entry"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <div className="sheet-entry__top">
                  <span className="sheet-entry__primary">{item.degree}</span>
                  <span className="sheet-entry__dates">
                    {formatRange(item.start, item.end)}
                  </span>
                </div>
                <div className="sheet-entry__org">{item.school}</div>
              </li>
            ))}
          </ul>
        </SheetSection>
      )}
    </article>
  )
}
