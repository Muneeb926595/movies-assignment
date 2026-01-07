import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { lightTheme, darkTheme, Theme } from './styled-theme-config';
import { storageService, StorageKeys } from '../services/storage';
import { StatusBar } from 'react-native';
import switchTheme from 'react-native-theme-switch-animation';

type ThemeName = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  toggleTheme: () => void;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>('light');
  const theme = themeName === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    updateSystemUI(theme);
  }, [theme]);

  const loadTheme = async () => {
    try {
      const savedTheme = await storageService.getItem<ThemeName>(
        StorageKeys.APP_THEME,
      );
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeName(savedTheme as ThemeName);
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  };

  const updateSystemUI = (currentTheme: any) => {
    StatusBar.setBarStyle(
      currentTheme.isDark ? 'light-content' : 'dark-content',
      true,
    );
  };

  const setThemeWithAnimation = async (name: ThemeName) => {
    switchTheme({
      switchThemeFunction: () => {
        setThemeName(name);
      },
      animationConfig: {
        type: 'fade',
        duration: 300,
      },
    });

    try {
      await storageService.setItem(StorageKeys.APP_THEME, name);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = themeName === 'light' ? 'dark' : 'light';
    setThemeWithAnimation(newTheme);
  };

  const value: ThemeContextType = {
    theme: theme as any,
    themeName,
    toggleTheme,
    setTheme: setThemeWithAnimation,
  };

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={theme as any}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
};
