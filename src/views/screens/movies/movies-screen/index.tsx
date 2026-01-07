import React from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  useNowPlayingMovies,
  usePopularMovies,
} from '../../../../react-query/movies';
import { AppIcon } from '../../../components';
import { AppIconName, AppIconSize } from '../../../components/icon/types';
import {
  Container,
  Header,
  HeaderTitle,
  Loader,
  MenuButton,
  NotificationButton,
  NotificationDot,
  Section,
  SectionHeader,
  SectionTitle,
  SeeMoreButton,
  SeeMoreText,
} from './styles';
import { PopularMovieCard } from '../components/popluar-movie-card';
import { NowShowingMovieCard } from '../components';
import { Layout } from '../../../../globals';

export const MoviesScreen = () => {
  const theme = useTheme();

  const { data: nowPlaying, isLoading: loadingNowPlaying } =
    useNowPlayingMovies(1);
  const { data: popular, isLoading: loadingPopular } = usePopularMovies(1);

  const RenderNowShowingSection = (
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
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          windowSize={2}
          data={nowPlaying?.results.slice(0, 10) || []}
          renderItem={({ item, index }) => (
            <NowShowingMovieCard item={item} index={index} />
          )}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: Layout.RFValue(4) }}
        />
      )}
    </Section>
  );

  const RenderPopularMoviesSection = (
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
        <FlatList
          data={popular?.results}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={4}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => (
            <PopularMovieCard item={item} index={index} />
          )}
        />
      )}
    </Section>
  );

  return (
    <Container>
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

      <FlatList
        data={[]}
        renderItem={() => <></>}
        ListHeaderComponent={RenderNowShowingSection}
        ListFooterComponent={RenderPopularMoviesSection}
      />
    </Container>
  );
};
