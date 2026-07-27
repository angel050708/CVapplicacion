import Icon from './Icon.jsx'
import '../../styles/form.css'

/**
 * Botón único de la app. `icon` sin `children` produce un botón cuadrado, y en
 * ese caso `label` es obligatorio: es lo que lee el lector de pantalla y lo que
 * muestra el tooltip nativo.
 */
export default function Button({
  children,
  variant = 'ghost',
  size,
  icon,
  label,
  type = 'button',
  ...rest
}) {
  const iconOnly = icon && !children

  const classes = [
    'btn',
    `btn--${variant}`,
    size === 'sm' && 'btn--sm',
    iconOnly && 'btn--icon',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      aria-label={iconOnly ? label : undefined}
      title={iconOnly ? label : undefined}
      {...rest}
    >
      {icon && <Icon name={icon} size={size === 'sm' ? 14 : 16} />}
      {children}
    </button>
  )
}
