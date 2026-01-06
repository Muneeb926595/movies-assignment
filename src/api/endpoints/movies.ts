import {
  MovieDetails,
  MoviesResponse,
  Cast,
  Video,
} from '../../types/movie.types';
import { TMDB_CONFIG, getApiKey } from '../config/tmdb.config';
import axiosClient from '../axios/axios-client';

export const moviesEndpoints = {
  getPopularMovies: async (page = 1): Promise<MoviesResponse> => {
    const response = await axiosClient.get<MoviesResponse>('/movie/popular', {
      params: {
        api_key: getApiKey(),
        page,
      },
    });
    return response.data;
  },

  getNowPlayingMovies: async (page = 1): Promise<MoviesResponse> => {
    const response = await axiosClient.get<MoviesResponse>(
      '/movie/now_playing',
      {
        params: {
          api_key: getApiKey(),
          page,
        },
      },
    );
    return response.data;
  },

  getUpcomingMovies: async (page = 1): Promise<MoviesResponse> => {
    const response = await axiosClient.get<MoviesResponse>('/movie/upcoming', {
      params: {
        api_key: getApiKey(),
        page,
      },
    });
    return response.data;
  },

  getTopRatedMovies: async (page = 1): Promise<MoviesResponse> => {
    const response = await axiosClient.get<MoviesResponse>('/movie/top_rated', {
      params: {
        api_key: getApiKey(),
        page,
      },
    });
    return response.data;
  },

  searchMovies: async (query: string, page = 1): Promise<MoviesResponse> => {
    const response = await axiosClient.get<MoviesResponse>('/search/movie', {
      params: {
        api_key: getApiKey(),
        query,
        page,
      },
    });
    return response.data;
  },

  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await axiosClient.get<MovieDetails>(`/movie/${movieId}`, {
      params: {
        api_key: getApiKey(),
      },
    });
    return response.data;
  },

  getMovieCast: async (movieId: number): Promise<Cast[]> => {
    const response = await axiosClient.get<{ cast: Cast[] }>(
      `/movie/${movieId}/credits`,
      {
        params: {
          api_key: getApiKey(),
        },
      },
    );
    return response.data.cast;
  },

  getMovieVideos: async (movieId: number): Promise<Video[]> => {
    const response = await axiosClient.get<{ results: Video[] }>(
      `/movie/${movieId}/videos`,
      {
        params: {
          api_key: getApiKey(),
        },
      },
    );
    return response.data.results;
  },

  getSimilarMovies: async (
    movieId: number,
    page = 1,
  ): Promise<MoviesResponse> => {
    const response = await axiosClient.get<MoviesResponse>(
      `/movie/${movieId}/similar`,
      {
        params: {
          api_key: getApiKey(),
          page,
        },
      },
    );
    return response.data;
  },
};

export const getImageUrl = (path: string | null, size: string = 'w500') => {
  if (!path) return null;
  return `${TMDB_CONFIG.IMAGE_BASE_URL}${size}${path}`;
};
