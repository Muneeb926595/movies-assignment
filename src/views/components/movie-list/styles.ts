import { StyleSheet } from 'react-native';

export const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      marginBottom: 24,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
    },
    seeMore: {
      fontSize: 14,
    },
    listContent: {
      paddingHorizontal: 16,
    },
    loadingContainer: {
      height: 250,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
