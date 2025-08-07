# SplideJS Configuration Generator

A powerful and intuitive visual configuration generator for SplideJS carousels. This tool helps developers quickly create and customize SplideJS configurations with real-time preview.

![SplideJS Configuration Generator](public/image-og.png)

## Features

- 🎯 **Visual Configuration**: Intuitive interface to customize all SplideJS options
- 🖥️ **Real-time Preview**: See your changes instantly with a live carousel preview
- 📱 **Mobile Optimized**: Fully responsive design with mobile-specific UI adaptations
- 🌐 **Multi-language Support**: Available in multiple languages with easy language switching
- 📱 **Responsive Testing**: Test your configuration across different breakpoints (Desktop, Laptop, Tablet, Mobile)
- 📋 **Multiple Export Formats**: Copy configuration as JSON, JavaScript, or TypeScript
- 🎨 **Beautiful UI**: Clean and modern interface built with React and Tailwind CSS
- 🔧 **Advanced Options**: Full access to all SplideJS configuration options
- ⚡ **Performance Optimized**: Fast loading and smooth interactions
- 🎛️ **Sidebar Navigation**: Organized configuration panels with collapsible sections

## Configuration Options

### Basic Settings

- **Type**: Slide, Loop, Fade carousel types
- **Dimensions**: Width, Height, and responsive sizing
- **Layout**: Items per page, gap between slides
- **Direction**: LTR/RTL support
- **Focus**: Focus management and accessibility

### Advanced Features

- **Responsive Breakpoints**: Custom breakpoint configurations
- **Autoplay**: Auto-scrolling with customizable intervals
- **Navigation**: Arrows, pagination dots, and keyboard controls
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Lazy loading and optimization settings
- **Animation**: Transition timing and easing functions
- **Events**: Custom event handling and callbacks

### Export Options

- **JSON**: Standard configuration object
- **JavaScript**: ES6 module format
- **TypeScript**: Typed configuration with interfaces

## Tech Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework with custom configurations
- **Vite** - Fast build tool and dev server with HMR
- **SplideJS** - Lightweight, accessible carousel library
- **Radix UI** - Accessible component primitives (Dialog, Tooltip, etc.)
- **Lucide Icons** - Beautiful, customizable icon library
- **React Hook Form** - Performant forms with easy validation
- **Zustand** - Lightweight state management
- **Framer Motion** - Smooth animations and transitions

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/splidejs-config-generator.git

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
│   ├── ui/             # Reusable UI components
│   ├── ConfigPanel.tsx # Main configuration panel
│   ├── Preview.tsx     # Carousel preview component
│   └── ExportDialog.tsx# Export functionality
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── types/              # TypeScript type definitions
└── styles/             # Global styles and Tailwind config
```

## Mobile & Accessibility Features

### Mobile Optimization

- **Responsive Design**: Fully optimized for mobile devices
- **Touch-Friendly**: Large touch targets and intuitive gestures
- **Mobile-Specific UI**: Simplified interface on mobile with desktop message
- **Performance**: Optimized loading and smooth scrolling on mobile devices

### Accessibility

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order
- **High Contrast**: Support for high contrast mode and color preferences

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
