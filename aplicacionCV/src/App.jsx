import { useState } from 'react'
import Workbench from './components/Workbench.jsx'
import GeneralInfoSection from './components/general/GeneralInfoSection.jsx'
import EducationSection from './components/education/EducationSection.jsx'
import ExperienceSection from './components/experience/ExperienceSection.jsx'
import CvSheet from './components/preview/CvSheet.jsx'
import Button from './components/ui/Button.jsx'
import {
  EMPTY_GENERAL,
  SAMPLE_EDUCATION,
  SAMPLE_EXPERIENCE,
  SAMPLE_GENERAL,
} from './lib/sampleCv.js'

const newId = () =>
  crypto.randomUUID?.() ??
  `id-${Date.now()}-${Math.random().toString(16).slice(2)}`

// El currículum entero vive aquí y baja por props. Es a propósito: el ejercicio
// va de state y props, así que no hay context ni reducers de librería.
export default function App() {
  const [general, setGeneral] = useState(SAMPLE_GENERAL)
  const [generalEditing, setGeneralEditing] = useState(false)
  const [education, setEducation] = useState(SAMPLE_EDUCATION)
  const [experience, setExperience] = useState(SAMPLE_EXPERIENCE)
  const [flash, setFlash] = useState(null)
  const [sessionKey, setSessionKey] = useState(0)

  const signal = (section) => setFlash({ section, token: Date.now() })

  function submitGeneral(value) {
    setGeneral(value)
    setGeneralEditing(false)
    signal('general')
  }

  function addEducation(entry) {
    setEducation([...education, { ...entry, id: newId() }])
    signal('education')
  }

  function updateEducation(id, entry) {
    setEducation(
      education.map((item) => (item.id === id ? { ...entry, id } : item)),
    )
    signal('education')
  }

  function removeEducation(id) {
    setEducation(education.filter((item) => item.id !== id))
    signal('education')
  }

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

  // Cambiar de currículum entero debe tirar también el estado local de las
  // secciones: borradores a medio escribir y formularios abiertos. Cambiar la
  // key las remonta limpias.
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

      <div className="rail__footer">
        <span className="eyebrow">Empezar de nuevo</span>
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
