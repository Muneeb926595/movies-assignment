import React, { useEffect, useState } from 'react';
import './utils/ignore-warnings';
import { useRozeniteLogger } from './utils/rozenite-logger';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import {
  getTranslationService,
  TranslationProvider,
} from './services/localisation';
import { Constants } from './globals';
import { ReactQueryProvider } from './react-query/queryClient';
import { storageService, StorageKeys } from './services/storage';
import { ThemeProvider } from './theme/styled-theme-provider';
import { ErrorBoundary } from './views/components/error-boundary';
import { AppNavigator } from './navigation';
import { Toaster } from 'sonner-native';

function App() {
  // Enable Rozenite DevTools plugins
  useRozeniteLogger();

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    (async () => {
      await initAppAssets();
      setIsAppReady(true);
    })();
  }, []);

  /**
   * Setup and init translation service
   */
  const initAppAssets = async () => {
    let appLocale = Constants.defaults.DEFAULT_APP_LOCALE;
    try {
      appLocale = (await storageService.getItem(
        StorageKeys.SELECTED_APP_LANGUAGE,
      )) as string;
    } catch (e) {
      // Use default locale on error
    }

    const translationService = getTranslationService();
    await translationService.initialize(appLocale);
  };

  return isAppReady ? (
    <ThemeProvider>
      <ReactQueryProvider>
        <TranslationProvider>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <ErrorBoundary>
                <AppNavigator />
                <Toaster />
              </ErrorBoundary>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </TranslationProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  ) : null;
}

export default App;
