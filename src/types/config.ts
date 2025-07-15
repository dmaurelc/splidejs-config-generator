export interface SplideConfig {
  // Basic Options
  type?: 'loop' | 'slide' | 'fade';
  perPage?: number;
  perMove?: number;
  focus?: number | 'center';
  gap?: string;
  
  // Dimensions
  width?: string;
  height?: string;
  
  // Timing
  speed?: number;
  interval?: number;
  
  // Controls
  arrows?: boolean;
  pagination?: boolean;
  drag?: boolean;
  rewind?: boolean;
  
  // Autoplay
  autoplay?: boolean;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  
  // Position & Layout
  direction?: 'ltr' | 'rtl' | 'ttb';
  start?: number;
  
  // Padding Configuration
  padding?: { left?: string; right?: string; top?: string; bottom?: string };
  paddingType?: 'horizontal' | 'vertical';
  paddingUnit?: 'px' | 'rem' | '%' | 'em' | 'vw';
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  
  // Advanced
  rewindSpeed?: number;
  rewindByDrag?: boolean;
  isNavigation?: boolean;
  trimSpace?: boolean;
  updateOnMove?: boolean;
  destroy?: boolean;

  // Keyboard Navigation
  keyboard?: boolean | 'global';
  
  // Transiciones y Animaciones
  easing?: string;
  dragMode?: boolean | 'free';
  snap?: boolean;
  flickPower?: number;
  flickMaxPages?: number;

  // Performance y Lazy Loading
  lazyLoad?: boolean | 'nearby' | 'sequential';
  preloadPages?: number;
  waitForTransition?: boolean;

  // Clones (Modo Loop)
  clones?: number;
  cloneStatus?: boolean;

  // Breakpoints
  breakpoints?: { [key: number]: Partial<SplideConfig> };
}

export interface Breakpoint {
  width: number;
  label: string;
}

export interface ConfigField {
  key: keyof SplideConfig;
  label: string;
  type: 'boolean' | 'select' | 'dimension' | 'number' | 'text';
  description: string;
  defaultValue?: string | number | boolean | null;
  options?: string[];
  optionValues?: (string | number | boolean | null)[];
  units?: string[];
  step?: number;
}

export interface ConfigSection {
  title: string;
  fields: ConfigField[];
}