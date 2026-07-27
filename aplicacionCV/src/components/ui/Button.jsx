import Icon from './Icon.jsx'
import '../../styles/form.css'

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
