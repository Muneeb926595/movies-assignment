import React from 'react';
import { BaseCardProps } from './types';
import {
  CardContainer,
  CardImage,
  ImagePlaceholder,
  TopRightActionContainer,
  BottomContentContainer,
} from './styles';

export const Card: React.FC<BaseCardProps> = ({
  imageUrl,
  imageSource,
  imagePlaceholder,
  topRightAction,
  bottomContent,
  onPress,
  width,
  imageHeight,
  style,
  activeOpacity = 0.8,
}) => {
  const hasImage = imageUrl || imageSource;

  return (
    <CardContainer
      width={width}
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={style}
      disabled={!onPress}
    >
      {hasImage ? (
        <CardImage
          source={imageSource || { uri: imageUrl! }}
          resizeMode="cover"
          imageHeight={imageHeight}
        />
      ) : (
        <ImagePlaceholder imageHeight={imageHeight}>
          {imagePlaceholder}
        </ImagePlaceholder>
      )}

      {topRightAction && (
        <TopRightActionContainer>{topRightAction}</TopRightActionContainer>
      )}

      {bottomContent && (
        <BottomContentContainer>{bottomContent}</BottomContentContainer>
      )}
    </CardContainer>
  );
};
