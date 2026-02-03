import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useLanguage } from "../contexts/LanguageContext";

export const ThemeToggle: React.FC = () => {
  const { theme, effectiveTheme, setTheme } = useTheme();
  const { t } = useLanguage();

  const cycleTheme = () => {
    setTheme(effectiveTheme === "light" ? "dark" : "light");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            className="h-8 w-8"
            aria-label={t("theme.toggle")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {t(`theme.${effectiveTheme}`)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
