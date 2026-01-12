import { Movie } from '../../../../types';

export const getFavouriteMovies = (
  movies: Movie[] | undefined,
  isFavouriteCheck: (id: number) => boolean,
): Movie[] => {
  if (!movies) return [];
  return movies.filter(movie => isFavouriteCheck(movie.id));
};
