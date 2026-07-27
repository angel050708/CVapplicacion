import '../../styles/sheet.css'

export default function FlashWash({ token }) {
  if (!token) return null
  // La key cambia en cada envío: remonta el span y la animación arranca de
  // cero incluso en envíos seguidos a la misma sección.
  return <span key={token} className="flash-wash" aria-hidden="true" />
}
