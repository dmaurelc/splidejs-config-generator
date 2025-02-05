import React from 'react';
import { Copy, Check } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { SplideConfig } from '../types/config';
import { Button } from './ui/button';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

SyntaxHighlighter.registerLanguage('json', json);

interface CodeOutputProps {
  config: SplideConfig;
  className?: string;
}

export const CodeOutput: React.FC<CodeOutputProps> = ({ config, className }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const getPaddingConfig = (cfg: Partial<SplideConfig>, parentConfig?: SplideConfig) => {
    // Heredar paddingType del config principal si no está definido
    const paddingType = cfg.paddingType || parentConfig?.paddingType || 'horizontal';
    const paddingUnit = cfg.paddingUnit || parentConfig?.paddingUnit || 'px';
    const paddingLeft = cfg.paddingLeft ?? 0;
    const paddingRight = cfg.paddingRight ?? 0;
    const paddingTop = cfg.paddingTop ?? 0;
    const paddingBottom = cfg.paddingBottom ?? 0;
    
    if (paddingType === 'horizontal' && (paddingLeft > 0 || paddingRight > 0)) {
      return {
        left: `${paddingLeft}${paddingUnit}`,
        right: `${paddingRight}${paddingUnit}`
      };
    }
    
    if (paddingType === 'vertical' && (paddingTop > 0 || paddingBottom > 0)) {
      return {
        top: `${paddingTop}${paddingUnit}`,
        bottom: `${paddingBottom}${paddingUnit}`
      };
    }
    
    return undefined;
  };

  const cleanConfig = (cfg: SplideConfig): SplideConfig => {
    const cleaned: Partial<SplideConfig> = {};
    
    // Procesar propiedades principales
    Object.entries(cfg).forEach(([key, value]) => {
      // No incluir perPage y perMove si el tipo es fade
      if (cfg.type === 'fade' && (key === 'perPage' || key === 'perMove')) {
        return;
      }

      // No incluir propiedades de padding raw
      if (!key.startsWith('padding') && key !== 'breakpoints' && value !== undefined) {
        cleaned[key as keyof SplideConfig] = value;
      }
    });

    // Agregar padding al config principal si existe
    const padding = getPaddingConfig(cfg);
    if (padding) {
      cleaned.padding = padding;
    }
    
    // Procesar breakpoints si existen
    if (cfg.breakpoints) {
      const cleanedBreakpoints: Record<number, Partial<SplideConfig>> = {};
      
      Object.entries(cfg.breakpoints).forEach(([width, breakpointConfig]) => {
        const cleanedBreakpointConfig: Partial<SplideConfig> = {};
        
        // Procesar propiedades del breakpoint
        Object.entries(breakpointConfig).forEach(([key, value]) => {
          if (cfg.type === 'fade' && (key === 'perPage' || key === 'perMove')) {
            return;
          }

          if (!key.startsWith('padding') && value !== undefined) {
            cleanedBreakpointConfig[key as keyof SplideConfig] = value;
          }
        });

        // Agregar padding al breakpoint si existe, heredando el tipo del config principal
        const breakpointPadding = getPaddingConfig(breakpointConfig, cfg);
        if (breakpointPadding) {
          cleanedBreakpointConfig.padding = breakpointPadding;
        }
        
        if (Object.keys(cleanedBreakpointConfig).length > 0) {
          cleanedBreakpoints[Number(width)] = cleanedBreakpointConfig;
        }
      });
      
      if (Object.keys(cleanedBreakpoints).length > 0) {
        cleaned.breakpoints = cleanedBreakpoints;
      }
    }
    
    return cleaned as SplideConfig;
  };

  const formattedCode = JSON.stringify(cleanConfig(config), null, 2);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(formattedCode);
    setIsCopied(true);
    toast.success('Configuration copied to clipboard!', {
      duration: 2000,
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={cn("w-80 bg-card border-l flex flex-col overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-sm font-medium">Generated Code</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5"
                onClick={copyToClipboard}
                disabled={isCopied}
              >
                <div className="relative w-4 h-4">
                  <span className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    isCopied ? "opacity-0" : "opacity-100"
                  )}>
                    <Copy className="h-4 w-4" />
                  </span>
                  <span className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    isCopied ? "opacity-100" : "opacity-0"
                  )}>
                    <Check className="h-4 w-4 text-green-500" />
                  </span>
                </div>
                {isCopied ? 'Copied' : 'Copy'}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy to clipboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex-1 overflow-auto bg-zinc-900">
        <SyntaxHighlighter
          language="json"
          style={vs2015}
          customStyle={{ 
            margin: 0, 
            padding: '1rem',
            background: 'rgb(24 24 27)',
            fontSize: '13px',
            lineHeight: '1.5'
          }}
        >
          {formattedCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};