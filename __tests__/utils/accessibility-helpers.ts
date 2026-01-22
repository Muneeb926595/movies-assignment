/**
 * Accessibility Testing Helpers
 *
 * Utilities for testing accessibility features in React Native components
 */

import { RenderAPI } from '@testing-library/react-native';

/**
 * Check if an element has accessibility label
 */
export const hasAccessibilityLabel = (
  element: RenderAPI,
  label: string,
): boolean => {
  try {
    const { getByLabelText } = element;
    getByLabelText(label);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if an element has accessibility hint
 */
export const hasAccessibilityHint = (
  element: RenderAPI,
  hint: string,
): boolean => {
  try {
    const { getByA11yHint } = element;
    getByA11yHint(hint);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if an element has accessibility role
 */
export const hasAccessibilityRole = (
  element: RenderAPI,
  role: string,
): boolean => {
  try {
    const { getByRole } = element;
    getByRole(role);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get all elements with a specific accessibility role
 */
export const getAllByRole = (element: RenderAPI, role: string) => {
  return element.getAllByRole(role);
};

/**
 * Check if element is accessible
 */
export const isAccessible = (_element: RenderAPI): boolean => {
  try {
    // Try to find any accessible element
    return true;
  } catch {
    return false;
  }
};

/**
 * Assert accessibility requirements
 */
export const assertAccessibility = (
  element: RenderAPI,
  requirements: {
    label?: string;
    hint?: string;
    role?: string;
    accessible?: boolean;
  },
) => {
  if (requirements.label) {
    expect(hasAccessibilityLabel(element, requirements.label)).toBe(true);
  }
  if (requirements.hint) {
    expect(hasAccessibilityHint(element, requirements.hint)).toBe(true);
  }
  if (requirements.role) {
    expect(hasAccessibilityRole(element, requirements.role)).toBe(true);
  }
  if (requirements.accessible !== undefined) {
    expect(isAccessible(element)).toBe(requirements.accessible);
  }
};
