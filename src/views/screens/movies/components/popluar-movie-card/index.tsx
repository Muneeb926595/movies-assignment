export { PopularMovieCardSkeleton } from './skeleton';
import { useTheme } from 'styled-components/native';
import { getImageUrl } from '../../../../../api';
import { Movie } from '../../../../../types';
import { AppIcon, Card } from '../../../../components';
import { AppIconName } from '../../../../components/icon/types';
import { Rating } from '../../movie-detail-screen/styles';
import { getGenreName } from '../../movies-screen/utils';
import {
  Duration,
  DurationRow,
  GenresRow,
  GenreTag,
  GenreText,
  PopularInfo,
  PopularTitle,
  AnimatedCardWrapper,
  popularCardContainerStyle,
} from './styles';
import { navigationRef } from '../../../../../navigation';
import { RatingRow, StarIcon } from '../now-showing-movie-card/styles';
import { FadeInDown } from 'react-native-reanimated';
import { Layout } from '../../../../../theme';

export const PopularMovieCard = ({
  item,
  index,
}: {
  item: Movie;
  index: number;
}) => {
  const theme = useTheme();
  const genres = item.genre_ids?.slice(0, 3) || [];

  const handleMoviePress = (movieId: number) => {
    navigationRef.navigate('MovieDetailScreen', { movieId });
  };

  const rightContent = (
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
  );

  return (
    <AnimatedCardWrapper
      entering={FadeInDown.delay(index * (50 - index)).springify()}
    >
      <Card
        imageUrl={getImageUrl(item.poster_path, 'w185')}
        imageWidth={Layout.widthPercentageToDP(25)}
        imageHeight={Layout.widthPercentageToDP(37.5)}
        rightContent={rightContent}
        onPress={() => handleMoviePress(item.id)}
        activeOpacity={0.8}
        containerStyle={[
          popularCardContainerStyle,
          { backgroundColor: theme.colors.surface[50] },
        ]}
      />
    </AnimatedCardWrapper>
  );
};
