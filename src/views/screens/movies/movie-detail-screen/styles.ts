import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const CenterContent = styled.View`
  justify-content: center;
  align-items: center;
`;

export const BackdropContainer = styled.View`
  width: ${width}px;
  height: ${width * 0.6}px;
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
  top: 50px;
  left: 16px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const FavouriteButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const PlayButtonContainer = styled.View`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  align-items: center;
`;

export const PlayButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const PlayButtonText = styled.Text`
  color: white;
  font-size: 24px;
  margin-left: 4px;
`;

export const PlayButtonLabel = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: 600;
`;

export const ContentContainer = styled.View`
  padding: 16px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.text};
`;

export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Rating = styled.Text`
  font-size: 14px;
  margin-left: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const GenresContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

export const GenreChip = styled.View`
  padding-horizontal: 12px;
  padding-vertical: 6px;
  border-radius: 16px;
  margin-right: 8px;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.surface['100']};
`;

export const GenreText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export const DetailsRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 24px;
  padding-vertical: 16px;
`;

export const DetailItem = styled.View`
  align-items: center;
`;

export const DetailLabel = styled.Text`
  font-size: 12px;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.muted};
`;

export const DetailValue = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.text};
`;

export const SeeMore = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Overview = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.muted};
`;

export const CastCard = styled.View`
  width: 100px;
  margin-right: 12px;
`;

export const CastImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const CastPlaceholder = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.surface['100']};
`;

export const CastName = styled.Text`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 2px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CastCharacter = styled.Text`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.muted};
`;

export const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.red};
`;
