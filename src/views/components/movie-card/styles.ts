import { StyleSheet } from 'react-native';

export const createStyles = (theme: any) =>
  StyleSheet.create({
    card: {
      width: 150,
      marginRight: 12,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: theme.colors.surface.DEFAULT,
    },
    poster: {
      width: '100%',
      height: 225,
      backgroundColor: theme.colors.surface['100'],
    },
    infoContainer: {
      padding: 8,
    },
    title: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 4,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rating: {
      fontSize: 12,
      color: theme.colors.muted,
      marginLeft: 4,
    },
    favouriteButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 20,
      padding: 6,
    },
    placeholderText: {
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      textAlign: 'center',
      color: theme.colors.muted,
    },
  });
