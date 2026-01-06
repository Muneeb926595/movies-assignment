import styled from 'styled-components/native';
import { hp, wp, rf } from '../../../theme/styled-utils';

export const ToastContainer = styled.View`
  position: absolute;
  bottom: ${hp(10)}px;
  left: ${wp(5)}px;
  right: ${wp(5)}px;
  background-color: ${props => props.theme.colors.surface.DEFAULT};
  border-radius: 8px;
  padding: ${hp(2)}px;
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
  font-size: ${rf(14)}px;
  margin-right: ${wp(2)}px;
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
`;

export const ActionButton = styled.TouchableOpacity`
  padding-horizontal: ${wp(3)}px;
  padding-vertical: ${hp(1)}px;
`;

export const ActionLabel = styled.Text`
  color: ${props => props.theme.colors.brand.DEFAULT};
  font-size: ${rf(14)}px;
  font-weight: 600;
  font-family: ${props => props.theme.fonts.latoSemiBold.fontFamily};
`;
