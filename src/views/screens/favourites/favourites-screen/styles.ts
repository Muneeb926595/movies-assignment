import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.Text`
  font-size: 24px;
  font-weight: bold;
  padding: 16px;
  padding-top: 60px;
  color: ${({ theme }) => theme.colors.text};
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 32px;
`;

export const EmptyText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
`;

export const EmptySubtext = styled.Text`
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
`;

export const ListContent = {
  padding: 16,
};

export const Row = {
  justifyContent: 'space-between' as const,
};

export const CardWrapper = styled.View`
  margin-bottom: 16px;
`;
