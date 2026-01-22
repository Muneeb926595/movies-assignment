/**
 * Snapshot Testing Helpers
 * 
 * Utilities for snapshot testing in React Native
 */

import { ReactElement } from 'react';
import { render } from './test-utils';
import renderer from 'react-test-renderer';

/**
 * Create a snapshot of a component
 */
export const createComponentSnapshot = (component: ReactElement) => {
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
};

/**
 * Create a snapshot with providers
 */
export const createSnapshotWithProviders = (
  component: ReactElement,
  options?: any,
) => {
  const result = render(component, options);
  expect(result).toMatchSnapshot();
};

/**
 * Update snapshots (use with caution)
 */
export const updateSnapshots = () => {
  // This is typically done via CLI: jest -u
  // Snapshots can be updated using the --updateSnapshot flag
};
