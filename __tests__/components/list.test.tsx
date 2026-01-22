/**
 * List Component Test Suite
 *
 * Tests the List component (FlatList wrapper) functionality
 */

import React from 'react';
import { render } from '../utils/test-utils';
import { List } from '../../src/views/components/list';
import { createMockMovies } from '../utils/mock-factories';
import { Text, View, FlatList } from 'react-native';

import type { Movie } from '../../src/types/movie.types';

describe('List Component', () => {
  const mockData = createMockMovies(5);
  const mockRenderItem = jest.fn((item: Movie) => (
    <View testID={`item-${item.id}`}>
      <Text>{item.title}</Text>
    </View>
  ));
  const mockKeyExtractor = (item: Movie) => item.id.toString();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render list with data', () => {
      const { root } = render(
        <List
          data={mockData}
          renderItem={mockRenderItem}
          keyExtractor={mockKeyExtractor}
        />,
      );

      expect(mockRenderItem).toHaveBeenCalled();
      const flatLists = root.findAllByType(FlatList);
      expect(flatLists.length).toBeGreaterThan(0);
    });

    it('should render empty component when data is empty', () => {
      const EmptyComponent = () => <Text>Empty List</Text>;
      const { getByText } = render(
        <List
          data={[]}
          renderItem={mockRenderItem}
          keyExtractor={mockKeyExtractor}
          ListEmptyComponent={EmptyComponent}
        />,
      );

      expect(getByText('Empty List')).toBeTruthy();
    });

    it('should render header component', () => {
      const HeaderComponent = () => <Text>List Header</Text>;
      const { getByText } = render(
        <List
          data={mockData}
          renderItem={mockRenderItem}
          keyExtractor={mockKeyExtractor}
          ListHeaderComponent={HeaderComponent}
        />,
      );

      expect(getByText('List Header')).toBeTruthy();
    });

    it('should render footer component', () => {
      const FooterComponent = () => <Text>List Footer</Text>;
      const { getByText } = render(
        <List
          data={mockData}
          renderItem={mockRenderItem}
          keyExtractor={mockKeyExtractor}
          ListFooterComponent={FooterComponent}
        />,
      );

      expect(getByText('List Footer')).toBeTruthy();
    });
  });

  describe('List Configuration', () => {
    it('should apply horizontal prop correctly', () => {
      const { root } = render(
        <List
          data={mockData}
          renderItem={mockRenderItem}
          keyExtractor={mockKeyExtractor}
          horizontal={true}
        />,
      );

      const flatList = root.findAllByType(FlatList)[0];
      expect(flatList.props.horizontal).toBe(true);
    });

    it('should apply numColumns for grid layout', () => {
      const { root } = render(
        <List
          data={mockData}
          renderItem={mockRenderItem}
          keyExtractor={mockKeyExtractor}
          numColumns={2}
        />,
      );

      const flatList = root.findAllByType(FlatList)[0];
      expect(flatList.props.numColumns).toBe(2);
    });

    it('should hide scroll indicators by default', () => {
      const { root } = render(
        <List
          data={mockData}
          renderItem={mockRenderItem}
          keyExtractor={mockKeyExtractor}
        />,
      );

      const flatList = root.findAllByType(FlatList)[0];
      expect(flatList.props.showsHorizontalScrollIndicator).toBe(false);
      expect(flatList.props.showsVerticalScrollIndicator).toBe(false);
    });
  });

  describe('Performance Optimizations', () => {
    it('should apply performance props correctly', () => {
      const { root } = render(
        <List
          data={mockData}
          renderItem={mockRenderItem}
          keyExtractor={mockKeyExtractor}
          initialNumToRender={5}
          maxToRenderPerBatch={3}
          windowSize={7}
          removeClippedSubviews={true}
        />,
      );

      const flatList = root.findAllByType(FlatList)[0];
      expect(flatList.props.initialNumToRender).toBe(5);
      expect(flatList.props.maxToRenderPerBatch).toBe(3);
      expect(flatList.props.windowSize).toBe(7);
      expect(flatList.props.removeClippedSubviews).toBe(true);
    });

    it('should use default performance props when not provided', () => {
      const { root } = render(
        <List
          data={mockData}
          renderItem={mockRenderItem}
          keyExtractor={mockKeyExtractor}
        />,
      );

      const flatList = root.findAllByType(FlatList)[0];
      expect(flatList.props.initialNumToRender).toBe(10);
      expect(flatList.props.maxToRenderPerBatch).toBe(10);
      expect(flatList.props.windowSize).toBe(5);
      expect(flatList.props.removeClippedSubviews).toBe(false);
    });
  });

  describe('Pagination', () => {
    it('should call onEndReached when provided', () => {
      const onEndReached = jest.fn();
      const { root } = render(
        <List
          data={mockData}
          renderItem={mockRenderItem}
          keyExtractor={mockKeyExtractor}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
        />,
      );

      const flatList = root.findAllByType(FlatList)[0];
      expect(flatList.props.onEndReached).toBe(onEndReached);
      expect(flatList.props.onEndReachedThreshold).toBe(0.5);
    });
  });

  describe('Pull to Refresh', () => {
    it('should handle refresh when onRefresh is provided', () => {
      const onRefresh = jest.fn();
      const { root } = render(
        <List
          data={mockData}
          renderItem={mockRenderItem}
          keyExtractor={mockKeyExtractor}
          onRefresh={onRefresh}
          refreshing={false}
        />,
      );

      const flatList = root.findAllByType(FlatList)[0];
      expect(flatList.props.onRefresh).toBe(onRefresh);
      expect(flatList.props.refreshing).toBe(false);
    });

    it('should show refreshing state', () => {
      const { root } = render(
        <List
          data={mockData}
          renderItem={mockRenderItem}
          keyExtractor={mockKeyExtractor}
          onRefresh={jest.fn()}
          refreshing={true}
        />,
      );

      const flatList = root.findAllByType(FlatList)[0];
      expect(flatList.props.refreshing).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty data array', () => {
      const { root } = render(
        <List
          data={[]}
          renderItem={mockRenderItem}
          keyExtractor={mockKeyExtractor}
        />,
      );

      expect(mockRenderItem).not.toHaveBeenCalled();
      const flatList = root.findAllByType(FlatList)[0];
      expect(flatList.props.data).toEqual([]);
    });

    it('should render single item correctly', () => {
      const singleItem = [mockData[0]];
      const { root } = render(
        <List
          data={singleItem}
          renderItem={mockRenderItem}
          keyExtractor={mockKeyExtractor}
        />,
      );

      expect(mockRenderItem).toHaveBeenCalled();
      const flatList = root.findAllByType(FlatList)[0];
      expect(flatList.props.data.length).toBe(1);
    });
  });
});
