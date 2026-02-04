import React, { useState } from "react";
import { ConfigPanel } from "./ConfigPanel";
import { Preview } from "./Preview";
import { CodeOutput } from "./CodeOutput";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";
import { MobileToggle } from "./MobileToggle";
import { MobileTabs, MobileTabType } from "./MobileTabs";
import { MobileSidebar } from "./MobileSidebar";
import { SplideConfig } from "../types/config";
import { useLanguage } from "../contexts/LanguageContext";
import { useIsMobile } from "../hooks/useIsMobile";
import { initialConfig } from "../config/initialConfig";
import { cn } from "../lib/utils";

export const AppContent: React.FC = () => {
  const [config, setConfig] = useState<SplideConfig>(initialConfig);
  const [activeBreakpoint, setActiveBreakpoint] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [totalSlides, setTotalSlides] = useState(8);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<MobileTabType>("preview");
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  // Cerrar sidebar cuando se cambia a desktop
  React.useEffect(() => {
    if (!isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  }, [isMobile, isSidebarOpen]);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background flex flex-col h-screen">
        {/* Mobile Sidebar */}
        <MobileSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          config={config}
          onChange={setConfig}
          activeBreakpoint={activeBreakpoint}
        />

        <div className="flex-1 flex flex-col h-full">
          {/* Mobile Header */}
          <header className="bg-card border-b px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <MobileToggle
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
              />
              <h1 className="text-lg font-semibold">{t("app.title")}</h1>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </header>

          {/* Mobile Tabs */}
          <div className="px-4 py-3 border-b">
            <MobileTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Mobile Content */}
          <main className="flex-1 overflow-hidden h-full">
            {activeTab === "preview" ? (
              <Preview
                config={config}
                activeBreakpoint={activeBreakpoint}
                onBreakpointChange={setActiveBreakpoint}
                isFullscreen={false}
                onFullscreenToggle={() => {}}
                totalSlides={totalSlides}
                onTotalSlidesChange={setTotalSlides}
              />
            ) : (
              <div className="h-full">
                <CodeOutput
                  config={config}
                  onChange={setConfig}
                  className="h-full"
                />
              </div>
            )}
          </main>

          {/* Mobile Footer */}
          <footer className="bg-card border-t px-4 py-2 text-center text-xs text-muted-foreground">
            {t("footer.madeWith")}{" "}
            <a
              href="https://github.com/dmaurelc/splidejs-config-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {t("footer.author")}
            </a>
          </footer>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="min-h-screen bg-background flex flex-col h-screen">
      <div className="flex-1 flex flex-col h-full">
        <header
          className={`bg-card/80 backdrop-blur-md border-b px-6 py-4 flex justify-between items-center transition-all duration-300 ${
            isFullscreen ? "hidden" : ""
          }`}
        >
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
            {t("app.title")}
          </h1>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden h-full">
          <ConfigPanel
            config={config}
            onChange={setConfig}
            activeBreakpoint={activeBreakpoint}
            className={cn(
              isFullscreen ? "hidden" : "",
              "glass-panel border-y-0",
            )}
          />

          <main className="flex-1 overflow-hidden relative">
            <Preview
              config={config}
              activeBreakpoint={activeBreakpoint}
              onBreakpointChange={setActiveBreakpoint}
              isFullscreen={isFullscreen}
              onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
              totalSlides={totalSlides}
              onTotalSlidesChange={setTotalSlides}
            />
          </main>

          <CodeOutput
            config={config}
            className={cn(
              isFullscreen ? "hidden" : "h-full",
              "glass-panel border-y-0",
            )}
            onChange={setConfig}
          />
        </div>
      </div>

      <footer
        className={`bg-card border-t px-6 py-3 text-center text-sm text-muted-foreground ${
          isFullscreen ? "hidden" : ""
        }`}
      >
        {t("footer.madeWith")}{" "}
        <a
          href="https://github.com/dmaurelc/splidejs-config-generator"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {t("footer.author")}
        </a>
      </footer>
    </div>
  );
};
