import React from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  useNowPlayingMovies,
  usePopularMovies,
} from '../../../../react-query/movies';
import { TabScreenProps } from '../../../../navigation/types';
import { getImageUrl } from '../../../../api/endpoints/movies';
import { AppIcon } from '../../../components';
import { AppIconName, AppIconSize } from '../../../components/icon/types';
import { Movie } from '../../../../types/movie.types';
import {
  Container,
  Duration,
  DurationRow,
  GenresRow,
  GenreTag,
  GenreText,
  Header,
  HeaderTitle,
  Loader,
  MenuButton,
  NotificationButton,
  NotificationDot,
  NowShowingCard,
  NowShowingPoster,
  NowShowingTitle,
  PopularCard,
  PopularInfo,
  PopularList,
  PopularPoster,
  PopularTitle,
  Rating,
  RatingRow,
  Section,
  SectionHeader,
  SectionTitle,
  SeeMoreButton,
  SeeMoreText,
  StarIcon,
} from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { getGenreName } from './utils';

export const MoviesScreen = (props: TabScreenProps<'Movies'>) => {
  const theme = useTheme();

  const { data: nowPlaying, isLoading: loadingNowPlaying } =
    useNowPlayingMovies(1);
  const { data: popular, isLoading: loadingPopular } = usePopularMovies(1);

  const handleMoviePress = (movieId: number) => {
    props.navigation.navigate('MovieDetailScreen', { movieId });
  };

  const renderNowShowingItem = ({ item }: { item: Movie }) => (
    <NowShowingCard
      onPress={() => handleMoviePress(item.id)}
      activeOpacity={0.8}
    >
      <NowShowingPoster
        source={{ uri: getImageUrl(item.poster_path, 'w500') || '' }}
        resizeMode="cover"
      />
      <NowShowingTitle numberOfLines={2}>{item.title}</NowShowingTitle>
      <RatingRow>
        <StarIcon>⭐</StarIcon>
        <Rating>{item.vote_average.toFixed(1)}/10 IMDb</Rating>
      </RatingRow>
    </NowShowingCard>
  );

  const renderPopularItem = ({ item }: { item: Movie }) => {
    const genres = item.genre_ids?.slice(0, 3) || [];

    return (
      <PopularCard
        onPress={() => handleMoviePress(item.id)}
        activeOpacity={0.8}
      >
        <PopularPoster
          source={{ uri: getImageUrl(item.poster_path, 'w185') || '' }}
          resizeMode="cover"
        />
        <PopularInfo>
          <PopularTitle numberOfLines={2}>{item.title}</PopularTitle>
          <RatingRow>
            <StarIcon>⭐</StarIcon>
            <Rating>{item.vote_average.toFixed(1)}/10 IMDb</Rating>
          </RatingRow>
          {genres.length > 0 && (
            <GenresRow>
              {genres.map(genreId => (
                <GenreTag key={genreId}>
                  <GenreText>{getGenreName(genreId)}</GenreText>
                </GenreTag>
              ))}
            </GenresRow>
          )}
          <DurationRow>
            <AppIcon
              name={AppIconName.clock}
              iconSize={16}
              color={theme.colors.muted}
            />
            <Duration>1h 47m</Duration>
          </DurationRow>
        </PopularInfo>
      </PopularCard>
    );
  };

  return (
    <Container>
      {/* Header */}
      <Header>
        <MenuButton>
          <AppIcon
            name={AppIconName.homeTab}
            iconSize={AppIconSize.medium}
            color={theme.colors.text}
          />
        </MenuButton>
        <HeaderTitle>FilmKu</HeaderTitle>
        <NotificationButton>
          <AppIcon
            name={AppIconName.announcement}
            iconSize={AppIconSize.medium}
            color={theme.colors.text}
          />
          <NotificationDot />
        </NotificationButton>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Now Showing Section */}
        <Section>
          <SectionHeader>
            <SectionTitle>Now Showing</SectionTitle>
            <SeeMoreButton>
              <SeeMoreText>See more</SeeMoreText>
            </SeeMoreButton>
          </SectionHeader>

          {loadingNowPlaying ? (
            <Loader size="large" color={theme.colors.primary} />
          ) : (
            <FlatList
              horizontal
              data={nowPlaying?.results.slice(0, 10) || []}
              renderItem={renderNowShowingItem}
              keyExtractor={item => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 16 }}
            />
          )}
        </Section>

        {/* Popular Section */}
        <Section>
          <SectionHeader>
            <SectionTitle>Popular</SectionTitle>
            <SeeMoreButton>
              <SeeMoreText>See more</SeeMoreText>
            </SeeMoreButton>
          </SectionHeader>

          {loadingPopular ? (
            <Loader size="large" color={theme.colors.primary} />
          ) : (
            <PopularList>
              {popular?.results.slice(0, 5).map(movie => (
                <React.Fragment key={movie.id}>
                  {renderPopularItem({ item: movie })}
                </React.Fragment>
              ))}
            </PopularList>
          )}
        </Section>
      </ScrollView>
    </Container>
  );
};
