import styled from 'styled-components/native';
import { Layout } from '../../../../../theme';

export const DetailsRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: ${Layout.widthPercentageToDP(6)}px;
  padding-vertical: ${Layout.widthPercentageToDP(4)}px;
`;

export const DetailItem = styled.View`
  align-items: center;
`;

export const DetailLabel = styled.Text`
  font-size: ${Layout.RFValue(12)}px;
  margin-bottom: ${Layout.widthPercentageToDP(1)}px;
  color: ${({ theme }) => theme.colors.muted};
`;

export const DetailValue = styled.Text`
  font-size: ${Layout.RFValue(14)}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;
