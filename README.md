# <img align="center" src="./public/TuxUTNLogo.svg" alt="Tux UTN Icon" height="50px" width="50px"/>  Visualizador de Cursada UTN — v2.0.0
[![UTN](https://img.shields.io/badge/UTN--FRBA-E63946?style=flat-square)](https://www.frba.utn.edu.ar/) [![React](https://shields.io/badge/React-3178C6?logo=react&logoColor=FFF&style=flat-square)](https://www.react.dev) [![TypeScript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)](https://www.typescriptlang.org/) 

---

Herramienta personal de visualización académica. 
>Esta versión v2.0 representa la evolución directa de [modificar el DOM](https://github.com/RamonEnProceso/visualizador-cursada-UTN/releases/tag/1.0.0) a React.  


## <img align="center" src="./assets/Android_logo.webp" alt="React Logo" height="18px" width="35px"/> Objetivo de la Reescritura
El propósito de esta versión es eliminar la deuda técnica de la v1 y establecer un sistema que permita:
- **Correlativas**: Materias aprobadas que impactan simultáneamente en múltiples planes de estudio y desbloquean materias.

- **Performance**: Renderizado eficiente mediante el Virtual DOM de React

- **Mobile-First**: Diseño centrado en la usabilidad táctil y visualización compacta para el uso en pasillos de la facultad.


## 🏗️ Stack
- <img align="center" src="./assets/React_logo.webp" alt="React Logo" height="18px" width="20px"/> **React 18 (Vite)**: Implementación de componentes funcionales y Hooks para la lógica de estado.

- <img align="center" src="./assets/Typescript_logo.webp" alt="TypeScript Logo" height="18px" width="18px"/> **TypeScript**: Tipado nominal estricto para garantizar la integridad de los contratos de datos.

- <img align="center" src="./assets/JSON_logo.webp" alt="JSON Logo" height="18px" width="18px"/> **JSON v2**: Nuevo modelo de datos relacional para carreras y correlatividades.

- <img align="center" src="./assets/Chromium_logo.webp" alt="Chromium Logo" height="18px" width="18px"/> **LocalStorage API**: Persistencia de estado trans-sesión.

## 🛠️ Roadmap v2.0

#### Fase 1: Lógica y estructura
- [ ] Crear JSON global para evitar redundancia de datos.

- [ ] Consumo y validación del nuevo JSON.
  - [ ] Separar entre carreras y niveles.

- [ ] Botones para Cursar y Aprobar materias.

- [ ] Lógica de correlativas. Si ```correlativa_n != APROBADA```, el input de la materia actual queda inhabilitado.

- [ ] Poder ingresar la comisión y los horarios del usuario por materia.

#### Fase 2: 

- [ ] Guardar datos en ```localStorage```.

- [ ] Alternar entre visualización de materias aprobadas y pendientes.

- [ ] Barra de progreso en la carrera seleccionada.

#### Fase 3:

- [ ] Notificación de horario de cursada según los datos ingresado.

- [ ] Agregar efectos visuales en la interfaz para motivar al usuario.


---

✍️ Esta versión viene a representar mi transición técnica en 2026, ya ingresado en la UTN y con mayor conocimiento en el apartado de interfaces.