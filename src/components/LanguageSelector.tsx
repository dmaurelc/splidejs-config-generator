import React from "react";
import { Globe } from "lucide-react";
import { useLanguage, Language } from "../contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { value: Language; label: string; flag: string }[] = [
    { value: "es", label: "Español", flag: "🇪🇸" },
    { value: "en", label: "English", flag: "🇺🇸" },
  ];

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select
        value={language}
        onValueChange={(value: Language) => setLanguage(value)}
      >
        <SelectTrigger className="w-35 h-8">
          <SelectValue>
            <div className="flex items-center gap-2">
              <span>
                {languages.find((lang) => lang.value === language)?.flag}
              </span>
              <span className="text-sm">
                {languages.find((lang) => lang.value === language)?.label}
              </span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
