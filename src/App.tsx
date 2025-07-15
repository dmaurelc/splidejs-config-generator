import React from "react";
import { AppContent } from "./components/AppContent";
import { TooltipProvider } from "./components/ui/tooltip";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Toaster } from "sonner";

function App() {
  return (
    <LanguageProvider>
      <TooltipProvider>
        <AppContent />
        <Toaster position="top-center" />
      </TooltipProvider>
    </LanguageProvider>
  );
}

export default App;
