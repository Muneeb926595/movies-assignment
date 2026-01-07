import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { rf, wp } from '../../../../theme';

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
  top: ${wp(12)}px;
  left: ${wp(4)}px;
  width: ${wp(10)}px;
  height: ${wp(10)}px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const FavouriteButton = styled.TouchableOpacity`
  position: absolute;
  top: ${wp(12)}px;
  right: ${wp(4)}px;
  width: ${wp(10)}px;
  height: ${wp(10)}px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const PlayButtonContainer = styled.View`
  position: absolute;
  bottom: ${wp(5)}px;
  left: 0;
  right: 0;
  align-items: center;
`;

export const PlayButton = styled.TouchableOpacity`
  width: ${wp(15)}px;
  height: ${wp(15)}px;
  border-radius: ${wp(7.5)}px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const PlayButtonText = styled.Text`
  color: white;
  font-size: ${rf(24)}px;
  margin-left: 4px;
`;

export const PlayButtonLabel = styled.Text`
  color: white;
  font-size: ${rf(14)}px;
  font-weight: 600;
`;

export const ContentContainer = styled.View`
  padding: ${wp(4)}px;
`;

export const Title = styled.Text`
  font-size: ${rf(24)}px;
  font-weight: bold;
  margin-bottom: ${wp(3)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${wp(4)}px;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Rating = styled.Text`
  font-size: ${rf(14)}px;
  margin-left: ${wp(1.5)}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const GenresContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${wp(4)}px;
`;

export const GenreChip = styled.View`
  padding-horizontal: ${wp(3)}px;
  padding-vertical: ${wp(1.5)}px;
  border-radius: ${wp(4)}px;
  margin-right: ${wp(2)}px;
  margin-bottom: ${wp(2)}px;
  background-color: ${({ theme }) => theme.colors.surface['100']};
`;

export const GenreText = styled.Text`
  font-size: ${rf(12)}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export const DetailsRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: ${wp(6)}px;
  padding-vertical: ${wp(4)}px;
`;

export const DetailItem = styled.View`
  align-items: center;
`;

export const DetailLabel = styled.Text`
  font-size: ${rf(12)}px;
  margin-bottom: ${wp(1)}px;
  color: ${({ theme }) => theme.colors.muted};
`;

export const DetailValue = styled.Text`
  font-size: ${rf(14)}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const Section = styled.View`
  margin-bottom: ${wp(6)}px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${wp(3)}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${rf(18)}px;
  font-weight: 600;
  margin-bottom: ${wp(3)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const SeeMore = styled.Text`
  font-size: ${rf(14)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Overview = styled.Text`
  font-size: ${rf(14)}px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.muted};
`;

export const CastCard = styled.View`
  width: ${wp(25)}px;
  margin-right: ${wp(3)}px;
`;

export const CastImage = styled.Image`
  width: ${wp(25)}px;
  height: ${wp(25)}px;
  border-radius: 8px;
  margin-bottom: ${wp(2)}px;
`;

export const CastPlaceholder = styled.View`
  width: ${wp(25)}px;
  height: ${wp(25)}px;
  border-radius: 8px;
  margin-bottom: ${wp(2)}px;
  background-color: ${({ theme }) => theme.colors.surface['100']};
`;

export const CastName = styled.Text`
  font-size: ${rf(12)}px;
  font-weight: 600;
  margin-bottom: ${wp(1)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CastCharacter = styled.Text`
  font-size: ${rf(11)}px;
  color: ${({ theme }) => theme.colors.muted};
`;

export const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.red};
`;
