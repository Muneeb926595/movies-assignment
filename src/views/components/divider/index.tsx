import { StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { DividerContainer } from './styles';

type Props = {
  dividerStyles?: StyleProp<ViewStyle>;
};

export const Divider = (props: Props) => {
  const { dividerStyles } = props;
  return <DividerContainer style={dividerStyles} />;
};
