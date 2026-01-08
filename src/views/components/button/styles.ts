import styled from 'styled-components/native';
import { Layout } from '../../../theme';

export const StyledButton = styled.TouchableOpacity<{
  disabled?: boolean;
  disableBgColor?: string;
}>`
  margin-top: ${Layout.heightPercentageToDP(20 / 8)}px;
  width: 100%;
  background-color: ${props =>
    props.disabled
      ? props.disableBgColor || props.theme.colors.surface[100]
      : props.theme.colors.brand.DEFAULT};
  padding-vertical: ${Layout.heightPercentageToDP(15 / 8)}px;
  border-radius: ${Layout.widthPercentageToDP(2)}px;
  align-items: center;
  justify-content: center;
  align-self: center;
  flex-direction: row;
`;

export const ButtonLabel = styled.Text`
  text-align: center;
  color: ${props => props.theme.colors.white};
  font-size: ${Layout.RFValue(15.5)}px;
  font-family: ${props => props.theme.fonts.latoBold.fontFamily};
`;
