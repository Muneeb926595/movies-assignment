import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { useTheme } from '../../../theme';
import { MovieCardProps } from './types';
import { createStyles } from './styles';
import { formatRating, formatYear, getMoviePosterUrl } from './utils';
import { AppIcon } from '../icon';
import { AppIconName, AppIconSize } from '../icon/types';

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPress,
  isFavourite = false,
  onToggleFavourite,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const posterUrl = getMoviePosterUrl(movie.poster_path);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(movie.id)}
      activeOpacity={0.8}
    >
      {posterUrl ? (
        <FastImage
          source={{ uri: posterUrl }}
          style={styles.poster}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.poster}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}

      {onToggleFavourite && (
        <TouchableOpacity
          style={styles.favouriteButton}
          onPress={() => onToggleFavourite(movie.id)}
        >
          <AppIcon
            name={isFavourite ? AppIconName.heartbeat : AppIconName.plus}
            iconSize={AppIconSize.small}
            color={isFavourite ? theme.colors.brand.DEFAULT : theme.colors.white}
          />
        </TouchableOpacity>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <View style={styles.ratingContainer}>
          <AppIcon
            name={AppIconName.tag}
            iconSize={AppIconSize.small}
            color={theme.colors.brand.DEFAULT}
          />
          <Text style={styles.rating}>
            {formatRating(movie.vote_average)} • {formatYear(movie.release_date)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
