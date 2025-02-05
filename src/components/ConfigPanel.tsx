import React from 'react';
import { Info, RotateCcw } from 'lucide-react';
import { configSections } from '../data/configSections';
import { SplideConfig } from '../types/config';
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
  const handleChange = (key: keyof SplideConfig, value: any) => {
    if (key === 'perPage' || key === 'perMove') {
      value = Math.max(1, value);
    }

    // Si el tipo cambia a fade, resetear perPage y perMove a 1
    if (key === 'type' && value === 'fade') {
      if (activeBreakpoint) {
        const breakpointConfig = {
          ...config.breakpoints?.[activeBreakpoint],
          [key]: value,
          perPage: 1,
          perMove: 1
        };
        
        onChange({
          ...config,
          breakpoints: {
            ...config.breakpoints,
            [activeBreakpoint]: breakpointConfig
          }
        });
      } else {
        onChange({ 
          ...config, 
          [key]: value,
          perPage: 1,
          perMove: 1
        });
      }
      return;
    }

    if (activeBreakpoint) {
      const breakpointConfig = {
        ...config.breakpoints?.[activeBreakpoint],
        [key]: value
      };
      
      const cleanedConfig = Object.fromEntries(
        Object.entries(breakpointConfig).filter(([_, v]) => v != null)
      );
      
      onChange({
        ...config,
        breakpoints: {
          ...config.breakpoints,
          [activeBreakpoint]: cleanedConfig
        }
      });
    } else {
      onChange({ ...config, [key]: value });
    }
  };

  const handleDimensionChange = (key: keyof SplideConfig, value: string, unit: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    handleChange(key, `${numValue}${unit}`);
  };

  const getCurrentValue = (key: keyof SplideConfig, defaultValue: any = '') => {
    if (activeBreakpoint) {
      return config.breakpoints?.[activeBreakpoint]?.[key] ?? config[key] ?? defaultValue;
    }
    return config[key] ?? defaultValue;
  };

  const parseDimensionValue = (dimension: string = '0px') => {
    const match = dimension.match(/^([\d.]+)(.+)$/);
    return match ? { value: match[1], unit: match[2] } : { value: '0', unit: 'px' };
  };

  const getDisplayValue = (field: any, value: any) => {
    if (field.optionValues) {
      const index = field.optionValues.indexOf(value);
      return index !== -1 ? field.options[index] : value;
    }
    return value;
  };

  const shouldShowField = (field: any) => {
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
    const initialConfig = configSections.reduce((acc, section) => {
      section.fields.forEach((field) => {
        if (field.defaultValue !== undefined) {
          acc[field.key] = field.defaultValue;
        }
      });
      return acc;
    }, {} as SplideConfig);

    if (activeBreakpoint) {
      // Reset only the active breakpoint
      onChange({
        ...config,
        breakpoints: {
          ...config.breakpoints,
          [activeBreakpoint]: {}
        }
      });
      toast.success(`Breakpoint ${activeBreakpoint}px reset successfully`);
    } else {
      // Reset all configuration
      onChange({ ...initialConfig });
      toast.success('All settings reset to defaults');
    }
  };

  return (
    <div className={cn("w-80 bg-card border-r flex flex-col overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-sm font-medium">Configuration</h2>
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
                Reset
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {activeBreakpoint 
                ? `Reset breakpoint ${activeBreakpoint}px settings` 
                : 'Reset all settings to defaults'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Accordion type="single" collapsible className="w-full">
          {configSections.map((section) => (
            <AccordionItem key={section.title} value={section.title}>
              <AccordionTrigger className="px-4">
                <span className="text-sm font-medium">{section.title}</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 py-2 space-y-4">
                  {section.fields.filter(shouldShowField).map((field) => (
                    <div key={field.key} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={field.key} className="text-sm">
                          {field.label}
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">{field.description}</p>
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
                            if (field.optionValues) {
                              const index = field.options.indexOf(value);
                              handleChange(field.key, field.optionValues[index]);
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
                                {option}
                              </SelectItem>
                            ))}
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
                              ))}
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