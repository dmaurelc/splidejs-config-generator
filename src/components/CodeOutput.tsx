import React, { useState, useEffect } from "react";
import { Copy, Check, Edit, Save, X } from "lucide-react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { SplideConfig } from "../types/config";
import { Button } from "./ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import { cn } from "../lib/utils";
import { toast } from "sonner";

SyntaxHighlighter.registerLanguage("json", json);

interface CodeOutputProps {
  config: SplideConfig;
  className?: string;
  onChange?: (config: SplideConfig) => void;
}

export const CodeOutput: React.FC<CodeOutputProps> = ({
  config,
  className,
  onChange,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableCode, setEditableCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const getPaddingConfig = (
    cfg: Partial<SplideConfig>,
    parentConfig?: SplideConfig
  ):
    | { left?: string; right?: string; top?: string; bottom?: string }
    | undefined => {
    // Heredar paddingType del config principal si no está definido
    const paddingType =
      cfg.paddingType || parentConfig?.paddingType || "horizontal";
    const paddingUnit = cfg.paddingUnit || parentConfig?.paddingUnit || "px";
    const paddingLeft = cfg.paddingLeft ?? 0;
    const paddingRight = cfg.paddingRight ?? 0;
    const paddingTop = cfg.paddingTop ?? 0;
    const paddingBottom = cfg.paddingBottom ?? 0;

    if (paddingType === "horizontal" && (paddingLeft > 0 || paddingRight > 0)) {
      return {
        left: `${paddingLeft}${paddingUnit}`,
        right: `${paddingRight}${paddingUnit}`,
      };
    }

    if (paddingType === "vertical" && (paddingTop > 0 || paddingBottom > 0)) {
      return {
        top: `${paddingTop}${paddingUnit}`,
        bottom: `${paddingBottom}${paddingUnit}`,
      };
    }

    return undefined;
  };

  const cleanConfig = (cfg: SplideConfig): SplideConfig => {
    // Usar Record<string, unknown> para mayor flexibilidad con los tipos
    const cleaned: Record<string, unknown> = {};

    // Procesar propiedades principales
    Object.entries(cfg).forEach(([key, value]) => {
      // No incluir perPage y perMove si el tipo es fade
      if (cfg.type === "fade" && (key === "perPage" || key === "perMove")) {
        return;
      }

      // No incluir propiedades de padding raw excepto padding ya formateado
      if (
        (key === "padding" || !key.startsWith("padding")) &&
        key !== "breakpoints" &&
        value !== undefined
      ) {
        cleaned[key] = value;
      }
    });

    // Agregar padding al config principal si existe
    const padding = getPaddingConfig(cfg);
    if (padding) {
      cleaned.padding = padding;
    }

    // Procesar breakpoints si existen
    if (cfg.breakpoints) {
      const cleanedBreakpoints: Record<number, Record<string, unknown>> = {};

      Object.entries(cfg.breakpoints).forEach(([width, breakpointConfig]) => {
        const cleanedBreakpointConfig: Record<string, unknown> = {};

        // Procesar propiedades del breakpoint
        Object.entries(breakpointConfig).forEach(([key, value]) => {
          if (cfg.type === "fade" && (key === "perPage" || key === "perMove")) {
            return;
          }

          // Filtrar propiedades de padding raw excepto padding ya formateado
          if (
            (key === "padding" || !key.startsWith("padding")) &&
            value !== undefined
          ) {
            cleanedBreakpointConfig[key] = value;
          }
        });

        // Agregar padding al breakpoint si existe, heredando el tipo del config principal
        const breakpointPadding = getPaddingConfig(breakpointConfig, cfg);
        if (breakpointPadding) {
          cleanedBreakpointConfig.padding = breakpointPadding;
        }

        if (Object.keys(cleanedBreakpointConfig).length > 0) {
          cleanedBreakpoints[Number(width)] = cleanedBreakpointConfig;
        }
      });

      if (Object.keys(cleanedBreakpoints).length > 0) {
        cleaned.breakpoints = cleanedBreakpoints;
      }
    }

    return cleaned as unknown as SplideConfig;
  };

  const formattedCode = JSON.stringify(cleanConfig(config), null, 2);

  // Sincronizar el código editable con la configuración cuando cambia
  useEffect(() => {
    if (!isEditing) {
      setEditableCode(formattedCode);
    }
  }, [config, isEditing, formattedCode]);

  // Manejar cambios en el código editable
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableCode(e.target.value);
    setError(null);
  };

  // Aplicar cambios del código editable a la configuración
  const applyChanges = () => {
    try {
      const parsedConfig = JSON.parse(editableCode);
      if (onChange) {
        onChange(parsedConfig);
      }
      setIsEditing(false);
      setError(null);
      toast.success("Configuración actualizada correctamente", {
        duration: 2000,
      });
    } catch (err) {
      setError("Error al parsear JSON: " + (err as Error).message);
      toast.error("Error al parsear JSON", {
        duration: 2000,
      });
    }
  };

  // Cancelar edición
  const cancelEditing = () => {
    setIsEditing(false);
    setEditableCode(formattedCode);
    setError(null);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(formattedCode);
    setIsCopied(true);
    toast.success("Configuration copied to clipboard!", {
      duration: 2000,
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "w-80 bg-card border-l flex flex-col overflow-hidden",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-sm font-medium">Generated Code</h2>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Editar JSON</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1.5"
                      onClick={copyToClipboard}
                      disabled={isCopied}
                    >
                      <div className="relative w-4 h-4">
                        <span
                          className={cn(
                            "absolute inset-0 transition-opacity duration-300",
                            isCopied ? "opacity-0" : "opacity-100"
                          )}
                        >
                          <Copy className="h-4 w-4" />
                        </span>
                        <span
                          className={cn(
                            "absolute inset-0 transition-opacity duration-300",
                            isCopied ? "opacity-100" : "opacity-0"
                          )}
                        >
                          <Check className="h-4 w-4 text-green-500" />
                        </span>
                      </div>
                      {isCopied ? "Copiado" : "Copiar"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copiar al portapapeles</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          ) : (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      onClick={applyChanges}
                    >
                      <Save className="h-4 w-4" />
                      <span className="sr-only">Guardar</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Guardar cambios</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      onClick={cancelEditing}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Cancelar</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Cancelar edición</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-zinc-900">
        {isEditing ? (
          <div className="relative h-full">
            <textarea
              value={editableCode}
              onChange={handleCodeChange}
              className="w-full h-full font-mono text-sm p-4 bg-zinc-900 text-white border-none outline-none resize-none"
              style={{
                lineHeight: "1.5",
                tabSize: 2,
              }}
            />
            {error && (
              <div className="absolute bottom-0 left-0 right-0 bg-red-900 text-white text-xs p-2">
                {error}
              </div>
            )}
          </div>
        ) : (
          <SyntaxHighlighter
            language="json"
            style={vs2015}
            customStyle={{
              margin: 0,
              padding: "1rem",
              background: "rgb(24 24 27)",
              fontSize: "13px",
              lineHeight: "1.5",
            }}
          >
            {formattedCode}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
};
