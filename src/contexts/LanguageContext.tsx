import React, { createContext, useContext, useState } from "react";

export type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string, params?: Record<string, string | number>): string => {
    const translationDict = translations[language] as Record<string, string>;
    let translation = translationDict[key] || key;

    if (params) {
      Object.keys(params).forEach((param) => {
        translation = translation.replace(`{${param}}`, String(params[param]));
      });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  es: {
    // Header
    "app.title": "SplideJS",
    "language.selector": "Idioma",
    "theme.toggle": "Cambiar tema",
    "theme.light": "Claro",
    "theme.dark": "Oscuro",
    "theme.system": "Sistema",

    // Footer
    "footer.madeWith": "Hecho con 🤘 por",
    "footer.author": "Daniel MC",

    // Config Sections
    "section.sliderDimensions": "Slider y Dimensiones",
    "section.slideLayout": "Disposición de Slides",
    "section.navigation": "Navegación",
    "section.dragTouch": "Arrastre y Táctil",
    "section.autoplay": "Reproducción Automática",
    "section.transitions": "Transiciones",
    "section.accessibility": "Accesibilidad",
    "section.advanced": "Opciones Avanzadas",

    // Preview
    "preview.title": "Vista Previa",
    "preview.desktop": "Escritorio",
    "preview.laptop": "Laptop",
    "preview.tablet": "Tablet",
    "preview.mobile": "Móvil",
    "preview.totalSlides": "Total slides",
    "preview.fullscreen": "Pantalla completa",
    "preview.exitFullscreen": "Salir de pantalla completa",
    "preview.paginationInfo":
      "{dots} dots ({slides} slides, {perPage} por página)",
    "preview.mobileMessage":
      "Para un mayor control de breakpoints, ingresa desde desktop.",

    // Basic Options
    "field.type": "Tipo",
    "field.type.desc": "Tipo de movimiento del slider",
    "field.perPage": "Slides por Página",
    "field.perPage.desc": "Número de slides visibles por página",
    "field.perMove": "Slides por Movimiento",
    "field.perMove.desc": "Número de slides a mover por vez",
    "field.focus": "Enfoque",
    "field.focus.desc": 'Índice del slide a enfocar o "center" para centrar',
    "field.gap": "Espacio entre Slides",
    "field.gap.desc": "Espacio entre slides",
    "field.totalSlides": "Total de slides",
    "field.totalSlides.desc": "Número total de slides",

    // Dimensions
    "field.width": "Ancho",
    "field.width.desc": "Ancho del slider",
    "field.height": "Alto",
    "field.height.desc": "Alto del slider",
    "field.fixedWidth": "Ancho Fijo",
    "field.fixedWidth.desc": "Ancho fijo de los slides",
    "field.fixedHeight": "Alto Fijo",
    "field.fixedHeight.desc": "Alto fijo de los slides",
    "field.heightRatio": "Ratio de Alto",
    "field.heightRatio.desc": "Altura como ratio del ancho (0.3 = 30% del ancho)",
    "field.autoWidth": "Ancho Automático",
    "field.autoWidth.desc": "El ancho del slide se determina por el elemento",
    "field.autoHeight": "Alto Automático",
    "field.autoHeight.desc": "El alto del slide se determina por el elemento",

    // Layout
    "field.direction": "Dirección",
    "field.direction.desc": "Dirección del slider",
    "field.start": "Slide Inicial",
    "field.start.desc": "Índice del slide inicial",

    // Padding
    "field.paddingType": "Tipo de Padding",
    "field.paddingType.desc": "Tipo de espaciado a aplicar",
    "field.paddingUnit": "Unidad",
    "field.paddingUnit.desc": "Unidad de medida para el padding",
    "field.paddingLeft": "Padding Izquierdo",
    "field.paddingLeft.desc": "Espaciado izquierdo",
    "field.paddingRight": "Padding Derecho",
    "field.paddingRight.desc": "Espaciado derecho",
    "field.paddingTop": "Padding Superior",
    "field.paddingTop.desc": "Espaciado superior",
    "field.paddingBottom": "Padding Inferior",
    "field.paddingBottom.desc": "Espaciado inferior",

    // Timing
    "field.speed": "Velocidad",
    "field.speed.desc": "Duración de la transición en milisegundos",
    "field.interval": "Intervalo",
    "field.interval.desc": "Intervalo de autoplay en milisegundos",
    "field.autoplay": "Autoplay",
    "field.autoplay.desc": "Reproducción automática",
    "field.pauseOnHover": "Pausar al Pasar el Mouse",
    "field.pauseOnHover.desc": "Pausar autoplay al pasar el mouse",
    "field.pauseOnFocus": "Pausar al Enfocar",
    "field.pauseOnFocus.desc": "Pausar autoplay al enfocar el slider",
    "field.resetProgress": "Resetear Progreso",
    "field.resetProgress.desc": "Resetear el temporizador de autoplay al reanudar",

    // Controls
    "field.arrows": "Flechas",
    "field.arrows.desc": "Mostrar flechas de navegación",
    "field.pagination": "Paginación",
    "field.pagination.desc": "Mostrar puntos de paginación",
    "field.drag": "Arrastre",
    "field.drag.desc": "Habilitar arrastre para deslizar",
    "field.rewind": "Rebobinar",
    "field.rewind.desc": "Permitir rebobinar al final/inicio",
    "field.rewindByDrag": "Rebobinar por Arrastre",
    "field.rewindByDrag.desc": "Permitir rebobinar slides por arrastre",
    "field.rewindSpeed": "Velocidad de Rebobinado",
    "field.rewindSpeed.desc": "Velocidad de la animación de rebobinado",

    // Transitions
    "field.easing": "Función de Transición",
    "field.easing.desc": "Función de transición CSS para las animaciones",
    "field.dragMode": "Modo de Arrastre",
    "field.dragMode.desc":
      "Modo de arrastre. Free Mode permite arrastre libre sin snap automático",
    "field.snap": "Ajuste Automático",
    "field.snap.desc":
      "En modo free, ajusta automáticamente al slide más cercano",
    "field.flickPower": "Potencia del Flick",
    "field.flickPower.desc":
      'Controla qué tan lejos se mueve el slider con un "flick"',
    "field.flickMaxPages": "Máx. Páginas por Flick",
    "field.flickMaxPages.desc":
      "Límite de páginas que puede avanzar con un flick",
    "field.dragAngleThreshold": "Umbral de Ángulo de Arrastre",
    "field.dragAngleThreshold.desc": "Ángulo mínimo para iniciar el arrastre (grados)",
    "field.swipeDistanceThreshold": "Umbral de Distancia de Swipe",
    "field.swipeDistanceThreshold.desc": "Distancia mínima para considerar como swipe (px)",
    "field.flickVelocityThreshold": "Umbral de Velocidad de Flick",
    "field.flickVelocityThreshold.desc": "Velocidad mínima para considerar como flick",

    // Performance
    "field.lazyLoad": "Carga Diferida",
    "field.lazyLoad.desc":
      "Carga diferida de imágenes para mejorar el rendimiento",
    "field.preloadPages": "Páginas a Precargar",
    "field.preloadPages.desc":
      "Número de páginas a precargar (útil con lazy loading)",
    "field.waitForTransition": "Esperar Transición",
    "field.waitForTransition.desc":
      "Esperar que termine una transición antes de permitir otra acción",

    // Clones
    "field.clones": "Número de Clones",
    "field.clones.desc":
      "Número específico de clones a crear en cada lado (solo para modo loop)",
    "field.cloneStatus": "Estado de Clones",
    "field.cloneStatus.desc": 'Si agregar la clase "is-active" a los clones',

    // Keyboard
    "field.keyboard": "Control por Teclado",
    "field.keyboard.desc":
      "Configurar comportamiento de navegación por teclado",
    "field.arrowPath": "Path de Flecha",
    "field.arrowPath.desc": "Path SVG personalizado para las flechas de navegación",

    // Advanced
    "field.isNavigation": "Es Navegación",
    "field.isNavigation.desc": "Si este slider controla otro slider",
    "field.trimSpace": "Recortar Espacio",
    "field.trimSpace.desc": "Recortar espacio vacío al final. 'move' siempre mueve el slider",
    "field.updateOnMove": "Actualizar al Mover",
    "field.updateOnMove.desc": "Actualizar el slider al mover",
    "field.destroy": "Destruir",
    "field.destroy.desc": "Destruir el slider",
    "field.cover": "Cover",
    "field.cover.desc": "Convertir img src a background-image del padre",
    "field.throttle": "Throttle",
    "field.throttle.desc": "Throttle para el evento de resize (ms)",
    "field.accessibility": "Accesibilidad",
    "field.accessibility.desc": "Habilitar atributos ARIA y textos para screen reader",
    "field.slideFocus": "Focus en Slides",
    "field.slideFocus.desc": "Agregar tabindex=\"0\" a los slides visibles",
    "field.i18n": "Internacionalización",
    "field.i18n.desc": "Objeto JSON con textos para i18n (opcional)",

    // Options
    "option.slide": "Deslizar",
    "option.loop": "Bucle",
    "option.fade": "Desvanecer",
    "option.center": "Centro",
    "option.ltr": "Izquierda a Derecha",
    "option.rtl": "Derecha a Izquierda",
    "option.ttb": "Arriba a Abajo",
    "option.horizontal": "Horizontal",
    "option.vertical": "Vertical",
    "option.disabled": "Deshabilitado",
    "option.enabled": "Habilitado",
    "option.nearby": "Cercano",
    "option.sequential": "Secuencial",
    "option.whenFocused": "Al Enfocar",
    "option.global": "Global",
    "option.normal": "Normal",
    "option.freeMode": "Modo Libre",
    "option.default": "Por Defecto",
    "option.linear": "Lineal",
    "option.ease": "Suave",
    "option.easeIn": "Suave Entrada",
    "option.easeOut": "Suave Salida",
    "option.easeInOut": "Suave Entrada/Salida",
    "option.customCubic": "Cubic Bezier Personalizado",
    "option.trimTrue": "Activado",
    "option.trimFalse": "Desactivado",
    "option.trimMove": "Mover Siempre",

    // Code Output
    "code.title": "Código",
    "code.copy": "Copiar Código",
    "code.copied": "Código Copiado",
    "code.edit": "Editar",
    "code.save": "Guardar",
    "code.cancel": "Cancelar",
    "code.config_updated": "Configuración actualizada correctamente",
    "code.json_error": "Error al parsear JSON",
    "config.title": "Configuración",
    "config.reset": "Restablecer",
    "config.breakpoint_reset":
      "Breakpoint {breakpoint}px restablecido exitosamente",
    "config.all_reset":
      "Todas las configuraciones restablecidas a valores por defecto",
    "config.reset_breakpoint_tooltip":
      "Restablecer configuraciones del breakpoint {breakpoint}px",
    "config.reset_all_tooltip":
      "Restablecer todas las configuraciones a valores por defecto",

    // Additional options values
    "option.start": "Inicio",
    "option.end": "Final",
    "option.px": "Píxeles",
    "option.rem": "REM",
    "option.em": "EM",
    "option.%": "Porcentaje",
    "option.vw": "Ancho de Ventana",
    "option.vh": "Alto de Ventana",
    "option.auto": "Automático",
  },
  en: {
    // Header
    "app.title": "SplideJS",
    "language.selector": "Language",
    "theme.toggle": "Toggle theme",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",

    // Footer
    "footer.madeWith": "Made with 🤘 by",
    "footer.author": "Daniel MC",

    // Config Sections
    "section.sliderDimensions": "Slider & Dimensions",
    "section.slideLayout": "Slide Layout",
    "section.navigation": "Navigation",
    "section.dragTouch": "Drag & Touch",
    "section.autoplay": "Autoplay",
    "section.transitions": "Transitions",
    "section.accessibility": "Accessibility",
    "section.advanced": "Advanced",

    // Preview
    "preview.title": "Preview",
    "preview.desktop": "Desktop",
    "preview.laptop": "Laptop",
    "preview.tablet": "Tablet",
    "preview.mobile": "Mobile",
    "preview.totalSlides": "Total slides",
    "preview.fullscreen": "Fullscreen",
    "preview.exitFullscreen": "Exit fullscreen",
    "preview.paginationInfo":
      "{dots} dots ({slides} slides, {perPage} per page)",
    "preview.mobileMessage":
      "For more breakpoint control, access from desktop.",

    // Basic Options
    "field.type": "Type",
    "field.type.desc": "Type of slider movement",
    "field.perPage": "Slides per Page",
    "field.perPage.desc": "Number of slides visible per page",
    "field.perMove": "Slides per Move",
    "field.perMove.desc": "Number of slides to move at once",
    "field.focus": "Focus",
    "field.focus.desc": 'Index of slide to focus or "center" to center',
    "field.gap": "Gap between Slides",
    "field.gap.desc": "Space between slides",
    "field.totalSlides": "Total slides",
    "field.totalSlides.desc": "Total number of slides",

    // Dimensions
    "field.width": "Width",
    "field.width.desc": "Width of the slider",
    "field.height": "Height",
    "field.height.desc": "Height of the slider",
    "field.fixedWidth": "Fixed Width",
    "field.fixedWidth.desc": "Fixed width of slides",
    "field.fixedHeight": "Fixed Height",
    "field.fixedHeight.desc": "Fixed height of slides",
    "field.heightRatio": "Height Ratio",
    "field.heightRatio.desc": "Height as ratio to slider width (0.3 = 30% of width)",
    "field.autoWidth": "Auto Width",
    "field.autoWidth.desc": "Slide width determined by element width itself",
    "field.autoHeight": "Auto Height",
    "field.autoHeight.desc": "Slide height determined by element height itself",

    // Layout
    "field.direction": "Direction",
    "field.direction.desc": "Direction of the slider",
    "field.start": "Start Slide",
    "field.start.desc": "Index of the initial slide",

    // Padding
    "field.paddingType": "Padding Type",
    "field.paddingType.desc": "Type of padding to apply",
    "field.paddingUnit": "Unit",
    "field.paddingUnit.desc": "Unit of measurement for padding",
    "field.paddingLeft": "Left Padding",
    "field.paddingLeft.desc": "Left padding",
    "field.paddingRight": "Right Padding",
    "field.paddingRight.desc": "Right padding",
    "field.paddingTop": "Top Padding",
    "field.paddingTop.desc": "Top padding",
    "field.paddingBottom": "Bottom Padding",
    "field.paddingBottom.desc": "Bottom padding",

    // Timing
    "field.speed": "Speed",
    "field.speed.desc": "Transition duration in milliseconds",
    "field.interval": "Interval",
    "field.interval.desc": "Autoplay interval in milliseconds",
    "field.autoplay": "Autoplay",
    "field.autoplay.desc": "Enable autoplay",
    "field.pauseOnHover": "Pause on Hover",
    "field.pauseOnHover.desc": "Pause autoplay on hover",
    "field.pauseOnFocus": "Pause on Focus",
    "field.pauseOnFocus.desc": "Pause autoplay when slider is focused",
    "field.resetProgress": "Reset Progress",
    "field.resetProgress.desc": "Reset autoplay timer progress when resumed",

    // Controls
    "field.arrows": "Arrows",
    "field.arrows.desc": "Show navigation arrows",
    "field.pagination": "Pagination",
    "field.pagination.desc": "Show pagination dots",
    "field.drag": "Drag",
    "field.drag.desc": "Enable drag to slide",
    "field.rewind": "Rewind",
    "field.rewind.desc": "Allow rewinding at the end/start",
    "field.rewindByDrag": "Rewind by Drag",
    "field.rewindByDrag.desc": "Whether to allow rewinding slides by drag",
    "field.rewindSpeed": "Rewind Speed",
    "field.rewindSpeed.desc": "Speed of the rewind animation",

    // Transitions
    "field.easing": "Easing Function",
    "field.easing.desc": "CSS transition function for animations",
    "field.dragMode": "Drag Mode",
    "field.dragMode.desc":
      "Drag mode. Free Mode allows free dragging without automatic snap",
    "field.snap": "Snap to Closest",
    "field.snap.desc": "In free mode, automatically snap to the closest slide",
    "field.flickPower": "Flick Power",
    "field.flickPower.desc": 'Controls how far the slider moves with a "flick"',
    "field.flickMaxPages": "Max Flick Pages",
    "field.flickMaxPages.desc": "Limit of pages that can advance with a flick",
    "field.dragAngleThreshold": "Drag Angle Threshold",
    "field.dragAngleThreshold.desc": "Angle threshold for drag (degrees)",
    "field.swipeDistanceThreshold": "Swipe Distance Threshold",
    "field.swipeDistanceThreshold.desc": "Distance threshold for swipe vs flick (px)",
    "field.flickVelocityThreshold": "Flick Velocity Threshold",
    "field.flickVelocityThreshold.desc": "Velocity threshold for flick vs swipe",

    // Performance
    "field.lazyLoad": "Lazy Load",
    "field.lazyLoad.desc": "Lazy loading of images to improve performance",
    "field.preloadPages": "Preload Pages",
    "field.preloadPages.desc":
      "Number of pages to preload (useful with lazy loading)",
    "field.waitForTransition": "Wait for Transition",
    "field.waitForTransition.desc":
      "Wait for a transition to finish before allowing another action",

    // Clones
    "field.clones": "Number of Clones",
    "field.clones.desc":
      "Specific number of clones to create on each side (loop mode only)",
    "field.cloneStatus": "Clone Status",
    "field.cloneStatus.desc": 'Whether to add the "is-active" class to clones',

    // Keyboard
    "field.keyboard": "Keyboard Control",
    "field.keyboard.desc": "Configure keyboard navigation behavior",
    "field.arrowPath": "Arrow Path",
    "field.arrowPath.desc": "Custom SVG path for navigation arrows",

    // Advanced
    "field.isNavigation": "Is Navigation",
    "field.isNavigation.desc": "Whether this slider controls another slider",
    "field.trimSpace": "Trim Space",
    "field.trimSpace.desc": "Trim empty space at ends. 'move' always moves the slider",
    "field.updateOnMove": "Update on Move",
    "field.updateOnMove.desc": "Update the slider when moving",
    "field.destroy": "Destroy",
    "field.destroy.desc": "Destroy the slider",
    "field.cover": "Cover",
    "field.cover.desc": "Convert img src to background-image of parent element",
    "field.throttle": "Throttle",
    "field.throttle.desc": "Throttle duration for resize event (ms)",
    "field.accessibility": "Accessibility",
    "field.accessibility.desc": "Enable ARIA attributes and screen reader texts",
    "field.slideFocus": "Slide Focus",
    "field.slideFocus.desc": "Add tabindex=\"0\" to visible slides",
    "field.i18n": "Internationalization",
    "field.i18n.desc": "JSON object with i18n texts (optional)",

    // Options
    "option.slide": "Slide",
    "option.loop": "Loop",
    "option.fade": "Fade",
    "option.center": "Center",
    "option.ltr": "Left to Right",
    "option.rtl": "Right to Left",
    "option.ttb": "Top to Bottom",
    "option.horizontal": "Horizontal",
    "option.vertical": "Vertical",
    "option.disabled": "Disabled",
    "option.enabled": "Enabled",
    "option.nearby": "Nearby",
    "option.sequential": "Sequential",
    "option.whenFocused": "When Focused",
    "option.global": "Global",
    "option.normal": "Normal",
    "option.freeMode": "Free Mode",
    "option.default": "Default",
    "option.linear": "Linear",
    "option.ease": "Ease",
    "option.easeIn": "Ease In",
    "option.easeOut": "Ease Out",
    "option.easeInOut": "Ease In Out",
    "option.customCubic": "Custom Cubic Bezier",
    "option.trimTrue": "Enabled",
    "option.trimFalse": "Disabled",
    "option.trimMove": "Always Move",

    // Code Output
    "code.title": "Code",
    "code.copy": "Copy Code",
    "code.copied": "Code Copied",
    "code.edit": "Edit",
    "code.save": "Save",
    "code.cancel": "Cancel",
    "code.config_updated": "Configuration updated successfully",
    "code.json_error": "Error parsing JSON",
    "config.title": "Configuration",
    "config.reset": "Reset",
    "config.breakpoint_reset": "Breakpoint {breakpoint}px reset successfully",
    "config.all_reset": "All settings reset to defaults",
    "config.reset_breakpoint_tooltip":
      "Reset breakpoint {breakpoint}px settings",
    "config.reset_all_tooltip": "Reset all settings to defaults",

    // Additional options values
    "option.start": "Start",
    "option.end": "End",
    "option.px": "Pixels",
    "option.rem": "REM",
    "option.em": "EM",
    "option.%": "Percentage",
    "option.vw": "Viewport Width",
    "option.vh": "Viewport Height",
    "option.auto": "Auto",
  },
};
