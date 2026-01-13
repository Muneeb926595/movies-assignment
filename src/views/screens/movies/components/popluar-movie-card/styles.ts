import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { Layout } from '../../../../../theme';

export const AnimatedCardWrapper = Animated.View;

export const popularCardContainerStyle = {
  padding: Layout.widthPercentageToDP(2.4),
  borderRadius: Layout.widthPercentageToDP(3),
  marginBottom: Layout.widthPercentageToDP(3),
};

export const DurationRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Duration = styled.Text`
  font-size: ${Layout.RFValue(12)}px;
  margin-left: ${Layout.widthPercentageToDP(1)}px;
  color: ${props => props.theme.colors.muted};
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
`;

export const GenresRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${Layout.widthPercentageToDP(2)}px;
`;

export const GenreTag = styled.View`
  padding-horizontal: ${Layout.widthPercentageToDP(3)}px;
  padding-vertical: ${Layout.widthPercentageToDP(1)}px;
  border-radius: ${Layout.widthPercentageToDP(3)}px;
  margin-right: ${Layout.widthPercentageToDP(1.5)}px;
  margin-bottom: ${Layout.widthPercentageToDP(1)}px;
  background-color: ${props => props.theme.colors.primary}20;
`;

export const GenreText = styled.Text`
  font-size: ${Layout.RFValue(10)}px;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.latoSemiBold.fontFamily};
`;

export const PopularInfo = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const PopularTitle = styled.Text`
  font-size: ${Layout.RFValue(16)}px;
  font-weight: 600;
  margin-bottom: ${Layout.widthPercentageToDP(2)}px;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.latoSemiBold.fontFamily};
`;
