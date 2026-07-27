/**
 * Formas vacías de cada tipo de entrada.
 *
 * Viven aquí y no junto a sus formularios porque un módulo que exporta un
 * componente no debe exportar además constantes: rompe el Fast Refresh de Vite.
 */

export const EMPTY_EDUCATION = {
  school: '',
  degree: '',
  start: '',
  end: '',
}

export const EMPTY_EXPERIENCE = {
  company: '',
  role: '',
  duties: '',
  start: '',
  end: '',
}
