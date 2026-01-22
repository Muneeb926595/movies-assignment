/**
 * Text Component Test Suite
 *
 * Tests the Text components (AppText, ParagraphLink, etc.)
 */

import React from 'react';
import { render, fireEvent } from '../utils/test-utils';
import { Text } from 'react-native';
import {
  AppText,
  ParagraphLinkBold,
  ParagraphLink,
  SmallParagraphLink,
} from '../../src/views/components/text';

describe('Text Components', () => {
  describe('AppText', () => {
    it('should render text content', () => {
      const { getByText } = render(<AppText>Test Text</AppText>);

      expect(getByText('Test Text')).toBeTruthy();
    });

    it('should disable font scaling', () => {
      const { root } = render(<AppText>Scaled Text</AppText>);

      const text = root.findByType(Text);
      expect(text.props.allowFontScaling).toBe(false);
    });

    it('should render with custom styles', () => {
      const customStyle = { color: 'red' };
      const { getByText } = render(
        <AppText style={customStyle}>Styled Text</AppText>,
      );

      expect(getByText('Styled Text')).toBeTruthy();
    });
  });

  describe('ParagraphLinkBold', () => {
    it('should render link with title', () => {
      const { getByText } = render(
        <ParagraphLinkBold title="Click Here" onPress={jest.fn()} />,
      );

      expect(getByText('Click Here')).toBeTruthy();
    });

    it('should call onPress when clicked', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <ParagraphLinkBold title="Click Me" onPress={onPress} />,
      );

      fireEvent.press(getByText('Click Me'));

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should apply container style', () => {
      const containerStyle = { padding: 10 };
      const { getByText } = render(
        <ParagraphLinkBold
          title="Styled Link"
          onPress={jest.fn()}
          containerStyle={containerStyle}
        />,
      );

      expect(getByText('Styled Link')).toBeTruthy();
    });

    it('should apply text style', () => {
      const textStyle = { fontSize: 18 };
      const { getByText } = render(
        <ParagraphLinkBold
          title="Custom Style"
          onPress={jest.fn()}
          style={textStyle}
        />,
      );

      expect(getByText('Custom Style')).toBeTruthy();
    });
  });

  describe('ParagraphLink', () => {
    it('should render link with title', () => {
      const { getByText } = render(
        <ParagraphLink title="Link Text" onPress={jest.fn()} />,
      );

      expect(getByText('Link Text')).toBeTruthy();
    });

    it('should call onPress when clicked', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <ParagraphLink title="Clickable" onPress={onPress} />,
      );

      fireEvent.press(getByText('Clickable'));

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple clicks', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <ParagraphLink title="Multi Click" onPress={onPress} />,
      );

      const link = getByText('Multi Click');
      fireEvent.press(link);
      fireEvent.press(link);
      fireEvent.press(link);

      expect(onPress).toHaveBeenCalledTimes(3);
    });

    it('should apply custom container style', () => {
      const containerStyle = { marginTop: 20 };
      const { getByText } = render(
        <ParagraphLink
          title="Margin Link"
          onPress={jest.fn()}
          containerStyle={containerStyle}
        />,
      );

      expect(getByText('Margin Link')).toBeTruthy();
    });
  });

  describe('SmallParagraphLink', () => {
    it('should render small link text', () => {
      const { getByText } = render(
        <SmallParagraphLink onPress={jest.fn()}>Small Link</SmallParagraphLink>,
      );

      expect(getByText('Small Link')).toBeTruthy();
    });

    it('should call onPress when clicked', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <SmallParagraphLink onPress={onPress}>Click Small</SmallParagraphLink>,
      );

      fireEvent.press(getByText('Click Small'));

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should apply custom style', () => {
      const customStyle = { color: 'blue' };
      const { getByText } = render(
        <SmallParagraphLink onPress={jest.fn()} style={customStyle}>
          Blue Link
        </SmallParagraphLink>,
      );

      expect(getByText('Blue Link')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty text content in AppText', () => {
      const { root } = render(<AppText></AppText>);
      expect(root).toBeTruthy();
    });

    it('should handle empty title in ParagraphLinkBold', () => {
      const { root } = render(
        <ParagraphLinkBold title="" onPress={jest.fn()} />,
      );
      expect(root).toBeTruthy();
    });

    it('should handle undefined onPress gracefully in ParagraphLink', () => {
      const { getByText } = render(
        <ParagraphLink title="No Handler" onPress={undefined as any} />,
      );

      expect(getByText('No Handler')).toBeTruthy();
    });
  });
});
