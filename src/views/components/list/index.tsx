import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { ListProps } from './types';

export const List = <T,>({
  data,
  renderItem,
  keyExtractor,
  horizontal = false,
  numColumns = 1,
  columnWrapperStyle,
  contentContainerStyle,
  showsHorizontalScrollIndicator = false,
  showsVerticalScrollIndicator = false,
  onEndReached,
  onEndReachedThreshold,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  initialNumToRender = 10,
  maxToRenderPerBatch = 10,
  windowSize = 5,
  removeClippedSubviews = false,
  refreshing,
  onRefresh,
  ...rest
}: ListProps<T>) => {
  const handleRenderItem = ({ item, index }: ListRenderItemInfo<T>) => {
    return renderItem(item, index);
  };

  return (
    <FlatList
      data={data}
      renderItem={handleRenderItem}
      keyExtractor={keyExtractor}
      horizontal={horizontal}
      numColumns={horizontal ? undefined : numColumns}
      columnWrapperStyle={numColumns > 1 && !horizontal ? columnWrapperStyle : undefined}
      contentContainerStyle={contentContainerStyle}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent}
      initialNumToRender={initialNumToRender}
      maxToRenderPerBatch={maxToRenderPerBatch}
      windowSize={windowSize}
      removeClippedSubviews={removeClippedSubviews}
      refreshing={refreshing}
      onRefresh={onRefresh}
      {...rest}
    />
  );
};
