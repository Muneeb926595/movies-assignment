export interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
    release_date: string;
  };
  onPress: (movieId: number) => void;
  isFavourite?: boolean;
  onToggleFavourite?: (movieId: number) => void;
}

export interface MovieListProps {
  movies: any[];
  onMoviePress: (movieId: number) => void;
  isLoading?: boolean;
  onEndReached?: () => void;
}

export interface CastCardProps {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  };
}
