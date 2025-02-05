import React, { useState } from 'react';
import { ConfigPanel } from './components/ConfigPanel';
import { Preview } from './components/Preview';
import { CodeOutput } from './components/CodeOutput';
import { SplideConfig } from './types/config';
import { configSections } from './data/configSections';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from 'sonner';

const initialConfig: SplideConfig = configSections.reduce((acc, section) => {
  section.fields.forEach((field) => {
    if (field.defaultValue !== undefined) {
      acc[field.key] = field.defaultValue;
    }
  });
  return acc;
}, {} as SplideConfig);

function App() {
  const [config, setConfig] = useState<SplideConfig>(initialConfig);
  const [activeBreakpoint, setActiveBreakpoint] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex flex-col">
          <header className={`bg-card border-b px-6 py-4 ${isFullscreen ? 'hidden' : ''}`}>
            <h1 className="text-xl font-semibold">
              SplideJS Configuration Generator
            </h1>
          </header>

          <div className="flex-1 flex overflow-hidden">
            <ConfigPanel 
              config={config} 
              onChange={setConfig}
              activeBreakpoint={activeBreakpoint}
              className={isFullscreen ? 'hidden' : ''}
            />
            
            <main className="flex-1 overflow-hidden">
              <Preview 
                config={config}
                activeBreakpoint={activeBreakpoint}
                onBreakpointChange={setActiveBreakpoint}
                isFullscreen={isFullscreen}
                onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
              />
            </main>

            <CodeOutput 
              config={config} 
              className={isFullscreen ? 'hidden' : ''}
            />
          </div>
        </div>

        <footer className={`bg-card border-t px-6 py-3 text-sm text-muted-foreground flex items-center justify-center gap-2 ${isFullscreen ? 'hidden' : ''}`}>
          <span>SplideJS Configuration Generator</span>
          <span>-</span>
          <span className="flex items-center gap-1">
            Creado con IA.
          </span>
        </footer>
      </div>
      <Toaster position="top-center" />
    </TooltipProvider>
  );
}

export default App;