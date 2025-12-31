import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../../../../theme';
import { useMoviesStore } from '../../../../stores';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../../navigation/types';
import { MovieCard } from '../../../components/movie-card';
import { usePopularMovies } from '../../../../react-query/movies';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const FavouritesScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { favourites, isFavourite, removeFromFavourites } = useMoviesStore();
  
  const { data: popularMovies } = usePopularMovies(1);

  const favouriteMovies = useMemo(() => {
    if (!popularMovies?.results) return [];
    return popularMovies.results.filter(movie => isFavourite(movie.id));
  }, [popularMovies, favourites]);

  const handleMoviePress = (movieId: number) => {
    navigation.navigate('MovieDetailScreen', { movieId });
  };

  const handleToggleFavourite = (movieId: number) => {
    removeFromFavourites(movieId);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.header, { color: theme.colors.text }]}>Favourites</Text>
      
      {favouriteMovies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.colors.muted }]}>
            No favourite movies yet
          </Text>
          <Text style={[styles.emptySubtext, { color: theme.colors.muted }]}>
            Add movies to your favourites to see them here
          </Text>
        </View>
      ) : (
        <FlatList
          data={favouriteMovies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <MovieCard
                movie={item}
                onPress={handleMoviePress}
                isFavourite={true}
                onToggleFavourite={handleToggleFavourite}
              />
            </View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    paddingTop: 60,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardWrapper: {
    marginBottom: 16,
  },
});
