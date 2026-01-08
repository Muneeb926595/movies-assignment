import {
  CastCard,
  CastCharacter,
  CastImage,
  CastName,
  CastPlaceholder,
} from './styles';
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
        <CastImage
          source={{
            uri: getImageUrl(item.profile_path, 'w185') || '',
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
