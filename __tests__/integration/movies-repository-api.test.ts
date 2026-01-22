/**
 * Movies Repository + API Integration Tests
 *
 * Tests the integration between the repository layer and API
 */

import { moviesRepository } from '../../src/repository/movies';
import { moviesEndpoints } from '../../src/api/endpoints/movies';

// Mock the API endpoints
jest.mock('../../src/api/endpoints/movies');

const mockMoviesEndpoints = moviesEndpoints as jest.Mocked<
  typeof moviesEndpoints
>;

describe('Movies Repository + API Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPopularMovies', () => {
    it('should fetch and normalize popular movies', async () => {
      const mockResponse = {
        page: 1,
        results: [
          {
            id: 1,
            title: 'Test Movie',
            poster_path: '/test.jpg',
            backdrop_path: '/backdrop.jpg',
            overview: 'Test overview',
            vote_average: 7.5,
            vote_count: 100,
            release_date: '2024-01-01',
            genre_ids: [28, 12],
            adult: false,
            original_language: 'en',
            original_title: 'Test Movie',
            popularity: 100,
            video: false,
          },
        ],
        total_pages: 10,
        total_results: 200,
      };

      mockMoviesEndpoints.getPopularMovies.mockResolvedValue(mockResponse);

      const result = await moviesRepository.getPopularMovies(1);

      expect(mockMoviesEndpoints.getPopularMovies).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockResponse);
      expect(result.results).toHaveLength(1);
      expect(result.results[0].title).toBe('Test Movie');
    });

    it('should normalize movies with missing data', async () => {
      const mockResponse = {
        page: 1,
        results: [
          {
            id: 1,
            title: 'Test Movie',
            poster_path: null,
            backdrop_path: null,
            overview: '',
            vote_average: 0,
            vote_count: 0,
            release_date: '2024-01-01',
            genre_ids: [],
            adult: false,
            original_language: 'en',
            original_title: 'Test Movie',
            popularity: 0,
            video: false,
          },
        ],
        total_pages: 1,
        total_results: 1,
      };

      mockMoviesEndpoints.getPopularMovies.mockResolvedValue(mockResponse);

      const result = await moviesRepository.getPopularMovies();

      expect(result.results[0].poster_path).toBeNull();
      expect(result.results[0].backdrop_path).toBeNull();
      expect(result.results[0].overview).toBe('');
      expect(result.results[0].vote_average).toBe(0);
    });

    it('should handle API errors with custom message', async () => {
      mockMoviesEndpoints.getPopularMovies.mockRejectedValue(
        new Error('Network error'),
      );

      await expect(moviesRepository.getPopularMovies()).rejects.toThrow(
        'Failed to fetch popular movies',
      );
    });
  });

  describe('getNowPlayingMovies', () => {
    it('should fetch now playing movies', async () => {
      const mockResponse = {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 0,
      };

      mockMoviesEndpoints.getNowPlayingMovies.mockResolvedValue(mockResponse);

      const result = await moviesRepository.getNowPlayingMovies(2);

      expect(mockMoviesEndpoints.getNowPlayingMovies).toHaveBeenCalledWith(2);
      expect(result.page).toBe(1);
    });

    it('should handle errors', async () => {
      mockMoviesEndpoints.getNowPlayingMovies.mockRejectedValue(
        new Error('API error'),
      );

      await expect(moviesRepository.getNowPlayingMovies()).rejects.toThrow(
        'Failed to fetch now playing movies',
      );
    });
  });

  describe('getUpcomingMovies', () => {
    it('should fetch upcoming movies', async () => {
      const mockResponse = {
        page: 1,
        results: [],
        total_pages: 5,
        total_results: 100,
      };

      mockMoviesEndpoints.getUpcomingMovies.mockResolvedValue(mockResponse);

      const result = await moviesRepository.getUpcomingMovies(3);

      expect(mockMoviesEndpoints.getUpcomingMovies).toHaveBeenCalledWith(3);
      expect(result.total_pages).toBe(5);
    });
  });

  describe('getTopRatedMovies', () => {
    it('should fetch top rated movies', async () => {
      const mockResponse = {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 0,
      };

      mockMoviesEndpoints.getTopRatedMovies.mockResolvedValue(mockResponse);

      await moviesRepository.getTopRatedMovies();

      expect(mockMoviesEndpoints.getTopRatedMovies).toHaveBeenCalledWith(1);
    });
  });

  describe('searchMovies', () => {
    it('should search movies with valid query', async () => {
      const mockResponse = {
        page: 1,
        results: [
          {
            id: 123,
            title: 'Search Result',
            poster_path: '/search.jpg',
            backdrop_path: null,
            overview: 'Found movie',
            vote_average: 8.0,
            vote_count: 50,
            release_date: '2024-01-01',
            genre_ids: [28],
            adult: false,
            original_language: 'en',
            original_title: 'Search Result',
            popularity: 50,
            video: false,
          },
        ],
        total_pages: 1,
        total_results: 1,
      };

      mockMoviesEndpoints.searchMovies.mockResolvedValue(mockResponse);

      const result = await moviesRepository.searchMovies('test query', 1);

      expect(mockMoviesEndpoints.searchMovies).toHaveBeenCalledWith(
        'test query',
        1,
      );
      expect(result.results).toHaveLength(1);
      expect(result.results[0].title).toBe('Search Result');
    });

    it('should return empty results for empty query', async () => {
      const result = await moviesRepository.searchMovies('', 1);

      expect(mockMoviesEndpoints.searchMovies).not.toHaveBeenCalled();
      expect(result).toEqual({
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      });
    });

    it('should trim whitespace from query', async () => {
      const mockResponse = {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      };

      mockMoviesEndpoints.searchMovies.mockResolvedValue(mockResponse);

      await moviesRepository.searchMovies('  trimmed  ', 1);

      expect(mockMoviesEndpoints.searchMovies).toHaveBeenCalledWith(
        'trimmed',
        1,
      );
    });

    it('should return empty results for whitespace-only query', async () => {
      const result = await moviesRepository.searchMovies('   ', 1);

      expect(mockMoviesEndpoints.searchMovies).not.toHaveBeenCalled();
      expect(result.results).toEqual([]);
    });
  });

  describe('getMovieDetails', () => {
    it('should fetch and normalize movie details', async () => {
      const mockDetails = {
        id: 123,
        title: 'Detailed Movie',
        poster_path: '/poster.jpg',
        backdrop_path: '/backdrop.jpg',
        overview: 'Detailed overview',
        vote_average: 7.8,
        vote_count: 500,
        release_date: '2024-01-01',
        genres: [{ id: 28, name: 'Action' }],
        runtime: 120,
        budget: 1000000,
        revenue: 5000000,
        production_companies: [
          { id: 1, name: 'Company', logo_path: null, origin_country: 'US' },
        ],
        production_countries: [{ iso_3166_1: 'US', name: 'United States' }],
        spoken_languages: [
          { iso_639_1: 'en', name: 'English', english_name: 'English' },
        ],
        status: 'Released',
        tagline: 'An epic movie',
        adult: false,
        belongs_to_collection: null,
        homepage: '',
        imdb_id: 'tt1234567',
        original_language: 'en',
        original_title: 'Detailed Movie',
        popularity: 100,
        video: false,
      };

      mockMoviesEndpoints.getMovieDetails.mockResolvedValue(mockDetails as any);

      const result = await moviesRepository.getMovieDetails(123);

      expect(mockMoviesEndpoints.getMovieDetails).toHaveBeenCalledWith(123);
      expect(result.id).toBe(123);
      expect(result.title).toBe('Detailed Movie');
      expect(result.genres).toHaveLength(1);
    });

    it('should validate movie ID', async () => {
      await expect(moviesRepository.getMovieDetails(0)).rejects.toThrow(
        'Invalid movie ID',
      );
      await expect(moviesRepository.getMovieDetails(-1)).rejects.toThrow(
        'Invalid movie ID',
      );
      expect(mockMoviesEndpoints.getMovieDetails).not.toHaveBeenCalled();
    });

    it('should normalize details with missing optional fields', async () => {
      const mockDetails = {
        id: 123,
        title: 'Movie',
        poster_path: null,
        backdrop_path: null,
        overview: '',
        vote_average: 0,
        vote_count: 0,
        release_date: '2024-01-01',
        genres: [],
        runtime: 0,
        budget: 0,
        revenue: 0,
        production_companies: [],
        production_countries: [],
        spoken_languages: [],
        status: 'Released',
        tagline: '',
        adult: false,
        belongs_to_collection: null,
        homepage: '',
        imdb_id: null,
        original_language: 'en',
        original_title: 'Movie',
        popularity: 0,
        video: false,
      };

      mockMoviesEndpoints.getMovieDetails.mockResolvedValue(mockDetails as any);

      const result = await moviesRepository.getMovieDetails(123);

      expect(result.genres).toEqual([]);
      expect(result.production_companies).toEqual([]);
      expect(result.poster_path).toBeNull();
    });
  });

  describe('getMovieCast', () => {
    it('should fetch movie cast', async () => {
      const mockCast = [
        {
          id: 1,
          name: 'Actor Name',
          character: 'Character Name',
          profile_path: '/actor.jpg',
          cast_id: 1,
          credit_id: 'abc123',
          order: 0,
          adult: false,
          gender: 2,
          known_for_department: 'Acting',
          original_name: 'Actor Name',
          popularity: 10,
        },
      ];

      mockMoviesEndpoints.getMovieCast.mockResolvedValue(mockCast);

      const result = await moviesRepository.getMovieCast(123);

      expect(mockMoviesEndpoints.getMovieCast).toHaveBeenCalledWith(123);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Actor Name');
    });

    it('should validate movie ID for cast', async () => {
      await expect(moviesRepository.getMovieCast(0)).rejects.toThrow(
        'Invalid movie ID',
      );
      await expect(moviesRepository.getMovieCast(-5)).rejects.toThrow(
        'Invalid movie ID',
      );
    });

    it('should return empty array if no cast', async () => {
      mockMoviesEndpoints.getMovieCast.mockResolvedValue(null as any);

      const result = await moviesRepository.getMovieCast(123);

      expect(result).toEqual([]);
    });
  });

  describe('getMovieVideos', () => {
    it('should fetch movie videos', async () => {
      const mockVideos = [
        {
          id: 'video1',
          key: 'abc123',
          name: 'Trailer',
          site: 'YouTube',
          type: 'Trailer',
          official: true,
          published_at: '2024-01-01',
          iso_639_1: 'en',
          iso_3166_1: 'US',
          size: 1080,
        },
      ];

      mockMoviesEndpoints.getMovieVideos.mockResolvedValue(mockVideos);

      const result = await moviesRepository.getMovieVideos(123);

      expect(mockMoviesEndpoints.getMovieVideos).toHaveBeenCalledWith(123);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Trailer');
    });

    it('should validate movie ID for videos', async () => {
      await expect(moviesRepository.getMovieVideos(0)).rejects.toThrow(
        'Invalid movie ID',
      );
    });

    it('should return empty array if no videos', async () => {
      mockMoviesEndpoints.getMovieVideos.mockResolvedValue(null as any);

      const result = await moviesRepository.getMovieVideos(123);

      expect(result).toEqual([]);
    });
  });

  describe('getSimilarMovies', () => {
    it('should fetch similar movies', async () => {
      const mockResponse = {
        page: 1,
        results: [
          {
            id: 456,
            title: 'Similar Movie',
            poster_path: '/similar.jpg',
            backdrop_path: null,
            overview: 'Similar',
            vote_average: 7.0,
            vote_count: 50,
            release_date: '2024-01-01',
            genre_ids: [28],
            adult: false,
            original_language: 'en',
            original_title: 'Similar Movie',
            popularity: 50,
            video: false,
          },
        ],
        total_pages: 1,
        total_results: 1,
      };

      mockMoviesEndpoints.getSimilarMovies.mockResolvedValue(mockResponse);

      const result = await moviesRepository.getSimilarMovies(123, 1);

      expect(mockMoviesEndpoints.getSimilarMovies).toHaveBeenCalledWith(123, 1);
      expect(result.results).toHaveLength(1);
    });

    it('should validate movie ID for similar movies', async () => {
      await expect(moviesRepository.getSimilarMovies(0)).rejects.toThrow(
        'Invalid movie ID',
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors', async () => {
      mockMoviesEndpoints.getPopularMovies.mockRejectedValue(
        new Error('Network timeout'),
      );

      await expect(moviesRepository.getPopularMovies()).rejects.toThrow(
        'Failed to fetch popular movies',
      );
    });

    it('should handle API errors with status codes', async () => {
      const apiError = new Error('404 Not Found');
      mockMoviesEndpoints.getMovieDetails.mockRejectedValue(apiError);

      await expect(moviesRepository.getMovieDetails(999999)).rejects.toThrow(
        'Failed to fetch movie details',
      );
    });

    it('should preserve error context', async () => {
      const originalError = new Error('Original error message');
      mockMoviesEndpoints.searchMovies.mockRejectedValue(originalError);

      try {
        await moviesRepository.searchMovies('test');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain('Failed to search movies');
      }
    });
  });

  describe('Data Flow Integration', () => {
    it('should handle complete fetch-normalize-return flow', async () => {
      const mockResponse = {
        page: 1,
        results: [
          {
            id: 1,
            title: 'Movie 1',
            poster_path: null,
            backdrop_path: null,
            overview: '',
            vote_average: 0,
            vote_count: 0,
            release_date: '2024-01-01',
            genre_ids: [],
            adult: false,
            original_language: 'en',
            original_title: 'Movie 1',
            popularity: 0,
            video: false,
          },
          {
            id: 2,
            title: 'Movie 2',
            poster_path: '/poster.jpg',
            backdrop_path: '/backdrop.jpg',
            overview: 'Overview',
            vote_average: 8.5,
            vote_count: 100,
            release_date: '2024-01-01',
            genre_ids: [28],
            adult: false,
            original_language: 'en',
            original_title: 'Movie 2',
            popularity: 100,
            video: false,
          },
        ],
        total_pages: 1,
        total_results: 2,
      };

      mockMoviesEndpoints.getPopularMovies.mockResolvedValue(mockResponse);

      const result = await moviesRepository.getPopularMovies();

      // Verify data transformation
      expect(result.results[0].poster_path).toBeNull();
      expect(result.results[0].overview).toBe('');
      expect(result.results[1].poster_path).toBe('/poster.jpg');
      expect(result.results[1].overview).toBe('Overview');
    });
  });
});
