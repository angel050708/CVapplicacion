# Currículum — taller de composición

Editor de currículums. A la izquierda se rellenan los datos; a la derecha se
compone la hoja en tiempo real, con proporción A4 y lista para imprimir.

Las secciones de datos —personales, formación y experiencia— alternan entre
formulario y lectura: **Enviar** retira los campos y compone el texto en la
hoja, **Editar** los devuelve con lo ya escrito para corregirlo y reenviarlo.
Las de competencias funcionan como lista de términos: se escriben y se quitan
uno a uno, y se componen al pie del currículum a dos columnas.

Implementa el proyecto [CV Application](https://www.theodinproject.com/lessons/node-path-react-new-cv-application)
de The Odin Project.

## Uso

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint
npm run build
```

`Ctrl+P` imprime solo el currículum, sin la interfaz del editor.

## Estructura

```
src/
  App.jsx              estado del currículum y sus manejadores
  components/
    Workbench.jsx      layout, tema claro/oscuro, impresión
    general/           sección 1: datos personales
    education/         sección 2: formación
    experience/        sección 3: experiencia
    skills/            secciones 4 y 5: competencias técnicas y personales
    preview/           la hoja compuesta
    ui/                campos, botones y los armazones de sección
  lib/                 formato de fechas y datos de ejemplo
  styles/              una hoja por componente, más tokens e impresión
```

Todo el currículum vive en `App.jsx` y baja por props. Es deliberado: el
ejercicio practica state y props, así que no hay context ni gestores de estado
externos.

Stack: React 19, Vite y Tailwind v4 para los tokens, con CSS propio por
componente.
