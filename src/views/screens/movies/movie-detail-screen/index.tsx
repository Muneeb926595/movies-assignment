import React, { useState } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  useMovieDetails,
  useMovieCast,
  useMovieVideos,
} from '../../../../react-query/movies';
import { ScreenProps } from '../../../../navigation/types';
import { getImageUrl } from '../../../../api/endpoints/movies';
import { useMoviesStore } from '../../../../stores';
import { VideoPlayer } from '../../../components';
import {
  CenterContent,
  ContentContainer,
  Section,
  SectionHeader,
  SectionTitle,
  SeeMore,
  Overview,
  ErrorText,
} from './styles';
import {
  MovieCastCard,
  MovieHeader,
  MovieInfo,
  MovieStats,
} from '../components';
import { List } from '../../../components';
import { getTrailer } from './utils';

export const MovieDetailScreen = ({
  route,
  navigation,
}: ScreenProps<'MovieDetailScreen'>) => {
  const theme = useTheme();

  const { movieId } = route.params;
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const { data: movie, isLoading, error } = useMovieDetails(movieId);
  const { data: cast } = useMovieCast(movieId);
  const { data: videos } = useMovieVideos(movieId);
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useMoviesStore();

  // Get the first YouTube trailer
  const trailer = getTrailer(videos);

  const handleToggleFavourite = () => {
    if (isFavourite(movieId)) {
      removeFromFavourites(movieId);
    } else {
      addToFavourites(movieId);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <CenterContent style={{ flex: 1 }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </CenterContent>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={{ flex: 1 }}>
        <CenterContent style={{ flex: 1 }}>
          <ErrorText>Error loading movie details</ErrorText>
        </CenterContent>
      </View>
    );
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, 'w780');
  const isFav = isFavourite(movieId);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {backdropUrl && (
        <MovieHeader
          backdropUrl={backdropUrl}
          isFavourite={isFav}
          hasTrailer={!!trailer}
          onBack={() => navigation.goBack()}
          onToggleFavourite={handleToggleFavourite}
          onPlayTrailer={() => setShowVideoPlayer(true)}
        />
      )}

      <ContentContainer>
        <MovieInfo
          title={movie.title}
          voteAverage={movie.vote_average}
          genres={movie.genres}
        />

        <MovieStats
          runtime={movie.runtime}
          language={movie.original_language}
        />

        <Section>
          <SectionTitle>Description</SectionTitle>
          <Overview>{movie.overview}</Overview>
        </Section>

        {cast && cast.length > 0 && (
          <Section>
            <SectionHeader>
              <SectionTitle>Cast</SectionTitle>
              <SeeMore>See more</SeeMore>
            </SectionHeader>
            <List
              horizontal
              initialNumToRender={5}
              maxToRenderPerBatch={5}
              windowSize={5}
              data={cast.slice(0, 15)}
              renderItem={(item, index) => (
                <MovieCastCard item={item} index={index} />
              )}
            />
          </Section>
        )}
      </ContentContainer>

      {trailer && (
        <VideoPlayer
          videoKey={trailer.key}
          visible={showVideoPlayer}
          onClose={() => setShowVideoPlayer(false)}
        />
      )}
    </ScrollView>
  );
};
