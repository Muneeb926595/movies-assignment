import axios from 'axios';
import {
  Movie,
  MovieDetails,
  MoviesResponse,
  Cast,
  Video,
} from '../../types/movie.types';
import { TMDB_CONFIG, getApiKey } from '../config/tmdb.config';

const tmdbAxios = axios.create({
  baseURL: TMDB_CONFIG.BASE_URL,
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
});

export const moviesEndpoints = {
  /**
   * Get popular movies
   */
  getPopularMovies: async (page = 1): Promise<MoviesResponse> => {
    const response = await tmdbAxios.get<MoviesResponse>('/movie/popular', {
      params: {
        api_key: getApiKey(),
        page,
      },
    });
    return response.data;
  },

  /**
   * Get now playing movies
   */
  getNowPlayingMovies: async (page = 1): Promise<MoviesResponse> => {
    const response = await tmdbAxios.get<MoviesResponse>(
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

  /**
   * Get upcoming movies
   */
  getUpcomingMovies: async (page = 1): Promise<MoviesResponse> => {
    const response = await tmdbAxios.get<MoviesResponse>('/movie/upcoming', {
      params: {
        api_key: getApiKey(),
        page,
      },
    });
    return response.data;
  },

  /**
   * Get top rated movies
   */
  getTopRatedMovies: async (page = 1): Promise<MoviesResponse> => {
    const response = await tmdbAxios.get<MoviesResponse>(
      '/movie/top_rated',
      {
        params: {
          api_key: getApiKey(),
          page,
        },
      },
    );
    return response.data;
  },

  /**
   * Search movies
   */
  searchMovies: async (query: string, page = 1): Promise<MoviesResponse> => {
    const response = await tmdbAxios.get<MoviesResponse>('/search/movie', {
      params: {
        api_key: getApiKey(),
        query,
        page,
      },
    });
    return response.data;
  },

  /**
   * Get movie details
   */
  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await tmdbAxios.get<MovieDetails>(`/movie/${movieId}`, {
      params: {
        api_key: getApiKey(),
      },
    });
    return response.data;
  },

  /**
   * Get movie cast
   */
  getMovieCast: async (movieId: number): Promise<Cast[]> => {
    const response = await tmdbAxios.get<{ cast: Cast[] }>(
      `/movie/${movieId}/credits`,
      {
        params: {
          api_key: getApiKey(),
        },
      },
    );
    return response.data.cast;
  },

  /**
   * Get movie videos (trailers)
   */
  getMovieVideos: async (movieId: number): Promise<Video[]> => {
    const response = await tmdbAxios.get<{ results: Video[] }>(
      `/movie/${movieId}/videos`,
      {
        params: {
          api_key: getApiKey(),
        },
      },
    );
    return response.data.results;
  },

  /**
   * Get similar movies
   */
  getSimilarMovies: async (movieId: number, page = 1): Promise<MoviesResponse> => {
    const response = await tmdbAxios.get<MoviesResponse>(
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
