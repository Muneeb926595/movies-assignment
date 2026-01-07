export interface MoviesState {
  favourites: number[];
  addToFavourites: (movieId: number) => void;
  removeFromFavourites: (movieId: number) => void;
  isFavourite: (movieId: number) => boolean;
  clearFavourites: () => void;
}
