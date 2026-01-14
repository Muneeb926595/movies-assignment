import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {
  CardContainer,
  ShimmerContainer,
  ShimmerImageSkeleton,
  ShimmerContentSkeleton,
  ShimmerLine,
  BottomContentContainer,
} from './styles';

interface CardSkeletonProps {
  width?: number;
  isHorizontal: boolean;
  imageWidth?: number;
  imageHeight?: number;
  containerStyle?: any;
  style?: any;
  bottomContent?: React.ReactNode;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  width,
  isHorizontal,
  imageWidth,
  imageHeight,
  containerStyle,
  style,
  bottomContent,
}) => {
  const shimmerTranslate = useSharedValue(-1);

  useEffect(() => {
    shimmerTranslate.value = withRepeat(
      withTiming(1, {
        duration: 1500,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: shimmerTranslate.value * 300,
        },
      ],
    };
  });

  return (
    <CardContainer
      width={width}
      isHorizontal={isHorizontal}
      style={containerStyle}
      disabled
      activeOpacity={1}
    >
      <ShimmerImageSkeleton imageWidth={imageWidth} imageHeight={imageHeight}>
        <ShimmerContainer>
          <Animated.View
            style={[
              {
                width: '30%',
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              shimmerStyle,
            ]}
          />
        </ShimmerContainer>
      </ShimmerImageSkeleton>

      {isHorizontal ? (
        <ShimmerContentSkeleton>
          <ShimmerLine width="80%" height={16} marginBottom={12} />
          <ShimmerLine width="40%" height={12} marginBottom={8} />
          <ShimmerLine width="60%" height={10} marginBottom={8} />
          <ShimmerLine width="30%" height={10} />
        </ShimmerContentSkeleton>
      ) : (
        bottomContent && (
          <BottomContentContainer style={style}>
            <ShimmerLine width="90%" height={14} marginBottom={8} />
            <ShimmerLine width="50%" height={10} />
          </BottomContentContainer>
        )
      )}
    </CardContainer>
  );
};
