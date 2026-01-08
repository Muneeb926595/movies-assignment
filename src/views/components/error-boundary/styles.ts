import styled from 'styled-components/native';
import { Layout } from '../../../theme';

export const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${Layout.widthPercentageToDP(5)}px;
`;

export const ErrorTitle = styled.Text`
  font-size: ${Layout.RFValue(18)}px;
  font-weight: bold;
  margin-bottom: ${Layout.widthPercentageToDP(2.5)}px;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.latoBold.fontFamily};
`;

export const ErrorMessage = styled.Text`
  margin-bottom: ${Layout.widthPercentageToDP(5)}px;
  text-align: center;
  color: ${props => props.theme.colors.red};
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
`;
