import React from 'react';
import { useTheme } from 'styled-components/native';
import { MovieCardProps } from './types';
import { formatRating, formatYear, getMoviePosterUrl } from './utils';
import { AppIcon } from '../icon';
import { AppIconName, AppIconSize } from '../icon/types';
import { Card } from '../card';
import {
  PlaceholderText,
  InfoContainer,
  Title,
  RatingContainer,
  Rating,
  FavouriteButton,
} from './styles';

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPress,
  isFavourite = false,
  onToggleFavourite,
}) => {
  const theme = useTheme();
  const posterUrl = getMoviePosterUrl(movie.poster_path);

  const imagePlaceholder = <PlaceholderText>No Image</PlaceholderText>;

  const topRightAction = onToggleFavourite ? (
    <FavouriteButton onPress={() => onToggleFavourite(movie.id)}>
      <AppIcon
        name={isFavourite ? AppIconName.heartbeat : AppIconName.plus}
        iconSize={AppIconSize.small}
        color={isFavourite ? theme.colors.brand.DEFAULT : theme.colors.white}
      />
    </FavouriteButton>
  ) : undefined;

  const bottomContent = (
    <InfoContainer>
      <Title numberOfLines={2}>{movie.title}</Title>
      <RatingContainer>
        <AppIcon
          name={AppIconName.tag}
          iconSize={AppIconSize.small}
          color={theme.colors.brand.DEFAULT}
        />
        <Rating>
          {formatRating(movie.vote_average)} • {formatYear(movie.release_date)}
        </Rating>
      </RatingContainer>
    </InfoContainer>
  );

  return (
    <Card
      imageUrl={posterUrl}
      imagePlaceholder={imagePlaceholder}
      topRightAction={topRightAction}
      bottomContent={bottomContent}
      onPress={() => onPress(movie.id)}
    />
  );
};
