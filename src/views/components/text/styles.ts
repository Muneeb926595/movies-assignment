import styled from 'styled-components/native';

export const StyledText = styled.Text<{ emphasis?: 'low' | 'medium' | 'high' }>`
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
  color: ${props => props.theme.colors.white};
`;

export const LinkBoldText = styled.Text`
  font-family: ${props => props.theme.fonts.latoBold.fontFamily};
  color: ${props => props.theme.colors.brand.DEFAULT};
  text-decoration-line: underline;
`;

export const LinkText = styled.Text`
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
  color: ${props => props.theme.colors.brand.DEFAULT};
  text-decoration-line: underline;
`;

export const StyledTouchableOpacity = styled.TouchableOpacity``;
