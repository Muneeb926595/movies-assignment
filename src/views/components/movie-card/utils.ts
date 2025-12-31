import { getImageUrl } from '../../../api/endpoints/movies';

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const formatYear = (dateString: string): string => {
  if (!dateString) return '';
  return new Date(dateString).getFullYear().toString();
};

export const getMoviePosterUrl = (posterPath: string | null): string | null => {
  return getImageUrl(posterPath, 'w500');
};

export const getProfileImageUrl = (profilePath: string | null): string | null => {
  return getImageUrl(profilePath, 'w185');
};
