# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Dark Mode Support**: Toggle between light and dark themes with system preference detection
- **Section Icons**: Visual icons for all 8 configuration sections using Lucide React
  - Sliders (Slider & Dimensions)
  - LayoutGrid (Slide Layout)
  - Compass (Navigation)
  - Hand (Drag & Touch)
  - PlayCircle (Autoplay)
  - Zap (Transitions)
  - Eye (Accessibility)
  - Settings (Advanced)
- **Theme Persistence**: User theme preference saved in localStorage
- **New Theme Components**:
  - `ThemeContext.tsx` - Context for theme management
  - `ThemeToggle.tsx` - Dark mode toggle button with Sun/Moon icons
  - `SectionIcon.tsx` - Reusable icon component for sections

### Changed

- **Typography**: Migrated from Inter to **DM Sans** font for better readability
- **Tailwind CSS**: Upgraded from v3 to **v4.1.18** with CSS-first configuration
  - Removed `tailwind.config.js` (now using inline CSS configuration)
  - Updated `postcss.config.js` to use `@tailwindcss/postcss`
  - Migrated to `@import` syntax and `@theme` directive
- **Border Radius**: Added consistent border radius (`--radius: 0.2rem`) throughout the UI
- **Shadows System**: Enhanced shadow tokens with proper values for light/dark themes
- **Color Scheme**: Refined lime/green theme with improved contrast
- **Dependencies Updated**:
  - typescript: 5.0.2 → 5.9.3
  - lucide-react: 0.263.1 → 0.563.0
  - sonner: 1.4.3 → 2.0.7
  - @types/react, @types/react-dom updated
  - @vitejs/plugin-react updated
  - eslint-plugin-react-refresh updated

### Fixed

- Fixed lazy loading issue with Unsplash images (removed `loading="lazy"` attribute)
- Fixed invalid Tailwind class `max-w-(--breakpoint-2xl)` to `max-w-6xl`
- Fixed Accessibility icon (changed from `UniversalAccess` to `Eye`)
- Updated Unsplash image URLs with proper parameters for reliable loading

### Technical Details

#### Tailwind v4 Migration
- Changed from `@tailwind` directives to `@import "tailwindcss"`
- Migrated to `@theme inline` block for CSS variables
- Updated custom variant syntax: `@custom-variant dark (&:is(.dark *))`
- Moved all configuration to inline CSS in `index.css`

#### Theme Architecture
```css
/* Light theme */
:root {
  --background: #ffffff;
  --primary: #65a30d;
  --font-sans: "DM Sans", ...;
  --radius: 0.2rem;
  /* ... */
}

/* Dark theme */
.dark {
  --background: #0a0a0a;
  --primary: #a3e635;
  /* ... */
}
```

---

## [0.1.0] - 2024-XX-XX

### Added
- Initial release of SplideJS Configuration Generator
- Visual configuration interface for 50+ SplideJS options
- Real-time carousel preview with breakpoint testing
- Multi-language support (Spanish/English)
- Mobile-optimized responsive design
- JSON export with editable mode
- 8 configuration sections with accordion navigation
- Visual inheritance for breakpoints
- Footer translations and GitHub link

### Features
- Slider & Dimensions configuration
- Slide Layout options
- Navigation controls
- Drag & Touch settings
- Autoplay configuration
- Transitions customization
- Accessibility options
- Advanced settings

### Tech Stack
- React 18 with TypeScript
- Tailwind CSS v3
- Vite build tool
- SplideJS carousel library
- Radix UI components
- Lucide icons
