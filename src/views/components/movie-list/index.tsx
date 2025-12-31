import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from '../../../theme';
import { MovieCard } from '../movie-card';
import { MovieListProps } from './types';
import { createStyles } from './styles';
import { useMoviesStore } from '../../../stores';

export const MovieList: React.FC<MovieListProps> = ({
  title,
  movies,
  onMoviePress,
  isLoading,
  showFavouriteToggle = false,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { isFavourite, addToFavourites, removeFromFavourites } = useMoviesStore();

  const handleToggleFavourite = (movieId: number) => {
    if (isFavourite(movieId)) {
      removeFromFavourites(movieId);
    } else {
      addToFavourites(movieId);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={theme.colors.primary} />
        </View>
      </View>
    );
  }

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        <Text style={[styles.seeMore, { color: theme.colors.primary }]}>See more</Text>
      </View>
      
      <FlatList
        horizontal
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={onMoviePress}
            isFavourite={isFavourite(item.id)}
            onToggleFavourite={showFavouriteToggle ? handleToggleFavourite : undefined}
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};
