import styled from 'styled-components/native';

export const PlaceholderText = styled.Text`
  color: ${props => props.theme.colors.muted};
  text-align: center;
`;

export const InfoContainer = styled.View``;

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
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  padding: 6px;
`;
