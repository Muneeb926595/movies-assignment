import styled from 'styled-components/native';
import FastImage from '@d11/react-native-fast-image';

export const Card = styled.TouchableOpacity`
  width: 160px;
  margin-right: 12px;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${props => props.theme.colors.surface.DEFAULT};
`;

export const Poster = styled(FastImage)`
  width: 100%;
  height: 225px;
  background-color: ${props => props.theme.colors.surface[100]};
`;

export const PlaceholderPoster = styled.View`
  width: 100%;
  height: 225px;
  background-color: ${props => props.theme.colors.surface[100]};
  justify-content: center;
  align-items: center;
`;

export const PlaceholderText = styled.Text`
  color: ${props => props.theme.colors.muted};
  text-align: center;
`;

export const InfoContainer = styled.View`
  padding: 8px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 4px;
  font-family: ${props => props.theme.fonts.latoSemiBold.fontFamily};
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Rating = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.colors.muted};
  margin-left: 4px;
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
`;

export const FavouriteButton = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  padding: 6px;
`;
