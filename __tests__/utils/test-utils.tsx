/**
 * Test Utilities
 * 
 * Comprehensive testing utilities for React Native components
 * Following React Native Testing Library best practices
 */

import React, { ReactElement } from 'react';
import { render as rtlRender, RenderAPI } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '../../src/theme/styled-theme-provider';
import { TranslationProvider, getTranslationService } from '../../src/services/localisation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import type { EdgeInsets } from 'react-native-safe-area-context';
import type { MockNavigation, MockRoute } from './types';

/**
 * Custom render function that includes all providers
 */
interface CustomRenderOptions extends Omit<Parameters<typeof rtlRender>[1], 'wrapper'> {
  queryClient?: QueryClient;
  locale?: string;
  initialSafeAreaInsets?: EdgeInsets;
}

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
};

export const render = (
  ui: ReactElement,
  options: CustomRenderOptions = {},
): RenderAPI => {
  const {
    queryClient = createTestQueryClient(),
    locale = 'en',
    initialSafeAreaInsets = { top: 0, bottom: 0, left: 0, right: 0 },
    ...renderOptions
  } = options;

  // Initialize translation service
  const translationService = getTranslationService();
  translationService.initialize(locale);

  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TranslationProvider>
            <SafeAreaProvider
              initialMetrics={{
                insets: initialSafeAreaInsets,
                frame: { x: 0, y: 0, width: 375, height: 812 },
              }}
            >
              <GestureHandlerRootView style={{ flex: 1 }}>
                {children}
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </TranslationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  };

  return rtlRender(ui, { wrapper: AllTheProviders, ...renderOptions });
};

/**
 * Wait for async operations to complete
 */
export const waitForAsync = () => new Promise<void>(resolve => setTimeout(() => resolve(), 0));

/**
 * Create a mock navigation object
 */
export const createMockNavigation = (
  params: Partial<MockNavigation> = {},
): MockNavigation => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
  addListener: jest.fn(() => jest.fn()),
  removeListener: jest.fn(),
  canGoBack: jest.fn(() => true),
  dispatch: jest.fn(),
  reset: jest.fn(),
  isFocused: jest.fn(() => true),
  getParent: jest.fn(),
  getState: jest.fn(),
  ...params,
});

/**
 * Create a mock route object
 */
export const createMockRoute = <TParams extends Record<string, unknown> = {}>(
  params: Partial<MockRoute<TParams>> = {},
): MockRoute<TParams> => ({
  key: 'test-route-key',
  name: 'TestRoute',
  params: {} as TParams,
  ...params,
});

/**
 * Mock React Navigation hook
 * Note: This should be called at the top of your test file, before any imports
 */
export const mockUseNavigation = () => {
  const navigation = createMockNavigation();
  
  jest.doMock('@react-navigation/native', () => {
    const actual = jest.requireActual('@react-navigation/native');
    return {
      ...actual,
      useNavigation: () => navigation,
      useRoute: () => createMockRoute(),
    };
  });

  return navigation;
};

/**
 * Flush all pending promises
 */
export const flushPromises = () =>
  new Promise<void>(resolve => setImmediate(() => resolve()));

/**
 * Advance timers and flush promises
 */
export const advanceTimersAndFlush = async (ms: number = 0) => {
  jest.advanceTimersByTime(ms);
  await flushPromises();
};

/**
 * Mock console methods and restore them
 */
export const withMockedConsole = (
  fn: () => void | Promise<void>,
  options: { error?: boolean; warn?: boolean; log?: boolean } = {},
) => {
  const { error = true, warn = true, log = false } = options;
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalLog = console.log;

  if (error) console.error = jest.fn();
  if (warn) console.warn = jest.fn();
  if (log) console.log = jest.fn();

  try {
    const result = fn();
    if (result instanceof Promise) {
      return result.finally(() => {
        console.error = originalError;
        console.warn = originalWarn;
        console.log = originalLog;
      });
    }
    console.error = originalError;
    console.warn = originalWarn;
    console.log = originalLog;
    return result;
  } catch (e) {
    console.error = originalError;
    console.warn = originalWarn;
    console.log = originalLog;
    throw e;
  }
};

/**
 * Re-export everything from React Native Testing Library
 */
export { fireEvent, waitFor, screen, act } from '@testing-library/react-native';
