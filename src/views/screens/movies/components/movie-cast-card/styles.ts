import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { Layout } from '../../../../../globals';

export const CastCard = Animated.createAnimatedComponent(styled.View`
  width: ${Layout.widthPercentageToDP(25)}px;
  margin-right: ${Layout.widthPercentageToDP(3)}px;
`);

export const CastImage = styled.Image`
  width: ${Layout.widthPercentageToDP(25)}px;
  height: ${Layout.widthPercentageToDP(25)}px;
  border-radius: 8px;
  margin-bottom: ${Layout.widthPercentageToDP(2)}px;
`;

export const CastPlaceholder = styled.View`
  width: ${Layout.widthPercentageToDP(25)}px;
  height: ${Layout.widthPercentageToDP(25)}px;
  border-radius: 8px;
  margin-bottom: ${Layout.widthPercentageToDP(2)}px;
  background-color: ${({ theme }) => theme.colors.surface['100']};
`;

export const CastName = styled.Text`
  font-size: ${Layout.RFValue(12)}px;
  font-weight: 600;
  margin-bottom: ${Layout.widthPercentageToDP(1)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CastCharacter = styled.Text`
  font-size: ${Layout.RFValue(11)}px;
  color: ${({ theme }) => theme.colors.muted};
`;
