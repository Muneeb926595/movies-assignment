import { Movie } from '../../../types/movie.types';

export interface MovieListProps {
  title: string;
  movies: Movie[];
  onMoviePress: (movieId: number) => void;
  isLoading?: boolean;
  showFavouriteToggle?: boolean;
}
