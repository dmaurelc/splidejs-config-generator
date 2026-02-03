# Secciones de Configuración - SplideJS Config Generator

Este documento describe la organización de las secciones de configuración del generador, basada en la documentación oficial de [SplideJS](https://splidejs.com/options/).

## Filosofía de Agrupación

Las secciones están organizadas siguiendo el flujo mental típico de un usuario configurando un slider:

1. **Definición básica** (tipo, dimensiones)
2. **Organización de contenido** (cuántos slides, espaciado)
3. **Controles de navegación** (flechas, paginación, teclado)
4. **Interacción táctil** (drag, flick, snap)
5. **Automatización** (autoplay)
6. **Animaciones** (velocidad, easing)
7. **Avanzado** (rendimiento, clonación, casos especiales)

---

## 1. Slider & Dimensions

Configuración fundamental que define qué tipo de slider es y sus dimensiones base.

### Opciones

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `type` | select | `loop` | Tipo de slider: `slide` (normal), `loop` (infinito), `fade` (desvanecimiento) |
| `width` | dimension | - | Ancho del slider. Unidades: px, rem, em, %, vw |
| `height` | dimension | `400px` | Alto del slider. Unidades: px, rem, em, %, vh |
| `direction` | select | `ltr` | Dirección de desplazamiento: `ltr` (izquierda-derecha), `rtl` (derecha-izquierda), `ttb` (arriba-abajo) |
| `start` | number | `0` | Índice del slide inicial |

### Referencia Oficial

- [type - SplideJS](https://splidejs.com/options/#type)
- [width - SplideJS](https://splidejs.com/options/#width)
- [height - SplideJS](https://splidejs.com/options/#height)
- [direction - SplideJS](https://splidejs.com/options/#direction)
- [start - SplideJS](https://splidejs.com/options/#start)

---

## 2. Slide Layout

Define cómo se organizan los slides dentro del slider: cantidad, espaciado y padding interno.

### Opciones

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `perPage` | number | `1` | Cuántos slides mostrar por página |
| `perMove` | number | `1` | Cuántos slides mover por cada acción de navegación |
| `gap` | dimension | `1rem` | Espacio entre slides. Unidades: px, rem, em, % |
| `focus` | select | `0` | Cuál slide enfocar: `0`, `1`, `2`, `3`, o `center` |
| `paddingType` | select | `horizontal` | Dirección del padding: `horizontal` o `vertical` |
| `paddingUnit` | select | `px` | Unidad de padding: px, rem, %, em, vw |
| `paddingLeft` | number | `0` | Padding izquierdo en la unidad especificada |
| `paddingRight` | number | `0` | Padding derecho en la unidad especificada |
| `paddingTop` | number | `0` | Padding superior en la unidad especificada |
| `paddingBottom` | number | `0` | Padding inferior en la unidad especificada |

### Referencia Oficial

- [perPage - SplideJS](https://splidejs.com/options/#perPage)
- [perMove - SplideJS](https://splidejs.com/options/#perMove)
- [gap - SplideJS](https://splidejs.com/options/#gap)
- [focus - SplideJS](https://splidejs.com/options/#focus)
- [padding - SplideJS](https://splidejs.com/options/#padding)

---

## 3. Navigation

Controles visuales y de teclado para navegar entre slides.

### Opciones

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `arrows` | boolean | `true` | Mostrar flechas de navegación anterior/siguiente |
| `pagination` | boolean | `true` | Mostrar puntos indicadores de paginación |
| `keyboard` | select | `false` | Navegación por teclado: `false` (deshabilitado), `true` (solo cuando enfocado), `global` (siempre activo) |

### Referencia Oficial

- [arrows - SplideJS](https://splidejs.com/options/#arrows)
- [pagination - SplideJS](https://splidejs.com/options/#pagination)
- [keyboard - SplideJS](https://splidejs.com/options/#keyboard)

---

## 4. Drag & Touch

Control de la interacción mediante arrastre de mouse y gestos táctiles en dispositivos móviles.

### Opciones

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `drag` | boolean | `true` | Permitir arrastre con mouse y gestos táctiles |
| `dragMode` | select | `true` | Modo de arrastre: `true` (normal), `"free"` (movimiento libre sin snap) |
| `snap` | boolean | `false` | Ajustar al slide más cercano después de arrastrar |
| `flickPower` | number | `600` | Potencia del gesto flick (valores alrededor de 500-600 recomendados) |
| `flickMaxPages` | number | `1` | Máximo número de páginas a mover con un gesto flick |

### Referencia Oficial

- [drag - SplideJS](https://splidejs.com/options/#drag)
- [snap - SplideJS](https://splidejs.com/options/#snap) (no documentado explícitamente, relacionado con drag)
- [flickPower - SplideJS](https://splidejs.com/options/#flickPower)
- [flickMaxPages - SplideJS](https://splidejs.com/options/#flickMaxPages)

---

## 5. Autoplay

Configuración de reproducción automática del slider.

### Opciones

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `autoplay` | boolean | `false` | Habilitar reproducción automática |
| `interval` | number | `5000` | Intervalo entre transiciones en milisegundos |
| `pauseOnHover` | boolean | `true` | Pausar autoplay cuando el mouse está sobre el slider |
| `pauseOnFocus` | boolean | `true` | Pausar autoplay cuando elementos del slider tienen foco (recomendado para accesibilidad) |

### Referencia Oficial

- [autoplay - SplideJS](https://splidejs.com/options/#autoplay)
- [interval - SplideJS](https://splidejs.com/options/#interval)
- [pauseOnHover - SplideJS](https://splidejs.com/options/#pauseOnHover)
- [pauseOnFocus - SplideJS](https://splidejs.com/options/#pauseOnFocus)

---

## 6. Transitions

Velocidad, easing y comportamiento de las animaciones de transición entre slides.

### Opciones

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `speed` | number | `400` | Duración de la transición en milisegundos |
| `rewindSpeed` | number | `400` | Duración de la transición al rebobinar (0 usa `speed`) |
| `easing` | select | `cubic-bezier(0.25, 1, 0.5, 1)` | Función de easing CSS para la animación |
| `rewind` | boolean | `false` | Rebobinar al primer slide después del último (ignorado en modo loop) |
| `rewindByDrag` | boolean | `false` | Permitir rebobinar arrastrando más allá del primer/último slide |
| `waitForTransition` | boolean | `false` | Bloquear acciones mientras una transición está en curso |

### Referencia Oficial

- [speed - SplideJS](https://splidejs.com/options/#speed)
- [rewindSpeed - SplideJS](https://splidejs.com/options/#rewindSpeed)
- [easing - SplideJS](https://splidejs.com/options/#easing)
- [rewind - SplideJS](https://splidejs.com/options/#rewind)
- [waitForTransition - SplideJS](https://splidejs.com/options/#waitForTransition)

---

## 7. Advanced

Opciones avanzadas de rendimiento, clonación para modo loop, y comportamientos especiales.

### Opciones

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `lazyLoad` | select | `false` | Carga diferida de imágenes: `false`, `true`, `"nearby"`, `"sequential"` |
| `preloadPages` | number | `1` | Número de páginas a precargar alrededor del slide activo (solo con lazyLoad="nearby") |
| `clones` | number | - | Número de clones a generar por lado (normalmente no es necesario modificar) |
| `cloneStatus` | boolean | `true` | Aplicar clase especial a slides clonados |
| `isNavigation` | boolean | `false` | Marcar este slider como navegación para otro slider (usado en thumbnails) |
| `trimSpace` | boolean | `true` | Recortar espacios antes del primer slide y después del último |
| `updateOnMove` | boolean | `false` | Actualizar clase `is-active` antes de completar la transición |
| `destroy` | boolean | `false` | Destruir el slider en este breakpoint (para responsive) |

### Referencia Oficial

- [lazyLoad - SplideJS](https://splidejs.com/options/#lazyLoad)
- [preloadPages - SplideJS](https://splidejs.com/options/#preloadPages)
- [clones - SplideJS](https://splidejs.com/options/#clones)
- [isNavigation - SplideJS](https://splidejs.com/options/#isNavigation)
- [trimSpace - SplideJS](https://splidejs.com/options/#trimSpace)
- [updateOnMove - SplideJS](https://splidejs.com/options/#updateOnMove)
- [destroy - SplideJS](https://splidejs.com/options/#destroy) (en breakpoints)

---

## Cambios vs Organización Anterior

### Secciones Eliminadas
- ~~Basic~~ → Distribuido entre Slider & Dimensions y Slide Layout
- ~~Layout~~ → Fusionado en Slider & Dimensions
- ~~Padding~~ → Fusionado en Slide Layout
- ~~Timing~~ → Dividido entre Autoplay y Transitions
- ~~Controls~~ → Dividido entre Navigation, Drag & Touch y Transitions
- ~~Clones~~ → Fusionado en Advanced
- ~~Keyboard~~ → Fusionado en Navigation

### Secciones Nuevas
- **Slider & Dimensions**: Configuración fundamental del slider
- **Slide Layout**: Organización de slides y espaciado
- **Navigation**: Controles de navegación UI y teclado
- **Drag & Touch**: Interacción táctil (nueva categoría)
- **Autoplay**: Reproducción automática (separado de timing)
- **Transitions**: Animaciones y velocidad
- **Advanced**: Opciones avanzadas (renombrado, contenido similar)

---

## Verificación

✓ **41 opciones preservadas** - Sin eliminar ni agregar opciones
✓ **Todas las opciones mapeadas** - Cada opción tiene una nueva sección asignada
✓ **Nombres coherentes** - Cada sección tiene un propósito claro
✓ **Basado en documentación oficial** - Siguiendo la estructura de SplideJS

---

## Referencias

- [SplideJS Options](https://splidejs.com/options/)
- [SplideJS Documentation](https://splidejs.com/documents/)
- [SplideJS GitHub](https://github.com/Splidejs/splide)
