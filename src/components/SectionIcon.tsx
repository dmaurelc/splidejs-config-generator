import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '../lib/utils';

interface SectionIconProps {
  iconName: string;
  className?: string;
}

export const SectionIcon: React.FC<SectionIconProps> = ({
  iconName,
  className
}) => {
  const IconComponent = (LucideIcons as any)[iconName];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      className={cn(
        "h-5 w-5 text-primary shrink-0",
        className
      )}
    />
  );
};
