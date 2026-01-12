import styled from 'styled-components/native';
import FastImage from '@d11/react-native-fast-image';

export const CardContainer = styled.TouchableOpacity<{
  width?: number;
}>`
  width: ${props => props.width || 160}px;
  margin-right: 12px;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${props => props.theme.colors.surface.DEFAULT};
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
`;

export const BottomContentContainer = styled.View`
  padding: 8px;
`;
