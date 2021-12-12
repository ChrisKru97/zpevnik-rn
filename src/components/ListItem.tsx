import {IconFill, IconOutline} from '@ant-design/icons-react-native';
import {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {Song} from '../helpers/types';
import {useSongList} from '../hooks';

export const ITEM_HEIGHT = 54.5;

const styles = StyleSheet.create({
  borderBottom: {
    height: ITEM_HEIGHT,
    borderBottomWidth: 0.5,
    borderBottomColor: '#bfbfbf',
  },
});

const ListItem: FC<Song> = ({name, number}) => {
  const {favorites, switchFavorite} = useSongList();

  const isFavorite = favorites.includes(number);

  return (
    <View
      style={[
        spacing.p4,
        globalStyles.row,
        styles.borderBottom,
        globalStyles.spaceBetween,
      ]}>
      <Text style={[globalStyles.text, globalStyles.bold]}>
        {number}.&nbsp;{name}
      </Text>
      <Pressable onPress={() => switchFavorite(number)} hitSlop={16}>
        {isFavorite ? (
          <IconFill color="red" name="heart" size={20} />
        ) : (
          <IconOutline name="heart" size={20} />
        )}
      </Pressable>
    </View>
  );
};

export default ListItem;
