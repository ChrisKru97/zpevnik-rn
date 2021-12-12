import {useRoute} from '@react-navigation/native';
import {FC, useMemo} from 'react';
import {Pressable, StyleSheet, Text, View, ViewProps} from 'react-native';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';

export const HEADER_HEIGHT = 55;

const styles = StyleSheet.create({
  wrapper: {
    height: HEADER_HEIGHT,
    backgroundColor: '#00300d',
  },
  title: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
});

interface Props {
  onPress?: () => void;
}

const Header: FC<Props> = ({onPress}) => {
  const {name} = useRoute();
  const title = useMemo(() => {
    switch (name) {
      case 'Home':
        return 'Mládežový zpěvník';
      case 'Favorites':
        return 'Oblíbené';
      case 'History':
        return 'Poslední otevřené';
    }
  }, [name]);

  return (
    <Pressable
      onPress={onPress}
      style={[styles.wrapper, globalStyles.row, globalStyles.spaceBetween]}>
      <View style={globalStyles.flex} />
      <Text style={styles.title}>{title}</Text>
      <View style={globalStyles.flex} />
    </Pressable>
  );
};
export default Header;
