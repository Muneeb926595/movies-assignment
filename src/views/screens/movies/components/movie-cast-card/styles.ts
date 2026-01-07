import styled from 'styled-components/native';
import { rf, wp } from '../../../../../theme';
import Animated from 'react-native-reanimated';

export const CastCard = Animated.createAnimatedComponent(styled.View`
  width: ${wp(25)}px;
  margin-right: ${wp(3)}px;
`);

export const CastImage = styled.Image`
  width: ${wp(25)}px;
  height: ${wp(25)}px;
  border-radius: 8px;
  margin-bottom: ${wp(2)}px;
`;

export const CastPlaceholder = styled.View`
  width: ${wp(25)}px;
  height: ${wp(25)}px;
  border-radius: 8px;
  margin-bottom: ${wp(2)}px;
  background-color: ${({ theme }) => theme.colors.surface['100']};
`;

export const CastName = styled.Text`
  font-size: ${rf(12)}px;
  font-weight: 600;
  margin-bottom: ${wp(1)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CastCharacter = styled.Text`
  font-size: ${rf(11)}px;
  color: ${({ theme }) => theme.colors.muted};
`;
