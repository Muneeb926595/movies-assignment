/**
 * Movies Store Integration Tests
 *
 * Tests the integration of store state management and operations
 */

import { useMoviesStore } from '../../src/stores/movies/movies.store';

describe('Movies Store Integration', () => {
  beforeEach(() => {
    // Clear store state before each test
    useMoviesStore.setState({ favourites: [] });
  });

  describe('State Updates', () => {
    it('should update state when adding favourites', () => {
      const { addToFavourites } = useMoviesStore.getState();

      // Initial state
      expect(useMoviesStore.getState().favourites).toEqual([]);

      // Add a favourite
      addToFavourites(123);

      // Verify state updated
      expect(useMoviesStore.getState().favourites).toEqual([123]);
    });

    it('should update state when adding multiple favourites', () => {
      const { addToFavourites } = useMoviesStore.getState();

      // Add multiple favourites
      addToFavourites(123);
      addToFavourites(456);
      addToFavourites(789);

      // Verify all in state
      const state = useMoviesStore.getState();
      expect(state.favourites).toEqual(expect.arrayContaining([123, 456, 789]));
      expect(state.favourites).toHaveLength(3);
    });

    it('should update state when removing favourites', () => {
      const { addToFavourites, removeFromFavourites } =
        useMoviesStore.getState();

      // Add favourites
      addToFavourites(123);
      addToFavourites(456);

      expect(useMoviesStore.getState().favourites).toHaveLength(2);

      // Remove one
      removeFromFavourites(123);

      // Verify state updated
      const state = useMoviesStore.getState();
      expect(state.favourites).not.toContain(123);
      expect(state.favourites).toContain(456);
      expect(state.favourites).toHaveLength(1);
    });

    it('should clear all favourites from state', () => {
      const { addToFavourites, clearFavourites } = useMoviesStore.getState();

      // Add favourites
      addToFavourites(123);
      addToFavourites(456);
      addToFavourites(789);

      expect(useMoviesStore.getState().favourites).toHaveLength(3);

      // Clear all
      clearFavourites();

      // Verify state cleared
      expect(useMoviesStore.getState().favourites).toEqual([]);
    });
  });

  describe('Favourite Operations', () => {
    it('should check if movie is favourite correctly', () => {
      const { addToFavourites, isFavourite } = useMoviesStore.getState();

      expect(isFavourite(123)).toBe(false);

      addToFavourites(123);

      expect(isFavourite(123)).toBe(true);
    });

    it('should not add duplicate favourites', async () => {
      const { addToFavourites } = useMoviesStore.getState();

      addToFavourites(123);
      addToFavourites(123);
      addToFavourites(123);

      const state = useMoviesStore.getState();
      expect(state.favourites).toEqual([123]);
    });

    it('should handle removing non-existent favourite gracefully', () => {
      const { addToFavourites, removeFromFavourites } =
        useMoviesStore.getState();

      addToFavourites(123);
      removeFromFavourites(999); // Not in favourites

      const state = useMoviesStore.getState();
      expect(state.favourites).toEqual([123]);
    });
    it('should maintain independent store instances', () => {
      const { addToFavourites } = useMoviesStore.getState();

      // Add favourites
      addToFavourites(1);
      addToFavourites(2);

      // Get state multiple times - should be consistent
      const state1 = useMoviesStore.getState();
      const state2 = useMoviesStore.getState();

      expect(state1.favourites).toEqual(state2.favourites);
      expect(state1.favourites).toHaveLength(2);
    });
  });

  describe('Complete User Flow', () => {
    it('should handle a complete add-check-remove flow', () => {
      const { addToFavourites, isFavourite, removeFromFavourites } =
        useMoviesStore.getState();

      // User adds movie to favourites
      expect(isFavourite(456)).toBe(false);
      addToFavourites(456);
      expect(isFavourite(456)).toBe(true);

      // Verify in state
      expect(useMoviesStore.getState().favourites).toContain(456);

      // User removes movie from favourites
      removeFromFavourites(456);
      expect(isFavourite(456)).toBe(false);

      // Verify removed from state
      expect(useMoviesStore.getState().favourites).not.toContain(456);
    });

    it('should handle bulk operations', () => {
      const { addToFavourites, clearFavourites } = useMoviesStore.getState();

      // Add multiple movies
      const movieIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      movieIds.forEach(id => addToFavourites(id));

      // Verify all in state
      expect(useMoviesStore.getState().favourites).toHaveLength(10);

      // Clear all
      clearFavourites();

      // Verify cleared
      expect(useMoviesStore.getState().favourites).toEqual([]);
    });

    it('should handle mixed operations', () => {
      const {
        addToFavourites,
        removeFromFavourites,
        isFavourite,
        clearFavourites,
      } = useMoviesStore.getState();

      // Add some favourites
      addToFavourites(1);
      addToFavourites(2);
      addToFavourites(3);
      addToFavourites(4);
      addToFavourites(5);

      expect(useMoviesStore.getState().favourites).toHaveLength(5);

      // Remove some
      removeFromFavourites(2);
      removeFromFavourites(4);

      expect(useMoviesStore.getState().favourites).toHaveLength(3);
      expect(isFavourite(1)).toBe(true);
      expect(isFavourite(2)).toBe(false);
      expect(isFavourite(3)).toBe(true);

      // Add more
      addToFavourites(6);
      addToFavourites(7);

      expect(useMoviesStore.getState().favourites).toHaveLength(5);

      // Clear all
      clearFavourites();

      expect(useMoviesStore.getState().favourites).toEqual([]);
      expect(isFavourite(1)).toBe(false);
      expect(isFavourite(6)).toBe(false);
    });
  });

  describe('State Management', () => {
    it('should maintain state consistency across operations', () => {
      const { addToFavourites, removeFromFavourites, isFavourite } =
        useMoviesStore.getState();

      // Start fresh
      expect(isFavourite(100)).toBe(false);

      // Add
      addToFavourites(100);
      expect(isFavourite(100)).toBe(true);

      // Remove
      removeFromFavourites(100);
      expect(isFavourite(100)).toBe(false);

      // Add again
      addToFavourites(100);
      expect(isFavourite(100)).toBe(true);
    });

    it('should handle concurrent operations', () => {
      const { addToFavourites, removeFromFavourites } =
        useMoviesStore.getState();

      // Add multiple
      addToFavourites(1);
      addToFavourites(2);
      addToFavourites(3);

      // Remove one in the middle
      removeFromFavourites(2);

      const state = useMoviesStore.getState();
      expect(state.favourites).toContain(1);
      expect(state.favourites).not.toContain(2);
      expect(state.favourites).toContain(3);
    });
  });
});
