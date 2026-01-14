export { NowShowingMovieCardSkeleton } from './skeleton';
import { getImageUrl } from '../../../../../api';
import { navigationRef } from '../../../../../navigation';
import { Movie } from '../../../../../types';
import { Card } from '../../../../components';
import {
  NowShowingTitle,
  Rating,
  RatingRow,
  StarIcon,
  AnimatedCardWrapper,
  nowShowingCardContainerStyle,
  nowShowingBottomContentStyle,
  POSTER_WIDTH,
  POSTER_HEIGHT,
} from './styles';
import { FadeInDown } from 'react-native-reanimated';
import React from 'react';

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

  const bottomContent = (
    <>
      <NowShowingTitle numberOfLines={2}>{item.title}</NowShowingTitle>
      <RatingRow>
        <StarIcon>⭐</StarIcon>
        <Rating>{item.vote_average.toFixed(1)}/10 IMDb</Rating>
      </RatingRow>
    </>
  );

  return (
    <AnimatedCardWrapper entering={FadeInDown.delay(index * 50).springify()}>
      <Card
        imageUrl={getImageUrl(item.poster_path, 'w500')}
        imageHeight={POSTER_HEIGHT}
        width={POSTER_WIDTH}
        bottomContent={bottomContent}
        onPress={() => handleMoviePress(item.id)}
        activeOpacity={0.8}
        containerStyle={nowShowingCardContainerStyle}
        style={nowShowingBottomContentStyle}
      />
    </AnimatedCardWrapper>
  );
};
