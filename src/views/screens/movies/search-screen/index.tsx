import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../../../theme';
import { useSearchMovies } from '../../../../react-query/movies';
import { useDebounce } from '../../../../hooks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../../navigation/types';
import { MovieCard } from '../../../components/movie-card';
import { useMoviesStore } from '../../../../stores';
import { AppIcon } from '../../../components';
import { AppIconName, AppIconSize } from '../../../components/icon/types';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const SearchScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 500);
  const { isFavourite, addToFavourites, removeFromFavourites } = useMoviesStore();
  
  const { data, isLoading } = useSearchMovies(debouncedQuery, 1, debouncedQuery.length > 0);

  const handleMoviePress = (movieId: number) => {
    navigation.navigate('MovieDetailScreen', { movieId });
  };

  const handleToggleFavourite = (movieId: number) => {
    if (isFavourite(movieId)) {
      removeFromFavourites(movieId);
    } else {
      addToFavourites(movieId);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.header, { color: theme.colors.text }]}>Search</Text>
      
      <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface['100'] }]}>
        <AppIcon
          name={AppIconName.filter}
          iconSize={AppIconSize.small}
          color={theme.colors.muted}
        />
        <TextInput
          style={[styles.input, { color: theme.colors.text }]}
          placeholder="Search for movies..."
          placeholderTextColor={theme.colors.muted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}

      {!isLoading && searchQuery.length > 0 && data && (
        <>
          <Text style={[styles.resultsText, { color: theme.colors.muted }]}>
            Found {data.total_results} results
          </Text>
          <FlatList
            data={data.results}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <MovieCard
                  movie={item}
                  onPress={handleMoviePress}
                  isFavourite={isFavourite(item.id)}
                  onToggleFavourite={handleToggleFavourite}
                />
              </View>
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}

      {!isLoading && searchQuery.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.colors.muted }]}>
            Search for your favorite movies
          </Text>
        </View>
      )}

      {!isLoading && searchQuery.length > 0 && data?.results.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.colors.muted }]}>
            No movies found for "{searchQuery}"
          </Text>
        </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  resultsText: {
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
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
