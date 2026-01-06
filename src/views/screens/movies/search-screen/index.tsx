import React, { useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useSearchMovies } from '../../../../react-query/movies';
import { useDebounce } from '../../../../hooks';
import { useNavigation } from '@react-navigation/native';
import { MovieCard } from '../../../components/movie-card';
import { useMoviesStore } from '../../../../stores';
import { AppIcon } from '../../../components';
import { AppIconName, AppIconSize } from '../../../components/icon/types';
import {
  Container,
  Header,
  SearchContainer,
  Input,
  ResultsText,
  LoadingContainer,
  EmptyContainer,
  EmptyText,
  ListContent,
  Row,
  CardWrapper,
} from './styles';
import { TabScreenProps } from '../../../../navigation';

export const SearchScreen = (props: TabScreenProps<'Search'>) => {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 500);
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useMoviesStore();

  const { data, isLoading } = useSearchMovies(
    debouncedQuery,
    1,
    debouncedQuery.length > 0,
  );

  const handleMoviePress = (movieId: number) => {
    props.navigation.navigate('MovieDetailScreen', { movieId });
  };

  const handleToggleFavourite = (movieId: number) => {
    if (isFavourite(movieId)) {
      removeFromFavourites(movieId);
    } else {
      addToFavourites(movieId);
    }
  };

  return (
    <Container>
      <Header>Search</Header>

      <SearchContainer>
        <AppIcon
          name={AppIconName.filter}
          iconSize={AppIconSize.small}
          color={theme.colors.muted}
        />
        <Input
          placeholder="Search for movies..."
          placeholderTextColor={theme.colors.muted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </SearchContainer>

      {isLoading && (
        <LoadingContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadingContainer>
      )}

      {!isLoading && searchQuery.length > 0 && data && (
        <>
          <ResultsText>Found {data.total_results} results</ResultsText>
          <FlatList
            data={data.results}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={Row}
            renderItem={({ item }) => (
              <CardWrapper>
                <MovieCard
                  movie={item}
                  onPress={handleMoviePress}
                  isFavourite={isFavourite(item.id)}
                  onToggleFavourite={handleToggleFavourite}
                />
              </CardWrapper>
            )}
            contentContainerStyle={ListContent}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}

      {!isLoading && searchQuery.length === 0 && (
        <EmptyContainer>
          <EmptyText>Search for your favorite movies</EmptyText>
        </EmptyContainer>
      )}

      {!isLoading && searchQuery.length > 0 && data?.results.length === 0 && (
        <EmptyContainer>
          <EmptyText>No movies found for "{searchQuery}"</EmptyText>
        </EmptyContainer>
      )}
    </Container>
  );
};
