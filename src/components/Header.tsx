import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {FC, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {spacing} from '../helpers/spacing';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#00300d',
  },
  title: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
});

const Header: FC<NativeStackHeaderProps> = ({route: {name}}) => {
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
    <View style={[spacing.py2, styles.wrapper]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
export default Header;
