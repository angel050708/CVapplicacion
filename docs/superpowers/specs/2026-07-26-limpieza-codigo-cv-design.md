# Limpieza del código de la CV Application

Fecha: 2026-07-26
Estado: aprobado por el usuario, pendiente de implementar

## Problema

La app funciona y pasa lint, build y las comprobaciones de navegador. Pero el código
se lee como generado, no como escrito:

- **152 líneas de comentario sobre 2.204** (~7 %), concentradas donde más cantan:
  `FlashWash.jsx` 8 de 14 líneas, `SheetSection.jsx` 7 de 19, `lib/entries.js` 6 de 21.
  Casi todas describen lo que el código ya dice.
- `EducationSection.jsx` (126 l) y `ExperienceSection.jsx` (131 l) son el mismo
  componente con distintos sustantivos: mismo estado, mismos handlers, misma lista.
- `lib/entries.js` existe solo para esquivar una regla de lint, y lo documenta.
- Detalles sueltos: estilos incrustados en el JSX, una clase CSS reutilizada fuera
  de su sentido, `print.css` importado desde un componente que no le corresponde.

Objetivo: que el código parezca escrito por una persona, con un orden estable y sin
narración. **Sin cambiar ni el comportamiento ni el diseño visual.**

## Criterio de comentarios

Sobrevive un comentario solo si el código engaña a quien lo lee. Todo lo descriptivo
—lo que se deduce del nombre de la función o de la línea siguiente— se borra, igual
que los separadores decorativos `/* --- Sección --- */` de los CSS.

Se quedan estos cuatro, que documentan decisiones que el próximo lector rompería:

| Dónde | Qué explica |
|---|---|
| `FlashWash.jsx` | La `key` cambiante remonta el span para reiniciar la animación |
| `print.css` | El prefijo `html` gana especificidad porque el orden de inyección no es estable |
| `App.jsx` | `sessionKey` remonta las secciones para tirar sus borradores |
| `App.jsx` | El estado vive aquí a propósito (ejercicio de state y props), no es deuda |

Objetivo: ~20 líneas de comentario en todo el árbol.

## Cambios

### 1. Extraer `components/ui/EntryListSection.jsx`

Absorbe lo que hoy está duplicado: el estado `openForm` (`null` | `'new'` | id), el
estado `status`, los tres handlers, el renderizado de la lista con sus botones de
editar y eliminar, el estado vacío y el botón «Añadir».

API (el formulario entra como prop de componente, no como render prop):

```jsx
<EntryListSection
  number="02"
  title="Formación"
  items={items}
  Form={EducationEntryForm}
  describe={(item) => ({ primary: item.degree, secondary: item.school })}
  labelOf={(item) => item.degree}
  emptyTitle="La hoja aún no tiene formación"
  emptyBody="Añade el centro, la titulación y el periodo…"
  messages={{ added: '…', updated: '…', removed: (label) => `…${label}…` }}
  onAdd={onAdd}
  onUpdate={onUpdate}
  onRemove={onRemove}
/>
```

El rango de fechas lo compone el propio armazón con `formatRange(item.start, item.end)`,
igual en ambas secciones, así que no entra por `describe`.

`EducationSection.jsx` y `ExperienceSection.jsx` quedan en ~40 líneas: solo su
configuración. Los dos `*EntryForm` siguen separados — tienen campos distintos de verdad.

### 2. Borrar `lib/entries.js`

La regla `react-refresh/only-export-components` solo se dispara con *exports*.
`EMPTY_EDUCATION` y `EMPTY_EXPERIENCE` pasan a ser constantes **no exportadas** en su
formulario correspondiente, donde ya se usan como valor por defecto de `initial`.

Las secciones dejan de importarlas: hoy pasan `initial={EMPTY_EDUCATION}` al abrir el
formulario de alta, que es exactamente el valor por defecto del parámetro.

### 3. Extraer `lib/sampleCv.js`

Los datos de ejemplo (Ada Lovelace, una formación, dos experiencias) salen de `App.jsx`.
Exporta `SAMPLE_GENERAL`, `SAMPLE_EDUCATION`, `SAMPLE_EXPERIENCE` y `EMPTY_GENERAL`.
`App.jsx` baja de 195 a ~110 líneas y queda siendo solo estado y handlers.

### 4. Higiene suelta

- `print.css` se importa desde `main.jsx` junto a `styles/index.css`, no desde
  `Workbench.jsx`. Es una hoja global, no la de ese componente.
- `style={{ padding: '0.75rem 0' }}` en las secciones → clase `.entry--editing` en
  `section.css`. El `animationDelay` calculado se queda inline: es dinámico de verdad.
- El bloque «Empezar de nuevo» de `App.jsx` deja de reutilizar `.rail__intro` y pasa a
  `.rail__footer` en `workbench.css`.
- Imports en el mismo orden en todos los archivos: react → componentes → lib → estilos.
- Se retiran los imports de CSS redundantes (una hoja ya importada por un componente
  padre del mismo árbol de estilos).

## Fuera de alcance

La arquitectura de estado, el diseño visual, los nombres de clases CSS, el reparto de
archivos en `styles/` y cualquier cambio de comportamiento observable.

## Verificación

Es una refactorización: el criterio de éxito es que **nada cambie**.

1. `npm run lint` — sin errores.
2. `npm run build` — sin errores.
3. `python scratchpad/check_cv.py` contra el servidor de desarrollo, que ya cubre:
   editar y reenviar datos personales con valores precargados, validación de correo,
   alta de formación, borrado de experiencia, vaciar y recargar el ejemplo, 375 px sin
   scroll horizontal, y la vista de impresión sin el chrome del editor. Consola sin
   errores ni warnings.
4. Recuento final de comentarios ≈ 20 líneas.
