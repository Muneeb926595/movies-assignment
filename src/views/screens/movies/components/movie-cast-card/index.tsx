import FastImage from '@d11/react-native-fast-image';
import { CastCard, CastCharacter, CastName, CastPlaceholder } from './styles';
import { getImageUrl } from '../../../../../api';
import { Cast } from '../../../../../types';
import { FadeInDown } from 'react-native-reanimated';

export const MovieCastCard = ({
  item,
  index,
}: {
  item: Cast;
  index: number;
}) => {
  return (
    <CastCard key={item.id} entering={FadeInDown.delay(index * 50).springify()}>
      {item.profile_path ? (
        <FastImage
          source={{
            uri: getImageUrl(item.profile_path, 'w185') || '',
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 8,
            marginBottom: 8,
          }}
          resizeMode="cover"
        />
      ) : (
        <CastPlaceholder />
      )}
      <CastName numberOfLines={1}>{item.name}</CastName>
      <CastCharacter numberOfLines={1}>{item.character}</CastCharacter>
    </CastCard>
  );
};
