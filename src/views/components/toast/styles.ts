import styled from 'styled-components/native';
import { Layout } from '../../../theme';

export const ToastContainer = styled.View`
  position: absolute;
  bottom: ${Layout.heightPercentageToDP(10)}px;
  left: ${Layout.widthPercentageToDP(5)}px;
  right: ${Layout.widthPercentageToDP(5)}px;
  background-color: ${props => props.theme.colors.surface.DEFAULT};
  border-radius: 8px;
  padding: ${Layout.heightPercentageToDP(2)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const ToastMessage = styled.Text`
  flex: 1;
  color: ${props => props.theme.colors.text};
  font-size: ${Layout.RFValue(14)}px;
  margin-right: ${Layout.widthPercentageToDP(2)}px;
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
`;

export const ActionButton = styled.TouchableOpacity`
  padding-horizontal: ${Layout.widthPercentageToDP(3)}px;
  padding-vertical: ${Layout.heightPercentageToDP(1)}px;
`;

export const ActionLabel = styled.Text`
  color: ${props => props.theme.colors.brand.DEFAULT};
  font-size: ${Layout.RFValue(14)}px;
  font-weight: 600;
  font-family: ${props => props.theme.fonts.latoSemiBold.fontFamily};
`;
