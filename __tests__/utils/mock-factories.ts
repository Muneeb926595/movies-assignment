/**
 * Mock Factories
 * 
 * Reusable factories for creating mock data and objects
 * Following Factory Pattern for test data generation
 */

import { Movie, MovieDetails, Cast, Video } from '../../src/types/movie.types';

/**
 * Create a mock movie object
 */
export const createMockMovie = (overrides?: Partial<Movie>): Movie => ({
  id: 1,
  title: 'Test Movie',
  overview: 'This is a test movie overview',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2024-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  popularity: 100.5,
  adult: false,
  video: false,
  original_language: 'en',
  original_title: 'Test Movie',
  genre_ids: [1, 2, 3],
  ...overrides,
} as Movie);

/**
 * Create multiple mock movies
 */
export const createMockMovies = (count: number, overrides?: Partial<Movie>): Movie[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockMovie({
      id: index + 1,
      title: `Test Movie ${index + 1}`,
      ...overrides,
    }),
  );
};

/**
 * Create a mock movie details object
 */
export const createMockMovieDetails = (
  overrides?: Partial<MovieDetails>,
): MovieDetails => ({
  id: 1,
  title: 'Test Movie',
  overview: 'This is a test movie overview',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2024-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  popularity: 100.5,
  adult: false,
  video: false,
  original_language: 'en',
  original_title: 'Test Movie',
  genre_ids: [1, 2],
  genres: [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Drama' },
  ],
  runtime: 120,
  budget: 1000000,
  revenue: 5000000,
  status: 'Released',
  tagline: 'Test tagline',
  production_companies: [
    {
      id: 1,
      name: 'Test Studio',
      logo_path: '/logo.jpg',
      origin_country: 'US',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'US',
      name: 'United States',
    },
  ],
  spoken_languages: [
    {
      iso_639_1: 'en',
      name: 'English',
      english_name: 'English',
    },
  ],
  homepage: 'https://example.com',
  ...overrides,
} as MovieDetails);

/**
 * Create a mock cast member
 */
export const createMockCast = (overrides?: Partial<Cast>): Cast => ({
  id: 1,
  name: 'Test Actor',
  character: 'Test Character',
  profile_path: '/test-profile.jpg',
  order: 0,
  ...overrides,
});

/**
 * Create multiple mock cast members
 */
export const createMockCastList = (count: number): Cast[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockCast({
      id: index + 1,
      name: `Test Actor ${index + 1}`,
      character: `Character ${index + 1}`,
      order: index,
    }),
  );
};

/**
 * Create a mock video
 */
export const createMockVideo = (overrides?: Partial<Video>): Video => ({
  id: 'test-video-id',
  key: 'test-video-key',
  name: 'Test Video',
  site: 'YouTube',
  type: 'Trailer',
  official: true,
  ...overrides,
} as Video);

/**
 * Create mock API response
 */
export const createMockApiResponse = <T>(
  data: T,
  overrides?: Partial<{
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: Record<string, unknown>;
  }>,
) => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
  ...overrides,
});

/**
 * Create mock paginated response
 */
export const createMockPaginatedResponse = <T>(
  results: T[],
  page: number = 1,
  totalPages: number = 10,
  totalResults: number = 100,
) => ({
  page,
  results,
  total_pages: totalPages,
  total_results: totalResults,
});

/**
 * Create mock error response
 */
export const createMockError = (
  message: string = 'Test error',
  status: number = 500,
) => ({
  message,
  response: {
    status,
    data: {
      message,
      status_code: status,
    },
  },
  isAxiosError: true,
});

/**
 * Create mock storage adapter
 */
export const createMockStorageAdapter = () => {
  const storage = new Map<string, string>();

  return {
    set: jest.fn((key: string, value: string) => {
      storage.set(key, value);
    }),
    get: jest.fn((key: string) => {
      return storage.get(key);
    }),
    remove: jest.fn((key: string) => {
      storage.delete(key);
    }),
    clearAll: jest.fn(() => {
      storage.clear();
    }),
    contains: jest.fn((key: string) => {
      return storage.has(key);
    }),
    getAllKeys: jest.fn(() => {
      return Array.from(storage.keys());
    }),
    // Helper to set initial state
    setInitialState: (state: Record<string, string>) => {
      Object.entries(state).forEach(([key, value]) => {
        storage.set(key, value);
      });
    },
  };
};

/**
 * Create mock MMKV instance
 */
export const createMockMMKV = () => {
  const storage = new Map<string, any>();

  return {
    set: jest.fn((key: string, value: any) => {
      storage.set(key, value);
    }),
    getString: jest.fn((key: string) => {
      return storage.get(key) || undefined;
    }),
    getNumber: jest.fn((key: string) => {
      const value = storage.get(key);
      return typeof value === 'number' ? value : undefined;
    }),
    getBoolean: jest.fn((key: string) => {
      const value = storage.get(key);
      return typeof value === 'boolean' ? value : undefined;
    }),
    contains: jest.fn((key: string) => {
      return storage.has(key);
    }),
    remove: jest.fn((key: string) => {
      storage.delete(key);
    }),
    clearAll: jest.fn(() => {
      storage.clear();
    }),
    getAllKeys: jest.fn(() => {
      return Array.from(storage.keys());
    }),
  };
};
