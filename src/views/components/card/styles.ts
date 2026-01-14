import styled from 'styled-components/native';
import FastImage from '@d11/react-native-fast-image';
import Animated from 'react-native-reanimated';

export const CardContainer = styled.TouchableOpacity<{
  width?: number;
  isHorizontal?: boolean;
}>`
  width: ${props => props.width || (props.isHorizontal ? '100%' : 160)}px;
  margin-right: ${props => (props.isHorizontal ? 0 : 12)}px;
  border-radius: 8px;
  overflow: hidden;
  flex-direction: ${props => (props.isHorizontal ? 'row' : 'column')};
`;

export const ShimmerContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.colors.surface[100]};
  overflow: hidden;
`;

export const ShimmerGradient = styled(Animated.View)`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.surface[300]};
`;

export const ShimmerImageSkeleton = styled.View<{
  imageWidth?: number;
  imageHeight?: number;
}>`
  width: ${props => (props.imageWidth ? `${props.imageWidth}px` : '100%')};
  height: ${props => props.imageHeight || 225}px;
  background-color: ${props => props.theme.colors.surface[100]};
  border-radius: 8px;
  overflow: hidden;
`;

export const ShimmerContentSkeleton = styled.View`
  flex: 1;
  padding: 8px;
`;

export const ShimmerLine = styled.View<{
  width?: string;
  height?: number;
  marginBottom?: number;
}>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 12}px;
  background-color: ${props => props.theme.colors.surface[100]};
  border-radius: 4px;
  margin-bottom: ${props => props.marginBottom || 8}px;
  overflow: hidden;
`;

export const ImageContainer = styled.View<{
  imageWidth?: number;
  imageHeight?: number;
}>`
  width: ${props => (props.imageWidth ? `${props.imageWidth}px` : '100%')};
  height: ${props => props.imageHeight || 225}px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
`;

export const CardImage = styled(FastImage)<{ imageHeight?: number }>`
  width: 100%;
  height: ${props => props.imageHeight || 225}px;
  background-color: ${props => props.theme.colors.surface[100]};
`;

export const ImagePlaceholder = styled.View<{ imageHeight?: number }>`
  width: 100%;
  height: ${props => props.imageHeight || 225}px;
  background-color: ${props => props.theme.colors.surface[100]};
  justify-content: center;
  align-items: center;
`;

export const TopRightActionContainer = styled.View`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
`;

export const BottomContentContainer = styled.View`
  padding: 8px;
`;

export const RightContentContainer = styled.View`
  flex: 1;
  padding: 8px;
  justify-content: space-between;
`;
