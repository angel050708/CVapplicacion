import { useState } from 'react'
import Workbench from './components/Workbench.jsx'
import GeneralInfoSection from './components/general/GeneralInfoSection.jsx'
import EducationSection from './components/education/EducationSection.jsx'
import ExperienceSection from './components/experience/ExperienceSection.jsx'
import CvSheet from './components/preview/CvSheet.jsx'
import Button from './components/ui/Button.jsx'

/**
 * App es el único dueño de los datos del currículum. Las secciones no guardan
 * nada del CV: reciben valores y manejadores por props y devuelven el resultado
 * al enviar. Es a propósito — el ejercicio va de state y props, así que aquí no
 * hay context ni reducers de librería.
 */

const EMPTY_GENERAL = { name: '', email: '', phone: '' }

const SAMPLE_GENERAL = {
  name: 'Ada Lovelace',
  email: 'ada@ejemplo.com',
  phone: '+34 600 12 34 56',
}

const SAMPLE_EDUCATION = [
  {
    id: 'sample-edu-1',
    school: 'Universidad de Salamanca',
    degree: 'Grado en Ingeniería Informática',
    start: '2016-09',
    end: '2020-06',
  },
]

const SAMPLE_EXPERIENCE = [
  {
    id: 'sample-exp-1',
    company: 'Imprenta Tipográfica S.L.',
    role: 'Desarrolladora front-end',
    duties:
      'Rediseño del catálogo de productos, con una mejora del 30 % en tiempo de carga\nSistema de componentes compartido entre las tres webs del grupo\nMentoría a dos personas en prácticas',
    start: '2022-03',
    end: null,
  },
  {
    id: 'sample-exp-2',
    company: 'Estudio Papel y Tinta',
    role: 'Desarrolladora junior',
    duties:
      'Maquetación de plantillas de correo compatibles con clientes antiguos\nMantenimiento del panel interno de pedidos',
    start: '2020-09',
    end: '2022-02',
  },
]

const newId = () =>
  crypto.randomUUID?.() ?? `id-${Date.now()}-${Math.random().toString(16).slice(2)}`

export default function App() {
  const [general, setGeneral] = useState(SAMPLE_GENERAL)
  const [generalEditing, setGeneralEditing] = useState(false)
  const [education, setEducation] = useState(SAMPLE_EDUCATION)
  const [experience, setExperience] = useState(SAMPLE_EXPERIENCE)

  // Señal efímera para que la hoja destaque la sección que acaba de cambiar.
  const [flash, setFlash] = useState(null)
  const signal = (section) => setFlash({ section, token: Date.now() })

  // Cambiar de currículum entero (vaciar o cargar el ejemplo) tiene que tirar
  // también el estado local de las secciones: borradores a medio escribir y
  // formularios abiertos. Cambiar la `key` las remonta limpias.
  const [sessionKey, setSessionKey] = useState(0)

  // --- Datos personales ---------------------------------------------------

  function submitGeneral(value) {
    setGeneral(value)
    setGeneralEditing(false)
    signal('general')
  }

  // --- Formación ----------------------------------------------------------

  function addEducation(entry) {
    setEducation([...education, { ...entry, id: newId() }])
    signal('education')
  }

  function updateEducation(id, entry) {
    setEducation(education.map((item) => (item.id === id ? { ...entry, id } : item)))
    signal('education')
  }

  function removeEducation(id) {
    setEducation(education.filter((item) => item.id !== id))
    signal('education')
  }

  // --- Experiencia --------------------------------------------------------

  function addExperience(entry) {
    setExperience([...experience, { ...entry, id: newId() }])
    signal('experience')
  }

  function updateExperience(id, entry) {
    setExperience(
      experience.map((item) => (item.id === id ? { ...entry, id } : item)),
    )
    signal('experience')
  }

  function removeExperience(id) {
    setExperience(experience.filter((item) => item.id !== id))
    signal('experience')
  }

  // --- Hoja en blanco -----------------------------------------------------

  function resetAll() {
    setGeneral(EMPTY_GENERAL)
    setGeneralEditing(true)
    setEducation([])
    setExperience([])
    setFlash(null)
    setSessionKey((key) => key + 1)
  }

  function loadSample() {
    setGeneral(SAMPLE_GENERAL)
    setGeneralEditing(false)
    setEducation(SAMPLE_EDUCATION)
    setExperience(SAMPLE_EXPERIENCE)
    setSessionKey((key) => key + 1)
    signal('general')
  }

  const isEmpty =
    !general.name && education.length === 0 && experience.length === 0

  const rail = (
    <>
      <GeneralInfoSection
        key={`general-${sessionKey}`}
        value={general}
        editing={generalEditing}
        onSubmit={submitGeneral}
        onEdit={() => setGeneralEditing(true)}
        // Solo se puede cancelar si ya hay algo enviado a lo que volver.
        onCancel={general.name ? () => setGeneralEditing(false) : undefined}
      />

      <EducationSection
        key={`education-${sessionKey}`}
        items={education}
        onAdd={addEducation}
        onUpdate={updateEducation}
        onRemove={removeEducation}
      />

      <ExperienceSection
        key={`experience-${sessionKey}`}
        items={experience}
        onAdd={addExperience}
        onUpdate={updateExperience}
        onRemove={removeExperience}
      />

      <div className="rail__intro">
        <span className="eyebrow">Empezar de nuevo</span>
        <div className="rail__reset">
          {isEmpty ? (
            <Button variant="ghost" size="sm" icon="undo" onClick={loadSample}>
              Cargar el ejemplo
            </Button>
          ) : (
            <Button variant="ghost" size="sm" icon="trash" onClick={resetAll}>
              Vaciar la hoja
            </Button>
          )}
        </div>
      </div>
    </>
  )

  const sheet = (
    <CvSheet
      general={general}
      education={education}
      experience={experience}
      flash={flash}
    />
  )

  return <Workbench rail={rail} sheet={sheet} />
}
