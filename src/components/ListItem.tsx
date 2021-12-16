import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FC} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {Heart} from '.';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {Song, StackParamList} from '../helpers/types';

export const ITEM_HEIGHT = 54.5;

const styles = StyleSheet.create({
  borderBottom: {
    height: ITEM_HEIGHT,
    borderBottomWidth: 0.5,
    borderBottomColor: '#bfbfbf',
  },
});

const ListItem: FC<Song> = song => {
  const {name, number} = song;
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Song', song);
      }}
      style={[
        spacing.p4,
        globalStyles.row,
        styles.borderBottom,
        globalStyles.spaceBetween,
      ]}>
      <Text style={[globalStyles.text, globalStyles.bold]}>
        {number}.&nbsp;{name}
      </Text>
      <Heart number={number} />
    </Pressable>
  );
};

export default ListItem;
