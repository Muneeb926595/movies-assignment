import styled from 'styled-components/native';
import { rf, wp } from '../../../../theme';
import { ActivityIndicator } from 'react-native';

// Styled Components
export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${wp(4)}px;
  padding-top: ${wp(15)}px;
  padding-bottom: ${wp(4)}px;
`;

export const MenuButton = styled.TouchableOpacity`
  width: ${wp(10)}px;
  height: ${wp(10)}px;
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
  width: ${wp(10)}px;
  height: ${wp(10)}px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const NotificationDot = styled.View`
  width: ${wp(2)}px;
  height: ${wp(2)}px;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.red};
  position: absolute;
  top: ${wp(2)}px;
  right: ${wp(2)}px;
`;

export const ScrollView = styled.ScrollView`
  flex: 1;
`;

export const Section = styled.View`
  margin-bottom: ${wp(6)}px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${wp(4)}px;
  margin-bottom: ${wp(4)}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${rf(20)}px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.latoBold.fontFamily};
`;

export const SeeMoreButton = styled.TouchableOpacity`
  padding-horizontal: ${wp(4)}px;
  padding-vertical: ${wp(2)}px;
  border-radius: ${wp(5)}px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.borders.DEFAULT};
`;

export const SeeMoreText = styled.Text`
  font-size: ${rf(14)}px;
  color: ${props => props.theme.colors.muted};
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
`;

export const Loader = styled(ActivityIndicator)`
  margin-vertical: ${wp(10)}px;
`;
