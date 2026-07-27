/** Utilidades de fecha compartidas por el rail y la hoja. */

const MONTHS = [
  'ene',
  'feb',
  'mar',
  'abr',
  'may',
  'jun',
  'jul',
  'ago',
  'sep',
  'oct',
  'nov',
  'dic',
]

/** `"2023-04"` → `"abr 2023"`. Devuelve cadena vacía si el valor no es válido. */
export function formatMonth(value) {
  if (!value) return ''
  const [year, month] = value.split('-')
  const index = Number(month) - 1
  if (!year || Number.isNaN(index) || !MONTHS[index]) return value
  return `${MONTHS[index]} ${year}`
}

/**
 * Compone el rango que se imprime en la hoja.
 * `end === null` significa «en la actualidad».
 */
export function formatRange(start, end) {
  const from = formatMonth(start)
  const to = end === null ? 'actualidad' : formatMonth(end)
  if (!from && !to) return ''
  if (!from) return to
  if (!to) return from
  return `${from} — ${to}`
}

/** Ordena de más reciente a más antiguo; «actualidad» va siempre arriba. */
export function byMostRecent(a, b) {
  const keyOf = (item) => (item.end === null ? '9999-99' : item.end || item.start)
  return keyOf(b).localeCompare(keyOf(a))
}
