import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

interface MobileToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export const MobileToggle: React.FC<MobileToggleProps> = ({
  isOpen,
  onToggle,
  className
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className={cn(
        "p-2 h-auto w-auto hover:bg-accent",
        className
      )}
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    >
      {isOpen ? (
        <X className="h-5 w-5" />
      ) : (
        <Menu className="h-5 w-5" />
      )}
    </Button>
  );
};