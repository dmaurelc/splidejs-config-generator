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
  heightRatio?: number;
  autoWidth?: boolean;
  autoHeight?: boolean;

  // Timing
  speed?: number;
  interval?: number;

  // Controls
  arrows?: boolean | 'slider';
  pagination?: boolean | 'slider';
  drag?: boolean;
  rewind?: boolean;

  // Autoplay
  autoplay?: boolean;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  resetProgress?: boolean;

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

  // Transitions & Animation
  easing?: string;
  dragMode?: boolean | 'free';
  snap?: boolean;
  flickPower?: number;
  flickMaxPages?: number;

  // Drag & Touch Thresholds
  dragAngleThreshold?: number;
  swipeDistanceThreshold?: number;
  flickVelocityThreshold?: number;

  // Performance & Lazy Loading
  lazyLoad?: boolean | 'nearby' | 'sequential';
  preloadPages?: number;
  waitForTransition?: boolean;

  // Clones (Loop Mode)
  clones?: number;
  cloneStatus?: boolean;

  // Keyboard Navigation
  keyboard?: boolean | 'global' | 'focused';

  // Accessibility
  accessibility?: boolean;
  slideFocus?: boolean;

  // Advanced
  rewindSpeed?: number;
  rewindByDrag?: boolean;
  isNavigation?: boolean;
  trimSpace?: boolean | 'move';
  updateOnMove?: boolean;
  destroy?: boolean;
  cover?: boolean;
  throttle?: number;

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
