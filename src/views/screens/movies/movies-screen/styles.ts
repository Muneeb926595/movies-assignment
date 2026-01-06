import styled from 'styled-components/native';
import { rf } from '../../../../theme';
import { ActivityIndicator, Dimensions } from 'react-native';
import FastImage from '@d11/react-native-fast-image';

const { width } = Dimensions.get('window');
const POSTER_WIDTH = (width - 48) / 2.5;
const POSTER_HEIGHT = POSTER_WIDTH * 1.5;

// Styled Components
export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 16px;
  padding-top: 60px;
  padding-bottom: 16px;
`;

export const MenuButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: ${rf(24)}px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.latoBold.fontFamily};
`;

export const NotificationButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const NotificationDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.red};
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const ScrollView = styled.ScrollView`
  flex: 1;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 16px;
  margin-bottom: 16px;
`;

export const SectionTitle = styled.Text`
  font-size: ${rf(20)}px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.latoBold.fontFamily};
`;

export const SeeMoreButton = styled.TouchableOpacity`
  padding-horizontal: 16px;
  padding-vertical: 8px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.borders.DEFAULT};
`;

export const SeeMoreText = styled.Text`
  font-size: ${rf(14)}px;
  color: ${props => props.theme.colors.muted};
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
`;

export const Loader = styled(ActivityIndicator)`
  margin-vertical: 40px;
`;

// Now Showing Components
export const NowShowingCard = styled.TouchableOpacity`
  margin-right: 12px;
  width: ${POSTER_WIDTH}px;
`;

export const NowShowingPoster = styled(FastImage)`
  width: ${POSTER_WIDTH}px;
  height: ${POSTER_HEIGHT}px;
  border-radius: 12px;
  margin-bottom: 8px;
`;

export const NowShowingTitle = styled.Text`
  font-size: ${rf(14)}px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.latoSemiBold.fontFamily};
`;

export const RatingRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StarIcon = styled.Text`
  font-size: 14px;
  margin-right: 4px;
`;

export const Rating = styled.Text`
  font-size: ${rf(12)}px;
  color: ${props => props.theme.colors.muted};
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
`;

// Popular Components
export const PopularList = styled.View`
  padding-horizontal: 16px;
`;

export const PopularCard = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 12px;
  background-color: ${props => props.theme.colors.surface[50]};
`;

export const PopularPoster = styled(FastImage)`
  width: 100px;
  height: 150px;
  border-radius: 8px;
  margin-right: 12px;
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

export const GenresRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

export const GenreTag = styled.View`
  padding-horizontal: 12px;
  padding-vertical: 4px;
  border-radius: 12px;
  margin-right: 6px;
  margin-bottom: 4px;
  background-color: ${props => props.theme.colors.primary}20;
`;

export const GenreText = styled.Text`
  font-size: ${rf(10)}px;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.latoSemiBold.fontFamily};
`;

export const DurationRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Duration = styled.Text`
  font-size: ${rf(12)}px;
  margin-left: 4px;
  color: ${props => props.theme.colors.muted};
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
`;
