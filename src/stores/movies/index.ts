import { create } from 'zustand';
import { Movie } from '../../types/movie.types';

interface MoviesState {
  favourites: Set<number>;
  addToFavourites: (movieId: number) => void;
  removeFromFavourites: (movieId: number) => void;
  isFavourite: (movieId: number) => boolean;
  clearFavourites: () => void;
}

export const useMoviesStore = create<MoviesState>((set, get) => ({
  favourites: new Set(),

  addToFavourites: (movieId: number) =>
    set(state => ({
      favourites: new Set(state.favourites).add(movieId),
    })),

  removeFromFavourites: (movieId: number) =>
    set(state => {
      const newFavourites = new Set(state.favourites);
      newFavourites.delete(movieId);
      return { favourites: newFavourites };
    }),

  isFavourite: (movieId: number) => get().favourites.has(movieId),

  clearFavourites: () => set({ favourites: new Set() }),
}));
