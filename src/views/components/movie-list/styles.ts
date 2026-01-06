import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 24px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 16px;
  margin-bottom: 12px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const SeeMore = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ListContent = {
  paddingHorizontal: 16,
};

export const LoadingContainer = styled.View`
  height: 250px;
  justify-content: center;
  align-items: center;
`;
