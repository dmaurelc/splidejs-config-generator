# SplideJS Configuration Generator

A powerful and intuitive visual configuration generator for SplideJS carousels. This tool helps developers quickly create and customize SplideJS configurations with real-time preview.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)](https://tailwindcss.com/)

![SplideJS Configuration Generator](public/image-og.png)

## Features

- 🎯 **Visual Configuration**: Intuitive interface to customize all SplideJS options
- 🖥️ **Real-time Preview**: See your changes instantly with a live carousel preview
- 📱 **Mobile Optimized**: Fully responsive design with mobile-specific UI adaptations
- 🌐 **Multi-language Support**: Available in Spanish and English with easy language switching
- 📱 **Responsive Testing**: Test your configuration across different breakpoints (Desktop, Laptop, Tablet, Mobile)
- 📋 **JSON Export**: Copy configuration as JSON with editable mode
- 🎨 **Beautiful UI**: Clean and modern interface with DM Sans typography and refined lime/green theme
- 🌙 **Dark Mode**: Toggle between light and dark themes with system preference detection
- 🎨 **Section Icons**: Visual icons for all 8 configuration sections for better navigation
- 🔧 **Advanced Options**: Full access to 50+ SplideJS configuration options organized in 8 sections
- ⚡ **Performance Optimized**: Fast loading and smooth interactions
- 🎛️ **Sidebar Navigation**: Organized configuration panels with collapsible accordion sections
- 👁️ **Visual Inheritance**: Breakpoints visually inherit from Desktop/Laptop configurations

## Configuration Sections

### 1. Slider & Dimensions (8 options)
- **Type**: Slide, Loop, Fade carousel types
- **Dimensions**: Width, Height, Height Ratio, Auto Width, Auto Height
- **Direction**: LTR, RTL, TTB support
- **Start**: Initial slide index

### 2. Slide Layout (10 options)
- **PerPage**: Number of slides visible per page
- **PerMove**: Number of slides to move per action
- **Gap**: Space between slides
- **Focus**: Which slide to focus (0, 1, 2, 3, or center)
- **Padding**: Left, Right, Top, Bottom padding with customizable units

### 3. Navigation (3 options)
- **Arrows**: Show/hide navigation arrows
- **Pagination**: Show/hide pagination dots
- **Keyboard**: Disabled, When focused, or Global

### 4. Drag & Touch (8 options)
- **Drag**: Enable mouse and touch drag
- **DragMode**: Normal or Free mode
- **Snap**: Snap to closest slide
- **FlickPower**: Power of flick gesture
- **FlickMaxPages**: Max pages to move per flick
- **DragAngleThreshold**: Minimum angle for drag
- **SwipeDistanceThreshold**: Distance threshold for swipe
- **FlickVelocityThreshold**: Velocity threshold for flick

### 5. Autoplay (5 options)
- **Autoplay**: Enable automatic playback
- **Interval**: Time between transitions (ms)
- **PauseOnHover**: Pause on mouse hover
- **PauseOnFocus**: Pause when slider is focused
- **ResetProgress**: Reset timer on resume

### 6. Transitions (6 options)
- **Speed**: Transition duration
- **RewindSpeed**: Rewind transition duration
- **Easing**: CSS easing function
- **Rewind**: Rewind to first slide after last
- **RewindByDrag**: Allow rewind by dragging
- **WaitForTransition**: Block actions during transition

### 7. Accessibility (2 options)
- **Accessibility**: Enable ARIA attributes and screen reader texts
- **SlideFocus**: Add tabindex="0" to visible slides

### 8. Advanced (10 options)
- **LazyLoad**: Disabled, Enabled, Nearby, or Sequential
- **PreloadPages**: Pages to preload (useful with lazy loading)
- **Clones**: Number of clones per side (loop mode)
- **CloneStatus**: Add "is-active" class to clones
- **IsNavigation**: Use as navigation for another slider
- **TrimSpace**: Trim empty space (Enabled, Disabled, or Always Move)
- **UpdateOnMove**: Update during movement
- **Destroy**: Destroy slider at breakpoint
- **Cover**: Convert img src to background-image
- **Throttle**: Resize event throttle duration

## Tech Stack

- **React 18.2** - Modern React with hooks and concurrent features
- **TypeScript 5.9** - Type-safe development
- **Tailwind CSS 4.1** - CSS-first framework with inline configuration
- **Vite 7.2** - Fast build tool and dev server with HMR
- **SplideJS** - Lightweight, accessible carousel library
- **Radix UI** - Accessible component primitives (Dialog, Tooltip, Accordion, Select, Switch, etc.)
- **Lucide Icons 0.563** - Beautiful, customizable icon library
- **Sonner 2.0** - Toast notifications
- **DM Sans** - Modern, accessible typeface for excellent readability

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/dmaurelc/splidejs-config-generator.git

# Navigate to the project directory
cd splidejs-config-generator

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server with HMR at http://localhost:5173
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (Radix UI)
│   ├── ConfigPanel.tsx # Main configuration panel with accordion
│   ├── Preview.tsx     # Carousel preview with breakpoints
│   ├── CodeOutput.tsx  # JSON code export with editable mode
│   ├── ThemeToggle.tsx # Dark mode toggle component
│   ├── SectionIcon.tsx # Icon component for sections
│   └── ...
├── config/             # Initial configuration
├── contexts/           # React contexts (Language, Theme)
├── data/               # Configuration sections data
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── types/              # TypeScript type definitions
└── index.css           # Global styles with Tailwind v4 inline theme
```

## Mobile & Accessibility Features

### Mobile Optimization

- **Responsive Design**: Fully optimized for mobile devices
- **Touch-Friendly**: Large touch targets and intuitive gestures
- **Mobile-Specific UI**: Tab-based interface (Preview/Code) on mobile
- **Performance**: Optimized loading and smooth scrolling on mobile devices

### Accessibility

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order
- **High Contrast**: Support for high contrast mode and color preferences

## Documentation

For detailed information about configuration sections and options, see [docs/SECCIONES.md](docs/SECCIONES.md) (Spanish).

### Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

- Follow TypeScript best practices
- Maintain accessibility standards
- Test on multiple devices and browsers
- Keep mobile experience optimized

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

- Built with [SplideJS](https://splidejs.com/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/)
