import {IconFill, IconOutline} from '@ant-design/icons-react-native';
import {FC} from 'react';
import {Pressable, StyleProp, ViewProps} from 'react-native';
import {useSongList} from '../hooks';

interface Props {
  number: number;
  style?: StyleProp<ViewProps>;
  size?: number;
  color?: string;
}

const Heart: FC<Props> = ({number, style, size, color}) => {
  const {favorites, switchFavorite} = useSongList();
  const isFavorite = favorites.includes(number);

  return (
    <Pressable
      onPress={() => switchFavorite(number)}
      hitSlop={16}
      style={style}>
      {isFavorite ? (
        <IconFill color="red" name="heart" size={size ?? 20} />
      ) : (
        <IconOutline name="heart" size={size ?? 20} color={color} />
      )}
    </Pressable>
  );
};

export default Heart;
