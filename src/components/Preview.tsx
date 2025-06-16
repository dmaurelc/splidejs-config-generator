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
import { breakpoints } from "../data/breakpoints";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { configSections } from "../data/configSections";

interface PreviewProps {
  config: SplideConfig;
  activeBreakpoint: number | null;
  onBreakpointChange: (width: number | null) => void;
  isFullscreen: boolean;
  onFullscreenToggle: () => void;
}

export const Preview: React.FC<PreviewProps> = ({
  config,
  activeBreakpoint,
  onBreakpointChange,
  isFullscreen,
  onFullscreenToggle,
}) => {
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
      paddingType = "horizontal",
      paddingUnit = "px",
      paddingLeft = 0,
      paddingRight = 0,
      paddingTop = 0,
      paddingBottom = 0,
    } = cfg;

    if (paddingType === "horizontal" && (paddingLeft > 0 || paddingRight > 0)) {
      return {
        left: formatPaddingValue(paddingLeft, paddingUnit),
        right: formatPaddingValue(paddingRight, paddingUnit),
      };
    }

    if (paddingType === "vertical" && (paddingTop > 0 || paddingBottom > 0)) {
      return {
        top: formatPaddingValue(paddingTop, paddingUnit),
        bottom: formatPaddingValue(paddingBottom, paddingUnit),
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
    delete baseConfig.paddingType;
    delete baseConfig.paddingUnit;
    delete baseConfig.paddingLeft;
    delete baseConfig.paddingRight;
    delete baseConfig.paddingTop;
    delete baseConfig.paddingBottom;

    if (basePadding) {
      baseConfig.padding = basePadding;
    }

    if (!config.breakpoints) return baseConfig;

    if (activeBreakpoint && config.breakpoints[activeBreakpoint]) {
      const breakpointConfig = config.breakpoints[activeBreakpoint];

      // Mantener width y height del breakpoint si existen
      if (breakpointConfig.width) {
        breakpointConfig.width = String(breakpointConfig.width);
      }
      if (breakpointConfig.height) {
        breakpointConfig.height = String(breakpointConfig.height);
      }

      // Procesar padding del breakpoint
      const breakpointPadding = getPaddingConfig({
        paddingType: breakpointConfig.paddingType || baseConfig.paddingType,
        paddingUnit: breakpointConfig.paddingUnit || baseConfig.paddingUnit,
        paddingLeft: breakpointConfig.paddingLeft ?? baseConfig.paddingLeft,
        paddingRight: breakpointConfig.paddingRight ?? baseConfig.paddingRight,
        paddingTop: breakpointConfig.paddingTop ?? baseConfig.paddingTop,
        paddingBottom:
          breakpointConfig.paddingBottom ?? baseConfig.paddingBottom,
      });

      // Limpiar propiedades de padding del breakpoint
      const cleanBreakpointConfig = { ...breakpointConfig };
      delete cleanBreakpointConfig.paddingType;
      delete cleanBreakpointConfig.paddingUnit;
      delete cleanBreakpointConfig.paddingLeft;
      delete cleanBreakpointConfig.paddingRight;
      delete cleanBreakpointConfig.paddingTop;
      delete cleanBreakpointConfig.paddingBottom;

      return {
        ...baseConfig,
        ...cleanBreakpointConfig,
        ...(breakpointPadding ? { padding: breakpointPadding } : {}),
      };
    }

    const applicableBreakpoints = Object.entries(config.breakpoints)
      .map(([width, cfg]) => ({ width: Number(width), config: cfg }))
      .filter(({ width }) => windowWidth <= width)
      .sort((a, b) => b.width - a.width);

    if (applicableBreakpoints.length > 0) {
      const breakpointConfig = applicableBreakpoints[0].config;

      // Mantener width y height del breakpoint si existen
      if (breakpointConfig.width) {
        breakpointConfig.width = String(breakpointConfig.width);
      }
      if (breakpointConfig.height) {
        breakpointConfig.height = String(breakpointConfig.height);
      }

      // Procesar padding del breakpoint
      const breakpointPadding = getPaddingConfig({
        paddingType: breakpointConfig.paddingType || baseConfig.paddingType,
        paddingUnit: breakpointConfig.paddingUnit || baseConfig.paddingUnit,
        paddingLeft: breakpointConfig.paddingLeft ?? baseConfig.paddingLeft,
        paddingRight: breakpointConfig.paddingRight ?? baseConfig.paddingRight,
        paddingTop: breakpointConfig.paddingTop ?? baseConfig.paddingTop,
        paddingBottom:
          breakpointConfig.paddingBottom ?? baseConfig.paddingBottom,
      });

      // Limpiar propiedades de padding del breakpoint
      const cleanBreakpointConfig = { ...breakpointConfig };
      delete cleanBreakpointConfig.paddingType;
      delete cleanBreakpointConfig.paddingUnit;
      delete cleanBreakpointConfig.paddingLeft;
      delete cleanBreakpointConfig.paddingRight;
      delete cleanBreakpointConfig.paddingTop;
      delete cleanBreakpointConfig.paddingBottom;

      return {
        ...baseConfig,
        ...cleanBreakpointConfig,
        ...(breakpointPadding ? { padding: breakpointPadding } : {}),
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

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background">
      <div className="bg-card border-b px-4 py-2">
        <div className="flex items-center gap-1.5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeBreakpoint === null ? "default" : "ghost"}
                  size="icon"
                  onClick={() => onBreakpointChange(null)}
                  className="relative"
                >
                  <Monitor className="h-4 w-4" />
                  {hasBaseConfigChanges() && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Default (All sizes)</TooltipContent>
            </Tooltip>

            {breakpoints.map((bp) => (
              <Tooltip key={bp.width}>
                <TooltipTrigger asChild>
                  <Button
                    variant={
                      activeBreakpoint === bp.width ? "default" : "ghost"
                    }
                    size="icon"
                    onClick={() => onBreakpointChange(bp.width)}
                    className="relative"
                  >
                    {getBreakpointIcon(bp.width)}
                    {hasBreakpointChanges(bp.width) && (
                      <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{`${bp.label} (≤ ${bp.width}px)`}</TooltipContent>
              </Tooltip>
            ))}

            <div className="h-4 w-px bg-border mx-2" />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onFullscreenToggle}
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="ml-auto">
            <span className="text-sm text-muted-foreground">
              Width: {windowWidth}px
            </span>
          </div>
        </div>
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
                }}
                className="h-full"
                key={`${activeBreakpoint}-${JSON.stringify(currentConfig)}`}
              >
                {slides.map((slide, index) => (
                  <SplideSlide key={index} className="h-full">
                    <img
                      src={slide}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
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
