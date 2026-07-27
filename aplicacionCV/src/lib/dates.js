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

export function formatMonth(value) {
  if (!value) return ''
  const [year, month] = value.split('-')
  const index = Number(month) - 1
  if (!year || Number.isNaN(index) || !MONTHS[index]) return value
  return `${MONTHS[index]} ${year}`
}

export function formatRange(start, end) {
  const from = formatMonth(start)
  const to = end === null ? 'actualidad' : formatMonth(end)
  if (!from && !to) return ''
  if (!from) return to
  if (!to) return from
  return `${from} — ${to}`
}

// Más reciente primero; «actualidad» siempre arriba.
export function byMostRecent(a, b) {
  const keyOf = (item) =>
    item.end === null ? '9999-99' : item.end || item.start
  return keyOf(b).localeCompare(keyOf(a))
}
