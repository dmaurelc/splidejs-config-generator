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

  // Keyboard Navigation
  keyboard?: boolean | 'global';
  
  // Breakpoints
  breakpoints?: {
    [key: number]: Partial<SplideConfig>;
  };
}

export interface Breakpoint {
  width: number;
  label: string;
}