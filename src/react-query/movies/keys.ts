export const MOVIES_QUERY_KEYS = {
  all: ['movies'] as const,
  popular: (page: number) =>
    [...MOVIES_QUERY_KEYS.all, 'popular', page] as const,
  nowPlaying: (page: number) =>
    [...MOVIES_QUERY_KEYS.all, 'nowPlaying', page] as const,
  upcoming: (page: number) =>
    [...MOVIES_QUERY_KEYS.all, 'upcoming', page] as const,
  topRated: (page: number) =>
    [...MOVIES_QUERY_KEYS.all, 'topRated', page] as const,
  search: (query: string, page: number) =>
    [...MOVIES_QUERY_KEYS.all, 'search', query, page] as const,
  details: (movieId: number) =>
    [...MOVIES_QUERY_KEYS.all, 'details', movieId] as const,
  cast: (movieId: number) =>
    [...MOVIES_QUERY_KEYS.all, 'cast', movieId] as const,
  videos: (movieId: number) =>
    [...MOVIES_QUERY_KEYS.all, 'videos', movieId] as const,
  similar: (movieId: number, page: number) =>
    [...MOVIES_QUERY_KEYS.all, 'similar', movieId, page] as const,
};
