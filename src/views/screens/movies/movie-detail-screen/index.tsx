import React from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView as RNScrollView,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import { useMovieDetails, useMovieCast } from '../../../../react-query/movies';
import { ScreenProps } from '../../../../navigation/types';
import FastImage from '@d11/react-native-fast-image';
import { getImageUrl } from '../../../../api/endpoints/movies';
import { useMoviesStore } from '../../../../stores';
import { AppIcon } from '../../../components';
import { AppIconName, AppIconSize } from '../../../components/icon/types';
import { formatRating } from '../../../components/movie-card/utils';
import {
  CenterContent,
  BackdropContainer,
  BackdropOverlay,
  BackButton,
  FavouriteButton,
  PlayButtonContainer,
  PlayButton,
  PlayButtonText,
  PlayButtonLabel,
  ContentContainer,
  Title,
  InfoRow,
  RatingContainer,
  Rating,
  GenresContainer,
  GenreChip,
  GenreText,
  DetailsRow,
  DetailItem,
  DetailLabel,
  DetailValue,
  Section,
  SectionHeader,
  SectionTitle,
  SeeMore,
  Overview,
  CastCard,
  CastPlaceholder,
  CastName,
  CastCharacter,
  ErrorText,
} from './styles';

export const MovieDetailScreen = ({
  route,
  navigation,
}: ScreenProps<'MovieDetailScreen'>) => {
  const { movieId } = route.params;
  const theme = useTheme();

  const { data: movie, isLoading, error } = useMovieDetails(movieId);
  const { data: cast } = useMovieCast(movieId);
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useMoviesStore();

  const handleToggleFavourite = () => {
    if (isFavourite(movieId)) {
      removeFromFavourites(movieId);
    } else {
      addToFavourites(movieId);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <CenterContent style={{ flex: 1 }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </CenterContent>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <CenterContent style={{ flex: 1 }}>
          <ErrorText>Error loading movie details</ErrorText>
        </CenterContent>
      </View>
    );
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, 'w780');

  return (
    <RNScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      showsVerticalScrollIndicator={false}
    >
      {backdropUrl && (
        <BackdropContainer>
          <FastImage
            source={{ uri: backdropUrl }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
          <BackdropOverlay />

          <BackButton onPress={() => navigation.goBack()}>
            <AppIcon
              name={AppIconName.leftArrow}
              iconSize={AppIconSize.medium}
              color={theme.colors.white}
            />
          </BackButton>

          <FavouriteButton onPress={handleToggleFavourite}>
            <AppIcon
              name={
                isFavourite(movieId) ? AppIconName.heartbeat : AppIconName.plus
              }
              iconSize={AppIconSize.medium}
              color={
                isFavourite(movieId) ? theme.colors.primary : theme.colors.white
              }
            />
          </FavouriteButton>

          <PlayButtonContainer>
            <PlayButton>
              <PlayButtonText>▶</PlayButtonText>
            </PlayButton>
            <PlayButtonLabel>Play Trailer</PlayButtonLabel>
          </PlayButtonContainer>
        </BackdropContainer>
      )}

      <ContentContainer>
        <Title>{movie.title}</Title>

        <InfoRow>
          <RatingContainer>
            <AppIcon
              name={AppIconName.tag}
              iconSize={AppIconSize.small}
              color={theme.colors.primary}
            />
            <Rating>{formatRating(movie.vote_average)}/10 IMDb</Rating>
          </RatingContainer>
        </InfoRow>

        {movie.genres && movie.genres.length > 0 && (
          <GenresContainer>
            {movie.genres.slice(0, 3).map(genre => (
              <GenreChip key={genre.id}>
                <GenreText>{genre.name}</GenreText>
              </GenreChip>
            ))}
          </GenresContainer>
        )}

        <DetailsRow>
          <DetailItem>
            <DetailLabel>Length</DetailLabel>
            <DetailValue>
              {movie.runtime ? `${movie.runtime}min` : 'N/A'}
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Language</DetailLabel>
            <DetailValue>{movie.original_language.toUpperCase()}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Rating</DetailLabel>
            <DetailValue>PG-13</DetailValue>
          </DetailItem>
        </DetailsRow>

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
            <RNScrollView horizontal showsHorizontalScrollIndicator={false}>
              {cast.slice(0, 10).map(actor => (
                <CastCard key={actor.id}>
                  {actor.profile_path ? (
                    <FastImage
                      source={{
                        uri: getImageUrl(actor.profile_path, 'w185') || '',
                      }}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 8,
                        marginBottom: 8,
                      }}
                      resizeMode="cover"
                    />
                  ) : (
                    <CastPlaceholder />
                  )}
                  <CastName numberOfLines={1}>{actor.name}</CastName>
                  <CastCharacter numberOfLines={1}>
                    {actor.character}
                  </CastCharacter>
                </CastCard>
              ))}
            </RNScrollView>
          </Section>
        )}
      </ContentContainer>
    </RNScrollView>
  );
};
