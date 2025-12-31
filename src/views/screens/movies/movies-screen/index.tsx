import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { useNowPlayingMovies, usePopularMovies } from '../../../../react-query/movies';
import { useTheme } from '../../../../theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../../navigation/types';
import FastImage from '@d11/react-native-fast-image';
import { getImageUrl } from '../../../../api/endpoints/movies';
import { AppIcon } from '../../../components';
import { AppIconName, AppIconSize } from '../../../components/icon/types';
import { Movie } from '../../../../types/movie.types';

const { width } = Dimensions.get('window');
const POSTER_WIDTH = (width - 48) / 2.5;
const POSTER_HEIGHT = POSTER_WIDTH * 1.5;

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const MoviesScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const { data: nowPlaying, isLoading: loadingNowPlaying } = useNowPlayingMovies(1);
  const { data: popular, isLoading: loadingPopular } = usePopularMovies(1);

  const handleMoviePress = (movieId: number) => {
    navigation.navigate('MovieDetailScreen', { movieId });
  };

  const renderNowShowingItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity 
      style={styles.nowShowingCard}
      onPress={() => handleMoviePress(item.id)}
      activeOpacity={0.8}
    >
      <FastImage
        source={{ uri: getImageUrl(item.poster_path, 'w500') || '' }}
        style={styles.nowShowingPoster}
        resizeMode="cover"
      />
      <Text style={[styles.nowShowingTitle, { color: theme.colors.text }]} numberOfLines={2}>
        {item.title}
      </Text>
      <View style={styles.ratingRow}>
        <Text style={styles.starIcon}>⭐</Text>
        <Text style={[styles.rating, { color: theme.colors.muted }]}>
          {item.vote_average.toFixed(1)}/10 IMDb
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderPopularItem = ({ item }: { item: Movie }) => {
    const genres = item.genre_ids?.slice(0, 3) || [];
    
    return (
      <TouchableOpacity 
        style={[styles.popularCard, { backgroundColor: theme.colors.surface[50] }]}
        onPress={() => handleMoviePress(item.id)}
        activeOpacity={0.8}
      >
        <FastImage
          source={{ uri: getImageUrl(item.poster_path, 'w185') || '' }}
          style={styles.popularPoster}
          resizeMode="cover"
        />
        <View style={styles.popularInfo}>
          <Text style={[styles.popularTitle, { color: theme.colors.text }]} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.ratingRow}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={[styles.rating, { color: theme.colors.muted }]}>
              {item.vote_average.toFixed(1)}/10 IMDb
            </Text>
          </View>
          {genres.length > 0 && (
            <View style={styles.genresRow}>
              {genres.map((genreId, index) => (
                <View 
                  key={genreId} 
                  style={[styles.genreTag, { backgroundColor: theme.colors.primary + '20' }]}
                >
                  <Text style={[styles.genreText, { color: theme.colors.primary }]}>
                    {getGenreName(genreId)}
                  </Text>
                </View>
              ))}
            </View>
          )}
          <View style={styles.durationRow}>
            <AppIcon name={AppIconName.clock} iconSize={16} color={theme.colors.muted} />
            <Text style={[styles.duration, { color: theme.colors.muted }]}>1h 47m</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <AppIcon name={AppIconName.homeTab} iconSize={AppIconSize.medium} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>FilmKu</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <AppIcon name={AppIconName.announcement} iconSize={AppIconSize.medium} color={theme.colors.text} />
          <View style={[styles.notificationDot, { backgroundColor: theme.colors.red }]} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Now Showing Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Now Showing</Text>
            <TouchableOpacity style={[styles.seeMoreButton, { borderColor: theme.colors.borders.DEFAULT }]}>
              <Text style={[styles.seeMoreText, { color: theme.colors.muted }]}>See more</Text>
            </TouchableOpacity>
          </View>
          
          {loadingNowPlaying ? (
            <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
          ) : (
            <FlatList
              horizontal
              data={nowPlaying?.results.slice(0, 10) || []}
              renderItem={renderNowShowingItem}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.nowShowingList}
            />
          )}
        </View>

        {/* Popular Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Popular</Text>
            <TouchableOpacity style={[styles.seeMoreButton, { borderColor: theme.colors.borders.DEFAULT }]}>
              <Text style={[styles.seeMoreText, { color: theme.colors.muted }]}>See more</Text>
            </TouchableOpacity>
          </View>
          
          {loadingPopular ? (
            <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
          ) : (
            <View style={styles.popularList}>
              {popular?.results.slice(0, 5).map((movie) => (
                <View key={movie.id}>
                  {renderPopularItem({ item: movie })}
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

// Helper function to map genre IDs to names
const getGenreName = (genreId: number): string => {
  const genreMap: Record<number, string> = {
    28: 'ACTION',
    12: 'ADVENTURE',
    16: 'ANIMATION',
    35: 'COMEDY',
    80: 'CRIME',
    99: 'DOCUMENTARY',
    18: 'DRAMA',
    10751: 'FAMILY',
    14: 'FANTASY',
    36: 'HISTORY',
    27: 'HORROR',
    10402: 'MUSIC',
    9648: 'MYSTERY',
    10749: 'ROMANCE',
    878: 'SCI-FI',
    10770: 'TV',
    53: 'THRILLER',
    10752: 'WAR',
    37: 'WESTERN',
  };
  return genreMap[genreId] || 'OTHER';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  seeMoreButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  seeMoreText: {
    fontSize: 14,
  },
  loader: {
    marginVertical: 40,
  },
  
  // Now Showing styles
  nowShowingList: {
    paddingLeft: 16,
  },
  nowShowingCard: {
    marginRight: 12,
    width: POSTER_WIDTH,
  },
  nowShowingPoster: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: 12,
    marginBottom: 8,
  },
  nowShowingTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  rating: {
    fontSize: 12,
  },
  
  // Popular styles
  popularList: {
    paddingHorizontal: 16,
  },
  popularCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  popularPoster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 12,
  },
  popularInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  genresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  genreTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  genreText: {
    fontSize: 10,
    fontWeight: '600',
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 12,
    marginLeft: 4,
  },
});
