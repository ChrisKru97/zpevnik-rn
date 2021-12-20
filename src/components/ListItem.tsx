import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FC} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {Song, StackParamList} from '../helpers/types';
import {useTheme} from '../hooks';
import {Heart} from '.';

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
  const {colors} = useTheme();
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
      <Text
        style={[globalStyles.text, globalStyles.bold, {color: colors.black}]}>
        {number}.&nbsp;{name}
      </Text>
      <Heart number={number} color={colors.black} />
    </Pressable>
  );
};

export default ListItem;
