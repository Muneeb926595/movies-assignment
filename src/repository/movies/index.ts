import { moviesEndpoints, getImageUrl } from '../../api/endpoints/movies';
import { Movie, MovieDetails, MoviesResponse, Cast, Video } from '../../types/movie.types';

export const moviesRepository = {
  getPopularMovies: (page = 1) => moviesEndpoints.getPopularMovies(page),
  getNowPlayingMovies: (page = 1) => moviesEndpoints.getNowPlayingMovies(page),
  getUpcomingMovies: (page = 1) => moviesEndpoints.getUpcomingMovies(page),
  getTopRatedMovies: (page = 1) => moviesEndpoints.getTopRatedMovies(page),
  searchMovies: (query: string, page = 1) => moviesEndpoints.searchMovies(query, page),
  getMovieDetails: (movieId: number) => moviesEndpoints.getMovieDetails(movieId),
  getMovieCast: (movieId: number) => moviesEndpoints.getMovieCast(movieId),
  getMovieVideos: (movieId: number) => moviesEndpoints.getMovieVideos(movieId),
  getSimilarMovies: (movieId: number, page = 1) => moviesEndpoints.getSimilarMovies(movieId, page),
  getImageUrl,
};
