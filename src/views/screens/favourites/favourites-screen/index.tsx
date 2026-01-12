import React, { useMemo } from 'react';
import { useMoviesStore } from '../../../../stores';
import { TabScreenProps } from '../../../../navigation/types';
import { MovieCard } from '../../../components/movie-card';
import { List } from '../../../components';
import { usePopularMovies } from '../../../../react-query/movies';
import {
  Container,
  Header,
  EmptyContainer,
  EmptyText,
  EmptySubtext,
  ListContent,
  Row,
  CardWrapper,
} from './styles';

export const FavouritesScreen = (props: TabScreenProps<'Favourites'>) => {
  const { favourites, isFavourite, removeFromFavourites } = useMoviesStore();

  const { data: popularMovies } = usePopularMovies(1);

  const favouriteMovies = useMemo(() => {
    if (!popularMovies?.results) return [];
    return popularMovies.results.filter(movie => isFavourite(movie.id));
  }, [popularMovies, favourites]);

  const handleMoviePress = (movieId: number) => {
    props.navigation.navigate('MovieDetailScreen', { movieId });
  };

  const handleToggleFavourite = (movieId: number) => {
    removeFromFavourites(movieId);
  };

  return (
    <Container>
      <Header>Favourites</Header>

      <List
        data={favouriteMovies}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={Row}
        renderItem={item => (
          <CardWrapper>
            <MovieCard
              movie={item}
              onPress={handleMoviePress}
              isFavourite={true}
              onToggleFavourite={handleToggleFavourite}
            />
          </CardWrapper>
        )}
        contentContainerStyle={ListContent}
        ListEmptyComponent={
          <EmptyContainer>
            <EmptyText>No favourite movies yet</EmptyText>
            <EmptySubtext>
              Add movies to your favourites to see them here
            </EmptySubtext>
          </EmptyContainer>
        }
      />
    </Container>
  );
};
