import { Video } from '../../../../types';

export const getTrailer = (videos: Video[] | undefined): Video | undefined => {
  if (!videos) return undefined;

  return (
    videos.find(
      video => video.type === 'Trailer' && video.site === 'YouTube',
    ) || videos[0]
  );
};
