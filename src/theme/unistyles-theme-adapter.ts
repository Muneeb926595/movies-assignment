/**
 * Unistyles Theme Adapter Implementation
 * Concrete implementation using react-native-unistyles library
 */

import { UnistylesRuntime } from 'react-native-unistyles';
import { ThemeAdapter, ThemeName, ThemeMetadata } from './theme-adapter';
import { light, dark } from './themes';

const themeMetadata: Record<ThemeName, ThemeMetadata> = {
  light: {
    name: 'Light',
    description: 'Clean and bright theme',
    icon: '☀️',
  },
  dark: {
    name: 'Dark',
    description: 'Easy on the eyes',
    icon: '🌙',
  },
};

const themeMap = {
  light,
  dark,
};

export class UnistylesThemeAdapter implements ThemeAdapter {
  getCurrentTheme(): any {
    const themeName = this.getCurrentThemeName();
    return themeMap[themeName];
  }

  getCurrentThemeName(): ThemeName {
    return UnistylesRuntime.themeName as ThemeName;
  }

  setTheme(name: ThemeName): void {
    UnistylesRuntime.setTheme(name);
  }

  getThemeMetadata(name: ThemeName): ThemeMetadata {
    return themeMetadata[name];
  }

  getAllThemeMetadata(): Record<ThemeName, ThemeMetadata> {
    return themeMetadata;
  }

  onThemeChange(): () => void {
    // Unistyles doesn't have a direct listener API, but theme changes
    // trigger re-renders automatically, so we can return a no-op
    // In a real implementation, you might need to use a custom event system
    return () => {};
  }

  getAvailableThemes(): ThemeName[] {
    return ['light', 'dark'];
  }
}
