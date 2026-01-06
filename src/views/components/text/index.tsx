/**
 * Text Components - Styled Components Version
 * Themed text components with emphasis levels and link variants
 */

import React from 'react';
import { ColorValue } from 'react-native';
import {
  Emphasis,
  ParagraphLinkBoldProps,
  ParagraphLinkProps,
  Props,
  SmallParagraphLinkProps,
} from './types';
import {
  StyledText,
  LinkBoldText,
  LinkText,
  StyledTouchableOpacity,
} from './styles';

export const AppText: Props = props => {
  return (
    <StyledText {...props} allowFontScaling={false} emphasis={props.emphasis}>
      {props.children}
    </StyledText>
  );
};

export const ParagraphLinkBold = (props: ParagraphLinkBoldProps) => {
  return (
    <StyledTouchableOpacity
      onPress={props?.onPress}
      style={props?.containerStyle}
    >
      <LinkBoldText style={props?.style}>{props?.title}</LinkBoldText>
    </StyledTouchableOpacity>
  );
};

export const ParagraphLink = (props: ParagraphLinkProps) => {
  return (
    <StyledTouchableOpacity
      onPress={props?.onPress}
      style={props?.containerStyle}
    >
      <LinkText style={props?.style}>{props?.title}</LinkText>
    </StyledTouchableOpacity>
  );
};

export const SmallParagraphLink = (props: SmallParagraphLinkProps) => {
  return (
    <LinkText {...props} onPress={() => props.onPress()} style={props.style} />
  );
};
