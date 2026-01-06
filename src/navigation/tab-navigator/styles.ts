import styled from 'styled-components/native';

export const HeaderTitle = styled.Text`
  font-family: Lato-Bold;
  font-weight: bold;
  font-size: 26px;
`;

export const AddButtonContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;

export const FloatingButton = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.brand.DEFAULT};
  justify-content: center;
  align-items: center;
  shadow-color: ${({ theme }) => theme.colors.brand.DEFAULT};
  shadow-offset: 0px 0px;
  shadow-opacity: 0.9;
  shadow-radius: 10px;
  elevation: 5;
`;
