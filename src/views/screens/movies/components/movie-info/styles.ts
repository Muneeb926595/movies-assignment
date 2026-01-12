import styled from 'styled-components/native';
import { Layout } from '../../../../../theme';

export const Title = styled.Text`
  font-size: ${Layout.RFValue(24)}px;
  font-weight: bold;
  margin-bottom: ${Layout.widthPercentageToDP(3)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${Layout.widthPercentageToDP(4)}px;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Rating = styled.Text`
  font-size: ${Layout.RFValue(14)}px;
  margin-left: ${Layout.widthPercentageToDP(1.5)}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const GenresContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${Layout.widthPercentageToDP(4)}px;
`;

export const GenreChip = styled.View`
  padding-horizontal: ${Layout.widthPercentageToDP(3)}px;
  padding-vertical: ${Layout.widthPercentageToDP(1.5)}px;
  border-radius: ${Layout.widthPercentageToDP(4)}px;
  margin-right: ${Layout.widthPercentageToDP(2)}px;
  margin-bottom: ${Layout.widthPercentageToDP(2)}px;
  background-color: ${({ theme }) => theme.colors.surface['100']};
`;

export const GenreText = styled.Text`
  font-size: ${Layout.RFValue(12)}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;
