/**
 * TMDB API Configuration
 *
 * IMPORTANT: Add your TMDB API key here
 * Get your free API key from: https://www.themoviedb.org/settings/api
 *
 * TODO: Move to environment variables for production
 * Use react-native-config or similar package
 */

export const TMDB_CONFIG = {
  /**
   * Your TMDB API Key
   * Replace the empty string with your actual API key
   */
  API_KEY: 'bc77423c502f0b9319b0765267dab4a0', // TODO: Add your API key here

  /**
   * TMDB API Base URL
   */
  BASE_URL: 'https://api.themoviedb.org/3',

  /**
   * TMDB Image Base URL
   */
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',

  /**
   * Common image sizes
   */
  IMAGE_SIZES: {
    poster: {
      small: 'w185',
      medium: 'w342',
      large: 'w500',
      original: 'original',
    },
    backdrop: {
      small: 'w300',
      medium: 'w780',
      large: 'w1280',
      original: 'original',
    },
    profile: {
      small: 'w45',
      medium: 'w185',
      large: 'h632',
      original: 'original',
    },
  },
};

/**
 * Validate if API key is configured
 */
export const isApiConfigured = (): boolean => {
  return TMDB_CONFIG.API_KEY !== '';
};

/**
 * Get API key (throws error if not configured)
 */
export const getApiKey = (): string => {
  if (!isApiConfigured()) {
    throw new Error(
      'TMDB API key is not configured. Please add your API key in src/api/config/tmdb.config.ts',
    );
  }
  return TMDB_CONFIG.API_KEY;
};
