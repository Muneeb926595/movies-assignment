import React from 'react';
import { useTheme } from 'styled-components/native';
import { AppIcon } from '../../../../components';
import { AppIconName, AppIconSize } from '../../../../components/icon/types';
import { formatRating } from '../../../../components/movie-card/utils';
import {
  GenreChip,
  GenresContainer,
  GenreText,
  InfoRow,
  Rating,
  RatingContainer,
  Title,
} from './styles';

interface Genre {
  id: number;
  name: string;
}

interface MovieInfoProps {
  title: string;
  voteAverage: number;
  genres?: Genre[];
}

export const MovieInfo = ({ title, voteAverage, genres }: MovieInfoProps) => {
  const theme = useTheme();

  return (
    <>
      <Title>{title}</Title>

      <InfoRow>
        <RatingContainer>
          <AppIcon
            name={AppIconName.tag}
            iconSize={AppIconSize.small}
            color={theme.colors.primary}
          />
          <Rating>{formatRating(voteAverage)}/10 IMDb</Rating>
        </RatingContainer>
      </InfoRow>

      {genres && genres.length > 0 && (
        <GenresContainer>
          {genres.slice(0, 3).map(genre => (
            <GenreChip key={genre.id}>
              <GenreText>{genre.name}</GenreText>
            </GenreChip>
          ))}
        </GenresContainer>
      )}
    </>
  );
};
