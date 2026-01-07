import FastImage from '@d11/react-native-fast-image';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { Layout } from '../../../../../globals';

const { width } = Dimensions.get('window');
const POSTER_WIDTH = (width - 48) / 2.5;
const POSTER_HEIGHT = POSTER_WIDTH * 1.5;

export const NowShowingCard =
  Animated.createAnimatedComponent(styled.TouchableOpacity`
    margin-right: ${Layout.widthPercentageToDP(3)}px;
    width: ${POSTER_WIDTH}px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    elevation: 3;
  `);
export const NowShowingPoster = styled(FastImage)`
  width: ${POSTER_WIDTH}px;
  height: ${POSTER_HEIGHT}px;
  border-radius: ${Layout.widthPercentageToDP(3)}px;
  margin-bottom: ${Layout.widthPercentageToDP(2)}px;
`;

export const NowShowingTitle = styled.Text`
  font-size: ${Layout.RFValue(14)}px;
  font-weight: 600;
  margin-bottom: ${Layout.widthPercentageToDP(1)}px;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.latoSemiBold.fontFamily};
`;

export const RatingRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StarIcon = styled.Text`
  font-size: ${Layout.RFValue(14)}px;
  margin-right: ${Layout.widthPercentageToDP(1)}px;
`;

export const Rating = styled.Text`
  font-size: ${Layout.RFValue(12)}px;
  color: ${props => props.theme.colors.muted};
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
`;
