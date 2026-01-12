import React from 'react';
import { useTheme } from 'styled-components/native';
import { AppIcon } from '../../../../components';
import { AppIconName, AppIconSize } from '../../../../components/icon/types';
import {
  BackButton,
  BackdropContainer,
  BackdropOverlay,
  BgImage,
  FavouriteButton,
  PlayButton,
  PlayButtonContainer,
  PlayButtonLabel,
  PlayButtonText,
} from './styles';

interface MovieHeaderProps {
  backdropUrl: string;
  isFavourite: boolean;
  hasTrailer: boolean;
  onBack: () => void;
  onToggleFavourite: () => void;
  onPlayTrailer: () => void;
}

export const MovieHeader = ({
  backdropUrl,
  isFavourite,
  hasTrailer,
  onBack,
  onToggleFavourite,
  onPlayTrailer,
}: MovieHeaderProps) => {
  const theme = useTheme();

  return (
    <BackdropContainer>
      <BgImage source={{ uri: backdropUrl }} resizeMode="cover" />
      <BackdropOverlay />

      <BackButton onPress={onBack}>
        <AppIcon
          name={AppIconName.leftArrow}
          iconSize={AppIconSize.medium}
          color={theme.colors.white}
        />
      </BackButton>

      <FavouriteButton onPress={onToggleFavourite}>
        <AppIcon
          name={isFavourite ? AppIconName.heartbeat : AppIconName.plus}
          iconSize={AppIconSize.medium}
          color={isFavourite ? theme.colors.primary : theme.colors.white}
        />
      </FavouriteButton>

      {hasTrailer && (
        <PlayButtonContainer>
          <PlayButton onPress={onPlayTrailer}>
            <PlayButtonText>▶</PlayButtonText>
          </PlayButton>
          <PlayButtonLabel>Play Trailer</PlayButtonLabel>
        </PlayButtonContainer>
      )}
    </BackdropContainer>
  );
};
