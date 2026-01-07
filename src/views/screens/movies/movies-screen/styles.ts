import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { Layout } from '../../../../globals';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${Layout.widthPercentageToDP(4)}px;
  padding-top: ${Layout.widthPercentageToDP(15)}px;
  padding-bottom: ${Layout.widthPercentageToDP(4)}px;
`;

export const MenuButton = styled.TouchableOpacity`
  width: ${Layout.widthPercentageToDP(10)}px;
  height: ${Layout.widthPercentageToDP(10)}px;
  justify-content: center;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: ${Layout.RFValue(24)}px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.latoBold.fontFamily};
`;

export const NotificationButton = styled.TouchableOpacity`
  width: ${Layout.widthPercentageToDP(10)}px;
  height: ${Layout.widthPercentageToDP(10)}px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const NotificationDot = styled.View`
  width: ${Layout.widthPercentageToDP(2)}px;
  height: ${Layout.widthPercentageToDP(2)}px;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.red};
  position: absolute;
  top: ${Layout.widthPercentageToDP(2)}px;
  right: ${Layout.widthPercentageToDP(2)}px;
`;

export const ScrollView = styled.ScrollView`
  flex: 1;
`;

export const Section = styled.View`
  margin-bottom: ${Layout.widthPercentageToDP(6)}px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${Layout.widthPercentageToDP(4)}px;
  margin-bottom: ${Layout.widthPercentageToDP(4)}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${Layout.RFValue(20)}px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.latoBold.fontFamily};
`;

export const SeeMoreButton = styled.TouchableOpacity`
  padding-horizontal: ${Layout.widthPercentageToDP(4)}px;
  padding-vertical: ${Layout.widthPercentageToDP(2)}px;
  border-radius: ${Layout.widthPercentageToDP(5)}px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.borders.DEFAULT};
`;

export const SeeMoreText = styled.Text`
  font-size: ${Layout.RFValue(14)}px;
  color: ${props => props.theme.colors.muted};
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
`;

export const Loader = styled(ActivityIndicator)`
  margin-vertical: ${Layout.widthPercentageToDP(10)}px;
`;
