import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Layout } from '../../../../theme';
import FastImage from '@d11/react-native-fast-image';

const { width } = Dimensions.get('window');

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const BgImage = styled(FastImage)`
  width: 100%;
  height: 100%;
`;

export const CenterContent = styled.View`
  justify-content: center;
  align-items: center;
`;

export const BackdropContainer = styled.View`
  width: ${width}px;
  height: ${width * 0.66}px;
  position: relative;
`;

export const Backdrop = styled.Image`
  width: 100%;
  height: 100%;
`;

export const BackdropOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: ${Layout.widthPercentageToDP(12)}px;
  left: ${Layout.widthPercentageToDP(4)}px;
  width: ${Layout.widthPercentageToDP(10)}px;
  height: ${Layout.widthPercentageToDP(10)}px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const FavouriteButton = styled.TouchableOpacity`
  position: absolute;
  top: ${Layout.widthPercentageToDP(12)}px;
  right: ${Layout.widthPercentageToDP(4)}px;
  width: ${Layout.widthPercentageToDP(10)}px;
  height: ${Layout.widthPercentageToDP(10)}px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const PlayButtonContainer = styled.View`
  position: absolute;
  bottom: ${Layout.widthPercentageToDP(5)}px;
  left: 0;
  right: 0;
  align-items: center;
`;

export const PlayButton = styled.TouchableOpacity`
  width: ${Layout.widthPercentageToDP(15)}px;
  height: ${Layout.widthPercentageToDP(15)}px;
  border-radius: ${Layout.widthPercentageToDP(7.5)}px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const PlayButtonText = styled.Text`
  color: white;
  font-size: ${Layout.RFValue(24)}px;
  margin-left: 4px;
`;

export const PlayButtonLabel = styled.Text`
  color: white;
  font-size: ${Layout.RFValue(14)}px;
  font-weight: 600;
`;

export const ContentContainer = styled.View`
  padding: ${Layout.widthPercentageToDP(4)}px;
`;

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
