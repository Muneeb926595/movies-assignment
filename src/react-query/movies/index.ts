import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { moviesEndpoints } from '../../api/endpoints/movies';
import { Movie, MovieDetails, MoviesResponse, Cast, Video } from '../../types/movie.types';

export const MOVIES_QUERY_KEYS = {
  all: ['movies'] as const,
  popular: (page: number) => [...MOVIES_QUERY_KEYS.all, 'popular', page] as const,
  nowPlaying: (page: number) => [...MOVIES_QUERY_KEYS.all, 'nowPlaying', page] as const,
  upcoming: (page: number) => [...MOVIES_QUERY_KEYS.all, 'upcoming', page] as const,
  topRated: (page: number) => [...MOVIES_QUERY_KEYS.all, 'topRated', page] as const,
  search: (query: string, page: number) => [...MOVIES_QUERY_KEYS.all, 'search', query, page] as const,
  details: (movieId: number) => [...MOVIES_QUERY_KEYS.all, 'details', movieId] as const,
  cast: (movieId: number) => [...MOVIES_QUERY_KEYS.all, 'cast', movieId] as const,
  videos: (movieId: number) => [...MOVIES_QUERY_KEYS.all, 'videos', movieId] as const,
  similar: (movieId: number, page: number) => [...MOVIES_QUERY_KEYS.all, 'similar', movieId, page] as const,
};

export const usePopularMovies = (page = 1): UseQueryResult<MoviesResponse> => {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.popular(page),
    queryFn: () => moviesEndpoints.getPopularMovies(page),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useNowPlayingMovies = (page = 1): UseQueryResult<MoviesResponse> => {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.nowPlaying(page),
    queryFn: () => moviesEndpoints.getNowPlayingMovies(page),
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpcomingMovies = (page = 1): UseQueryResult<MoviesResponse> => {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.upcoming(page),
    queryFn: () => moviesEndpoints.getUpcomingMovies(page),
    staleTime: 1000 * 60 * 5,
  });
};

export const useTopRatedMovies = (page = 1): UseQueryResult<MoviesResponse> => {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.topRated(page),
    queryFn: () => moviesEndpoints.getTopRatedMovies(page),
    staleTime: 1000 * 60 * 5,
  });
};

export const useSearchMovies = (query: string, page = 1, enabled = true): UseQueryResult<MoviesResponse> => {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.search(query, page),
    queryFn: () => moviesEndpoints.searchMovies(query, page),
    enabled: enabled && query.length > 0,
    staleTime: 1000 * 60 * 5,
  });
};

export const useMovieDetails = (movieId: number, enabled = true): UseQueryResult<MovieDetails> => {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.details(movieId),
    queryFn: () => moviesEndpoints.getMovieDetails(movieId),
    enabled: enabled && movieId > 0,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useMovieCast = (movieId: number, enabled = true): UseQueryResult<Cast[]> => {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.cast(movieId),
    queryFn: () => moviesEndpoints.getMovieCast(movieId),
    enabled: enabled && movieId > 0,
    staleTime: 1000 * 60 * 10,
  });
};

export const useMovieVideos = (movieId: number, enabled = true): UseQueryResult<Video[]> => {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.videos(movieId),
    queryFn: () => moviesEndpoints.getMovieVideos(movieId),
    enabled: enabled && movieId > 0,
    staleTime: 1000 * 60 * 10,
  });
};

export const useSimilarMovies = (movieId: number, page = 1, enabled = true): UseQueryResult<MoviesResponse> => {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.similar(movieId, page),
    queryFn: () => moviesEndpoints.getSimilarMovies(movieId, page),
    enabled: enabled && movieId > 0,
    staleTime: 1000 * 60 * 5,
  });
};
