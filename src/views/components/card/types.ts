import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Source } from '@d11/react-native-fast-image';

export interface BaseCardProps {
  imageUrl?: string | null;
  imageSource?: Source;
  imagePlaceholder?: ReactNode;
  topRightAction?: ReactNode;
  bottomContent?: ReactNode;
  rightContent?: ReactNode;
  onPress?: () => void;
  width?: number;
  imageHeight?: number;
  imageWidth?: number;
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number;
  containerStyle?: StyleProp<ViewStyle>;
}
