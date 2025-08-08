import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import {
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  Maximize2,
  Minimize2,
} from "lucide-react";
import "@splidejs/react-splide/css";
import { SplideConfig } from "../types/config";
import { useLanguage } from "../contexts/LanguageContext";
import { breakpoints } from "../data/breakpoints";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { configSections } from "../data/configSections";
import { useIsMobile } from "../hooks/useIsMobile";

interface PreviewProps {
  config: SplideConfig;
  activeBreakpoint: number | null;
  onBreakpointChange: (width: number | null) => void;
  isFullscreen: boolean;
  onFullscreenToggle: () => void;
  totalSlides: number;
  onTotalSlidesChange: (count: number) => void;
}

export const Preview: React.FC<PreviewProps> = ({
  config,
  activeBreakpoint,
  onBreakpointChange,
  isFullscreen,
  onFullscreenToggle,
  totalSlides,
  onTotalSlidesChange,
}) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const slides = [
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    "https://images.unsplash.com/photo-1490730141103-6cac27aaab94",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6",
    "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e",
    "https://images.unsplash.com/photo-1439853949127-fa647821eba0",
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatPaddingValue = (value: number, unit: string) => {
    return `${value}${unit}`;
  };

  const getPaddingConfig = (cfg: Partial<SplideConfig>) => {
    const {
      paddingLeft = 0,
      paddingRight = 0,
      paddingTop = 0,
      paddingBottom = 0,
    } = cfg;

    if (paddingLeft > 0 || paddingRight > 0) {
      return {
        left: formatPaddingValue(paddingLeft, "px"),
        right: formatPaddingValue(paddingRight, "px"),
      };
    }

    if (paddingTop > 0 || paddingBottom > 0) {
      return {
        top: formatPaddingValue(paddingTop, "px"),
        bottom: formatPaddingValue(paddingBottom, "px"),
      };
    }

    return undefined;
  };

  const getCurrentConfig = () => {
    const baseConfig = { ...config };

    // Mantener width y height
    if (baseConfig.width) {
      baseConfig.width = String(baseConfig.width);
    }
    if (baseConfig.height) {
      baseConfig.height = String(baseConfig.height);
    }

    // Limpiar propiedades de padding del config base
    const basePadding = getPaddingConfig(baseConfig);
    delete baseConfig.paddingLeft;
    delete baseConfig.paddingRight;
    delete baseConfig.paddingTop;
    delete baseConfig.paddingBottom;

    if (basePadding) {
      baseConfig.padding = basePadding;
    }

    // Si hay un breakpoint activo, aplicar su configuración directamente al config base
    if (activeBreakpoint && config.breakpoints?.[activeBreakpoint]) {
      const breakpointConfig = config.breakpoints[activeBreakpoint];
      
      // Procesar padding del breakpoint
      const breakpointPadding = getPaddingConfig({
        paddingLeft: breakpointConfig.paddingLeft,
        paddingRight: breakpointConfig.paddingRight,
        paddingTop: breakpointConfig.paddingTop,
        paddingBottom: breakpointConfig.paddingBottom,
      });

      // Crear una copia limpia del breakpoint config
      const cleanBreakpointConfig = { ...breakpointConfig };
      delete cleanBreakpointConfig.paddingLeft;
      delete cleanBreakpointConfig.paddingRight;
      delete cleanBreakpointConfig.paddingTop;
      delete cleanBreakpointConfig.paddingBottom;

      if (breakpointPadding) {
        cleanBreakpointConfig.padding = breakpointPadding;
      }

      // Aplicar la configuración del breakpoint directamente
      const mergedConfig = {
        ...baseConfig,
        ...cleanBreakpointConfig,
      };

      // Mantener width y height del breakpoint si existen
      if (cleanBreakpointConfig.width) {
        mergedConfig.width = String(cleanBreakpointConfig.width);
      }
      if (cleanBreakpointConfig.height) {
        mergedConfig.height = String(cleanBreakpointConfig.height);
      }

      // No incluir breakpoints cuando estamos previsualizando un breakpoint específico
      delete mergedConfig.breakpoints;
      
      return mergedConfig;
    }

    // Si no hay breakpoint activo, incluir todos los breakpoints para responsive
    if (config.breakpoints && Object.keys(config.breakpoints).length > 0) {
      const processedBreakpoints: Record<number, any> = {};
      Object.entries(config.breakpoints).forEach(([width, breakpointConfig]) => {
        const cleanBreakpointConfig = { ...breakpointConfig };

        // Mantener width y height del breakpoint si existen
        if (cleanBreakpointConfig.width) {
          cleanBreakpointConfig.width = String(cleanBreakpointConfig.width);
        }
        if (cleanBreakpointConfig.height) {
          cleanBreakpointConfig.height = String(cleanBreakpointConfig.height);
        }

        // Procesar padding del breakpoint
        const breakpointPadding = getPaddingConfig({
          paddingLeft: breakpointConfig.paddingLeft,
          paddingRight: breakpointConfig.paddingRight,
          paddingTop: breakpointConfig.paddingTop,
          paddingBottom: breakpointConfig.paddingBottom,
        });

        // Limpiar propiedades de padding del breakpoint
        delete cleanBreakpointConfig.paddingLeft;
        delete cleanBreakpointConfig.paddingRight;
        delete cleanBreakpointConfig.paddingTop;
        delete cleanBreakpointConfig.paddingBottom;

        if (breakpointPadding) {
          cleanBreakpointConfig.padding = breakpointPadding;
        }

        processedBreakpoints[parseInt(width)] = cleanBreakpointConfig;
      });

      return {
        ...baseConfig,
        breakpoints: processedBreakpoints,
      };
    }

    return baseConfig;
  };

  const hasBreakpointChanges = (width: number) => {
    return (
      config.breakpoints?.[width] &&
      Object.keys(config.breakpoints[width]).length > 0
    );
  };

  const hasBaseConfigChanges = () => {
    const initialConfig = configSections.reduce((acc, section) => {
      section.fields.forEach((field) => {
        if (field.defaultValue !== undefined) {
          acc[field.key] = JSON.parse(JSON.stringify(field.defaultValue));
        }
      });
      return acc;
    }, {} as SplideConfig);

    return Object.entries(config).some(([key, value]) => {
      // Ignorar la propiedad breakpoints
      if (key === "breakpoints") return false;
      // Comparar con el valor por defecto usando una comparación estricta
      const defaultValue = initialConfig[key as keyof SplideConfig];
      return JSON.stringify(defaultValue) !== JSON.stringify(value);
    });
  };

  const getBreakpointIcon = (width: number) => {
    // Buscar el breakpoint correspondiente al ancho
    const bp = breakpoints.find((b) => b.width === width);

    // Si no se encuentra el breakpoint, retornar null
    if (!bp) return null;

    // Usar la etiqueta para determinar qué icono mostrar
    switch (bp.label) {
      case "Laptop":
        return <Laptop className="h-4 w-4" />;
      case "Tablet":
        return <Tablet className="h-4 w-4" />;
      case "Mobile":
        return <Smartphone className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getPreviewWidth = () => {
    if (!activeBreakpoint) return "100%";
    return `${activeBreakpoint}px`;
  };

  const currentConfig = getCurrentConfig();

  // Obtener el ancho actual para mostrar en la interfaz
  const getCurrentWidth = () => {
    if (activeBreakpoint) {
      return `${activeBreakpoint}px`;
    }
    return `${windowWidth}px`;
  };

  // Obtener solo los slides necesarios según la selección del usuario
  const selectedSlides = slides.slice(0, totalSlides);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background">
      <div className="bg-card border-b px-4 py-2">
        {isMobile ? (
          <div className="text-center text-xs text-muted-foreground py-2 text-balance">
            {t("preview.mobileMessage")}
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeBreakpoint === null ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onBreakpointChange(null)}
                    className="h-8 px-2"
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{t("preview.desktop")}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {breakpoints.map((bp) => (
              <TooltipProvider key={bp.width}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={
                        activeBreakpoint === bp.width ? "default" : "ghost"
                      }
                      size="sm"
                      onClick={() => onBreakpointChange(bp.width)}
                      className="h-8 px-2"
                    >
                      {bp.width === 1280 && <Laptop className="h-4 w-4" />}
                      {bp.width === 767 && <Tablet className="h-4 w-4" />}
                      {bp.width === 480 && <Smartphone className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {bp.label} ({bp.width}px)
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}

            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onFullscreenToggle}
                  className="h-8 px-2 ml-2"
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isFullscreen
                  ? t("preview.exitFullscreen")
                  : t("preview.fullscreen")}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Selector de número de slides */}
          {!isMobile && (
            <div className="ml-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {t("preview.totalSlides")}:
              </span>
              <Select
                value={totalSlides.toString()}
                onValueChange={(value) => onTotalSlidesChange(parseInt(value))}
              >
                <SelectTrigger className="w-16 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[3, 4, 5, 6, 7, 8, 9, 10, 12, 15].map((count) => (
                    <SelectItem key={count} value={count.toString()}>
                      {count}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {!isMobile && (
            <div className="ml-auto flex items-center gap-4">
              {currentConfig.pagination && (
                <span className="text-xs text-muted-foreground">
                  {t('preview.paginationInfo', {
                    dots: Math.ceil(totalSlides / (currentConfig.perPage || 1)),
                    slides: totalSlides,
                    perPage: currentConfig.perPage || 1
                  })}
                </span>
              )}
              <span className="text-sm text-muted-foreground">
                Width: {getCurrentWidth()}
              </span>
            </div>
          )}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <section className="min-h-full flex items-center justify-center">
          <div className="max-w-screen-2xl mx-auto py-12 w-full px-6">
            <div
              style={{
                width: getPreviewWidth(),
                maxWidth: "100%",
              }}
              className="mx-auto"
            >
              <Splide
                options={{
                  ...currentConfig,
                  height: currentConfig.height || "100%",
                  pagination: currentConfig.pagination !== false,
                  start: currentConfig.start || 0,
                }}
                className="h-full"
                key={`${activeBreakpoint}-${totalSlides}-${JSON.stringify(
                  currentConfig
                )}`}
              >
                {selectedSlides.map((slide, index) => (
                  <SplideSlide key={index}>
                    <div className="relative h-full">
                      <img
                        src={slide}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded-lg">
                        <span className="text-white text-2xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
