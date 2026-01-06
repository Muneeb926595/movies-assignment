import React from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  useNowPlayingMovies,
  usePopularMovies,
} from '../../../../react-query/movies';
import { TabScreenProps } from '../../../../navigation/types';
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
import { ScrollView } from 'react-native-gesture-handler';
import { PopularMovieCard } from '../components/popluar-movie-card';
import { wp } from '../../../../theme';
import { NowShowingMovieCard } from '../components';

export const MoviesScreen = (props: TabScreenProps<'Movies'>) => {
  const theme = useTheme();

  const { data: nowPlaying, isLoading: loadingNowPlaying } =
    useNowPlayingMovies(1);
  const { data: popular, isLoading: loadingPopular } = usePopularMovies(1);

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

      <ScrollView showsVerticalScrollIndicator={false}>
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
              renderItem={({ item }) => <NowShowingMovieCard item={item} />}
              keyExtractor={item => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: wp(4) }}
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
            <FlatList
              data={popular?.results}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <PopularMovieCard item={item} />}
              style={{
                paddingHorizontal: wp(4),
              }}
            />
          )}
        </Section>
      </ScrollView>
    </Container>
  );
};
