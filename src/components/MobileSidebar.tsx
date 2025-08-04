import React, { useEffect } from 'react';
import { cn } from '../lib/utils';
import { ConfigPanel } from './ConfigPanel';
import { SplideConfig } from '../types/config';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  config: SplideConfig;
  onChange: (config: SplideConfig) => void;
  activeBreakpoint: number | null;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  onClose,
  config,
  onChange,
  activeBreakpoint
}) => {
  // Cerrar sidebar al presionar Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevenir scroll del body cuando el sidebar está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-80 bg-background border-r z-50 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full overflow-y-auto">
          <ConfigPanel
            config={config}
            onChange={onChange}
            activeBreakpoint={activeBreakpoint}
            className="h-full"
          />
        </div>
      </div>
    </>
  );
};