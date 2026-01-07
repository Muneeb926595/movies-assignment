import React from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { Props } from './types';
import { ScreenContainer, BodyContainer, BackgroundImageStyle } from './styles';

export const Container = (props: Props) => {
  const {
    hasScroll,
    bounces,
    onScroll,
    scrollEventThrottle,
    options,
    keyboardBehaviour,
    persistTaps,
    insetsToHandle,
    containerStyles,
    screenBackgroundStyle,
    scrollViewContentContainerStyles,
  } = props;
  const isAndroid = Platform.OS === 'android';

  const BaseBodyContainer = (
    <BodyContainer style={containerStyles} {...props} />
  );

  const BodyContent =
    options && options.backgroundImage ? (
      <BackgroundImageStyle source={options.backgroundImage}>
        {BaseBodyContainer}
      </BackgroundImageStyle>
    ) : (
      BaseBodyContainer
    );

  return (
    <ScreenContainer
      style={screenBackgroundStyle}
      edges={insetsToHandle ?? ['top', 'bottom', 'left', 'right']}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        // @ts-ignore
        behavior={
          keyboardBehaviour ? keyboardBehaviour : isAndroid ? null : 'padding'
        }
        keyboardVerticalOffset={
          useHeaderHeight() + (StatusBar.currentHeight ?? 0)
        }
      >
        {hasScroll ? (
          <ScrollView
            bounces={bounces}
            onScroll={onScroll}
            scrollEventThrottle={scrollEventThrottle}
            keyboardShouldPersistTaps={persistTaps ? 'always' : 'never'}
            contentContainerStyle={scrollViewContentContainerStyles}
          >
            {BodyContent}
          </ScrollView>
        ) : (
          <>{BodyContent}</>
        )}
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};
