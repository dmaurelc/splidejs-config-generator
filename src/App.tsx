import React from "react";
import { AppContent } from "./components/AppContent";
import { TooltipProvider } from "./components/ui/tooltip";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "sonner";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <AppContent />
          <Toaster position="top-center" />
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
