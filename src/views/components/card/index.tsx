import React from 'react';
import { BaseCardProps } from './types';
import {
  CardContainer,
  CardImage,
  ImageContainer,
  ImagePlaceholder,
  TopRightActionContainer,
  BottomContentContainer,
  RightContentContainer,
} from './styles';
import { CardSkeleton } from './skeleton';

export const Card: React.FC<BaseCardProps> = ({
  imageUrl,
  imageSource,
  imagePlaceholder,
  topRightAction,
  bottomContent,
  rightContent,
  onPress,
  width,
  imageHeight,
  imageWidth,
  style,
  containerStyle,
  activeOpacity = 0.8,
  isLoading = false,
}) => {
  const hasImage = imageUrl || imageSource;
  const isHorizontal = !!rightContent;

  if (isLoading) {
    return (
      <CardSkeleton
        width={width}
        isHorizontal={isHorizontal}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        containerStyle={containerStyle}
        style={style}
        bottomContent={bottomContent}
      />
    );
  }

  return (
    <CardContainer
      width={width}
      isHorizontal={isHorizontal}
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={containerStyle}
      disabled={!onPress}
    >
      <ImageContainer imageWidth={imageWidth} imageHeight={imageHeight}>
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
      </ImageContainer>

      {rightContent && (
        <RightContentContainer>{rightContent}</RightContentContainer>
      )}

      {bottomContent && (
        <BottomContentContainer style={style}>
          {bottomContent}
        </BottomContentContainer>
      )}
    </CardContainer>
  );
};
