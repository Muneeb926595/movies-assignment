import { FlatListProps, StyleProp, ViewStyle } from 'react-native';

export interface ListProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  data: T[] | null | undefined;
  renderItem: (item: T, index: number) => React.ReactElement | null;
  keyExtractor?: (item: T, index: number) => string;
  horizontal?: boolean;
  numColumns?: number;
  columnWrapperStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  onEndReached?: ((info: { distanceFromEnd: number }) => void) | null;
  onEndReachedThreshold?: number | null;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  initialNumToRender?: number;
  maxToRenderPerBatch?: number;
  windowSize?: number;
  removeClippedSubviews?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}
