export const TMDB_CONFIG = {
  API_KEY: 'bc77423c502f0b9319b0765267dab4a0',

  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
};

export const isApiConfigured = (): boolean => {
  return TMDB_CONFIG.API_KEY !== '';
};

export const getApiKey = (): string => {
  if (!isApiConfigured()) {
    throw new Error(
      'TMDB API key is not configured. Please add your API key in src/api/config/tmdb.config.ts',
    );
  }
  return TMDB_CONFIG.API_KEY;
};
