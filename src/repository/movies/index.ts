import { moviesEndpoints, getImageUrl } from '../../api/endpoints/movies';
import {
  MoviesResponse,
  MovieDetails,
  Cast,
  Video,
} from '../../types/movie.types';

class MoviesRepository {
  async getPopularMovies(page = 1): Promise<MoviesResponse> {
    try {
      const response = await moviesEndpoints.getPopularMovies(page);
      return this.normalizeMoviesResponse(response);
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch popular movies');
    }
  }

  async getNowPlayingMovies(page = 1): Promise<MoviesResponse> {
    try {
      const response = await moviesEndpoints.getNowPlayingMovies(page);
      return this.normalizeMoviesResponse(response);
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch now playing movies');
    }
  }

  async getUpcomingMovies(page = 1): Promise<MoviesResponse> {
    try {
      const response = await moviesEndpoints.getUpcomingMovies(page);
      return this.normalizeMoviesResponse(response);
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch upcoming movies');
    }
  }

  async getTopRatedMovies(page = 1): Promise<MoviesResponse> {
    try {
      const response = await moviesEndpoints.getTopRatedMovies(page);
      return this.normalizeMoviesResponse(response);
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch top rated movies');
    }
  }

  async searchMovies(query: string, page = 1): Promise<MoviesResponse> {
    try {
      if (!query || query.trim().length === 0) {
        return {
          page: 1,
          results: [],
          total_pages: 0,
          total_results: 0,
        };
      }

      const response = await moviesEndpoints.searchMovies(query.trim(), page);
      return this.normalizeMoviesResponse(response);
    } catch (error) {
      throw this.handleError(error, 'Failed to search movies');
    }
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    try {
      if (!movieId || movieId <= 0) {
        throw new Error('Invalid movie ID');
      }

      const response = await moviesEndpoints.getMovieDetails(movieId);
      return this.normalizeMovieDetails(response);
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch movie details');
    }
  }

  async getMovieCast(movieId: number): Promise<Cast[]> {
    try {
      if (!movieId || movieId <= 0) {
        throw new Error('Invalid movie ID');
      }

      const cast = await moviesEndpoints.getMovieCast(movieId);
      return cast || [];
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch movie cast');
    }
  }

  async getMovieVideos(movieId: number): Promise<Video[]> {
    try {
      if (!movieId || movieId <= 0) {
        throw new Error('Invalid movie ID');
      }

      const videos = await moviesEndpoints.getMovieVideos(movieId);
      return videos || [];
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch movie videos');
    }
  }

  async getSimilarMovies(movieId: number, page = 1): Promise<MoviesResponse> {
    try {
      if (!movieId || movieId <= 0) {
        throw new Error('Invalid movie ID');
      }

      const response = await moviesEndpoints.getSimilarMovies(movieId, page);
      return this.normalizeMoviesResponse(response);
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch similar movies');
    }
  }

  getImageUrl(path: string | null, size: string = 'w500'): string | null {
    return getImageUrl(path, size);
  }

  private normalizeMoviesResponse(response: MoviesResponse): MoviesResponse {
    return {
      ...response,
      results:
        response.results?.map(movie => ({
          ...movie,
          poster_path: movie.poster_path || null,
          backdrop_path: movie.backdrop_path || null,
          overview: movie.overview || '',
          vote_average: movie.vote_average || 0,
          vote_count: movie.vote_count || 0,
        })) || [],
    };
  }

  private normalizeMovieDetails(details: MovieDetails): MovieDetails {
    return {
      ...details,
      poster_path: details.poster_path || null,
      backdrop_path: details.backdrop_path || null,
      overview: details.overview || '',
      vote_average: details.vote_average || 0,
      vote_count: details.vote_count || 0,
      genres: details.genres || [],
      production_companies: details.production_companies || [],
      production_countries: details.production_countries || [],
      spoken_languages: details.spoken_languages || [],
    };
  }

  private handleError(error: unknown, defaultMessage: string): Error {
    if (error instanceof Error) {
      return new Error(`${defaultMessage}: ${error.message}`);
    }
    return new Error(defaultMessage);
  }
}

export const moviesRepository = new MoviesRepository();
