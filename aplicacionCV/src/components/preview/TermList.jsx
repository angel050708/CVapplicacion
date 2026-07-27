import { Fragment } from 'react'
import '../../styles/sheet.css'

export default function TermList({ className, items, render = (item) => item }) {
  return (
    <p className={className}>
      {items.map((item, index) => (
        <Fragment key={item}>
          {index > 0 && (
            <span className="term-sep" aria-hidden="true">
              ·
            </span>
          )}
          {render(item)}
        </Fragment>
      ))}
    </p>
  )
}
