/**
 * Unistyles v3 Configuration
 * Configures react-native-unistyles with light and dark themes
 */

import { StyleSheet } from 'react-native-unistyles';
import { light, dark } from './themes';

// Configure Unistyles with light and dark themes
StyleSheet.configure({
  themes: {
    light,
    dark,
  },
  settings: {
    adaptiveThemes: false,
    initialTheme: 'light',
  },
});

// Type declarations for Unistyles
declare module 'react-native-unistyles' {
  export interface UnistylesThemes {
    light: typeof light;
    dark: typeof dark;
  }
}

