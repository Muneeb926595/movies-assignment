import React from 'react';
import { CardSkeleton } from '../../../../components/card/skeleton';
import { Layout } from '../../../../../theme';

export const PopularMovieCardSkeleton: React.FC = () => {
  return (
    <CardSkeleton
      isHorizontal={false}
      imageWidth={Layout.widthPercentageToDP(25)}
      imageHeight={Layout.widthPercentageToDP(37.5)}
      containerStyle={{ marginBottom: Layout.widthPercentageToDP(3) }}
    />
  );
};
