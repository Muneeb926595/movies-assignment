import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout } from '../../../globals';

export const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.background};
  padding-horizontal: ${Layout.widthPercentageToDP(5 / 4)}px;
`;

export const BodyContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
  background-color: ${props => props.theme.colors.transparent};
  z-index: 1;
`;

export const BackgroundImageStyle = styled(ImageBackground)`
  flex: 1;
`;
