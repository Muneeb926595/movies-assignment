import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');
const smallFormFactorMaxHeight = 620;
const iphone13FactorMaxHeight = 844;

const primaryFont = 'Lato-Regular';

// Font families and typography
const fonts = {
  // Modern font family naming
  regular: 'Lato-Regular',
  bold: 'Lato-Bold',
  black: 'Lato-Black',
  light: 'Lato-Light',
  thin: 'Lato-Thin',
  italic: 'Lato-Italic',
  boldItalic: 'Lato-BoldItalic',
  blackItalic: 'Lato-BlackItalic',
  lightItalic: 'Lato-LightItalic',
  thinItalic: 'Lato-ThinItalic',

  // Legacy font names for backward compatibility
  latoRegular: { fontFamily: 'Lato-Regular' },
  latoBold: { fontFamily: 'Lato-Bold' },
  latoBlack: { fontFamily: 'Lato-Black' },
  latoLight: { fontFamily: 'Lato-Light' },
  latoThin: { fontFamily: 'Lato-Thin' },
  latoItalic: { fontFamily: 'Lato-Italic' },
  latoBoldItalic: { fontFamily: 'Lato-BoldItalic' },
  latoBlackItalic: { fontFamily: 'Lato-BlackItalic' },
  latoLightItalic: { fontFamily: 'Lato-LightItalic' },
  latoThinItalic: { fontFamily: 'Lato-ThinItalic' },
  latoSemiBold: { fontFamily: 'Lato-Bold' },

  // Typography styles with responsive font sizes
  heading3: {
    fontFamily: primaryFont,
    fontSize: 20, // Will be responsive via RFValue
  },
  heading4: {
    fontFamily: primaryFont,
    fontSize: 20,
  },
  heading5: {
    fontFamily: primaryFont,
    fontSize: 18,
  },
  paragraphLarge: {
    fontFamily: primaryFont,
    fontSize: 20,
  },
  paragraphBold: {
    fontFamily: primaryFont,
    fontSize: 16,
  },
  paragraph: {
    fontFamily: primaryFont,
    fontSize: 16,
  },
  paragraphSmall: {
    fontFamily: primaryFont,
    fontSize: 14,
  },
  paragraphTiny: {
    fontFamily: primaryFont,
    fontSize: 12,
  },
  paragraphLink: {
    fontFamily: primaryFont,
    fontSize: 16,
  },
  paragraphLinkBold: {
    fontFamily: primaryFont,
    fontSize: 16,
  },
  micro: {
    fontFamily: primaryFont,
    fontSize: 13,
  },
};

// Spacing system
const spacing = {
  // Modern spacing scale
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,

  // Legacy spacing for backward compatibility
  zero: 0,
  tiny: 2,
  micro: 5,
  mini: 10,
  small: 15,
  medium: 20,
  large: 25,
  xlarge: 27,
  xxlarge: 40,
  xxxlarge: 80,
};

// Layout utilities and dimensions
const layout = {
  // Division factors
  divisionFactorForWidth: 4,
  divisionFactorForHeight: 8,

  // Window dimensions
  window: {
    width,
    height,
    bottom: height - height * 0.86,
    top: 100,
  },

  // Screen configuration
  screen: {
    headerHeight: 62,
    controlsHeight: 31,
    isOfSmallFormFactor: height < smallFormFactorMaxHeight,
    minContentHeight: height * 0.92,
  },

  // Position helpers
  absolutePosition: 'absolute' as const,
  relativePosition: 'relative' as const,

  // Device detection
  isSmallDevice: width < 375,

  // Shadow styles
  shadowBox: {
    lightestShadow: {
      shadowColor: '#cccccc',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 3,
    },
    lightShallow: {
      shadowColor: '#0000000A',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 2,
    },
    shallow: {
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 3,
      shadowOpacity: 0.3,
      elevation: 2,
    },
    lightDropShadow: {
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 4,
      shadowOpacity: 0.05,
      elevation: 3,
      marginBottom: 3,
    },
    appDarkShadow: {
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 2,
      shadowOpacity: 0.09,
      elevation: 3,
      marginBottom: 1,
    },
    low: {
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 3,
      shadowOpacity: 0.4,
      elevation: 3,
      marginBottom: 3,
    },
    deep: {
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 8,
      shadowOpacity: 0.6,
      elevation: 8,
    },
  },

  // Icon sizes and circles
  icon: {
    size: {
      tiny: 5,
      micro: 10,
      mini: 15,
      small: 20,
      medium: 22,
      large: 26,
      xlarge: 32,
      xxlarge: 50,
      xxxlarge: 64,
      huge: 80,
    },
    microCircle: { width: 14, height: 14, borderRadius: 16 },
    miniCircle: { width: 25, height: 25, borderRadius: 30 / 2 },
    smallCircle: { width: 40, height: 40, borderRadius: 40 / 2 },
    mediumCircle: { width: 48, height: 48, borderRadius: 48 / 2 },
    largeCircle: { width: 52, height: 52, borderRadius: 52 / 2 },
    xlargeCircle: { width: 62, height: 62, borderRadius: 62 / 2 },
    xxlargeCircle: { width: 100, height: 100, borderRadius: 100 / 2 },
    hugeCircle: { width: 120, height: 120, borderRadius: 120 / 2 },
  },

  // Image sizes
  image: {
    small: { height: 30, width: 30, borderRadius: 0, borderWidth: 0 },
    medium: { height: 40, width: 40, borderRadius: 0, borderWidth: 0 },
  },

  /**
   * Calculate App Responsive Units to make UI responsive on all of (Small And Large) devices
   */

  /**
   * Converts provided width percentage to independent pixel (dp).
   * @param  {string} widthPercent The percentage of screen's width that UI element should cover
   *                               along with the percentage symbol (%).
   * @return {number}              The calculated dp depending on current device's screen width.
   */
  widthPercentageToDP: (widthPercent: number | string) => {
    // Parse string percentage input and convert it to number.
    const elemWidth =
      typeof widthPercent === 'number'
        ? widthPercent
        : parseFloat(widthPercent);

    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
  },

  /**
   * Converts provided height percentage to independent pixel (dp).
   * @param  {string} heightPercent The percentage of screen's height that UI element should cover
   *                                along with the percentage symbol (%).
   * @return {number}               The calculated dp depending on current device's screen height.
   */
  heightPercentageToDP: (heightPercent: number | string) => {
    // Parse string percentage input and convert it to number.
    const elemHeight =
      typeof heightPercent === 'number'
        ? heightPercent
        : parseFloat(heightPercent);

    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
  },

  // guideline height for standard 5" device screen is 680
  RFValue: (fontSize: any, standardScreenHeight = iphone13FactorMaxHeight) => {
    const standardLength = width > height ? width : height;
    const offset: any =
      width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight; // iPhone X style SafeAreaView size in portrait

    const deviceHeight =
      (Platform.OS === 'ios' && height >= 812) || Platform.OS === 'android'
        ? standardLength - offset
        : standardLength;

    const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
    return Math.round(heightPercent);
  },
  /* 
  Check if an Android device has bottom physical buttons
   */
  hasBottomBar: () => {
    if (Platform.OS === 'android') {
      const { height } = Dimensions.get('window');
      const { height: windowHeight } = Dimensions.get('screen');
      // @ts-ignore
      const hasSoftKeys = windowHeight - height > StatusBar.currentHeight;
      return hasSoftKeys;
    }
    return false;
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

export const Colors = {
  brand: lightColors.brand,
};

// Export Layout and Fonts for backward compatibility (replacing globals)
export const Layout = layout;
export const Fonts = fonts;
