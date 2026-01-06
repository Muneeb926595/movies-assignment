import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Cast, MovieDetails, MoviesResponse, Video } from '../../types';
import { MOVIES_QUERY_KEYS } from './keys';
import { moviesEndpoints } from '../../api';

export const usePopularMovies = (page = 1): UseQueryResult<MoviesResponse> => {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.popular(page),
    queryFn: () => moviesEndpoints.getPopularMovies(page),
    staleTime: 1000 * 60 * 15, // 15 minutes - popular movies don't change often
    gcTime: 1000 * 60 * 60, // 1 hour cache
  });
};

export const useNowPlayingMovies = (
  page = 1,
): UseQueryResult<MoviesResponse> => {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.nowPlaying(page),
    queryFn: () => moviesEndpoints.getNowPlayingMovies(page),
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour cache
  });
};

export const useUpcomingMovies = (page = 1): UseQueryResult<MoviesResponse> => {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.upcoming(page),
    queryFn: () => moviesEndpoints.getUpcomingMovies(page),
    staleTime: 1000 * 60 * 30, // 30 minutes - upcoming movies change rarely
    gcTime: 1000 * 60 * 60 * 2, // 2 hours cache
  });
};

export const useTopRatedMovies = (page = 1): UseQueryResult<MoviesResponse> => {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.topRated(page),
    queryFn: () => moviesEndpoints.getTopRatedMovies(page),
    staleTime: 1000 * 60 * 30, // 30 minutes - top rated is very stable
    gcTime: 1000 * 60 * 60 * 2, // 2 hours cache
  });
};

export const useSearchMovies = (
  query: string,
  page = 1,
  enabled = true,
): UseQueryResult<MoviesResponse> => {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.search(query, page),
    queryFn: () => moviesEndpoints.searchMovies(query, page),
    enabled: enabled && query.length > 0,
    staleTime: 1000 * 60 * 15, // 15 minutes - search results cached per query
    gcTime: 1000 * 60 * 60, // 1 hour cache
  });
};

export const useMovieDetails = (
  movieId: number,
  enabled = true,
): UseQueryResult<MovieDetails> => {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.details(movieId),
    queryFn: () => moviesEndpoints.getMovieDetails(movieId),
    enabled: enabled && movieId > 0,
    staleTime: 1000 * 60 * 30, // 30 minutes - movie details rarely change
    gcTime: 1000 * 60 * 60 * 2, // 2 hours cache
  });
};

export const useMovieCast = (
  movieId: number,
  enabled = true,
): UseQueryResult<Cast[]> => {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.cast(movieId),
    queryFn: () => moviesEndpoints.getMovieCast(movieId),
    enabled: enabled && movieId > 0,
    staleTime: 1000 * 60 * 30, // 30 minutes - cast info is static
    gcTime: 1000 * 60 * 60 * 2, // 2 hours cache
  });
};

export const useMovieVideos = (
  movieId: number,
  enabled = true,
): UseQueryResult<Video[]> => {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.videos(movieId),
    queryFn: () => moviesEndpoints.getMovieVideos(movieId),
    enabled: enabled && movieId > 0,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60 * 2, // 2 hours cache
  });
};

export const useSimilarMovies = (
  movieId: number,
  page = 1,
  enabled = true,
): UseQueryResult<MoviesResponse> => {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.similar(movieId, page),
    queryFn: () => moviesEndpoints.getSimilarMovies(movieId, page),
    enabled: enabled && movieId > 0,
    staleTime: 1000 * 60 * 20, // 20 minutes - similar movies are fairly stable
    gcTime: 1000 * 60 * 60, // 1 hour cache
  });
};
