import { ConfigSection } from '../types/config';

export const configSections: ConfigSection[] = [
  {
    title: 'Basic Options',
    fields: [
      {
        key: 'type',
        label: 'Type',
        type: 'select',
        options: ['Slide', 'Loop', 'Fade'],
        optionValues: ['slide', 'loop', 'fade'],
        description: 'Type of the slider movement',
        defaultValue: 'loop'
      },
      {
        key: 'width',
        label: 'Width',
        type: 'dimension',
        description: 'Width of the slider',
        units: ['px', 'rem', 'em', '%', 'vw']
      },
      {
        key: 'height',
        label: 'Height',
        type: 'dimension',
        description: 'Height of the slider',
        defaultValue: '400px',
        units: ['px', 'rem', 'em', '%', 'vh']
      },
      {
        key: 'perPage',
        label: 'Items to show',
        type: 'number',
        description: 'Number of slides to show per page',
        defaultValue: 1
      },
      {
        key: 'perMove',
        label: 'Items to scroll',
        type: 'number',
        description: 'Number of slides to move at once',
        defaultValue: 1
      },
      {
        key: 'gap',
        label: 'Gap',
        type: 'dimension',
        description: 'Gap between slides',
        defaultValue: '1rem',
        units: ['px', 'rem', 'em', '%', 'vw']
      }
    ]
  },
  {
    title: 'Position & Layout',
    fields: [
      {
        key: 'direction',
        label: 'Direction',
        type: 'select',
        options: ['Left to Right', 'Right to Left', 'Top to Bottom'],
        optionValues: ['ltr', 'rtl', 'ttb'],
        description: 'Slider direction',
        defaultValue: 'ltr'
      },
      {
        key: 'focus',
        label: 'Focus Position',
        type: 'select',
        options: ['Center', 'First Slide', 'Second Slide', 'Third Slide', 'Fourth Slide'],
        optionValues: ['center', '0', '1', '2', '3'],
        description: 'Position of the focused slide',
        defaultValue: '0'
      },
      {
        key: 'start',
        label: 'Start Index',
        type: 'number',
        description: 'Index of the initial slide',
        defaultValue: 0
      }
    ]
  },
  {
    title: 'Padding',
    fields: [
      {
        key: 'paddingType',
        label: 'Padding Type',
        type: 'select',
        options: ['Horizontal', 'Vertical'],
        optionValues: ['horizontal', 'vertical'],
        description: 'Type of padding to apply'
      },
      {
        key: 'paddingUnit',
        label: 'Unit',
        type: 'select',
        options: ['px', 'rem', 'em', '%', 'vw'],
        description: 'Unit for padding values'
      },
      {
        key: 'paddingLeft',
        label: 'Left',
        type: 'number',
        description: 'Left padding value'
      },
      {
        key: 'paddingRight',
        label: 'Right',
        type: 'number',
        description: 'Right padding value'
      },
      {
        key: 'paddingTop',
        label: 'Top',
        type: 'number',
        description: 'Top padding value'
      },
      {
        key: 'paddingBottom',
        label: 'Bottom',
        type: 'number',
        description: 'Bottom padding value'
      }
    ]
  },
  {
    title: 'Timing',
    fields: [
      {
        key: 'speed',
        label: 'Speed',
        type: 'number',
        description: 'Transition speed in milliseconds',
        defaultValue: 400,
        step: 100
      },
      {
        key: 'interval',
        label: 'Interval',
        type: 'number',
        description: 'Autoplay interval in milliseconds',
        defaultValue: 3000,
        step: 1000
      },
      {
        key: 'autoplay',
        label: 'Autoplay',
        type: 'boolean',
        description: 'Enable automatic sliding'
      },
      {
        key: 'pauseOnHover',
        label: 'Pause on Hover',
        type: 'boolean',
        description: 'Pause autoplay on hover'
      },
      {
        key: 'pauseOnFocus',
        label: 'Pause on Focus',
        type: 'boolean',
        description: 'Pause autoplay when slider is focused'
      }
    ]
  },
  {
    title: 'Controls',
    fields: [
      {
        key: 'arrows',
        label: 'Arrows',
        type: 'boolean',
        description: 'Show navigation arrows',
        defaultValue: true
      },
      {
        key: 'pagination',
        label: 'Pagination',
        type: 'boolean',
        description: 'Show pagination dots',
        defaultValue: true
      },
      {
        key: 'drag',
        label: 'Drag',
        type: 'boolean',
        description: 'Enable drag to slide'
      },
      {
        key: 'rewind',
        label: 'Rewind',
        type: 'boolean',
        description: 'Go back to the first slide when reaching the end (only for slide and fade types)'
      },
      {
        key: 'rewindByDrag',
        label: 'Rewind by drag',
        type: 'boolean',
        description: 'Whether to allow rewinding slides by drag'
      },
      {
        key: 'rewindSpeed',
        label: 'Rewind speed (ms)',
        type: 'number',
        description: 'Rewind speed in milliseconds',
        step: 100
      }
    ]
  },
  {
    title: 'Keyboard Navigation',
    fields: [
      {
        key: 'keyboard',
        label: 'Keyboard Control',
        type: 'select',
        options: ['Disabled', 'When Focused', 'Global'],
        optionValues: [false, true, 'global'],
        description: 'Configure keyboard navigation behavior. "When Focused" enables shortcuts only when the carousel has focus, "Global" enables them globally (not recommended)',
        defaultValue: false
      }
    ]
  },
  {
    title: 'Advanced Options',
    fields: [
      {
        key: 'destroy',
        label: 'Destroy',
        type: 'boolean',
        description: "Completely destroys the carousel when it's not active. Useful for improving performance in complex applications.",
        defaultValue: false
      }
    ]
  }
];