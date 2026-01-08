/**
 * Movies Repository Test Suite
 *
 * Tests the MoviesRepository class to ensure proper data fetching,
 * transformation, validation, and error handling.
 */

// Mock the API endpoints BEFORE importing repository
jest.mock('../../../src/api/endpoints/movies', () => ({
  moviesEndpoints: {
    getPopularMovies: jest.fn(),
    getNowPlayingMovies: jest.fn(),
    getUpcomingMovies: jest.fn(),
    getTopRatedMovies: jest.fn(),
    searchMovies: jest.fn(),
    getMovieDetails: jest.fn(),
    getMovieCast: jest.fn(),
    getMovieVideos: jest.fn(),
    getSimilarMovies: jest.fn(),
  },
  getImageUrl: jest
    .fn()
    .mockImplementation((path: string | null, size: string = 'w500') =>
      path ? `https://image.tmdb.org/t/p/${size}${path}` : null,
    ),
}));

import { moviesRepository } from '../../../src/repository/movies';
import { moviesEndpoints, getImageUrl } from '../../../src/api/endpoints/movies';
import {
  MoviesResponse,
  MovieDetails,
  Cast,
  Video,
} from '../../../src/types/movie.types';

// Get typed mocks
const mockedGetImageUrl = getImageUrl as jest.MockedFunction<
  typeof getImageUrl
>;

describe('MoviesRepository', () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Mock data helpers
  const createMockMoviesResponse = (
    overrides?: Partial<MoviesResponse>,
  ): MoviesResponse => ({
    page: 1,
    results: [
      {
        id: 1,
        title: 'Test Movie 1',
        overview: 'Test overview 1',
        poster_path: '/test1.jpg',
        backdrop_path: '/backdrop1.jpg',
        release_date: '2024-01-01',
        vote_average: 8.5,
        vote_count: 1000,
        adult: false,
        genre_ids: [28, 12],
        original_language: 'en',
        original_title: 'Test Movie 1',
        popularity: 100,
        video: false,
      },
      {
        id: 2,
        title: 'Test Movie 2',
        overview: 'Test overview 2',
        poster_path: null,
        backdrop_path: null,
        release_date: '2024-02-01',
        vote_average: 0,
        vote_count: 0,
        adult: false,
        genre_ids: [18],
        original_language: 'en',
        original_title: 'Test Movie 2',
        popularity: 50,
        video: false,
      },
    ],
    total_pages: 10,
    total_results: 200,
    ...overrides,
  });

  const createMockMovieDetails = (
    overrides?: Partial<MovieDetails>,
  ): MovieDetails => ({
    id: 1,
    title: 'Test Movie',
    overview: 'Test overview',
    poster_path: '/test.jpg',
    backdrop_path: '/backdrop.jpg',
    release_date: '2024-01-01',
    vote_average: 8.5,
    vote_count: 1000,
    adult: false,
    genre_ids: [28, 12],
    genres: [{ id: 28, name: 'Action' }],
    original_language: 'en',
    original_title: 'Test Movie',
    popularity: 100,
    video: false,
    budget: 100000000,
    homepage: 'https://test.com',
    production_companies: [],
    production_countries: [],
    revenue: 200000000,
    runtime: 120,
    spoken_languages: [],
    status: 'Released',
    tagline: 'Test tagline',
    ...overrides,
  });

  describe('getPopularMovies', () => {
    it('should fetch and normalize popular movies successfully', async () => {
      // Arrange
      const mockResponse = createMockMoviesResponse();
      (moviesEndpoints.getPopularMovies as jest.Mock).mockResolvedValue(
        mockResponse,
      );

      // Act
      const result = await moviesRepository.getPopularMovies(1);

      // Assert
      expect(moviesEndpoints.getPopularMovies).toHaveBeenCalledWith(1);
      expect(moviesEndpoints.getPopularMovies).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse);
      expect(result.results).toHaveLength(2);
      expect(result.results[0].poster_path).toBe('/test1.jpg');
      expect(result.results[1].poster_path).toBeNull();
    });

    it('should use default page 1 when no page is provided', async () => {
      // Arrange
      const mockResponse = createMockMoviesResponse();
      (moviesEndpoints.getPopularMovies as jest.Mock).mockResolvedValue(
        mockResponse,
      );

      // Act
      await moviesRepository.getPopularMovies();

      // Assert
      expect(moviesEndpoints.getPopularMovies).toHaveBeenCalledWith(1);
    });

    it('should handle API errors with custom error message', async () => {
      // Arrange
      (moviesEndpoints.getPopularMovies as jest.Mock).mockRejectedValue(
        new Error('Network error'),
      );

      // Act & Assert
      await expect(moviesRepository.getPopularMovies(1)).rejects.toThrow(
        'Failed to fetch popular movies: Network error',
      );
    });

    it('should normalize missing fields in movie results', async () => {
      // Arrange
      const mockResponse = createMockMoviesResponse({
        results: [
          {
            id: 1,
            title: 'Incomplete Movie',
            // Missing optional fields
          } as any,
        ],
      });
      (moviesEndpoints.getPopularMovies as jest.Mock).mockResolvedValue(
        mockResponse,
      );

      // Act
      const result = await moviesRepository.getPopularMovies(1);

      // Assert
      expect(result.results[0].poster_path).toBeNull();
      expect(result.results[0].backdrop_path).toBeNull();
      expect(result.results[0].overview).toBe('');
      expect(result.results[0].vote_average).toBe(0);
      expect(result.results[0].vote_count).toBe(0);
    });
  });

  describe('getNowPlayingMovies', () => {
    it('should fetch and normalize now playing movies successfully', async () => {
      // Arrange
      const mockResponse = createMockMoviesResponse();
      (moviesEndpoints.getNowPlayingMovies as jest.Mock).mockResolvedValue(
        mockResponse,
      );

      // Act
      const result = await moviesRepository.getNowPlayingMovies(2);

      // Assert
      expect(moviesEndpoints.getNowPlayingMovies).toHaveBeenCalledWith(2);
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors for now playing movies', async () => {
      // Arrange
      (moviesEndpoints.getNowPlayingMovies as jest.Mock).mockRejectedValue(
        new Error('API Error'),
      );

      // Act & Assert
      await expect(moviesRepository.getNowPlayingMovies()).rejects.toThrow(
        'Failed to fetch now playing movies',
      );
    });
  });

  describe('getUpcomingMovies', () => {
    it('should fetch and normalize upcoming movies successfully', async () => {
      // Arrange
      const mockResponse = createMockMoviesResponse();
      (moviesEndpoints.getUpcomingMovies as jest.Mock).mockResolvedValue(
        mockResponse,
      );

      // Act
      const result = await moviesRepository.getUpcomingMovies(3);

      // Assert
      expect(moviesEndpoints.getUpcomingMovies).toHaveBeenCalledWith(3);
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors for upcoming movies', async () => {
      // Arrange
      (moviesEndpoints.getUpcomingMovies as jest.Mock).mockRejectedValue(
        new Error('Timeout'),
      );

      // Act & Assert
      await expect(moviesRepository.getUpcomingMovies()).rejects.toThrow(
        'Failed to fetch upcoming movies: Timeout',
      );
    });
  });

  describe('getTopRatedMovies', () => {
    it('should fetch and normalize top rated movies successfully', async () => {
      // Arrange
      const mockResponse = createMockMoviesResponse();
      (moviesEndpoints.getTopRatedMovies as jest.Mock).mockResolvedValue(
        mockResponse,
      );

      // Act
      const result = await moviesRepository.getTopRatedMovies(1);

      // Assert
      expect(moviesEndpoints.getTopRatedMovies).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors for top rated movies', async () => {
      // Arrange
      (moviesEndpoints.getTopRatedMovies as jest.Mock).mockRejectedValue(
        new Error('Server error'),
      );

      // Act & Assert
      await expect(moviesRepository.getTopRatedMovies()).rejects.toThrow(
        'Failed to fetch top rated movies',
      );
    });
  });

  describe('searchMovies', () => {
    it('should search movies successfully with valid query', async () => {
      // Arrange
      const mockResponse = createMockMoviesResponse();
      (moviesEndpoints.searchMovies as jest.Mock).mockResolvedValue(
        mockResponse,
      );

      // Act
      const result = await moviesRepository.searchMovies('Inception', 1);

      // Assert
      expect(moviesEndpoints.searchMovies).toHaveBeenCalledWith('Inception', 1);
      expect(result).toEqual(mockResponse);
    });

    it('should trim whitespace from search query', async () => {
      // Arrange
      const mockResponse = createMockMoviesResponse();
      (moviesEndpoints.searchMovies as jest.Mock).mockResolvedValue(
        mockResponse,
      );

      // Act
      await moviesRepository.searchMovies('  Inception  ', 1);

      // Assert
      expect(moviesEndpoints.searchMovies).toHaveBeenCalledWith('Inception', 1);
    });

    it('should return empty results for empty query', async () => {
      // Act
      const result = await moviesRepository.searchMovies('', 1);

      // Assert
      expect(moviesEndpoints.searchMovies).not.toHaveBeenCalled();
      expect(result).toEqual({
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      });
    });

    it('should return empty results for whitespace-only query', async () => {
      // Act
      const result = await moviesRepository.searchMovies('   ', 1);

      // Assert
      expect(moviesEndpoints.searchMovies).not.toHaveBeenCalled();
      expect(result.results).toEqual([]);
    });

    it('should handle search errors', async () => {
      // Arrange
      (moviesEndpoints.searchMovies as jest.Mock).mockRejectedValue(
        new Error('Search failed'),
      );

      // Act & Assert
      await expect(moviesRepository.searchMovies('test', 1)).rejects.toThrow(
        'Failed to search movies: Search failed',
      );
    });
  });

  describe('getMovieDetails', () => {
    it('should fetch and normalize movie details successfully', async () => {
      // Arrange
      const mockDetails = createMockMovieDetails();
      (moviesEndpoints.getMovieDetails as jest.Mock).mockResolvedValue(
        mockDetails,
      );

      // Act
      const result = await moviesRepository.getMovieDetails(1);

      // Assert
      expect(moviesEndpoints.getMovieDetails).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockDetails);
      expect(result.genres).toHaveLength(1);
    });

    it('should throw error for invalid movie ID (0)', async () => {
      // Act & Assert
      await expect(moviesRepository.getMovieDetails(0)).rejects.toThrow(
        'Invalid movie ID',
      );
      expect(moviesEndpoints.getMovieDetails).not.toHaveBeenCalled();
    });

    it('should throw error for negative movie ID', async () => {
      // Act & Assert
      await expect(moviesRepository.getMovieDetails(-1)).rejects.toThrow(
        'Invalid movie ID',
      );
      expect(moviesEndpoints.getMovieDetails).not.toHaveBeenCalled();
    });

    it('should normalize missing fields in movie details', async () => {
      // Arrange
      const incompleteDetails = {
        id: 1,
        title: 'Test',
        // Missing many optional fields
      } as any;
      (moviesEndpoints.getMovieDetails as jest.Mock).mockResolvedValue(
        incompleteDetails,
      );

      // Act
      const result = await moviesRepository.getMovieDetails(1);

      // Assert
      expect(result.poster_path).toBeNull();
      expect(result.backdrop_path).toBeNull();
      expect(result.overview).toBe('');
      expect(result.genres).toEqual([]);
      expect(result.production_companies).toEqual([]);
    });

    it('should handle API errors for movie details', async () => {
      // Arrange
      (moviesEndpoints.getMovieDetails as jest.Mock).mockRejectedValue(
        new Error('Not found'),
      );

      // Act & Assert
      await expect(moviesRepository.getMovieDetails(999)).rejects.toThrow(
        'Failed to fetch movie details: Not found',
      );
    });
  });

  describe('getMovieCast', () => {
    it('should fetch movie cast successfully', async () => {
      // Arrange
      const mockCast: Cast[] = [
        {
          id: 1,
          name: 'Actor 1',
          character: 'Character 1',
          profile_path: '/actor1.jpg',
          order: 0,
        },
        {
          id: 2,
          name: 'Actor 2',
          character: 'Character 2',
          profile_path: null,
          order: 1,
        },
      ];
      (moviesEndpoints.getMovieCast as jest.Mock).mockResolvedValue(mockCast);

      // Act
      const result = await moviesRepository.getMovieCast(1);

      // Assert
      expect(moviesEndpoints.getMovieCast).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCast);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when no cast is found', async () => {
      // Arrange
      (moviesEndpoints.getMovieCast as jest.Mock).mockResolvedValue(null);

      // Act
      const result = await moviesRepository.getMovieCast(1);

      // Assert
      expect(result).toEqual([]);
    });

    it('should throw error for invalid movie ID', async () => {
      // Act & Assert
      await expect(moviesRepository.getMovieCast(0)).rejects.toThrow(
        'Invalid movie ID',
      );
      expect(moviesEndpoints.getMovieCast).not.toHaveBeenCalled();
    });

    it('should handle API errors for cast', async () => {
      // Arrange
      (moviesEndpoints.getMovieCast as jest.Mock).mockRejectedValue(
        new Error('Cast not available'),
      );

      // Act & Assert
      await expect(moviesRepository.getMovieCast(1)).rejects.toThrow(
        'Failed to fetch movie cast',
      );
    });
  });

  describe('getMovieVideos', () => {
    it('should fetch movie videos successfully', async () => {
      // Arrange
      const mockVideos: Video[] = [
        {
          id: 'video1',
          key: 'abc123',
          name: 'Official Trailer',
          site: 'YouTube',
          type: 'Trailer',
          official: true,
        },
      ];
      (moviesEndpoints.getMovieVideos as jest.Mock).mockResolvedValue(
        mockVideos,
      );

      // Act
      const result = await moviesRepository.getMovieVideos(1);

      // Assert
      expect(moviesEndpoints.getMovieVideos).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockVideos);
    });

    it('should return empty array when no videos found', async () => {
      // Arrange
      (moviesEndpoints.getMovieVideos as jest.Mock).mockResolvedValue(null);

      // Act
      const result = await moviesRepository.getMovieVideos(1);

      // Assert
      expect(result).toEqual([]);
    });

    it('should throw error for invalid movie ID', async () => {
      // Act & Assert
      await expect(moviesRepository.getMovieVideos(-5)).rejects.toThrow(
        'Invalid movie ID',
      );
    });

    it('should handle API errors for videos', async () => {
      // Arrange
      (moviesEndpoints.getMovieVideos as jest.Mock).mockRejectedValue(
        new Error('Videos unavailable'),
      );

      // Act & Assert
      await expect(moviesRepository.getMovieVideos(1)).rejects.toThrow(
        'Failed to fetch movie videos',
      );
    });
  });

  describe('getSimilarMovies', () => {
    it('should fetch similar movies successfully', async () => {
      // Arrange
      const mockResponse = createMockMoviesResponse();
      (moviesEndpoints.getSimilarMovies as jest.Mock).mockResolvedValue(
        mockResponse,
      );

      // Act
      const result = await moviesRepository.getSimilarMovies(1, 2);

      // Assert
      expect(moviesEndpoints.getSimilarMovies).toHaveBeenCalledWith(1, 2);
      expect(result).toEqual(mockResponse);
    });

    it('should use default page 1', async () => {
      // Arrange
      const mockResponse = createMockMoviesResponse();
      (moviesEndpoints.getSimilarMovies as jest.Mock).mockResolvedValue(
        mockResponse,
      );

      // Act
      await moviesRepository.getSimilarMovies(1);

      // Assert
      expect(moviesEndpoints.getSimilarMovies).toHaveBeenCalledWith(1, 1);
    });

    it('should throw error for invalid movie ID', async () => {
      // Act & Assert
      await expect(moviesRepository.getSimilarMovies(0)).rejects.toThrow(
        'Invalid movie ID',
      );
    });

    it('should handle API errors for similar movies', async () => {
      // Arrange
      (moviesEndpoints.getSimilarMovies as jest.Mock).mockRejectedValue(
        new Error('Similar movies error'),
      );

      // Act & Assert
      await expect(moviesRepository.getSimilarMovies(1)).rejects.toThrow(
        'Failed to fetch similar movies',
      );
    });
  });

  describe('getImageUrl', () => {
    it('should delegate to API getImageUrl function', () => {
      // Act
      moviesRepository.getImageUrl('/test.jpg');
      moviesRepository.getImageUrl('/test.jpg', 'original');
      moviesRepository.getImageUrl(null);

      // Assert - just verify the function delegates correctly
      expect(mockedGetImageUrl).toHaveBeenCalledTimes(3);
      expect(mockedGetImageUrl).toHaveBeenCalledWith('/test.jpg', 'w500');
      expect(mockedGetImageUrl).toHaveBeenCalledWith('/test.jpg', 'original');
      expect(mockedGetImageUrl).toHaveBeenCalledWith(null, 'w500');
    });
  });

  describe('Error handling', () => {
    it('should handle non-Error objects thrown', async () => {
      // Arrange
      (moviesEndpoints.getPopularMovies as jest.Mock).mockRejectedValue(
        'String error',
      );

      // Act & Assert
      await expect(moviesRepository.getPopularMovies()).rejects.toThrow(
        'Failed to fetch popular movies',
      );
    });

    it('should preserve error messages from API', async () => {
      // Arrange
      const customError = new Error('Rate limit exceeded');
      (moviesEndpoints.getNowPlayingMovies as jest.Mock).mockRejectedValue(
        customError,
      );

      // Act & Assert
      await expect(moviesRepository.getNowPlayingMovies()).rejects.toThrow(
        'Failed to fetch now playing movies: Rate limit exceeded',
      );
    });
  });
});
