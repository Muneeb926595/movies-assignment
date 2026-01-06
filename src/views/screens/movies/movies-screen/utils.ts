// Helper function to map genre IDs to names
export const getGenreName = (genreId: number): string => {
  const genreMap: Record<number, string> = {
    28: 'ACTION',
    12: 'ADVENTURE',
    16: 'ANIMATION',
    35: 'COMEDY',
    80: 'CRIME',
    99: 'DOCUMENTARY',
    18: 'DRAMA',
    10751: 'FAMILY',
    14: 'FANTASY',
    36: 'HISTORY',
    27: 'HORROR',
    10402: 'MUSIC',
    9648: 'MYSTERY',
    10749: 'ROMANCE',
    878: 'SCI-FI',
    10770: 'TV',
    53: 'THRILLER',
    10752: 'WAR',
    37: 'WESTERN',
  };
  return genreMap[genreId] || 'OTHER';
};
