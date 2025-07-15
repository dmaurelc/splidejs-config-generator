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
    "app.title": "Generador de Configuración SplideJS",
    "language.selector": "Idioma",

    // Config Sections
    "section.basic": "Opciones Básicas",
    "section.dimensions": "Dimensiones",
    "section.layout": "Diseño y Posición",
    "section.padding": "Espaciado (Padding)",
    "section.timing": "Temporización",
    "section.controls": "Controles",
    "section.transitions": "Transiciones y Animaciones",
    "section.performance": "Performance y Lazy Loading",
    "section.clones": "Clones (Modo Loop)",
    "section.keyboard": "Navegación por Teclado",
    "section.advanced": "Opciones Avanzadas",

    // Preview
    "preview.desktop": "Escritorio",
    "preview.laptop": "Laptop",
    "preview.tablet": "Tablet",
    "preview.mobile": "Móvil",
    "preview.totalSlides": "Total slides",
    "preview.fullscreen": "Pantalla completa",
    "preview.exitFullscreen": "Salir de pantalla completa",
    "preview.paginationInfo":
      "{dots} dots ({slides} slides, {perPage} por página)",

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

    // Advanced
    "field.isNavigation": "Es Navegación",
    "field.isNavigation.desc": "Si este slider controla otro slider",
    "field.trimSpace": "Recortar Espacio",
    "field.trimSpace.desc": "Recortar espacio vacío al final",
    "field.updateOnMove": "Actualizar al Mover",
    "field.updateOnMove.desc": "Actualizar el slider al mover",
    "field.destroy": "Destruir",
    "field.destroy.desc": "Destruir el slider",

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
    "app.title": "SplideJS Configuration Generator",
    "language.selector": "Language",

    // Config Sections
    "section.basic": "Basic Options",
    "section.dimensions": "Dimensions",
    "section.layout": "Layout & Position",
    "section.padding": "Padding",
    "section.timing": "Timing",
    "section.controls": "Controls",
    "section.transitions": "Transitions & Animations",
    "section.performance": "Performance & Lazy Loading",
    "section.clones": "Clones (Loop Mode)",
    "section.keyboard": "Keyboard Navigation",
    "section.advanced": "Advanced Options",

    // Preview
    "preview.desktop": "Desktop",
    "preview.laptop": "Laptop",
    "preview.tablet": "Tablet",
    "preview.mobile": "Mobile",
    "preview.totalSlides": "Total slides",
    "preview.fullscreen": "Fullscreen",
    "preview.exitFullscreen": "Exit fullscreen",
    "preview.paginationInfo":
      "{dots} dots ({slides} slides, {perPage} per page)",

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

    // Advanced
    "field.isNavigation": "Is Navigation",
    "field.isNavigation.desc": "Whether this slider controls another slider",
    "field.trimSpace": "Trim Space",
    "field.trimSpace.desc": "Trim empty space at the end",
    "field.updateOnMove": "Update on Move",
    "field.updateOnMove.desc": "Update the slider when moving",
    "field.destroy": "Destroy",
    "field.destroy.desc": "Destroy the slider",

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
