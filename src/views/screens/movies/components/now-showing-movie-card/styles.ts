import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { Layout } from '../../../../../theme';

const { width } = Dimensions.get('window');
export const POSTER_WIDTH = (width - 48) / 2.5;
export const POSTER_HEIGHT = POSTER_WIDTH * 1.5;

export const AnimatedCardWrapper = Animated.View;

export const nowShowingCardContainerStyle = {
  marginRight: Layout.widthPercentageToDP(3),
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 3,
};

export const nowShowingBottomContentStyle = {
  padding: 0,
};

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
