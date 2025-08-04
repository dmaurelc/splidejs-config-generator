import React from 'react';
import { Eye, Code } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export type MobileTabType = 'preview' | 'code';

interface MobileTabsProps {
  activeTab: MobileTabType;
  onTabChange: (tab: MobileTabType) => void;
  className?: string;
}

export const MobileTabs: React.FC<MobileTabsProps> = ({
  activeTab,
  onTabChange,
  className
}) => {
  const { t } = useLanguage();

  const tabs = [
    {
      id: 'preview' as MobileTabType,
      label: t('preview.title'),
      icon: Eye
    },
    {
      id: 'code' as MobileTabType,
      label: t('code.title'),
      icon: Code
    }
  ];

  return (
    <div className={cn(
      "flex bg-muted p-1 rounded-lg",
      className
    )}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};