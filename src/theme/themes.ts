/**
 * Theme Configuration
 * Light and Dark themes for the movie app
 */

export const light = {
  colors: {
    background: '#F5F5F5',
    text: '#1A1A2E',
    primary: '#FF6B00',
    white: '#FFFFFF',
    black: '#000000',
    muted: '#9CA3AF',
    red: '#EF4444',
    modalBackground: '#000000BD',
    transparent: 'transparent',

    brand: {
      DEFAULT: '#FF6B00',
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#FF6B00',
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
    },

    surface: {
      DEFAULT: '#F5F5F5',
      50: '#FFFFFF',
      100: '#F9FAFB',
      300: '#E5E7EB',
      400: '#D1D5DB',
      500: '#9CA3AF',
      600: '#6B7280',
    },

    typography: {
      DEFAULT: '#1A1A2E',
      50: '#0F0F1E',
      100: '#1A1A2E',
      200: '#2D3748',
      300: '#4A5568',
      400: '#718096',
      500: '#A0AEC0',
      600: '#CBD5E0',
    },

    borders: {
      DEFAULT: '#E5E7EB',
      50: '#F3F4F6',
      100: '#E5E7EB',
      200: '#D1D5DB',
    },

    action: {
      DEFAULT: '#FF6B00',
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#FF6B00',
      600: '#EA580C',
      700: '#C2410C',
    },
  },
} as const;

export const dark = {
  colors: {
    background: '#1F1F1F',
    text: '#FFFFFF',
    primary: '#FF6B00',
    white: '#FFFFFF',
    black: '#000000',
    muted: '#9CA3AF',
    red: '#EF4444',
    modalBackground: '#000000BD',
    transparent: 'transparent',

    brand: {
      DEFAULT: '#FF6B00',
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#FF6B00',
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
    },

    surface: {
      DEFAULT: '#2D2D2D',
      50: '#3F3F3F',
      100: '#2D2D2D',
      300: '#242424',
      400: '#1A1A1A',
      500: '#141414',
      600: '#0F0F0F',
    },

    typography: {
      DEFAULT: '#FFFFFF',
      50: '#FFFFFF',
      100: '#E5E7EB',
      200: '#D1D5DB',
      300: '#9CA3AF',
      400: '#6B7280',
      500: '#4B5563',
      600: '#374151',
    },

    borders: {
      DEFAULT: '#3F3F3F',
      50: '#4B5563',
      100: '#3F3F3F',
      200: '#2D2D2D',
    },

    action: {
      DEFAULT: '#FF6B00',
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#FF6B00',
      600: '#EA580C',
      700: '#C2410C',
    },
  },
} as const;

// Theme metadata for UI picker
export const themeMetadata = {
  light: {
    name: 'Light',
    description: 'Clean and bright theme',
    primaryColor: '#FF6B00',
    icon: '☀️',
  },
  dark: {
    name: 'Dark',
    description: 'Easy on the eyes',
    primaryColor: '#FF6B00',
    icon: '🌙',
  },
};
