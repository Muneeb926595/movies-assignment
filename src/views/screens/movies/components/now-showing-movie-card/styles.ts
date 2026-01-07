import FastImage from '@d11/react-native-fast-image';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { rf, wp } from '../../../../../theme';
import Animated from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const POSTER_WIDTH = (width - 48) / 2.5;
const POSTER_HEIGHT = POSTER_WIDTH * 1.5;

export const NowShowingCard =
  Animated.createAnimatedComponent(styled.TouchableOpacity`
    margin-right: ${wp(3)}px;
    width: ${POSTER_WIDTH}px;
  `);
export const NowShowingPoster = styled(FastImage)`
  width: ${POSTER_WIDTH}px;
  height: ${POSTER_HEIGHT}px;
  border-radius: ${wp(3)}px;
  margin-bottom: ${wp(2)}px;
`;

export const NowShowingTitle = styled.Text`
  font-size: ${rf(14)}px;
  font-weight: 600;
  margin-bottom: ${wp(1)}px;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.latoSemiBold.fontFamily};
`;

export const RatingRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StarIcon = styled.Text`
  font-size: ${rf(14)}px;
  margin-right: ${wp(1)}px;
`;

export const Rating = styled.Text`
  font-size: ${rf(12)}px;
  color: ${props => props.theme.colors.muted};
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
`;
