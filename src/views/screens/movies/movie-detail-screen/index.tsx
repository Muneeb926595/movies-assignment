import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useTheme } from '../../../../theme';
import { useMovieDetails, useMovieCast } from '../../../../react-query/movies';
import { ScreenProps } from '../../../../navigation/types';
import FastImage from '@d11/react-native-fast-image';
import { getImageUrl } from '../../../../api/endpoints/movies';
import { useMoviesStore } from '../../../../stores';
import { AppIcon } from '../../../components';
import { AppIconName, AppIconSize } from '../../../components/icon/types';
import { formatRating } from '../../../components/movie-card/utils';

const { width } = Dimensions.get('window');

export const MovieDetailScreen = ({ route, navigation }: ScreenProps<'MovieDetailScreen'>) => {
  const { movieId } = route.params;
  const { theme } = useTheme();
  
  const { data: movie, isLoading, error } = useMovieDetails(movieId);
  const { data: cast } = useMovieCast(movieId);
  const { isFavourite, addToFavourites, removeFromFavourites } = useMoviesStore();

  const handleToggleFavourite = () => {
    if (isFavourite(movieId)) {
      removeFromFavourites(movieId);
    } else {
      addToFavourites(movieId);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.red }}>Error loading movie details</Text>
      </View>
    );
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, 'w780');

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {backdropUrl && (
        <View style={styles.backdropContainer}>
          <FastImage
            source={{ uri: backdropUrl }}
            style={styles.backdrop}
            resizeMode="cover"
          />
          <View style={styles.backdropOverlay} />
          
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <AppIcon
              name={AppIconName.leftArrow}
              iconSize={AppIconSize.medium}
              color={theme.colors.white}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.favouriteButton}
            onPress={handleToggleFavourite}
          >
            <AppIcon
              name={isFavourite(movieId) ? AppIconName.heartbeat : AppIconName.plus}
              iconSize={AppIconSize.medium}
              color={isFavourite(movieId) ? theme.colors.primary : theme.colors.white}
            />
          </TouchableOpacity>

          <View style={styles.playButtonContainer}>
            <View style={[styles.playButton, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.playButtonText}>▶</Text>
            </View>
            <Text style={styles.playButtonLabel}>Play Trailer</Text>
          </View>
        </View>
      )}

      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {movie.title}
        </Text>

        <View style={styles.infoRow}>
          <View style={styles.ratingContainer}>
            <AppIcon
              name={AppIconName.tag}
              iconSize={AppIconSize.small}
              color={theme.colors.primary}
            />
            <Text style={[styles.rating, { color: theme.colors.text }]}>
              {formatRating(movie.vote_average)}/10 IMDb
            </Text>
          </View>
        </View>

        {movie.genres && movie.genres.length > 0 && (
          <View style={styles.genresContainer}>
            {movie.genres.slice(0, 3).map((genre) => (
              <View
                key={genre.id}
                style={[styles.genreChip, { backgroundColor: theme.colors.surface['100'] }]}
              >
                <Text style={[styles.genreText, { color: theme.colors.primary }]}>
                  {genre.name}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: theme.colors.muted }]}>Length</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {movie.runtime ? `${movie.runtime}min` : 'N/A'}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: theme.colors.muted }]}>Language</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {movie.original_language.toUpperCase()}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: theme.colors.muted }]}>Rating</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              PG-13
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Description</Text>
          <Text style={[styles.overview, { color: theme.colors.muted }]}>
            {movie.overview}
          </Text>
        </View>

        {cast && cast.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Cast</Text>
              <Text style={[styles.seeMore, { color: theme.colors.primary }]}>See more</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {cast.slice(0, 10).map((actor) => (
                <View key={actor.id} style={styles.castCard}>
                  {actor.profile_path ? (
                    <FastImage
                      source={{ uri: getImageUrl(actor.profile_path, 'w185') || '' }}
                      style={styles.castImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={[styles.castImage, styles.castPlaceholder, { backgroundColor: theme.colors.surface['100'] }]} />
                  )}
                  <Text style={[styles.castName, { color: theme.colors.text }]} numberOfLines={1}>
                    {actor.name}
                  </Text>
                  <Text style={[styles.castCharacter, { color: theme.colors.muted }]} numberOfLines={1}>
                    {actor.character}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centerContent: { justifyContent: 'center', alignItems: 'center' },
  backdropContainer: { width: width, height: width * 0.6, position: 'relative' },
  backdrop: { width: '100%', height: '100%' },
  backdropOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.3)' },
  backButton: { position: 'absolute', top: 50, left: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  favouriteButton: { position: 'absolute', top: 50, right: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  playButtonContainer: { position: 'absolute', bottom: 20, left: 0, right: 0, alignItems: 'center' },
  playButton: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  playButtonText: { color: 'white', fontSize: 24, marginLeft: 4 },
  playButtonLabel: { color: 'white', fontSize: 14, fontWeight: '600' },
  contentContainer: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  rating: { fontSize: 14, marginLeft: 6, fontWeight: '600' },
  genresContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  genreChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginRight: 8, marginBottom: 8 },
  genreText: { fontSize: 12, fontWeight: '600' },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 24, paddingVertical: 16 },
  detailItem: { alignItems: 'center' },
  detailLabel: { fontSize: 12, marginBottom: 4 },
  detailValue: { fontSize: 14, fontWeight: '600' },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  seeMore: { fontSize: 14 },
  overview: { fontSize: 14, lineHeight: 22 },
  castCard: { width: 100, marginRight: 12 },
  castImage: { width: 100, height: 100, borderRadius: 8, marginBottom: 8 },
  castPlaceholder: { backgroundColor: '#333' },
  castName: { fontSize: 12, fontWeight: '600', marginBottom: 2 },
  castCharacter: { fontSize: 11 },
});
