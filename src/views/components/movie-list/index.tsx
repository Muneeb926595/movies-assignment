import React from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { MovieCard } from '../movie-card';
import { MovieListProps } from './types';
import {
  Container,
  HeaderContainer,
  Title,
  SeeMore,
  ListContent,
  LoadingContainer,
} from './styles';
import { useMoviesStore } from '../../../stores';

export const MovieList: React.FC<MovieListProps> = ({
  title,
  movies,
  onMoviePress,
  isLoading,
  showFavouriteToggle = false,
}) => {
  const theme = useTheme();
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useMoviesStore();

  const handleToggleFavourite = (movieId: number) => {
    if (isFavourite(movieId)) {
      removeFromFavourites(movieId);
    } else {
      addToFavourites(movieId);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Title>{title}</Title>
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} />
        </LoadingContainer>
      </Container>
    );
  }

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <Container>
      <HeaderContainer>
        <Title>{title}</Title>
        <SeeMore>See more</SeeMore>
      </HeaderContainer>

      <FlatList
        horizontal
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={onMoviePress}
            isFavourite={isFavourite(item.id)}
            onToggleFavourite={
              showFavouriteToggle ? handleToggleFavourite : undefined
            }
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={ListContent}
      />
    </Container>
  );
};
