import { useEffect, useState } from 'react'
import Button from './ui/Button.jsx'
import '../styles/workbench.css'
import '../styles/print.css'

function readInitialTheme() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

/**
 * Layout del taller: cabecera fina, rail de edición a la izquierda y la mesa
 * con la hoja a la derecha. En pantallas estrechas la hoja se pliega tras un
 * conmutador para que el editor no quede empujado hacia abajo.
 */
export default function Workbench({ rail, sheet }) {
  const [theme, setTheme] = useState(readInitialTheme)
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('cv-theme', theme)
  }, [theme])

  return (
    <div className="workbench">
      <header className="masthead">
        <div className="masthead__mark">
          <span className="eyebrow">Taller de composición</span>
          <h1 className="masthead__title">Currículum</h1>
        </div>

        <div className="masthead__actions">
          <Button
            variant="ghost"
            icon={theme === 'dark' ? 'sun' : 'moon'}
            label={theme === 'dark' ? 'Usar tema claro' : 'Usar tema oscuro'}
            aria-pressed={theme === 'dark'}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
          <Button variant="ghost" icon="print" onClick={() => window.print()}>
            Imprimir
          </Button>
        </div>
      </header>

      <div className="workbench__body">
        <aside className="rail" aria-label="Editor del currículum">
          <div className="rail__intro">
            <span className="eyebrow">Cómo funciona</span>
            <p>
              Rellena cada sección y pulsa <strong>Enviar</strong>: los campos
              se retiran y el texto queda compuesto en la hoja. Pulsa{' '}
              <strong>Editar</strong> para recuperarlos con lo que ya
              escribiste.
            </p>
          </div>
          {rail}
        </aside>

        <main className="stage" data-collapsed={!sheetOpen}>
          {sheet}
        </main>

        <div className="stage-toggle">
          <Button
            variant="ghost"
            icon="sheet"
            aria-expanded={sheetOpen}
            onClick={() => setSheetOpen((open) => !open)}
          >
            {sheetOpen ? 'Ocultar la hoja' : 'Ver la hoja'}
          </Button>
        </div>
      </div>
    </div>
  )
}
