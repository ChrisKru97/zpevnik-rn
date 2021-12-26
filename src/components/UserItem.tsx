import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {ActiveEntity, StackParamList} from '../helpers/types';
import {useAuth, useSongList, useTheme} from '../hooks';

export const ITEM_HEIGHT = 54.5;

const styles = StyleSheet.create({
  borderBottom: {
    height: ITEM_HEIGHT,
    borderBottomWidth: 0.5,
    borderBottomColor: '#bfbfbf',
  },
  songNumberText: {
    width: 100,
  },
  activeIndicator: {
    borderRadius: 10,
    width: 10,
    height: 10,
    backgroundColor: 'green',
  },
});

const UserItem: FC<ActiveEntity> = ({id, active, songNumber, displayName}) => {
  const {colors} = useTheme();
  const {loginId} = useAuth();
  const {getSong} = useSongList();
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <Pressable
      disabled={!songNumber}
      onPress={() => {
        if (!songNumber) return;
        const song = getSong(songNumber);
        if (!song) return;
        navigation.navigate('Song', song);
      }}
      style={[
        spacing.p4,
        globalStyles.row,
        styles.borderBottom,
        globalStyles.spaceBetween,
        id === loginId && {backgroundColor: colors.gray},
      ]}>
      <View
        style={[
          styles.activeIndicator,
          !active && {backgroundColor: colors.gray},
        ]}
      />
      <Text
        style={[globalStyles.text, globalStyles.bold, {color: colors.black}]}>
        {displayName || 'Anonymní'}
      </Text>
      {songNumber ? (
        <Text
          style={[
            styles.songNumberText,
            globalStyles.text,
            globalStyles.bold,
            {color: colors.black},
          ]}>
          Píseň č. {songNumber}
        </Text>
      ) : (
        <View style={styles.songNumberText} />
      )}
    </Pressable>
  );
};

export default UserItem;
