import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { StorageKeys } from '../../services/storage';
import { MoviesState } from './movies.types';
import { moviesStorage } from './movies.persist';

export const useMoviesStore = create<MoviesState>()(
  persist(
    (set, get) => ({
      favourites: [],

      addToFavourites: movieId =>
        set(state =>
          state.favourites.includes(movieId)
            ? state
            : { favourites: [...state.favourites, movieId] },
        ),

      removeFromFavourites: movieId =>
        set(state => ({
          favourites: state.favourites.filter(id => id !== movieId),
        })),

      isFavourite: movieId => get().favourites.includes(movieId),

      clearFavourites: () => set({ favourites: [] }),
    }),
    {
      name: StorageKeys.FAVOURITE_MOVIES,
      storage: createJSONStorage(() => moviesStorage),
    },
  ),
);
