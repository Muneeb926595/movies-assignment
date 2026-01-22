/**
 * Test Utility Types
 * 
 * Type definitions for test utilities
 */

import type { NavigationProp } from '@react-navigation/native';
import type { ParamListBase } from '@react-navigation/routers';

/**
 * Type for navigation mock
 */
export type MockNavigation = Partial<
  NavigationProp<ParamListBase> & {
    navigate: jest.Mock;
    goBack: jest.Mock;
    setOptions: jest.Mock;
    addListener: jest.Mock;
    removeListener: jest.Mock;
    canGoBack: jest.Mock;
    dispatch: jest.Mock;
    reset: jest.Mock;
    isFocused: jest.Mock;
    getParent: jest.Mock;
    getState: jest.Mock;
  }
>;

/**
 * Type for route mock
 */
export type MockRoute<TParams extends Record<string, unknown> = {}> = {
  key: string;
  name: string;
  params: TParams;
};
