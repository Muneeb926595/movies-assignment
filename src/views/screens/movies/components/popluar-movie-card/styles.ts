import styled from 'styled-components/native';
import { rf, wp } from '../../../../../theme';
import FastImage from '@d11/react-native-fast-image';
import Animated from 'react-native-reanimated';

export const DurationRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Duration = styled.Text`
  font-size: ${rf(12)}px;
  margin-left: ${wp(1)}px;
  color: ${props => props.theme.colors.muted};
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
`;
export const GenresRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${wp(2)}px;
`;

export const GenreTag = styled.View`
  padding-horizontal: ${wp(3)}px;
  padding-vertical: ${wp(1)}px;
  border-radius: ${wp(3)}px;
  margin-right: ${wp(1.5)}px;
  margin-bottom: ${wp(1)}px;
  background-color: ${props => props.theme.colors.primary}20;
`;

export const GenreText = styled.Text`
  font-size: ${rf(10)}px;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.latoSemiBold.fontFamily};
`;

export const PopularCard =
  Animated.createAnimatedComponent(styled.TouchableOpacity`
    flex-direction: row;
    padding: ${wp(3)}px;
    border-radius: ${wp(3)}px;
    margin-bottom: ${wp(3)}px;
    background-color: ${props => props.theme.colors.surface[50]};
  `);

export const PopularPoster = styled(FastImage)`
  width: ${wp(25)}px;
  height: ${wp(37.5)}px;
  border-radius: ${wp(2)}px;
  margin-right: ${wp(3)}px;
`;

export const PopularInfo = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const PopularTitle = styled.Text`
  font-size: ${rf(16)}px;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.latoSemiBold.fontFamily};
`;
