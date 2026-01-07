import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Spacing system
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  // Legacy spacing names for backward compatibility
  micro: 4,
  small: 8,
  medium: 16,
  large: 24,
};

// Font families
const fonts = {
  regular: 'Lato-Regular',
  bold: 'Lato-Bold',
  black: 'Lato-Black',
  light: 'Lato-Light',
  thin: 'Lato-Thin',
  // Legacy font names for backward compatibility
  latoRegular: { fontFamily: 'Lato-Regular' },
  latoBold: { fontFamily: 'Lato-Bold' },
  latoBlack: { fontFamily: 'Lato-Black' },
  latoLight: { fontFamily: 'Lato-Light' },
  latoThin: { fontFamily: 'Lato-Thin' },
  latoSemiBold: { fontFamily: 'Lato-Bold' }, // Using bold as semibold
};

// Responsive utilities
const layout = {
  window: { width, height },
  widthPercentageToDP: (percentage: number): number => {
    return PixelRatio.roundToNearestPixel((width * percentage) / 100);
  },
  heightPercentageToDP: (percentage: number): number => {
    return PixelRatio.roundToNearestPixel((height * percentage) / 100);
  },
  RFValue: (fontSize: number, standardScreenHeight: number = 812): number => {
    const heightPercent = (fontSize * height) / standardScreenHeight;
    return Math.round(heightPercent);
  },
};

// Light theme colors
const lightColors = {
  background: '#F5F5F5',
  text: '#1A1A2E',
  primary: '#FF6B00',
  white: '#FFFFFF',
  black: '#000000',
  muted: '#9CA3AF',
  red: '#EF4444',
  modalBackground: '#000000BD',
  transparent: 'transparent',
  borders: {
    DEFAULT: '#E5E7EB',
    100: '#E5E7EB',
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
  brand: {
    DEFAULT: '#FF6B00',
    50: '#FFF7ED',
    100: '#FFEDD5',
    500: '#FF6B00',
    600: '#EA580C',
  },
};

// Dark theme colors
const darkColors = {
  background: '#0F172A',
  text: '#F1F5F9',
  primary: '#FF6B00',
  white: '#FFFFFF',
  black: '#000000',
  muted: '#94A3B8',
  red: '#EF4444',
  modalBackground: '#000000BD',
  transparent: 'transparent',
  borders: {
    DEFAULT: '#475569',
    100: '#475569',
  },
  surface: {
    DEFAULT: '#1E293B',
    50: '#1E293B',
    100: '#334155',
    300: '#475569',
    400: '#64748B',
    500: '#94A3B8',
    600: '#CBD5E1',
  },
  brand: {
    DEFAULT: '#FF6B00',
    50: '#FFF7ED',
    100: '#FFEDD5',
    500: '#FF6B00',
    600: '#EA580C',
  },
};

// Create themed configurations
export const lightTheme = {
  colors: lightColors,
  spacing,
  fonts,
  layout,
  isDark: false,
} as const;

export const darkTheme = {
  colors: darkColors,
  spacing,
  fonts,
  layout,
  isDark: true,
} as const;

// Export type for TypeScript
export type Theme = typeof lightTheme;

// Export Colors for backward compatibility
export const Colors = {
  brand: lightColors.brand,
};
