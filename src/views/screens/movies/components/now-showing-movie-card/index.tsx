import { getImageUrl } from '../../../../../api';
import { navigationRef } from '../../../../../navigation';
import { Movie } from '../../../../../types';
import {
  NowShowingCard,
  NowShowingPoster,
  NowShowingTitle,
  Rating,
  RatingRow,
  StarIcon,
} from './styles';
import { FadeInDown } from 'react-native-reanimated';

export const NowShowingMovieCard = ({
  item,
  index,
}: {
  item: Movie;
  index: number;
}) => {
  const handleMoviePress = (movieId: number) => {
    navigationRef.navigate('MovieDetailScreen', { movieId });
  };

  return (
    <NowShowingCard
      onPress={() => handleMoviePress(item.id)}
      activeOpacity={0.8}
      entering={FadeInDown.delay(index * 50).springify()}
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
};
