import styled from 'styled-components/native';
import { hp, wp, rf } from '../../../theme/styled-utils';

export const StyledButton = styled.TouchableOpacity<{
  disabled?: boolean;
  disableBgColor?: string;
}>`
  margin-top: ${hp(20 / 8)}px;
  width: 100%;
  background-color: ${props =>
    props.disabled
      ? props.disableBgColor || props.theme.colors.surface[100]
      : props.theme.colors.brand.DEFAULT};
  padding-vertical: ${hp(15 / 8)}px;
  border-radius: ${wp(2)}px;
  align-items: center;
  justify-content: center;
  align-self: center;
  flex-direction: row;
`;

export const ButtonLabel = styled.Text`
  text-align: center;
  color: ${props => props.theme.colors.white};
  font-size: ${rf(15.5)}px;
  font-family: ${props => props.theme.fonts.latoBold.fontFamily};
`;
