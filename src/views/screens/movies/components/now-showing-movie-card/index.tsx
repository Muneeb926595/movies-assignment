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

export const NowShowingMovieCard = ({ item }: { item: Movie }) => {
  const handleMoviePress = (movieId: number) => {
    navigationRef.navigate('MovieDetailScreen', { movieId });
  };

  return (
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
};
