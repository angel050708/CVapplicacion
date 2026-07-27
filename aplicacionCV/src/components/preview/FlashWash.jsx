import '../../styles/sheet.css'

/**
 * Lavado de acento que señala en la hoja qué acaba de cambiar.
 *
 * Se monta un elemento nuevo por cada envío (la `key` es el token del envío) y
 * su animación se reproduce una sola vez al montarse. Así se relanza siempre,
 * incluso en envíos seguidos a la misma sección, sin temporizadores ni estado
 * que sincronizar — y sin remontar el contenido, que conserva su scroll y foco.
 */
export default function FlashWash({ token }) {
  if (!token) return null
  return <span key={token} className="flash-wash" aria-hidden="true" />
}
