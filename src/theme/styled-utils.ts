/**
 * Responsive utility functions for styled-components
 */

import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * Width Percentage to DP
 * Converts percentage to device-independent pixels for width
 */
export const wp = (percentage: number): number => {
  return PixelRatio.roundToNearestPixel((width * percentage) / 100);
};

/**
 * Height Percentage to DP
 * Converts percentage to device-independent pixels for height
 */
export const hp = (percentage: number): number => {
  return PixelRatio.roundToNearestPixel((height * percentage) / 100);
};

/**
 * Responsive Font Value
 * Scales font size based on screen height
 */
export const rf = (
  fontSize: number,
  standardScreenHeight: number = 812,
): number => {
  const heightPercent = (fontSize * height) / standardScreenHeight;
  return Math.round(heightPercent);
};
