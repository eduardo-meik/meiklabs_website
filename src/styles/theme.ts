/**
 * Design System Theme Configuration
 * 
 * This file contains type definitions and constants for our design system.
 * Use these values consistently across the application to maintain visual harmony.
 */

export const theme = {
  // Color Palette
  colors: {
    primary: {
      50: '#F4EBFF',
      100: '#E6D6FF',
      200: '#CCADFF',
      300: '#B385FF',
      400: '#995CFF',
      500: '#4F00C4', // Base primary color from logo
      600: '#4000A3',
      700: '#320082',
      800: '#240061',
      900: '#160040'
    },
    secondary: {
      50: '#FFF0FE',
      100: '#FFE1FD',
      200: '#FFC3FB',
      300: '#FFA5F9',
      400: '#FF87F7',
      500: '#FF5CF3', // Base secondary color from logo
      600: '#CC4AC2',
      700: '#993792',
      800: '#662561',
      900: '#331231'
    }
  },

  // Typography
  typography: {
    fonts: {
      sans: 'Inter, system-ui, sans-serif',
      display: 'Space Grotesk, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace'
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem'
    }
  },

  // Spacing
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem'
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // Component Specific Tokens
  components: {
    button: {
      sizes: {
        sm: {
          padding: '0.5rem 1rem',
          fontSize: '0.875rem'
        },
        md: {
          padding: '0.75rem 1.5rem',
          fontSize: '1rem'
        },
        lg: {
          padding: '1rem 2rem',
          fontSize: '1.125rem'
        }
      },
      variants: {
        primary: {
          background: '#4F00C4',
          text: '#FFFFFF',
          hover: {
            background: '#4000A3'
          }
        },
        secondary: {
          background: '#FF5CF3',
          text: '#FFFFFF',
          hover: {
            background: '#CC4AC2'
          }
        },
        outline: {
          background: 'transparent',
          border: '#4F00C4',
          text: '#4F00C4',
          hover: {
            background: '#4F00C4',
            text: '#FFFFFF'
          }
        }
      }
    },
    input: {
      sizes: {
        sm: {
          padding: '0.5rem',
          fontSize: '0.875rem'
        },
        md: {
          padding: '0.75rem',
          fontSize: '1rem'
        },
        lg: {
          padding: '1rem',
          fontSize: '1.125rem'
        }
      },
      states: {
        default: {
          border: '#E5E7EB',
          background: '#FFFFFF'
        },
        focus: {
          border: '#4F00C4',
          ring: '#4F00C4'
        },
        error: {
          border: '#EF4444',
          ring: '#EF4444'
        },
        disabled: {
          background: '#F3F4F6',
          text: '#9CA3AF'
        }
      }
    },
    card: {
      padding: {
        none: '0',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem'
      },
      variants: {
        default: {
          background: '#FFFFFF',
          border: '#E5E7EB',
          shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
        },
        hover: {
          shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
        },
        interactive: {
          transform: 'translateY(-2px)'
        }
      }
    }
  },
  hero: {
    // Hero-specific tokens
    overlayOpacity: 0.6, // default overlay opacity for hero
    backgroundOverlayColor: 'rgba(0, 0, 0, 0.8)' // base overlay color; the opacity is applied separately via overlayOpacity
  }
} as const;

// Type definitions for theme
export type Theme = typeof theme;
export type ThemeColors = keyof typeof theme.colors;
export type ThemeSpacing = keyof typeof theme.spacing;
export type ThemeBreakpoints = keyof typeof theme.breakpoints;