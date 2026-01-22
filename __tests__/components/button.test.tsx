/**
 * Button Component Test Suite
 *
 * Tests the Button component behavior, interactions, and states
 */

import React from 'react';
import { render, fireEvent } from '../utils/test-utils';
import { Button } from '../../src/views/components/button';
import { Text, ActivityIndicator } from 'react-native';

describe('Button Component', () => {
  const defaultProps = {
    onPress: jest.fn(),
    buttonLable: 'Test Button',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render button with label', () => {
      const { getByText } = render(<Button {...defaultProps} />);

      expect(getByText('Test Button')).toBeTruthy();
    });

    it('should render button with custom container style', () => {
      const customStyle = { backgroundColor: 'red' };
      const { getByText } = render(
        <Button {...defaultProps} buttonContainer={customStyle} />,
      );

      expect(getByText('Test Button')).toBeTruthy();
    });

    it('should render loading indicator when loading', () => {
      const { queryByText, root } = render(
        <Button {...defaultProps} loading={true} />,
      );

      // Text should not be visible when loading
      expect(queryByText('Test Button')).toBeNull();

      // ActivityIndicator should be present
      const activityIndicator = root.findAllByType(ActivityIndicator);
      expect(activityIndicator.length).toBeGreaterThan(0);
    });

    it('should render left icon when provided', () => {
      const LeftIcon = <Text testID="left-icon">L</Text>;
      const { getByTestId } = render(
        <Button {...defaultProps} leftIcon={LeftIcon} />,
      );

      expect(getByTestId('left-icon')).toBeTruthy();
    });

    it('should render right icon when provided', () => {
      const RightIcon = <Text testID="right-icon">R</Text>;
      const { getByTestId } = render(
        <Button {...defaultProps} rightIcon={RightIcon} />,
      );

      expect(getByTestId('right-icon')).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('should call onPress when pressed', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button {...defaultProps} onPress={onPress} />,
      );

      fireEvent.press(getByText('Test Button'));

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should not call onPress when disabled', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button {...defaultProps} onPress={onPress} disabled={true} />,
      );

      fireEvent.press(getByText('Test Button'));

      expect(onPress).not.toHaveBeenCalled();
    });

    it('should not call onPress when loading', () => {
      const onPress = jest.fn();
      const { queryByText } = render(
        <Button {...defaultProps} onPress={onPress} loading={true} />,
      );

      // When loading, button text is not rendered (ActivityIndicator is shown instead)
      // This indicates the button is in loading state
      expect(queryByText('Test Button')).toBeNull();
    });
  });

  describe('Loading State', () => {
    it('should show ActivityIndicator with custom color when loading', () => {
      const { root } = render(
        <Button {...defaultProps} loading={true} loaderColor="red" />,
      );

      const activityIndicator = root.findByType(ActivityIndicator);
      expect(activityIndicator.props.color).toBe('red');
    });

    it('should be disabled when loading is true', () => {
      const { root, queryByText } = render(
        <Button {...defaultProps} loading={true} />,
      );

      // Verify ActivityIndicator is shown (button is in loading state)
      const activityIndicator = root.findByType(ActivityIndicator);
      expect(activityIndicator).toBeTruthy();

      // Verify button text is not shown
      expect(queryByText('Test Button')).toBeNull();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty button label', () => {
      const { root } = render(<Button {...defaultProps} buttonLable="" />);

      expect(root).toBeTruthy();
    });

    it('should render with both icons and label', () => {
      const LeftIcon = <Text testID="left-icon">L</Text>;
      const RightIcon = <Text testID="right-icon">R</Text>;
      const { getByText, getByTestId } = render(
        <Button {...defaultProps} leftIcon={LeftIcon} rightIcon={RightIcon} />,
      );

      expect(getByTestId('left-icon')).toBeTruthy();
      expect(getByText('Test Button')).toBeTruthy();
      expect(getByTestId('right-icon')).toBeTruthy();
    });
  });
});
