import styled from 'styled-components/native';
import { Layout } from '../../../../theme';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const CenterContent = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Backdrop = styled.Image`
  width: 100%;
  height: 100%;
`;

export const ContentContainer = styled.View`
  padding: ${Layout.widthPercentageToDP(4)}px;
`;
export const Rating = styled.Text`
  font-size: ${Layout.RFValue(14)}px;
  margin-left: ${Layout.widthPercentageToDP(1.5)}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const Section = styled.View`
  margin-bottom: ${Layout.widthPercentageToDP(6)}px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Layout.widthPercentageToDP(3)}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${Layout.RFValue(18)}px;
  font-weight: 600;
  margin-bottom: ${Layout.widthPercentageToDP(3)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const SeeMore = styled.Text`
  font-size: ${Layout.RFValue(14)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Overview = styled.Text`
  font-size: ${Layout.RFValue(14)}px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.muted};
`;

export const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.red};
`;
