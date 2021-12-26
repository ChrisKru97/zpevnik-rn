import {FC} from 'react';
import {Pressable, StyleProp, ViewProps} from 'react-native';
import {useSongList} from '../hooks';
import Icons from './Icons';

interface Props {
  number: number;
  style?: StyleProp<ViewProps>;
  size?: number;
  color?: string;
}

const Heart: FC<Props> = ({number, style, size, color}) => {
  const {favorites, switchFavorite} = useSongList();
  const isFavorite = favorites?.includes(number);

  return (
    <Pressable
      onPress={() => switchFavorite(number)}
      hitSlop={16}
      style={style}>
      {isFavorite ? <Icons.Heart /> : <Icons.Heart />}
    </Pressable>
  );
};

export default Heart;
