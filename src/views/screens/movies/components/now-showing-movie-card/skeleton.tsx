import React from 'react';
import {
  POSTER_HEIGHT,
  POSTER_WIDTH,
  nowShowingCardContainerStyle,
  nowShowingBottomContentStyle,
} from './styles';
import { CardSkeleton } from '../../../../components/card/skeleton';

export const NowShowingMovieCardSkeleton: React.FC = () => (
  <CardSkeleton
    isHorizontal={false}
    imageHeight={POSTER_HEIGHT}
    width={POSTER_WIDTH}
    containerStyle={nowShowingCardContainerStyle}
    style={nowShowingBottomContentStyle}
  />
);
