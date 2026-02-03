import React from 'react';
import { Info, RotateCcw } from 'lucide-react';
import { configSections } from '../data/configSections';
import { SplideConfig, ConfigField } from '../types/config';
import { useLanguage } from '../contexts/LanguageContext';
import { initialConfig } from '../config/initialConfig';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './ui/accordion';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Button } from './ui/button';
import { SectionIcon } from './SectionIcon';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

interface ConfigPanelProps {
  config: SplideConfig;
  onChange: (config: SplideConfig) => void;
  activeBreakpoint: number | null;
  className?: string;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ 
  config, 
  onChange,
  activeBreakpoint,
  className
}) => {
  const { t } = useLanguage();
  // Función para ajustar valores automáticamente según el breakpoint
  const getSmartValue = (key: keyof SplideConfig, originalValue: any, targetBreakpoint: number): any => {
    if (key === 'perPage' && typeof originalValue === 'number') {
      // Ajustar perPage según el tamaño de pantalla
      if (targetBreakpoint <= 480) { // Mobile
        return Math.min(originalValue, 2); // Máximo 2 en mobile
      } else if (targetBreakpoint <= 767) { // Tablet
        return Math.min(originalValue, 3); // Máximo 3 en tablet
      } else if (targetBreakpoint <= 1280) { // Laptop
        return Math.min(originalValue, Math.max(3, originalValue - 1)); // Reducir en 1 pero mínimo 3
      }
    }
    
    if (key === 'perMove' && typeof originalValue === 'number') {
      // perMove nunca debe ser mayor que perPage
      const adjustedPerPage = getSmartValue('perPage', getCurrentValue('perPage', 3), targetBreakpoint);
      return Math.min(originalValue, adjustedPerPage);
    }
    
    if (key === 'gap' && typeof originalValue === 'string') {
      // Reducir gap en pantallas más pequeñas
      const numValue = parseFloat(originalValue);
      if (!isNaN(numValue)) {
        const unit = originalValue.replace(numValue.toString(), '');
        if (targetBreakpoint <= 480) { // Mobile
          return `${Math.max(0.5, numValue * 0.6)}${unit}`;
        } else if (targetBreakpoint <= 767) { // Tablet
          return `${Math.max(0.75, numValue * 0.8)}${unit}`;
        }
      }
    }
    
    // Ajustar dimensiones (width, height) para pantallas más pequeñas
    if ((key === 'width' || key === 'height') && typeof originalValue === 'string') {
      const numValue = parseFloat(originalValue);
      if (!isNaN(numValue)) {
        const unit = originalValue.replace(numValue.toString(), '');
        // Solo ajustar si la unidad es px, rem, o em (no porcentajes o viewport units)
        if (['px', 'rem', 'em'].includes(unit)) {
          if (targetBreakpoint <= 480) { // Mobile
            return `${Math.max(200, numValue * 0.7)}${unit}`;
          } else if (targetBreakpoint <= 767) { // Tablet
            return `${Math.max(250, numValue * 0.85)}${unit}`;
          }
        }
      }
    }
    
    // Ajustar padding para pantallas más pequeñas
    if (['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'].includes(key) && typeof originalValue === 'number') {
      if (targetBreakpoint <= 480) { // Mobile
        return Math.max(0, Math.floor(originalValue * 0.6));
      } else if (targetBreakpoint <= 767) { // Tablet
        return Math.max(0, Math.floor(originalValue * 0.8));
      }
    }
    
    // Ajustar velocidades para pantallas más pequeñas (más rápido en móvil)
    if ((key === 'speed' || key === 'rewindSpeed') && typeof originalValue === 'number') {
      if (targetBreakpoint <= 480) { // Mobile
        return Math.max(200, Math.floor(originalValue * 0.8)); // Más rápido en móvil
      } else if (targetBreakpoint <= 767) { // Tablet
        return Math.max(250, Math.floor(originalValue * 0.9));
      }
    }
    
    // Ajustar intervalo de autoplay para pantallas más pequeñas
    if (key === 'interval' && typeof originalValue === 'number') {
      if (targetBreakpoint <= 480) { // Mobile
        return Math.max(3000, Math.floor(originalValue * 0.8)); // Intervalo más corto en móvil
      } else if (targetBreakpoint <= 767) { // Tablet
        return Math.max(4000, Math.floor(originalValue * 0.9));
      }
    }
    
    // Ajustar flickPower para pantallas táctiles
    if (key === 'flickPower' && typeof originalValue === 'number') {
      if (targetBreakpoint <= 767) { // Mobile y Tablet (pantallas táctiles)
        return Math.max(300, Math.floor(originalValue * 0.7)); // Menos sensible en táctil
      }
    }
    
    return originalValue;
  };

  // Función para propagar cambios a breakpoints inferiores
  const cascadeToSmallerBreakpoints = (updatedConfig: SplideConfig, changedKey: keyof SplideConfig, newValue: any, currentBreakpoint: number | null): SplideConfig => {
    const newBreakpoints = updatedConfig.breakpoints ? { ...updatedConfig.breakpoints } : {};
    
    if (!currentBreakpoint) {
      // Si estamos en desktop (sin breakpoint), propagar a todos los breakpoints
      const breakpointWidths = [1280, 767, 480]; // Laptop, Tablet, Mobile
      
      breakpointWidths.forEach(width => {
        // Solo propagar si el breakpoint no tiene ya un valor personalizado para esta propiedad
        if (!newBreakpoints[width] || (newBreakpoints[width] as any)[changedKey] === undefined) {
          const smartValue = getSmartValue(changedKey, newValue, width);
          newBreakpoints[width] = {
            ...newBreakpoints[width],
            [changedKey]: smartValue
          } as Partial<SplideConfig>;
        }
      });
    } else {
      // Si estamos en un breakpoint específico, propagar solo a los menores
      const breakpointWidths = [1280, 767, 480];
      const currentIndex = breakpointWidths.indexOf(currentBreakpoint);
      
      if (currentIndex !== -1) {
        const smallerBreakpoints = breakpointWidths.slice(currentIndex + 1);
        
        smallerBreakpoints.forEach(width => {
          // Solo propagar si el breakpoint no tiene ya un valor personalizado para esta propiedad
          if (!newBreakpoints[width] || (newBreakpoints[width] as any)[changedKey] === undefined) {
            const smartValue = getSmartValue(changedKey, newValue, width);
            newBreakpoints[width] = {
              ...newBreakpoints[width],
              [changedKey]: smartValue
            } as Partial<SplideConfig>;
          }
        });
      }
    }
    
    return { ...updatedConfig, breakpoints: newBreakpoints };
  };

  const handleChange = (key: keyof SplideConfig, value: string | number | boolean): void => {
    if (key === 'perPage' || key === 'perMove') {
      value = Math.max(1, Number(value));
    }

    // Si el tipo cambia a fade, resetear perPage y perMove a 1
    if (key === 'type' && value === 'fade') {
      if (activeBreakpoint) {
        const breakpointConfig: Partial<SplideConfig> = {
          ...config.breakpoints?.[activeBreakpoint],
          [key]: value,
          perPage: 1,
          perMove: 1
        };
        
        let updatedConfig = {
          ...config,
          breakpoints: {
            ...config.breakpoints,
            [activeBreakpoint]: breakpointConfig
          }
        };
        
        // Propagar perPage y perMove a breakpoints menores
        updatedConfig = {
          ...cascadeToSmallerBreakpoints(updatedConfig, 'perPage', 1, activeBreakpoint),
          breakpoints: cascadeToSmallerBreakpoints(updatedConfig, 'perPage', 1, activeBreakpoint).breakpoints || {}
        };
        updatedConfig = {
          ...cascadeToSmallerBreakpoints(updatedConfig, 'perMove', 1, activeBreakpoint),
          breakpoints: cascadeToSmallerBreakpoints(updatedConfig, 'perMove', 1, activeBreakpoint).breakpoints || {}
        };
        
        onChange(updatedConfig);
      } else {
        let updatedConfig: SplideConfig = { 
          ...config, 
          [key]: value as 'loop' | 'slide' | 'fade',
          perPage: 1,
          perMove: 1
        };
        
        // Propagar a todos los breakpoints
        updatedConfig = {
          ...cascadeToSmallerBreakpoints(updatedConfig, 'perPage', 1, null),
          breakpoints: cascadeToSmallerBreakpoints(updatedConfig, 'perPage', 1, null).breakpoints || {}
        };
        updatedConfig = {
          ...cascadeToSmallerBreakpoints(updatedConfig, 'perMove', 1, null),
          breakpoints: cascadeToSmallerBreakpoints(updatedConfig, 'perMove', 1, null).breakpoints || {}
        };
        
        onChange(updatedConfig);
      }
      return;
    }

    let updatedConfig: SplideConfig;
    
    if (activeBreakpoint) {
      const breakpointConfig = {
        ...config.breakpoints?.[activeBreakpoint],
        [key]: value
      };
      
      const cleanedConfig = Object.fromEntries(
        Object.entries(breakpointConfig).filter(([, v]) => v != null)
      );
      
      updatedConfig = {
        ...config,
        breakpoints: {
          ...config.breakpoints,
          [activeBreakpoint]: cleanedConfig
        }
      };
    } else {
      updatedConfig = { ...config, [key]: value };
    }
    
    // NOTA: Cascada desactivada - cada breakpoint es completamente independiente
    // Los cambios solo se aplican al breakpoint o config base que se está editando
    const cascadeProperties: (keyof SplideConfig)[] = [
      'perPage', 'perMove', 'gap', 'width', 'height',
      'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom',
      'speed', 'rewindSpeed', 'interval', 'flickPower'
    ];
    // Cascada desactivada - cada breakpoint es independiente
    // if (cascadeProperties.includes(key) && activeBreakpoint !== null) {
    //   const cascadedConfig = cascadeToSmallerBreakpoints(updatedConfig, key, value, activeBreakpoint);
    //   updatedConfig = {
    //     ...cascadedConfig,
    //     breakpoints: cascadedConfig.breakpoints || {}
    //   };
    // }
    
    onChange(updatedConfig);
  };

  const handleDimensionChange = (key: keyof SplideConfig, value: string, unit: string): void => {
    const numValue = value === '' ? 0 : parseFloat(value);
    handleChange(key, `${numValue}${unit}`);
  };

  const getCurrentValue = (key: keyof SplideConfig, defaultValue: any = ''): any => {
    // Herencia con orden: Desktop → Laptop (1280) → Tablet (767) → Mobile (480)
    const getInheritedValue = (): any => {
      if (activeBreakpoint === null) {
        // Desktop - sin herencia
        return config[key];
      }
      if (activeBreakpoint === 1280) {
        // Laptop - hereda de Desktop
        return config.breakpoints?.[1280]?.[key] ?? config[key];
      }
      if (activeBreakpoint === 767) {
        // Tablet - hereda de Laptop, luego Desktop
        return config.breakpoints?.[767]?.[key] ?? config.breakpoints?.[1280]?.[key] ?? config[key];
      }
      if (activeBreakpoint === 480) {
        // Mobile - hereda de Tablet, luego Laptop, luego Desktop
        return config.breakpoints?.[480]?.[key] ?? config.breakpoints?.[767]?.[key] ?? config.breakpoints?.[1280]?.[key] ?? config[key];
      }
      return defaultValue;
    };

    return getInheritedValue() ?? defaultValue;
  };

  const parseDimensionValue = (dimension: string = '0px'): { value: string; unit: string } => {
    const match = dimension.match(/^([\d.]+)(.+)$/);
    return match ? { value: match[1], unit: match[2] } : { value: '0', unit: 'px' };
  };

  const getDisplayValue = (field: ConfigField, value: any): string => {
    if (field.optionValues && field.options) {
      const index = field.optionValues.indexOf(value);
      return index !== -1 ? field.options[index] : String(value);
    }
    return String(value);
  };

  const shouldShowField = (field: ConfigField): boolean => {
    const paddingType = getCurrentValue('paddingType', 'horizontal');
    const currentType = getCurrentValue('type', 'slide');
    const rewindEnabled = getCurrentValue('rewind', false);
    
    // Ocultar campos de padding según el tipo
    if (paddingType === 'horizontal') {
      if (['paddingTop', 'paddingBottom'].includes(field.key)) {
        return false;
      }
    }
    
    if (paddingType === 'vertical') {
      if (['paddingLeft', 'paddingRight'].includes(field.key)) {
        return false;
      }
    }

    // Mostrar rewind solo para tipos slide y fade
    if (field.key === 'rewind' && currentType === 'loop') {
      return false;
    }

    // Mostrar opciones de rewind solo cuando rewind está activo
    if ((field.key === 'rewindByDrag' || field.key === 'rewindSpeed') && !rewindEnabled) {
      return false;
    }

    // Ocultar perPage y perMove cuando el tipo es fade
    if ((field.key === 'perPage' || field.key === 'perMove') && currentType === 'fade') {
      return false;
    }
    
    return true;
  };

  const handleReset = () => {
    if (activeBreakpoint) {
      // Reset only the active breakpoint
      onChange({
        ...config,
        breakpoints: {
          ...config.breakpoints,
          [activeBreakpoint]: {}
        }
      });
      toast.success(t('config.breakpoint_reset', { breakpoint: activeBreakpoint }));
    } else {
      // Reset Desktop configuration - mantener breakpoints existentes
      onChange({
        ...initialConfig,
        breakpoints: config.breakpoints,
      });
      toast.success(t('config.all_reset'));
    }
  };

  return (
    <div className={cn("w-80 bg-card border-r flex flex-col overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-sm font-medium">{t('config.title')}</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4" />
                {t('config.reset')}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {activeBreakpoint 
                ? t('config.reset_breakpoint_tooltip', { breakpoint: activeBreakpoint })
                : t('config.reset_all_tooltip')}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Accordion type="single" collapsible className="w-full">
          {configSections.map((section) => (
            <AccordionItem key={section.title} value={section.title}>
              <AccordionTrigger className="px-4">
                <div className="flex items-center gap-3">
                  {section.icon && <SectionIcon iconName={section.icon} />}
                  <span className="text-sm font-medium">{t(section.title)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 py-2 space-y-4">
                  {section.fields.filter(shouldShowField).map((field) => (
                    <div key={field.key} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={field.key} className="text-sm">
                          {t(field.label)}
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">{t(field.description)}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      {field.type === 'boolean' ? (
                        <Switch
                          id={field.key}
                          checked={getCurrentValue(field.key, false)}
                          onCheckedChange={(checked) => handleChange(field.key, checked)}
                        />
                      ) : field.type === 'select' ? (
                        <Select
                          value={getDisplayValue(field, getCurrentValue(field.key, field.defaultValue))}
                          onValueChange={(value) => {
                            if (field.optionValues && field.options) {
                              const index = field.options.indexOf(value);
                              if (index !== -1 && index < field.optionValues.length) {
                                const optionValue = field.optionValues[index];
                                if (optionValue !== null) {
                                  handleChange(field.key, optionValue);
                                }
                              }
                            } else {
                              handleChange(field.key, value);
                            }
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {t(option)}
                              </SelectItem>
                            )) ?? []}
                          </SelectContent>
                        </Select>
                      ) : field.type === 'dimension' ? (
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            showControls
                            min={0}
                            value={parseDimensionValue(getCurrentValue(field.key, field.defaultValue)).value}
                            onChange={(e) => handleDimensionChange(
                              field.key,
                              e.target.value,
                              parseDimensionValue(getCurrentValue(field.key)).unit
                            )}
                            className="w-full"
                          />
                          <Select
                            value={parseDimensionValue(getCurrentValue(field.key, field.defaultValue)).unit}
                            onValueChange={(unit) => handleDimensionChange(
                              field.key,
                              parseDimensionValue(getCurrentValue(field.key)).value,
                              unit
                            )}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {field.units?.map((unit) => (
                                <SelectItem key={unit} value={unit}>
                                  {unit}
                                </SelectItem>
                              )) ?? []}
                            </SelectContent>
                          </Select>
                        </div>
                      ) : field.type === 'number' ? (
                        <Input
                          id={field.key}
                          type="number"
                          showControls
                          min={field.key === 'perPage' || field.key === 'perMove' ? 1 : 0}
                          step={field.step || 1}
                          value={getCurrentValue(field.key, field.defaultValue)}
                          onChange={(e) => handleChange(
                            field.key, 
                            e.target.value === '' ? '' : Number(e.target.value)
                          )}
                          className="w-full"
                        />
                      ) : (
                        <Input
                          id={field.key}
                          type={field.type}
                          value={getCurrentValue(field.key, field.defaultValue)}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          className="w-full"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};