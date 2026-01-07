import { useTheme } from 'styled-components/native';
import { getImageUrl } from '../../../../../api';
import { Movie } from '../../../../../types';
import { AppIcon } from '../../../../components';
import { AppIconName } from '../../../../components/icon/types';
import { Rating } from '../../movie-detail-screen/styles';
import { getGenreName } from '../../movies-screen/utils';
import {
  Duration,
  DurationRow,
  GenresRow,
  GenreTag,
  GenreText,
  PopularCard,
  PopularInfo,
  PopularPoster,
  PopularTitle,
} from './styles';
import { navigationRef } from '../../../../../navigation';
import { RatingRow, StarIcon } from '../now-showing-movie-card/styles';
import { FadeInDown } from 'react-native-reanimated';

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

  return (
    <PopularCard
      onPress={() => handleMoviePress(item.id)}
      activeOpacity={0.8}
      entering={FadeInDown.delay(index * (50 - index)).springify()}
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
