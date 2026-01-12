import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Layout } from '../../../../../theme';
import FastImage from '@d11/react-native-fast-image';

const { width } = Dimensions.get('window');

export const BackdropContainer = styled.View`
  width: ${width}px;
  height: ${width * 0.66}px;
  position: relative;
`;

export const BackdropOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: ${Layout.widthPercentageToDP(12)}px;
  left: ${Layout.widthPercentageToDP(4)}px;
  width: ${Layout.widthPercentageToDP(10)}px;
  height: ${Layout.widthPercentageToDP(10)}px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const FavouriteButton = styled.TouchableOpacity`
  position: absolute;
  top: ${Layout.widthPercentageToDP(12)}px;
  right: ${Layout.widthPercentageToDP(4)}px;
  width: ${Layout.widthPercentageToDP(10)}px;
  height: ${Layout.widthPercentageToDP(10)}px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const PlayButtonContainer = styled.View`
  position: absolute;
  bottom: ${Layout.widthPercentageToDP(5)}px;
  left: 0;
  right: 0;
  align-items: center;
`;

export const PlayButton = styled.TouchableOpacity`
  width: ${Layout.widthPercentageToDP(15)}px;
  height: ${Layout.widthPercentageToDP(15)}px;
  border-radius: ${Layout.widthPercentageToDP(7.5)}px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const PlayButtonText = styled.Text`
  color: white;
  font-size: ${Layout.RFValue(24)}px;
  margin-left: 4px;
`;

export const PlayButtonLabel = styled.Text`
  color: white;
  font-size: ${Layout.RFValue(14)}px;
  font-weight: 600;
`;

export const BgImage = styled(FastImage)`
  width: 100%;
  height: 100%;
`;
