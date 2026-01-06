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

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-horizontal: 16px;
  margin-bottom: 16px;
  padding-horizontal: 12px;
  padding-vertical: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface['100']};
`;

export const Input = styled.TextInput`
  flex: 1;
  margin-left: 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

export const ResultsText = styled.Text`
  padding-horizontal: 16px;
  margin-bottom: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 32px;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
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
