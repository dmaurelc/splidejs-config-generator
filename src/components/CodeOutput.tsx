import React, { useState, useEffect } from "react";
import {
  Copy,
  Check,
  Edit,
  Save,
  X,
  Download,
  Code2,
  Terminal,
  FileCode2,
} from "lucide-react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { SplideConfig } from "../types/config";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import { cn } from "../lib/utils";
import { toast } from "sonner";

type ExportFormat = "json" | "vanilla" | "react" | "html";

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
  const { t } = useLanguage();
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableCode, setEditableCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<ExportFormat>("json");

  const getPaddingConfig = (
    cfg: Partial<SplideConfig>,
    parentConfig?: SplideConfig,
  ):
    | { left?: string; right?: string; top?: string; bottom?: string }
    | undefined => {
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
    const baseConfig = {
      type: "loop",
      height: "400px",
      perPage: 3,
      perMove: 1,
      gap: "1rem",
      arrows: true,
      pagination: true,
      drag: true,
      rewind: false,
    };

    const defaultValues: Record<string, any> = {
      type: "slide",
      height: "auto",
      perPage: 1,
      perMove: 1,
      gap: 0,
      focus: 0,
      direction: "ltr",
      start: 0,
      speed: 400,
      interval: 5000,
      autoplay: false,
      pauseOnHover: true,
      pauseOnFocus: true,
      arrows: true,
      pagination: true,
      drag: true,
      rewind: false,
      rewindByDrag: false,
      rewindSpeed: 400,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      snap: false,
      flickPower: 600,
      flickMaxPages: 1,
      lazyLoad: false,
      preloadPages: 1,
      waitForTransition: false,
      cloneStatus: true,
      keyboard: false,
      isNavigation: false,
      trimSpace: true,
      updateOnMove: false,
      destroy: false,
      paginationKeyboard: true,
      wheel: false,
      releaseWheel: false,
      focusableNodes: "a, button, input, [tabindex], select, textarea",
    };

    const cleaned: Record<string, unknown> = {};

    Object.entries(cfg).forEach(([key, value]) => {
      if (cfg.type === "fade" && (key === "perPage" || key === "perMove")) {
        return;
      }

      if (key === "dragMode") {
        if (value === true) {
          cleaned.drag = true;
        } else if (value === "free") {
          cleaned.drag = "free";
        }
        return;
      }

      if (
        (key === "padding" || !key.startsWith("padding")) &&
        key !== "breakpoints" &&
        key !== "dragMode" &&
        value !== undefined &&
        (Object.prototype.hasOwnProperty.call(baseConfig, key) ||
          value !== defaultValues[key])
      ) {
        cleaned[key] = value;
      }
    });

    const padding = getPaddingConfig(cfg);
    if (padding) {
      cleaned.padding = padding;
    }

    if (cfg.breakpoints) {
      const cleanedBreakpoints: Record<number, Record<string, unknown>> = {};

      Object.entries(cfg.breakpoints).forEach(([width, breakpointConfig]) => {
        const cleanedBreakpointConfig: Record<string, unknown> = {};

        Object.entries(breakpointConfig).forEach(([key, value]) => {
          if (cfg.type === "fade" && (key === "perPage" || key === "perMove")) {
            return;
          }

          if (key === "dragMode") {
            if (value === true) {
              cleanedBreakpointConfig.drag = true;
            } else if (value === "free") {
              cleanedBreakpointConfig.drag = "free";
            }
            return;
          }

          if (
            (key === "padding" || !key.startsWith("padding")) &&
            key !== "dragMode" &&
            value !== undefined
          ) {
            cleanedBreakpointConfig[key] = value;
          }
        });

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

  const getExportCode = () => {
    const cleaned = cleanConfig(config);
    const configString = JSON.stringify(cleaned, null, 2);

    switch (exportFormat) {
      case "vanilla":
        return `<!-- Splide HTML structure -->
<div class="splide">
  <div class="splide__track">
    <ul class="splide__list">
      <li class="splide__slide">Slide 01</li>
      <li class="splide__slide">Slide 02</li>
      <li class="splide__slide">Slide 03</li>
    </ul>
  </div>
</div>

<!-- Splide Initialization -->
<script>
  document.addEventListener('DOMContentLoaded', function () {
    new Splide('.splide', ${configString}).mount();
  });
</script>`;

      case "react":
        return `import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export const MySlider = () => {
  const options = ${configString};

  return (
    <Splide options={options} aria-label="My Splide Slider">
      <SplideSlide>
        <img src="image1.jpg" alt="Image 1"/>
      </SplideSlide>
      <SplideSlide>
        <img src="image2.jpg" alt="Image 2"/>
      </SplideSlide>
      <SplideSlide>
        <img src="image3.jpg" alt="Image 3"/>
      </SplideSlide>
    </Splide>
  );
};`;

      case "html":
        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Splide Slider</title>
  <!-- Splide CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@latest/dist/css/splide.min.css">
  <style>
    .splide__slide img {
      width: 100%;
      height: auto;
    }
  </style>
</head>
<body>

<div class="splide">
  <div class="splide__track">
    <ul class="splide__list">
      <li class="splide__slide">
        <img src="https://placehold.co/800x400?text=Slide+1" alt="">
      </li>
      <li class="splide__slide">
        <img src="https://placehold.co/800x400?text=Slide+2" alt="">
      </li>
      <li class="splide__slide">
        <img src="https://placehold.co/800x400?text=Slide+3" alt="">
      </li>
    </ul>
  </div>
</div>

<!-- Splide JS -->
<script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@latest/dist/js/splide.min.js"></script>
<script>
  new Splide('.splide', ${configString}).mount();
</script>

</body>
</html>`;

      default:
        return configString;
    }
  };

  useEffect(() => {
    if (!isEditing) {
      setEditableCode(JSON.stringify(cleanConfig(config), null, 2));
    }
  }, [config, isEditing]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getExportCode());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast.success(t("code.copied"));
    } catch (err) {
      toast.error("Failed to copy code");
    }
  };

  const handleDownload = () => {
    const code = getExportCode();
    const extension =
      exportFormat === "json"
        ? "json"
        : exportFormat === "html"
          ? "html"
          : "js";
    const filename = `splide-config.${extension}`;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(t("code.downloaded") || "File downloaded");
  };

  const handleEdit = () => {
    setExportFormat("json");
    setEditableCode(JSON.stringify(cleanConfig(config), null, 2));
    setIsEditing(true);
    setError(null);
  };

  const applyChanges = () => {
    try {
      const parsedConfig = JSON.parse(editableCode);
      if (onChange) {
        onChange(parsedConfig);
      }
      setIsEditing(false);
      setError(null);
      toast.success(t("code.config_updated"));
    } catch (err) {
      setError("Error: " + (err as Error).message);
      toast.error(t("code.json_error"));
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setError(null);
  };

  return (
    <div
      className={cn(
        "bg-card flex flex-col overflow-hidden h-full rounded-tr-2xl md:w-100 w-full min-w-100 md:max-w-100 max-w-full",
        className,
      )}
    >
      <div className="flex flex-col border-b bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-sm font-semibold tracking-tight">
            {t("code.title")}
          </h2>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        onClick={handleEdit}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">{t("code.edit")}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t("code.edit")}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        onClick={handleDownload}
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">{t("code.download")}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t("code.download")}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        onClick={handleCopy}
                        disabled={isCopied}
                      >
                        <div className="relative w-4 h-4">
                          <span
                            className={cn(
                              "absolute inset-0 transition-opacity duration-300",
                              isCopied ? "opacity-0" : "opacity-100",
                            )}
                          >
                            <Copy className="h-4 w-4" />
                          </span>
                          <span
                            className={cn(
                              "absolute inset-0 transition-opacity duration-300",
                              isCopied ? "opacity-100" : "opacity-0",
                            )}
                          >
                            <Check className="h-4 w-4 text-green-500" />
                          </span>
                        </div>
                        {isCopied ? t("code.copied") : t("code.copy")}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t("code.copy")}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            ) : (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        onClick={applyChanges}
                      >
                        <Save className="h-4 w-4" />
                        <span className="sr-only">{t("code.save")}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t("code.save")}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        onClick={cancelEditing}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">{t("code.cancel")}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t("code.cancel")}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
          </div>
        </div>

        {/* Format Selector */}
        {!isEditing && (
          <div className="flex gap-1 px-2 py-2 overflow-x-auto no-scrollbar border-t border-border">
            {(["json", "vanilla", "react", "html"] as ExportFormat[]).map(
              (format) => (
                <Button
                  key={format}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-7 px-2.5 text-[11px] font-medium rounded-md transition-all whitespace-nowrap",
                    exportFormat === format
                      ? "bg-primary/10 text-primary hover:bg-primary/20"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                  onClick={() => setExportFormat(format)}
                >
                  {format === "vanilla" && (
                    <Terminal className="w-3 h-3 mr-1.5" />
                  )}
                  {format === "react" && (
                    <FileCode2 className="w-3 h-3 mr-1.5" />
                  )}
                  {format === "html" && <Code2 className="w-3 h-3 mr-1.5" />}
                  {t(`code.${format}`)}
                </Button>
              ),
            )}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto bg-zinc-950">
        {isEditing ? (
          <div className="relative h-full">
            <textarea
              value={editableCode}
              onChange={(e) => setEditableCode(e.target.value)}
              className="w-full h-full font-mono text-sm p-4 bg-transparent text-zinc-300 border-none outline-hidden resize-none selection:bg-primary/30"
              spellCheck={false}
              style={{
                lineHeight: "1.6",
                tabSize: 2,
              }}
            />
            {error && (
              <div className="absolute bottom-4 left-4 right-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] p-2 rounded-lg backdrop-blur-md">
                {error}
              </div>
            )}
          </div>
        ) : (
          <SyntaxHighlighter
            language={
              exportFormat === "json"
                ? "json"
                : exportFormat === "react"
                  ? "typescript"
                  : "html"
            }
            style={vs2015}
            customStyle={{
              margin: 0,
              padding: "1.25rem",
              background: "transparent",
              fontSize: "12px",
              lineHeight: "1.7",
            }}
          >
            {getExportCode()}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
};
