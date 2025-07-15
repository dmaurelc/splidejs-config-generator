import React, { useState } from "react";
import { ConfigPanel } from "./ConfigPanel";
import { Preview } from "./Preview";
import { CodeOutput } from "./CodeOutput";
import { LanguageSelector } from "./LanguageSelector";
import { SplideConfig } from "../types/config";
import { useLanguage } from "../contexts/LanguageContext";

const initialConfig: SplideConfig = {
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

export const AppContent: React.FC = () => {
  const [config, setConfig] = useState<SplideConfig>(initialConfig);
  const [activeBreakpoint, setActiveBreakpoint] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [totalSlides, setTotalSlides] = useState(8);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col">
        <header
          className={`bg-card border-b px-6 py-4 flex justify-between items-center ${
            isFullscreen ? "hidden" : ""
          }`}
        >
          <h1 className="text-xl font-semibold">{t("app.title")}</h1>
          <LanguageSelector />
        </header>

        <div className="flex-1 flex overflow-hidden">
          <ConfigPanel
            config={config}
            onChange={setConfig}
            activeBreakpoint={activeBreakpoint}
            className={isFullscreen ? "hidden" : ""}
          />

          <main className="flex-1 overflow-hidden">
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
            className={isFullscreen ? "hidden" : ""}
            onChange={setConfig}
          />
        </div>
      </div>

      <footer
        className={`bg-card border-t px-6 py-3 text-center text-sm text-muted-foreground ${
          isFullscreen ? "hidden" : ""
        }`}
      >
        Made with ❤️ by{" "}
        <a
          href="https://github.com/dmaurelc"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Daniel Maurel
        </a>
      </footer>
    </div>
  );
};
